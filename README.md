# CandorHub Web

## Introduction

Candorhub is an image-sharing site built with React and Redux. It consumes JSON data from a RESTful Rails API. Users can upload images, comment on images, and view galleries of images. Comments are validated by basic sentiment analysis logic to prevent submission of overly negative or trollish comments.

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
