
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
        // <section className="book-filter">
        //     <h2>Filter Our Books</h2>
        //     <form onSubmit={onSetFilterBy} >
        //         <div className="title-filter">
        //             <label htmlFor="title">Title: </label>
        //             <input 
        //                 value={title} 
        //                 onChange={handleChange} 
        //                 type="text" 
        //                 id="title" 
        //                 name="title" />
        //         </div>

        //         <div className="price-filter">
        //             <label htmlFor="price">Max Price: <span>{`(${rangeDisplay})`}</span></label>
        //             <input 
        //                 value={price || rangeDisplay}
        //                 onChange={handleChange}
        //                 type="range"
        //                 id="price"
        //                 name="price"
        //                 min="0"
        //                 max="250" />
        //         </div>
        //     </form>
        // </section>
            <fieldset className="book-filter">
                <legend>Filter Our Books</legend>
                <form onSubmit={onSetFilterBy} >
                    <fieldset>
                        <legend>Title Filter</legend>
                        <div className="title-filter">
                            <label htmlFor="title"></label>
                            <input
                                value={title}
                                onChange={handleChange}
                                type="text"
                                id="title"
                                name="title" />
                        </div>
                    </fieldset>

                    <fieldset>
                        <legend>Max Price Filter</legend>
                        <div className="price-filter">
                            <label htmlFor="price"><span>{`(${rangeDisplay})`}</span></label>
                            <input
                                value={price || rangeDisplay}
                                onChange={handleChange}
                                type="range"
                                id="price"
                                name="price"
                                min="0"
                                max="250" />
                        </div>
                    </fieldset>
                </form>
            </fieldset>
    )
}