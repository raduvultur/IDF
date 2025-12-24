import { useState, useEffect } from 'react'
import NewsCard from '../components/NewsCard'

function NewsPage() {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetch('/api/news')
            .then(res => {
                if (!res.ok) throw new Error('Network response was not ok');
                return res.json();
            })
            .then(data => {
                setArticles(data.results || [])
                setLoading(false)
            })
            .catch(err => {
                console.error("Error fetching news:", err)
                setError("Impossible de charger les actualités.")
                setLoading(false)
            })
    }, [])

    return (
        <>
            {loading && <div className="loading">Chargement des actualités...</div>}

            {error && <div className="error">{error}</div>}

            {!loading && !error && (
                <div className="news-grid">
                    {articles.map((article, index) => (
                        <NewsCard key={index} article={article} />
                    ))}
                </div>
            )}

            {!loading && !error && articles.length === 0 && (
                <div className="no-results">Aucune actualité disponible pour le moment.</div>
            )}
        </>
    )
}

export default NewsPage
