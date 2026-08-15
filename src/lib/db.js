import mongoose from "mongoose";

/**
 * Prefer MONGODB_CONNECTION_STRING, fall back to MONGODB_URI for
 * backwards compatibility. Cache the connection across hot reloads /
 * serverless invocations so we don't open a new socket on every request.
 */
const MONGODB_URI =
	process.env.MONGODB_CONNECTION_STRING || process.env.MONGODB_URI;

if (!MONGODB_URI) {
	throw new Error(
		"Missing MongoDB connection string. Set MONGODB_CONNECTION_STRING in your environment.",
	);
}

let cached = global.__mongoose;
if (!cached) {
	cached = global.__mongoose = { conn: null, promise: null };
}

async function connectDB() {
	if (cached.conn) return cached.conn;

	if (!cached.promise) {
		cached.promise = mongoose
			.connect(MONGODB_URI, {
				bufferCommands: false,
				maxPoolSize: 10,
			})
			.then((m) => m.connection);
	}

	try {
		cached.conn = await cached.promise;
	} catch (err) {
		cached.promise = null;
		throw err;
	}

	return cached.conn;
}

export default connectDB;
