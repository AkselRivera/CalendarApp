
import configureStore  from "redux-mock-store";
import thunk from "redux-thunk";

import '@testing-library/jest-dom';

import React from 'react';
import {mount} from 'enzyme';
import { Provider } from "react-redux";
import { LoginScreen } from "../../../components/auth/LoginScreen";
import { startLogin, startRegister } from "../../../components/actions/auth";
import Swal from "sweetalert2";

jest.mock('sweetalert2',()=>({
    fire:jest.fn()
}))

jest.mock('../../../components/actions/auth',()=>({
    startLogin:jest.fn(),
    startRegister:jest.fn()
}));

const middlewares= [thunk];
const mockStore= configureStore(middlewares);

const initState={};

let store= mockStore(initState);
store.dispatch=jest.fn();


const wrapper = mount( 
        <Provider store={store}>
            <LoginScreen/> 
        </Provider>
        );


describe('Pruebas al LoginScreen', () => {

    test('match con el snapshot', () => {
        
        expect(wrapper).toMatchSnapshot();
    });

    test('Debe de llamar el dispatch del cambio', () => {

        wrapper.find('input[name="lEmail"]').simulate('change', {
            target:{
                name:'lEmail',
                value:'juan@gmail.com'
            }
        });

        wrapper.find('input[name="lPassword"]').simulate('change', {
            target:{
                name:'lPassword',
                value:'123456'
            }
        });

        wrapper.find('form').at(0).prop('onSubmit')({preventDefault(){}});

        expect(startLogin).toHaveBeenLastCalledWith('juan@gmail.com','123456');
    
    });

    test('No hay registro si las constraseña son diferentes', () => {

        wrapper.find('input[name="rPassword"]').simulate('change', {
            target:{
                name:'rPassword',
                value:'1234567'
            }
        });

        wrapper.find('input[name="rPassword2"]').simulate('change', {
            target:{
                name:'rPassword2',
                value:'12345676'
            }
        });

        wrapper.find('form').at(1).prop('onSubmit')({preventDefault(){}});

        expect(startRegister).not.toHaveBeenCalled();

        expect(Swal.fire).toHaveBeenCalledWith('Ups!','Las contraseñas deben ser iguales','error');

    });

    test('Debe de dispararse con contraseñas iguales', () => {
    
        wrapper.find('input[name="rPassword"]').simulate('change', {
            target:{
                name:'rPassword',
                value:'1234567'
            }
        });

        wrapper.find('input[name="rPassword2"]').simulate('change', {
            target:{
                name:'rPassword2',
                value:'1234567'
            }
        });

        wrapper.find('form').at(1).prop('onSubmit')({preventDefault(){}});

        expect(startRegister).toHaveBeenCalled();
        expect(Swal.fire).not.toHaveBeenCalled();
        
    });
    
    

});
