
export function BookPreview({ book, idx }) {
    const readingType = getReadingType(book.pageCount)
    const bookType = getBookType(book.publishedDate)
    const dynColor = getColorBasedOnPrice(book.listPrice.amount)
    const currSymbol = getCurrencySymbol(book.listPrice.currencyCode)
    const isOnSale = (book.listPrice.isOnSale) ? true : false

    return (
        <article className="book-preview">
            <h2>
                book Title: {book.title}
                <span className="book-lang">{` (${book.language})`}</span>
            </h2>
            <h3>SubTitle: {book.subtitle}</h3>
            <h4>Author: {book.authors[0]}</h4>
            <h5>
                Publish Year: {book.publishedDate}
                {bookType && <span className="book-type">{` (${bookType})`}</span>}
            </h5>
            <p>{book.description}</p>
            <h6>
                Page Count: {book.pageCount}
                <span className="reading-type">{` (${readingType})`}</span>
            </h6>
            <h4>book Price: <span className={dynColor}>{currSymbol}{book.listPrice.amount}</span></h4>
            <div>
                {isOnSale && <span className="book-sale">SALE</span>}
                <img src={`../assets/img/${idx + 1}.jpg`} alt="" />
            </div>
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

function getBookType(publishedDate) {
    const yearDiff = new Date().getFullYear() - publishedDate

    if (yearDiff > 10) {
        return 'Vintage'
    } else if (yearDiff < 1) {
        return 'New'
    } else {
        return ''
    }
}

function getColorBasedOnPrice(price) {
    if (price > 150) {
        return 'red'
    } else if (price < 20) {
        return 'green'
    } else {
        return 'black'
    }
}

function getCurrencySymbol(currencyCode) {
    const currencySymbols = {
        'USD': '$',
        'EUR': '€',
        'ILS': '₪'
    }

    return currencySymbols[currencyCode] || 'Unknown'
}