import { AboutUs } from "./pages/AboutUs.jsx"
import { BookIndex } from "./pages/BookIndex.jsx"
import { Home } from "./pages/Home.jsx"

const { useState } = React

export function App() {
    const [page, setPage] = useState('books')

    return (
        <section className="app main-layout">
            <header className="app-header full main-layout">
                <section>
                    <h1>MissBooks</h1>
                    <nav className="app-nav">
                        <a onClick={() => setPage('home')} href="#">Home</a>
                        <a onClick={() => setPage('about')} href="#">About</a>
                        <a onClick={() => setPage('books')} href="#">Books</a>
                    </nav>
                </section>
            </header>

            <main>
                {page === 'home' && <Home />}
                {page === 'about' && <AboutUs />}
                {page === 'books' && <BookIndex />}
            </main>
        </section>
    )
} 