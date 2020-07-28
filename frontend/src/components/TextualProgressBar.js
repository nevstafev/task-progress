import React from 'react';

export default ({current, total, name}) => (
  <p>
    [
    <span className={name}>
      {Array(Math.floor((10 / total) * current))
        .fill('|')
        .join('')
        .padEnd(10, '\u00a0')}
    </span>
    ]
  </p>
);
