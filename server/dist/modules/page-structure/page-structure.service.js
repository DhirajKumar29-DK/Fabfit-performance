"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bulkUpdateSections = exports.seedInitialSections = exports.getPageSections = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// Get all page sections sorted by order
const getPageSections = async () => {
    return await prisma.pageSection.findMany({
        orderBy: {
            order: 'asc'
        }
    });
};
exports.getPageSections = getPageSections;
// Seed initial sections if they don't exist
const seedInitialSections = async () => {
    const existingCount = await prisma.pageSection.count();
    if (existingCount === 0) {
        const initialSections = [
            { sectionId: 'home', title: 'HOME', order: 1, isActive: true },
            { sectionId: 'about', title: 'ABOUT', order: 2, isActive: true },
            { sectionId: 'programs', title: 'PROGRAMS', order: 3, isActive: true },
            { sectionId: 'services', title: 'SERVICES', order: 4, isActive: true },
            { sectionId: 'coaches', title: 'COACHES', order: 5, isActive: true },
            { sectionId: 'transformations', title: 'TRANSFORMATIONS', order: 6, isActive: true },
            { sectionId: 'membership', title: 'MEMBERSHIP', order: 7, isActive: true },
            { sectionId: 'gallery', title: 'GALLERY', order: 8, isActive: true },
            { sectionId: 'contact', title: 'CONTACT', order: 9, isActive: true },
        ];
        await prisma.pageSection.createMany({
            data: initialSections
        });
        return await (0, exports.getPageSections)();
    }
    return null;
};
exports.seedInitialSections = seedInitialSections;
// Bulk update the entire structure
const bulkUpdateSections = async (sections) => {
    // Use a transaction to ensure all updates succeed or fail together
    const updatePromises = sections.map((section) => prisma.pageSection.update({
        where: { id: section.id },
        data: {
            title: section.title,
            order: section.order,
            isActive: section.isActive
        }
    }));
    await prisma.$transaction(updatePromises);
    return await (0, exports.getPageSections)();
};
exports.bulkUpdateSections = bulkUpdateSections;
