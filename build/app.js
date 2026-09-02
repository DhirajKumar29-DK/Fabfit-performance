"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
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
const about_routes_1 = __importDefault(require("./modules/about/about.routes"));
const program_routes_1 = __importDefault(require("./modules/program/program.routes"));
const program_highlight_routes_1 = __importDefault(require("./modules/program-highlight/program-highlight.routes"));
const program_section_routes_1 = __importDefault(require("./modules/program-section/program-section.routes"));
const membership_section_routes_1 = __importDefault(require("./modules/membership-section/membership-section.routes"));
const membership_plan_routes_1 = require("./modules/membership-plan/membership-plan.routes");
const testimonial_routes_1 = require("./modules/testimonial/testimonial.routes");
const head_coach_routes_1 = __importDefault(require("./modules/head-coach/head-coach.routes"));
const team_section_routes_1 = __importDefault(require("./modules/team-section/team-section.routes"));
const team_member_routes_1 = __importDefault(require("./modules/team-member/team-member.routes"));
const service_routes_1 = __importDefault(require("./modules/service/service.routes"));
const transformation_section_routes_1 = __importDefault(require("./modules/transformation-section/transformation-section.routes"));
const transformation_routes_1 = __importDefault(require("./modules/transformation/transformation.routes"));
const auth_routes_1 = __importDefault(require("./modules/auth/auth.routes"));
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json({ limit: '50mb' }));
app.use(express_1.default.urlencoded({ limit: '50mb', extended: true }));
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true
}));
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
app.use('/api/about', about_routes_1.default);
app.use('/api/programs', program_routes_1.default);
app.use('/api/program-highlights', program_highlight_routes_1.default);
app.use('/api/program-section', program_section_routes_1.default);
app.use('/api/membership-section', membership_section_routes_1.default);
app.use('/api/membership-plans', membership_plan_routes_1.membershipPlanRoutes);
app.use('/api/testimonials', testimonial_routes_1.testimonialRoutes);
app.use('/api/head-coach', head_coach_routes_1.default);
app.use('/api/team-section', team_section_routes_1.default);
app.use('/api/team-members', team_member_routes_1.default);
app.use('/api/services', service_routes_1.default);
app.use('/api/transformation-section', transformation_section_routes_1.default);
app.use('/api/transformations', transformation_routes_1.default);
app.use('/api/auth', auth_routes_1.default);
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
                url: process.env.BASE_URL || 'http://localhost:5000',
                description: 'API Server',
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
