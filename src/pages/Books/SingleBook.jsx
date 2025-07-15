import React from 'react'
import { FiShoppingCart } from "react-icons/fi"
import { useParams } from "react-router-dom"

import { getImgUrl } from '../../utils/getImgUrl';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/feaures/cart/cartSlice';
import { useFetchBookByIdQuery } from '../../redux/feaures/books/booksApi';

const SingleBook = () => {
    const { id } = useParams();
    const { data: book, isLoading, isError } = useFetchBookByIdQuery(id);
    const dispatch = useDispatch();

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
    };

    if (isLoading) return <div className="text-center mt-10 text-lg">Loading...</div>;
    if (isError) return <div className="text-center mt-10 text-red-600">Error loading book information.</div>;

    return (
        <div className="max-w-5xl mx-auto shadow-lg p-8 rounded-lg bg-white mt-10">
            <h1 className="text-4xl font-bold mb-8 text-center">{book.title}</h1>

            <div className="flex flex-col md:flex-row gap-10">
                {/* Book Image */}
                <div className="flex-shrink-0">
                    <img
                        src={getImgUrl(book.coverImage)}
                        alt={book.title}
                        className="rounded-lg border p-[10px] w-full md:w-[350px] hover:scale-105 transition-transform duration-300 shadow-sm"
                    />
                </div>

                {/* Book Details */}
                <div className="flex-grow">
                    <p className="text-gray-800 mb-3 text-lg">
                        <strong>Author:</strong> {book.author || 'Admin'}
                    </p>
                    <p className="text-gray-800 mb-3 text-lg">
                        <strong>Published:</strong> {new Date(book?.createdAt).toLocaleDateString()}
                    </p>
                    <p className="text-gray-800 mb-4 text-lg capitalize">
                        <strong>Category:</strong> {book?.category}
                    </p>

                    {/* Description Box */}
                    <div className="bg-gray-50 p-5 rounded-lg border mb-6">
                        <p className="text-gray-700 leading-relaxed">
                            <strong>Description:</strong> <br />
                            {book.description}
                        </p>
                    </div>

                    <button
                        onClick={() => handleAddToCart(book)}
                        className="btn-primary px-6 py-3 flex items-center gap-2 w-full md:w-auto justify-center text-lg transition-transform duration-300 hover:scale-105"
                    >
                        <FiShoppingCart />
                        <span>Add to Cart</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SingleBook
