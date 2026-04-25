import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import routes from './routes/index.js';
import { swaggerDocument } from './swagger.js';
import { errorMiddleware, notFoundMiddleware, } from './middlewares/error.middleware.js';
export const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api', routes);
app.use(notFoundMiddleware);
app.use(errorMiddleware);
//# sourceMappingURL=app.js.map