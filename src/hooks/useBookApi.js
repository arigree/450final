"use client";
import { useState, useEffect } from "react";

export default function useBookApi(isRandom = false) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBooks = async (query) => {
    setLoading(true);
    try {
      const response = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`);
      if (!response.ok) throw new Error("Failed to fetch data");
      const data = await response.json();
      setBooks(data.docs || []);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isRandom) {
      const fetchRandomBooks = async () => {
        setLoading(true);
        try {
          const response = await fetch("https://openlibrary.org/search.json?q=the");
          if (!response.ok) throw new Error("Failed to fetch data");
          const data = await response.json();
          const shuffledBooks = data.docs.sort(() => 0.5 - Math.random()).slice(0, 10);
          setBooks(shuffledBooks);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };

      fetchRandomBooks();
    }
  }, [isRandom]);
  return { books, loading, error, fetchBooks };
}
