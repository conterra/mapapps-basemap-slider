# Basemap Slider Bundle
The Basemap Slider Bundle provides a widget that allows you to fade between different basemaps.

Sample App
------------------
https://demos.conterra.de/mapapps/resources/apps/downloads_basemapslider/index.html

![Screenshot Sample App Basemap Slider](https://github.com/conterra/mapapps-basemap-slider/blob/master/screenshot.PNG)

Installation Guide
------------------
**Requirement: map.apps 4.3.0**

Simply add the bundle "dn_basemapslider" to your map.apps 4 app and load the baselayer in the order you want them to be displayed.
To show the baselayers in the mapflow add: 

    "dn_basemapslider":{
      "BasemapSliderModel":{
        "showInMapflow": true
      }
    },
to your app.json

Development Guide
------------------
### Pre Conditions
This project requires an existing installation of map.apps to work. You need top copy the libs provided in the CD-Contents folder "m2repository" inside your local maven repository.

Development Guide
------------------
### Define the mapapps remote base
Before you can run the project you have to define the mapapps.remote.base property in the pom.xml-file:
`<mapapps.remote.base>http://%YOURSERVER%/ct-mapapps-webapp-%VERSION%</mapapps.remote.base>`

##### Other methods to to define the mapapps.remote.base property.
1. Goal parameters
`mvn install -Dmapapps.remote.base=http://%YOURSERVER%/ct-mapapps-webapp-%VERSION%`

2. Build properties
Change the mapapps.remote.base in the build.properties file and run:
`mvn install -Denv=dev -Dlocal.configfile=%ABSOLUTEPATHTOPROJECTROOT%/build.properties`