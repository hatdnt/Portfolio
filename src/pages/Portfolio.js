import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Portfolio.css';

const Portfolio = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const response = await axios.get('http://localhost:555/api/projects');
      setProjects(response.data);
    };
    fetchProjects();
  }, []);

  return (
    <div className="portfolio">
      <h2>My Projects</h2>
      <div className="project-list">
        {projects.map((project, index) => (
          <div className="project-item" key={index}>
            <img src={project.imageUrl} alt={project.title} />
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <a href={project.websiteUrl} target="_blank" rel="noopener noreferrer">View Project</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Portfolio;