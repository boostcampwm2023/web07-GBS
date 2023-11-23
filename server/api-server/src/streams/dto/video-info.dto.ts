export class VideoInfoDto {
  readonly streamKey: string;
  readonly viewer: number;
  readonly startedAt: string;
  readonly resolution: string;
  readonly frameRate: number;
  readonly thumbnail: string;
}
