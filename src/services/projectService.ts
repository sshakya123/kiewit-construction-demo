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

export async function getProjectById(id: Number) {
	const res = await fetch("http://localhost:3001/projects/" + id);
	if (!res.ok) throw new Error(res.statusText);
	return res.json() as Promise<Project>;
}