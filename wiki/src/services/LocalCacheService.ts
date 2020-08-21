export enum CacheKeys {
  NavNodesCollapsedState = 'nav-nodes-collapsed-state'
}

export const getNavNodeCollapsedState = (nodeName: string): boolean | null =>
  getCacheValue(CacheKeys.NavNodesCollapsedState, nodeName);

export const cacheNavNodeCollapsedState = (nodeName: string, isCollapsed: boolean): void =>
  setCacheValue(CacheKeys.NavNodesCollapsedState, nodeName, isCollapsed);

export const getCacheValue = (cacheKey: string, valueKey: string): any | null => {
  const cacheObjString = localStorage.getItem(cacheKey);
  const cacheObj: { [index: string]: any } = cacheObjString ? JSON.parse(cacheObjString) : {};
  const result = cacheObj[`"${valueKey}"`];

  return result === undefined ? null : result;
}

export const setCacheValue = (cacheKey: string, valueKey: string, value: any): void => {
  const cacheObjString = localStorage.getItem(cacheKey);
  let cacheObj: { [index: string]: any } = cacheObjString
    ? JSON.parse(cacheObjString)
    : {};

  cacheObj[`"${valueKey}"`] = value;

  localStorage.setItem(cacheKey, JSON.stringify(cacheObj));
}