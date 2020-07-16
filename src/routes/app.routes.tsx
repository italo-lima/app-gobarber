import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Dashboard from '../screens/DashBoard';
import Profile from '../screens/Profile';
import AppointmentCreated from '../screens/AppointmentCreated';
import CreateAppointment from '../screens/CreateAppointment';

const App = createStackNavigator();

const AppRoutes: React.FC = () => (
  <App.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: '#312e38' },
    }}
  >
    <App.Screen name="Dashboard" component={Dashboard} />
    <App.Screen name="Profile" component={Profile} />
    <App.Screen name="AppointmentCreated" component={AppointmentCreated} />
    <App.Screen name="CreatedAppointment" component={CreateAppointment} />
  </App.Navigator>
);

export default AppRoutes;
