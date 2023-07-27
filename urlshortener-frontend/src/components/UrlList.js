import React from 'react';
import Toastify from "toastify-js";

const UrlList = ({ urls }) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
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

  const copyToClipboard = (shortcode) => {
    const textarea = document.createElement('textarea');
    textarea.value = `${apiUrl}/${shortcode}`;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    showSuccessNotification('Short URL copied to clipboard');
  };


  return (
    <div className="container mt-5">
      <ul className="list-group">
        {urls.map((url) => (
          <li className="list-group-item" key={url.shortcode}>
            <p>
              <strong>Short URL:</strong> <a href={`${apiUrl}/${url.shortcode}`} target="_blank">{`${apiUrl}/${url.shortcode}`}</a>
              <button onClick={() => copyToClipboard(url.shortcode)} className="btn btn-sm btn-secondary">
                Copy
              </button>
            </p>
            <p>
              <strong>Target:</strong> {url.longUrl}
            </p>

          </li>
        ))}
      </ul>
    </div>
  );
};

export default UrlList;
