import { factories } from '@strapi/strapi';

// @ts-expect-error - page-imprint is dynamically registered
export default factories.createCoreController('api::page-imprint.page-imprint');
