/*
 * Copyright (C) 2019 con terra GmbH (info@conterra.de)
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
import {declare} from "apprt-core/Mutable";
import Basemap from "esri/Basemap";
import TileLayer from "esri/layers/TileLayer";

const BasemapSliderModel = declare({

    opacity: 0,
    basemaps: [],
    baselayer: null,
    loadedBaselayers: [],
    chip: null,
    previousLayer: null,

    activate() {
        let basemapModel = this._basemapModel;
        let basemaps = this.basemaps = basemapModel.basemaps;
        let properties = this.properties = this._properties;
        //basemaps.shift(); //The first layer added is always the base layer, even if its order is changed. (ESRI API 4.7)
        this.addBasemapAsLayer();
    },

    addBasemapAsLayer: function () {

        let map = this._mapWidgetModel.get("map");
        let initialLayers;
        if (map.layers.items.length !== 0) {
            initialLayers = Array.from(map.layers.items);
        }
        for (let i = 0; i < this.basemaps.length; i++) {

            let basemap = this.basemaps[i].basemap;
            let clone = basemap.clone();
            clone.load();
            let baselayer2 = this.baselayer = clone.baseLayers.items[0];
            baselayer2.id = this.basemaps[i].id;
            if (i === 0) {
                let firstBasemap = new Basemap({
                    baseLayers: [
                        new TileLayer({
                            id: 'baselayer',
                            url: baselayer2.url,
                            opacity: 0
                        })
                    ],
                    referenceLayers: [
                        new TileLayer({
                            id: 'baselayer',
                            url: baselayer2.url,
                            opacity: 0
                        })
                    ]
                });
                if (!this.properties.showInMapflow) {
                    baselayer2.listMode = "hide";
                }
                map.set('basemap', firstBasemap);
            }
            if (!this.properties.showInMapflow) {
                baselayer2.listMode = "hide";
            }
            map.add(baselayer2);

            this.loadedBaselayers.push(baselayer2);
        }

        if (initialLayers) {
            for (let n = 0; n < initialLayers.length; n++) {
                map.reorder(initialLayers[n], initialLayers.length + this.loadedBaselayers.length - 1);
            }
        }

        for (let m = 0; m < this.loadedBaselayers.length; m++) {
            map.reorder(this.loadedBaselayers[m], this.loadedBaselayers.length - m - 1);
        }

    },

    adjustOpacity(value) {
        let map = this._mapWidgetModel.get("map");
        let loadedBaselayers = this.loadedBaselayers;

        for (let i = 0; i < loadedBaselayers.length; i++) {  //variable gestalten!!
            let opacity;
            if (i === 0 && value <= (100 / loadedBaselayers.length) / 1.5) {
                opacity = 1 - ((value / 100) * loadedBaselayers.length);
                loadedBaselayers[0].opacity = opacity;
                return;
            }
            if (value >= (100 / loadedBaselayers.length) * i && value <= (100 / loadedBaselayers.length) * (i + 1)) {
                if (loadedBaselayers[i] === map.layers[7]) {
                    opacity = Math.abs(i - (value / 100) * loadedBaselayers.length);
                    return;
                }
                let previousChip = this.chip;
                this.chip = document.getElementById(loadedBaselayers[i].id);
                if (previousChip !== null && previousChip !== this.chip) {
                    previousChip.style.background = "#7f7f7f";
                }
                this.chip.style.background = "#12a5f4";

                map.reorder(loadedBaselayers[i], loadedBaselayers.length - 1);
                opacity = Math.abs(i - (value / 100) * loadedBaselayers.length);
                loadedBaselayers[i].opacity = opacity;


            }


        }

    },

    goToLayer(layerId) {
        let loadedBaselayers = this.loadedBaselayers;
        for (let i = 0; i < loadedBaselayers.length; i++) {

            if (loadedBaselayers[i].id === layerId) {
                this.opacity = Math.abs(((i + 0.9) * 100 / loadedBaselayers.length));
            }
        }
    }

});

module.exports = BasemapSliderModel;
