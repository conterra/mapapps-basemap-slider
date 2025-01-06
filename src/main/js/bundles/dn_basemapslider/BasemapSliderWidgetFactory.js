/*
 * Copyright (C) 2025 con terra GmbH (info@conterra.de)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import BasemapSliderWidget from "./BasemapSliderWidget.vue";
import Vue from "apprt-vue/Vue";
import VueDijit from "apprt-vue/VueDijit";
import Binding from "apprt-binding/Binding";
import ct_util from "ct/ui/desktop/util";
import async from "apprt-core/async";

export default class BasemapSliderWidgetFactory {

    #sliderWidget = null;
    #serviceRegistration = null;
    #bundleContext = null;
    #tool = null;
    #basmapSliderModelBinding = null;
    #basemapBinding = null;

    activate(componentContext) {
        this.#bundleContext = componentContext.getBundleContext();
    }

    deactivate() {
        this._destroyWidget();
        const vm = this.basemapslider;
        vm.$off();

        this.#basmapSliderModelBinding.unbind();
        this.#basmapSliderModelBinding= null;

        this.#basemapBinding.unbind();
        this.#basemapBinding= null;
    }

    /**
     * Method to initial the component.
     *
     * @private
     */
    _initComponent() {
        const basemapsModel = this._basemapsModel;
        const model = this._basemapSliderModel;
        const controller = this._basemapSliderController;
        const vm = this.basemapslider = new Vue(BasemapSliderWidget);
        vm.i18n = this._i18n.get();

        vm.$on('adjust-opacity', (value) => {
            controller.adjustOpacity(value);
        });

        vm.$on('autoplay-clicked', () => {
            controller.startAutoplay();
        });

        vm.$on('autoplay-pause-clicked', () => {
            controller.stopAutoplay();
        });

        this.#basmapSliderModelBinding = Binding
            .create()
            .bindTo(vm, model)
            .syncAll("opacity")
            .syncAllToLeft("basemaps", "autoplayEnabled", "autoplayActive")
            .enable()
            .syncToLeftNow();

        this.#basemapBinding = Binding
            .create()
            .bindTo(vm, basemapsModel)
            .enable();
    }

    /**
     * Method that returns the Widget.
     *
     * @returns VueDijit
     */
    createInstance() {
        return VueDijit(this.basemapslider, {class: "basemap-slider"});
    }

    _hideWindow() {
        this.#sliderWidget?.destroy();
        this.#sliderWidget = null;

        const registration = this.#serviceRegistration;

        // clear the reference
        this.#serviceRegistration = null;

        if (registration) {
            // call unregister
            registration.unregister();
        }
        if (this.#tool) {
            this.#tool.set("active", false);
        }
    }


    getWidget() {
        this._initComponent();
        return VueDijit(this.basemapslider, {class: "basemap-slider"});
    }

    _destroyWidget() {
        this.#sliderWidget.destroy();
        this.#sliderWidget = undefined;
    }

    onToolActivated(evt) {
        async(() => {
            this.#tool = evt.tool;
            const widget = this.getWidget();
            this._showWindow(widget);
        }, 200);

    }

    onToolDeactivated() {
        this._hideWindow();
    }

    _showWindow(widget) {
        const serviceProperties = {
            "widgetRole": "basemapslider"
        };
        const interfaces = ["dijit.Widget"];
        this.#serviceRegistration = this.#bundleContext.registerService(interfaces, widget, serviceProperties);

        async(() => {
            const window = ct_util.findEnclosingWindow(widget);
            window?.on("Hide", () => {
                this._hideWindow();
            });
        }, 1000);
    }
}
