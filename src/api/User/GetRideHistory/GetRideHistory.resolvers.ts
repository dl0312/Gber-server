import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import { GetRideHistoryResponse } from "../../../types/graph";
import User from "../../../entities/User";
import Ride from "../../../entities/Ride";
import { getRepository } from "../../../../node_modules/typeorm";

const resolvers: Resolvers = {
  Query: {
    GetRideHistory: privateResolver(
      async (_, __, { req }): Promise<GetRideHistoryResponse> => {
        const user: User = req.user;
        try {
          const history: Ride[] = await getRepository(Ride).find({
            // driverId: user.id,
            passengerId: user.id
          });
          return {
            ok: true,
            error: null,
            history
          };
        } catch (error) {
          return {
            ok: false,
            error: error.message,
            history: null
          };
        }
      }
    )
  }
};
export default resolvers;
