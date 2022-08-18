import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import paths from 'routes/paths';
import routes from 'routes/routes';

const App = () => (
  <BrowserRouter>
    <Routes>
      {routes.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}
      <Route path={paths.default} element={<Navigate to={paths.home} replace />} />
    </Routes>
  </BrowserRouter>
);

export default App;
