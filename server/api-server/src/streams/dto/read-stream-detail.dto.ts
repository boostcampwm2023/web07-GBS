export class ReadStreamDetailDto {
  readonly userId: string;
  readonly title: string;
  readonly category: string;
  readonly viewer: number;
  readonly thumbnail: string;

  readonly startedAt: string;
  readonly resolution: string;
  readonly frameRate: number;
  // readonly quality: string;
  readonly desc: string;
}
