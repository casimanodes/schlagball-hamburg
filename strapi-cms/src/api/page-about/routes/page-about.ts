import { factories } from '@strapi/strapi';

// @ts-expect-error - page-about is dynamically registered
export default factories.createCoreRouter('api::page-about.page-about');
