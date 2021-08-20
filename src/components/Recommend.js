import React from 'react';
import { useQuery } from '@apollo/client';
import { ALL_BOOKS, ME } from '../queries';

const Recommend = (props) => {
  const resAllBooks = useQuery(ALL_BOOKS);
  const resMe = useQuery(ME);

  let books = [];

  if (!props.show) return null;

  if (resAllBooks.loading) return <div>loading...</div>;
  books = books.concat(resAllBooks.data.allBooks);

  console.log(resMe.data);
  const myFavoriteGenre = resMe.data.me.favoriteGenre;

  return (
    <div>
      <h2>Recommendations</h2>
      <p>
        books in your favourite genre <span>{myFavoriteGenre}</span>
      </p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books
            .filter((book) => {
              console.log(book.genres);
              return book.genres.includes(myFavoriteGenre);
            })
            .map((book) => (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.author.name}</td>
                <td>{book.published}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Recommend;
