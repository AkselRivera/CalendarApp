import configureStore  from "redux-mock-store";
import thunk from "redux-thunk";

import '@testing-library/jest-dom';

import React from 'react';
import { DeleteEventFab } from '../../../components/ui/DeleteEventFab';
import {mount} from 'enzyme';
import { Provider } from "react-redux";
import { startEventDeleted } from "../../../components/actions/events";


jest.mock('../../../components/actions/events',()=>({
    startEventDeleted:jest.fn()
}));

const middlewares= [thunk];
const mockStore= configureStore(middlewares);

const initState={};

let store= mockStore(initState);
store.dispatch=jest.fn();


const wrapper = mount( 
        <Provider store={store}>
            <DeleteEventFab/> 
        </Provider>
        );

describe('Pruebas en el componente Delete', () => {
  
        test('Debe hacer match con el snapshot', () => {
            expect(wrapper).toMatchSnapshot();
        });

        test('Debe de llamar el eventStart click', () => {
            
            wrapper.find('button').simulate('click');

            expect(startEventDeleted).toHaveBeenCalled();

        });
        
        
});
