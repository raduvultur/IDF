import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import NewsPage from './pages/NewsPage';
import ToiletsPage from './pages/ToiletsPage';

function NavLink({ to, children }) {
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <Link to={to} className={`nav-link ${isActive ? 'active' : ''}`}>
      {children}
    </Link>
  );
}

function App() {
  return (
    <Router>
      <div className="app-container">
        <header className="header">
          <div className="header-content">
            <h1>Chiottes</h1>
            <nav className="main-nav">
              <NavLink to="/">Sanitaires</NavLink>
              <NavLink to="/news">Actualités</NavLink>
            </nav>
          </div>
        </header>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<ToiletsPage />} />
            <Route path="/news" element={<NewsPage />} />
          </Routes>
        </main>

        <footer className="footer">
          <p>Données fournies par <a href="https://data.iledefrance-mobilites.fr/" target="_blank" rel="noreferrer">Île-de-France Mobilités</a></p>
        </footer>
      </div>
    </Router>
  )
}

export default App
