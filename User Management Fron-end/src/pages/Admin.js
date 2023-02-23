import axios from 'axios';
import React, { useEffect, useState } from 'react'
import MaterialTable from '@material-table/core'
import { Modal, Button } from 'react-bootstrap'
const BASE_URL = process.env.REACT_APP_SERVER_URL
const username = localStorage.getItem('username')

export default function Admin() {
  const [userList, setUserList] = useState([]);
  const [userDetail, setUserOne] = useState({})
  const [userModal, setModal] = useState(false)
  const [message, setMessage] = useState("")
  const [newUser, setnewUser] = useState({})
  const [newUserModal, setnewUserModal] = useState(true)

  const Logout=()=>{
    localStorage.clear();
    window.location.href="/"
  }

  // { Add new user into the reocrds}
  const addFn = function (e) {
    const username = document.getElementById('username').value
    const userId = document.getElementById('userId').value
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    const userType = document.getElementById('type').value
    const data = {
      username: username,
      userId: userId,
      email: email,
      password: password,
      userType: userType
    }
    e.preventDefault();
    axios.post(BASE_URL + '/cointab/users/added', data, {
      headers: {
        'x-access-token': localStorage.getItem('token')
      }
    }, {
      'userId': localStorage.getItem('userId')
    })
      .then(response => {
        if (response.status === 201 || response.status == 200) {

          window.location.href = "/admin"
          setnewUserModal(false)
        }
      })
      .catch(err => {

        if (err.response && err.response.request.status === 500 || err.response.status == 500)
          setMessage(err.response.data.message)
        else
          console.log(err)
      })
  }

  // Close button into the modal
  const closeUserModal = function () {
    setModal(false);
    setUserOne({})
  }
  //close button into the new record table
  const closeUserModal1 = function () {
    setnewUserModal(false);
    setnewUser({})
  }
  //show the add new user modal
  const showUserModal1 = function () {
    setnewUserModal(true);
  }
  //show the update modal
  const showUserModal = function () {
    setModal(true);
  }

  // {fetch the all records in the backend}
  const fetchUsers = (userId) => {
    axios.get(BASE_URL + "/cointab/users/" + userId, {
      headers: {
        'x-access-token': localStorage.getItem("token")
      },
      'userId': localStorage.getItem('userId')
    })
      .then(function (response) {
        console.log(response, userId)
        if (response.status === 200) {
          if (userId) {
            console.log(response.data.user)
            setUserOne(response.data.user)
            showUserModal();
          } else {
            setUserList(response.data)
          }
        }
      })
      .catch(function (err) {
        console.log(err)
      })
  }

  // {Update the user details into the table}
  function updateUserDetails() {
    const data = {
      'username': userDetail.username,
      'password': userDetail.password
    }
    axios.put(BASE_URL + "/cointab/users/" + userDetail.userId, data, {
      headers: {
        'x-access-token': localStorage.getItem("token")
      },
      'userId': localStorage.getItem('userId')
    })
      .then(function (response) {
        setMessage(response.message)
        let idx = userList.findIndex((obj => obj.userId === userDetail.userId))
        console.log(idx, userDetail)
        userList[idx] = userDetail
        closeUserModal();
      })
      .catch(function (err) {
        if (err.status == 400) {
          setMessage(err.message);
        } else {
          console.log(err)
        }
      })
  }

  //{Delete the user reocrds one by one }
  const DeleteUser = function () {

    axios.delete(BASE_URL + "/cointab/users/" + userDetail.userId, {
      headers: {
        'x-access-token': localStorage.getItem('token')
      }
    }, {
      'userId': localStorage.getItem('userId')
    })
      .then(response => {
        if (response.status === 200 || response.status === 201)
          setMessage(response.message)
        closeUserModal()
      })
      .catch(err => {

        if (err.response && err.response.request.status === 500 || err.response.status == 500)
          setMessage(err.response.data.message)
        else
          console.log(err)
      })
  }

  // change the value into the input tage keyup and down the keyboard
  function changeUserDetails(e) {
    if (e.target.name === 'username') {
      userDetail.username = e.target.value

    } else if (e.target.name = 'password') {
      userDetail.password = e.target.value
    }
    setUserOne(userDetail)
    setModal(e.target.value)

  }


  //life cycle method component did mount
  useEffect(() => {
    fetchUsers("")
  }, [])


  return (
    <div>

      <h1 className='text-success text-center p-4 m-4'>Welcome, {username} </h1>
      <button className='btn btn-sm btn-success p-3 m-3' onClick={showUserModal1}>ADD NEW USER</button>
      <button className='btn btn-sm btn-danger p-3 m-3' onClick={Logout}>LOGOUT</button>

      <MaterialTable
        onRowClick={(event, rowData) => fetchUsers(rowData.userId)}
        data={userList}
        title="User Records"
        columns={[
          {
            title: "USER ID",
            field: "userId",
          },
          {
            title: "Username",
            field: "username",
          },
          {
            title: "EMAIL",
            field: "email",
            filtering: true
          },
          {
            title: "UserType",
            field: "userType",

          },
        ]}
        options={{
          filtering:true,
          sorting:true,
          
        }}

      >

      </MaterialTable>

      {/* Modal for editing the users */}
      {userModal ? (
        <Modal
          show={userModal}
          onHide={closeUserModal}
          backdrop="static"
          keyboard={false}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Update User Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={updateUserDetails}>

              <div className="p-1">
                <h5 className="card-subtitle mb-2 text-primary lead">User ID: {userDetail.userId}</h5>
                <hr />
                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon2">Username</span>
                  <input type="text" className="form-control" name="username" value={userDetail.username} onChange={changeUserDetails} />

                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon2">Email</span>
                  <input type="text" className="form-control" name="email" value={userDetail.email} disabled />

                </div>

                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon2" >{userDetail.userType}</span>
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon2">Update Password</span>
                  <input type="text" className="form-control" name="password" onChange={changeUserDetails} />

                </div>
                <div className='text-danger text-center'>{message}</div>
              </div>

            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => closeUserModal()}>
              Close
            </Button>
            <Button variant="success" onClick={updateUserDetails}>
              Update
            </Button>
            <Button variant='danger' onClick={DeleteUser}>
              Delete
            </Button>
          
          </Modal.Footer>
        </Modal>
      ) : console.log(userDetail)
      }

      {/* {Modal for User Add new rerord Modal} */}
      {newUserModal ? (
        <Modal
          show={newUserModal}
          onHide={closeUserModal}
          backdrop="static"
          keyboard={false}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Add User </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>

              <div className="p-1">
                <h5 className="card-subtitle mb-2 text-primary lead">User ID</h5>
                <input type="text" className="form-control" id="userId" />
                <hr />
                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon2">Username</span>
                  <input type="text" className="form-control" id="username" />

                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon2">Email</span>
                  <input type="text" className="form-control" id="email" />
                </div>

                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon2"> Password</span>
                  <input type="text" className="form-control" id="password" />

                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon2">UserType</span>
                  <select id="type" className="form-select"
                  >
                    <option value="ADMIN">ADMIN</option>
                    <option value="CUSTOMER">CUSTOMER</option>

                  </select>

                </div>
                <div className='text-danger text-center'>{message}</div>
              </div>

            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeUserModal1}>
              Close
            </Button>
            <Button variant="success" onClick={addFn}>
              ADD
            </Button>
          </Modal.Footer>
        </Modal>
      ) : console.log(newUserModal)
      }


    </div>
  )



}
