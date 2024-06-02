import axiosClient from "../axios-client.js";
import {useStateContext} from "../contexts/ContextProvider";
import {Navigate, Outlet} from "react-router-dom";
import {useEffect} from "react";

export default function DefaultLayout() {
  const {user, token, setUser, setToken, notification} = useStateContext();

  if (!token) {
    return <Navigate to="/login"/>
  }

  const onLogout = e => {
    e.preventDefault()

    axiosClient.post('/logout')
      .then(() => {
        setUser({})
        setToken(null)
      })
  }

  useEffect(() => {
    axiosClient.get('/user')
      .then(({data}) => {
         setUser(data)
      })
  }, [])

  return (
    <div id='defaultLayout'>
      <div className='content'>
        <header>
        <div>Task Management System</div>
          <div>
            {user?.name} &nbsp; &nbsp;
            <a href="#" onClick={onLogout} className='btn-logout'>Logout</a>
          </div>
        </header>
        <main>
          <Outlet/>
        </main>
        {notification &&
          <div className="notification">
            {notification}
          </div>
        }
      </div>
    </div>
  )
}
