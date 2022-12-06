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

type Errors = {
  name?: string;
  description?: string;
};

export default function App() {
  const [project, setProject] = useState(newProject);
  const [projects, setProjects] = useState<Project[]>([]);
  const [errors, setErrors] = useState<Errors>({});

  // function renderProject(project: Project) {
  //   return <li key={project.id}>{project.name}</li>;
  // }

  function validate() {
    const errors: Errors = {};
    if (!project.name) errors.name = 'Name is required';
    if (!project.description) errors.description = 'Description is required';
    return errors;
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formIsValid = Object.keys(validate()).length === 0; // it's valid if validate returns an empty object
    if (!formIsValid) return; // return early if the form is invalid
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
