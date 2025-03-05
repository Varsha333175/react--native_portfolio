import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ReactGA from 'react-ga4';
import Navbar from './components/Navbar';
import './App.css';

// 🌟 Initialize Google Analytics Immediately
ReactGA.initialize("G-10343693699"); // ✅ Use your correct Stream ID
ReactGA.set({ debug_mode: true });  // ✅ Enables Debug Mode

function App() {
  useEffect(() => {
    console.log("GA Tracking Page:", window.location.pathname);
    ReactGA.send({ hitType: "pageview", page: window.location.pathname });
  }, []);  // ✅ Runs once when the app loads

  return (
    <Router>
      <div className="bg-gradient-to-br from-teal-500 to-indigo-600 dark:from-gray-900 dark:to-gray-800 text-gray-100 dark:text-gray-200">
        
        {/* 🌟 Navbar - Always Visible */}
        <Navbar />

        {/* 🌟 Lazy Load Sections */}
        <Suspense fallback={<div className="text-center py-20">Loading...</div>}>
          <section id="hero"><Hero /></section>
          <section id="about"><About /></section>
          <section id="experience"><Experience /></section>
          <section id="skills"><Skills /></section>
          <section id="projects"><Projects /></section>
          <section id="certifications"><Certifications /></section>
          <section id="achievements"><Achievements /></section>
          <section id="education"><Education /></section>
          <section id="contact"><Contact /></section>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
