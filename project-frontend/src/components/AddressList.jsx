import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AddressList = () => {
    const [addresses, setAddresses] = useState([]);

    useEffect(() => {
        const fetchAddresses = async () => {
            const response = await axios.get('http://localhost:5000/api/addresses');
            setAddresses(response.data);
        };
        fetchAddresses();
    }, []);

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:5000/api/addresses/${id}`);
        setAddresses(addresses.filter((address) => address.id !== id));
    };

    return (
        <div>
            <h2>Saved Addresses</h2>
            <ul>
                {addresses.map((addr) => (
                    <li key={addr.id}>
                        {addr.house}, {addr.area} ({addr.category})
                        <button onClick={() => handleDelete(addr.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AddressList;
