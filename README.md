# cityverve-carpark-map

This is a ReactJS component demo using the CityVerve Carpark API together with Google Maps

Click [here](https://cityverve.org.uk/what-is-cityverve/) to learn more about CityVerve.

Click [here](http://developer.cityverve.org.uk/) to go to the CityVerve Developer Portal.

Click [here](http://developer.cityverve.org.uk/showcase) to see a showcase of working CityVerve apps (including this demo).

Click [here](https://developers.google.com/maps/) to go to the Google Maps developer portal.

## Instructions

You need to make **two modifications** on App.js first:

### CityVerve API Key

At the top of the App.js file, you will find the following line of code:

```javascript
const TOKEN = 'YOUR-CITYVERVE-TOKEN-HERE';
```

You need to replace the string **YOUR-CITYVERVE-TOKEN-HERE** with your own personal _CityVerve API key_. You can get a key (for free) at [Developer Portal](http://developer.cityverve.org.uk/home). Just follow the steps in [Getting Started](http://developer.cityverve.org.uk/get-started) guide.

### Google Maps API Key

At the top of the App.js file, you will find the following line of code:

```javascript
const GMAPSKEY = 'YOUR-GOOGLEMAPS-KEY-HERE';
```

You need to replace the string **YOUR-GOOGLEMAPS-KEY-HERE** with your own personal _Google Maps API key_. You can get a key (for free) at the [Google Maps Developer Portal](https://developers.google.com/maps/).

After cloning the repo, you can use **yarn start** on CLI to get a dev instance running on your machine.

In order to build the distro use **yarn build**, after that you can copy the **build** folder to any webserver.

Yarn/Webpack assumes the project will be hosted on server root, if that's the not the case please update package.json with a proper "homepage" key.

[create-react-app](https://github.com/facebook/create-react-app) boilerplate is used to build this app. You can check the repo README for further instructions.
