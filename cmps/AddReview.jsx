
const { useState } = React
import { utilService } from '../services/util.service.js'

export function AddReview({ bookId, onAddReview }) {
    const [review, setReview] = useState(
        {   
            id: utilService.makeId(),
            fullname: '',
            rating: 1,
            readAt: new Date().toISOString().split('T')[0],
        })

    function handleInputChange(ev) {
        const field = ev.target.name
        let { value } = ev.target

        switch (ev.target.type) {
            case 'number':
            case 'range':
                value = +value
                break;

            case 'checkbox':
                value = ev.target.checked
                break

            default:
                break;
        }

        setReview(prevReview => ({
            ...prevReview, [field]: value
        }))
    }

    function handleSubmit(ev) {
        ev.preventDefault()
        onAddReview(bookId, review)
        setReview({
            id: utilService.makeId(),
            fullname: '',
            rating: 1,
            readAt: new Date().toISOString().split('T')[0],
        })
    }

    return (
        <section className="add-review">
            <h3>Add a Review:</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="fullname">Full Name:</label>
                    <input
                        type="text"
                        id="fullname"
                        name="fullname"
                        value={review.fullname}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="rating">Rating:</label>
                    <select
                        type="number"
                        id="rating"
                        name="rating"
                        value={review.rating}
                        onChange={handleInputChange}
                    >
                        {[1, 2, 3, 4, 5].map((num) => (
                            <option key={num} value={num}>
                                {num}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="readAt">Read Date:</label>
                    <input
                        type="date"
                        id="readAt"
                        name="readAt"
                        value={review.readAt}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <button type="submit">Add Review</button>
            </form>
        </section>
    )
}