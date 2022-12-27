import React, { useContext, useEffect, useState } from 'react'
import { NavLink, useParams,useHistory } from 'react-router-dom'
import { updatedata } from './context/ContextProvider'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';


const Edit = () => {

    const datetime=new Date();
   const {updata, setUPdata} = useContext(updatedata)
   let { user } = useParams([]);
    console.log(user,typeof(user));
    user=user.split(",")
    for( let i=0;i<user.length;i++){
        console.log(user[i])
    }
    

    const history = useHistory("");
    const [role,setrole]=useState("client")
    const handleChange = (event) => {
        setrole(event.target.value);
        console.log(role)
      };

    const [inpval, setINP] = useState({
        firstname: "",
        middlename:"",
        lastname:"",
        email: "",
        password: "",
        department: "",
        
        updatedTime:"",
    })

    const setdata = (e) => {
        console.log(e.target.value);
        const { name, value } = e.target;
        setINP((preval) => {
            return {
                ...preval,
                [name]: value
            }
        })
    }


    const { id } = useParams("");
    console.log(id);



    const getdata = async () => {

        const res = await fetch(`http://localhost:8003/getuser/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await res.json();
        console.log(data,"getuser id");
        // console.log(data.age)

        if (res.status === 422 || !data) {
            console.log("error ");

        } else {
            data.updatedTime=datetime.toString();
            setINP(data)
            setrole(data.role)
            console.log(role)
            console.log("get data");

        }
    }

    useEffect(() => {
        getdata();
    }, []);


    const updateuser = async(e)=>{
        e.preventDefault();
        console.log(inpval)

        const {firstname,middlename,lastname, email, password,department,updatedTime} = inpval;

        const res2 = await fetch(`http://localhost:8003/updateuser/${id}`,{
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                firstname,middlename,lastname, email, password,department,updatedTime
            })
        });

        const data2 = await res2.json();
        console.log(data2);

        if(res2.status === 422 || !data2){
            alert("fill the data");
        }else{
            history.push("/")
            setUPdata(data2);
        }

    }

    return (
        <div className="container">
            
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
                        <input type="password" value={inpval.password}  name="password" class="form-control" id="exampleInputPassword1" />
                    </div>
                    
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputPassword1" class="form-label">Department</label>
                        <input type="text" value={inpval.department} onChange={setdata} name="department" class="form-control" id="exampleInputPassword1" />
                    </div>
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                    <FormControl>
                        <FormLabel id="demo-row-radio-buttons-group-label">Role</FormLabel>
                        <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group" value={role} onChange={handleChange} >
                        {user[0] && <FormControlLabel value="client" control={<Radio />} label="Client" />}
                            {user[1] && <FormControlLabel value="admin" control={<Radio />} label="Admin" />}
                            </RadioGroup>
                    </FormControl>
                    </div>

                    <button type="submit" onClick={updateuser} class="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default Edit;





