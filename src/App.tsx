import HomePage from './pages/HomePage';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/hello-world" element={'Hello Nephren Blogs!'} />
    </Routes>
  );
}

export default App;
