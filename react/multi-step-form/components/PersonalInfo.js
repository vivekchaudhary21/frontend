import React from 'react';

function PersonalInfo({ formState, changeFormStateValues }) {
  return (
    <div className='personal-info-container'>
      <div className='header'>Personal Info</div>
      <input
        type='text'
        placeholder='First Name...'
        name='firstName'
        value={formState.firstName}
        onChange={changeFormStateValues}
      />
      <input
        type='text'
        placeholder='Last Name...'
        name='lastName'
        value={formState.lastName}
        onChange={changeFormStateValues}
      />
      <input
        type='text'
        placeholder='Username...'
        name='userName'
        value={formState.userName}
        onChange={changeFormStateValues}
      />
    </div>
  );
}

export default PersonalInfo;
