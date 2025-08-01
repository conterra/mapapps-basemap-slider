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

import { Mutable, properties } from "apprt-core/Mutable";

export interface BasemapSliderModelProperties {
    opacity: number,
    basemaps: __esri.Basemap[],
    baselayers: __esri.Layer[],
    basemapId: string,
    autoplayActive: boolean,
    autoplayEnabled: boolean,
    autoplayTimeInterval: number,
    autoplayOpacityIncrement: number,
    forceBasemapSelection: boolean
}

export class BasemapSliderModel extends Mutable { }

properties(BasemapSliderModel, {
    opacity: 0,
    basemaps: [],
    baselayers: [],
    basemapId: "basemap_slider",
    autoplayActive: false,
    autoplayEnabled: undefined,
    autoplayTimeInterval: undefined,
    autoplayOpacityIncrement: undefined,
    forceBasemapSelection: false
});
