import express from "express";
import {deleteContactById, getContactById, getContacts, save, updateContactById} from "./../controller/contactController.js";
import { isAuthenticate } from "../middlewares/Auth.js";
const router=express.Router();

router.post("/save",isAuthenticate,save);
router.get("/getAllContacts",getContacts);
router.get("/:id",getContactById);
router.put("/:id",updateContactById);
router.delete("/:id",deleteContactById);
export const contactRoutes=router;