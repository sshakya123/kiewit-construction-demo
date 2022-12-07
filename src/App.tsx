import { Route, Routes } from 'react-router-dom';
import About from './About';
import ManageProject from './ManageProject';
import Nav from './Nav';
import PageNotFound from './PageNotFound';
import Projects from './Projects';

export default function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path='/' element={<Projects />} />

        {/* Add Route */}
        <Route path='/manage-project' element={<ManageProject />} />

        {/* Manage Route */}
        <Route path='/manage-project/:projectId' element={<ManageProject />} />
        <Route path='/about' element={<About />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </>
  );
}
