import { lazy } from 'react';
// import {
//   Speed as SpeedIcon,
//   PeopleAlt as PeopleAltIcon,
//   // Build as BuildIcon,
// } from '@mui/icons-material';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
// import AccountBoxIcon from '@mui/icons-material/AccountBox';
// import { Outlet } from 'react-router-dom';
// import { AppDrawer } from '../components/AppDrawer';
// import { UpdateProfile } from '../views/UpdateProfile';
// import { Dashboard } from '../views/Dashboard';
// import { UserManagement } from '../views/UserManagement';
// import { SchoolManagement } from '../views/SchoolManagement';

interface IBaseRoute {
  path: string;
  Component: any;
}

export interface IRoute {
  paths: string[];
  Component: any;
  Icon?: any;
  name: string;
  roles?: string[];
}

interface IRouteItem {
  base: IBaseRoute;
  routes: IRoute[];
}

interface IRouteItems {
  [key: string]: IRouteItem;
}

const ArtistLists = lazy(() => import('../views/ArtistList'));
const ArtistMoreInformation = lazy(
  () => import('../views/ArtistMoreInformation')
);

export const RouteItems: IRouteItems = {
  open: {
    base: {
      path: '/',
      Component: null,
    },
    routes: [
      {
        paths: ['/artist-list', '/'],
        Component: ArtistLists,
        name: 'ArtistList',
      },
      {
        paths: ['/artist-more-information'],
        Component: ArtistMoreInformation,
        name: 'ArtistMoreInformation',
      },
    ],
  }
};
