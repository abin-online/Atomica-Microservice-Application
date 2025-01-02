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
    return await this.tagRepository.blockTag(id, blocked);
  }

  async getAllTags(): Promise<ITag[]> {
    return await this.tagRepository.getAll();
  }
}
