import React from 'react'

interface NameProps {
  name: string;
}

const Header = (props: NameProps) => {
  return (
    <div>
      <h1>{props.name}</h1>
    </div>
  )
}

export default Header