
    const readingType = getReadingType(book.pageCount)
    const bookType = getBookType(book.publishedDate)
    return (
        <article className="book-preview">
            <h2>book Title: {book.title}</h2>
            <h4>book Price: {book.price}</h4>
            <img src={`../assets/img/${book.idx}.jpg`} alt="" />
        </article>
    )
}
function getReadingType(pageCount) {
    if (pageCount > 500) {
        return 'Serious Reading'
    } else if (pageCount > 200) {
        return 'Decent Reading'
    } else if (pageCount < 100) {
        return 'Light Reading'
    } else {
        return 'Average Reading'
    }
}
