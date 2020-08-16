function onClick() {
  browser.runtime.reload();
}

browser.browserAction.onClicked.addListener(onClick);