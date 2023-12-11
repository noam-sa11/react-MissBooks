import { bookService } from "../services/book.service.js"
import { LongTxt } from "../cmps/LongTxt.jsx"
import { AddReview } from "../cmps/AddReview.jsx"

const { useParams, useNavigate, Link } = ReactRouterDOM
const { useState, useEffect } = React

// export function BookDetails({ bookId, onBack, onEdit }) {
//     const [book, setBook] = useState(null)

//     useEffect(() => {
//         bookService.get(bookId)
//             .then(book => setBook(book))
//     }, [])


//     function getReadingType(pageCount) {
//         if (pageCount > 500) {
//             return 'Serious Reading'
//         } else if (pageCount > 200) {
//             return 'Decent Reading'
//         } else if (pageCount < 100) {
//             return 'Light Reading'
//         } else {
//             return 'Average Reading'
//         }
//     }

//     function getBookType(publishedDate) {
//         const yearDiff = new Date().getFullYear() - publishedDate

//         if (yearDiff > 10) {
//             return 'Vintage'
//         } else if (yearDiff < 1) {
//             return 'New'
//         } else {
//             return ''
//         }
//     }

//     function getColorBasedOnPrice(price) {
//         if (price > 150) {
//             return 'red'
//         } else if (price < 20) {
//             return 'green'
//         } else {
//             return 'black'
//         }
//     }

//     function getCurrencySymbol(currencyCode) {
//         const currencySymbols = {
//             'USD': '$',
//             'EUR': '€',
//             'ILS': '₪'
//         }

//         return currencySymbols[currencyCode] || 'Unknown'
//     }


//     if (!book) return <div>Loading...</div>

//     const readingType = getReadingType(book.pageCount)
//     const bookType = getBookType(book.publishedDate)
//     const dynColor = getColorBasedOnPrice(book.listPrice.amount)
//     const currSymbol = getCurrencySymbol(book.listPrice.currencyCode)
//     const isOnSale = (book.listPrice.isOnSale) ? true : false

//     let imgTitle
//     if (book.thumbnail) {
//         const lastPartOfUrl = book.thumbnail.split("/").pop()
//         imgTitle = lastPartOfUrl.replace(".jpg", "")
//     } else {
//         imgTitle = 'default'
//     }

//     function onEditBook() {

//     }

//     return (
//         <section className="book-details">
//             <div>
//                 {isOnSale && <span className="book-sale">SALE</span>}
//                 <img src={`../assets/img/${imgTitle}.jpg`} alt="" />
//             </div>
//             <h2>
//                 book Title: {book.title}
//                 <span className="book-lang">{` (${book.language})`}</span>
//             </h2>
//             <h3>SubTitle: {book.subtitle}</h3>
//             <h4>Author: {book.authors[0]}</h4>
//             <h5>
//                 Publish Year: {book.publishedDate}
//                 {bookType && <span className="book-type">{` (${bookType})`}</span>}
//             </h5>
//             <div className="book-categories">
//                 Categories:
//                 {book.categories.map((category) => (
//                     <span key={`${book.id}-${category}`}>{` ${category} `}</span>
//                 ))}
//             </div>
//             <div>
//                 <LongTxt txt={book.description} />
//             </div>
//             <h6>
//                 Page Count: {book.pageCount}
//                 <span className="reading-type">{` (${readingType})`}</span>
//             </h6>
//             <h4>book Price: <span className={dynColor}>{currSymbol}{book.listPrice.amount}</span></h4>

//             <section className="actions-section">
//                 <button onClick={onBack}>Back</button>
//                 <button onClick={onEditBook}>Edit</button>
//                 <button>Prev Book</button>
//                 <button>Next Book</button>
//             </section>
//         </section>
//     )
// }

// ROUTING
export function BookDetails() {

    const params = useParams()
    const navigate = useNavigate()
    const [book, setBook] = useState(null)
    const [reviews, setReviews] = useState([])

    useEffect(() => {
        loadBook()
        loadReviews()
    }, [params.bookId])

    function loadBook() {
        bookService.get(params.bookId)
            .then(book => setBook(book))
            .catch(error => {
                console.log('error:', error)
                navigate('/')
            })
    }

    function loadReviews() {
        bookService.getReviews(params.bookId).then((reviews) => {
            setReviews(reviews)
        })
    }

    function onAddReview(bookId, review) {
        bookService.addReview(bookId, review).then(() => {
            loadReviews()
        })
    }

    function onDeleteReview(reviewId) {
        bookService.deleteReview(params.bookId, reviewId)
            .then(() => {
                loadReviews()
            })
            .catch(error => {
                console.log('Error deleting review:', error)
            })
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


    if (!book) return <div>Loading...</div>

    const readingType = getReadingType(book.pageCount)
    const bookType = getBookType(book.publishedDate)
    const dynColor = getColorBasedOnPrice(book.listPrice.amount)
    const currSymbol = getCurrencySymbol(book.listPrice.currencyCode)
    const isOnSale = (book.listPrice.isOnSale) ? true : false
    const nextBookId = bookService.getNegBookId(params.bookId, 1)
    const prevBookId = bookService.getNegBookId(params.bookId, -1)

    let imgTitle
    if (book.thumbnail) {
        const lastPartOfUrl = book.thumbnail.split("/").pop()
        imgTitle = lastPartOfUrl.replace(".jpg", "")
    } else {
        imgTitle = 'default'
    }

    function onBack() {
        navigate('/book')
    }
    console.log('reviews:', reviews)
    return (
        <section className="book-details">
            <div className="book-img">
                {isOnSale && <span className="book-sale">SALE</span>}
                <img src={`../assets/img/${imgTitle}.jpg`} alt="" />
            </div>

            <h2 className="book-title">
                book Title: {book.title}
                <span className="book-lang">{` (${book.language})`}</span>
            </h2>

            <h3 className="book-subtitle">
                SubTitle: {book.subtitle}
            </h3>

            <h4 className="book-author">
                Author: {book.authors[0]}
            </h4>

            <h5 className="book-publish-year">
                Publish Year: {book.publishedDate}
                {bookType && <span className="book-type">{` (${bookType})`}</span>}
            </h5>

            <div className="book-categories">
                Categories:
                {book.categories.map((category) => (
                    <span key={`${book.id}-${category}`}>{` ${category} `}</span>
                ))}
            </div>

            <div className="book-description">
                <LongTxt txt={book.description} />
            </div>

            <h6 className="book-pages">
                Page Count: {book.pageCount}
                <span className="reading-type">{` (${readingType})`}</span>
            </h6>

            <h4 className="book-price">
                book Price:
                <span className={dynColor}>{currSymbol}{book.listPrice.amount}</span>
            </h4>

            <section className="book-reviews">
                <AddReview bookId={params.bookId} onAddReview={onAddReview} onDeleteReview={onDeleteReview}/>
                <h3>Reviews:</h3>
                {!reviews.length ?
                    <div>No Reviews</div>
                    :
                    <ul>
                        {reviews.map((review) => (
                            <li key={review.id}>
                                <p>{`"${review.fullname}" rated it ${review.rating}/5`}</p>
                                <p>{`Read on: ${review.readAt}`}</p>
                                <button onClick={() => onDeleteReview(review.id)}>Delete</button>
                            </li>
                        ))}
                    </ul>
                }
            </section>

            <section className="book-actions-section">
                <button onClick={onBack}>Back</button>
                {/* <button onClick={onEditBook}>Edit</button> */}
                <button><Link to={`/book/${prevBookId}`}>Prev Book</Link></button>
                <button><Link to={`/book/${nextBookId}`}>Next Book</Link></button>
            </section>
        </section>
    )
}