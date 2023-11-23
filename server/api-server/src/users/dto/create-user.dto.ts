export class CreateUserDto {
  readonly userId: string;
  oauthId: string;
  readonly oauthType: string;
  readonly nickname: string;
}
