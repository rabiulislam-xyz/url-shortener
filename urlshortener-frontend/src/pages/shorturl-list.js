import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Pagination } from 'react-bootstrap';
import Link from "next/link";

const ITEMS_PER_PAGE = 5; // Number of items per page

const ShortcodeList = () => {
  const [shortcodes, setShortcodes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasnext, setHasnext] = useState(false);

  useEffect(() => {
    fetchShortcodes(1);
  }, [currentPage]);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const fetchShortcodes = async () => {
    try {
      const response = await axios.get(`${apiUrl}/short-urls/?page=${currentPage}`);
      setShortcodes(response.data.results);
      setHasnext(response.data.next != null)
    } catch (error) {
      console.error('Error while fetching shortcodes:', error);
    }
  };

  const handlePageChange = (page) => {
    console.log(page);
    setCurrentPage(page);
  };


  return (
    <div className="container mt-5">
      <Link href="/">
        Home page
      </Link>

      <h2 className="mt-5">All Created Shortcodes</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Shortcode</th>
            <th>Target URL</th>
            <th>Hits</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {shortcodes.map((shortcode) => (
            <tr key={shortcode.shortcode}>
              <td><strong><a href={`${apiUrl}/${shortcode.shortcode}`} target="_blank">{`${apiUrl}/${shortcode.shortcode}`}</a></strong></td>
              <td>{shortcode.target_url}</td>
              <td>{shortcode.hits}</td>
              <td>{shortcode.created_at}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination>
        <Pagination.Prev disabled={currentPage <= 1} onClick={() => handlePageChange(currentPage - 1)} />
        <Pagination.Next disabled={!hasnext} onClick={() => handlePageChange(currentPage + 1)} />
      </Pagination>
    </div>
  );
};

export default ShortcodeList;
