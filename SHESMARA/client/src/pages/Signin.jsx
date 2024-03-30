import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
import logo from '../images/logo.png';
import OAuth from '../components/OAuth';

export default function Signin() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return;
    }
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate('/');
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  const handleForgotPassword = () => {
    navigate('/forgot-password'); // Navigate to the Forgot Password page
  };

  return (
    
   <div className="flex items-center justify-center h-screen w-full px-5 sm:px-0">
   <div className="flex bg-white rounded-lg shadow-lg border overflow-hidden max-w-sm lg:max-w-4xl w-full">
     <div
       className="hidden md:block lg:w-1/2 bg-cover bg-blue-700"
       style={{
         backgroundImage: `url(https://www.tailwindtap.com//assets/components/form/userlogin/login_tailwindtap.jpg)`,
       }}
     ></div>
     <div className="w-full p-8 lg:w-1/2">
<img
               className="h-25"
               src={logo}
               alt="Logo"
             />
       <p className="text-xl text-gray-600 text-center">Welcome back!</p>
<form onSubmit={handleSubmit} className="mt-6 space-y-2">
       <div className="mt-4">
         <label className="block text-gray-700 text-sm font-bold mb-2">
           Email Address
         </label>
         <input
           className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
           type="email" onChange={handleChange} id='email'
           required
         />
       </div>
       <div className="mt-4 flex flex-col justify-between">
         <div className="flex justify-between">
           <label className="block text-gray-700 text-sm font-bold mb-2" >
             Password
           </label>
         </div>
         <input
           className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
           type="password" onChange={handleChange} id='password'
         />
         <a
           href="#"
           className="text-xs text-gray-500 hover:text-gray-900 text-end w-full mt-2"
         onClick={handleForgotPassword} >
           Forget Password?
         </a>
       </div>
       <div className="mt-8">
         <button className="bg-blue-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-blue-600">
           {loading ? 'Loading...' : 'LogIn'}
         </button>
       </div>
</form>
       <OAuth/>
       
       <div className="mt-4 flex items-center w-full text-center">
         <div
           className="text-xs text-gray-500 capitalize text-center w-full"
         >
           Don&apos;t have any account yet?
           <Link to="/sign-up" className="text-blue-700"> Sign Up</Link>
         </div>
         {error && <p className='text-red-500 mt-5'>{error}</p>}
       </div>
     </div>
   </div>
 </div>
);
};

