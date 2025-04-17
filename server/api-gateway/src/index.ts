import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import dotenv from "dotenv";
import morgan from "morgan";

dotenv.config();

const app = express();

const {
  PORT,
  AUTH_SERVICE,
  TEST_SERVICE,
  PROBLEM_SERVICE,
  BADGE_SERVICE,
  COMPILER_SERVICE,
  COLLABORATION_SERVICE,
  COMMUNITY_SERVICE,
  CONTEST_SERVICE,
  SECURITY_NUMBER,
  FRONT_END
} = process.env;

// 📝 Logging
app.use(morgan('dev'));

app.use((req, res, next) => {
  console.log(`LOGGING 📝 : ${req.method} request to: ${req.originalUrl}`);
  next();
});

const BOOLEAN = 1 + 2 === Number(SECURITY_NUMBER);

// 🌐 Map of routes to services
const services: Record<string, string | undefined> = {
  '/auth': AUTH_SERVICE,
  '/test': TEST_SERVICE,
  '/problem': PROBLEM_SERVICE,
  '/badge': BADGE_SERVICE,
  '/compiler': COMPILER_SERVICE,
  '/collaboration': COLLABORATION_SERVICE,
  '/api/community': COMMUNITY_SERVICE,
  '/contest': CONTEST_SERVICE,
  '/socket.io': COLLABORATION_SERVICE // included for dynamic ws support
};

// Apply proxy middleware for each route
Object.entries(services).forEach(([route, target]) => {
  if (!target) {
    console.warn(`⚠️ Target not defined for route ${route}`);
    return;
  }

  const isSocketRoute = route === '/socket.io';

  app.use(route, createProxyMiddleware({
    target,
    changeOrigin: true,
    ...(isSocketRoute && { ws: BOOLEAN }) // only add ws for socket route
  }));
});

app.use(
  "/",
  createProxyMiddleware({
    target: FRONT_END,
    changeOrigin: true,
  })
);



// 🚀 Start the server
app.listen(PORT, () => {
  console.log(`ATOMICA API GATEWAY RUNNING on http://localhost:${PORT} 🍃`);
});
