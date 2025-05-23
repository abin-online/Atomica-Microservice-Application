import { Request, Response, NextFunction } from "express";
import { IBadgeUseCase } from "../../application/interfaces/useCaseInterfaces/IBadgeUseCase";
import ErrorHandler from "../../application/use-cases/middleware/errorHandler";
import s3Service from "../../infrastructure/aws/s3Service";

export class BadgeController {
    private badgeUseCase: IBadgeUseCase;
  
    constructor(badgeUseCase: IBadgeUseCase) {
      this.badgeUseCase = badgeUseCase;
      this.createBadge = this.createBadge.bind(this);
      this.updateBadge = this.updateBadge.bind(this);
      this.getBadge = this.getBadge.bind(this);
      this.getAllBadges = this.getAllBadges.bind(this);
      this.blockBadge = this.blockBadge.bind(this);
    }
  
    async createBadge(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
        const { name, description, minQuestionsSolved, category } = req.body;
        console.log("deii", req.body)
        const image = req.file as Express.Multer.File;

        console.log(image)
        if (!image) {
          res.status(400).json({ message: 'No image file' });
        }
        const s3Response = await s3Service.uploadFile(image);

        const badgeData = {
          name,
          description,
          minQuestionsSolved,
          category,
          imageURL: s3Response.Location
        }
        const newBadge = await this.badgeUseCase.createBadge(badgeData);
        res.status(201).json({ message: "Badge created", badge: newBadge });
      } catch (error: any) {
        return next(new ErrorHandler(error.status, error.message));
      }
    }
  
    // Method to update an existing badge
    async updateBadge(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
        const { id } = req.params;
        const { name, description, category, minQuestionsSolved } = req.body;
        const image = req.file as Express.Multer.File;
    
        let badgeData: { [key: string]: any } = { name, description, category, minQuestionsSolved };
    
        if (image) {
          const s3Response = await s3Service.uploadFile(image);
          badgeData.imageURL = s3Response.Location; // Add the new image URL if an image is uploaded
        }
        console.log(badgeData)
        const updatedBadge = await this.badgeUseCase.updateBadge(id, badgeData);
        res.status(200).json({ message: "Badge updated", badge: updatedBadge });
      } catch (error: any) {
        return next(new ErrorHandler(error.status, error.message));
      }
    }
    
  
    // Method to retrieve a badge by ID
    async getBadge(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
        const { id } = req.params;
        const badge = await this.badgeUseCase.getBadgeById(id);
        res.status(200).json(badge);
      } catch (error: any) {
        return next(new ErrorHandler(error.status, error.message));
      }
    }
  
    // Method to retrieve all badges
    async getAllBadges(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
        const badges = await this.badgeUseCase.getAllBadges();
        res.status(200).json(badges);
      } catch (error: any) {
        return next(new ErrorHandler(error.status, error.message));
      }
    }
  
    // Method to block or unblock a badge
    async blockBadge(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
       
        const {id, isActive } = req.body;
        console.log(req.body)
        const updatedBadge = await this.badgeUseCase.blockBadge(id, isActive);
        res.status(200).json(updatedBadge);
      } catch (error: any) {
        return next(new ErrorHandler(error.status, error.message));
      }
    }
  }
