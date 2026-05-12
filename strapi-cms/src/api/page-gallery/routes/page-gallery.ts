import { factories } from '@strapi/strapi';

// @ts-expect-error - page-gallery is dynamically registered
export default factories.createCoreRouter('api::page-gallery.page-gallery');
