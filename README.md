# s&box API Explorer

> A web interface for S&box's API

## Proxy API endpoints
The API endpoints that the proxy server uses are slightly different to the actual `apix.facepunch.com` ones.
- **Facepunch API URL** = **Proxy server URL**
- `/asset/get?id=coolasset` = `/asset/get/coolasset`
- `/asset/find?type=map` = `/asset/find/map`

## Running locally

*You must have **node 14** and [**firebase cli**](https://firebase.google.com/docs/cli#install_the_firebase_cli) installed to run the site.*

1. Clone this repository
2. Install website dependencies via `npm install` or `yarn`
3. Start the website with `npm start` or `yarn start`
4. When the website opens, navigate to the `dev` tab and click `[STORE] USE PROD URL` (this will use the production API, instad of having to run it locally)

## Bugs / Features
Feel free to make pull requests for any bugs / features you wish to make known.