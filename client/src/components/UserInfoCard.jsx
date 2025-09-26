// UserInfoCard.jsx

import React from "react";

export default function UserInfoCard({ user }) {
  const { fName, lName, email, phone } = user;
  const fullName = `${fName} ${lName}`;

  return (
    <div className='user-info'>
      <div className='name'>
        <span className='label'>Name: </span>
        <span className='data'>{fullName}</span>
      </div>
      <div className='email'>
        <span className='label'>Email: </span>
        <span className='data'>{email}</span>
      </div>
      <div className='phone'>
        <span className='label'>Phone: </span>
        <span className='data'>{phone}</span>
      </div>
    </div>
  );
}
