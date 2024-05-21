import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminSignInStart } from "../../redux/admin/adminSlice";

const AdminLogin = () => {
 
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          className="bg-slate-100 p-3 rounded-lg"
          type="email"
          placeholder="Email here"
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
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
          type="submit"
        >
          Sign in
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
