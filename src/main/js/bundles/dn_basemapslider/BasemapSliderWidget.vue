<!--

    Copyright (C) 2019 con terra GmbH (info@conterra.de)

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
    <div class="basemapslider">
        <v-flex>
            <v-chip
                v-for="basemap in basemaps"
                :key="basemap.id"
                :id="basemap.id"
                class="text-xs-center"
                disabled
                @click="goToLayer(basemap.id)">
                {{ basemap.title }}
            </v-chip>
            <v-flex
                xs12
                pl-1
                pr-1>
                <v-slider
                    id="slider"
                    v-model="opacity"
                    class="pt-10"
                    hide-details/>
            </v-flex>
        </v-flex>
    </div>
</template>
<script>
    import Bindable from "apprt-vue/mixins/Bindable";

    export default {
        mixins: [Bindable],
        data: function () {
            return {
                basemaps: [],
                opacity: 0
            };
        },
        watch: {
            opacity: {
                handler(val, oldVal) {
                    this.$emit('adjustOpacity', val);
                }
            }
        },
        methods: {
            goToLayer: function (layerId) {
                this.$emit('goToLayer', layerId);
            }
        }
    }
</script>
