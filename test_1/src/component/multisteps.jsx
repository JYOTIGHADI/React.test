import React from "react";
import PersonalInfo from "./PersonalInfo";
import AccInfo from "./AccountInfo";
import Preview from "./ReviewSubmit";
import { toast } from "react-toastify";
import "./step.css";

const Multisteps = () => {
  const [step, setStep] = React.useState(() => {
    const savedStep = localStorage.getItem("step");
    return savedStep ? parseInt(savedStep) : 1;
  });
  const [error, setError] = React.useState({});
  const [userdata, setUserdata] = React.useState(() => {
    const savedData = localStorage.getItem("userdata");
    return savedData
      ? JSON.parse(savedData)
      : {
          name: "",
          email: "",
          phone: "",
          username: "",
          password: "",
          confirmPassword: "",
        };
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserdata({ ...userdata, [name]: value });
    console.log(userdata);

    if (error[name]) {
      setError({ ...error, [name]: "" });
    }
  };

  const validateStep = () => {
    const newError = {};

    if (step === 1) {
      if (!userdata.name.trim()) {
        newError.name = "Name is required";
      }

      if (!userdata.email.trim()) {
        newError.email = "Email is required";
      } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(userdata.email)) {
        newError.email = "Invalid email format";
      }

      if (!userdata.phone.trim()) {
        newError.phone = "Phone is required";
      }
    } else if (step === 2) {
      if (!userdata.username.trim()) {
        newError.username = "Username is required";
      }

      if (!userdata.password.trim()) {
        newError.password = "Password is required";
      }

      if (!userdata.confirmPassword.trim()) {
        newError.confirmPassword = "Confirm Password is required";
      }

      if (userdata.password !== userdata.confirmPassword) {
        newError.confirmPassword = "Passwords do not match";
      }
    }
    setError(newError);
    return Object.keys(newError).length === 0;
  };

  const handlePreivious = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleNext = () => {
    if (validateStep()) {
      if (step === 3) {
        toast("Registration Successful", {
          onClose: () => {
            setUserdata({
              name: "",
              email: "",
              phone: "",
              username: "",
              password: "",
              confirmPassword: "",
            });
            localStorage.removeItem("userdata");
            localStorage.removeItem("step");
            setError({});
            setStep(1);
          },
        });
      } else {
        setStep(step + 1);
      }
    }
  };

  const manageStep = (step) => {
    switch (step) {
      case 1:
        return (
          <PersonalInfo
            userdata={userdata}
            setUserdata={setUserdata}
            handleInputChange={handleInputChange}
            error={error}
          />
        );
      case 2:
        return (
          <AccInfo
            userdata={userdata}
            setUserdata={setUserdata}
            handleInputChange={handleInputChange}
            error={error}
          />
        );
      case 3:
        return (
          <Preview
            userdata={userdata}
            setUserdata={setUserdata}
            handleInputChange={handleInputChange}
            error={error}
          />
        );
      default:
        return null;
    }
  };

  React.useEffect(() => {
    localStorage.setItem("userdata", JSON.stringify(userdata));
    localStorage.setItem("step", step);
  }, [userdata, step]);

  return (
    <div>
      <h1>Multisteps Registration</h1>
      <div className="multisteps-container">
        {/* Updated Step Indicator */}
        <div className="step-indicator">
          <div
            className={`step ${
              step === 1 ? "active" : step > 1 ? "completed" : ""
            }`}
            data-title="Personal Info"
          ></div>
          <div
            className={`step ${
              step === 2 ? "active" : step > 2 ? "completed" : ""
            }`}
            data-title="Account Info"
          ></div>
          <div
            className={`step ${step === 3 ? "active" : ""}`}
            data-title="Review"
          ></div>
        </div>

        <div className="steps">{manageStep(step)}</div>
        <div className="navigation">
          {step > 1 && (
            <button type="button" onClick={handlePreivious}>
              Previous
            </button>
          )}
          <button type="button" onClick={handleNext}>
            {step === 3 ? "Submit" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Multisteps;