import { BookPreview } from "./BookPreview.jsx"
const { Link } = ReactRouterDOM

export function BookList({ books, onRemoveBook }) {
    return (
        <ul className="book-list">
            {books.map((book) =>
                <li key={book.id} className="book-card">
                    <BookPreview book={book}/>
                    <section>
                        <button className="fa delete" onClick={() => onRemoveBook(book.id)}></button>
                        <button><Link to={`/book/${book.id}`} className="fa info"></Link></button>
                        <button><Link to={`/book/edit/${book.id}`} className="fa edit"></Link></button>
                    </section>
                </li>
            )}
        </ul>
    )
}