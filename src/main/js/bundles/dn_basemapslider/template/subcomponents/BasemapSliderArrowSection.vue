<template>
    <div class="basemap-slider__selection-section">
        <div
            v-for="(basemap, index) in basemaps"
            :key="`basemap-container-${basemap.id}`"
        >
            <v-chip
                v-if="index === basemaps.length - 1"
                :key="`right-elipses-${index}`"
                @click="$emit('chip:go-to-right-layer', activeBasemapIndex)"
            >
                <v-icon>
                    icon-arrow-right
                </v-icon>
            </v-chip>
            <v-chip
                v-if="filteredBasemaps.includes(basemap)"
                :id="basemap.id"
                :key="`chip-${basemap.id}`"
                :class="{ primary: basemap.active }"
                @click="$emit('chip:go-to-layer', basemap.value)"
            >
                Luftbild: Wirklich langer Title {{ basemap.title }}
            </v-chip>
            <v-chip
                v-if="index === 0"
                :key="`left-elipses-${index}`"
                @click="$emit('chip:go-to-left-layer', activeBasemapIndex)"
            >
                <v-icon>
                    icon-arrow-left
                </v-icon>
            </v-chip>
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
                return this.basemaps.filter((_, index) =>
                    [
                        0,
                        this.activeBasemapIndex,
                        this.basemaps.length - 1
                    ].includes(index)
                );
            },
            activeBasemapIndex() {
                return this.basemaps.findIndex(basemap => basemap.active);
            },
            leftElipsesActive() {
                const activeBasemapIndex = this.basemaps.findIndex(basemap => basemap.active);
                return activeBasemapIndex > 1;
            },
            rightElipsesActive() {
                const activeBasemapIndex = this.basemaps.findIndex(basemap => basemap.active);
                return activeBasemapIndex < this.basemaps.length - 2;
            }
        }
    };
</script>
