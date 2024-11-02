"use client";
import React, { useState } from "react";
import libraryStyles from "@/app/mylibrary/library.module.css";
import useBookApi from "../../hooks/useBookApi";

export default function Library() {
  const [search, setSearch] = useState("");
  const { books, loading, error, fetchBooks } = useBookApi(); 

  const bookSearch = (query) => {
    setSearch(query);
    if (query) {
      fetchBooks(query);
    } else {
     
      fetchBooks("the");
    }
  };

  const clearSearch = () => {
    setSearch("");
    fetchBooks("");
  };

  return (
    <main className={libraryStyles.main}>
      <div className={libraryStyles.content}>
        <h1>Welcome to My Library Page!</h1>
        <div className={libraryStyles.search}>
          <input
            type="text"
            className={libraryStyles.searchBox}
            placeholder="Search for a book"
            value={search}
            onChange={(e) => bookSearch(e.target.value)}
          />
          <button onClick={clearSearch} className={libraryStyles.clearButton}>
            Clear Search
          </button>
        </div>
        <div className={libraryStyles.searchResults}>
            {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        <div className={libraryStyles.checkedOut}></div>
        <div className={libraryStyles.recommendations}>
          {books.length > 0 ? (
            books.map((book) => (
              <div key={book.key} className={libraryStyles.bookCard}>
                {book.cover_i && (
                  <img
                    src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                    alt={book.title}
                    className={libraryStyles.bookCover}
                  />
                )}
                <h2>{book.title}</h2>
                <p>{book.author_name?.join(", ")}</p>
                <p>ISBN: {book.isbn ? book.isbn[0]?.substring(0, 10) + "..." : "N/A"}</p>
                
              </div>
            ))
          ) : (
            <p>No results found</p>
          )}
        </div>
        </div>
        <div className={libraryStyles.checkedOut}></div>
        <div className={libraryStyles.recommendations}></div>
      </div>
    </main>
  );
}
