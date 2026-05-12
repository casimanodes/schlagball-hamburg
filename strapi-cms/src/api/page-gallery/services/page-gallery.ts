import { factories } from '@strapi/strapi';

// @ts-expect-error - page-gallery is dynamically registered
export default factories.createCoreService('api::page-gallery.page-gallery');
