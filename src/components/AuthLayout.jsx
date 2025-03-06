import {useNavigate} from "react-router-dom"
import {useSelector} from "react-redux"
import React,{useEffect,useState} from "react"

function AuthLayout({children , authentication=true}){
    const [loader , setLoader] = useState(true)
    const authstatus = useSelector((state) =>state.auth.status )
    const navigate = useNavigate()

    useEffect(()=>{
        if(authentication && authstatus !== authentication){
            navigate("/login")
        } else if(!authentication && authstatus !==authentication){
            navigate("/")
        }
        setLoader(false);
    },[authstatus,navigate,authentication])

    return(
        loader ? <h2>Loading...</h2>:children
    )
}
export default AuthLayout
