import React, { useEffect, useState } from 'react';

import {Calendar, momentLocalizer} from 'react-big-calendar';
import moment from 'moment';

import { Navbar } from '../ui/Navbar';
import { CalendarEvent } from './CalendarEvent';
import { messages } from '../../helpers/calendar-messages-esp';
import { CalendarModal } from './CalendarModal';


import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/locale/es';
import { useDispatch, useSelector } from 'react-redux';
import { uiOpenModal } from '../actions/ui';
import { eventClearActiveEvent, eventSetActive, startLoaded } from '../actions/events';
import { AddNewFab } from '../ui/AddNewFab';
import { DeleteEventFab } from '../ui/DeleteEventFab';

moment.locale('es');
const localizer = momentLocalizer(moment); // or globalizeLocalizer


// const events=[{
//   title:'Cumple',
//   start: moment().toDate(),
//   end: moment().add(2,'days').toDate(),
//   bgcolor: '#bfbfbf', 
//   notes:'Comprar pastel',
//   user:{
//     _id:'123',
//     name:'Atsel'
//   }
// }] 


const CalendarScreen = () => {

  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month');

  const dispatch = useDispatch();
  const {events,activeEvent} = useSelector( state => state.calendar);
  const {uid} = useSelector( state => state.auth);


  const onDoubleClick=(e)=>{
    dispatch(uiOpenModal());
  }

  const onSelectEvent=(e)=>{
    dispatch(eventSetActive(e));
  }

  const onViewChange=(e)=>{
    setLastView(e)
    localStorage.setItem('lastView',e);
  }

  const eventStyleGetter = (event,start,end,isSelected)=>{

    const style={
      backgroundColor: uid===event.user._id ? '#367CF7' : '#465660',
      borderRadius:'0px',
      opacity:0.8,
      display:'block',
      color:'white',
    }

    return {
      style
    }
  };

  const onSelectSlot=()=>{
    dispatch(eventClearActiveEvent());
  }
  

  useEffect(()=>{
    dispatch(startLoaded());
  },[dispatch])

  return (
  <div className='calendar-screen'>
    <Navbar/>

      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        messages={messages}
        eventPropGetter={eventStyleGetter}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelectEvent}
        onView={onViewChange}
        onSelectSlot={onSelectSlot}
        selectable={true}
        view={lastView}
        components={ {
          event: CalendarEvent
        } }
      />

        <AddNewFab/>

        {
          activeEvent &&
          <DeleteEventFab/>
        }

        <CalendarModal/>

  </div>);
};

export default CalendarScreen;
