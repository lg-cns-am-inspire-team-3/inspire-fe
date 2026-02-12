let navigator;

export function setNavigator(nav) {
  navigator = nav;
}

export function navigate(path) {
  if (navigator) navigator(path);
}
