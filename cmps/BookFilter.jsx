
const { useState, useEffect } = React


export function BookFilter({ filterBy, onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)
    const [rangeDisplay, setRangeDisplay] = useState(filterBy.price || 250)

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function onSetFilterBy(ev) {
        ev.preventDefault()
        onSetFilter(filterByToEdit)
    }

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                setRangeDisplay(value)
                break;

            case 'checkbox':
                value = target.checked
                break

            default:
                break;
        }

        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    const { title, price } = filterByToEdit
    return (
        <section className="book-filter">
            <h2>Filter Our Books</h2>
            <form onSubmit={onSetFilterBy} >
                <div className="title-filter">
                    <label htmlFor="title">Title: </label>
                    <input value={title} onChange={handleChange} type="text" id="title" name="title" />
                </div>

                <div className="price-filter">
                    <label htmlFor="price">Max Price: <span>{`(${rangeDisplay})`}</span></label>
                    <input 
                        value={price || rangeDisplay}
                        onChange={handleChange}
                        type="range"
                        id="price"
                        name="price"
                        min="0"
                        max="250" />
                </div>
            </form>
        </section>
    )
}