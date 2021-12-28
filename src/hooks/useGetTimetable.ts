import { useQuery } from "@apollo/client";
import { useState, useEffect } from "react";
import { HAKU } from "../graphql/queries";

export const useGetTimetable = (stopName: string) => {

    const [pysakkiAikataulu, setAikataulu] = useState<queryData | null>(null)

    // Pysäkkiaikataulu haetaan uudestaan minuutin välein
    const { data, loading, error } = useQuery(HAKU, { variables: { name: stopName }, pollInterval: 1000 * 60, fetchPolicy: 'no-cache' });

    useEffect(() => {
        if (!loading) {
            // Jos query palauttaa erroria
            if (error) {
                setAikataulu({ errorMessage: error.message })
            }
            // Jos pysäkkiä ei löydy
            else if (data.stops.length < 1) {
                setAikataulu({ errorMessage: `Hakusanalla ${stopName} ei löytynyt yhtään pysäkkiä`})
            } else {
                setAikataulu({ 
                    stopName: data.stops[0].name,
                    aikataulu: data.stops[0].stoptimesWithoutPatterns });
            }
        }
    }, [data])
    return { pysakkiAikataulu };
}

export type queryData = {
    stopName?: string,
    aikataulu?: aikataulu[]
    errorMessage?: string
}

export type aikataulu = {
    headsign: string,
    scheduledArrival: number,
    realtimeArrival: number,
    serviceDay: number,
    realtime: boolean,
    trip: {
        id: string,
        route: {
            shortName: string,
        }
    }
}
