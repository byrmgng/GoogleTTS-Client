
import { BaseResponse } from "../baseResponse";
import { Token } from "../token/token";

export class LoginUser extends BaseResponse{
    token!:Token;
}