import React from "react";

const ReviewSubmit = ({ formData, handleSubmit, prevStep }) => {
  return (
    <div>
      <h3>Review Your Details</h3>
      <p><b>Full Name:</b> {formData.fullName}</p>
      <p><b>Email:</b> {formData.email}</p>
      <p><b>Phone:</b> {formData.phone}</p>
      <p><b>Username:</b> {formData.username}</p>

      <div className="btn-group">
        <button className="btn" onClick={prevStep}>
          Back
        </button>
        <button className="btn" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default ReviewSubmit;

