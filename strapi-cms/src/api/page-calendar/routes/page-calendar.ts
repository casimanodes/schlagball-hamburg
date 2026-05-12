import { factories } from '@strapi/strapi';

// @ts-expect-error - page-calendar is dynamically registered
export default factories.createCoreRouter('api::page-calendar.page-calendar');
