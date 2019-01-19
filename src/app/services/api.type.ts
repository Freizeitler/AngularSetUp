export type TColumnId = string;
export type TSortType = "asc" | "desc";

export interface ISortModelEntry {
    colId: TColumnId;
    sort: TSortType;
}

export interface IFilterModel {
    _fulltextQuery?: string;
    [key: string]: string;
}

export interface ISearchAndFilterParams {
    filterModel: IFilterModel;
    sortModel: ISortModelEntry[];
}
