<!--

    Copyright (C) 2025 con terra GmbH (info@conterra.de)

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

            http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.

-->
<template>
    <div class="basemap-slider__selection-section">
        <div
            v-for="(basemap, index) in basemaps"
            :key="`basemap-container-${basemap.id}`"
        >
            <span
                v-if="index === basemaps.length - 1 && rightElipsesActive"
                :key="`right-elipses-${index}`"
                class="basemap-slider__elipses icon-more-h"
            />
            <v-chip
                v-if="filteredBasemaps.includes(basemap) && !basemap.active"
                :id="basemap.id"
                :key="`chip-${basemap.id}`"
                :class="{ primary: basemap.active }"
                label
                @click="$emit('chip:go-to-layer', basemap.value)"
            >
                {{ basemap.title }}
            </v-chip>
            <v-select
                v-else-if="filteredBasemaps.includes(basemap) && basemap.active"
                :key="`select-${basemap.id}`"
                class="basemap-slider__basemap-select"
                :value="basemap.value"
                :items="basemaps"
                item-text="title"
                item-value="value"
                outline
                hide-details
                @change="$emit('select:go-to-layer', $event)"
            />
            <span
                v-if="index === 0 && leftElipsesActive"
                :key="`left-elipses-${index}`"
                class="basemap-slider__elipses icon-more-h"
            />
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            basemaps: {
                type: Array,
                default: () => []
            },
            activeBasemapIndex: {
                type: Number,
                default: 0
            }
        },
        computed: {
            filteredBasemaps() {
                const activeBasemapIndex = this.basemaps.findIndex(basemap => basemap.active);
                return this.basemaps.filter((_, index) =>
                    [
                        0,
                        activeBasemapIndex - 1,
                        activeBasemapIndex,
                        activeBasemapIndex + 1,
                        this.basemaps.length - 1
                    ].includes(index)
                );
            },
            leftElipsesActive() {
                return this.activeBasemapIndex > 2;
            },
            rightElipsesActive() {
                return this.activeBasemapIndex < this.basemaps.length - 3;
            }
        }
    };
</script>
