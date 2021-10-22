import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`
export const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      published
      author {
        name
      }
      genres
    }
  }
`
export const NEW_BOOK = gql`
  mutation addBook($title: String!, $published: Int!, $author: String!, $genres: [String!]!) {
    addBook(
      title: $title,
      published: $published,
      author: $author,
      genres: $genres
    ) {
      title
      published
      genres
      author {
        name
      }
    }
  }
`

export const EDIT_BORN = gql`
mutation editAuthor($name: String!, $born: Int!) {
  editAuthor(
    name: $name,
    born: $born
  ) {
    name
    born
  }
}
`
export const AUTHORS_NAMES = gql`
  query {
    allAuthors {
      name
    }
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(
      username: $username,
      password: $password
      ) {
      value
    }
  }
`

export const USER = gql`
  query {
    me {
      username
      favoriteGenre
      id
    }
  }
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      title
      published
      author {
        name
      }
      genres
    }
  }
`