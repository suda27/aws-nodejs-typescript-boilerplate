import { APIGatewayEvent, Handler, APIGatewayProxyResult } from "aws-lambda";
import { formatErrorJSONResponse } from "../../utils/ResponseUtils";
import logger from "../../utils/logger";
import { HTTP } from "../../constants/http.constants";

import { formatJSONResponse } from "../../utils/ResponseUtils";
import userService from "../../services/user/user.service";
import User from "../../models/userInput.model";

export class createUserApi {
  /*
  This lambda function will return basic details of the User
  */
  static async handler(event: APIGatewayEvent): Promise<APIGatewayProxyResult> {
    return new Promise(async (resolve, reject) => {
      try {
        const userDeatils: User = JSON.parse(event.body);
        logger.info("At the userAPI ", userDeatils);
        const response = await userService.createUser(userDeatils);
        resolve(
          formatJSONResponse(
            response != null ? HTTP.SUCCESS : HTTP.BAD_REQUEST,
            response != null
              ? "User Data Saved Successfully"
              : "User Already Exist in the System",
            response
          )
        );
      } catch (err) {
        reject(formatErrorJSONResponse(HTTP.SYSTEM_ERROR, err.message, err));
      }
    });
  }
}
export const handler = createUserApi.handler;
