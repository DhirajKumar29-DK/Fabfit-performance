"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAssessmentSchema = exports.createAssessmentSchema = void 0;
const zod_1 = require("zod");
const client_1 = require("@prisma/client");
exports.createAssessmentSchema = zod_1.z.object({
    firstName: zod_1.z.string().min(1, "First name is required"),
    lastName: zod_1.z.string().min(1, "Last name is required"),
    age: zod_1.z.coerce.number().int().positive().max(120),
    gender: zod_1.z.string().min(1, "Gender is required"),
    height: zod_1.z.string().min(1, "Height is required"),
    weight: zod_1.z.string().min(1, "Weight is required"),
    email: zod_1.z.string().email("Invalid email format"),
    phone: zod_1.z.string().min(1, "Phone is required"),
    activityLevel: zod_1.z.string().min(1, "Activity level is required"),
    primaryGoal: zod_1.z.string().min(1, "Primary goal is required"),
    experience: zod_1.z.string().min(1, "Experience is required"),
    frequency: zod_1.z.string().min(1, "Frequency is required"),
    equipment: zod_1.z.string().min(1, "Equipment is required"),
    cardio: zod_1.z.string().min(1, "Cardio is required"),
    occupation: zod_1.z.string().min(1, "Occupation is required"),
    steps: zod_1.z.string().min(1, "Steps is required"),
    sleep: zod_1.z.string().min(1, "Sleep is required"),
    stress: zod_1.z.string().min(1, "Stress is required"),
    diet: zod_1.z.string().min(1, "Diet is required"),
    meals: zod_1.z.string().min(1, "Meals is required"),
    alcohol: zod_1.z.string().min(1, "Alcohol is required"),
    tobacco: zod_1.z.string().min(1, "Tobacco is required"),
    supplements: zod_1.z.string().optional(),
    conditions: zod_1.z.string().min(1, "Conditions is required"),
    medications: zod_1.z.string().min(1, "Medications is required"),
    injuries: zod_1.z.string().min(1, "Injuries is required"),
    allergies: zod_1.z.string().min(1, "Allergies is required"),
    waist: zod_1.z.string().min(1, "Waist is required"),
    commitmentLevel: zod_1.z.coerce.number().int().min(1).max(10),
    notes: zod_1.z.string().optional(),
    bloodReportUrl: zod_1.z.string().optional(),
    physiqueImageUrl: zod_1.z.string().optional()
});
exports.updateAssessmentSchema = zod_1.z.object({
    status: zod_1.z.nativeEnum(client_1.AssessmentStatus).optional(),
    notes: zod_1.z.string().optional()
});
