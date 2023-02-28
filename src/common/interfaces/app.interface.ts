export interface ResponseFormat<T, M = Record<string, never>> {
  statusCode: number;
  data: T;
  meta?: M;
}
