import '../../assets/css/static/PartnerForm.css';
import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the default styles

const PartnerForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
    role: 'PRODUCT_PARTNER',
    shopName: '',
    shopDescription: '',
    shopImage: null,
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    contactNumber: '',
    isApproved: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'file') {
      const file = files[0];
      const reader = new FileReader();
      
      reader.onloadend = () => {
        setFormData({
          ...formData,
          [name]: reader.result, // Store Base64 string
        });
      };
      
      if (file) {
        reader.readAsDataURL(file); // Convert image file to Base64 string
      }
    } else {
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value,
      });
    }
  };
  
  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Log form data to verify it's populated correctly
    console.log('Form data before submission:', formData);

    try {
      const response = await fetch('http://localhost:5000/api/partner-with-us', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      
      if (result.success) {
        toast.success('Form submitted successfully!');
        // Handle successful submission (e.g., reset form or redirect)
        setFormData({
          email: '',
          password: '',
          firstName: '',
          lastName: '',
          phone: '',
          role: 'PRODUCT_PARTNER',
          shopName: '',
          shopDescription: '',
          shopImage: null,
          address: '',
          city: '',
          state: '',
          postalCode: '',
          country: '',
          contactNumber: '',
          isApproved: false
        });
        setStep(1);
      } else {
        toast.error('Submission failed!');
        // Handle failed submission
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('An error occurred while submitting the form.');
    }
  };

  return (
    <div className="multi-step-form-container">
      <form onSubmit={handleSubmit} className="form">
        {step === 1 && (
          <div className="form-step form-step-1">
            <h2>Shop Owner Details</h2>
            <div className="form-field">
              <label htmlFor="email">Email:</label>
              <input id="email" type="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="form-field">
              <label htmlFor="password">Password:</label>
              <input id="password" type="password" name="password" value={formData.password} onChange={handleChange} required />
            </div>
            <div className="form-field">
              <label htmlFor="firstName">First Name:</label>
              <input id="firstName" type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
            </div>
            <div className="form-field">
              <label htmlFor="lastName">Last Name:</label>
              <input id="lastName" type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
            </div>
            <div className="form-field">
              <label htmlFor="phone">Phone:</label>
              <input id="phone" type="text" name="phone" value={formData.phone} onChange={handleChange} required />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="form-step form-step-2">
            <h2>Shop Details</h2>
            <div className="form-field">
              <label htmlFor="shopName">Shop Name:</label>
              <input id="shopName" type="text" name="shopName" value={formData.shopName} onChange={handleChange} required />
            </div>
            <div className="form-field">
              <label htmlFor="shopDescription">Shop Description:</label>
              <textarea id="shopDescription" name="shopDescription" value={formData.shopDescription} onChange={handleChange} />
            </div>
            <div className="form-field">
              <label htmlFor="shopImage">Shop Image:</label>
              <input id="shopImage" type="file" name="shopImage" accept="image/*" onChange={handleChange} />
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="form-step form-step-3">
            <h2>Shop Location</h2>
            <div className="form-field">
              <label htmlFor="address">Address:</label>
              <input id="address" type="text" name="address" value={formData.address} onChange={handleChange} required />
            </div>
            <div className="form-field">
              <label htmlFor="city">City:</label>
              <input id="city" type="text" name="city" value={formData.city} onChange={handleChange} required />
            </div>
            <div className="form-field">
              <label htmlFor="state">State:</label>
              <input id="state" type="text" name="state" value={formData.state} onChange={handleChange} required />
            </div>
            <div className="form-field">
              <label htmlFor="postalCode">Postal Code:</label>
              <input id="postalCode" type="text" name="postalCode" value={formData.postalCode} onChange={handleChange} required />
            </div>
            <div className="form-field">
              <label htmlFor="country">Country:</label>
              <input id="country" type="text" name="country" value={formData.country} onChange={handleChange} required />
            </div>
            <div className="form-field">
              <label htmlFor="contactNumber">Contact Number:</label>
              <input id="contactNumber" type="text" name="contactNumber" value={formData.contactNumber} onChange={handleChange} required />
            </div>
          </div>
        )}

        <div className="form-buttons">
          {step > 1 && <button type="button" className="btn btn-back" onClick={prevStep}>Back</button>}
          {step < 3 && <button type="button" className="btn btn-next" onClick={nextStep}>Save & Next</button>}
          {step === 3 && <button type="submit" className="btn btn-submit">Submit</button>}
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default PartnerForm;
