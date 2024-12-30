const express = require('express');
const {
    getAddresses,
    addAddress,
    updateAddress,
    deleteAddress,
} = require('../controllers/addressController');

const router = express.Router();

router.get('/', getAddresses);         // Get all addresses
router.post('/', addAddress);          // Add a new address
router.put('/:id', updateAddress);     // Update an existing address
router.delete('/:id', deleteAddress);  // Delete an address

module.exports = router;
