
import { BookFilter } from "../cmps/BookFilter.jsx"
import { BookList } from "../cmps/BookList.jsx"
import { bookService } from "../services/book.service.js"
import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service.js"

const { Link } = ReactRouterDOM
const { useState, useEffect } = React

export function BookIndex() {
    const [books, setBooks] = useState(null)
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())

    useEffect(() => {
        loadBooks()
    }, [filterBy])

    function loadBooks() {
        bookService.query(filterBy)
            .then(books => setBooks(books))
            .catch(err => console.log('err:', err))
    }

    function onRemoveBook(bookId) {
        bookService.remove(bookId)
            .then(() => {
                setBooks(prevBooks => {
                    return prevBooks.filter(book => book.id !== bookId)
                })
                showSuccessMsg(`Book successfully removed! ${bookId}`)
            })
            .catch(err => {
                showErrorMsg(`Error removing Book: ${bookId}`)
                console.log('err:', err)
            })
    }



    function onSetFilter(filterBy) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
    }

    if (!books) return <div>Loading...</div>

    return (
        <section className="book-index">
            <h1>Welcome to Book index!</h1>
            <BookFilter filterBy={filterBy} onSetFilter={onSetFilter} />
            <Link to="/book/edit">Add Book</Link>
            <BookList books={books} onRemoveBook={onRemoveBook} />
        </section>
    )
}