import { IBadgeRepository } from "../../application/interfaces/repositoryInterface/IBadgeRepository";
import { BadgeModel } from "../database/models/badgeModel";
import { IBadge } from "../../domain/entities/badge";

export class BadgeRepository implements IBadgeRepository {
    // Add a new badge
    async addBadge(badge: IBadge): Promise<IBadge> {
        console.log("BADGE REPO ||",badge)
        return await BadgeModel.create(badge);
    }

    // Get all badges
    async getAllBadges(): Promise<IBadge[]> {
        return await BadgeModel.find({});
    }

    // Get a badge by its ID
    async getBadgeById(id: string): Promise<IBadge | null> {
        return await BadgeModel.findById(id);
    }

    // Update badge details
    async updateBadge(id: string, data: Partial<IBadge>): Promise<IBadge | null> {
        return await BadgeModel.findByIdAndUpdate(id, data, { new: true });
    }

    // Block or unblock a badge by changing the `isActive` field
    async blockBadge(id: string, isActive: boolean): Promise<IBadge> {
        // Update the `isActive` field of the badge
        console.log(id)
        const updateBadge = await BadgeModel.findByIdAndUpdate(id, {isActive: isActive})
        console.log(updateBadge)
   
                
        if (!updateBadge) {
            throw new Error("Badge not found");
        }

        return updateBadge;
    }
}
