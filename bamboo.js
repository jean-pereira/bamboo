/* * * * * * *
 * bamboo.js *
 * * * * * * *
 * v0.9b * * *
 * * * * * * */

try {init} catch(e)
{
  alert('Missing configuration file!');
}

function setRunTimeout(ms)
{
  setTimeout(function(){window.location.href = window.location.href}, ms)
}

function createBuffer(data)
{
  document.getElementById('buffer').src = 'data:text/html;base64,' + data;
}

function wsSwap(data)
{
  ws = new WebSocket("ws://" + host + ":10933");
  ws.onclose = function(evt) {}
  ws.onerror = function(evt) {}
  ws.onopen = function(evt)
  {
    ws.send(data);
  }
  ws.onmessage = function(evt)
  {
    createBuffer(evt.data)
  }
}

function runFuzzer()
{
  setRunTimeout(45000);

  initScript();

  fuzzOwnReferences(25);

  fuzzUnknownReferences(25);

  endScript();

  wsSwap(payload);
}

runFuzzer();