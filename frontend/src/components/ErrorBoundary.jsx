import React from 'react'
import { useRouteError } from 'react-router'

function ErrorBoundary() {
    const {data,status,statusText}=useRouteError()
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
        <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_V6OX4MERP_89NpOUEgb_4lGl171D8cZOyQ&s'/>
        <h1 className="text-3xl font-bold text-red-600 mb-4">{data}</h1>
        <p className="text-lg text-gray-700 mb-2">{status}-{statusText}</p>
    </div>
  )
}

export default ErrorBoundary