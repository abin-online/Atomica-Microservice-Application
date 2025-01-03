import { Router } from "express";
import { badgeController, userController } from "./injection";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({storage: storage});



const router = (router: Router) => {
    
    router.post("/badge", upload.single('image'), badgeController.createBadge); 
    router.put("/badge/:id", upload.single('image'), badgeController.updateBadge); 
    router.get("/badge/:id", badgeController.getBadge); 
    router.get("/badges", badgeController.getAllBadges); 


    //PATCH IS NOT WORKING, 
    router.put("/blockBadge", badgeController.blockBadge); 
    router.post('/test' , userController.updateTestPoint);
    router.get('/leaderBoard' , userController.leaderBoard);
}





// badgeRouter.post('/addBadge', badgeController.addBadge);
// badgeRouter.get('/badges', badgeController.getBadge);
// badgeRouter.patch('/blockBadge', badgeController.updateBadge)
// badgeRouter.get('/badge/:id', badgeController.getBadgeById)

export default router;
