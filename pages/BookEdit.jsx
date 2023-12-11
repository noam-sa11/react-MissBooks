import { bookService } from '../services/book.service.js'
const { useNavigate, useParams } = ReactRouterDOM
const { useState, useEffect } = React


// export function BookEdit() {
export function BookEdit({ onAddBook, onCancelbookToEdit }) {
    const emptyBook = bookService.getEmptyBook()
    const [bookToEdit, setBookToEdit] = useState(emptyBook)
    const navigate = useNavigate()
    const params = useParams()

    useEffect(() => {
        if (params.bookId) {
            loadBook()
        }
    }, [])

    function loadBook() {
        bookService.getEmptyBook(params.bookId)
            .then(setBookToEdit)
            .catch(error => console.error('error:', error))
    }

    function handleInputChange(event) {
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

        setBookToEdit((prevBook) => ({
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

    function handleAddBook(event) {
        event.preventDefault()
        bookService.save(bookToEdit)
            .then(() => {
                navigate('/book')
                setBookToEdit(emptyBook)
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
                value={bookToEdit.title}
                onChange={handleInputChange}
                required
            />

            <label htmlFor="price">Price:</label>
            <input
                type="number"
                id="price"
                name="listPrice"
                value={bookToEdit.listPrice.amount || ''}
                onChange={handleInputChange}
                required
            />

            <button type="submit">Add Book</button>
            <button className="btn-cancel" onClick={onCancelbookToEdit}>X</button>
            <button className="btn-cancel" onClick={navigate('/book')}>X</button>
        </form>
    )
}
