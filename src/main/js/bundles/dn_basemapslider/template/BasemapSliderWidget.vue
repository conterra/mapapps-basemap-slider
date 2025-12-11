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
    <div class="basemap-slider__container">
        <basemap-slider-default-section
            v-if="widgetDisplayMode === 'default' || !widgetDisplayMode"
            :basemaps="basemaps"
            @chip:go-to-layer="goToLayer($event)"
        />
        <basemap-slider-arrow-section
            v-else-if="widgetDisplayMode === 'arrow'"
            :basemaps="basemaps"
            :active-basemap-index="activeBasemapIndex"
            @chip:go-to-layer="goToLayer($event)"
            @chip:go-to-right-layer="goToLayer($event + 1)"
            @chip:go-to-left-layer="goToLayer($event - 1)"
        />
        <!-- <basemap-slider-ellipsis-section
            v-else-if="widgetDisplayMode === 'ellipsis'"
            :basemaps="basemaps"
            :active-basemap-index="activeBasemapIndex"
            @chip:go-to-layer="goToLayer($event)"
            @select:go-to-layer="goToLayer($event)"
        /> -->
        <v-flex
            xs12
            px-4
        >
            <v-slider
                v-model="opacity"
                class="pt-10"
                hide-details
                step="count"
            />
        </v-flex>
        <v-flex
            v-if="autoplayEnabled === true"
            xs12
            px-4
            align-center
        >
            <v-btn
                :class="{ primary: autoplayActive, secondary: !autoplayActive }"
                @click="$emit('autoplay-clicked')"
            >
                <v-icon left>
                    play_circle_outline
                </v-icon>
                {{ i18n.buttons.autoplay }}
            </v-btn>
            <v-btn
                class="secondary"
                @click="$emit('autoplay-pause-clicked')"
            >
                <v-icon left>
                    pause
                </v-icon>
                {{ i18n.buttons.stop }}
            </v-btn>
            <v-btn
                class="secondary"
                @click="opacity = 0"
            >
                <v-icon left>
                    replay
                </v-icon>
                {{ i18n.buttons.reset }}
            </v-btn>
        </v-flex>
    </div>
</template>
<script>
    import Bindable from "apprt-vue/mixins/Bindable";
    import BasemapSliderArrowSection from "./subcomponents/BasemapSliderArrowSection.vue";
    import BasemapSliderDefaultSection from "./subcomponents/BasemapSliderDefaultSection.vue";
    import BasemapSliderEllipsisSection from "./subcomponents/BasemapSliderEllipsisSection.vue";

    export default {
        components: {
            "basemap-slider-arrow-section": BasemapSliderArrowSection,
            "basemap-slider-ellipsis-section": BasemapSliderEllipsisSection,
            "basemap-slider-default-section": BasemapSliderDefaultSection
        },
        mixins: [Bindable],
        props: {
            basemaps: {
                type: Array,
                default: () => []
            },
            opacity: {
                type: Number,
                default: 0
            },
            autoplayEnabled: {
                type: Boolean,
                default: () => false
            },
            autoplayActive: {
                type: Boolean,
                default: () => false
            },
            widgetDisplayMode: {
                type: String,
                default: () => ""
            }
        },
        data() {
            return {
                activeBasemapIndex: 0
            };
        },
        computed: {
            count() {
                return this.basemaps.length;
            }
        },
        watch: {
            opacity(val) {
                this.$emit('adjust-opacity', val);
            }
        },
        methods: {
            goToLayer: function (value) {
                this.opacity = value * 100 / (this.count - 1);
                this.activeBasemapIndex = value;
            }
        }
    };
</script>
