import Swal from "sweetalert2";
import { fetchConToken } from "../../helpers/fetch";
import { prepareEvents } from "../../helpers/prepareEvents";
import { types } from "../../types/types"


export const startEventAddNew=(event)=>{
    return async(dispatch, getState) =>{

        const {uid,name}= getState().auth;

        try{

            const resp= await fetchConToken('events',event,'POST');
            const body = await resp.json();
            

            if( body.ok){
                event.id= body.evento.id;
                event.user={
                    _id:uid,
                    name
                }
                dispatch(eventAddNew(event))
            }
        
        }catch(e){
            console.log(e);
        }

    }
}

const eventAddNew= (event)=>({
    type:types.eventAddNew,
    payload:event
});

export const eventSetActive= (event)=>({
    type:types.eventSetActive,
    payload:event
});

export const eventClearActiveEvent=()=>({ type:types.eventClearActiveNote });


export const startEventUpdate = (event)=>{
    return async (dispatch)=>{

        try{

            const resp= await fetchConToken(`events/${event.id}`,event,'PUT');
            const body= await resp.json();

            if(body.ok)
                dispatch(eventUpdate(event));
            else   
                Swal.fire('Ups!',body.msg,'error');


        }catch(e){
            console.log(e);
        }
    }
}

const eventUpdate = (event) =>({
    type:types.eventUpdate,
    payload: event
})


export const startEventDeleted=()=>{
    return async(dispatch,getState)=>{

        const {id} =getState().calendar.activeEvent;
        try{

            const resp= await fetchConToken(`events/${id}`,{},'DELETE');
            const body= await resp.json();

            if(body.ok){
                dispatch(eventDeleted());
            }
            else {
                Swal.fire('Ups!',body.msg,'error');
            }
            

        }catch(e){
            console.log(e);
        }
    }
}

const eventDeleted=()=>({ type:types.eventDeleted });

export const  startLoaded =()=>{
    return async(dispatch)=>{

        try{

            const resp= await fetchConToken('events');
            const body = await resp.json();

            const events= prepareEvents( body.eventos );
            
            dispatch(eventLoaded(events));

        }catch(e){
            console.log(e);
        }


    }
}

const eventLoaded =(events)=>{
    return {
        type:types.eventLoaded,
        payload:events
    }
}


export const eventLogout=()=>{
    return {
        type:types.eventLogout,
        payload:{
            events:[],
            activeEvent:null
        }
    }
    
}