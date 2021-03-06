import React, { useEffect, useState } from 'react';

import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';

import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { uiCloseModal } from '../actions/ui';
import { eventClearActiveEvent, startEventAddNew, startEventUpdate } from '../actions/events';

const customStyles = {
    content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};
if(process.env.NODE_ENV!=='test')
    Modal.setAppElement('#root');

    const now=moment().minutes(0).seconds(0).add(1,'hours');
    const nowPlus=now.clone().add(1,'hours');

    const initEvent={  
        title:'',
        notes:'',
        start:now.toDate(),
        end:nowPlus.toDate()
    }


export const CalendarModal = () => {

    const {modalOpen} = useSelector( state => state.ui );
    const {activeEvent} = useSelector( state => state.calendar );
    const dispatch = useDispatch();


    const [dateStart, setDate] = useState(now.toDate());
    const [dateEnd, setEndDate] = useState(nowPlus.toDate());
    const [titleValid, setTitleValid] = useState(true);

    const [formValues, setFormValues] = useState(initEvent);

    const {title,notes,start,end}= formValues;

    useEffect (()=>{
        if(activeEvent){
            setFormValues(activeEvent);
        }else{
            setFormValues(initEvent);
        }
    },[activeEvent,setFormValues]);

    
    const handleInputChange=({target})=>{
        setFormValues({
            ...formValues,
            [target.name]:target.value
        })
    }
    const handleStartDateChange =(e)=>{
        setDate(e);
        setFormValues({
            ...formValues,
            start:e
        })
    }

    const handleEndDateChange=(e)=>{
        setEndDate(e);
        setFormValues({
            ...formValues,
            end:e
        })
    }

    const handleSubmitForm=(e)=>{
        e.preventDefault();
        
        const momentStart=moment(start);
        const momentEnd=moment(end);

        if(momentStart.isSameOrAfter(momentEnd)){
            return Swal.fire('Error','La fecha de fin debe de ser mayor a la fecha de inico','error');
        }

        if(title.trim().length<2){
            return setTitleValid(false);
            
        }

        if(activeEvent){
            dispatch(startEventUpdate(formValues));
        }else {
            dispatch(startEventAddNew(formValues));
        }

        setTitleValid(true);
        closeModal();

    }

    const closeModal=()=>{
        
        dispatch(uiCloseModal());
        dispatch(eventClearActiveEvent());
        setFormValues(initEvent);

    }


  return (
    <Modal
    isOpen={modalOpen}
    // onAfterOpen={afterOpenModal}
    onRequestClose={closeModal}
    style={customStyles}
    closeTimeoutMS={200}
    overlayClassName='modal-fondo'
    className='modal'
    >
        <h1> { activeEvent ?'Editar Evento': 'Nuevo evento'} </h1>
        <hr />
        <form className="container"
                onSubmit={handleSubmitForm}>

            <div className="form-group">
                <label>Fecha y hora inicio </label>
                <DateTimePicker
                    onChange={handleStartDateChange}
                    value={dateStart}
                    className='form-control'
                />
            </div>

            <div className="form-group">
                <label>Fecha y hora fin</label>
                <DateTimePicker
                    onChange={handleEndDateChange}
                    value={dateEnd}
                    minDate={dateStart}
                    className='form-control'
                />
            </div>

            <hr />
            <div className="form-group">
                <label>Titulo y notas</label>
                <input 
                    type="text" 
                    className={`form-control ${!titleValid && 'is-invalid' } `}
                    placeholder="T??tulo del evento"
                    name="title"
                    value={title}
                    onChange={handleInputChange}
                    autoComplete="off"
                />
                <small id="emailHelp" className="form-text text-muted">Una descripci??n corta</small>
            </div>

            <div className="form-group">
                <textarea 
                    type="text" 
                    className="form-control"
                    placeholder="Notas"
                    rows="5"
                    value={notes}
                    onChange={handleInputChange}
                    name="notes"
                ></textarea>
                <small id="emailHelp" className="form-text text-muted">Informaci??n adicional</small>
            </div>

            <button
                type="submit"
                className="btn btn-outline-primary btn-block"
            >
                <i className="far fa-save"></i>
                <span> Guardar</span>
            </button>

        </form>

    </Modal>
  
  );
};
