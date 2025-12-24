import React from 'react';

const NewsCard = ({ article }) => {
    const {
        article_title,
        article_introduction,
        article_first_publication_date,
        article_featured_image_url,
        article_urlcomplet,
        territory,
        departement
    } = article;

    // Format date
    const date = new Date(article_first_publication_date).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    return (
        <article className="news-card">
            <div className="news-image-container">
                {article_featured_image_url ? (
                    <img src={article_featured_image_url} alt={article_title} loading="lazy" />
                ) : (
                    <div className="placeholder-image">Pas d'image</div>
                )}
                <span className="news-tag">{territory || (departement && departement[0]) || 'IDF'}</span>
            </div>
            <div className="news-content">
                <span className="news-date">{date}</span>
                <h3 className="news-title">{article_title}</h3>
                <p className="news-description" dangerouslySetInnerHTML={{ __html: article_introduction }}></p>
                <a href={article_urlcomplet} target="_blank" rel="noopener noreferrer" className="read-more">
                    Lire la suite <span className="arrow">→</span>
                </a>
            </div>
        </article>
    );
};

export default NewsCard;
