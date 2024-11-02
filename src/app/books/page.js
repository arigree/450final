"use client";
import useBookApi from "../../hooks/useBookApi";
import accountStyles from "./books.module.css";

export default function Books() {
  const { books, loading, error } = useBookApi();

  return (
    <main className={accountStyles.main}>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {books.length > 0 && (
        <div className={accountStyles.bookGrid}>
          {books.map((book) => (
            <div key={book.key} className={accountStyles.bookCard}>
              <img
                src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                alt={`Cover of ${book.title}`}
                className={accountStyles.bookCover}
              />
              <h3>{book.title}</h3>
              <p>by {book.author_name ? book.author_name.join(", ") : "Unknown Author"}</p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}