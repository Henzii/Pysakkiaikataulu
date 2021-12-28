import React from "react";
import SingleLine from "./SingleLine";

import { useGetTimetable } from '../hooks/useGetTimetable';
import Kello from "./Kello";

const Pysakkiaikataulu = ({ stopName }: { stopName: string }) => {
    // hookki joka hakee hsl:n api:sta ensimmäisen pysäkkiaikataulun joka täsmää parametriksi annettuun nimeen
    const { pysakkiAikataulu } = useGetTimetable(stopName);

    if (pysakkiAikataulu?.errorMessage) {
        return (
            <div className="error">
                <h1>Virhe!</h1>
                {pysakkiAikataulu.errorMessage}
            </div>
        )
    }
    if (!pysakkiAikataulu || !pysakkiAikataulu.aikataulu) {
        return (
            <div className="error">Loading...</div>
        )
    }
    return (
        <>
            <div className="otsikko">
                <div>{pysakkiAikataulu.stopName}</div>
                <Kello />
            </div>
            <div className="taulu-otsikot">
                <div className="aikataulu-aika">Aika</div>
                <div className="aikataulu-linja">Linja</div>
                <div className="aikataulu-linja">Määränpää</div>
            </div>
            <div className="aikataulu">
                {pysakkiAikataulu.aikataulu.map(a => <SingleLine key={a.trip.id} aikataulu={a} />)}
            </div>
        </>
    )
}

export default Pysakkiaikataulu;