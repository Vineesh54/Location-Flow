import React, { useState } from 'react';
import axios from 'axios';

const AddressForm = ({ selectedLocation }) => {
    const [formData, setFormData] = useState({
        house: '',
        area: '',
        category: 'Home',
    });

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const address = { ...formData, location: selectedLocation };
        await axios.post('http://localhost:5000/api/addresses', address);
        alert('Address saved!');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="house" placeholder="House/Flat/Block No." onChange={handleChange} required />
            <input type="text" name="area" placeholder="Apartment/Road/Area" onChange={handleChange} required />
            <select name="category" onChange={handleChange}>
                <option value="Home">Home</option>
                <option value="Office">Office</option>
                <option value="Friends">Friends & Family</option>
            </select>
            <button type="submit">Save Address</button>
        </form>
    );
};

export default AddressForm;
