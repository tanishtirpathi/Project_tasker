import { ApiResponse } from "../config/ApiResp.js";
// boiler plates
import { AsyncHandller } from "../config/AsyncHandler.js";
import { ProjectNote } from "../models/note.model.js";
import { ApiError } from "../config/apiError.js";
import { Project } from "../models/project.model.js";
import mongoose from "mongoose";
const getNotes = AsyncHandller(async (req, res) => {
  const { projectId } = req.params;
  const project = await Project.findById(projectId);
  if (!project) {
    throw new ApiError(400, "project not found ");
  }
  const notes = await ProjectNote.findOne({
    Project: new mongoose.Types.ObjectId(projectId),
  }).populate("CreatedBy", "username fullname avatar");

  return res.status(200).json(new ApiResponse(200, notes, "notes are found  "));
});
const getNotesId = AsyncHandller(async (req, res) => {
  const { noteId } = req.params;
  const note = await ProjectNote.findById(noteId).populate(
    "createdBy",
    "fullname username avatar"
  );
  if (!note) {
    throw new ApiError(400, "no notes found here bc note bna ja ke chutiya ");
  }
  return res.status(200).json(new ApiResponse(200, note, "notes are found  "));
});
const deleteNotes = AsyncHandller(async (req, res) => {
  const { noteId } = req.params;
  const note = ProjectNote.findByIdAndDelete(noteId);
  if (!note) {
    throw new ApiError(400, "note delete nai hua ");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, note, "notes delete ho gya hai   "));
});
const updateNotes = AsyncHandller(async (req, res) => {
  const { noteId } = req.params;
  const { content } = req.body;
  const noteExist = ProjectNote.findById(noteId);
  if (!noteExist) {
    throw new ApiError(400, "note exist nai karta bsdk ");
  }
  const updatedNote = await ProjectNote.findByIdAndUpdate(
    noteId,
    { content },
    { new: true }
  ).populate("createdBy", "username fullname avatar");
  if (!updatedNote) {
    throw new ApiError(404, "note update nai hua ab ghanta ukadh le ");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, updatedNote, "Note update ho gya bsdk  "));
});
const createNotes = AsyncHandller(async (req, res) => {
  const { projectId } = req.params;
  const { content } = req.body;
  const project = await Project.findById(projectId);
  if (!project) {
    throw new ApiError(400, "project note found bro ");
  }
  const note = ProjectNote.create({
    project: new mongoose.Types.ObjectId(projectId),
    content,
    createdBy: new mongoose.Types.ObjectId(req.user._id),
  });
  const PopulatedNotes = await ProjectNote.findById(note._).populate(
    "createdBy",
    "username fullname avatar"
  );
  return res
    .status(200)
    .json(new ApiResponse(200, PopulatedNotes, "notes created succesfully  "));
});
export { getNotes, getNotesId, createNotes, deleteNotes, updateNotes };
