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
            map.add(baselayer2);
            this.loadedLayers.push(baselayer2);
        }
        for(let i = 0; i < this.loadedLayers.length; i++){
            map.reorder(this.loadedLayers[i], this.loadedLayers.length-i-1);
         }

    },

    adjustOpacity(value) {
        let map = this._mapWidgetModel.get("map");
        let loadedLayers = this.loadedLayers;
        for (let i = 0; i < loadedLayers.length; i++) {  //variable gestalten!!
            if (value >= (100 / loadedLayers.length) * i) {
                if (value <= (100 / loadedLayers.length) * (i + 1)) {
                    map.reorder(loadedLayers[i], loadedLayers.length - 1);
                    var opacityBeginning = (i + 1) - (value / 100) * loadedLayers.length;
                    var opacityMiddle = -4*(Math.pow((opacityBeginning-0.5), 2)) + 1.15; // Mitte des Intervals ist Höhepunkt
                    loadedLayers[i].opacity = opacityMiddle;
                    let previousChip = this.chip;
                    this.chip = document.getElementById(loadedLayers[i].id);
                    if (previousChip !== null && previousChip !== this.chip) {
                        previousChip.style.background = "#7f7f7f";
                        for(let n = 0; n < loadedLayers.length; n++){
                            if (loadedLayers[n].id === previousChip.id){
                                loadedLayers[n].opacity = 0.5;
                                console.log(previousChip.id);
                            }
                        }
                    }
                    this.chip.style.background = "#12a5f4";
                }
            }

        }

    },

    goToLayer(layerId){
        let loadedLayers = this.loadedLayers;
        for(let i = 0; i < loadedLayers.length; i++){
            if(loadedLayers[i].id === layerId){
                this.opacity = i * 100 / loadedLayers.length+10;
            }
        }
    }

});

module.exports = BasemapSliderModel;