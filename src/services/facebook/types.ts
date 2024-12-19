export interface FacebookAuthResponse {
  accessToken: string;
  userID: string;
  expiresIn: number;
  signedRequest: string;
  graphDomain: string;
  data_access_expiration_time: number;
}

export interface FacebookUserData {
  id: string;
  name: string;
  email?: string;
  picture?: {
    data: {
      url: string;
      width: number;
      height: number;
    }
  };
  friends?: {
    data: Array<{
      id: string;
      name: string;
    }>;
    summary: {
      total_count: number;
    };
  };
}