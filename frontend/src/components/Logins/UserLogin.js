import React, { useState, useEffect } from "react";
import bg from "../../images/2.jpg";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import WritingAnimation from '../Logins/WritingAnimations';

const Login = () => {
    const [formData, setFormData] = useState({
        registerNo: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [slideIn, setSlideIn] = useState(false);
    const navigate = useNavigate();
    const lines = ["A Learning", "Resources", "Platform", "For Students"];

    useEffect(() => {
        setSlideIn(true);
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/auth/login', formData);
            alert(response.data.message);
            localStorage.setItem('token', response.data.token);
            navigate('/Home');
        } catch (err) {
            setError(err.response?.data?.error || 'Error logging in');
        }
    };

    return (
        <div
            className="relative min-h-screen bg-contain bg-center flex items-center justify-center"
            style={{ backgroundImage: `url(${bg})` }}
        >
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            <div
                className={`relative z-10 bg-gray-900 bg-opacity-90 p-8 rounded-lg shadow-lg w-96 sm:w-96 md:w-96 lg:mr-10 lg:w-[500px] xl:w-[400px] mx-4 md:mx-auto transform transition-transform duration-700 ${slideIn ? 'translate-x-0' : '-translate-x-full'}`}
            >
                <h1 className="text-3xl sm:text-4xl font-bold text-white text-center mb-4">
                    User Login
                </h1>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                <WritingAnimation lines={lines} />

                <form className="space-y-7" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="registerNo" className="block text-sm font-medium text-gray-300">
                            Register No
                        </label>
                        <input
                            type="text"
                            name="registerNo"
                            id="registerNo"
                            value={formData.registerNo}
                            onChange={handleChange}
                            required
                            className="w-full mt-1 bg-transparent border-b border-gray-600 text-white focus:border-indigo-500 focus:ring-0 focus:outline-none"
                        />
                    </div>

                    <div className="relative">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                            Password
                        </label>
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            id="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-full mt-1 bg-transparent border-b border-gray-600 text-white focus:border-indigo-500 focus:ring-0 focus:outline-none pr-10"
                        />
                        <div
                            className="absolute inset-y-0 right-3 top-6 flex items-center cursor-pointer"
                            onClick={togglePasswordVisibility}
                        >
                            {showPassword ? (
                                <EyeOff className="w-5 h-5 text-gray-500" />
                            ) : (
                                <Eye className="w-5 h-5 text-gray-500" />
                            )}
                        </div>
                    </div>

                    <button className="shadow-[inset_0_0_0_2px_#616467] text-white px-12 py-3  rounded-lg tracking-widest uppercase font-bold bg-transparent lg:ml-24 hover:bg-indigo-500 hover:text-white dark:text-neutral-200 transition duration-200">
                        Login
                    </button>



                </form>
                <p className="mt-4 text-center text-gray-300">
                    If you are a new user?
                    <span
                        onClick={() => navigate('/userregister')}
                        className="text-indigo-400 cursor-pointer hover:underline"
                    >
                        Register here.
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Login;


// import React from "react";
// import login from "../../images/2.jpg";
// const App = () => {
//   return (
//    <div className="flex justify-evenly">
//      <div className="flex items-center justify-center h-screen ">
//       <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-5xl bg-white shadow-lg rounded-lg">
//         {/* Left Section */}
//         <div className="flex flex-col items-center justify-center bg-green-50 p-12 md:p-16">
//           <div className="bg-green-100 p-6 ">
//             <img
//               className="w-48 h-48 "
//               src={login}
//               alt="Student"
//             />
//           </div>
//           <h1 className="mt-6 text-2xl font-bold text-green-600 text-center">
//             PrepInsta, UpSkilling Simplified!!!
//           </h1>
//         </div>

//         {/* Right Section */}
//         <div className="flex flex-col justify-center px-8 py-12 md:py-16">
//           {/* Sign In with Google */}
//           <button className="flex items-center justify-center w-full mb-6 py-3 border border-gray-300 rounded-lg shadow-sm hover:shadow-md text-gray-700">
//             <img
//               src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_Google.png"
//               alt="Google"
//               className="w-5 h-5 mr-3"
//             />
//             Sign in with Google
//           </button>

//           {/* OR Divider */}
//           <div className="relative flex items-center my-6">
//             <div className="flex-grow border-t border-gray-300"></div>
//             <span className="mx-4 text-sm text-gray-500">OR</span>
//             <div className="flex-grow border-t border-gray-300"></div>
//           </div>

//           {/* Input Field */}
//           <input
//             type="text"
//             placeholder="Email ID / Phone Number*"
//             className="w-full mb-6 px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />

//           {/* Sign In Button */}
//           <button className="w-full py-3 bg-black text-white rounded-lg shadow-md hover:bg-gray-800">
//             Sign In
//           </button>

//           {/* Sign Up Link */}
//           <p className="mt-8 text-center text-sm text-gray-500">
//             New User?{" "}
//             <a href="/signup" className="text-blue-500 hover:underline">
//               SignUp Here
//             </a>
//           </p>
//         </div>
//       </div>
//     </div>
//    </div>
//   );
// };

// export default App;