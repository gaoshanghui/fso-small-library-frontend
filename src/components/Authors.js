import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries';

const Authors = (props) => {
  const [updatedAuthorName, setUpdatedAuthorName] = useState('');
  const [updatedAuthorBorn, setUpdatedAuthorBorn] = useState('');
  const { loading, data } = useQuery(ALL_AUTHORS);
  let authors = [];

  const [updateAuthor] = useMutation(EDIT_AUTHOR);

  if (!props.show) return null;

  if (loading) return <div>loading...</div>;

  authors = authors.concat(data.allAuthors);

  const handleAuthorUpdate = async (event) => {
    event.preventDefault();

    console.log(updatedAuthorName);
    console.log(updatedAuthorBorn);

    updateAuthor({
      variables: {
        editAuthorName: updatedAuthorName,
        editAuthorSetBornTo: Number(updatedAuthorBorn),
      },
    });

    setUpdatedAuthorName('');
    setUpdatedAuthorBorn('');
  };

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Set birth Year form, only show for the logged in user */}
      {props.token && (
        <div>
          <h3>Set Birth Year</h3>
          <form onSubmit={handleAuthorUpdate}>
            <div>
              <label>
                <span>name</span>
                <select
                  onChange={(event) => setUpdatedAuthorName(event.target.value)}
                  value={updatedAuthorName}
                >
                  {authors.map((author) => {
                    return (
                      <option key={author.id} value={author.name}>
                        {author.name}
                      </option>
                    );
                  })}
                </select>
              </label>
            </div>
            <div>
              <label>
                <span>born</span>
                <input
                  onChange={(event) => setUpdatedAuthorBorn(event.target.value)}
                  value={updatedAuthorBorn}
                />
              </label>
            </div>
            <button type="submit">Update Author</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Authors;
