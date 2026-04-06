import { factories } from '@strapi/strapi';

// @ts-expect-error - gallery-item is dynamically registered
export default factories.createCoreRouter('api::gallery-item.gallery-item');
