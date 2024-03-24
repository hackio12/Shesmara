import React, { useState } from 'react';

function Forgotpassword() {
  const [email, setEmail] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      if (response.ok) {
        // Provide feedback to the user indicating that the reset link has been sent
        alert('Reset password link sent to your email.');
      } else {
        // Handle error response
        const data = await response.json();
        alert(data.error); // Or handle error in a more user-friendly way
      }
    } catch (error) {
      console.error('Error sending reset password link:', error);
    }
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          required
        />
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
}

export default Forgotpassword;
