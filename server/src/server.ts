import Fastify from "fastify";
import cors from "@fastify/cors";
import jwt from "@fastify/jwt";

import { poolRoutes } from "./routes/pool";
import { authRoutes } from "./routes/auth";
import { gameRoutes } from "./routes/game";
import { guessRoutes } from "./routes/guess";
import { userRoutes } from "./routes/user";

async function bootstrap() {
  const fastify = Fastify({
    logger: true,
  });
  await fastify.register(cors, {
    origin: true,
  });

  await fastify.register(jwt, {
    secret: "nlwcopa",
  });

  fastify.register(poolRoutes);
  fastify.register(authRoutes);
  fastify.register(gameRoutes);
  fastify.register(userRoutes);
  fastify.register(guessRoutes);

  await fastify.listen({ port: 3333, host : '0.0.0.0' });
}
bootstrap();
