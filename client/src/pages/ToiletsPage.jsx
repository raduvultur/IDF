import { useState, useEffect } from 'react'
import ToiletCard from '../components/ToiletCard'

function ToiletsPage() {
    const [facilities, setFacilities] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [userLocation, setUserLocation] = useState(null)
    const [locating, setLocating] = useState(false)
    const [locationError, setLocationError] = useState(null)

    useEffect(() => {
        fetch('/api/toilets')
            .then(res => {
                if (!res.ok) throw new Error('Network response was not ok');
                return res.json();
            })
            .then(data => {
                setFacilities(data.results || [])
                setLoading(false)
            })
            .catch(err => {
                console.error("Error fetching toilets:", err)
                setError("Impossible de charger les sanitaires.")
                setLoading(false)
            })
    }, [])

    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371; // Radius of the earth in km
        const dLat = deg2rad(lat2 - lat1);
        const dLon = deg2rad(lon2 - lon1);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = R * c; // Distance in km
        return d;
    }

    const deg2rad = (deg) => {
        return deg * (Math.PI / 180)
    }

    const handleLocateMe = () => {
        setLocating(true)
        setLocationError(null)

        if (!navigator.geolocation) {
            setLocationError("La géolocalisation n'est pas supportée par votre navigateur.")
            setLocating(false)
            return
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setUserLocation({
                    lat: position.coords.latitude,
                    lon: position.coords.longitude
                })
                setLocating(false)
            },
            (err) => {
                console.error(err)
                setLocationError("Impossible de récupérer votre position.")
                setLocating(false)
            }
        )
    }

    // Calculate distances and sort if location is available
    const sortedFacilities = [...facilities].map(facility => {
        if (userLocation && facility.coord_geo) {
            const dist = calculateDistance(
                userLocation.lat,
                userLocation.lon,
                facility.coord_geo.lat,
                facility.coord_geo.lon
            )
            return { ...facility, distance: dist }
        }
        return facility
    })

    if (userLocation) {
        sortedFacilities.sort((a, b) => {
            if (a.distance !== undefined && b.distance !== undefined) {
                return a.distance - b.distance
            }
            return 0
        })
    }

    return (
        <>
            <div className="page-header">
                <h2>Sanitaires sur le réseau</h2>
                <p>Trouvez les toilettes accessibles en gare et station.</p>

                <button
                    className="btn-locate"
                    onClick={handleLocateMe}
                    disabled={locating || loading}
                >
                    {locating ? 'Localisation en cours...' : '📍 Trouver les plus proches'}
                </button>

                {locationError && <p className="error-text">{locationError}</p>}
            </div>

            {loading && <div className="loading">Chargement des données...</div>}

            {error && <div className="error">{error}</div>}

            {!loading && !error && (
                <div className="toilets-grid">
                    {sortedFacilities.map((facility, index) => {
                        const isNearest = userLocation && index === 0;
                        return (
                            <ToiletCard
                                key={index}
                                facility={facility}
                                isNearest={isNearest}
                            />
                        )
                    })}
                </div>
            )}

            {!loading && !error && facilities.length === 0 && (
                <div className="no-results">Aucune donnée disponible.</div>
            )}
        </>
    )
}

export default ToiletsPage
