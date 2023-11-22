export class CreateUserDto {
  readonly userId: string;
  oauthId: string;
  readonly oauthType: string;
  readonly nickname: string;

  setUserId(oauthId: string) {
    this.oauthId = oauthId;
  }
}
