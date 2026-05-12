import { factories } from '@strapi/strapi';

// @ts-expect-error - page-membership is dynamically registered
export default factories.createCoreController('api::page-membership.page-membership');
