import { UserManager, User } from 'oidc-client-ts';

const settings: any = {
  authority: import.meta.env.VITE_IDENTITY_SERVER_BASE_URL,
  client_id: import.meta.env.VITE_CLIENT_ID,
  scope: import.meta.env.VITE_SILENT_REDIRECT_UR.VITE_IDENTITY_SERVER_SCOPES,
  redirect_uri: import.meta.env.VITE_REDIRECT_URL,
  post_logout_redirect_uri: import.meta.env.VITE_POST_LOGOUT_REDIRECT_URL,
  silent_redirect_uri: import.meta.env.VITE_SILENT_REDIRECT_UR,
  response_type: 'code',
  loadUserInfo: true,
  automaticSilentRenew: true,
};

class AuthService {
  userManager: UserManager;

  constructor() {
    this.userManager = new UserManager(settings);
  }

  public getUser(): Promise<User | null> {
    return this.userManager.getUser();
  }

  public login(): Promise<void> {
    return this.userManager.signinRedirect();
  }

  public renewToken(): Promise<User | null> {
    return this.userManager.signinSilent();
  }

  public logout(): Promise<void> {
    return this.userManager.signoutRedirect();
  }
}

export default new AuthService();
