import { IBadgeRepository } from "../interfaces/repositoryInterface/IBadgeRepository";
import { IBadge } from "../../domain/entities/badge";

export default class BadgeUseCase {
  private badgeRepository: IBadgeRepository;

  constructor(badgeRepository: IBadgeRepository) {
    this.badgeRepository = badgeRepository;
  }

  // Create a new badge
  async createBadge(data: IBadge): Promise<IBadge> {
    // await produce('add-badge', data);
    return await this.badgeRepository.addBadge(data);
  }

  // Update badge details
  async updateBadge(id: string, data: Partial<IBadge>): Promise<IBadge | null> {
    // await produce('update-badge', data);
    return await this.badgeRepository.updateBadge(id, data);
  }

  // Get all badges
  async getAllBadges(): Promise<IBadge[]> {
    return await this.badgeRepository.getAllBadges();
  }

  async getBadgeById(id: string): Promise<IBadge | null> {
    return await this.badgeRepository.getBadgeById(id);
  }

  async blockBadge(badgeId: string, isActive: boolean): Promise<IBadge | null> {
    return await this.badgeRepository.blockBadge(badgeId, isActive);
  }


}
