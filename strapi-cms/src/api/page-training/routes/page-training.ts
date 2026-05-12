import { factories } from '@strapi/strapi';

// @ts-expect-error - page-training is dynamically registered
export default factories.createCoreRouter('api::page-training.page-training');
