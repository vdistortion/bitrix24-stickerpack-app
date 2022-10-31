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
        data = JSON.parse(event.data);
      } catch (err) {}

      if (data.action === 'init') {
        window.frameCommunication.uniqueLoadId = data.uniqueLoadId;
        window.frameCommunication.postMessageSource = event.source;
        window.frameCommunication.postMessageOrigin = event.origin;
      }
    });
  }
}

// функция отправки данных в основное окно
window.frameCommunicationSend = function frameCommunicationSend(data) {
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
