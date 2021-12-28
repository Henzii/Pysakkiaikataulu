import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import Modal from '../components/KyselyLoota';

describe('<KyselyLoota />', () => {
    test('Kiinni olevaa lootaa ei näytetä', () => {
        const { container } = render(<Modal open={false} title="Testiloota" text="Testiteksti" onClose={() => null} onSubmit={() => null} />)

        // Yhtään modal-luokkaista elementtiä ei pitäisi löytyä
        expect(container.getElementsByClassName('modal').length).toBe(0);

        // Otsikkoa ei saa löytyä
        expect(container).not.toHaveTextContent('Testiloota');
    })
    test('Aukinainen loota renderöityy oikein', () => {
        const { container } = render(<Modal open title="Testiotsikko" text="Testitekstiä" onClose={() => null} onSubmit={() => null} />)
        
        // Otsikko ja teksti löytyy
        expect(container).toHaveTextContent('Testiotsikko');
        expect(container).toHaveTextContent('Testitekstiä');

        // Kaksi nappia löytyy
        expect(container.getElementsByTagName('button').length).toBe(2)
    })
    test('Ok-nappi laukaisee onSubmitin ja palauttaa parametrinä tekstikentän tekstin', () => {
        const okNappi = jest.fn();
        const komponentti = render(<Modal open onSubmit={okNappi} onClose={() => null} title="test" />)
        const tekstiKentta = komponentti.getByTestId('tekstikentta');
        const formi = komponentti.getByTestId('lomake');

        fireEvent.change(tekstiKentta, { target: { value: 'Testi123ABC' } });
        fireEvent.submit(formi)
        
        // Ok-napin painallus suorittaa onSubmitissa annetun funktion
        expect(okNappi.mock.calls).toHaveLength(1);

        // Tekstikenttään kirjoitettu teksti tulee funktion mukana
        expect(okNappi.mock.calls[0][0]).toBe('Testi123ABC')
    })
    test('Cancel-napin painallus toimii niin kuin pitää', () => {
        const cancelNappi = jest.fn();
        const komponentti = render(<Modal open onSubmit={() => null} onClose={cancelNappi} title="testiä" />);
        const nappi = komponentti.container.querySelector('.cancel-button');
        
        // Cancel-nappi löytyy
        expect(nappi).not.toBeNull();
        if (!nappi) return;

        // Nappia ei ole painettu jos nappia ei ole painettu ;)
        expect(cancelNappi.mock.calls).toHaveLength(0);
        
        // Yksi klikkaus nappia
        fireEvent.click(nappi);
        expect(cancelNappi.mock.calls).toHaveLength(1);

        // Jos hermostuksissaan klikkaa nappia useammin...
        fireEvent.click(nappi)
        fireEvent.click(nappi)
        fireEvent.click(nappi)
        fireEvent.click(nappi)
        fireEvent.click(nappi)

        // ...ne rekisteröityvät
        expect(cancelNappi.mock.calls).toHaveLength(6);
    })
})