import React from 'react'
import {useDispatch} from "react-redux"
import {logout} from "../../store/authSlice"
import authService from '../../appwrite/auth'
import { useNavigate } from 'react-router-dom'

const LogoutBtn = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

  const  logoutHandler = ()=>{
    authService.logout()
    .then(()=>{
      dispatch(logout())
      navigate("/login")
    })
  } 
  return (
<button
  className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition duration-300"
  onClick={logoutHandler}
>
  Logout
</button>

  )
}

export default LogoutBtn