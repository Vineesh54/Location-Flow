let addresses = []; // In-memory storage for addresses

// Get all addresses
const getAddresses = (req, res) => {
    res.status(200).json(addresses);
};

// Add a new address
const addAddress = (req, res) => {
    const { house, area, category, address, location } = req.body;
    const newAddress = {
        id: addresses.length + 1,
        house,
        area,
        category,
        address,
        location,
    };
    addresses.push(newAddress);
    res.status(201).json(newAddress);
};

// Update an existing address
const updateAddress = (req, res) => {
    const { id } = req.params;
    const index = addresses.findIndex((addr) => addr.id === parseInt(id));

    if (index === -1) {
        return res.status(404).json({ message: 'Address not found' });
    }

    addresses[index] = { ...addresses[index], ...req.body };
    res.status(200).json(addresses[index]);
};

// Delete an address
const deleteAddress = (req, res) => {
    const { id } = req.params;
    const index = addresses.findIndex((addr) => addr.id === parseInt(id));

    if (index === -1) {
        return res.status(404).json({ message: 'Address not found' });
    }

    addresses.splice(index, 1);
    res.status(200).json({ message: 'Address deleted successfully' });
};

module.exports = { getAddresses, addAddress, updateAddress, deleteAddress };
