// src/components/SignUpForm.jsx

import React, { useState } from 'react';
import GoogleIcon from './GoogleIcon';
import { useNavigate } from 'react-router-dom';

export default function SignUpForm({ isActive, onSignInClick }) {
  const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const navigate = useNavigate();

    const baseAPIUrl = 'http://127.0.0.1:8001';

    // sign up handler:
    const handleSignUp = async (event) => {
        event.preventDefault(); 
        setMessage('');
        setMessageType('');

        // user entered data:
        const formData = new FormData();
        formData.append('user_name', userName);
        formData.append('password', password);
        formData.append('email', email);
    
    
        try {
          const response = await fetch(`${baseAPIUrl}/login`, {
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
          // eg.
          // const userId = "7878";
          setMessage(`Account created successfully! User ID: ${result.user_id}`);
          // setMessage(`Account created successfully! User ID: ${userId}`);
          setMessageType('success');
          
          // Session details: 
          // localStorage.setItem('token', result.access_token);
          // console.log('signUp successful:', result.access_token);


          console.log('signUp successful:');

          

          // Reset the form
          setUserName('');
          setPassword('');
          setEmail('');


          navigate(`/dashboard/`);
          
    
        } catch (err) {
          setMessage(err.message);
          setMessageType('error');
          console.error('Sign up error:', err);
        }
      };
  
  return (
    <div className={`
      absolute top-0 left-0 h-full w-full md:w-1/2 flex items-center justify-center
      transition-all duration-700 ease-in-out
      ${isActive
        ? 'opacity-100 z-50 md:translate-x-full'
        : 'opacity-0 z-10 pointer-events-none md:translate-x-0'
      }
    `}>
      <form onSubmit={handleSignUp} className="flex flex-col items-center justify-center px-10 w-full text-center bg-white h-full">
        <h1 className="text-3xl font-bold mb-3">Create Account</h1>
        <a href="#" className="flex items-center justify-center border border-gray-300 rounded-lg h-10 w-10 my-3 hover:bg-gray-100">
          <GoogleIcon />
        </a>
        <span className="text-xs mb-3">Create a User ID for Registration</span>

        {/* flash msg */}
        {message && (
          <p className={`text-sm mb-3 ${messageType === 'success' ? 'text-green-600' : 'text-red-600'}`}>
            {message}
          </p>
        )}
        <input required onChange={(e) => setUserName(e.target.value)} type="text" placeholder="Name" className="bg-gray-100 border-none rounded-full py-3 px-4 my-2 w-full outline-none shadow-inner" />
        <input required onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" className="bg-gray-100 border-none rounded-full py-3 px-4 my-2 w-full outline-none shadow-inner" />
        <input required type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="bg-gray-100 border-none rounded-full py-3 px-4 my-2 w-full outline-none shadow-inner" />
        <button  type="submit" className="bg-gradient-to-r from-blue-700 to-purple-700 text-white font-bold uppercase py-3 px-12 rounded-full shadow-lg mt-4 transition-transform duration-100 ease-in hover:scale-105">
          Sign Up
        </button>
        <p className="md:hidden mt-6 text-sm">
          Already have an account?{' '}
          <button type="button" onClick={onSignInClick} className="font-bold text-blue-700 hover:underline">
            Sign In
          </button>
        </p>
      </form>
    </div>
  );
}