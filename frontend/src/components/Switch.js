import React from 'react';
import { Link } from 'react-router-dom';

const Switch = () => {
  return (
    <div className='switch'>
      <Link to="/">
        <button className='b1'>Notes</button>
      </Link>
      <Link to="/todo">
        <button className='b1'>Todo</button>
      </Link>
    </div>
  );
};

export default Switch;
