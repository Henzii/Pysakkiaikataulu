import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SingleLine from '../components/SingleLine';
import React from 'react';
import { aikataulu } from '../hooks/useGetTimetable';

const testiAikataulu: aikataulu = {
    headsign: 'Hell',
    scheduledArrival: 32700,
    realtimeArrival: 32700,
    serviceDay: 0,
    realtime: false,
    trip: {
        id: 'TESTID',
        route: {
            shortName: '666'
        }
    }

}

describe('<SingleLine />', () => {
    test('Komponentti renderöityy oikein', () => {
        const comp = render(<SingleLine aikataulu={testiAikataulu} />)
        const saapumisAika = comp.container.querySelector('.aikataulu-aika')

        // testiAikataulun realtimeArrival on kello 12:05
        expect(saapumisAika).toHaveTextContent('12.05')

        // Määränpää 
        const maaranpaa = comp.container.querySelector('.aikataulu-maaranpaa')
        expect(maaranpaa).toHaveTextContent(testiAikataulu.headsign)

        const linjanumero = comp.container.querySelector('.aikataulu-linja')
        expect(linjanumero).toHaveTextContent(testiAikataulu.trip.route.shortName)

        // Realtime = false joten ei saa olla reaaliaikatyylittelyä
        expect(comp.container.getElementsByClassName('reaaliaika')).toHaveLength(0);
    })
    test('Reaaliaikadataa sisältävä lähtö muotoillaan oikein', () => {
        const komp = render(<SingleLine aikataulu={ {...testiAikataulu, realtime: true}} />);
        expect(komp.container.getElementsByClassName('reaaliaika')).toHaveLength(1);
    })
})
