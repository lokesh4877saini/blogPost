import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState} from 'react'
import {useNavigate} from 'react-router-dom'
import { auth } from '../../firebase/firebase';
const Login = () => {
  const navigate = useNavigate();
  const [email,setEmail] = useState("");
  const [pass,setPassword] = useState("");
  const handlLogin= async (e) =>{
    e.preventDefault();
    try{
      await signInWithEmailAndPassword(auth,email,pass);
      // console.log("user Logged in Successfully")
        // window.location.href = '/BlogPost'   
        setEmail('');
        setPassword('');
        navigate('/BlogPost')  
    }catch(e){
      alert("Please Enter valid Details")
      setEmail('');
      setPassword('');
    }
  }
  return (
    <div className='SignupDiv'>
      <form className='SignupForm' onSubmit={handlLogin}>
        <h1>Please Login Continue!!</h1>
        <div className="form-group-signup">
          <label htmlFor="em">Email:</label>
          <input type="email" name="email" value={email} onChange={(e=>setEmail(e.target.value))} id="em" required placeholder='your email' />
        </div>
        <div className="form-group-signup">
          <label htmlFor="pass">Password:</label>
          <input type="password" name="pass" value={pass} onChange={e=>setPassword(e.target.value)}  id="pass" required  placeholder='your password'/>
        </div>
        <button>submit</button>
      </form>
    </div>
  )
}

export default Login