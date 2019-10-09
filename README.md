# Basemap Slider Bundle
The Basemap Slider Bundle provides a widget that allows you to fade between different basemaps.

## Sample App
https://demos.conterra.de/mapapps/resources/apps/downloads_basemapslider/index.html

![Screenshot Sample App Basemap Slider](https://github.com/conterra/mapapps-basemap-slider/blob/master/screenshot.PNG)

## Installation Guide
**Requirement: map.apps 4.3.0**

1. Add the bundle "dn_basemapslider" to your map.apps 4 app
2. Add a group of basemaps to your basemap config in app.json

```
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
                            "id": "15",
                            "title": "2015",
                            "description": "This basemap showes the satellite picture of 2015",
                            "type": "AGS_TILED",
                            "url": "https://kartendienste.kreis-borken.de/arcgis/rest/services/Geobasisdaten/Geobasisdaten_Luftbilder_Sommer_2015_Kreis_Borken/MapServer"
                        },
                        {
                            "id": "12",
                            "title": "2012",
                            "description": "This basemap showes the satellite picture of 2012",
                            "type": "AGS_TILED",
                            "url": "https://kartendienste.kreis-borken.de/arcgis/rest/services/Geobasisdaten/Geobasisdaten_Luftbilder_Sommer_2012_Kreis_Borken/MapServer"
                        },
                        {
                            "id": "09",
                            "title": "2009",
                            "description": "This basemap showes the satellite picture of 2009",
                            "type": "AGS_TILED",
                            "url": "https://kartendienste.kreis-borken.de/arcgis/rest/services/Geobasisdaten/Geobasisdaten_Luftbilder_Sommer_2009_Kreis_Borken/MapServer"
                        },
                        {
                            "id": "06",
                            "title": "2006",
                            "description": "This basemap showes the satellite picture of 2006",
                            "type": "AGS_TILED",
                            "url": "https://kartendienste.kreis-borken.de/arcgis/rest/services/Geobasisdaten/Geobasisdaten_Luftbilder_Sommer_05_06_Kreis_Borken/MapServer"
                        },
                        {
                            "id": "00",
                            "title": "2000",
                            "description": "This basemap showes the satellite picture of 2000",
                            "type": "AGS_TILED",
                            "url": "https://kartendienste.kreis-borken.de/arcgis/rest/services/Geobasisdaten/Geobasisdaten_Luftbilder_Sommer_00_02_Kreis_Borken/MapServer"
                        },
                        {
                            "id": "95",
                            "title": "1995",
                            "description": "This basemap showes the satellite picture of 1995",
                            "type": "AGS_TILED",
                            "url": "https://kartendienste.kreis-borken.de/arcgis/rest/services/Geobasisdaten/Geobasisdaten_Luftbilder_Sommer_95_97_Kreis_Borken/MapServer"
                        },
                        {
                            "id": "82",
                            "title": "1982",
                            "description": "This basemap showes the satellite picture of 1982",
                            "type": "AGS_TILED",
                            "url": "https://kartendienste.kreis-borken.de/arcgis/rest/services/Geobasisdaten/Geobasisdaten_Luftbilder_Sommer_82_87_Kreis_Borken/MapServer"
                        }
                    ]
                }
            }
        ],
        "map": {
            ...
        },
        "view": {
            ...
        }
    }
}
```

## Development Guide
### Define the mapapps remote base
Before you can run the project you have to define the mapapps.remote.base property in the pom.xml-file:
`<mapapps.remote.base>http://%YOURSERVER%/ct-mapapps-webapp-%VERSION%</mapapps.remote.base>`

### Other methods to to define the mapapps.remote.base property.
1. Goal parameters
`mvn install -Dmapapps.remote.base=http://%YOURSERVER%/ct-mapapps-webapp-%VERSION%`

2. Build properties
Change the mapapps.remote.base in the build.properties file and run:
`mvn install -Denv=dev -Dlocal.configfile=%ABSOLUTEPATHTOPROJECTROOT%/build.properties`
