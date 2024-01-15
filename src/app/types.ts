export interface state {
    hell: {
        active: boolean
    },
    nearState: boolean,
    selectedApi: "shibe"|"catapi"|"nekoapi",
    selectedColor: string,
    nekoapi: {
        data: string[],
        isLoading: boolean,
        error: string | null,
        loading: boolean,
    },
    login:{
        logged:boolean,
        uid:string,
    }
}