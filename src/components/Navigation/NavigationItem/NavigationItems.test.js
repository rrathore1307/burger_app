import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NaviagationItems from '../NavigationItem/NavigationItems/NavigationItems';
import NavigationItem from '../NavigationItem/NavigationItem';

configure({adapter : new Adapter()})

describe('<NaviagationItems/>', ()=>{
    let wrapper;
    beforeEach(()=>{
        wrapper = shallow(<NaviagationItems />);
    })
    it('should renderTwo NavigationItem', ()=>{
        expect(wrapper.find(NavigationItem)).toHaveLength(2)
    })
    it('should renderTree NavigationItem', ()=>{
        wrapper = shallow(<NaviagationItems isAuthenticated={true} />);
        expect(wrapper.find(NavigationItem)).toHaveLength(3)
    })
    it('should render with logout NavigationItem', ()=>{
        wrapper = shallow(<NaviagationItems isAuthenticated={true} />);
        expect(wrapper.contains(<NavigationItem link='/logout'>Logout</NavigationItem>)).toEqual(true)
    })
})