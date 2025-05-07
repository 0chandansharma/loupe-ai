let navigator;

function setTopLevelNavigator(navigatorRef) {
  navigator = navigatorRef;
}

function navigate(routeName, params) {
  if (navigator) {
    navigator.navigate(routeName, params);
  }
}

function goBack() {
  if (navigator) {
    navigator.goBack();
  }
}

export default {
  navigate,
  goBack,
  setTopLevelNavigator,
};