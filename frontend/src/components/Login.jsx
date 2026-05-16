import React, { useEffect } from 'react'
import {useForm} from 'react-hook-form' 
import { useAuth } from '../store/authStore'
import { useNavigate } from 'react-router'
import { errorClass } from '../styles/common'
import {toast} from 'react-hot-toast'

function Login() {

  const {register,handleSubmit,formState:{errors}}=useForm()
  const login=useAuth((state)=>state.login);
  const isAuthenticated=useAuth((state)=>state.isAuthenticated);
  const currentUser=useAuth((state)=>state.currentUser);
  const error=useAuth((state)=>state.error);
  
  const navigate=useNavigate()


  const onLogin=async(userCredObj)=>{
    await login(userCredObj)
  }

  useEffect(()=>{
    
    if(isAuthenticated){
      if(currentUser?.role==="USER"){
        toast.success("Login successful")
        navigate('/user-dashboard')
      }
      if(currentUser?.role==="ADMIN"){
        navigate('/admin-dashboard')
      }
      if(currentUser?.role==="AUTHOR"){
        navigate('/author-dashboard')
      }
    }
  },[isAuthenticated,currentUser])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#1e293b] ">
        <div className="absolute top-10 left-10 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl"></div>
        <form onSubmit={handleSubmit(onLogin)} className='bg-white rounded-xl shadow-xl p-10 w-100'>
          <h1 className='text-center font-bold mb-2 text-2xl'>Login</h1>
          {error && <p className={errorClass}>{error}</p>}
          <div className='p-2'>
            <input type='text' {...register("email",{required:true,unique:true})} placeholder='Email' className='p-1 border-2 rounded-xl w-full'/>
            {errors.email?.type==='required' && <p className="text-red-600">Email is required</p>}
            {errors.email?.type==='unique' && <p className="text-red-600">Email already exist</p>}
          </div>
          <div className='p-2'>
            <input type='password' {...register("password",{required:true})} placeholder='Password' className='p-1 border-2 rounded-xl w-full'/>
            {errors.password?.type==='required' && <p className="text-red-600">password is required</p>}
          </div>
          <div className='p-2'>
          <button type='submit' className='bg-blue-400 p-1 rounded-xl cursor-pointer w-full text-white'>Login</button>
          </div>
        </form>
    </div>
  )
}

export default Login