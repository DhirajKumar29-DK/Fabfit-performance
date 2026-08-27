"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const path_1 = __importDefault(require("path"));
const errorHandler_1 = require("./middlewares/errorHandler");
const assessment_routes_1 = __importDefault(require("./modules/assessment/assessment.routes"));
const hero_routes_1 = __importDefault(require("./modules/hero/hero.routes"));
const upload_routes_1 = __importDefault(require("./modules/upload/upload.routes"));
const visitor_routes_1 = __importDefault(require("./modules/visitor/visitor.routes"));
const counter_routes_1 = __importDefault(require("./modules/counter/counter.routes"));
const gallery_routes_1 = __importDefault(require("./modules/gallery/gallery.routes"));
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json({ limit: '50mb' }));
app.use(express_1.default.urlencoded({ limit: '50mb', extended: true }));
app.use((0, cors_1.default)());
// Serve static files
app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, '../public/uploads')));
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'Fab Fit Backend is running' });
});
// Mount Routes
app.use('/api/assessments', assessment_routes_1.default);
app.use('/api/heroes', hero_routes_1.default);
app.use('/api/upload', upload_routes_1.default);
app.use('/api/visitors', visitor_routes_1.default);
app.use('/api/counters', counter_routes_1.default);
app.use('/api/gallery', gallery_routes_1.default);
// Swagger Configuration
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Fab Fit API Documentation',
            version: '1.0.0',
            description: 'API documentation for Fab Fit Performance Backend',
        },
        servers: [
            {
                url: 'http://localhost:5000',
                description: 'Development Server',
            },
        ],
    },
    apis: ['./src/modules/**/*.routes.ts', './src/app.ts'],
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(swaggerOptions);
app.use('/swagger-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
// Global Error Handler should always be the last middleware
app.use(errorHandler_1.errorHandler);
exports.default = app;
