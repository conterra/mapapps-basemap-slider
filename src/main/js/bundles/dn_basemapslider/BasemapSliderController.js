/*
 * Copyright (C) 2021 con terra GmbH (info@conterra.de)
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
import ct_async from "ct/async";

export default class {

    activate() {
        const basemapId = this._properties.basemapId || "basemap_slider"
        const basemapsModel = this._basemapsModel;
        basemapsModel.watch("basemaps", () => {
            this._initSlider(basemapId);
        })
        basemapsModel.watch("selectedId", ({value}) => {
            this._checkBaseMap(basemapId, value);
        })
        this._checkBaseMap(basemapId, basemapsModel.selectedId);
        this._initSlider(basemapId)
    }

    _checkBaseMap(basemapId, value) {
        const basemapsModel = this._basemapsModel;
        let basemap = basemapsModel.findItemById(basemapId)?.basemap;
        if (!basemap && basemapsModel.basemaps.length === 1) {
            this._tool.set("active", true);
            return;
        }
        if (value === basemapId) {
            this._tool.set("active", true);
        } else {
            this._tool.set("active", false);
        }
    }

    _getBaseMap(basemapId){
        const basemapsModel = this._basemapsModel;
        let basemap = basemapsModel.findItemById(basemapId)?.basemap;
        if (!basemap && basemapsModel.basemaps.length === 1) {
            basemap = basemapsModel.basemaps[0].basemap;
        }
        return basemap
    }

    _initSlider(basemapId) {
        const basemap = this._getBaseMap(basemapId);
        const baseLayers = basemap?.baseLayers;
        const basemapSliderModel = this._basemapSliderModel;
        if (basemap && baseLayers?.length > 0) {
            const groupBaseLayer = baseLayers.getItemAt(0).layers;
            basemapSliderModel.basemaps = groupBaseLayer.map((basemap, i) => {
                basemapSliderModel.baselayers.push(basemap);
                return {
                    id: basemap.id,
                    title: basemap.title,
                    value: i,
                    active: false
                }
            }).toArray();
            this.adjustOpacity(0);
        } else {
            console.log("No usable layers found");
            this._tool.set("active", false);
        }
    }

    /**
     * Method that adjusts the opacity properties of the basemaps
     *
     * @param value opacity value
     */
    adjustOpacity(value) {
        const basemapSliderModel = this._basemapSliderModel;
        this._hideAllBasemaps();
        const count = basemapSliderModel.basemaps.length;
        const v = value / 100 * (count - 1);
        const basemapValue1 = Math.floor(v);
        const basemap1 = this._getBaseLayerForValue(basemapValue1);
        const baseLayerId1 = basemap1.id;
        const baseLayer1 = this._getBaseLayer(baseLayerId1);
        const basemapValue2 = Math.ceil(v);
        const basemap2 = this._getBaseLayerForValue(basemapValue2);
        const baseLayerId2 = basemap2.id;
        const baseLayer2 = this._getBaseLayer(baseLayerId2);
        const opacity = v - basemapValue1;
        baseLayer1.visible = true;
        baseLayer2.visible = true;
        if (baseLayerId1 === baseLayerId2) {
            baseLayer1.opacity = 1;
            basemap1.active = true;
        } else {
            baseLayer1.opacity = 1 - opacity;
            baseLayer2.opacity = opacity;
            if (opacity <= 0.5) {
                basemap1.active = true;
            } else {
                basemap2.active = true;
            }
        }
        baseLayer1.emit("refresh");
    }

    /**
     * Method that hides all basemaps.
     *
     * @private
     */
    _hideAllBasemaps() {
        const basemapSliderModel = this._basemapSliderModel;
        basemapSliderModel.baselayers.forEach((baselayer) => {
            baselayer.opacity = 0;
            baselayer.visible = false
        });
        basemapSliderModel.basemaps.forEach((basemap) => {
            basemap.active = false;
        });
    }

    /**
     * Method that returns one baselayer.
     *
     * @param id baselayer id
     * @returns {*} baselayer
     * @private
     */
    _getBaseLayer(id) {
        const basemapSliderModel = this._basemapSliderModel;
        return basemapSliderModel.baselayers.find((baselayer) => {
            return baselayer.id === id;
        })
    }

    /**
     * Method that returns one basemap.
     *
     * @param value basemap slider value
     * @returns basemap
     * @private
     */
    _getBaseLayerForValue(value) {
        const basemapSliderModel = this._basemapSliderModel;
        return basemapSliderModel.basemaps.find((basemap) => {
            return basemap.value === value;
        });
    }

}
