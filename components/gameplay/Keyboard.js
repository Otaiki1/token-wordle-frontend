import React from 'react';

const keys = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['Del', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'Enter']
];

export default function Keyboard({ clickHandler }) {
  const handleClick = (key) => {
    clickHandler(key);
  };

  return (
    <div className="my-4 flex flex-col items-center">
      {keys.map((row, i) => (
        <div key={i} className="flex">
          {row.map((key) => (
            <button
              key={key}
              className="key"
              onClick={() => handleClick(key)}
            >
              {key}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}
