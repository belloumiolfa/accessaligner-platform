import { MenuItem } from "../Models/menu.model";

const findAllParent = (menuItems: MenuItem[], menuItem: any): any => {
  let parents = [];
  const parent = findMenuItem(menuItems, menuItem["parentKey"]);

  if (parent) {
    parents.push(parent["key"]);
    if (parent["parentKey"])
      parents = [...parents, ...findAllParent(menuItems, parent)];
  }
  return parents;
};

const findMenuItem = (menuItems: MenuItem[], menuItemKey: string): any => {
  if (menuItems && menuItemKey) {
    for (var i = 0; i < menuItems.length; i++) {
      if (menuItems[i].key === menuItemKey) {
        return menuItems[i];
      }
      var found = findMenuItem(menuItems[i].children, menuItemKey);
      if (found) return found;
    }
  }
  return null;
};
// split array for chumk size
const splitArray = (array: any[], chunkSize: number): any[] => {
  const splittedArray: any = Array(Math.ceil(array.length / chunkSize))
    .fill(1)
    .map((_, index) => index * chunkSize)
    .map((begin) => array.slice(begin, begin + chunkSize));

  return splittedArray;
};
const hasSubmenu = (menu: MenuItem): boolean => {
  return menu.children ? true : false;
};
const isTitleItem = (menu: MenuItem): boolean => {
  return menu.isTitle ? true : false;
};
const hasGrandChildren = (menuItem: MenuItem): boolean => {
  let hasGrandChild: MenuItem[] =
    menuItem.children &&
    menuItem.children.filter(
      (child: MenuItem) => child.children?.length && child.children
    );
  return hasGrandChild.length > 0;
};
export {
  hasGrandChildren,
  hasSubmenu,
  isTitleItem,
  splitArray,
  findMenuItem,
  findAllParent,
};
