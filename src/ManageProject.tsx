import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { Project } from './Projects';
import Input from './reusuable/Input';
import Spinner from './reusuable/Spinner';
import {
  createProject,
  editProject,
  getProjectById,
} from "./services/projectService";
import { ErrorWithMessage, toErrorWithMessage } from "./utils/errorUtils";

// Contains an optional property for storing the validation error message for each field
type ValidationErrors = {
  name?: string;
  description?: string;
};

export interface NewProject {
  name: string;
  description: string;
}

const newProject: NewProject = {
  name: "",
  description: "",
};

export default function ManageProject() {
  const { projectId } = useParams<{ projectId: string }>();
  const [project, setProject] = useState<Project | NewProject>(newProject);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>(
    {}
  );
  const [appError, setAppError] = useState<ErrorWithMessage | null>(null);
  const [loading, setLoading] = useState(true);

  // Derived state
  const formVerb = Boolean(projectId) ? "Edit" : "Add";

  useEffect(() => {
    async function getProject() {
      if (!projectId) {
        setLoading(false);
        return; // return early if there's no projectId (i.e. we're on the "Add Project" page)
      }
      const res = await getProjectById(Number(projectId));
      setProject(res);
      setLoading(false);
    }
    getProject();
  }, []);

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    setProject({ ...project, [event.target.id]: event.target.value });
  }

  function validate() {
    // Using underscore to avoid shadowing the parent scope's errors variable
    const _errors: ValidationErrors = {};
    if (!project.name) _errors.name = "Name is required";
    if (!project.description) _errors.description = "Description is required";
    setValidationErrors(_errors);
    return _errors;
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    try {
      event.preventDefault();
      const formIsValid = Object.keys(validate()).length === 0; // it's valid if validate returns an empty object
      if (!formIsValid) return; // return early if the form is invalid
      // If there's an id property on the project, then we're editing an existing project
      "id" in project
        ? await editProject(project)
        : await createProject(project);
      setProject(newProject);
      toast.success("Project saved");
    } catch (err) {
      toast.error("Error saving project");
      // setAppError(toErrorWithMessage(err));
    }
  }

  if (appError) throw appError;

  return (
    <>
      <h1>Manage Project</h1>

      {loading ? (
        <Spinner />
      ) : (
        <form onSubmit={onSubmit}>
          <h2>{formVerb} Project</h2>
          <Input
            label="Name"
            id="name"
            value={project.name}
            onChange={onChange}
            error={validationErrors.name}
          />
          <Input
            label="Description"
            id="description"
            value={project.description}
            onChange={onChange}
            error={validationErrors.description}
          />
          <button type="submit">{formVerb} Project</button>
        </form>
      )}
    </>
  );
}
