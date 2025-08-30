import { environment } from 'src/environments/environment.development';

export class ApiManifest {
  static readonly USERS_URL = `${environment.apiBaseUrl}/users`;
  static readonly POSTS_URL = `${environment.apiBaseUrl}/posts`;
}
