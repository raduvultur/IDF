import React from 'react';

const ToiletCard = ({ facility, isNearest }) => {
    const {
        station,
        ligne,
        localisation,
        accessibilite_pmr,
        accessible_au_public,
        tarif_gratuit_payant,
        gestionnaire,
        distance
    } = facility;

    const isPmr = accessibilite_pmr === "oui";
    const isFree = tarif_gratuit_payant === "gratuit";
    const isPublic = accessible_au_public === "oui";

    return (
        <article className={`toilet-card ${isNearest ? 'nearest' : ''}`}>
            {isNearest && <div className="nearest-badge">📍 Le plus proche</div>}

            <div className="toilet-header">
                <h3 className="toilet-station">{station}</h3>
                <span className="line-tag">Ligne {ligne}</span>
            </div>

            <div className="toilet-body">
                <p className="toilet-location"><strong>Localisation:</strong> {localisation || "Non précisé"}</p>

                {distance !== undefined && (
                    <p className="toilet-distance">
                        <strong>Distance:</strong> {distance < 1 ? `${Math.round(distance * 1000)}m` : `${distance.toFixed(2)}km`}
                    </p>
                )}

                <div className="toilet-badges">
                    {isPmr && <span className="badge badge-success">♿ PMR</span>}
                    {!isPmr && <span className="badge badge-warning">Non PMR</span>}

                    {isFree ? (
                        <span className="badge badge-success">Gratuit</span>
                    ) : (
                        <span className="badge badge-info">Payant</span>
                    )}

                    {isPublic ? (
                        <span className="badge badge-success">Public</span>
                    ) : (
                        <span className="badge badge-danger">Restreint</span>
                    )}
                </div>

                <p className="toilet-manager"><small>{gestionnaire}</small></p>
            </div>
        </article>
    );
};

export default ToiletCard;
