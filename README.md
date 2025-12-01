[![devnet-bundle-snapshot](https://github.com/conterra/mapapps-basemap-slider/actions/workflows/devnet-bundle-snapshot.yml/badge.svg)](https://github.com/conterra/mapapps-basemap-slider/actions/workflows/devnet-bundle-snapshot.yml)
![Static Badge](https://img.shields.io/badge/requires_map.apps-4.20.0-e5e5e5?labelColor=%233E464F&logoColor=%23e5e5e5)
![Static Badge](https://img.shields.io/badge/tested_for_map.apps-4.20.0-%20?labelColor=%233E464F&color=%232FC050)
# Basemap Slider Bundle

The Basemap Slider Bundle provides a widget that allows you to fade between different basemaps.

## Sample App

https://demos.conterra.de/mapapps/resources/apps/public_demo_basemapslider/index.html
# mapapps-remote-project-blueprint

![Screenshot Sample App Basemap Slider](https://github.com/conterra/mapapps-basemap-slider/blob/main/screenshot.png)
**This project is not intended for use by non-con terra users.** It is designed for the creation of bundles and their releases in GitHub and can access con terra internal infrastructures for this purpose. To develop your own map.apps bundles, use the [mapapps-4-developers project](https://github.com/conterra/mapapps-4-developers).

[dn_basemapslider Documentation](https://github.com/conterra/mapapps-basemap-slider/tree/master/src/main/js/bundles/dn_basemapslider)
## Requirements

## Quick start

Clone this project and ensure that you have all required dependencies installed correctly (see [Documentation](https://docs.conterra.de/en/mapapps/latest/developersguide/getting-started/set-up-development-environment.html)).

Then run the following commands from the project root directory to start a local development server:

```bash
# install all required node modules
$ mvn initialize

# start dev server
$ mvn compile -Denv=dev -Pinclude-mapapps-deps

# run unit tests
$ mvn test -P run-js-tests,include-mapapps-deps
```

