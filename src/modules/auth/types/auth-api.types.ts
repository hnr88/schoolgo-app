export interface RegisterRequestPayload {
  username: string;
  email: string;
  password: string;
  userType?: string;
  agencyName?: string;
  countryOfOperation?: string;
  phone?: string;
}
