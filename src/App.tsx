import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import NGOs from './pages/NGOs';
import Report from './pages/Report';
import Projects from './pages/Projects';
import Volunteer from './pages/Volunteer';
import MapView from './pages/MapView';

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/associations" element={<NGOs />} />
          <Route path="/projets" element={<Projects />} />
          <Route path="/carte" element={<MapView />} />
          <Route path="/signaler" element={<Report />} />
          <Route path="/benevolat" element={<Volunteer />} />
        </Routes>
      </Layout>
    </Router>
  );
}
