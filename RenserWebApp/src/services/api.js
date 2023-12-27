import resolve from "./resolve";
import axios from "axios";
import { ApiName } from "../Utils/ApiName";
let apiBase = "/";
let localApiBase = "http://localhost:4000/api";
export const fetchAllProject = async () => {
  return await resolve(
    axios.get(apiBase + "getAllProjectList").then((res) => res.data)
  );
};
export const fetchAllOffices = async () => {
  return await resolve(
    axios.get(apiBase + "getAllOfficeList").then((res) => res.data)
  );
};
export const fetchAllLeadPracticeGroups = async () => {
  return await resolve(
    axios.get(apiBase + "getAllLeadPracticeGroupList").then((res) => res.data)
  );
};
export const fetchAllTeam = async () => {
  return await resolve(
    axios.get(apiBase + "getAllTeamList").then((res) => res.data)
  );
};
export const fetchAllIndustry = async () => {
  return await resolve(
    axios.get(apiBase + "getAllIndustryList").then((res) => res.data)
  );
};
export const fetchAllTemplate = async () => {
  return await resolve(
    axios.get(apiBase + "getAllTemplateList").then((res) => res.data)
  );
};
export const ondeleteProject = async (id) => {
  return await resolve(
    axios.delete(apiBase + `deleteProject/${id}`).then((res) => res.data)
  );
};
export const onChangeProjectStatus = async (projectId, status) => {
  return await resolve(
    axios
      .get(apiBase + `changeStatusProject/${projectId}/${status}`)
      .then((res) => res.data)
  );
};
export const fetchProjectDataById = async (projectId) => {
  return await resolve(
    axios
      .get(apiBase + `getProjectDataById/${projectId}`)
      .then((res) => res.data)
  );
};
export const onSearchProjectData = async (searchBy, searchVal) => {
  return await resolve(
    axios
      .get(apiBase + `searchProjectData/${searchBy}/${searchVal}`)
      .then((res) => res.data)
  );
};
export const fetchAllTeamMemberList = async () => {
  return await resolve(
    axios.get(apiBase + `getAllTeamMemberList`).then((res) => res.data)
  );
};
export const fetchAllTeamProjectList = async () => {
  return await resolve(
    axios.get(apiBase + `getAllTeamProjectList`).then((res) => res.data)
  );
};
export const onDeleteTeamMember = async (officeId) => {
  return await resolve(
    axios
      .delete(apiBase + `deleteTeamMember/${officeId}`)
      .then((res) => res.data)
  );
};
export const onDeleteTeam = async (teamId) => {
  return await resolve(
    axios.delete(apiBase + `deleteTeam/${teamId}`).then((res) => res.data)
  );
};
export const fetchTeamMemberDataById = async (teamMemberId) => {
  return await resolve(
    axios
      .get(apiBase + `getTeamMemberDataById/${teamMemberId}`)
      .then((res) => res.data)
  );
};
export const fetchTeamDataById = async (teamId) => {
  return await resolve(
    axios.get(apiBase + `getTeamDataById/${teamId}`).then((res) => res.data)
  );
};
export const fetchTeamAllDetails = async (teamId) => {
  return await resolve(
    axios.get(apiBase + `getTeamAllDetails/${teamId}`).then((res) => res.data)
  );
};
export const onDeletetemplateId = async (templateId) => {
  return await resolve(
    axios
      .delete(apiBase + `deleteTemplate/${templateId}`)
      .then((res) => res.data)
  );
};
export const fetchTemplateDataById = async (teamId) => {
  return await resolve(
    axios.get(apiBase + `getTemplateDataById/${teamId}`).then((res) => res.data)
  );
};
export const onDeleteOffice = async (officeId) => {
  return await resolve(
    axios.delete(apiBase + `deleteOffice/${officeId}`).then((res) => res.data)
  );
};
export const onDeleteLeadPracticeGroup = async (groupId) => {
  return await resolve(
    axios
      .delete(apiBase + `deleteLeadPracticeGroup/${groupId}`)
      .then((res) => res.data)
  );
};
export const fetchOfficeDataById = async (officeId) => {
  return await resolve(
    axios.get(apiBase + `getOfficeDataById/${officeId}`).then((res) => res.data)
  );
};
export const fetchLeadPracticeGroupDataById = async (groupId) => {
  return await resolve(
    axios
      .get(apiBase + `getLeadPracticeGroupDataById/${groupId}`)
      .then((res) => res.data)
  );
};
export const fetchllProjectNotes = async (projectId) => {
  return await resolve(
    axios
      .get(apiBase + `getAllProjectNotes/${projectId}`)
      .then((res) => res.data)
  );
};

export const onDeleteProjectNote = async (noteId) => {
  return await resolve(
    axios
      .delete(apiBase + `deleteProjectNote/${noteId}`)
      .then((res) => res.data)
  );
};

export const onCopyProject = async (projectId) => {
  return await resolve(
    axios.get(apiBase + `copyProject/${projectId}`).then((res) => res.data)
  );
};
export const onApproveProject = async (projectId) => {
  return await resolve(
    axios.get(apiBase + `approveProject/${projectId}`).then((res) => res.data)
  );
};
export const onUnapproveProject = async (projectId) => {
  return await resolve(
    axios.get(apiBase + `unapproveProject/${projectId}`).then((res) => res.data)
  );
};

//drupal apis

export const getFilesList = async (req) => {
  return await resolve(
    axios.get(localApiBase + "/filesList", req).then((res) => res.data)
  );
};

export const getFileMetaData = async (filename) => {
  return await axios
    .get(`${localApiBase}/fileMetaData/${filename}`)
    .then((res) => res.data)
    .catch((err) => console.error(err));
};

export const articlesList = async (req) => {
  return await resolve(
    axios
      .get(
        "https://miss-managment-system-server.onrender.com/api/articles",
        req
      )
      .then((res) => res.data)
  );
};

export const generatePdf = async (item) => {
  return await axios({
    url: `${localApiBase}/generatePdfs`,
    method: "POST",
    responseType: "blob", // Important
    data: item,
  })
    .then((response) => {
      console.log(response.headers, response.status);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${item.arg1}.pdf`);
      document.body.appendChild(link);
      link.click();
    })
    .catch((err) => console.error(err));
};

export const getAllTemplateListApi = async (req) => {
  return await resolve(
    axios.get(localApiBase + ApiName.templateList, req).then((res) => res.data)
  );
};

export const createNewProjectApi = async (req) => {
  return await resolve(
    axios
      .post(localApiBase + ApiName.createNewProject, req)
      .then((res) => res.data)
  );
};

export const genereateHtmlApi = async (req) => {
  return await resolve(
    axios.post(localApiBase + ApiName.generateHtml, req).then((res) => res.data)
  );
};

export const getTemplateMetaData = async (filePath) => {
  return await axios
    .get(
      `${
        localApiBase + ApiName.templateFileMetaData
      }?filename=${encodeURIComponent(filePath)}`
    )
    .then((res) => res.data)
    .catch((err) => console.error(err));
};
export const generatePdfApi = async (selections) => {
  return await axios
    .post(localApiBase + ApiName.generatePdf, { args: selections })
    .then((res) => res.data);
};
