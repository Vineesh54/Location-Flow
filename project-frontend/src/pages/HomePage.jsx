import React from 'react';
import MapComponent from '../components/MapComponent';

const HomePage = ({ savedAddresses, setSavedAddresses }) => {
    return (
        <div>
            <h1>Home Page</h1>
            <MapComponent savedAddresses={savedAddresses} setSavedAddresses={setSavedAddresses} />
        </div>
    );
};

export default HomePage;
