import { useState } from 'react';
import Input from './reusuable/Input';
import { ErrorWithMessage, toErrorWithMessage } from './utils/errorUtils';

type ValidationErrors = {
  name?: string;
  description?: string;
};

export interface NewProject {
  name: string;
  description: string;
}

const newProject: NewProject = {
  name: '',
  description: '',
};

export default function ManageProject() {
  const [project, setProject] = useState(newProject);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>(
    {}
  );
  const [appError, setAppError] = useState<ErrorWithMessage | null>(null);

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    try {
      event.preventDefault();
      const formIsValid = Object.keys(validate()).length === 0; // it's valid if validate returns an empty object
      if (!formIsValid) return; // return early if the form is invalid
      //   setProjects([...projects, { ...project, id: projects.length + 1 }]);
      setProject(newProject);
    } catch (err) {
      setAppError(toErrorWithMessage(err));
    }
  }

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    setProject({ ...project, [event.target.id]: event.target.value });
  }

  function validate() {
    // Using underscore to avoid shadowing the parent scope's errors variable
    const _errors: ValidationErrors = {};
    if (!project.name) _errors.name = 'Name is required';
    if (!project.description) _errors.description = 'Description is required';
    setValidationErrors(_errors);
    return _errors;
  }

  if (appError) throw appError;

  return (
    <>
      <h1>Manage Project</h1>;
      <form onSubmit={onSubmit}>
        <h2>Add Project</h2>
        <Input
          label='Name'
          id='name'
          value={project.name}
          onChange={onChange}
          error={validationErrors.name}
        />
        <Input
          label='Description'
          id='description'
          value={project.description}
          onChange={onChange}
          error={validationErrors.description}
        />
        <button type='submit'>Add Project</button>
      </form>
    </>
  );
}
