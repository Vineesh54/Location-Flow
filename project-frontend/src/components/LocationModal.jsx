import React from 'react';

const LocationModal = ({ onEnableLocation, onSearchManually }) => (
    <div className="modal">
        <h2>Enable Location</h2>
        <p>Location permission is turned off. Please enable it to continue.</p>
        <button onClick={onEnableLocation}>Enable Location</button>
        <button onClick={onSearchManually}>Search Manually</button>
    </div>
);

export default LocationModal;
