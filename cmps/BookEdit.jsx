import { bookService } from '../services/book.service.js'
const { useState } = React

export function BookEdit({ onAddBook, onCancelNewBook }) {
    const emptyBook = bookService.getEmptyBook()
    const [newBook, setNewBook] = useState(emptyBook)


    const handleInputChange = (event) => {
        const field = event.target.name
        let { value } = event.target

        switch (event.target.type) {
            case 'number':
            case 'range':
                value = +value
                break;

            case 'checkbox':
                value = event.target.checked
                break

            default:
                break;
        }

        setNewBook((prevBook) => ({
            ...prevBook, [field]:
                (field === 'listPrice') ?
                    {
                        amount: value,
                        currencyCode: 'USD',
                        isOnSale: false,
                    }
                    : value
        }))
    }

    const handleAddBook = (event) => {
        event.preventDefault()
        bookService.save(newBook)
            .then(() => {
                onAddBook()
                setNewBook(emptyBook)
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
                name="listPrice"
                value={newBook.listPrice.amount || ''}
                onChange={handleInputChange}
                required
            />

            <button type="submit">Add Book</button>
            <button className="btn-cancel" onClick={onCancelNewBook}>X</button>
        </form>
    )
}
