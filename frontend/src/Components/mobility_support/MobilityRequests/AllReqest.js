import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default function AllRequest() {
    const [requirement, setRequirement] = useState([]);
    const [filteredRequirement, setFilteredRequirement] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const navigate = useNavigate();
    
    // Fetching requirements data
    useEffect(() => {
        const getRequirement = async () => {
            try {
                const response = await fetch("http://localhost:3000/request");
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                console.log(data);
                setRequirement(data);
                setFilteredRequirement(data); // Set filtered data initially to all
            } catch (err) {
                console.error("Error fetching requirement:", err.message);
            }
        };
        getRequirement();
    }, []);

    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchTerm(value);

        const filtered = requirement.filter(req => 
            (req.elderId && req.elderId.toLowerCase().includes(value)) || // Search in elderId
            (req.requests && req.requests.toLowerCase().includes(value))  // Search in requests
        );
        setFilteredRequirement(filtered);
    };

    // Generate PDF report
    const generatePDF = () => {
        const doc = new jsPDF();

        // Set report title
        doc.setFontSize(18);
        doc.text('Elder Requirements Report', 14, 22);

        // Define table columns
        const tableColumns = [
            { header: 'Elder ID', dataKey: 'elderId' },
            { header: 'Requirement', dataKey: 'requests' },
        ];

        // Prepare data for the table
        const tableData = filteredRequirement.map((req) => ({
            elderId: req.elderId || '',
            requests: req.requests || '',
        }));

        // Generate the table with pagination
        doc.autoTable({
            columns: tableColumns,
            body: tableData,
            startY: 30, 
            theme: 'grid',
            styles: {
                fontSize: 10,
                cellPadding: 2
            },
            headStyles: {
                fillColor: [0, 0, 0],
                textColor: [255, 255, 255]
            },
        });

        // Save the PDF
        doc.save('elder_requirements_report.pdf');
    };

    // Navigate to RemoveRequest page
    const handleRemoveRequest = (id) => {
        navigate(`/rremove/${id}`, { state: { requestId: id } });  // Passing requestId if needed
    };

     // Navigate to EditRequest page
     const handleEdit = (id) => {
        navigate(`/redit/${id}`); // Navigate to the edit page with the request ID
    };  

    return (
        <div className="container">
            {/* Header */}
            <h1 style={{ textAlign: 'center', marginBottom: '1rem' }}>All Requirements</h1>

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
                        placeholder="Search"
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

            {/* Table to display requirements */}
            <table className="table" style={{ margin: '0 auto' }}>
                <thead>
                    <tr>
                        <th>Elder Id</th>
                        <th>Requirement</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredRequirement.length > 0 ? (
                        filteredRequirement.map((Requirement) => (
                            <tr key={Requirement._id}>
                                <td>{Requirement.elderId}</td>
                                <td>{Requirement.requests}</td>
                                <td>
                                    {/* Edit Request Button */}

                                    {/* Edit Request Button */}
                                    <button 
                                        onClick={() => handleEdit(Requirement._id)}
                                        style={{
                                            padding: '0.3rem 0.8rem',
                                            borderRadius: '5px',
                                            backgroundColor: '#6B75FE',
                                            color: 'white',
                                            border: 'none',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        Edit
                                    </button>


                                    {/* Remove Request Button */}
                                    <button 
                                        onClick={() => handleRemoveRequest(Requirement._id)}
                                        
                                        style={{
                                            padding: '0.3rem 0.8rem',
                                            borderRadius: '5px',
                                            backgroundColor: '#6B75FE',
                                            color: 'white',
                                            border: 'none',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        Remove Request
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3">No requirements found</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Button to generate PDF */}
            <button 
                onClick={generatePDF} 
                style={{ marginTop: '1rem', padding: '0.5rem 1rem' }}
            >
                Generate Report
            </button>
        </div>
    );
}
