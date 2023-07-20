import React from 'react';

interface Props {
  children: string;
}

const HTMLBreakText: React.FC<Props> = ({children}) => {
  return (
    <>
      {children.split('\n').map(s => (
        <>
          {s}
          <br />
        </>
      ))}
    </>
  );
};

export default HTMLBreakText;
