import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ManagePage from './pages/ManagePage';

const App = () => {
    const [savedAddresses, setSavedAddresses] = useState([]); // Shared state for addresses

    return (
        <Router>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/manage">Manage Addresses</Link>
                    </li>
                </ul>
            </nav>
            <Routes>
                <Route
                    path="/"
                    element={<HomePage savedAddresses={savedAddresses} setSavedAddresses={setSavedAddresses} />}
                />
                <Route
                    path="/manage"
                    element={<ManagePage savedAddresses={savedAddresses} setSavedAddresses={setSavedAddresses} />}
                />
            </Routes>
        </Router>
    );
};

export default App;
