import { authReducer } from "../../reducers/authReducer";
import { types } from "../../types/types";

const initialState= {
    checking:true,
    // uid:null,
    // name:null
}

describe('Pruebas a authReducer', () => {
  
    test('Debe retornar el estado inicial', () => {
        
        const state= authReducer(initialState,{});

        expect(state).toEqual(initialState);
    });
    

    test('Debe de autenticar el usuario', () => {
        
        const action= {
            type:types.authLogin,
            payload:{
                uid:'123',
                name:'atsel'
            }
            
        }

        const state= authReducer(initialState,action);

        expect(state).toEqual({
                checking:false,
                uid:'123',
                name:'atsel'
            }) ;

    });
    
});
