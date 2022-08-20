import React from 'react';

function SignUpInfo({ formState, changeFormStateValues }) {
  return (
    <div className='sign-up-container'>
      <div className='header'>Sign Up</div>
      <input
        type='text'
        placeholder='Email...'
        name='email'
        value={formState.email}
        onChange={changeFormStateValues}
      />
      <input
        type='text'
        placeholder='Password...'
        name='password'
        value={formState.password}
        onChange={changeFormStateValues}
      />
      <input
        type='text'
        placeholder='Confirm Password...'
        name='confirmPassword'
        value={formState.confirmPassword}
        onChange={changeFormStateValues}
      />
    </div>
  );
}

export default SignUpInfo;
