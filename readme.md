# Your Travel Planner

*Capstone project for the Udacity Front End Web Developer Nanodegree Program*

A simple web application that allows to build a list of trip destinations. For each destination 
current and forecasted weather data is presented.

The project demonstrates:
- building a frontend using HTML, CSS and JavaScript
- building a backend system with Node.js
- webpack toolchain configuration
- integration with API providers such as Geonames, Weatherbit and Pixabay
- testing with Jest
- mocking external APIs during test
- adding frontend offline capability using the workbox service worker library

## Screencasts

Using the app:

https://user-images.githubusercontent.com/28823321/135898169-a1e35526-e51b-4f67-ac0c-a7e8a10a154e.mov

Responsive user interface design:

https://user-images.githubusercontent.com/28823321/135898324-5df9868c-3a0f-4499-b67d-7c55b3ecbdee.mov

Offline capabilities:

https://user-images.githubusercontent.com/28823321/135766839-feb2fc26-0a02-490d-bd79-29c02934a64d.mov

## Project installation

Run the following commands to clone and run the project. All commands are for the 
Windows 10 operating system:

```shell
git clone https://github.com/SophonAlpha/Udacity-FEND-Project-Capstone-Travel-App.git
cd Udacity-FEND-Project-Capstone-Travel-App
npm install
```

Build the project for production mode:

```shell
npm run build-prod
```

Start the application with the local Node.js server:

```shell
npm run start
```

This will start the local Node.js server and automatically open the application in your web browser.

Build the project for development mode:

```shell
npm run build-dev
```

Run the tests:

```shell
npm run test
```

To start the application on the webpack DevServer:

```shell
npm run dev
```

To start the application on the local Node.js server for development:

```shell
npm run node-dev
```

## Appendix - Resources used during the project:

- [Geonames API](https://www.geonames.org)
- [Weatherbit API](https://www.weatherbit.io/api)
- [Pixabay API](https://pixabay.com/service/about/api/)
- [Icons8](https://icons8.com/)
- [Luxon](https://moment.github.io/luxon/index.html#/)
- [Weather icons](http://erikflowers.github.io/weather-icons)
- [Build A PWA With Webpack And Workbox](https://nkracademy.com/build-a-pwa-with-webpack-and-workbox/)
