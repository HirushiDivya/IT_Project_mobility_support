import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 

export default function MobilityReqest(){

    const navigate = useNavigate(); // Initialize useNavigate

    const handleAddButtonClick = () => {
        navigate("/radd"); // Navigate to AddShedule page
    };

    const handleAllSheduleButtonClick = () => {
        navigate("/rall"); // Navigate to All Schedules page
    };

    // Inline styles for the component
    const styles = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start', // Align items at the top
            height: '100vh',
            paddingTop: '20px' // Optional: add some space from the top edge
        },
        title: {
            marginBottom: '20px'
        },
        buttonContainer: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '10px' // Space between buttons
        },
        button: {
            width: '200px' // Set a fixed width for buttons
        }
    };


    return (
        <div style={styles.container}>
        <h1 style={{ textAlign: 'center', margin: '20px 0' }}>Mobility Requests</h1>

            <div style={styles.buttonContainer}>
                <button
                    style={styles.button}
                    className="btn btn-primary"
                    onClick={handleAddButtonClick}
                >
                    Add Request
                </button>

                <button
                    style={styles.button}
                    className="btn btn-primary"
                    onClick={handleAllSheduleButtonClick}
                >
                    View All Requests
                </button>

            </div>
        </div>
    );


    
}