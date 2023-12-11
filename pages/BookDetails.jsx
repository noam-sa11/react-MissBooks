import { bookService } from "../services/book.service.js"
import { LongTxt } from "../cmps/LongTxt.jsx"
import { AddReview } from "../cmps/AddReview.jsx"

const { useParams, useNavigate, Link } = ReactRouterDOM
const { useState, useEffect } = React

// ROUTING
export function BookDetails() {
    const params = useParams()
    const navigate = useNavigate()
    const [book, setBook] = useState(null)
    const [reviews, setReviews] = useState([])
    const [nextBookId, setNextBookId] = useState(null)
    const [prevBookId, setPrevBookId] = useState(null)

    useEffect(() => {
        loadBook()
        loadReviews()
        setNegBooks()
    }, [params.bookId])

    function setNegBooks() {
        bookService.getNegBookId(params.bookId, 1)
            .then(setNextBookId)
        bookService.getNegBookId(params.bookId, -1)
            .then(setPrevBookId)
    }

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
    // console.log('reviews:', reviews)
    return (
        <section className="book-details">
            <div className="book-img">
                {isOnSale && <span className="book-sale">SALE</span>}
                <img src={`../assets/img/${imgTitle}.jpg`} alt="" />
            </div>
            <section className="book-full-description">
                <h2 className="book-title">
                    Title: <span>{book.title}</span>
                    <button className="btn-back" onClick={onBack}>Back</button>
                    <span className="book-lang">{` (${book.language})`}</span>
                </h2>

                <h3 className="book-subtitle">
                    SubTitle: <span>{book.subtitle}</span>
                </h3>

                <h4 className="book-author">
                    Author: <span>{book.authors[0]}</span>
                </h4>

                <h5 className="book-publish-year">
                    Publish Year: <span>{book.publishedDate}</span>
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
                    Page Count: <span>{book.pageCount}</span>
                    <span className="reading-type">{` (${readingType})`}</span>
                </h6>

                <h4 className="book-price">
                    book Price:
                    <span className={dynColor}>{` ${currSymbol} `}{book.listPrice.amount}</span>
                </h4>
                <section className="book-actions-section">
                    <button><Link to={`/book/${prevBookId}`}>Prev Book</Link></button>
                    <button><Link to={`/book/${nextBookId}`}>Next Book</Link></button>
                </section>
            </section>
            <section className="review-form">
                <AddReview bookId={params.bookId} onAddReview={onAddReview} onDeleteReview={onDeleteReview} />
            </section>
            <section className="book-reviews">
                {/* <h3>Reviews:</h3> */}
                {!reviews.length ?
                    <div>No Reviews</div>
                    :
                    <ul>
                        {reviews.map((review) => (
                            <li key={review.id}>
                                <h4>
                                    {`${review.fullname} - `}
                                </h4>
                                <h4>
                                    {Array.from({ length: review.rating }).map((_, index) => (
                                        <span key={index}>{' ⭐️'}</span>
                                    ))}
                                </h4>
                                <h4>{`Read on: ${review.readAt}`}</h4>
                                <button className="btn-delete-review" onClick={() => onDeleteReview(review.id)}>Delete</button>
                            </li>
                        ))}
                    </ul>
                }
            </section>

        </section>
    )
}