import { ITagRepository } from "../../application/interfaces/repositoryInterfaces/tagRepositoryInterfaces";
import tagModel from "../database/mongodb/tagModel";

export default class TagRepository implements ITagRepository {
  async create(data: any): Promise<any> {
    const newTag = new tagModel(data);
    return await newTag.save();
  }

  async blockTag(tag: string, blocked: boolean): Promise<any> {
    const tagBlock = await tagModel.findOneAndUpdate({ name: tag }, { blocked })
    console.log(tag ,"tag blocked",tagBlock)
    return await tagBlock
  }
}