import React, { useState, useEffect, useContext } from 'react'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import CreateIcon from '@mui/icons-material/Create';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { NavLink } from 'react-router-dom';
import { adddata, deldata } from './context/ContextProvider';
import { updatedata } from './context/ContextProvider'
import Button from '@mui/material/Button';

// const datetime=new Date();
// const time=datetime.toString()
// const date=datetime.toTimeString()
const AdminPage=()=>{
    // console.log(time,date);
    const [getuserdata, setUserdata] = useState([]);
    const [datavisibility,setdatavisibility]=useState("");
    console.log(getuserdata)
    const getalldata = async () => {

        const res = await fetch("http://localhost:8003/getalldata", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await res.json();
        console.log(data);

        if (res.status === 422 || !data) {
            console.log("error ");

        } else {
            setUserdata(data)
            setdatavisibility("visible");
            console.log("get data");

        }
    }
    const getclientdata = async () => {

        const res = await fetch("http://localhost:8003/getclientdata", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await res.json();
        console.log(data);

        if (res.status === 422 || !data) {
            console.log("error ");

        } else {
            setUserdata(data)
            setdatavisibility("visible");
            console.log("get data");

        }
    }
    const getadmindata = async () => {

        const res = await fetch("http://localhost:8003/getadmindata", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await res.json();
        console.log(data);

        if (res.status === 422 || !data) {
            console.log("error ");

        } else {
            setUserdata(data)
            setdatavisibility("visible");
            console.log("get data");

        }
    }

    const user =["user","admin"];
    return(<>
    <NavLink to={`register/${user}`}> <Button variant="contained">Add user</Button></NavLink>

    {/* <Button variant="contained">Update admin</Button>
    <Button variant="contained">Update client</Button>*/}
    <Button variant="contained" onClick={getadmindata}>View admin</Button>
    <Button variant="contained" onClick={getclientdata}>View client</Button> 
    <Button variant="contained" onClick={getalldata}>View</Button>
    <div className="container">

    { datavisibility &&<table class="table" style={{textAlign:"center"}}>
                        <thead>
                            <tr className="table-dark">
                                <th scope="col">Serial No</th>
                                <th scope="col">First Name</th>
                                <th scope="col">Last Name</th>
                                <th scope="col">Role</th>
                                <th scope="col">Department</th>
                                <th scope="col">Email</th>
                                {/* <th scope="col">Job</th> */}

                                
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                getuserdata.map((element, id) => {
                                        if (element.firstname){
                                        return (
                                            <>
                                                <tr>
                                                    <th scope="row">{id + 1}</th>
                                                    <td>{element.firstname}</td>
                                                    <td>{element.lastname}</td>
                                                    <td>{element.role}</td>
                                                    <td>{element.department}</td>
                                                    <td>{element.email}</td>
                                                    <td className="d-flex justify-content-between">
                                                        <NavLink to={`view/${element._id}`}> <button className="btn btn-success"><RemoveRedEyeIcon /></button></NavLink>
                                                        <NavLink to={`edit/${element._id}/${user}`}>  <button className="btn btn-primary"><CreateIcon /></button></NavLink>
                                                        
                                                    </td>
                                                </tr>
                                            </>
                                        )}
                                    }
                                    
                                        
                                )
                            }
                        </tbody>
                    </table>}</div>
    </>)
}
export default AdminPage