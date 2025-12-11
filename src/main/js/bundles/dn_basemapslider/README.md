# dn_basemapslider

The Basemap Slider Bundle provides a widget that allows you to fade between different basemaps.

## Usage

1. Add the bundle "dn_basemapslider" to your map.apps 4 app.
2. Add basemaps to your app.

### Configuration sample

If you have more than one basemap, you can configure the basemap group id

````json
"dn_basemapslider": {
    "Config": {
        "basemapId": "basemap_slider",
        "autoplayEnabled": true,
        "autoplayInterval": 500,
        "autoplayOpacityIncrement": 0.5,
        "forceBasemapSelection": false,
        "widgetDisplayMode": "arrow" //arrow or default
    }
}
````

Basemap config:

````json
"map-init": {
    "Config": {
        "basemaps": [
            {
                "id": "basemaps",
                "title": "Basemap Group",
                "description": "This is a group of basemaps",
                "selected": true,
                "basemap": {
                    "type": "GROUP",
                    "layers": [
                        {
                            "id": "18",
                            "title": "2018",
                            "description": "This basemap shows the satellite picture of 2018",
                            "type": "AGS_TILED",
                            "url": "https://maps.kreis-borken.de/image/rest/services/HiGr_Luftbilder/Luftbilder_Sommer_18_20/MapServer"
                        },
                        {
                            "id": "15",
                            "title": "2015",
                            "description": "This basemap shows the satellite picture of 2015",
                            "type": "AGS_TILED",
                            "url": "https://maps.kreis-borken.de/image/rest/services/HiGr_Luftbilder/Luftbilder_Sommer_2015/MapServer"
                        },
                        {
                            "id": "12",
                            "title": "2012",
                            "description": "This basemap shows the satellite picture of 2012",
                            "type": "AGS_TILED",
                            "url": "https://maps.kreis-borken.de/image/rest/services/HiGr_Luftbilder/Luftbilder_Sommer_2012/MapServer"
                        },
                        {
                            "id": "09",
                            "title": "2009",
                            "description": "This basemap shows the satellite picture of 2009",
                            "type": "AGS_TILED",
                            "url": "https://maps.kreis-borken.de/image/rest/services/HiGr_Luftbilder/Luftbilder_Sommer_2009/MapServer"
                        },
                        {
                            "id": "06",
                            "title": "2006",
                            "description": "This basemap shows the satellite picture of 2006",
                            "type": "AGS_TILED",
                            "url": "https://maps.kreis-borken.de/image/rest/services/HiGr_Luftbilder/Luftbilder_Sommer_05_06/MapServer"
                        },
                        {
                            "id": "00",
                            "title": "2000",
                            "description": "This basemap shows the satellite picture of 2000",
                            "type": "AGS_TILED",
                            "url": "https://maps.kreis-borken.de/image/rest/services/HiGr_Luftbilder/Luftbilder_Sommer_00_02/MapServer"
                        },
                        {
                            "id": "95",
                            "title": "1995",
                            "description": "This basemap shows the satellite picture of 1995",
                            "type": "AGS_TILED",
                            "url": "https://maps.kreis-borken.de/image/rest/services/HiGr_Luftbilder/Luftbilder_Sommer_95_97/MapServer"
                        },
                        {
                            "id": "82",
                            "title": "1982",
                            "description": "This basemap shows the satellite picture of 1982",
                            "type": "AGS_TILED",
                            "url": "https://maps.kreis-borken.de/image/rest/services/HiGr_Luftbilder/Luftbilder_Sommer_88_93/MapServer"
                        }
                    ]
                }
            }
        ]
    }
}
````
