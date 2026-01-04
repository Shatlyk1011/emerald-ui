import type { Access } from "payload";

import { checkRole } from "./checkRole";

const adminsAndModerator: Access = ({ req: { user } }) => {
  if (user) {
    if (checkRole(["admin", "moderator"], user)) {
      return true;
    }
  }

  return false;
};

export default adminsAndModerator;
