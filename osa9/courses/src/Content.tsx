import React from 'react'
import { CoursePart } from './types'
import Part from './Part'

const Content = ({ courseParts }: { courseParts: CoursePart[]}) => {
  return (
    <div>
      {courseParts.map(p => <Part part={p} key={p.name}/>)}
    </div>
  )
} 

export default Content