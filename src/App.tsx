import { useState } from 'react';
import Input from './reusuable/input';

// Array of construction projects
const projects = [
  {
    id: 1,
    name: 'Project 1',
    description: 'Description of project 1',
  },
  {
    id: 2,
    name: 'Project 2',
    description: 'Description of project 2',
  },
];

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

  function onSubmit() {}

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
