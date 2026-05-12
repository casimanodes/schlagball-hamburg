import { factories } from '@strapi/strapi';

// @ts-expect-error - page-players is dynamically registered
export default factories.createCoreController('api::page-players.page-players');
