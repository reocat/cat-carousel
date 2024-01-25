export interface state {
  hell: {
    active: boolean;
  };
  nearState: boolean;
  selectedApi:
    | "shibe"
    | "catapi"
    | "nekoapi"
    | "dogapi"
    | "placedogapi"
    | "placekittenapi"
    | "placebearapi"
    | "duckapi";
  selectedColor: string;
  otheranimalapi: {
    data: string[];
    isLoading: boolean;
    error: string | null;
    loading: boolean;
  };
  login: {
    logged: boolean;
    uid: string;
  };
}
