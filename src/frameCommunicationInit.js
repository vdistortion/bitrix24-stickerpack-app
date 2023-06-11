function frameCommunicationInit() {
  if (!window.frameCommunication) {
    window.frameCommunication = {
      timeout: {},
    };
  }

  if (typeof window.postMessage === 'function') {
    window.addEventListener('message', (event) => {
      let data = {};

      try {
        const index = event.data.indexOf('{');
        data = JSON.parse(event.data.slice(index));
      } catch (error) {
        window.console.warn(error.message);
      }

      if (data.action === 'init') {
        window.frameCommunication.uniqueLoadId = data.uniqueLoadId;
        window.frameCommunication.postMessageSource = event.source;
        window.frameCommunication.postMessageOrigin = event.origin;
      }
    });
  }
}

// функция отправки данных в основное окно
// eslint-disable-next-line consistent-return
window.frameCommunicationSend = function frameCommunicationSend(data) {
  // eslint-disable-next-line no-param-reassign
  data.uniqueLoadId = window.frameCommunication.uniqueLoadId;
  const encodedData = JSON.stringify(data);

  if (!window.frameCommunication.postMessageOrigin) {
    clearTimeout(window.frameCommunication.timeout[encodedData]);
    window.frameCommunication.timeout[encodedData] = setTimeout(() => {
      frameCommunicationSend(data);
    }, 10);
    return true;
  }

  if (typeof window.postMessage === 'function') {
    if (window.frameCommunication.postMessageSource) {
      window.frameCommunication.postMessageSource.postMessage(
        encodedData,
        window.frameCommunication.postMessageOrigin,
      );
    }
  }
};

frameCommunicationInit();
