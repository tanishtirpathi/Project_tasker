import { AsyncHandller } from "../config/AsyncHandler.js";
import { ApiError } from "../config/apiError.js";
import { ApiResponse } from "../config/ApiResp.js";
import { Project } from "../models/project.model.js";
import { UserRolesEnum } from "../config/constants.js";
import mongoose from "mongoose";
import { ProjectMember } from "../models/projectmember.model.js";
const getProjects = AsyncHandller(async (req, res) => {
  const userId = req.user?._id;
  if (!userId) {
    throw new ApiError(401, "user not found ");
  }
  const project = await Project.find({ createdBy: userId });
  if (!project) {
    throw new ApiError(404, "error in fetching projects ");
  }
  return res.status(200).json(new ApiResponse(200, project, "project get "));
});
const getProjectbyId = AsyncHandller(async (req, res) => {
  const { projectId } = req.params;
  if (!projectId) {
    throw new ApiError(400, "project is note exist ");
  }
  const Projectdetail = await Project.findById(projectId);
  if (!Projectdetail) {
    throw new ApiError(404, "Project not found bro ");
  }
  return res
    .status(202)
    .json(
      new ApiResponse(202, Projectdetail, "insan log project mil gya hai ")
    );
});
const createProjects = AsyncHandller(async (req, res) => {
  const { Name, description } = req.body;
  if (!Name || !description) {
    throw new ApiError(
      404,
      "we need name and description to create a project "
    );
  }
  const ProjectName = await Project.findOne({ Name });
  if (ProjectName) {
    throw new ApiError(
      400,
      "project already exist try to create new project with another name "
    );
  }

  const createProject = await Project.create({
    Name,
    description,
    createdBy: req.user?._id,
  });
  if (!createProject) {
    throw new ApiError(
      404,
      "project creating error ab ja ke ma chuda chutiya bkl"
    );
  }
  // Step 4: Add project creator as ADMIN in ProjectMember
  const projectOwner = await ProjectMember.create({
    user: req.user._id,
    project: createProject._id,
    role: UserRolesEnum.ADMIN, // <-- Make creator admin
  });

  if (!projectOwner) {
    throw new ApiError(500, "Failed to assign creator as project admin");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { project: createProject, member: projectOwner },
        "project created successfully "
      )
    );
});
const updateProject = AsyncHandller(async (req, res) => {
  const { projectId } = req.params;
  const { Name, description } = req.body;
  const project = await Project.findById(projectId);
  if (!project) throw new ApiError(404, "Project not found");
  const updatedProject = await Project.findByIdAndUpdate(
    projectId,
    { Name, description },
    { new: true }
  );
  if (!updatedProject) {
    throw new ApiError(404, "project update nai hua ab ghanta ukadh le ");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, updatedProject, "Project updated successfully"));
});
const getProjectMembers = AsyncHandller(async (req, res) => {});
const addProjectMember = AsyncHandller(async (req, res) => {});
const updateMemberRole = AsyncHandller(async (req, res) => {});
const deleteMember = AsyncHandller(async (req, res) => {});
const updateProjectMembers = AsyncHandller(async (req, res) => {});
export {
  getProjects,
  deleteMember,
  updateProjectMembers,
  getProjectbyId,
  createProjects,
  updateProject,
  updateMemberRole,
  getProjectMembers,
  addProjectMember,
};
