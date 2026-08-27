"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GalleryService = void 0;
const prisma_1 = __importDefault(require("../../config/prisma"));
class GalleryService {
    static async createGallery(data) {
        return await prisma_1.default.gallery.create({ data });
    }
    static async getAllGallery(type) {
        const whereClause = { deletedAt: null };
        if (type) {
            whereClause.type = type;
        }
        return await prisma_1.default.gallery.findMany({
            where: whereClause,
            orderBy: { displayOrder: 'asc' }
        });
    }
    static async getPreviewGallery() {
        const featuredItems = await prisma_1.default.gallery.findMany({
            where: { deletedAt: null, status: 'ACTIVE', isFeatured: true },
            orderBy: { createdAt: 'desc' },
            take: 5
        });
        if (featuredItems.length < 5) {
            const remainingCount = 5 - featuredItems.length;
            const latestItems = await prisma_1.default.gallery.findMany({
                where: { deletedAt: null, status: 'ACTIVE', isFeatured: false },
                orderBy: { createdAt: 'desc' },
                take: remainingCount
            });
            return [...featuredItems, ...latestItems];
        }
        return featuredItems;
    }
    static async getGalleryById(id) {
        const item = await prisma_1.default.gallery.findFirst({
            where: { id, deletedAt: null }
        });
        if (!item) {
            throw new Error('Gallery item not found');
        }
        return item;
    }
    static async updateGallery(id, data) {
        await this.getGalleryById(id); // Check existence
        return await prisma_1.default.gallery.update({
            where: { id },
            data
        });
    }
    static async deleteGallery(id) {
        await this.getGalleryById(id);
        return await prisma_1.default.gallery.update({
            where: { id },
            data: { deletedAt: new Date(), status: 'INACTIVE' }
        });
    }
    static async bulkDeleteGallery(ids) {
        return await prisma_1.default.gallery.updateMany({
            where: { id: { in: ids }, deletedAt: null },
            data: { deletedAt: new Date(), status: 'INACTIVE' }
        });
    }
}
exports.GalleryService = GalleryService;
