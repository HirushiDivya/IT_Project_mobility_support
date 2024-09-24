import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function ViewShedule() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [shedule, setShedule] = useState({});
  
  useEffect(() => {
    axios.get(`http://localhost:3000/shedule/get/${id}`).then((res) => {
      if (res.data.success) {
        setShedule(res.data.shedule);
      } else {
        // Handle error if needed
        alert("Error fetching schedule");
      }
    }).catch(err => {
      console.error(err);
      alert("Error fetching schedule");
    });
  }, [id]);

  const handleDelete = () => {
    axios.delete(`http://localhost:3000/shedule/delete/${id}`).then((res) => {
      if (res.data.success) {
        // Navigate to a different page or show a success message
        navigate("/Therapy"); // Replace with your route to the list of schedules
      } else {
        // Handle the error
        alert("Error deleting schedule");
      }
    }).catch(err => {
      console.error(err);
      alert("Error deleting schedule");
    });
  };

  return (
    <div className="container" style={{ margin: "50px 0px 0px 50px" }}>
      <div className="row mb-3">
        <label className="col-sm-2 col-form-label">Elder Id</label>
        <div className="col-sm-10">
          <p className="form-control-plaintext">{shedule.elderId}</p>
        </div>
      </div>

      <div className="row mb-3">
        <label className="col-sm-2 col-form-label">Name</label>
        <div className="col-sm-10">
          <p className="form-control-plaintext">{shedule.name}</p>
        </div>
      </div>

      <div className="row mb-3">
        <label className="col-sm-2 col-form-label">Age</label>
        <div className="col-sm-10">
          <p className="form-control-plaintext">{shedule.age}</p>
        </div>
      </div>

      <div className="row mb-3">
        <label className="col-sm-2 col-form-label">Phone Number</label>
        <div className="col-sm-10">
          <p className="form-control-plaintext">{shedule.phone_number}</p>
        </div>
      </div>

      <div className="row mb-3">
        <label className="col-sm-2 col-form-label">Email</label>
        <div className="col-sm-10">
          <p className="form-control-plaintext">{shedule.email}</p>
        </div>
      </div>

      <div className="row mb-3">
        <label className="col-sm-2 col-form-label">NIC</label>
        <div className="col-sm-10">
          <p className="form-control-plaintext">{shedule.nIC}</p>
        </div>
      </div>

      <div className="row mb-3">
        <label className="col-sm-2 col-form-label">Current Status</label>
        <div className="col-sm-10">
          <p className="form-control-plaintext">{shedule.current_Status}</p>
        </div>
      </div>

      <div className="row mb-3">
        <label className="col-sm-2 col-form-label">Current Physical Condition</label>
        <div className="col-sm-10">
          <p className="form-control-plaintext">{shedule.current_Physical_Condition}</p>
        </div>
      </div>

      <div className="row mb-3">
        <label className="col-sm-2 col-form-label">Previous Therapy</label>
        <div className="col-sm-10">
          <p className="form-control-plaintext">{shedule.previous_Therapy}</p>
        </div>
      </div>

      <div className="row mb-3">
        <label className="col-sm-2 col-form-label">Therapy Goal</label>
        <div className="col-sm-10">
          <p className="form-control-plaintext">{shedule.therapy_Goal}</p>
        </div>
      </div>

      <div className="row mb-3">
        <label className="col-sm-2 col-form-label">Date</label>
        <div className="col-sm-10">
          <p className="form-control-plaintext">{shedule.date}</p>
        </div>
      </div>

      <div className="row mb-3">
        <label className="col-sm-2 col-form-label">Preferred Time</label>
        <div className="col-sm-10">
          <p className="form-control-plaintext">{shedule.preferred_Time}</p>
        </div>
      </div>

      <div className="row mb-3">
        <label className="col-sm-2 col-form-label">Frequency</label>
        <div className="col-sm-10">
          <p className="form-control-plaintext">{shedule.frequency}</p>
        </div>
      </div>

      <div className="row mb-3">
        <label className="col-sm-2 col-form-label">Location</label>
        <div className="col-sm-10">
          <p className="form-control-plaintext">{shedule.location}</p>
        </div>
      </div>

      <div className="row mb-3">
        <label className="col-sm-2 col-form-label">Therapist Preference</label>
        <div className="col-sm-10">
          <p className="form-control-plaintext">{shedule.therapist_Preference}</p>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-sm-10 offset-sm-2">
          <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </div>
  );
}
