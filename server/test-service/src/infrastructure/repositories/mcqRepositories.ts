import { ObjectId } from "mongoose";
import { IMcqRepository } from "../../application/interfaces/repositoryInterfaces/testRepositoryInterface";
import { IMCQ } from "../../domain/entities/question";
import mcqModel from "../../infrastructure/database/mongodb/models/mcqModel";
import mongoose from "mongoose";

export default class McqRepository implements IMcqRepository {
  async create(data: any): Promise<any> {
    const newMCQ = new mcqModel(data);
    return await newMCQ.save();
  }

  async findAll(): Promise<any[]> {
    return await mcqModel.find({});
  }

  async findById(id: string): Promise<any | null> {
    return await mcqModel.findById(id);
  }

  async updateById(id: string, data: any): Promise<any | null> {
    return await mcqModel.findByIdAndUpdate(id, data, { new: true });
  }

  async updateBlockedStatus(id: string, blocked: boolean): Promise<any | null> {
    return await mcqModel.findByIdAndUpdate(id, { blocked }, { new: true });
  }

  async fetchToUser(tag: string, difficulty: string): Promise<any | null> {
    console.log(tag, "____________", difficulty)
    const tagObjectId = new mongoose.Types.ObjectId(tag);

    const response = await mcqModel.aggregate([
      { $match: {blocked: false, tags: tagObjectId, difficulty: difficulty } },
       {$sample: {size: 5}}
    ]);

    console.log("[]{}", response)
    return response
  }

  async getMCQForContest(question: any): Promise<any> {
    console.log("contest array ", question)
      const mCQForContest = await mcqModel.find({question: {$in: question}})
      return mCQForContest
  }
}

