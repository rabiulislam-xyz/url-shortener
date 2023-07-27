import React, { useState } from 'react';
import UrlForm from '../components/UrlForm';
import UrlList from '../components/UrlList';
import Link from 'next/link';

const HomePage = () => {
  const [urls, setUrls] = useState([]);

  const addShortenedUrl = (urlData) => {
    if (urls.length === 10) {
      setUrls((prevUrls) => [urlData, ...prevUrls.slice(0, 9)]);
    } else {
      setUrls((prevUrls) => [urlData, ...prevUrls]);
    }
  };

  return (
    <div className="container mt-5">
      <Link href="/shorturl-list">
        View All Shortcodes
      </Link>

      <UrlForm addShortenedUrl={addShortenedUrl} />
      <UrlList urls={urls} />

      {/* Add a link/button to navigate to the ShortcodeList page */}

    </div>
  );
};

export default HomePage;
