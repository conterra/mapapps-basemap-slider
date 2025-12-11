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
        <v-btn
            :key="'left-elipses'"
            :disabled="moveLeftDisabled"
            @click="$emit('chip:go-to-left-layer', activeBasemapIndex)"
        >
            <v-icon class="basemap-slider__arrow-section-arrow--first">
                icon-arrow-left
            </v-icon>
        </v-btn>

        <div
            v-for="basemap in basemaps"
            :key="`basemap-container-${basemap.id}`"
        >
            <v-chip
                v-if="filteredBasemaps.includes(basemap)"
                :id="basemap.id"
                :key="`chip-${basemap.id}`"
                :class="{ primary: basemap.active }"
                @click="$emit('chip:go-to-layer', basemap.value)"
            >
                {{ basemap.title }}
            </v-chip>
        </div>

        <v-btn
            :key="'right-elipses'"
            :disabled="moveRightDisabled"
            @click="$emit('chip:go-to-right-layer', activeBasemapIndex)"
        >
            <v-icon class="basemap-slider__arrow-section-arrow--second">
                icon-arrow-right
            </v-icon>
        </v-btn>
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
                return this.basemaps.filter((_, index) =>
                    [
                        0,
                        this.activeBasemapIndex,
                        this.basemaps.length - 1
                    ].includes(index)
                );
            },
            moveLeftDisabled() {
                return this.activeBasemapIndex < 1;
            },
            moveRightDisabled() {
                return this.activeBasemapIndex >= this.basemaps.length - 1;
            }
        }
    };
</script>
