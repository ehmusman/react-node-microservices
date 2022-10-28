import React, {useState} from 'react'
import Router from "next/router"
import useRequest from "../../hooks/useRequest"
const signup = () => {
  const [email, setEmail] = useState("")
  const [password, setPassowrd] = useState("")
  const {doRequest, errors} = useRequest({
    url: "/api/users/signup",
    method: "post",
    body: {email, password},
    onSuccess: () => Router.push("/")
  })
 const onSubmitSignupForm= async (e) =>{
  e.preventDefault()
  await doRequest()
 }
  return (
    <form onSubmit={onSubmitSignupForm}>
          <h1>Signup</h1>
          <div className='form-group'>
            <label htmlFor='email'>Email Address</label>
            <input 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
            id="email" type="text" className="form-control" />
          </div>
          <div className='form-group'>
              <label htmlFor='passowrd'>Password</label>
              <input 
            value={password} 
          onChange={e => setPassowrd(e.target.value)}
              type="password" id="password" className="form-control" />
          </div>
          {errors}
          <button className='btn btn-dark my-2'>Sign Up</button>
    </form>
  )
}

export default signup