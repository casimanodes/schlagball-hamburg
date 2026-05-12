import { factories } from '@strapi/strapi';

// @ts-expect-error - page-privacy is dynamically registered
export default factories.createCoreRouter('api::page-privacy.page-privacy');
