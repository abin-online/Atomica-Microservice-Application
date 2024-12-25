import { ObjectId } from "mongoose";
import { IMCQ } from "../../../domain/entities/question";
export interface IMcqRepository {
  create(data: any): Promise<any>;
  findAll(): Promise<any[]>;
  findById(id: string): Promise<any | null>;
  updateById(id: string, data: any): Promise<any | null>;
  updateBlockedStatus(id: string, blocked: boolean): Promise<any | null>;
  fetchToUser(tag: string, difficulty: string): Promise<any | null>;
}
