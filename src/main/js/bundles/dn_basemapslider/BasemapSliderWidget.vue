<template>
    <div>
        <v-flex>
            <v-chip class="text-xs-center" v-for="basemap in basemaps" disabled :key="basemap.id" :id="basemap.id" v-on:click="goToLayer(basemap.id)">
                {{basemap.title}}
            </v-chip>
            <v-flex xs12 pl-3 pr-2>
            <v-slider id="slider" class="pt-10" hide-details v-model="opacity"></v-slider>
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
    methods:{
        goToLayer: function (layerId){
            this.$emit('goToLayer', layerId);
        }
    },
    watch: {
        opacity: {
            handler(val, oldVal) {
                this.$emit('adjustOpacity', val);
            }
        }
    }
}
</script>
