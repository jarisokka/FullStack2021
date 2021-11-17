import React from 'react';

const Total = ({ count }: { count: number}) => {
  return (
    <div>
      <p>Number of exercises{" "} {count}</p>
    </div>
  )
}

export default Total