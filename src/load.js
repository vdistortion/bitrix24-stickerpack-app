['log', 'info', 'warn', 'error'].forEach((method) => {
  console[method] = console[method].bind(console, '%cVueApp', 'background-color: #ffffff;color: #000000;');
});

['./frameCommunicationInit.js', './constants.js'].forEach((path) => {
  const script = document.createElement('script');
  script.src = [path, Math.random()].join('?');
  document.head.append(script);
});
