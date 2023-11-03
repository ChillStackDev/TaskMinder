import React from 'react';
import { useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();

  // Check if the location pathname includes "/note/"
  const isNotePage = location.pathname.includes('/note/');
  const isTodoPage = location.pathname.includes('/todo');

  // Conditionally render the header based on the URL path
  if (isTodoPage) {
    // Return null when on the "/todo/" page
    return null;
  }
  // Change the h1 content based on the URL path
  const headerContent = isNotePage ? 'Note Page' : 'All Notes';

  return (
    <div className="app-header">
      <h1>{headerContent}</h1>
    </div>
  );
};

export default Header;
