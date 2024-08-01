// src/components/AdminUpload.js
import React, { useState, useEffect } from 'react';
import { fetchProjects, createProject, updateProject, deleteProject } from '../api/adminUploadApi'; // Import fungsi API
import '../styles/Admin.css';

const AdminUpload = () => {
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [editingProject, setEditingProject] = useState(null);

  useEffect(() => {
    const getProjects = async () => {
      try {
        const data = await fetchProjects();
        setProjects(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    getProjects();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const project = { title, description, imageUrl, websiteUrl };

    try {
      const updatedProject = editingProject
        ? await updateProject(editingProject._id, project)
        : await createProject(project);

      if (editingProject) {
        setProjects(projects.map((proj) => (proj._id === updatedProject._id ? updatedProject : proj)));
      } else {
        setProjects([...projects, updatedProject]);
      }

      setTitle('');
      setDescription('');
      setImageUrl('');
      setWebsiteUrl('');
      setEditingProject(null);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleEdit = (project) => {
    setTitle(project.title);
    setDescription(project.description);
    setImageUrl(project.imageUrl);
    setWebsiteUrl(project.websiteUrl);
    setEditingProject(project);
  };

  const handleDelete = async (id) => {
    try {
      await deleteProject(id);
      setProjects(projects.filter((project) => project._id !== id));
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="admin">
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
          <label>Description:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <div>
          <label>Image URL:</label>
          <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} required />
        </div>
        <div>
          <label>Website URL:</label>
          <input type="text" value={websiteUrl} onChange={(e) => setWebsiteUrl(e.target.value)} required />
        </div>
        <button type="submit">{editingProject ? 'Update Project' : 'Add Project'}</button>
      </form>

      <h2>Existing Projects</h2>
      <ul>
        {projects.map((project) => (
          <li key={project._id}>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <img src={project.imageUrl} alt={project.title} />
            <p>{project.websiteUrl}</p>
            <div className="project-actions">
              <button className="edit-button" onClick={() => handleEdit(project)}>Edit</button>
              <button className="delete-button" onClick={() => handleDelete(project._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminUpload;