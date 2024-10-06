import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import './../Styles.css'; // Update the path based on your file structure


export default function ViewShedule() {
  const { id } = useParams();
  const [shedule, setShedule] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:3000/shedule/get/${id}`).then((res) => {
      if (res.data.success) {
        setShedule(res.data.shedule);
      }
    });
  }, [id]);

  const renderDetail = (label, value) => (
    <div className="row mb-3">
      <label className="col-sm-4 col-form-label">{label}</label>
      <div className="col-sm-8">
        <p className="form-control-plaintext">{value || '-'}</p>
      </div>
    </div>
  );

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ height: "110vh" }}>
      <div className="w-75">
        {renderDetail("Elder Id", shedule.elderId)}
        {renderDetail("Name", shedule.name)}
        {renderDetail("Age", shedule.age)}
        {renderDetail("Phone Number", shedule.phone_number)}
        {renderDetail("Email", shedule.email)}
        {renderDetail("NIC", shedule.NIC)}
        {renderDetail("Current Status", shedule.current_status)}
        {renderDetail("Current Physical Condition", shedule.current_physical_condition)}
        {renderDetail("Previous Therapy", shedule.previous_therapy)}
        {renderDetail("Therapy Goal", shedule.therapy_goal)}
        {renderDetail("Date", shedule.date)}
        {renderDetail("Preferred Time", shedule.preferred_time)}
        {renderDetail("Frequency", shedule.frequency)}
        {renderDetail("Location", shedule.location)}
      </div>
    </div>
  );
}
