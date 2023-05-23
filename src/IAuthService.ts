export interface IAuthService {
  comparePasswords(data: string, encrypted: string): Promise<Boolean>
}