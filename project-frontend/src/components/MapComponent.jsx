import React, { useState } from 'react';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';

const mapContainerStyle = { width: '100%', height: '400px' };
const defaultCenter = { lat: 17.361564, lng: 78.47466 }; // Default center (San Francisco)

const MapComponent = ({ savedAddresses, setSavedAddresses }) => {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    });

    const [marker, setMarker] = useState(defaultCenter);
    const [map, setMap] = useState(null);
    const [currentAddress, setCurrentAddress] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [formData, setFormData] = useState({
        house: '',
        area: '',
        category: 'Home',
    });

    // Fetch address from coordinates using Geocoding API
    const fetchAddress = async (lat, lng) => {
        try {
            const response = await fetch(
                `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
            );
            const data = await response.json();
            if (data.results && data.results.length > 0) {
                setCurrentAddress(data.results[0].formatted_address);
            } else {
                setCurrentAddress('Address not found');
            }
        } catch (error) {
            console.error('Error fetching address:', error);
            setCurrentAddress('Unable to fetch address');
        }
    };

    // Handle map click to update marker and fetch address
    const handleMapClick = (event) => {
        const { lat, lng } = event.latLng.toJSON();
        setMarker({ lat, lng });
        fetchAddress(lat, lng);
    };

    // Locate the user's current position
    const locateMe = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    const newCenter = { lat: latitude, lng: longitude };
                    setMarker(newCenter);
                    fetchAddress(latitude, longitude);
                    map.panTo(newCenter); // Center the map on the user's location
                },
                (error) => {
                    console.error('Geolocation error:', error.message);
                    alert('Unable to retrieve location. Please enable location services.');
                }
            );
        } else {
            alert('Geolocation is not supported by this browser.');
        }
    };

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Open modal to add additional address details
    const saveAddress = () => {
        if (!currentAddress) {
            alert('Please select a location on the map.');
            return;
        }
        setModalVisible(true);
    };

    // Save address with additional details
    const handleSaveDetails = () => {
        const newAddress = {
            address: currentAddress,
            location: marker,
            ...formData,
        };
        setSavedAddresses([...savedAddresses, newAddress]);
        setModalVisible(false);
        resetForm();
    };

    // Reset form data
    const resetForm = () => {
        setFormData({ house: '', area: '', category: 'Home' });
    };

    if (!isLoaded) return <div>Loading...</div>;

    return (
        <div>
            <div style={{ marginBottom: '10px' }}>
                <button onClick={locateMe} style={{ marginRight: '10px' }}>
                    Locate Me
                </button>
                <button onClick={saveAddress}>Save Address</button>
            </div>
            <div style={{ marginBottom: '10px' }}>
                <strong>Current Address: </strong> {currentAddress || 'No address selected'}
            </div>
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={10}
                center={marker}
                onClick={handleMapClick}
                onLoad={(mapInstance) => setMap(mapInstance)}
            >
                <Marker position={marker} />
            </GoogleMap>

            {/* Modal for Adding Address Details */}
            {modalVisible && (
                <div className="modal">
                    <h3>Add Address Details</h3>
                    <input
                        type="text"
                        name="house"
                        placeholder="House/Flat/Block No."
                        value={formData.house}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="text"
                        name="area"
                        placeholder="Apartment/Road/Area"
                        value={formData.area}
                        onChange={handleInputChange}
                        required
                    />
                    <div>
                        <label>
                            <input
                                type="radio"
                                name="category"
                                value="Home"
                                checked={formData.category === 'Home'}
                                onChange={handleInputChange}
                            />
                            Home
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="category"
                                value="Office"
                                checked={formData.category === 'Office'}
                                onChange={handleInputChange}
                            />
                            Office
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="category"
                                value="Friends"
                                checked={formData.category === 'Friends'}
                                onChange={handleInputChange}
                            />
                            Friends & Family
                        </label>
                    </div>
                    <button onClick={handleSaveDetails}>Save</button>
                    <button onClick={() => setModalVisible(false)}>Cancel</button>
                </div>
            )}

            {/* Display Saved Addresses */}
            <div style={{ marginTop: '20px' }}>
                <h3>Saved Addresses</h3>
                <ul>
                    {savedAddresses.map((address, index) => (
                        <li key={index}>
                            <strong>{address.category}</strong>: {address.house}, {address.area}, {address.address}
                            (Lat: {address.location.lat}, Lng: {address.location.lng})
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default MapComponent;
