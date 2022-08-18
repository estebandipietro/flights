import paths from './paths';

import Home from 'pages/Home/Home';

export interface RouteInterface {
  path: string;
  element: React.ReactNode;
}

const routes: RouteInterface[] = [
  {
    path: paths.home,
    element: <Home />,
  },
];

export default routes;
