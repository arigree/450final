"use client";
import { useState, useEffect } from "react";
import librarianStyles from "./dashboard.module.css";

export default function LibrarianDashboard() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [coverUrl, setCoverUrl] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const loadBooksFromLocalStorage = () => {
    const savedBooks = JSON.parse(localStorage.getItem("recentBooks")) || [];
    setBooks(savedBooks);
    setSearchResults(savedBooks);
  };

  useEffect(() => {
    loadBooksFromLocalStorage();
  }, []);

  const handleSearch = () => {
    const results = books.filter(
      (book) =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(results);
  };

  const handleAddBook = () => {
    if (!title || !author || !coverUrl) {
      alert("Please fill in all fields");
      return;
    }

    const newBook = {
      id: Date.now(),
      title,
      author,
      cover_url: coverUrl,
    };

    const updatedBooks = [newBook, ...books];
    setBooks(updatedBooks);
    localStorage.setItem("recentBooks", JSON.stringify(updatedBooks));


    setSearchResults(updatedBooks);


    setTitle("");
    setAuthor("");
    setCoverUrl("");
  };

  const handleDeleteBook = (bookId) => {
    const updatedBooks = books.filter((book) => book.id !== bookId);
    setBooks(updatedBooks);
    setSearchResults(updatedBooks);
    localStorage.setItem("recentBooks", JSON.stringify(updatedBooks));
  };

  const handleUpdateBook = (bookId) => {
    const bookToUpdate = books.find((book) => book.id === bookId);
    const updatedTitle = prompt("Enter new title:", bookToUpdate.title);
    const updatedAuthor = prompt("Enter new author:", bookToUpdate.author);

    if (updatedTitle && updatedAuthor) {
      const updatedBooks = books.map((book) =>
        book.id === bookId
          ? { ...book, title: updatedTitle, author: updatedAuthor }
          : book
      );

      setBooks(updatedBooks);
      setSearchResults(updatedBooks);
      localStorage.setItem("recentBooks", JSON.stringify(updatedBooks));
    }
  };

  const getCoverImageUrl = (book) => {
    if (book.cover_url) {
      return book.cover_url;
    }
    return "https://via.placeholder.com/150";
  };

  return (
    <main className={librarianStyles.main}>
      <div className={librarianStyles.form}>
        <h2>Add a New Book</h2>
        <input
          type="text"
          placeholder="Book Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={librarianStyles.input}
        />
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className={librarianStyles.input}
        />
        <input
          type="text"
          placeholder="Cover URL"
          value={coverUrl}
          onChange={(e) => setCoverUrl(e.target.value)}
          className={librarianStyles.input}
        />
        <button onClick={handleAddBook} className={librarianStyles.button}>
          Add Book
        </button>
      </div>

      <div className={librarianStyles.search}>
        <input
          type="text"
          placeholder="Search for books"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={librarianStyles.input}
        />
        <button onClick={handleSearch} className={librarianStyles.button}>
          Search
        </button>
      </div>

      <div className={librarianStyles.preview}>
        <h3>Books</h3>

        <div className={librarianStyles.bookGrid}>
          {searchResults.length > 0 ? (
            searchResults.map((book) => (
              <div key={book.id} className={librarianStyles.bookCard}>
                <img
                  src={getCoverImageUrl(book)}
                  alt={`Cover of ${book.title}`}
                  className={librarianStyles.bookCover}
                />
                <h3>{book.title}</h3>
                <p>by {book.author}</p>

                {book.id && (
                  <>
                    <button
                      onClick={() => handleUpdateBook(book.id)}
                      className={librarianStyles.button}
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDeleteBook(book.id)}
                      className={librarianStyles.button}
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            ))
          ) : (
            <p>No books found.</p>
          )}
        </div>
      </div>
    </main>
  );
}
