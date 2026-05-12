import { factories } from '@strapi/strapi';

// @ts-expect-error - page-sport is dynamically registered
export default factories.createCoreService('api::page-sport.page-sport');
