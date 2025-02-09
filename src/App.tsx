import ContentPage from './pages/ContentPage/ContentPage.tsx';
import HomePage from './pages/HomePage/HomePage.tsx';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path=":article" element={<ContentPage />} />
      <Route path="/hello-world" element={'Hello Nephren Blogs!'} />
    </Routes>
  );
}

export default App;
