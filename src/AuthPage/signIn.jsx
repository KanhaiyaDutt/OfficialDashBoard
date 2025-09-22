// src/components/SignInForm.jsx

import React, { useState } from 'react';
import GoogleIcon from './GoogleIcon';
import { useNavigate } from 'react-router-dom';


   


export default function SignInForm({ isActive, onSignUpClick }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const navigate = useNavigate();

  const baseAPIUrl = 'http://127.0.0.1:8001';
    // sign in handler:
const handleSignIn = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    

    try {
      const response = await fetch(`${baseAPIUrl}/sign_in`, {
        method: 'POST',
        body: formData,
      });
      

      const result = await response.json();

      if (!response.ok) {
          //  corresponding errror
        setMessage(result.detail || 'Failed to sign up.');
        setMessageType('error');
        return;
      }

      // Handle success
      // Get the user ID from the response
      const userId = result.user_id;
      navigate(`/dashboard`);
      // const userId = "7878";
      
      setMessage(`Succesfully logged in: ${result.user_id}`);
      setMessageType('success');

      // Session details: 
      // localStorage.setItem('token', result.access_token);
      // console.log('Login successful:', result.access_token);
      console.log('Login successful:');

      
      

      

    } catch (err) {
      console.error('Sign in error:', err);
    }
  };

  return (
    
    <div className={`
      absolute top-0 left-0 h-full w-full md:w-1/2 flex items-center justify-center
      transition-all duration-700 ease-in-out
      ${isActive
        ? 'opacity-0 z-10 pointer-events-none md:translate-x-full'
        : 'opacity-100 z-20 md:translate-x-0'
      }
    `}>
      <form onSubmit={handleSignIn}  className="flex flex-col items-center justify-center px-10 w-full text-center bg-white h-full">
        <h1 className="text-3xl font-bold mb-3">Sign In</h1>
        <a href="#" className="flex items-center justify-center border border-gray-300 rounded-lg h-10 w-10 my-3 hover:bg-gray-100">
          <GoogleIcon />
        </a>
        <span className="text-xs mb-3">Use Username for Login</span>
        {/* flash msg */}
        {message && (
          <p className={`text-sm mb-3 ${messageType === 'success' ? 'text-green-600' : 'text-red-600'}`}>
            {message}
          </p>
        )}
        <input onChange={(e) => setUsername(e.target.value)} type="text" required placeholder="Username" className="bg-gray-100 border-none rounded-full py-3 px-4 my-2 w-full outline-none shadow-inner" />
        <input onChange={(e) => setPassword(e.target.value)} required type="password" placeholder="Password" className="bg-gray-100 border-none rounded-full py-3 px-4 my-2 w-full outline-none shadow-inner" />
        <a href="#" className="text-sm my-3">Forgot Password?</a>
        <button  type="submit" className="bg-gradient-to-r from-blue-700 to-purple-700 text-white font-bold uppercase py-3 px-12 rounded-full shadow-lg transition-transform duration-100 ease-in hover:scale-105">
          Sign In
        </button>
        <p className="md:hidden mt-6 text-sm">
          Don't have an account?{' '}
          <button type="button" onClick={onSignUpClick} className="font-bold text-blue-700 hover:underline">
            Sign Up
          </button>
        </p>
      </form>
    </div>
  );
}