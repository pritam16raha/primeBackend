import express from "express"
import { getUser, loginUser,registerUser } from "../controllers/userController.js"

const userRouter = express.Router()

userRouter.post("/login", loginUser)
userRouter.post("/register", registerUser)
userRouter.put("/update", registerUser)
userRouter.get("/getuser/:id", getUser)

export default userRouter;