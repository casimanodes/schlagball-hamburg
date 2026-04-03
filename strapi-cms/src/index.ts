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
      'api::player-profile.player-profile.find',
      'api::player-profile.player-profile.findOne',
      'api::training-post.training-post.find',
      'api::training-post.training-post.findOne',
      'api::training-event.training-event.find',
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
