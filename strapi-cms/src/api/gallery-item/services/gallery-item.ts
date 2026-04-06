import { factories } from '@strapi/strapi';

// @ts-expect-error - gallery-item is dynamically registered
export default factories.createCoreService('api::gallery-item.gallery-item');
