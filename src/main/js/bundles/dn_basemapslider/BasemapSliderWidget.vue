<!--

    Copyright (C) 2021 con terra GmbH (info@conterra.de)

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
    <v-flex>
        <v-chip
            v-for="basemap in basemaps"
            :id="basemap.id"
            :key="basemap.id"
            :class="{ primary: basemap.active }"
            label
            @click="goToLayer(basemap.value)">
            {{ basemap.title }}
        </v-chip>
        <v-flex
            xs12
            px-4>
            <v-slider
                v-model="opacity"
                class="pt-10"
                hide-details/>
        </v-flex>
        <v-flex
            v-if="autoplayControl === true"
            xs12
            px-4
            align-center
        >
            <v-btn
                @click="$emit('autoplay_clicked')"
            >
                {{ "Autoplay" }}
            </v-btn>
            <v-btn
                @click="$emit('autoplay_pause_clicked')"
            >
                {{ "Stop" }}
            </v-btn>
            <v-btn
                @click="$emit('autoplay_reset_clicked')"
            >
                {{ "Reset" }}
            </v-btn>
        </v-flex>
    </v-flex>
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
            opacity(val) {
                this.$emit('adjustOpacity', val);
            }
        },
        methods: {
            goToLayer: function (value) {
                const count = this.basemaps.length;
                this.opacity = value * 100 / (count - 1);
            }
        },
        autoplayControl: {
            type: Boolean,
            default: () => false
        }
    }
</script>
