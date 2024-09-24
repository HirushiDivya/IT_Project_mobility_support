import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function EditEquipments(){
    const { id } = useParams();
  const navigate = useNavigate();
  
  const [namee, setElderId] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [phone_number, setPhone_number] = useState("");
  const [email, setEmail] = useState("");

    return(
        <div>
            <h1>eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeef</h1>
        </div>
    )

}