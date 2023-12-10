
    const readingType = getReadingType(book.pageCount)
    const bookType = getBookType(book.publishedDate)
    const dynColor = getColorBasedOnPrice(book.listPrice.amount)
    const currSymbol = getCurrencySymbol(book.listPrice.currencyCode)
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