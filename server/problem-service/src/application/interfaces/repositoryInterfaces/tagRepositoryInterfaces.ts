export interface ITagRepository {
    create(data: any): Promise<any>;
    blockTag(tag: string, blocked: boolean ) : Promise<any>
}