import React from 'react'
import { useAuth } from '../store/authStore';
import { NavLink, Outlet } from "react-router";
import {
  pageWrapper,
  navLinksClass,
  navLinkClass,
  navLinkActiveClass,
  divider,
  primaryBtn
} from "../styles/common";
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router'

function AuthorDashboard() {

  const { currentUser } = useAuth();
  const navigate = useNavigate()
  const logout = useAuth(state => state.logout)
  const onLogout = async () => {
    // logout
    await logout()
    // navigate
    toast.success("Logout successful")
    navigate('/login')
  }

  const onChangePassword = async () => {
    navigate('/change-password')
  }

  return (
    <div>
      <nav className='flex justify-between items-center flex-row px-5'>
        <ul className='flex justify-between items-center flex-col gap-2 p-2 lg:flex-row md:flex-row'>
          <li>
            <img src={currentUser?.profileImageUrl} className="w-15 rounded-full" />
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

      <div className={pageWrapper}>
        {/* Author Navigation */}
        <div className="flex gap-6 mb-6">
          <NavLink to="articles" className={({ isActive }) => (isActive ? navLinkActiveClass : navLinkClass)}>
            Articles
          </NavLink>

          <NavLink to="add-article" className={({ isActive }) => (isActive ? navLinkActiveClass : navLinkClass)}>
            Add Article
          </NavLink>
        </div>

        <div className={divider}></div>

        {/* Nested route content */}
        <Outlet />
      </div>
    </div>
  )
}

export default AuthorDashboard