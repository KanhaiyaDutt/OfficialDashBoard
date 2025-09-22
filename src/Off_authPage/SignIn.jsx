import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Define the GoogleIcon component directly in this file to resolve potential import errors.
const GoogleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24px" height="24px">
    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
    <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
    <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.223,0-9.657-3.356-11.303-7.918l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
    <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571l6.19,5.238C42.022,35.283,44,30.038,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
  </svg>
);

export default function SignInForm({ isActive, onSignUpClick }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passkey, setPasskey] = useState('');
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
    formData.append('passkey', passkey);

    try {
      const response = await fetch(`${baseAPIUrl}/auth/sign_in`, {
        method: 'POST',
        body: formData,
      });
      
      const result = await response.json();

      if (!response.ok) {
        setMessage(result.detail || 'Failed to sign in.');
        setMessageType('error');
        return;
      }

      // Handle success
      const userId = result.user_id;
    //   localStorage.setItem('token', result.access_token);
    //   console.log('Login successful:', result.access_token);
      
      setMessage(`Successfully logged in: ${result.user_id}`);
      setMessageType('success');
      
      navigate(`/dashboard`);

    } catch (err) {
      setMessage('An error occurred during sign-in.');
      setMessageType('error');
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
      <form onSubmit={handleSignIn} className="flex flex-col items-center justify-center px-10 w-full text-center bg-white h-full">
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
        <input onChange={(e) => setPasskey(e.target.value)} required type="password" placeholder="Passkey" className="bg-gray-100 border-none rounded-full py-3 px-4 my-2 w-full outline-none shadow-inner" />
        <a href="#" className="text-sm my-3">Forgot Password?</a>
        <button type="submit" className="bg-gradient-to-r from-blue-700 to-purple-700 text-white font-bold uppercase py-3 px-12 rounded-full shadow-lg transition-transform duration-100 ease-in hover:scale-105">
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

