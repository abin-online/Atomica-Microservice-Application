import { IProblemRepository } from "../../application/interfaces/repositoryInterfaces/problemRepositoryInterfaces";
import mongoose from "mongoose";
import { Problem } from "../database/mongodb/problemModel";
import tagModel from "../database/mongodb/tagModel";

export default class ProblemRepository implements IProblemRepository {
  // Create a new problem
  async create(data: any): Promise<any> {
    const newProblem = new Problem(data);
    return await newProblem.save();
  }

  // Get all problems
  async findAll(): Promise<any[]> {
    return await Problem.find({});
  }

  // Find a problem by ID
  async findById(id: string): Promise<any | null> {
    return await Problem.findById(id);
  }

  // Update a problem by ID
  async updateById(id: string, data: any): Promise<any | null> {
    return await Problem.findByIdAndUpdate(id, data, { new: true });
  }

  // Update blocked status of a problem
  async updateBlockedStatus(id: string, blocked: boolean): Promise<any | null> {
    return await Problem.findByIdAndUpdate(id, { blocked }, { new: true });
  }

  // Fetch problems based on tags and difficulty (example for user-facing queries)
  async fetchByTagAndDifficulty(tag: string, difficulty: string): Promise<any[]> {
    const tagObjectId = new mongoose.Types.ObjectId(tag);
    const response = await Problem.aggregate([
      { $match: { tags: tagObjectId, difficulty, blocked: false } },
      { $sample: { size: 5 } },
    ]);

    return response;
  }

  async getAllTags(): Promise<any[]> {
    const tags = await tagModel.find()
    return tags
  }
}
