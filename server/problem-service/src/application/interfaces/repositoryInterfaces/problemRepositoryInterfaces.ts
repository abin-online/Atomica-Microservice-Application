export interface IProblemRepository {
    create(data: any): Promise<any>;
    updateById(id: string, data: any): Promise<any>;
    updateBlockedStatus(id: string, blocked: boolean): Promise<any>;
    findById(id: string): Promise<any | null>;
    findAll(): Promise<any[]>;
    getAllTags(): Promise<any[]>
  }
  