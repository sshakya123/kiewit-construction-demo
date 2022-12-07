import { Route, Routes } from 'react-router-dom';
import About from './About';
import Nav from './Nav';
import PageNotFound from './PageNotFound';
import Projects from './Projects';

export default function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path='/' element={<Projects />} />
        <Route path='/about' element={<About />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </>
  );
}
