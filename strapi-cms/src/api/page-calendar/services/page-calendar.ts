import { factories } from '@strapi/strapi';

// @ts-expect-error - page-calendar is dynamically registered
export default factories.createCoreService('api::page-calendar.page-calendar');
