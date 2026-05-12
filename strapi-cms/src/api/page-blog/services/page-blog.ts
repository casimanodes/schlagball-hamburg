import { factories } from '@strapi/strapi';

// @ts-expect-error - page-blog is dynamically registered
export default factories.createCoreService('api::page-blog.page-blog');
