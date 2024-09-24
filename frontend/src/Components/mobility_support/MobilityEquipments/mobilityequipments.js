import React from "react";
import { useNavigate } from "react-router-dom";

export default function Mobilityequipments() {
    const navigate = useNavigate(); // Initialize useNavigate

    const handleAddEquipmntButtonClick = () => {
        navigate("/addequipmnts"); // Navigate to Add Equipment page
    };

    const handleAllEquipmntButtonClick = () => {
        navigate("/allequipments"); // Navigate to All Equipment page
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
            <h1 style={styles.title}>Mobility Equipments</h1>
            <div style={styles.buttonContainer}>
                <button
                    style={styles.button}
                    className="btn btn-primary"
                    onClick={handleAddEquipmntButtonClick}
                >
                    Add new Equipment
                </button>

                <button
                    style={styles.button}
                    className="btn btn-primary"
                    onClick={handleAllEquipmntButtonClick}
                >
                    All Equipment
                </button>
            </div>
        </div>
    );
}
