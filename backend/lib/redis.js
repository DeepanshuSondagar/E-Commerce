import Redis from "ioredis";
import dotenv from "dotenv";

dotenv.config();

export const redis = new Redis(process.env.UPSTASH_REDIS_URL, {
	connectTimeout: 5000,
	commandTimeout: 5000,
	enableOfflineQueue: false,
	maxRetriesPerRequest: 1,
	retryStrategy: (times) => (times > 3 ? null : Math.min(times * 500, 2000)),
});

redis.on("error", (error) => {
	console.error("Redis connection error:", error.message);
});
