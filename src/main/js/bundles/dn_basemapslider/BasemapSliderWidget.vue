<!--

    Copyright (C) 2023 con terra GmbH (info@conterra.de)

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
    <v-card>
        <v-flex>
            <v-chip
                v-for="basemap in basemaps"
                :id="basemap.id"
                :key="basemap.id"
                :class="{ primary: basemap.active }"
                label
                @click="goToLayer(basemap.value)"
            >
                {{ basemap.title }}
            </v-chip>
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
        </v-flex>
    </v-card>
</template>
<script>
    import Bindable from "apprt-vue/mixins/Bindable";

    export default {
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
            }
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
            }
        }
    };
</script>
