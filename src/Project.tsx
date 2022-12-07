import toast from 'react-hot-toast';
// Using the type keyword to resolve naming collision.
import { Project as ProjectType } from './Projects';
import { deleteProject } from './services/projectService';

type ProjectProps = {
  project: ProjectType;
  projects: ProjectType[];
  setProjects: React.Dispatch<React.SetStateAction<ProjectType[]>>;
};

export default function Project({
  project,
  projects,
  setProjects,
}: ProjectProps) {
  return (
    <li key={project.id}>
      <button
        onClick={async () => {
          const currentProjects = [...projects]; // Copy current projects so we can rollback if the delete fails
          try {
            setProjects(projects.filter((p) => p.id !== project.id));
            await deleteProject(project.id);
            // Option 1: Update local state to reflect the deletion.
            toast.success(project.name + ' deleted');
          } catch (error) {
            setProjects(currentProjects);
            toast.error('Error deleting ' + project.name);
          }

          // Option 2: Fetch the updated list of projects from the server.
          // const allProjects = await getProjects();
          // setProjects(allProjects);
        }}
        aria-label={'Delete ' + project.name}
      >
        Delete
      </button>
      {project.name}
    </li>
  );
}
