import { factories } from '@strapi/strapi';

// @ts-expect-error - page-players is dynamically registered
export default factories.createCoreRouter('api::page-players.page-players');
