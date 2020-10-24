import { IDynamicListFilterDTO } from "./DynamicFilter";
import { ISystemUser } from "./User";

export interface IItemCategory {
  id: number,
  name: string,

  parentCategoryId?: number,
  description?: string,
  userId: number,

  costAccountId?: number,
  sellAccountId?: number,
  inventoryAccountId?: number,

  costMethod?: string,
};

export interface IItemCategoryOTD {
  name: string,

  parentCategoryId?: number,
  description?: string,
  userId: number,

  costAccountId?: number,
  sellAccountId?: number,
  inventoryAccountId?: number,

  costMethod?: string,
};

export interface IItemCategoriesFilter extends IDynamicListFilterDTO { 
  stringifiedFilterRoles?: string,
}

export interface IItemCategoriesService {
  newItemCategory(tenantId: number, itemCategoryOTD: IItemCategoryOTD, authorizedUser: ISystemUser): Promise<IItemCategory>;
  editItemCategory(tenantId: number, itemCategoryId: number, itemCategoryOTD: IItemCategoryOTD, authorizedUser: ISystemUser): Promise<IItemCategory>;

  deleteItemCategory(tenantId: number, itemCategoryId: number, authorizedUser: ISystemUser): Promise<void>;
  deleteItemCategories(tenantId: number, itemCategoriesIds: number[], authorizedUser: ISystemUser): Promise<void>;

  getItemCategory(tenantId: number, itemCategoryId: number, authorizedUser: ISystemUser): Promise<void>;
  getItemCategoriesList(tenantId: number, itemCategoriesFilter: IItemCategoriesFilter, authorizedUser: ISystemUser): Promise<void>;
}