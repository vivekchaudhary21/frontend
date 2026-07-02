import { useState } from 'react'
import './styles.css'

export const ProgressSteps = ({
  totalSteps,
  activeStep = 1,
  width = '350px',
}) => {
  const [currentStep, setCurrentStep] = useState(activeStep ?? 1)

  const isPrevButtonDisabled = currentStep === 1
  const isNextButtonDisabled = currentStep === totalSteps

  const handlePrev = () => {
    setCurrentStep((pv) => pv - 1)
  }

  const handleNext = () => {
    setCurrentStep((pv) => pv + 1)
  }

  const currentProgressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100

  return (
    <div className="container">
      <div className="progress-bar" style={{ width }}>
        <div
          className="progress"
          style={{ width: `${currentProgressPercentage}%` }}
        ></div>
        {Array.from({ length: totalSteps }, (i, index) => {
          const step = index + 1
          const isActive = step === currentStep
          const status = []
          return (
            <div className={`step ${isActive ? 'active' : ''}`}>
              {index + 1}
            </div>
          )
        })}
      </div>

      <button
        className="btn prev"
        disabled={isPrevButtonDisabled}
        onClick={handlePrev}
      >
        Prev
      </button>
      <button
        className="btn next"
        disabled={isNextButtonDisabled}
        onClick={handleNext}
      >
        Next
      </button>
    </div>
  )
}
