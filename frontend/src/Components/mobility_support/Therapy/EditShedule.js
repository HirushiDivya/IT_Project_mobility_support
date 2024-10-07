import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { validateElderId, validatePhoneNumber, validateNIC, validateDate, validateTime } from './../Validation/SheduleValidation';
export default function EditShedule() {  
  const { id } = useParams();
  const navigate = useNavigate();

  const [elderId, setElderId] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [phone_number, setPhone_number] = useState("");
  const [email, setEmail] = useState("");
  const [NIC, setNIC] = useState("");
  const [current_status, setCurrent_status] = useState("");
  const [current_physical_condition, setCurrent_physical_condition] = useState("");
  const [previous_therapy, setPrevious_therapy] = useState("");
  const [therapy_goal, setTherapy_goal] = useState("");
  const [date, setDate] = useState("");
  const [preffered_time, setPreffered_time] = useState("");
  const [frequency, setFrequency] = useState("");
  const [location, setLocation] = useState("");
  
  const [errors, setErrors] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:3000/shedule/get/${id}`).then((res) => {
      if (res.data.success) {
        const shedule = res.data.shedule;
        setElderId(shedule.elderId);
        setName(shedule.name);
        setAge(shedule.age);
        setPhone_number(shedule.phone_number);
        setEmail(shedule.email);
        setNIC(shedule.NIC);
        setCurrent_status(shedule.current_status);
        setCurrent_physical_condition(shedule.current_physical_condition);
        setPrevious_therapy(shedule.previous_therapy);
        setTherapy_goal(shedule.therapy_goal);
        setDate(shedule.date);
        setPreffered_time(shedule.preffered_time);
        setFrequency(shedule.frequency);
        setLocation(shedule.location);
      }
    });
  }, [id]);

  const validateForm = () => {
    const newErrors = {};
    newErrors.elderId = validateElderId(elderId);
    newErrors.phone_number = validatePhoneNumber(phone_number);
    newErrors.NIC = validateNIC(NIC);
    newErrors.date = validateDate(date);
    newErrors.preffered_time = validateTime(preffered_time);

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error !== null);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const updatedShedule = {
      elderId,
      name,
      age,
      phone_number,
      email,
      NIC,
      current_status,
      current_physical_condition,
      previous_therapy,
      therapy_goal,
      date,
      preffered_time,
      frequency,
      location,
    };

    axios.put(`http://localhost:3000/shedule/update/${id}`, updatedShedule)
      .then(() => {
        alert("Shedule Updated");
        navigate("/Therapy"); // Adjust this to the desired redirect path
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <div className="container" style={{ margin: "50px 0px 0px 50px", backgroundColor: "#9BA4BF", padding: "20px", borderRadius: "8px" }}>
      <form onSubmit={onSubmit}>
      <div className="row mb-3">
          <label htmlFor="elderId" className="col-sm-2 col-form-label">Elder Id</label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="elderId"
              placeholder="Enter Elder Id"
              value={elderId}
              onChange={(e) => setElderId(e.target.value)}
            />
            {errors.elderId && <small className="text-danger">{errors.elderId}</small>}
          </div>
        </div>

        <div className="row mb-3">
          <label htmlFor="name" className="col-sm-2 col-form-label">Name</label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>

        <div className="row mb-3">
          <label htmlFor="age" className="col-sm-2 col-form-label">Age</label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="age"
              placeholder="Enter Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
        </div>

        <div className="row mb-3">
          <label htmlFor="phone_number" className="col-sm-2 col-form-label">Phone Number</label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="phone_number"
              placeholder="Enter Phone Number"
              value={phone_number}
              onChange={(e) => setPhone_number(e.target.value)}
            />
            {errors.phone_number && <small className="text-danger">{errors.phone_number}</small>}
          </div>
        </div>

        <div className="row mb-3">
          <label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
          <div className="col-sm-10">
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div className="row mb-3">
          <label htmlFor="NIC" className="col-sm-2 col-form-label">NIC</label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="NIC"
              placeholder="Enter NIC"
              value={NIC}
              onChange={(e) => setNIC(e.target.value)}
            />
            {errors.NIC && <small className="text-danger">{errors.NIC}</small>}
          </div>
        </div>

        <div className="row mb-3">
          <label htmlFor="current_status" className="col-sm-2 col-form-label">Current Status</label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="current_status"
              placeholder="Enter Current Status"
              value={current_status}
              onChange={(e) => setCurrent_status(e.target.value)}
            />
          </div>
        </div>

        <div className="row mb-3">
          <label htmlFor="current_physical_condition" className="col-sm-2 col-form-label">Current Physical Condition</label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="current_physical_condition"
              placeholder="Enter Current Physical Condition"
              value={current_physical_condition}
              onChange={(e) => setCurrent_physical_condition(e.target.value)}
            />
          </div>
        </div>

        <div className="row mb-3">
          <label htmlFor="previous_therapy" className="col-sm-2 col-form-label">Previous Therapy</label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="previous_therapy"
              placeholder="Enter Previous Therapy"
              value={previous_therapy}
              onChange={(e) => setPrevious_therapy(e.target.value)}
            />
          </div>
        </div>

        <div className="row mb-3">
          <label htmlFor="therapy_goal" className="col-sm-2 col-form-label">Therapy Goal</label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="therapy_goal"
              placeholder="Enter Therapy Goal"
              value={therapy_goal}
              onChange={(e) => setTherapy_goal(e.target.value)}
            />
          </div>
        </div>

        <div className="row mb-3">
          <label htmlFor="date" className="col-sm-2 col-form-label">Date</label>
          <div className="col-sm-10">
            <input
              type="date"
              className="form-control"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            {errors.date && <small className="text-danger">{errors.date}</small>}
          </div>
        </div>

        <div className="row mb-3">
          <label htmlFor="preffered_time" className="col-sm-2 col-form-label">Preferred Time</label>
          <div className="col-sm-10">
            <input
              type="time"
              className="form-control"
              id="preffered_time"
              value={preffered_time}
              onChange={(e) => setPreffered_time(e.target.value)}
            />
            {errors.preffered_time && <small className="text-danger">{errors.preffered_time}</small>}
          </div>
        </div>

        <div className="row mb-3">
          <label htmlFor="frequency" className="col-sm-2 col-form-label">Frequency</label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="frequency"
              placeholder="Enter Frequency"
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
            />
          </div>
        </div>

        <div className="row mb-3">
          <label htmlFor="location" className="col-sm-2 col-form-label">Location</label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="location"
              placeholder="Enter Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
        </div>
        <button type="submit" className="btn" style={{ backgroundColor: "#6B75FE", color: "#fff" }}>
          Update Shedule
        </button>
      </form>
    </div>
  );
}

