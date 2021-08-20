import React, { useEffect, useState } from 'react';
import Authors from './components/Authors';
import Books from './components/Books';
import Recommend from './components/Recommend';
import NewBook from './components/NewBook';
import LoginForm from './components/LoginForm';
import { useApolloClient, useSubscription, useQuery } from '@apollo/client';
import { BOOK_ADDED, ALL_BOOKS } from './queries';

const App = () => {
  const [page, setPage] = useState('authors');
  const [token, setToken] = useState(null);
  const [newNotification, setNewNotification] = useState(null);
  const [allBooksGenres, setAllBooksGenres] = useState(null);

  const { data } = useQuery(ALL_BOOKS, {
    onCompleted: () => {
      const allGenres = data.allBooks.reduce((result, book) => {
        const hasGenres = book.genres;

        hasGenres.forEach((element) => {
          if (!result.includes(element)) {
            result = result.concat(element);
          }
        });

        return result;
      }, []);
      setAllBooksGenres(allGenres);
    },
  });

  useEffect(() => {
    const storedToken = localStorage.getItem('user-login-token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const client = useApolloClient();

  const handleLogOut = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  const setNotification = () => {
    setNewNotification('new book was added');
    setTimeout(() => {
      setNewNotification(null);
    }, 5000);
  };

  // update cache properly
  const updateCacheWith = (addedBook) => {
    // Test the added item's id whether contained in the current set.
    const includedIn = (set, object) =>
      set.map((item) => item.id).includes(object.id);

    const dataInStore = client.readQuery({ query: ALL_BOOKS });

    // Add data if it is not included
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(addedBook) },
      });
    }
  };

  // subscription
  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      console.log(subscriptionData);
      setNotification();
      updateCacheWith(subscriptionData.data.bookAdded);
    },
  });

  return (
    <div>
      {newNotification && <p>{newNotification}</p>}
      <div>
        {!token ? (
          <button onClick={() => setPage('login')}>Login</button>
        ) : (
          <button onClick={handleLogOut}>Log out</button>
        )}
      </div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token && (
          <button onClick={() => setPage('recommend')}>recommend</button>
        )}
        {token && <button onClick={() => setPage('add')}>add book</button>}
      </div>

      <Authors show={page === 'authors'} token={token} />

      {allBooksGenres && (
        <Books show={page === 'books'} filterLabels={allBooksGenres} />
      )}
      {/* <Books show={page === 'books'} /> */}

      <NewBook show={page === 'add'} />

      <LoginForm show={page === 'login'} setToken={setToken} />

      <Recommend show={page === 'recommend'} />
    </div>
  );
};

export default App;
