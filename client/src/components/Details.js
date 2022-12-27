import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import WorkIcon from '@mui/icons-material/Work';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { NavLink, useParams, useHistory } from 'react-router-dom';


const Details = () => {

    const [getuserdata, setUserdata] = useState([]);
    console.log(getuserdata);

    const { id } = useParams("");
    console.log(id);

    const history = useHistory();


    const getdata = async () => {

        const res = await fetch(`http://localhost:8003/getuser/${id}`, {
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
            console.log("get data");
        }
    }

    useEffect(() => {
        getdata();
    }, [])

    

    return (
        <div className="container mt-3">
            <h1 style={{ fontWeight: 400 }}>View</h1>

            <Card sx={{ maxWidth: 600 }}>
                <CardContent>
                    
                    <div className="row">
                        <div className="left_view col-lg-6 col-md-6 col-12">
                            <img src="/profile.png" style={{ width: 50 }} alt="profile" />
                            <h3 className="mt-3">First Name: <span >{getuserdata.firstname}</span></h3>
                            {getuserdata.middlename && <h3 className="mt-3">Middle Name: <span >{getuserdata.middlename}</span></h3>}
                            <h3 className="mt-3">Last Name: <span >{getuserdata.lastname}</span></h3>
                            <p className="mt-3"><MailOutlineIcon />Email: <span>{getuserdata.email}</span></p>
                            
                        </div>
                        <div className="right_view  col-lg-6 col-md-6 col-12">
                        <p className="mt-3">Role: <span>{getuserdata.role}</span></p>
                            <p className="mt-5"><WorkIcon />Deprtment: <span> {getuserdata.department}</span></p>
                            <p className="mt-3"><LocationOnIcon />Created Time: <span>{getuserdata.createdTime}</span></p>
                            
                        </div>
                    </div>

                </CardContent>
            </Card>
        </div>
    )
}

export default Details
