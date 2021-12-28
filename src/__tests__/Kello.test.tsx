import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Kello from '../components/Kello';
import React from 'react';

describe('<Kello />', () => {
    test('Kello tikittää', async () => {
        const kelloKomponentti = render(<Kello />)
        const aika = new Date();
        
        // Asetetaan aika 3 sekunnin päähän
        aika.setSeconds( aika.getSeconds() + 3);
        
        // Kello ei ole tulevaisuudessa
        expect(kelloKomponentti.container).not.toHaveTextContent(aika.toLocaleTimeString());

        // Kello tikittää tulevaisuuteen, odotetaan max. 5 sek.
        await waitFor(() => expect(kelloKomponentti.container).toHaveTextContent(aika.toLocaleTimeString()), { 
            timeout: 5000
        })
    })
})