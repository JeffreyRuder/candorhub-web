# CandorHub Web

## Introduction

[Candorhub](http://candorhub.com) is an image-sharing site built with React and Redux. It consumes JSON data from a RESTful Rails API. Images are base64 encoded for upload to AWS S3 and served from a Cloudfront CDN. Users can upload images with tags, comment on images, and view galleries of images. Comments are validated by basic sentiment analysis logic to prevent submission of overly negative or trollish comments.

## Technologies Used

* React
* Redux
* CSS and SASS
* redux-auth
* redux-router
* Masonry.js
* Material-UI for React (material design elements)

## Installation

Clone this repository then `npm install`.

## Run Tests

`npm run test`

## Run Development Server

`webpack-dev-server`

## Build Distribution Files

The `webpack.production.config` uses `trash-cli` to safely clean the `dist` directory.

`sudo npm install --global trash-cli`

Then use `npm run build` to create a production `bundle.js`.
