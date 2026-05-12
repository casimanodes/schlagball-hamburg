import { factories } from '@strapi/strapi';

// @ts-expect-error - page-blog is dynamically registered
export default factories.createCoreRouter('api::page-blog.page-blog');
