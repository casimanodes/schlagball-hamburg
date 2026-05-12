import type { Core } from '@strapi/strapi';

export default {
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    // Auto-configure public API permissions on first run
    const publicRole = await strapi.db.query('plugin::users-permissions.role').findOne({
      where: { type: 'public' },
    });

    if (!publicRole) return;

    const permissions = await strapi.db.query('plugin::users-permissions.permission').findMany({
      where: { role: publicRole.id },
    });

    const existingActions = new Set(permissions.map((p: any) => p.action));

    const requiredPermissions = [
      // Collection types
      'api::player-profile.player-profile.find',
      'api::player-profile.player-profile.findOne',
      'api::training-post.training-post.find',
      'api::training-post.training-post.findOne',
      'api::training-event.training-event.find',
      'api::gallery-item.gallery-item.find',
      'api::gallery-item.gallery-item.findOne',
      // Single types (page contents)
      'api::page-home.page-home.find',
      'api::page-about.page-about.find',
      'api::page-sport.page-sport.find',
      'api::page-training.page-training.find',
      'api::page-membership.page-membership.find',
      'api::page-gallery.page-gallery.find',
      'api::page-players.page-players.find',
      'api::page-blog.page-blog.find',
      'api::page-calendar.page-calendar.find',
      'api::page-imprint.page-imprint.find',
      'api::page-privacy.page-privacy.find',
      'api::global-content.global-content.find',
    ];

    for (const action of requiredPermissions) {
      if (!existingActions.has(action)) {
        await strapi.db.query('plugin::users-permissions.permission').create({
          data: {
            action,
            role: publicRole.id,
          },
        });
        strapi.log.info(`[bootstrap] Granted public permission: ${action}`);
      }
    }
  },
};
