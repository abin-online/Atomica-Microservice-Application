import { IBadge } from "../../../domain/entities/badge";

export interface IBadgeUseCase {
  createBadge(data: IBadge): Promise<IBadge>;
  updateBadge(id: string, data: Partial<IBadge>): Promise<IBadge | null>;
  getAllBadges(): Promise<IBadge[]>;
  getBadgeById(id: string): Promise<IBadge | null>;
  blockBadge(badgeId: string, isActive: boolean): Promise<IBadge | null>;
}
