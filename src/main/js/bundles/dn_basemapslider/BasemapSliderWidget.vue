<template>
    <div>
        <v-flex xs12>
            <v-chip class="text-xs-center" v-for="basemap in basemaps" disabled :key="basemap.id" :id="basemap.id">
                {{basemap.title}}
            </v-chip>
            <v-slider id="slider" class="pt-10" hide-details v-model="opacity"></v-slider>
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
        }
    }
</script>
