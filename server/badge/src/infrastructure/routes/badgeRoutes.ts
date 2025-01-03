import { Router } from "express";
import { badgeController, userController } from "./injection";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({storage: storage});



const router = (router: Router) => {
    router.post("/badge", upload.single('image'), badgeController.createBadge); 
    router.put("/badge/:id", upload.single('image'), badgeController.updateBadge); 
    router.get("/badge/:id", badgeController.getBadge); 
    router.get("/badge", badgeController.getAllBadges); 


    //PATCH IS NOT WORKING, 
    router.put("/blockBadge", badgeController.blockBadge); 
    router.post('/test' , userController.updateTestPoint);
    router.get('/leaderBoard' , userController.leaderBoard);
}





// badgeRouter.post('/badge', badgeController.addBadge);
// badgeRouter.get('/badge', badgeController.getBadge);
// badgeRouter.patch('/badge', badgeController.updateBadge)
// badgeRouter.get('/badge/:id', badgeController.getBadgeById)

export default router;
