import React from 'react';
import DefaultLayout from './containers/DefaultLayout';

const Dashboard = React.lazy(() => import('./views/Dashboard'));
const Users = React.lazy(() => import('./views/Users'));
const User = React.lazy(() => import('./views/Users/User'));
const Reports = React.lazy(() => import('./views/Reports'));
const MostReports = React.lazy(() => import('./views/Reports/MostReports'));
const Notifications = React.lazy(() => import('./views/Notifications'));
const NotificationAdd = React.lazy(() => import('./views/Notifications/NotificationAdd'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home', component: DefaultLayout },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/users', exact: true,  name: 'Users', component: Users },
  { path: '/users/:id', exact: true, name: 'User Details', component: User },
  { path: '/reports', exact: true, name: 'Reports', component: Reports },
  { path: '/reports/most', exact: true, name: 'Most reporters', component: MostReports },
  { path: '/notifications', exact: true, name: 'Notifications', component: Notifications },
  { path: '/notifications/add', exact: true, name: 'Add Notification', component: NotificationAdd }
];

export default routes;
