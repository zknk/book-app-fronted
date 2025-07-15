import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { FaGoogle } from "react-icons/fa";
import { useAuth } from '../Context/AuthContext';
import { Navigate } from 'react-router-dom';

function Register() {
  const [message, setMessage] = useState("")

   const{registerUser,signWithGoogle}=useAuth()

  const { register, handleSubmit, formState: { errors } } = useForm()
  const navigate = useNavigate()

  const onSubmit =async (data) => {
    console.log("Register Form Data:", data)
    try{
      await registerUser(data.email, data.password)
      alert("Registration successful! Redirecting to login...")
      navigate("/") // Redirect to login after successful registration
    }
    catch(error){
      console.error("Registration Error:", error)
      setMessage("Registration failed. Please try again.")
      return
    }
    // You can now validate, send to backend or set message
  }
  
  const handleGoogleSignUp = async () => {
    try {
      await signWithGoogle() 
      alert("Google Sign In successful! Redirecting to home...")
      navigate("/") // Redirect to home after successful login
    } catch (error) {
      console.error("Google Sign In Error:", error)
      setMessage("Google Sign In failed. Please try again.")
      return
    } 
  }

  return (
    <div className='h-[calc(100vh-120px)] flex justify-center items-center'>
      <div className='w-full max-w-sm mx-auto bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4'>
        <h2 className='text-xl font-semibold mb-4'>Please Register</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="email">Email</label>
            <input
              id="email"
              placeholder="Email"
              {...register("email", { required: "Email is required" })}
              className='shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow'
            />
            {errors.email && <p className="text-red-500 text-xs italic">{errors.email.message}</p>}
          </div>

          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              {...register("password", { required: "Password is required" })}
              className='shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow'
            />
            {errors.password && <p className="text-red-500 text-xs italic">{errors.password.message}</p>}
          </div>

          {message && <p className='text-red-500 text-xs italic mb-3'>{message}</p>}

          <div>
            <button type="submit" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded focus:outline-none'>Register</button>
          </div>
        </form>

        <p className='align-baseline font-medium mt-4 text-sm'>
          Already have an account? Please <Link to="/login" className='text-blue-500 hover:text-blue-700'>Login</Link>
        </p>

        {/* google sign in */}
        <div className='mt-4'>
          <button
            onClick={handleGoogleSignUp}
            className='w-full flex flex-wrap gap-1 items-center justify-center bg-secondary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none'>
            <FaGoogle className='mr-2' />
            Sign up with Google
          </button>
        </div>

        <p className='mt-5 text-center text-gray-500 text-xs'>©2025 Book Store. All rights reserved.</p>
      </div>
    </div>
  )
}

export default Register
