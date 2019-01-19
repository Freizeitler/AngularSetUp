export class Login {
  email?: string;
  isLoggedIn: boolean;
  token?: string;
}

// Response Code 200
export interface LoginSuccessful {
    token:	string;
}

// Response Code 400
const enum Reason400 {
    FORMAT = "format",
    VALIDATION = "validation",
    WHITELABEL = "whitelabel",
}

export interface BadRequest {
    reason:	Reason400;
    error_fields: Array<string>;
}

// Response Code 401
const enum Reason401 {
   CREATED_WITHOUT_CONTRACT = "created-without-contract",
   DEACTIVATED = "deactivated",
   INVALID_CREDENTIALS = "invalid-credentials",
   LOCKED = "locked",
   NO_CONTRACTS = "no-contracts",
   PW_RESET = "pw-reset",
   VERIFY = "verify",
}

export interface LoginFailed {
    reason: Reason401;
}
