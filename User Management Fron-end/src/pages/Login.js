import React, { useState } from 'react'
import { Dropdown, DropdownButton } from 'react-bootstrap';
import axios from 'axios'
const BASE_URL = process.env.REACT_APP_SERVER_URL

function Login() {
  const [userType, setValue] = useState("customer")
  const [showSignup, setShowSignup] = useState(false)
  const [message, setMessage] = useState("")


  const toggleSignup=()=>{
    setShowSignup(!showSignup)
  }
  const handleSelect=(e)=>{
    setValue(e)
  }

  const signupFn=(e)=>{
    const username=document.getElementById('username').value
    const userId=document.getElementById('userId').value
    const email=document.getElementById('email').value
    const password=document.getElementById('password').value
    const data={
      username:username,
      userId:userId,
      email:email,
      userType:userType,
      password:password
    }
    e.preventDefault();
    console.log(data)
    console.log(BASE_URL)
    axios.post(BASE_URL+'/cointab/signup/',data)
    .then(response=>{
      if(response.status===201 || response.status==200){
        window.location.href="/"
      }
    })
    .catch(err=>{
   
      if(err.response && err.response.request.status===500 || err.response.status==500)
      setMessage(err.response.data.message)
      else
      console.log(err)
    })
  }

  const signUpContent = () => {
    return (
        <div>
            <h4 className="text-center">Signup</h4><br/>
            <form  onSubmit={signupFn}>
                <div>
                    <input type="text" className="form-control" placeholder="User Id" id="userId" required />
                </div><br/>

                <div>
                    <input type="text" className="form-control" placeholder="Username" id="username" required />
                </div><br/>
                <div>
                <input type="email" className="form-control" placeholder="Email"  id="email" required />
                </div><br/>
                <div className="input-group">
                    <input type="password" className="form-control" placeholder="Password" id="password" required />
                </div><br/>

                <div className="input-group m-1">
                    <span className="text-muted my-2 mx-2"> User Type</span>
                    <DropdownButton
                        align="end"
                     title={userType}
                        id="userType"
                      onSelect={handleSelect}
                        variant="light"
                        className="mx-1"
                    >
                        <Dropdown.Item eventKey="CUSTOMER">CUSTOMER</Dropdown.Item>
                        <Dropdown.Item eventKey="ADMIN">ADMIN</Dropdown.Item>
                    </DropdownButton>
                </div><br/>

                <div className="input-group m-1">
                    <input type="submit" className="form-control btn btn-primary m-1" value="Sign up" />
                </div><br/>
                <div className="signup-btn text-center text-info" onClick={toggleSignup} >Already have an Account ? Login</div><br/>
                <div className="auth-error-msg text-danger text-center"></div>
            </form>
        </div>
    )
}

const loginFn=(e)=>{
  const email=document.getElementById("email").value
  const password=document.getElementById("password").value
  const data={
    "email":email,
    "password":password
  }
  e.preventDefault();
  axios.post(BASE_URL+'/cointab/signin/',data)
  .then(response=>{
    if(response.status===200 || response.status==201){
      if(response.data.message){
        console.log(response.data)
        setMessage(response.data.message)
      }else{
        console.log(response.data)
        localStorage.setItem('username',response.data.username)
        localStorage.setItem('userId',response.data.userId)
        localStorage.setItem('email',response.data.email)
        localStorage.setItem('userType',response.data.userType)
        localStorage.setItem('token',response.data.token)
        if(response.data.userType==='CUSTOMER'){
          window.location.href='/customer'
        }
        else {
          window.location.href='/admin'
        }
      }
    }
  })
  .catch(error=>{
    if(error.request.status==400 || error.request.status==401 || error.request.status==403)
    setMessage(error.response.data.message)
    else
    console.log(error)
  })


}



const loginContent = () => {
  return (
      <div >
          <h4 className="text-center">Login</h4><br/>
          <form  onSubmit={loginFn}>
              <div className="input-group m-1">
                  <input type="email" className="form-control" placeholder="Enter Email" id="email" required />
              </div><br></br>
              <div className="input-group m-1">
                  <input type="password" className="form-control" placeholder="Password" id="password" required />
              </div><br></br>

              <div className="input-group m-1">
                  <input type="submit" className="form-control btn btn-primary"  />
              </div><br></br>
              <div className="signup-btn text-center  text-info" onClick={toggleSignup} >Dont have an Account ? Signup</div><br/>
              <div className="auth-error-msg text-danger text-center">{message}</div>
          </form>
      </div>
  )
}


return(
  <div id='loginPage'>
    <div id='loginPage' className='bg-info d-flex justify-content-center align-items-center vh-100'>
      <div className='card m-5 p-5'>
        <div className='row m-2 '>
          <div className='col'>
            {
              showSignup
              ?signUpContent()
              :loginContent()
            }
          </div>
        </div>
      </div>
    </div>
  </div>
)


}

export default Login;