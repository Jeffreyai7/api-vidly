import helmet from "helmet";
import compression from "compression";

export default function prod(app) {
  // Security HTTP headers
  app.use(helmet());
  // Compress response bodies for all request
  app.use(compression());
}
