export class PageDto<T> {
  readonly data: T[];
  readonly pageInfo: {
    page: number;
    size: number;
    totalPage: number;
  };
}
