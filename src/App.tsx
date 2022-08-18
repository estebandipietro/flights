import { BrowserRouter, Routes, Route } from 'react-router-dom';

import routes from './routes/routes';

const App = () => (
  <BrowserRouter>
    <Routes>
      {routes.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}
    </Routes>
  </BrowserRouter>
);

export default App;
