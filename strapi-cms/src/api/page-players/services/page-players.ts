import { factories } from '@strapi/strapi';

// @ts-expect-error - page-players is dynamically registered
export default factories.createCoreService('api::page-players.page-players');
