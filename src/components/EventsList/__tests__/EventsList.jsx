import React from 'react';
import { mount } from 'enzyme';
import EventsList from '../EventsList';
import mockedProps from '../__mocks__/eventsList';

describe('EventList component', () => {
    test('component should have 25 elements', () => {
        const element = mount(<EventsList eventsList={mockedProps} />);
        const instance = element.instance();
        const spy = jest.spyOn(instance, 'renderEvent');

        instance.forceUpdate();

        expect(spy).toHaveBeenCalledTimes(25);
    });
});
