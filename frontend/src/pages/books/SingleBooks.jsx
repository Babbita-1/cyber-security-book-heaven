import React from 'react'
import { FiShoppingCart } from "react-icons/fi"
import { useParams } from "react-router-dom"
import { getImgUrl } from '../../utils/getImgUrl';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/features/cart/cartSlice';
import { useFetchBookByIdQuery } from '../../redux/features/books/booksApi';
import CopyrightNotice from '../../components/CopyrightNotice';

const SingleBook = () => {
    const { id } = useParams();
    const { data: book, isLoading, isError } = useFetchBookByIdQuery(id);
    const dispatch = useDispatch();

    const handleAddToCart = (product) => {
        dispatch(addToCart(product))
    }

    if (isLoading) return <div className="flex justify-center items-center min-h-[40vh] text-lg font-semibold">Loading...</div>
    if (isError) return <div className="flex justify-center items-center min-h-[40vh] text-red-500 font-semibold">Error loading book info</div>
    if (!book) return null;

    return (
        <section className="flex justify-center items-center min-h-[80vh] bg-gradient-to-br from-gray-50 to-blue-50 py-10 px-2">
            <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full flex flex-col md:flex-row overflow-hidden">
                {/* Book Image */}
                <div className="md:w-1/2 flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200 p-8">
                    <img
                        src={getImgUrl(book.coverImage)}
                        alt={book.title}
                        className="w-60 h-80 object-cover rounded-xl shadow-md border border-gray-200"
                    />
                </div>
                {/* Book Details */}
                <div className="md:w-1/2 p-8 flex flex-col justify-between">
                    <div>
                        <h1 className="text-3xl font-bold mb-2 text-gray-800">{book.title}</h1>
                        <div className="flex flex-wrap gap-2 mb-4">
                            <span className="inline-block bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full font-semibold uppercase tracking-wide">{book.category}</span>
                            {book.trending && (
                                <span className="inline-block bg-yellow-100 text-yellow-700 text-xs px-3 py-1 rounded-full font-semibold uppercase tracking-wide">Trending</span>
                            )}
                        </div>
                        <p className="text-gray-600 mb-2"><span className="font-semibold">Author:</span> {book.author || 'admin'}</p>
                        <p className="text-gray-600 mb-2"><span className="font-semibold">Published:</span> {new Date(book?.createdAt).toLocaleDateString()}</p>
                        <div className="flex items-baseline gap-3 mb-4">
                            <span className="text-2xl font-bold text-black">Rs {book.newPrice}</span>
                            {book.oldPrice !== null && book.oldPrice !== undefined && (
                                <span className="text-lg text-gray-400 line-through">Rs {book.oldPrice}</span>
                            )}
                        </div>
                        <p className="text-gray-700 mb-6"><span className="font-semibold">Description:</span> {book.description}</p>
                    </div>
                    <div>
                        <button
                            onClick={() => handleAddToCart(book)}
                            className="w-full md:w-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow transition-all duration-200 text-lg mb-4"
                        >
                            <FiShoppingCart className="text-xl" />
                            <span>Add to Cart</span>
                        </button>
                        <div className="mt-4 pt-4 border-t border-gray-200">
                            <CopyrightNotice className="italic text-xs" />
                            <p className="text-xs text-gray-500 mt-1">
                                Book cover and description are property of the publisher or its content creators.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SingleBook