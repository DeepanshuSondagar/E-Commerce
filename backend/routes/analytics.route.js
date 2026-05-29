import express from "express";
import { adminRoute, protectRoute } from "../middleware/auth.middleware.js";
// Imported both functions from your analytics controller
import { getAnalyticsData, getDailySalesData } from "../controllers/analytics.controller.js";
 
const router = express.Router();

router.get("/", protectRoute, adminRoute, async (req, res) => {
    try {
        // 1. Fetches overall metrics for your top cards
        const analyticsData = await getAnalyticsData();

        // 2. Defines the 7-day window for your line graph
        const endDate = new Date();
        const startDate = new Date(endDate.getTime() - 7 * 24 * 60 * 60 * 1000);

        // 3. FIXED: Calls getDailySalesData to get the trend array
        const dailySalesData = await getDailySalesData(startDate, endDate);

        // 4. Sends both separate data structures to the frontend dashboard
        res.json({
            analyticsData,
            dailySalesData,
        });
    } catch (error) {
        console.log("Error in analytics route:", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

export default router;