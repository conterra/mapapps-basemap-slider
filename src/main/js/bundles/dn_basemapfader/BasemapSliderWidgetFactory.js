/*
 * Copyright (C) 2018 con terra GmbH (info@conterra.de)
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

class BasemapSliderWidgetFactory {

    activate() {
        this._initComponent();
    }

    _initComponent() {
        let basemapModel = this._basemapModel;
        let model = this._basemapSliderModel;
        const vm = this.basemapslider = new Vue(BasemapSliderWidget);
        vm.basemaps = model.basemaps;
        vm.opacity = model.opacity;
        vm.baselayer = model.baselayer;
        vm.iconplay = model.iconplay;
        model.reverse = vm.reverse;
        model.forward = vm.forward;

        vm.$on('addBasemapAsLayer', (layerId, index) => {
            model.addBasemapAsLayer(layerId, index);
        });
        vm.$on('adjustOpacity', (value) => {
            model.adjustOpacity(value);
        });

        Binding
            .create()
            .bindTo(vm, model)
            .syncAll("basemaps", "opacity", "baselayer")
            .enable();

        Binding
            .create()
            .bindTo(vm, basemapModel)
            .enable();

    }

    createInstance() {
        return VueDijit(this.basemapslider);
    }

}


module.exports = BasemapSliderWidgetFactory;
