import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import Pysakkiaikataulu from '../components/Pysakkiaikataulu';
import { ApolloProvider } from '@apollo/client';

import client from '../graphql/apolloClient';

const WrappedPysakkiaikataulu = (stopName: string) => (
    <ApolloProvider client={client}>
        <Pysakkiaikataulu stopName={stopName} />
    </ApolloProvider>
)

describe('<Pysakkiaikataulu />', () => {
    test('V6121 palauttaa Grandinkulman', async () => {
        const komp = render(WrappedPysakkiaikataulu('V6121'))
        
        await waitFor(() => expect(komp.container).toHaveTextContent('Grandinkulma'));
    })
    test('Tuntematon pysäkki aiheuttaa virheen', async () => {
        const komp = render(WrappedPysakkiaikataulu('PlääplääEnOleOikeaPysäkki'));
        await waitFor(() => expect(komp.container).toHaveTextContent('Virhe'))
    })
})
