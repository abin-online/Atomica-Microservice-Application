import { Router } from "express";
import { badgeController, userController } from "./injection";

const router = (router: Router) => {
    // Define routes for badge-related operations
    router.post("/badge", badgeController.createBadge); // Create a new badge
    router.put("/badge/:id", badgeController.updateBadge); // Update an existing badge
    router.get("/badge/:id", badgeController.getBadge); // Get a badge by ID
    router.get("/badge", badgeController.getAllBadges); // Get all badges
    router.patch("/badge", badgeController.blockBadge); // Block or unblock a badge
    router.post('/test' , userController.updateTestPoint);
}





// badgeRouter.post('/badge', badgeController.addBadge);
// badgeRouter.get('/badge', badgeController.getBadge);
// badgeRouter.patch('/badge', badgeController.updateBadge)
// badgeRouter.get('/badge/:id', badgeController.getBadgeById)

export default router;
