export const apisApp = {
  baseBackend: import.meta.env.VITE_APP_BASE
    ? import.meta.env.VITE_APP_BASE_BACK_DEV
    : import.meta.env.VITE_APP_BASE_BACK_PRO,
};
