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
