import { BookFilter } from "../cmps/BookFilter.jsx"
import { BookList } from "../cmps/BookList.jsx"
import { BookDetails } from "./BookDetails.jsx"
import { BookEdit } from "../cmps/BookEdit.jsx"
import { bookService } from "../services/book.service.js"


const { useState, useEffect } = React

export function BookIndex() {

    const [books, setBooks] = useState(null)
    const [selectedBookId, setSelectedBookId] = useState(null)
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())
    const [showBookEdit, setShowBookEdit] = useState(false)

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

    function handleAddBook() {
        loadBooks()
        setShowBookEdit(false)
    }


    if (!books) return <div>Loading...</div>
    return (
        <section className="book-index">
            {!selectedBookId &&
                <React.Fragment>
                    <h1>Welcome to Book index!</h1>
                    <BookFilter filterBy={filterBy} onSetFilter={onSetFilter} />
                    <button onClick={() => setShowBookEdit(true)}>Add Book</button>
                    <BookList
                        books={books}
                        onSelectBookId={onSelectbookId}
                        onRemoveBook={onRemoveBook}
                    />
                </React.Fragment>
            }
            {selectedBookId && 
                <BookDetails 
                    bookId={selectedBookId}
                    onBack={() => setSelectedBookId(null)}  
                />
            }
            {showBookEdit &&    
                <BookEdit onAddBook={handleAddBook} />
            }
        </section>
    )
}