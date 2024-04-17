import express from "express";
import validateBody from "../helpers/validateBody.js";
import { createContactSchema, updateContactSchema, updateFavoriteSchema } from "../schemas/contactsSchemas.js";
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  updateFavorite,
} from "../controllers/contactsControllers.js";
import { checkUserId } from "../middlewars/checkUserId.js";
import { checkContactDuplicateEmail } from "../middlewars/checkContactDuplicateEmail.js";
import { protect } from "../middlewars/authMiddlewars.js";

const contactsRouter = express.Router();

contactsRouter.use(protect);

contactsRouter.get("/", getAllContacts);

contactsRouter.get("/:id", checkUserId, getOneContact);

contactsRouter.post("/", checkContactDuplicateEmail, validateBody(createContactSchema), createContact);

contactsRouter.put("/:id", checkUserId, validateBody(updateContactSchema), updateContact);

contactsRouter.patch("/:id/favorite", checkUserId, validateBody(updateFavoriteSchema), updateFavorite);

contactsRouter.delete("/:id", checkUserId, deleteContact);

export default contactsRouter;
