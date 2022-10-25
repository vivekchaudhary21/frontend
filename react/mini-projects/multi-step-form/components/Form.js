import React, { useState } from 'react';
import OtherInfo from './OtherInfo';
import PersonalInfo from './PersonalInfo';
import SignUpInfo from './SignupInfo';

const initialFormState = {
  email: '',
  password: '',
  confirmPassword: '',
  firstName: '',
  lastName: '',
  userName: '',
  nationality: '',
  other: '',
};

const StepperComp = {
  0: SignUpInfo,
  1: PersonalInfo,
  2: OtherInfo,
};

const Form = () => {
  const [step, setStep] = useState(0);
  const [formState, setFormState] = useState(initialFormState);
  const Component = StepperComp[step];

  const changeFormStateValues = (e) => {
    const { value, name } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    console.log('formState', formState);
  };

  return (
    <div className='form'>
      <div className='progressbar'></div>
      <div className='form-container'>
        <div className='body'>
          <Component
            formState={formState}
            changeFormStateValues={changeFormStateValues}
          />
        </div>
        <div className='footer'>
          {step > 0 && <button onClick={() => setStep(step - 1)}>Prev</button>}
          {step < 2 && <button onClick={() => setStep(step + 1)}>Next</button>}
          {step === 2 && (
            <button type='submit' onClick={handleSubmit}>
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Form;
