export interface apiBaseResponse<T> {
  data: T;
  loading: boolean;
  error: string;
}
