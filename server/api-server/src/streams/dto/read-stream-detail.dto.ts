export class ReadStreamDetailDto {
  readonly userId: string;
  readonly nickname: string;
  readonly title: string;
  readonly category: string;
  readonly viewer: number;
  readonly thumbnail: {ContentLength: number, thumbnailUrl: string};

  readonly startedAt: string;
  readonly resolution: string;
  readonly frameRate: number;
  // readonly quality: string;
  readonly desc: string;
}
