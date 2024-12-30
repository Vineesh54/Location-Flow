import React from 'react';
import ManageAddresses from '../components/ManageAddresses';

const ManagePage = ({ savedAddresses, setSavedAddresses }) => {
    return (
        <div>
            <h1>Manage Saved Addresses</h1>
            <ManageAddresses savedAddresses={savedAddresses} setSavedAddresses={setSavedAddresses} />
        </div>
    );
};

export default ManagePage;
