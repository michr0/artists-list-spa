import React from 'react';
import { mount } from 'enzyme';
import ArtistCard from '../ArtistCard';
import mockedProps from '../__mocks__/artist';

describe('ArtistBox component', () => {
    test('component with valid props should contain card cover, link and same amount of events in text as in props', () => {
        const element = mount(<ArtistCard artist={mockedProps} />);

        expect(element.find('.card__cover').exists()).toEqual(true);
        expect(element.find('a').exists()).toEqual(true);
        expect(element.find('p').text()).toEqual('Upcomming event number:165');
    });
});
