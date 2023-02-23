import React from 'react'

export default function Customer() {

    const userId = localStorage.getItem("userId");
    const username = localStorage.getItem('username')
    const email = localStorage.getItem('email')
    const userType = localStorage.getItem('userType')
    const logout=()=>{
        localStorage.clear();
        window.location.href="/"
    }
    console.log(userId, username)

    return (

        <div>
            <div className='row bg-light text-center p-5 '>
                <div className='row   dashboard '>
                    <h1 >User Dashboard</h1>
                    <div>
                    <table class="table table-borderless  text-center">
                        <thead>
                            <tr>
                                <th scope="col">User Id</th>
                                <th scope="col">Username</th>
                                <th scope="col">Email</th>
                                <th scope="col">UserType</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{userId}</td>
                                <td>{username}</td>
                                <td>{email}</td>
                                <td>{userType}</td>
                            </tr>

                        </tbody>
                    </table></div>
                    <div style={{
                        width:"100px",
                        padding:"20px",
                        margin:"30px",
                        alignItems:"left",

            
                        
                    }} className=" btn-group">
                        <button className='btn btn-lg btn-danger' onClick={logout}>Logout</button><br/>
                    </div>
                </div>

            </div>

        </div>

    )



}
