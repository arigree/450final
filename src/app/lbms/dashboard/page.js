"use client";
import { useState, useEffect } from "react";
import librarianStyles from "./dashboard.module.css";
import useBookApi from "../../../hooks/useBookApi";

export default function LibrarianDashboard() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [coverUrl, setCoverUrl] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const { books: apiBooks, loading, error } = useBookApi(searchQuery);
  const loadBooksFromLocalStorage = () => {
    const savedBooks = JSON.parse(localStorage.getItem("recentBooks")) || [];
    setBooks(savedBooks);
  };

  useEffect(() => {
    loadBooksFromLocalStorage();
  }, []);

  const handleSearch = () => {
    const results = [
      ...apiBooks,
      ...books.filter(
        (book) =>
          book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          book.author.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    ];
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

    setBooks((prevBooks) => {
      const updatedBooks = [newBook, ...prevBooks];
      localStorage.setItem("recentBooks", JSON.stringify(updatedBooks));
      return updatedBooks;
    });

    setTitle("");
    setAuthor("");
    setCoverUrl("");
  };

  const handleDeleteBook = (bookId) => {

    const updatedBooks = books.filter((book) => book.id !== bookId);
    setBooks(updatedBooks);
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
      localStorage.setItem("recentBooks", JSON.stringify(updatedBooks));
    }
  };

  const getCoverImageUrl = (book) => {
    if (book.cover_i) {
      return `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
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
        <h3>Search Results</h3>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}

        <div className={librarianStyles.bookGrid}>
          {searchResults.length > 0 ? (
            searchResults.map((book) => (
              <div key={book.id} className={librarianStyles.bookCard}>
                <img
                  src={book.cover_url || getCoverImageUrl(book)}
                  alt={`Cover of ${book.title}`}
                  className={librarianStyles.bookCover}
                />
                <h3>{book.title}</h3>
                <p>by {book.author}</p>

                {book.id ? (
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
                ) : (
                  <p>API book (cannot update)</p>
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
