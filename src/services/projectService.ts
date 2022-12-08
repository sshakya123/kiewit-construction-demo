import { NewProject } from "../ManageProject";
import { Project } from "../Projects";

export async function getProjects() {
	const res = await fetch("http://localhost:3001/projects");
	if (!res.ok) throw new Error(res.statusText);
	// Consider using Zod to validate the response at runtime.
	// Zod is especially useful if you do not control the API.
	return res.json() as Promise<Project[]>;
}

export async function deleteProject(id: number) {
	const res = await fetch("http://localhost:3001/projects/" + id, {
		method: "DELETE",
	});
	if (!res.ok) throw new Error(res.statusText);
}

export async function getProjectById(id: number) {
	const res = await fetch(`http://localhost:3001/projects/${id}`);
	if (!res.ok) throw new Error(res.statusText);
	return res.json() as Promise<Project>;
}

export async function createProject(project: NewProject) {
	const res = await fetch("http://localhost:3001/projects", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(project),
	});
	if (!res.ok) throw new Error(res.statusText);
	return res.json() as Promise<Project>;
}

export async function editProject(project: Project) {
	const res = await fetch("http://localhost:3001/projects/" + project.id, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(project),
	});
	if (!res.ok) throw new Error(res.statusText);
	return res.json() as Promise<Project>;
}
