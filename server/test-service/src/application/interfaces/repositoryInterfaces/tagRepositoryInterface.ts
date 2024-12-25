import { ITag } from "../../../domain/entities/tag";

export interface ITagRepository {
  create(tag: ITag): Promise<ITag>;
  getAll(): Promise<ITag[]>;
  blockTag(id: string, blocked: boolean): Promise<ITag | null>;
}
