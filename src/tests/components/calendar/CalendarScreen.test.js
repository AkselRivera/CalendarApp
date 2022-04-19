import configureStore  from "redux-mock-store";
import thunk from "redux-thunk";

import '@testing-library/jest-dom';

import React from 'react';
import {mount} from 'enzyme';
import { Provider } from "react-redux";
import CalendarScreen from "../../../components/calendar/CalendarScreen";

import {messages} from '../../../helpers/calendar-messages-esp';
import { types } from "../../../types/types";
import { eventSetActive, startLoaded } from "../../../components/actions/events";
import { act } from "@testing-library/react";

jest.mock('../../../components/actions/events',()=>({
    eventSetActive:jest.fn(),
    startLoaded:jest.fn()
}));

Storage.prototype.setItem= jest.fn();

const middlewares= [thunk];
const mockStore= configureStore(middlewares);

const initState={
    calendar:{
        events:[]
    },
    auth:{
        uid:'123',
        name:'aksel'
    },
    ui:{
        openModal:false
    }
};

let store= mockStore(initState);
store.dispatch=jest.fn();


const wrapper = mount( 
    <Provider store={store}>
        <CalendarScreen/> 
    </Provider>
    );


describe('Pruebas a calendarScreen', () => {

    test('Debe hacer match con el snapshot', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('Pruebas con las interaciones del calendario', () => {
        
        const calendar = wrapper.find('Calendar');

        const calendarMessages= calendar.prop('messages');

        expect(calendarMessages).toEqual(messages );

        calendar.prop('onDoubleClickEvent')();
        calendar.prop('onSelectEvent')({start:'Hola'});

        expect( eventSetActive ).toHaveBeenLastCalledWith({start:'Hola'});
        expect(store.dispatch).toHaveBeenCalledWith({ type:types.uiOpenModal });

        act( ()=>{
            calendar.prop('onView')('week');
            expect(localStorage.setItem).toHaveBeenCalledWith("lastView", "week");
        })

    });
    
    
});
