import { factories } from '@strapi/strapi';

// @ts-expect-error - page-membership is dynamically registered
export default factories.createCoreRouter('api::page-membership.page-membership');
