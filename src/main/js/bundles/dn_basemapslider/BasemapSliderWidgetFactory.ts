///
/// Copyright (C) 2025 con terra GmbH (info@conterra.de)
///
/// Licensed under the Apache License, Version 2.0 (the "License");
/// you may not use this file except in compliance with the License.
/// You may obtain a copy of the License at
///
///         http://www.apache.org/licenses/LICENSE-2.0
///
/// Unless required by applicable law or agreed to in writing, software
/// distributed under the License is distributed on an "AS IS" BASIS,
/// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
/// See the License for the specific language governing permissions and
/// limitations under the License.
///

import BasemapSliderWidget from "./template/BasemapSliderWidget.vue";
import Vue from "apprt-vue/Vue";
import VueDijit from "apprt-vue/VueDijit";
import Binding from "apprt-binding/Binding";
import ct_util from "ct/ui/desktop/util";
import async from "apprt-core/async";

import { InjectedReference } from "apprt-core/InjectedReference";
import type { BundleContext, ComponentContext, ServiceRegistration } from "apprt/api";
import type Tool from "ct/tools/Tool";
import type { BasemapSliderController } from "./BasemapSliderController";
import type { BasemapsModel } from "map-basemaps-api/api";
import type { BasemapSliderModel } from "./BasemapSliderModel";
import type { MessagesReference } from "./nls/bundle";

export class BasemapSliderWidgetFactory {
    private vm?: Vue;
    private sliderWidget?: Vue;
    private tool?: typeof Tool;
    private basemapBinding?: Binding;
    private bundleContext?: BundleContext;
    private basemapSliderModelBinding?: Binding;
    private serviceRegistration?: ServiceRegistration;

    private _i18n?: InjectedReference<MessagesReference>;
    private _basemapsModel: InjectedReference<BasemapsModel>;
    private _basemapSliderModel: InjectedReference<BasemapSliderModel>;
    private _basemapSliderController: InjectedReference<BasemapSliderController>;

    activate(componentContext: ComponentContext): void {
        this.bundleContext = componentContext.getBundleContext();
    }

    deactivate(): void {
        this.destroyWidget();

        this.basemapSliderModelBinding?.unbind();
        this.basemapSliderModelBinding = null;

        this.basemapBinding?.unbind();
        this.basemapBinding = null;
    }

    initComponent(): void {
        const basemapsModel = this._basemapsModel!;
        const model = this._basemapSliderModel!;
        const controller = this._basemapSliderController!;

        const vm = this.vm = new Vue(BasemapSliderWidget);
        vm.i18n = this._i18n!.get();

        vm.$on('adjust-opacity', (value) => {
            controller.adjustOpacity(value);
        });

        vm.$on('autoplay-clicked', () => {
            controller.startAutoplay();
        });

        vm.$on('autoplay-pause-clicked', () => {
            controller.stopAutoplay();
        });

        this.basemapSliderModelBinding = Binding
            .create()
            .bindTo(vm, model)
            .syncAll("opacity")
            .syncAllToLeft("basemaps", "autoplayEnabled", "autoplayActive")
            .enable()
            .syncToLeftNow();

        this.basemapBinding = Binding
            .create()
            .bindTo(vm, basemapsModel)
            .enable();
    }

    createInstance(): Vue {
        return VueDijit(this.vm);
    }

    hideWindow(): void {
        this.sliderWidget?.destroy();
        this.sliderWidget = null;

        const registration = this.serviceRegistration;
        this.serviceRegistration = null;

        if (registration) {
            registration.unregister();
        }
        if (this.tool) {
            this.tool.set("active", false);
        }
    }


    getWidget(): Vue {
        this.initComponent();
        return VueDijit(this.vm, { class: "basemap-slider" });
    }

    destroyWidget(): void {
        this.sliderWidget?.destroy();
        this.sliderWidget = undefined;
    }

    onToolActivated(evt: any): void {
        async(() => {
            this.tool = evt.tool;
            const widget = this.getWidget();
            this.showWindow(widget);
        }, 200);
    }

    onToolDeactivated(): void {
        this.hideWindow();
    }

    showWindow(widget: Vue): void {
        const serviceProperties = {
            "widgetRole": "basemapslider"
        };
        const interfaces = ["dijit.Widget"];
        this.serviceRegistration = this.bundleContext.registerService(interfaces, widget, serviceProperties);

        async(() => {
            const window = ct_util.findEnclosingWindow(widget);
            window?.on("Hide", () => {
                this.hideWindow();
            });
        }, 1000);
    }
}
