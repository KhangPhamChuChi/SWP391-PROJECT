import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS

const Verify = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubEmail = (e) => {
    e.preventDefault(); // Prevent form submission from reloading the page

    const url = `https://localhost:7088/api/Accounts/SendMail?toEmail=${email}`;
    const data = { email: email };

    // Log the URL and data being sent
    console.log("API URL:", url);
    console.log("Data to be sent:", data);

    axios
      .post(url, data)
      .then((result) => {
        console.log("Email sent response:", result); // Log the response
        clear();
        toast.success("Send successfully");
        navigate("/OTPVerify");
      })
      .catch((error) => {
        console.log(
          "Email send error:",
          error.response ? error.response.data : error.message
        ); // Log the error
        toast.error("Send failed");
      });
  };

  const clear = () => {
    setEmail("");
  };

  return (
    <div className="loginN">
      <ToastContainer /> {/* Add ToastContainer for displaying toasts */}
      <div className="container-fluid">
        <div className="row justify-content-center mt-3">
          <div className="text-center">
            <p className="lead login">Verify email</p>
          </div>
          <div className="text-center" style={{ width: "auto" }}>
            <p className="lead re">Please enter your email</p>
          </div>
        </div>
      </div>
      <div className="row justify-content-center">
        <form
          className="col-md-7 mt-3 pt-3 pb-3"
          style={{ width: "auto", height: "auto" }}
          onSubmit={handleSubEmail} // Handle form submission
        >
          <div className="form-floating mb-3">
            <input
              id="signupEmail"
              type="email"
              className="form-control"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="signupEmail" className="form-label">
              Enter email
            </label>
          </div>
          <div className="d-grid" style={{ margin: "1rem 0" }}>
            <button type="submit" className="btn btn-primary pt-3 pb-3">
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Verify;
