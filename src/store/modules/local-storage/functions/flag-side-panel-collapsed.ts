import { LOCAL_STORAGE_FLAG_SIDE_PANEL_COLLAPSED } from '@constants/app-constants';
import { LocalStorage } from '@utilsFn/local-storage';

export const GetLocaleStorageFlagSidePanelCollapsed = () => {
  const locale = LocalStorage()?.getItem(
    LOCAL_STORAGE_FLAG_SIDE_PANEL_COLLAPSED
  );
  return locale === 'true';
};

export const SetLocaleStorageFlagSidePanelCollapsed = (
  value: 'true' | 'false'
) => {
  LocalStorage()?.setItem(LOCAL_STORAGE_FLAG_SIDE_PANEL_COLLAPSED, value);
  return value;
};

export const RemoveLocaleStorageFlagSidePanelCollapsed = () => {
  LocalStorage()?.removeItem(LOCAL_STORAGE_FLAG_SIDE_PANEL_COLLAPSED);
};
