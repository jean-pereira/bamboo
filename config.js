/* * * * * * *
 * bamboo.js *
 * * * * * * *
 * v0.9b * * *
 * * * * * * */

targetElements = ['article', 'asise', 'b', 'bdi', 'bdo', 'blockquote', 'br', 'button',
                  'canvas', 'caption', 'cite', 'col', 'code', 'command', 'datalist',
                  'dd', 'del', 'details', 'dfn', 'dl', 'dt', 'em', 'style', 'fieldset',
                  'figcaption', 'script', 'embed', 'figure', 'footer', 'header', 'hgroup',
                  'hr', 'i', 'input', 'ins', 'keygen', 'kbd', 'legend', 'mark', 'menu',
                  'meter', 'nav', 'noscript', 'optgroup', 'output', 'p', 'param', 'pre',
                  'progress', 'q', 'rp', 'rt', 'ruby', 's', 'samp', 'section', 'select',
                  'small', 'source', 'span', 'sup', 'th', 'thead', 'time', 'object', 'iframe',
                  'textarea', 'track', 'u', 'var', 'wbr', 'form', 'a', 'body', 'html', 'div',
                  'table', 'area', 'td', 'tr', 'link', 'base', 'font', 'head', 'img', 'map',
                  'meta', 'ol', 'li', 'tbody', 'title', 'h1', 'blink', 'area', 'col', 'span',
                  'frameset', 'frame', 'ul', 'option', 'noframes', 'tfoot', 'xmp', 'isindex',
                  'center', 'hr', 'label', 'optgroup', 'audio', 'video', 'svg'];

targetStrings = ['"!PALM"', '0.2' , '"normal"', '"inherit"', '"ellipsis"', '"static"', '"url(#defaul#tVML)"', '"url(-37546)"',
                 '"url(#defaul#tVML)"', '"clip"', '"auto"', '"georgian"', '6/247', '"break-word"', '"no-open-quote"',
                 '"intrinsic"', 'counter(8)', '"relative"', '"absolute"', '"771541073px"', '2.0', '"8em"', '"36%"',
                 '"decimal-leading-zero"', '+418/7311403', '"marquee"', '"collapse"', '"avoid"', '9', '37369910^5',
                 '"@@@@@@@@"', '"attr(y)"', '"-9.1861px"', '"23deg"', '"220000000cm -1000cm 4cm -1000cm"', '2323323',
                 '"≈≈≈≈≈"', '0.7312', '"()"', '338462726377734920384651823', '"file://C:/"', '777777777777777777777', 'void(none)',
                 '"overlay"', '"none"', '"93764%"', '"inside"', '"-77777px"', '"left"', '"capitalize"', '"baseline"', '"overflow:hidden"',
                 '-7e6', '8e-6', '2e100', '"pink"', 'false', 'true', '7500000000', '4400000000', '-4400000000', '-7500000000',
                 '"#PPPPPPP"', '0xB1F8A3', '"background-color: orange"', '"border: 8px solid yellow"',
                 'NaN', '"thick"', '"DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD"', '"direction:rtl"',
                 '"accesskey"', '"class"', '"contenteditable"', '"contextmenu"', '"dir"', '"draggable"', '"dropzone"', '"id"',
                 '"lang"', '"spellcheck"', '"style"', '"tabindex"', '"title"', '"translate"', '"xml:lang"', '"xml:space"',
                 '"xml:base"', '"align"', '"background"', '"bgcolor"', '"data-x"', '"height"', '"item"', '"itemprop"', '"subject"',
                 '"valign"', '"width"', '"#ffffffffffff"', '"%%%%%%%%%%%%%%%%"', '/1.(11)111/', '0.999999999', '"¶¶¶¶¶¶¶¶¶¶¶"',
                 'document.documentElement.clientWidth', 'window.innerWidth', 'screen.availWidth', 'screen.availHeight',
                 'document.body.firstChild', 'window.moveTo(300, 300)', 'Blob', '9.1111', '0', '1', '5e6',
                 'treeWalker.currentNode', 'treeWalker.previousSibling()', 'treeWalker.previousNode()', '"<b>asd</b>"', '"<h1><span>asd"',
                 '"page-break-after:always"', '"text-ident:44304355px"', '"widows:-5"', '"empty-cells:inherit"', '"line-height:-1000px"',
                 '"overflow-x:visible"', '"layout-grid-char:auto"', '"clear:left"', '"white-space:pre-wrap"', '"list-style-position:outside"',
                 '"unicode-bidi:bidi-override"', '"direction:+9"', '"text-overflow:clip"', '"behavior:url(#defaul#tVML)"', '"quotes:inherit"',
                 '"overflow-x:scroll"', '"z-index:12312312312321"', '"zoom:normal"', '"list-style-position:inside"', '"float:right"', 
                 '"overflow:marquee"', '"clear:both"', '"border-collapse:collapse"', '"text-shadow:blue184"', '"border:3em solid orange"',
                 '"border-bottom:3px dotted #beb"', '"size:31.0cm 9.82222225cm"', '"spacing-top:800%"',
                 '"text-decoration:underline"', '"min-width:intrinsic"', '"counter(c)"', '"content:ᄑ"', '"center-x:3"',
                 '"clip:rect(+88/609px,-1000px,-1000px,7311/894579118px,8px)"',  '"border-spacing:220000000cm"', '"speak-number:continuous"',
                 'window.CDATASection', 'window.CSSFontFaceRule', '-999999999999999', '"color: magenta"', '"outline:10px double #BBF3F1"',
                 '"border-color:yellow"', '"border-bottom:10px dashed orange"', '"background:red"', '"999999999999999999999999999999999999"',
                 'window.CSSMediaRule', 'window.CanvasPattern', 'window.CanvasRenderingContext2D', 'window.CanvasGradient',
                 'window.CharacterData', 'window.Counter', 'window.DOMTokenList', 'window.DOMParser', 'window.EntityReference'];

targetFilter = ['SHOW_ALL', 'SHOW_ELEMENT', 'SHOW_ATTRIBUTE', 'SHOW_TEXT'];

/*
                'SHOW_CDATA_SECTION',
                'SHOW_ENTITY_REFERENCE', 'SHOW_ENTITY', 'SHOW_PROCESSING_INSTRUCTION', 'SHOW_COMMENT',
                'SHOW_DOCUMENT', 'SHOW_DOCUMENT_TYPE', 'SHOW_DOCUMENT_FRAGMENT', 'SHOW_NOTATION'
*/

targetEvents = ['abort', 'afterprint', 'animationend', 'animationiteration', 'animationstart', 'audioprocess',
                'beforeprint', 'beforeunload', 'beginEvent', 'blocked', 'blur', 'cached', 'canplay', 'canplaythrough',
                'change', 'chargingchange', 'chargingtimechange', 'checking', 'click', 'close', 'compassneedscalibration',
                'complete', 'compositionend', 'compositionstart', 'compositionupdate', 'contextmenu', 'copy', 'cut',
                'dblclick', 'devicelight', 'devicemotion', 'deviceorientation', 'deviceproximity', 'dischargingtimechange',
                'DOMContentLoaded', 'focusin', 'focusout', 'downloading', 'drag', 'dragend', 'dragenter', 'dragleave',
                'dragover', 'dragstart', 'drop', 'durationchange', 'emptied', 'ended', 'endEvent', 'error', 'focus',
                'fullscreenchange', 'fullscreenerror', 'gamepadconnected', 'gamepaddisconnected', 'hashchange', 'input',
                'invalid', 'keydown', 'keypress', 'keyup', 'levelchange', 'load', 'loadeddata', 'loadedmetadata', 'loadend',
                'loadstart', 'message', 'mousedown', 'mouseenter', 'mouseleave', 'mousemove', 'mouseout', 'mouseover', 'mouseup',
                'noupdate', 'offline', 'online', 'open', 'orientationchange', 'pagehide', 'pageshow', 'paste',
                'pause', 'pointerlockchange', 'pointerlockerror', 'play', 'playing', 'popstate', 'progress', 'ratechange',
                'readystatechange', 'repeatEvent', 'reset', 'resize', 'scroll', 'seeked', 'seeking', 'select', 'show', 'stalled',
                'storage', 'submit', 'success', 'suspend', 'SVGAbort', 'SVGError', 'SVGLoad', 'SVGResize', 'SVGScroll', 'SVGUnload',
                'SVGZoom', 'timeout', 'timeupdate', 'touchcancel', 'touchend', 'touchenter', 'touchleave', 'touchmove', 'touchstart',
                'transitionend', 'unload', 'updateready', 'upgradeneeded', 'userproximity', 'versionchange', 'visibilitychange',
                'volumechange', 'waiting', 'wheel'];
/*
                'DOMSubtreeModified', 'DOMAttrModified', 'DOMActivate', 'DOMCharacterDataModified',
                'DOMNodeInserted', 'DOMNodeInsertedIntoDocument', 'DOMNodeRemoved', 'DOMNodeRemovedFromDocument'
*/

host = '127.0.0.1';

init = {}

