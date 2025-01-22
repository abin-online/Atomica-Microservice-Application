// import { Router } from "express";
// import {  profileController,  } from "./injection";
// import multer from "multer";
// import { isUser } from "../middlewares/authMiddleware/roleAuth";

// const storage = multer.memoryStorage();
// const upload = multer({storage: storage});



// const profileRouter = (router: Router) => {
    
//     router.get('/profile' , isUser, profileController.getProfile )
// }




// export default profileRouter;

import express from 'express';
import { ProfileController } from '../../interface/controllers/ProfileController'; // Assuming the correct path
import { isUser } from '../middlewares/authMiddleware/roleAuth'; // Assuming the correct path

const profileRouter = express.Router();
const profileController = new ProfileController();

profileRouter.get('/profile', isUser, profileController.getProfile);

export default profileRouter;

