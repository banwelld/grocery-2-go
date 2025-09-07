// Login.jsx

import React, { useState, useEffect, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts";
import useDocumentTitle from "./useDocumentTitle";

export default function Login() {
  useDocumentTitle("Login");

  const loginDataTemplate = { email: "", password: "" };
  const [formData, setFormData] = useState({ ...loginDataTemplate });
  const { loginRegisterUser } = useContext(UserContext);
  const emailRef = useRef(null);

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  const updateFormData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loginRegisterUser("/login", formData, 1);
    setFormData({ ...loginDataTemplate });
  };

  return (
    <main className='login info-page'>
      <section className='info'>
        <h2>Welcome!</h2>
        <p>
          In order to provide you with items of the highest quality and at the best
          prices, we must have an active and engaged membership. As such, you'll need to
          login to the site to take advantage of <strong>Grocery2Go's</strong> benefits.
        </p>
        <p>
          <strong>Not a member yet?</strong> We'd love to have you sign up!{" "}
          <Link className='text-link' to='../register'>
            Click here
          </Link>{" "}
          to create an account.
        </p>
      </section>
      <form onSubmit={handleSubmit}>
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
    </main>
  );
}
