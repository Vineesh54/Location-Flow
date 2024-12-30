import React, { useState } from 'react';

const ManageAddresses = ({ savedAddresses, setSavedAddresses }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [editIndex, setEditIndex] = useState(null); // Index of the address being edited
    const [editFormData, setEditFormData] = useState({
        house: '',
        area: '',
        category: 'Home',
        address: '',
        location: { lat: 0, lng: 0 },
    });

    // Filter saved addresses based on the search query
    const filteredAddresses = savedAddresses.filter((address) =>
        address.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        address.house.toLowerCase().includes(searchQuery.toLowerCase()) ||
        address.area.toLowerCase().includes(searchQuery.toLowerCase()) ||
        address.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Delete an address
    const handleDelete = (index) => {
        const updatedAddresses = [...savedAddresses];
        updatedAddresses.splice(index, 1);
        setSavedAddresses(updatedAddresses);
    };

    // Handle form input changes for editing
    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setEditFormData({ ...editFormData, [name]: value });
    };

    // Open the edit form for the selected address
    const handleEdit = (index) => {
        setEditIndex(index);
        setEditFormData({ ...savedAddresses[index] });
    };

    // Save the updated address
    const handleSaveEdit = () => {
        const updatedAddresses = [...savedAddresses];
        updatedAddresses[editIndex] = editFormData;
        setSavedAddresses(updatedAddresses);
        setEditIndex(null); // Exit edit mode
    };

    return (
        <div>
            <div style={{ marginBottom: '20px' }}>
                <input
                    type="text"
                    placeholder="Search addresses"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                        width: '100%',
                        padding: '10px',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                    }}
                />
            </div>

            {editIndex !== null ? (
                <div style={{ marginBottom: '20px' }}>
                    <h3>Edit Address</h3>
                    <input
                        type="text"
                        name="house"
                        placeholder="House/Flat/Block No."
                        value={editFormData.house}
                        onChange={handleEditInputChange}
                        style={{
                            width: '100%',
                            marginBottom: '10px',
                            padding: '10px',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                        }}
                    />
                    <input
                        type="text"
                        name="area"
                        placeholder="Apartment/Road/Area"
                        value={editFormData.area}
                        onChange={handleEditInputChange}
                        style={{
                            width: '100%',
                            marginBottom: '10px',
                            padding: '10px',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                        }}
                    />
                    <select
                        name="category"
                        value={editFormData.category}
                        onChange={handleEditInputChange}
                        style={{
                            width: '100%',
                            marginBottom: '10px',
                            padding: '10px',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                        }}
                    >
                        <option value="Home">Home</option>
                        <option value="Office">Office</option>
                        <option value="Friends">Friends & Family</option>
                    </select>
                    <button
                        onClick={handleSaveEdit}
                        style={{
                            padding: '10px 20px',
                            backgroundColor: 'green',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            marginRight: '10px',
                        }}
                    >
                        Save
                    </button>
                    <button
                        onClick={() => setEditIndex(null)}
                        style={{
                            padding: '10px 20px',
                            backgroundColor: 'red',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                        }}
                    >
                        Cancel
                    </button>
                </div>
            ) : (
                <ul>
                    {filteredAddresses.map((address, index) => (
                        <li
                            key={index}
                            style={{
                                marginBottom: '10px',
                                listStyleType: 'none',
                                padding: '10px',
                                border: '1px solid #ccc',
                                borderRadius: '4px',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}
                        >
                            <div>
                                <strong>{address.category}</strong>: {address.house}, {address.area}, {address.address}
                                (Lat: {address.location.lat}, Lng: {address.location.lng})
                            </div>
                            <div>
                                <button
                                    onClick={() => handleEdit(index)}
                                    style={{
                                        marginRight: '10px',
                                        padding: '5px 10px',
                                        backgroundColor: 'blue',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                    }}
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(index)}
                                    style={{
                                        padding: '5px 10px',
                                        backgroundColor: 'red',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                    }}
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
            {filteredAddresses.length === 0 && <p>No addresses found.</p>}
        </div>
    );
};

export default ManageAddresses;
