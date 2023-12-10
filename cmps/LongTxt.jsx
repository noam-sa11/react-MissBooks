const { useState } = React

export function LongTxt({ txt, length = 100 }) {
    const [isExpanded, setIsExpanded] = useState(false)

    const toggleExpansion = () => {
        setIsExpanded(!isExpanded)
    }

    const displayText = isExpanded ? txt : txt.slice(0, length)

    return (
        <div className="long-txt">
            <p>{displayText}</p>
            {txt.length > length && (
                <button onClick={toggleExpansion}>
                    {isExpanded ? 'Read Less' : 'Read More'}
                </button>
            )}
        </div>
    )
}