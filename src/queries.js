import { gql } from '@apollo/client';

// ALL_AUTHORS gql query to retrieve all authors
export const ALL_AUTHORS = gql`
  query ALL_AUTHORS {
    allAuthors {
      id
      name
      born
      bookCount
    }
  }
`;

// ALL_BOOKS gql query to retrive all books
export const ALL_BOOKS = gql`
  query ALL_BOOKS($genre: String) {
    allBooks(genre: $genre) {
      id
      title
      published
      author {
        name
        born
        id
      }
      genres
    }
  }
`;

export const ME = gql`
  query ME {
    me {
      username
      favoriteGenre
      id
    }
  }
`;

// CREATE_BOOK gql query to add a new book
export const CREATE_BOOK = gql`
  mutation CREATE_BOOKS(
    $addBookTitle: String!
    $addBookAuthor: String!
    $addBookPublished: Int!
    $addBookGenres: [String!]!
  ) {
    addBook(
      title: $addBookTitle
      author: $addBookAuthor
      published: $addBookPublished
      genres: $addBookGenres
    ) {
      id
      title
    }
  }
`;

// EDIT_AUTHOR gql query to update a author
export const EDIT_AUTHOR = gql`
  mutation EDIT_AUTHOR($editAuthorName: String!, $editAuthorSetBornTo: Int!) {
    editAuthor(name: $editAuthorName, setBornTo: $editAuthorSetBornTo) {
      id
      name
      born
      bookCount
    }
  }
`;

// LOGIN gql query to logging in
export const LOGIN = gql`
  mutation LOGIN($loginUsername: String!, $loginPassword: String!) {
    login(username: $loginUsername, password: $loginPassword) {
      value
    }
  }
`;

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      id
      title
      published
      author {
        name
        born
        id
      }
      genres
    }
  }
`;
