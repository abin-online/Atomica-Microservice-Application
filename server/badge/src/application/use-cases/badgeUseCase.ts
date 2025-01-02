import { IBadgeRepository } from "../interfaces/repositoryInterface/IBadgeRepository";
import { IBadge } from "../../domain/entities/badge";

export default class BadgeUseCase {
  private badgeRepository: IBadgeRepository;

  constructor(badgeRepository: IBadgeRepository) {
    this.badgeRepository = badgeRepository;
  }

  // Create a new badge
  async createBadge(data: IBadge): Promise<IBadge> {
    return await this.badgeRepository.addBadge(data);
  }

  // Update badge details
  async updateBadge(id: string, data: Partial<IBadge>): Promise<IBadge | null> {
    return await this.badgeRepository.updateBadge(id, data);
  }

  // Get all badges
  async getAllBadges(): Promise<IBadge[]> {
    return await this.badgeRepository.getAllBadges();
  }

  // Get a badge by its ID
  async getBadgeById(id: string): Promise<IBadge | null> {
    return await this.badgeRepository.getBadgeById(id);
  }

  // Block or unblock a badge (e.g., setting the `isActive` status)
  async blockBadge(badgeId: string, isActive: boolean): Promise<IBadge | null> {
    return await this.badgeRepository.blockBadge(badgeId, isActive);
  }


}
