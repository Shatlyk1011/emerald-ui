import type { CollectionConfig } from "payload";

import { ensureFirstUserIsAdmin } from "./hooks/ensureFirstUserIsAdmin";

import { checkRole } from "../../utils/checkRole";
import { admins } from "../../utils/admins";

const AdminUsers: CollectionConfig = {
  access: {
    admin: () => true,
    create: admins,
    delete: admins,
    read: ({ req }) => {
      if (checkRole(["admin", "moderator"], req.user)) {
        return true;
      }
      if (req.user?.isBlocked) {
        return false;
      }

      return false;
    },
    update: admins,
  },

  admin: {
    defaultColumns: ["name", "phone", "roles"],
    useAsTitle: "name",
  },

  auth: {
    depth: 0,
    maxLoginAttempts: 20,
    tokenExpiration: 604800,
  },

  fields: [
    {
      name: "name",
      label: "Name",
      type: "text",
    },
    {
      name: "phone",
      label: "Phone",
      required: false,
      type: "text",
    },

    {
      name: "isBlocked",
      access: {
        read: ({ req }) => checkRole(["admin"], req.user),
        update: ({ req }) => checkRole(["admin"], req.user),
      },
      defaultValue: false,
      label: "Is blocked?",
      required: false,
      type: "checkbox",
    },

    {
      name: "roles",
      defaultValue: "moderator",
      hasMany: true,
      hooks: {
        beforeChange: [ensureFirstUserIsAdmin],
      },
      options: [
        {
          label: "Admin",
          value: "admin",
        },
        {
          label: "Moderator",
          value: "moderator",
        },
        {
          label: "Guest",
          value: "guest",
        },
      ],
      type: "select",
    },
  ],

  slug: "adminUsers",
  timestamps: true,
};

export default AdminUsers;
