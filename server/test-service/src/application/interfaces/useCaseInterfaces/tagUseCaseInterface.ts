import { ITag } from "../../../domain/entities/tag";

export interface ITagUseCase {
    createTag(tag: ITag): Promise<ITag>;
    blockTag(id: string, blocked: boolean): Promise<ITag | null>;
    getAllTags(): Promise<ITag[]>;
    getTagById(id: string): Promise<ITag>;
    updateTag(id: string, data: any): Promise<ITag>;
  }