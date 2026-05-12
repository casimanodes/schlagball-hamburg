import { factories } from '@strapi/strapi';

// @ts-expect-error - page-training is dynamically registered
export default factories.createCoreController('api::page-training.page-training');
