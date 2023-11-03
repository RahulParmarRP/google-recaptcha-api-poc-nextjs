import React, { useEffect } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useState } from "react";
import { fetchStateCityAdvisors } from "./home";
import { serverSideVerify } from "./serverSideVerify";

// Site key: 6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI
// Secret key: 6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe
const SimpleForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: ""
  });
  const recaptchaRef = React.useRef();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const onCaptchaChange = async (captchaCode) => {
    console.log("recaptcha token", captchaCode);
    //    recaptchaRef.current.reset();
    clientSideVerify(captchaCode);
    serverSideVerify(captchaCode);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can perform some action with the form data here
    recaptchaRef.current.execute();
    console.log("Form Data:", formData);
  };

  useEffect(() => {
    // fetchStateCityAdvisors();
  }, []);

  return (
    <div>
      <h2>Simple Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Submit</button>
        <ReCAPTCHA
          ref={recaptchaRef}
          size="invisible"
          sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
          onChange={onCaptchaChange}
        />
      </form>
    </div>
  );
};
export default SimpleForm;
