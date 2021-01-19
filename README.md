# Basemap Slider Bundle

The Basemap Slider Bundle provides a widget that allows you to fade between different basemaps.

## Sample App

https://demos.conterra.de/mapapps/resources/apps/downloads_basemapslider/index.html

![Screenshot Sample App Basemap Slider](https://github.com/conterra/mapapps-basemap-slider/blob/master/screenshot.JPG)

## Installation Guide

**Requirement: map.apps 4.3.0**

[dn_basemapslider Documentation](https://github.com/conterra/mapapps-selection-actions/tree/master/src/main/js/bundles/dn_basemapslider)

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

