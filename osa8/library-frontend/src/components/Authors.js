import React, { useState, useEffect } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import Select from 'react-select'

import { ALL_AUTHORS, EDIT_BORN, AUTHORS_NAMES } from '../queries'

const Authors = (props) => {
  const [ name, setName ] = useState(null)
  const [ born, setBorn ] = useState('')
  const [ authors, setAuthors ] = useState([])

  const result = useQuery(ALL_AUTHORS)
  const options = useQuery(AUTHORS_NAMES)

  const [ editAuthor, feedback ] = useMutation(EDIT_BORN, {
    refetchQueries: [  {query: ALL_AUTHORS } ],
    onError: (error) => {
      console.log(error)
    }
  })

  useEffect(() => {
    if (feedback.data && feedback.data.editAuthor === null) {
      console.log('person not found')
      return
    }
    if(!result.data) {
      console.log("kirjailijoiden haku epäonnistui")
      return
    }
    if(!options.data) {
      console.log("kirjailijoiden nimien haku epäonnistui")
      return
    }
    setAuthors(result.data.allAuthors)
  }, [result, feedback.data])  // eslint-disable-line 

  const submit = async (event) => {
    event.preventDefault()

    console.log('edit author')
    editAuthor({ variables: { name: name.value, born: Number(born) } })

    setName('')
    setBorn('')
  }

  if (!props.show) {
    return null
  }

  if (options.loading) {
    return <div>Loading...</div>
  } 
  
  let names = options.data.allAuthors
  names = names.map(p => ({value: p.name, label: p.name}))

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <h2>Set Birthday</h2>

      <form onSubmit={submit}>
            <Select
              defaultValue={name}
              onChange={setName}
              options={names}
            />
            <div>
              born <input
              value={born}
              onChange={({ target }) => setBorn(target.value)}
              />
            </div>
            <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default Authors