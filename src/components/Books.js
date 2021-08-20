import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { ALL_BOOKS } from '../queries';

const Books = (props) => {
  const [allBooks, setAllBooks] = useState(null);
  const [filter, setFilter] = useState(null);
  // const [filterLabels, setFilterLabels] = useState(null);
  // const [getBooks, { loading, data }] = useLazyQuery(ALL_BOOKS);

  const { loading, data } = useQuery(ALL_BOOKS, {
    onCompleted: () => {
      setAllBooks(data.allBooks);
    },
    variables: { genre: filter },
  });

  // useEffect(() => {
  //   getBooks({ variables: { genre: filter } });
  // }, [filter, getBooks]);

  if (!props.show) return null;

  if (loading) {
    return <div>loading...</div>;
  }

  // const books = data.allBooks;

  // const allGenres = props.books.reduce((result, book) => {
  //   const hasGenres = book.genres;

  //   hasGenres.forEach((element) => {
  //     if (!result.includes(element)) {
  //       result = result.concat(element);
  //     }
  //   });

  //   return result;
  // }, []);

  return (
    <div>
      <h2>books</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {allBooks &&
            allBooks.map((book) => (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.author.name}</td>
                <td>{book.published}</td>
              </tr>
            ))}
        </tbody>
      </table>
      {/* Genre filter */}
      <div>
        <h3>Filter</h3>
        {props.filterLabels.map((genre) => {
          return (
            <button key={genre} onClick={() => setFilter(genre)}>
              {genre}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Books;
