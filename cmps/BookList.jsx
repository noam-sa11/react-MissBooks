import { BookPreview } from "./BookPreview.jsx"

export function BookList({ books, onRemoveBook, onSelectBookId, onEditSelectedBook }) {
    return (
        <ul className="book-list">
            {books.map((book, idx) =>
                <li key={book.id} className="book-card">
                    <BookPreview book={book} idx={idx + 1}/>
                    <section>
                        <button onClick={() => onRemoveBook(book.id)}>Remove Book</button>
                        <button onClick={() => onSelectBookId(book.id)}>Details</button>
                    </section>
                </li>
            )}
        </ul>
    )
}