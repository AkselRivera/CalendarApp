import { uiCloseModal, uiOpenModal } from "../../components/actions/ui";
import { uiReducer } from "../../reducers/uiReducer";

const initState={
    modalOpen:false
};


describe('Pruebas uiReducer', () => {

    test('Debe regresar el estado por defecto', () => {
        
        const state= uiReducer(initState,{});

        expect(state).toEqual(initState);
    });

    test('Debe de abrir y cerrar el modal', () => {
    
        const modalOpen=uiOpenModal();
        const state= uiReducer(initState,modalOpen);

        expect(state).toEqual({modalOpen:true});

        const modalClose= uiCloseModal();
        const stateClose= uiReducer(state,modalClose);

        expect(stateClose).toEqual({modalOpen:false});

    });
    
    


});
