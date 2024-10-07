import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'; // Import axios for making requests
import jsPDF from 'jspdf'; // Import jsPDF for generating PDF
import 'jspdf-autotable'; // Import jsPDF AutoTable plugin for table formatting

export default function All_Shedule() {
    const [shedules, setshedules] = useState([]); // Original shedules
    const [filteredShedules, setFilteredShedules] = useState([]); // For filtered schedules
    const [searchTerm, setSearchTerm] = useState(""); // For search input
    const [isFocused, setIsFocused] = useState(false); // To track search bar focus
    const navigate = useNavigate();

    // Fetch shedules from backend
    const fetchShedules = async () => {
        try {
            const response = await axios.get('http://localhost:3000/shedule'); // Adjust the endpoint as needed
            setshedules(response.data);
            setFilteredShedules(response.data);
        } catch (error) {
            console.error("Error fetching shedules:", error);
        }
    };

    // Fetch all shedules on component mount
    useEffect(() => {
        fetchShedules();
    }, []);

    // Handle search input change
    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchTerm(value);

        // Filter shedules based on the search term
        const filtered = shedules.filter((shedule) => {
            const phoneNumber = String(shedule.phone_number || ''); // Convert to string or empty string if undefined

            return (
                (shedule.elderId && shedule.elderId.toLowerCase().includes(value)) || // Search by ElderId
                (shedule.name && shedule.name.toLowerCase().includes(value)) ||
                phoneNumber.includes(value) || // Check phoneNumber
                (shedule.date && new Date(shedule.date).toLocaleDateString().toLowerCase().includes(value)) || // For date
                (shedule.time && shedule.time.toLowerCase().includes(value)) // For time
            );
        });

        setFilteredShedules(filtered); // Update filtered shedules
    };

    const handleView = (id) => {
        navigate(`/mngeprof/${id}`);
    };

    // Generate PDF Report
    const generatePDF = () => {
        const doc = new jsPDF();

        // Set report title
        doc.setFontSize(22); // Increased font size for the title
        doc.text('Therapy Sessions Report', 14, 22);

        // Define table columns
        const tableColumns = [
            { header: 'ElderId', dataKey: 'elderId' },
            { header: 'Name', dataKey: 'name' },
        ];

        // Format data for PDF generation
        const tableData = filteredShedules.map((shedule) => ({
            elderId: shedule.elderId || '',
            name: shedule.name || '',
        }));

        // Generate table and handle pagination
        doc.autoTable({
            columns: tableColumns,
            body: tableData,
            startY: 30, // Start position below the title
            theme: 'grid', // Table theme (can be 'striped', 'grid', 'plain')
            styles: {
                fontSize: 8, // Increased font size for table content
                cellPadding: 3 // Adjusted padding within table cells for clarity
            },
            headStyles: {
                fontSize: 4, // Increased font size for table headers
                fillColor: [0, 0, 0], // Black header background
                textColor: [255, 255, 255] // White text for the header
            },
            margin: { top: 25 },
            didDrawPage: (data) => {
                // Add header for each page
                doc.setFontSize(22);
                doc.text('Therapy Sessions Report', 14, 22);
            }
        });

        // Save the PDF
        doc.save('therapy_sessions_report.pdf');
    };

    return (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
            {/* Header */}
            <h1 style={{ marginBottom: '1rem' }}>All Therapy Sessions</h1>

            {/* Search form */}
            <form 
                onSubmit={(e) => e.preventDefault()} 
                style={{
                    display: 'flex', 
                    justifyContent: 'center', 
                    marginBottom: '1.5rem'
                }}
            >
                <div 
                    style={{
                        position: 'relative',
                        width: isFocused ? '400px' : '200px',
                        transition: 'width 0.3s ease-in-out',
                    }}
                >
                    <input
                        type="text"
                        placeholder="Search "
                        value={searchTerm}
                        onChange={handleSearch}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        style={{
                            width: '100%',
                            padding: '0.5rem',
                            borderRadius: '20px',
                            border: '1px solid #ccc',
                            outline: 'none',
                        }}
                    />
                    <button 
                        type="submit" 
                        style={{
                            position: 'absolute',
                            right: '0.5rem',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            padding: '0',
                        }}
                    >
                        <FontAwesomeIcon 
                            icon={faSearch} 
                            style={{ color: '#333', fontSize: '1.2rem' }} 
                        />
                    </button>
                </div>
            </form>

            {/* Display all therapy sessions */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <table className="table" style={{ margin: '0 auto', width: '80%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            <th style={{ padding: '10px', borderBottom: '2px solid #ccc' }}>ElderId</th>
                            <th style={{ padding: '10px', borderBottom: '2px solid #ccc' }}>Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredShedules.length > 0 ? (
                            filteredShedules.map((shedule) => (
                                <tr key={shedule._id}>
                                    <td style={{ padding: '8px', borderBottom: '1px solid #ccc' }}>{shedule.elderId}</td>
                                    <td style={{ padding: '8px', borderBottom: '1px solid #ccc' }}>{shedule.name}</td>
                                    <td>
                                        <button onClick={() => handleView(shedule._id)}>View</button>
                                    </td>
                                </tr>
                            )) 
                        ) : ( 
                            <tr>
                                <td colSpan="3" style={{ padding: '8px', textAlign: 'center' }}>No therapy sessions found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Button to generate PDF */}
            <button onClick={generatePDF} style={{ margin: '1rem auto', display: 'block' }}>
                Download Report
            </button>
        </div>
    );
}



