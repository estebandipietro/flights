import Home from 'pages/Home/Home';
import paths from './paths';

export interface RouteInterface {
  path: string;
  element: React.ReactNode;
}

const routes: RouteInterface[] = [
  {
    path: paths.index,
    element: <Home />,
  },
];

export default routes;
