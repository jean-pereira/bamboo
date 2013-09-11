/* * * * * * *
 * bamboo.js *
 * * * * * * *
 * v0.9b * * *
 * * * * * * */

treeWalker = {}

idCollector = [];

objPointer = null;

function getRandomObjectNum(seed)
{
  return Math.round(document.getElementsByTagName('*').length*seed/100);
}

function getRandomObject(seed)
{
  return document.getElementsByTagName('*')[getRandomObjectNum(seed)];
}

function createTreeWalker(filter)
{
  treeWalker = document.createTreeWalker
  (
    document,
    filter,
    {
      acceptNode: function(node)
      {
        return NodeFilter.FILTER_ACCEPT;
      }
    }, false
  )
}

function createElementReference(seed, id)
{
  var targetElement = getRandomObject(seed);

  idCollector.push(id);

  targetElement.id = id;
}

function getCollectedElement(seed)
{
  var targetElement = getElementById(idCollector[Math.round(idCollector.length*seed/100)]);

  return targetElement;
}

function movePointer(action, node, clone, nSeed, pSeed, rSeed, sSeed, iMode)
{

  if(iMode && idCollector.length)
  {
    var shuffleObject = getCollectedElement(nSeed);
  }
  else
  {
    var shuffleObject = getRandomObject(nSeed);
  }

  if(objPointer)
  {
    switch(action)
    {
      case 0:
        for(p in shuffleObject)
        {
          try
          {
            objPointer[p] = shuffleObject[p];
          }
          catch(e) {}
        }
      break;

      case 1:
        for(p in objPointer)
        {
          try
          {
            objPointer[p] = shuffleObject[p];
          }
          catch(e) {}
        }
      break;

      case 2:
        try
        {
          objPointer[getRandomObjectNum(rSeed)] = shuffleObject[getRandomObjectNum(rSeed)];
        }
        catch(e) {}
      break;
    }
  }
  else
  {
    if(treeWalker.currentNode)
    {
      var randomNode = null;

      var phantomNode = getRandomObject(pSeed);

      switch(node)
      {
        case 0:
          randomNode = treeWalker.currentNode;
        break;

        case 1:
          randomNode = treeWalker.previousSibling();
        break;

        case 2:
          randomNode = treeWalker.previousNode();
        break;

        case 3:
          randomNode = phantomNode;
        break;
      }

      if(clone)
      {
        objPointer = randomNode.cloneNode(true);
      }
      else
      {
        objPointer = randomNode;
      }
    }
    else
    {
      createTreeWalker(NodeFilter.SHOW_ALL);
    }
  }
}

function innerHTMLInject(elem, string, action)
{
  switch(action)
  {
    case 0:
      elem.innerHTML = string;
    break;

    case 1:
      elem.textContent = string;
    break;

    case 2:
      elem.innerHTML += string;
    break;

    case 3:
      elem.textContent += string;
    break;

    case 4:
      elem.innerHTML = null;
    break;

    case 5:
      elem.textContent = null;
    break;
  }
}

function heapSpray()
{
  var spray = new Array();
  for (i = 0; i < 0xFE; i++)
  {
    spray[i] = new Uint8Array([0xDE, 0xAD, 0xBE, 0xEF]);
  }
}

function fireEvent(evt, obj)
{
  event = new Event(evt,
  {
    'view': window,
    'bubbles': true,
    'cancelable': false
  });
  obj.dispatchEvent(event);
}