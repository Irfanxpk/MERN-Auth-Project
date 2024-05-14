import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInStart, signInSuccess, signInFailure } from "../redux/user/userSlice";
import {useDispatch, useSelector} from 'react-redux'
const SignIn = () => {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    
        dispatch(signInStart())
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      
      dispatch(signInSuccess(data));
      if (data.success == false) {
        dispatch(signInFailure(data.message))
        return;
      }
      navigate('/')
    } catch (err)
    {
      dispatch(signInFailure(err));
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="email"
          className="bg-slate-100 p-3 rounded-lg"
          id="email"
          placeholder="Email"
          onChange={handleChange}
        />
        <input
          type="password"
          className="bg-slate-100 p-3 rounded-lg"
          id="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
          type="submit"
        >
          {loading ? "Loading......." : "Sign in"}
        </button>
      </form>
      <div className="flex gap-2 mt-5 ">
        <p>Dont Have an account?</p>
        <Link to="/sign-up">
          <span className="text-blue-500"> Sign-up</span>
        </Link>
      </div>
      <p className="text-red-700 mt-5 ">
        {error ? error || "Something went wrong!" : ""}
      </p>
    </div>
  );
};

export default SignIn;
