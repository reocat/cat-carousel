export interface state {
  hell: {
    active: boolean;
  };
  nearState: boolean;
  selectedApi:
    | "shibe" // retired api, kept as an alias so persisted redux state still hydrates
    | "catapi"
    | "nekoapi"
    | "dogapi"
    | "placedogapi"
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
