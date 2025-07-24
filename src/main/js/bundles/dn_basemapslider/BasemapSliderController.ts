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

import type { InjectedReference } from "apprt-core/InjectedReference";
import type { BasemapsModel } from "map-basemaps-api/api";
import type { BasemapSliderModel } from "./BasemapSliderModel";
import type { BasemapConfig } from "./api";
import type { MapWidgetModel } from "map-widget/api";
import type Tool from "ct/tools/Tool";

export class BasemapSliderController {
    private _tool: InjectedReference<typeof Tool>;
    private _mapWidgetModel?: InjectedReference<MapWidgetModel>;
    private _basemapsModel: InjectedReference<BasemapsModel>;
    private _basemapSliderModel: InjectedReference<BasemapSliderModel>;

    activate(): void {
        const tool = this._tool;
        const model = this._basemapSliderModel!;
        const basemapsModel = this._basemapsModel!;

        const basemapId = model.basemapId;

        basemapsModel.watch("basemaps", () => {
            this.initSlider(basemapId);
        });
        basemapsModel.watch("selectedId", ({ value }) => {
            this.checkBaseMap(basemapId, value);
        });

        tool.watch("active", (evt: boolean) => {
            if (evt && model.forceBasemapSelection) {
                this.setSelectedBasemap(basemapId);
            }
        });

        this.checkBaseMap(basemapId, basemapsModel.selectedId);
        this.initSlider(basemapId);
    }

    private setSelectedBasemap(basemapId: string): void {
        const basemapsModel = this._basemapsModel!;
        basemapsModel.selectedId = basemapId;
    }

    private checkBaseMap(basemapId: string, value: string | undefined): void {
        if (!value) return;

        if (value === basemapId) {
            this._tool.set("active", true);
        } else {
            this._tool.set("active", false);
        }
    }

    private getBaseMap(basemapId: string): __esri.Basemap | undefined {
        const basemapsModel = this._basemapsModel!;

        let basemap = basemapsModel.findItemById(basemapId)?.basemap;
        if (!basemap && basemapsModel.basemaps.length === 1) {
            basemap = basemapsModel.basemaps[0].basemap;
        }

        return basemap;
    }

    private initSlider(basemapId: string): void {
        const basemap = this.getBaseMap(basemapId);
        if (!basemap) return;

        const baseLayers = basemap.baseLayers;
        const basemapSliderModel = this._basemapSliderModel!;

        if (basemap && baseLayers?.length > 0 && baseLayers.getItemAt(0).layers) {
            const groupBaseLayer = baseLayers.getItemAt(0).layers;
            basemapSliderModel.basemaps = groupBaseLayer.map((basemap: __esri.Basemap, i: number) => {
                basemapSliderModel.baselayers.push(basemap);
                return {
                    id: basemap.id,
                    title: basemap.title,
                    value: i,
                    active: false
                };
            }).toArray();

            this.adjustOpacity(0);
        } else {
            console.info("No usable layers found");
            this._tool.set("active", false);
        }
    }

    private adjustOpacity(value: number): void {
        const basemapSliderModel = this._basemapSliderModel!;

        this.hideAllBasemaps();

        const count = basemapSliderModel.basemaps.length;
        const v = value / 100 * (count - 1);
        const basemapValue1 = Math.floor(v);
        const basemap1 = this.getBaseLayerForValue(basemapValue1);
        const baseLayerId1 = basemap1.id;
        const baseLayer1 = this.getBaseLayer(baseLayerId1);
        const basemapValue2 = Math.ceil(v);
        const basemap2 = this.getBaseLayerForValue(basemapValue2);
        const baseLayerId2 = basemap2.id;
        const baseLayer2 = this.getBaseLayer(baseLayerId2);
        const opacity = v - basemapValue1;

        baseLayer1.visible = true;
        baseLayer2.visible = true;

        if (baseLayerId1 === baseLayerId2) {
            baseLayer1.opacity = 1;
            basemap1.active = true;
            if (baseLayer1.type === "group") {
                baseLayer1.layers.forEach((layer: __esri.Layer) => layer.opacity = baseLayer1.opacity);
            }
        } else {
            baseLayer1.opacity = 1 - opacity;
            if (baseLayer1.type === "group") {
                baseLayer1.layers.forEach((layer: __esri.Layer) => layer.opacity = baseLayer1.opacity);
            }
            baseLayer2.opacity = opacity;
            if (baseLayer2.type === "group") {
                baseLayer2.layers.forEach((layer: __esri.Layer) => layer.opacity = baseLayer2.opacity);
            }
            if (opacity <= 0.5) {
                basemap1.active = true;
            } else {
                basemap2.active = true;
            }
        }
        baseLayer1.emit("refresh", { dataChanged: true });
    }

    startAutoplay(): void {
        const basemapSliderModel = this._basemapSliderModel!;

        basemapSliderModel.autoplayActive = true;
        const maxOpacity = 100 - basemapSliderModel.autoplayOpacityIncrement;

        const autoplayInterval = setInterval(function () {
            if (basemapSliderModel.autoplayActive && basemapSliderModel.opacity < maxOpacity) {
                basemapSliderModel.opacity = (basemapSliderModel.opacity as number) +
                    (basemapSliderModel.autoplayOpacityIncrement as number);
            } else {
                clearInterval(autoplayInterval);
                basemapSliderModel.autoplayActive = false;
            }
        }, basemapSliderModel.autoplayInterval);
    }

    stopAutoplay(): void {
        const basemapSliderModel = this._basemapSliderModel!;

        basemapSliderModel.autoplayActive = false;
    }

    private hideAllBasemaps(): void {
        const basemapSliderModel = this._basemapSliderModel!;

        basemapSliderModel.baselayers.forEach((baselayer: __esri.Layer) => {
            baselayer.opacity = 0;
            baselayer.visible = false;
        });
        basemapSliderModel.basemaps.forEach((basemap: BasemapConfig) => {
            basemap.active = false;
        });
    }

    private getBaseLayer(id: string): any {
        const basemapSliderModel = this._basemapSliderModel!;

        return basemapSliderModel.baselayers.find((baselayer: BasemapConfig) => baselayer.id === id);
    }

    private getBaseLayerForValue(value: number): any {
        const basemapSliderModel = this._basemapSliderModel!;
        return basemapSliderModel.basemaps.find((basemap: BasemapConfig) => basemap.value === value);
    }
}
