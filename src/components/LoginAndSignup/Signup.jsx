import { createUserWithEmailAndPassword } from 'firebase/auth';
import React from 'react'
import { useState } from 'react'
import {toast} from 'react-hot-toast'
import { auth } from '../../firebase/firebase';
import { setDoc,doc } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
const Signup = () => {
  const [FName,setFname] = useState("");
  const [LName,setLname] = useState("");
  const [email,setemail] = useState("");
  const [pass,setpassword] = useState("");
  const handleRegister = async (e) =>{
    e.preventDefault();
    try {
        await createUserWithEmailAndPassword(auth,email,pass)
        const user = auth.currentUser;
        if(user){
          await setDoc(doc(db,"Users",user.uid),{
            email:user.email,
            firstName:FName,
            lastName:LName
          });
          toast.success("User Register Successfully !")
        }
        setFname('')
        setLname('')
        setemail('')
        setpassword('')
    } catch (error) {
        alert(error)
    }
  }
  return (
    <div className='SignupDiv'>
    <form className='SignupForm' onSubmit={handleRegister}>
      <h1>Please SingUp Here!!</h1>
      <div className="form-group-signup">
        <label htmlFor="Faname">First Name:</label>
        <input type="text" name="FName" id="Faname"
         value={FName} onChange={(e)=>{setFname(e.target.value)}}
          placeholder='First Name' required />
      </div>
      <div className="form-group-signup">
        <label htmlFor="Laname">Last Name:</label>
        <input type="text" name="LName" id="Laname" 
        value={LName} onChange={(e)=>{setLname(e.target.value)}} 
        placeholder='Last Name' required />
      </div>
      <div className="form-group-signup">
        <label htmlFor="em">Email:</label>
        <input type="email" name="email" placeholder='Email' id="em" value={email} onChange={(e)=>{setemail(e.target.value)}} required />
      </div>
      <div className="form-group-signup">
        <label htmlFor="pass">Password:</label>
        <input type="password" name="pass" id="pass" value={pass} onChange={(e)=>{setpassword(e.target.value)}} placeholder='Password' required />
      </div>
      <button
       >Submit</button>
    </form>
  </div>
  )
}

export default Signup