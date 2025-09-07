// Register.jsx

import React, { useState, useEffect, useRef, useContext } from "react";
import { UserContext } from "../contexts";
import useDocumentTitle from "./useDocumentTitle";

export default function Login() {
  useDocumentTitle("Register");

  const registrationDataTemplate = {
    email: "",
    f_name: "",
    l_name: "",
    phone: "",
    password: "",
    password2: "",
  };
  const [formData, setFormData] = useState({ ...registrationDataTemplate });
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
    const { password2, ...userData } = formData;
    loginRegisterUser("/register", userData);
    setFormData({ ...registrationDataTemplate });
  };

  return (
    <main className='register info-page'>
      <section className='info'>
        <h2>Registration</h2>
        <p>
          We're thrilled that you've decided to create an account! Just give us a little
          info about yourself and you'll be all ready to load up a shopping cart.
        </p>
        <p>Be aware that all fields are mandatory so make sure your form is complete.</p>
      </section>
      <form onSubmit={handleSubmit}>
        <input
          ref={emailRef}
          tabIndex={1}
          type='email'
          onChange={updateFormData}
          name='email'
          placeholder='email address'
          value={formData.email}
          required
        />
        <input
          tabIndex={2}
          type='text'
          onChange={updateFormData}
          name='f_name'
          placeholder='first name'
          value={formData.f_name}
          required
        />
        <input
          tabIndex={3}
          type='text'
          onChange={updateFormData}
          name='l_name'
          placeholder='last name'
          value={formData.l_name}
          required
        />
        <input
          tabIndex={4}
          type='tel'
          onChange={updateFormData}
          name='phone'
          placeholder='telephone number'
          value={formData.phone}
          required
        />
        <input
          tabIndex={5}
          type='password'
          onChange={updateFormData}
          name='password'
          placeholder='password'
          value={formData.password}
          required
        />
        <input
          tabIndex={6}
          type='password'
          onChange={updateFormData}
          name='password2'
          placeholder='verify password'
          value={formData.password2}
          required
        />
        <button tabIndex={7} type='submit'>
          Submit
        </button>
      </form>
    </main>
  );
}
