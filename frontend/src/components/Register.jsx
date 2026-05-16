import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import {
  errorClass,
  loadingClass
}
  from '../styles/common'
import { useNavigate } from 'react-router'
import BASE_URL from './config/BaseApi'

function Register() {

  const { register, handleSubmit, formState: { errors } } = useForm()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [preview, setPreview] = useState(null)
  const navigate = useNavigate()

  const onRegister = async (newUser) => {
    setLoading(true)

    // Create form data object
    const formData = new FormData();
    //get user object
    let { role, profileImageUrl, ...userObj } = newUser;
    //add all fields except profileImageUrl to FormData object
    Object.keys(userObj).forEach((key) => {
      formData.append(key, userObj[key]);
    });
    // add profileImageUrl to Formdata object
    formData.append("profileImageUrl", profileImageUrl[0]);

    try {
      let { role, ...userObj } = newUser
      if (role === 'user') {
        // make api req to user-api
        let resObj = await axios.post(`${BASE_URL}/user-api/users`, formData)
        // console.log("res obj is",resObj)
        if (resObj.status === 201) {
          // navigate to login
          navigate("/login")
        }
      }
      if (role === 'author') {
        // make api req to author-api
        let resObj = await axios.post(`${BASE_URL}/author-api/users`, formData)
        // console.log("res obj is",resObj)
        if (resObj.status === 201) {
          // navigate to login
          navigate("/login")
        }
      }
    }
    catch (err) {
      console.log("error is ", err)
      setError(err.response?.data?.error || "Registration failed")
    }
    finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  if (loading === true) {
    return <p className={loadingClass}>Loading...</p>
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#1e293b]">
      <div className="absolute top-10 left-10 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl"></div>
      <form onSubmit={handleSubmit(onRegister)} className='bg-white rounded-xl shadow-xl p-10 w-70 lg:w-100 md:w-100'>
        <h1 className='text-center font-bold mb-2 text-2xl'>Register</h1>
        {/* error message */}
        {error && <p className={errorClass}>{error}</p>}
        <div className='flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-base sm:text-lg md:text-xl text-[20px] ml-2'>
          <span>Select Role</span>
          <label className="flex items-center gap-1">
            <input type='radio' value='user' {...register("role", { required: true })} className='accent-blue-500' />User
          </label>
          <label className="flex items-center gap-1">
            <input type='radio' value='author' {...register("role")} className='accent-blue-500' />Author
          </label>
        </div>
        <div className='p-2'>
          <input type='text' {...register("firstname", { required: true })} placeholder='First Name' className='p-1 border-2 rounded-xl w-full' />
          {errors.firstname?.type === 'required' && <p className="text-red-600">Enter the first name</p>}
        </div>
        <div className='p-2'>
          <input type='text' {...register("lastname")} placeholder='Last Name' className='p-1 border-2 rounded-xl w-full' />
        </div>
        <div className='p-2'>
          <input type='text' {...register("email", { required: true, unique: true })} placeholder='Email' className='p-1 border-2 rounded-xl w-full' />
          {errors.email?.type === 'required' && <p className="text-red-600">Email is required</p>}
          {errors.email?.type === 'unique' && <p className="text-red-600">Email already exist</p>}
        </div>
        <div className='p-2'>
          <input type='password' {...register("password", { required: true })} placeholder='Password' className='p-1 border-2 rounded-xl w-full' />
          {errors.password?.type === 'required' && <p className="text-red-600">password is required</p>}
        </div>
        <div className='p-2'>
          <input
            type="file"
            accept="image/png, image/jpeg"
            {...register("profileImageUrl")}
            onChange={(e) => {

              //get image file
              const file = e.target.files[0];
              // validation for image format
              if (file) {
                if (!["image/jpeg", "image/png"].includes(file.type)) {
                  setError("Only JPG or PNG allowed");
                  return;
                }
                //validation for file size
                if (file.size > 2 * 1024 * 1024) {
                  setError("File size must be less than 2MB");
                  return;
                }
                //Converts file → temporary browser URL(create preview URL)
                const previewUrl = URL.createObjectURL(file);
                setPreview(previewUrl);
                setError(null);
              }
            }} className='p-1 border-2 rounded-xl w-full' />
          {preview && (
            <div className="mt-3 flex justify-center">
              <img
                src={preview}
                alt="Preview"
                className="w-fit h-24 object-cover rounded-full border"
              />
            </div>
          )}
        </div>
        <div className='p-2'>
          <button type='submit' className='bg-blue-400 p-1 rounded-xl cursor-pointer w-full text-white'>Register</button>
        </div>
      </form>
    </div>
  )
}

export default Register