export class CreateUserDto {
  readonly userId: string;
  readonly oauthId: string;
  readonly oauthType: string;
  readonly nickname: string;
}
