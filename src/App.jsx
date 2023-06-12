import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';

function App() {
  return (
    <Routes>
      <Route path="/" Component={ Home } exact />
    </Routes>
  );
}

export default App;
