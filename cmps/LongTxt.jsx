const { useState } = React

export function LongTxt({ txt, length = 100 }) {
    const [isExpanded, setIsExpanded] = useState(false)

    function onToggleExpansion () {
        setIsExpanded(prev => !prev)
    }

    const displayText = isExpanded ? txt + '.' : txt.slice(0, length) + '...'

    return (
        <section className="long-txt">
            <span>{displayText}</span>
            {txt.length > length && (
                <button className="btn-long-txt" onClick={onToggleExpansion}>
                    {isExpanded ? 'Read Less' : 'Read More'}
                </button>
            )}
        </section>
    )
}