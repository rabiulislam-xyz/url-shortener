import React, { useState } from 'react';
import axios from 'axios';
import Toastify from 'toastify-js';

const UrlForm = ({ addShortenedUrl }) => {
  const [longUrl, setLongUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL; // Access the API URL from environment variables
      const response = await axios.post(`${apiUrl}/short-urls/`, { target_url: longUrl });
      const shortcode = response.data.shortcode;
      addShortenedUrl({ longUrl, shortcode });
      setLongUrl('');
      showSuccessNotification('URL successfully shortened!');

    } catch (error) {
      console.error('Error while shortening URL:', error);
      showErrorNotification('Failed to shorten URL. Please try again.');

    }

    setLoading(false);
  };

  const showSuccessNotification = (message) => {
    Toastify({
      text: message,
      duration: 3000,
      close: true,
      backgroundColor: 'green',
      stopOnFocus: true,
      gravity: "bottom",
      position: "left",
    }).showToast();
  };

  const showErrorNotification = (message) => {
    Toastify({
      text: message,
      duration: 3000,
      close: true,
      backgroundColor: 'red',
      stopOnFocus: true,
      gravity: "bottom",
      position: "left",
    }).showToast();
  };

  return (
    <div className="container mt-5">
      <h1>URL Shortener</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-group mb-3">
          <input
            type="url"
            className="form-control"
            placeholder="Enter your target URL"
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
            required
          />
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? (
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            ) : (
              'Shorten'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UrlForm;
