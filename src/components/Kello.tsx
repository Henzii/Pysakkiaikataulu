import React, { useState, useEffect } from 'react';

const Kello = () => {
    // Tila johon säilötään kellonaika
    const [aika, setAika] = useState<Date>(new Date());
    useEffect(() => {
        // Päivitetään kellonaika sekunnin välein
        const intervalId = setInterval(() => {
            setAika(new Date())
       }, 1000)
       // Unmonttauksen yhteydessä poistetaan ajastin
       return () => clearInterval(intervalId);
    }, [])
    return (
        <div className="kellonaika">
            {aika.toLocaleTimeString()}
        </div>
    )
}

export default Kello;