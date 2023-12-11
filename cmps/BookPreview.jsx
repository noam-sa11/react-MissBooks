
export function BookPreview({ book }) {
    let imgTitle
    if (book.thumbnail) {
        const lastPartOfUrl = book.thumbnail.split("/").pop()
        imgTitle = lastPartOfUrl.replace(".jpg", "")
    } else {
        imgTitle = 'default'
    }

    const isOnSale = (book.listPrice.isOnSale) ? true : false
    const currSymbol = getCurrencySymbol(book.listPrice.currencyCode)
    const dynColor = getColorBasedOnPrice(book.listPrice.amount)

    return (
        <article className="book-preview">
            <h2>{book.title}</h2>
            <h4>
                book Price: 
                <span className={dynColor}>{` ${currSymbol}`}{book.listPrice.amount}</span>
            </h4>
            <div>
                {isOnSale && <span className="book-sale">SALE</span>}
                <img src={`../assets/img/${imgTitle}.jpg`} alt="" />
            </div>
        </article>
    )
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