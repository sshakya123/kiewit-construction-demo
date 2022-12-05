import React, { useState } from 'react';
import Input from './reusuable/Input';

interface Project extends NewProject {
  id: number;
}

interface NewProject {
  name: string;
  description: string;
}

const newProject: NewProject = {
  name: '',
  description: '',
};

export default function App() {
  const [project, setProject] = useState(newProject);
  const [projects, setProjects] = useState<Project[]>([]);

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setProjects([...projects, { ...project, id: projects.length + 1 }]);
    setProject(newProject);
  }

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    setProject({ ...project, [event.target.id]: event.target.value });
  }

  return (
    <>
      <h1>Projects</h1>
      <form onSubmit={onSubmit}>
        <h2>Add Project</h2>
        <Input
          label='Name'
          id='name'
          value={project.name}
          onChange={onChange}
        />
        <Input
          label='Description'
          id='description'
          value={project.description}
          onChange={onChange}
        />
        <button type='submit'>Add Project</button>
      </form>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>{project.name}</li>
        ))}
      </ul>
    </>
  );
}
