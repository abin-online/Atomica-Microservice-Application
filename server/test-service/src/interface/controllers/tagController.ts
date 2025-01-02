// src/interface/controllers/tagController.ts
import { Req, Res, Next } from "../framework/types/serverTypes";
import { ITagUseCase } from "../../application/interfaces/useCaseInterfaces/tagUseCaseInterface";
import ErrorHandler from "../../application/usecases/middleware/errorHandler";

export default class TagController {
  private tagUseCase: ITagUseCase;

  constructor(tagUseCase: ITagUseCase) {
    this.tagUseCase = tagUseCase;

    // Bind methods
    this.createTag = this.createTag.bind(this);
    this.blockTag = this.blockTag.bind(this);
    this.getTags = this.getTags.bind(this);
  }

  async createTag(req: Req, res: Res, next: Next): Promise<void> {
    const { tag } = req.body;
    try {
      const newTag = await this.tagUseCase.createTag({ name: tag });
      res.status(201).json(newTag);
    } catch (error: any) {
        return next(new ErrorHandler(error.status, error.message))
    }
  }

  

  async blockTag(req: Req, res: Res, next: Next): Promise<void> {
    console.log('request' , req.body)
    const { tag, blocked } = req.body;
    try {
        console.log('request' , req.body.tag)
      const updatedTag = await this.tagUseCase.blockTag(tag, blocked);
      if (!updatedTag) {
        res.status(404).json({ message: "Tag not found" });
        return;
      }
      res.json(updatedTag);
    } catch (error: any) {
        return next(new ErrorHandler(error.status, error.message))
    }
  }

  async getTags(req: Req, res: Res, next: Next): Promise<void> {
    try {
      const tags = await this.tagUseCase.getAllTags();
      res.json(tags);
    } catch (error: any) {
        return next(new ErrorHandler(error.status, error.message))
    }
  }

  async getTagById(req: Req, res: Res, next: Next) : Promise<void> {
    try {
      const id = req.params.id;
      const tag = await this.tagUseCase.getTagById(id);
      res.json(tag)
    } catch (error : any) {
      return next(new ErrorHandler(error.status, error.message))
    }
  }

  async updateTag(req: Req, res: Res, next: Next) : Promise<void> {
    try {
      const {id} = req.params
      const data = req.body;
      const updatedTag = await this.tagUseCase.updateTag(id, data)
      res.status(200).json(updatedTag);
    } catch (error: any) {
      return next(new ErrorHandler(error.status, error.message))
    }
  }
}
