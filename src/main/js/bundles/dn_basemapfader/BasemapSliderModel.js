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
import {declare} from "apprt-core/Mutable";

const BasemapSliderModel = declare({

    opacity: 0,
    basemaps: [],
    baselayer: null,
    loadedLayers: [],
    chip: null,

    activate() {
        let basemapModel = this._basemapModel;
        let basemaps = this.basemaps = basemapModel.basemaps;
        basemaps.shift();
            this.addBasemapAsLayer();
    },

    addBasemapAsLayer() {
        let map = this._mapWidgetModel.get("map");
        for (let i = 0; i < this.basemaps.length; i++) {
            let basemap = this.basemaps[i].basemap;
            let clone = basemap.clone();
            clone.load();

            let baselayer2 = this.baselayer = clone.baseLayers.items[0];
            baselayer2.id = this.basemaps[i].id;
            baselayer2.set("opacity", this.opacity / 100);
            map.add(baselayer2);
            map.reorder(baselayer2, i);
            this.loadedLayers.push(baselayer2)
        }

    },

    adjustOpacity(value) {
        let map = this._mapWidgetModel.get("map");
        let loadedLayers = this.loadedLayers;
        for (let i = 0; i < loadedLayers.length; i++) {  //variable gestalten!!
            if (value > (100 / loadedLayers.length) * i) {
                if (value < (100 / loadedLayers.length) * (i + 1)) {
                    map.reorder(loadedLayers[i], loadedLayers.length - 1);
                    loadedLayers[i].opacity = 1-( 1 * (i + 1) - (value / 100) * loadedLayers.length);
                    console.log(loadedLayers[i].opacity);
                    let previousChip = this.chip;
                    this.chip = document.getElementById(loadedLayers[i].id);
                    if (previousChip != null & previousChip != this.chip) {
                        previousChip.style.background = "#7f7f7f";
                    }
                    this.chip.style.background = "#12a5f4";
                }
            }
        }

    },

});

module.exports = BasemapSliderModel;