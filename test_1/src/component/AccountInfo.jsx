import React, { useState } from "react";

const AccountInfo = ({ formData, handleChange, nextStep, prevStep }) => {
  const [error, setError] = useState("");

  const validate = () => {
    if (!formData.username || !formData.password || !formData.confirmPassword) {
      setError(" All fields are required.");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError(" Passwords do not match.");
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
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
      />
      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        value={formData.confirmPassword}
        onChange={handleChange}
      />
      {error && <p className="error">{error}</p>}
      <div className="btn-group">
        <button className="btn" onClick={prevStep}>
           Back
        </button>
        <button className="btn" onClick={handleNext}>
          Next 
        </button>
      </div>
    </div>
  );
};

export default AccountInfo;

