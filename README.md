## Netlify deploy

### [Deploy](https://main--incandescent-biscochitos-eae617.netlify.app/)

## Considerations

In this project several decisions were made to take into account

- The distance between the two airports is drawn using a geodesic line and also using the best driving path.
- The Haversine formula is used to calculate the distance between the two airports using their longitude and latitude.
- Both autocomplete search by airport name and later by iaca code.
- The only API used besides Maps Javascript API, is to get the list of all airports in the US. This list is the one used in the autocompletes.
- To communicate with the API to get the airports, it is necessary to use a proxy to avoid CORS errors. The project has the development and production proxy already enabled.

## Environment Variables

To run this project you need three environment variables inside an `.env` file to be placed under the `root` folder of the project.

### `REACT_APP_API_ID`

Api id needed to call the api to get the airports from [flightstats by Cirium](https://developer.flightstats.com/)

### `REACT_APP_API_KEY`

Api key needed to call the api to get the airports from [flightstats by Cirium](https://developer.flightstats.com/)

### `REACT_APP_GOOGLE_API`

Google api key needed to display and interact with [Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/overview)

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm lint`

Lint all the files under `src` folder and apply autofix when possible
