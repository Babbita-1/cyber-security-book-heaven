import React from "react";
import { useSearchParams } from "react-router-dom";
import { useSearchBooksQuery } from "../../redux/features/books/booksApi";
import BookCard from "./BookCard";
import Loading from "../../components/Loading";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  const {
    data: books,
    isLoading,
    isError,
    error,
  } = useSearchBooksQuery(query, {
    skip: !query,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return (
      <section className="min-h-[60vh] flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-2">
        <div className="bg-white rounded-xl shadow-md p-8 max-w-lg w-full text-center">
          <h2 className="text-2xl font-bold mb-4 text-red-600">Error</h2>
          <p className="text-red-500 mb-2">
            {error?.data?.message || "An error occurred while searching"}
          </p>
        </div>
      </section>
    );
  }

  if (!books || books.length === 0) {
    return (
      <section className="min-h-[60vh] flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-2">
        <div className="bg-white rounded-xl shadow-md p-8 max-w-lg w-full text-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2748/2748558.png"
            alt="No results"
            className="w-24 h-24 mx-auto mb-4 opacity-70"
          />
          <h2 className="text-2xl font-bold mb-2">No books found</h2>
          <p className="text-gray-500 mb-2">
            No books found matching your search for{" "}
            <span className="font-semibold text-blue-600">"{query}"</span>.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-[80vh] bg-gradient-to-br from-gray-50 to-blue-50 py-10 px-2">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Search Results
          </h2>
          <p className="text-gray-600 text-lg">
            Showing{" "}
            <span className="font-semibold text-blue-600">{books.length}</span>{" "}
            result{books.length > 1 ? "s" : ""} for{" "}
            <span className="font-semibold text-blue-600">"{query}"</span>
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {books.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SearchResults;
