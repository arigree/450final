"use client";
import { useEffect, useState } from "react";
import useBookApi from "../../hooks/useBookApi";
import accountStyles from "./books.module.css";

export default function Books() {
  const { books: apiBooks, loading, error } = useBookApi(true);
  const [recentBooks, setRecentBooks] = useState([]);
  const [showRecentBooks, setShowRecentBooks] = useState(false);

  useEffect(() => {
    const savedBooks = JSON.parse(localStorage.getItem("recentBooks")) || [];
    setRecentBooks(savedBooks);
  }, []);

  const toggleBooksView = () => {
    setShowRecentBooks((prevState) => !prevState);
  };

  return (
    <main className={accountStyles.main}>
      {loading && !showRecentBooks && <p>Loading...</p>}
      {error && !showRecentBooks && <p>Error: {error}</p>}

      {showRecentBooks ? (
        <div className={accountStyles.bookGrid}>
          {recentBooks.length > 0 ? (
            recentBooks.map((book) => (
              <div key={book.id} className={accountStyles.bookCard}>
                <img
                  src={book.cover_url || "/default-cover.jpg"}
                  alt={`Cover of ${book.title}`}
                  className={accountStyles.bookCover}
                />
                <h3>{book.title}</h3>
                <p>by {book.author || "Unknown Author"}</p>
              </div>
            ))
          ) : (
            <p>No recently added books available.</p>
          )}
        </div>
      ) : (
        apiBooks.length > 0 && (
          <div className={accountStyles.bookGrid}>
            {apiBooks.map((book) => (
              <div key={book.key} className={accountStyles.bookCard}>
                <img
                  src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                  alt={`Cover of ${book.title}`}
                  className={accountStyles.bookCover}
                />
                <h3>{book.title}</h3>
                <p>
                  by{" "}
                  {book.author_name
                    ? book.author_name.join(", ")
                    : "Unknown Author"}
                </p>
              </div>
            ))}
          </div>
        )
      )}

      <div className={accountStyles.actions}>
        <button
          className={accountStyles.loadButton}
          onClick={toggleBooksView}
        >
          {showRecentBooks ? "Show All Books" : "Show Recently Added Books"}
        </button>
      </div>
    </main>
  );
}
