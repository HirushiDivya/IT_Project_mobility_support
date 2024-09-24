import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function EditRequest() {
    const location = useLocation();
    const navigate = useNavigate();
    const { id } = useParams(); // Get the passed request ID

    const [formData, setFormData] = useState({
        elderId: '',
        requests: '',
    });
    
    const [loading, setLoading] = useState(true); // Track loading state
    const [error, setError] = useState(''); // Track errors
    const [success, setSuccess] = useState(false); // Track success

    // Fetch the request data based on the ID
    useEffect(() => {
        const fetchRequest = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/request/get/${id}`);
                if (response.status === 200) {
                    setFormData(response.data); // Set form data with fetched data
                    setLoading(false);
                }
            } catch (error) {
                setError("Error fetching the request.");
                setLoading(false);
            }
        };

        fetchRequest();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Clear any previous errors
        setSuccess(false); // Reset success state

        try {
            const response = await axios.put(`http://localhost:3000/request/update/${id}`, formData);
            if (response.status === 200) {
                setSuccess(true); // Show success message
                setTimeout(() => {
                    navigate('/rall'); // Navigate to AllRequest page after a short delay
                }, 1500);
            }
        } catch (error) {
            setError('Error updating the request. Please try again.');
        }
    };

    return (
        <div className="container">
            <h1>Edit Request</h1>

            {loading ? (
                <p>Loading request data...</p>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Elder ID:</label>
                        <input
                            type="text"
                            name="elderId"
                            value={formData.elderId}
                            onChange={handleChange}
                            readOnly // Keep this field read-only
                        />
                    </div>

                    <div>
                        <label>Request:</label>
                        <input
                            type="text"
                            name="requests"
                            value={formData.requests}
                            onChange={handleChange}
                            required // Make this field required
                        />
                    </div>

                    <button type="submit">Update</button>

                    {/* Display error or success messages */}
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    {success && <p style={{ color: 'green' }}>Request updated successfully!</p>}
                </form>
            )}
        </div>
    );
}
