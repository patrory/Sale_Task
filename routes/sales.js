import express from "express";
import { fetchDetail,getStatistics ,getBarChart,getPiechart,getAllDetails} from "../controllers/saleController.js";
const router = express.Router();

router.get("/fetch", fetchDetail);
router.get("/statistics/:month", getStatistics);
router.get("/barchart/:month", getBarChart);
router.get("/piechart/:month", getPiechart);
router.get("/getalldetails/:month", getAllDetails);

export default router;
