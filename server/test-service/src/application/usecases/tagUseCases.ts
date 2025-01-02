// src/application/usecases/tagUseCase.ts
import { ITagUseCase } from "../interfaces/useCaseInterfaces/tagUseCaseInterface";
import { ITagRepository } from "../interfaces/repositoryInterfaces/tagRepositoryInterface";
import { ITag } from "../../domain/entities/tag";
import produce from "../../infrastructure/messaging/kafka/producer";

export default class TagUseCase implements ITagUseCase {
  private tagRepository: ITagRepository;

  constructor(tagRepository: ITagRepository) {
    this.tagRepository = tagRepository;
  }

  async createTag(tag: ITag): Promise<ITag> {
    if (!tag.name) {
      throw new Error("Tag name is required");
    }
    //---------------------------------------------
    await produce('add-tag', tag) //kafka produce |
    //---------------------------------------------
    return await this.tagRepository.create(tag);
  }

  async blockTag(id: string, blocked: boolean): Promise<ITag | null> {
    console.log("from usecase     ",id, blocked)

    
    const tag = await this.tagRepository.blockTag(id, blocked);
    const blockData = {
      tag: tag?.name,
      blocked
    }
    await produce('block-tag', blockData);
    
    return tag
  }

  async getAllTags(): Promise<ITag[]> {
    return await this.tagRepository.getAll();
  }
  
  

  async getTagById(id: string) : Promise<ITag> {
    return await this.tagRepository.getTag(id);
  }

  async updateTag(id: string, data: any): Promise<ITag> {
    return await this.tagRepository.updateTag(id, data);
  }
}
