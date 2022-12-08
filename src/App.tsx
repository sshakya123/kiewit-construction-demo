import { Route, Routes } from 'react-router-dom';
import About from './About';
import ManageProject from './ManageProject';
import Nav from './Nav';
import PageNotFound from './PageNotFound';
import Projects from './Projects';
import ErrorBoundary from './reusuable/ErrorBoundary';

export default function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path='/' element={<ErrorBoundary><Projects /></ErrorBoundary>} />

        {/* Add Route */}
        <Route path='/manage-project' element={<ErrorBoundary><ManageProject /></ErrorBoundary>} />

        {/* Manage Route */}
        <Route path='/manage-project/:projectId' element={<ErrorBoundary><ManageProject /></ErrorBoundary>} />
        <Route path='/about' element={<ErrorBoundary><About /></ErrorBoundary>} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </>
  );
}
