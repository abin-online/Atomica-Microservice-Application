import { Router as ExpressRouter } from 'express';
import BadgeController from '../controllers/badgeController'

const badgeRouter = ExpressRouter();

const badgeController = new BadgeController()

badgeRouter.post('/badge', badgeController.addBadge);
badgeRouter.get('/badge', badgeController.getBadge);
badgeRouter.patch('/badge', badgeController.updateBadge)
badgeRouter.get('/badge/:id', badgeController.getBadgeById)

export default badgeRouter;
