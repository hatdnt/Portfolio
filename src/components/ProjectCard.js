import React from 'react';

const ProjectCard = ({ title, description, link }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 m-2">
      <h2 className="text-xl font-bold">{title}</h2>
      <p>{description}</p>
      <a href={link} className="text-blue-500">View Project</a>
    </div>
  );
};

export default ProjectCard;
