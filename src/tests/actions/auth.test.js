import configureStore  from "redux-mock-store";
import thunk from "redux-thunk";


import '@testing-library/jest-dom';
import { startChecking, startLogin, startRegister } from "../../components/actions/auth";
import { types } from "../../types/types";
import Swal from "sweetalert2";
import * as fetchMofule from "../../helpers/fetch";




jest.mock('sweetalert2',()=>({
    fire:jest.fn()
}));

const middlewares= [thunk];
const mockStore= configureStore(middlewares);

const initState={};
let store= mockStore(initState);

Storage.prototype.setItem=jest.fn();

describe('Pruebas en auth actions', () => {

    beforeEach(()=>{
        store=mockStore(initState);
        jest.clearAllMocks();
    });

    test('StarLogin correcto', async () => {
        
        await store.dispatch(startLogin('aksel@softtek.com','123456'));
        const actions= store.getActions();

        expect(actions[0]).toEqual({
            type:types.authLogin,
            payload: {
                uid:expect.any(String),
                name:expect.any(String)
            }
        });

        expect(localStorage.setItem).toHaveBeenCalledWith('token',expect.any(String));
    });
    

    test('Star login incorreecto',async () => {
        await store.dispatch(startLogin('aksel@softtek.com','12345665'));
        const actions= store.getActions();

        expect(actions).toEqual([]);
        expect(Swal.fire).toHaveBeenCalledWith("Ups!", "Password incorrecto", "error");

    });
    
    test('startRegister correcto', async() => {

        fetchMofule.fetchSinToken = jest.fn(()=>({
            json(){
                return {
                    ok:true,
                    uid:'123',
                    name:'carlos',
                    token:'asdfgfdas'
                }
            }
        }));
        
        await store.dispatch(startRegister('alesis@softtek.com','alesis','1234566'));
        const actions = store.getActions();

        expect(actions[0]).toEqual({
            type: types.authLogin, 
            payload: { 
                uid: '123', 
                name: 'carlos' } 
        });

        expect(localStorage.setItem).toHaveBeenCalledWith('token','asdfgfdas');

    });

    test('startCheckin correcto', async () => {
        
        fetchMofule.fetchConToken = jest.fn(()=>({
            json(){
                return {
                    ok:true,
                    uid:'123',
                    name:'carlos',
                    token:'asdfgfdas'
                }
            }
        }));

        await store.dispatch(startChecking());
        const actions = store.getActions();

        expect(actions[0]).toEqual({
            type: '[Auth] Login', payload: { uid: '123', name: 'carlos' } 
        });


    });
    
    
});
