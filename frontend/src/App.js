
import './App.css';
import Header from './Components/mobility_support/Header';
import Add_Shedule from './Components/mobility_support/Therapy/Add-Shedule';
import All_Shedule from './Components/mobility_support/Therapy/All_Shedule';
import TherapySession from './Components/mobility_support/Therapy/TherapySession';
import Home from "./Components/mobility_support/Therapy/Home";
import EditShedule from './Components/mobility_support/Therapy/EditShedule';
import ViewOne from './Components/mobility_support/Therapy/ViewOne';
import Update from './Components/mobility_support/Therapy/Update';
import Delete from './Components/mobility_support/Therapy/Delete';

import MobilityReqest from './Components/mobility_support/MobilityRequests/MobilityReqest';
import AddRequest from './Components/mobility_support/MobilityRequests/AddReqest';
import EditRequest from './Components/mobility_support/MobilityRequests/EditRequest';
import RemoveRequest from './Components/mobility_support/MobilityRequests/RemoveReqest';
import ViewOneRequest from './Components/mobility_support/MobilityRequests/ViewOneReqest';
import AllRequest from './Components/mobility_support/MobilityRequests/AllReqest';

import MobilityEquipments from './Components/mobility_support/MobilityEquipments/mobilityequipments';
import MobilityReport from './Components/mobility_support/MobilityProgressReport/mobilityreport';

import AddEquipments from './Components/mobility_support/MobilityEquipments/AddEquipments';
import AllEquipments from './Components/mobility_support/MobilityEquipments/AllEquipments';
import EditEquipments from './Components/mobility_support/MobilityEquipments/EditEquipments';
import Removee from './Components/mobility_support/MobilityEquipments/DeleteEquiipments';

import LogOut from './Components/mobility_support/logout';
import Profile from './Components/mobility_support/profile';
import Settings from './Components/mobility_support/settings';

import Elder from './Components/mobility_support/Elder';
import Overview from './Components/Overview ';
import ManageProfile from './Components/mobility_support/ManageProfile';

import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
//frontend\src\Components\mobility_support\AddShedule.js
function App() {
  return (
    <Router>
    <div>
      <Header/>
      <Routes>
      <Route path = "/radd" exact element = {<AddRequest />} />
      <Route path = "/rremove/:id" exact element = {<RemoveRequest />} />
      <Route path = "/redit/:id" exact element = {<EditRequest />} />
      <Route path = "/rviewone/:id" exact element = {<ViewOneRequest />} />
      <Route path = "/rall" exact element = {<AllRequest />} />
      <Route path = "/request" exact element = {<MobilityReqest />} />

        <Route path='/remequip/:id' exact element = {<Removee/>} />
        <Route path = "/allequipments" exact element = {<AllEquipments />} />
        <Route path = "/addequipmnts" exact element = {<AddEquipments />} />
        <Route path = "/report" exact element = {<MobilityReport />}/>
        <Route path = "/equipments" exact element = {<MobilityEquipments />}/>

        
        <Route path = "/deletee/:id" exact element = {<Delete />} />
        <Route path = "/Update" exact element = {<Update />} />
        <Route path = "/" exact element = {<Home/>} />
        <Route path = "/ViewOne/:id" exact element = {<ViewOne />} />
        <Route path = "/EditShedule/:id" exact element = {<EditShedule />} />
        <Route path = "/Home" exact element = {<Home/>} />
        
      <Route path="/alls" exact element = {<All_Shedule/>}  />
      <Route path="/Therapy" exact element = {<TherapySession/>} />
      <Route path="/add" exact element ={<Add_Shedule />} />
      <Route path="/settings" exact element ={<Settings />} />
      <Route path="/logout" exact element ={<LogOut />} />
      <Route path="/profile" exact element ={<Profile />} />
      <Route path="/eedit/:id" exact element ={<EditEquipments />} />

      <Route path="/Overview/" exact element ={<Overview/>} />
      <Route path="/elder" exact element ={<Elder/>} />
      <Route path ="/mngeprof/:id" exact element ={<ManageProfile/>} />
      </Routes>
    </div>
    </Router>
  );
}

export default App;
