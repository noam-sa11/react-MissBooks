import { BookFilter } from "../cmps/BookFilter.jsx"
import { BookList } from "../cmps/BookList.jsx"
import { bookService } from "../services/book.service.js"
import { BookDetails } from "./BookDetails.jsx"

const { useState, useEffect } = React

export function BookIndex() {

    const [books, setBooks] = useState(null)
    const [selectedBookId, setSelectedBookId] = useState(null)
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())

    useEffect(() => {
        loadBooks()
        return () => {
            // alert('Bye Bye')
        }
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
            })
            .catch(err => console.log('err:', err))
    }


    function onSelectbookId(bookId) {
        setSelectedBookId(bookId)
    }

    function onSetFilter(filterBy) {
        setFilterBy(filterBy)
    }


    if (!books) return <div>Loading...</div>
    return (
        <section className="book-index">
            {!selectedBookId &&
                <React.Fragment>
                    <h1>Welcome to Book index!</h1>
                    <BookFilter filterBy={filterBy} onSetFilter={onSetFilter} />
                    <BookList books={books} onSelectBookId={onSelectbookId} onRemoveBook={onRemoveBook} />
                </React.Fragment>
            }
            {selectedBookId && <BookDetails onBack={() => setSelectedBookId(null)} bookId={selectedBookId} />}
        </section>
    )
}