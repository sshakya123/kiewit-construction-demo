import { useQuery } from '@tanstack/react-query';
import { FallbackProps } from 'react-error-boundary';
import { Link } from 'react-router-dom';
import { NewProject } from './ManageProject';
import Project from './Project';
import ErrorBoundary from './reusuable/ErrorBoundary';
import Spinner from './reusuable/Spinner';
import { getProjects } from './services/projectService';

export interface Project extends NewProject {
  id: number;
}

export default function Projects() {

  const projectsQuery = useQuery({
    queryKey: ['projects'],
    queryFn: getProjects,
    initialData: [],
    useErrorBoundary: true,
  })

  // function renderProject(project: Project) {
  //   return <li key={project.id}>{project.name}</li>;
  // }

  function renderProjects() {
    if (projectsQuery.fetchStatus === 'fetching' && !projectsQuery.data) return <Spinner />;

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
            {projectsQuery.data.map((project) => (
              <Project
                key={project.id}
                project={project}
                projects={projectsQuery.data}
              />
            ))}
          </tbody>
        </table>
      </>
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
