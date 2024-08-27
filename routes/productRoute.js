import express from "express"
import { addProduct, listProduct, removeProduct, singleProductDetails } from "../controllers/productController.js";
import multer from "multer";

const productRouter = express.Router();

// image storage engine
const storage = multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)
    }
})

const upload = multer({storage:storage})

productRouter.post("/add", upload.single("image"), addProduct)
productRouter.get("/list", listProduct)
productRouter.get("/:id", singleProductDetails)
productRouter.post("/remove", removeProduct)
productRouter.put("/update", removeProduct)

export default productRouter;