import { BookPreview } from "./BookPreview.jsx"
const { Link } = ReactRouterDOM

export function BookList({ books, onRemoveBook }) {
    return (
        <ul className="book-list">
            {books.map((book, idx) =>
                <li key={book.id} className="book-card">
                    <BookPreview book={book}/>
                    <section>
                        <button onClick={() => onRemoveBook(book.id)}>Remove Book</button>
                        <button><Link to={`/book/${book.id}`}>Details</Link></button>
                        <button><Link to={`/book/edit/${book.id}`}>Edit</Link></button>
                    </section>
                </li>
            )}
        </ul>
    )
}