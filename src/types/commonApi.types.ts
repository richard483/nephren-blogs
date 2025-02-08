export interface ApiBaseResponse<T> {
  data: T;
  loading: boolean;
  error: string;
}
