import React, { useState, useEffect } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'

import { ALL_BOOKS } from '../queries'

const Books = (props) => { 
  const temp = useLazyQuery(ALL_BOOKS)
  const [books, setBooks] = useState([])
  const result = useQuery(ALL_BOOKS)

  useEffect(() => {
    if(!result.data) {
      console.log("kirjojen haku epäonnistui")
      return
    }
    setBooks(result.data.allBooks)
  },[temp, result])

  const filterBooks = (genre) => {
    if (genre === null) {
      setBooks(result.data.allBooks)
      return
    }
    setBooks(result.data.allBooks)
    setBooks(books.filter(b => b.genres.includes(genre)))
  }

  if (!props.show) {
    return null
  }
  
  if (result.loading) {
    return <div>Loading...</div>
  }

  const napit = result.data.allBooks
  let genres = [...new Set(napit.map(g => g.genres))]
  genres = genres.reduce((a, b) => a.concat(b), []);
  genres = [...new Set(genres)]

  
  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      {genres.map(genre =>
      <button key={genre} onClick={() => filterBooks(genre)}>{genre}</button>
      )}
      <button onClick={() => filterBooks(null)}>reset</button>
    </div>
  )
}

export default Books