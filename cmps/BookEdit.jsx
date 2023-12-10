import { bookService } from '../services/book.service.js'
const { useState } = React

export function BookEdit({ onAddBook }) {
    const [newBook, setNewBook] = useState({ title: '', price: '' })

    const handleInputChange = (event) => {
        const { name, value } = event.target
        setNewBook((prevBook) => ({ ...prevBook, [name]: value }))
    }

    const handleAddBook = (event) => {
        event.preventDefault()
        bookService.save(newBook)
            .then(() => {
                onAddBook()
                setNewBook({ title: '', price: 0 })
            })
            .catch((error) => console.error('Error adding book:', error))
    }

    return (
        <form className="book-edit" onSubmit={handleAddBook}>
            <label htmlFor="title">Title:</label>
            <input
                type="text"
                id="title"
                name="title"
                value={newBook.title}
                onChange={handleInputChange}
                required
            />

            <label htmlFor="price">Price:</label>
            <input
                type="number"
                id="price"
                name="price"
                value={newBook.price}
                onChange={handleInputChange}
                required
            />

            <button type="submit">Add Book</button>
        </form>
    )
}