import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import TestHome from './components/Test';
import NotFoundPage from './pages/NotFound';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/test' element={<TestHome />} />
          <Route path='/*' element={<NotFoundPage />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
