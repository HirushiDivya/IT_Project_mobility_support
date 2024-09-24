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
        {renderDetail("NIC", shedule.nIC)}
        {renderDetail("Current Status", shedule.current_Status)}
        {renderDetail("Current Physical Condition", shedule.current_Physical_Condition)}
        {renderDetail("Previous Therapy", shedule.previous_Therapy)}
        {renderDetail("Therapy Goal", shedule.therapy_Goal)}
        {renderDetail("Date", shedule.date)}
        {renderDetail("Preferred Time", shedule.preferred_Time)}
        {renderDetail("Frequency", shedule.frequency)}
        {renderDetail("Location", shedule.location)}
        {renderDetail("Therapist Preference", shedule.therapist_Preference)}
      </div>
    </div>
  );
}
