import { useEffect, useState } from 'react';
import { FallbackProps } from 'react-error-boundary';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { NewProject } from './ManageProject';
import Project from './Project';
import ErrorBoundary from './reusuable/ErrorBoundary';
import Spinner from './reusuable/Spinner';
import { getProjects } from './services/projectService';
import { ErrorWithMessage, toErrorWithMessage } from './utils/errorUtils';

export interface Project extends NewProject {
  id: number;
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);

  const [loading, setLoading] = useState(true);
  const [appError, setAppError] = useState<ErrorWithMessage | null>(null);

  useEffect(() => {
    async function getAllProjects() {
      try {
        const projectsResponse = await getProjects();
        setProjects(projectsResponse);
      } catch(err) {
        toast.error('Failed to load projects');
        // Set error in state so that the error boundary catch it
        // We cant throw the error here because we're in an async function and error boundaries do not apply here
        setAppError(toErrorWithMessage(err));
       } finally {
        setLoading(false);
      }
    }
    getAllProjects();
    // Empty dependency list below means "Run this effect once after the first render."
  }, []);

  // function renderProject(project: Project) {
  //   return <li key={project.id}>{project.name}</li>;
  // }

  function renderProjects() {
    if (loading) return <Spinner />;

    return (
      <>
        <Link to='/manage-project'>Add Project</Link>
        <table>
          <thead>
            <tr>
              <th>&nbsp;</th>
              <th>Name</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <Project
                key={project.id}
                project={project}
                projects={projects}
                setProjects={setProjects}
              />
            ))}
          </tbody>
        </table>
      </>
    );
  }

  if (appError) throw appError;
  return (
    <>
      <h1>Projects</h1>

      <ErrorBoundary FallbackComponent={ProjectListErrorFallback}>
        {renderProjects()}
      </ErrorBoundary>
    </>
  );
}

function ProjectListErrorFallback({
  error,
  resetErrorBoundary,
}: FallbackProps) {
  return (
    <div role='alert'>
      <p>Sorry, the project list failed to load.</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}
