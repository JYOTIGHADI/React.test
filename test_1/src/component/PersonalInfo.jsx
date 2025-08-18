import React, { useState } from "react";

const PersonalInfo = ({ formData, handleChange, nextStep }) => {
  const [error, setError] = useState("");

  const validate = () => {
    if (!formData.fullName || !formData.email || !formData.phone) {
      setError("All fields are required.");
      return false;
    }
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(formData.email)) {
      setError(" Invalid email format.");
     
      return false;
    }
    setError("");
    return true;
  };

  const handleNext = () => {
    if (validate()) nextStep();
  };

  return (
    <div>
      <input
        name="fullName"
        placeholder="Full Name"
        value={formData.fullName}
        onChange={handleChange}
      />
      <input
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
      />
      <input
        name="phone"
        placeholder="Phone Number"
        value={formData.phone}
        onChange={handleChange}
      />
      {error && <p className="error">{error}</p>}
      <button className="btn" onClick={handleNext}>
        Next 
      </button>
    </div>
  );
};

export default PersonalInfo;
