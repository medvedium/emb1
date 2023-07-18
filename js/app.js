(() => {
    "use strict";
    var __webpack_require__ = {};
    (() => {
        __webpack_require__.d = (exports, definition) => {
            for (var key in definition) if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) Object.defineProperty(exports, key, {
                enumerable: true,
                get: definition[key]
            });
        };
    })();
    (() => {
        __webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);
    })();
    (() => {
        __webpack_require__.r = exports => {
            if (typeof Symbol !== "undefined" && Symbol.toStringTag) Object.defineProperty(exports, Symbol.toStringTag, {
                value: "Module"
            });
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
        };
    })();
    var lib_namespaceObject = {};
    __webpack_require__.r(lib_namespaceObject);
    __webpack_require__.d(lib_namespaceObject, {
        afterMain: () => afterMain,
        afterRead: () => afterRead,
        afterWrite: () => afterWrite,
        applyStyles: () => modifiers_applyStyles,
        arrow: () => modifiers_arrow,
        auto: () => auto,
        basePlacements: () => basePlacements,
        beforeMain: () => beforeMain,
        beforeRead: () => beforeRead,
        beforeWrite: () => beforeWrite,
        bottom: () => bottom,
        clippingParents: () => clippingParents,
        computeStyles: () => modifiers_computeStyles,
        createPopper: () => popper_createPopper,
        createPopperBase: () => createPopper,
        createPopperLite: () => popper_lite_createPopper,
        detectOverflow: () => detectOverflow,
        end: () => end,
        eventListeners: () => eventListeners,
        flip: () => modifiers_flip,
        hide: () => modifiers_hide,
        left: () => left,
        main: () => main,
        modifierPhases: () => modifierPhases,
        offset: () => modifiers_offset,
        placements: () => enums_placements,
        popper: () => popper,
        popperGenerator: () => popperGenerator,
        popperOffsets: () => modifiers_popperOffsets,
        preventOverflow: () => modifiers_preventOverflow,
        read: () => read,
        reference: () => reference,
        right: () => right,
        start: () => start,
        top: () => enums_top,
        variationPlacements: () => variationPlacements,
        viewport: () => viewport,
        write: () => write
    });
    var enums_top = "top";
    var bottom = "bottom";
    var right = "right";
    var left = "left";
    var auto = "auto";
    var basePlacements = [ enums_top, bottom, right, left ];
    var start = "start";
    var end = "end";
    var clippingParents = "clippingParents";
    var viewport = "viewport";
    var popper = "popper";
    var reference = "reference";
    var variationPlacements = basePlacements.reduce((function(acc, placement) {
        return acc.concat([ placement + "-" + start, placement + "-" + end ]);
    }), []);
    var enums_placements = [].concat(basePlacements, [ auto ]).reduce((function(acc, placement) {
        return acc.concat([ placement, placement + "-" + start, placement + "-" + end ]);
    }), []);
    var beforeRead = "beforeRead";
    var read = "read";
    var afterRead = "afterRead";
    var beforeMain = "beforeMain";
    var main = "main";
    var afterMain = "afterMain";
    var beforeWrite = "beforeWrite";
    var write = "write";
    var afterWrite = "afterWrite";
    var modifierPhases = [ beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite ];
    function getNodeName(element) {
        return element ? (element.nodeName || "").toLowerCase() : null;
    }
    function getWindow(node) {
        if (node == null) return window;
        if (node.toString() !== "[object Window]") {
            var ownerDocument = node.ownerDocument;
            return ownerDocument ? ownerDocument.defaultView || window : window;
        }
        return node;
    }
    function isElement(node) {
        var OwnElement = getWindow(node).Element;
        return node instanceof OwnElement || node instanceof Element;
    }
    function isHTMLElement(node) {
        var OwnElement = getWindow(node).HTMLElement;
        return node instanceof OwnElement || node instanceof HTMLElement;
    }
    function isShadowRoot(node) {
        if (typeof ShadowRoot === "undefined") return false;
        var OwnElement = getWindow(node).ShadowRoot;
        return node instanceof OwnElement || node instanceof ShadowRoot;
    }
    function applyStyles(_ref) {
        var state = _ref.state;
        Object.keys(state.elements).forEach((function(name) {
            var style = state.styles[name] || {};
            var attributes = state.attributes[name] || {};
            var element = state.elements[name];
            if (!isHTMLElement(element) || !getNodeName(element)) return;
            Object.assign(element.style, style);
            Object.keys(attributes).forEach((function(name) {
                var value = attributes[name];
                if (value === false) element.removeAttribute(name); else element.setAttribute(name, value === true ? "" : value);
            }));
        }));
    }
    function effect(_ref2) {
        var state = _ref2.state;
        var initialStyles = {
            popper: {
                position: state.options.strategy,
                left: "0",
                top: "0",
                margin: "0"
            },
            arrow: {
                position: "absolute"
            },
            reference: {}
        };
        Object.assign(state.elements.popper.style, initialStyles.popper);
        state.styles = initialStyles;
        if (state.elements.arrow) Object.assign(state.elements.arrow.style, initialStyles.arrow);
        return function() {
            Object.keys(state.elements).forEach((function(name) {
                var element = state.elements[name];
                var attributes = state.attributes[name] || {};
                var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]);
                var style = styleProperties.reduce((function(style, property) {
                    style[property] = "";
                    return style;
                }), {});
                if (!isHTMLElement(element) || !getNodeName(element)) return;
                Object.assign(element.style, style);
                Object.keys(attributes).forEach((function(attribute) {
                    element.removeAttribute(attribute);
                }));
            }));
        };
    }
    const modifiers_applyStyles = {
        name: "applyStyles",
        enabled: true,
        phase: "write",
        fn: applyStyles,
        effect,
        requires: [ "computeStyles" ]
    };
    function getBasePlacement(placement) {
        return placement.split("-")[0];
    }
    var math_max = Math.max;
    var math_min = Math.min;
    var round = Math.round;
    function getUAString() {
        var uaData = navigator.userAgentData;
        if (uaData != null && uaData.brands && Array.isArray(uaData.brands)) return uaData.brands.map((function(item) {
            return item.brand + "/" + item.version;
        })).join(" ");
        return navigator.userAgent;
    }
    function isLayoutViewport() {
        return !/^((?!chrome|android).)*safari/i.test(getUAString());
    }
    function getBoundingClientRect(element, includeScale, isFixedStrategy) {
        if (includeScale === void 0) includeScale = false;
        if (isFixedStrategy === void 0) isFixedStrategy = false;
        var clientRect = element.getBoundingClientRect();
        var scaleX = 1;
        var scaleY = 1;
        if (includeScale && isHTMLElement(element)) {
            scaleX = element.offsetWidth > 0 ? round(clientRect.width) / element.offsetWidth || 1 : 1;
            scaleY = element.offsetHeight > 0 ? round(clientRect.height) / element.offsetHeight || 1 : 1;
        }
        var _ref = isElement(element) ? getWindow(element) : window, visualViewport = _ref.visualViewport;
        var addVisualOffsets = !isLayoutViewport() && isFixedStrategy;
        var x = (clientRect.left + (addVisualOffsets && visualViewport ? visualViewport.offsetLeft : 0)) / scaleX;
        var y = (clientRect.top + (addVisualOffsets && visualViewport ? visualViewport.offsetTop : 0)) / scaleY;
        var width = clientRect.width / scaleX;
        var height = clientRect.height / scaleY;
        return {
            width,
            height,
            top: y,
            right: x + width,
            bottom: y + height,
            left: x,
            x,
            y
        };
    }
    function getLayoutRect(element) {
        var clientRect = getBoundingClientRect(element);
        var width = element.offsetWidth;
        var height = element.offsetHeight;
        if (Math.abs(clientRect.width - width) <= 1) width = clientRect.width;
        if (Math.abs(clientRect.height - height) <= 1) height = clientRect.height;
        return {
            x: element.offsetLeft,
            y: element.offsetTop,
            width,
            height
        };
    }
    function contains(parent, child) {
        var rootNode = child.getRootNode && child.getRootNode();
        if (parent.contains(child)) return true; else if (rootNode && isShadowRoot(rootNode)) {
            var next = child;
            do {
                if (next && parent.isSameNode(next)) return true;
                next = next.parentNode || next.host;
            } while (next);
        }
        return false;
    }
    function getComputedStyle_getComputedStyle(element) {
        return getWindow(element).getComputedStyle(element);
    }
    function isTableElement(element) {
        return [ "table", "td", "th" ].indexOf(getNodeName(element)) >= 0;
    }
    function getDocumentElement(element) {
        return ((isElement(element) ? element.ownerDocument : element.document) || window.document).documentElement;
    }
    function getParentNode(element) {
        if (getNodeName(element) === "html") return element;
        return element.assignedSlot || element.parentNode || (isShadowRoot(element) ? element.host : null) || getDocumentElement(element);
    }
    function getTrueOffsetParent(element) {
        if (!isHTMLElement(element) || getComputedStyle_getComputedStyle(element).position === "fixed") return null;
        return element.offsetParent;
    }
    function getContainingBlock(element) {
        var isFirefox = /firefox/i.test(getUAString());
        var isIE = /Trident/i.test(getUAString());
        if (isIE && isHTMLElement(element)) {
            var elementCss = getComputedStyle_getComputedStyle(element);
            if (elementCss.position === "fixed") return null;
        }
        var currentNode = getParentNode(element);
        if (isShadowRoot(currentNode)) currentNode = currentNode.host;
        while (isHTMLElement(currentNode) && [ "html", "body" ].indexOf(getNodeName(currentNode)) < 0) {
            var css = getComputedStyle_getComputedStyle(currentNode);
            if (css.transform !== "none" || css.perspective !== "none" || css.contain === "paint" || [ "transform", "perspective" ].indexOf(css.willChange) !== -1 || isFirefox && css.willChange === "filter" || isFirefox && css.filter && css.filter !== "none") return currentNode; else currentNode = currentNode.parentNode;
        }
        return null;
    }
    function getOffsetParent(element) {
        var window = getWindow(element);
        var offsetParent = getTrueOffsetParent(element);
        while (offsetParent && isTableElement(offsetParent) && getComputedStyle_getComputedStyle(offsetParent).position === "static") offsetParent = getTrueOffsetParent(offsetParent);
        if (offsetParent && (getNodeName(offsetParent) === "html" || getNodeName(offsetParent) === "body" && getComputedStyle_getComputedStyle(offsetParent).position === "static")) return window;
        return offsetParent || getContainingBlock(element) || window;
    }
    function getMainAxisFromPlacement(placement) {
        return [ "top", "bottom" ].indexOf(placement) >= 0 ? "x" : "y";
    }
    function within(min, value, max) {
        return math_max(min, math_min(value, max));
    }
    function withinMaxClamp(min, value, max) {
        var v = within(min, value, max);
        return v > max ? max : v;
    }
    function getFreshSideObject() {
        return {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        };
    }
    function mergePaddingObject(paddingObject) {
        return Object.assign({}, getFreshSideObject(), paddingObject);
    }
    function expandToHashMap(value, keys) {
        return keys.reduce((function(hashMap, key) {
            hashMap[key] = value;
            return hashMap;
        }), {});
    }
    var toPaddingObject = function toPaddingObject(padding, state) {
        padding = typeof padding === "function" ? padding(Object.assign({}, state.rects, {
            placement: state.placement
        })) : padding;
        return mergePaddingObject(typeof padding !== "number" ? padding : expandToHashMap(padding, basePlacements));
    };
    function arrow(_ref) {
        var _state$modifiersData$;
        var state = _ref.state, name = _ref.name, options = _ref.options;
        var arrowElement = state.elements.arrow;
        var popperOffsets = state.modifiersData.popperOffsets;
        var basePlacement = getBasePlacement(state.placement);
        var axis = getMainAxisFromPlacement(basePlacement);
        var isVertical = [ left, right ].indexOf(basePlacement) >= 0;
        var len = isVertical ? "height" : "width";
        if (!arrowElement || !popperOffsets) return;
        var paddingObject = toPaddingObject(options.padding, state);
        var arrowRect = getLayoutRect(arrowElement);
        var minProp = axis === "y" ? enums_top : left;
        var maxProp = axis === "y" ? bottom : right;
        var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets[axis] - state.rects.popper[len];
        var startDiff = popperOffsets[axis] - state.rects.reference[axis];
        var arrowOffsetParent = getOffsetParent(arrowElement);
        var clientSize = arrowOffsetParent ? axis === "y" ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
        var centerToReference = endDiff / 2 - startDiff / 2;
        var min = paddingObject[minProp];
        var max = clientSize - arrowRect[len] - paddingObject[maxProp];
        var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
        var offset = within(min, center, max);
        var axisProp = axis;
        state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset, 
        _state$modifiersData$.centerOffset = offset - center, _state$modifiersData$);
    }
    function arrow_effect(_ref2) {
        var state = _ref2.state, options = _ref2.options;
        var _options$element = options.element, arrowElement = _options$element === void 0 ? "[data-popper-arrow]" : _options$element;
        if (arrowElement == null) return;
        if (typeof arrowElement === "string") {
            arrowElement = state.elements.popper.querySelector(arrowElement);
            if (!arrowElement) return;
        }
        if (!contains(state.elements.popper, arrowElement)) return;
        state.elements.arrow = arrowElement;
    }
    const modifiers_arrow = {
        name: "arrow",
        enabled: true,
        phase: "main",
        fn: arrow,
        effect: arrow_effect,
        requires: [ "popperOffsets" ],
        requiresIfExists: [ "preventOverflow" ]
    };
    function getVariation(placement) {
        return placement.split("-")[1];
    }
    var unsetSides = {
        top: "auto",
        right: "auto",
        bottom: "auto",
        left: "auto"
    };
    function roundOffsetsByDPR(_ref, win) {
        var x = _ref.x, y = _ref.y;
        var dpr = win.devicePixelRatio || 1;
        return {
            x: round(x * dpr) / dpr || 0,
            y: round(y * dpr) / dpr || 0
        };
    }
    function mapToStyles(_ref2) {
        var _Object$assign2;
        var popper = _ref2.popper, popperRect = _ref2.popperRect, placement = _ref2.placement, variation = _ref2.variation, offsets = _ref2.offsets, position = _ref2.position, gpuAcceleration = _ref2.gpuAcceleration, adaptive = _ref2.adaptive, roundOffsets = _ref2.roundOffsets, isFixed = _ref2.isFixed;
        var _offsets$x = offsets.x, x = _offsets$x === void 0 ? 0 : _offsets$x, _offsets$y = offsets.y, y = _offsets$y === void 0 ? 0 : _offsets$y;
        var _ref3 = typeof roundOffsets === "function" ? roundOffsets({
            x,
            y
        }) : {
            x,
            y
        };
        x = _ref3.x;
        y = _ref3.y;
        var hasX = offsets.hasOwnProperty("x");
        var hasY = offsets.hasOwnProperty("y");
        var sideX = left;
        var sideY = enums_top;
        var win = window;
        if (adaptive) {
            var offsetParent = getOffsetParent(popper);
            var heightProp = "clientHeight";
            var widthProp = "clientWidth";
            if (offsetParent === getWindow(popper)) {
                offsetParent = getDocumentElement(popper);
                if (getComputedStyle_getComputedStyle(offsetParent).position !== "static" && position === "absolute") {
                    heightProp = "scrollHeight";
                    widthProp = "scrollWidth";
                }
            }
            offsetParent;
            if (placement === enums_top || (placement === left || placement === right) && variation === end) {
                sideY = bottom;
                var offsetY = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.height : offsetParent[heightProp];
                y -= offsetY - popperRect.height;
                y *= gpuAcceleration ? 1 : -1;
            }
            if (placement === left || (placement === enums_top || placement === bottom) && variation === end) {
                sideX = right;
                var offsetX = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.width : offsetParent[widthProp];
                x -= offsetX - popperRect.width;
                x *= gpuAcceleration ? 1 : -1;
            }
        }
        var commonStyles = Object.assign({
            position
        }, adaptive && unsetSides);
        var _ref4 = roundOffsets === true ? roundOffsetsByDPR({
            x,
            y
        }, getWindow(popper)) : {
            x,
            y
        };
        x = _ref4.x;
        y = _ref4.y;
        if (gpuAcceleration) {
            var _Object$assign;
            return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? "0" : "", 
            _Object$assign[sideX] = hasX ? "0" : "", _Object$assign.transform = (win.devicePixelRatio || 1) <= 1 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", 
            _Object$assign));
        }
        return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : "", 
        _Object$assign2[sideX] = hasX ? x + "px" : "", _Object$assign2.transform = "", _Object$assign2));
    }
    function computeStyles(_ref5) {
        var state = _ref5.state, options = _ref5.options;
        var _options$gpuAccelerat = options.gpuAcceleration, gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat, _options$adaptive = options.adaptive, adaptive = _options$adaptive === void 0 ? true : _options$adaptive, _options$roundOffsets = options.roundOffsets, roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;
        var commonStyles = {
            placement: getBasePlacement(state.placement),
            variation: getVariation(state.placement),
            popper: state.elements.popper,
            popperRect: state.rects.popper,
            gpuAcceleration,
            isFixed: state.options.strategy === "fixed"
        };
        if (state.modifiersData.popperOffsets != null) state.styles.popper = Object.assign({}, state.styles.popper, mapToStyles(Object.assign({}, commonStyles, {
            offsets: state.modifiersData.popperOffsets,
            position: state.options.strategy,
            adaptive,
            roundOffsets
        })));
        if (state.modifiersData.arrow != null) state.styles.arrow = Object.assign({}, state.styles.arrow, mapToStyles(Object.assign({}, commonStyles, {
            offsets: state.modifiersData.arrow,
            position: "absolute",
            adaptive: false,
            roundOffsets
        })));
        state.attributes.popper = Object.assign({}, state.attributes.popper, {
            "data-popper-placement": state.placement
        });
    }
    const modifiers_computeStyles = {
        name: "computeStyles",
        enabled: true,
        phase: "beforeWrite",
        fn: computeStyles,
        data: {}
    };
    var passive = {
        passive: true
    };
    function eventListeners_effect(_ref) {
        var state = _ref.state, instance = _ref.instance, options = _ref.options;
        var _options$scroll = options.scroll, scroll = _options$scroll === void 0 ? true : _options$scroll, _options$resize = options.resize, resize = _options$resize === void 0 ? true : _options$resize;
        var window = getWindow(state.elements.popper);
        var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);
        if (scroll) scrollParents.forEach((function(scrollParent) {
            scrollParent.addEventListener("scroll", instance.update, passive);
        }));
        if (resize) window.addEventListener("resize", instance.update, passive);
        return function() {
            if (scroll) scrollParents.forEach((function(scrollParent) {
                scrollParent.removeEventListener("scroll", instance.update, passive);
            }));
            if (resize) window.removeEventListener("resize", instance.update, passive);
        };
    }
    const eventListeners = {
        name: "eventListeners",
        enabled: true,
        phase: "write",
        fn: function fn() {},
        effect: eventListeners_effect,
        data: {}
    };
    var hash = {
        left: "right",
        right: "left",
        bottom: "top",
        top: "bottom"
    };
    function getOppositePlacement(placement) {
        return placement.replace(/left|right|bottom|top/g, (function(matched) {
            return hash[matched];
        }));
    }
    var getOppositeVariationPlacement_hash = {
        start: "end",
        end: "start"
    };
    function getOppositeVariationPlacement(placement) {
        return placement.replace(/start|end/g, (function(matched) {
            return getOppositeVariationPlacement_hash[matched];
        }));
    }
    function getWindowScroll(node) {
        var win = getWindow(node);
        var scrollLeft = win.pageXOffset;
        var scrollTop = win.pageYOffset;
        return {
            scrollLeft,
            scrollTop
        };
    }
    function getWindowScrollBarX(element) {
        return getBoundingClientRect(getDocumentElement(element)).left + getWindowScroll(element).scrollLeft;
    }
    function getViewportRect(element, strategy) {
        var win = getWindow(element);
        var html = getDocumentElement(element);
        var visualViewport = win.visualViewport;
        var width = html.clientWidth;
        var height = html.clientHeight;
        var x = 0;
        var y = 0;
        if (visualViewport) {
            width = visualViewport.width;
            height = visualViewport.height;
            var layoutViewport = isLayoutViewport();
            if (layoutViewport || !layoutViewport && strategy === "fixed") {
                x = visualViewport.offsetLeft;
                y = visualViewport.offsetTop;
            }
        }
        return {
            width,
            height,
            x: x + getWindowScrollBarX(element),
            y
        };
    }
    function getDocumentRect(element) {
        var _element$ownerDocumen;
        var html = getDocumentElement(element);
        var winScroll = getWindowScroll(element);
        var body = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
        var width = math_max(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
        var height = math_max(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
        var x = -winScroll.scrollLeft + getWindowScrollBarX(element);
        var y = -winScroll.scrollTop;
        if (getComputedStyle_getComputedStyle(body || html).direction === "rtl") x += math_max(html.clientWidth, body ? body.clientWidth : 0) - width;
        return {
            width,
            height,
            x,
            y
        };
    }
    function isScrollParent(element) {
        var _getComputedStyle = getComputedStyle_getComputedStyle(element), overflow = _getComputedStyle.overflow, overflowX = _getComputedStyle.overflowX, overflowY = _getComputedStyle.overflowY;
        return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
    }
    function getScrollParent(node) {
        if ([ "html", "body", "#document" ].indexOf(getNodeName(node)) >= 0) return node.ownerDocument.body;
        if (isHTMLElement(node) && isScrollParent(node)) return node;
        return getScrollParent(getParentNode(node));
    }
    function listScrollParents(element, list) {
        var _element$ownerDocumen;
        if (list === void 0) list = [];
        var scrollParent = getScrollParent(element);
        var isBody = scrollParent === ((_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body);
        var win = getWindow(scrollParent);
        var target = isBody ? [ win ].concat(win.visualViewport || [], isScrollParent(scrollParent) ? scrollParent : []) : scrollParent;
        var updatedList = list.concat(target);
        return isBody ? updatedList : updatedList.concat(listScrollParents(getParentNode(target)));
    }
    function rectToClientRect(rect) {
        return Object.assign({}, rect, {
            left: rect.x,
            top: rect.y,
            right: rect.x + rect.width,
            bottom: rect.y + rect.height
        });
    }
    function getInnerBoundingClientRect(element, strategy) {
        var rect = getBoundingClientRect(element, false, strategy === "fixed");
        rect.top = rect.top + element.clientTop;
        rect.left = rect.left + element.clientLeft;
        rect.bottom = rect.top + element.clientHeight;
        rect.right = rect.left + element.clientWidth;
        rect.width = element.clientWidth;
        rect.height = element.clientHeight;
        rect.x = rect.left;
        rect.y = rect.top;
        return rect;
    }
    function getClientRectFromMixedType(element, clippingParent, strategy) {
        return clippingParent === viewport ? rectToClientRect(getViewportRect(element, strategy)) : isElement(clippingParent) ? getInnerBoundingClientRect(clippingParent, strategy) : rectToClientRect(getDocumentRect(getDocumentElement(element)));
    }
    function getClippingParents(element) {
        var clippingParents = listScrollParents(getParentNode(element));
        var canEscapeClipping = [ "absolute", "fixed" ].indexOf(getComputedStyle_getComputedStyle(element).position) >= 0;
        var clipperElement = canEscapeClipping && isHTMLElement(element) ? getOffsetParent(element) : element;
        if (!isElement(clipperElement)) return [];
        return clippingParents.filter((function(clippingParent) {
            return isElement(clippingParent) && contains(clippingParent, clipperElement) && getNodeName(clippingParent) !== "body";
        }));
    }
    function getClippingRect(element, boundary, rootBoundary, strategy) {
        var mainClippingParents = boundary === "clippingParents" ? getClippingParents(element) : [].concat(boundary);
        var clippingParents = [].concat(mainClippingParents, [ rootBoundary ]);
        var firstClippingParent = clippingParents[0];
        var clippingRect = clippingParents.reduce((function(accRect, clippingParent) {
            var rect = getClientRectFromMixedType(element, clippingParent, strategy);
            accRect.top = math_max(rect.top, accRect.top);
            accRect.right = math_min(rect.right, accRect.right);
            accRect.bottom = math_min(rect.bottom, accRect.bottom);
            accRect.left = math_max(rect.left, accRect.left);
            return accRect;
        }), getClientRectFromMixedType(element, firstClippingParent, strategy));
        clippingRect.width = clippingRect.right - clippingRect.left;
        clippingRect.height = clippingRect.bottom - clippingRect.top;
        clippingRect.x = clippingRect.left;
        clippingRect.y = clippingRect.top;
        return clippingRect;
    }
    function computeOffsets(_ref) {
        var reference = _ref.reference, element = _ref.element, placement = _ref.placement;
        var basePlacement = placement ? getBasePlacement(placement) : null;
        var variation = placement ? getVariation(placement) : null;
        var commonX = reference.x + reference.width / 2 - element.width / 2;
        var commonY = reference.y + reference.height / 2 - element.height / 2;
        var offsets;
        switch (basePlacement) {
          case enums_top:
            offsets = {
                x: commonX,
                y: reference.y - element.height
            };
            break;

          case bottom:
            offsets = {
                x: commonX,
                y: reference.y + reference.height
            };
            break;

          case right:
            offsets = {
                x: reference.x + reference.width,
                y: commonY
            };
            break;

          case left:
            offsets = {
                x: reference.x - element.width,
                y: commonY
            };
            break;

          default:
            offsets = {
                x: reference.x,
                y: reference.y
            };
        }
        var mainAxis = basePlacement ? getMainAxisFromPlacement(basePlacement) : null;
        if (mainAxis != null) {
            var len = mainAxis === "y" ? "height" : "width";
            switch (variation) {
              case start:
                offsets[mainAxis] = offsets[mainAxis] - (reference[len] / 2 - element[len] / 2);
                break;

              case end:
                offsets[mainAxis] = offsets[mainAxis] + (reference[len] / 2 - element[len] / 2);
                break;

              default:
            }
        }
        return offsets;
    }
    function detectOverflow(state, options) {
        if (options === void 0) options = {};
        var _options = options, _options$placement = _options.placement, placement = _options$placement === void 0 ? state.placement : _options$placement, _options$strategy = _options.strategy, strategy = _options$strategy === void 0 ? state.strategy : _options$strategy, _options$boundary = _options.boundary, boundary = _options$boundary === void 0 ? clippingParents : _options$boundary, _options$rootBoundary = _options.rootBoundary, rootBoundary = _options$rootBoundary === void 0 ? viewport : _options$rootBoundary, _options$elementConte = _options.elementContext, elementContext = _options$elementConte === void 0 ? popper : _options$elementConte, _options$altBoundary = _options.altBoundary, altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary, _options$padding = _options.padding, padding = _options$padding === void 0 ? 0 : _options$padding;
        var paddingObject = mergePaddingObject(typeof padding !== "number" ? padding : expandToHashMap(padding, basePlacements));
        var altContext = elementContext === popper ? reference : popper;
        var popperRect = state.rects.popper;
        var element = state.elements[altBoundary ? altContext : elementContext];
        var clippingClientRect = getClippingRect(isElement(element) ? element : element.contextElement || getDocumentElement(state.elements.popper), boundary, rootBoundary, strategy);
        var referenceClientRect = getBoundingClientRect(state.elements.reference);
        var popperOffsets = computeOffsets({
            reference: referenceClientRect,
            element: popperRect,
            strategy: "absolute",
            placement
        });
        var popperClientRect = rectToClientRect(Object.assign({}, popperRect, popperOffsets));
        var elementClientRect = elementContext === popper ? popperClientRect : referenceClientRect;
        var overflowOffsets = {
            top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
            bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
            left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
            right: elementClientRect.right - clippingClientRect.right + paddingObject.right
        };
        var offsetData = state.modifiersData.offset;
        if (elementContext === popper && offsetData) {
            var offset = offsetData[placement];
            Object.keys(overflowOffsets).forEach((function(key) {
                var multiply = [ right, bottom ].indexOf(key) >= 0 ? 1 : -1;
                var axis = [ enums_top, bottom ].indexOf(key) >= 0 ? "y" : "x";
                overflowOffsets[key] += offset[axis] * multiply;
            }));
        }
        return overflowOffsets;
    }
    function computeAutoPlacement(state, options) {
        if (options === void 0) options = {};
        var _options = options, placement = _options.placement, boundary = _options.boundary, rootBoundary = _options.rootBoundary, padding = _options.padding, flipVariations = _options.flipVariations, _options$allowedAutoP = _options.allowedAutoPlacements, allowedAutoPlacements = _options$allowedAutoP === void 0 ? enums_placements : _options$allowedAutoP;
        var variation = getVariation(placement);
        var placements = variation ? flipVariations ? variationPlacements : variationPlacements.filter((function(placement) {
            return getVariation(placement) === variation;
        })) : basePlacements;
        var allowedPlacements = placements.filter((function(placement) {
            return allowedAutoPlacements.indexOf(placement) >= 0;
        }));
        if (allowedPlacements.length === 0) allowedPlacements = placements;
        var overflows = allowedPlacements.reduce((function(acc, placement) {
            acc[placement] = detectOverflow(state, {
                placement,
                boundary,
                rootBoundary,
                padding
            })[getBasePlacement(placement)];
            return acc;
        }), {});
        return Object.keys(overflows).sort((function(a, b) {
            return overflows[a] - overflows[b];
        }));
    }
    function getExpandedFallbackPlacements(placement) {
        if (getBasePlacement(placement) === auto) return [];
        var oppositePlacement = getOppositePlacement(placement);
        return [ getOppositeVariationPlacement(placement), oppositePlacement, getOppositeVariationPlacement(oppositePlacement) ];
    }
    function flip(_ref) {
        var state = _ref.state, options = _ref.options, name = _ref.name;
        if (state.modifiersData[name]._skip) return;
        var _options$mainAxis = options.mainAxis, checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis, _options$altAxis = options.altAxis, checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis, specifiedFallbackPlacements = options.fallbackPlacements, padding = options.padding, boundary = options.boundary, rootBoundary = options.rootBoundary, altBoundary = options.altBoundary, _options$flipVariatio = options.flipVariations, flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio, allowedAutoPlacements = options.allowedAutoPlacements;
        var preferredPlacement = state.options.placement;
        var basePlacement = getBasePlacement(preferredPlacement);
        var isBasePlacement = basePlacement === preferredPlacement;
        var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [ getOppositePlacement(preferredPlacement) ] : getExpandedFallbackPlacements(preferredPlacement));
        var placements = [ preferredPlacement ].concat(fallbackPlacements).reduce((function(acc, placement) {
            return acc.concat(getBasePlacement(placement) === auto ? computeAutoPlacement(state, {
                placement,
                boundary,
                rootBoundary,
                padding,
                flipVariations,
                allowedAutoPlacements
            }) : placement);
        }), []);
        var referenceRect = state.rects.reference;
        var popperRect = state.rects.popper;
        var checksMap = new Map;
        var makeFallbackChecks = true;
        var firstFittingPlacement = placements[0];
        for (var i = 0; i < placements.length; i++) {
            var placement = placements[i];
            var _basePlacement = getBasePlacement(placement);
            var isStartVariation = getVariation(placement) === start;
            var isVertical = [ enums_top, bottom ].indexOf(_basePlacement) >= 0;
            var len = isVertical ? "width" : "height";
            var overflow = detectOverflow(state, {
                placement,
                boundary,
                rootBoundary,
                altBoundary,
                padding
            });
            var mainVariationSide = isVertical ? isStartVariation ? right : left : isStartVariation ? bottom : enums_top;
            if (referenceRect[len] > popperRect[len]) mainVariationSide = getOppositePlacement(mainVariationSide);
            var altVariationSide = getOppositePlacement(mainVariationSide);
            var checks = [];
            if (checkMainAxis) checks.push(overflow[_basePlacement] <= 0);
            if (checkAltAxis) checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
            if (checks.every((function(check) {
                return check;
            }))) {
                firstFittingPlacement = placement;
                makeFallbackChecks = false;
                break;
            }
            checksMap.set(placement, checks);
        }
        if (makeFallbackChecks) {
            var numberOfChecks = flipVariations ? 3 : 1;
            var _loop = function _loop(_i) {
                var fittingPlacement = placements.find((function(placement) {
                    var checks = checksMap.get(placement);
                    if (checks) return checks.slice(0, _i).every((function(check) {
                        return check;
                    }));
                }));
                if (fittingPlacement) {
                    firstFittingPlacement = fittingPlacement;
                    return "break";
                }
            };
            for (var _i = numberOfChecks; _i > 0; _i--) {
                var _ret = _loop(_i);
                if (_ret === "break") break;
            }
        }
        if (state.placement !== firstFittingPlacement) {
            state.modifiersData[name]._skip = true;
            state.placement = firstFittingPlacement;
            state.reset = true;
        }
    }
    const modifiers_flip = {
        name: "flip",
        enabled: true,
        phase: "main",
        fn: flip,
        requiresIfExists: [ "offset" ],
        data: {
            _skip: false
        }
    };
    function getSideOffsets(overflow, rect, preventedOffsets) {
        if (preventedOffsets === void 0) preventedOffsets = {
            x: 0,
            y: 0
        };
        return {
            top: overflow.top - rect.height - preventedOffsets.y,
            right: overflow.right - rect.width + preventedOffsets.x,
            bottom: overflow.bottom - rect.height + preventedOffsets.y,
            left: overflow.left - rect.width - preventedOffsets.x
        };
    }
    function isAnySideFullyClipped(overflow) {
        return [ enums_top, right, bottom, left ].some((function(side) {
            return overflow[side] >= 0;
        }));
    }
    function hide(_ref) {
        var state = _ref.state, name = _ref.name;
        var referenceRect = state.rects.reference;
        var popperRect = state.rects.popper;
        var preventedOffsets = state.modifiersData.preventOverflow;
        var referenceOverflow = detectOverflow(state, {
            elementContext: "reference"
        });
        var popperAltOverflow = detectOverflow(state, {
            altBoundary: true
        });
        var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
        var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
        var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
        var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
        state.modifiersData[name] = {
            referenceClippingOffsets,
            popperEscapeOffsets,
            isReferenceHidden,
            hasPopperEscaped
        };
        state.attributes.popper = Object.assign({}, state.attributes.popper, {
            "data-popper-reference-hidden": isReferenceHidden,
            "data-popper-escaped": hasPopperEscaped
        });
    }
    const modifiers_hide = {
        name: "hide",
        enabled: true,
        phase: "main",
        requiresIfExists: [ "preventOverflow" ],
        fn: hide
    };
    function distanceAndSkiddingToXY(placement, rects, offset) {
        var basePlacement = getBasePlacement(placement);
        var invertDistance = [ left, enums_top ].indexOf(basePlacement) >= 0 ? -1 : 1;
        var _ref = typeof offset === "function" ? offset(Object.assign({}, rects, {
            placement
        })) : offset, skidding = _ref[0], distance = _ref[1];
        skidding = skidding || 0;
        distance = (distance || 0) * invertDistance;
        return [ left, right ].indexOf(basePlacement) >= 0 ? {
            x: distance,
            y: skidding
        } : {
            x: skidding,
            y: distance
        };
    }
    function offset(_ref2) {
        var state = _ref2.state, options = _ref2.options, name = _ref2.name;
        var _options$offset = options.offset, offset = _options$offset === void 0 ? [ 0, 0 ] : _options$offset;
        var data = enums_placements.reduce((function(acc, placement) {
            acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset);
            return acc;
        }), {});
        var _data$state$placement = data[state.placement], x = _data$state$placement.x, y = _data$state$placement.y;
        if (state.modifiersData.popperOffsets != null) {
            state.modifiersData.popperOffsets.x += x;
            state.modifiersData.popperOffsets.y += y;
        }
        state.modifiersData[name] = data;
    }
    const modifiers_offset = {
        name: "offset",
        enabled: true,
        phase: "main",
        requires: [ "popperOffsets" ],
        fn: offset
    };
    function popperOffsets(_ref) {
        var state = _ref.state, name = _ref.name;
        state.modifiersData[name] = computeOffsets({
            reference: state.rects.reference,
            element: state.rects.popper,
            strategy: "absolute",
            placement: state.placement
        });
    }
    const modifiers_popperOffsets = {
        name: "popperOffsets",
        enabled: true,
        phase: "read",
        fn: popperOffsets,
        data: {}
    };
    function getAltAxis(axis) {
        return axis === "x" ? "y" : "x";
    }
    function preventOverflow(_ref) {
        var state = _ref.state, options = _ref.options, name = _ref.name;
        var _options$mainAxis = options.mainAxis, checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis, _options$altAxis = options.altAxis, checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis, boundary = options.boundary, rootBoundary = options.rootBoundary, altBoundary = options.altBoundary, padding = options.padding, _options$tether = options.tether, tether = _options$tether === void 0 ? true : _options$tether, _options$tetherOffset = options.tetherOffset, tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
        var overflow = detectOverflow(state, {
            boundary,
            rootBoundary,
            padding,
            altBoundary
        });
        var basePlacement = getBasePlacement(state.placement);
        var variation = getVariation(state.placement);
        var isBasePlacement = !variation;
        var mainAxis = getMainAxisFromPlacement(basePlacement);
        var altAxis = getAltAxis(mainAxis);
        var popperOffsets = state.modifiersData.popperOffsets;
        var referenceRect = state.rects.reference;
        var popperRect = state.rects.popper;
        var tetherOffsetValue = typeof tetherOffset === "function" ? tetherOffset(Object.assign({}, state.rects, {
            placement: state.placement
        })) : tetherOffset;
        var normalizedTetherOffsetValue = typeof tetherOffsetValue === "number" ? {
            mainAxis: tetherOffsetValue,
            altAxis: tetherOffsetValue
        } : Object.assign({
            mainAxis: 0,
            altAxis: 0
        }, tetherOffsetValue);
        var offsetModifierState = state.modifiersData.offset ? state.modifiersData.offset[state.placement] : null;
        var data = {
            x: 0,
            y: 0
        };
        if (!popperOffsets) return;
        if (checkMainAxis) {
            var _offsetModifierState$;
            var mainSide = mainAxis === "y" ? enums_top : left;
            var altSide = mainAxis === "y" ? bottom : right;
            var len = mainAxis === "y" ? "height" : "width";
            var offset = popperOffsets[mainAxis];
            var min = offset + overflow[mainSide];
            var max = offset - overflow[altSide];
            var additive = tether ? -popperRect[len] / 2 : 0;
            var minLen = variation === start ? referenceRect[len] : popperRect[len];
            var maxLen = variation === start ? -popperRect[len] : -referenceRect[len];
            var arrowElement = state.elements.arrow;
            var arrowRect = tether && arrowElement ? getLayoutRect(arrowElement) : {
                width: 0,
                height: 0
            };
            var arrowPaddingObject = state.modifiersData["arrow#persistent"] ? state.modifiersData["arrow#persistent"].padding : getFreshSideObject();
            var arrowPaddingMin = arrowPaddingObject[mainSide];
            var arrowPaddingMax = arrowPaddingObject[altSide];
            var arrowLen = within(0, referenceRect[len], arrowRect[len]);
            var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis : minLen - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis;
            var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis : maxLen + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis;
            var arrowOffsetParent = state.elements.arrow && getOffsetParent(state.elements.arrow);
            var clientOffset = arrowOffsetParent ? mainAxis === "y" ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
            var offsetModifierValue = (_offsetModifierState$ = offsetModifierState == null ? void 0 : offsetModifierState[mainAxis]) != null ? _offsetModifierState$ : 0;
            var tetherMin = offset + minOffset - offsetModifierValue - clientOffset;
            var tetherMax = offset + maxOffset - offsetModifierValue;
            var preventedOffset = within(tether ? math_min(min, tetherMin) : min, offset, tether ? math_max(max, tetherMax) : max);
            popperOffsets[mainAxis] = preventedOffset;
            data[mainAxis] = preventedOffset - offset;
        }
        if (checkAltAxis) {
            var _offsetModifierState$2;
            var _mainSide = mainAxis === "x" ? enums_top : left;
            var _altSide = mainAxis === "x" ? bottom : right;
            var _offset = popperOffsets[altAxis];
            var _len = altAxis === "y" ? "height" : "width";
            var _min = _offset + overflow[_mainSide];
            var _max = _offset - overflow[_altSide];
            var isOriginSide = [ enums_top, left ].indexOf(basePlacement) !== -1;
            var _offsetModifierValue = (_offsetModifierState$2 = offsetModifierState == null ? void 0 : offsetModifierState[altAxis]) != null ? _offsetModifierState$2 : 0;
            var _tetherMin = isOriginSide ? _min : _offset - referenceRect[_len] - popperRect[_len] - _offsetModifierValue + normalizedTetherOffsetValue.altAxis;
            var _tetherMax = isOriginSide ? _offset + referenceRect[_len] + popperRect[_len] - _offsetModifierValue - normalizedTetherOffsetValue.altAxis : _max;
            var _preventedOffset = tether && isOriginSide ? withinMaxClamp(_tetherMin, _offset, _tetherMax) : within(tether ? _tetherMin : _min, _offset, tether ? _tetherMax : _max);
            popperOffsets[altAxis] = _preventedOffset;
            data[altAxis] = _preventedOffset - _offset;
        }
        state.modifiersData[name] = data;
    }
    const modifiers_preventOverflow = {
        name: "preventOverflow",
        enabled: true,
        phase: "main",
        fn: preventOverflow,
        requiresIfExists: [ "offset" ]
    };
    function getHTMLElementScroll(element) {
        return {
            scrollLeft: element.scrollLeft,
            scrollTop: element.scrollTop
        };
    }
    function getNodeScroll(node) {
        if (node === getWindow(node) || !isHTMLElement(node)) return getWindowScroll(node); else return getHTMLElementScroll(node);
    }
    function isElementScaled(element) {
        var rect = element.getBoundingClientRect();
        var scaleX = round(rect.width) / element.offsetWidth || 1;
        var scaleY = round(rect.height) / element.offsetHeight || 1;
        return scaleX !== 1 || scaleY !== 1;
    }
    function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
        if (isFixed === void 0) isFixed = false;
        var isOffsetParentAnElement = isHTMLElement(offsetParent);
        var offsetParentIsScaled = isHTMLElement(offsetParent) && isElementScaled(offsetParent);
        var documentElement = getDocumentElement(offsetParent);
        var rect = getBoundingClientRect(elementOrVirtualElement, offsetParentIsScaled, isFixed);
        var scroll = {
            scrollLeft: 0,
            scrollTop: 0
        };
        var offsets = {
            x: 0,
            y: 0
        };
        if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
            if (getNodeName(offsetParent) !== "body" || isScrollParent(documentElement)) scroll = getNodeScroll(offsetParent);
            if (isHTMLElement(offsetParent)) {
                offsets = getBoundingClientRect(offsetParent, true);
                offsets.x += offsetParent.clientLeft;
                offsets.y += offsetParent.clientTop;
            } else if (documentElement) offsets.x = getWindowScrollBarX(documentElement);
        }
        return {
            x: rect.left + scroll.scrollLeft - offsets.x,
            y: rect.top + scroll.scrollTop - offsets.y,
            width: rect.width,
            height: rect.height
        };
    }
    function order(modifiers) {
        var map = new Map;
        var visited = new Set;
        var result = [];
        modifiers.forEach((function(modifier) {
            map.set(modifier.name, modifier);
        }));
        function sort(modifier) {
            visited.add(modifier.name);
            var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
            requires.forEach((function(dep) {
                if (!visited.has(dep)) {
                    var depModifier = map.get(dep);
                    if (depModifier) sort(depModifier);
                }
            }));
            result.push(modifier);
        }
        modifiers.forEach((function(modifier) {
            if (!visited.has(modifier.name)) sort(modifier);
        }));
        return result;
    }
    function orderModifiers(modifiers) {
        var orderedModifiers = order(modifiers);
        return modifierPhases.reduce((function(acc, phase) {
            return acc.concat(orderedModifiers.filter((function(modifier) {
                return modifier.phase === phase;
            })));
        }), []);
    }
    function debounce(fn) {
        var pending;
        return function() {
            if (!pending) pending = new Promise((function(resolve) {
                Promise.resolve().then((function() {
                    pending = void 0;
                    resolve(fn());
                }));
            }));
            return pending;
        };
    }
    function mergeByName(modifiers) {
        var merged = modifiers.reduce((function(merged, current) {
            var existing = merged[current.name];
            merged[current.name] = existing ? Object.assign({}, existing, current, {
                options: Object.assign({}, existing.options, current.options),
                data: Object.assign({}, existing.data, current.data)
            }) : current;
            return merged;
        }), {});
        return Object.keys(merged).map((function(key) {
            return merged[key];
        }));
    }
    var DEFAULT_OPTIONS = {
        placement: "bottom",
        modifiers: [],
        strategy: "absolute"
    };
    function areValidElements() {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
        return !args.some((function(element) {
            return !(element && typeof element.getBoundingClientRect === "function");
        }));
    }
    function popperGenerator(generatorOptions) {
        if (generatorOptions === void 0) generatorOptions = {};
        var _generatorOptions = generatorOptions, _generatorOptions$def = _generatorOptions.defaultModifiers, defaultModifiers = _generatorOptions$def === void 0 ? [] : _generatorOptions$def, _generatorOptions$def2 = _generatorOptions.defaultOptions, defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
        return function createPopper(reference, popper, options) {
            if (options === void 0) options = defaultOptions;
            var state = {
                placement: "bottom",
                orderedModifiers: [],
                options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions),
                modifiersData: {},
                elements: {
                    reference,
                    popper
                },
                attributes: {},
                styles: {}
            };
            var effectCleanupFns = [];
            var isDestroyed = false;
            var instance = {
                state,
                setOptions: function setOptions(setOptionsAction) {
                    var options = typeof setOptionsAction === "function" ? setOptionsAction(state.options) : setOptionsAction;
                    cleanupModifierEffects();
                    state.options = Object.assign({}, defaultOptions, state.options, options);
                    state.scrollParents = {
                        reference: isElement(reference) ? listScrollParents(reference) : reference.contextElement ? listScrollParents(reference.contextElement) : [],
                        popper: listScrollParents(popper)
                    };
                    var orderedModifiers = orderModifiers(mergeByName([].concat(defaultModifiers, state.options.modifiers)));
                    state.orderedModifiers = orderedModifiers.filter((function(m) {
                        return m.enabled;
                    }));
                    runModifierEffects();
                    return instance.update();
                },
                forceUpdate: function forceUpdate() {
                    if (isDestroyed) return;
                    var _state$elements = state.elements, reference = _state$elements.reference, popper = _state$elements.popper;
                    if (!areValidElements(reference, popper)) return;
                    state.rects = {
                        reference: getCompositeRect(reference, getOffsetParent(popper), state.options.strategy === "fixed"),
                        popper: getLayoutRect(popper)
                    };
                    state.reset = false;
                    state.placement = state.options.placement;
                    state.orderedModifiers.forEach((function(modifier) {
                        return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
                    }));
                    for (var index = 0; index < state.orderedModifiers.length; index++) {
                        if (state.reset === true) {
                            state.reset = false;
                            index = -1;
                            continue;
                        }
                        var _state$orderedModifie = state.orderedModifiers[index], fn = _state$orderedModifie.fn, _state$orderedModifie2 = _state$orderedModifie.options, _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2, name = _state$orderedModifie.name;
                        if (typeof fn === "function") state = fn({
                            state,
                            options: _options,
                            name,
                            instance
                        }) || state;
                    }
                },
                update: debounce((function() {
                    return new Promise((function(resolve) {
                        instance.forceUpdate();
                        resolve(state);
                    }));
                })),
                destroy: function destroy() {
                    cleanupModifierEffects();
                    isDestroyed = true;
                }
            };
            if (!areValidElements(reference, popper)) return instance;
            instance.setOptions(options).then((function(state) {
                if (!isDestroyed && options.onFirstUpdate) options.onFirstUpdate(state);
            }));
            function runModifierEffects() {
                state.orderedModifiers.forEach((function(_ref) {
                    var name = _ref.name, _ref$options = _ref.options, options = _ref$options === void 0 ? {} : _ref$options, effect = _ref.effect;
                    if (typeof effect === "function") {
                        var cleanupFn = effect({
                            state,
                            name,
                            instance,
                            options
                        });
                        var noopFn = function noopFn() {};
                        effectCleanupFns.push(cleanupFn || noopFn);
                    }
                }));
            }
            function cleanupModifierEffects() {
                effectCleanupFns.forEach((function(fn) {
                    return fn();
                }));
                effectCleanupFns = [];
            }
            return instance;
        };
    }
    var createPopper = popperGenerator();
    var defaultModifiers = [ eventListeners, modifiers_popperOffsets, modifiers_computeStyles, modifiers_applyStyles, modifiers_offset, modifiers_flip, modifiers_preventOverflow, modifiers_arrow, modifiers_hide ];
    var popper_createPopper = popperGenerator({
        defaultModifiers
    });
    var popper_lite_defaultModifiers = [ eventListeners, modifiers_popperOffsets, modifiers_computeStyles, modifiers_applyStyles ];
    var popper_lite_createPopper = popperGenerator({
        defaultModifiers: popper_lite_defaultModifiers
    });
    /*!
  * Bootstrap v5.3.0 (https://getbootstrap.com/)
  * Copyright 2011-2023 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
    const elementMap = new Map;
    const Data = {
        set(element, key, instance) {
            if (!elementMap.has(element)) elementMap.set(element, new Map);
            const instanceMap = elementMap.get(element);
            if (!instanceMap.has(key) && instanceMap.size !== 0) {
                console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(instanceMap.keys())[0]}.`);
                return;
            }
            instanceMap.set(key, instance);
        },
        get(element, key) {
            if (elementMap.has(element)) return elementMap.get(element).get(key) || null;
            return null;
        },
        remove(element, key) {
            if (!elementMap.has(element)) return;
            const instanceMap = elementMap.get(element);
            instanceMap.delete(key);
            if (instanceMap.size === 0) elementMap.delete(element);
        }
    };
    const MAX_UID = 1e6;
    const MILLISECONDS_MULTIPLIER = 1e3;
    const TRANSITION_END = "transitionend";
    const parseSelector = selector => {
        if (selector && window.CSS && window.CSS.escape) selector = selector.replace(/#([^\s"#']+)/g, ((match, id) => `#${CSS.escape(id)}`));
        return selector;
    };
    const toType = object => {
        if (object === null || object === void 0) return `${object}`;
        return Object.prototype.toString.call(object).match(/\s([a-z]+)/i)[1].toLowerCase();
    };
    const getUID = prefix => {
        do {
            prefix += Math.floor(Math.random() * MAX_UID);
        } while (document.getElementById(prefix));
        return prefix;
    };
    const getTransitionDurationFromElement = element => {
        if (!element) return 0;
        let {transitionDuration, transitionDelay} = window.getComputedStyle(element);
        const floatTransitionDuration = Number.parseFloat(transitionDuration);
        const floatTransitionDelay = Number.parseFloat(transitionDelay);
        if (!floatTransitionDuration && !floatTransitionDelay) return 0;
        transitionDuration = transitionDuration.split(",")[0];
        transitionDelay = transitionDelay.split(",")[0];
        return (Number.parseFloat(transitionDuration) + Number.parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER;
    };
    const triggerTransitionEnd = element => {
        element.dispatchEvent(new Event(TRANSITION_END));
    };
    const bootstrap_esm_isElement = object => {
        if (!object || typeof object !== "object") return false;
        if (typeof object.jquery !== "undefined") object = object[0];
        return typeof object.nodeType !== "undefined";
    };
    const getElement = object => {
        if (bootstrap_esm_isElement(object)) return object.jquery ? object[0] : object;
        if (typeof object === "string" && object.length > 0) return document.querySelector(parseSelector(object));
        return null;
    };
    const isVisible = element => {
        if (!bootstrap_esm_isElement(element) || element.getClientRects().length === 0) return false;
        const elementIsVisible = getComputedStyle(element).getPropertyValue("visibility") === "visible";
        const closedDetails = element.closest("details:not([open])");
        if (!closedDetails) return elementIsVisible;
        if (closedDetails !== element) {
            const summary = element.closest("summary");
            if (summary && summary.parentNode !== closedDetails) return false;
            if (summary === null) return false;
        }
        return elementIsVisible;
    };
    const isDisabled = element => {
        if (!element || element.nodeType !== Node.ELEMENT_NODE) return true;
        if (element.classList.contains("disabled")) return true;
        if (typeof element.disabled !== "undefined") return element.disabled;
        return element.hasAttribute("disabled") && element.getAttribute("disabled") !== "false";
    };
    const findShadowRoot = element => {
        if (!document.documentElement.attachShadow) return null;
        if (typeof element.getRootNode === "function") {
            const root = element.getRootNode();
            return root instanceof ShadowRoot ? root : null;
        }
        if (element instanceof ShadowRoot) return element;
        if (!element.parentNode) return null;
        return findShadowRoot(element.parentNode);
    };
    const noop = () => {};
    const reflow = element => {
        element.offsetHeight;
    };
    const getjQuery = () => {
        if (window.jQuery && !document.body.hasAttribute("data-bs-no-jquery")) return window.jQuery;
        return null;
    };
    const DOMContentLoadedCallbacks = [];
    const onDOMContentLoaded = callback => {
        if (document.readyState === "loading") {
            if (!DOMContentLoadedCallbacks.length) document.addEventListener("DOMContentLoaded", (() => {
                for (const callback of DOMContentLoadedCallbacks) callback();
            }));
            DOMContentLoadedCallbacks.push(callback);
        } else callback();
    };
    const isRTL = () => document.documentElement.dir === "rtl";
    const defineJQueryPlugin = plugin => {
        onDOMContentLoaded((() => {
            const $ = getjQuery();
            if ($) {
                const name = plugin.NAME;
                const JQUERY_NO_CONFLICT = $.fn[name];
                $.fn[name] = plugin.jQueryInterface;
                $.fn[name].Constructor = plugin;
                $.fn[name].noConflict = () => {
                    $.fn[name] = JQUERY_NO_CONFLICT;
                    return plugin.jQueryInterface;
                };
            }
        }));
    };
    const execute = (possibleCallback, args = [], defaultValue = possibleCallback) => typeof possibleCallback === "function" ? possibleCallback(...args) : defaultValue;
    const executeAfterTransition = (callback, transitionElement, waitForTransition = true) => {
        if (!waitForTransition) {
            execute(callback);
            return;
        }
        const durationPadding = 5;
        const emulatedDuration = getTransitionDurationFromElement(transitionElement) + durationPadding;
        let called = false;
        const handler = ({target}) => {
            if (target !== transitionElement) return;
            called = true;
            transitionElement.removeEventListener(TRANSITION_END, handler);
            execute(callback);
        };
        transitionElement.addEventListener(TRANSITION_END, handler);
        setTimeout((() => {
            if (!called) triggerTransitionEnd(transitionElement);
        }), emulatedDuration);
    };
    const getNextActiveElement = (list, activeElement, shouldGetNext, isCycleAllowed) => {
        const listLength = list.length;
        let index = list.indexOf(activeElement);
        if (index === -1) return !shouldGetNext && isCycleAllowed ? list[listLength - 1] : list[0];
        index += shouldGetNext ? 1 : -1;
        if (isCycleAllowed) index = (index + listLength) % listLength;
        return list[Math.max(0, Math.min(index, listLength - 1))];
    };
    const namespaceRegex = /[^.]*(?=\..*)\.|.*/;
    const stripNameRegex = /\..*/;
    const stripUidRegex = /::\d+$/;
    const eventRegistry = {};
    let uidEvent = 1;
    const customEvents = {
        mouseenter: "mouseover",
        mouseleave: "mouseout"
    };
    const nativeEvents = new Set([ "click", "dblclick", "mouseup", "mousedown", "contextmenu", "mousewheel", "DOMMouseScroll", "mouseover", "mouseout", "mousemove", "selectstart", "selectend", "keydown", "keypress", "keyup", "orientationchange", "touchstart", "touchmove", "touchend", "touchcancel", "pointerdown", "pointermove", "pointerup", "pointerleave", "pointercancel", "gesturestart", "gesturechange", "gestureend", "focus", "blur", "change", "reset", "select", "submit", "focusin", "focusout", "load", "unload", "beforeunload", "resize", "move", "DOMContentLoaded", "readystatechange", "error", "abort", "scroll" ]);
    function makeEventUid(element, uid) {
        return uid && `${uid}::${uidEvent++}` || element.uidEvent || uidEvent++;
    }
    function getElementEvents(element) {
        const uid = makeEventUid(element);
        element.uidEvent = uid;
        eventRegistry[uid] = eventRegistry[uid] || {};
        return eventRegistry[uid];
    }
    function bootstrapHandler(element, fn) {
        return function handler(event) {
            hydrateObj(event, {
                delegateTarget: element
            });
            if (handler.oneOff) EventHandler.off(element, event.type, fn);
            return fn.apply(element, [ event ]);
        };
    }
    function bootstrapDelegationHandler(element, selector, fn) {
        return function handler(event) {
            const domElements = element.querySelectorAll(selector);
            for (let {target} = event; target && target !== this; target = target.parentNode) for (const domElement of domElements) {
                if (domElement !== target) continue;
                hydrateObj(event, {
                    delegateTarget: target
                });
                if (handler.oneOff) EventHandler.off(element, event.type, selector, fn);
                return fn.apply(target, [ event ]);
            }
        };
    }
    function findHandler(events, callable, delegationSelector = null) {
        return Object.values(events).find((event => event.callable === callable && event.delegationSelector === delegationSelector));
    }
    function normalizeParameters(originalTypeEvent, handler, delegationFunction) {
        const isDelegated = typeof handler === "string";
        const callable = isDelegated ? delegationFunction : handler || delegationFunction;
        let typeEvent = getTypeEvent(originalTypeEvent);
        if (!nativeEvents.has(typeEvent)) typeEvent = originalTypeEvent;
        return [ isDelegated, callable, typeEvent ];
    }
    function addHandler(element, originalTypeEvent, handler, delegationFunction, oneOff) {
        if (typeof originalTypeEvent !== "string" || !element) return;
        let [isDelegated, callable, typeEvent] = normalizeParameters(originalTypeEvent, handler, delegationFunction);
        if (originalTypeEvent in customEvents) {
            const wrapFunction = fn => function(event) {
                if (!event.relatedTarget || event.relatedTarget !== event.delegateTarget && !event.delegateTarget.contains(event.relatedTarget)) return fn.call(this, event);
            };
            callable = wrapFunction(callable);
        }
        const events = getElementEvents(element);
        const handlers = events[typeEvent] || (events[typeEvent] = {});
        const previousFunction = findHandler(handlers, callable, isDelegated ? handler : null);
        if (previousFunction) {
            previousFunction.oneOff = previousFunction.oneOff && oneOff;
            return;
        }
        const uid = makeEventUid(callable, originalTypeEvent.replace(namespaceRegex, ""));
        const fn = isDelegated ? bootstrapDelegationHandler(element, handler, callable) : bootstrapHandler(element, callable);
        fn.delegationSelector = isDelegated ? handler : null;
        fn.callable = callable;
        fn.oneOff = oneOff;
        fn.uidEvent = uid;
        handlers[uid] = fn;
        element.addEventListener(typeEvent, fn, isDelegated);
    }
    function removeHandler(element, events, typeEvent, handler, delegationSelector) {
        const fn = findHandler(events[typeEvent], handler, delegationSelector);
        if (!fn) return;
        element.removeEventListener(typeEvent, fn, Boolean(delegationSelector));
        delete events[typeEvent][fn.uidEvent];
    }
    function removeNamespacedHandlers(element, events, typeEvent, namespace) {
        const storeElementEvent = events[typeEvent] || {};
        for (const [handlerKey, event] of Object.entries(storeElementEvent)) if (handlerKey.includes(namespace)) removeHandler(element, events, typeEvent, event.callable, event.delegationSelector);
    }
    function getTypeEvent(event) {
        event = event.replace(stripNameRegex, "");
        return customEvents[event] || event;
    }
    const EventHandler = {
        on(element, event, handler, delegationFunction) {
            addHandler(element, event, handler, delegationFunction, false);
        },
        one(element, event, handler, delegationFunction) {
            addHandler(element, event, handler, delegationFunction, true);
        },
        off(element, originalTypeEvent, handler, delegationFunction) {
            if (typeof originalTypeEvent !== "string" || !element) return;
            const [isDelegated, callable, typeEvent] = normalizeParameters(originalTypeEvent, handler, delegationFunction);
            const inNamespace = typeEvent !== originalTypeEvent;
            const events = getElementEvents(element);
            const storeElementEvent = events[typeEvent] || {};
            const isNamespace = originalTypeEvent.startsWith(".");
            if (typeof callable !== "undefined") {
                if (!Object.keys(storeElementEvent).length) return;
                removeHandler(element, events, typeEvent, callable, isDelegated ? handler : null);
                return;
            }
            if (isNamespace) for (const elementEvent of Object.keys(events)) removeNamespacedHandlers(element, events, elementEvent, originalTypeEvent.slice(1));
            for (const [keyHandlers, event] of Object.entries(storeElementEvent)) {
                const handlerKey = keyHandlers.replace(stripUidRegex, "");
                if (!inNamespace || originalTypeEvent.includes(handlerKey)) removeHandler(element, events, typeEvent, event.callable, event.delegationSelector);
            }
        },
        trigger(element, event, args) {
            if (typeof event !== "string" || !element) return null;
            const $ = getjQuery();
            const typeEvent = getTypeEvent(event);
            const inNamespace = event !== typeEvent;
            let jQueryEvent = null;
            let bubbles = true;
            let nativeDispatch = true;
            let defaultPrevented = false;
            if (inNamespace && $) {
                jQueryEvent = $.Event(event, args);
                $(element).trigger(jQueryEvent);
                bubbles = !jQueryEvent.isPropagationStopped();
                nativeDispatch = !jQueryEvent.isImmediatePropagationStopped();
                defaultPrevented = jQueryEvent.isDefaultPrevented();
            }
            const evt = hydrateObj(new Event(event, {
                bubbles,
                cancelable: true
            }), args);
            if (defaultPrevented) evt.preventDefault();
            if (nativeDispatch) element.dispatchEvent(evt);
            if (evt.defaultPrevented && jQueryEvent) jQueryEvent.preventDefault();
            return evt;
        }
    };
    function hydrateObj(obj, meta = {}) {
        for (const [key, value] of Object.entries(meta)) try {
            obj[key] = value;
        } catch (_unused) {
            Object.defineProperty(obj, key, {
                configurable: true,
                get() {
                    return value;
                }
            });
        }
        return obj;
    }
    function normalizeData(value) {
        if (value === "true") return true;
        if (value === "false") return false;
        if (value === Number(value).toString()) return Number(value);
        if (value === "" || value === "null") return null;
        if (typeof value !== "string") return value;
        try {
            return JSON.parse(decodeURIComponent(value));
        } catch (_unused) {
            return value;
        }
    }
    function normalizeDataKey(key) {
        return key.replace(/[A-Z]/g, (chr => `-${chr.toLowerCase()}`));
    }
    const Manipulator = {
        setDataAttribute(element, key, value) {
            element.setAttribute(`data-bs-${normalizeDataKey(key)}`, value);
        },
        removeDataAttribute(element, key) {
            element.removeAttribute(`data-bs-${normalizeDataKey(key)}`);
        },
        getDataAttributes(element) {
            if (!element) return {};
            const attributes = {};
            const bsKeys = Object.keys(element.dataset).filter((key => key.startsWith("bs") && !key.startsWith("bsConfig")));
            for (const key of bsKeys) {
                let pureKey = key.replace(/^bs/, "");
                pureKey = pureKey.charAt(0).toLowerCase() + pureKey.slice(1, pureKey.length);
                attributes[pureKey] = normalizeData(element.dataset[key]);
            }
            return attributes;
        },
        getDataAttribute(element, key) {
            return normalizeData(element.getAttribute(`data-bs-${normalizeDataKey(key)}`));
        }
    };
    class Config {
        static get Default() {
            return {};
        }
        static get DefaultType() {
            return {};
        }
        static get NAME() {
            throw new Error('You have to implement the static method "NAME", for each component!');
        }
        _getConfig(config) {
            config = this._mergeConfigObj(config);
            config = this._configAfterMerge(config);
            this._typeCheckConfig(config);
            return config;
        }
        _configAfterMerge(config) {
            return config;
        }
        _mergeConfigObj(config, element) {
            const jsonConfig = bootstrap_esm_isElement(element) ? Manipulator.getDataAttribute(element, "config") : {};
            return {
                ...this.constructor.Default,
                ...typeof jsonConfig === "object" ? jsonConfig : {},
                ...bootstrap_esm_isElement(element) ? Manipulator.getDataAttributes(element) : {},
                ...typeof config === "object" ? config : {}
            };
        }
        _typeCheckConfig(config, configTypes = this.constructor.DefaultType) {
            for (const [property, expectedTypes] of Object.entries(configTypes)) {
                const value = config[property];
                const valueType = bootstrap_esm_isElement(value) ? "element" : toType(value);
                if (!new RegExp(expectedTypes).test(valueType)) throw new TypeError(`${this.constructor.NAME.toUpperCase()}: Option "${property}" provided type "${valueType}" but expected type "${expectedTypes}".`);
            }
        }
    }
    const VERSION = "5.3.0";
    class BaseComponent extends Config {
        constructor(element, config) {
            super();
            element = getElement(element);
            if (!element) return;
            this._element = element;
            this._config = this._getConfig(config);
            Data.set(this._element, this.constructor.DATA_KEY, this);
        }
        dispose() {
            Data.remove(this._element, this.constructor.DATA_KEY);
            EventHandler.off(this._element, this.constructor.EVENT_KEY);
            for (const propertyName of Object.getOwnPropertyNames(this)) this[propertyName] = null;
        }
        _queueCallback(callback, element, isAnimated = true) {
            executeAfterTransition(callback, element, isAnimated);
        }
        _getConfig(config) {
            config = this._mergeConfigObj(config, this._element);
            config = this._configAfterMerge(config);
            this._typeCheckConfig(config);
            return config;
        }
        static getInstance(element) {
            return Data.get(getElement(element), this.DATA_KEY);
        }
        static getOrCreateInstance(element, config = {}) {
            return this.getInstance(element) || new this(element, typeof config === "object" ? config : null);
        }
        static get VERSION() {
            return VERSION;
        }
        static get DATA_KEY() {
            return `bs.${this.NAME}`;
        }
        static get EVENT_KEY() {
            return `.${this.DATA_KEY}`;
        }
        static eventName(name) {
            return `${name}${this.EVENT_KEY}`;
        }
    }
    const getSelector = element => {
        let selector = element.getAttribute("data-bs-target");
        if (!selector || selector === "#") {
            let hrefAttribute = element.getAttribute("href");
            if (!hrefAttribute || !hrefAttribute.includes("#") && !hrefAttribute.startsWith(".")) return null;
            if (hrefAttribute.includes("#") && !hrefAttribute.startsWith("#")) hrefAttribute = `#${hrefAttribute.split("#")[1]}`;
            selector = hrefAttribute && hrefAttribute !== "#" ? hrefAttribute.trim() : null;
        }
        return parseSelector(selector);
    };
    const SelectorEngine = {
        find(selector, element = document.documentElement) {
            return [].concat(...Element.prototype.querySelectorAll.call(element, selector));
        },
        findOne(selector, element = document.documentElement) {
            return Element.prototype.querySelector.call(element, selector);
        },
        children(element, selector) {
            return [].concat(...element.children).filter((child => child.matches(selector)));
        },
        parents(element, selector) {
            const parents = [];
            let ancestor = element.parentNode.closest(selector);
            while (ancestor) {
                parents.push(ancestor);
                ancestor = ancestor.parentNode.closest(selector);
            }
            return parents;
        },
        prev(element, selector) {
            let previous = element.previousElementSibling;
            while (previous) {
                if (previous.matches(selector)) return [ previous ];
                previous = previous.previousElementSibling;
            }
            return [];
        },
        next(element, selector) {
            let next = element.nextElementSibling;
            while (next) {
                if (next.matches(selector)) return [ next ];
                next = next.nextElementSibling;
            }
            return [];
        },
        focusableChildren(element) {
            const focusables = [ "a", "button", "input", "textarea", "select", "details", "[tabindex]", '[contenteditable="true"]' ].map((selector => `${selector}:not([tabindex^="-"])`)).join(",");
            return this.find(focusables, element).filter((el => !isDisabled(el) && isVisible(el)));
        },
        getSelectorFromElement(element) {
            const selector = getSelector(element);
            if (selector) return SelectorEngine.findOne(selector) ? selector : null;
            return null;
        },
        getElementFromSelector(element) {
            const selector = getSelector(element);
            return selector ? SelectorEngine.findOne(selector) : null;
        },
        getMultipleElementsFromSelector(element) {
            const selector = getSelector(element);
            return selector ? SelectorEngine.find(selector) : [];
        }
    };
    const enableDismissTrigger = (component, method = "hide") => {
        const clickEvent = `click.dismiss${component.EVENT_KEY}`;
        const name = component.NAME;
        EventHandler.on(document, clickEvent, `[data-bs-dismiss="${name}"]`, (function(event) {
            if ([ "A", "AREA" ].includes(this.tagName)) event.preventDefault();
            if (isDisabled(this)) return;
            const target = SelectorEngine.getElementFromSelector(this) || this.closest(`.${name}`);
            const instance = component.getOrCreateInstance(target);
            instance[method]();
        }));
    };
    const NAME$f = "alert";
    const DATA_KEY$a = "bs.alert";
    const EVENT_KEY$b = `.${DATA_KEY$a}`;
    const EVENT_CLOSE = `close${EVENT_KEY$b}`;
    const EVENT_CLOSED = `closed${EVENT_KEY$b}`;
    const CLASS_NAME_FADE$5 = "fade";
    const CLASS_NAME_SHOW$8 = "show";
    class Alert extends BaseComponent {
        static get NAME() {
            return NAME$f;
        }
        close() {
            const closeEvent = EventHandler.trigger(this._element, EVENT_CLOSE);
            if (closeEvent.defaultPrevented) return;
            this._element.classList.remove(CLASS_NAME_SHOW$8);
            const isAnimated = this._element.classList.contains(CLASS_NAME_FADE$5);
            this._queueCallback((() => this._destroyElement()), this._element, isAnimated);
        }
        _destroyElement() {
            this._element.remove();
            EventHandler.trigger(this._element, EVENT_CLOSED);
            this.dispose();
        }
        static jQueryInterface(config) {
            return this.each((function() {
                const data = Alert.getOrCreateInstance(this);
                if (typeof config !== "string") return;
                if (data[config] === void 0 || config.startsWith("_") || config === "constructor") throw new TypeError(`No method named "${config}"`);
                data[config](this);
            }));
        }
    }
    enableDismissTrigger(Alert, "close");
    defineJQueryPlugin(Alert);
    const NAME$e = "button";
    const DATA_KEY$9 = "bs.button";
    const EVENT_KEY$a = `.${DATA_KEY$9}`;
    const DATA_API_KEY$6 = ".data-api";
    const CLASS_NAME_ACTIVE$3 = "active";
    const SELECTOR_DATA_TOGGLE$5 = '[data-bs-toggle="button"]';
    const EVENT_CLICK_DATA_API$6 = `click${EVENT_KEY$a}${DATA_API_KEY$6}`;
    class Button extends BaseComponent {
        static get NAME() {
            return NAME$e;
        }
        toggle() {
            this._element.setAttribute("aria-pressed", this._element.classList.toggle(CLASS_NAME_ACTIVE$3));
        }
        static jQueryInterface(config) {
            return this.each((function() {
                const data = Button.getOrCreateInstance(this);
                if (config === "toggle") data[config]();
            }));
        }
    }
    EventHandler.on(document, EVENT_CLICK_DATA_API$6, SELECTOR_DATA_TOGGLE$5, (event => {
        event.preventDefault();
        const button = event.target.closest(SELECTOR_DATA_TOGGLE$5);
        const data = Button.getOrCreateInstance(button);
        data.toggle();
    }));
    defineJQueryPlugin(Button);
    const NAME$d = "swipe";
    const EVENT_KEY$9 = ".bs.swipe";
    const EVENT_TOUCHSTART = `touchstart${EVENT_KEY$9}`;
    const EVENT_TOUCHMOVE = `touchmove${EVENT_KEY$9}`;
    const EVENT_TOUCHEND = `touchend${EVENT_KEY$9}`;
    const EVENT_POINTERDOWN = `pointerdown${EVENT_KEY$9}`;
    const EVENT_POINTERUP = `pointerup${EVENT_KEY$9}`;
    const POINTER_TYPE_TOUCH = "touch";
    const POINTER_TYPE_PEN = "pen";
    const CLASS_NAME_POINTER_EVENT = "pointer-event";
    const SWIPE_THRESHOLD = 40;
    const Default$c = {
        endCallback: null,
        leftCallback: null,
        rightCallback: null
    };
    const DefaultType$c = {
        endCallback: "(function|null)",
        leftCallback: "(function|null)",
        rightCallback: "(function|null)"
    };
    class Swipe extends Config {
        constructor(element, config) {
            super();
            this._element = element;
            if (!element || !Swipe.isSupported()) return;
            this._config = this._getConfig(config);
            this._deltaX = 0;
            this._supportPointerEvents = Boolean(window.PointerEvent);
            this._initEvents();
        }
        static get Default() {
            return Default$c;
        }
        static get DefaultType() {
            return DefaultType$c;
        }
        static get NAME() {
            return NAME$d;
        }
        dispose() {
            EventHandler.off(this._element, EVENT_KEY$9);
        }
        _start(event) {
            if (!this._supportPointerEvents) {
                this._deltaX = event.touches[0].clientX;
                return;
            }
            if (this._eventIsPointerPenTouch(event)) this._deltaX = event.clientX;
        }
        _end(event) {
            if (this._eventIsPointerPenTouch(event)) this._deltaX = event.clientX - this._deltaX;
            this._handleSwipe();
            execute(this._config.endCallback);
        }
        _move(event) {
            this._deltaX = event.touches && event.touches.length > 1 ? 0 : event.touches[0].clientX - this._deltaX;
        }
        _handleSwipe() {
            const absDeltaX = Math.abs(this._deltaX);
            if (absDeltaX <= SWIPE_THRESHOLD) return;
            const direction = absDeltaX / this._deltaX;
            this._deltaX = 0;
            if (!direction) return;
            execute(direction > 0 ? this._config.rightCallback : this._config.leftCallback);
        }
        _initEvents() {
            if (this._supportPointerEvents) {
                EventHandler.on(this._element, EVENT_POINTERDOWN, (event => this._start(event)));
                EventHandler.on(this._element, EVENT_POINTERUP, (event => this._end(event)));
                this._element.classList.add(CLASS_NAME_POINTER_EVENT);
            } else {
                EventHandler.on(this._element, EVENT_TOUCHSTART, (event => this._start(event)));
                EventHandler.on(this._element, EVENT_TOUCHMOVE, (event => this._move(event)));
                EventHandler.on(this._element, EVENT_TOUCHEND, (event => this._end(event)));
            }
        }
        _eventIsPointerPenTouch(event) {
            return this._supportPointerEvents && (event.pointerType === POINTER_TYPE_PEN || event.pointerType === POINTER_TYPE_TOUCH);
        }
        static isSupported() {
            return "ontouchstart" in document.documentElement || navigator.maxTouchPoints > 0;
        }
    }
    const NAME$c = "carousel";
    const DATA_KEY$8 = "bs.carousel";
    const EVENT_KEY$8 = `.${DATA_KEY$8}`;
    const DATA_API_KEY$5 = ".data-api";
    const ARROW_LEFT_KEY$1 = "ArrowLeft";
    const ARROW_RIGHT_KEY$1 = "ArrowRight";
    const TOUCHEVENT_COMPAT_WAIT = 500;
    const ORDER_NEXT = "next";
    const ORDER_PREV = "prev";
    const DIRECTION_LEFT = "left";
    const DIRECTION_RIGHT = "right";
    const EVENT_SLIDE = `slide${EVENT_KEY$8}`;
    const EVENT_SLID = `slid${EVENT_KEY$8}`;
    const EVENT_KEYDOWN$1 = `keydown${EVENT_KEY$8}`;
    const EVENT_MOUSEENTER$1 = `mouseenter${EVENT_KEY$8}`;
    const EVENT_MOUSELEAVE$1 = `mouseleave${EVENT_KEY$8}`;
    const EVENT_DRAG_START = `dragstart${EVENT_KEY$8}`;
    const EVENT_LOAD_DATA_API$3 = `load${EVENT_KEY$8}${DATA_API_KEY$5}`;
    const EVENT_CLICK_DATA_API$5 = `click${EVENT_KEY$8}${DATA_API_KEY$5}`;
    const CLASS_NAME_CAROUSEL = "carousel";
    const CLASS_NAME_ACTIVE$2 = "active";
    const CLASS_NAME_SLIDE = "slide";
    const CLASS_NAME_END = "carousel-item-end";
    const CLASS_NAME_START = "carousel-item-start";
    const CLASS_NAME_NEXT = "carousel-item-next";
    const CLASS_NAME_PREV = "carousel-item-prev";
    const SELECTOR_ACTIVE = ".active";
    const SELECTOR_ITEM = ".carousel-item";
    const SELECTOR_ACTIVE_ITEM = SELECTOR_ACTIVE + SELECTOR_ITEM;
    const SELECTOR_ITEM_IMG = ".carousel-item img";
    const SELECTOR_INDICATORS = ".carousel-indicators";
    const SELECTOR_DATA_SLIDE = "[data-bs-slide], [data-bs-slide-to]";
    const SELECTOR_DATA_RIDE = '[data-bs-ride="carousel"]';
    const KEY_TO_DIRECTION = {
        [ARROW_LEFT_KEY$1]: DIRECTION_RIGHT,
        [ARROW_RIGHT_KEY$1]: DIRECTION_LEFT
    };
    const Default$b = {
        interval: 5e3,
        keyboard: true,
        pause: "hover",
        ride: false,
        touch: true,
        wrap: true
    };
    const DefaultType$b = {
        interval: "(number|boolean)",
        keyboard: "boolean",
        pause: "(string|boolean)",
        ride: "(boolean|string)",
        touch: "boolean",
        wrap: "boolean"
    };
    class Carousel extends BaseComponent {
        constructor(element, config) {
            super(element, config);
            this._interval = null;
            this._activeElement = null;
            this._isSliding = false;
            this.touchTimeout = null;
            this._swipeHelper = null;
            this._indicatorsElement = SelectorEngine.findOne(SELECTOR_INDICATORS, this._element);
            this._addEventListeners();
            if (this._config.ride === CLASS_NAME_CAROUSEL) this.cycle();
        }
        static get Default() {
            return Default$b;
        }
        static get DefaultType() {
            return DefaultType$b;
        }
        static get NAME() {
            return NAME$c;
        }
        next() {
            this._slide(ORDER_NEXT);
        }
        nextWhenVisible() {
            if (!document.hidden && isVisible(this._element)) this.next();
        }
        prev() {
            this._slide(ORDER_PREV);
        }
        pause() {
            if (this._isSliding) triggerTransitionEnd(this._element);
            this._clearInterval();
        }
        cycle() {
            this._clearInterval();
            this._updateInterval();
            this._interval = setInterval((() => this.nextWhenVisible()), this._config.interval);
        }
        _maybeEnableCycle() {
            if (!this._config.ride) return;
            if (this._isSliding) {
                EventHandler.one(this._element, EVENT_SLID, (() => this.cycle()));
                return;
            }
            this.cycle();
        }
        to(index) {
            const items = this._getItems();
            if (index > items.length - 1 || index < 0) return;
            if (this._isSliding) {
                EventHandler.one(this._element, EVENT_SLID, (() => this.to(index)));
                return;
            }
            const activeIndex = this._getItemIndex(this._getActive());
            if (activeIndex === index) return;
            const order = index > activeIndex ? ORDER_NEXT : ORDER_PREV;
            this._slide(order, items[index]);
        }
        dispose() {
            if (this._swipeHelper) this._swipeHelper.dispose();
            super.dispose();
        }
        _configAfterMerge(config) {
            config.defaultInterval = config.interval;
            return config;
        }
        _addEventListeners() {
            if (this._config.keyboard) EventHandler.on(this._element, EVENT_KEYDOWN$1, (event => this._keydown(event)));
            if (this._config.pause === "hover") {
                EventHandler.on(this._element, EVENT_MOUSEENTER$1, (() => this.pause()));
                EventHandler.on(this._element, EVENT_MOUSELEAVE$1, (() => this._maybeEnableCycle()));
            }
            if (this._config.touch && Swipe.isSupported()) this._addTouchEventListeners();
        }
        _addTouchEventListeners() {
            for (const img of SelectorEngine.find(SELECTOR_ITEM_IMG, this._element)) EventHandler.on(img, EVENT_DRAG_START, (event => event.preventDefault()));
            const endCallBack = () => {
                if (this._config.pause !== "hover") return;
                this.pause();
                if (this.touchTimeout) clearTimeout(this.touchTimeout);
                this.touchTimeout = setTimeout((() => this._maybeEnableCycle()), TOUCHEVENT_COMPAT_WAIT + this._config.interval);
            };
            const swipeConfig = {
                leftCallback: () => this._slide(this._directionToOrder(DIRECTION_LEFT)),
                rightCallback: () => this._slide(this._directionToOrder(DIRECTION_RIGHT)),
                endCallback: endCallBack
            };
            this._swipeHelper = new Swipe(this._element, swipeConfig);
        }
        _keydown(event) {
            if (/input|textarea/i.test(event.target.tagName)) return;
            const direction = KEY_TO_DIRECTION[event.key];
            if (direction) {
                event.preventDefault();
                this._slide(this._directionToOrder(direction));
            }
        }
        _getItemIndex(element) {
            return this._getItems().indexOf(element);
        }
        _setActiveIndicatorElement(index) {
            if (!this._indicatorsElement) return;
            const activeIndicator = SelectorEngine.findOne(SELECTOR_ACTIVE, this._indicatorsElement);
            activeIndicator.classList.remove(CLASS_NAME_ACTIVE$2);
            activeIndicator.removeAttribute("aria-current");
            const newActiveIndicator = SelectorEngine.findOne(`[data-bs-slide-to="${index}"]`, this._indicatorsElement);
            if (newActiveIndicator) {
                newActiveIndicator.classList.add(CLASS_NAME_ACTIVE$2);
                newActiveIndicator.setAttribute("aria-current", "true");
            }
        }
        _updateInterval() {
            const element = this._activeElement || this._getActive();
            if (!element) return;
            const elementInterval = Number.parseInt(element.getAttribute("data-bs-interval"), 10);
            this._config.interval = elementInterval || this._config.defaultInterval;
        }
        _slide(order, element = null) {
            if (this._isSliding) return;
            const activeElement = this._getActive();
            const isNext = order === ORDER_NEXT;
            const nextElement = element || getNextActiveElement(this._getItems(), activeElement, isNext, this._config.wrap);
            if (nextElement === activeElement) return;
            const nextElementIndex = this._getItemIndex(nextElement);
            const triggerEvent = eventName => EventHandler.trigger(this._element, eventName, {
                relatedTarget: nextElement,
                direction: this._orderToDirection(order),
                from: this._getItemIndex(activeElement),
                to: nextElementIndex
            });
            const slideEvent = triggerEvent(EVENT_SLIDE);
            if (slideEvent.defaultPrevented) return;
            if (!activeElement || !nextElement) return;
            const isCycling = Boolean(this._interval);
            this.pause();
            this._isSliding = true;
            this._setActiveIndicatorElement(nextElementIndex);
            this._activeElement = nextElement;
            const directionalClassName = isNext ? CLASS_NAME_START : CLASS_NAME_END;
            const orderClassName = isNext ? CLASS_NAME_NEXT : CLASS_NAME_PREV;
            nextElement.classList.add(orderClassName);
            reflow(nextElement);
            activeElement.classList.add(directionalClassName);
            nextElement.classList.add(directionalClassName);
            const completeCallBack = () => {
                nextElement.classList.remove(directionalClassName, orderClassName);
                nextElement.classList.add(CLASS_NAME_ACTIVE$2);
                activeElement.classList.remove(CLASS_NAME_ACTIVE$2, orderClassName, directionalClassName);
                this._isSliding = false;
                triggerEvent(EVENT_SLID);
            };
            this._queueCallback(completeCallBack, activeElement, this._isAnimated());
            if (isCycling) this.cycle();
        }
        _isAnimated() {
            return this._element.classList.contains(CLASS_NAME_SLIDE);
        }
        _getActive() {
            return SelectorEngine.findOne(SELECTOR_ACTIVE_ITEM, this._element);
        }
        _getItems() {
            return SelectorEngine.find(SELECTOR_ITEM, this._element);
        }
        _clearInterval() {
            if (this._interval) {
                clearInterval(this._interval);
                this._interval = null;
            }
        }
        _directionToOrder(direction) {
            if (isRTL()) return direction === DIRECTION_LEFT ? ORDER_PREV : ORDER_NEXT;
            return direction === DIRECTION_LEFT ? ORDER_NEXT : ORDER_PREV;
        }
        _orderToDirection(order) {
            if (isRTL()) return order === ORDER_PREV ? DIRECTION_LEFT : DIRECTION_RIGHT;
            return order === ORDER_PREV ? DIRECTION_RIGHT : DIRECTION_LEFT;
        }
        static jQueryInterface(config) {
            return this.each((function() {
                const data = Carousel.getOrCreateInstance(this, config);
                if (typeof config === "number") {
                    data.to(config);
                    return;
                }
                if (typeof config === "string") {
                    if (data[config] === void 0 || config.startsWith("_") || config === "constructor") throw new TypeError(`No method named "${config}"`);
                    data[config]();
                }
            }));
        }
    }
    EventHandler.on(document, EVENT_CLICK_DATA_API$5, SELECTOR_DATA_SLIDE, (function(event) {
        const target = SelectorEngine.getElementFromSelector(this);
        if (!target || !target.classList.contains(CLASS_NAME_CAROUSEL)) return;
        event.preventDefault();
        const carousel = Carousel.getOrCreateInstance(target);
        const slideIndex = this.getAttribute("data-bs-slide-to");
        if (slideIndex) {
            carousel.to(slideIndex);
            carousel._maybeEnableCycle();
            return;
        }
        if (Manipulator.getDataAttribute(this, "slide") === "next") {
            carousel.next();
            carousel._maybeEnableCycle();
            return;
        }
        carousel.prev();
        carousel._maybeEnableCycle();
    }));
    EventHandler.on(window, EVENT_LOAD_DATA_API$3, (() => {
        const carousels = SelectorEngine.find(SELECTOR_DATA_RIDE);
        for (const carousel of carousels) Carousel.getOrCreateInstance(carousel);
    }));
    defineJQueryPlugin(Carousel);
    const NAME$b = "collapse";
    const DATA_KEY$7 = "bs.collapse";
    const EVENT_KEY$7 = `.${DATA_KEY$7}`;
    const DATA_API_KEY$4 = ".data-api";
    const EVENT_SHOW$6 = `show${EVENT_KEY$7}`;
    const EVENT_SHOWN$6 = `shown${EVENT_KEY$7}`;
    const EVENT_HIDE$6 = `hide${EVENT_KEY$7}`;
    const EVENT_HIDDEN$6 = `hidden${EVENT_KEY$7}`;
    const EVENT_CLICK_DATA_API$4 = `click${EVENT_KEY$7}${DATA_API_KEY$4}`;
    const CLASS_NAME_SHOW$7 = "show";
    const CLASS_NAME_COLLAPSE = "collapse";
    const CLASS_NAME_COLLAPSING = "collapsing";
    const CLASS_NAME_COLLAPSED = "collapsed";
    const CLASS_NAME_DEEPER_CHILDREN = `:scope .${CLASS_NAME_COLLAPSE} .${CLASS_NAME_COLLAPSE}`;
    const CLASS_NAME_HORIZONTAL = "collapse-horizontal";
    const WIDTH = "width";
    const HEIGHT = "height";
    const SELECTOR_ACTIVES = ".collapse.show, .collapse.collapsing";
    const SELECTOR_DATA_TOGGLE$4 = '[data-bs-toggle="collapse"]';
    const Default$a = {
        parent: null,
        toggle: true
    };
    const DefaultType$a = {
        parent: "(null|element)",
        toggle: "boolean"
    };
    class Collapse extends BaseComponent {
        constructor(element, config) {
            super(element, config);
            this._isTransitioning = false;
            this._triggerArray = [];
            const toggleList = SelectorEngine.find(SELECTOR_DATA_TOGGLE$4);
            for (const elem of toggleList) {
                const selector = SelectorEngine.getSelectorFromElement(elem);
                const filterElement = SelectorEngine.find(selector).filter((foundElement => foundElement === this._element));
                if (selector !== null && filterElement.length) this._triggerArray.push(elem);
            }
            this._initializeChildren();
            if (!this._config.parent) this._addAriaAndCollapsedClass(this._triggerArray, this._isShown());
            if (this._config.toggle) this.toggle();
        }
        static get Default() {
            return Default$a;
        }
        static get DefaultType() {
            return DefaultType$a;
        }
        static get NAME() {
            return NAME$b;
        }
        toggle() {
            if (this._isShown()) this.hide(); else this.show();
        }
        show() {
            if (this._isTransitioning || this._isShown()) return;
            let activeChildren = [];
            if (this._config.parent) activeChildren = this._getFirstLevelChildren(SELECTOR_ACTIVES).filter((element => element !== this._element)).map((element => Collapse.getOrCreateInstance(element, {
                toggle: false
            })));
            if (activeChildren.length && activeChildren[0]._isTransitioning) return;
            const startEvent = EventHandler.trigger(this._element, EVENT_SHOW$6);
            if (startEvent.defaultPrevented) return;
            for (const activeInstance of activeChildren) activeInstance.hide();
            const dimension = this._getDimension();
            this._element.classList.remove(CLASS_NAME_COLLAPSE);
            this._element.classList.add(CLASS_NAME_COLLAPSING);
            this._element.style[dimension] = 0;
            this._addAriaAndCollapsedClass(this._triggerArray, true);
            this._isTransitioning = true;
            const complete = () => {
                this._isTransitioning = false;
                this._element.classList.remove(CLASS_NAME_COLLAPSING);
                this._element.classList.add(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW$7);
                this._element.style[dimension] = "";
                EventHandler.trigger(this._element, EVENT_SHOWN$6);
            };
            const capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
            const scrollSize = `scroll${capitalizedDimension}`;
            this._queueCallback(complete, this._element, true);
            this._element.style[dimension] = `${this._element[scrollSize]}px`;
        }
        hide() {
            if (this._isTransitioning || !this._isShown()) return;
            const startEvent = EventHandler.trigger(this._element, EVENT_HIDE$6);
            if (startEvent.defaultPrevented) return;
            const dimension = this._getDimension();
            this._element.style[dimension] = `${this._element.getBoundingClientRect()[dimension]}px`;
            reflow(this._element);
            this._element.classList.add(CLASS_NAME_COLLAPSING);
            this._element.classList.remove(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW$7);
            for (const trigger of this._triggerArray) {
                const element = SelectorEngine.getElementFromSelector(trigger);
                if (element && !this._isShown(element)) this._addAriaAndCollapsedClass([ trigger ], false);
            }
            this._isTransitioning = true;
            const complete = () => {
                this._isTransitioning = false;
                this._element.classList.remove(CLASS_NAME_COLLAPSING);
                this._element.classList.add(CLASS_NAME_COLLAPSE);
                EventHandler.trigger(this._element, EVENT_HIDDEN$6);
            };
            this._element.style[dimension] = "";
            this._queueCallback(complete, this._element, true);
        }
        _isShown(element = this._element) {
            return element.classList.contains(CLASS_NAME_SHOW$7);
        }
        _configAfterMerge(config) {
            config.toggle = Boolean(config.toggle);
            config.parent = getElement(config.parent);
            return config;
        }
        _getDimension() {
            return this._element.classList.contains(CLASS_NAME_HORIZONTAL) ? WIDTH : HEIGHT;
        }
        _initializeChildren() {
            if (!this._config.parent) return;
            const children = this._getFirstLevelChildren(SELECTOR_DATA_TOGGLE$4);
            for (const element of children) {
                const selected = SelectorEngine.getElementFromSelector(element);
                if (selected) this._addAriaAndCollapsedClass([ element ], this._isShown(selected));
            }
        }
        _getFirstLevelChildren(selector) {
            const children = SelectorEngine.find(CLASS_NAME_DEEPER_CHILDREN, this._config.parent);
            return SelectorEngine.find(selector, this._config.parent).filter((element => !children.includes(element)));
        }
        _addAriaAndCollapsedClass(triggerArray, isOpen) {
            if (!triggerArray.length) return;
            for (const element of triggerArray) {
                element.classList.toggle(CLASS_NAME_COLLAPSED, !isOpen);
                element.setAttribute("aria-expanded", isOpen);
            }
        }
        static jQueryInterface(config) {
            const _config = {};
            if (typeof config === "string" && /show|hide/.test(config)) _config.toggle = false;
            return this.each((function() {
                const data = Collapse.getOrCreateInstance(this, _config);
                if (typeof config === "string") {
                    if (typeof data[config] === "undefined") throw new TypeError(`No method named "${config}"`);
                    data[config]();
                }
            }));
        }
    }
    EventHandler.on(document, EVENT_CLICK_DATA_API$4, SELECTOR_DATA_TOGGLE$4, (function(event) {
        if (event.target.tagName === "A" || event.delegateTarget && event.delegateTarget.tagName === "A") event.preventDefault();
        for (const element of SelectorEngine.getMultipleElementsFromSelector(this)) Collapse.getOrCreateInstance(element, {
            toggle: false
        }).toggle();
    }));
    defineJQueryPlugin(Collapse);
    const NAME$a = "dropdown";
    const DATA_KEY$6 = "bs.dropdown";
    const EVENT_KEY$6 = `.${DATA_KEY$6}`;
    const DATA_API_KEY$3 = ".data-api";
    const ESCAPE_KEY$2 = "Escape";
    const TAB_KEY$1 = "Tab";
    const ARROW_UP_KEY$1 = "ArrowUp";
    const ARROW_DOWN_KEY$1 = "ArrowDown";
    const RIGHT_MOUSE_BUTTON = 2;
    const EVENT_HIDE$5 = `hide${EVENT_KEY$6}`;
    const EVENT_HIDDEN$5 = `hidden${EVENT_KEY$6}`;
    const EVENT_SHOW$5 = `show${EVENT_KEY$6}`;
    const EVENT_SHOWN$5 = `shown${EVENT_KEY$6}`;
    const EVENT_CLICK_DATA_API$3 = `click${EVENT_KEY$6}${DATA_API_KEY$3}`;
    const EVENT_KEYDOWN_DATA_API = `keydown${EVENT_KEY$6}${DATA_API_KEY$3}`;
    const EVENT_KEYUP_DATA_API = `keyup${EVENT_KEY$6}${DATA_API_KEY$3}`;
    const CLASS_NAME_SHOW$6 = "show";
    const CLASS_NAME_DROPUP = "dropup";
    const CLASS_NAME_DROPEND = "dropend";
    const CLASS_NAME_DROPSTART = "dropstart";
    const CLASS_NAME_DROPUP_CENTER = "dropup-center";
    const CLASS_NAME_DROPDOWN_CENTER = "dropdown-center";
    const SELECTOR_DATA_TOGGLE$3 = '[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled)';
    const SELECTOR_DATA_TOGGLE_SHOWN = `${SELECTOR_DATA_TOGGLE$3}.${CLASS_NAME_SHOW$6}`;
    const SELECTOR_MENU = ".dropdown-menu";
    const SELECTOR_NAVBAR = ".navbar";
    const SELECTOR_NAVBAR_NAV = ".navbar-nav";
    const SELECTOR_VISIBLE_ITEMS = ".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)";
    const PLACEMENT_TOP = isRTL() ? "top-end" : "top-start";
    const PLACEMENT_TOPEND = isRTL() ? "top-start" : "top-end";
    const PLACEMENT_BOTTOM = isRTL() ? "bottom-end" : "bottom-start";
    const PLACEMENT_BOTTOMEND = isRTL() ? "bottom-start" : "bottom-end";
    const PLACEMENT_RIGHT = isRTL() ? "left-start" : "right-start";
    const PLACEMENT_LEFT = isRTL() ? "right-start" : "left-start";
    const PLACEMENT_TOPCENTER = "top";
    const PLACEMENT_BOTTOMCENTER = "bottom";
    const Default$9 = {
        autoClose: true,
        boundary: "clippingParents",
        display: "dynamic",
        offset: [ 0, 2 ],
        popperConfig: null,
        reference: "toggle"
    };
    const DefaultType$9 = {
        autoClose: "(boolean|string)",
        boundary: "(string|element)",
        display: "string",
        offset: "(array|string|function)",
        popperConfig: "(null|object|function)",
        reference: "(string|element|object)"
    };
    class Dropdown extends BaseComponent {
        constructor(element, config) {
            super(element, config);
            this._popper = null;
            this._parent = this._element.parentNode;
            this._menu = SelectorEngine.next(this._element, SELECTOR_MENU)[0] || SelectorEngine.prev(this._element, SELECTOR_MENU)[0] || SelectorEngine.findOne(SELECTOR_MENU, this._parent);
            this._inNavbar = this._detectNavbar();
        }
        static get Default() {
            return Default$9;
        }
        static get DefaultType() {
            return DefaultType$9;
        }
        static get NAME() {
            return NAME$a;
        }
        toggle() {
            return this._isShown() ? this.hide() : this.show();
        }
        show() {
            if (isDisabled(this._element) || this._isShown()) return;
            const relatedTarget = {
                relatedTarget: this._element
            };
            const showEvent = EventHandler.trigger(this._element, EVENT_SHOW$5, relatedTarget);
            if (showEvent.defaultPrevented) return;
            this._createPopper();
            if ("ontouchstart" in document.documentElement && !this._parent.closest(SELECTOR_NAVBAR_NAV)) for (const element of [].concat(...document.body.children)) EventHandler.on(element, "mouseover", noop);
            this._element.focus();
            this._element.setAttribute("aria-expanded", true);
            this._menu.classList.add(CLASS_NAME_SHOW$6);
            this._element.classList.add(CLASS_NAME_SHOW$6);
            EventHandler.trigger(this._element, EVENT_SHOWN$5, relatedTarget);
        }
        hide() {
            if (isDisabled(this._element) || !this._isShown()) return;
            const relatedTarget = {
                relatedTarget: this._element
            };
            this._completeHide(relatedTarget);
        }
        dispose() {
            if (this._popper) this._popper.destroy();
            super.dispose();
        }
        update() {
            this._inNavbar = this._detectNavbar();
            if (this._popper) this._popper.update();
        }
        _completeHide(relatedTarget) {
            const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE$5, relatedTarget);
            if (hideEvent.defaultPrevented) return;
            if ("ontouchstart" in document.documentElement) for (const element of [].concat(...document.body.children)) EventHandler.off(element, "mouseover", noop);
            if (this._popper) this._popper.destroy();
            this._menu.classList.remove(CLASS_NAME_SHOW$6);
            this._element.classList.remove(CLASS_NAME_SHOW$6);
            this._element.setAttribute("aria-expanded", "false");
            Manipulator.removeDataAttribute(this._menu, "popper");
            EventHandler.trigger(this._element, EVENT_HIDDEN$5, relatedTarget);
        }
        _getConfig(config) {
            config = super._getConfig(config);
            if (typeof config.reference === "object" && !bootstrap_esm_isElement(config.reference) && typeof config.reference.getBoundingClientRect !== "function") throw new TypeError(`${NAME$a.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`);
            return config;
        }
        _createPopper() {
            if (typeof lib_namespaceObject === "undefined") throw new TypeError("Bootstrap's dropdowns require Popper (https://popper.js.org)");
            let referenceElement = this._element;
            if (this._config.reference === "parent") referenceElement = this._parent; else if (bootstrap_esm_isElement(this._config.reference)) referenceElement = getElement(this._config.reference); else if (typeof this._config.reference === "object") referenceElement = this._config.reference;
            const popperConfig = this._getPopperConfig();
            this._popper = popper_createPopper(referenceElement, this._menu, popperConfig);
        }
        _isShown() {
            return this._menu.classList.contains(CLASS_NAME_SHOW$6);
        }
        _getPlacement() {
            const parentDropdown = this._parent;
            if (parentDropdown.classList.contains(CLASS_NAME_DROPEND)) return PLACEMENT_RIGHT;
            if (parentDropdown.classList.contains(CLASS_NAME_DROPSTART)) return PLACEMENT_LEFT;
            if (parentDropdown.classList.contains(CLASS_NAME_DROPUP_CENTER)) return PLACEMENT_TOPCENTER;
            if (parentDropdown.classList.contains(CLASS_NAME_DROPDOWN_CENTER)) return PLACEMENT_BOTTOMCENTER;
            const isEnd = getComputedStyle(this._menu).getPropertyValue("--bs-position").trim() === "end";
            if (parentDropdown.classList.contains(CLASS_NAME_DROPUP)) return isEnd ? PLACEMENT_TOPEND : PLACEMENT_TOP;
            return isEnd ? PLACEMENT_BOTTOMEND : PLACEMENT_BOTTOM;
        }
        _detectNavbar() {
            return this._element.closest(SELECTOR_NAVBAR) !== null;
        }
        _getOffset() {
            const {offset} = this._config;
            if (typeof offset === "string") return offset.split(",").map((value => Number.parseInt(value, 10)));
            if (typeof offset === "function") return popperData => offset(popperData, this._element);
            return offset;
        }
        _getPopperConfig() {
            const defaultBsPopperConfig = {
                placement: this._getPlacement(),
                modifiers: [ {
                    name: "preventOverflow",
                    options: {
                        boundary: this._config.boundary
                    }
                }, {
                    name: "offset",
                    options: {
                        offset: this._getOffset()
                    }
                } ]
            };
            if (this._inNavbar || this._config.display === "static") {
                Manipulator.setDataAttribute(this._menu, "popper", "static");
                defaultBsPopperConfig.modifiers = [ {
                    name: "applyStyles",
                    enabled: false
                } ];
            }
            return {
                ...defaultBsPopperConfig,
                ...execute(this._config.popperConfig, [ defaultBsPopperConfig ])
            };
        }
        _selectMenuItem({key, target}) {
            const items = SelectorEngine.find(SELECTOR_VISIBLE_ITEMS, this._menu).filter((element => isVisible(element)));
            if (!items.length) return;
            getNextActiveElement(items, target, key === ARROW_DOWN_KEY$1, !items.includes(target)).focus();
        }
        static jQueryInterface(config) {
            return this.each((function() {
                const data = Dropdown.getOrCreateInstance(this, config);
                if (typeof config !== "string") return;
                if (typeof data[config] === "undefined") throw new TypeError(`No method named "${config}"`);
                data[config]();
            }));
        }
        static clearMenus(event) {
            if (event.button === RIGHT_MOUSE_BUTTON || event.type === "keyup" && event.key !== TAB_KEY$1) return;
            const openToggles = SelectorEngine.find(SELECTOR_DATA_TOGGLE_SHOWN);
            for (const toggle of openToggles) {
                const context = Dropdown.getInstance(toggle);
                if (!context || context._config.autoClose === false) continue;
                const composedPath = event.composedPath();
                const isMenuTarget = composedPath.includes(context._menu);
                if (composedPath.includes(context._element) || context._config.autoClose === "inside" && !isMenuTarget || context._config.autoClose === "outside" && isMenuTarget) continue;
                if (context._menu.contains(event.target) && (event.type === "keyup" && event.key === TAB_KEY$1 || /input|select|option|textarea|form/i.test(event.target.tagName))) continue;
                const relatedTarget = {
                    relatedTarget: context._element
                };
                if (event.type === "click") relatedTarget.clickEvent = event;
                context._completeHide(relatedTarget);
            }
        }
        static dataApiKeydownHandler(event) {
            const isInput = /input|textarea/i.test(event.target.tagName);
            const isEscapeEvent = event.key === ESCAPE_KEY$2;
            const isUpOrDownEvent = [ ARROW_UP_KEY$1, ARROW_DOWN_KEY$1 ].includes(event.key);
            if (!isUpOrDownEvent && !isEscapeEvent) return;
            if (isInput && !isEscapeEvent) return;
            event.preventDefault();
            const getToggleButton = this.matches(SELECTOR_DATA_TOGGLE$3) ? this : SelectorEngine.prev(this, SELECTOR_DATA_TOGGLE$3)[0] || SelectorEngine.next(this, SELECTOR_DATA_TOGGLE$3)[0] || SelectorEngine.findOne(SELECTOR_DATA_TOGGLE$3, event.delegateTarget.parentNode);
            const instance = Dropdown.getOrCreateInstance(getToggleButton);
            if (isUpOrDownEvent) {
                event.stopPropagation();
                instance.show();
                instance._selectMenuItem(event);
                return;
            }
            if (instance._isShown()) {
                event.stopPropagation();
                instance.hide();
                getToggleButton.focus();
            }
        }
    }
    EventHandler.on(document, EVENT_KEYDOWN_DATA_API, SELECTOR_DATA_TOGGLE$3, Dropdown.dataApiKeydownHandler);
    EventHandler.on(document, EVENT_KEYDOWN_DATA_API, SELECTOR_MENU, Dropdown.dataApiKeydownHandler);
    EventHandler.on(document, EVENT_CLICK_DATA_API$3, Dropdown.clearMenus);
    EventHandler.on(document, EVENT_KEYUP_DATA_API, Dropdown.clearMenus);
    EventHandler.on(document, EVENT_CLICK_DATA_API$3, SELECTOR_DATA_TOGGLE$3, (function(event) {
        event.preventDefault();
        Dropdown.getOrCreateInstance(this).toggle();
    }));
    defineJQueryPlugin(Dropdown);
    const NAME$9 = "backdrop";
    const CLASS_NAME_FADE$4 = "fade";
    const CLASS_NAME_SHOW$5 = "show";
    const EVENT_MOUSEDOWN = `mousedown.bs.${NAME$9}`;
    const Default$8 = {
        className: "modal-backdrop",
        clickCallback: null,
        isAnimated: false,
        isVisible: true,
        rootElement: "body"
    };
    const DefaultType$8 = {
        className: "string",
        clickCallback: "(function|null)",
        isAnimated: "boolean",
        isVisible: "boolean",
        rootElement: "(element|string)"
    };
    class Backdrop extends Config {
        constructor(config) {
            super();
            this._config = this._getConfig(config);
            this._isAppended = false;
            this._element = null;
        }
        static get Default() {
            return Default$8;
        }
        static get DefaultType() {
            return DefaultType$8;
        }
        static get NAME() {
            return NAME$9;
        }
        show(callback) {
            if (!this._config.isVisible) {
                execute(callback);
                return;
            }
            this._append();
            const element = this._getElement();
            if (this._config.isAnimated) reflow(element);
            element.classList.add(CLASS_NAME_SHOW$5);
            this._emulateAnimation((() => {
                execute(callback);
            }));
        }
        hide(callback) {
            if (!this._config.isVisible) {
                execute(callback);
                return;
            }
            this._getElement().classList.remove(CLASS_NAME_SHOW$5);
            this._emulateAnimation((() => {
                this.dispose();
                execute(callback);
            }));
        }
        dispose() {
            if (!this._isAppended) return;
            EventHandler.off(this._element, EVENT_MOUSEDOWN);
            this._element.remove();
            this._isAppended = false;
        }
        _getElement() {
            if (!this._element) {
                const backdrop = document.createElement("div");
                backdrop.className = this._config.className;
                if (this._config.isAnimated) backdrop.classList.add(CLASS_NAME_FADE$4);
                this._element = backdrop;
            }
            return this._element;
        }
        _configAfterMerge(config) {
            config.rootElement = getElement(config.rootElement);
            return config;
        }
        _append() {
            if (this._isAppended) return;
            const element = this._getElement();
            this._config.rootElement.append(element);
            EventHandler.on(element, EVENT_MOUSEDOWN, (() => {
                execute(this._config.clickCallback);
            }));
            this._isAppended = true;
        }
        _emulateAnimation(callback) {
            executeAfterTransition(callback, this._getElement(), this._config.isAnimated);
        }
    }
    const NAME$8 = "focustrap";
    const DATA_KEY$5 = "bs.focustrap";
    const EVENT_KEY$5 = `.${DATA_KEY$5}`;
    const EVENT_FOCUSIN$2 = `focusin${EVENT_KEY$5}`;
    const EVENT_KEYDOWN_TAB = `keydown.tab${EVENT_KEY$5}`;
    const TAB_KEY = "Tab";
    const TAB_NAV_FORWARD = "forward";
    const TAB_NAV_BACKWARD = "backward";
    const Default$7 = {
        autofocus: true,
        trapElement: null
    };
    const DefaultType$7 = {
        autofocus: "boolean",
        trapElement: "element"
    };
    class FocusTrap extends Config {
        constructor(config) {
            super();
            this._config = this._getConfig(config);
            this._isActive = false;
            this._lastTabNavDirection = null;
        }
        static get Default() {
            return Default$7;
        }
        static get DefaultType() {
            return DefaultType$7;
        }
        static get NAME() {
            return NAME$8;
        }
        activate() {
            if (this._isActive) return;
            if (this._config.autofocus) this._config.trapElement.focus();
            EventHandler.off(document, EVENT_KEY$5);
            EventHandler.on(document, EVENT_FOCUSIN$2, (event => this._handleFocusin(event)));
            EventHandler.on(document, EVENT_KEYDOWN_TAB, (event => this._handleKeydown(event)));
            this._isActive = true;
        }
        deactivate() {
            if (!this._isActive) return;
            this._isActive = false;
            EventHandler.off(document, EVENT_KEY$5);
        }
        _handleFocusin(event) {
            const {trapElement} = this._config;
            if (event.target === document || event.target === trapElement || trapElement.contains(event.target)) return;
            const elements = SelectorEngine.focusableChildren(trapElement);
            if (elements.length === 0) trapElement.focus(); else if (this._lastTabNavDirection === TAB_NAV_BACKWARD) elements[elements.length - 1].focus(); else elements[0].focus();
        }
        _handleKeydown(event) {
            if (event.key !== TAB_KEY) return;
            this._lastTabNavDirection = event.shiftKey ? TAB_NAV_BACKWARD : TAB_NAV_FORWARD;
        }
    }
    const SELECTOR_FIXED_CONTENT = ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top";
    const SELECTOR_STICKY_CONTENT = ".sticky-top";
    const PROPERTY_PADDING = "padding-right";
    const PROPERTY_MARGIN = "margin-right";
    class ScrollBarHelper {
        constructor() {
            this._element = document.body;
        }
        getWidth() {
            const documentWidth = document.documentElement.clientWidth;
            return Math.abs(window.innerWidth - documentWidth);
        }
        hide() {
            const width = this.getWidth();
            this._disableOverFlow();
            this._setElementAttributes(this._element, PROPERTY_PADDING, (calculatedValue => calculatedValue + width));
            this._setElementAttributes(SELECTOR_FIXED_CONTENT, PROPERTY_PADDING, (calculatedValue => calculatedValue + width));
            this._setElementAttributes(SELECTOR_STICKY_CONTENT, PROPERTY_MARGIN, (calculatedValue => calculatedValue - width));
        }
        reset() {
            this._resetElementAttributes(this._element, "overflow");
            this._resetElementAttributes(this._element, PROPERTY_PADDING);
            this._resetElementAttributes(SELECTOR_FIXED_CONTENT, PROPERTY_PADDING);
            this._resetElementAttributes(SELECTOR_STICKY_CONTENT, PROPERTY_MARGIN);
        }
        isOverflowing() {
            return this.getWidth() > 0;
        }
        _disableOverFlow() {
            this._saveInitialAttribute(this._element, "overflow");
            this._element.style.overflow = "hidden";
        }
        _setElementAttributes(selector, styleProperty, callback) {
            const scrollbarWidth = this.getWidth();
            const manipulationCallBack = element => {
                if (element !== this._element && window.innerWidth > element.clientWidth + scrollbarWidth) return;
                this._saveInitialAttribute(element, styleProperty);
                const calculatedValue = window.getComputedStyle(element).getPropertyValue(styleProperty);
                element.style.setProperty(styleProperty, `${callback(Number.parseFloat(calculatedValue))}px`);
            };
            this._applyManipulationCallback(selector, manipulationCallBack);
        }
        _saveInitialAttribute(element, styleProperty) {
            const actualValue = element.style.getPropertyValue(styleProperty);
            if (actualValue) Manipulator.setDataAttribute(element, styleProperty, actualValue);
        }
        _resetElementAttributes(selector, styleProperty) {
            const manipulationCallBack = element => {
                const value = Manipulator.getDataAttribute(element, styleProperty);
                if (value === null) {
                    element.style.removeProperty(styleProperty);
                    return;
                }
                Manipulator.removeDataAttribute(element, styleProperty);
                element.style.setProperty(styleProperty, value);
            };
            this._applyManipulationCallback(selector, manipulationCallBack);
        }
        _applyManipulationCallback(selector, callBack) {
            if (bootstrap_esm_isElement(selector)) {
                callBack(selector);
                return;
            }
            for (const sel of SelectorEngine.find(selector, this._element)) callBack(sel);
        }
    }
    const NAME$7 = "modal";
    const DATA_KEY$4 = "bs.modal";
    const EVENT_KEY$4 = `.${DATA_KEY$4}`;
    const DATA_API_KEY$2 = ".data-api";
    const ESCAPE_KEY$1 = "Escape";
    const EVENT_HIDE$4 = `hide${EVENT_KEY$4}`;
    const EVENT_HIDE_PREVENTED$1 = `hidePrevented${EVENT_KEY$4}`;
    const EVENT_HIDDEN$4 = `hidden${EVENT_KEY$4}`;
    const EVENT_SHOW$4 = `show${EVENT_KEY$4}`;
    const EVENT_SHOWN$4 = `shown${EVENT_KEY$4}`;
    const EVENT_RESIZE$1 = `resize${EVENT_KEY$4}`;
    const EVENT_CLICK_DISMISS = `click.dismiss${EVENT_KEY$4}`;
    const EVENT_MOUSEDOWN_DISMISS = `mousedown.dismiss${EVENT_KEY$4}`;
    const EVENT_KEYDOWN_DISMISS$1 = `keydown.dismiss${EVENT_KEY$4}`;
    const EVENT_CLICK_DATA_API$2 = `click${EVENT_KEY$4}${DATA_API_KEY$2}`;
    const CLASS_NAME_OPEN = "modal-open";
    const CLASS_NAME_FADE$3 = "fade";
    const CLASS_NAME_SHOW$4 = "show";
    const CLASS_NAME_STATIC = "modal-static";
    const OPEN_SELECTOR$1 = ".modal.show";
    const SELECTOR_DIALOG = ".modal-dialog";
    const SELECTOR_MODAL_BODY = ".modal-body";
    const SELECTOR_DATA_TOGGLE$2 = '[data-bs-toggle="modal"]';
    const Default$6 = {
        backdrop: true,
        focus: true,
        keyboard: true
    };
    const DefaultType$6 = {
        backdrop: "(boolean|string)",
        focus: "boolean",
        keyboard: "boolean"
    };
    class Modal extends BaseComponent {
        constructor(element, config) {
            super(element, config);
            this._dialog = SelectorEngine.findOne(SELECTOR_DIALOG, this._element);
            this._backdrop = this._initializeBackDrop();
            this._focustrap = this._initializeFocusTrap();
            this._isShown = false;
            this._isTransitioning = false;
            this._scrollBar = new ScrollBarHelper;
            this._addEventListeners();
        }
        static get Default() {
            return Default$6;
        }
        static get DefaultType() {
            return DefaultType$6;
        }
        static get NAME() {
            return NAME$7;
        }
        toggle(relatedTarget) {
            return this._isShown ? this.hide() : this.show(relatedTarget);
        }
        show(relatedTarget) {
            if (this._isShown || this._isTransitioning) return;
            const showEvent = EventHandler.trigger(this._element, EVENT_SHOW$4, {
                relatedTarget
            });
            if (showEvent.defaultPrevented) return;
            this._isShown = true;
            this._isTransitioning = true;
            this._scrollBar.hide();
            document.body.classList.add(CLASS_NAME_OPEN);
            this._adjustDialog();
            this._backdrop.show((() => this._showElement(relatedTarget)));
        }
        hide() {
            if (!this._isShown || this._isTransitioning) return;
            const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE$4);
            if (hideEvent.defaultPrevented) return;
            this._isShown = false;
            this._isTransitioning = true;
            this._focustrap.deactivate();
            this._element.classList.remove(CLASS_NAME_SHOW$4);
            this._queueCallback((() => this._hideModal()), this._element, this._isAnimated());
        }
        dispose() {
            EventHandler.off(window, EVENT_KEY$4);
            EventHandler.off(this._dialog, EVENT_KEY$4);
            this._backdrop.dispose();
            this._focustrap.deactivate();
            super.dispose();
        }
        handleUpdate() {
            this._adjustDialog();
        }
        _initializeBackDrop() {
            return new Backdrop({
                isVisible: Boolean(this._config.backdrop),
                isAnimated: this._isAnimated()
            });
        }
        _initializeFocusTrap() {
            return new FocusTrap({
                trapElement: this._element
            });
        }
        _showElement(relatedTarget) {
            if (!document.body.contains(this._element)) document.body.append(this._element);
            this._element.style.display = "block";
            this._element.removeAttribute("aria-hidden");
            this._element.setAttribute("aria-modal", true);
            this._element.setAttribute("role", "dialog");
            this._element.scrollTop = 0;
            const modalBody = SelectorEngine.findOne(SELECTOR_MODAL_BODY, this._dialog);
            if (modalBody) modalBody.scrollTop = 0;
            reflow(this._element);
            this._element.classList.add(CLASS_NAME_SHOW$4);
            const transitionComplete = () => {
                if (this._config.focus) this._focustrap.activate();
                this._isTransitioning = false;
                EventHandler.trigger(this._element, EVENT_SHOWN$4, {
                    relatedTarget
                });
            };
            this._queueCallback(transitionComplete, this._dialog, this._isAnimated());
        }
        _addEventListeners() {
            EventHandler.on(this._element, EVENT_KEYDOWN_DISMISS$1, (event => {
                if (event.key !== ESCAPE_KEY$1) return;
                if (this._config.keyboard) {
                    this.hide();
                    return;
                }
                this._triggerBackdropTransition();
            }));
            EventHandler.on(window, EVENT_RESIZE$1, (() => {
                if (this._isShown && !this._isTransitioning) this._adjustDialog();
            }));
            EventHandler.on(this._element, EVENT_MOUSEDOWN_DISMISS, (event => {
                EventHandler.one(this._element, EVENT_CLICK_DISMISS, (event2 => {
                    if (this._element !== event.target || this._element !== event2.target) return;
                    if (this._config.backdrop === "static") {
                        this._triggerBackdropTransition();
                        return;
                    }
                    if (this._config.backdrop) this.hide();
                }));
            }));
        }
        _hideModal() {
            this._element.style.display = "none";
            this._element.setAttribute("aria-hidden", true);
            this._element.removeAttribute("aria-modal");
            this._element.removeAttribute("role");
            this._isTransitioning = false;
            this._backdrop.hide((() => {
                document.body.classList.remove(CLASS_NAME_OPEN);
                this._resetAdjustments();
                this._scrollBar.reset();
                EventHandler.trigger(this._element, EVENT_HIDDEN$4);
            }));
        }
        _isAnimated() {
            return this._element.classList.contains(CLASS_NAME_FADE$3);
        }
        _triggerBackdropTransition() {
            const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE_PREVENTED$1);
            if (hideEvent.defaultPrevented) return;
            const isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;
            const initialOverflowY = this._element.style.overflowY;
            if (initialOverflowY === "hidden" || this._element.classList.contains(CLASS_NAME_STATIC)) return;
            if (!isModalOverflowing) this._element.style.overflowY = "hidden";
            this._element.classList.add(CLASS_NAME_STATIC);
            this._queueCallback((() => {
                this._element.classList.remove(CLASS_NAME_STATIC);
                this._queueCallback((() => {
                    this._element.style.overflowY = initialOverflowY;
                }), this._dialog);
            }), this._dialog);
            this._element.focus();
        }
        _adjustDialog() {
            const isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;
            const scrollbarWidth = this._scrollBar.getWidth();
            const isBodyOverflowing = scrollbarWidth > 0;
            if (isBodyOverflowing && !isModalOverflowing) {
                const property = isRTL() ? "paddingLeft" : "paddingRight";
                this._element.style[property] = `${scrollbarWidth}px`;
            }
            if (!isBodyOverflowing && isModalOverflowing) {
                const property = isRTL() ? "paddingRight" : "paddingLeft";
                this._element.style[property] = `${scrollbarWidth}px`;
            }
        }
        _resetAdjustments() {
            this._element.style.paddingLeft = "";
            this._element.style.paddingRight = "";
        }
        static jQueryInterface(config, relatedTarget) {
            return this.each((function() {
                const data = Modal.getOrCreateInstance(this, config);
                if (typeof config !== "string") return;
                if (typeof data[config] === "undefined") throw new TypeError(`No method named "${config}"`);
                data[config](relatedTarget);
            }));
        }
    }
    EventHandler.on(document, EVENT_CLICK_DATA_API$2, SELECTOR_DATA_TOGGLE$2, (function(event) {
        const target = SelectorEngine.getElementFromSelector(this);
        if ([ "A", "AREA" ].includes(this.tagName)) event.preventDefault();
        EventHandler.one(target, EVENT_SHOW$4, (showEvent => {
            if (showEvent.defaultPrevented) return;
            EventHandler.one(target, EVENT_HIDDEN$4, (() => {
                if (isVisible(this)) this.focus();
            }));
        }));
        const alreadyOpen = SelectorEngine.findOne(OPEN_SELECTOR$1);
        if (alreadyOpen) Modal.getInstance(alreadyOpen).hide();
        const data = Modal.getOrCreateInstance(target);
        data.toggle(this);
    }));
    enableDismissTrigger(Modal);
    defineJQueryPlugin(Modal);
    const NAME$6 = "offcanvas";
    const DATA_KEY$3 = "bs.offcanvas";
    const EVENT_KEY$3 = `.${DATA_KEY$3}`;
    const DATA_API_KEY$1 = ".data-api";
    const EVENT_LOAD_DATA_API$2 = `load${EVENT_KEY$3}${DATA_API_KEY$1}`;
    const ESCAPE_KEY = "Escape";
    const CLASS_NAME_SHOW$3 = "show";
    const CLASS_NAME_SHOWING$1 = "showing";
    const CLASS_NAME_HIDING = "hiding";
    const CLASS_NAME_BACKDROP = "offcanvas-backdrop";
    const OPEN_SELECTOR = ".offcanvas.show";
    const EVENT_SHOW$3 = `show${EVENT_KEY$3}`;
    const EVENT_SHOWN$3 = `shown${EVENT_KEY$3}`;
    const EVENT_HIDE$3 = `hide${EVENT_KEY$3}`;
    const EVENT_HIDE_PREVENTED = `hidePrevented${EVENT_KEY$3}`;
    const EVENT_HIDDEN$3 = `hidden${EVENT_KEY$3}`;
    const EVENT_RESIZE = `resize${EVENT_KEY$3}`;
    const EVENT_CLICK_DATA_API$1 = `click${EVENT_KEY$3}${DATA_API_KEY$1}`;
    const EVENT_KEYDOWN_DISMISS = `keydown.dismiss${EVENT_KEY$3}`;
    const SELECTOR_DATA_TOGGLE$1 = '[data-bs-toggle="offcanvas"]';
    const Default$5 = {
        backdrop: true,
        keyboard: true,
        scroll: false
    };
    const DefaultType$5 = {
        backdrop: "(boolean|string)",
        keyboard: "boolean",
        scroll: "boolean"
    };
    class Offcanvas extends BaseComponent {
        constructor(element, config) {
            super(element, config);
            this._isShown = false;
            this._backdrop = this._initializeBackDrop();
            this._focustrap = this._initializeFocusTrap();
            this._addEventListeners();
        }
        static get Default() {
            return Default$5;
        }
        static get DefaultType() {
            return DefaultType$5;
        }
        static get NAME() {
            return NAME$6;
        }
        toggle(relatedTarget) {
            return this._isShown ? this.hide() : this.show(relatedTarget);
        }
        show(relatedTarget) {
            if (this._isShown) return;
            const showEvent = EventHandler.trigger(this._element, EVENT_SHOW$3, {
                relatedTarget
            });
            if (showEvent.defaultPrevented) return;
            this._isShown = true;
            this._backdrop.show();
            if (!this._config.scroll) (new ScrollBarHelper).hide();
            this._element.setAttribute("aria-modal", true);
            this._element.setAttribute("role", "dialog");
            this._element.classList.add(CLASS_NAME_SHOWING$1);
            const completeCallBack = () => {
                if (!this._config.scroll || this._config.backdrop) this._focustrap.activate();
                this._element.classList.add(CLASS_NAME_SHOW$3);
                this._element.classList.remove(CLASS_NAME_SHOWING$1);
                EventHandler.trigger(this._element, EVENT_SHOWN$3, {
                    relatedTarget
                });
            };
            this._queueCallback(completeCallBack, this._element, true);
        }
        hide() {
            if (!this._isShown) return;
            const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE$3);
            if (hideEvent.defaultPrevented) return;
            this._focustrap.deactivate();
            this._element.blur();
            this._isShown = false;
            this._element.classList.add(CLASS_NAME_HIDING);
            this._backdrop.hide();
            const completeCallback = () => {
                this._element.classList.remove(CLASS_NAME_SHOW$3, CLASS_NAME_HIDING);
                this._element.removeAttribute("aria-modal");
                this._element.removeAttribute("role");
                if (!this._config.scroll) (new ScrollBarHelper).reset();
                EventHandler.trigger(this._element, EVENT_HIDDEN$3);
            };
            this._queueCallback(completeCallback, this._element, true);
        }
        dispose() {
            this._backdrop.dispose();
            this._focustrap.deactivate();
            super.dispose();
        }
        _initializeBackDrop() {
            const clickCallback = () => {
                if (this._config.backdrop === "static") {
                    EventHandler.trigger(this._element, EVENT_HIDE_PREVENTED);
                    return;
                }
                this.hide();
            };
            const isVisible = Boolean(this._config.backdrop);
            return new Backdrop({
                className: CLASS_NAME_BACKDROP,
                isVisible,
                isAnimated: true,
                rootElement: this._element.parentNode,
                clickCallback: isVisible ? clickCallback : null
            });
        }
        _initializeFocusTrap() {
            return new FocusTrap({
                trapElement: this._element
            });
        }
        _addEventListeners() {
            EventHandler.on(this._element, EVENT_KEYDOWN_DISMISS, (event => {
                if (event.key !== ESCAPE_KEY) return;
                if (this._config.keyboard) {
                    this.hide();
                    return;
                }
                EventHandler.trigger(this._element, EVENT_HIDE_PREVENTED);
            }));
        }
        static jQueryInterface(config) {
            return this.each((function() {
                const data = Offcanvas.getOrCreateInstance(this, config);
                if (typeof config !== "string") return;
                if (data[config] === void 0 || config.startsWith("_") || config === "constructor") throw new TypeError(`No method named "${config}"`);
                data[config](this);
            }));
        }
    }
    EventHandler.on(document, EVENT_CLICK_DATA_API$1, SELECTOR_DATA_TOGGLE$1, (function(event) {
        const target = SelectorEngine.getElementFromSelector(this);
        if ([ "A", "AREA" ].includes(this.tagName)) event.preventDefault();
        if (isDisabled(this)) return;
        EventHandler.one(target, EVENT_HIDDEN$3, (() => {
            if (isVisible(this)) this.focus();
        }));
        const alreadyOpen = SelectorEngine.findOne(OPEN_SELECTOR);
        if (alreadyOpen && alreadyOpen !== target) Offcanvas.getInstance(alreadyOpen).hide();
        const data = Offcanvas.getOrCreateInstance(target);
        data.toggle(this);
    }));
    EventHandler.on(window, EVENT_LOAD_DATA_API$2, (() => {
        for (const selector of SelectorEngine.find(OPEN_SELECTOR)) Offcanvas.getOrCreateInstance(selector).show();
    }));
    EventHandler.on(window, EVENT_RESIZE, (() => {
        for (const element of SelectorEngine.find("[aria-modal][class*=show][class*=offcanvas-]")) if (getComputedStyle(element).position !== "fixed") Offcanvas.getOrCreateInstance(element).hide();
    }));
    enableDismissTrigger(Offcanvas);
    defineJQueryPlugin(Offcanvas);
    const ARIA_ATTRIBUTE_PATTERN = /^aria-[\w-]*$/i;
    const DefaultAllowlist = {
        "*": [ "class", "dir", "id", "lang", "role", ARIA_ATTRIBUTE_PATTERN ],
        a: [ "target", "href", "title", "rel" ],
        area: [],
        b: [],
        br: [],
        col: [],
        code: [],
        div: [],
        em: [],
        hr: [],
        h1: [],
        h2: [],
        h3: [],
        h4: [],
        h5: [],
        h6: [],
        i: [],
        img: [ "src", "srcset", "alt", "title", "width", "height" ],
        li: [],
        ol: [],
        p: [],
        pre: [],
        s: [],
        small: [],
        span: [],
        sub: [],
        sup: [],
        strong: [],
        u: [],
        ul: []
    };
    const uriAttributes = new Set([ "background", "cite", "href", "itemtype", "longdesc", "poster", "src", "xlink:href" ]);
    const SAFE_URL_PATTERN = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:/?#]*(?:[/?#]|$))/i;
    const allowedAttribute = (attribute, allowedAttributeList) => {
        const attributeName = attribute.nodeName.toLowerCase();
        if (allowedAttributeList.includes(attributeName)) {
            if (uriAttributes.has(attributeName)) return Boolean(SAFE_URL_PATTERN.test(attribute.nodeValue));
            return true;
        }
        return allowedAttributeList.filter((attributeRegex => attributeRegex instanceof RegExp)).some((regex => regex.test(attributeName)));
    };
    function sanitizeHtml(unsafeHtml, allowList, sanitizeFunction) {
        if (!unsafeHtml.length) return unsafeHtml;
        if (sanitizeFunction && typeof sanitizeFunction === "function") return sanitizeFunction(unsafeHtml);
        const domParser = new window.DOMParser;
        const createdDocument = domParser.parseFromString(unsafeHtml, "text/html");
        const elements = [].concat(...createdDocument.body.querySelectorAll("*"));
        for (const element of elements) {
            const elementName = element.nodeName.toLowerCase();
            if (!Object.keys(allowList).includes(elementName)) {
                element.remove();
                continue;
            }
            const attributeList = [].concat(...element.attributes);
            const allowedAttributes = [].concat(allowList["*"] || [], allowList[elementName] || []);
            for (const attribute of attributeList) if (!allowedAttribute(attribute, allowedAttributes)) element.removeAttribute(attribute.nodeName);
        }
        return createdDocument.body.innerHTML;
    }
    const NAME$5 = "TemplateFactory";
    const Default$4 = {
        allowList: DefaultAllowlist,
        content: {},
        extraClass: "",
        html: false,
        sanitize: true,
        sanitizeFn: null,
        template: "<div></div>"
    };
    const DefaultType$4 = {
        allowList: "object",
        content: "object",
        extraClass: "(string|function)",
        html: "boolean",
        sanitize: "boolean",
        sanitizeFn: "(null|function)",
        template: "string"
    };
    const DefaultContentType = {
        entry: "(string|element|function|null)",
        selector: "(string|element)"
    };
    class TemplateFactory extends Config {
        constructor(config) {
            super();
            this._config = this._getConfig(config);
        }
        static get Default() {
            return Default$4;
        }
        static get DefaultType() {
            return DefaultType$4;
        }
        static get NAME() {
            return NAME$5;
        }
        getContent() {
            return Object.values(this._config.content).map((config => this._resolvePossibleFunction(config))).filter(Boolean);
        }
        hasContent() {
            return this.getContent().length > 0;
        }
        changeContent(content) {
            this._checkContent(content);
            this._config.content = {
                ...this._config.content,
                ...content
            };
            return this;
        }
        toHtml() {
            const templateWrapper = document.createElement("div");
            templateWrapper.innerHTML = this._maybeSanitize(this._config.template);
            for (const [selector, text] of Object.entries(this._config.content)) this._setContent(templateWrapper, text, selector);
            const template = templateWrapper.children[0];
            const extraClass = this._resolvePossibleFunction(this._config.extraClass);
            if (extraClass) template.classList.add(...extraClass.split(" "));
            return template;
        }
        _typeCheckConfig(config) {
            super._typeCheckConfig(config);
            this._checkContent(config.content);
        }
        _checkContent(arg) {
            for (const [selector, content] of Object.entries(arg)) super._typeCheckConfig({
                selector,
                entry: content
            }, DefaultContentType);
        }
        _setContent(template, content, selector) {
            const templateElement = SelectorEngine.findOne(selector, template);
            if (!templateElement) return;
            content = this._resolvePossibleFunction(content);
            if (!content) {
                templateElement.remove();
                return;
            }
            if (bootstrap_esm_isElement(content)) {
                this._putElementInTemplate(getElement(content), templateElement);
                return;
            }
            if (this._config.html) {
                templateElement.innerHTML = this._maybeSanitize(content);
                return;
            }
            templateElement.textContent = content;
        }
        _maybeSanitize(arg) {
            return this._config.sanitize ? sanitizeHtml(arg, this._config.allowList, this._config.sanitizeFn) : arg;
        }
        _resolvePossibleFunction(arg) {
            return execute(arg, [ this ]);
        }
        _putElementInTemplate(element, templateElement) {
            if (this._config.html) {
                templateElement.innerHTML = "";
                templateElement.append(element);
                return;
            }
            templateElement.textContent = element.textContent;
        }
    }
    const NAME$4 = "tooltip";
    const DISALLOWED_ATTRIBUTES = new Set([ "sanitize", "allowList", "sanitizeFn" ]);
    const CLASS_NAME_FADE$2 = "fade";
    const CLASS_NAME_MODAL = "modal";
    const CLASS_NAME_SHOW$2 = "show";
    const SELECTOR_TOOLTIP_INNER = ".tooltip-inner";
    const SELECTOR_MODAL = `.${CLASS_NAME_MODAL}`;
    const EVENT_MODAL_HIDE = "hide.bs.modal";
    const TRIGGER_HOVER = "hover";
    const TRIGGER_FOCUS = "focus";
    const TRIGGER_CLICK = "click";
    const TRIGGER_MANUAL = "manual";
    const EVENT_HIDE$2 = "hide";
    const EVENT_HIDDEN$2 = "hidden";
    const EVENT_SHOW$2 = "show";
    const EVENT_SHOWN$2 = "shown";
    const EVENT_INSERTED = "inserted";
    const EVENT_CLICK$1 = "click";
    const EVENT_FOCUSIN$1 = "focusin";
    const EVENT_FOCUSOUT$1 = "focusout";
    const EVENT_MOUSEENTER = "mouseenter";
    const EVENT_MOUSELEAVE = "mouseleave";
    const AttachmentMap = {
        AUTO: "auto",
        TOP: "top",
        RIGHT: isRTL() ? "left" : "right",
        BOTTOM: "bottom",
        LEFT: isRTL() ? "right" : "left"
    };
    const Default$3 = {
        allowList: DefaultAllowlist,
        animation: true,
        boundary: "clippingParents",
        container: false,
        customClass: "",
        delay: 0,
        fallbackPlacements: [ "top", "right", "bottom", "left" ],
        html: false,
        offset: [ 0, 6 ],
        placement: "top",
        popperConfig: null,
        sanitize: true,
        sanitizeFn: null,
        selector: false,
        template: '<div class="tooltip" role="tooltip">' + '<div class="tooltip-arrow"></div>' + '<div class="tooltip-inner"></div>' + "</div>",
        title: "",
        trigger: "hover focus"
    };
    const DefaultType$3 = {
        allowList: "object",
        animation: "boolean",
        boundary: "(string|element)",
        container: "(string|element|boolean)",
        customClass: "(string|function)",
        delay: "(number|object)",
        fallbackPlacements: "array",
        html: "boolean",
        offset: "(array|string|function)",
        placement: "(string|function)",
        popperConfig: "(null|object|function)",
        sanitize: "boolean",
        sanitizeFn: "(null|function)",
        selector: "(string|boolean)",
        template: "string",
        title: "(string|element|function)",
        trigger: "string"
    };
    class Tooltip extends BaseComponent {
        constructor(element, config) {
            if (typeof lib_namespaceObject === "undefined") throw new TypeError("Bootstrap's tooltips require Popper (https://popper.js.org)");
            super(element, config);
            this._isEnabled = true;
            this._timeout = 0;
            this._isHovered = null;
            this._activeTrigger = {};
            this._popper = null;
            this._templateFactory = null;
            this._newContent = null;
            this.tip = null;
            this._setListeners();
            if (!this._config.selector) this._fixTitle();
        }
        static get Default() {
            return Default$3;
        }
        static get DefaultType() {
            return DefaultType$3;
        }
        static get NAME() {
            return NAME$4;
        }
        enable() {
            this._isEnabled = true;
        }
        disable() {
            this._isEnabled = false;
        }
        toggleEnabled() {
            this._isEnabled = !this._isEnabled;
        }
        toggle() {
            if (!this._isEnabled) return;
            this._activeTrigger.click = !this._activeTrigger.click;
            if (this._isShown()) {
                this._leave();
                return;
            }
            this._enter();
        }
        dispose() {
            clearTimeout(this._timeout);
            EventHandler.off(this._element.closest(SELECTOR_MODAL), EVENT_MODAL_HIDE, this._hideModalHandler);
            if (this._element.getAttribute("data-bs-original-title")) this._element.setAttribute("title", this._element.getAttribute("data-bs-original-title"));
            this._disposePopper();
            super.dispose();
        }
        show() {
            if (this._element.style.display === "none") throw new Error("Please use show on visible elements");
            if (!(this._isWithContent() && this._isEnabled)) return;
            const showEvent = EventHandler.trigger(this._element, this.constructor.eventName(EVENT_SHOW$2));
            const shadowRoot = findShadowRoot(this._element);
            const isInTheDom = (shadowRoot || this._element.ownerDocument.documentElement).contains(this._element);
            if (showEvent.defaultPrevented || !isInTheDom) return;
            this._disposePopper();
            const tip = this._getTipElement();
            this._element.setAttribute("aria-describedby", tip.getAttribute("id"));
            const {container} = this._config;
            if (!this._element.ownerDocument.documentElement.contains(this.tip)) {
                container.append(tip);
                EventHandler.trigger(this._element, this.constructor.eventName(EVENT_INSERTED));
            }
            this._popper = this._createPopper(tip);
            tip.classList.add(CLASS_NAME_SHOW$2);
            if ("ontouchstart" in document.documentElement) for (const element of [].concat(...document.body.children)) EventHandler.on(element, "mouseover", noop);
            const complete = () => {
                EventHandler.trigger(this._element, this.constructor.eventName(EVENT_SHOWN$2));
                if (this._isHovered === false) this._leave();
                this._isHovered = false;
            };
            this._queueCallback(complete, this.tip, this._isAnimated());
        }
        hide() {
            if (!this._isShown()) return;
            const hideEvent = EventHandler.trigger(this._element, this.constructor.eventName(EVENT_HIDE$2));
            if (hideEvent.defaultPrevented) return;
            const tip = this._getTipElement();
            tip.classList.remove(CLASS_NAME_SHOW$2);
            if ("ontouchstart" in document.documentElement) for (const element of [].concat(...document.body.children)) EventHandler.off(element, "mouseover", noop);
            this._activeTrigger[TRIGGER_CLICK] = false;
            this._activeTrigger[TRIGGER_FOCUS] = false;
            this._activeTrigger[TRIGGER_HOVER] = false;
            this._isHovered = null;
            const complete = () => {
                if (this._isWithActiveTrigger()) return;
                if (!this._isHovered) this._disposePopper();
                this._element.removeAttribute("aria-describedby");
                EventHandler.trigger(this._element, this.constructor.eventName(EVENT_HIDDEN$2));
            };
            this._queueCallback(complete, this.tip, this._isAnimated());
        }
        update() {
            if (this._popper) this._popper.update();
        }
        _isWithContent() {
            return Boolean(this._getTitle());
        }
        _getTipElement() {
            if (!this.tip) this.tip = this._createTipElement(this._newContent || this._getContentForTemplate());
            return this.tip;
        }
        _createTipElement(content) {
            const tip = this._getTemplateFactory(content).toHtml();
            if (!tip) return null;
            tip.classList.remove(CLASS_NAME_FADE$2, CLASS_NAME_SHOW$2);
            tip.classList.add(`bs-${this.constructor.NAME}-auto`);
            const tipId = getUID(this.constructor.NAME).toString();
            tip.setAttribute("id", tipId);
            if (this._isAnimated()) tip.classList.add(CLASS_NAME_FADE$2);
            return tip;
        }
        setContent(content) {
            this._newContent = content;
            if (this._isShown()) {
                this._disposePopper();
                this.show();
            }
        }
        _getTemplateFactory(content) {
            if (this._templateFactory) this._templateFactory.changeContent(content); else this._templateFactory = new TemplateFactory({
                ...this._config,
                content,
                extraClass: this._resolvePossibleFunction(this._config.customClass)
            });
            return this._templateFactory;
        }
        _getContentForTemplate() {
            return {
                [SELECTOR_TOOLTIP_INNER]: this._getTitle()
            };
        }
        _getTitle() {
            return this._resolvePossibleFunction(this._config.title) || this._element.getAttribute("data-bs-original-title");
        }
        _initializeOnDelegatedTarget(event) {
            return this.constructor.getOrCreateInstance(event.delegateTarget, this._getDelegateConfig());
        }
        _isAnimated() {
            return this._config.animation || this.tip && this.tip.classList.contains(CLASS_NAME_FADE$2);
        }
        _isShown() {
            return this.tip && this.tip.classList.contains(CLASS_NAME_SHOW$2);
        }
        _createPopper(tip) {
            const placement = execute(this._config.placement, [ this, tip, this._element ]);
            const attachment = AttachmentMap[placement.toUpperCase()];
            return popper_createPopper(this._element, tip, this._getPopperConfig(attachment));
        }
        _getOffset() {
            const {offset} = this._config;
            if (typeof offset === "string") return offset.split(",").map((value => Number.parseInt(value, 10)));
            if (typeof offset === "function") return popperData => offset(popperData, this._element);
            return offset;
        }
        _resolvePossibleFunction(arg) {
            return execute(arg, [ this._element ]);
        }
        _getPopperConfig(attachment) {
            const defaultBsPopperConfig = {
                placement: attachment,
                modifiers: [ {
                    name: "flip",
                    options: {
                        fallbackPlacements: this._config.fallbackPlacements
                    }
                }, {
                    name: "offset",
                    options: {
                        offset: this._getOffset()
                    }
                }, {
                    name: "preventOverflow",
                    options: {
                        boundary: this._config.boundary
                    }
                }, {
                    name: "arrow",
                    options: {
                        element: `.${this.constructor.NAME}-arrow`
                    }
                }, {
                    name: "preSetPlacement",
                    enabled: true,
                    phase: "beforeMain",
                    fn: data => {
                        this._getTipElement().setAttribute("data-popper-placement", data.state.placement);
                    }
                } ]
            };
            return {
                ...defaultBsPopperConfig,
                ...execute(this._config.popperConfig, [ defaultBsPopperConfig ])
            };
        }
        _setListeners() {
            const triggers = this._config.trigger.split(" ");
            for (const trigger of triggers) if (trigger === "click") EventHandler.on(this._element, this.constructor.eventName(EVENT_CLICK$1), this._config.selector, (event => {
                const context = this._initializeOnDelegatedTarget(event);
                context.toggle();
            })); else if (trigger !== TRIGGER_MANUAL) {
                const eventIn = trigger === TRIGGER_HOVER ? this.constructor.eventName(EVENT_MOUSEENTER) : this.constructor.eventName(EVENT_FOCUSIN$1);
                const eventOut = trigger === TRIGGER_HOVER ? this.constructor.eventName(EVENT_MOUSELEAVE) : this.constructor.eventName(EVENT_FOCUSOUT$1);
                EventHandler.on(this._element, eventIn, this._config.selector, (event => {
                    const context = this._initializeOnDelegatedTarget(event);
                    context._activeTrigger[event.type === "focusin" ? TRIGGER_FOCUS : TRIGGER_HOVER] = true;
                    context._enter();
                }));
                EventHandler.on(this._element, eventOut, this._config.selector, (event => {
                    const context = this._initializeOnDelegatedTarget(event);
                    context._activeTrigger[event.type === "focusout" ? TRIGGER_FOCUS : TRIGGER_HOVER] = context._element.contains(event.relatedTarget);
                    context._leave();
                }));
            }
            this._hideModalHandler = () => {
                if (this._element) this.hide();
            };
            EventHandler.on(this._element.closest(SELECTOR_MODAL), EVENT_MODAL_HIDE, this._hideModalHandler);
        }
        _fixTitle() {
            const title = this._element.getAttribute("title");
            if (!title) return;
            if (!this._element.getAttribute("aria-label") && !this._element.textContent.trim()) this._element.setAttribute("aria-label", title);
            this._element.setAttribute("data-bs-original-title", title);
            this._element.removeAttribute("title");
        }
        _enter() {
            if (this._isShown() || this._isHovered) {
                this._isHovered = true;
                return;
            }
            this._isHovered = true;
            this._setTimeout((() => {
                if (this._isHovered) this.show();
            }), this._config.delay.show);
        }
        _leave() {
            if (this._isWithActiveTrigger()) return;
            this._isHovered = false;
            this._setTimeout((() => {
                if (!this._isHovered) this.hide();
            }), this._config.delay.hide);
        }
        _setTimeout(handler, timeout) {
            clearTimeout(this._timeout);
            this._timeout = setTimeout(handler, timeout);
        }
        _isWithActiveTrigger() {
            return Object.values(this._activeTrigger).includes(true);
        }
        _getConfig(config) {
            const dataAttributes = Manipulator.getDataAttributes(this._element);
            for (const dataAttribute of Object.keys(dataAttributes)) if (DISALLOWED_ATTRIBUTES.has(dataAttribute)) delete dataAttributes[dataAttribute];
            config = {
                ...dataAttributes,
                ...typeof config === "object" && config ? config : {}
            };
            config = this._mergeConfigObj(config);
            config = this._configAfterMerge(config);
            this._typeCheckConfig(config);
            return config;
        }
        _configAfterMerge(config) {
            config.container = config.container === false ? document.body : getElement(config.container);
            if (typeof config.delay === "number") config.delay = {
                show: config.delay,
                hide: config.delay
            };
            if (typeof config.title === "number") config.title = config.title.toString();
            if (typeof config.content === "number") config.content = config.content.toString();
            return config;
        }
        _getDelegateConfig() {
            const config = {};
            for (const [key, value] of Object.entries(this._config)) if (this.constructor.Default[key] !== value) config[key] = value;
            config.selector = false;
            config.trigger = "manual";
            return config;
        }
        _disposePopper() {
            if (this._popper) {
                this._popper.destroy();
                this._popper = null;
            }
            if (this.tip) {
                this.tip.remove();
                this.tip = null;
            }
        }
        static jQueryInterface(config) {
            return this.each((function() {
                const data = Tooltip.getOrCreateInstance(this, config);
                if (typeof config !== "string") return;
                if (typeof data[config] === "undefined") throw new TypeError(`No method named "${config}"`);
                data[config]();
            }));
        }
    }
    defineJQueryPlugin(Tooltip);
    const NAME$3 = "popover";
    const SELECTOR_TITLE = ".popover-header";
    const SELECTOR_CONTENT = ".popover-body";
    const Default$2 = {
        ...Tooltip.Default,
        content: "",
        offset: [ 0, 8 ],
        placement: "right",
        template: '<div class="popover" role="tooltip">' + '<div class="popover-arrow"></div>' + '<h3 class="popover-header"></h3>' + '<div class="popover-body"></div>' + "</div>",
        trigger: "click"
    };
    const DefaultType$2 = {
        ...Tooltip.DefaultType,
        content: "(null|string|element|function)"
    };
    class Popover extends Tooltip {
        static get Default() {
            return Default$2;
        }
        static get DefaultType() {
            return DefaultType$2;
        }
        static get NAME() {
            return NAME$3;
        }
        _isWithContent() {
            return this._getTitle() || this._getContent();
        }
        _getContentForTemplate() {
            return {
                [SELECTOR_TITLE]: this._getTitle(),
                [SELECTOR_CONTENT]: this._getContent()
            };
        }
        _getContent() {
            return this._resolvePossibleFunction(this._config.content);
        }
        static jQueryInterface(config) {
            return this.each((function() {
                const data = Popover.getOrCreateInstance(this, config);
                if (typeof config !== "string") return;
                if (typeof data[config] === "undefined") throw new TypeError(`No method named "${config}"`);
                data[config]();
            }));
        }
    }
    defineJQueryPlugin(Popover);
    const NAME$2 = "scrollspy";
    const DATA_KEY$2 = "bs.scrollspy";
    const EVENT_KEY$2 = `.${DATA_KEY$2}`;
    const DATA_API_KEY = ".data-api";
    const EVENT_ACTIVATE = `activate${EVENT_KEY$2}`;
    const EVENT_CLICK = `click${EVENT_KEY$2}`;
    const EVENT_LOAD_DATA_API$1 = `load${EVENT_KEY$2}${DATA_API_KEY}`;
    const CLASS_NAME_DROPDOWN_ITEM = "dropdown-item";
    const CLASS_NAME_ACTIVE$1 = "active";
    const SELECTOR_DATA_SPY = '[data-bs-spy="scroll"]';
    const SELECTOR_TARGET_LINKS = "[href]";
    const SELECTOR_NAV_LIST_GROUP = ".nav, .list-group";
    const SELECTOR_NAV_LINKS = ".nav-link";
    const SELECTOR_NAV_ITEMS = ".nav-item";
    const SELECTOR_LIST_ITEMS = ".list-group-item";
    const SELECTOR_LINK_ITEMS = `${SELECTOR_NAV_LINKS}, ${SELECTOR_NAV_ITEMS} > ${SELECTOR_NAV_LINKS}, ${SELECTOR_LIST_ITEMS}`;
    const SELECTOR_DROPDOWN = ".dropdown";
    const SELECTOR_DROPDOWN_TOGGLE$1 = ".dropdown-toggle";
    const Default$1 = {
        offset: null,
        rootMargin: "0px 0px -25%",
        smoothScroll: false,
        target: null,
        threshold: [ .1, .5, 1 ]
    };
    const DefaultType$1 = {
        offset: "(number|null)",
        rootMargin: "string",
        smoothScroll: "boolean",
        target: "element",
        threshold: "array"
    };
    class ScrollSpy extends BaseComponent {
        constructor(element, config) {
            super(element, config);
            this._targetLinks = new Map;
            this._observableSections = new Map;
            this._rootElement = getComputedStyle(this._element).overflowY === "visible" ? null : this._element;
            this._activeTarget = null;
            this._observer = null;
            this._previousScrollData = {
                visibleEntryTop: 0,
                parentScrollTop: 0
            };
            this.refresh();
        }
        static get Default() {
            return Default$1;
        }
        static get DefaultType() {
            return DefaultType$1;
        }
        static get NAME() {
            return NAME$2;
        }
        refresh() {
            this._initializeTargetsAndObservables();
            this._maybeEnableSmoothScroll();
            if (this._observer) this._observer.disconnect(); else this._observer = this._getNewObserver();
            for (const section of this._observableSections.values()) this._observer.observe(section);
        }
        dispose() {
            this._observer.disconnect();
            super.dispose();
        }
        _configAfterMerge(config) {
            config.target = getElement(config.target) || document.body;
            config.rootMargin = config.offset ? `${config.offset}px 0px -30%` : config.rootMargin;
            if (typeof config.threshold === "string") config.threshold = config.threshold.split(",").map((value => Number.parseFloat(value)));
            return config;
        }
        _maybeEnableSmoothScroll() {
            if (!this._config.smoothScroll) return;
            EventHandler.off(this._config.target, EVENT_CLICK);
            EventHandler.on(this._config.target, EVENT_CLICK, SELECTOR_TARGET_LINKS, (event => {
                const observableSection = this._observableSections.get(event.target.hash);
                if (observableSection) {
                    event.preventDefault();
                    const root = this._rootElement || window;
                    const height = observableSection.offsetTop - this._element.offsetTop;
                    if (root.scrollTo) {
                        root.scrollTo({
                            top: height,
                            behavior: "smooth"
                        });
                        return;
                    }
                    root.scrollTop = height;
                }
            }));
        }
        _getNewObserver() {
            const options = {
                root: this._rootElement,
                threshold: this._config.threshold,
                rootMargin: this._config.rootMargin
            };
            return new IntersectionObserver((entries => this._observerCallback(entries)), options);
        }
        _observerCallback(entries) {
            const targetElement = entry => this._targetLinks.get(`#${entry.target.id}`);
            const activate = entry => {
                this._previousScrollData.visibleEntryTop = entry.target.offsetTop;
                this._process(targetElement(entry));
            };
            const parentScrollTop = (this._rootElement || document.documentElement).scrollTop;
            const userScrollsDown = parentScrollTop >= this._previousScrollData.parentScrollTop;
            this._previousScrollData.parentScrollTop = parentScrollTop;
            for (const entry of entries) {
                if (!entry.isIntersecting) {
                    this._activeTarget = null;
                    this._clearActiveClass(targetElement(entry));
                    continue;
                }
                const entryIsLowerThanPrevious = entry.target.offsetTop >= this._previousScrollData.visibleEntryTop;
                if (userScrollsDown && entryIsLowerThanPrevious) {
                    activate(entry);
                    if (!parentScrollTop) return;
                    continue;
                }
                if (!userScrollsDown && !entryIsLowerThanPrevious) activate(entry);
            }
        }
        _initializeTargetsAndObservables() {
            this._targetLinks = new Map;
            this._observableSections = new Map;
            const targetLinks = SelectorEngine.find(SELECTOR_TARGET_LINKS, this._config.target);
            for (const anchor of targetLinks) {
                if (!anchor.hash || isDisabled(anchor)) continue;
                const observableSection = SelectorEngine.findOne(decodeURI(anchor.hash), this._element);
                if (isVisible(observableSection)) {
                    this._targetLinks.set(decodeURI(anchor.hash), anchor);
                    this._observableSections.set(anchor.hash, observableSection);
                }
            }
        }
        _process(target) {
            if (this._activeTarget === target) return;
            this._clearActiveClass(this._config.target);
            this._activeTarget = target;
            target.classList.add(CLASS_NAME_ACTIVE$1);
            this._activateParents(target);
            EventHandler.trigger(this._element, EVENT_ACTIVATE, {
                relatedTarget: target
            });
        }
        _activateParents(target) {
            if (target.classList.contains(CLASS_NAME_DROPDOWN_ITEM)) {
                SelectorEngine.findOne(SELECTOR_DROPDOWN_TOGGLE$1, target.closest(SELECTOR_DROPDOWN)).classList.add(CLASS_NAME_ACTIVE$1);
                return;
            }
            for (const listGroup of SelectorEngine.parents(target, SELECTOR_NAV_LIST_GROUP)) for (const item of SelectorEngine.prev(listGroup, SELECTOR_LINK_ITEMS)) item.classList.add(CLASS_NAME_ACTIVE$1);
        }
        _clearActiveClass(parent) {
            parent.classList.remove(CLASS_NAME_ACTIVE$1);
            const activeNodes = SelectorEngine.find(`${SELECTOR_TARGET_LINKS}.${CLASS_NAME_ACTIVE$1}`, parent);
            for (const node of activeNodes) node.classList.remove(CLASS_NAME_ACTIVE$1);
        }
        static jQueryInterface(config) {
            return this.each((function() {
                const data = ScrollSpy.getOrCreateInstance(this, config);
                if (typeof config !== "string") return;
                if (data[config] === void 0 || config.startsWith("_") || config === "constructor") throw new TypeError(`No method named "${config}"`);
                data[config]();
            }));
        }
    }
    EventHandler.on(window, EVENT_LOAD_DATA_API$1, (() => {
        for (const spy of SelectorEngine.find(SELECTOR_DATA_SPY)) ScrollSpy.getOrCreateInstance(spy);
    }));
    defineJQueryPlugin(ScrollSpy);
    const NAME$1 = "tab";
    const DATA_KEY$1 = "bs.tab";
    const EVENT_KEY$1 = `.${DATA_KEY$1}`;
    const EVENT_HIDE$1 = `hide${EVENT_KEY$1}`;
    const EVENT_HIDDEN$1 = `hidden${EVENT_KEY$1}`;
    const EVENT_SHOW$1 = `show${EVENT_KEY$1}`;
    const EVENT_SHOWN$1 = `shown${EVENT_KEY$1}`;
    const EVENT_CLICK_DATA_API = `click${EVENT_KEY$1}`;
    const EVENT_KEYDOWN = `keydown${EVENT_KEY$1}`;
    const EVENT_LOAD_DATA_API = `load${EVENT_KEY$1}`;
    const ARROW_LEFT_KEY = "ArrowLeft";
    const ARROW_RIGHT_KEY = "ArrowRight";
    const ARROW_UP_KEY = "ArrowUp";
    const ARROW_DOWN_KEY = "ArrowDown";
    const CLASS_NAME_ACTIVE = "active";
    const CLASS_NAME_FADE$1 = "fade";
    const CLASS_NAME_SHOW$1 = "show";
    const CLASS_DROPDOWN = "dropdown";
    const SELECTOR_DROPDOWN_TOGGLE = ".dropdown-toggle";
    const SELECTOR_DROPDOWN_MENU = ".dropdown-menu";
    const NOT_SELECTOR_DROPDOWN_TOGGLE = ":not(.dropdown-toggle)";
    const SELECTOR_TAB_PANEL = '.list-group, .nav, [role="tablist"]';
    const SELECTOR_OUTER = ".nav-item, .list-group-item";
    const SELECTOR_INNER = `.nav-link${NOT_SELECTOR_DROPDOWN_TOGGLE}, .list-group-item${NOT_SELECTOR_DROPDOWN_TOGGLE}, [role="tab"]${NOT_SELECTOR_DROPDOWN_TOGGLE}`;
    const SELECTOR_DATA_TOGGLE = '[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]';
    const SELECTOR_INNER_ELEM = `${SELECTOR_INNER}, ${SELECTOR_DATA_TOGGLE}`;
    const SELECTOR_DATA_TOGGLE_ACTIVE = `.${CLASS_NAME_ACTIVE}[data-bs-toggle="tab"], .${CLASS_NAME_ACTIVE}[data-bs-toggle="pill"], .${CLASS_NAME_ACTIVE}[data-bs-toggle="list"]`;
    class Tab extends BaseComponent {
        constructor(element) {
            super(element);
            this._parent = this._element.closest(SELECTOR_TAB_PANEL);
            if (!this._parent) return;
            this._setInitialAttributes(this._parent, this._getChildren());
            EventHandler.on(this._element, EVENT_KEYDOWN, (event => this._keydown(event)));
        }
        static get NAME() {
            return NAME$1;
        }
        show() {
            const innerElem = this._element;
            if (this._elemIsActive(innerElem)) return;
            const active = this._getActiveElem();
            const hideEvent = active ? EventHandler.trigger(active, EVENT_HIDE$1, {
                relatedTarget: innerElem
            }) : null;
            const showEvent = EventHandler.trigger(innerElem, EVENT_SHOW$1, {
                relatedTarget: active
            });
            if (showEvent.defaultPrevented || hideEvent && hideEvent.defaultPrevented) return;
            this._deactivate(active, innerElem);
            this._activate(innerElem, active);
        }
        _activate(element, relatedElem) {
            if (!element) return;
            element.classList.add(CLASS_NAME_ACTIVE);
            this._activate(SelectorEngine.getElementFromSelector(element));
            const complete = () => {
                if (element.getAttribute("role") !== "tab") {
                    element.classList.add(CLASS_NAME_SHOW$1);
                    return;
                }
                element.removeAttribute("tabindex");
                element.setAttribute("aria-selected", true);
                this._toggleDropDown(element, true);
                EventHandler.trigger(element, EVENT_SHOWN$1, {
                    relatedTarget: relatedElem
                });
            };
            this._queueCallback(complete, element, element.classList.contains(CLASS_NAME_FADE$1));
        }
        _deactivate(element, relatedElem) {
            if (!element) return;
            element.classList.remove(CLASS_NAME_ACTIVE);
            element.blur();
            this._deactivate(SelectorEngine.getElementFromSelector(element));
            const complete = () => {
                if (element.getAttribute("role") !== "tab") {
                    element.classList.remove(CLASS_NAME_SHOW$1);
                    return;
                }
                element.setAttribute("aria-selected", false);
                element.setAttribute("tabindex", "-1");
                this._toggleDropDown(element, false);
                EventHandler.trigger(element, EVENT_HIDDEN$1, {
                    relatedTarget: relatedElem
                });
            };
            this._queueCallback(complete, element, element.classList.contains(CLASS_NAME_FADE$1));
        }
        _keydown(event) {
            if (![ ARROW_LEFT_KEY, ARROW_RIGHT_KEY, ARROW_UP_KEY, ARROW_DOWN_KEY ].includes(event.key)) return;
            event.stopPropagation();
            event.preventDefault();
            const isNext = [ ARROW_RIGHT_KEY, ARROW_DOWN_KEY ].includes(event.key);
            const nextActiveElement = getNextActiveElement(this._getChildren().filter((element => !isDisabled(element))), event.target, isNext, true);
            if (nextActiveElement) {
                nextActiveElement.focus({
                    preventScroll: true
                });
                Tab.getOrCreateInstance(nextActiveElement).show();
            }
        }
        _getChildren() {
            return SelectorEngine.find(SELECTOR_INNER_ELEM, this._parent);
        }
        _getActiveElem() {
            return this._getChildren().find((child => this._elemIsActive(child))) || null;
        }
        _setInitialAttributes(parent, children) {
            this._setAttributeIfNotExists(parent, "role", "tablist");
            for (const child of children) this._setInitialAttributesOnChild(child);
        }
        _setInitialAttributesOnChild(child) {
            child = this._getInnerElement(child);
            const isActive = this._elemIsActive(child);
            const outerElem = this._getOuterElement(child);
            child.setAttribute("aria-selected", isActive);
            if (outerElem !== child) this._setAttributeIfNotExists(outerElem, "role", "presentation");
            if (!isActive) child.setAttribute("tabindex", "-1");
            this._setAttributeIfNotExists(child, "role", "tab");
            this._setInitialAttributesOnTargetPanel(child);
        }
        _setInitialAttributesOnTargetPanel(child) {
            const target = SelectorEngine.getElementFromSelector(child);
            if (!target) return;
            this._setAttributeIfNotExists(target, "role", "tabpanel");
            if (child.id) this._setAttributeIfNotExists(target, "aria-labelledby", `${child.id}`);
        }
        _toggleDropDown(element, open) {
            const outerElem = this._getOuterElement(element);
            if (!outerElem.classList.contains(CLASS_DROPDOWN)) return;
            const toggle = (selector, className) => {
                const element = SelectorEngine.findOne(selector, outerElem);
                if (element) element.classList.toggle(className, open);
            };
            toggle(SELECTOR_DROPDOWN_TOGGLE, CLASS_NAME_ACTIVE);
            toggle(SELECTOR_DROPDOWN_MENU, CLASS_NAME_SHOW$1);
            outerElem.setAttribute("aria-expanded", open);
        }
        _setAttributeIfNotExists(element, attribute, value) {
            if (!element.hasAttribute(attribute)) element.setAttribute(attribute, value);
        }
        _elemIsActive(elem) {
            return elem.classList.contains(CLASS_NAME_ACTIVE);
        }
        _getInnerElement(elem) {
            return elem.matches(SELECTOR_INNER_ELEM) ? elem : SelectorEngine.findOne(SELECTOR_INNER_ELEM, elem);
        }
        _getOuterElement(elem) {
            return elem.closest(SELECTOR_OUTER) || elem;
        }
        static jQueryInterface(config) {
            return this.each((function() {
                const data = Tab.getOrCreateInstance(this);
                if (typeof config !== "string") return;
                if (data[config] === void 0 || config.startsWith("_") || config === "constructor") throw new TypeError(`No method named "${config}"`);
                data[config]();
            }));
        }
    }
    EventHandler.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, (function(event) {
        if ([ "A", "AREA" ].includes(this.tagName)) event.preventDefault();
        if (isDisabled(this)) return;
        Tab.getOrCreateInstance(this).show();
    }));
    EventHandler.on(window, EVENT_LOAD_DATA_API, (() => {
        for (const element of SelectorEngine.find(SELECTOR_DATA_TOGGLE_ACTIVE)) Tab.getOrCreateInstance(element);
    }));
    defineJQueryPlugin(Tab);
    const NAME = "toast";
    const DATA_KEY = "bs.toast";
    const EVENT_KEY = `.${DATA_KEY}`;
    const EVENT_MOUSEOVER = `mouseover${EVENT_KEY}`;
    const EVENT_MOUSEOUT = `mouseout${EVENT_KEY}`;
    const EVENT_FOCUSIN = `focusin${EVENT_KEY}`;
    const EVENT_FOCUSOUT = `focusout${EVENT_KEY}`;
    const EVENT_HIDE = `hide${EVENT_KEY}`;
    const EVENT_HIDDEN = `hidden${EVENT_KEY}`;
    const EVENT_SHOW = `show${EVENT_KEY}`;
    const EVENT_SHOWN = `shown${EVENT_KEY}`;
    const CLASS_NAME_FADE = "fade";
    const CLASS_NAME_HIDE = "hide";
    const CLASS_NAME_SHOW = "show";
    const CLASS_NAME_SHOWING = "showing";
    const DefaultType = {
        animation: "boolean",
        autohide: "boolean",
        delay: "number"
    };
    const Default = {
        animation: true,
        autohide: true,
        delay: 5e3
    };
    class Toast extends BaseComponent {
        constructor(element, config) {
            super(element, config);
            this._timeout = null;
            this._hasMouseInteraction = false;
            this._hasKeyboardInteraction = false;
            this._setListeners();
        }
        static get Default() {
            return Default;
        }
        static get DefaultType() {
            return DefaultType;
        }
        static get NAME() {
            return NAME;
        }
        show() {
            const showEvent = EventHandler.trigger(this._element, EVENT_SHOW);
            if (showEvent.defaultPrevented) return;
            this._clearTimeout();
            if (this._config.animation) this._element.classList.add(CLASS_NAME_FADE);
            const complete = () => {
                this._element.classList.remove(CLASS_NAME_SHOWING);
                EventHandler.trigger(this._element, EVENT_SHOWN);
                this._maybeScheduleHide();
            };
            this._element.classList.remove(CLASS_NAME_HIDE);
            reflow(this._element);
            this._element.classList.add(CLASS_NAME_SHOW, CLASS_NAME_SHOWING);
            this._queueCallback(complete, this._element, this._config.animation);
        }
        hide() {
            if (!this.isShown()) return;
            const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE);
            if (hideEvent.defaultPrevented) return;
            const complete = () => {
                this._element.classList.add(CLASS_NAME_HIDE);
                this._element.classList.remove(CLASS_NAME_SHOWING, CLASS_NAME_SHOW);
                EventHandler.trigger(this._element, EVENT_HIDDEN);
            };
            this._element.classList.add(CLASS_NAME_SHOWING);
            this._queueCallback(complete, this._element, this._config.animation);
        }
        dispose() {
            this._clearTimeout();
            if (this.isShown()) this._element.classList.remove(CLASS_NAME_SHOW);
            super.dispose();
        }
        isShown() {
            return this._element.classList.contains(CLASS_NAME_SHOW);
        }
        _maybeScheduleHide() {
            if (!this._config.autohide) return;
            if (this._hasMouseInteraction || this._hasKeyboardInteraction) return;
            this._timeout = setTimeout((() => {
                this.hide();
            }), this._config.delay);
        }
        _onInteraction(event, isInteracting) {
            switch (event.type) {
              case "mouseover":
              case "mouseout":
                this._hasMouseInteraction = isInteracting;
                break;

              case "focusin":
              case "focusout":
                this._hasKeyboardInteraction = isInteracting;
                break;
            }
            if (isInteracting) {
                this._clearTimeout();
                return;
            }
            const nextElement = event.relatedTarget;
            if (this._element === nextElement || this._element.contains(nextElement)) return;
            this._maybeScheduleHide();
        }
        _setListeners() {
            EventHandler.on(this._element, EVENT_MOUSEOVER, (event => this._onInteraction(event, true)));
            EventHandler.on(this._element, EVENT_MOUSEOUT, (event => this._onInteraction(event, false)));
            EventHandler.on(this._element, EVENT_FOCUSIN, (event => this._onInteraction(event, true)));
            EventHandler.on(this._element, EVENT_FOCUSOUT, (event => this._onInteraction(event, false)));
        }
        _clearTimeout() {
            clearTimeout(this._timeout);
            this._timeout = null;
        }
        static jQueryInterface(config) {
            return this.each((function() {
                const data = Toast.getOrCreateInstance(this, config);
                if (typeof config === "string") {
                    if (typeof data[config] === "undefined") throw new TypeError(`No method named "${config}"`);
                    data[config](this);
                }
            }));
        }
    }
    enableDismissTrigger(Toast);
    defineJQueryPlugin(Toast);
    const triggers = document.querySelectorAll(".jsMenuTrigger");
    const menuToggle = function() {
        const menu = document.querySelector(".jsMenu");
        const html = document.querySelector("html");
        const headerBg = document.querySelector(".jsHeaderBg");
        menu.classList.toggle("is-active");
        headerBg.classList.toggle("is-active");
        html.classList.toggle("is-fixed");
    };
    for (let i = 0; i < triggers.length; i++) triggers[i].addEventListener("click", (function(e) {
        e.preventDefault();
        menuToggle();
    }));
    const headerCatalogTrigger = document.querySelectorAll(".jsHeaderCatalogTrigger");
    for (let i = 0; i < headerCatalogTrigger.length; i++) headerCatalogTrigger[i].addEventListener("click", (function(e) {
        if (window.matchMedia("(max-width: 1023px)").matches) {
            e.preventDefault();
            this.nextElementSibling.classList.add("is-active");
        }
    }));
    const closeCategory = document.querySelectorAll(".jsCloseCategory");
    for (let i = 0; i < closeCategory.length; i++) closeCategory[i].addEventListener("click", (function() {
        this.closest(".jsHeaderCatalogCategory").classList.remove("is-active");
    }));
    const userCartModalTrigger = document.querySelector(".jsUserCartModalTrigger");
    const userCartModal = document.querySelector(".jsCartModal");
    if (userCartModalTrigger) {
        const toggleMenu = function toggleMenu() {
            userCartModal.classList.toggle("is-active");
        };
        userCartModalTrigger.addEventListener("click", (function(e) {
            e.stopPropagation();
            e.preventDefault();
            toggleMenu();
        }));
        document.addEventListener("click", (function(e) {
            const target = e.target;
            const its_menu = target == userCartModal || userCartModal.contains(target);
            const its_hamburger = target == userCartModalTrigger;
            const menu_is_active = userCartModal.classList.contains("is-active");
            if (!its_menu && !its_hamburger && menu_is_active) toggleMenu();
        }));
    }
    function headerFixedToggle() {
        const header = document.querySelector(".jsHeader"), headerSourceBottom = header.offsetHeight;
        if (header.classList.contains("header--fixed") && window.pageYOffset < headerSourceBottom) header.classList.remove("header--fixed"); else if (window.pageYOffset > headerSourceBottom) header.classList.add("header--fixed");
    }
    headerFixedToggle();
    window.addEventListener("scroll", (function() {
        headerFixedToggle();
    }));
    const footerMenuTrigger = document.querySelectorAll(".jsFooterMenuTrigger");
    for (let i = 0; i < footerMenuTrigger.length; i++) footerMenuTrigger[i].addEventListener("click", (function() {
        this.parentNode.classList.toggle("is-active");
    }));
    function isString(str) {
        return typeof str === "string" || str instanceof String;
    }
    function isObject(obj) {
        var _obj$constructor;
        return typeof obj === "object" && obj != null && (obj == null || (_obj$constructor = obj.constructor) == null ? void 0 : _obj$constructor.name) === "Object";
    }
    function pick(obj, keys) {
        if (Array.isArray(keys)) return pick(obj, ((_, k) => keys.includes(k)));
        return Object.entries(obj).reduce(((acc, _ref) => {
            let [k, v] = _ref;
            if (keys(v, k)) acc[k] = v;
            return acc;
        }), {});
    }
    const DIRECTION = {
        NONE: "NONE",
        LEFT: "LEFT",
        FORCE_LEFT: "FORCE_LEFT",
        RIGHT: "RIGHT",
        FORCE_RIGHT: "FORCE_RIGHT"
    };
    function forceDirection(direction) {
        switch (direction) {
          case DIRECTION.LEFT:
            return DIRECTION.FORCE_LEFT;

          case DIRECTION.RIGHT:
            return DIRECTION.FORCE_RIGHT;

          default:
            return direction;
        }
    }
    function escapeRegExp(str) {
        return str.replace(/([.*+?^=!:${}()|[\]/\\])/g, "\\$1");
    }
    function objectIncludes(b, a) {
        if (a === b) return true;
        const arrA = Array.isArray(a), arrB = Array.isArray(b);
        let i;
        if (arrA && arrB) {
            if (a.length != b.length) return false;
            for (i = 0; i < a.length; i++) if (!objectIncludes(a[i], b[i])) return false;
            return true;
        }
        if (arrA != arrB) return false;
        if (a && b && typeof a === "object" && typeof b === "object") {
            const dateA = a instanceof Date, dateB = b instanceof Date;
            if (dateA && dateB) return a.getTime() == b.getTime();
            if (dateA != dateB) return false;
            const regexpA = a instanceof RegExp, regexpB = b instanceof RegExp;
            if (regexpA && regexpB) return a.toString() == b.toString();
            if (regexpA != regexpB) return false;
            const keys = Object.keys(a);
            for (i = 0; i < keys.length; i++) if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;
            for (i = 0; i < keys.length; i++) if (!objectIncludes(b[keys[i]], a[keys[i]])) return false;
            return true;
        } else if (a && b && typeof a === "function" && typeof b === "function") return a.toString() === b.toString();
        return false;
    }
    class ActionDetails {
        constructor(opts) {
            Object.assign(this, opts);
            while (this.value.slice(0, this.startChangePos) !== this.oldValue.slice(0, this.startChangePos)) --this.oldSelection.start;
        }
        get startChangePos() {
            return Math.min(this.cursorPos, this.oldSelection.start);
        }
        get insertedCount() {
            return this.cursorPos - this.startChangePos;
        }
        get inserted() {
            return this.value.substr(this.startChangePos, this.insertedCount);
        }
        get removedCount() {
            return Math.max(this.oldSelection.end - this.startChangePos || this.oldValue.length - this.value.length, 0);
        }
        get removed() {
            return this.oldValue.substr(this.startChangePos, this.removedCount);
        }
        get head() {
            return this.value.substring(0, this.startChangePos);
        }
        get tail() {
            return this.value.substring(this.startChangePos + this.insertedCount);
        }
        get removeDirection() {
            if (!this.removedCount || this.insertedCount) return DIRECTION.NONE;
            return (this.oldSelection.end === this.cursorPos || this.oldSelection.start === this.cursorPos) && this.oldSelection.end === this.oldSelection.start ? DIRECTION.RIGHT : DIRECTION.LEFT;
        }
    }
    function IMask(el, opts) {
        return new IMask.InputMask(el, opts);
    }
    function maskedClass(mask) {
        if (mask == null) throw new Error("mask property should be defined");
        if (mask instanceof RegExp) return IMask.MaskedRegExp;
        if (isString(mask)) return IMask.MaskedPattern;
        if (mask === Date) return IMask.MaskedDate;
        if (mask === Number) return IMask.MaskedNumber;
        if (Array.isArray(mask) || mask === Array) return IMask.MaskedDynamic;
        if (IMask.Masked && mask.prototype instanceof IMask.Masked) return mask;
        if (IMask.Masked && mask instanceof IMask.Masked) return mask.constructor;
        if (mask instanceof Function) return IMask.MaskedFunction;
        console.warn("Mask not found for mask", mask);
        return IMask.Masked;
    }
    function normalizeOpts(opts) {
        if (!opts) throw new Error("Options in not defined");
        if (IMask.Masked) {
            if (opts.prototype instanceof IMask.Masked) return {
                mask: opts
            };
            const {mask = void 0, ...instanceOpts} = opts instanceof IMask.Masked ? {
                mask: opts
            } : isObject(opts) && opts.mask instanceof IMask.Masked ? opts : {};
            if (mask) {
                const _mask = mask.mask;
                return {
                    ...pick(mask, ((_, k) => !k.startsWith("_"))),
                    mask: mask.constructor,
                    _mask,
                    ...instanceOpts
                };
            }
        }
        if (!isObject(opts)) return {
            mask: opts
        };
        return {
            ...opts
        };
    }
    function createMask(opts) {
        if (IMask.Masked && opts instanceof IMask.Masked) return opts;
        const nOpts = normalizeOpts(opts);
        const MaskedClass = maskedClass(nOpts.mask);
        if (!MaskedClass) throw new Error("Masked class is not found for provided mask, appropriate module needs to be imported manually before creating mask.");
        if (nOpts.mask === MaskedClass) delete nOpts.mask;
        if (nOpts._mask) {
            nOpts.mask = nOpts._mask;
            delete nOpts._mask;
        }
        return new MaskedClass(nOpts);
    }
    IMask.createMask = createMask;
    class MaskElement {
        get selectionStart() {
            let start;
            try {
                start = this._unsafeSelectionStart;
            } catch {}
            return start != null ? start : this.value.length;
        }
        get selectionEnd() {
            let end;
            try {
                end = this._unsafeSelectionEnd;
            } catch {}
            return end != null ? end : this.value.length;
        }
        select(start, end) {
            if (start == null || end == null || start === this.selectionStart && end === this.selectionEnd) return;
            try {
                this._unsafeSelect(start, end);
            } catch {}
        }
        get isActive() {
            return false;
        }
    }
    IMask.MaskElement = MaskElement;
    class HTMLMaskElement extends MaskElement {
        constructor(input) {
            super();
            this.input = input;
            this._handlers = {};
        }
        get rootElement() {
            var _this$input$getRootNo, _this$input$getRootNo2, _this$input;
            return (_this$input$getRootNo = (_this$input$getRootNo2 = (_this$input = this.input).getRootNode) == null ? void 0 : _this$input$getRootNo2.call(_this$input)) != null ? _this$input$getRootNo : document;
        }
        get isActive() {
            return this.input === this.rootElement.activeElement;
        }
        bindEvents(handlers) {
            Object.keys(handlers).forEach((event => this._toggleEventHandler(HTMLMaskElement.EVENTS_MAP[event], handlers[event])));
        }
        unbindEvents() {
            Object.keys(this._handlers).forEach((event => this._toggleEventHandler(event)));
        }
        _toggleEventHandler(event, handler) {
            if (this._handlers[event]) {
                this.input.removeEventListener(event, this._handlers[event]);
                delete this._handlers[event];
            }
            if (handler) {
                this.input.addEventListener(event, handler);
                this._handlers[event] = handler;
            }
        }
    }
    HTMLMaskElement.EVENTS_MAP = {
        selectionChange: "keydown",
        input: "input",
        drop: "drop",
        click: "click",
        focus: "focus",
        commit: "blur"
    };
    IMask.HTMLMaskElement = HTMLMaskElement;
    class HTMLInputMaskElement extends HTMLMaskElement {
        constructor(input) {
            super(input);
            this.input = input;
            this._handlers = {};
        }
        get _unsafeSelectionStart() {
            return this.input.selectionStart != null ? this.input.selectionStart : this.value.length;
        }
        get _unsafeSelectionEnd() {
            return this.input.selectionEnd;
        }
        _unsafeSelect(start, end) {
            this.input.setSelectionRange(start, end);
        }
        get value() {
            return this.input.value;
        }
        set value(value) {
            this.input.value = value;
        }
    }
    IMask.HTMLMaskElement = HTMLMaskElement;
    class HTMLContenteditableMaskElement extends HTMLMaskElement {
        get _unsafeSelectionStart() {
            const root = this.rootElement;
            const selection = root.getSelection && root.getSelection();
            const anchorOffset = selection && selection.anchorOffset;
            const focusOffset = selection && selection.focusOffset;
            if (focusOffset == null || anchorOffset == null || anchorOffset < focusOffset) return anchorOffset;
            return focusOffset;
        }
        get _unsafeSelectionEnd() {
            const root = this.rootElement;
            const selection = root.getSelection && root.getSelection();
            const anchorOffset = selection && selection.anchorOffset;
            const focusOffset = selection && selection.focusOffset;
            if (focusOffset == null || anchorOffset == null || anchorOffset > focusOffset) return anchorOffset;
            return focusOffset;
        }
        _unsafeSelect(start, end) {
            if (!this.rootElement.createRange) return;
            const range = this.rootElement.createRange();
            range.setStart(this.input.firstChild || this.input, start);
            range.setEnd(this.input.lastChild || this.input, end);
            const root = this.rootElement;
            const selection = root.getSelection && root.getSelection();
            if (selection) {
                selection.removeAllRanges();
                selection.addRange(range);
            }
        }
        get value() {
            return this.input.textContent || "";
        }
        set value(value) {
            this.input.textContent = value;
        }
    }
    IMask.HTMLContenteditableMaskElement = HTMLContenteditableMaskElement;
    class InputMask {
        constructor(el, opts) {
            this.el = el instanceof MaskElement ? el : el.isContentEditable && el.tagName !== "INPUT" && el.tagName !== "TEXTAREA" ? new HTMLContenteditableMaskElement(el) : new HTMLInputMaskElement(el);
            this.masked = createMask(opts);
            this._listeners = {};
            this._value = "";
            this._unmaskedValue = "";
            this._saveSelection = this._saveSelection.bind(this);
            this._onInput = this._onInput.bind(this);
            this._onChange = this._onChange.bind(this);
            this._onDrop = this._onDrop.bind(this);
            this._onFocus = this._onFocus.bind(this);
            this._onClick = this._onClick.bind(this);
            this.alignCursor = this.alignCursor.bind(this);
            this.alignCursorFriendly = this.alignCursorFriendly.bind(this);
            this._bindEvents();
            this.updateValue();
            this._onChange();
        }
        maskEquals(mask) {
            var _this$masked;
            return mask == null || ((_this$masked = this.masked) == null ? void 0 : _this$masked.maskEquals(mask));
        }
        get mask() {
            return this.masked.mask;
        }
        set mask(mask) {
            if (this.maskEquals(mask)) return;
            if (!(mask instanceof IMask.Masked) && this.masked.constructor === maskedClass(mask)) {
                this.masked.updateOptions({
                    mask
                });
                return;
            }
            const masked = mask instanceof IMask.Masked ? mask : createMask({
                mask
            });
            masked.unmaskedValue = this.masked.unmaskedValue;
            this.masked = masked;
        }
        get value() {
            return this._value;
        }
        set value(str) {
            if (this.value === str) return;
            this.masked.value = str;
            this.updateControl();
            this.alignCursor();
        }
        get unmaskedValue() {
            return this._unmaskedValue;
        }
        set unmaskedValue(str) {
            if (this.unmaskedValue === str) return;
            this.masked.unmaskedValue = str;
            this.updateControl();
            this.alignCursor();
        }
        get typedValue() {
            return this.masked.typedValue;
        }
        set typedValue(val) {
            if (this.masked.typedValueEquals(val)) return;
            this.masked.typedValue = val;
            this.updateControl();
            this.alignCursor();
        }
        get displayValue() {
            return this.masked.displayValue;
        }
        _bindEvents() {
            this.el.bindEvents({
                selectionChange: this._saveSelection,
                input: this._onInput,
                drop: this._onDrop,
                click: this._onClick,
                focus: this._onFocus,
                commit: this._onChange
            });
        }
        _unbindEvents() {
            if (this.el) this.el.unbindEvents();
        }
        _fireEvent(ev, e) {
            const listeners = this._listeners[ev];
            if (!listeners) return;
            listeners.forEach((l => l(e)));
        }
        get selectionStart() {
            return this._cursorChanging ? this._changingCursorPos : this.el.selectionStart;
        }
        get cursorPos() {
            return this._cursorChanging ? this._changingCursorPos : this.el.selectionEnd;
        }
        set cursorPos(pos) {
            if (!this.el || !this.el.isActive) return;
            this.el.select(pos, pos);
            this._saveSelection();
        }
        _saveSelection() {
            if (this.displayValue !== this.el.value) console.warn("Element value was changed outside of mask. Syncronize mask using `mask.updateValue()` to work properly.");
            this._selection = {
                start: this.selectionStart,
                end: this.cursorPos
            };
        }
        updateValue() {
            this.masked.value = this.el.value;
            this._value = this.masked.value;
        }
        updateControl() {
            const newUnmaskedValue = this.masked.unmaskedValue;
            const newValue = this.masked.value;
            const newDisplayValue = this.displayValue;
            const isChanged = this.unmaskedValue !== newUnmaskedValue || this.value !== newValue;
            this._unmaskedValue = newUnmaskedValue;
            this._value = newValue;
            if (this.el.value !== newDisplayValue) this.el.value = newDisplayValue;
            if (isChanged) this._fireChangeEvents();
        }
        updateOptions(opts) {
            const {mask, ...restOpts} = opts;
            const updateMask = !this.maskEquals(mask);
            const updateOpts = !objectIncludes(this.masked, restOpts);
            if (updateMask) this.mask = mask;
            if (updateOpts) this.masked.updateOptions(restOpts);
            if (updateMask || updateOpts) this.updateControl();
        }
        updateCursor(cursorPos) {
            if (cursorPos == null) return;
            this.cursorPos = cursorPos;
            this._delayUpdateCursor(cursorPos);
        }
        _delayUpdateCursor(cursorPos) {
            this._abortUpdateCursor();
            this._changingCursorPos = cursorPos;
            this._cursorChanging = setTimeout((() => {
                if (!this.el) return;
                this.cursorPos = this._changingCursorPos;
                this._abortUpdateCursor();
            }), 10);
        }
        _fireChangeEvents() {
            this._fireEvent("accept", this._inputEvent);
            if (this.masked.isComplete) this._fireEvent("complete", this._inputEvent);
        }
        _abortUpdateCursor() {
            if (this._cursorChanging) {
                clearTimeout(this._cursorChanging);
                delete this._cursorChanging;
            }
        }
        alignCursor() {
            this.cursorPos = this.masked.nearestInputPos(this.masked.nearestInputPos(this.cursorPos, DIRECTION.LEFT));
        }
        alignCursorFriendly() {
            if (this.selectionStart !== this.cursorPos) return;
            this.alignCursor();
        }
        on(ev, handler) {
            if (!this._listeners[ev]) this._listeners[ev] = [];
            this._listeners[ev].push(handler);
            return this;
        }
        off(ev, handler) {
            if (!this._listeners[ev]) return this;
            if (!handler) {
                delete this._listeners[ev];
                return this;
            }
            const hIndex = this._listeners[ev].indexOf(handler);
            if (hIndex >= 0) this._listeners[ev].splice(hIndex, 1);
            return this;
        }
        _onInput(e) {
            this._inputEvent = e;
            this._abortUpdateCursor();
            if (!this._selection) return this.updateValue();
            const details = new ActionDetails({
                value: this.el.value,
                cursorPos: this.cursorPos,
                oldValue: this.displayValue,
                oldSelection: this._selection
            });
            const oldRawValue = this.masked.rawInputValue;
            const offset = this.masked.splice(details.startChangePos, details.removed.length, details.inserted, details.removeDirection, {
                input: true,
                raw: true
            }).offset;
            const removeDirection = oldRawValue === this.masked.rawInputValue ? details.removeDirection : DIRECTION.NONE;
            let cursorPos = this.masked.nearestInputPos(details.startChangePos + offset, removeDirection);
            if (removeDirection !== DIRECTION.NONE) cursorPos = this.masked.nearestInputPos(cursorPos, DIRECTION.NONE);
            this.updateControl();
            this.updateCursor(cursorPos);
            delete this._inputEvent;
        }
        _onChange() {
            if (this.displayValue !== this.el.value) this.updateValue();
            this.masked.doCommit();
            this.updateControl();
            this._saveSelection();
        }
        _onDrop(ev) {
            ev.preventDefault();
            ev.stopPropagation();
        }
        _onFocus(ev) {
            this.alignCursorFriendly();
        }
        _onClick(ev) {
            this.alignCursorFriendly();
        }
        destroy() {
            this._unbindEvents();
            this._listeners.length = 0;
            delete this.el;
        }
    }
    IMask.InputMask = InputMask;
    class ChangeDetails {
        static normalize(prep) {
            return Array.isArray(prep) ? prep : [ prep, new ChangeDetails ];
        }
        constructor(details) {
            Object.assign(this, {
                inserted: "",
                rawInserted: "",
                skip: false,
                tailShift: 0
            }, details);
        }
        aggregate(details) {
            this.rawInserted += details.rawInserted;
            this.skip = this.skip || details.skip;
            this.inserted += details.inserted;
            this.tailShift += details.tailShift;
            return this;
        }
        get offset() {
            return this.tailShift + this.inserted.length;
        }
    }
    IMask.ChangeDetails = ChangeDetails;
    class ContinuousTailDetails {
        constructor(value, from, stop) {
            if (value === void 0) value = "";
            if (from === void 0) from = 0;
            this.value = value;
            this.from = from;
            this.stop = stop;
        }
        toString() {
            return this.value;
        }
        extend(tail) {
            this.value += String(tail);
        }
        appendTo(masked) {
            return masked.append(this.toString(), {
                tail: true
            }).aggregate(masked._appendPlaceholder());
        }
        get state() {
            return {
                value: this.value,
                from: this.from,
                stop: this.stop
            };
        }
        set state(state) {
            Object.assign(this, state);
        }
        unshift(beforePos) {
            if (!this.value.length || beforePos != null && this.from >= beforePos) return "";
            const shiftChar = this.value[0];
            this.value = this.value.slice(1);
            return shiftChar;
        }
        shift() {
            if (!this.value.length) return "";
            const shiftChar = this.value[this.value.length - 1];
            this.value = this.value.slice(0, -1);
            return shiftChar;
        }
    }
    class Masked {
        constructor(opts) {
            this._value = "";
            this._update({
                ...Masked.DEFAULTS,
                ...opts
            });
            this._initialized = true;
        }
        updateOptions(opts) {
            if (!Object.keys(opts).length) return;
            this.withValueRefresh(this._update.bind(this, opts));
        }
        _update(opts) {
            Object.assign(this, opts);
        }
        get state() {
            return {
                _value: this.value,
                _rawInputValue: this.rawInputValue
            };
        }
        set state(state) {
            this._value = state._value;
        }
        reset() {
            this._value = "";
        }
        get value() {
            return this._value;
        }
        set value(value) {
            this.resolve(value, {
                input: true
            });
        }
        resolve(value, flags) {
            if (flags === void 0) flags = {
                input: true
            };
            this.reset();
            this.append(value, flags, "");
            this.doCommit();
        }
        get unmaskedValue() {
            return this.value;
        }
        set unmaskedValue(value) {
            this.resolve(value, {});
        }
        get typedValue() {
            return this.parse ? this.parse(this.value, this) : this.unmaskedValue;
        }
        set typedValue(value) {
            if (this.format) this.value = this.format(value, this); else this.unmaskedValue = String(value);
        }
        get rawInputValue() {
            return this.extractInput(0, this.displayValue.length, {
                raw: true
            });
        }
        set rawInputValue(value) {
            this.resolve(value, {
                raw: true
            });
        }
        get displayValue() {
            return this.value;
        }
        get isComplete() {
            return true;
        }
        get isFilled() {
            return this.isComplete;
        }
        nearestInputPos(cursorPos, direction) {
            return cursorPos;
        }
        totalInputPositions(fromPos, toPos) {
            if (fromPos === void 0) fromPos = 0;
            if (toPos === void 0) toPos = this.displayValue.length;
            return Math.min(this.displayValue.length, toPos - fromPos);
        }
        extractInput(fromPos, toPos, flags) {
            if (fromPos === void 0) fromPos = 0;
            if (toPos === void 0) toPos = this.displayValue.length;
            return this.displayValue.slice(fromPos, toPos);
        }
        extractTail(fromPos, toPos) {
            if (fromPos === void 0) fromPos = 0;
            if (toPos === void 0) toPos = this.displayValue.length;
            return new ContinuousTailDetails(this.extractInput(fromPos, toPos), fromPos);
        }
        appendTail(tail) {
            if (isString(tail)) tail = new ContinuousTailDetails(String(tail));
            return tail.appendTo(this);
        }
        _appendCharRaw(ch, flags) {
            if (!ch) return new ChangeDetails;
            this._value += ch;
            return new ChangeDetails({
                inserted: ch,
                rawInserted: ch
            });
        }
        _appendChar(ch, flags, checkTail) {
            if (flags === void 0) flags = {};
            const consistentState = this.state;
            let details;
            [ch, details] = this.doPrepareChar(ch, flags);
            details = details.aggregate(this._appendCharRaw(ch, flags));
            if (details.inserted) {
                let consistentTail;
                let appended = this.doValidate(flags) !== false;
                if (appended && checkTail != null) {
                    const beforeTailState = this.state;
                    if (this.overwrite === true) {
                        consistentTail = checkTail.state;
                        checkTail.unshift(this.displayValue.length - details.tailShift);
                    }
                    let tailDetails = this.appendTail(checkTail);
                    appended = tailDetails.rawInserted === checkTail.toString();
                    if (!(appended && tailDetails.inserted) && this.overwrite === "shift") {
                        this.state = beforeTailState;
                        consistentTail = checkTail.state;
                        checkTail.shift();
                        tailDetails = this.appendTail(checkTail);
                        appended = tailDetails.rawInserted === checkTail.toString();
                    }
                    if (appended && tailDetails.inserted) this.state = beforeTailState;
                }
                if (!appended) {
                    details = new ChangeDetails;
                    this.state = consistentState;
                    if (checkTail && consistentTail) checkTail.state = consistentTail;
                }
            }
            return details;
        }
        _appendPlaceholder() {
            return new ChangeDetails;
        }
        _appendEager() {
            return new ChangeDetails;
        }
        append(str, flags, tail) {
            if (!isString(str)) throw new Error("value should be string");
            const checkTail = isString(tail) ? new ContinuousTailDetails(String(tail)) : tail;
            if (flags != null && flags.tail) flags._beforeTailState = this.state;
            let details;
            [str, details] = this.doPrepare(str, flags);
            for (let ci = 0; ci < str.length; ++ci) {
                const d = this._appendChar(str[ci], flags, checkTail);
                if (!d.rawInserted && !this.doSkipInvalid(str[ci], flags, checkTail)) break;
                details.aggregate(d);
            }
            if ((this.eager === true || this.eager === "append") && flags != null && flags.input && str) details.aggregate(this._appendEager());
            if (checkTail != null) details.tailShift += this.appendTail(checkTail).tailShift;
            return details;
        }
        remove(fromPos, toPos) {
            if (fromPos === void 0) fromPos = 0;
            if (toPos === void 0) toPos = this.displayValue.length;
            this._value = this.displayValue.slice(0, fromPos) + this.displayValue.slice(toPos);
            return new ChangeDetails;
        }
        withValueRefresh(fn) {
            if (this._refreshing || !this._initialized) return fn();
            this._refreshing = true;
            const rawInput = this.rawInputValue;
            const value = this.value;
            const ret = fn();
            this.rawInputValue = rawInput;
            if (this.value && this.value !== value && value.indexOf(this.value) === 0) this.append(value.slice(this.displayValue.length), {}, "");
            delete this._refreshing;
            return ret;
        }
        runIsolated(fn) {
            if (this._isolated || !this._initialized) return fn(this);
            this._isolated = true;
            const state = this.state;
            const ret = fn(this);
            this.state = state;
            delete this._isolated;
            return ret;
        }
        doSkipInvalid(ch, flags, checkTail) {
            return Boolean(this.skipInvalid);
        }
        doPrepare(str, flags) {
            if (flags === void 0) flags = {};
            return ChangeDetails.normalize(this.prepare ? this.prepare(str, this, flags) : str);
        }
        doPrepareChar(str, flags) {
            if (flags === void 0) flags = {};
            return ChangeDetails.normalize(this.prepareChar ? this.prepareChar(str, this, flags) : str);
        }
        doValidate(flags) {
            return (!this.validate || this.validate(this.value, this, flags)) && (!this.parent || this.parent.doValidate(flags));
        }
        doCommit() {
            if (this.commit) this.commit(this.value, this);
        }
        splice(start, deleteCount, inserted, removeDirection, flags) {
            if (removeDirection === void 0) removeDirection = DIRECTION.NONE;
            if (flags === void 0) flags = {
                input: true
            };
            const tailPos = start + deleteCount;
            const tail = this.extractTail(tailPos);
            const eagerRemove = this.eager === true || this.eager === "remove";
            let oldRawValue;
            if (eagerRemove) {
                removeDirection = forceDirection(removeDirection);
                oldRawValue = this.extractInput(0, tailPos, {
                    raw: true
                });
            }
            let startChangePos = start;
            const details = new ChangeDetails;
            if (removeDirection !== DIRECTION.NONE) {
                startChangePos = this.nearestInputPos(start, deleteCount > 1 && start !== 0 && !eagerRemove ? DIRECTION.NONE : removeDirection);
                details.tailShift = startChangePos - start;
            }
            details.aggregate(this.remove(startChangePos));
            if (eagerRemove && removeDirection !== DIRECTION.NONE && oldRawValue === this.rawInputValue) if (removeDirection === DIRECTION.FORCE_LEFT) {
                let valLength;
                while (oldRawValue === this.rawInputValue && (valLength = this.displayValue.length)) details.aggregate(new ChangeDetails({
                    tailShift: -1
                })).aggregate(this.remove(valLength - 1));
            } else if (removeDirection === DIRECTION.FORCE_RIGHT) tail.unshift();
            return details.aggregate(this.append(inserted, flags, tail));
        }
        maskEquals(mask) {
            return this.mask === mask;
        }
        typedValueEquals(value) {
            const tval = this.typedValue;
            return value === tval || Masked.EMPTY_VALUES.includes(value) && Masked.EMPTY_VALUES.includes(tval) || (this.format ? this.format(value, this) === this.format(this.typedValue, this) : false);
        }
    }
    Masked.DEFAULTS = {
        skipInvalid: true
    };
    Masked.EMPTY_VALUES = [ void 0, null, "" ];
    IMask.Masked = Masked;
    class ChunksTailDetails {
        constructor(chunks, from) {
            if (chunks === void 0) chunks = [];
            if (from === void 0) from = 0;
            this.chunks = chunks;
            this.from = from;
        }
        toString() {
            return this.chunks.map(String).join("");
        }
        extend(tailChunk) {
            if (!String(tailChunk)) return;
            tailChunk = isString(tailChunk) ? new ContinuousTailDetails(String(tailChunk)) : tailChunk;
            const lastChunk = this.chunks[this.chunks.length - 1];
            const extendLast = lastChunk && (lastChunk.stop === tailChunk.stop || tailChunk.stop == null) && tailChunk.from === lastChunk.from + lastChunk.toString().length;
            if (tailChunk instanceof ContinuousTailDetails) if (extendLast) lastChunk.extend(tailChunk.toString()); else this.chunks.push(tailChunk); else if (tailChunk instanceof ChunksTailDetails) {
                if (tailChunk.stop == null) {
                    let firstTailChunk;
                    while (tailChunk.chunks.length && tailChunk.chunks[0].stop == null) {
                        firstTailChunk = tailChunk.chunks.shift();
                        firstTailChunk.from += tailChunk.from;
                        this.extend(firstTailChunk);
                    }
                }
                if (tailChunk.toString()) {
                    tailChunk.stop = tailChunk.blockIndex;
                    this.chunks.push(tailChunk);
                }
            }
        }
        appendTo(masked) {
            if (!(masked instanceof IMask.MaskedPattern)) {
                const tail = new ContinuousTailDetails(this.toString());
                return tail.appendTo(masked);
            }
            const details = new ChangeDetails;
            for (let ci = 0; ci < this.chunks.length && !details.skip; ++ci) {
                const chunk = this.chunks[ci];
                const lastBlockIter = masked._mapPosToBlock(masked.displayValue.length);
                const stop = chunk.stop;
                let chunkBlock;
                if (stop != null && (!lastBlockIter || lastBlockIter.index <= stop)) {
                    if (chunk instanceof ChunksTailDetails || masked._stops.indexOf(stop) >= 0) {
                        const phDetails = masked._appendPlaceholder(stop);
                        details.aggregate(phDetails);
                    }
                    chunkBlock = chunk instanceof ChunksTailDetails && masked._blocks[stop];
                }
                if (chunkBlock) {
                    const tailDetails = chunkBlock.appendTail(chunk);
                    tailDetails.skip = false;
                    details.aggregate(tailDetails);
                    masked._value += tailDetails.inserted;
                    const remainChars = chunk.toString().slice(tailDetails.rawInserted.length);
                    if (remainChars) details.aggregate(masked.append(remainChars, {
                        tail: true
                    }));
                } else details.aggregate(masked.append(chunk.toString(), {
                    tail: true
                }));
            }
            return details;
        }
        get state() {
            return {
                chunks: this.chunks.map((c => c.state)),
                from: this.from,
                stop: this.stop,
                blockIndex: this.blockIndex
            };
        }
        set state(state) {
            const {chunks, ...props} = state;
            Object.assign(this, props);
            this.chunks = chunks.map((cstate => {
                const chunk = "chunks" in cstate ? new ChunksTailDetails : new ContinuousTailDetails;
                chunk.state = cstate;
                return chunk;
            }));
        }
        unshift(beforePos) {
            if (!this.chunks.length || beforePos != null && this.from >= beforePos) return "";
            const chunkShiftPos = beforePos != null ? beforePos - this.from : beforePos;
            let ci = 0;
            while (ci < this.chunks.length) {
                const chunk = this.chunks[ci];
                const shiftChar = chunk.unshift(chunkShiftPos);
                if (chunk.toString()) {
                    if (!shiftChar) break;
                    ++ci;
                } else this.chunks.splice(ci, 1);
                if (shiftChar) return shiftChar;
            }
            return "";
        }
        shift() {
            if (!this.chunks.length) return "";
            let ci = this.chunks.length - 1;
            while (0 <= ci) {
                const chunk = this.chunks[ci];
                const shiftChar = chunk.shift();
                if (chunk.toString()) {
                    if (!shiftChar) break;
                    --ci;
                } else this.chunks.splice(ci, 1);
                if (shiftChar) return shiftChar;
            }
            return "";
        }
    }
    class PatternCursor {
        constructor(masked, pos) {
            this.masked = masked;
            this._log = [];
            const {offset, index} = masked._mapPosToBlock(pos) || (pos < 0 ? {
                index: 0,
                offset: 0
            } : {
                index: this.masked._blocks.length,
                offset: 0
            });
            this.offset = offset;
            this.index = index;
            this.ok = false;
        }
        get block() {
            return this.masked._blocks[this.index];
        }
        get pos() {
            return this.masked._blockStartPos(this.index) + this.offset;
        }
        get state() {
            return {
                index: this.index,
                offset: this.offset,
                ok: this.ok
            };
        }
        set state(s) {
            Object.assign(this, s);
        }
        pushState() {
            this._log.push(this.state);
        }
        popState() {
            const s = this._log.pop();
            if (s) this.state = s;
            return s;
        }
        bindBlock() {
            if (this.block) return;
            if (this.index < 0) {
                this.index = 0;
                this.offset = 0;
            }
            if (this.index >= this.masked._blocks.length) {
                this.index = this.masked._blocks.length - 1;
                this.offset = this.block.displayValue.length;
            }
        }
        _pushLeft(fn) {
            this.pushState();
            for (this.bindBlock(); 0 <= this.index; --this.index, this.offset = ((_this$block = this.block) == null ? void 0 : _this$block.displayValue.length) || 0) {
                var _this$block;
                if (fn()) return this.ok = true;
            }
            return this.ok = false;
        }
        _pushRight(fn) {
            this.pushState();
            for (this.bindBlock(); this.index < this.masked._blocks.length; ++this.index, this.offset = 0) if (fn()) return this.ok = true;
            return this.ok = false;
        }
        pushLeftBeforeFilled() {
            return this._pushLeft((() => {
                if (this.block.isFixed || !this.block.value) return;
                this.offset = this.block.nearestInputPos(this.offset, DIRECTION.FORCE_LEFT);
                if (this.offset !== 0) return true;
            }));
        }
        pushLeftBeforeInput() {
            return this._pushLeft((() => {
                if (this.block.isFixed) return;
                this.offset = this.block.nearestInputPos(this.offset, DIRECTION.LEFT);
                return true;
            }));
        }
        pushLeftBeforeRequired() {
            return this._pushLeft((() => {
                if (this.block.isFixed || this.block.isOptional && !this.block.value) return;
                this.offset = this.block.nearestInputPos(this.offset, DIRECTION.LEFT);
                return true;
            }));
        }
        pushRightBeforeFilled() {
            return this._pushRight((() => {
                if (this.block.isFixed || !this.block.value) return;
                this.offset = this.block.nearestInputPos(this.offset, DIRECTION.FORCE_RIGHT);
                if (this.offset !== this.block.value.length) return true;
            }));
        }
        pushRightBeforeInput() {
            return this._pushRight((() => {
                if (this.block.isFixed) return;
                this.offset = this.block.nearestInputPos(this.offset, DIRECTION.NONE);
                return true;
            }));
        }
        pushRightBeforeRequired() {
            return this._pushRight((() => {
                if (this.block.isFixed || this.block.isOptional && !this.block.value) return;
                this.offset = this.block.nearestInputPos(this.offset, DIRECTION.NONE);
                return true;
            }));
        }
    }
    class PatternFixedDefinition {
        constructor(opts) {
            Object.assign(this, opts);
            this._value = "";
            this.isFixed = true;
        }
        get value() {
            return this._value;
        }
        get unmaskedValue() {
            return this.isUnmasking ? this.value : "";
        }
        get rawInputValue() {
            return this._isRawInput ? this.value : "";
        }
        get displayValue() {
            return this.value;
        }
        reset() {
            this._isRawInput = false;
            this._value = "";
        }
        remove(fromPos, toPos) {
            if (fromPos === void 0) fromPos = 0;
            if (toPos === void 0) toPos = this._value.length;
            this._value = this._value.slice(0, fromPos) + this._value.slice(toPos);
            if (!this._value) this._isRawInput = false;
            return new ChangeDetails;
        }
        nearestInputPos(cursorPos, direction) {
            if (direction === void 0) direction = DIRECTION.NONE;
            const minPos = 0;
            const maxPos = this._value.length;
            switch (direction) {
              case DIRECTION.LEFT:
              case DIRECTION.FORCE_LEFT:
                return minPos;

              case DIRECTION.NONE:
              case DIRECTION.RIGHT:
              case DIRECTION.FORCE_RIGHT:
              default:
                return maxPos;
            }
        }
        totalInputPositions(fromPos, toPos) {
            if (fromPos === void 0) fromPos = 0;
            if (toPos === void 0) toPos = this._value.length;
            return this._isRawInput ? toPos - fromPos : 0;
        }
        extractInput(fromPos, toPos, flags) {
            if (fromPos === void 0) fromPos = 0;
            if (toPos === void 0) toPos = this._value.length;
            if (flags === void 0) flags = {};
            return flags.raw && this._isRawInput && this._value.slice(fromPos, toPos) || "";
        }
        get isComplete() {
            return true;
        }
        get isFilled() {
            return Boolean(this._value);
        }
        _appendChar(ch, flags) {
            if (flags === void 0) flags = {};
            const details = new ChangeDetails;
            if (this.isFilled) return details;
            const appendEager = this.eager === true || this.eager === "append";
            const appended = this.char === ch;
            const isResolved = appended && (this.isUnmasking || flags.input || flags.raw) && (!flags.raw || !appendEager) && !flags.tail;
            if (isResolved) details.rawInserted = this.char;
            this._value = details.inserted = this.char;
            this._isRawInput = isResolved && (flags.raw || flags.input);
            return details;
        }
        _appendEager() {
            return this._appendChar(this.char, {
                tail: true
            });
        }
        _appendPlaceholder() {
            const details = new ChangeDetails;
            if (this.isFilled) return details;
            this._value = details.inserted = this.char;
            return details;
        }
        extractTail() {
            return new ContinuousTailDetails("");
        }
        appendTail(tail) {
            if (isString(tail)) tail = new ContinuousTailDetails(String(tail));
            return tail.appendTo(this);
        }
        append(str, flags, tail) {
            const details = this._appendChar(str[0], flags);
            if (tail != null) details.tailShift += this.appendTail(tail).tailShift;
            return details;
        }
        doCommit() {}
        get state() {
            return {
                _value: this._value,
                _rawInputValue: this.rawInputValue
            };
        }
        set state(state) {
            this._value = state._value;
            this._isRawInput = Boolean(state._rawInputValue);
        }
    }
    class PatternInputDefinition {
        constructor(opts) {
            const {parent, isOptional, placeholderChar, displayChar, lazy, eager, ...maskOpts} = opts;
            this.masked = createMask(maskOpts);
            Object.assign(this, {
                parent,
                isOptional,
                placeholderChar,
                displayChar,
                lazy,
                eager
            });
        }
        reset() {
            this.isFilled = false;
            this.masked.reset();
        }
        remove(fromPos, toPos) {
            if (fromPos === void 0) fromPos = 0;
            if (toPos === void 0) toPos = this.value.length;
            if (fromPos === 0 && toPos >= 1) {
                this.isFilled = false;
                return this.masked.remove(fromPos, toPos);
            }
            return new ChangeDetails;
        }
        get value() {
            return this.masked.value || (this.isFilled && !this.isOptional ? this.placeholderChar : "");
        }
        get unmaskedValue() {
            return this.masked.unmaskedValue;
        }
        get rawInputValue() {
            return this.masked.rawInputValue;
        }
        get displayValue() {
            return this.masked.value && this.displayChar || this.value;
        }
        get isComplete() {
            return Boolean(this.masked.value) || this.isOptional;
        }
        _appendChar(ch, flags) {
            if (flags === void 0) flags = {};
            if (this.isFilled) return new ChangeDetails;
            const state = this.masked.state;
            const details = this.masked._appendChar(ch, this.currentMaskFlags(flags));
            if (details.inserted && this.doValidate(flags) === false) {
                details.inserted = details.rawInserted = "";
                this.masked.state = state;
            }
            if (!details.inserted && !this.isOptional && !this.lazy && !flags.input) details.inserted = this.placeholderChar;
            details.skip = !details.inserted && !this.isOptional;
            this.isFilled = Boolean(details.inserted);
            return details;
        }
        append(str, flags, tail) {
            return this.masked.append(str, this.currentMaskFlags(flags), tail);
        }
        _appendPlaceholder() {
            const details = new ChangeDetails;
            if (this.isFilled || this.isOptional) return details;
            this.isFilled = true;
            details.inserted = this.placeholderChar;
            return details;
        }
        _appendEager() {
            return new ChangeDetails;
        }
        extractTail(fromPos, toPos) {
            return this.masked.extractTail(fromPos, toPos);
        }
        appendTail(tail) {
            return this.masked.appendTail(tail);
        }
        extractInput(fromPos, toPos, flags) {
            if (fromPos === void 0) fromPos = 0;
            if (toPos === void 0) toPos = this.value.length;
            return this.masked.extractInput(fromPos, toPos, flags);
        }
        nearestInputPos(cursorPos, direction) {
            if (direction === void 0) direction = DIRECTION.NONE;
            const minPos = 0;
            const maxPos = this.value.length;
            const boundPos = Math.min(Math.max(cursorPos, minPos), maxPos);
            switch (direction) {
              case DIRECTION.LEFT:
              case DIRECTION.FORCE_LEFT:
                return this.isComplete ? boundPos : minPos;

              case DIRECTION.RIGHT:
              case DIRECTION.FORCE_RIGHT:
                return this.isComplete ? boundPos : maxPos;

              case DIRECTION.NONE:
              default:
                return boundPos;
            }
        }
        totalInputPositions(fromPos, toPos) {
            if (fromPos === void 0) fromPos = 0;
            if (toPos === void 0) toPos = this.value.length;
            return this.value.slice(fromPos, toPos).length;
        }
        doValidate(flags) {
            return this.masked.doValidate(this.currentMaskFlags(flags)) && (!this.parent || this.parent.doValidate(this.currentMaskFlags(flags)));
        }
        doCommit() {
            this.masked.doCommit();
        }
        get state() {
            return {
                _value: this.value,
                _rawInputValue: this.rawInputValue,
                masked: this.masked.state,
                isFilled: this.isFilled
            };
        }
        set state(state) {
            this.masked.state = state.masked;
            this.isFilled = state.isFilled;
        }
        currentMaskFlags(flags) {
            var _flags$_beforeTailSta;
            return {
                ...flags,
                _beforeTailState: (flags == null || (_flags$_beforeTailSta = flags._beforeTailState) == null ? void 0 : _flags$_beforeTailSta.masked) || (flags == null ? void 0 : flags._beforeTailState)
            };
        }
    }
    PatternInputDefinition.DEFAULT_DEFINITIONS = {
        0: /\d/,
        a: /[\u0041-\u005A\u0061-\u007A\u00AA\u00B5\u00BA\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0\u08A2-\u08AC\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097F\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C33\u0C35-\u0C39\u0C3D\u0C58\u0C59\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D60\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191C\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19C1-\u19C7\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA697\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA793\uA7A0-\uA7AA\uA7F8-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA80-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]/,
        "*": /./
    };
    class MaskedRegExp extends Masked {
        updateOptions(opts) {
            super.updateOptions(opts);
        }
        _update(opts) {
            const mask = opts.mask;
            if (mask) opts.validate = value => value.search(mask) >= 0;
            super._update(opts);
        }
    }
    IMask.MaskedRegExp = MaskedRegExp;
    class MaskedPattern extends Masked {
        constructor(opts) {
            super({
                ...MaskedPattern.DEFAULTS,
                ...opts,
                definitions: Object.assign({}, PatternInputDefinition.DEFAULT_DEFINITIONS, opts == null ? void 0 : opts.definitions)
            });
        }
        updateOptions(opts) {
            super.updateOptions(opts);
        }
        _update(opts) {
            opts.definitions = Object.assign({}, this.definitions, opts.definitions);
            super._update(opts);
            this._rebuildMask();
        }
        _rebuildMask() {
            const defs = this.definitions;
            this._blocks = [];
            this.exposeBlock = void 0;
            this._stops = [];
            this._maskedBlocks = {};
            const pattern = this.mask;
            if (!pattern || !defs) return;
            let unmaskingBlock = false;
            let optionalBlock = false;
            for (let i = 0; i < pattern.length; ++i) {
                if (this.blocks) {
                    const p = pattern.slice(i);
                    const bNames = Object.keys(this.blocks).filter((bName => p.indexOf(bName) === 0));
                    bNames.sort(((a, b) => b.length - a.length));
                    const bName = bNames[0];
                    if (bName) {
                        const {expose, ...blockOpts} = normalizeOpts(this.blocks[bName]);
                        const maskedBlock = createMask({
                            lazy: this.lazy,
                            eager: this.eager,
                            placeholderChar: this.placeholderChar,
                            displayChar: this.displayChar,
                            overwrite: this.overwrite,
                            ...blockOpts,
                            parent: this
                        });
                        if (maskedBlock) {
                            this._blocks.push(maskedBlock);
                            if (expose) this.exposeBlock = maskedBlock;
                            if (!this._maskedBlocks[bName]) this._maskedBlocks[bName] = [];
                            this._maskedBlocks[bName].push(this._blocks.length - 1);
                        }
                        i += bName.length - 1;
                        continue;
                    }
                }
                let char = pattern[i];
                let isInput = char in defs;
                if (char === MaskedPattern.STOP_CHAR) {
                    this._stops.push(this._blocks.length);
                    continue;
                }
                if (char === "{" || char === "}") {
                    unmaskingBlock = !unmaskingBlock;
                    continue;
                }
                if (char === "[" || char === "]") {
                    optionalBlock = !optionalBlock;
                    continue;
                }
                if (char === MaskedPattern.ESCAPE_CHAR) {
                    ++i;
                    char = pattern[i];
                    if (!char) break;
                    isInput = false;
                }
                const def = isInput ? new PatternInputDefinition({
                    isOptional: optionalBlock,
                    lazy: this.lazy,
                    eager: this.eager,
                    placeholderChar: this.placeholderChar,
                    displayChar: this.displayChar,
                    ...normalizeOpts(defs[char]),
                    parent: this
                }) : new PatternFixedDefinition({
                    char,
                    eager: this.eager,
                    isUnmasking: unmaskingBlock
                });
                this._blocks.push(def);
            }
        }
        get state() {
            return {
                ...super.state,
                _blocks: this._blocks.map((b => b.state))
            };
        }
        set state(state) {
            const {_blocks, ...maskedState} = state;
            this._blocks.forEach(((b, bi) => b.state = _blocks[bi]));
            super.state = maskedState;
        }
        reset() {
            super.reset();
            this._blocks.forEach((b => b.reset()));
        }
        get isComplete() {
            return this.exposeBlock ? this.exposeBlock.isComplete : this._blocks.every((b => b.isComplete));
        }
        get isFilled() {
            return this._blocks.every((b => b.isFilled));
        }
        get isFixed() {
            return this._blocks.every((b => b.isFixed));
        }
        get isOptional() {
            return this._blocks.every((b => b.isOptional));
        }
        doCommit() {
            this._blocks.forEach((b => b.doCommit()));
            super.doCommit();
        }
        get unmaskedValue() {
            return this.exposeBlock ? this.exposeBlock.unmaskedValue : this._blocks.reduce(((str, b) => str += b.unmaskedValue), "");
        }
        set unmaskedValue(unmaskedValue) {
            if (this.exposeBlock) {
                const tail = this.extractTail(this._blockStartPos(this._blocks.indexOf(this.exposeBlock)) + this.exposeBlock.displayValue.length);
                this.exposeBlock.unmaskedValue = unmaskedValue;
                this.appendTail(tail);
                this.doCommit();
            } else super.unmaskedValue = unmaskedValue;
        }
        get value() {
            return this.exposeBlock ? this.exposeBlock.value : this._blocks.reduce(((str, b) => str += b.value), "");
        }
        set value(value) {
            if (this.exposeBlock) {
                const tail = this.extractTail(this._blockStartPos(this._blocks.indexOf(this.exposeBlock)) + this.exposeBlock.displayValue.length);
                this.exposeBlock.value = value;
                this.appendTail(tail);
                this.doCommit();
            } else super.value = value;
        }
        get typedValue() {
            return this.exposeBlock ? this.exposeBlock.typedValue : super.typedValue;
        }
        set typedValue(value) {
            if (this.exposeBlock) {
                const tail = this.extractTail(this._blockStartPos(this._blocks.indexOf(this.exposeBlock)) + this.exposeBlock.displayValue.length);
                this.exposeBlock.typedValue = value;
                this.appendTail(tail);
                this.doCommit();
            } else super.typedValue = value;
        }
        get displayValue() {
            return this._blocks.reduce(((str, b) => str += b.displayValue), "");
        }
        appendTail(tail) {
            return super.appendTail(tail).aggregate(this._appendPlaceholder());
        }
        _appendEager() {
            var _this$_mapPosToBlock;
            const details = new ChangeDetails;
            let startBlockIndex = (_this$_mapPosToBlock = this._mapPosToBlock(this.displayValue.length)) == null ? void 0 : _this$_mapPosToBlock.index;
            if (startBlockIndex == null) return details;
            if (this._blocks[startBlockIndex].isFilled) ++startBlockIndex;
            for (let bi = startBlockIndex; bi < this._blocks.length; ++bi) {
                const d = this._blocks[bi]._appendEager();
                if (!d.inserted) break;
                details.aggregate(d);
            }
            return details;
        }
        _appendCharRaw(ch, flags) {
            if (flags === void 0) flags = {};
            const blockIter = this._mapPosToBlock(this.displayValue.length);
            const details = new ChangeDetails;
            if (!blockIter) return details;
            for (let bi = blockIter.index; ;++bi) {
                var _flags$_beforeTailSta;
                const block = this._blocks[bi];
                if (!block) break;
                const blockDetails = block._appendChar(ch, {
                    ...flags,
                    _beforeTailState: (_flags$_beforeTailSta = flags._beforeTailState) == null || (_flags$_beforeTailSta = _flags$_beforeTailSta._blocks) == null ? void 0 : _flags$_beforeTailSta[bi]
                });
                const skip = blockDetails.skip;
                details.aggregate(blockDetails);
                if (skip || blockDetails.rawInserted) break;
            }
            return details;
        }
        extractTail(fromPos, toPos) {
            if (fromPos === void 0) fromPos = 0;
            if (toPos === void 0) toPos = this.displayValue.length;
            const chunkTail = new ChunksTailDetails;
            if (fromPos === toPos) return chunkTail;
            this._forEachBlocksInRange(fromPos, toPos, ((b, bi, bFromPos, bToPos) => {
                const blockChunk = b.extractTail(bFromPos, bToPos);
                blockChunk.stop = this._findStopBefore(bi);
                blockChunk.from = this._blockStartPos(bi);
                if (blockChunk instanceof ChunksTailDetails) blockChunk.blockIndex = bi;
                chunkTail.extend(blockChunk);
            }));
            return chunkTail;
        }
        extractInput(fromPos, toPos, flags) {
            if (fromPos === void 0) fromPos = 0;
            if (toPos === void 0) toPos = this.displayValue.length;
            if (flags === void 0) flags = {};
            if (fromPos === toPos) return "";
            let input = "";
            this._forEachBlocksInRange(fromPos, toPos, ((b, _, fromPos, toPos) => {
                input += b.extractInput(fromPos, toPos, flags);
            }));
            return input;
        }
        _findStopBefore(blockIndex) {
            let stopBefore;
            for (let si = 0; si < this._stops.length; ++si) {
                const stop = this._stops[si];
                if (stop <= blockIndex) stopBefore = stop; else break;
            }
            return stopBefore;
        }
        _appendPlaceholder(toBlockIndex) {
            const details = new ChangeDetails;
            if (this.lazy && toBlockIndex == null) return details;
            const startBlockIter = this._mapPosToBlock(this.displayValue.length);
            if (!startBlockIter) return details;
            const startBlockIndex = startBlockIter.index;
            const endBlockIndex = toBlockIndex != null ? toBlockIndex : this._blocks.length;
            this._blocks.slice(startBlockIndex, endBlockIndex).forEach((b => {
                if (!b.lazy || toBlockIndex != null) {
                    var _blocks2;
                    const bDetails = b._appendPlaceholder((_blocks2 = b._blocks) == null ? void 0 : _blocks2.length);
                    this._value += bDetails.inserted;
                    details.aggregate(bDetails);
                }
            }));
            return details;
        }
        _mapPosToBlock(pos) {
            let accVal = "";
            for (let bi = 0; bi < this._blocks.length; ++bi) {
                const block = this._blocks[bi];
                const blockStartPos = accVal.length;
                accVal += block.displayValue;
                if (pos <= accVal.length) return {
                    index: bi,
                    offset: pos - blockStartPos
                };
            }
        }
        _blockStartPos(blockIndex) {
            return this._blocks.slice(0, blockIndex).reduce(((pos, b) => pos += b.displayValue.length), 0);
        }
        _forEachBlocksInRange(fromPos, toPos, fn) {
            if (toPos === void 0) toPos = this.displayValue.length;
            const fromBlockIter = this._mapPosToBlock(fromPos);
            if (fromBlockIter) {
                const toBlockIter = this._mapPosToBlock(toPos);
                const isSameBlock = toBlockIter && fromBlockIter.index === toBlockIter.index;
                const fromBlockStartPos = fromBlockIter.offset;
                const fromBlockEndPos = toBlockIter && isSameBlock ? toBlockIter.offset : this._blocks[fromBlockIter.index].displayValue.length;
                fn(this._blocks[fromBlockIter.index], fromBlockIter.index, fromBlockStartPos, fromBlockEndPos);
                if (toBlockIter && !isSameBlock) {
                    for (let bi = fromBlockIter.index + 1; bi < toBlockIter.index; ++bi) fn(this._blocks[bi], bi, 0, this._blocks[bi].displayValue.length);
                    fn(this._blocks[toBlockIter.index], toBlockIter.index, 0, toBlockIter.offset);
                }
            }
        }
        remove(fromPos, toPos) {
            if (fromPos === void 0) fromPos = 0;
            if (toPos === void 0) toPos = this.displayValue.length;
            const removeDetails = super.remove(fromPos, toPos);
            this._forEachBlocksInRange(fromPos, toPos, ((b, _, bFromPos, bToPos) => {
                removeDetails.aggregate(b.remove(bFromPos, bToPos));
            }));
            return removeDetails;
        }
        nearestInputPos(cursorPos, direction) {
            if (direction === void 0) direction = DIRECTION.NONE;
            if (!this._blocks.length) return 0;
            const cursor = new PatternCursor(this, cursorPos);
            if (direction === DIRECTION.NONE) {
                if (cursor.pushRightBeforeInput()) return cursor.pos;
                cursor.popState();
                if (cursor.pushLeftBeforeInput()) return cursor.pos;
                return this.displayValue.length;
            }
            if (direction === DIRECTION.LEFT || direction === DIRECTION.FORCE_LEFT) {
                if (direction === DIRECTION.LEFT) {
                    cursor.pushRightBeforeFilled();
                    if (cursor.ok && cursor.pos === cursorPos) return cursorPos;
                    cursor.popState();
                }
                cursor.pushLeftBeforeInput();
                cursor.pushLeftBeforeRequired();
                cursor.pushLeftBeforeFilled();
                if (direction === DIRECTION.LEFT) {
                    cursor.pushRightBeforeInput();
                    cursor.pushRightBeforeRequired();
                    if (cursor.ok && cursor.pos <= cursorPos) return cursor.pos;
                    cursor.popState();
                    if (cursor.ok && cursor.pos <= cursorPos) return cursor.pos;
                    cursor.popState();
                }
                if (cursor.ok) return cursor.pos;
                if (direction === DIRECTION.FORCE_LEFT) return 0;
                cursor.popState();
                if (cursor.ok) return cursor.pos;
                cursor.popState();
                if (cursor.ok) return cursor.pos;
                return 0;
            }
            if (direction === DIRECTION.RIGHT || direction === DIRECTION.FORCE_RIGHT) {
                cursor.pushRightBeforeInput();
                cursor.pushRightBeforeRequired();
                if (cursor.pushRightBeforeFilled()) return cursor.pos;
                if (direction === DIRECTION.FORCE_RIGHT) return this.displayValue.length;
                cursor.popState();
                if (cursor.ok) return cursor.pos;
                cursor.popState();
                if (cursor.ok) return cursor.pos;
                return this.nearestInputPos(cursorPos, DIRECTION.LEFT);
            }
            return cursorPos;
        }
        totalInputPositions(fromPos, toPos) {
            if (fromPos === void 0) fromPos = 0;
            if (toPos === void 0) toPos = this.displayValue.length;
            let total = 0;
            this._forEachBlocksInRange(fromPos, toPos, ((b, _, bFromPos, bToPos) => {
                total += b.totalInputPositions(bFromPos, bToPos);
            }));
            return total;
        }
        maskedBlock(name) {
            return this.maskedBlocks(name)[0];
        }
        maskedBlocks(name) {
            const indices = this._maskedBlocks[name];
            if (!indices) return [];
            return indices.map((gi => this._blocks[gi]));
        }
    }
    MaskedPattern.DEFAULTS = {
        lazy: true,
        placeholderChar: "_"
    };
    MaskedPattern.STOP_CHAR = "`";
    MaskedPattern.ESCAPE_CHAR = "\\";
    MaskedPattern.InputDefinition = PatternInputDefinition;
    MaskedPattern.FixedDefinition = PatternFixedDefinition;
    IMask.MaskedPattern = MaskedPattern;
    class MaskedRange extends MaskedPattern {
        get _matchFrom() {
            return this.maxLength - String(this.from).length;
        }
        constructor(opts) {
            super(opts);
        }
        updateOptions(opts) {
            super.updateOptions(opts);
        }
        _update(opts) {
            const {to = this.to || 0, from = this.from || 0, maxLength = this.maxLength || 0, autofix = this.autofix, ...patternOpts} = opts;
            this.to = to;
            this.from = from;
            this.maxLength = Math.max(String(to).length, maxLength);
            this.autofix = autofix;
            const fromStr = String(this.from).padStart(this.maxLength, "0");
            const toStr = String(this.to).padStart(this.maxLength, "0");
            let sameCharsCount = 0;
            while (sameCharsCount < toStr.length && toStr[sameCharsCount] === fromStr[sameCharsCount]) ++sameCharsCount;
            patternOpts.mask = toStr.slice(0, sameCharsCount).replace(/0/g, "\\0") + "0".repeat(this.maxLength - sameCharsCount);
            super._update(patternOpts);
        }
        get isComplete() {
            return super.isComplete && Boolean(this.value);
        }
        boundaries(str) {
            let minstr = "";
            let maxstr = "";
            const [, placeholder, num] = str.match(/^(\D*)(\d*)(\D*)/) || [];
            if (num) {
                minstr = "0".repeat(placeholder.length) + num;
                maxstr = "9".repeat(placeholder.length) + num;
            }
            minstr = minstr.padEnd(this.maxLength, "0");
            maxstr = maxstr.padEnd(this.maxLength, "9");
            return [ minstr, maxstr ];
        }
        doPrepareChar(ch, flags) {
            if (flags === void 0) flags = {};
            let details;
            [ch, details] = super.doPrepareChar(ch.replace(/\D/g, ""), flags);
            if (!this.autofix || !ch) return [ ch, details ];
            const fromStr = String(this.from).padStart(this.maxLength, "0");
            const toStr = String(this.to).padStart(this.maxLength, "0");
            const nextVal = this.value + ch;
            if (nextVal.length > this.maxLength) return [ "", details ];
            const [minstr, maxstr] = this.boundaries(nextVal);
            if (Number(maxstr) < this.from) return [ fromStr[nextVal.length - 1], details ];
            if (Number(minstr) > this.to) {
                if (this.autofix === "pad" && nextVal.length < this.maxLength) return [ "", details.aggregate(this.append(fromStr[nextVal.length - 1] + ch, flags)) ];
                return [ toStr[nextVal.length - 1], details ];
            }
            return [ ch, details ];
        }
        doValidate(flags) {
            const str = this.value;
            const firstNonZero = str.search(/[^0]/);
            if (firstNonZero === -1 && str.length <= this._matchFrom) return true;
            const [minstr, maxstr] = this.boundaries(str);
            return this.from <= Number(maxstr) && Number(minstr) <= this.to && super.doValidate(flags);
        }
    }
    IMask.MaskedRange = MaskedRange;
    class MaskedDate extends MaskedPattern {
        constructor(opts) {
            const {mask, pattern, ...patternOpts} = {
                ...MaskedDate.DEFAULTS,
                ...opts
            };
            super({
                ...patternOpts,
                mask: isString(mask) ? mask : pattern
            });
        }
        updateOptions(opts) {
            super.updateOptions(opts);
        }
        _update(opts) {
            const {mask, pattern, blocks, ...patternOpts} = {
                ...MaskedDate.DEFAULTS,
                ...opts
            };
            const patternBlocks = Object.assign({}, MaskedDate.GET_DEFAULT_BLOCKS());
            if (opts.min) patternBlocks.Y.from = opts.min.getFullYear();
            if (opts.max) patternBlocks.Y.to = opts.max.getFullYear();
            if (opts.min && opts.max && patternBlocks.Y.from === patternBlocks.Y.to) {
                patternBlocks.m.from = opts.min.getMonth() + 1;
                patternBlocks.m.to = opts.max.getMonth() + 1;
                if (patternBlocks.m.from === patternBlocks.m.to) {
                    patternBlocks.d.from = opts.min.getDate();
                    patternBlocks.d.to = opts.max.getDate();
                }
            }
            Object.assign(patternBlocks, this.blocks, blocks);
            Object.keys(patternBlocks).forEach((bk => {
                const b = patternBlocks[bk];
                if (!("autofix" in b) && "autofix" in opts) b.autofix = opts.autofix;
            }));
            super._update({
                ...patternOpts,
                mask: isString(mask) ? mask : pattern,
                blocks: patternBlocks
            });
        }
        doValidate(flags) {
            const date = this.date;
            return super.doValidate(flags) && (!this.isComplete || this.isDateExist(this.value) && date != null && (this.min == null || this.min <= date) && (this.max == null || date <= this.max));
        }
        isDateExist(str) {
            return this.format(this.parse(str, this), this).indexOf(str) >= 0;
        }
        get date() {
            return this.typedValue;
        }
        set date(date) {
            this.typedValue = date;
        }
        get typedValue() {
            return this.isComplete ? super.typedValue : null;
        }
        set typedValue(value) {
            super.typedValue = value;
        }
        maskEquals(mask) {
            return mask === Date || super.maskEquals(mask);
        }
    }
    MaskedDate.GET_DEFAULT_BLOCKS = () => ({
        d: {
            mask: MaskedRange,
            from: 1,
            to: 31,
            maxLength: 2
        },
        m: {
            mask: MaskedRange,
            from: 1,
            to: 12,
            maxLength: 2
        },
        Y: {
            mask: MaskedRange,
            from: 1900,
            to: 9999
        }
    });
    MaskedDate.DEFAULTS = {
        mask: Date,
        pattern: "d{.}`m{.}`Y",
        format: (date, masked) => {
            if (!date) return "";
            const day = String(date.getDate()).padStart(2, "0");
            const month = String(date.getMonth() + 1).padStart(2, "0");
            const year = date.getFullYear();
            return [ day, month, year ].join(".");
        },
        parse: (str, masked) => {
            const [day, month, year] = str.split(".").map(Number);
            return new Date(year, month - 1, day);
        }
    };
    IMask.MaskedDate = MaskedDate;
    class MaskedDynamic extends Masked {
        constructor(opts) {
            super({
                ...MaskedDynamic.DEFAULTS,
                ...opts
            });
            this.currentMask = void 0;
        }
        updateOptions(opts) {
            super.updateOptions(opts);
        }
        _update(opts) {
            super._update(opts);
            if ("mask" in opts) {
                this.exposeMask = void 0;
                this.compiledMasks = Array.isArray(opts.mask) ? opts.mask.map((m => {
                    const {expose, ...maskOpts} = normalizeOpts(m);
                    const masked = createMask({
                        overwrite: this._overwrite,
                        eager: this._eager,
                        skipInvalid: this._skipInvalid,
                        ...maskOpts
                    });
                    if (expose) this.exposeMask = masked;
                    return masked;
                })) : [];
            }
        }
        _appendCharRaw(ch, flags) {
            if (flags === void 0) flags = {};
            const details = this._applyDispatch(ch, flags);
            if (this.currentMask) details.aggregate(this.currentMask._appendChar(ch, this.currentMaskFlags(flags)));
            return details;
        }
        _applyDispatch(appended, flags, tail) {
            if (appended === void 0) appended = "";
            if (flags === void 0) flags = {};
            if (tail === void 0) tail = "";
            const prevValueBeforeTail = flags.tail && flags._beforeTailState != null ? flags._beforeTailState._value : this.value;
            const inputValue = this.rawInputValue;
            const insertValue = flags.tail && flags._beforeTailState != null ? flags._beforeTailState._rawInputValue : inputValue;
            const tailValue = inputValue.slice(insertValue.length);
            const prevMask = this.currentMask;
            const details = new ChangeDetails;
            const prevMaskState = prevMask == null ? void 0 : prevMask.state;
            this.currentMask = this.doDispatch(appended, {
                ...flags
            }, tail);
            if (this.currentMask) if (this.currentMask !== prevMask) {
                this.currentMask.reset();
                if (insertValue) {
                    const d = this.currentMask.append(insertValue, {
                        raw: true
                    });
                    details.tailShift = d.inserted.length - prevValueBeforeTail.length;
                }
                if (tailValue) details.tailShift += this.currentMask.append(tailValue, {
                    raw: true,
                    tail: true
                }).tailShift;
            } else if (prevMaskState) this.currentMask.state = prevMaskState;
            return details;
        }
        _appendPlaceholder() {
            const details = this._applyDispatch();
            if (this.currentMask) details.aggregate(this.currentMask._appendPlaceholder());
            return details;
        }
        _appendEager() {
            const details = this._applyDispatch();
            if (this.currentMask) details.aggregate(this.currentMask._appendEager());
            return details;
        }
        appendTail(tail) {
            const details = new ChangeDetails;
            if (tail) details.aggregate(this._applyDispatch("", {}, tail));
            return details.aggregate(this.currentMask ? this.currentMask.appendTail(tail) : super.appendTail(tail));
        }
        currentMaskFlags(flags) {
            var _flags$_beforeTailSta, _flags$_beforeTailSta2;
            return {
                ...flags,
                _beforeTailState: ((_flags$_beforeTailSta = flags._beforeTailState) == null ? void 0 : _flags$_beforeTailSta.currentMaskRef) === this.currentMask && ((_flags$_beforeTailSta2 = flags._beforeTailState) == null ? void 0 : _flags$_beforeTailSta2.currentMask) || flags._beforeTailState
            };
        }
        doDispatch(appended, flags, tail) {
            if (flags === void 0) flags = {};
            if (tail === void 0) tail = "";
            return this.dispatch(appended, this, flags, tail);
        }
        doValidate(flags) {
            return super.doValidate(flags) && (!this.currentMask || this.currentMask.doValidate(this.currentMaskFlags(flags)));
        }
        doPrepare(str, flags) {
            if (flags === void 0) flags = {};
            let [s, details] = super.doPrepare(str, flags);
            if (this.currentMask) {
                let currentDetails;
                [s, currentDetails] = super.doPrepare(s, this.currentMaskFlags(flags));
                details = details.aggregate(currentDetails);
            }
            return [ s, details ];
        }
        doPrepareChar(str, flags) {
            if (flags === void 0) flags = {};
            let [s, details] = super.doPrepareChar(str, flags);
            if (this.currentMask) {
                let currentDetails;
                [s, currentDetails] = super.doPrepareChar(s, this.currentMaskFlags(flags));
                details = details.aggregate(currentDetails);
            }
            return [ s, details ];
        }
        reset() {
            var _this$currentMask;
            (_this$currentMask = this.currentMask) == null ? void 0 : _this$currentMask.reset();
            this.compiledMasks.forEach((m => m.reset()));
        }
        get value() {
            return this.exposeMask ? this.exposeMask.value : this.currentMask ? this.currentMask.value : "";
        }
        set value(value) {
            if (this.exposeMask) {
                this.exposeMask.value = value;
                this.currentMask = this.exposeMask;
                this._applyDispatch();
            } else super.value = value;
        }
        get unmaskedValue() {
            return this.exposeMask ? this.exposeMask.unmaskedValue : this.currentMask ? this.currentMask.unmaskedValue : "";
        }
        set unmaskedValue(unmaskedValue) {
            if (this.exposeMask) {
                this.exposeMask.unmaskedValue = unmaskedValue;
                this.currentMask = this.exposeMask;
                this._applyDispatch();
            } else super.unmaskedValue = unmaskedValue;
        }
        get typedValue() {
            return this.exposeMask ? this.exposeMask.typedValue : this.currentMask ? this.currentMask.typedValue : "";
        }
        set typedValue(typedValue) {
            if (this.exposeMask) {
                this.exposeMask.typedValue = typedValue;
                this.currentMask = this.exposeMask;
                this._applyDispatch();
                return;
            }
            let unmaskedValue = String(typedValue);
            if (this.currentMask) {
                this.currentMask.typedValue = typedValue;
                unmaskedValue = this.currentMask.unmaskedValue;
            }
            this.unmaskedValue = unmaskedValue;
        }
        get displayValue() {
            return this.currentMask ? this.currentMask.displayValue : "";
        }
        get isComplete() {
            var _this$currentMask2;
            return Boolean((_this$currentMask2 = this.currentMask) == null ? void 0 : _this$currentMask2.isComplete);
        }
        get isFilled() {
            var _this$currentMask3;
            return Boolean((_this$currentMask3 = this.currentMask) == null ? void 0 : _this$currentMask3.isFilled);
        }
        remove(fromPos, toPos) {
            const details = new ChangeDetails;
            if (this.currentMask) details.aggregate(this.currentMask.remove(fromPos, toPos)).aggregate(this._applyDispatch());
            return details;
        }
        get state() {
            var _this$currentMask4;
            return {
                ...super.state,
                _rawInputValue: this.rawInputValue,
                compiledMasks: this.compiledMasks.map((m => m.state)),
                currentMaskRef: this.currentMask,
                currentMask: (_this$currentMask4 = this.currentMask) == null ? void 0 : _this$currentMask4.state
            };
        }
        set state(state) {
            const {compiledMasks, currentMaskRef, currentMask, ...maskedState} = state;
            if (compiledMasks) this.compiledMasks.forEach(((m, mi) => m.state = compiledMasks[mi]));
            if (currentMaskRef != null) {
                this.currentMask = currentMaskRef;
                this.currentMask.state = currentMask;
            }
            super.state = maskedState;
        }
        extractInput(fromPos, toPos, flags) {
            return this.currentMask ? this.currentMask.extractInput(fromPos, toPos, flags) : "";
        }
        extractTail(fromPos, toPos) {
            return this.currentMask ? this.currentMask.extractTail(fromPos, toPos) : super.extractTail(fromPos, toPos);
        }
        doCommit() {
            if (this.currentMask) this.currentMask.doCommit();
            super.doCommit();
        }
        nearestInputPos(cursorPos, direction) {
            return this.currentMask ? this.currentMask.nearestInputPos(cursorPos, direction) : super.nearestInputPos(cursorPos, direction);
        }
        get overwrite() {
            return this.currentMask ? this.currentMask.overwrite : this._overwrite;
        }
        set overwrite(overwrite) {
            this._overwrite = overwrite;
        }
        get eager() {
            return this.currentMask ? this.currentMask.eager : this._eager;
        }
        set eager(eager) {
            this._eager = eager;
        }
        get skipInvalid() {
            return this.currentMask ? this.currentMask.skipInvalid : this._skipInvalid;
        }
        set skipInvalid(skipInvalid) {
            this._skipInvalid = skipInvalid;
        }
        maskEquals(mask) {
            return Array.isArray(mask) ? this.compiledMasks.every(((m, mi) => {
                if (!mask[mi]) return;
                const {mask: oldMask, ...restOpts} = mask[mi];
                return objectIncludes(m, restOpts) && m.maskEquals(oldMask);
            })) : super.maskEquals(mask);
        }
        typedValueEquals(value) {
            var _this$currentMask5;
            return Boolean((_this$currentMask5 = this.currentMask) == null ? void 0 : _this$currentMask5.typedValueEquals(value));
        }
    }
    MaskedDynamic.DEFAULTS = void 0;
    MaskedDynamic.DEFAULTS = {
        dispatch: (appended, masked, flags, tail) => {
            if (!masked.compiledMasks.length) return;
            const inputValue = masked.rawInputValue;
            const inputs = masked.compiledMasks.map(((m, index) => {
                const isCurrent = masked.currentMask === m;
                const startInputPos = isCurrent ? m.displayValue.length : m.nearestInputPos(m.displayValue.length, DIRECTION.FORCE_LEFT);
                if (m.rawInputValue !== inputValue) {
                    m.reset();
                    m.append(inputValue, {
                        raw: true
                    });
                } else if (!isCurrent) m.remove(startInputPos);
                m.append(appended, masked.currentMaskFlags(flags));
                m.appendTail(tail);
                return {
                    index,
                    weight: m.rawInputValue.length,
                    totalInputPositions: m.totalInputPositions(0, Math.max(startInputPos, m.nearestInputPos(m.displayValue.length, DIRECTION.FORCE_LEFT)))
                };
            }));
            inputs.sort(((i1, i2) => i2.weight - i1.weight || i2.totalInputPositions - i1.totalInputPositions));
            return masked.compiledMasks[inputs[0].index];
        }
    };
    IMask.MaskedDynamic = MaskedDynamic;
    class MaskedEnum extends MaskedPattern {
        constructor(opts) {
            super(opts);
        }
        updateOptions(opts) {
            super.updateOptions(opts);
        }
        _update(opts) {
            const {enum: _enum, ...eopts} = opts;
            if (_enum) {
                const lengths = _enum.map((e => e.length));
                const requiredLength = Math.min(...lengths);
                const optionalLength = Math.max(...lengths) - requiredLength;
                eopts.mask = "*".repeat(requiredLength);
                if (optionalLength) eopts.mask += "[" + "*".repeat(optionalLength) + "]";
                this.enum = _enum;
            }
            super._update(eopts);
        }
        doValidate(flags) {
            return this.enum.some((e => e.indexOf(this.unmaskedValue) === 0)) && super.doValidate(flags);
        }
    }
    IMask.MaskedEnum = MaskedEnum;
    class MaskedFunction extends Masked {
        updateOptions(opts) {
            super.updateOptions(opts);
        }
        _update(opts) {
            super._update({
                ...opts,
                validate: opts.mask
            });
        }
    }
    IMask.MaskedFunction = MaskedFunction;
    class MaskedNumber extends Masked {
        constructor(opts) {
            super({
                ...MaskedNumber.DEFAULTS,
                ...opts
            });
        }
        updateOptions(opts) {
            super.updateOptions(opts);
        }
        _update(opts) {
            super._update(opts);
            this._updateRegExps();
        }
        _updateRegExps() {
            const start = "^" + (this.allowNegative ? "[+|\\-]?" : "");
            const mid = "\\d*";
            const end = (this.scale ? "(" + escapeRegExp(this.radix) + "\\d{0," + this.scale + "})?" : "") + "$";
            this._numberRegExp = new RegExp(start + mid + end);
            this._mapToRadixRegExp = new RegExp("[" + this.mapToRadix.map(escapeRegExp).join("") + "]", "g");
            this._thousandsSeparatorRegExp = new RegExp(escapeRegExp(this.thousandsSeparator), "g");
        }
        _removeThousandsSeparators(value) {
            return value.replace(this._thousandsSeparatorRegExp, "");
        }
        _insertThousandsSeparators(value) {
            const parts = value.split(this.radix);
            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, this.thousandsSeparator);
            return parts.join(this.radix);
        }
        doPrepareChar(ch, flags) {
            if (flags === void 0) flags = {};
            ch = this._removeThousandsSeparators(this.scale && this.mapToRadix.length && (flags.input && flags.raw || !flags.input && !flags.raw) ? ch.replace(this._mapToRadixRegExp, this.radix) : ch);
            const [prepCh, details] = super.doPrepareChar(ch, flags);
            if (ch && !prepCh) details.skip = true;
            if (prepCh && !this.allowPositive && !this.value && prepCh !== "-") details.aggregate(this._appendChar("-"));
            return [ prepCh, details ];
        }
        _separatorsCount(to, extendOnSeparators) {
            if (extendOnSeparators === void 0) extendOnSeparators = false;
            let count = 0;
            for (let pos = 0; pos < to; ++pos) if (this._value.indexOf(this.thousandsSeparator, pos) === pos) {
                ++count;
                if (extendOnSeparators) to += this.thousandsSeparator.length;
            }
            return count;
        }
        _separatorsCountFromSlice(slice) {
            if (slice === void 0) slice = this._value;
            return this._separatorsCount(this._removeThousandsSeparators(slice).length, true);
        }
        extractInput(fromPos, toPos, flags) {
            if (fromPos === void 0) fromPos = 0;
            if (toPos === void 0) toPos = this.displayValue.length;
            [fromPos, toPos] = this._adjustRangeWithSeparators(fromPos, toPos);
            return this._removeThousandsSeparators(super.extractInput(fromPos, toPos, flags));
        }
        _appendCharRaw(ch, flags) {
            if (flags === void 0) flags = {};
            if (!this.thousandsSeparator) return super._appendCharRaw(ch, flags);
            const prevBeforeTailValue = flags.tail && flags._beforeTailState ? flags._beforeTailState._value : this._value;
            const prevBeforeTailSeparatorsCount = this._separatorsCountFromSlice(prevBeforeTailValue);
            this._value = this._removeThousandsSeparators(this.value);
            const appendDetails = super._appendCharRaw(ch, flags);
            this._value = this._insertThousandsSeparators(this._value);
            const beforeTailValue = flags.tail && flags._beforeTailState ? flags._beforeTailState._value : this._value;
            const beforeTailSeparatorsCount = this._separatorsCountFromSlice(beforeTailValue);
            appendDetails.tailShift += (beforeTailSeparatorsCount - prevBeforeTailSeparatorsCount) * this.thousandsSeparator.length;
            appendDetails.skip = !appendDetails.rawInserted && ch === this.thousandsSeparator;
            return appendDetails;
        }
        _findSeparatorAround(pos) {
            if (this.thousandsSeparator) {
                const searchFrom = pos - this.thousandsSeparator.length + 1;
                const separatorPos = this.value.indexOf(this.thousandsSeparator, searchFrom);
                if (separatorPos <= pos) return separatorPos;
            }
            return -1;
        }
        _adjustRangeWithSeparators(from, to) {
            const separatorAroundFromPos = this._findSeparatorAround(from);
            if (separatorAroundFromPos >= 0) from = separatorAroundFromPos;
            const separatorAroundToPos = this._findSeparatorAround(to);
            if (separatorAroundToPos >= 0) to = separatorAroundToPos + this.thousandsSeparator.length;
            return [ from, to ];
        }
        remove(fromPos, toPos) {
            if (fromPos === void 0) fromPos = 0;
            if (toPos === void 0) toPos = this.displayValue.length;
            [fromPos, toPos] = this._adjustRangeWithSeparators(fromPos, toPos);
            const valueBeforePos = this.value.slice(0, fromPos);
            const valueAfterPos = this.value.slice(toPos);
            const prevBeforeTailSeparatorsCount = this._separatorsCount(valueBeforePos.length);
            this._value = this._insertThousandsSeparators(this._removeThousandsSeparators(valueBeforePos + valueAfterPos));
            const beforeTailSeparatorsCount = this._separatorsCountFromSlice(valueBeforePos);
            return new ChangeDetails({
                tailShift: (beforeTailSeparatorsCount - prevBeforeTailSeparatorsCount) * this.thousandsSeparator.length
            });
        }
        nearestInputPos(cursorPos, direction) {
            if (!this.thousandsSeparator) return cursorPos;
            switch (direction) {
              case DIRECTION.NONE:
              case DIRECTION.LEFT:
              case DIRECTION.FORCE_LEFT:
                {
                    const separatorAtLeftPos = this._findSeparatorAround(cursorPos - 1);
                    if (separatorAtLeftPos >= 0) {
                        const separatorAtLeftEndPos = separatorAtLeftPos + this.thousandsSeparator.length;
                        if (cursorPos < separatorAtLeftEndPos || this.value.length <= separatorAtLeftEndPos || direction === DIRECTION.FORCE_LEFT) return separatorAtLeftPos;
                    }
                    break;
                }

              case DIRECTION.RIGHT:
              case DIRECTION.FORCE_RIGHT:
                {
                    const separatorAtRightPos = this._findSeparatorAround(cursorPos);
                    if (separatorAtRightPos >= 0) return separatorAtRightPos + this.thousandsSeparator.length;
                }
            }
            return cursorPos;
        }
        doValidate(flags) {
            let valid = Boolean(this._removeThousandsSeparators(this.value).match(this._numberRegExp));
            if (valid) {
                const number = this.number;
                valid = valid && !isNaN(number) && (this.min == null || this.min >= 0 || this.min <= this.number) && (this.max == null || this.max <= 0 || this.number <= this.max);
            }
            return valid && super.doValidate(flags);
        }
        doCommit() {
            if (this.value) {
                const number = this.number;
                let validnum = number;
                if (this.min != null) validnum = Math.max(validnum, this.min);
                if (this.max != null) validnum = Math.min(validnum, this.max);
                if (validnum !== number) this.unmaskedValue = this.format(validnum, this);
                let formatted = this.value;
                if (this.normalizeZeros) formatted = this._normalizeZeros(formatted);
                if (this.padFractionalZeros && this.scale > 0) formatted = this._padFractionalZeros(formatted);
                this._value = formatted;
            }
            super.doCommit();
        }
        _normalizeZeros(value) {
            const parts = this._removeThousandsSeparators(value).split(this.radix);
            parts[0] = parts[0].replace(/^(\D*)(0*)(\d*)/, ((match, sign, zeros, num) => sign + num));
            if (value.length && !/\d$/.test(parts[0])) parts[0] = parts[0] + "0";
            if (parts.length > 1) {
                parts[1] = parts[1].replace(/0*$/, "");
                if (!parts[1].length) parts.length = 1;
            }
            return this._insertThousandsSeparators(parts.join(this.radix));
        }
        _padFractionalZeros(value) {
            if (!value) return value;
            const parts = value.split(this.radix);
            if (parts.length < 2) parts.push("");
            parts[1] = parts[1].padEnd(this.scale, "0");
            return parts.join(this.radix);
        }
        doSkipInvalid(ch, flags, checkTail) {
            if (flags === void 0) flags = {};
            const dropFractional = this.scale === 0 && ch !== this.thousandsSeparator && (ch === this.radix || ch === MaskedNumber.UNMASKED_RADIX || this.mapToRadix.includes(ch));
            return super.doSkipInvalid(ch, flags, checkTail) && !dropFractional;
        }
        get unmaskedValue() {
            return this._removeThousandsSeparators(this._normalizeZeros(this.value)).replace(this.radix, MaskedNumber.UNMASKED_RADIX);
        }
        set unmaskedValue(unmaskedValue) {
            super.unmaskedValue = unmaskedValue;
        }
        get typedValue() {
            return this.parse(this.unmaskedValue, this);
        }
        set typedValue(n) {
            this.rawInputValue = this.format(n, this).replace(MaskedNumber.UNMASKED_RADIX, this.radix);
        }
        get number() {
            return this.typedValue;
        }
        set number(number) {
            this.typedValue = number;
        }
        get allowNegative() {
            return this.min != null && this.min < 0 || this.max != null && this.max < 0;
        }
        get allowPositive() {
            return this.min != null && this.min > 0 || this.max != null && this.max > 0;
        }
        typedValueEquals(value) {
            return (super.typedValueEquals(value) || MaskedNumber.EMPTY_VALUES.includes(value) && MaskedNumber.EMPTY_VALUES.includes(this.typedValue)) && !(value === 0 && this.value === "");
        }
    }
    MaskedNumber.UNMASKED_RADIX = ".";
    MaskedNumber.EMPTY_VALUES = [ ...Masked.EMPTY_VALUES, 0 ];
    MaskedNumber.DEFAULTS = {
        mask: Number,
        radix: ",",
        thousandsSeparator: "",
        mapToRadix: [ MaskedNumber.UNMASKED_RADIX ],
        min: Number.MIN_SAFE_INTEGER,
        max: Number.MAX_SAFE_INTEGER,
        scale: 2,
        normalizeZeros: true,
        padFractionalZeros: false,
        parse: Number,
        format: n => n.toLocaleString("en-US", {
            useGrouping: false,
            maximumFractionDigits: 20
        })
    };
    IMask.MaskedNumber = MaskedNumber;
    const PIPE_TYPE = {
        MASKED: "value",
        UNMASKED: "unmaskedValue",
        TYPED: "typedValue"
    };
    function createPipe(arg, from, to) {
        if (from === void 0) from = PIPE_TYPE.MASKED;
        if (to === void 0) to = PIPE_TYPE.MASKED;
        const masked = createMask(arg);
        return value => masked.runIsolated((m => {
            m[from] = value;
            return m[to];
        }));
    }
    function pipe(value, mask, from, to) {
        return createPipe(mask, from, to)(value);
    }
    IMask.PIPE_TYPE = PIPE_TYPE;
    IMask.createPipe = createPipe;
    IMask.pipe = pipe;
    try {
        globalThis.IMask = IMask;
    } catch {}
    const maskOptions = {
        mask: "+{7} (000) 000-00-00"
    };
    const inputPhone = document.querySelectorAll(".jsInputPhone");
    for (let i = 0; i < inputPhone.length; i++) new IMask(inputPhone[i], maskOptions);
    function checkInputState() {
        const input = document.querySelectorAll(".jsInput");
        const checkChange = function(that) {
            const val = that.value;
            if (val) that.parentNode.classList.add("is-changed"); else {
                that.parentNode.classList.remove("is-changed");
                that.parentNode.classList.remove("is-error");
            }
        };
        for (let i = 0; i < input.length; i++) {
            input[i].addEventListener("focus", (function() {
                this.parentNode.classList.add("is-focused");
                checkChange(this);
            }));
            input[i].addEventListener("blur", (function() {
                this.parentNode.classList.remove("is-focused");
                checkChange(this);
            }));
            input[i].addEventListener("input", (function() {
                checkChange(this);
            }));
        }
    }
    document.addEventListener("DOMContentLoaded", checkInputState);
    const inputPasswordTrigger = document.querySelectorAll(".jsInputPasswordTrigger");
    if (inputPasswordTrigger) for (let i = 0; i < inputPasswordTrigger.length; i++) inputPasswordTrigger[i].addEventListener("click", (function() {
        const parent = this.closest(".input");
        const input = parent.querySelector(".jsInput");
        if (!parent.classList.contains("is-active")) {
            parent.classList.add("is-active");
            input.type = "text";
        } else {
            parent.classList.remove("is-active");
            input.type = "password";
        }
    }));
    const tabs = document.querySelectorAll(".jsTabs");
    for (let a = 0; a < tabs.length; a++) {
        const tabBtns = tabs[a].querySelectorAll(".jsTabsBtn");
        const tabItems = tabs[a].querySelectorAll(".jsTabsItem");
        for (let i = 0; i < tabBtns.length; i++) tabBtns[i].addEventListener("click", (function() {
            const id = this.getAttribute("data-id");
            tabs[a].querySelector('.jsTabsBtn[data-id="' + id + '"]');
            const activeItem = tabs[a].querySelector('.jsTabsItem[data-id="' + id + '"]');
            for (var b = 0; b < tabItems.length; b++) if (tabItems[b].classList.contains("is-active")) {
                tabItems[b].classList.remove("is-active");
                activeItem.classList.add("is-active");
            }
            tabs[a].querySelector(".jsTabsBtn.is-active").classList.remove("is-active");
            this.classList.add("is-active");
        }));
    }
    function ssr_window_esm_isObject(obj) {
        return obj !== null && typeof obj === "object" && "constructor" in obj && obj.constructor === Object;
    }
    function extend(target, src) {
        if (target === void 0) target = {};
        if (src === void 0) src = {};
        Object.keys(src).forEach((key => {
            if (typeof target[key] === "undefined") target[key] = src[key]; else if (ssr_window_esm_isObject(src[key]) && ssr_window_esm_isObject(target[key]) && Object.keys(src[key]).length > 0) extend(target[key], src[key]);
        }));
    }
    const ssrDocument = {
        body: {},
        addEventListener() {},
        removeEventListener() {},
        activeElement: {
            blur() {},
            nodeName: ""
        },
        querySelector() {
            return null;
        },
        querySelectorAll() {
            return [];
        },
        getElementById() {
            return null;
        },
        createEvent() {
            return {
                initEvent() {}
            };
        },
        createElement() {
            return {
                children: [],
                childNodes: [],
                style: {},
                setAttribute() {},
                getElementsByTagName() {
                    return [];
                }
            };
        },
        createElementNS() {
            return {};
        },
        importNode() {
            return null;
        },
        location: {
            hash: "",
            host: "",
            hostname: "",
            href: "",
            origin: "",
            pathname: "",
            protocol: "",
            search: ""
        }
    };
    function getDocument() {
        const doc = typeof document !== "undefined" ? document : {};
        extend(doc, ssrDocument);
        return doc;
    }
    const ssrWindow = {
        document: ssrDocument,
        navigator: {
            userAgent: ""
        },
        location: {
            hash: "",
            host: "",
            hostname: "",
            href: "",
            origin: "",
            pathname: "",
            protocol: "",
            search: ""
        },
        history: {
            replaceState() {},
            pushState() {},
            go() {},
            back() {}
        },
        CustomEvent: function CustomEvent() {
            return this;
        },
        addEventListener() {},
        removeEventListener() {},
        getComputedStyle() {
            return {
                getPropertyValue() {
                    return "";
                }
            };
        },
        Image() {},
        Date() {},
        screen: {},
        setTimeout() {},
        clearTimeout() {},
        matchMedia() {
            return {};
        },
        requestAnimationFrame(callback) {
            if (typeof setTimeout === "undefined") {
                callback();
                return null;
            }
            return setTimeout(callback, 0);
        },
        cancelAnimationFrame(id) {
            if (typeof setTimeout === "undefined") return;
            clearTimeout(id);
        }
    };
    function ssr_window_esm_getWindow() {
        const win = typeof window !== "undefined" ? window : {};
        extend(win, ssrWindow);
        return win;
    }
    function deleteProps(obj) {
        const object = obj;
        Object.keys(object).forEach((key => {
            try {
                object[key] = null;
            } catch (e) {}
            try {
                delete object[key];
            } catch (e) {}
        }));
    }
    function nextTick(callback, delay) {
        if (delay === void 0) delay = 0;
        return setTimeout(callback, delay);
    }
    function now() {
        return Date.now();
    }
    function utils_getComputedStyle(el) {
        const window = ssr_window_esm_getWindow();
        let style;
        if (window.getComputedStyle) style = window.getComputedStyle(el, null);
        if (!style && el.currentStyle) style = el.currentStyle;
        if (!style) style = el.style;
        return style;
    }
    function getTranslate(el, axis) {
        if (axis === void 0) axis = "x";
        const window = ssr_window_esm_getWindow();
        let matrix;
        let curTransform;
        let transformMatrix;
        const curStyle = utils_getComputedStyle(el);
        if (window.WebKitCSSMatrix) {
            curTransform = curStyle.transform || curStyle.webkitTransform;
            if (curTransform.split(",").length > 6) curTransform = curTransform.split(", ").map((a => a.replace(",", "."))).join(", ");
            transformMatrix = new window.WebKitCSSMatrix(curTransform === "none" ? "" : curTransform);
        } else {
            transformMatrix = curStyle.MozTransform || curStyle.OTransform || curStyle.MsTransform || curStyle.msTransform || curStyle.transform || curStyle.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,");
            matrix = transformMatrix.toString().split(",");
        }
        if (axis === "x") if (window.WebKitCSSMatrix) curTransform = transformMatrix.m41; else if (matrix.length === 16) curTransform = parseFloat(matrix[12]); else curTransform = parseFloat(matrix[4]);
        if (axis === "y") if (window.WebKitCSSMatrix) curTransform = transformMatrix.m42; else if (matrix.length === 16) curTransform = parseFloat(matrix[13]); else curTransform = parseFloat(matrix[5]);
        return curTransform || 0;
    }
    function utils_isObject(o) {
        return typeof o === "object" && o !== null && o.constructor && Object.prototype.toString.call(o).slice(8, -1) === "Object";
    }
    function isNode(node) {
        if (typeof window !== "undefined" && typeof window.HTMLElement !== "undefined") return node instanceof HTMLElement;
        return node && (node.nodeType === 1 || node.nodeType === 11);
    }
    function utils_extend() {
        const to = Object(arguments.length <= 0 ? void 0 : arguments[0]);
        const noExtend = [ "__proto__", "constructor", "prototype" ];
        for (let i = 1; i < arguments.length; i += 1) {
            const nextSource = i < 0 || arguments.length <= i ? void 0 : arguments[i];
            if (nextSource !== void 0 && nextSource !== null && !isNode(nextSource)) {
                const keysArray = Object.keys(Object(nextSource)).filter((key => noExtend.indexOf(key) < 0));
                for (let nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex += 1) {
                    const nextKey = keysArray[nextIndex];
                    const desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
                    if (desc !== void 0 && desc.enumerable) if (utils_isObject(to[nextKey]) && utils_isObject(nextSource[nextKey])) if (nextSource[nextKey].__swiper__) to[nextKey] = nextSource[nextKey]; else utils_extend(to[nextKey], nextSource[nextKey]); else if (!utils_isObject(to[nextKey]) && utils_isObject(nextSource[nextKey])) {
                        to[nextKey] = {};
                        if (nextSource[nextKey].__swiper__) to[nextKey] = nextSource[nextKey]; else utils_extend(to[nextKey], nextSource[nextKey]);
                    } else to[nextKey] = nextSource[nextKey];
                }
            }
        }
        return to;
    }
    function setCSSProperty(el, varName, varValue) {
        el.style.setProperty(varName, varValue);
    }
    function animateCSSModeScroll(_ref) {
        let {swiper, targetPosition, side} = _ref;
        const window = ssr_window_esm_getWindow();
        const startPosition = -swiper.translate;
        let startTime = null;
        let time;
        const duration = swiper.params.speed;
        swiper.wrapperEl.style.scrollSnapType = "none";
        window.cancelAnimationFrame(swiper.cssModeFrameID);
        const dir = targetPosition > startPosition ? "next" : "prev";
        const isOutOfBound = (current, target) => dir === "next" && current >= target || dir === "prev" && current <= target;
        const animate = () => {
            time = (new Date).getTime();
            if (startTime === null) startTime = time;
            const progress = Math.max(Math.min((time - startTime) / duration, 1), 0);
            const easeProgress = .5 - Math.cos(progress * Math.PI) / 2;
            let currentPosition = startPosition + easeProgress * (targetPosition - startPosition);
            if (isOutOfBound(currentPosition, targetPosition)) currentPosition = targetPosition;
            swiper.wrapperEl.scrollTo({
                [side]: currentPosition
            });
            if (isOutOfBound(currentPosition, targetPosition)) {
                swiper.wrapperEl.style.overflow = "hidden";
                swiper.wrapperEl.style.scrollSnapType = "";
                setTimeout((() => {
                    swiper.wrapperEl.style.overflow = "";
                    swiper.wrapperEl.scrollTo({
                        [side]: currentPosition
                    });
                }));
                window.cancelAnimationFrame(swiper.cssModeFrameID);
                return;
            }
            swiper.cssModeFrameID = window.requestAnimationFrame(animate);
        };
        animate();
    }
    function getSlideTransformEl(slideEl) {
        return slideEl.querySelector(".swiper-slide-transform") || slideEl.shadowRoot && slideEl.shadowRoot.querySelector(".swiper-slide-transform") || slideEl;
    }
    function elementChildren(element, selector) {
        if (selector === void 0) selector = "";
        return [ ...element.children ].filter((el => el.matches(selector)));
    }
    function createElement(tag, classes) {
        if (classes === void 0) classes = [];
        const el = document.createElement(tag);
        el.classList.add(...Array.isArray(classes) ? classes : [ classes ]);
        return el;
    }
    function elementOffset(el) {
        const window = ssr_window_esm_getWindow();
        const document = getDocument();
        const box = el.getBoundingClientRect();
        const body = document.body;
        const clientTop = el.clientTop || body.clientTop || 0;
        const clientLeft = el.clientLeft || body.clientLeft || 0;
        const scrollTop = el === window ? window.scrollY : el.scrollTop;
        const scrollLeft = el === window ? window.scrollX : el.scrollLeft;
        return {
            top: box.top + scrollTop - clientTop,
            left: box.left + scrollLeft - clientLeft
        };
    }
    function elementPrevAll(el, selector) {
        const prevEls = [];
        while (el.previousElementSibling) {
            const prev = el.previousElementSibling;
            if (selector) {
                if (prev.matches(selector)) prevEls.push(prev);
            } else prevEls.push(prev);
            el = prev;
        }
        return prevEls;
    }
    function elementNextAll(el, selector) {
        const nextEls = [];
        while (el.nextElementSibling) {
            const next = el.nextElementSibling;
            if (selector) {
                if (next.matches(selector)) nextEls.push(next);
            } else nextEls.push(next);
            el = next;
        }
        return nextEls;
    }
    function elementStyle(el, prop) {
        const window = ssr_window_esm_getWindow();
        return window.getComputedStyle(el, null).getPropertyValue(prop);
    }
    function elementIndex(el) {
        let child = el;
        let i;
        if (child) {
            i = 0;
            while ((child = child.previousSibling) !== null) if (child.nodeType === 1) i += 1;
            return i;
        }
        return;
    }
    function elementParents(el, selector) {
        const parents = [];
        let parent = el.parentElement;
        while (parent) {
            if (selector) {
                if (parent.matches(selector)) parents.push(parent);
            } else parents.push(parent);
            parent = parent.parentElement;
        }
        return parents;
    }
    function elementTransitionEnd(el, callback) {
        function fireCallBack(e) {
            if (e.target !== el) return;
            callback.call(el, e);
            el.removeEventListener("transitionend", fireCallBack);
        }
        if (callback) el.addEventListener("transitionend", fireCallBack);
    }
    function elementOuterSize(el, size, includeMargins) {
        const window = ssr_window_esm_getWindow();
        if (includeMargins) return el[size === "width" ? "offsetWidth" : "offsetHeight"] + parseFloat(window.getComputedStyle(el, null).getPropertyValue(size === "width" ? "margin-right" : "margin-top")) + parseFloat(window.getComputedStyle(el, null).getPropertyValue(size === "width" ? "margin-left" : "margin-bottom"));
        return el.offsetWidth;
    }
    let support;
    function calcSupport() {
        const window = ssr_window_esm_getWindow();
        const document = getDocument();
        return {
            smoothScroll: document.documentElement && document.documentElement.style && "scrollBehavior" in document.documentElement.style,
            touch: !!("ontouchstart" in window || window.DocumentTouch && document instanceof window.DocumentTouch)
        };
    }
    function getSupport() {
        if (!support) support = calcSupport();
        return support;
    }
    let deviceCached;
    function calcDevice(_temp) {
        let {userAgent} = _temp === void 0 ? {} : _temp;
        const support = getSupport();
        const window = ssr_window_esm_getWindow();
        const platform = window.navigator.platform;
        const ua = userAgent || window.navigator.userAgent;
        const device = {
            ios: false,
            android: false
        };
        const screenWidth = window.screen.width;
        const screenHeight = window.screen.height;
        const android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
        let ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
        const ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
        const iphone = !ipad && ua.match(/(iPhone\sOS|iOS)\s([\d_]+)/);
        const windows = platform === "Win32";
        let macos = platform === "MacIntel";
        const iPadScreens = [ "1024x1366", "1366x1024", "834x1194", "1194x834", "834x1112", "1112x834", "768x1024", "1024x768", "820x1180", "1180x820", "810x1080", "1080x810" ];
        if (!ipad && macos && support.touch && iPadScreens.indexOf(`${screenWidth}x${screenHeight}`) >= 0) {
            ipad = ua.match(/(Version)\/([\d.]+)/);
            if (!ipad) ipad = [ 0, 1, "13_0_0" ];
            macos = false;
        }
        if (android && !windows) {
            device.os = "android";
            device.android = true;
        }
        if (ipad || iphone || ipod) {
            device.os = "ios";
            device.ios = true;
        }
        return device;
    }
    function getDevice(overrides) {
        if (overrides === void 0) overrides = {};
        if (!deviceCached) deviceCached = calcDevice(overrides);
        return deviceCached;
    }
    let browser;
    function calcBrowser() {
        const window = ssr_window_esm_getWindow();
        let needPerspectiveFix = false;
        function isSafari() {
            const ua = window.navigator.userAgent.toLowerCase();
            return ua.indexOf("safari") >= 0 && ua.indexOf("chrome") < 0 && ua.indexOf("android") < 0;
        }
        if (isSafari()) {
            const ua = String(window.navigator.userAgent);
            if (ua.includes("Version/")) {
                const [major, minor] = ua.split("Version/")[1].split(" ")[0].split(".").map((num => Number(num)));
                needPerspectiveFix = major < 16 || major === 16 && minor < 2;
            }
        }
        return {
            isSafari: needPerspectiveFix || isSafari(),
            needPerspectiveFix,
            isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(window.navigator.userAgent)
        };
    }
    function getBrowser() {
        if (!browser) browser = calcBrowser();
        return browser;
    }
    function Resize(_ref) {
        let {swiper, on, emit} = _ref;
        const window = ssr_window_esm_getWindow();
        let observer = null;
        let animationFrame = null;
        const resizeHandler = () => {
            if (!swiper || swiper.destroyed || !swiper.initialized) return;
            emit("beforeResize");
            emit("resize");
        };
        const createObserver = () => {
            if (!swiper || swiper.destroyed || !swiper.initialized) return;
            observer = new ResizeObserver((entries => {
                animationFrame = window.requestAnimationFrame((() => {
                    const {width, height} = swiper;
                    let newWidth = width;
                    let newHeight = height;
                    entries.forEach((_ref2 => {
                        let {contentBoxSize, contentRect, target} = _ref2;
                        if (target && target !== swiper.el) return;
                        newWidth = contentRect ? contentRect.width : (contentBoxSize[0] || contentBoxSize).inlineSize;
                        newHeight = contentRect ? contentRect.height : (contentBoxSize[0] || contentBoxSize).blockSize;
                    }));
                    if (newWidth !== width || newHeight !== height) resizeHandler();
                }));
            }));
            observer.observe(swiper.el);
        };
        const removeObserver = () => {
            if (animationFrame) window.cancelAnimationFrame(animationFrame);
            if (observer && observer.unobserve && swiper.el) {
                observer.unobserve(swiper.el);
                observer = null;
            }
        };
        const orientationChangeHandler = () => {
            if (!swiper || swiper.destroyed || !swiper.initialized) return;
            emit("orientationchange");
        };
        on("init", (() => {
            if (swiper.params.resizeObserver && typeof window.ResizeObserver !== "undefined") {
                createObserver();
                return;
            }
            window.addEventListener("resize", resizeHandler);
            window.addEventListener("orientationchange", orientationChangeHandler);
        }));
        on("destroy", (() => {
            removeObserver();
            window.removeEventListener("resize", resizeHandler);
            window.removeEventListener("orientationchange", orientationChangeHandler);
        }));
    }
    function Observer(_ref) {
        let {swiper, extendParams, on, emit} = _ref;
        const observers = [];
        const window = ssr_window_esm_getWindow();
        const attach = function(target, options) {
            if (options === void 0) options = {};
            const ObserverFunc = window.MutationObserver || window.WebkitMutationObserver;
            const observer = new ObserverFunc((mutations => {
                if (swiper.__preventObserver__) return;
                if (mutations.length === 1) {
                    emit("observerUpdate", mutations[0]);
                    return;
                }
                const observerUpdate = function observerUpdate() {
                    emit("observerUpdate", mutations[0]);
                };
                if (window.requestAnimationFrame) window.requestAnimationFrame(observerUpdate); else window.setTimeout(observerUpdate, 0);
            }));
            observer.observe(target, {
                attributes: typeof options.attributes === "undefined" ? true : options.attributes,
                childList: typeof options.childList === "undefined" ? true : options.childList,
                characterData: typeof options.characterData === "undefined" ? true : options.characterData
            });
            observers.push(observer);
        };
        const init = () => {
            if (!swiper.params.observer) return;
            if (swiper.params.observeParents) {
                const containerParents = elementParents(swiper.el);
                for (let i = 0; i < containerParents.length; i += 1) attach(containerParents[i]);
            }
            attach(swiper.el, {
                childList: swiper.params.observeSlideChildren
            });
            attach(swiper.wrapperEl, {
                attributes: false
            });
        };
        const destroy = () => {
            observers.forEach((observer => {
                observer.disconnect();
            }));
            observers.splice(0, observers.length);
        };
        extendParams({
            observer: false,
            observeParents: false,
            observeSlideChildren: false
        });
        on("init", init);
        on("destroy", destroy);
    }
    var eventsEmitter = {
        on(events, handler, priority) {
            const self = this;
            if (!self.eventsListeners || self.destroyed) return self;
            if (typeof handler !== "function") return self;
            const method = priority ? "unshift" : "push";
            events.split(" ").forEach((event => {
                if (!self.eventsListeners[event]) self.eventsListeners[event] = [];
                self.eventsListeners[event][method](handler);
            }));
            return self;
        },
        once(events, handler, priority) {
            const self = this;
            if (!self.eventsListeners || self.destroyed) return self;
            if (typeof handler !== "function") return self;
            function onceHandler() {
                self.off(events, onceHandler);
                if (onceHandler.__emitterProxy) delete onceHandler.__emitterProxy;
                for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
                handler.apply(self, args);
            }
            onceHandler.__emitterProxy = handler;
            return self.on(events, onceHandler, priority);
        },
        onAny(handler, priority) {
            const self = this;
            if (!self.eventsListeners || self.destroyed) return self;
            if (typeof handler !== "function") return self;
            const method = priority ? "unshift" : "push";
            if (self.eventsAnyListeners.indexOf(handler) < 0) self.eventsAnyListeners[method](handler);
            return self;
        },
        offAny(handler) {
            const self = this;
            if (!self.eventsListeners || self.destroyed) return self;
            if (!self.eventsAnyListeners) return self;
            const index = self.eventsAnyListeners.indexOf(handler);
            if (index >= 0) self.eventsAnyListeners.splice(index, 1);
            return self;
        },
        off(events, handler) {
            const self = this;
            if (!self.eventsListeners || self.destroyed) return self;
            if (!self.eventsListeners) return self;
            events.split(" ").forEach((event => {
                if (typeof handler === "undefined") self.eventsListeners[event] = []; else if (self.eventsListeners[event]) self.eventsListeners[event].forEach(((eventHandler, index) => {
                    if (eventHandler === handler || eventHandler.__emitterProxy && eventHandler.__emitterProxy === handler) self.eventsListeners[event].splice(index, 1);
                }));
            }));
            return self;
        },
        emit() {
            const self = this;
            if (!self.eventsListeners || self.destroyed) return self;
            if (!self.eventsListeners) return self;
            let events;
            let data;
            let context;
            for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) args[_key2] = arguments[_key2];
            if (typeof args[0] === "string" || Array.isArray(args[0])) {
                events = args[0];
                data = args.slice(1, args.length);
                context = self;
            } else {
                events = args[0].events;
                data = args[0].data;
                context = args[0].context || self;
            }
            data.unshift(context);
            const eventsArray = Array.isArray(events) ? events : events.split(" ");
            eventsArray.forEach((event => {
                if (self.eventsAnyListeners && self.eventsAnyListeners.length) self.eventsAnyListeners.forEach((eventHandler => {
                    eventHandler.apply(context, [ event, ...data ]);
                }));
                if (self.eventsListeners && self.eventsListeners[event]) self.eventsListeners[event].forEach((eventHandler => {
                    eventHandler.apply(context, data);
                }));
            }));
            return self;
        }
    };
    function updateSize() {
        const swiper = this;
        let width;
        let height;
        const el = swiper.el;
        if (typeof swiper.params.width !== "undefined" && swiper.params.width !== null) width = swiper.params.width; else width = el.clientWidth;
        if (typeof swiper.params.height !== "undefined" && swiper.params.height !== null) height = swiper.params.height; else height = el.clientHeight;
        if (width === 0 && swiper.isHorizontal() || height === 0 && swiper.isVertical()) return;
        width = width - parseInt(elementStyle(el, "padding-left") || 0, 10) - parseInt(elementStyle(el, "padding-right") || 0, 10);
        height = height - parseInt(elementStyle(el, "padding-top") || 0, 10) - parseInt(elementStyle(el, "padding-bottom") || 0, 10);
        if (Number.isNaN(width)) width = 0;
        if (Number.isNaN(height)) height = 0;
        Object.assign(swiper, {
            width,
            height,
            size: swiper.isHorizontal() ? width : height
        });
    }
    function updateSlides() {
        const swiper = this;
        function getDirectionLabel(property) {
            if (swiper.isHorizontal()) return property;
            return {
                width: "height",
                "margin-top": "margin-left",
                "margin-bottom ": "margin-right",
                "margin-left": "margin-top",
                "margin-right": "margin-bottom",
                "padding-left": "padding-top",
                "padding-right": "padding-bottom",
                marginRight: "marginBottom"
            }[property];
        }
        function getDirectionPropertyValue(node, label) {
            return parseFloat(node.getPropertyValue(getDirectionLabel(label)) || 0);
        }
        const params = swiper.params;
        const {wrapperEl, slidesEl, size: swiperSize, rtlTranslate: rtl, wrongRTL} = swiper;
        const isVirtual = swiper.virtual && params.virtual.enabled;
        const previousSlidesLength = isVirtual ? swiper.virtual.slides.length : swiper.slides.length;
        const slides = elementChildren(slidesEl, `.${swiper.params.slideClass}, swiper-slide`);
        const slidesLength = isVirtual ? swiper.virtual.slides.length : slides.length;
        let snapGrid = [];
        const slidesGrid = [];
        const slidesSizesGrid = [];
        let offsetBefore = params.slidesOffsetBefore;
        if (typeof offsetBefore === "function") offsetBefore = params.slidesOffsetBefore.call(swiper);
        let offsetAfter = params.slidesOffsetAfter;
        if (typeof offsetAfter === "function") offsetAfter = params.slidesOffsetAfter.call(swiper);
        const previousSnapGridLength = swiper.snapGrid.length;
        const previousSlidesGridLength = swiper.slidesGrid.length;
        let spaceBetween = params.spaceBetween;
        let slidePosition = -offsetBefore;
        let prevSlideSize = 0;
        let index = 0;
        if (typeof swiperSize === "undefined") return;
        if (typeof spaceBetween === "string" && spaceBetween.indexOf("%") >= 0) spaceBetween = parseFloat(spaceBetween.replace("%", "")) / 100 * swiperSize; else if (typeof spaceBetween === "string") spaceBetween = parseFloat(spaceBetween);
        swiper.virtualSize = -spaceBetween;
        slides.forEach((slideEl => {
            if (rtl) slideEl.style.marginLeft = ""; else slideEl.style.marginRight = "";
            slideEl.style.marginBottom = "";
            slideEl.style.marginTop = "";
        }));
        if (params.centeredSlides && params.cssMode) {
            setCSSProperty(wrapperEl, "--swiper-centered-offset-before", "");
            setCSSProperty(wrapperEl, "--swiper-centered-offset-after", "");
        }
        const gridEnabled = params.grid && params.grid.rows > 1 && swiper.grid;
        if (gridEnabled) swiper.grid.initSlides(slidesLength);
        let slideSize;
        const shouldResetSlideSize = params.slidesPerView === "auto" && params.breakpoints && Object.keys(params.breakpoints).filter((key => typeof params.breakpoints[key].slidesPerView !== "undefined")).length > 0;
        for (let i = 0; i < slidesLength; i += 1) {
            slideSize = 0;
            let slide;
            if (slides[i]) slide = slides[i];
            if (gridEnabled) swiper.grid.updateSlide(i, slide, slidesLength, getDirectionLabel);
            if (slides[i] && elementStyle(slide, "display") === "none") continue;
            if (params.slidesPerView === "auto") {
                if (shouldResetSlideSize) slides[i].style[getDirectionLabel("width")] = ``;
                const slideStyles = getComputedStyle(slide);
                const currentTransform = slide.style.transform;
                const currentWebKitTransform = slide.style.webkitTransform;
                if (currentTransform) slide.style.transform = "none";
                if (currentWebKitTransform) slide.style.webkitTransform = "none";
                if (params.roundLengths) slideSize = swiper.isHorizontal() ? elementOuterSize(slide, "width", true) : elementOuterSize(slide, "height", true); else {
                    const width = getDirectionPropertyValue(slideStyles, "width");
                    const paddingLeft = getDirectionPropertyValue(slideStyles, "padding-left");
                    const paddingRight = getDirectionPropertyValue(slideStyles, "padding-right");
                    const marginLeft = getDirectionPropertyValue(slideStyles, "margin-left");
                    const marginRight = getDirectionPropertyValue(slideStyles, "margin-right");
                    const boxSizing = slideStyles.getPropertyValue("box-sizing");
                    if (boxSizing && boxSizing === "border-box") slideSize = width + marginLeft + marginRight; else {
                        const {clientWidth, offsetWidth} = slide;
                        slideSize = width + paddingLeft + paddingRight + marginLeft + marginRight + (offsetWidth - clientWidth);
                    }
                }
                if (currentTransform) slide.style.transform = currentTransform;
                if (currentWebKitTransform) slide.style.webkitTransform = currentWebKitTransform;
                if (params.roundLengths) slideSize = Math.floor(slideSize);
            } else {
                slideSize = (swiperSize - (params.slidesPerView - 1) * spaceBetween) / params.slidesPerView;
                if (params.roundLengths) slideSize = Math.floor(slideSize);
                if (slides[i]) slides[i].style[getDirectionLabel("width")] = `${slideSize}px`;
            }
            if (slides[i]) slides[i].swiperSlideSize = slideSize;
            slidesSizesGrid.push(slideSize);
            if (params.centeredSlides) {
                slidePosition = slidePosition + slideSize / 2 + prevSlideSize / 2 + spaceBetween;
                if (prevSlideSize === 0 && i !== 0) slidePosition = slidePosition - swiperSize / 2 - spaceBetween;
                if (i === 0) slidePosition = slidePosition - swiperSize / 2 - spaceBetween;
                if (Math.abs(slidePosition) < 1 / 1e3) slidePosition = 0;
                if (params.roundLengths) slidePosition = Math.floor(slidePosition);
                if (index % params.slidesPerGroup === 0) snapGrid.push(slidePosition);
                slidesGrid.push(slidePosition);
            } else {
                if (params.roundLengths) slidePosition = Math.floor(slidePosition);
                if ((index - Math.min(swiper.params.slidesPerGroupSkip, index)) % swiper.params.slidesPerGroup === 0) snapGrid.push(slidePosition);
                slidesGrid.push(slidePosition);
                slidePosition = slidePosition + slideSize + spaceBetween;
            }
            swiper.virtualSize += slideSize + spaceBetween;
            prevSlideSize = slideSize;
            index += 1;
        }
        swiper.virtualSize = Math.max(swiper.virtualSize, swiperSize) + offsetAfter;
        if (rtl && wrongRTL && (params.effect === "slide" || params.effect === "coverflow")) wrapperEl.style.width = `${swiper.virtualSize + spaceBetween}px`;
        if (params.setWrapperSize) wrapperEl.style[getDirectionLabel("width")] = `${swiper.virtualSize + spaceBetween}px`;
        if (gridEnabled) swiper.grid.updateWrapperSize(slideSize, snapGrid, getDirectionLabel);
        if (!params.centeredSlides) {
            const newSlidesGrid = [];
            for (let i = 0; i < snapGrid.length; i += 1) {
                let slidesGridItem = snapGrid[i];
                if (params.roundLengths) slidesGridItem = Math.floor(slidesGridItem);
                if (snapGrid[i] <= swiper.virtualSize - swiperSize) newSlidesGrid.push(slidesGridItem);
            }
            snapGrid = newSlidesGrid;
            if (Math.floor(swiper.virtualSize - swiperSize) - Math.floor(snapGrid[snapGrid.length - 1]) > 1) snapGrid.push(swiper.virtualSize - swiperSize);
        }
        if (isVirtual && params.loop) {
            const size = slidesSizesGrid[0] + spaceBetween;
            if (params.slidesPerGroup > 1) {
                const groups = Math.ceil((swiper.virtual.slidesBefore + swiper.virtual.slidesAfter) / params.slidesPerGroup);
                const groupSize = size * params.slidesPerGroup;
                for (let i = 0; i < groups; i += 1) snapGrid.push(snapGrid[snapGrid.length - 1] + groupSize);
            }
            for (let i = 0; i < swiper.virtual.slidesBefore + swiper.virtual.slidesAfter; i += 1) {
                if (params.slidesPerGroup === 1) snapGrid.push(snapGrid[snapGrid.length - 1] + size);
                slidesGrid.push(slidesGrid[slidesGrid.length - 1] + size);
                swiper.virtualSize += size;
            }
        }
        if (snapGrid.length === 0) snapGrid = [ 0 ];
        if (spaceBetween !== 0) {
            const key = swiper.isHorizontal() && rtl ? "marginLeft" : getDirectionLabel("marginRight");
            slides.filter(((_, slideIndex) => {
                if (!params.cssMode || params.loop) return true;
                if (slideIndex === slides.length - 1) return false;
                return true;
            })).forEach((slideEl => {
                slideEl.style[key] = `${spaceBetween}px`;
            }));
        }
        if (params.centeredSlides && params.centeredSlidesBounds) {
            let allSlidesSize = 0;
            slidesSizesGrid.forEach((slideSizeValue => {
                allSlidesSize += slideSizeValue + (spaceBetween || 0);
            }));
            allSlidesSize -= spaceBetween;
            const maxSnap = allSlidesSize - swiperSize;
            snapGrid = snapGrid.map((snap => {
                if (snap <= 0) return -offsetBefore;
                if (snap > maxSnap) return maxSnap + offsetAfter;
                return snap;
            }));
        }
        if (params.centerInsufficientSlides) {
            let allSlidesSize = 0;
            slidesSizesGrid.forEach((slideSizeValue => {
                allSlidesSize += slideSizeValue + (spaceBetween || 0);
            }));
            allSlidesSize -= spaceBetween;
            if (allSlidesSize < swiperSize) {
                const allSlidesOffset = (swiperSize - allSlidesSize) / 2;
                snapGrid.forEach(((snap, snapIndex) => {
                    snapGrid[snapIndex] = snap - allSlidesOffset;
                }));
                slidesGrid.forEach(((snap, snapIndex) => {
                    slidesGrid[snapIndex] = snap + allSlidesOffset;
                }));
            }
        }
        Object.assign(swiper, {
            slides,
            snapGrid,
            slidesGrid,
            slidesSizesGrid
        });
        if (params.centeredSlides && params.cssMode && !params.centeredSlidesBounds) {
            setCSSProperty(wrapperEl, "--swiper-centered-offset-before", `${-snapGrid[0]}px`);
            setCSSProperty(wrapperEl, "--swiper-centered-offset-after", `${swiper.size / 2 - slidesSizesGrid[slidesSizesGrid.length - 1] / 2}px`);
            const addToSnapGrid = -swiper.snapGrid[0];
            const addToSlidesGrid = -swiper.slidesGrid[0];
            swiper.snapGrid = swiper.snapGrid.map((v => v + addToSnapGrid));
            swiper.slidesGrid = swiper.slidesGrid.map((v => v + addToSlidesGrid));
        }
        if (slidesLength !== previousSlidesLength) swiper.emit("slidesLengthChange");
        if (snapGrid.length !== previousSnapGridLength) {
            if (swiper.params.watchOverflow) swiper.checkOverflow();
            swiper.emit("snapGridLengthChange");
        }
        if (slidesGrid.length !== previousSlidesGridLength) swiper.emit("slidesGridLengthChange");
        if (params.watchSlidesProgress) swiper.updateSlidesOffset();
        if (!isVirtual && !params.cssMode && (params.effect === "slide" || params.effect === "fade")) {
            const backFaceHiddenClass = `${params.containerModifierClass}backface-hidden`;
            const hasClassBackfaceClassAdded = swiper.el.classList.contains(backFaceHiddenClass);
            if (slidesLength <= params.maxBackfaceHiddenSlides) {
                if (!hasClassBackfaceClassAdded) swiper.el.classList.add(backFaceHiddenClass);
            } else if (hasClassBackfaceClassAdded) swiper.el.classList.remove(backFaceHiddenClass);
        }
    }
    function updateAutoHeight(speed) {
        const swiper = this;
        const activeSlides = [];
        const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
        let newHeight = 0;
        let i;
        if (typeof speed === "number") swiper.setTransition(speed); else if (speed === true) swiper.setTransition(swiper.params.speed);
        const getSlideByIndex = index => {
            if (isVirtual) return swiper.slides[swiper.getSlideIndexByData(index)];
            return swiper.slides[index];
        };
        if (swiper.params.slidesPerView !== "auto" && swiper.params.slidesPerView > 1) if (swiper.params.centeredSlides) (swiper.visibleSlides || []).forEach((slide => {
            activeSlides.push(slide);
        })); else for (i = 0; i < Math.ceil(swiper.params.slidesPerView); i += 1) {
            const index = swiper.activeIndex + i;
            if (index > swiper.slides.length && !isVirtual) break;
            activeSlides.push(getSlideByIndex(index));
        } else activeSlides.push(getSlideByIndex(swiper.activeIndex));
        for (i = 0; i < activeSlides.length; i += 1) if (typeof activeSlides[i] !== "undefined") {
            const height = activeSlides[i].offsetHeight;
            newHeight = height > newHeight ? height : newHeight;
        }
        if (newHeight || newHeight === 0) swiper.wrapperEl.style.height = `${newHeight}px`;
    }
    function updateSlidesOffset() {
        const swiper = this;
        const slides = swiper.slides;
        const minusOffset = swiper.isElement ? swiper.isHorizontal() ? swiper.wrapperEl.offsetLeft : swiper.wrapperEl.offsetTop : 0;
        for (let i = 0; i < slides.length; i += 1) slides[i].swiperSlideOffset = (swiper.isHorizontal() ? slides[i].offsetLeft : slides[i].offsetTop) - minusOffset - swiper.cssOverflowAdjustment();
    }
    function updateSlidesProgress(translate) {
        if (translate === void 0) translate = this && this.translate || 0;
        const swiper = this;
        const params = swiper.params;
        const {slides, rtlTranslate: rtl, snapGrid} = swiper;
        if (slides.length === 0) return;
        if (typeof slides[0].swiperSlideOffset === "undefined") swiper.updateSlidesOffset();
        let offsetCenter = -translate;
        if (rtl) offsetCenter = translate;
        slides.forEach((slideEl => {
            slideEl.classList.remove(params.slideVisibleClass);
        }));
        swiper.visibleSlidesIndexes = [];
        swiper.visibleSlides = [];
        let spaceBetween = params.spaceBetween;
        if (typeof spaceBetween === "string" && spaceBetween.indexOf("%") >= 0) spaceBetween = parseFloat(spaceBetween.replace("%", "")) / 100 * swiper.size; else if (typeof spaceBetween === "string") spaceBetween = parseFloat(spaceBetween);
        for (let i = 0; i < slides.length; i += 1) {
            const slide = slides[i];
            let slideOffset = slide.swiperSlideOffset;
            if (params.cssMode && params.centeredSlides) slideOffset -= slides[0].swiperSlideOffset;
            const slideProgress = (offsetCenter + (params.centeredSlides ? swiper.minTranslate() : 0) - slideOffset) / (slide.swiperSlideSize + spaceBetween);
            const originalSlideProgress = (offsetCenter - snapGrid[0] + (params.centeredSlides ? swiper.minTranslate() : 0) - slideOffset) / (slide.swiperSlideSize + spaceBetween);
            const slideBefore = -(offsetCenter - slideOffset);
            const slideAfter = slideBefore + swiper.slidesSizesGrid[i];
            const isVisible = slideBefore >= 0 && slideBefore < swiper.size - 1 || slideAfter > 1 && slideAfter <= swiper.size || slideBefore <= 0 && slideAfter >= swiper.size;
            if (isVisible) {
                swiper.visibleSlides.push(slide);
                swiper.visibleSlidesIndexes.push(i);
                slides[i].classList.add(params.slideVisibleClass);
            }
            slide.progress = rtl ? -slideProgress : slideProgress;
            slide.originalProgress = rtl ? -originalSlideProgress : originalSlideProgress;
        }
    }
    function updateProgress(translate) {
        const swiper = this;
        if (typeof translate === "undefined") {
            const multiplier = swiper.rtlTranslate ? -1 : 1;
            translate = swiper && swiper.translate && swiper.translate * multiplier || 0;
        }
        const params = swiper.params;
        const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
        let {progress, isBeginning, isEnd, progressLoop} = swiper;
        const wasBeginning = isBeginning;
        const wasEnd = isEnd;
        if (translatesDiff === 0) {
            progress = 0;
            isBeginning = true;
            isEnd = true;
        } else {
            progress = (translate - swiper.minTranslate()) / translatesDiff;
            const isBeginningRounded = Math.abs(translate - swiper.minTranslate()) < 1;
            const isEndRounded = Math.abs(translate - swiper.maxTranslate()) < 1;
            isBeginning = isBeginningRounded || progress <= 0;
            isEnd = isEndRounded || progress >= 1;
            if (isBeginningRounded) progress = 0;
            if (isEndRounded) progress = 1;
        }
        if (params.loop) {
            const firstSlideIndex = swiper.getSlideIndexByData(0);
            const lastSlideIndex = swiper.getSlideIndexByData(swiper.slides.length - 1);
            const firstSlideTranslate = swiper.slidesGrid[firstSlideIndex];
            const lastSlideTranslate = swiper.slidesGrid[lastSlideIndex];
            const translateMax = swiper.slidesGrid[swiper.slidesGrid.length - 1];
            const translateAbs = Math.abs(translate);
            if (translateAbs >= firstSlideTranslate) progressLoop = (translateAbs - firstSlideTranslate) / translateMax; else progressLoop = (translateAbs + translateMax - lastSlideTranslate) / translateMax;
            if (progressLoop > 1) progressLoop -= 1;
        }
        Object.assign(swiper, {
            progress,
            progressLoop,
            isBeginning,
            isEnd
        });
        if (params.watchSlidesProgress || params.centeredSlides && params.autoHeight) swiper.updateSlidesProgress(translate);
        if (isBeginning && !wasBeginning) swiper.emit("reachBeginning toEdge");
        if (isEnd && !wasEnd) swiper.emit("reachEnd toEdge");
        if (wasBeginning && !isBeginning || wasEnd && !isEnd) swiper.emit("fromEdge");
        swiper.emit("progress", progress);
    }
    function updateSlidesClasses() {
        const swiper = this;
        const {slides, params, slidesEl, activeIndex} = swiper;
        const isVirtual = swiper.virtual && params.virtual.enabled;
        const getFilteredSlide = selector => elementChildren(slidesEl, `.${params.slideClass}${selector}, swiper-slide${selector}`)[0];
        slides.forEach((slideEl => {
            slideEl.classList.remove(params.slideActiveClass, params.slideNextClass, params.slidePrevClass);
        }));
        let activeSlide;
        if (isVirtual) if (params.loop) {
            let slideIndex = activeIndex - swiper.virtual.slidesBefore;
            if (slideIndex < 0) slideIndex = swiper.virtual.slides.length + slideIndex;
            if (slideIndex >= swiper.virtual.slides.length) slideIndex -= swiper.virtual.slides.length;
            activeSlide = getFilteredSlide(`[data-swiper-slide-index="${slideIndex}"]`);
        } else activeSlide = getFilteredSlide(`[data-swiper-slide-index="${activeIndex}"]`); else activeSlide = slides[activeIndex];
        if (activeSlide) {
            activeSlide.classList.add(params.slideActiveClass);
            let nextSlide = elementNextAll(activeSlide, `.${params.slideClass}, swiper-slide`)[0];
            if (params.loop && !nextSlide) nextSlide = slides[0];
            if (nextSlide) nextSlide.classList.add(params.slideNextClass);
            let prevSlide = elementPrevAll(activeSlide, `.${params.slideClass}, swiper-slide`)[0];
            if (params.loop && !prevSlide === 0) prevSlide = slides[slides.length - 1];
            if (prevSlide) prevSlide.classList.add(params.slidePrevClass);
        }
        swiper.emitSlidesClasses();
    }
    const processLazyPreloader = (swiper, imageEl) => {
        if (!swiper || swiper.destroyed || !swiper.params) return;
        const slideSelector = () => swiper.isElement ? `swiper-slide` : `.${swiper.params.slideClass}`;
        const slideEl = imageEl.closest(slideSelector());
        if (slideEl) {
            const lazyEl = slideEl.querySelector(`.${swiper.params.lazyPreloaderClass}`);
            if (lazyEl) lazyEl.remove();
        }
    };
    const unlazy = (swiper, index) => {
        if (!swiper.slides[index]) return;
        const imageEl = swiper.slides[index].querySelector('[loading="lazy"]');
        if (imageEl) imageEl.removeAttribute("loading");
    };
    const preload = swiper => {
        if (!swiper || swiper.destroyed || !swiper.params) return;
        let amount = swiper.params.lazyPreloadPrevNext;
        const len = swiper.slides.length;
        if (!len || !amount || amount < 0) return;
        amount = Math.min(amount, len);
        const slidesPerView = swiper.params.slidesPerView === "auto" ? swiper.slidesPerViewDynamic() : Math.ceil(swiper.params.slidesPerView);
        const activeIndex = swiper.activeIndex;
        if (swiper.params.grid && swiper.params.grid.rows > 1) {
            const activeColumn = activeIndex;
            const preloadColumns = [ activeColumn - amount ];
            preloadColumns.push(...Array.from({
                length: amount
            }).map(((_, i) => activeColumn + slidesPerView + i)));
            swiper.slides.forEach(((slideEl, i) => {
                if (preloadColumns.includes(slideEl.column)) unlazy(swiper, i);
            }));
            return;
        }
        const slideIndexLastInView = activeIndex + slidesPerView - 1;
        if (swiper.params.rewind || swiper.params.loop) for (let i = activeIndex - amount; i <= slideIndexLastInView + amount; i += 1) {
            const realIndex = (i % len + len) % len;
            if (realIndex < activeIndex || realIndex > slideIndexLastInView) unlazy(swiper, realIndex);
        } else for (let i = Math.max(activeIndex - amount, 0); i <= Math.min(slideIndexLastInView + amount, len - 1); i += 1) if (i !== activeIndex && (i > slideIndexLastInView || i < activeIndex)) unlazy(swiper, i);
    };
    function getActiveIndexByTranslate(swiper) {
        const {slidesGrid, params} = swiper;
        const translate = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
        let activeIndex;
        for (let i = 0; i < slidesGrid.length; i += 1) if (typeof slidesGrid[i + 1] !== "undefined") {
            if (translate >= slidesGrid[i] && translate < slidesGrid[i + 1] - (slidesGrid[i + 1] - slidesGrid[i]) / 2) activeIndex = i; else if (translate >= slidesGrid[i] && translate < slidesGrid[i + 1]) activeIndex = i + 1;
        } else if (translate >= slidesGrid[i]) activeIndex = i;
        if (params.normalizeSlideIndex) if (activeIndex < 0 || typeof activeIndex === "undefined") activeIndex = 0;
        return activeIndex;
    }
    function updateActiveIndex(newActiveIndex) {
        const swiper = this;
        const translate = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
        const {snapGrid, params, activeIndex: previousIndex, realIndex: previousRealIndex, snapIndex: previousSnapIndex} = swiper;
        let activeIndex = newActiveIndex;
        let snapIndex;
        const getVirtualRealIndex = aIndex => {
            let realIndex = aIndex - swiper.virtual.slidesBefore;
            if (realIndex < 0) realIndex = swiper.virtual.slides.length + realIndex;
            if (realIndex >= swiper.virtual.slides.length) realIndex -= swiper.virtual.slides.length;
            return realIndex;
        };
        if (typeof activeIndex === "undefined") activeIndex = getActiveIndexByTranslate(swiper);
        if (snapGrid.indexOf(translate) >= 0) snapIndex = snapGrid.indexOf(translate); else {
            const skip = Math.min(params.slidesPerGroupSkip, activeIndex);
            snapIndex = skip + Math.floor((activeIndex - skip) / params.slidesPerGroup);
        }
        if (snapIndex >= snapGrid.length) snapIndex = snapGrid.length - 1;
        if (activeIndex === previousIndex) {
            if (snapIndex !== previousSnapIndex) {
                swiper.snapIndex = snapIndex;
                swiper.emit("snapIndexChange");
            }
            if (swiper.params.loop && swiper.virtual && swiper.params.virtual.enabled) swiper.realIndex = getVirtualRealIndex(activeIndex);
            return;
        }
        let realIndex;
        if (swiper.virtual && params.virtual.enabled && params.loop) realIndex = getVirtualRealIndex(activeIndex); else if (swiper.slides[activeIndex]) realIndex = parseInt(swiper.slides[activeIndex].getAttribute("data-swiper-slide-index") || activeIndex, 10); else realIndex = activeIndex;
        Object.assign(swiper, {
            previousSnapIndex,
            snapIndex,
            previousRealIndex,
            realIndex,
            previousIndex,
            activeIndex
        });
        if (swiper.initialized) preload(swiper);
        swiper.emit("activeIndexChange");
        swiper.emit("snapIndexChange");
        if (previousRealIndex !== realIndex) swiper.emit("realIndexChange");
        if (swiper.initialized || swiper.params.runCallbacksOnInit) swiper.emit("slideChange");
    }
    function updateClickedSlide(e) {
        const swiper = this;
        const params = swiper.params;
        const slide = e.closest(`.${params.slideClass}, swiper-slide`);
        let slideFound = false;
        let slideIndex;
        if (slide) for (let i = 0; i < swiper.slides.length; i += 1) if (swiper.slides[i] === slide) {
            slideFound = true;
            slideIndex = i;
            break;
        }
        if (slide && slideFound) {
            swiper.clickedSlide = slide;
            if (swiper.virtual && swiper.params.virtual.enabled) swiper.clickedIndex = parseInt(slide.getAttribute("data-swiper-slide-index"), 10); else swiper.clickedIndex = slideIndex;
        } else {
            swiper.clickedSlide = void 0;
            swiper.clickedIndex = void 0;
            return;
        }
        if (params.slideToClickedSlide && swiper.clickedIndex !== void 0 && swiper.clickedIndex !== swiper.activeIndex) swiper.slideToClickedSlide();
    }
    var update = {
        updateSize,
        updateSlides,
        updateAutoHeight,
        updateSlidesOffset,
        updateSlidesProgress,
        updateProgress,
        updateSlidesClasses,
        updateActiveIndex,
        updateClickedSlide
    };
    function getSwiperTranslate(axis) {
        if (axis === void 0) axis = this.isHorizontal() ? "x" : "y";
        const swiper = this;
        const {params, rtlTranslate: rtl, translate, wrapperEl} = swiper;
        if (params.virtualTranslate) return rtl ? -translate : translate;
        if (params.cssMode) return translate;
        let currentTranslate = getTranslate(wrapperEl, axis);
        currentTranslate += swiper.cssOverflowAdjustment();
        if (rtl) currentTranslate = -currentTranslate;
        return currentTranslate || 0;
    }
    function setTranslate(translate, byController) {
        const swiper = this;
        const {rtlTranslate: rtl, params, wrapperEl, progress} = swiper;
        let x = 0;
        let y = 0;
        const z = 0;
        if (swiper.isHorizontal()) x = rtl ? -translate : translate; else y = translate;
        if (params.roundLengths) {
            x = Math.floor(x);
            y = Math.floor(y);
        }
        swiper.previousTranslate = swiper.translate;
        swiper.translate = swiper.isHorizontal() ? x : y;
        if (params.cssMode) wrapperEl[swiper.isHorizontal() ? "scrollLeft" : "scrollTop"] = swiper.isHorizontal() ? -x : -y; else if (!params.virtualTranslate) {
            if (swiper.isHorizontal()) x -= swiper.cssOverflowAdjustment(); else y -= swiper.cssOverflowAdjustment();
            wrapperEl.style.transform = `translate3d(${x}px, ${y}px, ${z}px)`;
        }
        let newProgress;
        const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
        if (translatesDiff === 0) newProgress = 0; else newProgress = (translate - swiper.minTranslate()) / translatesDiff;
        if (newProgress !== progress) swiper.updateProgress(translate);
        swiper.emit("setTranslate", swiper.translate, byController);
    }
    function minTranslate() {
        return -this.snapGrid[0];
    }
    function maxTranslate() {
        return -this.snapGrid[this.snapGrid.length - 1];
    }
    function translateTo(translate, speed, runCallbacks, translateBounds, internal) {
        if (translate === void 0) translate = 0;
        if (speed === void 0) speed = this.params.speed;
        if (runCallbacks === void 0) runCallbacks = true;
        if (translateBounds === void 0) translateBounds = true;
        const swiper = this;
        const {params, wrapperEl} = swiper;
        if (swiper.animating && params.preventInteractionOnTransition) return false;
        const minTranslate = swiper.minTranslate();
        const maxTranslate = swiper.maxTranslate();
        let newTranslate;
        if (translateBounds && translate > minTranslate) newTranslate = minTranslate; else if (translateBounds && translate < maxTranslate) newTranslate = maxTranslate; else newTranslate = translate;
        swiper.updateProgress(newTranslate);
        if (params.cssMode) {
            const isH = swiper.isHorizontal();
            if (speed === 0) wrapperEl[isH ? "scrollLeft" : "scrollTop"] = -newTranslate; else {
                if (!swiper.support.smoothScroll) {
                    animateCSSModeScroll({
                        swiper,
                        targetPosition: -newTranslate,
                        side: isH ? "left" : "top"
                    });
                    return true;
                }
                wrapperEl.scrollTo({
                    [isH ? "left" : "top"]: -newTranslate,
                    behavior: "smooth"
                });
            }
            return true;
        }
        if (speed === 0) {
            swiper.setTransition(0);
            swiper.setTranslate(newTranslate);
            if (runCallbacks) {
                swiper.emit("beforeTransitionStart", speed, internal);
                swiper.emit("transitionEnd");
            }
        } else {
            swiper.setTransition(speed);
            swiper.setTranslate(newTranslate);
            if (runCallbacks) {
                swiper.emit("beforeTransitionStart", speed, internal);
                swiper.emit("transitionStart");
            }
            if (!swiper.animating) {
                swiper.animating = true;
                if (!swiper.onTranslateToWrapperTransitionEnd) swiper.onTranslateToWrapperTransitionEnd = function transitionEnd(e) {
                    if (!swiper || swiper.destroyed) return;
                    if (e.target !== this) return;
                    swiper.wrapperEl.removeEventListener("transitionend", swiper.onTranslateToWrapperTransitionEnd);
                    swiper.onTranslateToWrapperTransitionEnd = null;
                    delete swiper.onTranslateToWrapperTransitionEnd;
                    if (runCallbacks) swiper.emit("transitionEnd");
                };
                swiper.wrapperEl.addEventListener("transitionend", swiper.onTranslateToWrapperTransitionEnd);
            }
        }
        return true;
    }
    var translate = {
        getTranslate: getSwiperTranslate,
        setTranslate,
        minTranslate,
        maxTranslate,
        translateTo
    };
    function setTransition(duration, byController) {
        const swiper = this;
        if (!swiper.params.cssMode) swiper.wrapperEl.style.transitionDuration = `${duration}ms`;
        swiper.emit("setTransition", duration, byController);
    }
    function transitionEmit(_ref) {
        let {swiper, runCallbacks, direction, step} = _ref;
        const {activeIndex, previousIndex} = swiper;
        let dir = direction;
        if (!dir) if (activeIndex > previousIndex) dir = "next"; else if (activeIndex < previousIndex) dir = "prev"; else dir = "reset";
        swiper.emit(`transition${step}`);
        if (runCallbacks && activeIndex !== previousIndex) {
            if (dir === "reset") {
                swiper.emit(`slideResetTransition${step}`);
                return;
            }
            swiper.emit(`slideChangeTransition${step}`);
            if (dir === "next") swiper.emit(`slideNextTransition${step}`); else swiper.emit(`slidePrevTransition${step}`);
        }
    }
    function transitionStart(runCallbacks, direction) {
        if (runCallbacks === void 0) runCallbacks = true;
        const swiper = this;
        const {params} = swiper;
        if (params.cssMode) return;
        if (params.autoHeight) swiper.updateAutoHeight();
        transitionEmit({
            swiper,
            runCallbacks,
            direction,
            step: "Start"
        });
    }
    function transitionEnd(runCallbacks, direction) {
        if (runCallbacks === void 0) runCallbacks = true;
        const swiper = this;
        const {params} = swiper;
        swiper.animating = false;
        if (params.cssMode) return;
        swiper.setTransition(0);
        transitionEmit({
            swiper,
            runCallbacks,
            direction,
            step: "End"
        });
    }
    var transition = {
        setTransition,
        transitionStart,
        transitionEnd
    };
    function slideTo(index, speed, runCallbacks, internal, initial) {
        if (index === void 0) index = 0;
        if (speed === void 0) speed = this.params.speed;
        if (runCallbacks === void 0) runCallbacks = true;
        if (typeof index === "string") index = parseInt(index, 10);
        const swiper = this;
        let slideIndex = index;
        if (slideIndex < 0) slideIndex = 0;
        const {params, snapGrid, slidesGrid, previousIndex, activeIndex, rtlTranslate: rtl, wrapperEl, enabled} = swiper;
        if (swiper.animating && params.preventInteractionOnTransition || !enabled && !internal && !initial) return false;
        const skip = Math.min(swiper.params.slidesPerGroupSkip, slideIndex);
        let snapIndex = skip + Math.floor((slideIndex - skip) / swiper.params.slidesPerGroup);
        if (snapIndex >= snapGrid.length) snapIndex = snapGrid.length - 1;
        const translate = -snapGrid[snapIndex];
        if (params.normalizeSlideIndex) for (let i = 0; i < slidesGrid.length; i += 1) {
            const normalizedTranslate = -Math.floor(translate * 100);
            const normalizedGrid = Math.floor(slidesGrid[i] * 100);
            const normalizedGridNext = Math.floor(slidesGrid[i + 1] * 100);
            if (typeof slidesGrid[i + 1] !== "undefined") {
                if (normalizedTranslate >= normalizedGrid && normalizedTranslate < normalizedGridNext - (normalizedGridNext - normalizedGrid) / 2) slideIndex = i; else if (normalizedTranslate >= normalizedGrid && normalizedTranslate < normalizedGridNext) slideIndex = i + 1;
            } else if (normalizedTranslate >= normalizedGrid) slideIndex = i;
        }
        if (swiper.initialized && slideIndex !== activeIndex) {
            if (!swiper.allowSlideNext && (rtl ? translate > swiper.translate && translate > swiper.minTranslate() : translate < swiper.translate && translate < swiper.minTranslate())) return false;
            if (!swiper.allowSlidePrev && translate > swiper.translate && translate > swiper.maxTranslate()) if ((activeIndex || 0) !== slideIndex) return false;
        }
        if (slideIndex !== (previousIndex || 0) && runCallbacks) swiper.emit("beforeSlideChangeStart");
        swiper.updateProgress(translate);
        let direction;
        if (slideIndex > activeIndex) direction = "next"; else if (slideIndex < activeIndex) direction = "prev"; else direction = "reset";
        if (rtl && -translate === swiper.translate || !rtl && translate === swiper.translate) {
            swiper.updateActiveIndex(slideIndex);
            if (params.autoHeight) swiper.updateAutoHeight();
            swiper.updateSlidesClasses();
            if (params.effect !== "slide") swiper.setTranslate(translate);
            if (direction !== "reset") {
                swiper.transitionStart(runCallbacks, direction);
                swiper.transitionEnd(runCallbacks, direction);
            }
            return false;
        }
        if (params.cssMode) {
            const isH = swiper.isHorizontal();
            const t = rtl ? translate : -translate;
            if (speed === 0) {
                const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
                if (isVirtual) {
                    swiper.wrapperEl.style.scrollSnapType = "none";
                    swiper._immediateVirtual = true;
                }
                if (isVirtual && !swiper._cssModeVirtualInitialSet && swiper.params.initialSlide > 0) {
                    swiper._cssModeVirtualInitialSet = true;
                    requestAnimationFrame((() => {
                        wrapperEl[isH ? "scrollLeft" : "scrollTop"] = t;
                    }));
                } else wrapperEl[isH ? "scrollLeft" : "scrollTop"] = t;
                if (isVirtual) requestAnimationFrame((() => {
                    swiper.wrapperEl.style.scrollSnapType = "";
                    swiper._immediateVirtual = false;
                }));
            } else {
                if (!swiper.support.smoothScroll) {
                    animateCSSModeScroll({
                        swiper,
                        targetPosition: t,
                        side: isH ? "left" : "top"
                    });
                    return true;
                }
                wrapperEl.scrollTo({
                    [isH ? "left" : "top"]: t,
                    behavior: "smooth"
                });
            }
            return true;
        }
        swiper.setTransition(speed);
        swiper.setTranslate(translate);
        swiper.updateActiveIndex(slideIndex);
        swiper.updateSlidesClasses();
        swiper.emit("beforeTransitionStart", speed, internal);
        swiper.transitionStart(runCallbacks, direction);
        if (speed === 0) swiper.transitionEnd(runCallbacks, direction); else if (!swiper.animating) {
            swiper.animating = true;
            if (!swiper.onSlideToWrapperTransitionEnd) swiper.onSlideToWrapperTransitionEnd = function transitionEnd(e) {
                if (!swiper || swiper.destroyed) return;
                if (e.target !== this) return;
                swiper.wrapperEl.removeEventListener("transitionend", swiper.onSlideToWrapperTransitionEnd);
                swiper.onSlideToWrapperTransitionEnd = null;
                delete swiper.onSlideToWrapperTransitionEnd;
                swiper.transitionEnd(runCallbacks, direction);
            };
            swiper.wrapperEl.addEventListener("transitionend", swiper.onSlideToWrapperTransitionEnd);
        }
        return true;
    }
    function slideToLoop(index, speed, runCallbacks, internal) {
        if (index === void 0) index = 0;
        if (speed === void 0) speed = this.params.speed;
        if (runCallbacks === void 0) runCallbacks = true;
        if (typeof index === "string") {
            const indexAsNumber = parseInt(index, 10);
            index = indexAsNumber;
        }
        const swiper = this;
        let newIndex = index;
        if (swiper.params.loop) if (swiper.virtual && swiper.params.virtual.enabled) newIndex += swiper.virtual.slidesBefore; else newIndex = swiper.getSlideIndexByData(newIndex);
        return swiper.slideTo(newIndex, speed, runCallbacks, internal);
    }
    function slideNext(speed, runCallbacks, internal) {
        if (speed === void 0) speed = this.params.speed;
        if (runCallbacks === void 0) runCallbacks = true;
        const swiper = this;
        const {enabled, params, animating} = swiper;
        if (!enabled) return swiper;
        let perGroup = params.slidesPerGroup;
        if (params.slidesPerView === "auto" && params.slidesPerGroup === 1 && params.slidesPerGroupAuto) perGroup = Math.max(swiper.slidesPerViewDynamic("current", true), 1);
        const increment = swiper.activeIndex < params.slidesPerGroupSkip ? 1 : perGroup;
        const isVirtual = swiper.virtual && params.virtual.enabled;
        if (params.loop) {
            if (animating && !isVirtual && params.loopPreventsSliding) return false;
            swiper.loopFix({
                direction: "next"
            });
            swiper._clientLeft = swiper.wrapperEl.clientLeft;
        }
        if (params.rewind && swiper.isEnd) return swiper.slideTo(0, speed, runCallbacks, internal);
        return swiper.slideTo(swiper.activeIndex + increment, speed, runCallbacks, internal);
    }
    function slidePrev(speed, runCallbacks, internal) {
        if (speed === void 0) speed = this.params.speed;
        if (runCallbacks === void 0) runCallbacks = true;
        const swiper = this;
        const {params, snapGrid, slidesGrid, rtlTranslate, enabled, animating} = swiper;
        if (!enabled) return swiper;
        const isVirtual = swiper.virtual && params.virtual.enabled;
        if (params.loop) {
            if (animating && !isVirtual && params.loopPreventsSliding) return false;
            swiper.loopFix({
                direction: "prev"
            });
            swiper._clientLeft = swiper.wrapperEl.clientLeft;
        }
        const translate = rtlTranslate ? swiper.translate : -swiper.translate;
        function normalize(val) {
            if (val < 0) return -Math.floor(Math.abs(val));
            return Math.floor(val);
        }
        const normalizedTranslate = normalize(translate);
        const normalizedSnapGrid = snapGrid.map((val => normalize(val)));
        let prevSnap = snapGrid[normalizedSnapGrid.indexOf(normalizedTranslate) - 1];
        if (typeof prevSnap === "undefined" && params.cssMode) {
            let prevSnapIndex;
            snapGrid.forEach(((snap, snapIndex) => {
                if (normalizedTranslate >= snap) prevSnapIndex = snapIndex;
            }));
            if (typeof prevSnapIndex !== "undefined") prevSnap = snapGrid[prevSnapIndex > 0 ? prevSnapIndex - 1 : prevSnapIndex];
        }
        let prevIndex = 0;
        if (typeof prevSnap !== "undefined") {
            prevIndex = slidesGrid.indexOf(prevSnap);
            if (prevIndex < 0) prevIndex = swiper.activeIndex - 1;
            if (params.slidesPerView === "auto" && params.slidesPerGroup === 1 && params.slidesPerGroupAuto) {
                prevIndex = prevIndex - swiper.slidesPerViewDynamic("previous", true) + 1;
                prevIndex = Math.max(prevIndex, 0);
            }
        }
        if (params.rewind && swiper.isBeginning) {
            const lastIndex = swiper.params.virtual && swiper.params.virtual.enabled && swiper.virtual ? swiper.virtual.slides.length - 1 : swiper.slides.length - 1;
            return swiper.slideTo(lastIndex, speed, runCallbacks, internal);
        }
        return swiper.slideTo(prevIndex, speed, runCallbacks, internal);
    }
    function slideReset(speed, runCallbacks, internal) {
        if (speed === void 0) speed = this.params.speed;
        if (runCallbacks === void 0) runCallbacks = true;
        const swiper = this;
        return swiper.slideTo(swiper.activeIndex, speed, runCallbacks, internal);
    }
    function slideToClosest(speed, runCallbacks, internal, threshold) {
        if (speed === void 0) speed = this.params.speed;
        if (runCallbacks === void 0) runCallbacks = true;
        if (threshold === void 0) threshold = .5;
        const swiper = this;
        let index = swiper.activeIndex;
        const skip = Math.min(swiper.params.slidesPerGroupSkip, index);
        const snapIndex = skip + Math.floor((index - skip) / swiper.params.slidesPerGroup);
        const translate = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
        if (translate >= swiper.snapGrid[snapIndex]) {
            const currentSnap = swiper.snapGrid[snapIndex];
            const nextSnap = swiper.snapGrid[snapIndex + 1];
            if (translate - currentSnap > (nextSnap - currentSnap) * threshold) index += swiper.params.slidesPerGroup;
        } else {
            const prevSnap = swiper.snapGrid[snapIndex - 1];
            const currentSnap = swiper.snapGrid[snapIndex];
            if (translate - prevSnap <= (currentSnap - prevSnap) * threshold) index -= swiper.params.slidesPerGroup;
        }
        index = Math.max(index, 0);
        index = Math.min(index, swiper.slidesGrid.length - 1);
        return swiper.slideTo(index, speed, runCallbacks, internal);
    }
    function slideToClickedSlide() {
        const swiper = this;
        const {params, slidesEl} = swiper;
        const slidesPerView = params.slidesPerView === "auto" ? swiper.slidesPerViewDynamic() : params.slidesPerView;
        let slideToIndex = swiper.clickedIndex;
        let realIndex;
        const slideSelector = swiper.isElement ? `swiper-slide` : `.${params.slideClass}`;
        if (params.loop) {
            if (swiper.animating) return;
            realIndex = parseInt(swiper.clickedSlide.getAttribute("data-swiper-slide-index"), 10);
            if (params.centeredSlides) if (slideToIndex < swiper.loopedSlides - slidesPerView / 2 || slideToIndex > swiper.slides.length - swiper.loopedSlides + slidesPerView / 2) {
                swiper.loopFix();
                slideToIndex = swiper.getSlideIndex(elementChildren(slidesEl, `${slideSelector}[data-swiper-slide-index="${realIndex}"]`)[0]);
                nextTick((() => {
                    swiper.slideTo(slideToIndex);
                }));
            } else swiper.slideTo(slideToIndex); else if (slideToIndex > swiper.slides.length - slidesPerView) {
                swiper.loopFix();
                slideToIndex = swiper.getSlideIndex(elementChildren(slidesEl, `${slideSelector}[data-swiper-slide-index="${realIndex}"]`)[0]);
                nextTick((() => {
                    swiper.slideTo(slideToIndex);
                }));
            } else swiper.slideTo(slideToIndex);
        } else swiper.slideTo(slideToIndex);
    }
    var slide = {
        slideTo,
        slideToLoop,
        slideNext,
        slidePrev,
        slideReset,
        slideToClosest,
        slideToClickedSlide
    };
    function loopCreate(slideRealIndex) {
        const swiper = this;
        const {params, slidesEl} = swiper;
        if (!params.loop || swiper.virtual && swiper.params.virtual.enabled) return;
        const slides = elementChildren(slidesEl, `.${params.slideClass}, swiper-slide`);
        slides.forEach(((el, index) => {
            el.setAttribute("data-swiper-slide-index", index);
        }));
        swiper.loopFix({
            slideRealIndex,
            direction: params.centeredSlides ? void 0 : "next"
        });
    }
    function loopFix(_temp) {
        let {slideRealIndex, slideTo = true, direction, setTranslate, activeSlideIndex, byController, byMousewheel} = _temp === void 0 ? {} : _temp;
        const swiper = this;
        if (!swiper.params.loop) return;
        swiper.emit("beforeLoopFix");
        const {slides, allowSlidePrev, allowSlideNext, slidesEl, params} = swiper;
        swiper.allowSlidePrev = true;
        swiper.allowSlideNext = true;
        if (swiper.virtual && params.virtual.enabled) {
            if (slideTo) if (!params.centeredSlides && swiper.snapIndex === 0) swiper.slideTo(swiper.virtual.slides.length, 0, false, true); else if (params.centeredSlides && swiper.snapIndex < params.slidesPerView) swiper.slideTo(swiper.virtual.slides.length + swiper.snapIndex, 0, false, true); else if (swiper.snapIndex === swiper.snapGrid.length - 1) swiper.slideTo(swiper.virtual.slidesBefore, 0, false, true);
            swiper.allowSlidePrev = allowSlidePrev;
            swiper.allowSlideNext = allowSlideNext;
            swiper.emit("loopFix");
            return;
        }
        const slidesPerView = params.slidesPerView === "auto" ? swiper.slidesPerViewDynamic() : Math.ceil(parseFloat(params.slidesPerView, 10));
        let loopedSlides = params.loopedSlides || slidesPerView;
        if (loopedSlides % params.slidesPerGroup !== 0) loopedSlides += params.slidesPerGroup - loopedSlides % params.slidesPerGroup;
        swiper.loopedSlides = loopedSlides;
        const prependSlidesIndexes = [];
        const appendSlidesIndexes = [];
        let activeIndex = swiper.activeIndex;
        if (typeof activeSlideIndex === "undefined") activeSlideIndex = swiper.getSlideIndex(swiper.slides.filter((el => el.classList.contains(params.slideActiveClass)))[0]); else activeIndex = activeSlideIndex;
        const isNext = direction === "next" || !direction;
        const isPrev = direction === "prev" || !direction;
        let slidesPrepended = 0;
        let slidesAppended = 0;
        if (activeSlideIndex < loopedSlides) {
            slidesPrepended = Math.max(loopedSlides - activeSlideIndex, params.slidesPerGroup);
            for (let i = 0; i < loopedSlides - activeSlideIndex; i += 1) {
                const index = i - Math.floor(i / slides.length) * slides.length;
                prependSlidesIndexes.push(slides.length - index - 1);
            }
        } else if (activeSlideIndex > swiper.slides.length - loopedSlides * 2) {
            slidesAppended = Math.max(activeSlideIndex - (swiper.slides.length - loopedSlides * 2), params.slidesPerGroup);
            for (let i = 0; i < slidesAppended; i += 1) {
                const index = i - Math.floor(i / slides.length) * slides.length;
                appendSlidesIndexes.push(index);
            }
        }
        if (isPrev) prependSlidesIndexes.forEach((index => {
            swiper.slides[index].swiperLoopMoveDOM = true;
            slidesEl.prepend(swiper.slides[index]);
            swiper.slides[index].swiperLoopMoveDOM = false;
        }));
        if (isNext) appendSlidesIndexes.forEach((index => {
            swiper.slides[index].swiperLoopMoveDOM = true;
            slidesEl.append(swiper.slides[index]);
            swiper.slides[index].swiperLoopMoveDOM = false;
        }));
        swiper.recalcSlides();
        if (params.slidesPerView === "auto") swiper.updateSlides();
        if (params.watchSlidesProgress) swiper.updateSlidesOffset();
        if (slideTo) if (prependSlidesIndexes.length > 0 && isPrev) {
            if (typeof slideRealIndex === "undefined") {
                const currentSlideTranslate = swiper.slidesGrid[activeIndex];
                const newSlideTranslate = swiper.slidesGrid[activeIndex + slidesPrepended];
                const diff = newSlideTranslate - currentSlideTranslate;
                if (byMousewheel) swiper.setTranslate(swiper.translate - diff); else {
                    swiper.slideTo(activeIndex + slidesPrepended, 0, false, true);
                    if (setTranslate) swiper.touches[swiper.isHorizontal() ? "startX" : "startY"] += diff;
                }
            } else if (setTranslate) swiper.slideToLoop(slideRealIndex, 0, false, true);
        } else if (appendSlidesIndexes.length > 0 && isNext) if (typeof slideRealIndex === "undefined") {
            const currentSlideTranslate = swiper.slidesGrid[activeIndex];
            const newSlideTranslate = swiper.slidesGrid[activeIndex - slidesAppended];
            const diff = newSlideTranslate - currentSlideTranslate;
            if (byMousewheel) swiper.setTranslate(swiper.translate - diff); else {
                swiper.slideTo(activeIndex - slidesAppended, 0, false, true);
                if (setTranslate) swiper.touches[swiper.isHorizontal() ? "startX" : "startY"] += diff;
            }
        } else swiper.slideToLoop(slideRealIndex, 0, false, true);
        swiper.allowSlidePrev = allowSlidePrev;
        swiper.allowSlideNext = allowSlideNext;
        if (swiper.controller && swiper.controller.control && !byController) {
            const loopParams = {
                slideRealIndex,
                slideTo: false,
                direction,
                setTranslate,
                activeSlideIndex,
                byController: true
            };
            if (Array.isArray(swiper.controller.control)) swiper.controller.control.forEach((c => {
                if (!c.destroyed && c.params.loop) c.loopFix(loopParams);
            })); else if (swiper.controller.control instanceof swiper.constructor && swiper.controller.control.params.loop) swiper.controller.control.loopFix(loopParams);
        }
        swiper.emit("loopFix");
    }
    function loopDestroy() {
        const swiper = this;
        const {params, slidesEl} = swiper;
        if (!params.loop || swiper.virtual && swiper.params.virtual.enabled) return;
        swiper.recalcSlides();
        const newSlidesOrder = [];
        swiper.slides.forEach((slideEl => {
            const index = typeof slideEl.swiperSlideIndex === "undefined" ? slideEl.getAttribute("data-swiper-slide-index") * 1 : slideEl.swiperSlideIndex;
            newSlidesOrder[index] = slideEl;
        }));
        swiper.slides.forEach((slideEl => {
            slideEl.removeAttribute("data-swiper-slide-index");
        }));
        newSlidesOrder.forEach((slideEl => {
            slidesEl.append(slideEl);
        }));
        swiper.recalcSlides();
        swiper.slideTo(swiper.realIndex, 0);
    }
    var loop = {
        loopCreate,
        loopFix,
        loopDestroy
    };
    function setGrabCursor(moving) {
        const swiper = this;
        if (!swiper.params.simulateTouch || swiper.params.watchOverflow && swiper.isLocked || swiper.params.cssMode) return;
        const el = swiper.params.touchEventsTarget === "container" ? swiper.el : swiper.wrapperEl;
        if (swiper.isElement) swiper.__preventObserver__ = true;
        el.style.cursor = "move";
        el.style.cursor = moving ? "grabbing" : "grab";
        if (swiper.isElement) requestAnimationFrame((() => {
            swiper.__preventObserver__ = false;
        }));
    }
    function unsetGrabCursor() {
        const swiper = this;
        if (swiper.params.watchOverflow && swiper.isLocked || swiper.params.cssMode) return;
        if (swiper.isElement) swiper.__preventObserver__ = true;
        swiper[swiper.params.touchEventsTarget === "container" ? "el" : "wrapperEl"].style.cursor = "";
        if (swiper.isElement) requestAnimationFrame((() => {
            swiper.__preventObserver__ = false;
        }));
    }
    var grabCursor = {
        setGrabCursor,
        unsetGrabCursor
    };
    function closestElement(selector, base) {
        if (base === void 0) base = this;
        function __closestFrom(el) {
            if (!el || el === getDocument() || el === ssr_window_esm_getWindow()) return null;
            if (el.assignedSlot) el = el.assignedSlot;
            const found = el.closest(selector);
            if (!found && !el.getRootNode) return null;
            return found || __closestFrom(el.getRootNode().host);
        }
        return __closestFrom(base);
    }
    function onTouchStart(event) {
        const swiper = this;
        const document = getDocument();
        const window = ssr_window_esm_getWindow();
        const data = swiper.touchEventsData;
        data.evCache.push(event);
        const {params, touches, enabled} = swiper;
        if (!enabled) return;
        if (!params.simulateTouch && event.pointerType === "mouse") return;
        if (swiper.animating && params.preventInteractionOnTransition) return;
        if (!swiper.animating && params.cssMode && params.loop) swiper.loopFix();
        let e = event;
        if (e.originalEvent) e = e.originalEvent;
        let targetEl = e.target;
        if (params.touchEventsTarget === "wrapper") if (!swiper.wrapperEl.contains(targetEl)) return;
        if ("which" in e && e.which === 3) return;
        if ("button" in e && e.button > 0) return;
        if (data.isTouched && data.isMoved) return;
        const swipingClassHasValue = !!params.noSwipingClass && params.noSwipingClass !== "";
        const eventPath = event.composedPath ? event.composedPath() : event.path;
        if (swipingClassHasValue && e.target && e.target.shadowRoot && eventPath) targetEl = eventPath[0];
        const noSwipingSelector = params.noSwipingSelector ? params.noSwipingSelector : `.${params.noSwipingClass}`;
        const isTargetShadow = !!(e.target && e.target.shadowRoot);
        if (params.noSwiping && (isTargetShadow ? closestElement(noSwipingSelector, targetEl) : targetEl.closest(noSwipingSelector))) {
            swiper.allowClick = true;
            return;
        }
        if (params.swipeHandler) if (!targetEl.closest(params.swipeHandler)) return;
        touches.currentX = e.pageX;
        touches.currentY = e.pageY;
        const startX = touches.currentX;
        const startY = touches.currentY;
        const edgeSwipeDetection = params.edgeSwipeDetection || params.iOSEdgeSwipeDetection;
        const edgeSwipeThreshold = params.edgeSwipeThreshold || params.iOSEdgeSwipeThreshold;
        if (edgeSwipeDetection && (startX <= edgeSwipeThreshold || startX >= window.innerWidth - edgeSwipeThreshold)) if (edgeSwipeDetection === "prevent") event.preventDefault(); else return;
        Object.assign(data, {
            isTouched: true,
            isMoved: false,
            allowTouchCallbacks: true,
            isScrolling: void 0,
            startMoving: void 0
        });
        touches.startX = startX;
        touches.startY = startY;
        data.touchStartTime = now();
        swiper.allowClick = true;
        swiper.updateSize();
        swiper.swipeDirection = void 0;
        if (params.threshold > 0) data.allowThresholdMove = false;
        let preventDefault = true;
        if (targetEl.matches(data.focusableElements)) {
            preventDefault = false;
            if (targetEl.nodeName === "SELECT") data.isTouched = false;
        }
        if (document.activeElement && document.activeElement.matches(data.focusableElements) && document.activeElement !== targetEl) document.activeElement.blur();
        const shouldPreventDefault = preventDefault && swiper.allowTouchMove && params.touchStartPreventDefault;
        if ((params.touchStartForcePreventDefault || shouldPreventDefault) && !targetEl.isContentEditable) e.preventDefault();
        if (params.freeMode && params.freeMode.enabled && swiper.freeMode && swiper.animating && !params.cssMode) swiper.freeMode.onTouchStart();
        swiper.emit("touchStart", e);
    }
    function onTouchMove(event) {
        const document = getDocument();
        const swiper = this;
        const data = swiper.touchEventsData;
        const {params, touches, rtlTranslate: rtl, enabled} = swiper;
        if (!enabled) return;
        if (!params.simulateTouch && event.pointerType === "mouse") return;
        let e = event;
        if (e.originalEvent) e = e.originalEvent;
        if (!data.isTouched) {
            if (data.startMoving && data.isScrolling) swiper.emit("touchMoveOpposite", e);
            return;
        }
        const pointerIndex = data.evCache.findIndex((cachedEv => cachedEv.pointerId === e.pointerId));
        if (pointerIndex >= 0) data.evCache[pointerIndex] = e;
        const targetTouch = data.evCache.length > 1 ? data.evCache[0] : e;
        const pageX = targetTouch.pageX;
        const pageY = targetTouch.pageY;
        if (e.preventedByNestedSwiper) {
            touches.startX = pageX;
            touches.startY = pageY;
            return;
        }
        if (!swiper.allowTouchMove) {
            if (!e.target.matches(data.focusableElements)) swiper.allowClick = false;
            if (data.isTouched) {
                Object.assign(touches, {
                    startX: pageX,
                    startY: pageY,
                    prevX: swiper.touches.currentX,
                    prevY: swiper.touches.currentY,
                    currentX: pageX,
                    currentY: pageY
                });
                data.touchStartTime = now();
            }
            return;
        }
        if (params.touchReleaseOnEdges && !params.loop) if (swiper.isVertical()) {
            if (pageY < touches.startY && swiper.translate <= swiper.maxTranslate() || pageY > touches.startY && swiper.translate >= swiper.minTranslate()) {
                data.isTouched = false;
                data.isMoved = false;
                return;
            }
        } else if (pageX < touches.startX && swiper.translate <= swiper.maxTranslate() || pageX > touches.startX && swiper.translate >= swiper.minTranslate()) return;
        if (document.activeElement) if (e.target === document.activeElement && e.target.matches(data.focusableElements)) {
            data.isMoved = true;
            swiper.allowClick = false;
            return;
        }
        if (data.allowTouchCallbacks) swiper.emit("touchMove", e);
        if (e.targetTouches && e.targetTouches.length > 1) return;
        touches.currentX = pageX;
        touches.currentY = pageY;
        const diffX = touches.currentX - touches.startX;
        const diffY = touches.currentY - touches.startY;
        if (swiper.params.threshold && Math.sqrt(diffX ** 2 + diffY ** 2) < swiper.params.threshold) return;
        if (typeof data.isScrolling === "undefined") {
            let touchAngle;
            if (swiper.isHorizontal() && touches.currentY === touches.startY || swiper.isVertical() && touches.currentX === touches.startX) data.isScrolling = false; else if (diffX * diffX + diffY * diffY >= 25) {
                touchAngle = Math.atan2(Math.abs(diffY), Math.abs(diffX)) * 180 / Math.PI;
                data.isScrolling = swiper.isHorizontal() ? touchAngle > params.touchAngle : 90 - touchAngle > params.touchAngle;
            }
        }
        if (data.isScrolling) swiper.emit("touchMoveOpposite", e);
        if (typeof data.startMoving === "undefined") if (touches.currentX !== touches.startX || touches.currentY !== touches.startY) data.startMoving = true;
        if (data.isScrolling || swiper.zoom && swiper.params.zoom && swiper.params.zoom.enabled && data.evCache.length > 1) {
            data.isTouched = false;
            return;
        }
        if (!data.startMoving) return;
        swiper.allowClick = false;
        if (!params.cssMode && e.cancelable) e.preventDefault();
        if (params.touchMoveStopPropagation && !params.nested) e.stopPropagation();
        let diff = swiper.isHorizontal() ? diffX : diffY;
        let touchesDiff = swiper.isHorizontal() ? touches.currentX - touches.previousX : touches.currentY - touches.previousY;
        if (params.oneWayMovement) {
            diff = Math.abs(diff) * (rtl ? 1 : -1);
            touchesDiff = Math.abs(touchesDiff) * (rtl ? 1 : -1);
        }
        touches.diff = diff;
        diff *= params.touchRatio;
        if (rtl) {
            diff = -diff;
            touchesDiff = -touchesDiff;
        }
        const prevTouchesDirection = swiper.touchesDirection;
        swiper.swipeDirection = diff > 0 ? "prev" : "next";
        swiper.touchesDirection = touchesDiff > 0 ? "prev" : "next";
        const isLoop = swiper.params.loop && !params.cssMode;
        if (!data.isMoved) {
            if (isLoop) swiper.loopFix({
                direction: swiper.swipeDirection
            });
            data.startTranslate = swiper.getTranslate();
            swiper.setTransition(0);
            if (swiper.animating) {
                const evt = new window.CustomEvent("transitionend", {
                    bubbles: true,
                    cancelable: true
                });
                swiper.wrapperEl.dispatchEvent(evt);
            }
            data.allowMomentumBounce = false;
            if (params.grabCursor && (swiper.allowSlideNext === true || swiper.allowSlidePrev === true)) swiper.setGrabCursor(true);
            swiper.emit("sliderFirstMove", e);
        }
        let loopFixed;
        if (data.isMoved && prevTouchesDirection !== swiper.touchesDirection && isLoop && Math.abs(diff) >= 1) {
            swiper.loopFix({
                direction: swiper.swipeDirection,
                setTranslate: true
            });
            loopFixed = true;
        }
        swiper.emit("sliderMove", e);
        data.isMoved = true;
        data.currentTranslate = diff + data.startTranslate;
        let disableParentSwiper = true;
        let resistanceRatio = params.resistanceRatio;
        if (params.touchReleaseOnEdges) resistanceRatio = 0;
        if (diff > 0) {
            if (isLoop && !loopFixed && data.currentTranslate > (params.centeredSlides ? swiper.minTranslate() - swiper.size / 2 : swiper.minTranslate())) swiper.loopFix({
                direction: "prev",
                setTranslate: true,
                activeSlideIndex: 0
            });
            if (data.currentTranslate > swiper.minTranslate()) {
                disableParentSwiper = false;
                if (params.resistance) data.currentTranslate = swiper.minTranslate() - 1 + (-swiper.minTranslate() + data.startTranslate + diff) ** resistanceRatio;
            }
        } else if (diff < 0) {
            if (isLoop && !loopFixed && data.currentTranslate < (params.centeredSlides ? swiper.maxTranslate() + swiper.size / 2 : swiper.maxTranslate())) swiper.loopFix({
                direction: "next",
                setTranslate: true,
                activeSlideIndex: swiper.slides.length - (params.slidesPerView === "auto" ? swiper.slidesPerViewDynamic() : Math.ceil(parseFloat(params.slidesPerView, 10)))
            });
            if (data.currentTranslate < swiper.maxTranslate()) {
                disableParentSwiper = false;
                if (params.resistance) data.currentTranslate = swiper.maxTranslate() + 1 - (swiper.maxTranslate() - data.startTranslate - diff) ** resistanceRatio;
            }
        }
        if (disableParentSwiper) e.preventedByNestedSwiper = true;
        if (!swiper.allowSlideNext && swiper.swipeDirection === "next" && data.currentTranslate < data.startTranslate) data.currentTranslate = data.startTranslate;
        if (!swiper.allowSlidePrev && swiper.swipeDirection === "prev" && data.currentTranslate > data.startTranslate) data.currentTranslate = data.startTranslate;
        if (!swiper.allowSlidePrev && !swiper.allowSlideNext) data.currentTranslate = data.startTranslate;
        if (params.threshold > 0) if (Math.abs(diff) > params.threshold || data.allowThresholdMove) {
            if (!data.allowThresholdMove) {
                data.allowThresholdMove = true;
                touches.startX = touches.currentX;
                touches.startY = touches.currentY;
                data.currentTranslate = data.startTranslate;
                touches.diff = swiper.isHorizontal() ? touches.currentX - touches.startX : touches.currentY - touches.startY;
                return;
            }
        } else {
            data.currentTranslate = data.startTranslate;
            return;
        }
        if (!params.followFinger || params.cssMode) return;
        if (params.freeMode && params.freeMode.enabled && swiper.freeMode || params.watchSlidesProgress) {
            swiper.updateActiveIndex();
            swiper.updateSlidesClasses();
        }
        if (params.freeMode && params.freeMode.enabled && swiper.freeMode) swiper.freeMode.onTouchMove();
        swiper.updateProgress(data.currentTranslate);
        swiper.setTranslate(data.currentTranslate);
    }
    function onTouchEnd(event) {
        const swiper = this;
        const data = swiper.touchEventsData;
        const pointerIndex = data.evCache.findIndex((cachedEv => cachedEv.pointerId === event.pointerId));
        if (pointerIndex >= 0) data.evCache.splice(pointerIndex, 1);
        if ([ "pointercancel", "pointerout", "pointerleave" ].includes(event.type)) {
            const proceed = event.type === "pointercancel" && (swiper.browser.isSafari || swiper.browser.isWebView);
            if (!proceed) return;
        }
        const {params, touches, rtlTranslate: rtl, slidesGrid, enabled} = swiper;
        if (!enabled) return;
        if (!params.simulateTouch && event.pointerType === "mouse") return;
        let e = event;
        if (e.originalEvent) e = e.originalEvent;
        if (data.allowTouchCallbacks) swiper.emit("touchEnd", e);
        data.allowTouchCallbacks = false;
        if (!data.isTouched) {
            if (data.isMoved && params.grabCursor) swiper.setGrabCursor(false);
            data.isMoved = false;
            data.startMoving = false;
            return;
        }
        if (params.grabCursor && data.isMoved && data.isTouched && (swiper.allowSlideNext === true || swiper.allowSlidePrev === true)) swiper.setGrabCursor(false);
        const touchEndTime = now();
        const timeDiff = touchEndTime - data.touchStartTime;
        if (swiper.allowClick) {
            const pathTree = e.path || e.composedPath && e.composedPath();
            swiper.updateClickedSlide(pathTree && pathTree[0] || e.target);
            swiper.emit("tap click", e);
            if (timeDiff < 300 && touchEndTime - data.lastClickTime < 300) swiper.emit("doubleTap doubleClick", e);
        }
        data.lastClickTime = now();
        nextTick((() => {
            if (!swiper.destroyed) swiper.allowClick = true;
        }));
        if (!data.isTouched || !data.isMoved || !swiper.swipeDirection || touches.diff === 0 || data.currentTranslate === data.startTranslate) {
            data.isTouched = false;
            data.isMoved = false;
            data.startMoving = false;
            return;
        }
        data.isTouched = false;
        data.isMoved = false;
        data.startMoving = false;
        let currentPos;
        if (params.followFinger) currentPos = rtl ? swiper.translate : -swiper.translate; else currentPos = -data.currentTranslate;
        if (params.cssMode) return;
        if (params.freeMode && params.freeMode.enabled) {
            swiper.freeMode.onTouchEnd({
                currentPos
            });
            return;
        }
        let stopIndex = 0;
        let groupSize = swiper.slidesSizesGrid[0];
        for (let i = 0; i < slidesGrid.length; i += i < params.slidesPerGroupSkip ? 1 : params.slidesPerGroup) {
            const increment = i < params.slidesPerGroupSkip - 1 ? 1 : params.slidesPerGroup;
            if (typeof slidesGrid[i + increment] !== "undefined") {
                if (currentPos >= slidesGrid[i] && currentPos < slidesGrid[i + increment]) {
                    stopIndex = i;
                    groupSize = slidesGrid[i + increment] - slidesGrid[i];
                }
            } else if (currentPos >= slidesGrid[i]) {
                stopIndex = i;
                groupSize = slidesGrid[slidesGrid.length - 1] - slidesGrid[slidesGrid.length - 2];
            }
        }
        let rewindFirstIndex = null;
        let rewindLastIndex = null;
        if (params.rewind) if (swiper.isBeginning) rewindLastIndex = params.virtual && params.virtual.enabled && swiper.virtual ? swiper.virtual.slides.length - 1 : swiper.slides.length - 1; else if (swiper.isEnd) rewindFirstIndex = 0;
        const ratio = (currentPos - slidesGrid[stopIndex]) / groupSize;
        const increment = stopIndex < params.slidesPerGroupSkip - 1 ? 1 : params.slidesPerGroup;
        if (timeDiff > params.longSwipesMs) {
            if (!params.longSwipes) {
                swiper.slideTo(swiper.activeIndex);
                return;
            }
            if (swiper.swipeDirection === "next") if (ratio >= params.longSwipesRatio) swiper.slideTo(params.rewind && swiper.isEnd ? rewindFirstIndex : stopIndex + increment); else swiper.slideTo(stopIndex);
            if (swiper.swipeDirection === "prev") if (ratio > 1 - params.longSwipesRatio) swiper.slideTo(stopIndex + increment); else if (rewindLastIndex !== null && ratio < 0 && Math.abs(ratio) > params.longSwipesRatio) swiper.slideTo(rewindLastIndex); else swiper.slideTo(stopIndex);
        } else {
            if (!params.shortSwipes) {
                swiper.slideTo(swiper.activeIndex);
                return;
            }
            const isNavButtonTarget = swiper.navigation && (e.target === swiper.navigation.nextEl || e.target === swiper.navigation.prevEl);
            if (!isNavButtonTarget) {
                if (swiper.swipeDirection === "next") swiper.slideTo(rewindFirstIndex !== null ? rewindFirstIndex : stopIndex + increment);
                if (swiper.swipeDirection === "prev") swiper.slideTo(rewindLastIndex !== null ? rewindLastIndex : stopIndex);
            } else if (e.target === swiper.navigation.nextEl) swiper.slideTo(stopIndex + increment); else swiper.slideTo(stopIndex);
        }
    }
    function onResize() {
        const swiper = this;
        const {params, el} = swiper;
        if (el && el.offsetWidth === 0) return;
        if (params.breakpoints) swiper.setBreakpoint();
        const {allowSlideNext, allowSlidePrev, snapGrid} = swiper;
        const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
        swiper.allowSlideNext = true;
        swiper.allowSlidePrev = true;
        swiper.updateSize();
        swiper.updateSlides();
        swiper.updateSlidesClasses();
        const isVirtualLoop = isVirtual && params.loop;
        if ((params.slidesPerView === "auto" || params.slidesPerView > 1) && swiper.isEnd && !swiper.isBeginning && !swiper.params.centeredSlides && !isVirtualLoop) swiper.slideTo(swiper.slides.length - 1, 0, false, true); else if (swiper.params.loop && !isVirtual) swiper.slideToLoop(swiper.realIndex, 0, false, true); else swiper.slideTo(swiper.activeIndex, 0, false, true);
        if (swiper.autoplay && swiper.autoplay.running && swiper.autoplay.paused) {
            clearTimeout(swiper.autoplay.resizeTimeout);
            swiper.autoplay.resizeTimeout = setTimeout((() => {
                if (swiper.autoplay && swiper.autoplay.running && swiper.autoplay.paused) swiper.autoplay.resume();
            }), 500);
        }
        swiper.allowSlidePrev = allowSlidePrev;
        swiper.allowSlideNext = allowSlideNext;
        if (swiper.params.watchOverflow && snapGrid !== swiper.snapGrid) swiper.checkOverflow();
    }
    function onClick(e) {
        const swiper = this;
        if (!swiper.enabled) return;
        if (!swiper.allowClick) {
            if (swiper.params.preventClicks) e.preventDefault();
            if (swiper.params.preventClicksPropagation && swiper.animating) {
                e.stopPropagation();
                e.stopImmediatePropagation();
            }
        }
    }
    function onScroll() {
        const swiper = this;
        const {wrapperEl, rtlTranslate, enabled} = swiper;
        if (!enabled) return;
        swiper.previousTranslate = swiper.translate;
        if (swiper.isHorizontal()) swiper.translate = -wrapperEl.scrollLeft; else swiper.translate = -wrapperEl.scrollTop;
        if (swiper.translate === 0) swiper.translate = 0;
        swiper.updateActiveIndex();
        swiper.updateSlidesClasses();
        let newProgress;
        const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
        if (translatesDiff === 0) newProgress = 0; else newProgress = (swiper.translate - swiper.minTranslate()) / translatesDiff;
        if (newProgress !== swiper.progress) swiper.updateProgress(rtlTranslate ? -swiper.translate : swiper.translate);
        swiper.emit("setTranslate", swiper.translate, false);
    }
    function onLoad(e) {
        const swiper = this;
        processLazyPreloader(swiper, e.target);
        if (swiper.params.cssMode || swiper.params.slidesPerView !== "auto" && !swiper.params.autoHeight) return;
        swiper.update();
    }
    let dummyEventAttached = false;
    function dummyEventListener() {}
    const events = (swiper, method) => {
        const document = getDocument();
        const {params, el, wrapperEl, device} = swiper;
        const capture = !!params.nested;
        const domMethod = method === "on" ? "addEventListener" : "removeEventListener";
        const swiperMethod = method;
        el[domMethod]("pointerdown", swiper.onTouchStart, {
            passive: false
        });
        document[domMethod]("pointermove", swiper.onTouchMove, {
            passive: false,
            capture
        });
        document[domMethod]("pointerup", swiper.onTouchEnd, {
            passive: true
        });
        document[domMethod]("pointercancel", swiper.onTouchEnd, {
            passive: true
        });
        document[domMethod]("pointerout", swiper.onTouchEnd, {
            passive: true
        });
        document[domMethod]("pointerleave", swiper.onTouchEnd, {
            passive: true
        });
        if (params.preventClicks || params.preventClicksPropagation) el[domMethod]("click", swiper.onClick, true);
        if (params.cssMode) wrapperEl[domMethod]("scroll", swiper.onScroll);
        if (params.updateOnWindowResize) swiper[swiperMethod](device.ios || device.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", onResize, true); else swiper[swiperMethod]("observerUpdate", onResize, true);
        el[domMethod]("load", swiper.onLoad, {
            capture: true
        });
    };
    function attachEvents() {
        const swiper = this;
        const document = getDocument();
        const {params} = swiper;
        swiper.onTouchStart = onTouchStart.bind(swiper);
        swiper.onTouchMove = onTouchMove.bind(swiper);
        swiper.onTouchEnd = onTouchEnd.bind(swiper);
        if (params.cssMode) swiper.onScroll = onScroll.bind(swiper);
        swiper.onClick = onClick.bind(swiper);
        swiper.onLoad = onLoad.bind(swiper);
        if (!dummyEventAttached) {
            document.addEventListener("touchstart", dummyEventListener);
            dummyEventAttached = true;
        }
        events(swiper, "on");
    }
    function detachEvents() {
        const swiper = this;
        events(swiper, "off");
    }
    var events$1 = {
        attachEvents,
        detachEvents
    };
    const isGridEnabled = (swiper, params) => swiper.grid && params.grid && params.grid.rows > 1;
    function setBreakpoint() {
        const swiper = this;
        const {realIndex, initialized, params, el} = swiper;
        const breakpoints = params.breakpoints;
        if (!breakpoints || breakpoints && Object.keys(breakpoints).length === 0) return;
        const breakpoint = swiper.getBreakpoint(breakpoints, swiper.params.breakpointsBase, swiper.el);
        if (!breakpoint || swiper.currentBreakpoint === breakpoint) return;
        const breakpointOnlyParams = breakpoint in breakpoints ? breakpoints[breakpoint] : void 0;
        const breakpointParams = breakpointOnlyParams || swiper.originalParams;
        const wasMultiRow = isGridEnabled(swiper, params);
        const isMultiRow = isGridEnabled(swiper, breakpointParams);
        const wasEnabled = params.enabled;
        if (wasMultiRow && !isMultiRow) {
            el.classList.remove(`${params.containerModifierClass}grid`, `${params.containerModifierClass}grid-column`);
            swiper.emitContainerClasses();
        } else if (!wasMultiRow && isMultiRow) {
            el.classList.add(`${params.containerModifierClass}grid`);
            if (breakpointParams.grid.fill && breakpointParams.grid.fill === "column" || !breakpointParams.grid.fill && params.grid.fill === "column") el.classList.add(`${params.containerModifierClass}grid-column`);
            swiper.emitContainerClasses();
        }
        [ "navigation", "pagination", "scrollbar" ].forEach((prop => {
            if (typeof breakpointParams[prop] === "undefined") return;
            const wasModuleEnabled = params[prop] && params[prop].enabled;
            const isModuleEnabled = breakpointParams[prop] && breakpointParams[prop].enabled;
            if (wasModuleEnabled && !isModuleEnabled) swiper[prop].disable();
            if (!wasModuleEnabled && isModuleEnabled) swiper[prop].enable();
        }));
        const directionChanged = breakpointParams.direction && breakpointParams.direction !== params.direction;
        const needsReLoop = params.loop && (breakpointParams.slidesPerView !== params.slidesPerView || directionChanged);
        if (directionChanged && initialized) swiper.changeDirection();
        utils_extend(swiper.params, breakpointParams);
        const isEnabled = swiper.params.enabled;
        Object.assign(swiper, {
            allowTouchMove: swiper.params.allowTouchMove,
            allowSlideNext: swiper.params.allowSlideNext,
            allowSlidePrev: swiper.params.allowSlidePrev
        });
        if (wasEnabled && !isEnabled) swiper.disable(); else if (!wasEnabled && isEnabled) swiper.enable();
        swiper.currentBreakpoint = breakpoint;
        swiper.emit("_beforeBreakpoint", breakpointParams);
        if (needsReLoop && initialized) {
            swiper.loopDestroy();
            swiper.loopCreate(realIndex);
            swiper.updateSlides();
        }
        swiper.emit("breakpoint", breakpointParams);
    }
    function getBreakpoint(breakpoints, base, containerEl) {
        if (base === void 0) base = "window";
        if (!breakpoints || base === "container" && !containerEl) return;
        let breakpoint = false;
        const window = ssr_window_esm_getWindow();
        const currentHeight = base === "window" ? window.innerHeight : containerEl.clientHeight;
        const points = Object.keys(breakpoints).map((point => {
            if (typeof point === "string" && point.indexOf("@") === 0) {
                const minRatio = parseFloat(point.substr(1));
                const value = currentHeight * minRatio;
                return {
                    value,
                    point
                };
            }
            return {
                value: point,
                point
            };
        }));
        points.sort(((a, b) => parseInt(a.value, 10) - parseInt(b.value, 10)));
        for (let i = 0; i < points.length; i += 1) {
            const {point, value} = points[i];
            if (base === "window") {
                if (window.matchMedia(`(min-width: ${value}px)`).matches) breakpoint = point;
            } else if (value <= containerEl.clientWidth) breakpoint = point;
        }
        return breakpoint || "max";
    }
    var breakpoints = {
        setBreakpoint,
        getBreakpoint
    };
    function prepareClasses(entries, prefix) {
        const resultClasses = [];
        entries.forEach((item => {
            if (typeof item === "object") Object.keys(item).forEach((classNames => {
                if (item[classNames]) resultClasses.push(prefix + classNames);
            })); else if (typeof item === "string") resultClasses.push(prefix + item);
        }));
        return resultClasses;
    }
    function addClasses() {
        const swiper = this;
        const {classNames, params, rtl, el, device} = swiper;
        const suffixes = prepareClasses([ "initialized", params.direction, {
            "free-mode": swiper.params.freeMode && params.freeMode.enabled
        }, {
            autoheight: params.autoHeight
        }, {
            rtl
        }, {
            grid: params.grid && params.grid.rows > 1
        }, {
            "grid-column": params.grid && params.grid.rows > 1 && params.grid.fill === "column"
        }, {
            android: device.android
        }, {
            ios: device.ios
        }, {
            "css-mode": params.cssMode
        }, {
            centered: params.cssMode && params.centeredSlides
        }, {
            "watch-progress": params.watchSlidesProgress
        } ], params.containerModifierClass);
        classNames.push(...suffixes);
        el.classList.add(...classNames);
        swiper.emitContainerClasses();
    }
    function removeClasses() {
        const swiper = this;
        const {el, classNames} = swiper;
        el.classList.remove(...classNames);
        swiper.emitContainerClasses();
    }
    var classes = {
        addClasses,
        removeClasses
    };
    function checkOverflow() {
        const swiper = this;
        const {isLocked: wasLocked, params} = swiper;
        const {slidesOffsetBefore} = params;
        if (slidesOffsetBefore) {
            const lastSlideIndex = swiper.slides.length - 1;
            const lastSlideRightEdge = swiper.slidesGrid[lastSlideIndex] + swiper.slidesSizesGrid[lastSlideIndex] + slidesOffsetBefore * 2;
            swiper.isLocked = swiper.size > lastSlideRightEdge;
        } else swiper.isLocked = swiper.snapGrid.length === 1;
        if (params.allowSlideNext === true) swiper.allowSlideNext = !swiper.isLocked;
        if (params.allowSlidePrev === true) swiper.allowSlidePrev = !swiper.isLocked;
        if (wasLocked && wasLocked !== swiper.isLocked) swiper.isEnd = false;
        if (wasLocked !== swiper.isLocked) swiper.emit(swiper.isLocked ? "lock" : "unlock");
    }
    var checkOverflow$1 = {
        checkOverflow
    };
    var defaults = {
        init: true,
        direction: "horizontal",
        oneWayMovement: false,
        touchEventsTarget: "wrapper",
        initialSlide: 0,
        speed: 300,
        cssMode: false,
        updateOnWindowResize: true,
        resizeObserver: true,
        nested: false,
        createElements: false,
        enabled: true,
        focusableElements: "input, select, option, textarea, button, video, label",
        width: null,
        height: null,
        preventInteractionOnTransition: false,
        userAgent: null,
        url: null,
        edgeSwipeDetection: false,
        edgeSwipeThreshold: 20,
        autoHeight: false,
        setWrapperSize: false,
        virtualTranslate: false,
        effect: "slide",
        breakpoints: void 0,
        breakpointsBase: "window",
        spaceBetween: 0,
        slidesPerView: 1,
        slidesPerGroup: 1,
        slidesPerGroupSkip: 0,
        slidesPerGroupAuto: false,
        centeredSlides: false,
        centeredSlidesBounds: false,
        slidesOffsetBefore: 0,
        slidesOffsetAfter: 0,
        normalizeSlideIndex: true,
        centerInsufficientSlides: false,
        watchOverflow: true,
        roundLengths: false,
        touchRatio: 1,
        touchAngle: 45,
        simulateTouch: true,
        shortSwipes: true,
        longSwipes: true,
        longSwipesRatio: .5,
        longSwipesMs: 300,
        followFinger: true,
        allowTouchMove: true,
        threshold: 5,
        touchMoveStopPropagation: false,
        touchStartPreventDefault: true,
        touchStartForcePreventDefault: false,
        touchReleaseOnEdges: false,
        uniqueNavElements: true,
        resistance: true,
        resistanceRatio: .85,
        watchSlidesProgress: false,
        grabCursor: false,
        preventClicks: true,
        preventClicksPropagation: true,
        slideToClickedSlide: false,
        loop: false,
        loopedSlides: null,
        loopPreventsSliding: true,
        rewind: false,
        allowSlidePrev: true,
        allowSlideNext: true,
        swipeHandler: null,
        noSwiping: true,
        noSwipingClass: "swiper-no-swiping",
        noSwipingSelector: null,
        passiveListeners: true,
        maxBackfaceHiddenSlides: 10,
        containerModifierClass: "swiper-",
        slideClass: "swiper-slide",
        slideActiveClass: "swiper-slide-active",
        slideVisibleClass: "swiper-slide-visible",
        slideNextClass: "swiper-slide-next",
        slidePrevClass: "swiper-slide-prev",
        wrapperClass: "swiper-wrapper",
        lazyPreloaderClass: "swiper-lazy-preloader",
        lazyPreloadPrevNext: 0,
        runCallbacksOnInit: true,
        _emitClasses: false
    };
    function moduleExtendParams(params, allModulesParams) {
        return function extendParams(obj) {
            if (obj === void 0) obj = {};
            const moduleParamName = Object.keys(obj)[0];
            const moduleParams = obj[moduleParamName];
            if (typeof moduleParams !== "object" || moduleParams === null) {
                utils_extend(allModulesParams, obj);
                return;
            }
            if ([ "navigation", "pagination", "scrollbar" ].indexOf(moduleParamName) >= 0 && params[moduleParamName] === true) params[moduleParamName] = {
                auto: true
            };
            if (!(moduleParamName in params && "enabled" in moduleParams)) {
                utils_extend(allModulesParams, obj);
                return;
            }
            if (params[moduleParamName] === true) params[moduleParamName] = {
                enabled: true
            };
            if (typeof params[moduleParamName] === "object" && !("enabled" in params[moduleParamName])) params[moduleParamName].enabled = true;
            if (!params[moduleParamName]) params[moduleParamName] = {
                enabled: false
            };
            utils_extend(allModulesParams, obj);
        };
    }
    const prototypes = {
        eventsEmitter,
        update,
        translate,
        transition,
        slide,
        loop,
        grabCursor,
        events: events$1,
        breakpoints,
        checkOverflow: checkOverflow$1,
        classes
    };
    const extendedDefaults = {};
    class Swiper {
        constructor() {
            let el;
            let params;
            for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
            if (args.length === 1 && args[0].constructor && Object.prototype.toString.call(args[0]).slice(8, -1) === "Object") params = args[0]; else [el, params] = args;
            if (!params) params = {};
            params = utils_extend({}, params);
            if (el && !params.el) params.el = el;
            const document = getDocument();
            if (params.el && typeof params.el === "string" && document.querySelectorAll(params.el).length > 1) {
                const swipers = [];
                document.querySelectorAll(params.el).forEach((containerEl => {
                    const newParams = utils_extend({}, params, {
                        el: containerEl
                    });
                    swipers.push(new Swiper(newParams));
                }));
                return swipers;
            }
            const swiper = this;
            swiper.__swiper__ = true;
            swiper.support = getSupport();
            swiper.device = getDevice({
                userAgent: params.userAgent
            });
            swiper.browser = getBrowser();
            swiper.eventsListeners = {};
            swiper.eventsAnyListeners = [];
            swiper.modules = [ ...swiper.__modules__ ];
            if (params.modules && Array.isArray(params.modules)) swiper.modules.push(...params.modules);
            const allModulesParams = {};
            swiper.modules.forEach((mod => {
                mod({
                    params,
                    swiper,
                    extendParams: moduleExtendParams(params, allModulesParams),
                    on: swiper.on.bind(swiper),
                    once: swiper.once.bind(swiper),
                    off: swiper.off.bind(swiper),
                    emit: swiper.emit.bind(swiper)
                });
            }));
            const swiperParams = utils_extend({}, defaults, allModulesParams);
            swiper.params = utils_extend({}, swiperParams, extendedDefaults, params);
            swiper.originalParams = utils_extend({}, swiper.params);
            swiper.passedParams = utils_extend({}, params);
            if (swiper.params && swiper.params.on) Object.keys(swiper.params.on).forEach((eventName => {
                swiper.on(eventName, swiper.params.on[eventName]);
            }));
            if (swiper.params && swiper.params.onAny) swiper.onAny(swiper.params.onAny);
            Object.assign(swiper, {
                enabled: swiper.params.enabled,
                el,
                classNames: [],
                slides: [],
                slidesGrid: [],
                snapGrid: [],
                slidesSizesGrid: [],
                isHorizontal() {
                    return swiper.params.direction === "horizontal";
                },
                isVertical() {
                    return swiper.params.direction === "vertical";
                },
                activeIndex: 0,
                realIndex: 0,
                isBeginning: true,
                isEnd: false,
                translate: 0,
                previousTranslate: 0,
                progress: 0,
                velocity: 0,
                animating: false,
                cssOverflowAdjustment() {
                    return Math.trunc(this.translate / 2 ** 23) * 2 ** 23;
                },
                allowSlideNext: swiper.params.allowSlideNext,
                allowSlidePrev: swiper.params.allowSlidePrev,
                touchEventsData: {
                    isTouched: void 0,
                    isMoved: void 0,
                    allowTouchCallbacks: void 0,
                    touchStartTime: void 0,
                    isScrolling: void 0,
                    currentTranslate: void 0,
                    startTranslate: void 0,
                    allowThresholdMove: void 0,
                    focusableElements: swiper.params.focusableElements,
                    lastClickTime: 0,
                    clickTimeout: void 0,
                    velocities: [],
                    allowMomentumBounce: void 0,
                    startMoving: void 0,
                    evCache: []
                },
                allowClick: true,
                allowTouchMove: swiper.params.allowTouchMove,
                touches: {
                    startX: 0,
                    startY: 0,
                    currentX: 0,
                    currentY: 0,
                    diff: 0
                },
                imagesToLoad: [],
                imagesLoaded: 0
            });
            swiper.emit("_swiper");
            if (swiper.params.init) swiper.init();
            return swiper;
        }
        getSlideIndex(slideEl) {
            const {slidesEl, params} = this;
            const slides = elementChildren(slidesEl, `.${params.slideClass}, swiper-slide`);
            const firstSlideIndex = elementIndex(slides[0]);
            return elementIndex(slideEl) - firstSlideIndex;
        }
        getSlideIndexByData(index) {
            return this.getSlideIndex(this.slides.filter((slideEl => slideEl.getAttribute("data-swiper-slide-index") * 1 === index))[0]);
        }
        recalcSlides() {
            const swiper = this;
            const {slidesEl, params} = swiper;
            swiper.slides = elementChildren(slidesEl, `.${params.slideClass}, swiper-slide`);
        }
        enable() {
            const swiper = this;
            if (swiper.enabled) return;
            swiper.enabled = true;
            if (swiper.params.grabCursor) swiper.setGrabCursor();
            swiper.emit("enable");
        }
        disable() {
            const swiper = this;
            if (!swiper.enabled) return;
            swiper.enabled = false;
            if (swiper.params.grabCursor) swiper.unsetGrabCursor();
            swiper.emit("disable");
        }
        setProgress(progress, speed) {
            const swiper = this;
            progress = Math.min(Math.max(progress, 0), 1);
            const min = swiper.minTranslate();
            const max = swiper.maxTranslate();
            const current = (max - min) * progress + min;
            swiper.translateTo(current, typeof speed === "undefined" ? 0 : speed);
            swiper.updateActiveIndex();
            swiper.updateSlidesClasses();
        }
        emitContainerClasses() {
            const swiper = this;
            if (!swiper.params._emitClasses || !swiper.el) return;
            const cls = swiper.el.className.split(" ").filter((className => className.indexOf("swiper") === 0 || className.indexOf(swiper.params.containerModifierClass) === 0));
            swiper.emit("_containerClasses", cls.join(" "));
        }
        getSlideClasses(slideEl) {
            const swiper = this;
            if (swiper.destroyed) return "";
            return slideEl.className.split(" ").filter((className => className.indexOf("swiper-slide") === 0 || className.indexOf(swiper.params.slideClass) === 0)).join(" ");
        }
        emitSlidesClasses() {
            const swiper = this;
            if (!swiper.params._emitClasses || !swiper.el) return;
            const updates = [];
            swiper.slides.forEach((slideEl => {
                const classNames = swiper.getSlideClasses(slideEl);
                updates.push({
                    slideEl,
                    classNames
                });
                swiper.emit("_slideClass", slideEl, classNames);
            }));
            swiper.emit("_slideClasses", updates);
        }
        slidesPerViewDynamic(view, exact) {
            if (view === void 0) view = "current";
            if (exact === void 0) exact = false;
            const swiper = this;
            const {params, slides, slidesGrid, slidesSizesGrid, size: swiperSize, activeIndex} = swiper;
            let spv = 1;
            if (params.centeredSlides) {
                let slideSize = slides[activeIndex] ? slides[activeIndex].swiperSlideSize : 0;
                let breakLoop;
                for (let i = activeIndex + 1; i < slides.length; i += 1) if (slides[i] && !breakLoop) {
                    slideSize += slides[i].swiperSlideSize;
                    spv += 1;
                    if (slideSize > swiperSize) breakLoop = true;
                }
                for (let i = activeIndex - 1; i >= 0; i -= 1) if (slides[i] && !breakLoop) {
                    slideSize += slides[i].swiperSlideSize;
                    spv += 1;
                    if (slideSize > swiperSize) breakLoop = true;
                }
            } else if (view === "current") for (let i = activeIndex + 1; i < slides.length; i += 1) {
                const slideInView = exact ? slidesGrid[i] + slidesSizesGrid[i] - slidesGrid[activeIndex] < swiperSize : slidesGrid[i] - slidesGrid[activeIndex] < swiperSize;
                if (slideInView) spv += 1;
            } else for (let i = activeIndex - 1; i >= 0; i -= 1) {
                const slideInView = slidesGrid[activeIndex] - slidesGrid[i] < swiperSize;
                if (slideInView) spv += 1;
            }
            return spv;
        }
        update() {
            const swiper = this;
            if (!swiper || swiper.destroyed) return;
            const {snapGrid, params} = swiper;
            if (params.breakpoints) swiper.setBreakpoint();
            [ ...swiper.el.querySelectorAll('[loading="lazy"]') ].forEach((imageEl => {
                if (imageEl.complete) processLazyPreloader(swiper, imageEl);
            }));
            swiper.updateSize();
            swiper.updateSlides();
            swiper.updateProgress();
            swiper.updateSlidesClasses();
            function setTranslate() {
                const translateValue = swiper.rtlTranslate ? swiper.translate * -1 : swiper.translate;
                const newTranslate = Math.min(Math.max(translateValue, swiper.maxTranslate()), swiper.minTranslate());
                swiper.setTranslate(newTranslate);
                swiper.updateActiveIndex();
                swiper.updateSlidesClasses();
            }
            let translated;
            if (params.freeMode && params.freeMode.enabled && !params.cssMode) {
                setTranslate();
                if (params.autoHeight) swiper.updateAutoHeight();
            } else {
                if ((params.slidesPerView === "auto" || params.slidesPerView > 1) && swiper.isEnd && !params.centeredSlides) {
                    const slides = swiper.virtual && params.virtual.enabled ? swiper.virtual.slides : swiper.slides;
                    translated = swiper.slideTo(slides.length - 1, 0, false, true);
                } else translated = swiper.slideTo(swiper.activeIndex, 0, false, true);
                if (!translated) setTranslate();
            }
            if (params.watchOverflow && snapGrid !== swiper.snapGrid) swiper.checkOverflow();
            swiper.emit("update");
        }
        changeDirection(newDirection, needUpdate) {
            if (needUpdate === void 0) needUpdate = true;
            const swiper = this;
            const currentDirection = swiper.params.direction;
            if (!newDirection) newDirection = currentDirection === "horizontal" ? "vertical" : "horizontal";
            if (newDirection === currentDirection || newDirection !== "horizontal" && newDirection !== "vertical") return swiper;
            swiper.el.classList.remove(`${swiper.params.containerModifierClass}${currentDirection}`);
            swiper.el.classList.add(`${swiper.params.containerModifierClass}${newDirection}`);
            swiper.emitContainerClasses();
            swiper.params.direction = newDirection;
            swiper.slides.forEach((slideEl => {
                if (newDirection === "vertical") slideEl.style.width = ""; else slideEl.style.height = "";
            }));
            swiper.emit("changeDirection");
            if (needUpdate) swiper.update();
            return swiper;
        }
        changeLanguageDirection(direction) {
            const swiper = this;
            if (swiper.rtl && direction === "rtl" || !swiper.rtl && direction === "ltr") return;
            swiper.rtl = direction === "rtl";
            swiper.rtlTranslate = swiper.params.direction === "horizontal" && swiper.rtl;
            if (swiper.rtl) {
                swiper.el.classList.add(`${swiper.params.containerModifierClass}rtl`);
                swiper.el.dir = "rtl";
            } else {
                swiper.el.classList.remove(`${swiper.params.containerModifierClass}rtl`);
                swiper.el.dir = "ltr";
            }
            swiper.update();
        }
        mount(element) {
            const swiper = this;
            if (swiper.mounted) return true;
            let el = element || swiper.params.el;
            if (typeof el === "string") el = document.querySelector(el);
            if (!el) return false;
            el.swiper = swiper;
            if (el.parentNode && el.parentNode.host) swiper.isElement = true;
            const getWrapperSelector = () => `.${(swiper.params.wrapperClass || "").trim().split(" ").join(".")}`;
            const getWrapper = () => {
                if (el && el.shadowRoot && el.shadowRoot.querySelector) {
                    const res = el.shadowRoot.querySelector(getWrapperSelector());
                    return res;
                }
                return elementChildren(el, getWrapperSelector())[0];
            };
            let wrapperEl = getWrapper();
            if (!wrapperEl && swiper.params.createElements) {
                wrapperEl = createElement("div", swiper.params.wrapperClass);
                el.append(wrapperEl);
                elementChildren(el, `.${swiper.params.slideClass}`).forEach((slideEl => {
                    wrapperEl.append(slideEl);
                }));
            }
            Object.assign(swiper, {
                el,
                wrapperEl,
                slidesEl: swiper.isElement ? el.parentNode.host : wrapperEl,
                hostEl: swiper.isElement ? el.parentNode.host : el,
                mounted: true,
                rtl: el.dir.toLowerCase() === "rtl" || elementStyle(el, "direction") === "rtl",
                rtlTranslate: swiper.params.direction === "horizontal" && (el.dir.toLowerCase() === "rtl" || elementStyle(el, "direction") === "rtl"),
                wrongRTL: elementStyle(wrapperEl, "display") === "-webkit-box"
            });
            return true;
        }
        init(el) {
            const swiper = this;
            if (swiper.initialized) return swiper;
            const mounted = swiper.mount(el);
            if (mounted === false) return swiper;
            swiper.emit("beforeInit");
            if (swiper.params.breakpoints) swiper.setBreakpoint();
            swiper.addClasses();
            swiper.updateSize();
            swiper.updateSlides();
            if (swiper.params.watchOverflow) swiper.checkOverflow();
            if (swiper.params.grabCursor && swiper.enabled) swiper.setGrabCursor();
            if (swiper.params.loop && swiper.virtual && swiper.params.virtual.enabled) swiper.slideTo(swiper.params.initialSlide + swiper.virtual.slidesBefore, 0, swiper.params.runCallbacksOnInit, false, true); else swiper.slideTo(swiper.params.initialSlide, 0, swiper.params.runCallbacksOnInit, false, true);
            if (swiper.params.loop) swiper.loopCreate();
            swiper.attachEvents();
            [ ...swiper.el.querySelectorAll('[loading="lazy"]') ].forEach((imageEl => {
                if (imageEl.complete) processLazyPreloader(swiper, imageEl); else imageEl.addEventListener("load", (e => {
                    processLazyPreloader(swiper, e.target);
                }));
            }));
            preload(swiper);
            swiper.initialized = true;
            preload(swiper);
            swiper.emit("init");
            swiper.emit("afterInit");
            return swiper;
        }
        destroy(deleteInstance, cleanStyles) {
            if (deleteInstance === void 0) deleteInstance = true;
            if (cleanStyles === void 0) cleanStyles = true;
            const swiper = this;
            const {params, el, wrapperEl, slides} = swiper;
            if (typeof swiper.params === "undefined" || swiper.destroyed) return null;
            swiper.emit("beforeDestroy");
            swiper.initialized = false;
            swiper.detachEvents();
            if (params.loop) swiper.loopDestroy();
            if (cleanStyles) {
                swiper.removeClasses();
                el.removeAttribute("style");
                wrapperEl.removeAttribute("style");
                if (slides && slides.length) slides.forEach((slideEl => {
                    slideEl.classList.remove(params.slideVisibleClass, params.slideActiveClass, params.slideNextClass, params.slidePrevClass);
                    slideEl.removeAttribute("style");
                    slideEl.removeAttribute("data-swiper-slide-index");
                }));
            }
            swiper.emit("destroy");
            Object.keys(swiper.eventsListeners).forEach((eventName => {
                swiper.off(eventName);
            }));
            if (deleteInstance !== false) {
                swiper.el.swiper = null;
                deleteProps(swiper);
            }
            swiper.destroyed = true;
            return null;
        }
        static extendDefaults(newDefaults) {
            utils_extend(extendedDefaults, newDefaults);
        }
        static get extendedDefaults() {
            return extendedDefaults;
        }
        static get defaults() {
            return defaults;
        }
        static installModule(mod) {
            if (!Swiper.prototype.__modules__) Swiper.prototype.__modules__ = [];
            const modules = Swiper.prototype.__modules__;
            if (typeof mod === "function" && modules.indexOf(mod) < 0) modules.push(mod);
        }
        static use(module) {
            if (Array.isArray(module)) {
                module.forEach((m => Swiper.installModule(m)));
                return Swiper;
            }
            Swiper.installModule(module);
            return Swiper;
        }
    }
    Object.keys(prototypes).forEach((prototypeGroup => {
        Object.keys(prototypes[prototypeGroup]).forEach((protoMethod => {
            Swiper.prototype[protoMethod] = prototypes[prototypeGroup][protoMethod];
        }));
    }));
    Swiper.use([ Resize, Observer ]);
    function Virtual(_ref) {
        let {swiper, extendParams, on, emit} = _ref;
        extendParams({
            virtual: {
                enabled: false,
                slides: [],
                cache: true,
                renderSlide: null,
                renderExternal: null,
                renderExternalUpdate: true,
                addSlidesBefore: 0,
                addSlidesAfter: 0
            }
        });
        let cssModeTimeout;
        const document = getDocument();
        swiper.virtual = {
            cache: {},
            from: void 0,
            to: void 0,
            slides: [],
            offset: 0,
            slidesGrid: []
        };
        const tempDOM = document.createElement("div");
        function renderSlide(slide, index) {
            const params = swiper.params.virtual;
            if (params.cache && swiper.virtual.cache[index]) return swiper.virtual.cache[index];
            let slideEl;
            if (params.renderSlide) {
                slideEl = params.renderSlide.call(swiper, slide, index);
                if (typeof slideEl === "string") {
                    tempDOM.innerHTML = slideEl;
                    slideEl = tempDOM.children[0];
                }
            } else if (swiper.isElement) slideEl = createElement("swiper-slide"); else slideEl = createElement("div", swiper.params.slideClass);
            slideEl.setAttribute("data-swiper-slide-index", index);
            if (!params.renderSlide) slideEl.innerHTML = slide;
            if (params.cache) swiper.virtual.cache[index] = slideEl;
            return slideEl;
        }
        function update(force) {
            const {slidesPerView, slidesPerGroup, centeredSlides, loop: isLoop} = swiper.params;
            const {addSlidesBefore, addSlidesAfter} = swiper.params.virtual;
            const {from: previousFrom, to: previousTo, slides, slidesGrid: previousSlidesGrid, offset: previousOffset} = swiper.virtual;
            if (!swiper.params.cssMode) swiper.updateActiveIndex();
            const activeIndex = swiper.activeIndex || 0;
            let offsetProp;
            if (swiper.rtlTranslate) offsetProp = "right"; else offsetProp = swiper.isHorizontal() ? "left" : "top";
            let slidesAfter;
            let slidesBefore;
            if (centeredSlides) {
                slidesAfter = Math.floor(slidesPerView / 2) + slidesPerGroup + addSlidesAfter;
                slidesBefore = Math.floor(slidesPerView / 2) + slidesPerGroup + addSlidesBefore;
            } else {
                slidesAfter = slidesPerView + (slidesPerGroup - 1) + addSlidesAfter;
                slidesBefore = (isLoop ? slidesPerView : slidesPerGroup) + addSlidesBefore;
            }
            let from = activeIndex - slidesBefore;
            let to = activeIndex + slidesAfter;
            if (!isLoop) {
                from = Math.max(from, 0);
                to = Math.min(to, slides.length - 1);
            }
            let offset = (swiper.slidesGrid[from] || 0) - (swiper.slidesGrid[0] || 0);
            if (isLoop && activeIndex >= slidesBefore) {
                from -= slidesBefore;
                if (!centeredSlides) offset += swiper.slidesGrid[0];
            } else if (isLoop && activeIndex < slidesBefore) {
                from = -slidesBefore;
                if (centeredSlides) offset += swiper.slidesGrid[0];
            }
            Object.assign(swiper.virtual, {
                from,
                to,
                offset,
                slidesGrid: swiper.slidesGrid,
                slidesBefore,
                slidesAfter
            });
            function onRendered() {
                swiper.updateSlides();
                swiper.updateProgress();
                swiper.updateSlidesClasses();
                emit("virtualUpdate");
            }
            if (previousFrom === from && previousTo === to && !force) {
                if (swiper.slidesGrid !== previousSlidesGrid && offset !== previousOffset) swiper.slides.forEach((slideEl => {
                    slideEl.style[offsetProp] = `${offset - Math.abs(swiper.cssOverflowAdjustment())}px`;
                }));
                swiper.updateProgress();
                emit("virtualUpdate");
                return;
            }
            if (swiper.params.virtual.renderExternal) {
                swiper.params.virtual.renderExternal.call(swiper, {
                    offset,
                    from,
                    to,
                    slides: function getSlides() {
                        const slidesToRender = [];
                        for (let i = from; i <= to; i += 1) slidesToRender.push(slides[i]);
                        return slidesToRender;
                    }()
                });
                if (swiper.params.virtual.renderExternalUpdate) onRendered(); else emit("virtualUpdate");
                return;
            }
            const prependIndexes = [];
            const appendIndexes = [];
            const getSlideIndex = index => {
                let slideIndex = index;
                if (index < 0) slideIndex = slides.length + index; else if (slideIndex >= slides.length) slideIndex -= slides.length;
                return slideIndex;
            };
            if (force) swiper.slidesEl.querySelectorAll(`.${swiper.params.slideClass}, swiper-slide`).forEach((slideEl => {
                slideEl.remove();
            })); else for (let i = previousFrom; i <= previousTo; i += 1) if (i < from || i > to) {
                const slideIndex = getSlideIndex(i);
                swiper.slidesEl.querySelectorAll(`.${swiper.params.slideClass}[data-swiper-slide-index="${slideIndex}"], swiper-slide[data-swiper-slide-index="${slideIndex}"]`).forEach((slideEl => {
                    slideEl.remove();
                }));
            }
            const loopFrom = isLoop ? -slides.length : 0;
            const loopTo = isLoop ? slides.length * 2 : slides.length;
            for (let i = loopFrom; i < loopTo; i += 1) if (i >= from && i <= to) {
                const slideIndex = getSlideIndex(i);
                if (typeof previousTo === "undefined" || force) appendIndexes.push(slideIndex); else {
                    if (i > previousTo) appendIndexes.push(slideIndex);
                    if (i < previousFrom) prependIndexes.push(slideIndex);
                }
            }
            appendIndexes.forEach((index => {
                swiper.slidesEl.append(renderSlide(slides[index], index));
            }));
            if (isLoop) for (let i = prependIndexes.length - 1; i >= 0; i -= 1) {
                const index = prependIndexes[i];
                swiper.slidesEl.prepend(renderSlide(slides[index], index));
            } else {
                prependIndexes.sort(((a, b) => b - a));
                prependIndexes.forEach((index => {
                    swiper.slidesEl.prepend(renderSlide(slides[index], index));
                }));
            }
            elementChildren(swiper.slidesEl, ".swiper-slide, swiper-slide").forEach((slideEl => {
                slideEl.style[offsetProp] = `${offset - Math.abs(swiper.cssOverflowAdjustment())}px`;
            }));
            onRendered();
        }
        function appendSlide(slides) {
            if (typeof slides === "object" && "length" in slides) {
                for (let i = 0; i < slides.length; i += 1) if (slides[i]) swiper.virtual.slides.push(slides[i]);
            } else swiper.virtual.slides.push(slides);
            update(true);
        }
        function prependSlide(slides) {
            const activeIndex = swiper.activeIndex;
            let newActiveIndex = activeIndex + 1;
            let numberOfNewSlides = 1;
            if (Array.isArray(slides)) {
                for (let i = 0; i < slides.length; i += 1) if (slides[i]) swiper.virtual.slides.unshift(slides[i]);
                newActiveIndex = activeIndex + slides.length;
                numberOfNewSlides = slides.length;
            } else swiper.virtual.slides.unshift(slides);
            if (swiper.params.virtual.cache) {
                const cache = swiper.virtual.cache;
                const newCache = {};
                Object.keys(cache).forEach((cachedIndex => {
                    const cachedEl = cache[cachedIndex];
                    const cachedElIndex = cachedEl.getAttribute("data-swiper-slide-index");
                    if (cachedElIndex) cachedEl.setAttribute("data-swiper-slide-index", parseInt(cachedElIndex, 10) + numberOfNewSlides);
                    newCache[parseInt(cachedIndex, 10) + numberOfNewSlides] = cachedEl;
                }));
                swiper.virtual.cache = newCache;
            }
            update(true);
            swiper.slideTo(newActiveIndex, 0);
        }
        function removeSlide(slidesIndexes) {
            if (typeof slidesIndexes === "undefined" || slidesIndexes === null) return;
            let activeIndex = swiper.activeIndex;
            if (Array.isArray(slidesIndexes)) for (let i = slidesIndexes.length - 1; i >= 0; i -= 1) {
                swiper.virtual.slides.splice(slidesIndexes[i], 1);
                if (swiper.params.virtual.cache) delete swiper.virtual.cache[slidesIndexes[i]];
                if (slidesIndexes[i] < activeIndex) activeIndex -= 1;
                activeIndex = Math.max(activeIndex, 0);
            } else {
                swiper.virtual.slides.splice(slidesIndexes, 1);
                if (swiper.params.virtual.cache) delete swiper.virtual.cache[slidesIndexes];
                if (slidesIndexes < activeIndex) activeIndex -= 1;
                activeIndex = Math.max(activeIndex, 0);
            }
            update(true);
            swiper.slideTo(activeIndex, 0);
        }
        function removeAllSlides() {
            swiper.virtual.slides = [];
            if (swiper.params.virtual.cache) swiper.virtual.cache = {};
            update(true);
            swiper.slideTo(0, 0);
        }
        on("beforeInit", (() => {
            if (!swiper.params.virtual.enabled) return;
            let domSlidesAssigned;
            if (typeof swiper.passedParams.virtual.slides === "undefined") {
                const slides = [ ...swiper.slidesEl.children ].filter((el => el.matches(`.${swiper.params.slideClass}, swiper-slide`)));
                if (slides && slides.length) {
                    swiper.virtual.slides = [ ...slides ];
                    domSlidesAssigned = true;
                    slides.forEach(((slideEl, slideIndex) => {
                        slideEl.setAttribute("data-swiper-slide-index", slideIndex);
                        swiper.virtual.cache[slideIndex] = slideEl;
                        slideEl.remove();
                    }));
                }
            }
            if (!domSlidesAssigned) swiper.virtual.slides = swiper.params.virtual.slides;
            swiper.classNames.push(`${swiper.params.containerModifierClass}virtual`);
            swiper.params.watchSlidesProgress = true;
            swiper.originalParams.watchSlidesProgress = true;
            if (!swiper.params.initialSlide) update();
        }));
        on("setTranslate", (() => {
            if (!swiper.params.virtual.enabled) return;
            if (swiper.params.cssMode && !swiper._immediateVirtual) {
                clearTimeout(cssModeTimeout);
                cssModeTimeout = setTimeout((() => {
                    update();
                }), 100);
            } else update();
        }));
        on("init update resize", (() => {
            if (!swiper.params.virtual.enabled) return;
            if (swiper.params.cssMode) setCSSProperty(swiper.wrapperEl, "--swiper-virtual-size", `${swiper.virtualSize}px`);
        }));
        Object.assign(swiper.virtual, {
            appendSlide,
            prependSlide,
            removeSlide,
            removeAllSlides,
            update
        });
    }
    function Keyboard(_ref) {
        let {swiper, extendParams, on, emit} = _ref;
        const document = getDocument();
        const window = ssr_window_esm_getWindow();
        swiper.keyboard = {
            enabled: false
        };
        extendParams({
            keyboard: {
                enabled: false,
                onlyInViewport: true,
                pageUpDown: true
            }
        });
        function handle(event) {
            if (!swiper.enabled) return;
            const {rtlTranslate: rtl} = swiper;
            let e = event;
            if (e.originalEvent) e = e.originalEvent;
            const kc = e.keyCode || e.charCode;
            const pageUpDown = swiper.params.keyboard.pageUpDown;
            const isPageUp = pageUpDown && kc === 33;
            const isPageDown = pageUpDown && kc === 34;
            const isArrowLeft = kc === 37;
            const isArrowRight = kc === 39;
            const isArrowUp = kc === 38;
            const isArrowDown = kc === 40;
            if (!swiper.allowSlideNext && (swiper.isHorizontal() && isArrowRight || swiper.isVertical() && isArrowDown || isPageDown)) return false;
            if (!swiper.allowSlidePrev && (swiper.isHorizontal() && isArrowLeft || swiper.isVertical() && isArrowUp || isPageUp)) return false;
            if (e.shiftKey || e.altKey || e.ctrlKey || e.metaKey) return;
            if (document.activeElement && document.activeElement.nodeName && (document.activeElement.nodeName.toLowerCase() === "input" || document.activeElement.nodeName.toLowerCase() === "textarea")) return;
            if (swiper.params.keyboard.onlyInViewport && (isPageUp || isPageDown || isArrowLeft || isArrowRight || isArrowUp || isArrowDown)) {
                let inView = false;
                if (elementParents(swiper.el, `.${swiper.params.slideClass}, swiper-slide`).length > 0 && elementParents(swiper.el, `.${swiper.params.slideActiveClass}`).length === 0) return;
                const el = swiper.el;
                const swiperWidth = el.clientWidth;
                const swiperHeight = el.clientHeight;
                const windowWidth = window.innerWidth;
                const windowHeight = window.innerHeight;
                const swiperOffset = elementOffset(el);
                if (rtl) swiperOffset.left -= el.scrollLeft;
                const swiperCoord = [ [ swiperOffset.left, swiperOffset.top ], [ swiperOffset.left + swiperWidth, swiperOffset.top ], [ swiperOffset.left, swiperOffset.top + swiperHeight ], [ swiperOffset.left + swiperWidth, swiperOffset.top + swiperHeight ] ];
                for (let i = 0; i < swiperCoord.length; i += 1) {
                    const point = swiperCoord[i];
                    if (point[0] >= 0 && point[0] <= windowWidth && point[1] >= 0 && point[1] <= windowHeight) {
                        if (point[0] === 0 && point[1] === 0) continue;
                        inView = true;
                    }
                }
                if (!inView) return;
            }
            if (swiper.isHorizontal()) {
                if (isPageUp || isPageDown || isArrowLeft || isArrowRight) if (e.preventDefault) e.preventDefault(); else e.returnValue = false;
                if ((isPageDown || isArrowRight) && !rtl || (isPageUp || isArrowLeft) && rtl) swiper.slideNext();
                if ((isPageUp || isArrowLeft) && !rtl || (isPageDown || isArrowRight) && rtl) swiper.slidePrev();
            } else {
                if (isPageUp || isPageDown || isArrowUp || isArrowDown) if (e.preventDefault) e.preventDefault(); else e.returnValue = false;
                if (isPageDown || isArrowDown) swiper.slideNext();
                if (isPageUp || isArrowUp) swiper.slidePrev();
            }
            emit("keyPress", kc);
            return;
        }
        function enable() {
            if (swiper.keyboard.enabled) return;
            document.addEventListener("keydown", handle);
            swiper.keyboard.enabled = true;
        }
        function disable() {
            if (!swiper.keyboard.enabled) return;
            document.removeEventListener("keydown", handle);
            swiper.keyboard.enabled = false;
        }
        on("init", (() => {
            if (swiper.params.keyboard.enabled) enable();
        }));
        on("destroy", (() => {
            if (swiper.keyboard.enabled) disable();
        }));
        Object.assign(swiper.keyboard, {
            enable,
            disable
        });
    }
    function Mousewheel(_ref) {
        let {swiper, extendParams, on, emit} = _ref;
        const window = ssr_window_esm_getWindow();
        extendParams({
            mousewheel: {
                enabled: false,
                releaseOnEdges: false,
                invert: false,
                forceToAxis: false,
                sensitivity: 1,
                eventsTarget: "container",
                thresholdDelta: null,
                thresholdTime: null,
                noMousewheelClass: "swiper-no-mousewheel"
            }
        });
        swiper.mousewheel = {
            enabled: false
        };
        let timeout;
        let lastScrollTime = now();
        let lastEventBeforeSnap;
        const recentWheelEvents = [];
        function normalize(e) {
            const PIXEL_STEP = 10;
            const LINE_HEIGHT = 40;
            const PAGE_HEIGHT = 800;
            let sX = 0;
            let sY = 0;
            let pX = 0;
            let pY = 0;
            if ("detail" in e) sY = e.detail;
            if ("wheelDelta" in e) sY = -e.wheelDelta / 120;
            if ("wheelDeltaY" in e) sY = -e.wheelDeltaY / 120;
            if ("wheelDeltaX" in e) sX = -e.wheelDeltaX / 120;
            if ("axis" in e && e.axis === e.HORIZONTAL_AXIS) {
                sX = sY;
                sY = 0;
            }
            pX = sX * PIXEL_STEP;
            pY = sY * PIXEL_STEP;
            if ("deltaY" in e) pY = e.deltaY;
            if ("deltaX" in e) pX = e.deltaX;
            if (e.shiftKey && !pX) {
                pX = pY;
                pY = 0;
            }
            if ((pX || pY) && e.deltaMode) if (e.deltaMode === 1) {
                pX *= LINE_HEIGHT;
                pY *= LINE_HEIGHT;
            } else {
                pX *= PAGE_HEIGHT;
                pY *= PAGE_HEIGHT;
            }
            if (pX && !sX) sX = pX < 1 ? -1 : 1;
            if (pY && !sY) sY = pY < 1 ? -1 : 1;
            return {
                spinX: sX,
                spinY: sY,
                pixelX: pX,
                pixelY: pY
            };
        }
        function handleMouseEnter() {
            if (!swiper.enabled) return;
            swiper.mouseEntered = true;
        }
        function handleMouseLeave() {
            if (!swiper.enabled) return;
            swiper.mouseEntered = false;
        }
        function animateSlider(newEvent) {
            if (swiper.params.mousewheel.thresholdDelta && newEvent.delta < swiper.params.mousewheel.thresholdDelta) return false;
            if (swiper.params.mousewheel.thresholdTime && now() - lastScrollTime < swiper.params.mousewheel.thresholdTime) return false;
            if (newEvent.delta >= 6 && now() - lastScrollTime < 60) return true;
            if (newEvent.direction < 0) {
                if ((!swiper.isEnd || swiper.params.loop) && !swiper.animating) {
                    swiper.slideNext();
                    emit("scroll", newEvent.raw);
                }
            } else if ((!swiper.isBeginning || swiper.params.loop) && !swiper.animating) {
                swiper.slidePrev();
                emit("scroll", newEvent.raw);
            }
            lastScrollTime = (new window.Date).getTime();
            return false;
        }
        function releaseScroll(newEvent) {
            const params = swiper.params.mousewheel;
            if (newEvent.direction < 0) {
                if (swiper.isEnd && !swiper.params.loop && params.releaseOnEdges) return true;
            } else if (swiper.isBeginning && !swiper.params.loop && params.releaseOnEdges) return true;
            return false;
        }
        function handle(event) {
            let e = event;
            let disableParentSwiper = true;
            if (!swiper.enabled) return;
            if (event.target.closest(`.${swiper.params.mousewheel.noMousewheelClass}`)) return;
            const params = swiper.params.mousewheel;
            if (swiper.params.cssMode) e.preventDefault();
            let targetEl = swiper.el;
            if (swiper.params.mousewheel.eventsTarget !== "container") targetEl = document.querySelector(swiper.params.mousewheel.eventsTarget);
            const targetElContainsTarget = targetEl && targetEl.contains(e.target);
            if (!swiper.mouseEntered && !targetElContainsTarget && !params.releaseOnEdges) return true;
            if (e.originalEvent) e = e.originalEvent;
            let delta = 0;
            const rtlFactor = swiper.rtlTranslate ? -1 : 1;
            const data = normalize(e);
            if (params.forceToAxis) if (swiper.isHorizontal()) if (Math.abs(data.pixelX) > Math.abs(data.pixelY)) delta = -data.pixelX * rtlFactor; else return true; else if (Math.abs(data.pixelY) > Math.abs(data.pixelX)) delta = -data.pixelY; else return true; else delta = Math.abs(data.pixelX) > Math.abs(data.pixelY) ? -data.pixelX * rtlFactor : -data.pixelY;
            if (delta === 0) return true;
            if (params.invert) delta = -delta;
            let positions = swiper.getTranslate() + delta * params.sensitivity;
            if (positions >= swiper.minTranslate()) positions = swiper.minTranslate();
            if (positions <= swiper.maxTranslate()) positions = swiper.maxTranslate();
            disableParentSwiper = swiper.params.loop ? true : !(positions === swiper.minTranslate() || positions === swiper.maxTranslate());
            if (disableParentSwiper && swiper.params.nested) e.stopPropagation();
            if (!swiper.params.freeMode || !swiper.params.freeMode.enabled) {
                const newEvent = {
                    time: now(),
                    delta: Math.abs(delta),
                    direction: Math.sign(delta),
                    raw: event
                };
                if (recentWheelEvents.length >= 2) recentWheelEvents.shift();
                const prevEvent = recentWheelEvents.length ? recentWheelEvents[recentWheelEvents.length - 1] : void 0;
                recentWheelEvents.push(newEvent);
                if (prevEvent) {
                    if (newEvent.direction !== prevEvent.direction || newEvent.delta > prevEvent.delta || newEvent.time > prevEvent.time + 150) animateSlider(newEvent);
                } else animateSlider(newEvent);
                if (releaseScroll(newEvent)) return true;
            } else {
                const newEvent = {
                    time: now(),
                    delta: Math.abs(delta),
                    direction: Math.sign(delta)
                };
                const ignoreWheelEvents = lastEventBeforeSnap && newEvent.time < lastEventBeforeSnap.time + 500 && newEvent.delta <= lastEventBeforeSnap.delta && newEvent.direction === lastEventBeforeSnap.direction;
                if (!ignoreWheelEvents) {
                    lastEventBeforeSnap = void 0;
                    let position = swiper.getTranslate() + delta * params.sensitivity;
                    const wasBeginning = swiper.isBeginning;
                    const wasEnd = swiper.isEnd;
                    if (position >= swiper.minTranslate()) position = swiper.minTranslate();
                    if (position <= swiper.maxTranslate()) position = swiper.maxTranslate();
                    swiper.setTransition(0);
                    swiper.setTranslate(position);
                    swiper.updateProgress();
                    swiper.updateActiveIndex();
                    swiper.updateSlidesClasses();
                    if (!wasBeginning && swiper.isBeginning || !wasEnd && swiper.isEnd) swiper.updateSlidesClasses();
                    if (swiper.params.loop) swiper.loopFix({
                        direction: newEvent.direction < 0 ? "next" : "prev",
                        byMousewheel: true
                    });
                    if (swiper.params.freeMode.sticky) {
                        clearTimeout(timeout);
                        timeout = void 0;
                        if (recentWheelEvents.length >= 15) recentWheelEvents.shift();
                        const prevEvent = recentWheelEvents.length ? recentWheelEvents[recentWheelEvents.length - 1] : void 0;
                        const firstEvent = recentWheelEvents[0];
                        recentWheelEvents.push(newEvent);
                        if (prevEvent && (newEvent.delta > prevEvent.delta || newEvent.direction !== prevEvent.direction)) recentWheelEvents.splice(0); else if (recentWheelEvents.length >= 15 && newEvent.time - firstEvent.time < 500 && firstEvent.delta - newEvent.delta >= 1 && newEvent.delta <= 6) {
                            const snapToThreshold = delta > 0 ? .8 : .2;
                            lastEventBeforeSnap = newEvent;
                            recentWheelEvents.splice(0);
                            timeout = nextTick((() => {
                                swiper.slideToClosest(swiper.params.speed, true, void 0, snapToThreshold);
                            }), 0);
                        }
                        if (!timeout) timeout = nextTick((() => {
                            const snapToThreshold = .5;
                            lastEventBeforeSnap = newEvent;
                            recentWheelEvents.splice(0);
                            swiper.slideToClosest(swiper.params.speed, true, void 0, snapToThreshold);
                        }), 500);
                    }
                    if (!ignoreWheelEvents) emit("scroll", e);
                    if (swiper.params.autoplay && swiper.params.autoplayDisableOnInteraction) swiper.autoplay.stop();
                    if (position === swiper.minTranslate() || position === swiper.maxTranslate()) return true;
                }
            }
            if (e.preventDefault) e.preventDefault(); else e.returnValue = false;
            return false;
        }
        function events(method) {
            let targetEl = swiper.el;
            if (swiper.params.mousewheel.eventsTarget !== "container") targetEl = document.querySelector(swiper.params.mousewheel.eventsTarget);
            targetEl[method]("mouseenter", handleMouseEnter);
            targetEl[method]("mouseleave", handleMouseLeave);
            targetEl[method]("wheel", handle);
        }
        function enable() {
            if (swiper.params.cssMode) {
                swiper.wrapperEl.removeEventListener("wheel", handle);
                return true;
            }
            if (swiper.mousewheel.enabled) return false;
            events("addEventListener");
            swiper.mousewheel.enabled = true;
            return true;
        }
        function disable() {
            if (swiper.params.cssMode) {
                swiper.wrapperEl.addEventListener(event, handle);
                return true;
            }
            if (!swiper.mousewheel.enabled) return false;
            events("removeEventListener");
            swiper.mousewheel.enabled = false;
            return true;
        }
        on("init", (() => {
            if (!swiper.params.mousewheel.enabled && swiper.params.cssMode) disable();
            if (swiper.params.mousewheel.enabled) enable();
        }));
        on("destroy", (() => {
            if (swiper.params.cssMode) enable();
            if (swiper.mousewheel.enabled) disable();
        }));
        Object.assign(swiper.mousewheel, {
            enable,
            disable
        });
    }
    function createElementIfNotDefined(swiper, originalParams, params, checkProps) {
        if (swiper.params.createElements) Object.keys(checkProps).forEach((key => {
            if (!params[key] && params.auto === true) {
                let element = elementChildren(swiper.el, `.${checkProps[key]}`)[0];
                if (!element) {
                    element = createElement("div", checkProps[key]);
                    element.className = checkProps[key];
                    swiper.el.append(element);
                }
                params[key] = element;
                originalParams[key] = element;
            }
        }));
        return params;
    }
    function Navigation(_ref) {
        let {swiper, extendParams, on, emit} = _ref;
        extendParams({
            navigation: {
                nextEl: null,
                prevEl: null,
                hideOnClick: false,
                disabledClass: "swiper-button-disabled",
                hiddenClass: "swiper-button-hidden",
                lockClass: "swiper-button-lock",
                navigationDisabledClass: "swiper-navigation-disabled"
            }
        });
        swiper.navigation = {
            nextEl: null,
            prevEl: null
        };
        const makeElementsArray = el => {
            if (!Array.isArray(el)) el = [ el ].filter((e => !!e));
            return el;
        };
        function getEl(el) {
            let res;
            if (el && typeof el === "string" && swiper.isElement) {
                res = swiper.el.querySelector(el);
                if (res) return res;
            }
            if (el) {
                if (typeof el === "string") res = [ ...document.querySelectorAll(el) ];
                if (swiper.params.uniqueNavElements && typeof el === "string" && res.length > 1 && swiper.el.querySelectorAll(el).length === 1) res = swiper.el.querySelector(el);
            }
            if (el && !res) return el;
            return res;
        }
        function toggleEl(el, disabled) {
            const params = swiper.params.navigation;
            el = makeElementsArray(el);
            el.forEach((subEl => {
                if (subEl) {
                    subEl.classList[disabled ? "add" : "remove"](...params.disabledClass.split(" "));
                    if (subEl.tagName === "BUTTON") subEl.disabled = disabled;
                    if (swiper.params.watchOverflow && swiper.enabled) subEl.classList[swiper.isLocked ? "add" : "remove"](params.lockClass);
                }
            }));
        }
        function update() {
            const {nextEl, prevEl} = swiper.navigation;
            if (swiper.params.loop) {
                toggleEl(prevEl, false);
                toggleEl(nextEl, false);
                return;
            }
            toggleEl(prevEl, swiper.isBeginning && !swiper.params.rewind);
            toggleEl(nextEl, swiper.isEnd && !swiper.params.rewind);
        }
        function onPrevClick(e) {
            e.preventDefault();
            if (swiper.isBeginning && !swiper.params.loop && !swiper.params.rewind) return;
            swiper.slidePrev();
            emit("navigationPrev");
        }
        function onNextClick(e) {
            e.preventDefault();
            if (swiper.isEnd && !swiper.params.loop && !swiper.params.rewind) return;
            swiper.slideNext();
            emit("navigationNext");
        }
        function init() {
            const params = swiper.params.navigation;
            swiper.params.navigation = createElementIfNotDefined(swiper, swiper.originalParams.navigation, swiper.params.navigation, {
                nextEl: "swiper-button-next",
                prevEl: "swiper-button-prev"
            });
            if (!(params.nextEl || params.prevEl)) return;
            let nextEl = getEl(params.nextEl);
            let prevEl = getEl(params.prevEl);
            Object.assign(swiper.navigation, {
                nextEl,
                prevEl
            });
            nextEl = makeElementsArray(nextEl);
            prevEl = makeElementsArray(prevEl);
            const initButton = (el, dir) => {
                if (el) el.addEventListener("click", dir === "next" ? onNextClick : onPrevClick);
                if (!swiper.enabled && el) el.classList.add(...params.lockClass.split(" "));
            };
            nextEl.forEach((el => initButton(el, "next")));
            prevEl.forEach((el => initButton(el, "prev")));
        }
        function destroy() {
            let {nextEl, prevEl} = swiper.navigation;
            nextEl = makeElementsArray(nextEl);
            prevEl = makeElementsArray(prevEl);
            const destroyButton = (el, dir) => {
                el.removeEventListener("click", dir === "next" ? onNextClick : onPrevClick);
                el.classList.remove(...swiper.params.navigation.disabledClass.split(" "));
            };
            nextEl.forEach((el => destroyButton(el, "next")));
            prevEl.forEach((el => destroyButton(el, "prev")));
        }
        on("init", (() => {
            if (swiper.params.navigation.enabled === false) disable(); else {
                init();
                update();
            }
        }));
        on("toEdge fromEdge lock unlock", (() => {
            update();
        }));
        on("destroy", (() => {
            destroy();
        }));
        on("enable disable", (() => {
            let {nextEl, prevEl} = swiper.navigation;
            nextEl = makeElementsArray(nextEl);
            prevEl = makeElementsArray(prevEl);
            [ ...nextEl, ...prevEl ].filter((el => !!el)).forEach((el => el.classList[swiper.enabled ? "remove" : "add"](swiper.params.navigation.lockClass)));
        }));
        on("click", ((_s, e) => {
            let {nextEl, prevEl} = swiper.navigation;
            nextEl = makeElementsArray(nextEl);
            prevEl = makeElementsArray(prevEl);
            const targetEl = e.target;
            if (swiper.params.navigation.hideOnClick && !prevEl.includes(targetEl) && !nextEl.includes(targetEl)) {
                if (swiper.pagination && swiper.params.pagination && swiper.params.pagination.clickable && (swiper.pagination.el === targetEl || swiper.pagination.el.contains(targetEl))) return;
                let isHidden;
                if (nextEl.length) isHidden = nextEl[0].classList.contains(swiper.params.navigation.hiddenClass); else if (prevEl.length) isHidden = prevEl[0].classList.contains(swiper.params.navigation.hiddenClass);
                if (isHidden === true) emit("navigationShow"); else emit("navigationHide");
                [ ...nextEl, ...prevEl ].filter((el => !!el)).forEach((el => el.classList.toggle(swiper.params.navigation.hiddenClass)));
            }
        }));
        const enable = () => {
            swiper.el.classList.remove(...swiper.params.navigation.navigationDisabledClass.split(" "));
            init();
            update();
        };
        const disable = () => {
            swiper.el.classList.add(...swiper.params.navigation.navigationDisabledClass.split(" "));
            destroy();
        };
        Object.assign(swiper.navigation, {
            enable,
            disable,
            update,
            init,
            destroy
        });
    }
    function classesToSelector(classes) {
        if (classes === void 0) classes = "";
        return `.${classes.trim().replace(/([\.:!+\/])/g, "\\$1").replace(/ /g, ".")}`;
    }
    function Pagination(_ref) {
        let {swiper, extendParams, on, emit} = _ref;
        const pfx = "swiper-pagination";
        extendParams({
            pagination: {
                el: null,
                bulletElement: "span",
                clickable: false,
                hideOnClick: false,
                renderBullet: null,
                renderProgressbar: null,
                renderFraction: null,
                renderCustom: null,
                progressbarOpposite: false,
                type: "bullets",
                dynamicBullets: false,
                dynamicMainBullets: 1,
                formatFractionCurrent: number => number,
                formatFractionTotal: number => number,
                bulletClass: `${pfx}-bullet`,
                bulletActiveClass: `${pfx}-bullet-active`,
                modifierClass: `${pfx}-`,
                currentClass: `${pfx}-current`,
                totalClass: `${pfx}-total`,
                hiddenClass: `${pfx}-hidden`,
                progressbarFillClass: `${pfx}-progressbar-fill`,
                progressbarOppositeClass: `${pfx}-progressbar-opposite`,
                clickableClass: `${pfx}-clickable`,
                lockClass: `${pfx}-lock`,
                horizontalClass: `${pfx}-horizontal`,
                verticalClass: `${pfx}-vertical`,
                paginationDisabledClass: `${pfx}-disabled`
            }
        });
        swiper.pagination = {
            el: null,
            bullets: []
        };
        let bulletSize;
        let dynamicBulletIndex = 0;
        const makeElementsArray = el => {
            if (!Array.isArray(el)) el = [ el ].filter((e => !!e));
            return el;
        };
        function isPaginationDisabled() {
            return !swiper.params.pagination.el || !swiper.pagination.el || Array.isArray(swiper.pagination.el) && swiper.pagination.el.length === 0;
        }
        function setSideBullets(bulletEl, position) {
            const {bulletActiveClass} = swiper.params.pagination;
            if (!bulletEl) return;
            bulletEl = bulletEl[`${position === "prev" ? "previous" : "next"}ElementSibling`];
            if (bulletEl) {
                bulletEl.classList.add(`${bulletActiveClass}-${position}`);
                bulletEl = bulletEl[`${position === "prev" ? "previous" : "next"}ElementSibling`];
                if (bulletEl) bulletEl.classList.add(`${bulletActiveClass}-${position}-${position}`);
            }
        }
        function onBulletClick(e) {
            const bulletEl = e.target.closest(classesToSelector(swiper.params.pagination.bulletClass));
            if (!bulletEl) return;
            e.preventDefault();
            const index = elementIndex(bulletEl) * swiper.params.slidesPerGroup;
            if (swiper.params.loop) {
                if (swiper.realIndex === index) return;
                const newSlideIndex = swiper.getSlideIndexByData(index);
                const currentSlideIndex = swiper.getSlideIndexByData(swiper.realIndex);
                if (newSlideIndex > swiper.slides.length - swiper.loopedSlides) swiper.loopFix({
                    direction: newSlideIndex > currentSlideIndex ? "next" : "prev",
                    activeSlideIndex: newSlideIndex,
                    slideTo: false
                });
                swiper.slideToLoop(index);
            } else swiper.slideTo(index);
        }
        function update() {
            const rtl = swiper.rtl;
            const params = swiper.params.pagination;
            if (isPaginationDisabled()) return;
            let el = swiper.pagination.el;
            el = makeElementsArray(el);
            let current;
            let previousIndex;
            const slidesLength = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.slides.length : swiper.slides.length;
            const total = swiper.params.loop ? Math.ceil(slidesLength / swiper.params.slidesPerGroup) : swiper.snapGrid.length;
            if (swiper.params.loop) {
                previousIndex = swiper.previousRealIndex || 0;
                current = swiper.params.slidesPerGroup > 1 ? Math.floor(swiper.realIndex / swiper.params.slidesPerGroup) : swiper.realIndex;
            } else if (typeof swiper.snapIndex !== "undefined") {
                current = swiper.snapIndex;
                previousIndex = swiper.previousSnapIndex;
            } else {
                previousIndex = swiper.previousIndex || 0;
                current = swiper.activeIndex || 0;
            }
            if (params.type === "bullets" && swiper.pagination.bullets && swiper.pagination.bullets.length > 0) {
                const bullets = swiper.pagination.bullets;
                let firstIndex;
                let lastIndex;
                let midIndex;
                if (params.dynamicBullets) {
                    bulletSize = elementOuterSize(bullets[0], swiper.isHorizontal() ? "width" : "height", true);
                    el.forEach((subEl => {
                        subEl.style[swiper.isHorizontal() ? "width" : "height"] = `${bulletSize * (params.dynamicMainBullets + 4)}px`;
                    }));
                    if (params.dynamicMainBullets > 1 && previousIndex !== void 0) {
                        dynamicBulletIndex += current - (previousIndex || 0);
                        if (dynamicBulletIndex > params.dynamicMainBullets - 1) dynamicBulletIndex = params.dynamicMainBullets - 1; else if (dynamicBulletIndex < 0) dynamicBulletIndex = 0;
                    }
                    firstIndex = Math.max(current - dynamicBulletIndex, 0);
                    lastIndex = firstIndex + (Math.min(bullets.length, params.dynamicMainBullets) - 1);
                    midIndex = (lastIndex + firstIndex) / 2;
                }
                bullets.forEach((bulletEl => {
                    const classesToRemove = [ ...[ "", "-next", "-next-next", "-prev", "-prev-prev", "-main" ].map((suffix => `${params.bulletActiveClass}${suffix}`)) ].map((s => typeof s === "string" && s.includes(" ") ? s.split(" ") : s)).flat();
                    bulletEl.classList.remove(...classesToRemove);
                }));
                if (el.length > 1) bullets.forEach((bullet => {
                    const bulletIndex = elementIndex(bullet);
                    if (bulletIndex === current) bullet.classList.add(...params.bulletActiveClass.split(" ")); else if (swiper.isElement) bullet.setAttribute("part", "bullet");
                    if (params.dynamicBullets) {
                        if (bulletIndex >= firstIndex && bulletIndex <= lastIndex) bullet.classList.add(...`${params.bulletActiveClass}-main`.split(" "));
                        if (bulletIndex === firstIndex) setSideBullets(bullet, "prev");
                        if (bulletIndex === lastIndex) setSideBullets(bullet, "next");
                    }
                })); else {
                    const bullet = bullets[current];
                    if (bullet) bullet.classList.add(...params.bulletActiveClass.split(" "));
                    if (swiper.isElement) bullets.forEach(((bulletEl, bulletIndex) => {
                        bulletEl.setAttribute("part", bulletIndex === current ? "bullet-active" : "bullet");
                    }));
                    if (params.dynamicBullets) {
                        const firstDisplayedBullet = bullets[firstIndex];
                        const lastDisplayedBullet = bullets[lastIndex];
                        for (let i = firstIndex; i <= lastIndex; i += 1) if (bullets[i]) bullets[i].classList.add(...`${params.bulletActiveClass}-main`.split(" "));
                        setSideBullets(firstDisplayedBullet, "prev");
                        setSideBullets(lastDisplayedBullet, "next");
                    }
                }
                if (params.dynamicBullets) {
                    const dynamicBulletsLength = Math.min(bullets.length, params.dynamicMainBullets + 4);
                    const bulletsOffset = (bulletSize * dynamicBulletsLength - bulletSize) / 2 - midIndex * bulletSize;
                    const offsetProp = rtl ? "right" : "left";
                    bullets.forEach((bullet => {
                        bullet.style[swiper.isHorizontal() ? offsetProp : "top"] = `${bulletsOffset}px`;
                    }));
                }
            }
            el.forEach(((subEl, subElIndex) => {
                if (params.type === "fraction") {
                    subEl.querySelectorAll(classesToSelector(params.currentClass)).forEach((fractionEl => {
                        fractionEl.textContent = params.formatFractionCurrent(current + 1);
                    }));
                    subEl.querySelectorAll(classesToSelector(params.totalClass)).forEach((totalEl => {
                        totalEl.textContent = params.formatFractionTotal(total);
                    }));
                }
                if (params.type === "progressbar") {
                    let progressbarDirection;
                    if (params.progressbarOpposite) progressbarDirection = swiper.isHorizontal() ? "vertical" : "horizontal"; else progressbarDirection = swiper.isHorizontal() ? "horizontal" : "vertical";
                    const scale = (current + 1) / total;
                    let scaleX = 1;
                    let scaleY = 1;
                    if (progressbarDirection === "horizontal") scaleX = scale; else scaleY = scale;
                    subEl.querySelectorAll(classesToSelector(params.progressbarFillClass)).forEach((progressEl => {
                        progressEl.style.transform = `translate3d(0,0,0) scaleX(${scaleX}) scaleY(${scaleY})`;
                        progressEl.style.transitionDuration = `${swiper.params.speed}ms`;
                    }));
                }
                if (params.type === "custom" && params.renderCustom) {
                    subEl.innerHTML = params.renderCustom(swiper, current + 1, total);
                    if (subElIndex === 0) emit("paginationRender", subEl);
                } else {
                    if (subElIndex === 0) emit("paginationRender", subEl);
                    emit("paginationUpdate", subEl);
                }
                if (swiper.params.watchOverflow && swiper.enabled) subEl.classList[swiper.isLocked ? "add" : "remove"](params.lockClass);
            }));
        }
        function render() {
            const params = swiper.params.pagination;
            if (isPaginationDisabled()) return;
            const slidesLength = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.slides.length : swiper.slides.length;
            let el = swiper.pagination.el;
            el = makeElementsArray(el);
            let paginationHTML = "";
            if (params.type === "bullets") {
                let numberOfBullets = swiper.params.loop ? Math.ceil(slidesLength / swiper.params.slidesPerGroup) : swiper.snapGrid.length;
                if (swiper.params.freeMode && swiper.params.freeMode.enabled && numberOfBullets > slidesLength) numberOfBullets = slidesLength;
                for (let i = 0; i < numberOfBullets; i += 1) if (params.renderBullet) paginationHTML += params.renderBullet.call(swiper, i, params.bulletClass); else paginationHTML += `<${params.bulletElement} ${swiper.isElement ? 'part="bullet"' : ""} class="${params.bulletClass}"></${params.bulletElement}>`;
            }
            if (params.type === "fraction") if (params.renderFraction) paginationHTML = params.renderFraction.call(swiper, params.currentClass, params.totalClass); else paginationHTML = `<span class="${params.currentClass}"></span>` + " / " + `<span class="${params.totalClass}"></span>`;
            if (params.type === "progressbar") if (params.renderProgressbar) paginationHTML = params.renderProgressbar.call(swiper, params.progressbarFillClass); else paginationHTML = `<span class="${params.progressbarFillClass}"></span>`;
            swiper.pagination.bullets = [];
            el.forEach((subEl => {
                if (params.type !== "custom") subEl.innerHTML = paginationHTML || "";
                if (params.type === "bullets") swiper.pagination.bullets.push(...subEl.querySelectorAll(classesToSelector(params.bulletClass)));
            }));
            if (params.type !== "custom") emit("paginationRender", el[0]);
        }
        function init() {
            swiper.params.pagination = createElementIfNotDefined(swiper, swiper.originalParams.pagination, swiper.params.pagination, {
                el: "swiper-pagination"
            });
            const params = swiper.params.pagination;
            if (!params.el) return;
            let el;
            if (typeof params.el === "string" && swiper.isElement) el = swiper.el.querySelector(params.el);
            if (!el && typeof params.el === "string") el = [ ...document.querySelectorAll(params.el) ];
            if (!el) el = params.el;
            if (!el || el.length === 0) return;
            if (swiper.params.uniqueNavElements && typeof params.el === "string" && Array.isArray(el) && el.length > 1) {
                el = [ ...swiper.el.querySelectorAll(params.el) ];
                if (el.length > 1) el = el.filter((subEl => {
                    if (elementParents(subEl, ".swiper")[0] !== swiper.el) return false;
                    return true;
                }))[0];
            }
            if (Array.isArray(el) && el.length === 1) el = el[0];
            Object.assign(swiper.pagination, {
                el
            });
            el = makeElementsArray(el);
            el.forEach((subEl => {
                if (params.type === "bullets" && params.clickable) subEl.classList.add(params.clickableClass);
                subEl.classList.add(params.modifierClass + params.type);
                subEl.classList.add(swiper.isHorizontal() ? params.horizontalClass : params.verticalClass);
                if (params.type === "bullets" && params.dynamicBullets) {
                    subEl.classList.add(`${params.modifierClass}${params.type}-dynamic`);
                    dynamicBulletIndex = 0;
                    if (params.dynamicMainBullets < 1) params.dynamicMainBullets = 1;
                }
                if (params.type === "progressbar" && params.progressbarOpposite) subEl.classList.add(params.progressbarOppositeClass);
                if (params.clickable) subEl.addEventListener("click", onBulletClick);
                if (!swiper.enabled) subEl.classList.add(params.lockClass);
            }));
        }
        function destroy() {
            const params = swiper.params.pagination;
            if (isPaginationDisabled()) return;
            let el = swiper.pagination.el;
            if (el) {
                el = makeElementsArray(el);
                el.forEach((subEl => {
                    subEl.classList.remove(params.hiddenClass);
                    subEl.classList.remove(params.modifierClass + params.type);
                    subEl.classList.remove(swiper.isHorizontal() ? params.horizontalClass : params.verticalClass);
                    if (params.clickable) subEl.removeEventListener("click", onBulletClick);
                }));
            }
            if (swiper.pagination.bullets) swiper.pagination.bullets.forEach((subEl => subEl.classList.remove(...params.bulletActiveClass.split(" "))));
        }
        on("changeDirection", (() => {
            if (!swiper.pagination || !swiper.pagination.el) return;
            const params = swiper.params.pagination;
            let {el} = swiper.pagination;
            el = makeElementsArray(el);
            el.forEach((subEl => {
                subEl.classList.remove(params.horizontalClass, params.verticalClass);
                subEl.classList.add(swiper.isHorizontal() ? params.horizontalClass : params.verticalClass);
            }));
        }));
        on("init", (() => {
            if (swiper.params.pagination.enabled === false) disable(); else {
                init();
                render();
                update();
            }
        }));
        on("activeIndexChange", (() => {
            if (typeof swiper.snapIndex === "undefined") update();
        }));
        on("snapIndexChange", (() => {
            update();
        }));
        on("snapGridLengthChange", (() => {
            render();
            update();
        }));
        on("destroy", (() => {
            destroy();
        }));
        on("enable disable", (() => {
            let {el} = swiper.pagination;
            if (el) {
                el = makeElementsArray(el);
                el.forEach((subEl => subEl.classList[swiper.enabled ? "remove" : "add"](swiper.params.pagination.lockClass)));
            }
        }));
        on("lock unlock", (() => {
            update();
        }));
        on("click", ((_s, e) => {
            const targetEl = e.target;
            const el = makeElementsArray(swiper.pagination.el);
            if (swiper.params.pagination.el && swiper.params.pagination.hideOnClick && el && el.length > 0 && !targetEl.classList.contains(swiper.params.pagination.bulletClass)) {
                if (swiper.navigation && (swiper.navigation.nextEl && targetEl === swiper.navigation.nextEl || swiper.navigation.prevEl && targetEl === swiper.navigation.prevEl)) return;
                const isHidden = el[0].classList.contains(swiper.params.pagination.hiddenClass);
                if (isHidden === true) emit("paginationShow"); else emit("paginationHide");
                el.forEach((subEl => subEl.classList.toggle(swiper.params.pagination.hiddenClass)));
            }
        }));
        const enable = () => {
            swiper.el.classList.remove(swiper.params.pagination.paginationDisabledClass);
            let {el} = swiper.pagination;
            if (el) {
                el = makeElementsArray(el);
                el.forEach((subEl => subEl.classList.remove(swiper.params.pagination.paginationDisabledClass)));
            }
            init();
            render();
            update();
        };
        const disable = () => {
            swiper.el.classList.add(swiper.params.pagination.paginationDisabledClass);
            let {el} = swiper.pagination;
            if (el) {
                el = makeElementsArray(el);
                el.forEach((subEl => subEl.classList.add(swiper.params.pagination.paginationDisabledClass)));
            }
            destroy();
        };
        Object.assign(swiper.pagination, {
            enable,
            disable,
            render,
            update,
            init,
            destroy
        });
    }
    function Scrollbar(_ref) {
        let {swiper, extendParams, on, emit} = _ref;
        const document = getDocument();
        let isTouched = false;
        let timeout = null;
        let dragTimeout = null;
        let dragStartPos;
        let dragSize;
        let trackSize;
        let divider;
        extendParams({
            scrollbar: {
                el: null,
                dragSize: "auto",
                hide: false,
                draggable: false,
                snapOnRelease: true,
                lockClass: "swiper-scrollbar-lock",
                dragClass: "swiper-scrollbar-drag",
                scrollbarDisabledClass: "swiper-scrollbar-disabled",
                horizontalClass: `swiper-scrollbar-horizontal`,
                verticalClass: `swiper-scrollbar-vertical`
            }
        });
        swiper.scrollbar = {
            el: null,
            dragEl: null
        };
        function setTranslate() {
            if (!swiper.params.scrollbar.el || !swiper.scrollbar.el) return;
            const {scrollbar, rtlTranslate: rtl} = swiper;
            const {dragEl, el} = scrollbar;
            const params = swiper.params.scrollbar;
            const progress = swiper.params.loop ? swiper.progressLoop : swiper.progress;
            let newSize = dragSize;
            let newPos = (trackSize - dragSize) * progress;
            if (rtl) {
                newPos = -newPos;
                if (newPos > 0) {
                    newSize = dragSize - newPos;
                    newPos = 0;
                } else if (-newPos + dragSize > trackSize) newSize = trackSize + newPos;
            } else if (newPos < 0) {
                newSize = dragSize + newPos;
                newPos = 0;
            } else if (newPos + dragSize > trackSize) newSize = trackSize - newPos;
            if (swiper.isHorizontal()) {
                dragEl.style.transform = `translate3d(${newPos}px, 0, 0)`;
                dragEl.style.width = `${newSize}px`;
            } else {
                dragEl.style.transform = `translate3d(0px, ${newPos}px, 0)`;
                dragEl.style.height = `${newSize}px`;
            }
            if (params.hide) {
                clearTimeout(timeout);
                el.style.opacity = 1;
                timeout = setTimeout((() => {
                    el.style.opacity = 0;
                    el.style.transitionDuration = "400ms";
                }), 1e3);
            }
        }
        function setTransition(duration) {
            if (!swiper.params.scrollbar.el || !swiper.scrollbar.el) return;
            swiper.scrollbar.dragEl.style.transitionDuration = `${duration}ms`;
        }
        function updateSize() {
            if (!swiper.params.scrollbar.el || !swiper.scrollbar.el) return;
            const {scrollbar} = swiper;
            const {dragEl, el} = scrollbar;
            dragEl.style.width = "";
            dragEl.style.height = "";
            trackSize = swiper.isHorizontal() ? el.offsetWidth : el.offsetHeight;
            divider = swiper.size / (swiper.virtualSize + swiper.params.slidesOffsetBefore - (swiper.params.centeredSlides ? swiper.snapGrid[0] : 0));
            if (swiper.params.scrollbar.dragSize === "auto") dragSize = trackSize * divider; else dragSize = parseInt(swiper.params.scrollbar.dragSize, 10);
            if (swiper.isHorizontal()) dragEl.style.width = `${dragSize}px`; else dragEl.style.height = `${dragSize}px`;
            if (divider >= 1) el.style.display = "none"; else el.style.display = "";
            if (swiper.params.scrollbar.hide) el.style.opacity = 0;
            if (swiper.params.watchOverflow && swiper.enabled) scrollbar.el.classList[swiper.isLocked ? "add" : "remove"](swiper.params.scrollbar.lockClass);
        }
        function getPointerPosition(e) {
            return swiper.isHorizontal() ? e.clientX : e.clientY;
        }
        function setDragPosition(e) {
            const {scrollbar, rtlTranslate: rtl} = swiper;
            const {el} = scrollbar;
            let positionRatio;
            positionRatio = (getPointerPosition(e) - elementOffset(el)[swiper.isHorizontal() ? "left" : "top"] - (dragStartPos !== null ? dragStartPos : dragSize / 2)) / (trackSize - dragSize);
            positionRatio = Math.max(Math.min(positionRatio, 1), 0);
            if (rtl) positionRatio = 1 - positionRatio;
            const position = swiper.minTranslate() + (swiper.maxTranslate() - swiper.minTranslate()) * positionRatio;
            swiper.updateProgress(position);
            swiper.setTranslate(position);
            swiper.updateActiveIndex();
            swiper.updateSlidesClasses();
        }
        function onDragStart(e) {
            const params = swiper.params.scrollbar;
            const {scrollbar, wrapperEl} = swiper;
            const {el, dragEl} = scrollbar;
            isTouched = true;
            dragStartPos = e.target === dragEl ? getPointerPosition(e) - e.target.getBoundingClientRect()[swiper.isHorizontal() ? "left" : "top"] : null;
            e.preventDefault();
            e.stopPropagation();
            wrapperEl.style.transitionDuration = "100ms";
            dragEl.style.transitionDuration = "100ms";
            setDragPosition(e);
            clearTimeout(dragTimeout);
            el.style.transitionDuration = "0ms";
            if (params.hide) el.style.opacity = 1;
            if (swiper.params.cssMode) swiper.wrapperEl.style["scroll-snap-type"] = "none";
            emit("scrollbarDragStart", e);
        }
        function onDragMove(e) {
            const {scrollbar, wrapperEl} = swiper;
            const {el, dragEl} = scrollbar;
            if (!isTouched) return;
            if (e.preventDefault) e.preventDefault(); else e.returnValue = false;
            setDragPosition(e);
            wrapperEl.style.transitionDuration = "0ms";
            el.style.transitionDuration = "0ms";
            dragEl.style.transitionDuration = "0ms";
            emit("scrollbarDragMove", e);
        }
        function onDragEnd(e) {
            const params = swiper.params.scrollbar;
            const {scrollbar, wrapperEl} = swiper;
            const {el} = scrollbar;
            if (!isTouched) return;
            isTouched = false;
            if (swiper.params.cssMode) {
                swiper.wrapperEl.style["scroll-snap-type"] = "";
                wrapperEl.style.transitionDuration = "";
            }
            if (params.hide) {
                clearTimeout(dragTimeout);
                dragTimeout = nextTick((() => {
                    el.style.opacity = 0;
                    el.style.transitionDuration = "400ms";
                }), 1e3);
            }
            emit("scrollbarDragEnd", e);
            if (params.snapOnRelease) swiper.slideToClosest();
        }
        function events(method) {
            const {scrollbar, params} = swiper;
            const el = scrollbar.el;
            if (!el) return;
            const target = el;
            const activeListener = params.passiveListeners ? {
                passive: false,
                capture: false
            } : false;
            const passiveListener = params.passiveListeners ? {
                passive: true,
                capture: false
            } : false;
            if (!target) return;
            const eventMethod = method === "on" ? "addEventListener" : "removeEventListener";
            target[eventMethod]("pointerdown", onDragStart, activeListener);
            document[eventMethod]("pointermove", onDragMove, activeListener);
            document[eventMethod]("pointerup", onDragEnd, passiveListener);
        }
        function enableDraggable() {
            if (!swiper.params.scrollbar.el || !swiper.scrollbar.el) return;
            events("on");
        }
        function disableDraggable() {
            if (!swiper.params.scrollbar.el || !swiper.scrollbar.el) return;
            events("off");
        }
        function init() {
            const {scrollbar, el: swiperEl} = swiper;
            swiper.params.scrollbar = createElementIfNotDefined(swiper, swiper.originalParams.scrollbar, swiper.params.scrollbar, {
                el: "swiper-scrollbar"
            });
            const params = swiper.params.scrollbar;
            if (!params.el) return;
            let el;
            if (typeof params.el === "string" && swiper.isElement) el = swiper.el.querySelector(params.el);
            if (!el && typeof params.el === "string") el = document.querySelectorAll(params.el); else if (!el) el = params.el;
            if (swiper.params.uniqueNavElements && typeof params.el === "string" && el.length > 1 && swiperEl.querySelectorAll(params.el).length === 1) el = swiperEl.querySelector(params.el);
            if (el.length > 0) el = el[0];
            el.classList.add(swiper.isHorizontal() ? params.horizontalClass : params.verticalClass);
            let dragEl;
            if (el) {
                dragEl = el.querySelector(`.${swiper.params.scrollbar.dragClass}`);
                if (!dragEl) {
                    dragEl = createElement("div", swiper.params.scrollbar.dragClass);
                    el.append(dragEl);
                }
            }
            Object.assign(scrollbar, {
                el,
                dragEl
            });
            if (params.draggable) enableDraggable();
            if (el) el.classList[swiper.enabled ? "remove" : "add"](swiper.params.scrollbar.lockClass);
        }
        function destroy() {
            const params = swiper.params.scrollbar;
            const el = swiper.scrollbar.el;
            if (el) el.classList.remove(swiper.isHorizontal() ? params.horizontalClass : params.verticalClass);
            disableDraggable();
        }
        on("init", (() => {
            if (swiper.params.scrollbar.enabled === false) disable(); else {
                init();
                updateSize();
                setTranslate();
            }
        }));
        on("update resize observerUpdate lock unlock", (() => {
            updateSize();
        }));
        on("setTranslate", (() => {
            setTranslate();
        }));
        on("setTransition", ((_s, duration) => {
            setTransition(duration);
        }));
        on("enable disable", (() => {
            const {el} = swiper.scrollbar;
            if (el) el.classList[swiper.enabled ? "remove" : "add"](swiper.params.scrollbar.lockClass);
        }));
        on("destroy", (() => {
            destroy();
        }));
        const enable = () => {
            swiper.el.classList.remove(swiper.params.scrollbar.scrollbarDisabledClass);
            if (swiper.scrollbar.el) swiper.scrollbar.el.classList.remove(swiper.params.scrollbar.scrollbarDisabledClass);
            init();
            updateSize();
            setTranslate();
        };
        const disable = () => {
            swiper.el.classList.add(swiper.params.scrollbar.scrollbarDisabledClass);
            if (swiper.scrollbar.el) swiper.scrollbar.el.classList.add(swiper.params.scrollbar.scrollbarDisabledClass);
            destroy();
        };
        Object.assign(swiper.scrollbar, {
            enable,
            disable,
            updateSize,
            setTranslate,
            init,
            destroy
        });
    }
    function Parallax(_ref) {
        let {swiper, extendParams, on} = _ref;
        extendParams({
            parallax: {
                enabled: false
            }
        });
        const setTransform = (el, progress) => {
            const {rtl} = swiper;
            const rtlFactor = rtl ? -1 : 1;
            const p = el.getAttribute("data-swiper-parallax") || "0";
            let x = el.getAttribute("data-swiper-parallax-x");
            let y = el.getAttribute("data-swiper-parallax-y");
            const scale = el.getAttribute("data-swiper-parallax-scale");
            const opacity = el.getAttribute("data-swiper-parallax-opacity");
            const rotate = el.getAttribute("data-swiper-parallax-rotate");
            if (x || y) {
                x = x || "0";
                y = y || "0";
            } else if (swiper.isHorizontal()) {
                x = p;
                y = "0";
            } else {
                y = p;
                x = "0";
            }
            if (x.indexOf("%") >= 0) x = `${parseInt(x, 10) * progress * rtlFactor}%`; else x = `${x * progress * rtlFactor}px`;
            if (y.indexOf("%") >= 0) y = `${parseInt(y, 10) * progress}%`; else y = `${y * progress}px`;
            if (typeof opacity !== "undefined" && opacity !== null) {
                const currentOpacity = opacity - (opacity - 1) * (1 - Math.abs(progress));
                el.style.opacity = currentOpacity;
            }
            let transform = `translate3d(${x}, ${y}, 0px)`;
            if (typeof scale !== "undefined" && scale !== null) {
                const currentScale = scale - (scale - 1) * (1 - Math.abs(progress));
                transform += ` scale(${currentScale})`;
            }
            if (rotate && typeof rotate !== "undefined" && rotate !== null) {
                const currentRotate = rotate * progress * -1;
                transform += ` rotate(${currentRotate}deg)`;
            }
            el.style.transform = transform;
        };
        const setTranslate = () => {
            const {el, slides, progress, snapGrid} = swiper;
            elementChildren(el, "[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]").forEach((subEl => {
                setTransform(subEl, progress);
            }));
            slides.forEach(((slideEl, slideIndex) => {
                let slideProgress = slideEl.progress;
                if (swiper.params.slidesPerGroup > 1 && swiper.params.slidesPerView !== "auto") slideProgress += Math.ceil(slideIndex / 2) - progress * (snapGrid.length - 1);
                slideProgress = Math.min(Math.max(slideProgress, -1), 1);
                slideEl.querySelectorAll("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale], [data-swiper-parallax-rotate]").forEach((subEl => {
                    setTransform(subEl, slideProgress);
                }));
            }));
        };
        const setTransition = function(duration) {
            if (duration === void 0) duration = swiper.params.speed;
            const {el} = swiper;
            el.querySelectorAll("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]").forEach((parallaxEl => {
                let parallaxDuration = parseInt(parallaxEl.getAttribute("data-swiper-parallax-duration"), 10) || duration;
                if (duration === 0) parallaxDuration = 0;
                parallaxEl.style.transitionDuration = `${parallaxDuration}ms`;
            }));
        };
        on("beforeInit", (() => {
            if (!swiper.params.parallax.enabled) return;
            swiper.params.watchSlidesProgress = true;
            swiper.originalParams.watchSlidesProgress = true;
        }));
        on("init", (() => {
            if (!swiper.params.parallax.enabled) return;
            setTranslate();
        }));
        on("setTranslate", (() => {
            if (!swiper.params.parallax.enabled) return;
            setTranslate();
        }));
        on("setTransition", ((_swiper, duration) => {
            if (!swiper.params.parallax.enabled) return;
            setTransition(duration);
        }));
    }
    function Zoom(_ref) {
        let {swiper, extendParams, on, emit} = _ref;
        const window = ssr_window_esm_getWindow();
        extendParams({
            zoom: {
                enabled: false,
                maxRatio: 3,
                minRatio: 1,
                toggle: true,
                containerClass: "swiper-zoom-container",
                zoomedSlideClass: "swiper-slide-zoomed"
            }
        });
        swiper.zoom = {
            enabled: false
        };
        let currentScale = 1;
        let isScaling = false;
        let fakeGestureTouched;
        let fakeGestureMoved;
        const evCache = [];
        const gesture = {
            originX: 0,
            originY: 0,
            slideEl: void 0,
            slideWidth: void 0,
            slideHeight: void 0,
            imageEl: void 0,
            imageWrapEl: void 0,
            maxRatio: 3
        };
        const image = {
            isTouched: void 0,
            isMoved: void 0,
            currentX: void 0,
            currentY: void 0,
            minX: void 0,
            minY: void 0,
            maxX: void 0,
            maxY: void 0,
            width: void 0,
            height: void 0,
            startX: void 0,
            startY: void 0,
            touchesStart: {},
            touchesCurrent: {}
        };
        const velocity = {
            x: void 0,
            y: void 0,
            prevPositionX: void 0,
            prevPositionY: void 0,
            prevTime: void 0
        };
        let scale = 1;
        Object.defineProperty(swiper.zoom, "scale", {
            get() {
                return scale;
            },
            set(value) {
                if (scale !== value) {
                    const imageEl = gesture.imageEl;
                    const slideEl = gesture.slideEl;
                    emit("zoomChange", value, imageEl, slideEl);
                }
                scale = value;
            }
        });
        function getDistanceBetweenTouches() {
            if (evCache.length < 2) return 1;
            const x1 = evCache[0].pageX;
            const y1 = evCache[0].pageY;
            const x2 = evCache[1].pageX;
            const y2 = evCache[1].pageY;
            const distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
            return distance;
        }
        function getScaleOrigin() {
            if (evCache.length < 2) return {
                x: null,
                y: null
            };
            const box = gesture.imageEl.getBoundingClientRect();
            return [ (evCache[0].pageX + (evCache[1].pageX - evCache[0].pageX) / 2 - box.x) / currentScale, (evCache[0].pageY + (evCache[1].pageY - evCache[0].pageY) / 2 - box.y) / currentScale ];
        }
        function getSlideSelector() {
            return swiper.isElement ? `swiper-slide` : `.${swiper.params.slideClass}`;
        }
        function eventWithinSlide(e) {
            const slideSelector = getSlideSelector();
            if (e.target.matches(slideSelector)) return true;
            if (swiper.slides.filter((slideEl => slideEl.contains(e.target))).length > 0) return true;
            return false;
        }
        function eventWithinZoomContainer(e) {
            const selector = `.${swiper.params.zoom.containerClass}`;
            if (e.target.matches(selector)) return true;
            if ([ ...swiper.el.querySelectorAll(selector) ].filter((containerEl => containerEl.contains(e.target))).length > 0) return true;
            return false;
        }
        function onGestureStart(e) {
            if (e.pointerType === "mouse") evCache.splice(0, evCache.length);
            if (!eventWithinSlide(e)) return;
            const params = swiper.params.zoom;
            fakeGestureTouched = false;
            fakeGestureMoved = false;
            evCache.push(e);
            if (evCache.length < 2) return;
            fakeGestureTouched = true;
            gesture.scaleStart = getDistanceBetweenTouches();
            if (!gesture.slideEl) {
                gesture.slideEl = e.target.closest(`.${swiper.params.slideClass}, swiper-slide`);
                if (!gesture.slideEl) gesture.slideEl = swiper.slides[swiper.activeIndex];
                let imageEl = gesture.slideEl.querySelector(`.${params.containerClass}`);
                if (imageEl) imageEl = imageEl.querySelectorAll("picture, img, svg, canvas, .swiper-zoom-target")[0];
                gesture.imageEl = imageEl;
                if (imageEl) gesture.imageWrapEl = elementParents(gesture.imageEl, `.${params.containerClass}`)[0]; else gesture.imageWrapEl = void 0;
                if (!gesture.imageWrapEl) {
                    gesture.imageEl = void 0;
                    return;
                }
                gesture.maxRatio = gesture.imageWrapEl.getAttribute("data-swiper-zoom") || params.maxRatio;
            }
            if (gesture.imageEl) {
                const [originX, originY] = getScaleOrigin();
                gesture.originX = originX;
                gesture.originY = originY;
                gesture.imageEl.style.transitionDuration = "0ms";
            }
            isScaling = true;
        }
        function onGestureChange(e) {
            if (!eventWithinSlide(e)) return;
            const params = swiper.params.zoom;
            const zoom = swiper.zoom;
            const pointerIndex = evCache.findIndex((cachedEv => cachedEv.pointerId === e.pointerId));
            if (pointerIndex >= 0) evCache[pointerIndex] = e;
            if (evCache.length < 2) return;
            fakeGestureMoved = true;
            gesture.scaleMove = getDistanceBetweenTouches();
            if (!gesture.imageEl) return;
            zoom.scale = gesture.scaleMove / gesture.scaleStart * currentScale;
            if (zoom.scale > gesture.maxRatio) zoom.scale = gesture.maxRatio - 1 + (zoom.scale - gesture.maxRatio + 1) ** .5;
            if (zoom.scale < params.minRatio) zoom.scale = params.minRatio + 1 - (params.minRatio - zoom.scale + 1) ** .5;
            gesture.imageEl.style.transform = `translate3d(0,0,0) scale(${zoom.scale})`;
        }
        function onGestureEnd(e) {
            if (!eventWithinSlide(e)) return;
            if (e.pointerType === "mouse" && e.type === "pointerout") return;
            const params = swiper.params.zoom;
            const zoom = swiper.zoom;
            const pointerIndex = evCache.findIndex((cachedEv => cachedEv.pointerId === e.pointerId));
            if (pointerIndex >= 0) evCache.splice(pointerIndex, 1);
            if (!fakeGestureTouched || !fakeGestureMoved) return;
            fakeGestureTouched = false;
            fakeGestureMoved = false;
            if (!gesture.imageEl) return;
            zoom.scale = Math.max(Math.min(zoom.scale, gesture.maxRatio), params.minRatio);
            gesture.imageEl.style.transitionDuration = `${swiper.params.speed}ms`;
            gesture.imageEl.style.transform = `translate3d(0,0,0) scale(${zoom.scale})`;
            currentScale = zoom.scale;
            isScaling = false;
            if (zoom.scale > 1 && gesture.slideEl) gesture.slideEl.classList.add(`${params.zoomedSlideClass}`); else if (zoom.scale <= 1 && gesture.slideEl) gesture.slideEl.classList.remove(`${params.zoomedSlideClass}`);
            if (zoom.scale === 1) {
                gesture.originX = 0;
                gesture.originY = 0;
                gesture.slideEl = void 0;
            }
        }
        function onTouchStart(e) {
            const device = swiper.device;
            if (!gesture.imageEl) return;
            if (image.isTouched) return;
            if (device.android && e.cancelable) e.preventDefault();
            image.isTouched = true;
            const event = evCache.length > 0 ? evCache[0] : e;
            image.touchesStart.x = event.pageX;
            image.touchesStart.y = event.pageY;
        }
        function onTouchMove(e) {
            if (!eventWithinSlide(e) || !eventWithinZoomContainer(e)) return;
            const zoom = swiper.zoom;
            if (!gesture.imageEl) return;
            if (!image.isTouched || !gesture.slideEl) return;
            if (!image.isMoved) {
                image.width = gesture.imageEl.offsetWidth;
                image.height = gesture.imageEl.offsetHeight;
                image.startX = getTranslate(gesture.imageWrapEl, "x") || 0;
                image.startY = getTranslate(gesture.imageWrapEl, "y") || 0;
                gesture.slideWidth = gesture.slideEl.offsetWidth;
                gesture.slideHeight = gesture.slideEl.offsetHeight;
                gesture.imageWrapEl.style.transitionDuration = "0ms";
            }
            const scaledWidth = image.width * zoom.scale;
            const scaledHeight = image.height * zoom.scale;
            if (scaledWidth < gesture.slideWidth && scaledHeight < gesture.slideHeight) return;
            image.minX = Math.min(gesture.slideWidth / 2 - scaledWidth / 2, 0);
            image.maxX = -image.minX;
            image.minY = Math.min(gesture.slideHeight / 2 - scaledHeight / 2, 0);
            image.maxY = -image.minY;
            image.touchesCurrent.x = evCache.length > 0 ? evCache[0].pageX : e.pageX;
            image.touchesCurrent.y = evCache.length > 0 ? evCache[0].pageY : e.pageY;
            const touchesDiff = Math.max(Math.abs(image.touchesCurrent.x - image.touchesStart.x), Math.abs(image.touchesCurrent.y - image.touchesStart.y));
            if (touchesDiff > 5) swiper.allowClick = false;
            if (!image.isMoved && !isScaling) {
                if (swiper.isHorizontal() && (Math.floor(image.minX) === Math.floor(image.startX) && image.touchesCurrent.x < image.touchesStart.x || Math.floor(image.maxX) === Math.floor(image.startX) && image.touchesCurrent.x > image.touchesStart.x)) {
                    image.isTouched = false;
                    return;
                }
                if (!swiper.isHorizontal() && (Math.floor(image.minY) === Math.floor(image.startY) && image.touchesCurrent.y < image.touchesStart.y || Math.floor(image.maxY) === Math.floor(image.startY) && image.touchesCurrent.y > image.touchesStart.y)) {
                    image.isTouched = false;
                    return;
                }
            }
            if (e.cancelable) e.preventDefault();
            e.stopPropagation();
            image.isMoved = true;
            const scaleRatio = (zoom.scale - currentScale) / (gesture.maxRatio - swiper.params.zoom.minRatio);
            const {originX, originY} = gesture;
            image.currentX = image.touchesCurrent.x - image.touchesStart.x + image.startX + scaleRatio * (image.width - originX * 2);
            image.currentY = image.touchesCurrent.y - image.touchesStart.y + image.startY + scaleRatio * (image.height - originY * 2);
            if (image.currentX < image.minX) image.currentX = image.minX + 1 - (image.minX - image.currentX + 1) ** .8;
            if (image.currentX > image.maxX) image.currentX = image.maxX - 1 + (image.currentX - image.maxX + 1) ** .8;
            if (image.currentY < image.minY) image.currentY = image.minY + 1 - (image.minY - image.currentY + 1) ** .8;
            if (image.currentY > image.maxY) image.currentY = image.maxY - 1 + (image.currentY - image.maxY + 1) ** .8;
            if (!velocity.prevPositionX) velocity.prevPositionX = image.touchesCurrent.x;
            if (!velocity.prevPositionY) velocity.prevPositionY = image.touchesCurrent.y;
            if (!velocity.prevTime) velocity.prevTime = Date.now();
            velocity.x = (image.touchesCurrent.x - velocity.prevPositionX) / (Date.now() - velocity.prevTime) / 2;
            velocity.y = (image.touchesCurrent.y - velocity.prevPositionY) / (Date.now() - velocity.prevTime) / 2;
            if (Math.abs(image.touchesCurrent.x - velocity.prevPositionX) < 2) velocity.x = 0;
            if (Math.abs(image.touchesCurrent.y - velocity.prevPositionY) < 2) velocity.y = 0;
            velocity.prevPositionX = image.touchesCurrent.x;
            velocity.prevPositionY = image.touchesCurrent.y;
            velocity.prevTime = Date.now();
            gesture.imageWrapEl.style.transform = `translate3d(${image.currentX}px, ${image.currentY}px,0)`;
        }
        function onTouchEnd() {
            const zoom = swiper.zoom;
            if (!gesture.imageEl) return;
            if (!image.isTouched || !image.isMoved) {
                image.isTouched = false;
                image.isMoved = false;
                return;
            }
            image.isTouched = false;
            image.isMoved = false;
            let momentumDurationX = 300;
            let momentumDurationY = 300;
            const momentumDistanceX = velocity.x * momentumDurationX;
            const newPositionX = image.currentX + momentumDistanceX;
            const momentumDistanceY = velocity.y * momentumDurationY;
            const newPositionY = image.currentY + momentumDistanceY;
            if (velocity.x !== 0) momentumDurationX = Math.abs((newPositionX - image.currentX) / velocity.x);
            if (velocity.y !== 0) momentumDurationY = Math.abs((newPositionY - image.currentY) / velocity.y);
            const momentumDuration = Math.max(momentumDurationX, momentumDurationY);
            image.currentX = newPositionX;
            image.currentY = newPositionY;
            const scaledWidth = image.width * zoom.scale;
            const scaledHeight = image.height * zoom.scale;
            image.minX = Math.min(gesture.slideWidth / 2 - scaledWidth / 2, 0);
            image.maxX = -image.minX;
            image.minY = Math.min(gesture.slideHeight / 2 - scaledHeight / 2, 0);
            image.maxY = -image.minY;
            image.currentX = Math.max(Math.min(image.currentX, image.maxX), image.minX);
            image.currentY = Math.max(Math.min(image.currentY, image.maxY), image.minY);
            gesture.imageWrapEl.style.transitionDuration = `${momentumDuration}ms`;
            gesture.imageWrapEl.style.transform = `translate3d(${image.currentX}px, ${image.currentY}px,0)`;
        }
        function onTransitionEnd() {
            const zoom = swiper.zoom;
            if (gesture.slideEl && swiper.activeIndex !== swiper.slides.indexOf(gesture.slideEl)) {
                if (gesture.imageEl) gesture.imageEl.style.transform = "translate3d(0,0,0) scale(1)";
                if (gesture.imageWrapEl) gesture.imageWrapEl.style.transform = "translate3d(0,0,0)";
                gesture.slideEl.classList.remove(`${swiper.params.zoom.zoomedSlideClass}`);
                zoom.scale = 1;
                currentScale = 1;
                gesture.slideEl = void 0;
                gesture.imageEl = void 0;
                gesture.imageWrapEl = void 0;
                gesture.originX = 0;
                gesture.originY = 0;
            }
        }
        function zoomIn(e) {
            const zoom = swiper.zoom;
            const params = swiper.params.zoom;
            if (!gesture.slideEl) {
                if (e && e.target) gesture.slideEl = e.target.closest(`.${swiper.params.slideClass}, swiper-slide`);
                if (!gesture.slideEl) if (swiper.params.virtual && swiper.params.virtual.enabled && swiper.virtual) gesture.slideEl = elementChildren(swiper.slidesEl, `.${swiper.params.slideActiveClass}`)[0]; else gesture.slideEl = swiper.slides[swiper.activeIndex];
                let imageEl = gesture.slideEl.querySelector(`.${params.containerClass}`);
                if (imageEl) imageEl = imageEl.querySelectorAll("picture, img, svg, canvas, .swiper-zoom-target")[0];
                gesture.imageEl = imageEl;
                if (imageEl) gesture.imageWrapEl = elementParents(gesture.imageEl, `.${params.containerClass}`)[0]; else gesture.imageWrapEl = void 0;
            }
            if (!gesture.imageEl || !gesture.imageWrapEl) return;
            if (swiper.params.cssMode) {
                swiper.wrapperEl.style.overflow = "hidden";
                swiper.wrapperEl.style.touchAction = "none";
            }
            gesture.slideEl.classList.add(`${params.zoomedSlideClass}`);
            let touchX;
            let touchY;
            let offsetX;
            let offsetY;
            let diffX;
            let diffY;
            let translateX;
            let translateY;
            let imageWidth;
            let imageHeight;
            let scaledWidth;
            let scaledHeight;
            let translateMinX;
            let translateMinY;
            let translateMaxX;
            let translateMaxY;
            let slideWidth;
            let slideHeight;
            if (typeof image.touchesStart.x === "undefined" && e) {
                touchX = e.pageX;
                touchY = e.pageY;
            } else {
                touchX = image.touchesStart.x;
                touchY = image.touchesStart.y;
            }
            const forceZoomRatio = typeof e === "number" ? e : null;
            if (currentScale === 1 && forceZoomRatio) {
                touchX = void 0;
                touchY = void 0;
            }
            zoom.scale = forceZoomRatio || gesture.imageWrapEl.getAttribute("data-swiper-zoom") || params.maxRatio;
            currentScale = forceZoomRatio || gesture.imageWrapEl.getAttribute("data-swiper-zoom") || params.maxRatio;
            if (e && !(currentScale === 1 && forceZoomRatio)) {
                slideWidth = gesture.slideEl.offsetWidth;
                slideHeight = gesture.slideEl.offsetHeight;
                offsetX = elementOffset(gesture.slideEl).left + window.scrollX;
                offsetY = elementOffset(gesture.slideEl).top + window.scrollY;
                diffX = offsetX + slideWidth / 2 - touchX;
                diffY = offsetY + slideHeight / 2 - touchY;
                imageWidth = gesture.imageEl.offsetWidth;
                imageHeight = gesture.imageEl.offsetHeight;
                scaledWidth = imageWidth * zoom.scale;
                scaledHeight = imageHeight * zoom.scale;
                translateMinX = Math.min(slideWidth / 2 - scaledWidth / 2, 0);
                translateMinY = Math.min(slideHeight / 2 - scaledHeight / 2, 0);
                translateMaxX = -translateMinX;
                translateMaxY = -translateMinY;
                translateX = diffX * zoom.scale;
                translateY = diffY * zoom.scale;
                if (translateX < translateMinX) translateX = translateMinX;
                if (translateX > translateMaxX) translateX = translateMaxX;
                if (translateY < translateMinY) translateY = translateMinY;
                if (translateY > translateMaxY) translateY = translateMaxY;
            } else {
                translateX = 0;
                translateY = 0;
            }
            if (forceZoomRatio && zoom.scale === 1) {
                gesture.originX = 0;
                gesture.originY = 0;
            }
            gesture.imageWrapEl.style.transitionDuration = "300ms";
            gesture.imageWrapEl.style.transform = `translate3d(${translateX}px, ${translateY}px,0)`;
            gesture.imageEl.style.transitionDuration = "300ms";
            gesture.imageEl.style.transform = `translate3d(0,0,0) scale(${zoom.scale})`;
        }
        function zoomOut() {
            const zoom = swiper.zoom;
            const params = swiper.params.zoom;
            if (!gesture.slideEl) {
                if (swiper.params.virtual && swiper.params.virtual.enabled && swiper.virtual) gesture.slideEl = elementChildren(swiper.slidesEl, `.${swiper.params.slideActiveClass}`)[0]; else gesture.slideEl = swiper.slides[swiper.activeIndex];
                let imageEl = gesture.slideEl.querySelector(`.${params.containerClass}`);
                if (imageEl) imageEl = imageEl.querySelectorAll("picture, img, svg, canvas, .swiper-zoom-target")[0];
                gesture.imageEl = imageEl;
                if (imageEl) gesture.imageWrapEl = elementParents(gesture.imageEl, `.${params.containerClass}`)[0]; else gesture.imageWrapEl = void 0;
            }
            if (!gesture.imageEl || !gesture.imageWrapEl) return;
            if (swiper.params.cssMode) {
                swiper.wrapperEl.style.overflow = "";
                swiper.wrapperEl.style.touchAction = "";
            }
            zoom.scale = 1;
            currentScale = 1;
            gesture.imageWrapEl.style.transitionDuration = "300ms";
            gesture.imageWrapEl.style.transform = "translate3d(0,0,0)";
            gesture.imageEl.style.transitionDuration = "300ms";
            gesture.imageEl.style.transform = "translate3d(0,0,0) scale(1)";
            gesture.slideEl.classList.remove(`${params.zoomedSlideClass}`);
            gesture.slideEl = void 0;
            gesture.originX = 0;
            gesture.originY = 0;
        }
        function zoomToggle(e) {
            const zoom = swiper.zoom;
            if (zoom.scale && zoom.scale !== 1) zoomOut(); else zoomIn(e);
        }
        function getListeners() {
            const passiveListener = swiper.params.passiveListeners ? {
                passive: true,
                capture: false
            } : false;
            const activeListenerWithCapture = swiper.params.passiveListeners ? {
                passive: false,
                capture: true
            } : true;
            return {
                passiveListener,
                activeListenerWithCapture
            };
        }
        function enable() {
            const zoom = swiper.zoom;
            if (zoom.enabled) return;
            zoom.enabled = true;
            const {passiveListener, activeListenerWithCapture} = getListeners();
            swiper.wrapperEl.addEventListener("pointerdown", onGestureStart, passiveListener);
            swiper.wrapperEl.addEventListener("pointermove", onGestureChange, activeListenerWithCapture);
            [ "pointerup", "pointercancel", "pointerout" ].forEach((eventName => {
                swiper.wrapperEl.addEventListener(eventName, onGestureEnd, passiveListener);
            }));
            swiper.wrapperEl.addEventListener("pointermove", onTouchMove, activeListenerWithCapture);
        }
        function disable() {
            const zoom = swiper.zoom;
            if (!zoom.enabled) return;
            zoom.enabled = false;
            const {passiveListener, activeListenerWithCapture} = getListeners();
            swiper.wrapperEl.removeEventListener("pointerdown", onGestureStart, passiveListener);
            swiper.wrapperEl.removeEventListener("pointermove", onGestureChange, activeListenerWithCapture);
            [ "pointerup", "pointercancel", "pointerout" ].forEach((eventName => {
                swiper.wrapperEl.removeEventListener(eventName, onGestureEnd, passiveListener);
            }));
            swiper.wrapperEl.removeEventListener("pointermove", onTouchMove, activeListenerWithCapture);
        }
        on("init", (() => {
            if (swiper.params.zoom.enabled) enable();
        }));
        on("destroy", (() => {
            disable();
        }));
        on("touchStart", ((_s, e) => {
            if (!swiper.zoom.enabled) return;
            onTouchStart(e);
        }));
        on("touchEnd", ((_s, e) => {
            if (!swiper.zoom.enabled) return;
            onTouchEnd();
        }));
        on("doubleTap", ((_s, e) => {
            if (!swiper.animating && swiper.params.zoom.enabled && swiper.zoom.enabled && swiper.params.zoom.toggle) zoomToggle(e);
        }));
        on("transitionEnd", (() => {
            if (swiper.zoom.enabled && swiper.params.zoom.enabled) onTransitionEnd();
        }));
        on("slideChange", (() => {
            if (swiper.zoom.enabled && swiper.params.zoom.enabled && swiper.params.cssMode) onTransitionEnd();
        }));
        Object.assign(swiper.zoom, {
            enable,
            disable,
            in: zoomIn,
            out: zoomOut,
            toggle: zoomToggle
        });
    }
    function Controller(_ref) {
        let {swiper, extendParams, on} = _ref;
        extendParams({
            controller: {
                control: void 0,
                inverse: false,
                by: "slide"
            }
        });
        swiper.controller = {
            control: void 0
        };
        function LinearSpline(x, y) {
            const binarySearch = function search() {
                let maxIndex;
                let minIndex;
                let guess;
                return (array, val) => {
                    minIndex = -1;
                    maxIndex = array.length;
                    while (maxIndex - minIndex > 1) {
                        guess = maxIndex + minIndex >> 1;
                        if (array[guess] <= val) minIndex = guess; else maxIndex = guess;
                    }
                    return maxIndex;
                };
            }();
            this.x = x;
            this.y = y;
            this.lastIndex = x.length - 1;
            let i1;
            let i3;
            this.interpolate = function interpolate(x2) {
                if (!x2) return 0;
                i3 = binarySearch(this.x, x2);
                i1 = i3 - 1;
                return (x2 - this.x[i1]) * (this.y[i3] - this.y[i1]) / (this.x[i3] - this.x[i1]) + this.y[i1];
            };
            return this;
        }
        function getInterpolateFunction(c) {
            swiper.controller.spline = swiper.params.loop ? new LinearSpline(swiper.slidesGrid, c.slidesGrid) : new LinearSpline(swiper.snapGrid, c.snapGrid);
        }
        function setTranslate(_t, byController) {
            const controlled = swiper.controller.control;
            let multiplier;
            let controlledTranslate;
            const Swiper = swiper.constructor;
            function setControlledTranslate(c) {
                if (c.destroyed) return;
                const translate = swiper.rtlTranslate ? -swiper.translate : swiper.translate;
                if (swiper.params.controller.by === "slide") {
                    getInterpolateFunction(c);
                    controlledTranslate = -swiper.controller.spline.interpolate(-translate);
                }
                if (!controlledTranslate || swiper.params.controller.by === "container") {
                    multiplier = (c.maxTranslate() - c.minTranslate()) / (swiper.maxTranslate() - swiper.minTranslate());
                    if (Number.isNaN(multiplier) || !Number.isFinite(multiplier)) multiplier = 1;
                    controlledTranslate = (translate - swiper.minTranslate()) * multiplier + c.minTranslate();
                }
                if (swiper.params.controller.inverse) controlledTranslate = c.maxTranslate() - controlledTranslate;
                c.updateProgress(controlledTranslate);
                c.setTranslate(controlledTranslate, swiper);
                c.updateActiveIndex();
                c.updateSlidesClasses();
            }
            if (Array.isArray(controlled)) {
                for (let i = 0; i < controlled.length; i += 1) if (controlled[i] !== byController && controlled[i] instanceof Swiper) setControlledTranslate(controlled[i]);
            } else if (controlled instanceof Swiper && byController !== controlled) setControlledTranslate(controlled);
        }
        function setTransition(duration, byController) {
            const Swiper = swiper.constructor;
            const controlled = swiper.controller.control;
            let i;
            function setControlledTransition(c) {
                if (c.destroyed) return;
                c.setTransition(duration, swiper);
                if (duration !== 0) {
                    c.transitionStart();
                    if (c.params.autoHeight) nextTick((() => {
                        c.updateAutoHeight();
                    }));
                    elementTransitionEnd(c.wrapperEl, (() => {
                        if (!controlled) return;
                        c.transitionEnd();
                    }));
                }
            }
            if (Array.isArray(controlled)) {
                for (i = 0; i < controlled.length; i += 1) if (controlled[i] !== byController && controlled[i] instanceof Swiper) setControlledTransition(controlled[i]);
            } else if (controlled instanceof Swiper && byController !== controlled) setControlledTransition(controlled);
        }
        function removeSpline() {
            if (!swiper.controller.control) return;
            if (swiper.controller.spline) {
                swiper.controller.spline = void 0;
                delete swiper.controller.spline;
            }
        }
        on("beforeInit", (() => {
            if (typeof window !== "undefined" && (typeof swiper.params.controller.control === "string" || swiper.params.controller.control instanceof HTMLElement)) {
                const controlElement = document.querySelector(swiper.params.controller.control);
                if (controlElement && controlElement.swiper) swiper.controller.control = controlElement.swiper; else if (controlElement) {
                    const onControllerSwiper = e => {
                        swiper.controller.control = e.detail[0];
                        swiper.update();
                        controlElement.removeEventListener("init", onControllerSwiper);
                    };
                    controlElement.addEventListener("init", onControllerSwiper);
                }
                return;
            }
            swiper.controller.control = swiper.params.controller.control;
        }));
        on("update", (() => {
            removeSpline();
        }));
        on("resize", (() => {
            removeSpline();
        }));
        on("observerUpdate", (() => {
            removeSpline();
        }));
        on("setTranslate", ((_s, translate, byController) => {
            if (!swiper.controller.control || swiper.controller.control.destroyed) return;
            swiper.controller.setTranslate(translate, byController);
        }));
        on("setTransition", ((_s, duration, byController) => {
            if (!swiper.controller.control || swiper.controller.control.destroyed) return;
            swiper.controller.setTransition(duration, byController);
        }));
        Object.assign(swiper.controller, {
            setTranslate,
            setTransition
        });
    }
    function A11y(_ref) {
        let {swiper, extendParams, on} = _ref;
        extendParams({
            a11y: {
                enabled: true,
                notificationClass: "swiper-notification",
                prevSlideMessage: "Previous slide",
                nextSlideMessage: "Next slide",
                firstSlideMessage: "This is the first slide",
                lastSlideMessage: "This is the last slide",
                paginationBulletMessage: "Go to slide {{index}}",
                slideLabelMessage: "{{index}} / {{slidesLength}}",
                containerMessage: null,
                containerRoleDescriptionMessage: null,
                itemRoleDescriptionMessage: null,
                slideRole: "group",
                id: null
            }
        });
        swiper.a11y = {
            clicked: false
        };
        let liveRegion = null;
        function notify(message) {
            const notification = liveRegion;
            if (notification.length === 0) return;
            notification.innerHTML = "";
            notification.innerHTML = message;
        }
        const makeElementsArray = el => {
            if (!Array.isArray(el)) el = [ el ].filter((e => !!e));
            return el;
        };
        function getRandomNumber(size) {
            if (size === void 0) size = 16;
            const randomChar = () => Math.round(16 * Math.random()).toString(16);
            return "x".repeat(size).replace(/x/g, randomChar);
        }
        function makeElFocusable(el) {
            el = makeElementsArray(el);
            el.forEach((subEl => {
                subEl.setAttribute("tabIndex", "0");
            }));
        }
        function makeElNotFocusable(el) {
            el = makeElementsArray(el);
            el.forEach((subEl => {
                subEl.setAttribute("tabIndex", "-1");
            }));
        }
        function addElRole(el, role) {
            el = makeElementsArray(el);
            el.forEach((subEl => {
                subEl.setAttribute("role", role);
            }));
        }
        function addElRoleDescription(el, description) {
            el = makeElementsArray(el);
            el.forEach((subEl => {
                subEl.setAttribute("aria-roledescription", description);
            }));
        }
        function addElControls(el, controls) {
            el = makeElementsArray(el);
            el.forEach((subEl => {
                subEl.setAttribute("aria-controls", controls);
            }));
        }
        function addElLabel(el, label) {
            el = makeElementsArray(el);
            el.forEach((subEl => {
                subEl.setAttribute("aria-label", label);
            }));
        }
        function addElId(el, id) {
            el = makeElementsArray(el);
            el.forEach((subEl => {
                subEl.setAttribute("id", id);
            }));
        }
        function addElLive(el, live) {
            el = makeElementsArray(el);
            el.forEach((subEl => {
                subEl.setAttribute("aria-live", live);
            }));
        }
        function disableEl(el) {
            el = makeElementsArray(el);
            el.forEach((subEl => {
                subEl.setAttribute("aria-disabled", true);
            }));
        }
        function enableEl(el) {
            el = makeElementsArray(el);
            el.forEach((subEl => {
                subEl.setAttribute("aria-disabled", false);
            }));
        }
        function onEnterOrSpaceKey(e) {
            if (e.keyCode !== 13 && e.keyCode !== 32) return;
            const params = swiper.params.a11y;
            const targetEl = e.target;
            if (swiper.pagination && swiper.pagination.el && (targetEl === swiper.pagination.el || swiper.pagination.el.contains(e.target))) if (!e.target.matches(classesToSelector(swiper.params.pagination.bulletClass))) return;
            if (swiper.navigation && swiper.navigation.nextEl && targetEl === swiper.navigation.nextEl) {
                if (!(swiper.isEnd && !swiper.params.loop)) swiper.slideNext();
                if (swiper.isEnd) notify(params.lastSlideMessage); else notify(params.nextSlideMessage);
            }
            if (swiper.navigation && swiper.navigation.prevEl && targetEl === swiper.navigation.prevEl) {
                if (!(swiper.isBeginning && !swiper.params.loop)) swiper.slidePrev();
                if (swiper.isBeginning) notify(params.firstSlideMessage); else notify(params.prevSlideMessage);
            }
            if (swiper.pagination && targetEl.matches(classesToSelector(swiper.params.pagination.bulletClass))) targetEl.click();
        }
        function updateNavigation() {
            if (swiper.params.loop || swiper.params.rewind || !swiper.navigation) return;
            const {nextEl, prevEl} = swiper.navigation;
            if (prevEl) if (swiper.isBeginning) {
                disableEl(prevEl);
                makeElNotFocusable(prevEl);
            } else {
                enableEl(prevEl);
                makeElFocusable(prevEl);
            }
            if (nextEl) if (swiper.isEnd) {
                disableEl(nextEl);
                makeElNotFocusable(nextEl);
            } else {
                enableEl(nextEl);
                makeElFocusable(nextEl);
            }
        }
        function hasPagination() {
            return swiper.pagination && swiper.pagination.bullets && swiper.pagination.bullets.length;
        }
        function hasClickablePagination() {
            return hasPagination() && swiper.params.pagination.clickable;
        }
        function updatePagination() {
            const params = swiper.params.a11y;
            if (!hasPagination()) return;
            swiper.pagination.bullets.forEach((bulletEl => {
                if (swiper.params.pagination.clickable) {
                    makeElFocusable(bulletEl);
                    if (!swiper.params.pagination.renderBullet) {
                        addElRole(bulletEl, "button");
                        addElLabel(bulletEl, params.paginationBulletMessage.replace(/\{\{index\}\}/, elementIndex(bulletEl) + 1));
                    }
                }
                if (bulletEl.matches(classesToSelector(swiper.params.pagination.bulletActiveClass))) bulletEl.setAttribute("aria-current", "true"); else bulletEl.removeAttribute("aria-current");
            }));
        }
        const initNavEl = (el, wrapperId, message) => {
            makeElFocusable(el);
            if (el.tagName !== "BUTTON") {
                addElRole(el, "button");
                el.addEventListener("keydown", onEnterOrSpaceKey);
            }
            addElLabel(el, message);
            addElControls(el, wrapperId);
        };
        const handlePointerDown = () => {
            swiper.a11y.clicked = true;
        };
        const handlePointerUp = () => {
            requestAnimationFrame((() => {
                requestAnimationFrame((() => {
                    if (!swiper.destroyed) swiper.a11y.clicked = false;
                }));
            }));
        };
        const handleFocus = e => {
            if (swiper.a11y.clicked) return;
            const slideEl = e.target.closest(`.${swiper.params.slideClass}, swiper-slide`);
            if (!slideEl || !swiper.slides.includes(slideEl)) return;
            const isActive = swiper.slides.indexOf(slideEl) === swiper.activeIndex;
            const isVisible = swiper.params.watchSlidesProgress && swiper.visibleSlides && swiper.visibleSlides.includes(slideEl);
            if (isActive || isVisible) return;
            if (e.sourceCapabilities && e.sourceCapabilities.firesTouchEvents) return;
            if (swiper.isHorizontal()) swiper.el.scrollLeft = 0; else swiper.el.scrollTop = 0;
            swiper.slideTo(swiper.slides.indexOf(slideEl), 0);
        };
        const initSlides = () => {
            const params = swiper.params.a11y;
            if (params.itemRoleDescriptionMessage) addElRoleDescription(swiper.slides, params.itemRoleDescriptionMessage);
            if (params.slideRole) addElRole(swiper.slides, params.slideRole);
            const slidesLength = swiper.slides.length;
            if (params.slideLabelMessage) swiper.slides.forEach(((slideEl, index) => {
                const slideIndex = swiper.params.loop ? parseInt(slideEl.getAttribute("data-swiper-slide-index"), 10) : index;
                const ariaLabelMessage = params.slideLabelMessage.replace(/\{\{index\}\}/, slideIndex + 1).replace(/\{\{slidesLength\}\}/, slidesLength);
                addElLabel(slideEl, ariaLabelMessage);
            }));
        };
        const init = () => {
            const params = swiper.params.a11y;
            swiper.el.append(liveRegion);
            const containerEl = swiper.el;
            if (params.containerRoleDescriptionMessage) addElRoleDescription(containerEl, params.containerRoleDescriptionMessage);
            if (params.containerMessage) addElLabel(containerEl, params.containerMessage);
            const wrapperEl = swiper.wrapperEl;
            const wrapperId = params.id || wrapperEl.getAttribute("id") || `swiper-wrapper-${getRandomNumber(16)}`;
            const live = swiper.params.autoplay && swiper.params.autoplay.enabled ? "off" : "polite";
            addElId(wrapperEl, wrapperId);
            addElLive(wrapperEl, live);
            initSlides();
            let {nextEl, prevEl} = swiper.navigation ? swiper.navigation : {};
            nextEl = makeElementsArray(nextEl);
            prevEl = makeElementsArray(prevEl);
            if (nextEl) nextEl.forEach((el => initNavEl(el, wrapperId, params.nextSlideMessage)));
            if (prevEl) prevEl.forEach((el => initNavEl(el, wrapperId, params.prevSlideMessage)));
            if (hasClickablePagination()) {
                const paginationEl = Array.isArray(swiper.pagination.el) ? swiper.pagination.el : [ swiper.pagination.el ];
                paginationEl.forEach((el => {
                    el.addEventListener("keydown", onEnterOrSpaceKey);
                }));
            }
            swiper.el.addEventListener("focus", handleFocus, true);
            swiper.el.addEventListener("pointerdown", handlePointerDown, true);
            swiper.el.addEventListener("pointerup", handlePointerUp, true);
        };
        function destroy() {
            if (liveRegion) liveRegion.remove();
            let {nextEl, prevEl} = swiper.navigation ? swiper.navigation : {};
            nextEl = makeElementsArray(nextEl);
            prevEl = makeElementsArray(prevEl);
            if (nextEl) nextEl.forEach((el => el.removeEventListener("keydown", onEnterOrSpaceKey)));
            if (prevEl) prevEl.forEach((el => el.removeEventListener("keydown", onEnterOrSpaceKey)));
            if (hasClickablePagination()) {
                const paginationEl = Array.isArray(swiper.pagination.el) ? swiper.pagination.el : [ swiper.pagination.el ];
                paginationEl.forEach((el => {
                    el.removeEventListener("keydown", onEnterOrSpaceKey);
                }));
            }
            swiper.el.removeEventListener("focus", handleFocus, true);
            swiper.el.removeEventListener("pointerdown", handlePointerDown, true);
            swiper.el.removeEventListener("pointerup", handlePointerUp, true);
        }
        on("beforeInit", (() => {
            liveRegion = createElement("span", swiper.params.a11y.notificationClass);
            liveRegion.setAttribute("aria-live", "assertive");
            liveRegion.setAttribute("aria-atomic", "true");
        }));
        on("afterInit", (() => {
            if (!swiper.params.a11y.enabled) return;
            init();
        }));
        on("slidesLengthChange snapGridLengthChange slidesGridLengthChange", (() => {
            if (!swiper.params.a11y.enabled) return;
            initSlides();
        }));
        on("fromEdge toEdge afterInit lock unlock", (() => {
            if (!swiper.params.a11y.enabled) return;
            updateNavigation();
        }));
        on("paginationUpdate", (() => {
            if (!swiper.params.a11y.enabled) return;
            updatePagination();
        }));
        on("destroy", (() => {
            if (!swiper.params.a11y.enabled) return;
            destroy();
        }));
    }
    function History(_ref) {
        let {swiper, extendParams, on} = _ref;
        extendParams({
            history: {
                enabled: false,
                root: "",
                replaceState: false,
                key: "slides",
                keepQuery: false
            }
        });
        let initialized = false;
        let paths = {};
        const slugify = text => text.toString().replace(/\s+/g, "-").replace(/[^\w-]+/g, "").replace(/--+/g, "-").replace(/^-+/, "").replace(/-+$/, "");
        const getPathValues = urlOverride => {
            const window = ssr_window_esm_getWindow();
            let location;
            if (urlOverride) location = new URL(urlOverride); else location = window.location;
            const pathArray = location.pathname.slice(1).split("/").filter((part => part !== ""));
            const total = pathArray.length;
            const key = pathArray[total - 2];
            const value = pathArray[total - 1];
            return {
                key,
                value
            };
        };
        const setHistory = (key, index) => {
            const window = ssr_window_esm_getWindow();
            if (!initialized || !swiper.params.history.enabled) return;
            let location;
            if (swiper.params.url) location = new URL(swiper.params.url); else location = window.location;
            const slide = swiper.slides[index];
            let value = slugify(slide.getAttribute("data-history"));
            if (swiper.params.history.root.length > 0) {
                let root = swiper.params.history.root;
                if (root[root.length - 1] === "/") root = root.slice(0, root.length - 1);
                value = `${root}/${key ? `${key}/` : ""}${value}`;
            } else if (!location.pathname.includes(key)) value = `${key ? `${key}/` : ""}${value}`;
            if (swiper.params.history.keepQuery) value += location.search;
            const currentState = window.history.state;
            if (currentState && currentState.value === value) return;
            if (swiper.params.history.replaceState) window.history.replaceState({
                value
            }, null, value); else window.history.pushState({
                value
            }, null, value);
        };
        const scrollToSlide = (speed, value, runCallbacks) => {
            if (value) for (let i = 0, length = swiper.slides.length; i < length; i += 1) {
                const slide = swiper.slides[i];
                const slideHistory = slugify(slide.getAttribute("data-history"));
                if (slideHistory === value) {
                    const index = swiper.getSlideIndex(slide);
                    swiper.slideTo(index, speed, runCallbacks);
                }
            } else swiper.slideTo(0, speed, runCallbacks);
        };
        const setHistoryPopState = () => {
            paths = getPathValues(swiper.params.url);
            scrollToSlide(swiper.params.speed, paths.value, false);
        };
        const init = () => {
            const window = ssr_window_esm_getWindow();
            if (!swiper.params.history) return;
            if (!window.history || !window.history.pushState) {
                swiper.params.history.enabled = false;
                swiper.params.hashNavigation.enabled = true;
                return;
            }
            initialized = true;
            paths = getPathValues(swiper.params.url);
            if (!paths.key && !paths.value) {
                if (!swiper.params.history.replaceState) window.addEventListener("popstate", setHistoryPopState);
                return;
            }
            scrollToSlide(0, paths.value, swiper.params.runCallbacksOnInit);
            if (!swiper.params.history.replaceState) window.addEventListener("popstate", setHistoryPopState);
        };
        const destroy = () => {
            const window = ssr_window_esm_getWindow();
            if (!swiper.params.history.replaceState) window.removeEventListener("popstate", setHistoryPopState);
        };
        on("init", (() => {
            if (swiper.params.history.enabled) init();
        }));
        on("destroy", (() => {
            if (swiper.params.history.enabled) destroy();
        }));
        on("transitionEnd _freeModeNoMomentumRelease", (() => {
            if (initialized) setHistory(swiper.params.history.key, swiper.activeIndex);
        }));
        on("slideChange", (() => {
            if (initialized && swiper.params.cssMode) setHistory(swiper.params.history.key, swiper.activeIndex);
        }));
    }
    function HashNavigation(_ref) {
        let {swiper, extendParams, emit, on} = _ref;
        let initialized = false;
        const document = getDocument();
        const window = ssr_window_esm_getWindow();
        extendParams({
            hashNavigation: {
                enabled: false,
                replaceState: false,
                watchState: false,
                getSlideIndex(_s, hash) {
                    if (swiper.virtual && swiper.params.virtual.enabled) {
                        const slideWithHash = swiper.slides.filter((slideEl => slideEl.getAttribute("data-hash") === hash))[0];
                        if (!slideWithHash) return 0;
                        const index = parseInt(slideWithHash.getAttribute("data-swiper-slide-index"), 10);
                        return index;
                    }
                    return swiper.getSlideIndex(elementChildren(swiper.slidesEl, `.${swiper.params.slideClass}[data-hash="${hash}"], swiper-slide[data-hash="${hash}"]`)[0]);
                }
            }
        });
        const onHashChange = () => {
            emit("hashChange");
            const newHash = document.location.hash.replace("#", "");
            const activeSlideEl = swiper.virtual && swiper.params.virtual.enabled ? swiper.slidesEl.querySelector(`[data-swiper-slide-index="${swiper.activeIndex}"]`) : swiper.slides[swiper.activeIndex];
            const activeSlideHash = activeSlideEl ? activeSlideEl.getAttribute("data-hash") : "";
            if (newHash !== activeSlideHash) {
                const newIndex = swiper.params.hashNavigation.getSlideIndex(swiper, newHash);
                if (typeof newIndex === "undefined" || Number.isNaN(newIndex)) return;
                swiper.slideTo(newIndex);
            }
        };
        const setHash = () => {
            if (!initialized || !swiper.params.hashNavigation.enabled) return;
            const activeSlideEl = swiper.virtual && swiper.params.virtual.enabled ? swiper.slidesEl.querySelector(`[data-swiper-slide-index="${swiper.activeIndex}"]`) : swiper.slides[swiper.activeIndex];
            const activeSlideHash = activeSlideEl ? activeSlideEl.getAttribute("data-hash") || activeSlideEl.getAttribute("data-history") : "";
            if (swiper.params.hashNavigation.replaceState && window.history && window.history.replaceState) {
                window.history.replaceState(null, null, `#${activeSlideHash}` || "");
                emit("hashSet");
            } else {
                document.location.hash = activeSlideHash || "";
                emit("hashSet");
            }
        };
        const init = () => {
            if (!swiper.params.hashNavigation.enabled || swiper.params.history && swiper.params.history.enabled) return;
            initialized = true;
            const hash = document.location.hash.replace("#", "");
            if (hash) {
                const speed = 0;
                const index = swiper.params.hashNavigation.getSlideIndex(swiper, hash);
                swiper.slideTo(index || 0, speed, swiper.params.runCallbacksOnInit, true);
            }
            if (swiper.params.hashNavigation.watchState) window.addEventListener("hashchange", onHashChange);
        };
        const destroy = () => {
            if (swiper.params.hashNavigation.watchState) window.removeEventListener("hashchange", onHashChange);
        };
        on("init", (() => {
            if (swiper.params.hashNavigation.enabled) init();
        }));
        on("destroy", (() => {
            if (swiper.params.hashNavigation.enabled) destroy();
        }));
        on("transitionEnd _freeModeNoMomentumRelease", (() => {
            if (initialized) setHash();
        }));
        on("slideChange", (() => {
            if (initialized && swiper.params.cssMode) setHash();
        }));
    }
    function Autoplay(_ref) {
        let {swiper, extendParams, on, emit, params} = _ref;
        swiper.autoplay = {
            running: false,
            paused: false,
            timeLeft: 0
        };
        extendParams({
            autoplay: {
                enabled: false,
                delay: 3e3,
                waitForTransition: true,
                disableOnInteraction: true,
                stopOnLastSlide: false,
                reverseDirection: false,
                pauseOnMouseEnter: false
            }
        });
        let timeout;
        let raf;
        let autoplayDelayTotal = params && params.autoplay ? params.autoplay.delay : 3e3;
        let autoplayDelayCurrent = params && params.autoplay ? params.autoplay.delay : 3e3;
        let autoplayTimeLeft;
        let autoplayStartTime = (new Date).getTime;
        let wasPaused;
        let isTouched;
        let pausedByTouch;
        let touchStartTimeout;
        let slideChanged;
        let pausedByInteraction;
        function onTransitionEnd(e) {
            if (!swiper || swiper.destroyed || !swiper.wrapperEl) return;
            if (e.target !== swiper.wrapperEl) return;
            swiper.wrapperEl.removeEventListener("transitionend", onTransitionEnd);
            resume();
        }
        const calcTimeLeft = () => {
            if (swiper.destroyed || !swiper.autoplay.running) return;
            if (swiper.autoplay.paused) wasPaused = true; else if (wasPaused) {
                autoplayDelayCurrent = autoplayTimeLeft;
                wasPaused = false;
            }
            const timeLeft = swiper.autoplay.paused ? autoplayTimeLeft : autoplayStartTime + autoplayDelayCurrent - (new Date).getTime();
            swiper.autoplay.timeLeft = timeLeft;
            emit("autoplayTimeLeft", timeLeft, timeLeft / autoplayDelayTotal);
            raf = requestAnimationFrame((() => {
                calcTimeLeft();
            }));
        };
        const getSlideDelay = () => {
            let activeSlideEl;
            if (swiper.virtual && swiper.params.virtual.enabled) activeSlideEl = swiper.slides.filter((slideEl => slideEl.classList.contains("swiper-slide-active")))[0]; else activeSlideEl = swiper.slides[swiper.activeIndex];
            if (!activeSlideEl) return;
            const currentSlideDelay = parseInt(activeSlideEl.getAttribute("data-swiper-autoplay"), 10);
            return currentSlideDelay;
        };
        const run = delayForce => {
            if (swiper.destroyed || !swiper.autoplay.running) return;
            cancelAnimationFrame(raf);
            calcTimeLeft();
            let delay = typeof delayForce === "undefined" ? swiper.params.autoplay.delay : delayForce;
            autoplayDelayTotal = swiper.params.autoplay.delay;
            autoplayDelayCurrent = swiper.params.autoplay.delay;
            const currentSlideDelay = getSlideDelay();
            if (!Number.isNaN(currentSlideDelay) && currentSlideDelay > 0 && typeof delayForce === "undefined") {
                delay = currentSlideDelay;
                autoplayDelayTotal = currentSlideDelay;
                autoplayDelayCurrent = currentSlideDelay;
            }
            autoplayTimeLeft = delay;
            const speed = swiper.params.speed;
            const proceed = () => {
                if (!swiper || swiper.destroyed) return;
                if (swiper.params.autoplay.reverseDirection) {
                    if (!swiper.isBeginning || swiper.params.loop || swiper.params.rewind) {
                        swiper.slidePrev(speed, true, true);
                        emit("autoplay");
                    } else if (!swiper.params.autoplay.stopOnLastSlide) {
                        swiper.slideTo(swiper.slides.length - 1, speed, true, true);
                        emit("autoplay");
                    }
                } else if (!swiper.isEnd || swiper.params.loop || swiper.params.rewind) {
                    swiper.slideNext(speed, true, true);
                    emit("autoplay");
                } else if (!swiper.params.autoplay.stopOnLastSlide) {
                    swiper.slideTo(0, speed, true, true);
                    emit("autoplay");
                }
                if (swiper.params.cssMode) {
                    autoplayStartTime = (new Date).getTime();
                    requestAnimationFrame((() => {
                        run();
                    }));
                }
            };
            if (delay > 0) {
                clearTimeout(timeout);
                timeout = setTimeout((() => {
                    proceed();
                }), delay);
            } else requestAnimationFrame((() => {
                proceed();
            }));
            return delay;
        };
        const start = () => {
            swiper.autoplay.running = true;
            run();
            emit("autoplayStart");
        };
        const stop = () => {
            swiper.autoplay.running = false;
            clearTimeout(timeout);
            cancelAnimationFrame(raf);
            emit("autoplayStop");
        };
        const pause = (internal, reset) => {
            if (swiper.destroyed || !swiper.autoplay.running) return;
            clearTimeout(timeout);
            if (!internal) pausedByInteraction = true;
            const proceed = () => {
                emit("autoplayPause");
                if (swiper.params.autoplay.waitForTransition) swiper.wrapperEl.addEventListener("transitionend", onTransitionEnd); else resume();
            };
            swiper.autoplay.paused = true;
            if (reset) {
                if (slideChanged) autoplayTimeLeft = swiper.params.autoplay.delay;
                slideChanged = false;
                proceed();
                return;
            }
            const delay = autoplayTimeLeft || swiper.params.autoplay.delay;
            autoplayTimeLeft = delay - ((new Date).getTime() - autoplayStartTime);
            if (swiper.isEnd && autoplayTimeLeft < 0 && !swiper.params.loop) return;
            if (autoplayTimeLeft < 0) autoplayTimeLeft = 0;
            proceed();
        };
        const resume = () => {
            if (swiper.isEnd && autoplayTimeLeft < 0 && !swiper.params.loop || swiper.destroyed || !swiper.autoplay.running) return;
            autoplayStartTime = (new Date).getTime();
            if (pausedByInteraction) {
                pausedByInteraction = false;
                run(autoplayTimeLeft);
            } else run();
            swiper.autoplay.paused = false;
            emit("autoplayResume");
        };
        const onVisibilityChange = () => {
            if (swiper.destroyed || !swiper.autoplay.running) return;
            const document = getDocument();
            if (document.visibilityState === "hidden") {
                pausedByInteraction = true;
                pause(true);
            }
            if (document.visibilityState === "visible") resume();
        };
        const onPointerEnter = e => {
            if (e.pointerType !== "mouse") return;
            pausedByInteraction = true;
            pause(true);
        };
        const onPointerLeave = e => {
            if (e.pointerType !== "mouse") return;
            if (swiper.autoplay.paused) resume();
        };
        const attachMouseEvents = () => {
            if (swiper.params.autoplay.pauseOnMouseEnter) {
                swiper.el.addEventListener("pointerenter", onPointerEnter);
                swiper.el.addEventListener("pointerleave", onPointerLeave);
            }
        };
        const detachMouseEvents = () => {
            swiper.el.removeEventListener("pointerenter", onPointerEnter);
            swiper.el.removeEventListener("pointerleave", onPointerLeave);
        };
        const attachDocumentEvents = () => {
            const document = getDocument();
            document.addEventListener("visibilitychange", onVisibilityChange);
        };
        const detachDocumentEvents = () => {
            const document = getDocument();
            document.removeEventListener("visibilitychange", onVisibilityChange);
        };
        on("init", (() => {
            if (swiper.params.autoplay.enabled) {
                attachMouseEvents();
                attachDocumentEvents();
                autoplayStartTime = (new Date).getTime();
                start();
            }
        }));
        on("destroy", (() => {
            detachMouseEvents();
            detachDocumentEvents();
            if (swiper.autoplay.running) stop();
        }));
        on("beforeTransitionStart", ((_s, speed, internal) => {
            if (swiper.destroyed || !swiper.autoplay.running) return;
            if (internal || !swiper.params.autoplay.disableOnInteraction) pause(true, true); else stop();
        }));
        on("sliderFirstMove", (() => {
            if (swiper.destroyed || !swiper.autoplay.running) return;
            if (swiper.params.autoplay.disableOnInteraction) {
                stop();
                return;
            }
            isTouched = true;
            pausedByTouch = false;
            pausedByInteraction = false;
            touchStartTimeout = setTimeout((() => {
                pausedByInteraction = true;
                pausedByTouch = true;
                pause(true);
            }), 200);
        }));
        on("touchEnd", (() => {
            if (swiper.destroyed || !swiper.autoplay.running || !isTouched) return;
            clearTimeout(touchStartTimeout);
            clearTimeout(timeout);
            if (swiper.params.autoplay.disableOnInteraction) {
                pausedByTouch = false;
                isTouched = false;
                return;
            }
            if (pausedByTouch && swiper.params.cssMode) resume();
            pausedByTouch = false;
            isTouched = false;
        }));
        on("slideChange", (() => {
            if (swiper.destroyed || !swiper.autoplay.running) return;
            slideChanged = true;
        }));
        Object.assign(swiper.autoplay, {
            start,
            stop,
            pause,
            resume
        });
    }
    function Thumb(_ref) {
        let {swiper, extendParams, on} = _ref;
        extendParams({
            thumbs: {
                swiper: null,
                multipleActiveThumbs: true,
                autoScrollOffset: 0,
                slideThumbActiveClass: "swiper-slide-thumb-active",
                thumbsContainerClass: "swiper-thumbs"
            }
        });
        let initialized = false;
        let swiperCreated = false;
        swiper.thumbs = {
            swiper: null
        };
        function onThumbClick() {
            const thumbsSwiper = swiper.thumbs.swiper;
            if (!thumbsSwiper || thumbsSwiper.destroyed) return;
            const clickedIndex = thumbsSwiper.clickedIndex;
            const clickedSlide = thumbsSwiper.clickedSlide;
            if (clickedSlide && clickedSlide.classList.contains(swiper.params.thumbs.slideThumbActiveClass)) return;
            if (typeof clickedIndex === "undefined" || clickedIndex === null) return;
            let slideToIndex;
            if (thumbsSwiper.params.loop) slideToIndex = parseInt(thumbsSwiper.clickedSlide.getAttribute("data-swiper-slide-index"), 10); else slideToIndex = clickedIndex;
            if (swiper.params.loop) swiper.slideToLoop(slideToIndex); else swiper.slideTo(slideToIndex);
        }
        function init() {
            const {thumbs: thumbsParams} = swiper.params;
            if (initialized) return false;
            initialized = true;
            const SwiperClass = swiper.constructor;
            if (thumbsParams.swiper instanceof SwiperClass) {
                swiper.thumbs.swiper = thumbsParams.swiper;
                Object.assign(swiper.thumbs.swiper.originalParams, {
                    watchSlidesProgress: true,
                    slideToClickedSlide: false
                });
                Object.assign(swiper.thumbs.swiper.params, {
                    watchSlidesProgress: true,
                    slideToClickedSlide: false
                });
                swiper.thumbs.swiper.update();
            } else if (utils_isObject(thumbsParams.swiper)) {
                const thumbsSwiperParams = Object.assign({}, thumbsParams.swiper);
                Object.assign(thumbsSwiperParams, {
                    watchSlidesProgress: true,
                    slideToClickedSlide: false
                });
                swiper.thumbs.swiper = new SwiperClass(thumbsSwiperParams);
                swiperCreated = true;
            }
            swiper.thumbs.swiper.el.classList.add(swiper.params.thumbs.thumbsContainerClass);
            swiper.thumbs.swiper.on("tap", onThumbClick);
            return true;
        }
        function update(initial) {
            const thumbsSwiper = swiper.thumbs.swiper;
            if (!thumbsSwiper || thumbsSwiper.destroyed) return;
            const slidesPerView = thumbsSwiper.params.slidesPerView === "auto" ? thumbsSwiper.slidesPerViewDynamic() : thumbsSwiper.params.slidesPerView;
            let thumbsToActivate = 1;
            const thumbActiveClass = swiper.params.thumbs.slideThumbActiveClass;
            if (swiper.params.slidesPerView > 1 && !swiper.params.centeredSlides) thumbsToActivate = swiper.params.slidesPerView;
            if (!swiper.params.thumbs.multipleActiveThumbs) thumbsToActivate = 1;
            thumbsToActivate = Math.floor(thumbsToActivate);
            thumbsSwiper.slides.forEach((slideEl => slideEl.classList.remove(thumbActiveClass)));
            if (thumbsSwiper.params.loop || thumbsSwiper.params.virtual && thumbsSwiper.params.virtual.enabled) for (let i = 0; i < thumbsToActivate; i += 1) elementChildren(thumbsSwiper.slidesEl, `[data-swiper-slide-index="${swiper.realIndex + i}"]`).forEach((slideEl => {
                slideEl.classList.add(thumbActiveClass);
            })); else for (let i = 0; i < thumbsToActivate; i += 1) if (thumbsSwiper.slides[swiper.realIndex + i]) thumbsSwiper.slides[swiper.realIndex + i].classList.add(thumbActiveClass);
            const autoScrollOffset = swiper.params.thumbs.autoScrollOffset;
            const useOffset = autoScrollOffset && !thumbsSwiper.params.loop;
            if (swiper.realIndex !== thumbsSwiper.realIndex || useOffset) {
                const currentThumbsIndex = thumbsSwiper.activeIndex;
                let newThumbsIndex;
                let direction;
                if (thumbsSwiper.params.loop) {
                    const newThumbsSlide = thumbsSwiper.slides.filter((slideEl => slideEl.getAttribute("data-swiper-slide-index") === `${swiper.realIndex}`))[0];
                    newThumbsIndex = thumbsSwiper.slides.indexOf(newThumbsSlide);
                    direction = swiper.activeIndex > swiper.previousIndex ? "next" : "prev";
                } else {
                    newThumbsIndex = swiper.realIndex;
                    direction = newThumbsIndex > swiper.previousIndex ? "next" : "prev";
                }
                if (useOffset) newThumbsIndex += direction === "next" ? autoScrollOffset : -1 * autoScrollOffset;
                if (thumbsSwiper.visibleSlidesIndexes && thumbsSwiper.visibleSlidesIndexes.indexOf(newThumbsIndex) < 0) {
                    if (thumbsSwiper.params.centeredSlides) if (newThumbsIndex > currentThumbsIndex) newThumbsIndex = newThumbsIndex - Math.floor(slidesPerView / 2) + 1; else newThumbsIndex = newThumbsIndex + Math.floor(slidesPerView / 2) - 1; else if (newThumbsIndex > currentThumbsIndex && thumbsSwiper.params.slidesPerGroup === 1) ;
                    thumbsSwiper.slideTo(newThumbsIndex, initial ? 0 : void 0);
                }
            }
        }
        on("beforeInit", (() => {
            const {thumbs} = swiper.params;
            if (!thumbs || !thumbs.swiper) return;
            if (typeof thumbs.swiper === "string" || thumbs.swiper instanceof HTMLElement) {
                const document = getDocument();
                const getThumbsElementAndInit = () => {
                    const thumbsElement = typeof thumbs.swiper === "string" ? document.querySelector(thumbs.swiper) : thumbs.swiper;
                    if (thumbsElement && thumbsElement.swiper) {
                        thumbs.swiper = thumbsElement.swiper;
                        init();
                        update(true);
                    } else if (thumbsElement) {
                        const onThumbsSwiper = e => {
                            thumbs.swiper = e.detail[0];
                            thumbsElement.removeEventListener("init", onThumbsSwiper);
                            init();
                            update(true);
                            thumbs.swiper.update();
                            swiper.update();
                        };
                        thumbsElement.addEventListener("init", onThumbsSwiper);
                    }
                    return thumbsElement;
                };
                const watchForThumbsToAppear = () => {
                    if (swiper.destroyed) return;
                    const thumbsElement = getThumbsElementAndInit();
                    if (!thumbsElement) requestAnimationFrame(watchForThumbsToAppear);
                };
                requestAnimationFrame(watchForThumbsToAppear);
            } else {
                init();
                update(true);
            }
        }));
        on("slideChange update resize observerUpdate", (() => {
            update();
        }));
        on("setTransition", ((_s, duration) => {
            const thumbsSwiper = swiper.thumbs.swiper;
            if (!thumbsSwiper || thumbsSwiper.destroyed) return;
            thumbsSwiper.setTransition(duration);
        }));
        on("beforeDestroy", (() => {
            const thumbsSwiper = swiper.thumbs.swiper;
            if (!thumbsSwiper || thumbsSwiper.destroyed) return;
            if (swiperCreated) thumbsSwiper.destroy();
        }));
        Object.assign(swiper.thumbs, {
            init,
            update
        });
    }
    function freeMode(_ref) {
        let {swiper, extendParams, emit, once} = _ref;
        extendParams({
            freeMode: {
                enabled: false,
                momentum: true,
                momentumRatio: 1,
                momentumBounce: true,
                momentumBounceRatio: 1,
                momentumVelocityRatio: 1,
                sticky: false,
                minimumVelocity: .02
            }
        });
        function onTouchStart() {
            if (swiper.params.cssMode) return;
            const translate = swiper.getTranslate();
            swiper.setTranslate(translate);
            swiper.setTransition(0);
            swiper.touchEventsData.velocities.length = 0;
            swiper.freeMode.onTouchEnd({
                currentPos: swiper.rtl ? swiper.translate : -swiper.translate
            });
        }
        function onTouchMove() {
            if (swiper.params.cssMode) return;
            const {touchEventsData: data, touches} = swiper;
            if (data.velocities.length === 0) data.velocities.push({
                position: touches[swiper.isHorizontal() ? "startX" : "startY"],
                time: data.touchStartTime
            });
            data.velocities.push({
                position: touches[swiper.isHorizontal() ? "currentX" : "currentY"],
                time: now()
            });
        }
        function onTouchEnd(_ref2) {
            let {currentPos} = _ref2;
            if (swiper.params.cssMode) return;
            const {params, wrapperEl, rtlTranslate: rtl, snapGrid, touchEventsData: data} = swiper;
            const touchEndTime = now();
            const timeDiff = touchEndTime - data.touchStartTime;
            if (currentPos < -swiper.minTranslate()) {
                swiper.slideTo(swiper.activeIndex);
                return;
            }
            if (currentPos > -swiper.maxTranslate()) {
                if (swiper.slides.length < snapGrid.length) swiper.slideTo(snapGrid.length - 1); else swiper.slideTo(swiper.slides.length - 1);
                return;
            }
            if (params.freeMode.momentum) {
                if (data.velocities.length > 1) {
                    const lastMoveEvent = data.velocities.pop();
                    const velocityEvent = data.velocities.pop();
                    const distance = lastMoveEvent.position - velocityEvent.position;
                    const time = lastMoveEvent.time - velocityEvent.time;
                    swiper.velocity = distance / time;
                    swiper.velocity /= 2;
                    if (Math.abs(swiper.velocity) < params.freeMode.minimumVelocity) swiper.velocity = 0;
                    if (time > 150 || now() - lastMoveEvent.time > 300) swiper.velocity = 0;
                } else swiper.velocity = 0;
                swiper.velocity *= params.freeMode.momentumVelocityRatio;
                data.velocities.length = 0;
                let momentumDuration = 1e3 * params.freeMode.momentumRatio;
                const momentumDistance = swiper.velocity * momentumDuration;
                let newPosition = swiper.translate + momentumDistance;
                if (rtl) newPosition = -newPosition;
                let doBounce = false;
                let afterBouncePosition;
                const bounceAmount = Math.abs(swiper.velocity) * 20 * params.freeMode.momentumBounceRatio;
                let needsLoopFix;
                if (newPosition < swiper.maxTranslate()) {
                    if (params.freeMode.momentumBounce) {
                        if (newPosition + swiper.maxTranslate() < -bounceAmount) newPosition = swiper.maxTranslate() - bounceAmount;
                        afterBouncePosition = swiper.maxTranslate();
                        doBounce = true;
                        data.allowMomentumBounce = true;
                    } else newPosition = swiper.maxTranslate();
                    if (params.loop && params.centeredSlides) needsLoopFix = true;
                } else if (newPosition > swiper.minTranslate()) {
                    if (params.freeMode.momentumBounce) {
                        if (newPosition - swiper.minTranslate() > bounceAmount) newPosition = swiper.minTranslate() + bounceAmount;
                        afterBouncePosition = swiper.minTranslate();
                        doBounce = true;
                        data.allowMomentumBounce = true;
                    } else newPosition = swiper.minTranslate();
                    if (params.loop && params.centeredSlides) needsLoopFix = true;
                } else if (params.freeMode.sticky) {
                    let nextSlide;
                    for (let j = 0; j < snapGrid.length; j += 1) if (snapGrid[j] > -newPosition) {
                        nextSlide = j;
                        break;
                    }
                    if (Math.abs(snapGrid[nextSlide] - newPosition) < Math.abs(snapGrid[nextSlide - 1] - newPosition) || swiper.swipeDirection === "next") newPosition = snapGrid[nextSlide]; else newPosition = snapGrid[nextSlide - 1];
                    newPosition = -newPosition;
                }
                if (needsLoopFix) once("transitionEnd", (() => {
                    swiper.loopFix();
                }));
                if (swiper.velocity !== 0) {
                    if (rtl) momentumDuration = Math.abs((-newPosition - swiper.translate) / swiper.velocity); else momentumDuration = Math.abs((newPosition - swiper.translate) / swiper.velocity);
                    if (params.freeMode.sticky) {
                        const moveDistance = Math.abs((rtl ? -newPosition : newPosition) - swiper.translate);
                        const currentSlideSize = swiper.slidesSizesGrid[swiper.activeIndex];
                        if (moveDistance < currentSlideSize) momentumDuration = params.speed; else if (moveDistance < 2 * currentSlideSize) momentumDuration = params.speed * 1.5; else momentumDuration = params.speed * 2.5;
                    }
                } else if (params.freeMode.sticky) {
                    swiper.slideToClosest();
                    return;
                }
                if (params.freeMode.momentumBounce && doBounce) {
                    swiper.updateProgress(afterBouncePosition);
                    swiper.setTransition(momentumDuration);
                    swiper.setTranslate(newPosition);
                    swiper.transitionStart(true, swiper.swipeDirection);
                    swiper.animating = true;
                    elementTransitionEnd(wrapperEl, (() => {
                        if (!swiper || swiper.destroyed || !data.allowMomentumBounce) return;
                        emit("momentumBounce");
                        swiper.setTransition(params.speed);
                        setTimeout((() => {
                            swiper.setTranslate(afterBouncePosition);
                            elementTransitionEnd(wrapperEl, (() => {
                                if (!swiper || swiper.destroyed) return;
                                swiper.transitionEnd();
                            }));
                        }), 0);
                    }));
                } else if (swiper.velocity) {
                    emit("_freeModeNoMomentumRelease");
                    swiper.updateProgress(newPosition);
                    swiper.setTransition(momentumDuration);
                    swiper.setTranslate(newPosition);
                    swiper.transitionStart(true, swiper.swipeDirection);
                    if (!swiper.animating) {
                        swiper.animating = true;
                        elementTransitionEnd(wrapperEl, (() => {
                            if (!swiper || swiper.destroyed) return;
                            swiper.transitionEnd();
                        }));
                    }
                } else swiper.updateProgress(newPosition);
                swiper.updateActiveIndex();
                swiper.updateSlidesClasses();
            } else if (params.freeMode.sticky) {
                swiper.slideToClosest();
                return;
            } else if (params.freeMode) emit("_freeModeNoMomentumRelease");
            if (!params.freeMode.momentum || timeDiff >= params.longSwipesMs) {
                swiper.updateProgress();
                swiper.updateActiveIndex();
                swiper.updateSlidesClasses();
            }
        }
        Object.assign(swiper, {
            freeMode: {
                onTouchStart,
                onTouchMove,
                onTouchEnd
            }
        });
    }
    function Grid(_ref) {
        let {swiper, extendParams} = _ref;
        extendParams({
            grid: {
                rows: 1,
                fill: "column"
            }
        });
        let slidesNumberEvenToRows;
        let slidesPerRow;
        let numFullColumns;
        const getSpaceBetween = () => {
            let spaceBetween = swiper.params.spaceBetween;
            if (typeof spaceBetween === "string" && spaceBetween.indexOf("%") >= 0) spaceBetween = parseFloat(spaceBetween.replace("%", "")) / 100 * swiper.size; else if (typeof spaceBetween === "string") spaceBetween = parseFloat(spaceBetween);
            return spaceBetween;
        };
        const initSlides = slidesLength => {
            const {slidesPerView} = swiper.params;
            const {rows, fill} = swiper.params.grid;
            numFullColumns = Math.floor(slidesLength / rows);
            if (Math.floor(slidesLength / rows) === slidesLength / rows) slidesNumberEvenToRows = slidesLength; else slidesNumberEvenToRows = Math.ceil(slidesLength / rows) * rows;
            if (slidesPerView !== "auto" && fill === "row") slidesNumberEvenToRows = Math.max(slidesNumberEvenToRows, slidesPerView * rows);
            slidesPerRow = slidesNumberEvenToRows / rows;
        };
        const updateSlide = (i, slide, slidesLength, getDirectionLabel) => {
            const {slidesPerGroup} = swiper.params;
            const spaceBetween = getSpaceBetween();
            const {rows, fill} = swiper.params.grid;
            let newSlideOrderIndex;
            let column;
            let row;
            if (fill === "row" && slidesPerGroup > 1) {
                const groupIndex = Math.floor(i / (slidesPerGroup * rows));
                const slideIndexInGroup = i - rows * slidesPerGroup * groupIndex;
                const columnsInGroup = groupIndex === 0 ? slidesPerGroup : Math.min(Math.ceil((slidesLength - groupIndex * rows * slidesPerGroup) / rows), slidesPerGroup);
                row = Math.floor(slideIndexInGroup / columnsInGroup);
                column = slideIndexInGroup - row * columnsInGroup + groupIndex * slidesPerGroup;
                newSlideOrderIndex = column + row * slidesNumberEvenToRows / rows;
                slide.style.order = newSlideOrderIndex;
            } else if (fill === "column") {
                column = Math.floor(i / rows);
                row = i - column * rows;
                if (column > numFullColumns || column === numFullColumns && row === rows - 1) {
                    row += 1;
                    if (row >= rows) {
                        row = 0;
                        column += 1;
                    }
                }
            } else {
                row = Math.floor(i / slidesPerRow);
                column = i - row * slidesPerRow;
            }
            slide.row = row;
            slide.column = column;
            slide.style[getDirectionLabel("margin-top")] = row !== 0 ? spaceBetween && `${spaceBetween}px` : "";
        };
        const updateWrapperSize = (slideSize, snapGrid, getDirectionLabel) => {
            const {centeredSlides, roundLengths} = swiper.params;
            const spaceBetween = getSpaceBetween();
            const {rows} = swiper.params.grid;
            swiper.virtualSize = (slideSize + spaceBetween) * slidesNumberEvenToRows;
            swiper.virtualSize = Math.ceil(swiper.virtualSize / rows) - spaceBetween;
            swiper.wrapperEl.style[getDirectionLabel("width")] = `${swiper.virtualSize + spaceBetween}px`;
            if (centeredSlides) {
                const newSlidesGrid = [];
                for (let i = 0; i < snapGrid.length; i += 1) {
                    let slidesGridItem = snapGrid[i];
                    if (roundLengths) slidesGridItem = Math.floor(slidesGridItem);
                    if (snapGrid[i] < swiper.virtualSize + snapGrid[0]) newSlidesGrid.push(slidesGridItem);
                }
                snapGrid.splice(0, snapGrid.length);
                snapGrid.push(...newSlidesGrid);
            }
        };
        swiper.grid = {
            initSlides,
            updateSlide,
            updateWrapperSize
        };
    }
    function appendSlide(slides) {
        const swiper = this;
        const {params, slidesEl} = swiper;
        if (params.loop) swiper.loopDestroy();
        const appendElement = slideEl => {
            if (typeof slideEl === "string") {
                const tempDOM = document.createElement("div");
                tempDOM.innerHTML = slideEl;
                slidesEl.append(tempDOM.children[0]);
                tempDOM.innerHTML = "";
            } else slidesEl.append(slideEl);
        };
        if (typeof slides === "object" && "length" in slides) {
            for (let i = 0; i < slides.length; i += 1) if (slides[i]) appendElement(slides[i]);
        } else appendElement(slides);
        swiper.recalcSlides();
        if (params.loop) swiper.loopCreate();
        if (!params.observer || swiper.isElement) swiper.update();
    }
    function prependSlide(slides) {
        const swiper = this;
        const {params, activeIndex, slidesEl} = swiper;
        if (params.loop) swiper.loopDestroy();
        let newActiveIndex = activeIndex + 1;
        const prependElement = slideEl => {
            if (typeof slideEl === "string") {
                const tempDOM = document.createElement("div");
                tempDOM.innerHTML = slideEl;
                slidesEl.prepend(tempDOM.children[0]);
                tempDOM.innerHTML = "";
            } else slidesEl.prepend(slideEl);
        };
        if (typeof slides === "object" && "length" in slides) {
            for (let i = 0; i < slides.length; i += 1) if (slides[i]) prependElement(slides[i]);
            newActiveIndex = activeIndex + slides.length;
        } else prependElement(slides);
        swiper.recalcSlides();
        if (params.loop) swiper.loopCreate();
        if (!params.observer || swiper.isElement) swiper.update();
        swiper.slideTo(newActiveIndex, 0, false);
    }
    function addSlide(index, slides) {
        const swiper = this;
        const {params, activeIndex, slidesEl} = swiper;
        let activeIndexBuffer = activeIndex;
        if (params.loop) {
            activeIndexBuffer -= swiper.loopedSlides;
            swiper.loopDestroy();
            swiper.recalcSlides();
        }
        const baseLength = swiper.slides.length;
        if (index <= 0) {
            swiper.prependSlide(slides);
            return;
        }
        if (index >= baseLength) {
            swiper.appendSlide(slides);
            return;
        }
        let newActiveIndex = activeIndexBuffer > index ? activeIndexBuffer + 1 : activeIndexBuffer;
        const slidesBuffer = [];
        for (let i = baseLength - 1; i >= index; i -= 1) {
            const currentSlide = swiper.slides[i];
            currentSlide.remove();
            slidesBuffer.unshift(currentSlide);
        }
        if (typeof slides === "object" && "length" in slides) {
            for (let i = 0; i < slides.length; i += 1) if (slides[i]) slidesEl.append(slides[i]);
            newActiveIndex = activeIndexBuffer > index ? activeIndexBuffer + slides.length : activeIndexBuffer;
        } else slidesEl.append(slides);
        for (let i = 0; i < slidesBuffer.length; i += 1) slidesEl.append(slidesBuffer[i]);
        swiper.recalcSlides();
        if (params.loop) swiper.loopCreate();
        if (!params.observer || swiper.isElement) swiper.update();
        if (params.loop) swiper.slideTo(newActiveIndex + swiper.loopedSlides, 0, false); else swiper.slideTo(newActiveIndex, 0, false);
    }
    function removeSlide(slidesIndexes) {
        const swiper = this;
        const {params, activeIndex} = swiper;
        let activeIndexBuffer = activeIndex;
        if (params.loop) {
            activeIndexBuffer -= swiper.loopedSlides;
            swiper.loopDestroy();
        }
        let newActiveIndex = activeIndexBuffer;
        let indexToRemove;
        if (typeof slidesIndexes === "object" && "length" in slidesIndexes) {
            for (let i = 0; i < slidesIndexes.length; i += 1) {
                indexToRemove = slidesIndexes[i];
                if (swiper.slides[indexToRemove]) swiper.slides[indexToRemove].remove();
                if (indexToRemove < newActiveIndex) newActiveIndex -= 1;
            }
            newActiveIndex = Math.max(newActiveIndex, 0);
        } else {
            indexToRemove = slidesIndexes;
            if (swiper.slides[indexToRemove]) swiper.slides[indexToRemove].remove();
            if (indexToRemove < newActiveIndex) newActiveIndex -= 1;
            newActiveIndex = Math.max(newActiveIndex, 0);
        }
        swiper.recalcSlides();
        if (params.loop) swiper.loopCreate();
        if (!params.observer || swiper.isElement) swiper.update();
        if (params.loop) swiper.slideTo(newActiveIndex + swiper.loopedSlides, 0, false); else swiper.slideTo(newActiveIndex, 0, false);
    }
    function removeAllSlides() {
        const swiper = this;
        const slidesIndexes = [];
        for (let i = 0; i < swiper.slides.length; i += 1) slidesIndexes.push(i);
        swiper.removeSlide(slidesIndexes);
    }
    function Manipulation(_ref) {
        let {swiper} = _ref;
        Object.assign(swiper, {
            appendSlide: appendSlide.bind(swiper),
            prependSlide: prependSlide.bind(swiper),
            addSlide: addSlide.bind(swiper),
            removeSlide: removeSlide.bind(swiper),
            removeAllSlides: removeAllSlides.bind(swiper)
        });
    }
    function effectInit(params) {
        const {effect, swiper, on, setTranslate, setTransition, overwriteParams, perspective, recreateShadows, getEffectParams} = params;
        on("beforeInit", (() => {
            if (swiper.params.effect !== effect) return;
            swiper.classNames.push(`${swiper.params.containerModifierClass}${effect}`);
            if (perspective && perspective()) swiper.classNames.push(`${swiper.params.containerModifierClass}3d`);
            const overwriteParamsResult = overwriteParams ? overwriteParams() : {};
            Object.assign(swiper.params, overwriteParamsResult);
            Object.assign(swiper.originalParams, overwriteParamsResult);
        }));
        on("setTranslate", (() => {
            if (swiper.params.effect !== effect) return;
            setTranslate();
        }));
        on("setTransition", ((_s, duration) => {
            if (swiper.params.effect !== effect) return;
            setTransition(duration);
        }));
        on("transitionEnd", (() => {
            if (swiper.params.effect !== effect) return;
            if (recreateShadows) {
                if (!getEffectParams || !getEffectParams().slideShadows) return;
                swiper.slides.forEach((slideEl => {
                    slideEl.querySelectorAll(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").forEach((shadowEl => shadowEl.remove()));
                }));
                recreateShadows();
            }
        }));
        let requireUpdateOnVirtual;
        on("virtualUpdate", (() => {
            if (swiper.params.effect !== effect) return;
            if (!swiper.slides.length) requireUpdateOnVirtual = true;
            requestAnimationFrame((() => {
                if (requireUpdateOnVirtual && swiper.slides && swiper.slides.length) {
                    setTranslate();
                    requireUpdateOnVirtual = false;
                }
            }));
        }));
    }
    function effectTarget(effectParams, slideEl) {
        const transformEl = getSlideTransformEl(slideEl);
        if (transformEl !== slideEl) {
            transformEl.style.backfaceVisibility = "hidden";
            transformEl.style["-webkit-backface-visibility"] = "hidden";
        }
        return transformEl;
    }
    function effectVirtualTransitionEnd(_ref) {
        let {swiper, duration, transformElements, allSlides} = _ref;
        const {activeIndex} = swiper;
        const getSlide = el => {
            if (!el.parentElement) {
                const slide = swiper.slides.filter((slideEl => slideEl.shadowRoot && slideEl.shadowRoot === el.parentNode))[0];
                return slide;
            }
            return el.parentElement;
        };
        if (swiper.params.virtualTranslate && duration !== 0) {
            let eventTriggered = false;
            let transitionEndTarget;
            if (allSlides) transitionEndTarget = transformElements; else transitionEndTarget = transformElements.filter((transformEl => {
                const el = transformEl.classList.contains("swiper-slide-transform") ? getSlide(transformEl) : transformEl;
                return swiper.getSlideIndex(el) === activeIndex;
            }));
            transitionEndTarget.forEach((el => {
                elementTransitionEnd(el, (() => {
                    if (eventTriggered) return;
                    if (!swiper || swiper.destroyed) return;
                    eventTriggered = true;
                    swiper.animating = false;
                    const evt = new window.CustomEvent("transitionend", {
                        bubbles: true,
                        cancelable: true
                    });
                    swiper.wrapperEl.dispatchEvent(evt);
                }));
            }));
        }
    }
    function EffectFade(_ref) {
        let {swiper, extendParams, on} = _ref;
        extendParams({
            fadeEffect: {
                crossFade: false
            }
        });
        const setTranslate = () => {
            const {slides} = swiper;
            const params = swiper.params.fadeEffect;
            for (let i = 0; i < slides.length; i += 1) {
                const slideEl = swiper.slides[i];
                const offset = slideEl.swiperSlideOffset;
                let tx = -offset;
                if (!swiper.params.virtualTranslate) tx -= swiper.translate;
                let ty = 0;
                if (!swiper.isHorizontal()) {
                    ty = tx;
                    tx = 0;
                }
                const slideOpacity = swiper.params.fadeEffect.crossFade ? Math.max(1 - Math.abs(slideEl.progress), 0) : 1 + Math.min(Math.max(slideEl.progress, -1), 0);
                const targetEl = effectTarget(params, slideEl);
                targetEl.style.opacity = slideOpacity;
                targetEl.style.transform = `translate3d(${tx}px, ${ty}px, 0px)`;
            }
        };
        const setTransition = duration => {
            const transformElements = swiper.slides.map((slideEl => getSlideTransformEl(slideEl)));
            transformElements.forEach((el => {
                el.style.transitionDuration = `${duration}ms`;
            }));
            effectVirtualTransitionEnd({
                swiper,
                duration,
                transformElements,
                allSlides: true
            });
        };
        effectInit({
            effect: "fade",
            swiper,
            on,
            setTranslate,
            setTransition,
            overwriteParams: () => ({
                slidesPerView: 1,
                slidesPerGroup: 1,
                watchSlidesProgress: true,
                spaceBetween: 0,
                virtualTranslate: !swiper.params.cssMode
            })
        });
    }
    function EffectCube(_ref) {
        let {swiper, extendParams, on} = _ref;
        extendParams({
            cubeEffect: {
                slideShadows: true,
                shadow: true,
                shadowOffset: 20,
                shadowScale: .94
            }
        });
        const createSlideShadows = (slideEl, progress, isHorizontal) => {
            let shadowBefore = isHorizontal ? slideEl.querySelector(".swiper-slide-shadow-left") : slideEl.querySelector(".swiper-slide-shadow-top");
            let shadowAfter = isHorizontal ? slideEl.querySelector(".swiper-slide-shadow-right") : slideEl.querySelector(".swiper-slide-shadow-bottom");
            if (!shadowBefore) {
                shadowBefore = createElement("div", `swiper-slide-shadow-cube swiper-slide-shadow-${isHorizontal ? "left" : "top"}`.split(" "));
                slideEl.append(shadowBefore);
            }
            if (!shadowAfter) {
                shadowAfter = createElement("div", `swiper-slide-shadow-cube swiper-slide-shadow-${isHorizontal ? "right" : "bottom"}`.split(" "));
                slideEl.append(shadowAfter);
            }
            if (shadowBefore) shadowBefore.style.opacity = Math.max(-progress, 0);
            if (shadowAfter) shadowAfter.style.opacity = Math.max(progress, 0);
        };
        const recreateShadows = () => {
            const isHorizontal = swiper.isHorizontal();
            swiper.slides.forEach((slideEl => {
                const progress = Math.max(Math.min(slideEl.progress, 1), -1);
                createSlideShadows(slideEl, progress, isHorizontal);
            }));
        };
        const setTranslate = () => {
            const {el, wrapperEl, slides, width: swiperWidth, height: swiperHeight, rtlTranslate: rtl, size: swiperSize, browser} = swiper;
            const params = swiper.params.cubeEffect;
            const isHorizontal = swiper.isHorizontal();
            const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
            let wrapperRotate = 0;
            let cubeShadowEl;
            if (params.shadow) if (isHorizontal) {
                cubeShadowEl = swiper.wrapperEl.querySelector(".swiper-cube-shadow");
                if (!cubeShadowEl) {
                    cubeShadowEl = createElement("div", "swiper-cube-shadow");
                    swiper.wrapperEl.append(cubeShadowEl);
                }
                cubeShadowEl.style.height = `${swiperWidth}px`;
            } else {
                cubeShadowEl = el.querySelector(".swiper-cube-shadow");
                if (!cubeShadowEl) {
                    cubeShadowEl = createElement("div", "swiper-cube-shadow");
                    el.append(cubeShadowEl);
                }
            }
            for (let i = 0; i < slides.length; i += 1) {
                const slideEl = slides[i];
                let slideIndex = i;
                if (isVirtual) slideIndex = parseInt(slideEl.getAttribute("data-swiper-slide-index"), 10);
                let slideAngle = slideIndex * 90;
                let round = Math.floor(slideAngle / 360);
                if (rtl) {
                    slideAngle = -slideAngle;
                    round = Math.floor(-slideAngle / 360);
                }
                const progress = Math.max(Math.min(slideEl.progress, 1), -1);
                let tx = 0;
                let ty = 0;
                let tz = 0;
                if (slideIndex % 4 === 0) {
                    tx = -round * 4 * swiperSize;
                    tz = 0;
                } else if ((slideIndex - 1) % 4 === 0) {
                    tx = 0;
                    tz = -round * 4 * swiperSize;
                } else if ((slideIndex - 2) % 4 === 0) {
                    tx = swiperSize + round * 4 * swiperSize;
                    tz = swiperSize;
                } else if ((slideIndex - 3) % 4 === 0) {
                    tx = -swiperSize;
                    tz = 3 * swiperSize + swiperSize * 4 * round;
                }
                if (rtl) tx = -tx;
                if (!isHorizontal) {
                    ty = tx;
                    tx = 0;
                }
                const transform = `rotateX(${isHorizontal ? 0 : -slideAngle}deg) rotateY(${isHorizontal ? slideAngle : 0}deg) translate3d(${tx}px, ${ty}px, ${tz}px)`;
                if (progress <= 1 && progress > -1) {
                    wrapperRotate = slideIndex * 90 + progress * 90;
                    if (rtl) wrapperRotate = -slideIndex * 90 - progress * 90;
                }
                slideEl.style.transform = transform;
                if (params.slideShadows) createSlideShadows(slideEl, progress, isHorizontal);
            }
            wrapperEl.style.transformOrigin = `50% 50% -${swiperSize / 2}px`;
            wrapperEl.style["-webkit-transform-origin"] = `50% 50% -${swiperSize / 2}px`;
            if (params.shadow) if (isHorizontal) cubeShadowEl.style.transform = `translate3d(0px, ${swiperWidth / 2 + params.shadowOffset}px, ${-swiperWidth / 2}px) rotateX(90deg) rotateZ(0deg) scale(${params.shadowScale})`; else {
                const shadowAngle = Math.abs(wrapperRotate) - Math.floor(Math.abs(wrapperRotate) / 90) * 90;
                const multiplier = 1.5 - (Math.sin(shadowAngle * 2 * Math.PI / 360) / 2 + Math.cos(shadowAngle * 2 * Math.PI / 360) / 2);
                const scale1 = params.shadowScale;
                const scale2 = params.shadowScale / multiplier;
                const offset = params.shadowOffset;
                cubeShadowEl.style.transform = `scale3d(${scale1}, 1, ${scale2}) translate3d(0px, ${swiperHeight / 2 + offset}px, ${-swiperHeight / 2 / scale2}px) rotateX(-90deg)`;
            }
            const zFactor = (browser.isSafari || browser.isWebView) && browser.needPerspectiveFix ? -swiperSize / 2 : 0;
            wrapperEl.style.transform = `translate3d(0px,0,${zFactor}px) rotateX(${swiper.isHorizontal() ? 0 : wrapperRotate}deg) rotateY(${swiper.isHorizontal() ? -wrapperRotate : 0}deg)`;
            wrapperEl.style.setProperty("--swiper-cube-translate-z", `${zFactor}px`);
        };
        const setTransition = duration => {
            const {el, slides} = swiper;
            slides.forEach((slideEl => {
                slideEl.style.transitionDuration = `${duration}ms`;
                slideEl.querySelectorAll(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").forEach((subEl => {
                    subEl.style.transitionDuration = `${duration}ms`;
                }));
            }));
            if (swiper.params.cubeEffect.shadow && !swiper.isHorizontal()) {
                const shadowEl = el.querySelector(".swiper-cube-shadow");
                if (shadowEl) shadowEl.style.transitionDuration = `${duration}ms`;
            }
        };
        effectInit({
            effect: "cube",
            swiper,
            on,
            setTranslate,
            setTransition,
            recreateShadows,
            getEffectParams: () => swiper.params.cubeEffect,
            perspective: () => true,
            overwriteParams: () => ({
                slidesPerView: 1,
                slidesPerGroup: 1,
                watchSlidesProgress: true,
                resistanceRatio: 0,
                spaceBetween: 0,
                centeredSlides: false,
                virtualTranslate: true
            })
        });
    }
    function createShadow(suffix, slideEl, side) {
        const shadowClass = `swiper-slide-shadow${side ? `-${side}` : ""}${suffix ? ` swiper-slide-shadow-${suffix}` : ""}`;
        const shadowContainer = getSlideTransformEl(slideEl);
        let shadowEl = shadowContainer.querySelector(`.${shadowClass.split(" ").join(".")}`);
        if (!shadowEl) {
            shadowEl = createElement("div", shadowClass.split(" "));
            shadowContainer.append(shadowEl);
        }
        return shadowEl;
    }
    function EffectFlip(_ref) {
        let {swiper, extendParams, on} = _ref;
        extendParams({
            flipEffect: {
                slideShadows: true,
                limitRotation: true
            }
        });
        const createSlideShadows = (slideEl, progress) => {
            let shadowBefore = swiper.isHorizontal() ? slideEl.querySelector(".swiper-slide-shadow-left") : slideEl.querySelector(".swiper-slide-shadow-top");
            let shadowAfter = swiper.isHorizontal() ? slideEl.querySelector(".swiper-slide-shadow-right") : slideEl.querySelector(".swiper-slide-shadow-bottom");
            if (!shadowBefore) shadowBefore = createShadow("flip", slideEl, swiper.isHorizontal() ? "left" : "top");
            if (!shadowAfter) shadowAfter = createShadow("flip", slideEl, swiper.isHorizontal() ? "right" : "bottom");
            if (shadowBefore) shadowBefore.style.opacity = Math.max(-progress, 0);
            if (shadowAfter) shadowAfter.style.opacity = Math.max(progress, 0);
        };
        const recreateShadows = () => {
            swiper.params.flipEffect;
            swiper.slides.forEach((slideEl => {
                let progress = slideEl.progress;
                if (swiper.params.flipEffect.limitRotation) progress = Math.max(Math.min(slideEl.progress, 1), -1);
                createSlideShadows(slideEl, progress);
            }));
        };
        const setTranslate = () => {
            const {slides, rtlTranslate: rtl} = swiper;
            const params = swiper.params.flipEffect;
            for (let i = 0; i < slides.length; i += 1) {
                const slideEl = slides[i];
                let progress = slideEl.progress;
                if (swiper.params.flipEffect.limitRotation) progress = Math.max(Math.min(slideEl.progress, 1), -1);
                const offset = slideEl.swiperSlideOffset;
                const rotate = -180 * progress;
                let rotateY = rotate;
                let rotateX = 0;
                let tx = swiper.params.cssMode ? -offset - swiper.translate : -offset;
                let ty = 0;
                if (!swiper.isHorizontal()) {
                    ty = tx;
                    tx = 0;
                    rotateX = -rotateY;
                    rotateY = 0;
                } else if (rtl) rotateY = -rotateY;
                slideEl.style.zIndex = -Math.abs(Math.round(progress)) + slides.length;
                if (params.slideShadows) createSlideShadows(slideEl, progress);
                const transform = `translate3d(${tx}px, ${ty}px, 0px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
                const targetEl = effectTarget(params, slideEl);
                targetEl.style.transform = transform;
            }
        };
        const setTransition = duration => {
            const transformElements = swiper.slides.map((slideEl => getSlideTransformEl(slideEl)));
            transformElements.forEach((el => {
                el.style.transitionDuration = `${duration}ms`;
                el.querySelectorAll(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").forEach((shadowEl => {
                    shadowEl.style.transitionDuration = `${duration}ms`;
                }));
            }));
            effectVirtualTransitionEnd({
                swiper,
                duration,
                transformElements
            });
        };
        effectInit({
            effect: "flip",
            swiper,
            on,
            setTranslate,
            setTransition,
            recreateShadows,
            getEffectParams: () => swiper.params.flipEffect,
            perspective: () => true,
            overwriteParams: () => ({
                slidesPerView: 1,
                slidesPerGroup: 1,
                watchSlidesProgress: true,
                spaceBetween: 0,
                virtualTranslate: !swiper.params.cssMode
            })
        });
    }
    function EffectCoverflow(_ref) {
        let {swiper, extendParams, on} = _ref;
        extendParams({
            coverflowEffect: {
                rotate: 50,
                stretch: 0,
                depth: 100,
                scale: 1,
                modifier: 1,
                slideShadows: true
            }
        });
        const setTranslate = () => {
            const {width: swiperWidth, height: swiperHeight, slides, slidesSizesGrid} = swiper;
            const params = swiper.params.coverflowEffect;
            const isHorizontal = swiper.isHorizontal();
            const transform = swiper.translate;
            const center = isHorizontal ? -transform + swiperWidth / 2 : -transform + swiperHeight / 2;
            const rotate = isHorizontal ? params.rotate : -params.rotate;
            const translate = params.depth;
            for (let i = 0, length = slides.length; i < length; i += 1) {
                const slideEl = slides[i];
                const slideSize = slidesSizesGrid[i];
                const slideOffset = slideEl.swiperSlideOffset;
                const centerOffset = (center - slideOffset - slideSize / 2) / slideSize;
                const offsetMultiplier = typeof params.modifier === "function" ? params.modifier(centerOffset) : centerOffset * params.modifier;
                let rotateY = isHorizontal ? rotate * offsetMultiplier : 0;
                let rotateX = isHorizontal ? 0 : rotate * offsetMultiplier;
                let translateZ = -translate * Math.abs(offsetMultiplier);
                let stretch = params.stretch;
                if (typeof stretch === "string" && stretch.indexOf("%") !== -1) stretch = parseFloat(params.stretch) / 100 * slideSize;
                let translateY = isHorizontal ? 0 : stretch * offsetMultiplier;
                let translateX = isHorizontal ? stretch * offsetMultiplier : 0;
                let scale = 1 - (1 - params.scale) * Math.abs(offsetMultiplier);
                if (Math.abs(translateX) < .001) translateX = 0;
                if (Math.abs(translateY) < .001) translateY = 0;
                if (Math.abs(translateZ) < .001) translateZ = 0;
                if (Math.abs(rotateY) < .001) rotateY = 0;
                if (Math.abs(rotateX) < .001) rotateX = 0;
                if (Math.abs(scale) < .001) scale = 0;
                const slideTransform = `translate3d(${translateX}px,${translateY}px,${translateZ}px)  rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`;
                const targetEl = effectTarget(params, slideEl);
                targetEl.style.transform = slideTransform;
                slideEl.style.zIndex = -Math.abs(Math.round(offsetMultiplier)) + 1;
                if (params.slideShadows) {
                    let shadowBeforeEl = isHorizontal ? slideEl.querySelector(".swiper-slide-shadow-left") : slideEl.querySelector(".swiper-slide-shadow-top");
                    let shadowAfterEl = isHorizontal ? slideEl.querySelector(".swiper-slide-shadow-right") : slideEl.querySelector(".swiper-slide-shadow-bottom");
                    if (!shadowBeforeEl) shadowBeforeEl = createShadow("coverflow", slideEl, isHorizontal ? "left" : "top");
                    if (!shadowAfterEl) shadowAfterEl = createShadow("coverflow", slideEl, isHorizontal ? "right" : "bottom");
                    if (shadowBeforeEl) shadowBeforeEl.style.opacity = offsetMultiplier > 0 ? offsetMultiplier : 0;
                    if (shadowAfterEl) shadowAfterEl.style.opacity = -offsetMultiplier > 0 ? -offsetMultiplier : 0;
                }
            }
        };
        const setTransition = duration => {
            const transformElements = swiper.slides.map((slideEl => getSlideTransformEl(slideEl)));
            transformElements.forEach((el => {
                el.style.transitionDuration = `${duration}ms`;
                el.querySelectorAll(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").forEach((shadowEl => {
                    shadowEl.style.transitionDuration = `${duration}ms`;
                }));
            }));
        };
        effectInit({
            effect: "coverflow",
            swiper,
            on,
            setTranslate,
            setTransition,
            perspective: () => true,
            overwriteParams: () => ({
                watchSlidesProgress: true
            })
        });
    }
    function EffectCreative(_ref) {
        let {swiper, extendParams, on} = _ref;
        extendParams({
            creativeEffect: {
                limitProgress: 1,
                shadowPerProgress: false,
                progressMultiplier: 1,
                perspective: true,
                prev: {
                    translate: [ 0, 0, 0 ],
                    rotate: [ 0, 0, 0 ],
                    opacity: 1,
                    scale: 1
                },
                next: {
                    translate: [ 0, 0, 0 ],
                    rotate: [ 0, 0, 0 ],
                    opacity: 1,
                    scale: 1
                }
            }
        });
        const getTranslateValue = value => {
            if (typeof value === "string") return value;
            return `${value}px`;
        };
        const setTranslate = () => {
            const {slides, wrapperEl, slidesSizesGrid} = swiper;
            const params = swiper.params.creativeEffect;
            const {progressMultiplier: multiplier} = params;
            const isCenteredSlides = swiper.params.centeredSlides;
            if (isCenteredSlides) {
                const margin = slidesSizesGrid[0] / 2 - swiper.params.slidesOffsetBefore || 0;
                wrapperEl.style.transform = `translateX(calc(50% - ${margin}px))`;
            }
            for (let i = 0; i < slides.length; i += 1) {
                const slideEl = slides[i];
                const slideProgress = slideEl.progress;
                const progress = Math.min(Math.max(slideEl.progress, -params.limitProgress), params.limitProgress);
                let originalProgress = progress;
                if (!isCenteredSlides) originalProgress = Math.min(Math.max(slideEl.originalProgress, -params.limitProgress), params.limitProgress);
                const offset = slideEl.swiperSlideOffset;
                const t = [ swiper.params.cssMode ? -offset - swiper.translate : -offset, 0, 0 ];
                const r = [ 0, 0, 0 ];
                let custom = false;
                if (!swiper.isHorizontal()) {
                    t[1] = t[0];
                    t[0] = 0;
                }
                let data = {
                    translate: [ 0, 0, 0 ],
                    rotate: [ 0, 0, 0 ],
                    scale: 1,
                    opacity: 1
                };
                if (progress < 0) {
                    data = params.next;
                    custom = true;
                } else if (progress > 0) {
                    data = params.prev;
                    custom = true;
                }
                t.forEach(((value, index) => {
                    t[index] = `calc(${value}px + (${getTranslateValue(data.translate[index])} * ${Math.abs(progress * multiplier)}))`;
                }));
                r.forEach(((value, index) => {
                    r[index] = data.rotate[index] * Math.abs(progress * multiplier);
                }));
                slideEl.style.zIndex = -Math.abs(Math.round(slideProgress)) + slides.length;
                const translateString = t.join(", ");
                const rotateString = `rotateX(${r[0]}deg) rotateY(${r[1]}deg) rotateZ(${r[2]}deg)`;
                const scaleString = originalProgress < 0 ? `scale(${1 + (1 - data.scale) * originalProgress * multiplier})` : `scale(${1 - (1 - data.scale) * originalProgress * multiplier})`;
                const opacityString = originalProgress < 0 ? 1 + (1 - data.opacity) * originalProgress * multiplier : 1 - (1 - data.opacity) * originalProgress * multiplier;
                const transform = `translate3d(${translateString}) ${rotateString} ${scaleString}`;
                if (custom && data.shadow || !custom) {
                    let shadowEl = slideEl.querySelector(".swiper-slide-shadow");
                    if (!shadowEl && data.shadow) shadowEl = createShadow("creative", slideEl);
                    if (shadowEl) {
                        const shadowOpacity = params.shadowPerProgress ? progress * (1 / params.limitProgress) : progress;
                        shadowEl.style.opacity = Math.min(Math.max(Math.abs(shadowOpacity), 0), 1);
                    }
                }
                const targetEl = effectTarget(params, slideEl);
                targetEl.style.transform = transform;
                targetEl.style.opacity = opacityString;
                if (data.origin) targetEl.style.transformOrigin = data.origin;
            }
        };
        const setTransition = duration => {
            const transformElements = swiper.slides.map((slideEl => getSlideTransformEl(slideEl)));
            transformElements.forEach((el => {
                el.style.transitionDuration = `${duration}ms`;
                el.querySelectorAll(".swiper-slide-shadow").forEach((shadowEl => {
                    shadowEl.style.transitionDuration = `${duration}ms`;
                }));
            }));
            effectVirtualTransitionEnd({
                swiper,
                duration,
                transformElements,
                allSlides: true
            });
        };
        effectInit({
            effect: "creative",
            swiper,
            on,
            setTranslate,
            setTransition,
            perspective: () => swiper.params.creativeEffect.perspective,
            overwriteParams: () => ({
                watchSlidesProgress: true,
                virtualTranslate: !swiper.params.cssMode
            })
        });
    }
    function EffectCards(_ref) {
        let {swiper, extendParams, on} = _ref;
        extendParams({
            cardsEffect: {
                slideShadows: true,
                rotate: true,
                perSlideRotate: 2,
                perSlideOffset: 8
            }
        });
        const setTranslate = () => {
            const {slides, activeIndex, rtlTranslate: rtl} = swiper;
            const params = swiper.params.cardsEffect;
            const {startTranslate, isTouched} = swiper.touchEventsData;
            const currentTranslate = rtl ? -swiper.translate : swiper.translate;
            for (let i = 0; i < slides.length; i += 1) {
                const slideEl = slides[i];
                const slideProgress = slideEl.progress;
                const progress = Math.min(Math.max(slideProgress, -4), 4);
                let offset = slideEl.swiperSlideOffset;
                if (swiper.params.centeredSlides && !swiper.params.cssMode) swiper.wrapperEl.style.transform = `translateX(${swiper.minTranslate()}px)`;
                if (swiper.params.centeredSlides && swiper.params.cssMode) offset -= slides[0].swiperSlideOffset;
                let tX = swiper.params.cssMode ? -offset - swiper.translate : -offset;
                let tY = 0;
                const tZ = -100 * Math.abs(progress);
                let scale = 1;
                let rotate = -params.perSlideRotate * progress;
                let tXAdd = params.perSlideOffset - Math.abs(progress) * .75;
                const slideIndex = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.from + i : i;
                const isSwipeToNext = (slideIndex === activeIndex || slideIndex === activeIndex - 1) && progress > 0 && progress < 1 && (isTouched || swiper.params.cssMode) && currentTranslate < startTranslate;
                const isSwipeToPrev = (slideIndex === activeIndex || slideIndex === activeIndex + 1) && progress < 0 && progress > -1 && (isTouched || swiper.params.cssMode) && currentTranslate > startTranslate;
                if (isSwipeToNext || isSwipeToPrev) {
                    const subProgress = (1 - Math.abs((Math.abs(progress) - .5) / .5)) ** .5;
                    rotate += -28 * progress * subProgress;
                    scale += -.5 * subProgress;
                    tXAdd += 96 * subProgress;
                    tY = `${-25 * subProgress * Math.abs(progress)}%`;
                }
                if (progress < 0) tX = `calc(${tX}px ${rtl ? "-" : "+"} (${tXAdd * Math.abs(progress)}%))`; else if (progress > 0) tX = `calc(${tX}px ${rtl ? "-" : "+"} (-${tXAdd * Math.abs(progress)}%))`; else tX = `${tX}px`;
                if (!swiper.isHorizontal()) {
                    const prevY = tY;
                    tY = tX;
                    tX = prevY;
                }
                const scaleString = progress < 0 ? `${1 + (1 - scale) * progress}` : `${1 - (1 - scale) * progress}`;
                const transform = `\n        translate3d(${tX}, ${tY}, ${tZ}px)\n        rotateZ(${params.rotate ? rtl ? -rotate : rotate : 0}deg)\n        scale(${scaleString})\n      `;
                if (params.slideShadows) {
                    let shadowEl = slideEl.querySelector(".swiper-slide-shadow");
                    if (!shadowEl) shadowEl = createShadow("cards", slideEl);
                    if (shadowEl) shadowEl.style.opacity = Math.min(Math.max((Math.abs(progress) - .5) / .5, 0), 1);
                }
                slideEl.style.zIndex = -Math.abs(Math.round(slideProgress)) + slides.length;
                const targetEl = effectTarget(params, slideEl);
                targetEl.style.transform = transform;
            }
        };
        const setTransition = duration => {
            const transformElements = swiper.slides.map((slideEl => getSlideTransformEl(slideEl)));
            transformElements.forEach((el => {
                el.style.transitionDuration = `${duration}ms`;
                el.querySelectorAll(".swiper-slide-shadow").forEach((shadowEl => {
                    shadowEl.style.transitionDuration = `${duration}ms`;
                }));
            }));
            effectVirtualTransitionEnd({
                swiper,
                duration,
                transformElements
            });
        };
        effectInit({
            effect: "cards",
            swiper,
            on,
            setTranslate,
            setTransition,
            perspective: () => true,
            overwriteParams: () => ({
                watchSlidesProgress: true,
                virtualTranslate: !swiper.params.cssMode
            })
        });
    }
    const modules = [ Virtual, Keyboard, Mousewheel, Navigation, Pagination, Scrollbar, Parallax, Zoom, Controller, A11y, History, HashNavigation, Autoplay, Thumb, freeMode, Grid, Manipulation, EffectFade, EffectCube, EffectFlip, EffectCoverflow, EffectCreative, EffectCards ];
    Swiper.use(modules);
    const mainSlider = document.querySelector(".jsMainSlider");
    let mainSliderInit;
    if (mainSlider) {
        mainSliderInit = new Swiper(".jsMainSliderInit", {
            slidesPerView: 1,
            loop: false,
            navigation: {
                nextEl: ".jsMainSliderBtnNext",
                prevEl: ".jsMainSliderBtnPrev"
            }
        });
        mainSliderInit.on("slideChange", (function() {
            document.querySelector(".jsMainSliderCurrent").innerHTML = this.activeIndex + 1;
        }));
    }
    const newsItemsSlider = document.querySelector(".jsNewsItemsSlider");
    let newsItemsSliderInit;
    if (newsItemsSlider) {
        newsItemsSliderInit = new Swiper(".jsNewsItemsSliderInit", {
            slidesPerView: 2,
            spaceBetween: 8,
            loop: false,
            navigation: {
                nextEl: ".jsNewsItemsSliderBtnNext",
                prevEl: ".jsNewsItemsSliderBtnPrev"
            },
            breakpoints: {
                768: {
                    slidesPerView: 3
                },
                1024: {
                    slidesPerView: 1,
                    spaceBetween: false
                }
            }
        });
        newsItemsSliderInit.on("slideChange", (function() {
            document.querySelector(".jsNewsItemsSliderCount").innerHTML = this.activeIndex + 1;
        }));
    }
    const parnterSlider = document.querySelector(".jsPartnerSlider");
    let partnerSliderInit;
    if (parnterSlider) partnerSliderInit = new Swiper(".jsPartnerSliderInit", {
        slidesPerView: "auto",
        loop: false,
        navigation: {
            nextEl: ".jsPartnerSliderBtnNext",
            prevEl: ".jsPartnerSliderBtnPrev"
        },
        breakpoints: {
            1024: {
                slidesPerView: 3
            },
            1200: {
                slidesPerView: 4
            }
        }
    });
    const newsSlider = document.querySelector(".jsNewsSlider");
    let newsSliderInit;
    if (newsSlider) newsSliderInit = new Swiper(".jsNewsSliderInit", {
        slidesPerView: "auto",
        loop: false,
        spaceBetween: 32,
        navigation: {
            nextEl: ".jsNewsSliderBtnNext",
            prevEl: ".jsNewsSliderBtnPrev"
        },
        breakpoints: {
            1024: {
                slidesPerView: 3
            },
            1600: {
                slidesPerView: 4
            }
        }
    });
    const specialSliders = document.querySelectorAll(".jsSpecialSlider");
    for (let i = 0; i < specialSliders.length; i++) {
        let sliderInit = specialSliders[i].querySelector(".jsSpecialSliderInner");
        let sliderPrevBtn = specialSliders[i].querySelector(".jsSliderBtnPrev");
        let sliderPrevNxt = specialSliders[i].querySelector(".jsSliderBtnNext");
        let sliderScroll = specialSliders[i].querySelector(".jsSliderScroll");
        new Swiper(sliderInit, {
            slidesPerView: 2,
            loop: false,
            scrollbar: {
                el: sliderScroll
            },
            navigation: {
                nextEl: sliderPrevNxt,
                prevEl: sliderPrevBtn
            },
            breakpoints: {
                768: {
                    slidesPerView: 3,
                    scrollbar: false
                },
                1024: {
                    slidesPerView: 4,
                    scrollbar: false
                },
                1600: {
                    slidesPerView: 5,
                    scrollbar: false
                }
            }
        });
    }
    const recentSlider = document.querySelector(".jsRecentSliderInner");
    let recentSliderInit;
    if (recentSlider) recentSliderInit = new Swiper(".jsRecentSliderInner", {
        slidesPerView: 2,
        loop: false,
        scrollbar: {
            el: ".jsRecentSliderScroll"
        },
        navigation: {
            nextEl: ".jsRecentSliderBtnNext",
            prevEl: ".jsRecentSliderBtnPrev"
        },
        breakpoints: {
            768: {
                slidesPerView: 3,
                scrollbar: false
            },
            1024: {
                slidesPerView: 4,
                scrollbar: false
            },
            1600: {
                slidesPerView: 5,
                scrollbar: false
            }
        }
    });
    const complectSlider = document.querySelector(".jsComplectSliderInner");
    let complectSliderInit;
    if (complectSlider) complectSliderInit = new Swiper(".jsComplectSliderInner", {
        slidesPerView: 2,
        loop: false,
        scrollbar: {
            el: ".jsComplectSliderScroll"
        },
        navigation: {
            nextEl: ".jsComplectSliderBtnNext",
            prevEl: ".jsComplectSliderBtnPrev"
        },
        breakpoints: {
            768: {
                slidesPerView: 3,
                scrollbar: false
            },
            1024: {
                slidesPerView: 4,
                scrollbar: false
            },
            1600: {
                slidesPerView: 5,
                scrollbar: false
            }
        }
    });
    const optionalEquipmentSlider = document.querySelector(".jsOptionalEquipmentSliderInner");
    let optionalEquipmentSliderInit;
    if (optionalEquipmentSlider) optionalEquipmentSliderInit = new Swiper(".jsOptionalEquipmentSliderInner", {
        slidesPerView: 2,
        loop: false,
        scrollbar: {
            el: ".jsOptionalEquipmentSliderScroll"
        },
        navigation: {
            nextEl: ".jsOptionalEquipmentSliderBtnNext",
            prevEl: ".jsOptionalEquipmentSliderBtnPrev"
        },
        breakpoints: {
            768: {
                slidesPerView: 3,
                scrollbar: false
            },
            1024: {
                slidesPerView: 4,
                scrollbar: false
            },
            1600: {
                slidesPerView: 5,
                scrollbar: false
            }
        }
    });
    const seeAlsoSlider = document.querySelector(".jsSeeAlsoSliderInner");
    let seeAlsoSliderInit;
    if (seeAlsoSlider) seeAlsoSliderInit = new Swiper(".jsSeeAlsoSliderInner", {
        slidesPerView: 2,
        loop: false,
        scrollbar: {
            el: ".jsSeeAlsoSliderScroll"
        },
        navigation: {
            nextEl: ".jsSeeAlsoSliderBtnNext",
            prevEl: ".jsSeeAlsoSliderBtnPrev"
        },
        breakpoints: {
            768: {
                slidesPerView: 3,
                scrollbar: false
            },
            1024: {
                slidesPerView: 4,
                scrollbar: false
            },
            1600: {
                slidesPerView: 5,
                scrollbar: false
            }
        }
    });
    if (document.querySelector(".jsEquipmentSliderMain") && document.querySelector(".jsEquipmentSliderTrack")) {
        let productTrack = new Swiper(".jsEquipmentSliderTrack", {
            direction: "vertical",
            slidesPerView: 4,
            spaceBetween: 12,
            navigation: {
                prevEl: ".product-hero-prev",
                nextEl: ".product-hero-next"
            },
            on: {}
        });
        new Swiper(".jsEquipmentSliderMain", {
            slidesPerView: 1,
            slidesPerGroup: 1,
            spaceBetween: 0,
            autoHeight: true,
            navigation: {
                nextEl: ".product-hero-main-next",
                prevEl: ".product-hero-main-prev"
            },
            pagination: {
                el: ".product-hero__dots",
                type: "fraction"
            },
            thumbs: {
                swiper: productTrack
            },
            breakpoints: {
                680: {
                    autoHeight: false
                },
                1100: {
                    navigation: false,
                    autoHeight: false
                }
            },
            on: {}
        });
    }
    if (document.querySelector(".jsFlizelinSliderMain") && document.querySelector(".jsFlizelinSliderTrack")) {
        let productTrack = new Swiper(".jsFlizelinSliderTrack", {
            direction: "vertical",
            slidesPerView: 3,
            spaceBetween: 12,
            navigation: {
                prevEl: ".product-hero-prev",
                nextEl: ".product-hero-next"
            },
            on: {}
        });
        new Swiper(".jsFlizelinSliderMain", {
            slidesPerView: 1,
            slidesPerGroup: 1,
            spaceBetween: 0,
            autoHeight: true,
            navigation: {
                nextEl: ".product-hero-main-next",
                prevEl: ".product-hero-main-prev"
            },
            pagination: {
                el: ".product-hero__dots",
                type: "fraction"
            },
            thumbs: {
                swiper: productTrack
            },
            breakpoints: {
                1100: {
                    navigation: false
                }
            },
            on: {}
        });
    }
    if (document.querySelector(".jsThreadSliderMain") && document.querySelector(".jsThreadSliderTrack")) {
        let productTrack = new Swiper(".jsThreadSliderTrack", {
            direction: "vertical",
            slidesPerView: 3,
            spaceBetween: 12,
            navigation: {
                prevEl: ".product-hero-prev",
                nextEl: ".product-hero-next"
            },
            on: {}
        });
        new Swiper(".jsThreadSliderMain", {
            slidesPerView: 1,
            slidesPerGroup: 1,
            spaceBetween: 0,
            autoHeight: true,
            navigation: {
                nextEl: ".product-hero-main-next",
                prevEl: ".product-hero-main-prev"
            },
            pagination: {
                el: ".product-hero__dots",
                type: "fraction"
            },
            thumbs: {
                swiper: productTrack
            },
            breakpoints: {
                1100: {
                    navigation: false
                }
            },
            on: {}
        });
    }
    const compilationBtns = document.querySelectorAll(".jsCompilationBtn");
    for (let i = 0; i < compilationBtns.length; i++) compilationBtns[i].addEventListener("click", (function() {
        this.closest(".jsCompilation").classList.add("is-active");
    }));
    const searchBlockInput = document.querySelector(".jsSearchBlockInput");
    const searchBlockTrigger = document.querySelector(".jsSearchBlockTrigger");
    if (searchBlockInput) {
        searchBlockInput.addEventListener("focus", (function() {
            this.closest(".jsSearchBlock").classList.add("is-active");
        }));
        searchBlockInput.addEventListener("blur", (function() {
            this.closest(".jsSearchBlock").classList.remove("is-active");
        }));
    }
    if (searchBlockTrigger) searchBlockTrigger.addEventListener("click", (function() {
        this.closest(".jsSearchBlock").classList.remove("is-active");
    }));
    const catalog_triggers = document.querySelectorAll(".jsCatalogTrigger");
    const catalogToggle = function() {
        const catalog = document.querySelector(".jsCatalog");
        const html = document.querySelector("html");
        catalog.classList.toggle("is-active");
        html.classList.toggle("is-fixed");
    };
    for (let i = 0; i < catalog_triggers.length; i++) catalog_triggers[i].addEventListener("click", (function(e) {
        e.preventDefault();
        catalogToggle();
    }));
    let cityModalTrigger = document.querySelector(".jsCityModalTrigger");
    if (cityModalTrigger) cityModalTrigger.addEventListener("click", (function() {
        if (window.matchMedia("(min-width: 1024px)").matches) {
            document.querySelector(".modal-backdrop").classList.add("modal-backdrop--transparent");
            document.querySelector(".body").classList.remove("modal-open");
            document.querySelector(".body").removeAttribute("style");
        }
    }));
    const yPickupMap = document.getElementById("y-pickup-map");
    ymaps.ready(init);
    function init() {
        var myMap = new ymaps.Map(yPickupMap, {
            center: [ 59.9396, 30.430385 ],
            zoom: 16
        });
        myMap.geoObjects.add(new ymaps.Placemark([ 59.9396, 30.430385 ], {
            balloonContent: "Санкт-Петербург, ул. Магнитогорская, д. 23, корп. 1"
        }, {
            preset: "islands#greenDotIconWithCaption",
            iconColor: "#00adef"
        }));
    }
    const paymentsMethodElems = Array.from(document.getElementsByClassName("jsPaymentsMethod"));
    if (paymentsMethodElems.length) {
        const paymentsMethodText = document.querySelector(".jsPaymentsMethodText");
        const paymentsBtn = document.querySelector(".jsPaymentsMethodBtn");
        let currentText, currentBtnText, currentBtnClasses, activeInput;
        paymentsMethodElems.forEach((paymentsMethodEl => {
            const input = paymentsMethodEl.querySelector(".jsPaymentsMethodInput");
            input.addEventListener("change", (() => {
                const newPayments = paymentsMethodEl.querySelector(".jsPaymentsMethodRadioText");
                paymentsMethodText.textContent = newPayments.textContent;
                switch (input.getAttribute("data-payments-method")) {
                  case "cash":
                    paymentsBtn.removeAttribute("download");
                    paymentsBtn.classList.remove("button--blue");
                    paymentsBtn.classList.add("button--gray");
                    paymentsBtn.classList.add("order-details__payment-btn--disable");
                    paymentsBtn.textContent = "Оплата в магазине";
                    break;

                  case "cashless":
                    paymentsBtn.classList.remove("button--gray");
                    paymentsBtn.classList.remove("order-details__payment-btn--disable");
                    paymentsBtn.classList.add("button--blue");
                    paymentsBtn.setAttribute("download", input.getAttribute("data-payment-path"));
                    paymentsBtn.textContent = "Скачать счёт";
                    break;

                  case "online":
                    paymentsBtn.removeAttribute("download");
                    paymentsBtn.classList.remove("button--gray");
                    paymentsBtn.classList.remove("order-details__payment-btn--disable");
                    paymentsBtn.classList.add("button--blue");
                    paymentsBtn.textContent = "Оплатить";
                    break;
                }
            }));
        }));
        const changePaymentsMethod = document.querySelector(`[data-bs-target="#payments-method"]`);
        const cancelChangePaymentsMethodElems = document.getElementById("payments-method").querySelectorAll(`[data-bs-dismiss="modal"]`);
        changePaymentsMethod.addEventListener("click", (() => {
            currentText = paymentsMethodText.textContent;
            currentBtnText = paymentsBtn.textContent;
            currentBtnClasses = Array.from(paymentsBtn.classList);
            activeInput = document.querySelector(".jsPaymentsMethodInput[checked]");
        }));
        cancelChangePaymentsMethodElems.forEach((cancelBtn => {
            cancelBtn.addEventListener("click", (() => {
                paymentsMethodText.textContent = currentText;
                paymentsBtn.textContent = currentBtnText;
                paymentsBtn.classList = "";
                for (let cl of currentBtnClasses) paymentsBtn.classList.add(cl);
                activeInput.checked = true;
            }));
        }));
    }
    const entityLabel = document.querySelectorAll(".jsEntity");
    if (entityLabel) for (let i = 0; i < entityLabel.length; i++) {
        const inputOrganization = entityLabel[i].closest(".jsForm").querySelector(".jsInputOrganization");
        const inputInn = entityLabel[i].closest(".jsForm").querySelector(".jsInputInn");
        const inputName = entityLabel[i].closest(".jsForm").querySelector(".jsInputName");
        entityLabel[i].addEventListener("change", (function() {
            if (this.classList.contains("jsEntityIndividual")) {
                inputOrganization.classList.add("d-none");
                inputOrganization.querySelector(".jsInput").removeAttribute("required");
                inputOrganization.querySelector(".input").classList.remove("is-error");
                inputInn.classList.add("d-none");
                inputInn.querySelector(".jsInput").removeAttribute("required");
                inputInn.querySelector(".input").classList.remove("is-error");
                inputName.classList.remove("d-none");
                inputName.querySelector(".jsInput").setAttribute("required", "required");
            } else if (this.classList.contains("jsEntityLegal")) {
                inputOrganization.classList.remove("d-none");
                inputOrganization.querySelector(".jsInput").setAttribute("required", "required");
                inputInn.classList.remove("d-none");
                inputInn.querySelector(".jsInput").setAttribute("required", "required");
                inputName.classList.add("d-none");
                inputName.querySelector(".jsInput").removeAttribute("required");
                inputName.querySelector(".input").classList.remove("is-error");
            }
        }));
    }
    const form_forms = document.querySelectorAll(".jsForm");
    for (let i = 0; i < form_forms.length; i++) {
        let ok = true;
        const btn = form_forms[i].querySelector(".jsFormSubmitBtn");
        const inputs = form_forms[i].querySelectorAll(".jsInput[required]");
        const checkbox = form_forms[i].querySelector(".jsFormCheckBox");
        const passEq = form_forms[i].querySelectorAll(".jsInputPasswordEq");
        for (let j = 0; j < inputs.length; j++) inputs[j].addEventListener("input", (function() {
            if (!this.classList.contains("jsInputPhone") && !this.classList.contains("jsInputEmail") && !this.classList.contains("jsInputPasswordEq")) {
                const val = this.value;
                if (val) ok = true;
            }
            if (this.classList.contains("jsInputPhone")) {
                let regPhone = new RegExp("(7|8)\\s[(][0-9]{3}[)]\\s[0-9]{3}[-][0-9]{2}[-][0-9]{2}");
                if (this.value != 0 & regPhone.test(this.value) == true) {
                    this.closest(".input").classList.remove("is-error");
                    ok = true;
                } else {
                    this.closest(".input").classList.add("is-error");
                    ok = false;
                }
            }
            if (this.classList.contains("jsInputEmail")) {
                let regEmail = new RegExp("^([a-z0-9_-]+\\.)*[a-z0-9_-]+@[a-z0-9_-]+(\\.[a-z0-9_-]+)*\\.[a-z]{2,6}$");
                if (this.value != 0 & regEmail.test(this.value) == true) {
                    this.closest(".input").classList.remove("is-error");
                    ok = true;
                } else {
                    this.closest(".input").classList.add("is-error");
                    ok = false;
                }
            }
        }));
        if (checkbox) checkbox.addEventListener("change", (function() {
            if (this.checked && this.classList.contains("is-empty")) {
                this.classList.remove("is-empty");
                ok = true;
            }
        }));
        if (btn) btn.addEventListener("click", (function(e) {
            e.preventDefault();
            for (let b = 0; b < form_forms[i].querySelectorAll(".jsInput[required]").length; b++) if (form_forms[i].querySelectorAll(".jsInput[required]")[b].value === "") {
                ok = false;
                form_forms[i].querySelectorAll(".jsInput[required]")[b].closest(".input ").classList.add("is-error");
            }
            if (passEq.length) if (this.closest(".jsForm").querySelector(".jsInputPasswordEq--1").value === this.closest(".jsForm").querySelector(".jsInputPasswordEq--2").value && this.closest(".jsForm").querySelector(".jsInputPasswordEq--1").value !== "" && this.closest(".jsForm").querySelector(".jsInputPasswordEq--2").value !== "") {
                ok = true;
                console.log(1);
                for (let q = 0; q < passEq.length; q++) passEq[q].closest(".input").classList.remove("is-error");
            } else {
                console.log(2);
                ok = false;
                for (let q = 0; q < passEq.length; q++) passEq[q].closest(".input").classList.add("is-error");
            }
            if (checkbox) if (!checkbox.checked) {
                checkbox.classList.add("is-empty");
                ok = false;
            } else checkbox.classList.remove("is-empty");
            if (ok && this.closest(".jsForm").querySelectorAll(".input.is-error").length == 0) if (!this.closest(".jsForm").classList.contains("form-with-success")) this.closest(".jsForm").submit(); else {
                this.closest(".jsForm").querySelector(".jsFormFront").classList.add("is-hidden");
                this.closest(".jsForm").querySelector(".jsFormSuccess").classList.add("is-visible");
            }
        }));
    }
    const getUp = document.querySelector(".jsGetUp");
    if (getUp) getUp.addEventListener("click", (function() {
        (function smoothscroll() {
            const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
            if (currentScroll > 0) {
                window.requestAnimationFrame(smoothscroll);
                window.scrollTo(0, currentScroll - currentScroll / 5);
            }
        })();
    }));
    const body = document.querySelector(".body");
    const topBodyOffset = function() {
        if (body.getBoundingClientRect().top < -350) getUp.classList.add("is-active"); else getUp.classList.remove("is-active");
    };
    document.addEventListener("DOMContentLoaded", (function() {
        if (getUp) topBodyOffset();
    }));
    document.addEventListener("scroll", (function() {
        if (getUp) topBodyOffset();
    }));
    var PipsMode;
    (function(PipsMode) {
        PipsMode["Range"] = "range";
        PipsMode["Steps"] = "steps";
        PipsMode["Positions"] = "positions";
        PipsMode["Count"] = "count";
        PipsMode["Values"] = "values";
    })(PipsMode || (PipsMode = {}));
    var PipsType;
    (function(PipsType) {
        PipsType[PipsType["None"] = -1] = "None";
        PipsType[PipsType["NoValue"] = 0] = "NoValue";
        PipsType[PipsType["LargeValue"] = 1] = "LargeValue";
        PipsType[PipsType["SmallValue"] = 2] = "SmallValue";
    })(PipsType || (PipsType = {}));
    function isValidFormatter(entry) {
        return isValidPartialFormatter(entry) && typeof entry.from === "function";
    }
    function isValidPartialFormatter(entry) {
        return typeof entry === "object" && typeof entry.to === "function";
    }
    function removeElement(el) {
        el.parentElement.removeChild(el);
    }
    function isSet(value) {
        return value !== null && value !== void 0;
    }
    function preventDefault(e) {
        e.preventDefault();
    }
    function unique(array) {
        return array.filter((function(a) {
            return !this[a] ? this[a] = true : false;
        }), {});
    }
    function closest(value, to) {
        return Math.round(value / to) * to;
    }
    function nouislider_offset(elem, orientation) {
        var rect = elem.getBoundingClientRect();
        var doc = elem.ownerDocument;
        var docElem = doc.documentElement;
        var pageOffset = getPageOffset(doc);
        if (/webkit.*Chrome.*Mobile/i.test(navigator.userAgent)) pageOffset.x = 0;
        return orientation ? rect.top + pageOffset.y - docElem.clientTop : rect.left + pageOffset.x - docElem.clientLeft;
    }
    function isNumeric(a) {
        return typeof a === "number" && !isNaN(a) && isFinite(a);
    }
    function addClassFor(element, className, duration) {
        if (duration > 0) {
            addClass(element, className);
            setTimeout((function() {
                removeClass(element, className);
            }), duration);
        }
    }
    function limit(a) {
        return Math.max(Math.min(a, 100), 0);
    }
    function asArray(a) {
        return Array.isArray(a) ? a : [ a ];
    }
    function countDecimals(numStr) {
        numStr = String(numStr);
        var pieces = numStr.split(".");
        return pieces.length > 1 ? pieces[1].length : 0;
    }
    function addClass(el, className) {
        if (el.classList && !/\s/.test(className)) el.classList.add(className); else el.className += " " + className;
    }
    function removeClass(el, className) {
        if (el.classList && !/\s/.test(className)) el.classList.remove(className); else el.className = el.className.replace(new RegExp("(^|\\b)" + className.split(" ").join("|") + "(\\b|$)", "gi"), " ");
    }
    function hasClass(el, className) {
        return el.classList ? el.classList.contains(className) : new RegExp("\\b" + className + "\\b").test(el.className);
    }
    function getPageOffset(doc) {
        var supportPageOffset = window.pageXOffset !== void 0;
        var isCSS1Compat = (doc.compatMode || "") === "CSS1Compat";
        var x = supportPageOffset ? window.pageXOffset : isCSS1Compat ? doc.documentElement.scrollLeft : doc.body.scrollLeft;
        var y = supportPageOffset ? window.pageYOffset : isCSS1Compat ? doc.documentElement.scrollTop : doc.body.scrollTop;
        return {
            x,
            y
        };
    }
    function getActions() {
        return window.navigator.pointerEnabled ? {
            start: "pointerdown",
            move: "pointermove",
            end: "pointerup"
        } : window.navigator.msPointerEnabled ? {
            start: "MSPointerDown",
            move: "MSPointerMove",
            end: "MSPointerUp"
        } : {
            start: "mousedown touchstart",
            move: "mousemove touchmove",
            end: "mouseup touchend"
        };
    }
    function getSupportsPassive() {
        var supportsPassive = false;
        try {
            var opts = Object.defineProperty({}, "passive", {
                get: function() {
                    supportsPassive = true;
                }
            });
            window.addEventListener("test", null, opts);
        } catch (e) {}
        return supportsPassive;
    }
    function getSupportsTouchActionNone() {
        return window.CSS && CSS.supports && CSS.supports("touch-action", "none");
    }
    function subRangeRatio(pa, pb) {
        return 100 / (pb - pa);
    }
    function fromPercentage(range, value, startRange) {
        return value * 100 / (range[startRange + 1] - range[startRange]);
    }
    function toPercentage(range, value) {
        return fromPercentage(range, range[0] < 0 ? value + Math.abs(range[0]) : value - range[0], 0);
    }
    function isPercentage(range, value) {
        return value * (range[1] - range[0]) / 100 + range[0];
    }
    function getJ(value, arr) {
        var j = 1;
        while (value >= arr[j]) j += 1;
        return j;
    }
    function toStepping(xVal, xPct, value) {
        if (value >= xVal.slice(-1)[0]) return 100;
        var j = getJ(value, xVal);
        var va = xVal[j - 1];
        var vb = xVal[j];
        var pa = xPct[j - 1];
        var pb = xPct[j];
        return pa + toPercentage([ va, vb ], value) / subRangeRatio(pa, pb);
    }
    function fromStepping(xVal, xPct, value) {
        if (value >= 100) return xVal.slice(-1)[0];
        var j = getJ(value, xPct);
        var va = xVal[j - 1];
        var vb = xVal[j];
        var pa = xPct[j - 1];
        var pb = xPct[j];
        return isPercentage([ va, vb ], (value - pa) * subRangeRatio(pa, pb));
    }
    function getStep(xPct, xSteps, snap, value) {
        if (value === 100) return value;
        var j = getJ(value, xPct);
        var a = xPct[j - 1];
        var b = xPct[j];
        if (snap) {
            if (value - a > (b - a) / 2) return b;
            return a;
        }
        if (!xSteps[j - 1]) return value;
        return xPct[j - 1] + closest(value - xPct[j - 1], xSteps[j - 1]);
    }
    var Spectrum = function() {
        function Spectrum(entry, snap, singleStep) {
            this.xPct = [];
            this.xVal = [];
            this.xSteps = [];
            this.xNumSteps = [];
            this.xHighestCompleteStep = [];
            this.xSteps = [ singleStep || false ];
            this.xNumSteps = [ false ];
            this.snap = snap;
            var index;
            var ordered = [];
            Object.keys(entry).forEach((function(index) {
                ordered.push([ asArray(entry[index]), index ]);
            }));
            ordered.sort((function(a, b) {
                return a[0][0] - b[0][0];
            }));
            for (index = 0; index < ordered.length; index++) this.handleEntryPoint(ordered[index][1], ordered[index][0]);
            this.xNumSteps = this.xSteps.slice(0);
            for (index = 0; index < this.xNumSteps.length; index++) this.handleStepPoint(index, this.xNumSteps[index]);
        }
        Spectrum.prototype.getDistance = function(value) {
            var distances = [];
            for (var index = 0; index < this.xNumSteps.length - 1; index++) distances[index] = fromPercentage(this.xVal, value, index);
            return distances;
        };
        Spectrum.prototype.getAbsoluteDistance = function(value, distances, direction) {
            var xPct_index = 0;
            if (value < this.xPct[this.xPct.length - 1]) while (value > this.xPct[xPct_index + 1]) xPct_index++; else if (value === this.xPct[this.xPct.length - 1]) xPct_index = this.xPct.length - 2;
            if (!direction && value === this.xPct[xPct_index + 1]) xPct_index++;
            if (distances === null) distances = [];
            var start_factor;
            var rest_factor = 1;
            var rest_rel_distance = distances[xPct_index];
            var range_pct = 0;
            var rel_range_distance = 0;
            var abs_distance_counter = 0;
            var range_counter = 0;
            if (direction) start_factor = (value - this.xPct[xPct_index]) / (this.xPct[xPct_index + 1] - this.xPct[xPct_index]); else start_factor = (this.xPct[xPct_index + 1] - value) / (this.xPct[xPct_index + 1] - this.xPct[xPct_index]);
            while (rest_rel_distance > 0) {
                range_pct = this.xPct[xPct_index + 1 + range_counter] - this.xPct[xPct_index + range_counter];
                if (distances[xPct_index + range_counter] * rest_factor + 100 - start_factor * 100 > 100) {
                    rel_range_distance = range_pct * start_factor;
                    rest_factor = (rest_rel_distance - 100 * start_factor) / distances[xPct_index + range_counter];
                    start_factor = 1;
                } else {
                    rel_range_distance = distances[xPct_index + range_counter] * range_pct / 100 * rest_factor;
                    rest_factor = 0;
                }
                if (direction) {
                    abs_distance_counter -= rel_range_distance;
                    if (this.xPct.length + range_counter >= 1) range_counter--;
                } else {
                    abs_distance_counter += rel_range_distance;
                    if (this.xPct.length - range_counter >= 1) range_counter++;
                }
                rest_rel_distance = distances[xPct_index + range_counter] * rest_factor;
            }
            return value + abs_distance_counter;
        };
        Spectrum.prototype.toStepping = function(value) {
            value = toStepping(this.xVal, this.xPct, value);
            return value;
        };
        Spectrum.prototype.fromStepping = function(value) {
            return fromStepping(this.xVal, this.xPct, value);
        };
        Spectrum.prototype.getStep = function(value) {
            value = getStep(this.xPct, this.xSteps, this.snap, value);
            return value;
        };
        Spectrum.prototype.getDefaultStep = function(value, isDown, size) {
            var j = getJ(value, this.xPct);
            if (value === 100 || isDown && value === this.xPct[j - 1]) j = Math.max(j - 1, 1);
            return (this.xVal[j] - this.xVal[j - 1]) / size;
        };
        Spectrum.prototype.getNearbySteps = function(value) {
            var j = getJ(value, this.xPct);
            return {
                stepBefore: {
                    startValue: this.xVal[j - 2],
                    step: this.xNumSteps[j - 2],
                    highestStep: this.xHighestCompleteStep[j - 2]
                },
                thisStep: {
                    startValue: this.xVal[j - 1],
                    step: this.xNumSteps[j - 1],
                    highestStep: this.xHighestCompleteStep[j - 1]
                },
                stepAfter: {
                    startValue: this.xVal[j],
                    step: this.xNumSteps[j],
                    highestStep: this.xHighestCompleteStep[j]
                }
            };
        };
        Spectrum.prototype.countStepDecimals = function() {
            var stepDecimals = this.xNumSteps.map(countDecimals);
            return Math.max.apply(null, stepDecimals);
        };
        Spectrum.prototype.hasNoSize = function() {
            return this.xVal[0] === this.xVal[this.xVal.length - 1];
        };
        Spectrum.prototype.convert = function(value) {
            return this.getStep(this.toStepping(value));
        };
        Spectrum.prototype.handleEntryPoint = function(index, value) {
            var percentage;
            if (index === "min") percentage = 0; else if (index === "max") percentage = 100; else percentage = parseFloat(index);
            if (!isNumeric(percentage) || !isNumeric(value[0])) throw new Error("noUiSlider: 'range' value isn't numeric.");
            this.xPct.push(percentage);
            this.xVal.push(value[0]);
            var value1 = Number(value[1]);
            if (!percentage) {
                if (!isNaN(value1)) this.xSteps[0] = value1;
            } else this.xSteps.push(isNaN(value1) ? false : value1);
            this.xHighestCompleteStep.push(0);
        };
        Spectrum.prototype.handleStepPoint = function(i, n) {
            if (!n) return;
            if (this.xVal[i] === this.xVal[i + 1]) {
                this.xSteps[i] = this.xHighestCompleteStep[i] = this.xVal[i];
                return;
            }
            this.xSteps[i] = fromPercentage([ this.xVal[i], this.xVal[i + 1] ], n, 0) / subRangeRatio(this.xPct[i], this.xPct[i + 1]);
            var totalSteps = (this.xVal[i + 1] - this.xVal[i]) / this.xNumSteps[i];
            var highestStep = Math.ceil(Number(totalSteps.toFixed(3)) - 1);
            var step = this.xVal[i] + this.xNumSteps[i] * highestStep;
            this.xHighestCompleteStep[i] = step;
        };
        return Spectrum;
    }();
    var defaultFormatter = {
        to: function(value) {
            return value === void 0 ? "" : value.toFixed(2);
        },
        from: Number
    };
    var cssClasses = {
        target: "target",
        base: "base",
        origin: "origin",
        handle: "handle",
        handleLower: "handle-lower",
        handleUpper: "handle-upper",
        touchArea: "touch-area",
        horizontal: "horizontal",
        vertical: "vertical",
        background: "background",
        connect: "connect",
        connects: "connects",
        ltr: "ltr",
        rtl: "rtl",
        textDirectionLtr: "txt-dir-ltr",
        textDirectionRtl: "txt-dir-rtl",
        draggable: "draggable",
        drag: "state-drag",
        tap: "state-tap",
        active: "active",
        tooltip: "tooltip",
        pips: "pips",
        pipsHorizontal: "pips-horizontal",
        pipsVertical: "pips-vertical",
        marker: "marker",
        markerHorizontal: "marker-horizontal",
        markerVertical: "marker-vertical",
        markerNormal: "marker-normal",
        markerLarge: "marker-large",
        markerSub: "marker-sub",
        value: "value",
        valueHorizontal: "value-horizontal",
        valueVertical: "value-vertical",
        valueNormal: "value-normal",
        valueLarge: "value-large",
        valueSub: "value-sub"
    };
    var INTERNAL_EVENT_NS = {
        tooltips: ".__tooltips",
        aria: ".__aria"
    };
    function testStep(parsed, entry) {
        if (!isNumeric(entry)) throw new Error("noUiSlider: 'step' is not numeric.");
        parsed.singleStep = entry;
    }
    function testKeyboardPageMultiplier(parsed, entry) {
        if (!isNumeric(entry)) throw new Error("noUiSlider: 'keyboardPageMultiplier' is not numeric.");
        parsed.keyboardPageMultiplier = entry;
    }
    function testKeyboardMultiplier(parsed, entry) {
        if (!isNumeric(entry)) throw new Error("noUiSlider: 'keyboardMultiplier' is not numeric.");
        parsed.keyboardMultiplier = entry;
    }
    function testKeyboardDefaultStep(parsed, entry) {
        if (!isNumeric(entry)) throw new Error("noUiSlider: 'keyboardDefaultStep' is not numeric.");
        parsed.keyboardDefaultStep = entry;
    }
    function testRange(parsed, entry) {
        if (typeof entry !== "object" || Array.isArray(entry)) throw new Error("noUiSlider: 'range' is not an object.");
        if (entry.min === void 0 || entry.max === void 0) throw new Error("noUiSlider: Missing 'min' or 'max' in 'range'.");
        parsed.spectrum = new Spectrum(entry, parsed.snap || false, parsed.singleStep);
    }
    function testStart(parsed, entry) {
        entry = asArray(entry);
        if (!Array.isArray(entry) || !entry.length) throw new Error("noUiSlider: 'start' option is incorrect.");
        parsed.handles = entry.length;
        parsed.start = entry;
    }
    function testSnap(parsed, entry) {
        if (typeof entry !== "boolean") throw new Error("noUiSlider: 'snap' option must be a boolean.");
        parsed.snap = entry;
    }
    function testAnimate(parsed, entry) {
        if (typeof entry !== "boolean") throw new Error("noUiSlider: 'animate' option must be a boolean.");
        parsed.animate = entry;
    }
    function testAnimationDuration(parsed, entry) {
        if (typeof entry !== "number") throw new Error("noUiSlider: 'animationDuration' option must be a number.");
        parsed.animationDuration = entry;
    }
    function testConnect(parsed, entry) {
        var connect = [ false ];
        var i;
        if (entry === "lower") entry = [ true, false ]; else if (entry === "upper") entry = [ false, true ];
        if (entry === true || entry === false) {
            for (i = 1; i < parsed.handles; i++) connect.push(entry);
            connect.push(false);
        } else if (!Array.isArray(entry) || !entry.length || entry.length !== parsed.handles + 1) throw new Error("noUiSlider: 'connect' option doesn't match handle count."); else connect = entry;
        parsed.connect = connect;
    }
    function testOrientation(parsed, entry) {
        switch (entry) {
          case "horizontal":
            parsed.ort = 0;
            break;

          case "vertical":
            parsed.ort = 1;
            break;

          default:
            throw new Error("noUiSlider: 'orientation' option is invalid.");
        }
    }
    function testMargin(parsed, entry) {
        if (!isNumeric(entry)) throw new Error("noUiSlider: 'margin' option must be numeric.");
        if (entry === 0) return;
        parsed.margin = parsed.spectrum.getDistance(entry);
    }
    function testLimit(parsed, entry) {
        if (!isNumeric(entry)) throw new Error("noUiSlider: 'limit' option must be numeric.");
        parsed.limit = parsed.spectrum.getDistance(entry);
        if (!parsed.limit || parsed.handles < 2) throw new Error("noUiSlider: 'limit' option is only supported on linear sliders with 2 or more handles.");
    }
    function testPadding(parsed, entry) {
        var index;
        if (!isNumeric(entry) && !Array.isArray(entry)) throw new Error("noUiSlider: 'padding' option must be numeric or array of exactly 2 numbers.");
        if (Array.isArray(entry) && !(entry.length === 2 || isNumeric(entry[0]) || isNumeric(entry[1]))) throw new Error("noUiSlider: 'padding' option must be numeric or array of exactly 2 numbers.");
        if (entry === 0) return;
        if (!Array.isArray(entry)) entry = [ entry, entry ];
        parsed.padding = [ parsed.spectrum.getDistance(entry[0]), parsed.spectrum.getDistance(entry[1]) ];
        for (index = 0; index < parsed.spectrum.xNumSteps.length - 1; index++) if (parsed.padding[0][index] < 0 || parsed.padding[1][index] < 0) throw new Error("noUiSlider: 'padding' option must be a positive number(s).");
        var totalPadding = entry[0] + entry[1];
        var firstValue = parsed.spectrum.xVal[0];
        var lastValue = parsed.spectrum.xVal[parsed.spectrum.xVal.length - 1];
        if (totalPadding / (lastValue - firstValue) > 1) throw new Error("noUiSlider: 'padding' option must not exceed 100% of the range.");
    }
    function testDirection(parsed, entry) {
        switch (entry) {
          case "ltr":
            parsed.dir = 0;
            break;

          case "rtl":
            parsed.dir = 1;
            break;

          default:
            throw new Error("noUiSlider: 'direction' option was not recognized.");
        }
    }
    function testBehaviour(parsed, entry) {
        if (typeof entry !== "string") throw new Error("noUiSlider: 'behaviour' must be a string containing options.");
        var tap = entry.indexOf("tap") >= 0;
        var drag = entry.indexOf("drag") >= 0;
        var fixed = entry.indexOf("fixed") >= 0;
        var snap = entry.indexOf("snap") >= 0;
        var hover = entry.indexOf("hover") >= 0;
        var unconstrained = entry.indexOf("unconstrained") >= 0;
        var dragAll = entry.indexOf("drag-all") >= 0;
        var smoothSteps = entry.indexOf("smooth-steps") >= 0;
        if (fixed) {
            if (parsed.handles !== 2) throw new Error("noUiSlider: 'fixed' behaviour must be used with 2 handles");
            testMargin(parsed, parsed.start[1] - parsed.start[0]);
        }
        if (unconstrained && (parsed.margin || parsed.limit)) throw new Error("noUiSlider: 'unconstrained' behaviour cannot be used with margin or limit");
        parsed.events = {
            tap: tap || snap,
            drag,
            dragAll,
            smoothSteps,
            fixed,
            snap,
            hover,
            unconstrained
        };
    }
    function testTooltips(parsed, entry) {
        if (entry === false) return;
        if (entry === true || isValidPartialFormatter(entry)) {
            parsed.tooltips = [];
            for (var i = 0; i < parsed.handles; i++) parsed.tooltips.push(entry);
        } else {
            entry = asArray(entry);
            if (entry.length !== parsed.handles) throw new Error("noUiSlider: must pass a formatter for all handles.");
            entry.forEach((function(formatter) {
                if (typeof formatter !== "boolean" && !isValidPartialFormatter(formatter)) throw new Error("noUiSlider: 'tooltips' must be passed a formatter or 'false'.");
            }));
            parsed.tooltips = entry;
        }
    }
    function testHandleAttributes(parsed, entry) {
        if (entry.length !== parsed.handles) throw new Error("noUiSlider: must pass a attributes for all handles.");
        parsed.handleAttributes = entry;
    }
    function testAriaFormat(parsed, entry) {
        if (!isValidPartialFormatter(entry)) throw new Error("noUiSlider: 'ariaFormat' requires 'to' method.");
        parsed.ariaFormat = entry;
    }
    function testFormat(parsed, entry) {
        if (!isValidFormatter(entry)) throw new Error("noUiSlider: 'format' requires 'to' and 'from' methods.");
        parsed.format = entry;
    }
    function testKeyboardSupport(parsed, entry) {
        if (typeof entry !== "boolean") throw new Error("noUiSlider: 'keyboardSupport' option must be a boolean.");
        parsed.keyboardSupport = entry;
    }
    function testDocumentElement(parsed, entry) {
        parsed.documentElement = entry;
    }
    function testCssPrefix(parsed, entry) {
        if (typeof entry !== "string" && entry !== false) throw new Error("noUiSlider: 'cssPrefix' must be a string or `false`.");
        parsed.cssPrefix = entry;
    }
    function testCssClasses(parsed, entry) {
        if (typeof entry !== "object") throw new Error("noUiSlider: 'cssClasses' must be an object.");
        if (typeof parsed.cssPrefix === "string") {
            parsed.cssClasses = {};
            Object.keys(entry).forEach((function(key) {
                parsed.cssClasses[key] = parsed.cssPrefix + entry[key];
            }));
        } else parsed.cssClasses = entry;
    }
    function testOptions(options) {
        var parsed = {
            margin: null,
            limit: null,
            padding: null,
            animate: true,
            animationDuration: 300,
            ariaFormat: defaultFormatter,
            format: defaultFormatter
        };
        var tests = {
            step: {
                r: false,
                t: testStep
            },
            keyboardPageMultiplier: {
                r: false,
                t: testKeyboardPageMultiplier
            },
            keyboardMultiplier: {
                r: false,
                t: testKeyboardMultiplier
            },
            keyboardDefaultStep: {
                r: false,
                t: testKeyboardDefaultStep
            },
            start: {
                r: true,
                t: testStart
            },
            connect: {
                r: true,
                t: testConnect
            },
            direction: {
                r: true,
                t: testDirection
            },
            snap: {
                r: false,
                t: testSnap
            },
            animate: {
                r: false,
                t: testAnimate
            },
            animationDuration: {
                r: false,
                t: testAnimationDuration
            },
            range: {
                r: true,
                t: testRange
            },
            orientation: {
                r: false,
                t: testOrientation
            },
            margin: {
                r: false,
                t: testMargin
            },
            limit: {
                r: false,
                t: testLimit
            },
            padding: {
                r: false,
                t: testPadding
            },
            behaviour: {
                r: true,
                t: testBehaviour
            },
            ariaFormat: {
                r: false,
                t: testAriaFormat
            },
            format: {
                r: false,
                t: testFormat
            },
            tooltips: {
                r: false,
                t: testTooltips
            },
            keyboardSupport: {
                r: true,
                t: testKeyboardSupport
            },
            documentElement: {
                r: false,
                t: testDocumentElement
            },
            cssPrefix: {
                r: true,
                t: testCssPrefix
            },
            cssClasses: {
                r: true,
                t: testCssClasses
            },
            handleAttributes: {
                r: false,
                t: testHandleAttributes
            }
        };
        var defaults = {
            connect: false,
            direction: "ltr",
            behaviour: "tap",
            orientation: "horizontal",
            keyboardSupport: true,
            cssPrefix: "noUi-",
            cssClasses,
            keyboardPageMultiplier: 5,
            keyboardMultiplier: 1,
            keyboardDefaultStep: 10
        };
        if (options.format && !options.ariaFormat) options.ariaFormat = options.format;
        Object.keys(tests).forEach((function(name) {
            if (!isSet(options[name]) && defaults[name] === void 0) {
                if (tests[name].r) throw new Error("noUiSlider: '" + name + "' is required.");
                return;
            }
            tests[name].t(parsed, !isSet(options[name]) ? defaults[name] : options[name]);
        }));
        parsed.pips = options.pips;
        var d = document.createElement("div");
        var msPrefix = d.style.msTransform !== void 0;
        var noPrefix = d.style.transform !== void 0;
        parsed.transformRule = noPrefix ? "transform" : msPrefix ? "msTransform" : "webkitTransform";
        var styles = [ [ "left", "top" ], [ "right", "bottom" ] ];
        parsed.style = styles[parsed.dir][parsed.ort];
        return parsed;
    }
    function scope(target, options, originalOptions) {
        var actions = getActions();
        var supportsTouchActionNone = getSupportsTouchActionNone();
        var supportsPassive = supportsTouchActionNone && getSupportsPassive();
        var scope_Target = target;
        var scope_Base;
        var scope_Handles;
        var scope_Connects;
        var scope_Pips;
        var scope_Tooltips;
        var scope_Spectrum = options.spectrum;
        var scope_Values = [];
        var scope_Locations = [];
        var scope_HandleNumbers = [];
        var scope_ActiveHandlesCount = 0;
        var scope_Events = {};
        var scope_Document = target.ownerDocument;
        var scope_DocumentElement = options.documentElement || scope_Document.documentElement;
        var scope_Body = scope_Document.body;
        var scope_DirOffset = scope_Document.dir === "rtl" || options.ort === 1 ? 0 : 100;
        function addNodeTo(addTarget, className) {
            var div = scope_Document.createElement("div");
            if (className) addClass(div, className);
            addTarget.appendChild(div);
            return div;
        }
        function addOrigin(base, handleNumber) {
            var origin = addNodeTo(base, options.cssClasses.origin);
            var handle = addNodeTo(origin, options.cssClasses.handle);
            addNodeTo(handle, options.cssClasses.touchArea);
            handle.setAttribute("data-handle", String(handleNumber));
            if (options.keyboardSupport) {
                handle.setAttribute("tabindex", "0");
                handle.addEventListener("keydown", (function(event) {
                    return eventKeydown(event, handleNumber);
                }));
            }
            if (options.handleAttributes !== void 0) {
                var attributes_1 = options.handleAttributes[handleNumber];
                Object.keys(attributes_1).forEach((function(attribute) {
                    handle.setAttribute(attribute, attributes_1[attribute]);
                }));
            }
            handle.setAttribute("role", "slider");
            handle.setAttribute("aria-orientation", options.ort ? "vertical" : "horizontal");
            if (handleNumber === 0) addClass(handle, options.cssClasses.handleLower); else if (handleNumber === options.handles - 1) addClass(handle, options.cssClasses.handleUpper);
            origin.handle = handle;
            return origin;
        }
        function addConnect(base, add) {
            if (!add) return false;
            return addNodeTo(base, options.cssClasses.connect);
        }
        function addElements(connectOptions, base) {
            var connectBase = addNodeTo(base, options.cssClasses.connects);
            scope_Handles = [];
            scope_Connects = [];
            scope_Connects.push(addConnect(connectBase, connectOptions[0]));
            for (var i = 0; i < options.handles; i++) {
                scope_Handles.push(addOrigin(base, i));
                scope_HandleNumbers[i] = i;
                scope_Connects.push(addConnect(connectBase, connectOptions[i + 1]));
            }
        }
        function addSlider(addTarget) {
            addClass(addTarget, options.cssClasses.target);
            if (options.dir === 0) addClass(addTarget, options.cssClasses.ltr); else addClass(addTarget, options.cssClasses.rtl);
            if (options.ort === 0) addClass(addTarget, options.cssClasses.horizontal); else addClass(addTarget, options.cssClasses.vertical);
            var textDirection = getComputedStyle(addTarget).direction;
            if (textDirection === "rtl") addClass(addTarget, options.cssClasses.textDirectionRtl); else addClass(addTarget, options.cssClasses.textDirectionLtr);
            return addNodeTo(addTarget, options.cssClasses.base);
        }
        function addTooltip(handle, handleNumber) {
            if (!options.tooltips || !options.tooltips[handleNumber]) return false;
            return addNodeTo(handle.firstChild, options.cssClasses.tooltip);
        }
        function isSliderDisabled() {
            return scope_Target.hasAttribute("disabled");
        }
        function isHandleDisabled(handleNumber) {
            var handleOrigin = scope_Handles[handleNumber];
            return handleOrigin.hasAttribute("disabled");
        }
        function disable(handleNumber) {
            if (handleNumber !== null && handleNumber !== void 0) {
                scope_Handles[handleNumber].setAttribute("disabled", "");
                scope_Handles[handleNumber].handle.removeAttribute("tabindex");
            } else {
                scope_Target.setAttribute("disabled", "");
                scope_Handles.forEach((function(handle) {
                    handle.handle.removeAttribute("tabindex");
                }));
            }
        }
        function enable(handleNumber) {
            if (handleNumber !== null && handleNumber !== void 0) {
                scope_Handles[handleNumber].removeAttribute("disabled");
                scope_Handles[handleNumber].handle.setAttribute("tabindex", "0");
            } else {
                scope_Target.removeAttribute("disabled");
                scope_Handles.forEach((function(handle) {
                    handle.removeAttribute("disabled");
                    handle.handle.setAttribute("tabindex", "0");
                }));
            }
        }
        function removeTooltips() {
            if (scope_Tooltips) {
                removeEvent("update" + INTERNAL_EVENT_NS.tooltips);
                scope_Tooltips.forEach((function(tooltip) {
                    if (tooltip) removeElement(tooltip);
                }));
                scope_Tooltips = null;
            }
        }
        function tooltips() {
            removeTooltips();
            scope_Tooltips = scope_Handles.map(addTooltip);
            bindEvent("update" + INTERNAL_EVENT_NS.tooltips, (function(values, handleNumber, unencoded) {
                if (!scope_Tooltips || !options.tooltips) return;
                if (scope_Tooltips[handleNumber] === false) return;
                var formattedValue = values[handleNumber];
                if (options.tooltips[handleNumber] !== true) formattedValue = options.tooltips[handleNumber].to(unencoded[handleNumber]);
                scope_Tooltips[handleNumber].innerHTML = formattedValue;
            }));
        }
        function aria() {
            removeEvent("update" + INTERNAL_EVENT_NS.aria);
            bindEvent("update" + INTERNAL_EVENT_NS.aria, (function(values, handleNumber, unencoded, tap, positions) {
                scope_HandleNumbers.forEach((function(index) {
                    var handle = scope_Handles[index];
                    var min = checkHandlePosition(scope_Locations, index, 0, true, true, true);
                    var max = checkHandlePosition(scope_Locations, index, 100, true, true, true);
                    var now = positions[index];
                    var text = String(options.ariaFormat.to(unencoded[index]));
                    min = scope_Spectrum.fromStepping(min).toFixed(1);
                    max = scope_Spectrum.fromStepping(max).toFixed(1);
                    now = scope_Spectrum.fromStepping(now).toFixed(1);
                    handle.children[0].setAttribute("aria-valuemin", min);
                    handle.children[0].setAttribute("aria-valuemax", max);
                    handle.children[0].setAttribute("aria-valuenow", now);
                    handle.children[0].setAttribute("aria-valuetext", text);
                }));
            }));
        }
        function getGroup(pips) {
            if (pips.mode === PipsMode.Range || pips.mode === PipsMode.Steps) return scope_Spectrum.xVal;
            if (pips.mode === PipsMode.Count) {
                if (pips.values < 2) throw new Error("noUiSlider: 'values' (>= 2) required for mode 'count'.");
                var interval = pips.values - 1;
                var spread = 100 / interval;
                var values = [];
                while (interval--) values[interval] = interval * spread;
                values.push(100);
                return mapToRange(values, pips.stepped);
            }
            if (pips.mode === PipsMode.Positions) return mapToRange(pips.values, pips.stepped);
            if (pips.mode === PipsMode.Values) {
                if (pips.stepped) return pips.values.map((function(value) {
                    return scope_Spectrum.fromStepping(scope_Spectrum.getStep(scope_Spectrum.toStepping(value)));
                }));
                return pips.values;
            }
            return [];
        }
        function mapToRange(values, stepped) {
            return values.map((function(value) {
                return scope_Spectrum.fromStepping(stepped ? scope_Spectrum.getStep(value) : value);
            }));
        }
        function generateSpread(pips) {
            function safeIncrement(value, increment) {
                return Number((value + increment).toFixed(7));
            }
            var group = getGroup(pips);
            var indexes = {};
            var firstInRange = scope_Spectrum.xVal[0];
            var lastInRange = scope_Spectrum.xVal[scope_Spectrum.xVal.length - 1];
            var ignoreFirst = false;
            var ignoreLast = false;
            var prevPct = 0;
            group = unique(group.slice().sort((function(a, b) {
                return a - b;
            })));
            if (group[0] !== firstInRange) {
                group.unshift(firstInRange);
                ignoreFirst = true;
            }
            if (group[group.length - 1] !== lastInRange) {
                group.push(lastInRange);
                ignoreLast = true;
            }
            group.forEach((function(current, index) {
                var step;
                var i;
                var q;
                var low = current;
                var high = group[index + 1];
                var newPct;
                var pctDifference;
                var pctPos;
                var type;
                var steps;
                var realSteps;
                var stepSize;
                var isSteps = pips.mode === PipsMode.Steps;
                if (isSteps) step = scope_Spectrum.xNumSteps[index];
                if (!step) step = high - low;
                if (high === void 0) high = low;
                step = Math.max(step, 1e-7);
                for (i = low; i <= high; i = safeIncrement(i, step)) {
                    newPct = scope_Spectrum.toStepping(i);
                    pctDifference = newPct - prevPct;
                    steps = pctDifference / (pips.density || 1);
                    realSteps = Math.round(steps);
                    stepSize = pctDifference / realSteps;
                    for (q = 1; q <= realSteps; q += 1) {
                        pctPos = prevPct + q * stepSize;
                        indexes[pctPos.toFixed(5)] = [ scope_Spectrum.fromStepping(pctPos), 0 ];
                    }
                    type = group.indexOf(i) > -1 ? PipsType.LargeValue : isSteps ? PipsType.SmallValue : PipsType.NoValue;
                    if (!index && ignoreFirst && i !== high) type = 0;
                    if (!(i === high && ignoreLast)) indexes[newPct.toFixed(5)] = [ i, type ];
                    prevPct = newPct;
                }
            }));
            return indexes;
        }
        function addMarking(spread, filterFunc, formatter) {
            var _a, _b;
            var element = scope_Document.createElement("div");
            var valueSizeClasses = (_a = {}, _a[PipsType.None] = "", _a[PipsType.NoValue] = options.cssClasses.valueNormal, 
            _a[PipsType.LargeValue] = options.cssClasses.valueLarge, _a[PipsType.SmallValue] = options.cssClasses.valueSub, 
            _a);
            var markerSizeClasses = (_b = {}, _b[PipsType.None] = "", _b[PipsType.NoValue] = options.cssClasses.markerNormal, 
            _b[PipsType.LargeValue] = options.cssClasses.markerLarge, _b[PipsType.SmallValue] = options.cssClasses.markerSub, 
            _b);
            var valueOrientationClasses = [ options.cssClasses.valueHorizontal, options.cssClasses.valueVertical ];
            var markerOrientationClasses = [ options.cssClasses.markerHorizontal, options.cssClasses.markerVertical ];
            addClass(element, options.cssClasses.pips);
            addClass(element, options.ort === 0 ? options.cssClasses.pipsHorizontal : options.cssClasses.pipsVertical);
            function getClasses(type, source) {
                var a = source === options.cssClasses.value;
                var orientationClasses = a ? valueOrientationClasses : markerOrientationClasses;
                var sizeClasses = a ? valueSizeClasses : markerSizeClasses;
                return source + " " + orientationClasses[options.ort] + " " + sizeClasses[type];
            }
            function addSpread(offset, value, type) {
                type = filterFunc ? filterFunc(value, type) : type;
                if (type === PipsType.None) return;
                var node = addNodeTo(element, false);
                node.className = getClasses(type, options.cssClasses.marker);
                node.style[options.style] = offset + "%";
                if (type > PipsType.NoValue) {
                    node = addNodeTo(element, false);
                    node.className = getClasses(type, options.cssClasses.value);
                    node.setAttribute("data-value", String(value));
                    node.style[options.style] = offset + "%";
                    node.innerHTML = String(formatter.to(value));
                }
            }
            Object.keys(spread).forEach((function(offset) {
                addSpread(offset, spread[offset][0], spread[offset][1]);
            }));
            return element;
        }
        function removePips() {
            if (scope_Pips) {
                removeElement(scope_Pips);
                scope_Pips = null;
            }
        }
        function pips(pips) {
            removePips();
            var spread = generateSpread(pips);
            var filter = pips.filter;
            var format = pips.format || {
                to: function(value) {
                    return String(Math.round(value));
                }
            };
            scope_Pips = scope_Target.appendChild(addMarking(spread, filter, format));
            return scope_Pips;
        }
        function baseSize() {
            var rect = scope_Base.getBoundingClientRect();
            var alt = "offset" + [ "Width", "Height" ][options.ort];
            return options.ort === 0 ? rect.width || scope_Base[alt] : rect.height || scope_Base[alt];
        }
        function attachEvent(events, element, callback, data) {
            var method = function(event) {
                var e = fixEvent(event, data.pageOffset, data.target || element);
                if (!e) return false;
                if (isSliderDisabled() && !data.doNotReject) return false;
                if (hasClass(scope_Target, options.cssClasses.tap) && !data.doNotReject) return false;
                if (events === actions.start && e.buttons !== void 0 && e.buttons > 1) return false;
                if (data.hover && e.buttons) return false;
                if (!supportsPassive) e.preventDefault();
                e.calcPoint = e.points[options.ort];
                callback(e, data);
                return;
            };
            var methods = [];
            events.split(" ").forEach((function(eventName) {
                element.addEventListener(eventName, method, supportsPassive ? {
                    passive: true
                } : false);
                methods.push([ eventName, method ]);
            }));
            return methods;
        }
        function fixEvent(e, pageOffset, eventTarget) {
            var touch = e.type.indexOf("touch") === 0;
            var mouse = e.type.indexOf("mouse") === 0;
            var pointer = e.type.indexOf("pointer") === 0;
            var x = 0;
            var y = 0;
            if (e.type.indexOf("MSPointer") === 0) pointer = true;
            if (e.type === "mousedown" && !e.buttons && !e.touches) return false;
            if (touch) {
                var isTouchOnTarget = function(checkTouch) {
                    var target = checkTouch.target;
                    return target === eventTarget || eventTarget.contains(target) || e.composed && e.composedPath().shift() === eventTarget;
                };
                if (e.type === "touchstart") {
                    var targetTouches = Array.prototype.filter.call(e.touches, isTouchOnTarget);
                    if (targetTouches.length > 1) return false;
                    x = targetTouches[0].pageX;
                    y = targetTouches[0].pageY;
                } else {
                    var targetTouch = Array.prototype.find.call(e.changedTouches, isTouchOnTarget);
                    if (!targetTouch) return false;
                    x = targetTouch.pageX;
                    y = targetTouch.pageY;
                }
            }
            pageOffset = pageOffset || getPageOffset(scope_Document);
            if (mouse || pointer) {
                x = e.clientX + pageOffset.x;
                y = e.clientY + pageOffset.y;
            }
            e.pageOffset = pageOffset;
            e.points = [ x, y ];
            e.cursor = mouse || pointer;
            return e;
        }
        function calcPointToPercentage(calcPoint) {
            var location = calcPoint - nouislider_offset(scope_Base, options.ort);
            var proposal = location * 100 / baseSize();
            proposal = limit(proposal);
            return options.dir ? 100 - proposal : proposal;
        }
        function getClosestHandle(clickedPosition) {
            var smallestDifference = 100;
            var handleNumber = false;
            scope_Handles.forEach((function(handle, index) {
                if (isHandleDisabled(index)) return;
                var handlePosition = scope_Locations[index];
                var differenceWithThisHandle = Math.abs(handlePosition - clickedPosition);
                var clickAtEdge = differenceWithThisHandle === 100 && smallestDifference === 100;
                var isCloser = differenceWithThisHandle < smallestDifference;
                var isCloserAfter = differenceWithThisHandle <= smallestDifference && clickedPosition > handlePosition;
                if (isCloser || isCloserAfter || clickAtEdge) {
                    handleNumber = index;
                    smallestDifference = differenceWithThisHandle;
                }
            }));
            return handleNumber;
        }
        function documentLeave(event, data) {
            if (event.type === "mouseout" && event.target.nodeName === "HTML" && event.relatedTarget === null) eventEnd(event, data);
        }
        function eventMove(event, data) {
            if (navigator.appVersion.indexOf("MSIE 9") === -1 && event.buttons === 0 && data.buttonsProperty !== 0) return eventEnd(event, data);
            var movement = (options.dir ? -1 : 1) * (event.calcPoint - data.startCalcPoint);
            var proposal = movement * 100 / data.baseSize;
            moveHandles(movement > 0, proposal, data.locations, data.handleNumbers, data.connect);
        }
        function eventEnd(event, data) {
            if (data.handle) {
                removeClass(data.handle, options.cssClasses.active);
                scope_ActiveHandlesCount -= 1;
            }
            data.listeners.forEach((function(c) {
                scope_DocumentElement.removeEventListener(c[0], c[1]);
            }));
            if (scope_ActiveHandlesCount === 0) {
                removeClass(scope_Target, options.cssClasses.drag);
                setZindex();
                if (event.cursor) {
                    scope_Body.style.cursor = "";
                    scope_Body.removeEventListener("selectstart", preventDefault);
                }
            }
            if (options.events.smoothSteps) {
                data.handleNumbers.forEach((function(handleNumber) {
                    setHandle(handleNumber, scope_Locations[handleNumber], true, true, false, false);
                }));
                data.handleNumbers.forEach((function(handleNumber) {
                    fireEvent("update", handleNumber);
                }));
            }
            data.handleNumbers.forEach((function(handleNumber) {
                fireEvent("change", handleNumber);
                fireEvent("set", handleNumber);
                fireEvent("end", handleNumber);
            }));
        }
        function eventStart(event, data) {
            if (data.handleNumbers.some(isHandleDisabled)) return;
            var handle;
            if (data.handleNumbers.length === 1) {
                var handleOrigin = scope_Handles[data.handleNumbers[0]];
                handle = handleOrigin.children[0];
                scope_ActiveHandlesCount += 1;
                addClass(handle, options.cssClasses.active);
            }
            event.stopPropagation();
            var listeners = [];
            var moveEvent = attachEvent(actions.move, scope_DocumentElement, eventMove, {
                target: event.target,
                handle,
                connect: data.connect,
                listeners,
                startCalcPoint: event.calcPoint,
                baseSize: baseSize(),
                pageOffset: event.pageOffset,
                handleNumbers: data.handleNumbers,
                buttonsProperty: event.buttons,
                locations: scope_Locations.slice()
            });
            var endEvent = attachEvent(actions.end, scope_DocumentElement, eventEnd, {
                target: event.target,
                handle,
                listeners,
                doNotReject: true,
                handleNumbers: data.handleNumbers
            });
            var outEvent = attachEvent("mouseout", scope_DocumentElement, documentLeave, {
                target: event.target,
                handle,
                listeners,
                doNotReject: true,
                handleNumbers: data.handleNumbers
            });
            listeners.push.apply(listeners, moveEvent.concat(endEvent, outEvent));
            if (event.cursor) {
                scope_Body.style.cursor = getComputedStyle(event.target).cursor;
                if (scope_Handles.length > 1) addClass(scope_Target, options.cssClasses.drag);
                scope_Body.addEventListener("selectstart", preventDefault, false);
            }
            data.handleNumbers.forEach((function(handleNumber) {
                fireEvent("start", handleNumber);
            }));
        }
        function eventTap(event) {
            event.stopPropagation();
            var proposal = calcPointToPercentage(event.calcPoint);
            var handleNumber = getClosestHandle(proposal);
            if (handleNumber === false) return;
            if (!options.events.snap) addClassFor(scope_Target, options.cssClasses.tap, options.animationDuration);
            setHandle(handleNumber, proposal, true, true);
            setZindex();
            fireEvent("slide", handleNumber, true);
            fireEvent("update", handleNumber, true);
            if (!options.events.snap) {
                fireEvent("change", handleNumber, true);
                fireEvent("set", handleNumber, true);
            } else eventStart(event, {
                handleNumbers: [ handleNumber ]
            });
        }
        function eventHover(event) {
            var proposal = calcPointToPercentage(event.calcPoint);
            var to = scope_Spectrum.getStep(proposal);
            var value = scope_Spectrum.fromStepping(to);
            Object.keys(scope_Events).forEach((function(targetEvent) {
                if ("hover" === targetEvent.split(".")[0]) scope_Events[targetEvent].forEach((function(callback) {
                    callback.call(scope_Self, value);
                }));
            }));
        }
        function eventKeydown(event, handleNumber) {
            if (isSliderDisabled() || isHandleDisabled(handleNumber)) return false;
            var horizontalKeys = [ "Left", "Right" ];
            var verticalKeys = [ "Down", "Up" ];
            var largeStepKeys = [ "PageDown", "PageUp" ];
            var edgeKeys = [ "Home", "End" ];
            if (options.dir && !options.ort) horizontalKeys.reverse(); else if (options.ort && !options.dir) {
                verticalKeys.reverse();
                largeStepKeys.reverse();
            }
            var key = event.key.replace("Arrow", "");
            var isLargeDown = key === largeStepKeys[0];
            var isLargeUp = key === largeStepKeys[1];
            var isDown = key === verticalKeys[0] || key === horizontalKeys[0] || isLargeDown;
            var isUp = key === verticalKeys[1] || key === horizontalKeys[1] || isLargeUp;
            var isMin = key === edgeKeys[0];
            var isMax = key === edgeKeys[1];
            if (!isDown && !isUp && !isMin && !isMax) return true;
            event.preventDefault();
            var to;
            if (isUp || isDown) {
                var direction = isDown ? 0 : 1;
                var steps = getNextStepsForHandle(handleNumber);
                var step = steps[direction];
                if (step === null) return false;
                if (step === false) step = scope_Spectrum.getDefaultStep(scope_Locations[handleNumber], isDown, options.keyboardDefaultStep);
                if (isLargeUp || isLargeDown) step *= options.keyboardPageMultiplier; else step *= options.keyboardMultiplier;
                step = Math.max(step, 1e-7);
                step *= isDown ? -1 : 1;
                to = scope_Values[handleNumber] + step;
            } else if (isMax) to = options.spectrum.xVal[options.spectrum.xVal.length - 1]; else to = options.spectrum.xVal[0];
            setHandle(handleNumber, scope_Spectrum.toStepping(to), true, true);
            fireEvent("slide", handleNumber);
            fireEvent("update", handleNumber);
            fireEvent("change", handleNumber);
            fireEvent("set", handleNumber);
            return false;
        }
        function bindSliderEvents(behaviour) {
            if (!behaviour.fixed) scope_Handles.forEach((function(handle, index) {
                attachEvent(actions.start, handle.children[0], eventStart, {
                    handleNumbers: [ index ]
                });
            }));
            if (behaviour.tap) attachEvent(actions.start, scope_Base, eventTap, {});
            if (behaviour.hover) attachEvent(actions.move, scope_Base, eventHover, {
                hover: true
            });
            if (behaviour.drag) scope_Connects.forEach((function(connect, index) {
                if (connect === false || index === 0 || index === scope_Connects.length - 1) return;
                var handleBefore = scope_Handles[index - 1];
                var handleAfter = scope_Handles[index];
                var eventHolders = [ connect ];
                var handlesToDrag = [ handleBefore, handleAfter ];
                var handleNumbersToDrag = [ index - 1, index ];
                addClass(connect, options.cssClasses.draggable);
                if (behaviour.fixed) {
                    eventHolders.push(handleBefore.children[0]);
                    eventHolders.push(handleAfter.children[0]);
                }
                if (behaviour.dragAll) {
                    handlesToDrag = scope_Handles;
                    handleNumbersToDrag = scope_HandleNumbers;
                }
                eventHolders.forEach((function(eventHolder) {
                    attachEvent(actions.start, eventHolder, eventStart, {
                        handles: handlesToDrag,
                        handleNumbers: handleNumbersToDrag,
                        connect
                    });
                }));
            }));
        }
        function bindEvent(namespacedEvent, callback) {
            scope_Events[namespacedEvent] = scope_Events[namespacedEvent] || [];
            scope_Events[namespacedEvent].push(callback);
            if (namespacedEvent.split(".")[0] === "update") scope_Handles.forEach((function(a, index) {
                fireEvent("update", index);
            }));
        }
        function isInternalNamespace(namespace) {
            return namespace === INTERNAL_EVENT_NS.aria || namespace === INTERNAL_EVENT_NS.tooltips;
        }
        function removeEvent(namespacedEvent) {
            var event = namespacedEvent && namespacedEvent.split(".")[0];
            var namespace = event ? namespacedEvent.substring(event.length) : namespacedEvent;
            Object.keys(scope_Events).forEach((function(bind) {
                var tEvent = bind.split(".")[0];
                var tNamespace = bind.substring(tEvent.length);
                if ((!event || event === tEvent) && (!namespace || namespace === tNamespace)) if (!isInternalNamespace(tNamespace) || namespace === tNamespace) delete scope_Events[bind];
            }));
        }
        function fireEvent(eventName, handleNumber, tap) {
            Object.keys(scope_Events).forEach((function(targetEvent) {
                var eventType = targetEvent.split(".")[0];
                if (eventName === eventType) scope_Events[targetEvent].forEach((function(callback) {
                    callback.call(scope_Self, scope_Values.map(options.format.to), handleNumber, scope_Values.slice(), tap || false, scope_Locations.slice(), scope_Self);
                }));
            }));
        }
        function checkHandlePosition(reference, handleNumber, to, lookBackward, lookForward, getValue, smoothSteps) {
            var distance;
            if (scope_Handles.length > 1 && !options.events.unconstrained) {
                if (lookBackward && handleNumber > 0) {
                    distance = scope_Spectrum.getAbsoluteDistance(reference[handleNumber - 1], options.margin, false);
                    to = Math.max(to, distance);
                }
                if (lookForward && handleNumber < scope_Handles.length - 1) {
                    distance = scope_Spectrum.getAbsoluteDistance(reference[handleNumber + 1], options.margin, true);
                    to = Math.min(to, distance);
                }
            }
            if (scope_Handles.length > 1 && options.limit) {
                if (lookBackward && handleNumber > 0) {
                    distance = scope_Spectrum.getAbsoluteDistance(reference[handleNumber - 1], options.limit, false);
                    to = Math.min(to, distance);
                }
                if (lookForward && handleNumber < scope_Handles.length - 1) {
                    distance = scope_Spectrum.getAbsoluteDistance(reference[handleNumber + 1], options.limit, true);
                    to = Math.max(to, distance);
                }
            }
            if (options.padding) {
                if (handleNumber === 0) {
                    distance = scope_Spectrum.getAbsoluteDistance(0, options.padding[0], false);
                    to = Math.max(to, distance);
                }
                if (handleNumber === scope_Handles.length - 1) {
                    distance = scope_Spectrum.getAbsoluteDistance(100, options.padding[1], true);
                    to = Math.min(to, distance);
                }
            }
            if (!smoothSteps) to = scope_Spectrum.getStep(to);
            to = limit(to);
            if (to === reference[handleNumber] && !getValue) return false;
            return to;
        }
        function inRuleOrder(v, a) {
            var o = options.ort;
            return (o ? a : v) + ", " + (o ? v : a);
        }
        function moveHandles(upward, proposal, locations, handleNumbers, connect) {
            var proposals = locations.slice();
            var firstHandle = handleNumbers[0];
            var smoothSteps = options.events.smoothSteps;
            var b = [ !upward, upward ];
            var f = [ upward, !upward ];
            handleNumbers = handleNumbers.slice();
            if (upward) handleNumbers.reverse();
            if (handleNumbers.length > 1) handleNumbers.forEach((function(handleNumber, o) {
                var to = checkHandlePosition(proposals, handleNumber, proposals[handleNumber] + proposal, b[o], f[o], false, smoothSteps);
                if (to === false) proposal = 0; else {
                    proposal = to - proposals[handleNumber];
                    proposals[handleNumber] = to;
                }
            })); else b = f = [ true ];
            var state = false;
            handleNumbers.forEach((function(handleNumber, o) {
                state = setHandle(handleNumber, locations[handleNumber] + proposal, b[o], f[o], false, smoothSteps) || state;
            }));
            if (state) {
                handleNumbers.forEach((function(handleNumber) {
                    fireEvent("update", handleNumber);
                    fireEvent("slide", handleNumber);
                }));
                if (connect != void 0) fireEvent("drag", firstHandle);
            }
        }
        function transformDirection(a, b) {
            return options.dir ? 100 - a - b : a;
        }
        function updateHandlePosition(handleNumber, to) {
            scope_Locations[handleNumber] = to;
            scope_Values[handleNumber] = scope_Spectrum.fromStepping(to);
            var translation = transformDirection(to, 0) - scope_DirOffset;
            var translateRule = "translate(" + inRuleOrder(translation + "%", "0") + ")";
            scope_Handles[handleNumber].style[options.transformRule] = translateRule;
            updateConnect(handleNumber);
            updateConnect(handleNumber + 1);
        }
        function setZindex() {
            scope_HandleNumbers.forEach((function(handleNumber) {
                var dir = scope_Locations[handleNumber] > 50 ? -1 : 1;
                var zIndex = 3 + (scope_Handles.length + dir * handleNumber);
                scope_Handles[handleNumber].style.zIndex = String(zIndex);
            }));
        }
        function setHandle(handleNumber, to, lookBackward, lookForward, exactInput, smoothSteps) {
            if (!exactInput) to = checkHandlePosition(scope_Locations, handleNumber, to, lookBackward, lookForward, false, smoothSteps);
            if (to === false) return false;
            updateHandlePosition(handleNumber, to);
            return true;
        }
        function updateConnect(index) {
            if (!scope_Connects[index]) return;
            var l = 0;
            var h = 100;
            if (index !== 0) l = scope_Locations[index - 1];
            if (index !== scope_Connects.length - 1) h = scope_Locations[index];
            var connectWidth = h - l;
            var translateRule = "translate(" + inRuleOrder(transformDirection(l, connectWidth) + "%", "0") + ")";
            var scaleRule = "scale(" + inRuleOrder(connectWidth / 100, "1") + ")";
            scope_Connects[index].style[options.transformRule] = translateRule + " " + scaleRule;
        }
        function resolveToValue(to, handleNumber) {
            if (to === null || to === false || to === void 0) return scope_Locations[handleNumber];
            if (typeof to === "number") to = String(to);
            to = options.format.from(to);
            if (to !== false) to = scope_Spectrum.toStepping(to);
            if (to === false || isNaN(to)) return scope_Locations[handleNumber];
            return to;
        }
        function valueSet(input, fireSetEvent, exactInput) {
            var values = asArray(input);
            var isInit = scope_Locations[0] === void 0;
            fireSetEvent = fireSetEvent === void 0 ? true : fireSetEvent;
            if (options.animate && !isInit) addClassFor(scope_Target, options.cssClasses.tap, options.animationDuration);
            scope_HandleNumbers.forEach((function(handleNumber) {
                setHandle(handleNumber, resolveToValue(values[handleNumber], handleNumber), true, false, exactInput);
            }));
            var i = scope_HandleNumbers.length === 1 ? 0 : 1;
            if (isInit && scope_Spectrum.hasNoSize()) {
                exactInput = true;
                scope_Locations[0] = 0;
                if (scope_HandleNumbers.length > 1) {
                    var space_1 = 100 / (scope_HandleNumbers.length - 1);
                    scope_HandleNumbers.forEach((function(handleNumber) {
                        scope_Locations[handleNumber] = handleNumber * space_1;
                    }));
                }
            }
            for (;i < scope_HandleNumbers.length; ++i) scope_HandleNumbers.forEach((function(handleNumber) {
                setHandle(handleNumber, scope_Locations[handleNumber], true, true, exactInput);
            }));
            setZindex();
            scope_HandleNumbers.forEach((function(handleNumber) {
                fireEvent("update", handleNumber);
                if (values[handleNumber] !== null && fireSetEvent) fireEvent("set", handleNumber);
            }));
        }
        function valueReset(fireSetEvent) {
            valueSet(options.start, fireSetEvent);
        }
        function valueSetHandle(handleNumber, value, fireSetEvent, exactInput) {
            handleNumber = Number(handleNumber);
            if (!(handleNumber >= 0 && handleNumber < scope_HandleNumbers.length)) throw new Error("noUiSlider: invalid handle number, got: " + handleNumber);
            setHandle(handleNumber, resolveToValue(value, handleNumber), true, true, exactInput);
            fireEvent("update", handleNumber);
            if (fireSetEvent) fireEvent("set", handleNumber);
        }
        function valueGet(unencoded) {
            if (unencoded === void 0) unencoded = false;
            if (unencoded) return scope_Values.length === 1 ? scope_Values[0] : scope_Values.slice(0);
            var values = scope_Values.map(options.format.to);
            if (values.length === 1) return values[0];
            return values;
        }
        function destroy() {
            removeEvent(INTERNAL_EVENT_NS.aria);
            removeEvent(INTERNAL_EVENT_NS.tooltips);
            Object.keys(options.cssClasses).forEach((function(key) {
                removeClass(scope_Target, options.cssClasses[key]);
            }));
            while (scope_Target.firstChild) scope_Target.removeChild(scope_Target.firstChild);
            delete scope_Target.noUiSlider;
        }
        function getNextStepsForHandle(handleNumber) {
            var location = scope_Locations[handleNumber];
            var nearbySteps = scope_Spectrum.getNearbySteps(location);
            var value = scope_Values[handleNumber];
            var increment = nearbySteps.thisStep.step;
            var decrement = null;
            if (options.snap) return [ value - nearbySteps.stepBefore.startValue || null, nearbySteps.stepAfter.startValue - value || null ];
            if (increment !== false) if (value + increment > nearbySteps.stepAfter.startValue) increment = nearbySteps.stepAfter.startValue - value;
            if (value > nearbySteps.thisStep.startValue) decrement = nearbySteps.thisStep.step; else if (nearbySteps.stepBefore.step === false) decrement = false; else decrement = value - nearbySteps.stepBefore.highestStep;
            if (location === 100) increment = null; else if (location === 0) decrement = null;
            var stepDecimals = scope_Spectrum.countStepDecimals();
            if (increment !== null && increment !== false) increment = Number(increment.toFixed(stepDecimals));
            if (decrement !== null && decrement !== false) decrement = Number(decrement.toFixed(stepDecimals));
            return [ decrement, increment ];
        }
        function getNextSteps() {
            return scope_HandleNumbers.map(getNextStepsForHandle);
        }
        function updateOptions(optionsToUpdate, fireSetEvent) {
            var v = valueGet();
            var updateAble = [ "margin", "limit", "padding", "range", "animate", "snap", "step", "format", "pips", "tooltips" ];
            updateAble.forEach((function(name) {
                if (optionsToUpdate[name] !== void 0) originalOptions[name] = optionsToUpdate[name];
            }));
            var newOptions = testOptions(originalOptions);
            updateAble.forEach((function(name) {
                if (optionsToUpdate[name] !== void 0) options[name] = newOptions[name];
            }));
            scope_Spectrum = newOptions.spectrum;
            options.margin = newOptions.margin;
            options.limit = newOptions.limit;
            options.padding = newOptions.padding;
            if (options.pips) pips(options.pips); else removePips();
            if (options.tooltips) tooltips(); else removeTooltips();
            scope_Locations = [];
            valueSet(isSet(optionsToUpdate.start) ? optionsToUpdate.start : v, fireSetEvent);
        }
        function setupSlider() {
            scope_Base = addSlider(scope_Target);
            addElements(options.connect, scope_Base);
            bindSliderEvents(options.events);
            valueSet(options.start);
            if (options.pips) pips(options.pips);
            if (options.tooltips) tooltips();
            aria();
        }
        setupSlider();
        var scope_Self = {
            destroy,
            steps: getNextSteps,
            on: bindEvent,
            off: removeEvent,
            get: valueGet,
            set: valueSet,
            setHandle: valueSetHandle,
            reset: valueReset,
            disable,
            enable,
            __moveHandles: function(upward, proposal, handleNumbers) {
                moveHandles(upward, proposal, scope_Locations, handleNumbers);
            },
            options: originalOptions,
            updateOptions,
            target: scope_Target,
            removePips,
            removeTooltips,
            getPositions: function() {
                return scope_Locations.slice();
            },
            getTooltips: function() {
                return scope_Tooltips;
            },
            getOrigins: function() {
                return scope_Handles;
            },
            pips
        };
        return scope_Self;
    }
    function initialize(target, originalOptions) {
        if (!target || !target.nodeName) throw new Error("noUiSlider: create requires a single element, got: " + target);
        if (target.noUiSlider) throw new Error("noUiSlider: Slider was already initialized.");
        var options = testOptions(originalOptions);
        var api = scope(target, options, originalOptions);
        target.noUiSlider = api;
        return api;
    }
    const nouislider = {
        __spectrum: Spectrum,
        cssClasses,
        create: initialize
    };
    const priceSlider = document.querySelector("#price-slider");
    if (priceSlider) nouislider.create(priceSlider, {
        start: [ 20, 80 ],
        connect: true,
        range: {
            min: 0,
            max: 100
        }
    });
    const filterTitle = document.querySelectorAll(".catalog-filter .jsFilterTitle");
    if (filterTitle) filterTitle.forEach((item => {
        item.addEventListener("click", (event => {
            item.closest(".catalog-filter__item").classList.toggle("is-open");
        }));
    }));
    const filterToggle = document.querySelector(".catalog__controls .jsToggleFilter");
    const catalogFilter = document.querySelector(".catalog__filter");
    document.querySelector(".filter-header__close");
    if (filterToggle) filterToggle.addEventListener("click", (() => {
        catalogFilter.classList.add("is-open");
        document.body.style.overflow = "hidden";
        catalogFilter.addEventListener("click", (event => {
            const {target} = event;
            if (target === document.querySelector(".jsCloseFilter")) {
                catalogFilter.classList.remove("is-open");
                document.body.style.overflow = "auto";
            }
        }));
        window.addEventListener("keyup", (event => {
            if (event.code === "Escape" && catalogFilter.classList.contains("is-open")) {
                catalogFilter.classList.remove("is-open");
                document.body.style.overflow = "auto";
            }
        }));
    }));
    const toggler = document.querySelector(".catalog__controls .jsToggleViews");
    const catalogMosaicView = document.querySelector(".catalog__controls .jsMosaicView");
    const catalogListView = document.querySelector(".catalog__controls .jsListView");
    const catalogInner = document.querySelector(".jsCatalogInner");
    const buyBtn = document.querySelectorAll(".item-pricing__btn .button__text");
    function textChange() {
        if (buyBtn && window.innerWidth <= 625) buyBtn.forEach((item => {
            if (item.parentNode.dataset.bsToggle !== "modal") item.innerHTML = '<svg><use xlink:href="img/icons/icons.svg#buy-cart"></use></svg>'; else item.innerHTML = '<svg><use xlink:href="img/icons/icons.svg#bell"></use></svg>';
        })); else buyBtn.forEach((item => {
            if (item.parentNode.dataset.bsToggle !== "modal") item.innerHTML = "Купить"; else item.innerHTML = "Уведомить";
        }));
        if (catalogInner && catalogInner.classList.contains("mosaic")) buyBtn.forEach((item => {
            if (item.parentNode.dataset.bsToggle !== "modal") item.innerHTML = "Купить"; else item.innerHTML = "Уведомить";
        }));
    }
    textChange();
    window.addEventListener("resize", textChange);
    const toggleCatalogView = function() {
        if (toggler) {
            if (window.innerWidth <= 424) {
                toggler.style.display = "none";
                if (catalogInner.classList.contains("mosaic")) catalogInner.classList.remove("mosaic");
            } else {
                toggler.style.display = "flex";
                if (catalogMosaicView.classList.contains("active")) catalogInner.classList.add("mosaic");
            }
            catalogListView.addEventListener("click", (() => {
                if (!catalogListView.classList.contains("active")) {
                    catalogListView.classList.add("active");
                    catalogMosaicView.classList.remove("active");
                    catalogInner.classList.toggle("mosaic");
                }
                textChange();
            }));
            catalogMosaicView.addEventListener("click", (() => {
                if (!catalogMosaicView.classList.contains("active")) {
                    catalogMosaicView.classList.toggle("active");
                    catalogListView.classList.toggle("active");
                    catalogInner.classList.toggle("mosaic");
                }
                textChange();
            }));
        }
    };
    toggleCatalogView();
    window.addEventListener("resize", toggleCatalogView);
    const sortProduct = () => {
        const sortBox = document.querySelector('[data-box="sort-prod"]'), submenuItems = document.querySelectorAll('[data-box="sort-prod"] .sort-submenu-item');
        try {
            sortBox.addEventListener("click", (e => {
                let target = e.target;
                let title = sortBox.querySelector(".sort-list-title"), hiddenInput = sortBox.querySelector(".input");
                if (target.classList.contains("sort-list-title")) if (sortBox.classList.contains("active")) {
                    sortBox.classList.remove("active");
                    removeEventListener("click", closeMenu);
                    removeOverlay();
                } else {
                    sortBox.classList.add("active");
                    addEventListener("click", closeMenu);
                    addOverlay();
                }
                if (target.classList.contains("sort-submenu-item")) {
                    submenuItems.forEach((item => item.classList.remove("active")));
                    target.classList.add("active");
                    title.textContent = target.textContent;
                    hiddenInput.value = target.textContent;
                    removeEventListener("click", closeMenu);
                    sortBox.classList.remove("active");
                    removeOverlay();
                }
            }));
        } catch (e) {}
    };
    function closeMenu(event) {
        let target = event.target;
        let boxTarget = document.querySelector('[data-box="sort-prod"]');
        if (!boxTarget.contains(target)) {
            boxTarget.classList.remove("active");
            removeEventListener("click", closeMenu);
            removeOverlay();
        }
    }
    function addOverlay() {
        if (window.innerWidth < 561) {
            let overlayHtml = `<div class="overlay" data-box="overlay"></div>`;
            document.body.insertAdjacentHTML("beforeend", overlayHtml);
        }
    }
    function removeOverlay() {
        let overlay = document.querySelector('[data-box="overlay"]');
        if (overlay) overlay.remove();
    }
    sortProduct();
    const showMoreTags = document.querySelector(".jsTagsShowMore");
    if (showMoreTags) showMoreTags.addEventListener("click", (() => {
        document.querySelector(".catalog-tags").classList.toggle("is-open");
    }));
    const descriptionShowMore = document.querySelector(".jsDescriptionShowMore");
    const description = document.querySelector(".jsDescription");
    if (descriptionShowMore) descriptionShowMore.addEventListener("click", (() => {
        description.querySelectorAll("p").forEach((p => {
            p.style.display = "block";
            p.style.opacity = "1";
        }));
        descriptionShowMore.remove();
    }));
    const itemCard = document.querySelectorAll(".catalog-item");
    const moveStatusItem = function() {
        itemCard.forEach((item => {
            if (window.innerWidth <= 625 && item.querySelector(".item-pricing .item-pricing__status")) {
                const status = item.querySelector(".item-pricing .item-pricing__status");
                const tempItem = document.createElement("div");
                for (let i = 0; i < status.classList.length; i++) tempItem.classList.add(status.classList[i]);
                tempItem.innerHTML = status.innerHTML;
                item.querySelector(".catalog-item__title").after(tempItem);
                status.remove();
            } else if (window.innerWidth >= 625 && item.querySelector(".catalog-item__description .item-pricing__status")) {
                const status = item.querySelector(".catalog-item__description .item-pricing__status");
                const tempItem = document.createElement("div");
                for (let i = 0; i < status.classList.length; i++) tempItem.classList.add(status.classList[i]);
                tempItem.innerHTML = status.innerHTML;
                item.querySelector(".item-pricing__price").after(tempItem);
                status.remove();
            }
        }));
    };
    moveStatusItem();
    window.addEventListener("resize", moveStatusItem);
    const productQuantity = document.querySelector(".jsProductQuantity");
    const productMore = document.querySelector(".jsProductMore");
    const productMoreTab = document.querySelector(".jsProductMoreTab");
    if (productQuantity) productQuantity.value += " шт.";
    if (productMore) productMore.addEventListener("click", (e => {
        e.preventDefault();
        productMoreTab.click();
    }));
    const deliveryScrollBtn = document.querySelector(".jsDeliveryScrollBtn");
    const deliveryTab = document.querySelector(".jsDeliveryTab");
    if (deliveryScrollBtn) deliveryScrollBtn.addEventListener("click", (() => {
        deliveryTab.click();
    }));
    const colorChooseBtn = document.querySelector(".jsColorChoose");
    const colorChooseTab = document.querySelector(".jsColorChooseTab");
    if (colorChooseBtn) colorChooseBtn.addEventListener("click", (event => {
        event.preventDefault();
        colorChooseTab.click();
    }));
    const colorChooseToggle = document.querySelector(".jsColorChooseToggle");
    const colorChooseWrap = document.querySelector(".jsColorChooseWrap");
    if (colorChooseToggle) colorChooseToggle.addEventListener("click", (() => {
        colorChooseWrap.classList.add("is-open");
        document.body.style.overflow = "hidden";
        colorChooseWrap.addEventListener("click", (event => {
            const {target} = event;
            if (target.classList.contains("jsColorChooseWrap") || target.closest(".color-choose__submit")) {
                console.log(target);
                colorChooseWrap.classList.remove("is-open");
                document.body.style.overflow = "auto";
            }
        }));
    }));
    const heroBlock = document.querySelector(".product-hero__swiper");
    function heroDatasetToggle() {
        if (heroBlock) if (window.innerWidth < 960) heroBlock.dataset.bsToggle = ""; else if (window.innerWidth >= 960) heroBlock.dataset.bsToggle = "modal";
    }
    heroDatasetToggle();
    window.addEventListener("resize", heroDatasetToggle);
    const imageBlock = document.querySelector('[data-block="product-image-block"]');
    if (imageBlock) imageBlock.addEventListener("click", (() => {
        const getActiveSlide = function(selector) {
            let activeSlide = 0;
            for (let i = 0; i < selector.length; i++) if (selector[i].classList.contains("swiper-slide-active")) activeSlide = i;
            return activeSlide;
        };
        const heroSlides = document.querySelectorAll(".product-hero__main .product-hero__slide");
        let activeSlide = getActiveSlide(heroSlides);
        const heroModal = document.getElementById("hero");
        heroModal.querySelector(".modal-body").innerHTML = "";
        heroModal.querySelector(".modal-footer").innerHTML = "";
        const trackSlider = document.querySelector(".product-hero-track__slider");
        const heroSlider = document.querySelector(".product-hero__slider");
        const trackSliderWrap = document.createElement("div");
        const heroSliderWrap = document.createElement("div");
        heroSliderWrap.classList.add("modal-slider-main");
        trackSliderWrap.classList.add("modal-slider-track");
        const trackSliderNavPrev = document.createElement("div");
        const trackSliderNavNext = document.createElement("div");
        trackSliderNavPrev.innerHTML = `\n      <div class="modal-slider-prev">\n        <svg class="icon icon--arrow icon--lg slider__btn-icon">\n          <use xlink:href="img/icons/icons.svg#arrow-left"></use>\n        </svg>\n      </div>\n    `;
        trackSliderNavNext.innerHTML = `\n      <div class="modal-slider-next">\n        <svg class="icon icon--arrow icon--lg slider__btn-icon">\n          <use xlink:href="img/icons/icons.svg#arrow-right"></use>\n        </svg>\n      </div>\n    `;
        trackSliderWrap.innerHTML = trackSlider.innerHTML;
        heroSliderWrap.innerHTML = heroSlider.innerHTML;
        heroModal.querySelector(".modal-footer").append(trackSliderNavPrev);
        heroModal.querySelector(".modal-footer").append(trackSliderNavNext);
        heroModal.querySelector(".modal-body").append(heroSliderWrap);
        heroModal.querySelector(".modal-footer").append(trackSliderWrap);
        heroModal.querySelector("[data-bs-toggle]").dataset.bsToggle = "";
        const modalTrackSlider = new Swiper(".modal-slider-track", {
            initialSlide: activeSlide,
            spaceBetween: 30,
            slidesPerView: 3,
            direction: "horizontal",
            freeMode: true,
            watchSlidesVisibility: true,
            watchSlidesProgress: true,
            navigation: {
                nextEl: ".modal-slider-next",
                prevEl: ".modal-slider-prev"
            }
        });
        new Swiper(".modal-slider-main", {
            initialSlide: activeSlide,
            spaceBetween: 10,
            slidesPerView: 1,
            autoHeight: true,
            thumbs: {
                swiper: modalTrackSlider
            },
            on: {}
        });
    }));
    const cleanCart = document.querySelector(".jsCleanCart");
    if (cleanCart) cleanCart.addEventListener("click", (() => {
        document.querySelector(".cart-list").innerHTML = "";
    }));
    const removeAdvice = document.querySelectorAll(".jsRemoveAdvice");
    if (removeAdvice) removeAdvice.forEach((removeAdviceBtn => {
        removeAdviceBtn.addEventListener("click", (() => {
            removeAdviceBtn.closest(".cart-advices__item").remove();
        }));
    }));
    const useBonus = document.querySelector(".jsUseBonus");
    const bonusContent = document.querySelector(".jsBonusContent");
    if (useBonus) useBonus.querySelector(".checkbox__input").addEventListener("change", (() => {
        if (useBonus.querySelector(".checkbox__input").checked) bonusContent.classList.add("is-open"); else if (bonusContent.classList.contains("is-open")) bonusContent.classList.remove("is-open");
    }));
    const usePromocode = document.querySelector(".jsUsePromocode");
    const promocodeContent = document.querySelector(".jsPromocodeContent");
    if (usePromocode) usePromocode.querySelector(".checkbox__input").addEventListener("change", (() => {
        if (usePromocode.querySelector(".checkbox__input").checked) promocodeContent.classList.add("is-open"); else if (promocodeContent.classList.contains("is-open")) promocodeContent.classList.remove("is-open");
    }));
    const promocodeInput = document.querySelector(".jsPromocodeInput");
    const promocodeCheck = document.querySelector(".jsPromocodeCheck");
    const promocodeStatus = document.querySelector(".jsPromocodeStatus");
    if (promocodeInput && promocodeCheck) {
        promocodeInput.addEventListener("input", (() => {
            promocodeInput.value = promocodeInput.value.toUpperCase();
        }));
        promocodeCheck.addEventListener("click", (() => {
            function promocodeCancel() {
                promocodeCheck.textContent = "Применить";
                promocodeInput.classList.remove("correct");
                promocodeStatus.classList.remove("correct");
                promocodeInput.removeAttribute("readonly");
                promocodeInput.value = "";
                promocodeCheck.removeEventListener("click", promocodeCancel);
            }
            if (promocodeInput.value === "CORRECT") {
                if (promocodeStatus.classList.contains("incorrect")) promocodeStatus.classList.remove("incorrect");
                if (promocodeInput.classList.contains("incorrect")) promocodeInput.classList.remove("incorrect");
                promocodeInput.classList.add("correct");
                promocodeStatus.textContent = "Промокод применен";
                promocodeStatus.classList.add("correct");
                promocodeCheck.textContent = "Отменить";
                promocodeInput.setAttribute("readonly", "readonly");
                promocodeCheck.addEventListener("click", promocodeCancel);
            } else {
                promocodeInput.classList.add("incorrect");
                promocodeStatus.textContent = "Неверный промокод";
                promocodeStatus.classList.add("incorrect");
            }
        }));
    }
    let removeCartItem = document.querySelectorAll(".jsRemoveCartItem");
    for (let i = 0; i < removeCartItem.length; i++) removeCartItem[i].addEventListener("click", (function() {
        document.querySelector(".jsRemoveCartItemConfirm").addEventListener("click", (() => {
            this.closest(".cart-item").remove();
        }));
    }));
    const partnersTrigger = document.querySelectorAll(".jsOpenPartnersModal");
    if (partnersTrigger) {
        for (let i = 0; i < partnersTrigger.length; i++) partnersTrigger[i].addEventListener("click", openPartnersModal);
        function openPartnersModal() {
            const partnersModal = document.querySelector("#brands");
            partnersModal.querySelector(".modal-header .h5").textContent = this.dataset.brand;
            partnersModal.querySelector(".modal-body").innerHTML = `\n      <img src="${this.closest(".partners__item").querySelector("img").src}" alt="">\n      ${this.closest(".partners__item").querySelector(".partners__desc").innerHTML}\n    `;
        }
    }
    const pageURL = window.location.href;
    if (pageURL.indexOf("#") !== -1) {
        const hashURL = pageURL.slice(pageURL.indexOf("#") + 1, pageURL.length);
        if (hashURL.length !== 0) {
            const partnersBrands = Array.from(document.querySelectorAll(".jsOpenPartnersModal"));
            const targetBrand = partnersBrands.filter((item => item.dataset.brand.toLowerCase() === hashURL));
            const partnersModal = document.querySelector("#brands");
            partnersModal.querySelector(".modal-header .h5").textContent = targetBrand[0].dataset.brand;
            partnersModal.querySelector(".modal-body").innerHTML = `\n      <img src="${targetBrand[0].closest(".partners__item").querySelector("img").src}" alt="">\n      ${targetBrand[0].closest(".partners__item").querySelector(".partners__desc").innerHTML}\n    `;
            let brandModal = new Modal(document.getElementById("brands"), {});
            brandModal.show();
        }
    }
    const mapToggler = document.querySelectorAll(".jsMapToggler");
    if (mapToggler) mapToggler.forEach((item => {
        item.addEventListener("click", (() => {
            item.classList.toggle("active");
            item.closest(".contacts-tab__inner").querySelectorAll(".map-block__content").forEach((item => {
                item.classList.toggle("active");
            }));
        }));
    }));
    const favorite_page_toggler = document.querySelector(".jsToggleViews");
    const favoriteMosaicView = document.querySelector(".jsMosaicView");
    const favoriteListView = document.querySelector(".jsListView");
    const favoriteInner = document.querySelector(".jsFavoriteInner");
    const favorite_page_buyBtn = document.querySelectorAll(".item-pricing__btn .button__text");
    function favorite_page_textChange() {
        if (favorite_page_buyBtn && window.innerWidth <= 625) favorite_page_buyBtn.forEach((item => {
            if (item.parentNode.dataset.bsToggle !== "modal") item.innerHTML = '<svg><use xlink:href="img/icons/icons.svg#buy-cart"></use></svg>'; else item.innerHTML = '<svg><use xlink:href="img/icons/icons.svg#bell"></use></svg>';
        })); else favorite_page_buyBtn.forEach((item => {
            if (item.parentNode.dataset.bsToggle !== "modal") item.innerHTML = "Купить"; else item.innerHTML = "Уведомить";
        }));
        if (favoriteInner && favoriteInner.classList.contains("mosaic")) favorite_page_buyBtn.forEach((item => {
            if (item.parentNode.dataset.bsToggle !== "modal") item.innerHTML = "Купить"; else item.innerHTML = "Уведомить";
        }));
    }
    favorite_page_textChange();
    window.addEventListener("resize", favorite_page_textChange);
    const toggleFavoriteView = function() {
        if (favorite_page_toggler) {
            if (window.innerWidth <= 424) {
                favorite_page_toggler.style.display = "none";
                if (favoriteInner.classList.contains("mosaic")) favoriteInner.classList.remove("mosaic");
            } else {
                favorite_page_toggler.style.display = "flex";
                if (favoriteMosaicView.classList.contains("active")) favoriteInner.classList.add("mosaic");
            }
            favoriteListView.addEventListener("click", (() => {
                if (!favoriteListView.classList.contains("active")) {
                    favoriteListView.classList.add("active");
                    favoriteMosaicView.classList.remove("active");
                    favoriteInner.classList.toggle("mosaic");
                }
                favorite_page_textChange();
            }));
            favoriteMosaicView.addEventListener("click", (() => {
                if (!favoriteMosaicView.classList.contains("active")) {
                    favoriteMosaicView.classList.toggle("active");
                    favoriteListView.classList.toggle("active");
                    favoriteInner.classList.toggle("mosaic");
                }
                favorite_page_textChange();
            }));
        }
    };
    toggleFavoriteView();
    window.addEventListener("resize", toggleFavoriteView);
    const cleanFavorite = document.querySelector(".jsCleanFavorite");
    if (cleanFavorite) cleanFavorite.addEventListener("click", (() => {
        document.querySelector(".favorite__inner").innerHTML = "";
    }));
    const favorite_item_itemCard = document.querySelectorAll(".favorite-item");
    const favorite_item_moveStatusItem = function() {
        favorite_item_itemCard.forEach((item => {
            if (window.innerWidth <= 625 && item.querySelector(".item-pricing .item-pricing__status")) {
                const status = item.querySelector(".item-pricing .item-pricing__status");
                const tempItem = document.createElement("div");
                for (let i = 0; i < status.classList.length; i++) tempItem.classList.add(status.classList[i]);
                tempItem.innerHTML = status.innerHTML;
                item.querySelector(".favorite-item__title").after(tempItem);
                status.remove();
            } else if (window.innerWidth >= 625 && item.querySelector(".favorite-item__description .item-pricing__status")) {
                const status = item.querySelector(".favorite-item__description .item-pricing__status");
                const tempItem = document.createElement("div");
                for (let i = 0; i < status.classList.length; i++) tempItem.classList.add(status.classList[i]);
                tempItem.innerHTML = status.innerHTML;
                item.querySelector(".item-pricing__price").after(tempItem);
                status.remove();
            }
        }));
    };
    favorite_item_moveStatusItem();
    window.addEventListener("resize", favorite_item_moveStatusItem);
    let favorite_item_removeCartItem = document.querySelectorAll(".jsRemoveFavoriteItem");
    for (let i = 0; i < favorite_item_removeCartItem.length; i++) favorite_item_removeCartItem[i].addEventListener("click", (function() {
        document.querySelector(".jsRemoveFavoriteItemConfirm").addEventListener("click", (() => {
            this.closest(".favorite-item").remove();
        }));
    }));
    const favorite_filter_filterTitle = document.querySelectorAll(".favorite-filter .jsFilterTitle");
    if (favorite_filter_filterTitle) favorite_filter_filterTitle.forEach((item => {
        item.addEventListener("click", (event => {
            item.closest(".favorite-filter__item").classList.toggle("is-open");
        }));
    }));
    const favorite_filter_filterToggle = document.querySelector(".jsToggleFilter");
    const favorite_filter_catalogFilter = document.querySelector(".favorite__filter");
    if (favorite_filter_filterToggle) favorite_filter_filterToggle.addEventListener("click", (() => {
        favorite_filter_catalogFilter.classList.add("is-open");
        document.body.style.overflow = "hidden";
        favorite_filter_catalogFilter.addEventListener("click", (event => {
            const {target} = event;
            if (target === document.querySelector(".jsCloseFilter")) {
                favorite_filter_catalogFilter.classList.remove("is-open");
                document.body.style.overflow = "auto";
            }
        }));
        window.addEventListener("keyup", (event => {
            if (event.code === "Escape" && favorite_filter_catalogFilter.classList.contains("is-open")) {
                favorite_filter_catalogFilter.classList.remove("is-open");
                document.body.style.overflow = "auto";
            }
        }));
    }));
    const confirmService = document.querySelector(".jsConfirmService");
    if (confirmService) confirmService.addEventListener("click", (function(event) {
        event.preventDefault();
        this.closest(".service__form").innerHTML = `\n          <div class="form__success-inner wide">\n            <div class="form__success-icon">\n              <img src="img/big-icons/check.svg" alt="" />\n            </div>\n            <div class="text-center form__success-title mb-2">\n              <div class="h4">Готово</div>\n            </div>\n            <div class="text-center form__success-desc">\n              <div class="text text--color--gray-4">\n                Спасибо за обращение. <br>\n                В ближайшее время с вами свяжется наш менеджер\n              </div>\n            </div>\n          </div>\n    `;
    }));
    const fileUploadInput = document.querySelector(".form-control-file");
    if (fileUploadInput) fileUploadInput.addEventListener("change", (function() {
        this.closest("label").querySelector("span.text").textContent = this.files[0].name;
    }));
    const showReviewsForm = document.querySelector(".jsReviewsShowForm");
    const reviewsForm = document.querySelector(".jsReviewsForm");
    const reviewsBtnText = document.querySelector(".jsReviewBtnText");
    document.querySelector(".jsReviewsSubmit");
    if (showReviewsForm) showReviewsForm.addEventListener("click", (() => {
        showReviewsForm.classList.toggle("is-active");
        if (showReviewsForm.classList.contains("is-active")) reviewsBtnText.textContent = "Отменить"; else reviewsBtnText.textContent = "Оставить отзыв";
        reviewsForm.classList.toggle("is-open");
    }));
    const reviewsItems = document.querySelectorAll(".reviews-item__inner-wrap");
    if (reviewsItems) for (let i = 0; i < reviewsItems.length; i++) if (reviewsItems[i].offsetHeight >= 385) {
        reviewsItems[i].classList.add("is-hide");
        const showMoreBtn = document.createElement("button");
        showMoreBtn.classList.add("reviews-item__show-more");
        showMoreBtn.innerHTML = `\n\t\t\t<span>\n\t\t\t\t<svg class="icon icon--lg">\n\t\t\t\t\t<use xlink:href="/local/templates/emb1/img/icons/icons.svg#union"></use>\n\t\t\t\t</svg>\n\t\t\t</span>\n\t\t\t`;
        reviewsItems[i].append(showMoreBtn);
        showMoreBtn.addEventListener("click", (function() {
            this.closest(".reviews-item__inner-wrap").classList.remove("is-hide");
            this.remove();
        }));
    }
    const citySuggestModal = new Modal(document.getElementById("city-suggest"), {});
    if (!localStorage.getItem("cityChosen")) citySuggestModal.show();
    const personalForm = document.querySelector(".personal-form");
    if (personalForm) {
        function toggleFormTabs() {
            const personalFormRadio = document.querySelectorAll(".personal-form .radio-btn__input");
            const personalFormTabs = document.querySelectorAll(".personal-form .personal-form__inner");
            for (let i = 0; i < personalFormRadio.length; i++) if (personalFormRadio[i].checked) personalFormTabs.forEach(((item, index) => {
                if (index === i) {
                    if (!item.classList.contains("active")) item.classList.add("active");
                } else if (item.classList.contains("active")) item.classList.remove("active");
            }));
        }
        toggleFormTabs();
        personalForm.addEventListener("change", toggleFormTabs);
    }
    const personalMenuToggler = document.querySelector(".personal-menu__item.active a");
    if (personalMenuToggler) personalMenuToggler.addEventListener("click", (event => {
        event.preventDefault();
        personalMenuToggler.closest(".personal-menu__list").classList.toggle("is-open");
    }));
    const threadBuyBtn = document.querySelector(".jsThreadBuy");
    const threadAddToCart = document.querySelectorAll(".item-thread__to-cart-text");
    for (let i = 0; i < threadAddToCart.length; i++) threadAddToCart[i].addEventListener("click", (function() {
        threadBuyBtn.addEventListener("click", (() => {
            this.closest(".item-thread").classList.add("is-in-cart");
        }));
        const input = document.querySelector("#thread-buy").querySelector(".jsProductQuantity");
        if (!input.value.includes("боб.")) input.value = input.value + " боб.";
    }));
    const orderSelectElems = Array.from(document.getElementsByClassName("jsOrderSelect"));
    if (orderSelectElems.length) orderSelectElems.forEach((orderSelectEl => {
        const selectTitle = orderSelectEl.querySelector(".jsOrderSelectTitle");
        const selectTitleText = orderSelectEl.querySelector(".jsOrderSelectTitleText");
        const selectItemEles = Array.from(orderSelectEl.getElementsByClassName("jsOrderSelectListItem"));
        selectTitle.addEventListener("click", (() => {
            orderSelectEl.classList.toggle("is-open");
        }));
        selectItemEles.forEach((selectItemEl => {
            selectItemEl.addEventListener("click", (() => {
                selectTitleText.textContent = selectItemEl.textContent;
                orderSelectEl.classList.toggle("is-open");
            }));
        }));
    }));
    const modules_flsModules = {};
    function isWebp() {
        function testWebP(callback) {
            let webP = new Image;
            webP.onload = webP.onerror = function() {
                callback(webP.height == 2);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        testWebP((function(support) {
            let className = support === true ? "webp" : "no-webp";
            document.documentElement.classList.add(className);
        }));
    }
    function getHash() {
        if (location.hash) return location.hash.replace("#", "");
    }
    function setHash(hash) {
        hash = hash ? `#${hash}` : window.location.href.split("#")[0];
        history.pushState("", "", hash);
    }
    let _slideUp = (target, duration = 500, showmore = 0) => {
        if (!target.classList.contains("_slide")) {
            target.classList.add("_slide");
            target.style.transitionProperty = "height, margin, padding";
            target.style.transitionDuration = duration + "ms";
            target.style.height = `${target.offsetHeight}px`;
            target.offsetHeight;
            target.style.overflow = "hidden";
            target.style.height = showmore ? `${showmore}px` : `0px`;
            target.style.paddingTop = 0;
            target.style.paddingBottom = 0;
            target.style.marginTop = 0;
            target.style.marginBottom = 0;
            window.setTimeout((() => {
                target.hidden = !showmore ? true : false;
                !showmore ? target.style.removeProperty("height") : null;
                target.style.removeProperty("padding-top");
                target.style.removeProperty("padding-bottom");
                target.style.removeProperty("margin-top");
                target.style.removeProperty("margin-bottom");
                !showmore ? target.style.removeProperty("overflow") : null;
                target.style.removeProperty("transition-duration");
                target.style.removeProperty("transition-property");
                target.classList.remove("_slide");
                document.dispatchEvent(new CustomEvent("slideUpDone", {
                    detail: {
                        target
                    }
                }));
            }), duration);
        }
    };
    let _slideDown = (target, duration = 500, showmore = 0) => {
        if (!target.classList.contains("_slide")) {
            target.classList.add("_slide");
            target.hidden = target.hidden ? false : null;
            showmore ? target.style.removeProperty("height") : null;
            let height = target.offsetHeight;
            target.style.overflow = "hidden";
            target.style.height = showmore ? `${showmore}px` : `0px`;
            target.style.paddingTop = 0;
            target.style.paddingBottom = 0;
            target.style.marginTop = 0;
            target.style.marginBottom = 0;
            target.offsetHeight;
            target.style.transitionProperty = "height, margin, padding";
            target.style.transitionDuration = duration + "ms";
            target.style.height = height + "px";
            target.style.removeProperty("padding-top");
            target.style.removeProperty("padding-bottom");
            target.style.removeProperty("margin-top");
            target.style.removeProperty("margin-bottom");
            window.setTimeout((() => {
                target.style.removeProperty("height");
                target.style.removeProperty("overflow");
                target.style.removeProperty("transition-duration");
                target.style.removeProperty("transition-property");
                target.classList.remove("_slide");
                document.dispatchEvent(new CustomEvent("slideDownDone", {
                    detail: {
                        target
                    }
                }));
            }), duration);
        }
    };
    let _slideToggle = (target, duration = 500) => {
        if (target.hidden) return _slideDown(target, duration); else return _slideUp(target, duration);
    };
    let bodyLockStatus = true;
    let bodyUnlock = (delay = 500) => {
        let body = document.querySelector("body");
        if (bodyLockStatus) {
            let lock_padding = document.querySelectorAll("[data-lp]");
            setTimeout((() => {
                for (let index = 0; index < lock_padding.length; index++) {
                    const el = lock_padding[index];
                    el.style.paddingRight = "0px";
                }
                body.style.paddingRight = "0px";
                document.documentElement.classList.remove("lock");
            }), delay);
            bodyLockStatus = false;
            setTimeout((function() {
                bodyLockStatus = true;
            }), delay);
        }
    };
    function functions_tabs() {
        const tabs = document.querySelectorAll("[data-tabs]");
        let tabsActiveHash = [];
        if (tabs.length > 0) {
            const hash = getHash();
            if (hash && hash.startsWith("tab-")) tabsActiveHash = hash.replace("tab-", "").split("-");
            tabs.forEach(((tabsBlock, index) => {
                tabsBlock.classList.add("_tab-init");
                tabsBlock.setAttribute("data-tabs-index", index);
                tabsBlock.addEventListener("click", setTabsAction);
                initTabs(tabsBlock);
            }));
            let mdQueriesArray = dataMediaQueries(tabs, "tabs");
            if (mdQueriesArray && mdQueriesArray.length) mdQueriesArray.forEach((mdQueriesItem => {
                mdQueriesItem.matchMedia.addEventListener("change", (function() {
                    setTitlePosition(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
                }));
                setTitlePosition(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
            }));
        }
        function setTitlePosition(tabsMediaArray, matchMedia) {
            tabsMediaArray.forEach((tabsMediaItem => {
                tabsMediaItem = tabsMediaItem.item;
                let tabsTitles = tabsMediaItem.querySelector("[data-tabs-titles]");
                let tabsTitleItems = tabsMediaItem.querySelectorAll("[data-tabs-title]");
                let tabsContent = tabsMediaItem.querySelector("[data-tabs-body]");
                let tabsContentItems = tabsMediaItem.querySelectorAll("[data-tabs-item]");
                tabsTitleItems = Array.from(tabsTitleItems).filter((item => item.closest("[data-tabs]") === tabsMediaItem));
                tabsContentItems = Array.from(tabsContentItems).filter((item => item.closest("[data-tabs]") === tabsMediaItem));
                tabsContentItems.forEach(((tabsContentItem, index) => {
                    if (matchMedia.matches) {
                        tabsContent.append(tabsTitleItems[index]);
                        tabsContent.append(tabsContentItem);
                        tabsMediaItem.classList.add("_tab-spoller");
                    } else {
                        tabsTitles.append(tabsTitleItems[index]);
                        tabsMediaItem.classList.remove("_tab-spoller");
                    }
                }));
            }));
        }
        function initTabs(tabsBlock) {
            let tabsTitles = tabsBlock.querySelectorAll("[data-tabs-titles]>*");
            let tabsContent = tabsBlock.querySelectorAll("[data-tabs-body]>*");
            const tabsBlockIndex = tabsBlock.dataset.tabsIndex;
            const tabsActiveHashBlock = tabsActiveHash[0] == tabsBlockIndex;
            if (tabsActiveHashBlock) {
                const tabsActiveTitle = tabsBlock.querySelector("[data-tabs-titles]>._tab-active");
                tabsActiveTitle ? tabsActiveTitle.classList.remove("_tab-active") : null;
            }
            if (tabsContent.length) {
                tabsContent = Array.from(tabsContent).filter((item => item.closest("[data-tabs]") === tabsBlock));
                tabsTitles = Array.from(tabsTitles).filter((item => item.closest("[data-tabs]") === tabsBlock));
                tabsContent.forEach(((tabsContentItem, index) => {
                    tabsTitles[index].setAttribute("data-tabs-title", "");
                    tabsContentItem.setAttribute("data-tabs-item", "");
                    if (tabsActiveHashBlock && index == tabsActiveHash[1]) tabsTitles[index].classList.add("_tab-active");
                    tabsContentItem.hidden = !tabsTitles[index].classList.contains("_tab-active");
                }));
            }
        }
        function setTabsStatus(tabsBlock) {
            let tabsTitles = tabsBlock.querySelectorAll("[data-tabs-title]");
            let tabsContent = tabsBlock.querySelectorAll("[data-tabs-item]");
            const tabsBlockIndex = tabsBlock.dataset.tabsIndex;
            function isTabsAnamate(tabsBlock) {
                if (tabsBlock.hasAttribute("data-tabs-animate")) return tabsBlock.dataset.tabsAnimate > 0 ? Number(tabsBlock.dataset.tabsAnimate) : 500;
            }
            const tabsBlockAnimate = isTabsAnamate(tabsBlock);
            if (tabsContent.length > 0) {
                const isHash = tabsBlock.hasAttribute("data-tabs-hash");
                tabsContent = Array.from(tabsContent).filter((item => item.closest("[data-tabs]") === tabsBlock));
                tabsTitles = Array.from(tabsTitles).filter((item => item.closest("[data-tabs]") === tabsBlock));
                tabsContent.forEach(((tabsContentItem, index) => {
                    if (tabsTitles[index].classList.contains("_tab-active")) {
                        if (tabsBlockAnimate) _slideDown(tabsContentItem, tabsBlockAnimate); else tabsContentItem.hidden = false;
                        if (isHash && !tabsContentItem.closest(".popup")) setHash(`tab-${tabsBlockIndex}-${index}`);
                    } else if (tabsBlockAnimate) _slideUp(tabsContentItem, tabsBlockAnimate); else tabsContentItem.hidden = true;
                }));
            }
        }
        function setTabsAction(e) {
            const el = e.target;
            if (el.closest("[data-tabs-title]")) {
                const tabTitle = el.closest("[data-tabs-title]");
                const tabsBlock = tabTitle.closest("[data-tabs]");
                if (!tabTitle.classList.contains("_tab-active") && !tabsBlock.querySelector("._slide")) {
                    let tabActiveTitle = tabsBlock.querySelectorAll("[data-tabs-title]._tab-active");
                    tabActiveTitle.length ? tabActiveTitle = Array.from(tabActiveTitle).filter((item => item.closest("[data-tabs]") === tabsBlock)) : null;
                    tabActiveTitle.length ? tabActiveTitle[0].classList.remove("_tab-active") : null;
                    tabTitle.classList.add("_tab-active");
                    setTabsStatus(tabsBlock);
                }
                e.preventDefault();
            }
        }
    }
    function menuClose() {
        bodyUnlock();
        document.documentElement.classList.remove("menu-open");
    }
    function functions_FLS(message) {
        setTimeout((() => {
            if (window.FLS) console.log(message);
        }), 0);
    }
    function uniqArray(array) {
        return array.filter((function(item, index, self) {
            return self.indexOf(item) === index;
        }));
    }
    function dataMediaQueries(array, dataSetValue) {
        const media = Array.from(array).filter((function(item, index, self) {
            if (item.dataset[dataSetValue]) return item.dataset[dataSetValue].split(",")[0];
        }));
        if (media.length) {
            const breakpointsArray = [];
            media.forEach((item => {
                const params = item.dataset[dataSetValue];
                const breakpoint = {};
                const paramsArray = params.split(",");
                breakpoint.value = paramsArray[0];
                breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
                breakpoint.item = item;
                breakpointsArray.push(breakpoint);
            }));
            let mdQueries = breakpointsArray.map((function(item) {
                return "(" + item.type + "-width: " + item.value + "px)," + item.value + "," + item.type;
            }));
            mdQueries = uniqArray(mdQueries);
            const mdQueriesArray = [];
            if (mdQueries.length) {
                mdQueries.forEach((breakpoint => {
                    const paramsArray = breakpoint.split(",");
                    const mediaBreakpoint = paramsArray[1];
                    const mediaType = paramsArray[2];
                    const matchMedia = window.matchMedia(paramsArray[0]);
                    const itemsArray = breakpointsArray.filter((function(item) {
                        if (item.value === mediaBreakpoint && item.type === mediaType) return true;
                    }));
                    mdQueriesArray.push({
                        itemsArray,
                        matchMedia
                    });
                }));
                return mdQueriesArray;
            }
        }
    }
    let gotoblock_gotoBlock = (targetBlock, noHeader = false, speed = 500, offsetTop = 0) => {
        const targetBlockElement = document.querySelector(targetBlock);
        if (targetBlockElement) {
            let headerItem = "";
            let headerItemHeight = 0;
            if (noHeader) {
                headerItem = "header.header";
                headerItemHeight = document.querySelector(headerItem).offsetHeight;
            }
            let options = {
                speedAsDuration: true,
                speed,
                header: headerItem,
                offset: offsetTop,
                easing: "easeOutQuad"
            };
            document.documentElement.classList.contains("menu-open") ? menuClose() : null;
            if (typeof SmoothScroll !== "undefined") (new SmoothScroll).animateScroll(targetBlockElement, "", options); else {
                let targetBlockElementPosition = targetBlockElement.getBoundingClientRect().top + scrollY;
                targetBlockElementPosition = headerItemHeight ? targetBlockElementPosition - headerItemHeight : targetBlockElementPosition;
                targetBlockElementPosition = offsetTop ? targetBlockElementPosition - offsetTop : targetBlockElementPosition;
                window.scrollTo({
                    top: targetBlockElementPosition,
                    behavior: "smooth"
                });
            }
            functions_FLS(`[gotoBlock]: Юхуу...едем к ${targetBlock}`);
        } else functions_FLS(`[gotoBlock]: Ой ой..Такого блока нет на странице: ${targetBlock}`);
    };
    let formValidate = {
        getErrors(form) {
            let error = 0;
            let formRequiredItems = form.querySelectorAll("*[data-required]");
            if (formRequiredItems.length) formRequiredItems.forEach((formRequiredItem => {
                if ((formRequiredItem.offsetParent !== null || formRequiredItem.tagName === "SELECT") && !formRequiredItem.disabled) error += this.validateInput(formRequiredItem);
            }));
            return error;
        },
        validateInput(formRequiredItem) {
            let error = 0;
            if (formRequiredItem.dataset.required === "email") {
                formRequiredItem.value = formRequiredItem.value.replace(" ", "");
                if (this.emailTest(formRequiredItem)) {
                    this.addError(formRequiredItem);
                    error++;
                } else this.removeError(formRequiredItem);
            } else if (formRequiredItem.type === "checkbox" && !formRequiredItem.checked) {
                this.addError(formRequiredItem);
                error++;
            } else if (!formRequiredItem.value) {
                this.addError(formRequiredItem);
                error++;
            } else this.removeError(formRequiredItem);
            return error;
        },
        addError(formRequiredItem) {
            formRequiredItem.classList.add("_form-error");
            formRequiredItem.parentElement.classList.add("_form-error");
            let inputError = formRequiredItem.parentElement.querySelector(".form__error");
            if (inputError) formRequiredItem.parentElement.removeChild(inputError);
            if (formRequiredItem.dataset.error) formRequiredItem.parentElement.insertAdjacentHTML("beforeend", `<div class="form__error">${formRequiredItem.dataset.error}</div>`);
        },
        removeError(formRequiredItem) {
            formRequiredItem.classList.remove("_form-error");
            formRequiredItem.parentElement.classList.remove("_form-error");
            if (formRequiredItem.parentElement.querySelector(".form__error")) formRequiredItem.parentElement.removeChild(formRequiredItem.parentElement.querySelector(".form__error"));
        },
        formClean(form) {
            form.reset();
            setTimeout((() => {
                let inputs = form.querySelectorAll("input,textarea");
                for (let index = 0; index < inputs.length; index++) {
                    const el = inputs[index];
                    el.parentElement.classList.remove("_form-focus");
                    el.classList.remove("_form-focus");
                    formValidate.removeError(el);
                }
                let checkboxes = form.querySelectorAll(".checkbox__input");
                if (checkboxes.length > 0) for (let index = 0; index < checkboxes.length; index++) {
                    const checkbox = checkboxes[index];
                    checkbox.checked = false;
                }
                if (modules_flsModules.select) {
                    let selects = form.querySelectorAll(".select");
                    if (selects.length) for (let index = 0; index < selects.length; index++) {
                        const select = selects[index].querySelector("select");
                        modules_flsModules.select.selectBuild(select);
                    }
                }
            }), 0);
        },
        emailTest(formRequiredItem) {
            return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(formRequiredItem.value);
        }
    };
    class SelectConstructor {
        constructor(props, data = null) {
            let defaultConfig = {
                init: true
            };
            this.config = Object.assign(defaultConfig, props);
            this.selectClasses = {
                classSelect: "select",
                classSelectBody: "select__body",
                classSelectTitle: "select__title",
                classSelectValue: "select__value",
                classSelectLabel: "select__label",
                classSelectInput: "select__input",
                classSelectText: "select__text",
                classSelectLink: "select__link",
                classSelectOptions: "select__options",
                classSelectOptionsScroll: "select__scroll",
                classSelectOption: "select__option",
                classSelectContent: "select__content",
                classSelectRow: "select__row",
                classSelectData: "select__asset",
                classSelectDisabled: "_select-disabled",
                classSelectTag: "_select-tag",
                classSelectOpen: "_select-open",
                classSelectActive: "_select-active",
                classSelectFocus: "_select-focus",
                classSelectMultiple: "_select-multiple",
                classSelectCheckBox: "_select-checkbox",
                classSelectOptionSelected: "_select-selected"
            };
            this._this = this;
            if (this.config.init) {
                const selectItems = data ? document.querySelectorAll(data) : document.querySelectorAll("select");
                if (selectItems.length) this.selectsInit(selectItems);
            }
        }
        getSelectClass(className) {
            return `.${className}`;
        }
        getSelectElement(selectItem, className) {
            return {
                originalSelect: selectItem.querySelector("select"),
                selectElement: selectItem.querySelector(this.getSelectClass(className))
            };
        }
        selectsInit(selectItems) {
            selectItems.forEach(((originalSelect, index) => {
                this.selectInit(originalSelect, index + 1);
            }));
            document.addEventListener("click", function(e) {
                this.selectsActions(e);
            }.bind(this));
            document.addEventListener("keydown", function(e) {
                this.selectsActions(e);
            }.bind(this));
            document.addEventListener("focusin", function(e) {
                this.selectsActions(e);
            }.bind(this));
            document.addEventListener("focusout", function(e) {
                this.selectsActions(e);
            }.bind(this));
        }
        selectInit(originalSelect, index) {
            const _this = this;
            let selectItem = document.createElement("div");
            selectItem.classList.add(this.selectClasses.classSelect);
            originalSelect.parentNode.insertBefore(selectItem, originalSelect);
            selectItem.appendChild(originalSelect);
            originalSelect.hidden = true;
            index ? originalSelect.dataset.id = index : null;
            selectItem.insertAdjacentHTML("beforeend", `<div class="${this.selectClasses.classSelectBody}"><div hidden class="${this.selectClasses.classSelectOptions}"></div></div>`);
            this.selectBuild(originalSelect);
            if (this.getSelectPlaceholder(originalSelect)) {
                originalSelect.dataset.placeholder = this.getSelectPlaceholder(originalSelect).value;
                if (this.getSelectPlaceholder(originalSelect).label.show) {
                    const selectItemTitle = this.getSelectElement(selectItem, this.selectClasses.classSelectTitle).selectElement;
                    selectItemTitle.insertAdjacentHTML("afterbegin", `<span class="${this.selectClasses.classSelectLabel}">${this.getSelectPlaceholder(originalSelect).label.text ? this.getSelectPlaceholder(originalSelect).label.text : this.getSelectPlaceholder(originalSelect).value}</span>`);
                }
            }
            originalSelect.dataset.speed = originalSelect.dataset.speed ? originalSelect.dataset.speed : "150";
            originalSelect.addEventListener("change", (function(e) {
                _this.selectChange(e);
            }));
        }
        selectBuild(originalSelect) {
            const selectItem = originalSelect.parentElement;
            selectItem.dataset.id = originalSelect.dataset.id;
            selectItem.classList.add(originalSelect.getAttribute("class") ? `select_${originalSelect.getAttribute("class")}` : "");
            originalSelect.multiple ? selectItem.classList.add(this.selectClasses.classSelectMultiple) : selectItem.classList.remove(this.selectClasses.classSelectMultiple);
            originalSelect.hasAttribute("data-checkbox") && originalSelect.multiple ? selectItem.classList.add(this.selectClasses.classSelectCheckBox) : selectItem.classList.remove(this.selectClasses.classSelectCheckBox);
            this.setSelectTitleValue(selectItem, originalSelect);
            this.setOptions(selectItem, originalSelect);
            originalSelect.hasAttribute("data-search") ? this.searchActions(selectItem) : null;
            originalSelect.hasAttribute("data-open") ? this.selectAction(selectItem) : null;
            this.selectDisabled(selectItem, originalSelect);
        }
        selectsActions(e) {
            const targetElement = e.target;
            const targetType = e.type;
            if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelect)) || targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTag))) {
                const selectItem = targetElement.closest(".select") ? targetElement.closest(".select") : document.querySelector(`.${this.selectClasses.classSelect}[data-id="${targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTag)).dataset.selectId}"]`);
                const originalSelect = this.getSelectElement(selectItem).originalSelect;
                if (targetType === "click") {
                    if (!originalSelect.disabled) if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTag))) {
                        const targetTag = targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTag));
                        const optionItem = document.querySelector(`.${this.selectClasses.classSelect}[data-id="${targetTag.dataset.selectId}"] .select__option[data-value="${targetTag.dataset.value}"]`);
                        this.optionAction(selectItem, originalSelect, optionItem);
                    } else if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTitle))) this.selectAction(selectItem); else if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelectOption))) {
                        const optionItem = targetElement.closest(this.getSelectClass(this.selectClasses.classSelectOption));
                        this.optionAction(selectItem, originalSelect, optionItem);
                    }
                } else if (targetType === "focusin" || targetType === "focusout") {
                    if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelect))) targetType === "focusin" ? selectItem.classList.add(this.selectClasses.classSelectFocus) : selectItem.classList.remove(this.selectClasses.classSelectFocus);
                } else if (targetType === "keydown" && e.code === "Escape") this.selectsСlose();
            } else this.selectsСlose();
        }
        selectsСlose() {
            const selectActiveItems = document.querySelectorAll(`${this.getSelectClass(this.selectClasses.classSelect)}${this.getSelectClass(this.selectClasses.classSelectOpen)}`);
            if (selectActiveItems.length) selectActiveItems.forEach((selectActiveItem => {
                this.selectAction(selectActiveItem);
            }));
        }
        selectAction(selectItem) {
            const originalSelect = this.getSelectElement(selectItem).originalSelect;
            const selectOptions = this.getSelectElement(selectItem, this.selectClasses.classSelectOptions).selectElement;
            if (!selectOptions.classList.contains("_slide")) {
                selectItem.classList.toggle(this.selectClasses.classSelectOpen);
                _slideToggle(selectOptions, originalSelect.dataset.speed);
            }
        }
        setSelectTitleValue(selectItem, originalSelect) {
            const selectItemBody = this.getSelectElement(selectItem, this.selectClasses.classSelectBody).selectElement;
            const selectItemTitle = this.getSelectElement(selectItem, this.selectClasses.classSelectTitle).selectElement;
            if (selectItemTitle) selectItemTitle.remove();
            selectItemBody.insertAdjacentHTML("afterbegin", this.getSelectTitleValue(selectItem, originalSelect));
        }
        getSelectTitleValue(selectItem, originalSelect) {
            let selectTitleValue = this.getSelectedOptionsData(originalSelect, 2).html;
            if (originalSelect.multiple && originalSelect.hasAttribute("data-tags")) {
                selectTitleValue = this.getSelectedOptionsData(originalSelect).elements.map((option => `<span role="button" data-select-id="${selectItem.dataset.id}" data-value="${option.value}" class="_select-tag">${this.getSelectElementContent(option)}</span>`)).join("");
                if (originalSelect.dataset.tags && document.querySelector(originalSelect.dataset.tags)) {
                    document.querySelector(originalSelect.dataset.tags).innerHTML = selectTitleValue;
                    if (originalSelect.hasAttribute("data-search")) selectTitleValue = false;
                }
            }
            selectTitleValue = selectTitleValue.length ? selectTitleValue : originalSelect.dataset.placeholder;
            this.getSelectedOptionsData(originalSelect).values.length ? selectItem.classList.add(this.selectClasses.classSelectActive) : selectItem.classList.remove(this.selectClasses.classSelectActive);
            if (originalSelect.hasAttribute("data-search")) return `<div class="${this.selectClasses.classSelectTitle}"><span class="${this.selectClasses.classSelectValue}"><input autocomplete="off" type="text" placeholder="${selectTitleValue}" data-placeholder="${selectTitleValue}" class="${this.selectClasses.classSelectInput}"></span></div>`; else {
                const customClass = this.getSelectedOptionsData(originalSelect).elements.length && this.getSelectedOptionsData(originalSelect).elements[0].dataset.class ? ` ${this.getSelectedOptionsData(originalSelect).elements[0].dataset.class}` : "";
                return `<button type="button" class="${this.selectClasses.classSelectTitle}"><span class="${this.selectClasses.classSelectValue}"><span class="${this.selectClasses.classSelectContent}${customClass}">${selectTitleValue}</span></span></button>`;
            }
        }
        getSelectElementContent(selectOption) {
            const selectOptionData = selectOption.dataset.asset ? `${selectOption.dataset.asset}` : "";
            const selectOptionDataHTML = selectOptionData.indexOf("img") >= 0 ? `<img src="${selectOptionData}" alt="">` : selectOptionData;
            let selectOptionContentHTML = ``;
            selectOptionContentHTML += selectOptionData ? `<span class="${this.selectClasses.classSelectRow}">` : "";
            selectOptionContentHTML += selectOptionData ? `<span class="${this.selectClasses.classSelectData}">` : "";
            selectOptionContentHTML += selectOptionData ? selectOptionDataHTML : "";
            selectOptionContentHTML += selectOptionData ? `</span>` : "";
            selectOptionContentHTML += selectOptionData ? `<span class="${this.selectClasses.classSelectText}">` : "";
            selectOptionContentHTML += selectOption.textContent;
            selectOptionContentHTML += selectOptionData ? `</span>` : "";
            selectOptionContentHTML += selectOptionData ? `</span>` : "";
            return selectOptionContentHTML;
        }
        getSelectPlaceholder(originalSelect) {
            const selectPlaceholder = Array.from(originalSelect.options).find((option => !option.value));
            if (selectPlaceholder) return {
                value: selectPlaceholder.textContent,
                show: selectPlaceholder.hasAttribute("data-show"),
                label: {
                    show: selectPlaceholder.hasAttribute("data-label"),
                    text: selectPlaceholder.dataset.label
                }
            };
        }
        getSelectedOptionsData(originalSelect, type) {
            let selectedOptions = [];
            if (originalSelect.multiple) selectedOptions = Array.from(originalSelect.options).filter((option => option.value)).filter((option => option.selected)); else selectedOptions.push(originalSelect.options[originalSelect.selectedIndex]);
            return {
                elements: selectedOptions.map((option => option)),
                values: selectedOptions.filter((option => option.value)).map((option => option.value)),
                html: selectedOptions.map((option => this.getSelectElementContent(option)))
            };
        }
        getOptions(originalSelect) {
            let selectOptionsScroll = originalSelect.hasAttribute("data-scroll") ? `data-simplebar` : "";
            let selectOptionsScrollHeight = originalSelect.dataset.scroll ? `style="max-height:${originalSelect.dataset.scroll}px"` : "";
            let selectOptions = Array.from(originalSelect.options);
            if (selectOptions.length > 0) {
                let selectOptionsHTML = ``;
                if (this.getSelectPlaceholder(originalSelect) && !this.getSelectPlaceholder(originalSelect).show || originalSelect.multiple) selectOptions = selectOptions.filter((option => option.value));
                selectOptionsHTML += selectOptionsScroll ? `<div ${selectOptionsScroll} ${selectOptionsScrollHeight} class="${this.selectClasses.classSelectOptionsScroll}">` : "";
                selectOptions.forEach((selectOption => {
                    selectOptionsHTML += this.getOption(selectOption, originalSelect);
                }));
                selectOptionsHTML += selectOptionsScroll ? `</div>` : "";
                return selectOptionsHTML;
            }
        }
        getOption(selectOption, originalSelect) {
            const selectOptionSelected = selectOption.selected && originalSelect.multiple ? ` ${this.selectClasses.classSelectOptionSelected}` : "";
            const selectOptionHide = selectOption.selected && !originalSelect.hasAttribute("data-show-selected") ? `hidden` : ``;
            const selectOptionClass = selectOption.dataset.class ? ` ${selectOption.dataset.class}` : "";
            const selectOptionLink = selectOption.dataset.href ? selectOption.dataset.href : false;
            const selectOptionLinkTarget = selectOption.hasAttribute("data-href-blank") ? `target="_blank"` : "";
            let selectOptionHTML = ``;
            selectOptionHTML += selectOptionLink ? `<a ${selectOptionLinkTarget} ${selectOptionHide} href="${selectOptionLink}" data-value="${selectOption.value}" class="${this.selectClasses.classSelectOption}${selectOptionClass}${selectOptionSelected}">` : `<button ${selectOptionHide} class="${this.selectClasses.classSelectOption}${selectOptionClass}${selectOptionSelected}" data-value="${selectOption.value}" type="button">`;
            selectOptionHTML += this.getSelectElementContent(selectOption);
            selectOptionHTML += selectOptionLink ? `</a>` : `</button>`;
            return selectOptionHTML;
        }
        setOptions(selectItem, originalSelect) {
            const selectItemOptions = this.getSelectElement(selectItem, this.selectClasses.classSelectOptions).selectElement;
            selectItemOptions.innerHTML = this.getOptions(originalSelect);
        }
        optionAction(selectItem, originalSelect, optionItem) {
            if (originalSelect.multiple) {
                optionItem.classList.toggle(this.selectClasses.classSelectOptionSelected);
                const originalSelectSelectedItems = this.getSelectedOptionsData(originalSelect).elements;
                originalSelectSelectedItems.forEach((originalSelectSelectedItem => {
                    originalSelectSelectedItem.removeAttribute("selected");
                }));
                const selectSelectedItems = selectItem.querySelectorAll(this.getSelectClass(this.selectClasses.classSelectOptionSelected));
                selectSelectedItems.forEach((selectSelectedItems => {
                    originalSelect.querySelector(`option[value="${selectSelectedItems.dataset.value}"]`).setAttribute("selected", "selected");
                }));
            } else {
                if (!originalSelect.hasAttribute("data-show-selected")) {
                    if (selectItem.querySelector(`${this.getSelectClass(this.selectClasses.classSelectOption)}[hidden]`)) selectItem.querySelector(`${this.getSelectClass(this.selectClasses.classSelectOption)}[hidden]`).hidden = false;
                    optionItem.hidden = true;
                }
                originalSelect.value = optionItem.hasAttribute("data-value") ? optionItem.dataset.value : optionItem.textContent;
                this.selectAction(selectItem);
            }
            this.setSelectTitleValue(selectItem, originalSelect);
            this.setSelectChange(originalSelect);
        }
        selectChange(e) {
            const originalSelect = e.target;
            this.selectBuild(originalSelect);
            this.setSelectChange(originalSelect);
        }
        setSelectChange(originalSelect) {
            if (originalSelect.hasAttribute("data-validate")) formValidate.validateInput(originalSelect);
            if (originalSelect.hasAttribute("data-submit") && originalSelect.value) {
                let tempButton = document.createElement("button");
                tempButton.type = "submit";
                originalSelect.closest("form").append(tempButton);
                tempButton.click();
                tempButton.remove();
            }
            const selectItem = originalSelect.parentElement;
            this.selectCallback(selectItem, originalSelect);
        }
        selectDisabled(selectItem, originalSelect) {
            if (originalSelect.disabled) {
                selectItem.classList.add(this.selectClasses.classSelectDisabled);
                this.getSelectElement(selectItem, this.selectClasses.classSelectTitle).selectElement.disabled = true;
            } else {
                selectItem.classList.remove(this.selectClasses.classSelectDisabled);
                this.getSelectElement(selectItem, this.selectClasses.classSelectTitle).selectElement.disabled = false;
            }
        }
        searchActions(selectItem) {
            this.getSelectElement(selectItem).originalSelect;
            const selectInput = this.getSelectElement(selectItem, this.selectClasses.classSelectInput).selectElement;
            const selectOptions = this.getSelectElement(selectItem, this.selectClasses.classSelectOptions).selectElement;
            const selectOptionsItems = selectOptions.querySelectorAll(`.${this.selectClasses.classSelectOption}`);
            const _this = this;
            selectInput.addEventListener("input", (function() {
                selectOptionsItems.forEach((selectOptionsItem => {
                    if (selectOptionsItem.textContent.toUpperCase().indexOf(selectInput.value.toUpperCase()) >= 0) selectOptionsItem.hidden = false; else selectOptionsItem.hidden = true;
                }));
                selectOptions.hidden === true ? _this.selectAction(selectItem) : null;
            }));
        }
        selectCallback(selectItem, originalSelect) {
            document.dispatchEvent(new CustomEvent("selectCallback", {
                detail: {
                    select: originalSelect
                }
            }));
        }
    }
    modules_flsModules.select = new SelectConstructor({});
    let addWindowScrollEvent = false;
    function pageNavigation() {
        document.addEventListener("click", pageNavigationAction);
        document.addEventListener("watcherCallback", pageNavigationAction);
        function pageNavigationAction(e) {
            if (e.type === "click") {
                const targetElement = e.target;
                if (targetElement.closest("[data-goto]")) {
                    const gotoLink = targetElement.closest("[data-goto]");
                    const gotoLinkSelector = gotoLink.dataset.goto ? gotoLink.dataset.goto : "";
                    const noHeader = gotoLink.hasAttribute("data-goto-header") ? true : false;
                    const gotoSpeed = gotoLink.dataset.gotoSpeed ? gotoLink.dataset.gotoSpeed : 500;
                    const offsetTop = gotoLink.dataset.gotoTop ? parseInt(gotoLink.dataset.gotoTop) : 0;
                    gotoblock_gotoBlock(gotoLinkSelector, noHeader, gotoSpeed, offsetTop);
                    e.preventDefault();
                }
            } else if (e.type === "watcherCallback" && e.detail) {
                const entry = e.detail.entry;
                const targetElement = entry.target;
                if (targetElement.dataset.watch === "navigator") {
                    document.querySelector(`[data-goto]._navigator-active`);
                    let navigatorCurrentItem;
                    if (targetElement.id && document.querySelector(`[data-goto="#${targetElement.id}"]`)) navigatorCurrentItem = document.querySelector(`[data-goto="#${targetElement.id}"]`); else if (targetElement.classList.length) for (let index = 0; index < targetElement.classList.length; index++) {
                        const element = targetElement.classList[index];
                        if (document.querySelector(`[data-goto=".${element}"]`)) {
                            navigatorCurrentItem = document.querySelector(`[data-goto=".${element}"]`);
                            break;
                        }
                    }
                    if (entry.isIntersecting) navigatorCurrentItem ? navigatorCurrentItem.classList.add("_navigator-active") : null; else navigatorCurrentItem ? navigatorCurrentItem.classList.remove("_navigator-active") : null;
                }
            }
        }
        if (getHash()) {
            let goToHash;
            if (document.querySelector(`#${getHash()}`)) goToHash = `#${getHash()}`; else if (document.querySelector(`.${getHash()}`)) goToHash = `.${getHash()}`;
            goToHash ? gotoblock_gotoBlock(goToHash, true, 500, 20) : null;
        }
    }
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    !function(e, t) {
        "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.datepicker = t() : e.datepicker = t();
    }(window, (function() {
        return function(e) {
            var t = {};
            function n(a) {
                if (t[a]) return t[a].exports;
                var r = t[a] = {
                    i: a,
                    l: !1,
                    exports: {}
                };
                return e[a].call(r.exports, r, r.exports, n), r.l = !0, r.exports;
            }
            return n.m = e, n.c = t, n.d = function(e, t, a) {
                n.o(e, t) || Object.defineProperty(e, t, {
                    enumerable: !0,
                    get: a
                });
            }, n.r = function(e) {
                "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
                    value: "Module"
                }), Object.defineProperty(e, "__esModule", {
                    value: !0
                });
            }, n.t = function(e, t) {
                if (1 & t && (e = n(e)), 8 & t) return e;
                if (4 & t && "object" == typeof e && e && e.__esModule) return e;
                var a = Object.create(null);
                if (n.r(a), Object.defineProperty(a, "default", {
                    enumerable: !0,
                    value: e
                }), 2 & t && "string" != typeof e) for (var r in e) n.d(a, r, function(t) {
                    return e[t];
                }.bind(null, r));
                return a;
            }, n.n = function(e) {
                var t = e && e.__esModule ? function() {
                    return e.default;
                } : function() {
                    return e;
                };
                return n.d(t, "a", t), t;
            }, n.o = function(e, t) {
                return Object.prototype.hasOwnProperty.call(e, t);
            }, n.p = "", n(n.s = 0);
        }([ function(e, t, n) {
            n(1);
            var a = [], r = [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ], i = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ], s = {
                t: "top",
                r: "right",
                b: "bottom",
                l: "left",
                c: "centered"
            };
            function o() {}
            var l = [ "click", "focusin", "keydown", "input" ];
            function c(e) {
                return Array.isArray(e) ? e.map(c) : "[object Object]" === {}.toString.call(e) ? Object.keys(e).reduce((function(t, n) {
                    return t[n] = c(e[n]), t;
                }), {}) : e;
            }
            function d(e, t) {
                var n = e.calendar.querySelector(".qs-overlay"), a = n && !n.classList.contains("qs-hidden");
                t = t || new Date(e.currentYear, e.currentMonth), e.calendar.innerHTML = [ u(t, e, a), h(t, e, a), f(e, a) ].join(""), 
                a && setTimeout((function() {
                    w(!0, e);
                }), 10);
            }
            function u(e, t, n) {
                return [ '<div class="qs-controls' + (n ? " qs-blur" : "") + '">', '<div class="qs-arrow qs-left"></div>', '<div class="qs-month-year">', '<span class="qs-month">' + t.months[e.getMonth()] + "</span>", '<span class="qs-year">' + e.getFullYear() + "</span>", "</div>", '<div class="qs-arrow qs-right"></div>', "</div>" ].join("");
            }
            function h(e, t, n) {
                var a = t.currentMonth, r = t.currentYear, i = t.dateSelected, s = t.maxDate, o = t.minDate, l = t.showAllDates, c = t.days, d = t.disabledDates, u = t.disabler, h = t.noWeekends, f = t.startDay, v = t.weekendIndices, m = t.events, y = t.getRange ? t.getRange() : {}, p = +y.start, b = +y.end, D = new Date, q = r === D.getFullYear() && a === D.getMonth(), S = g(new Date(e).setDate(1)), w = S.getDay() - f, M = w < 0 ? 7 : 0;
                S.setMonth(S.getMonth() + 1), S.setDate(0);
                var x = S.getDate(), L = [], C = M + 7 * ((w + x) / 7 | 0);
                C += (w + x) % 7 ? 7 : 0, 0 !== f && 0 === w && (C += 7);
                for (var P = 1; P <= C; P++) {
                    var j = (P - 1) % 7, k = c[j], Y = P - (w >= 0 ? w : 7 + w), O = new Date(r, a, Y), N = m[+O], E = "qs-num", I = '<span class="qs-num">' + O.getDate() + "</span>", A = p && b && +O >= p && +O <= b;
                    Y < 1 || Y > x ? (E = "qs-empty qs-outside-current-month", l ? (N && (E += " qs-event"), 
                    E += " qs-disabled") : I = "") : ((o && O < o || s && O > s || u(O) || d.some((function(e) {
                        return e === +O;
                    })) || h && v.some((function(e) {
                        return e === j;
                    }))) && (E = "qs-disabled"), N && (E += " qs-event"), q && Y === D.getDate() && (E += " qs-current"), 
                    +O == +i && (E += " qs-active"), A && (E += " qs-range-date-" + j, p !== b && (E += +O === p ? " qs-range-date-start qs-active" : +O === b ? " qs-range-date-end qs-active" : " qs-range-date-middle"))), 
                    L.push('<div class="qs-square ' + E + " " + k + '">' + I + "</div>");
                }
                var F = c.map((function(e) {
                    return '<div class="qs-square qs-day">' + e + "</div>";
                })).concat(L);
                if (F.length % 7 != 0) throw "Calendar not constructed properly. The # of squares should be a multiple of 7.";
                return F.unshift('<div class="qs-squares' + (n ? " qs-blur" : "") + '">'), F.push("</div>"), 
                F.join("");
            }
            function f(e, t) {
                var n = e.overlayPlaceholder, a = e.overlayButton;
                return [ '<div class="qs-overlay' + (t ? "" : " qs-hidden") + '">', "<div>", '<input class="qs-overlay-year" placeholder="' + n + '" />', '<div class="qs-close">&#10005;</div>', "</div>", '<div class="qs-overlay-month-container">' + e.overlayMonths.map((function(e, t) {
                    return [ '<div class="qs-overlay-month" data-month-num="' + t + '">', '<span data-month-num="' + t + '">' + e + "</span>", "</div>" ].join("");
                })).join("") + "</div>", '<div class="qs-submit qs-disabled">' + a + "</div>", "</div>" ].join("");
            }
            function v(e, t, n) {
                var a = t.el, r = t.calendar.querySelector(".qs-active"), i = e.textContent, s = t.sibling;
                (a.disabled || a.readOnly) && t.respectDisabledReadOnly || (t.dateSelected = n ? void 0 : new Date(t.currentYear, t.currentMonth, i), 
                r && r.classList.remove("qs-active"), n || e.classList.add("qs-active"), y(a, t, n), 
                n || q(t), s && (m({
                    instance: t,
                    deselect: n
                }), t.first && !s.dateSelected && (s.currentYear = t.currentYear, s.currentMonth = t.currentMonth, 
                s.currentMonthName = t.currentMonthName), d(t), d(s)), t.onSelect(t, n ? void 0 : new Date(t.dateSelected)));
            }
            function m(e) {
                var t = e.instance.first ? e.instance : e.instance.sibling, n = t.sibling;
                t === e.instance ? e.deselect ? (t.minDate = t.originalMinDate, n.minDate = n.originalMinDate) : n.minDate = t.dateSelected : e.deselect ? (n.maxDate = n.originalMaxDate, 
                t.maxDate = t.originalMaxDate) : t.maxDate = n.dateSelected;
            }
            function y(e, t, n) {
                if (!t.nonInput) return n ? e.value = "" : t.formatter !== o ? t.formatter(e, t.dateSelected, t) : void (e.value = t.dateSelected.toDateString());
            }
            function p(e, t, n, a) {
                n || a ? (n && (t.currentYear = +n), a && (t.currentMonth = +a)) : (t.currentMonth += e.contains("qs-right") ? 1 : -1, 
                12 === t.currentMonth ? (t.currentMonth = 0, t.currentYear++) : -1 === t.currentMonth && (t.currentMonth = 11, 
                t.currentYear--)), t.currentMonthName = t.months[t.currentMonth], d(t), t.onMonthChange(t);
            }
            function b(e) {
                if (!e.noPosition) {
                    var t = e.position.top, n = e.position.right;
                    if (e.position.centered) return e.calendarContainer.classList.add("qs-centered");
                    var a = [ e.parent, e.el, e.calendarContainer ].map((function(e) {
                        return e.getBoundingClientRect();
                    })), r = a[0], i = a[1], s = a[2], o = i.top - r.top + e.parent.scrollTop - (t ? s.height : -1 * i.height) + "px", l = i.left - r.left + (n ? i.width - s.width : 0) + "px";
                    e.calendarContainer.style.setProperty("top", o), e.calendarContainer.style.setProperty("left", l);
                }
            }
            function D(e) {
                return "[object Date]" === {}.toString.call(e) && "Invalid Date" !== e.toString();
            }
            function g(e) {
                if (D(e) || "number" == typeof e && !isNaN(e)) {
                    var t = new Date(+e);
                    return new Date(t.getFullYear(), t.getMonth(), t.getDate());
                }
            }
            function q(e) {
                e.disabled || !e.calendarContainer.classList.contains("qs-hidden") && !e.alwaysShow && (w(!0, e), 
                e.calendarContainer.classList.add("qs-hidden"), e.onHide(e));
            }
            function S(e) {
                e.disabled || (e.calendarContainer.classList.remove("qs-hidden"), b(e), e.onShow(e));
            }
            function w(e, t) {
                var n = t.calendar;
                if (n) {
                    var a = n.querySelector(".qs-overlay"), r = a.querySelector(".qs-overlay-year"), i = n.querySelector(".qs-controls"), s = n.querySelector(".qs-squares");
                    e ? (a.classList.add("qs-hidden"), i.classList.remove("qs-blur"), s.classList.remove("qs-blur"), 
                    r.value = "") : (a.classList.remove("qs-hidden"), i.classList.add("qs-blur"), s.classList.add("qs-blur"), 
                    r.focus());
                }
            }
            function M(e, t, n, a) {
                var r = isNaN(+(new Date).setFullYear(t.value || void 0)), i = r ? null : t.value;
                if (13 === (e.which || e.keyCode) || "click" === e.type) a ? p(null, n, i, a) : r || t.classList.contains("qs-disabled") || p(null, n, i, a); else if (n.calendar.contains(t)) n.calendar.querySelector(".qs-submit").classList[r ? "add" : "remove"]("qs-disabled");
            }
            function x(e) {
                var t = e.type, n = e.target, r = n.classList, i = a.filter((function(e) {
                    return e.calendar.contains(n) || e.el === n;
                }))[0], s = i && i.calendar.contains(n);
                if (!(i && i.isMobile && i.disableMobile)) if ("click" === t) {
                    if (!i) return a.forEach(q);
                    if (i.disabled) return;
                    var o = i.calendar, l = i.calendarContainer, c = i.disableYearOverlay, d = i.nonInput, u = o.querySelector(".qs-overlay-year"), h = !!o.querySelector(".qs-hidden"), f = o.querySelector(".qs-month-year").contains(n), m = n.dataset.monthNum;
                    if (i.noPosition && !s) (l.classList.contains("qs-hidden") ? S : q)(i); else if (r.contains("qs-arrow")) p(r, i); else if (f || r.contains("qs-close")) c || w(!h, i); else if (m) M(e, u, i, m); else {
                        if (r.contains("qs-num")) {
                            var y = "SPAN" === n.nodeName ? n.parentNode : n;
                            return void (y.classList.contains("qs-active") ? v(y, i, !0) : y.classList.contains("qs-disabled") || v(y, i));
                        }
                        r.contains("qs-submit") && !r.contains("qs-disabled") ? M(e, u, i) : d && n === i.el && S(i);
                    }
                } else if ("focusin" === t && i) S(i), a.forEach((function(e) {
                    e !== i && q(e);
                })); else if ("keydown" === t && i && !i.disabled) {
                    var b = !i.calendar.querySelector(".qs-overlay").classList.contains("qs-hidden");
                    13 === (e.which || e.keyCode) && b && s ? M(e, n, i) : 27 === (e.which || e.keyCode) && b && s && w(!0, i);
                } else if ("input" === t) {
                    if (!i || !i.calendar.contains(n)) return;
                    var D = i.calendar.querySelector(".qs-submit"), g = n.value.split("").reduce((function(e, t) {
                        return e || "0" !== t ? e + (t.match(/[0-9]/) ? t : "") : "";
                    }), "").slice(0, 4);
                    n.value = g, D.classList[4 === g.length ? "remove" : "add"]("qs-disabled");
                }
            }
            function L() {
                S(this);
            }
            function C() {
                q(this);
            }
            function P(e, t) {
                var n = g(e), a = this.currentYear, r = this.currentMonth, i = this.sibling;
                if (null == e) return this.dateSelected = void 0, y(this.el, this, !0), i && (m({
                    instance: this,
                    deselect: !0
                }), d(i)), d(this), this;
                if (!D(e)) throw "`setDate` needs a JavaScript Date object.";
                if (this.disabledDates.some((function(e) {
                    return +e == +n;
                })) || n < this.minDate || n > this.maxDate) throw "You can't manually set a date that's disabled.";
                return this.dateSelected = n, t && (this.currentYear = n.getFullYear(), this.currentMonth = n.getMonth(), 
                this.currentMonthName = this.months[n.getMonth()]), y(this.el, this), i && (m({
                    instance: this
                }), d(i)), (a === n.getFullYear() && r === n.getMonth() || t) && d(this, n), this;
            }
            function j(e) {
                return Y(this, e, !0);
            }
            function k(e) {
                return Y(this, e);
            }
            function Y(e, t, n) {
                var a = e.dateSelected, r = e.first, i = e.sibling, s = e.minDate, o = e.maxDate, l = g(t), c = n ? "Min" : "Max";
                function u() {
                    return "original" + c + "Date";
                }
                function h() {
                    return c.toLowerCase() + "Date";
                }
                function f() {
                    return "set" + c;
                }
                function v() {
                    throw "Out-of-range date passed to " + f();
                }
                if (null == t) e[u()] = void 0, i ? (i[u()] = void 0, n ? (r && !a || !r && !i.dateSelected) && (e.minDate = void 0, 
                i.minDate = void 0) : (r && !i.dateSelected || !r && !a) && (e.maxDate = void 0, 
                i.maxDate = void 0)) : e[h()] = void 0; else {
                    if (!D(t)) throw "Invalid date passed to " + f();
                    i ? ((r && n && l > (a || o) || r && !n && l < (i.dateSelected || s) || !r && n && l > (i.dateSelected || o) || !r && !n && l < (a || s)) && v(), 
                    e[u()] = l, i[u()] = l, (n && (r && !a || !r && !i.dateSelected) || !n && (r && !i.dateSelected || !r && !a)) && (e[h()] = l, 
                    i[h()] = l)) : ((n && l > (a || o) || !n && l < (a || s)) && v(), e[h()] = l);
                }
                return i && d(i), d(e), e;
            }
            function O() {
                var e = this.first ? this : this.sibling, t = e.sibling;
                return {
                    start: e.dateSelected,
                    end: t.dateSelected
                };
            }
            function N() {
                var e = this.inlinePosition, t = this.parent, n = this.calendarContainer, r = this.el, i = this.sibling, s = this;
                e && (a.some((function(e) {
                    return e !== s && e.parent === t;
                })) || t.style.setProperty("position", null));
                for (var o in n.remove(), a = a.filter((function(e) {
                    return e.el !== r;
                })), i && delete i.sibling, this) delete this[o];
                a.length || l.forEach((function(e) {
                    document.removeEventListener(e, x);
                }));
            }
            e.exports = function(e, t) {
                a.length || l.forEach((function(e) {
                    document.addEventListener(e, x);
                }));
                var n = function(e, t) {
                    var n = e;
                    "string" == typeof n && (n = "#" === n[0] ? document.getElementById(n.slice(1)) : document.querySelector(n));
                    if (!n) throw "No selector / element found.";
                    var l = function(e, t) {
                        if (a.some((function(e) {
                            return e.el === t;
                        }))) throw "A datepicker already exists on that element.";
                        var n = c(e);
                        n.events && (n.events = n.events.reduce((function(e, t) {
                            if (!D(t)) throw '"options.events" must only contain valid JavaScript Date objects.';
                            return e[+g(t)] = !0, e;
                        }), {}));
                        [ "startDate", "dateSelected", "minDate", "maxDate" ].forEach((function(e) {
                            var t = n[e];
                            if (t && !D(t)) throw '"options.' + e + '" needs to be a valid JavaScript Date object.';
                            n[e] = g(t);
                        }));
                        var i = n.position, l = n.maxDate, d = n.minDate, u = n.dateSelected, h = n.overlayPlaceholder, f = n.overlayButton, v = n.startDay, m = n.id;
                        if (n.startDate = g(n.startDate || u || new Date), n.disabledDates = (n.disabledDates || []).map((function(e) {
                            var t = +g(e);
                            if (!D(e)) throw 'You supplied an invalid date to "options.disabledDates".';
                            if (t === +g(u)) throw '"disabledDates" cannot contain the same date as "dateSelected".';
                            return t;
                        })), n.hasOwnProperty("id") && null == m) throw "Id cannot be `null` or `undefined`";
                        if (null != m) {
                            var y = a.filter((function(e) {
                                return e.id === m;
                            }));
                            if (y.length > 1) throw "Only two datepickers can share an id.";
                            y.length ? (n.second = !0, n.sibling = y[0]) : n.first = !0;
                        }
                        var p = [ "tr", "tl", "br", "bl", "c" ].some((function(e) {
                            return i === e;
                        }));
                        if (i && !p) throw '"options.position" must be one of the following: tl, tr, bl, br, or c.';
                        if (n.position = function(e) {
                            var t = e[0], n = e[1], a = {};
                            a[s[t]] = 1, n && (a[s[n]] = 1);
                            return a;
                        }(i || "bl"), l < d) throw '"maxDate" in options is less than "minDate".';
                        if (u) {
                            function b(e) {
                                throw '"dateSelected" in options is ' + (e ? "less" : "greater") + ' than "' + (e || "max") + 'Date".';
                            }
                            d > u && b("min"), l < u && b();
                        }
                        if ([ "onSelect", "onShow", "onHide", "onMonthChange", "formatter", "disabler" ].forEach((function(e) {
                            "function" != typeof n[e] && (n[e] = o);
                        })), [ "customDays", "customMonths", "customOverlayMonths" ].forEach((function(e, t) {
                            var a = n[e], r = t ? 12 : 7;
                            if (a) {
                                if (!Array.isArray(a) || a.length !== r || a.some((function(e) {
                                    return "string" != typeof e;
                                }))) throw '"' + e + '" must be an array with ${num} strings.';
                                n[t ? t < 2 ? "months" : "overlayMonths" : "days"] = a;
                            }
                        })), v && v > 0 && v < 7) {
                            var q = (n.customDays || r).slice(), S = q.splice(0, v);
                            n.customDays = q.concat(S), n.startDay = +v, n.weekendIndices = [ q.length - 1, q.length ];
                        } else n.startDay = 0, n.weekendIndices = [ 6, 0 ];
                        "string" != typeof h && delete n.overlayPlaceholder;
                        "string" != typeof f && delete n.overlayButton;
                        return n;
                    }(t || {
                        startDate: g(new Date),
                        position: "bl"
                    }, n), d = n === document.body, u = d ? document.body : n.parentElement, h = document.createElement("div"), f = document.createElement("div");
                    h.className = "qs-datepicker-container qs-hidden", f.className = "qs-datepicker";
                    var v = {
                        el: n,
                        parent: u,
                        nonInput: "INPUT" !== n.nodeName,
                        noPosition: d,
                        position: !d && l.position,
                        startDate: l.startDate,
                        dateSelected: l.dateSelected,
                        disabledDates: l.disabledDates,
                        minDate: l.minDate,
                        maxDate: l.maxDate,
                        noWeekends: !!l.noWeekends,
                        weekendIndices: l.weekendIndices,
                        calendarContainer: h,
                        calendar: f,
                        currentMonth: (l.startDate || l.dateSelected).getMonth(),
                        currentMonthName: (l.months || i)[(l.startDate || l.dateSelected).getMonth()],
                        currentYear: (l.startDate || l.dateSelected).getFullYear(),
                        events: l.events || {},
                        setDate: P,
                        remove: N,
                        setMin: j,
                        setMax: k,
                        show: L,
                        hide: C,
                        onSelect: l.onSelect,
                        onShow: l.onShow,
                        onHide: l.onHide,
                        onMonthChange: l.onMonthChange,
                        formatter: l.formatter,
                        disabler: l.disabler,
                        months: l.months || i,
                        days: l.customDays || r,
                        startDay: l.startDay,
                        overlayMonths: l.overlayMonths || (l.months || i).map((function(e) {
                            return e.slice(0, 3);
                        })),
                        overlayPlaceholder: l.overlayPlaceholder || "4-digit year",
                        overlayButton: l.overlayButton || "Submit",
                        disableYearOverlay: !!l.disableYearOverlay,
                        disableMobile: !!l.disableMobile,
                        isMobile: "ontouchstart" in window,
                        alwaysShow: !!l.alwaysShow,
                        id: l.id,
                        showAllDates: !!l.showAllDates,
                        respectDisabledReadOnly: !!l.respectDisabledReadOnly,
                        first: l.first,
                        second: l.second
                    };
                    if (l.sibling) {
                        var m = l.sibling, p = v, b = m.minDate || p.minDate, q = m.maxDate || p.maxDate;
                        p.sibling = m, m.sibling = p, m.minDate = b, m.maxDate = q, p.minDate = b, p.maxDate = q, 
                        m.originalMinDate = b, m.originalMaxDate = q, p.originalMinDate = b, p.originalMaxDate = q, 
                        m.getRange = O, p.getRange = O;
                    }
                    l.dateSelected && y(n, v);
                    var w = getComputedStyle(u).position;
                    d || w && "static" !== w || (v.inlinePosition = !0, u.style.setProperty("position", "relative"));
                    v.inlinePosition && a.forEach((function(e) {
                        e.parent === v.parent && (e.inlinePosition = !0);
                    }));
                    a.push(v), h.appendChild(f), u.appendChild(h), v.alwaysShow && S(v);
                    return v;
                }(e, t);
                if (n.second) {
                    var u = n.sibling;
                    m({
                        instance: n,
                        deselect: !n.dateSelected
                    }), m({
                        instance: u,
                        deselect: !u.dateSelected
                    }), d(u);
                }
                return d(n, n.startDate || n.dateSelected), n.alwaysShow && b(n), n;
            };
        }, function(e, t, n) {} ]);
    }));
    let favoriteBtns = document.querySelectorAll(".jsFavorite");
    for (let i = 0; i < favoriteBtns.length; i++) favoriteBtns[i].addEventListener("click", (function(e) {
        e.preventDefault();
        this.classList.toggle("is-active");
    }));
    const accordionElems = Array.from(document.getElementsByClassName("jsAccordion"));
    if (accordionElems.length) accordionElems.forEach((accordionEl => {
        const accordionTrigger = accordionEl.querySelector(".jsAccordionTrigger");
        accordionTrigger.addEventListener("click", (() => {
            accordionEl.classList.toggle("is-open");
        }));
    }));
    window["FLS"] = true;
    isWebp();
    functions_tabs();
    pageNavigation();
})();