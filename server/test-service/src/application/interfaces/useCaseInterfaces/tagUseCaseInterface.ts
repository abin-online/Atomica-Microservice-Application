import { ITag } from "../../../domain/entities/tag";

export interface ITagUseCase {
    createTag(tag: ITag): Promise<ITag>;
    blockTag(id: string, blocked: boolean): Promise<ITag | null>;
    getAllTags(): Promise<ITag[]>;
  }