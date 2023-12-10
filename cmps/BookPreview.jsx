

export function BookPreview({ book }) {
    return (
        <article className="book-preview">
            <h2>book Title: {book.title}</h2>
            <h4>book Price: {book.price}</h4>
            <img src={`../assets/img/${book.idx}.jpg`} alt="" />
        </article>
    )
}