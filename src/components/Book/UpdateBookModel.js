import axios from 'axios';
import React, {  useState } from 'react';
import styles from '../Book/styles.module.css';

const UpdateBookModal = ({ onClose }) => {
    const [books, setBooks] = useState([]);
    const [ setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        description: '',
        price: '',
        bookimage: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleAddBook = async (e) => {
        e.preventDefault();
        try {
            // Retrieve token from local storage
            const token = localStorage.getItem("token");

            // Include token in the request headers
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };

            const response = await axios.post('http://localhost:8080/api/book/:id', formData, config);
            setBooks([...books, response.data]);
            setShowForm(false);
            setFormData({
                title: '',
                author: '',
                description: '',
                price: '',
                bookimage: '',
            });
        } catch (error) {
            console.error('There was an error adding the book!', error);
        }
    };
    return (
        <>
            <div className={styles.overlay} >
                <div className={styles.modal}>
                    <h2>edit book</h2>
                    <form className={styles.book_form} onSubmit={handleAddBook}>
                        <input
                            type="text"
                            name="image"
                            placeholder="image"
                            value={formData.image}
                            onChange={handleInputChange}
                            required
                        />
                        <input
                            type="text"
                            name="title"
                            placeholder="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            required
                        /><input
                            type="text"
                            name="author"
                            placeholder="author"
                            value={formData.author}
                            onChange={handleInputChange}
                            required
                        /><input
                            type="text"
                            name="description"
                            placeholder="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            required
                        /><input
                            type="text"
                            name="price"
                            placeholder="price"
                            value={formData.price}
                            onChange={handleInputChange}
                            required
                        />
                        <button type="submit" className={styles.white_btn}>
                            Submit
                        </button>
                        <button type="button" onClick={onClose} className={styles.cancel}>
                            Cancel
                        </button>
                    </form >
                </div>
            </div >
        </>
    );
};

export default UpdateBookModal;
