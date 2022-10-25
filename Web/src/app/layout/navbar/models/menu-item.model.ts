//#region react imports
//#endregion react imports

//#region application imports
//#endregion application imports

export interface MenuItemModel {
  code?: string;
  displayText?: string;
  url?: string;
  icon?: string;
  isActive?: boolean;
  childNodes?: MenuItemModel[];
  showItem?: string;
  isExapand?: boolean;
}
