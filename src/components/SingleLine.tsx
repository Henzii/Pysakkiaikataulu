import React from 'react';
import { aikataulu } from "../hooks/useGetTimetable";

const SingleLine = ({aikataulu} : {aikataulu: aikataulu}) => {
    // Jos reaaliaikadataa, käytetään .realtime css luokkaa
    const tyyli = `aikataulu-rivi ${(aikataulu.realtime ? 'reaaliaika' : '')}`;
    const [lahtoH, lahtoM] = new Date(1000*(aikataulu.serviceDay + aikataulu.realtimeArrival)).toLocaleTimeString().split('.');
    return (
        <div className={tyyli}>
            <div className="aikataulu-aika">
                {lahtoH}.{lahtoM}
            </div>
            <div className="aikataulu-linja">
                {aikataulu.trip.route.shortName}
            </div>
            <div className="aikataulu-maaranpaa">
                {aikataulu.headsign}
            </div>
        </div>
    )

}

export default SingleLine;