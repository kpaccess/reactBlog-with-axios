import React from 'react';

const Footer = ({ length }) => {
  return (
    <footer className="Footer">
      <p>
        {length} {length > 1 ? 'items' : 'item'}{' '}
      </p>
    </footer>
  );
};

export default Footer;
