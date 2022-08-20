import React from 'react';

function OtherInfo({ formState, changeFormStateValues }) {
  return (
    <div className='other-info-container'>
      <div className='header'>Other Info</div>
      <input
        type='text'
        placeholder='Nationality...'
        name='nationality'
        value={formState.nationality}
        onChange={changeFormStateValues}
      />
      <input
        type='text'
        placeholder='Other...'
        name='other'
        value={formState.other}
        onChange={changeFormStateValues}
      />
    </div>
  );
}

export default OtherInfo;
