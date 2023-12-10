import { bookService } from "../services/book.service.js"
import { LongTxt } from "../cmps/LongTxt.jsx"

const { useState, useEffect } = React

export function BookDetails({ bookId, onBack }) {
    const [book, setBook] = useState(null)

    useEffect(() => {
        bookService.get(bookId)
            .then(book => setBook(book))
    }, [])

    if (!book) return <div>Loading...</div>

    const readingType = getReadingType(book.pageCount)
    const bookType = getBookType(book.publishedDate)
    const dynColor = getColorBasedOnPrice(book.listPrice.amount)
    const currSymbol = getCurrencySymbol(book.listPrice.currencyCode)
    const isOnSale = (book.listPrice.isOnSale) ? true : false

    let imgTitle
    if (book.thumbnail) {
        const lastPartOfUrl = book.thumbnail.split("/").pop()
        imgTitle = lastPartOfUrl.replace(".jpg", "")
    } else {
        imgTitle = 'default'
    }

    return (
        <section className="book-details">
            <div>
                {isOnSale && <span className="book-sale">SALE</span>}
                <img src={`../assets/img/${imgTitle}.jpg`} alt="" />
            </div>
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
            <div className="book-categories">
                Categories:
                {book.categories.map((category) => (
                    <span key={`${book.id}-${category}`}>{` ${category} `}</span>
                ))}
            </div>
            <div>
                <LongTxt txt={book.description} length={100} />
            </div>
            {/* <p>{book.description}</p> */}
            <h6>
                Page Count: {book.pageCount}
                <span className="reading-type">{` (${readingType})`}</span>
            </h6>
            <h4>book Price: <span className={dynColor}>{currSymbol}{book.listPrice.amount}</span></h4>


            <button onClick={onBack}>Back</button>
        </section>
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