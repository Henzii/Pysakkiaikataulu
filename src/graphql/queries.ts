import { gql } from "@apollo/client";

export const HAKU = gql`
query haePysakki($name: String!) {
    stops (name: $name) {
        name
        stoptimesWithoutPatterns(numberOfDepartures: 10) {
            scheduledArrival
            realtimeArrival
            serviceDay
            headsign
            realtime
            trip {
              id
              route {
                shortName
              }
            }
          }
    }
}
`