import { factories } from '@strapi/strapi';

// @ts-expect-error - page-home is dynamically registered
export default factories.createCoreController('api::page-home.page-home');
