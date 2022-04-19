import configureStore  from "redux-mock-store";
import thunk from "redux-thunk";

import '@testing-library/jest-dom';

import React from 'react';
import {mount} from 'enzyme';
import { Provider } from "react-redux";
import { AppRouter } from "../../routes/AppRouter";


const middlewares= [thunk];
const mockStore= configureStore(middlewares);


describe('Pruebas en AppRouter', () => {

    test('Debe de mostrar el espere', () => {

        const initState={
            auth:{
                checking:true
            }
        };
        const store= mockStore(initState);

        const wrapper = mount( 
            <Provider store={store}>
                    <AppRouter/> 
            </Provider>
            );
        const titulo= wrapper.find('h1').text().trim();
        expect(titulo).toBe('Loading...')

    });
    

    test('Debe de mostrar la ruta publica', () => {

        const initState={
            auth:{
                checking:false,
                uid:null
            }
        };

        const store= mockStore(initState);

        const wrapper = mount( 
            <Provider store={store}>
                <AppRouter/> 
            </Provider>
            );

        expect(wrapper.find('.login-container').exists()).toBe(true);

    });

    test('Debe de mostrar la ruta privada', () => {

        const initState={
            auth:{
                checking:false,
                uid:'1234',
                name:'Carlitos'
            },
            calendar:{
                events:[]
            },
            ui:{
                modalOpen:false
            }
        };

        const store= mockStore(initState);

        const wrapper = mount( 
            <Provider store={store}>
                <AppRouter/> 
            </Provider>
            );

        expect(wrapper.find('.calendar-screen').exists()).toBe(true);

    });


});
