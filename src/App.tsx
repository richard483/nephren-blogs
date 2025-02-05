import LandingPage from './pages/LandingPage';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/hello-world" element={'Hello Nephren Blogs!'} />
    </Routes>
  );
}

export default App;
