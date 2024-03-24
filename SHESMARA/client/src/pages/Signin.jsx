import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
import logo from '../images/logo.png';

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
    <section>
      <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 md:px-12 lg:px-24 lg:py-24">
        <div className="justify-center mx-auto text-left align-bottom transition-all transform bg-white rounded-lg sm:align-middle sm:max-w-2xl sm:w-full">
          <div className="grid flex-wrap items-center justify-center grid-cols-1 mx-auto shadow-xl lg:grid-cols-2 rounded-xl">
            <div className="w-full px-6 py-3">
              <div className="flex justify-center mb-4 ">
                <img
                  className="h-25"
                  src={logo}
                  alt="Logo"
                />
              </div>
              <div>
                <div className="mt-1 text-left sm:mt-5">
                <h2 className='flex flex-wrap justify-center mx-auto font-bold text-3xl text-gray-600' > Welcome Back!</h2>
                  <div className="inline-flex items-center w-full">
                  <h1 className="flex text-3xl text-center font-bold my-2">Sign In</h1>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="mt-6 space-y-2">
                  <div>
                    <label htmlFor="email" className="sr-only">Email</label>
                    <input
                      type="text"
                      name="email"
                      id="email"
                      className="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                      placeholder="Enter your email"
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="sr-only">Password</label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      className="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                      placeholder="Enter your password"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex flex-col mt-4 lg:space-y-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex items-center justify-center w-full px-10 py-4 text-base font-medium text-center text-white transition duration-500 ease-in-out transform bg-blue-600 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      {loading ? 'Loading...' : 'Sign In'}
                    </button>
                    <a href="#" type="button" className="inline-flex justify-center py-4 text-base font-medium text-gray-500 focus:outline-none hover:text-neutral-600 focus:text-blue-600 sm:text-sm" onClick={handleForgotPassword} > Forgot your Password? </a>
                  </div>
                  
                </form>
                {error && (
                  <div className="text-red-500 text-center mt-4">{error}</div>
                )}
                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-500">Don't have an account? <Link to="/sign-up" className="font-medium text-blue-600 hover:text-blue-500">Sign up</Link></p>
                </div>
              </div>
            </div>
            <div className="order-first hidden w-full lg:block">
              <img
                className="object-cover h-full bg-cover rounded-lg"
                src="https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHJlYWwlMjBlc3RhdGV8ZW58MHx8MHx8fDA%3D&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1000&amp;q=80" alt=""></img>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
