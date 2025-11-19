<template>
    <div>
        <v-chip
            v-for="basemap in basemaps"
            :id="basemap.id"
            :key="basemap.id"
            :class="{ primary: basemap.active }"
            label
            @click="$emit('chip:go-to-layer', basemap.value)"
        >
            {{ basemap.title }}
        </v-chip>
    </div>
</template>
<script>
    export default {
        props: {
            basemaps: {
                type: Array,
                default: () => []
            }
        }
    };
</script>
