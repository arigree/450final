"use client";
import { useState, useEffect } from "react";

export default function useBookApi() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRandomBooks = async () => {
      setLoading(true);
      try {
        // Fetch books with a general query
        const response = await fetch("https://openlibrary.org/search.json?q=the");
        if (!response.ok) throw new Error("Failed to fetch data");
        const data = await response.json();

        // Shuffle the array and take the first 10 books
        const shuffledBooks = data.docs.sort(() => 0.5 - Math.random()).slice(0, 10);

        setBooks(shuffledBooks);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRandomBooks();
  }, []);

  return { books, loading, error };
}