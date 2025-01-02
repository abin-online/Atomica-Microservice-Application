import { ITagRepository } from "../interfaces/repositoryInterfaces/tagRepositoryInterfaces";

export default class TagUseCase {
    private tagRepository: ITagRepository;

    constructor(tagRepository: ITagRepository) {
        this.tagRepository = tagRepository;
    }

    async addTag(data: any): Promise<any> {
        return await this.tagRepository.create(data)
    }

    async blockTag(data: any) : Promise<any> {
        const {tag, blocked} = data;
        console.log("inside block tag use case",tag, blocked)
        return await this.tagRepository.blockTag(tag, blocked);
    }
}