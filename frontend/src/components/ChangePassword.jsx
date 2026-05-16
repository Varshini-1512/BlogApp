import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useAuth } from '../store/authStore'
import { useNavigate } from 'react-router'
import { toast } from 'react-hot-toast'

function ChangePassword() {

    const { register, handleSubmit, formState: { errors } } = useForm()
    const changepassword = useAuth((state) => state.changepassword);
    const currentUser = useAuth((state) => state.currentUser);
    const error = useAuth((state) => state.error);
    const isAuthenticated = useAuth((state) => state.isAuthenticated);

    const navigate = useNavigate()

    const onChangePassword = async (userCredObj) => {
        userCredObj.email = currentUser?.email;

        const res = await changepassword(userCredObj);

        if (res?.success) {
            toast.success("Password changed successfully");

            if (currentUser?.role === "USER") {
                navigate('/user-dashboard');
            }

            if (currentUser?.role === "ADMIN") {
                navigate('/admin-dashboard');
            }

            if (currentUser?.role === "AUTHOR") {
                navigate('/author-dashboard');
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-blue-100 ">
            <form onSubmit={handleSubmit(onChangePassword)} className='bg-white rounded-xl shadow-xl p-10 w-100'>
                <h1 className='text-center font-bold mb-2 text-2xl'>change password</h1>
                <div className='p-2'>
                    <input type='password' {...register("oldpassword", { required: true })} placeholder='Old password' className='p-1 border-2 rounded-xl w-full' />
                    {errors.oldpassword?.type === 'required' && <p className="text-red-600">enter current password</p>}
                </div>
                <div className='p-2'>
                    <input type='password' {...register("newpassword", { required: true })} placeholder='New password' className='p-1 border-2 rounded-xl w-full' />
                    {errors.newpassword?.type === 'required' && <p className="text-red-600">enter new password</p>}
                </div>
                <div className='p-2'>
                    <button type='submit' className='bg-blue-400 p-1 rounded-xl cursor-pointer w-full text-white'>update password</button>
                </div>
            </form>
        </div>
    )
}

export default ChangePassword


