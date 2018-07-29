import React from 'react';
import { mount } from 'enzyme';
import SearchBox from '../SearchBox';

describe('SearchBox component', () => {
    const element = mount(<SearchBox onSuccess={() => {}} />);
    const instance = element.instance();


    test('component should have input and button,but no error on mount', () => {
        expect(element.find('#searchValue').exists()).toEqual(true);
        expect(element.find('button').exists()).toEqual(true);
        expect(element.find('.searchValueHelperText').exists()).toEqual(false);
    });

    test('on button click search was initiated', async () => {
        instance.handleSearch = () => {};
        const spy = jest.spyOn(instance, 'handleSearch');
        instance.forceUpdate();

        element.find('button').simulate('click');
        expect(spy).toHaveBeenCalled();
    });
});
