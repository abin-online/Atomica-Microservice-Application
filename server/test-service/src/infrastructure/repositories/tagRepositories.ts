import { ITag } from "../../domain/entities/tag";
import tagModel from "../database/mongodb/models/tagModel";
import { ITagRepository } from "../../application/interfaces/repositoryInterfaces/tagRepositoryInterface";

export class TagRepository implements ITagRepository {
  async create(tag: ITag): Promise<ITag> {
    const newTag = await tagModel.create(tag);
    return newTag
  }

  async getAll(): Promise<ITag[]> {
    const tags = await tagModel.find();
    return tags
  }

  async blockTag(id: string, blocked: boolean): Promise<ITag | null> {
    console.log("tag repository ===>",id, blocked)
    const updatedTag = await tagModel.findByIdAndUpdate(
      id,
      { blocked },
      { new: true }
    );
    console.log(updatedTag)
    return updatedTag
  }
}
