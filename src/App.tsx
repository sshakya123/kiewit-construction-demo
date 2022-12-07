import { useEffect, useState } from 'react';
import MyProject from './Project';
import ErrorBoundary from './reusuable/ErrorBoundary';
import Input from './reusuable/Input';
import Spinner from './reusuable/Spinner';
import { getProjects } from './services/projectService';

export interface Project extends NewProject {
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

// Contains an optional property for storing the validation error message for each field
type Errors = {
  name?: string;
  description?: string;
};

export default function App() {
  const [project, setProject] = useState(newProject);
  const [projects, setProjects] = useState<Project[]>([]);
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getAllProjects() {
      const projectsResponse = await getProjects();
      setLoading(false);
      setProjects(projectsResponse);
    }
    getAllProjects();
    // Empty dependency list below means "Run this effect once after the first render."
  }, []);

  // function renderProject(project: Project) {
  //   return <li key={project.id}>{project.name}</li>;
  // }

  function validate() {
    // Using underscore to avoid shadowing the parent scope's errors variable
    const _errors: Errors = {};
    if (!project.name) _errors.name = 'Name is required';
    if (!project.description) _errors.description = 'Description is required';
    setErrors(_errors);
    return _errors;
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

  function renderProjects() {
    // throw new Error("oops");
    if (loading) return <Spinner />;

    return projects.map((project) => (
      <MyProject
        key={project.id}
        project={project}
        projects={projects}
        setProjects={setProjects}
      />
    ));
  }

  return (
    <>
      <h1>Projects</h1>
      <ErrorBoundary>
        <form onSubmit={onSubmit}>
          <h2>Add Project</h2>
          <Input
            label='Name'
            id='name'
            value={project.name}
            onChange={onChange}
            error={errors.name}
          />
          <Input
            label='Description'
            id='description'
            value={project.description}
            onChange={onChange}
            error={errors.description}
          />
          <button type='submit'>Add Project</button>
        </form>
      </ErrorBoundary>

      <ErrorBoundary>
        <ul>{renderProjects()}</ul>
      </ErrorBoundary>
    </>
  );
}
