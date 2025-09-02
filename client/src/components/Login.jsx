// Login.jsx

import React, { useState, useEffect, useRef } from "react";
import { useOutletContext, Link } from "react-router-dom";

export default function Login() {
  const loginDataTemplate = { email: "", password: "" };
  const [formData, setFormData] = useState({ ...loginDataTemplate });
  const { postUserData } = useOutletContext();
  const emailRef = useRef(null);

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  const updateFormData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postUserData("/login", formData, 1);
    setFormData({ ...loginDataTemplate });
  };

  return (
    <div className='login wrapper'>
      <hgroup className='login'>
        <h2>Welcome!</h2>
        <p>
          In order to provide you with items of the highest quality and at the best
          prices, we must have an active and engaged membership. As such, you'll need to
          login to the site to take advantage of <strong>Grocery2Go's</strong> benefits.
        </p>
        <p>
          Not a member yet? We'd love to have you sign up!{" "}
          <Link className='text-link' to='../register'>
            Click here
          </Link>{" "}
          to create an account.
        </p>
      </hgroup>
      <form className='login' onSubmit={handleSubmit}>
        <input
          ref={emailRef}
          tabIndex={1}
          type='email'
          onChange={updateFormData}
          name='email'
          placeholder='email'
          value={formData.email}
          required
        />
        <input
          tabIndex={2}
          type='password'
          onChange={updateFormData}
          name='password'
          placeholder='password'
          value={formData.password}
          required
        />
        <button tabIndex={3} type='submit'>
          Login
        </button>
      </form>
    </div>
  );
}
