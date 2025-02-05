import LandingPage from './pages/LandingPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/hello-world" element={'Hello From Child Component!'} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
