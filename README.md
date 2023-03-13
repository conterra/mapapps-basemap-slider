# Basemap Slider Bundle

The Basemap Slider Bundle provides a widget that allows you to fade between different basemaps.

## Sample App

https://demos.conterra.de/mapapps/resources/apps/downloads_basemapslider/index.html
# mapapps-remote-project-blueprint

![Screenshot Sample App Basemap Slider](https://github.com/conterra/mapapps-basemap-slider/blob/master/screenshot.JPG)
**This project is not intended for use by non-con terra users.** It is designed for the creation of bundles and their releases in GitHub and can access con terra internal infrastructures for this purpose. To develop your own map.apps bundles, use the [mapapps-4-developers project](https://github.com/conterra/mapapps-4-developers).

## Installation Guide
## Build

**Requirement: map.apps 4.3.0**
![example workflow](https://github.com/conterra/mapapps-remote-project-blueprint/actions/workflows/devnet-bundle-snapshot.yml/badge.svg)

[dn_basemapslider Documentation](https://github.com/conterra/mapapps-basemap-slider/tree/master/src/main/js/bundles/dn_basemapslider)
## Requirements

## Development Guide
### Define the mapapps remote base
Before you can run the project you have to define the mapapps.remote.base property in the pom.xml-file:
`<mapapps.remote.base>http://%YOURSERVER%/ct-mapapps-webapp-%VERSION%</mapapps.remote.base>`
-   map.apps 4.13.1
-   All resources from `map.apps-VERSION/sdk/m2-repository` need to be copied manually to your local Maven repository (e.g. `%UserProfile%/.m2/repository` for Windows, `~/.m2/repository` for MacOS).

### Other methods to to define the mapapps.remote.base property.
1. Goal parameters
   `mvn install -Dmapapps.remote.base=http://%YOURSERVER%/ct-mapapps-webapp-%VERSION%`
## More Information

2. Build properties
   Change the mapapps.remote.base in the build.properties file and run:
   `mvn install -Denv=dev -Dlocal.configfile=%ABSOLUTEPATHTOPROJECTROOT%/build.properties`

The project is always based on the latest version of the [mapapps-4-developers Project](https://github.com/conterra/mapapps-4-developers).

