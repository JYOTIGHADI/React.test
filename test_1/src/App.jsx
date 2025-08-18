import React, { useState, useEffect } from "react";
import "./App.css";
import PersonalInfo from "./component/PersonalInfo.jsx";
import AccountInfo from "./component/AccountInfo.jsx";
import ReviewSubmit from "./component/ReviewSubmit.jsx";

const App = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    username: "",
    password: "",
    confirmPassword: ""
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("registrationData");
    if (saved) setFormData(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("registrationData", JSON.stringify(formData));
  }, [formData]);

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    setSubmitted(true);
    console.log(" Final Submitted Data:", formData);
  };

  return (
    <div className="form-container">
      <h2 className="title">Registration Form</h2>
      <p className="step-indicator">Step {step} of 3</p>

      {submitted ? (
        <h3 className="success"> Registration Successful!</h3>
      ) : (
        <>
          {step === 1 && (
            <PersonalInfo
              formData={formData}
              handleChange={handleChange}
              nextStep={nextStep}
            />
          )}
          {step === 2 && (
            <AccountInfo
              formData={formData}
              handleChange={handleChange}
              nextStep={nextStep}
              prevStep={prevStep}
            />
          )}
          {step === 3 && (
            <ReviewSubmit
              formData={formData}
              handleSubmit={handleSubmit}
              prevStep={prevStep}
            />
          )}
        </>
      )}
    </div>
  );
};

export default App;


// import { useState } from "react";
// import "./App.css";
// import Multisteps from "./Components/Multisteps";

// function App() {
//   return (
//     <>
//       <Multisteps />
//     </>
//   );
// }

// export default App;

