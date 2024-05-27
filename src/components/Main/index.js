import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from "./styles.module.css";
import AddBookModal from '../Book/AddBookModel';
// import BookDetails from '../Book/BookDetails';

const Main = () => {
	const [books, setBooks] = useState([]);
	const [showModal, setShowModal] = useState(false);
	// const [editBook, setEditBook] = useState(null);

	// logout logic
	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};

	// see all book data api
	useEffect(() => {
		const fetchBooks = async () => {
			try {
				// Retrieve token from local storage
				const token = localStorage.getItem("token");

				// Include token in the request headers
				const config = {
					headers: {
						Authorization: `Bearer ${token}`
					}
				};

				// Make GET request with token included
				const response = await axios.get('http://localhost:8080/api/book', config);
				console.log("Response:", response.data); // Debugging: Log the response
				setBooks(response.data);
			} catch (error) {
				console.error("Error fetching books:", error); // Debugging: Log any errors
			}
		};

		fetchBooks();
	}, []);

	// add model
	const handleAddBook = () => {
		setShowModal(true);
	};
	// close model
	const handleCloseModal = () => {
		setShowModal(false);
	};

	//delete logic 
	const deleteBook = async (id) => {
		try {
			// Retrieve token from local storage
			const token = localStorage.getItem("token");

			// Include token in the request headers
			const config = {
				headers: {
					Authorization: `Bearer ${token}`
				}
			};
			const url = `http://localhost:8080/api/book/${id}`;
			await axios.delete(url, config);

			// Update the books state by filtering out the deleted book
			setBooks(prevBooks => prevBooks.filter(book => book._id !== id));

			console.log("Book deleted successfully");
		} catch (error) {
			console.error('Error deleting book:', error);
			// Handle error (display error message, etc.)
		}
	}

	//edit book logic
	// const handleEdit = (book) => {
	// 	setEditBook(book);
	// 	// Open edit modal or form
	// };

	// const handleEditSubmit = async (updatedBookData) => {
	// 	try {
	// 		const token = localStorage.getItem("token");
	// 		const config = {
	// 			headers: {
	// 				Authorization: `Bearer ${token}`
	// 			}
	// 		};
	// 		const url = `http://localhost:8080/api/book/${editBook._id}`;
	// 		const response = await axios.put(url, updatedBookData, config);
	// 		console.log("Book updated successfully:", response.data);
	// 		// Update the state with the updated book data
	// 		setBooks(prevBooks => prevBooks.map(book => (book._id === response.data.updatedBook._id ? response.data.updatedBook : book)));
	// 	} catch (error) {
	// 		console.error('Error updating book:', error);
	// 	}
	// 	setEditBook(null);
	// };

	return (
		<div className={styles.main_container}>
			<nav className={styles.navbar}>
				<h1>booookstore</h1>
				<button className={styles.white_btn} onClick={handleAddBook}>
					Add Book
				</button>
				<button className={styles.white_btn} onClick={handleLogout}>
					Logout
				</button>
			</nav>

			{/* add book  */}
			{showModal && <AddBookModal onClose={handleCloseModal} />}

			{/* See all book  */}
			<div className={styles.card}>
				<div className={styles.booklist}>
					<h2>Book List</h2>
					<div className={styles.bookgrid}>
						{books.map((book, index) => (
							<div key={index} className={styles.bookcard}>
								<img src={book.image} alt={book.title} className={styles.bookimage} />
								<div className={styles.bookdetails}>
									<h3 className={styles.booktitle}>{book.title}</h3>
									<p className={styles.bookauthor}>{book.author}</p>
									<p className={styles.bookdescription}>{book.description}</p>
									<p className={styles.bookprice}>{book.price}</p>
								</div>
								{/* <button className={styles.viewDetailsBtn}>
									View Details
								</button> */}
								<button onClick={() => deleteBook(book._id)}>Delete</button>
								<Link to={`/update/${book._id}`	} onClose={handleCloseModal}>update</Link>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
		// </div>
	);
};

export default Main;