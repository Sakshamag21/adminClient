import React, { useContext, useState } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { adddata } from './context/ContextProvider';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useParams } from 'react-router-dom';

const Register = () => {

    const { udata, setUdata } = useContext(adddata);

    const history = useHistory();
    let { user } = useParams([]);
    console.log(user,typeof(user));
    user=user.split(",")
    for( let i=0;i<user.length;i++){
        console.log(user[i])
    }
    const datetime=new Date();
     

    
    const [inpval, setINP] = useState({
        firstname: "",
        middlename:"",
        lastname:"",
        email: "",
        password: "",
        department: "",
        createdTime:datetime.toString(),
    })
    const [role,setrole]=useState("user")
    const handleChange = (event) => {
        setrole(event.target.value);
        console.log(role)
      };

    const setdata = (e) => {
        console.log(e.target);
        const { name, value } = e.target;
        setINP((preval) => {
            console.log(inpval)
            return {
                ...preval,
                [name]: value
            }
        })
    }


    const addinpdata = async (e) => {
        e.preventDefault();

        const { firstname,middlename,lastname, email, password,department,createdTime } = inpval;
        console.log(role)
        console.log(password.length)
        if (password.length<=12 && password.length>=6){

        const res = await fetch("http://localhost:8003/register1", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                firstname,middlename,lastname, email, password,role,department,createdTime
            })
        });

        const data = await res.json();
        console.log(data);

        if (res.status === 422 || !data) {
            console.log("error ");
            alert("error");

        } else {
            history.push("/")
            setUdata(data)
            console.log("data added");

        }
        }else{
            window.alert("Password must be between length 6 to 12")
            // console.log("password error")
        }}

    return (<>
        
        <div className="container">
            {/* <NavLink to="/">home</NavLink> */}
            <form className="mt-4">
                <div className="row">
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputEmail1" class="form-label" >First Name</label>
                        <input type="text" value={inpval.firstname} onChange={setdata} name="firstname" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputPassword1" class="form-label">Middle Name</label>
                        <input type="text" value={inpval.middlename} onChange={setdata} name="middlename" class="form-control" id="exampleInputPassword1" />
                    </div>
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputPassword1" class="form-label">Last Name</label>
                        <input type="text" value={inpval.lastname} onChange={setdata} name="lastname" class="form-control" id="exampleInputPassword1" />
                    </div>
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputPassword1" class="form-label">Email</label>
                        <input type="email" value={inpval.email} onChange={setdata} name="email" class="form-control" id="exampleInputPassword1" />
                    </div>
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputPassword1" class="form-label">Password</label>
                        <input type="text" value={inpval.password} onChange={setdata} name="password" class="form-control" id="exampleInputPassword1" />
                    </div>
                    
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputPassword1" class="form-label">Department</label>
                        <input type="text" value={inpval.department} onChange={setdata} name="department" class="form-control" id="exampleInputPassword1" />
                    </div>
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                    <FormControl>
                        <FormLabel id="demo-row-radio-buttons-group-label">Role</FormLabel>
                        <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group" value={role} onChange={handleChange} >
                            {user[0] && <FormControlLabel value="user" control={<Radio />} label="Admin" />}
                            {user[1] && <FormControlLabel value="admin" control={<Radio />} label="User" />}
                            
                        </RadioGroup>
                    </FormControl>
                    </div>

                    <button type="submit" onClick={addinpdata} class="btn btn-primary">Submit</button>
                </div>
            </form>
        </div></>
         )
}
export default Register;
