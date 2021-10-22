import React, { useEffect } from 'react'
import { ALL_BOOKS, USER } from '../queries'
import { useQuery } from '@apollo/client'

const Recommend = (props) => {
  const result = useQuery(ALL_BOOKS)
  const user = useQuery(USER)
  let favorite = ''

  useEffect(() => {
    console.log("pävitetään suosituksia")
  }, [user]) // eslint-disable-line


  if (!props.show) {
    return null
  }

  if (user.loading) {
    return <div>Loading...</div>
  }

  let books = result.data.allBooks
  if(user.data.me === null) {
    favorite = 'you don´t have any favorites'
  } else {
    favorite = user.data.me.favoriteGenre
    books = books.filter(b => b.genres.includes(favorite))
  }

  return (
    <div>
      <h2>recommendations</h2>
      <p>Books in your favorite genre {favorite}</p>
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
    </div>
  )
}

export default Recommend
