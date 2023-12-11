import { AppHeader } from "./cmps/AppHeader.jsx"
import { AboutUs } from "./pages/AboutUs.jsx"
import { BookIndex } from "./pages/BookIndex.jsx"
import { Home } from "./pages/Home.jsx"

const { useState } = React

export function App() {
    const [page, setPage] = useState('books')

    function onSetPage(page) {
        setPage(page)
    }

    return (
        <section className="app main-layout">
            <header className="app-header full main-layout">
                <AppHeader onSetPage={onSetPage}/>
            </header>

            <main>
                {page === 'home' && <Home />}
                {page === 'about' && <AboutUs />}
                {page === 'books' && <BookIndex />}
            </main>
        </section>
    )
} 