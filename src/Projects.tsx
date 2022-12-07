import { useEffect, useState } from 'react';
import { FallbackProps } from 'react-error-boundary';
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

  function renderProjects() {
    if (loading) return <Spinner />;

    return (
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
    );
  }

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
