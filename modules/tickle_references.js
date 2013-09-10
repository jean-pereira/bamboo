function r(int)
{
  return Math.floor(Math.random()*int);
}

function tickleDOM()
{
  switch(r(3))
  {
    case 0:
      payload += 'try{createTreeWalker(NodeFilter.' + targetFilter[r(targetFilter.length)] + ')}catch(e){}\n';
    break;

    case 1:
      if(r(20)<5)
      {
        payload += 'try{innerHTMLInject(document.getElementsByTagName("*")[getRandomObject(' + r(97) + ')], ' + targetStrings[r(targetStrings.length)] + ', ' + r(6) + ')}catch(e){}\n'; 
      }
      else
      {
        payload += 'try{fireEvent("' + targetEvents[r(targetEvents.length)] + '", document.getElementsByTagName("*")[getRandomObject(' + r(97) + ')])}catch(e){}\n';
      }
    break;

    case 2:
      payload += 'try{movePointer(' + r(3) + ',' + r(4) + ',' + r(2) + ',' + r(97) + ',' + r(97) + ',' + r(97) + ',' + r(97) + ')}catch(e){}\n';
    break;
  }
}

function fuzzOwnReferences(count)
{

  elem1 = 'var e_1 = document.createElement("' + targetElements[r(targetElements.length)] + '")';
  elem2 = 'var e_2 = document.createElement("' + targetElements[r(targetElements.length)] + '")';

  payload += elem1 + ';\n';
  payload += elem2 + ';\n';

  eval(elem1);
  eval(elem2);

  if(r(2)>0)
  {
    payload += 'document.getElementsByTagName("*")[getRandomObject(' + r(97) + ')].appendChild(e_1);\n';
  }
  else
  {
    payload += 'document.body.appendChild(e_1);\n';
  }

  if(r(2)>0)
  {
    payload += 'document.getElementsByTagName("*")[getRandomObject(' + r(97) + ')].appendChild(e_2);\n';
  }
  else
  {
    payload += 'document.body.appendChild(e_2);\n';
  }

  for(i = 0; i < count; i++)
  {
    firstObjTargets = [];
    secondObjTargets = [];

    nextAction = [];

    blacklist = /^on|owner|parent|child|sibling/i;

    try
    {
      for(p in e_1)
      {
        if(!p.match(blacklist))
        {
          firstObjTargets.push('e_1.' + p);
          for(sp in eval('e_1.' + p))
          {
            if(!sp.match(/^\d/))
            {
              firstObjTargets.push('e_1.' + p + '.' + sp);
            }
          }
        }
      }
    } catch (e) {tickleDOM()} 

    try
    {
      for(p in e_2)
      {
        if(!p.match(blacklist))
        {
          secondObjTargets.push('e_2.' + p);
          for(sp in eval('e_2.' + p))
          {
            if(!sp.match(/^\d/))
            {
              secondObjTargets.push('e_2.' + p + '.' + sp);
              secondObjTargets.push('document.getElementsByTagName("*")[getRandomObject(' + r(97) + ')].' + p + '.' + sp);
            }
          }
        }
      }
    } catch(e) {tickleDOM()}

    nextAction.push(firstObjTargets[r(firstObjTargets.length)]);

    nextAction.push(secondObjTargets[r(secondObjTargets.length)]);

    nextAction.push(secondObjTargets[r(secondObjTargets.length)]);

    el = (r(6)<1);

    if(el)
    {
      payload += 'try{'

      if(r(12)<3)
      {
        payload += ['document.getElementsByTagName("*")[getRandomObject(' + r(97) + ')]', 'treeWalker.currentNode', 'treeWalker.previousNode()', 'treeWalker.previousSibling()'][r(4)];
      }
      else
      {
        payload += 'e_' + (r(2) + 1)
      }

      payload += '.addEventListener("' + targetEvents[r(targetEvents.length)] + '", function(){' + nextAction[0];
    }

    else
    {
      payload += 'try{' + nextAction[0];
    }

    switch(r(14))
    {
      case 0:
        payload += '()';
      break;

      case 1:
        payload += '[' + ((r(2)>0) ? targetStrings[r(targetStrings.length)] : nextAction[r(3)]) + ']';
      break;

      case 2:
        payload += '(' + ((r(2)>0) ? targetStrings[r(targetStrings.length)] : nextAction[r(3)]) + ')';
      break;

      case 3:
        payload += '(' + ((r(2)>0) ? 'true' : 'false') + ')';
      break;
      
      case 4:
        payload += '=' + nextAction[r(3)];
      break;
      
      case 5:
        payload += '=null';
      break;

      case 6:
        payload += '={}';
      break;

      case 7:
        contentString = ((r(2)>0) ? nextAction[r(2)] : ((r(2)>0) ? targetStrings[r(targetStrings.length)] : ''));
        if(typeof(contentString) != "number")
        {
          payload += '=new Object(' + contentString + ')';
        }
      break;

      case 8:
        payload += '=new String(' + ((r(2)>0) ? nextAction[r(3)] : ((r(2)>0) ? targetStrings[r(targetStrings.length)] : '')) + ')';
      break;

      case 9:
        payload += '=new Object(' + ((r(2)>0) ? nextAction[r(3)] : ((r(2)>0) ? targetStrings[r(targetStrings.length)] : '')) + ')';
      break;

      case 10:
        payload += '=' + targetStrings[r(targetStrings.length)] + '';
      break;
      
      case 11:
        payload += '=' + nextAction[r(3)] + '(' + nextAction[r(3)] + ')';
      break;

      case 12:
        payload += '=' + nextAction[r(3)] + '(' + nextAction[r(3)] + '())';
      break;
    }

    if(el)
    {
      payload += '}, false)'
    }

    payload += '}catch(e){}\n'
    tickleDOM();
  }
}


function fuzzUnknownReferences(count)
{

  elem3 = 'var e_3 = document.createElement("' + targetElements[r(targetElements.length)] + '")';

  removed = 0;

  max_remove = 10;

  eval(elem3);

  payload +=  'try{' + elem3 + '}catch(e){}\n';

  for(i = 0; i < count; i++)
  {
    firstObjTargets = [];
    secondObjTargets = [];

    nextAction = [];

    blacklist = /^on|owner|parent|child|sibling/i;

    try
    {
      for(p in e_3)
      {
        if(!p.match(blacklist))
        {
          firstObjTargets.push('e_3.' + p);
          for(sp in eval('e_3.' + p))
          {
            if(!sp.match(/^\d/))
            {
              firstObjTargets.push('document.getElementsByTagName("*")[getRandomObject(' + r(97) + ')].' + p + '.' + sp);
            }
          }
        }
      }
    }
    catch(e) {tickleDOM()}

    try
    {
      for(p in e_3)
      {
        if(!p.match(blacklist))
        {
          secondObjTargets.push('e_3.' + p);
          for(sp in eval('e_3.' + p))
          {
            if(!sp.match(/^\d/))
            {
              secondObjTargets.push('document.getElementsByTagName("*")[getRandomObject(' + r(97) + ')].' + p + '.' + sp);
            }
          }
        }
      }
    }
    catch(e) {tickleDOM()}

    nextAction.push(firstObjTargets[r(firstObjTargets.length)]);

    nextAction.push(secondObjTargets[r(secondObjTargets.length)]);

    el = (r(10)>3);

    payload += 'try{';

    switch(r(14))
    {
      case 0:
        payload += nextAction[0] + '()}catch(e){}';
      break;

      case 1:
        payload += nextAction[0] + '[' + targetStrings[r(targetStrings.length)] + ']}catch(e){}';
      break;

      case 2:
        payload += nextAction[0] + '(' + targetStrings[r(targetStrings.length)] + ')}catch(e){}';
      break;

      case 3:
        payload += nextAction[0] + '(' + ((r(2)>0)?'true':'false') + ')}catch(e){}';
      break;
      
      case 4:
        payload += nextAction[0] + '=' + nextAction[1] + '}catch(e){}';
      break;
      
      case 5:
        payload += nextAction[0] + '=null}catch(e){}';
      break;

      case 6:
        payload += nextAction[0] + '={}}catch(e){}';
      break;

      case 7:
        contentString = ((r(2)>0) ? nextAction[r(2)] : ((r(2)>0) ? targetStrings[r(targetStrings.length)] : ''));
        if(typeof(contentString) != "number")
        {
          payload += nextAction[0] + '=new Array(' + contentString + ')}catch(e){}';
        }
      break;

      case 8:
        payload += nextAction[0] + '=new String(' + ((r(2)>0) ? nextAction[r(2)] : ((r(2)>0) ? targetStrings[r(targetStrings.length)] : '')) + ')}catch(e){}';
      break;

      case 9:
        payload += nextAction[0] + '=new Object(' + ((r(2)>0) ? nextAction[r(2)] : ((r(2)>0) ? targetStrings[r(targetStrings.length)] : '')) + ')}catch(e){}';
      break;

      case 10:
        payload += nextAction[0] + '=' + targetStrings[r(targetStrings.length)] + '}catch(e){}';
      break;
      
      case 11:
        payload += nextAction[0] + '=' + nextAction[(r(2)+1)] + '(' + nextAction[(r(2)+1)] + ')}catch(e){}';
      break;

      case 12:
        payload += nextAction[0] + '=' + nextAction[(r(2)+1)] + '(' + nextAction[(r(2)+1)] + '())}catch(e){}';
      break;

      case 13:
        if(max_remove)
        {
          if(!removed)
          {
            payload += 'document.body.removeChild(document.getElementsByTagName("*")[getRandomObject(' + r(97) + ')])}catch(e){}';
            removed = 1;
            max_remove--;
          }
          else
          {
            if(r(2)>0)
            {
              payload += 'var x = document.createElement("' + targetElements[r(targetElements.length)] + '");\n'
            }
            else
            {
              payload += 'var x = document.getElementsByTagName("*")[getRandomObject(' + r(97) + ')].cloneNode(true);\n'
            }
            if(r(2)>0)
            {
              payload += 'document.body.appendChild(x)}catch(e){}';
            }
            else
            {
              payload += 'document.getElementsByTagName("*")[getRandomObject(' + r(97) + ')].appendChild(x)}catch(e){}';
            }
            removed = 0;
          }
        }
      break;
    }

    payload += '\n';
    tickleDOM();
  }
}

function initScript()
{
  payload = 'heapSpray();\ntry{createTreeWalker(NodeFilter.SHOW_ALL)}catch(e){alert(e)}\n';
}

function endScript()
{
  payload += 'top.window.location.href="http://localhost/bamboo/bamboo.htm"\n';
}