import React, { useState } from 'react'
import { formatDate } from '@fullcalendar/core'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import resourceTimelinePlugin from '@fullcalendar/resource-timeline'
import { INITIAL_EVENTS, createEventId } from './event-utils'

const RESOURCES = [
    { id: 'a', title: 'John wick' },
    { id: 'b', title: 'Abraham Lincoln', eventColor: 'green' },
    { id: 'c', title: 'Woodrow Wilson', eventColor: 'orange' },
]

export default function DemoApp(){
    const [state,setState] = useState({
        weekendsVisible: true,
        currentEvents: []
    });

    const handleWeekendsToggle = () => {
        setState({...state,weekendsVisible : !state.weekendsVisible});
    }

    const handleDateSelect = (selectInfo) => {
        let title = prompt('Please enter a new title for your event')
        let calendarApi = selectInfo.view.calendar

        calendarApi.unselect() // clear date selection

        if (title) {
            calendarApi.addEvent({
                id: createEventId(),
                title,
                start: selectInfo.startStr,
                end: selectInfo.endStr,
                allDay: selectInfo.allDay
            })
        }
    }

    const handleEventClick = (clickInfo) => {
        alert(clickInfo.title);
        console.log(clickInfo);
    }

    const handleEvents = (events) => {
        setState({...state,currentEvents:events});
    }

    return (
        <div className='demo-app'>
        <div className='demo-app-main'>
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, resourceTimelinePlugin]}
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,resourceTimelineDay'
                }}
                initialView='resourceTimelineDay'
                editable={true}
                selectable={true}
                selectMirror={true}
                dayMaxEvents={true}
                weekends={state.weekendsVisible}
                initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
                resources={RESOURCES}
                select={handleDateSelect}
                eventContent={renderEventContent} // custom render function
                eventClick={handleEventClick}
                eventsSet={handleEvents} // called after events are initialized/added/changed/removed
                /* you can update a remote database when these fire:
                eventAdd={function(){}}
                eventChange={function(){}}
                eventRemove={function(){}}
                */
            />
        </div>
        </div>
    )
}   

function renderEventContent(eventInfo) {
    return (
        <>
            <b>{eventInfo.timeText}</b>
            <i>{eventInfo.event.title}</i>
        </>
    )
}

function renderSidebarEvent(event) {
    return (
        <li key={event.id}>
            <b>{formatDate(event.start, {year: 'numeric', month: 'short', day: 'numeric'})}</b>
            <i>{event.title}</i>
        </li>
    )
}