import { useEffect, useState } from 'react'
import {useDispatch} from 'react-redux'
import authService from './appwrite/auth'
import { login,logout } from './store/authSlice'
import './App.css'
import { Header ,Footer} from './components'
import {Outlet} from 'react-router-dom'
function App() {
  // console.log(process.env._REACT_APP_APPWRITE_URL)
  // We cannot do this. Every enviorment like vite or next can be accessed diffrently 
  // console.log(import.meta.env.VITE_APPWRITE_URL)
  // console.log(config.appwriteDatabaseId);
  const [loading ,setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(()=>{
    authService.getCurrentUser()
    .then((userData)=>{
      if(userData){
        dispatch(login(userData))
      } else{
        dispatch(logout())
      }
    })
    // .catch(()=>{

    // })
    .finally(()=>{
      setLoading(false)
    })
  },[])

  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-blue-400'>
      <div className='w-full block'>
      <Header />
      <main>
      <Outlet />
      </main>
      <Footer />
      </div>

    </div>
  ) : <div>
    Loading...
  </div>
}

export default App
