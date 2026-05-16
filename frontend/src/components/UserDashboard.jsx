import {useAuth} from '../store/authStore'
import { useNavigate } from 'react-router'
import { primaryBtn } from '../styles/common'
import {toast} from 'react-hot-toast'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { 
  articleGrid, 
  articleCardClass,
  articleTitle ,
  ghostBtn,
  timestampClass,
} from '../styles/common'
import BASE_URL from './config/BaseApi'

function UserDashboard() {

  const logout=useAuth(state=>state.logout)
  const {currentUser}=useAuth();
  const [articlesData,setArticles]=useState([])
  const navigate=useNavigate()
  const [loading,setLoading]=useState(false)
  const [error,setError]=useState(null)

  const onLogout=async()=>{
    // logout
    await logout()
    // navigate
    toast.success("Logout successful")
    navigate('/login')
  }

  const onChangePassword=async()=>{
    navigate('/change-password')
  }

  // convert UTC → IST
  const formatDateIST = (date) => {
    return new Date(date).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  useEffect(()=>{
  const getArticles=async()=>{
    setLoading(true)
    try{
    const res=await axios.get(`${BASE_URL}/user-api/articles`,{withCredentials:true})
    console.log(res);

    setArticles(res.data.payload)
    }
    catch(err){
      setError(err.response?.data?.error)
    }
    finally{
      setLoading(false)
    }
  }
  getArticles();
  },[])

    const openArticle = (article) => {
    navigate(`/article/${article._id}`, {
      state: article,
    });
  };

  return (
    <div>
    <nav className='flex justify-between items-center flex-row px-5'>
    <ul className='flex justify-between items-center flex-col gap-2 p-2 lg:flex-row md:flex-row'>
    <li>
    <img src={currentUser?.profileImageUrl} className="w-15 rounded-full"/>
    </li>
    <li>
    <p className='font-semibold'>{currentUser?.firstname}</p>
    </li>
    </ul>
    <ul className='flex justify-between items-center flex-col gap-2 p-2 lg:flex-row md:flex-row'>
    <button onClick={onLogout} className={primaryBtn} > logout</button>
    <button onClick={onChangePassword} className={primaryBtn} > change password</button>
    </ul>
    </nav>
    <div className={articleGrid}>
      {
        articlesData.length>0 ? (articlesData.map((articleObj)=>(
          <div key={articleObj._id} className={articleCardClass}>
            <p className={articleTitle}>{articleObj.title}</p>
            <p>{articleObj.content.slice(0, 20)}...</p>
            <p className={timestampClass}>{formatDateIST(articleObj.createdAt)}</p>
            <button className={`${ghostBtn} mt-auto pt-4`} onClick={() => openArticle(articleObj)}>
                Read Article →
            </button>
          </div>
        )))
        :"no articles found"
      }
    </div>
    </div>
  )
}

export default UserDashboard