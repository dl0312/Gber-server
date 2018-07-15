import User from "../../../entities/User";
import {
  ReportMovementMutationArgs,
  ReportMovementResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import cleanNullArgs from "../../../utils/cleanNullArg";

const resolvers: Resolvers = {
  Mutation: {
    ReportMovement: privateResolver(
      async (
        _,
        args: ReportMovementMutationArgs,
        { req, pubSub }
      ): Promise<ReportMovementResponse> => {
        const user: User = req.user;
        console.log(`user: ${user}`);
        const notNull = cleanNullArgs(args);
        try {
          await User.update({ id: user.id }, { ...notNull });
          const updatedUser = await User.findOne({ id: user.id });
          pubSub.publish("driverUpdate", {
            DriversSubscription: updatedUser
          });
          return {
            ok: true,
            error: null
          };
        } catch (error) {
          return {
            ok: false,
            error: error.message
          };
        }
      }
    )
  }
};

export default resolvers;
