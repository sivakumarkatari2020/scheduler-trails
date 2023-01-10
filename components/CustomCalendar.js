import * as React from 'react';
import Paper from '@mui/material/Paper';
import { ViewState, EditingState, GroupingState, IntegratedGrouping, IntegratedEditing } from '@devexpress/dx-react-scheduler';
import {
    Scheduler,
    Resources,
    DayView,
    MonthView,
    WeekView,
    Appointments,

    Toolbar,
    ViewSwitcher, 
    DateNavigator,
    TodayButton,

    AppointmentForm,
    AppointmentTooltip,
    ConfirmationDialog,

    GroupingPanel,
    DragDropProvider
} from '@devexpress/dx-react-scheduler-material-ui';

import { data as appointments } from './demo-data/grouping.js';

const resources = [{
    fieldName: 'userId',
    title: 'Users',
    instances: [
        { text: 'User1', id: 1, color: '#071eff' },
        { text: 'User2', id: 2, color: '#000000' },
    ],
}];
const groupOrientation = viewName => viewName.split(' ')[0];
const grouping = [{
    resourceName: 'userId',
}];

export default function CustomCalendar(){
    const [currentDate,setCurrentDate] = React.useState(new Date());

    const onDateChange = (date) => {
        setCurrentDate(date);
    }

    const commitChanges = (props) => {
        console.log(props);
    }

    return(
        <Paper>
        <Scheduler
            data={appointments}
            height={660}
        >
        <ViewState
          defaultCurrentDate="2018-05-30"
        />
        <EditingState
          onCommitChanges={commitChanges}
        />
        <GroupingState
          grouping={grouping}
          groupOrientation={groupOrientation}
        />

        <WeekView
          startDayHour={9}
          endDayHour={17}
          cellDuration={60}
          name="Vertical Orientation"
        />

        <Appointments />
        <Resources
          data={resources}
          mainResourceName="priorityId"
        />

        <IntegratedGrouping />
        <IntegratedEditing />
        <AppointmentTooltip />
        <AppointmentForm />

        <GroupingPanel />
        <Toolbar />
        <DateNavigator />
        <TodayButton />
        <ViewSwitcher />
        <DragDropProvider />
        </Scheduler>
        </Paper>
    )
};
