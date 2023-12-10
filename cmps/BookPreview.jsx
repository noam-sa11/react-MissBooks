
export function BookPreview({ book }) {
    let imgTitle
    if (book.thumbnail) {
        const lastPartOfUrl = book.thumbnail.split("/").pop()
        imgTitle = lastPartOfUrl.replace(".jpg", "")
    } else {
        imgTitle = 'default'
    }

    const currSymbol = getCurrencySymbol(book.listPrice.currencyCode)

    return (
        <article className="book-preview">
            <h2>book Title: {book.title}</h2>
            <h4>book Price: {currSymbol}{book.listPrice.amount}</h4>
            <img src={`../assets/img/${imgTitle}.jpg`} alt="" />
        </article>
    )
}

function getCurrencySymbol(currencyCode) {
    const currencySymbols = {
        'USD': '$',
        'EUR': '€',
        'ILS': '₪'
    }

    return currencySymbols[currencyCode] || 'Unknown'
}