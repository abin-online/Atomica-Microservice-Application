import { IBadge } from "../../../domain/entities/badge";

export interface IBadgeRepository {
    addBadge(badge: IBadge): Promise<IBadge>;
    getAllBadges(): Promise<IBadge[]>;
    getBadgeById(id: string): Promise<IBadge | null>;
    blockBadge(id: string, isActive: boolean): Promise<IBadge>;
    updateBadge(id: string, data: Partial<IBadge>): Promise<IBadge | null>;
}
