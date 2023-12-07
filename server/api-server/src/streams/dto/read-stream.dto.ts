export class ReadStreamDto {
  readonly userId: string;
  readonly nickname: string;
  readonly title: string;
  readonly category: string;
  readonly viewer: number;
  readonly thumbnail: { ContentLength: number; thumbnailUrl: string };
}
