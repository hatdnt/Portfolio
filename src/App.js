import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import ProjectCard from './components/ProjectCard';
import Footer from './components/Footer';

const projects = [
  {
    title: 'Project One',
    description: 'Description for project one.',
    link: '/project-one'  // Subpath untuk proyek pertama
  },
  {
    title: 'Project Two',
    description: 'Description for project two.',
    link: '/project-two'
  },
  // Tambahkan lebih banyak proyek di sini
];

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto p-4">
          <Routes>
            <Route path="/" element={
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {projects.map((project, index) => (
                  <ProjectCard
                    key={index}
                    title={project.title}
                    description={project.description}
                    link={project.link}
                  />
                ))}
              </div>
            } />
            <Route path="/project-one" element={<iframe src="/project-one/index.html" title="Project One" className="w-full h-full"></iframe>} />
            <Route path="/project-two" element={<iframe src="/project-two/index.html" title="Project Two" className="w-full h-full"></iframe>} />
            {/* Tambahkan route untuk proyek lain */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
