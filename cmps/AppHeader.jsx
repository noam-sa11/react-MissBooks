const { NavLink } = ReactRouterDOM

// export function AppHeader({ onSetPage }) {
//     return (
//         <header className="app-header full main-layout">
//             <section>
//                 <h1>MissBooks</h1>
//                 <nav className="app-nav">
//                     <a onClick={() => onSetPage('home')} href="#">Home</a>
//                     <a onClick={() => onSetPage('about')} href="#">About</a>
//                     <a onClick={() => onSetPage('books')} href="#">Books</a>
//                 </nav>
//             </section>

//         </header>
//     )
// }

export function AppHeader() {
    return (
        <header className="app-header full main-layout">
            <section>
                <h1>MissBooks</h1>
                <nav className="app-nav">
                    <NavLink to="/" >Home</NavLink>
                    <NavLink to="/about" >About</NavLink>
                    <NavLink to="/book" >Books</NavLink>
                </nav>
            </section>
        </header>
    )
}