import express from "express"
import { getCart,addToCart,removeFromCart } from "../controllers/cartController.js" 
import authMiddleware from "../middleware/auth.js"

const cartRouter = express.Router()

cartRouter.post("/add",addToCart) //authMiddleware,
cartRouter.post("/remove",removeFromCart) //authMiddleware,
cartRouter.post("/get",getCart) //authMiddleware,

export default cartRouter;