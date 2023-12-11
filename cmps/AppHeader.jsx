export function AppHeader({ onSetPage }) {
    return (
        <section>
            <h1>MissBooks</h1>
            <nav className="app-nav">
                <a onClick={() => onSetPage('home')} href="#">Home</a>
                <a onClick={() => onSetPage('about')} href="#">About</a>
                <a onClick={() => onSetPage('books')} href="#">Books</a>
            </nav>
        </section>
    )
}