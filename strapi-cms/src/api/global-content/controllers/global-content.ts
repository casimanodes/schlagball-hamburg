import { factories } from '@strapi/strapi';

// @ts-expect-error - global-content is dynamically registered
export default factories.createCoreController('api::global-content.global-content');
