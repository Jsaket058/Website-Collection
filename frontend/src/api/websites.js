import client from "./client";

export const getWebsites = () => client.get("/websites/");
export const createWebsite = (data) => client.post("/websites/", data);
export const updateWebsite = (id, data) => client.put(`/websites/${id}/`, data);
export const deleteWebsite = (id) => client.delete(`/websites/${id}/`);
