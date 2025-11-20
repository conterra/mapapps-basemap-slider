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
                const activeBasemapIndex = this.basemaps.findIndex(basemap => basemap.active);
                return activeBasemapIndex > 2;
            },
            rightElipsesActive() {
                const activeBasemapIndex = this.basemaps.findIndex(basemap => basemap.active);
                return activeBasemapIndex < this.basemaps.length - 3;
            }
        }
    };
</script>
