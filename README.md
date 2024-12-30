# Frontend UI

## Home Page

#### `Locate Me` will change the marker to your current location.

![Screenshot (107)](https://github.com/user-attachments/assets/4c73b5f8-f573-45a9-b6ef-3f4402beb959)

#### `Save Address` will ask you for the category, House/Flat/Block No and Apartment/Road/Area.

![Screenshot (108)](https://github.com/user-attachments/assets/a788fc89-3abb-4224-a782-2c6d60b3f746)

## Addresses Page

#### You can search, edit and delete addresses here.

![Screenshot (109)](https://github.com/user-attachments/assets/da86afbc-4f01-4624-a0e5-06de24d85ef5)

![Screenshot (110)](https://github.com/user-attachments/assets/a193a92e-9538-4561-8362-ff23566e4ecb)


<br/><br/>


# Installation and Execution

## Backend

```
cd project-backend
npm install
```

The backend will run on `http://localhost:5000`. If it's already in use, update the `PORT` value in `.env` file. Run the server.

```
node server.js
```

## Frontend

```
cd project-frontend
npm install
```

In the given `.env` file, replace `your_api_key` with your actual Google Maps API key. Ensure the required APIs (e.g. Maps JavaScript API, Geocoding API) are enabled in the Google Cloud Console.

```
REACT_APP_GOOGLE_MAPS_API_KEY=your_api_key # Replace with your actual key
```

Start the Frontend Development Server. The frontend will run on `http://localhost:3000`.

```
npm start
```
