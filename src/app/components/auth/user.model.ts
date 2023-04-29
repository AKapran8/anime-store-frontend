export interface ILoginUser {
  email: string;
  password: string;
}

export interface ISignUpUser extends ILoginUser {
  name: string;
}
export interface ISignUpResponseData {
  message: string;
}

export interface ILoginResponseData {
  status: string;
  data: {
    token: string;
    expiredAfter: number;
    userName: string;
  };
}
