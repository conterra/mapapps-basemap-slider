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

import { InjectedReference } from "apprt-core/InjectedReference";
import type { ComponentContext } from "apprt/api";
import type Tool from "ct/tools/Tool";
import type { BasemapSliderController } from "./BasemapSliderController";
import type { BasemapsModel } from "map-basemaps-api/api";
import type { BasemapSliderModel } from "./BasemapSliderModel";
import type { MessagesReference } from "./nls/bundle";

export class BasemapSliderWidgetFactory {
    private vm?: Vue;
    private basemapBinding?: Binding;
    private basemapSliderModelBinding?: Binding;
    private toolBinding?: Binding;

    private _tool?: InjectedReference<Tool>;
    private _i18n?: InjectedReference<MessagesReference>;
    private _basemapsModel: InjectedReference<BasemapsModel>;
    private _basemapSliderModel: InjectedReference<BasemapSliderModel>;
    private _basemapSliderController: InjectedReference<BasemapSliderController>;

    activate(componentContext: ComponentContext): void {
        this.initComponent();
    }

    deactivate(): void {
        this.basemapSliderModelBinding?.unbind();
        this.basemapSliderModelBinding = undefined;

        this.basemapBinding?.unbind();
        this.basemapBinding = undefined;

        this.toolBinding?.unbind();
        this.toolBinding = undefined;
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
            .syncAll("opacity", "activeBasemapIndex")
            .syncAllToLeft("basemaps", "autoplayEnabled", "autoplayActive", "widgetDisplayMode")
            .enable()
            .syncToLeftNow();

        this.basemapBinding = Binding
            .create()
            .bindTo(vm, basemapsModel)
            .enable();

        this.toolBinding = Binding
            .create()
            .bindTo(vm, this._tool!)
            .syncAllToLeft("active")
            .enable();
    }

    createInstance(): Vue {
        return VueDijit(this.vm);
    }

}
