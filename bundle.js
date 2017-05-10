(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var hyperdom = require('hyperdom');
var h = hyperdom.html;
var calendar= require('hyperdom-calendar');

var model = {calendar:{}};

function render(model) {
  return h('div',
    h('div',
      calendar(model.calendar),
      h('h5','Day : ' + model.calendar.selected.day()),
      h('h5','Month : ' + model.calendar.selected.monthString()),
      h('h5','Year : ' + model.calendar.selected.year())
    ),
  )
}

hyperdom.append(document.body, render, model);

},{"hyperdom":12,"hyperdom-calendar":6}],2:[function(require,module,exports){

},{}],3:[function(require,module,exports){
/*!
 * Cross-Browser Split 1.1.1
 * Copyright 2007-2012 Steven Levithan <stevenlevithan.com>
 * Available under the MIT License
 * ECMAScript compliant, uniform cross-browser split method
 */

/**
 * Splits a string into an array of strings using a regex or string separator. Matches of the
 * separator are not included in the result array. However, if `separator` is a regex that contains
 * capturing groups, backreferences are spliced into the result each time `separator` is matched.
 * Fixes browser bugs compared to the native `String.prototype.split` and can be used reliably
 * cross-browser.
 * @param {String} str String to split.
 * @param {RegExp|String} separator Regex or string to use for separating the string.
 * @param {Number} [limit] Maximum number of items to include in the result array.
 * @returns {Array} Array of substrings.
 * @example
 *
 * // Basic use
 * split('a b c d', ' ');
 * // -> ['a', 'b', 'c', 'd']
 *
 * // With limit
 * split('a b c d', ' ', 2);
 * // -> ['a', 'b']
 *
 * // Backreferences in result array
 * split('..word1 word2..', /([a-z]+)(\d+)/i);
 * // -> ['..', 'word', '1', ' ', 'word', '2', '..']
 */
module.exports = (function split(undef) {

  var nativeSplit = String.prototype.split,
    compliantExecNpcg = /()??/.exec("")[1] === undef,
    // NPCG: nonparticipating capturing group
    self;

  self = function(str, separator, limit) {
    // If `separator` is not a regex, use `nativeSplit`
    if (Object.prototype.toString.call(separator) !== "[object RegExp]") {
      return nativeSplit.call(str, separator, limit);
    }
    var output = [],
      flags = (separator.ignoreCase ? "i" : "") + (separator.multiline ? "m" : "") + (separator.extended ? "x" : "") + // Proposed for ES6
      (separator.sticky ? "y" : ""),
      // Firefox 3+
      lastLastIndex = 0,
      // Make `global` and avoid `lastIndex` issues by working with a copy
      separator = new RegExp(separator.source, flags + "g"),
      separator2, match, lastIndex, lastLength;
    str += ""; // Type-convert
    if (!compliantExecNpcg) {
      // Doesn't need flags gy, but they don't hurt
      separator2 = new RegExp("^" + separator.source + "$(?!\\s)", flags);
    }
    /* Values for `limit`, per the spec:
     * If undefined: 4294967295 // Math.pow(2, 32) - 1
     * If 0, Infinity, or NaN: 0
     * If positive number: limit = Math.floor(limit); if (limit > 4294967295) limit -= 4294967296;
     * If negative number: 4294967296 - Math.floor(Math.abs(limit))
     * If other: Type-convert, then use the above rules
     */
    limit = limit === undef ? -1 >>> 0 : // Math.pow(2, 32) - 1
    limit >>> 0; // ToUint32(limit)
    while (match = separator.exec(str)) {
      // `separator.lastIndex` is not reliable cross-browser
      lastIndex = match.index + match[0].length;
      if (lastIndex > lastLastIndex) {
        output.push(str.slice(lastLastIndex, match.index));
        // Fix browsers whose `exec` methods don't consistently return `undefined` for
        // nonparticipating capturing groups
        if (!compliantExecNpcg && match.length > 1) {
          match[0].replace(separator2, function() {
            for (var i = 1; i < arguments.length - 2; i++) {
              if (arguments[i] === undef) {
                match[i] = undef;
              }
            }
          });
        }
        if (match.length > 1 && match.index < str.length) {
          Array.prototype.push.apply(output, match.slice(1));
        }
        lastLength = match[0].length;
        lastLastIndex = lastIndex;
        if (output.length >= limit) {
          break;
        }
      }
      if (separator.lastIndex === match.index) {
        separator.lastIndex++; // Avoid an infinite loop
      }
    }
    if (lastLastIndex === str.length) {
      if (lastLength || !separator.test("")) {
        output.push("");
      }
    } else {
      output.push(str.slice(lastLastIndex));
    }
    return output.length > limit ? output.slice(0, limit) : output;
  };

  return self;
})();

},{}],4:[function(require,module,exports){
(function (global){
var topLevel = typeof global !== 'undefined' ? global :
    typeof window !== 'undefined' ? window : {}
var minDoc = require('min-document');

var doccy;

if (typeof document !== 'undefined') {
    doccy = document;
} else {
    doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'];

    if (!doccy) {
        doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'] = minDoc;
    }
}

module.exports = doccy;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"min-document":2}],5:[function(require,module,exports){
var today = new Date();
var months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

var daysOfWeek = [
  'Mo',
  'Tu',
  'We',
  'Th',
  'Fr',
  'Sa',
  'Su'
]

function Calendar() {
  this.today =today,
  this.selected = {
    date: today,
    month: function () {
      return this.date.getMonth()
    },
    firstOfMonthDay:function () {
      return new Date(this.year(), this.month(), 1).getDay() - 1
    },
    nextMonth: function () {
      this.date = new Date(this.year(), this.month()+1, 1)
      return this.month()
    },
    prevMonth: function () {
      this.date = new Date(this.year(), this.month()-1, 1)
      return this.month()
    },
    setDay: function (day) {
      this.date = new Date(this.year(), this.month(), day)
      return this.day()
    },
    monthString: function () {
      return months[this.date.getMonth()]
    },
    day: function () {
      return this.date.getDate()
    },
    year: function () {
      return this.date.getFullYear()
    }
  }
}

module.exports = Calendar

},{}],6:[function(require,module,exports){
var hyperdom = require('hyperdom')
var h = hyperdom.html
var Calendar = require('./calendar');

var daysOfWeek = [
  'Mo',
  'Tu',
  'We',
  'Th',
  'Fr',
  'Sa',
  'Su'
]

function HyperdomCalendar(calendarModel) {
  if(!calendarModel.selected){
    Object.assign(calendarModel,new Calendar())
  }
  return renderCalendar(calendarModel)
}

function renderCalendar(calendarModel) {
  return h("div.animated.fadeIn",
    h("div.month",
      h("ul",
        h("li.prev",{ onclick:function () {
          calendarModel.selected.prevMonth()
        }}, "❮"),
        h("li.next",{ onclick:function () {
          calendarModel.selected.nextMonth()
        }}, "❯"),
        h("li",calendarModel.selected.monthString(),
          h("br"),
          h("span", {"style":{"font-size":"18px"}},  calendarModel.selected.year())))),
      listDaysOfWeek(calendarModel),
      listOfDaysForMonth(calendarModel)
    )
}

function listDaysOfWeek(calendarModel) {
  return h("ul.weekdays",
    daysOfWeek.map(function (weekday) {
      return h("li", weekday)
    })
  )
}

function listOfDaysForMonth(calendarModel) {
  var self = this
  var arrayOfDays = arrayFromOneToN(daysInMonth(calendarModel.selected.month(),calendarModel.selected.year()))
  return h("ul.days",
    arrayFromOneToN(calendarModel.selected.firstOfMonthDay()).map(function (weekday) {
      return h("li", '')
    }),
    arrayOfDays.map(function (day) {
      return h("li",{class:calendarModel.selected.day() == day ? 'active' : '',onclick:function () {
        calendarModel.selected.setDay(day)
      }}, day)
    })
  )
}

function arrayFromOneToN(end) {
  var start = 1;
  var temp = [];
  for (var i = start; i <= end; i++) {
      temp.push(i);
  }
  return temp;
}

Date.prototype.monthDays= function(){
  var d= new Date(this.getFullYear(), this.getMonth()+1, 0);
  return d.getDate();
}

function daysInMonth(month,year) {
  return new Date(year, month, 0).getDate();
}

module.exports = HyperdomCalendar

},{"./calendar":5,"hyperdom":12}],7:[function(require,module,exports){
var listener = require('./listener')
var binding = require('./binding')
var RefreshHook = require('./render').RefreshHook

module.exports = function (tag, attributes, children) {
  var type = inputType(tag, attributes)
  var bind = inputTypeBindings[type] || bindTextInput

  bind(attributes, children, binding(attributes.binding))
}

var inputTypeBindings = {
  text: bindTextInput,

  textarea: bindTextInput,

  checkbox: function (attributes, children, binding) {
    attributes.checked = binding.get()

    attachEventHandler(attributes, 'onclick', function (ev) {
      attributes.checked = ev.target.checked
      return binding.set(ev.target.checked)
    }, binding)
  },

  radio: function (attributes, children, binding) {
    var value = attributes.value
    attributes.checked = binding.get() === attributes.value
    attributes.on_hyperdomsyncchecked = listener(function (event) {
      attributes.checked = event.target.checked
    })

    attachEventHandler(attributes, 'onclick', function (event) {
      var name = event.target.name
      if (name) {
        var inputs = document.getElementsByName(name)
        for (var i = 0, l = inputs.length; i < l; i++) {
          inputs[i].dispatchEvent(customEvent('_hyperdomsyncchecked'))
        }
      }
      return binding.set(value)
    }, binding)
  },

  select: function (attributes, children, binding) {
    var currentValue = binding.get()

    var options = children.filter(function (child) {
      return child.tagName.toLowerCase() === 'option'
    })

    var values = []
    var selectedIndex

    for (var n = 0; n < options.length; n++) {
      var option = options[n]
      var hasValue = option.properties.hasOwnProperty('value')
      var value = option.properties.value
      var text = option.children.map(function (x) { return x.text }).join('')

      values.push(hasValue ? value : text)

      var selected = value === currentValue || text === currentValue

      if (selected) {
        selectedIndex = n
      }

      option.properties.selected = selected
      option.properties.value = n
    }

    if (selectedIndex !== undefined) {
      attributes.selectedIndex = selectedIndex
    }

    attachEventHandler(attributes, 'onchange', function (ev) {
      attributes.selectedIndex = ev.target.selectedIndex
      return binding.set(values[ev.target.value])
    }, binding)
  },

  file: function (attributes, children, binding) {
    var multiple = attributes.multiple

    attachEventHandler(attributes, 'onchange', function (ev) {
      if (multiple) {
        return binding.set(ev.target.files)
      } else {
        return binding.set(ev.target.files[0])
      }
    }, binding)
  }
}

function inputType (selector, attributes) {
  if (/^textarea\b/i.test(selector)) {
    return 'textarea'
  } else if (/^select\b/i.test(selector)) {
    return 'select'
  } else {
    return attributes.type || 'text'
  }
}

function bindTextInput (attributes, children, binding) {
  var textEventNames = ['onkeyup', 'oninput', 'onpaste', 'textInput']

  var bindingValue = binding.get()
  if (!(bindingValue instanceof Error)) {
    attributes.value = bindingValue !== undefined ? bindingValue : ''
  }

  attachEventHandler(attributes, textEventNames, function (ev) {
    if (binding.get() !== ev.target.value) {
      return binding.set(ev.target.value)
    }
  }, binding)
}

function attachEventHandler (attributes, eventNames, handler, binding) {
  if (eventNames instanceof Array) {
    for (var n = 0; n < eventNames.length; n++) {
      insertEventHandler(attributes, eventNames[n], handler)
    }
  } else {
    insertEventHandler(attributes, eventNames, handler)
  }
}

function insertEventHandler (attributes, eventName, handler) {
  var previousHandler = attributes[eventName]
  if (previousHandler) {
    attributes[eventName] = sequenceFunctions(handler, previousHandler)
  } else {
    attributes[eventName] = handler
  }
}

function sequenceFunctions (handler1, handler2) {
  return function (ev) {
    handler1(ev)
    if (handler2 instanceof RefreshHook) {
      return handler2.handler(ev)
    } else {
      return handler2(ev)
    }
  }
}

function customEvent (name) {
  if (typeof Event === 'function') {
    return new window.Event(name)
  } else {
    var event = document.createEvent('Event')
    event.initEvent(name, false, false)
    return event
  }
}

},{"./binding":8,"./listener":15,"./render":22}],8:[function(require,module,exports){
var meta = require('./meta')

module.exports = function (b) {
  var binding = b

  if (b instanceof Array) {
    binding = bindingObject.apply(undefined, b)
  } else if (b instanceof Object && (typeof b.set === 'function' || typeof b.get === 'function')) {
    binding = b
  } else {
    throw Error('hyperdom bindings must be either an array [object, property, setter] or an object { get(), set(value) }, instead binding was: ' + JSON.stringify(b))
  }

  return binding
}

function bindingObject (model, property, setter) {
  var _meta

  return {
    get: function () {
      return model[property]
    },

    set: function (value) {
      model[property] = value
      if (setter) {
        return setter(value)
      }
    },

    meta: function () {
      return _meta || (_meta = meta(model, property))
    }
  }
}

},{"./meta":16}],9:[function(require,module,exports){
var hyperdomMeta = require('./meta')
var render = require('./render')

function Component (model, options) {
  this.isViewComponent = options && options.hasOwnProperty('viewComponent') && options.viewComponent
  this.model = model
  this.key = model.renderKey
  this.component = undefined
}

Component.prototype.type = 'Widget'

Component.prototype.init = function () {
  var self = this

  if (self.model.onbeforeadd) {
    self.model.onbeforeadd()
  }
  if (self.model.onbeforerender) {
    self.model.onbeforerender()
  }

  var vdom = this.render()

  var meta = hyperdomMeta(this.model)
  meta.components.add(this)

  var currentRender = render.currentRender()
  this.component = currentRender.mount.createDomComponent()
  var element = this.component.create(vdom)

  if (self.model.onadd || self.model.onrender) {
    currentRender.finished.then(function () {
      if (self.model.onadd) {
        self.model.onadd(self.component.element)
      }
      if (self.model.onrender) {
        self.model.onrender(self.component.element)
      }
    })
  }

  if (self.model.detached) {
    return document.createTextNode('')
  } else {
    return element
  }
}

function beforeUpdate (model, element) {
  if (model.onbeforeupdate) {
    model.onbeforeupdate(element)
  }

  if (model.onbeforerender) {
    model.onbeforerender(element)
  }
}

function afterUpdate (model, element, oldElement) {
  if (model.onupdate) {
    model.onupdate(element, oldElement)
  }

  if (model.onrender) {
    model.onrender(element, oldElement)
  }
}

Component.prototype.update = function (previous) {
  var self = this

  if (this.isViewComponent) {
    var keys = Object.keys(this.model)
    for (var n = 0; n < keys.length; n++) {
      var key = keys[n]
      previous.model[key] = self.model[key]
    }
    this.model = previous.model
  }

  if (self.model.onupdate || self.model.onrender) {
    var currentRender = render.currentRender()
    currentRender.finished.then(function () {
      afterUpdate(self.model, self.component.element, oldElement)
    })
  }

  this.component = previous.component
  var oldElement = this.component.element

  beforeUpdate(this.model, oldElement)

  var element = this.component.update(this.render())

  if (self.model.detached) {
    return document.createTextNode('')
  } else {
    return element
  }
}

Component.prototype.render = function () {
  var currentRender = render.currentRender()
  return currentRender.mount.renderComponent(this.model)
}

Component.prototype.refresh = function () {
  var oldElement = this.component.element

  beforeUpdate(this.model, oldElement)
  this.component.update(this.render())
  afterUpdate(this.model, this.component.element, oldElement)
}

Component.prototype.destroy = function (element) {
  var self = this

  var meta = hyperdomMeta(this.model)
  meta.components.delete(this)

  if (self.model.onbeforeremove) {
    self.model.onbeforeremove(element)
  }

  if (self.model.onremove) {
    var currentRender = render.currentRender()
    currentRender.finished.then(function () {
      self.model.onremove(element)
    })
  }

  this.component.destroy()
}

module.exports = Component

},{"./meta":16,"./render":22}],10:[function(require,module,exports){
function deprecationWarning () {
  var warningIssued = false

  return function (arg) {
    if (!warningIssued) {
      console.warn(arg)
      warningIssued = true
    }
  }
}

module.exports = {
  refresh: deprecationWarning(),
  currentRender: deprecationWarning(),
  component: deprecationWarning(),
  renderFunction: deprecationWarning(),
  norefresh: deprecationWarning(),
  mapBinding: deprecationWarning(),
  viewComponent: deprecationWarning()
}

},{}],11:[function(require,module,exports){
var createElement = require('virtual-dom/create-element')
var diff = require('virtual-dom/diff')
var patch = require('virtual-dom/patch')
var toVdom = require('./toVdom')
var isVdom = require('./isVdom')

function DomComponent (options) {
  this.document = options && options.document
}

function prepareVdom (object) {
  var vdom = toVdom(object)
  if (!isVdom(vdom)) {
    throw new Error('expected render to return vdom')
  } else {
    return vdom
  }
}

DomComponent.prototype.create = function (vdom) {
  this.vdom = prepareVdom(vdom)
  return (this.element = createElement(this.vdom, {document: this.document}))
}

DomComponent.prototype.merge = function (vdom, element) {
  this.vdom = prepareVdom(vdom)
  return (this.element = element)
}

DomComponent.prototype.update = function (vdom) {
  var oldVdom = this.vdom
  this.vdom = prepareVdom(vdom)
  var patches = diff(oldVdom, this.vdom)
  return (this.element = patch(this.element, patches))
}

DomComponent.prototype.destroy = function (options) {
  function destroyWidgets (vdom) {
    if (vdom.type === 'Widget') {
      vdom.destroy()
    } else if (vdom.children) {
      vdom.children.forEach(destroyWidgets)
    }
  }

  destroyWidgets(this.vdom)

  if (options && options.removeElement && this.element.parentNode) {
    this.element.parentNode.removeChild(this.element)
  }
}

function domComponent (options) {
  return new DomComponent(options)
}

exports.create = domComponent

},{"./isVdom":13,"./toVdom":26,"virtual-dom/create-element":31,"virtual-dom/diff":32,"virtual-dom/patch":33}],12:[function(require,module,exports){
var rendering = require('./rendering')
var render = require('./render')
var viewComponent = require('./viewComponent')
var deprecations = require('./deprecations')

exports.html = rendering.html
exports.html.refreshify = render.refreshify
exports.rawHtml = rendering.rawHtml
exports.jsx = rendering.jsx
exports.attach = rendering.attach
exports.replace = rendering.replace
exports.append = rendering.append
exports.appendVDom = rendering.appendVDom
exports.binding = require('./binding')
exports.meta = require('./meta')
exports.refreshify = render.refreshify
exports.norefresh = require('./refreshEventResult').norefresh
exports.join = require('./join')
exports.viewComponent = viewComponent
exports.component = function (model) {
  deprecations.viewComponent('hyperdom.component is deprecated, use hyperdom.viewComponent instead')
  return viewComponent(model)
}

exports.currentRender = render.currentRender

},{"./binding":8,"./deprecations":10,"./join":14,"./meta":16,"./refreshEventResult":21,"./render":22,"./rendering":23,"./viewComponent":28}],13:[function(require,module,exports){
var virtualDomVersion = require('virtual-dom/vnode/version')

module.exports = function (x) {
  var type = x.type
  if (type === 'VirtualNode' || type === 'VirtualText') {
    return x.version === virtualDomVersion
  } else {
    return type === 'Widget' || type === 'Thunk'
  }
}

},{"virtual-dom/vnode/version":49}],14:[function(require,module,exports){
module.exports = function join (array, separator) {
  var output = []
  for (var i = 0, l = array.length; i < l; i++) {
    var item = array[i]
    if (i > 0) {
      output.push(separator)
    }
    output.push(item)
  }
  return output
}

},{}],15:[function(require,module,exports){
var refreshify = require('./render').refreshify

function ListenerHook (listener) {
  this.listener = refreshify(listener)
}

ListenerHook.prototype.hook = function (element, propertyName) {
  element.addEventListener(propertyName.substring(2), this.listener, false)
}

ListenerHook.prototype.unhook = function (element, propertyName) {
  element.removeEventListener(propertyName.substring(2), this.listener)
}

module.exports = function (listener) {
  return new ListenerHook(listener)
}

},{"./render":22}],16:[function(require,module,exports){
module.exports = function (model, property) {
  var hyperdomMeta = model._hyperdomMeta

  if (!hyperdomMeta) {
    hyperdomMeta = {}
    Object.defineProperty(model, '_hyperdomMeta', {value: hyperdomMeta})
  }

  if (property) {
    var meta = hyperdomMeta[property]

    if (!meta) {
      meta = hyperdomMeta[property] = {}
    }

    return meta
  } else {
    return hyperdomMeta
  }
}

},{}],17:[function(require,module,exports){
var hyperdomMeta = require('./meta')
var runRender = require('./render')
var domComponent = require('./domComponent')
var Set = require('./set')
var refreshEventResult = require('./refreshEventResult')
var Vtext = require('virtual-dom/vnode/vtext.js')
var PropertyHook = require('./propertyHook')

var lastId = 0

function Mount (model, options) {
  var win = (options && options.window) || window
  var router = typeof options === 'object' && options.hasOwnProperty('router') ? options.router : undefined
  this.requestRender = (options && options.requestRender) || win.requestAnimationFrame || win.setTimeout

  this.document = (options && options.document) || document
  this.model = model

  this.renderQueued = false
  this.mountRenderRequested = false
  this.componentRendersRequested = undefined
  this.id = ++lastId
  this.mounted = true
  this.router = router
}

Mount.prototype.refreshify = function (fn, options) {
  if (!fn) {
    return fn
  }

  if (options && (options.norefresh === true || options.refresh === false)) {
    return fn
  }

  var self = this

  return function () {
    var result = fn.apply(this, arguments)
    return refreshEventResult(result, self, options)
  }
}

Mount.prototype.transformFunctionAttribute = function (key, value) {
  return this.refreshify(value)
}

Mount.prototype.queueRender = function () {
  if (!this.renderQueued) {
    var self = this

    var requestRender = this.requestRender
    this.renderQueued = true

    requestRender(function () {
      self.renderQueued = false

      if (self.mounted) {
        if (self.mountRenderRequested) {
          self.refreshImmediately()
        } else if (self.componentRendersRequested) {
          self.refreshComponentsImmediately()
        }
      }
    })
  }
}

Mount.prototype.createDomComponent = function () {
  return domComponent.create({ document: this.document })
}

Mount.prototype.render = function () {
  if (this.router) {
    return this.router.render(this.model)
  } else {
    return this.model
  }
}

Mount.prototype.refresh = function () {
  this.mountRenderRequested = true
  this.queueRender()
}

Mount.prototype.refreshImmediately = function () {
  var self = this

  runRender(self, function () {
    var vdom = self.render()
    self.component.update(vdom)
    self.mountRenderRequested = false
  })
}

Mount.prototype.refreshComponentsImmediately = function () {
  var self = this

  runRender(self, function () {
    for (var i = 0, l = self.componentRendersRequested.length; i < l; i++) {
      var w = self.componentRendersRequested[i]
      w.refresh()
    }
    self.componentRendersRequested = undefined
  })
}

Mount.prototype.refreshComponent = function (component) {
  if (!this.componentRendersRequested) {
    this.componentRendersRequested = []
  }

  this.componentRendersRequested.push(component)
  this.queueRender()
}

Mount.prototype.setupModelComponent = function (model) {
  var self = this

  var meta = hyperdomMeta(model)

  if (!meta.mount) {
    meta.mount = this
    meta.components = new Set()

    model.refresh = function () {
      self.refresh()
    }

    model.refreshImmediately = function () {
      self.refreshImmediately()
    }

    model.refreshComponent = function () {
      var meta = hyperdomMeta(this)
      meta.components.forEach(function (w) {
        self.refreshComponent(w)
      })
    }

    if (typeof model.onload === 'function') {
      this.refreshify(function () { return model.onload() }, {refresh: 'promise'})()
    }
  }
}

Mount.prototype._renderComponent = function (model) {
  this.setupModelComponent(model)
  var vdom = typeof model.render === 'function' ? model.render() : new Vtext(JSON.stringify(model))

  if (vdom instanceof Array) {
    console.error('vdom returned from component cannot be an array, component: ', model)
    throw new Error('vdom returned from component cannot be an array')
  }

  if (vdom) {
    if (!vdom.properties) {
      vdom.properties = {}
    }

    vdom.properties._hyperdomMeta = new PropertyHook({
      component: model,
      render: runRender.currentRender()
    })
  }

  return vdom
}

Mount.prototype.renderComponent = function (model) {
  if (typeof model.renderCacheKey === 'function') {
    var meta = hyperdomMeta(model)
    var key = model.renderCacheKey()
    if (key !== undefined && meta.cacheKey === key && meta.cachedVdom) {
      return meta.cachedVdom
    } else {
      meta.cacheKey = key
      return (meta.cachedVdom = this._renderComponent(model))
    }
  } else {
    return this._renderComponent(model)
  }
}

Mount.prototype.detach = function () {
  this.mounted = false
}

Mount.prototype.remove = function () {
  if (this.router) {
    this.router.reset()
  }
  this.component.destroy({removeElement: true})
  this.mounted = false
}

module.exports = Mount

},{"./domComponent":11,"./meta":16,"./propertyHook":19,"./refreshEventResult":21,"./render":22,"./set":24,"virtual-dom/vnode/vtext.js":52}],18:[function(require,module,exports){
var render = require('./render')
var bindModel = require('./bindModel')

module.exports = function (tag, attributes, childElements) {
  var dataset
  var currentRender = render.currentRender()

  if (attributes.binding) {
    bindModel(tag, attributes, childElements)
    delete attributes.binding
  }

  var keys = Object.keys(attributes)
  for (var k = 0; k < keys.length; k++) {
    var key = keys[k]
    var attribute = attributes[key]

    if (typeof (attribute) === 'function' && currentRender) {
      attributes[key] = currentRender.transformFunctionAttribute(key, attribute)
    }

    var rename = renames[key]
    if (rename) {
      attributes[rename] = attribute
      delete attributes[key]
      continue
    }

    if (dataAttributeRegex.test(key)) {
      if (!dataset) {
        dataset = attributes.dataset

        if (!dataset) {
          dataset = attributes.dataset = {}
        }
      }

      var datakey = key
        .replace(dataAttributeRegex, '')
        .replace(/-([a-z])/ig, function (_, x) { return x.toUpperCase() })

      dataset[datakey] = attribute
      delete attributes[key]
      continue
    }
  }

  if (attributes.__source) {
    if (!dataset) {
      dataset = attributes.dataset

      if (!dataset) {
        dataset = attributes.dataset = {}
      }
    }

    dataset.fileName = attributes.__source.fileName
    dataset.lineNumber = attributes.__source.lineNumber
  }

  if (attributes.className) {
    attributes.className = generateClassName(attributes.className)
  }

  return attributes
}

var renames = {
  for: 'htmlFor',
  class: 'className',
  contenteditable: 'contentEditable',
  tabindex: 'tabIndex',
  colspan: 'colSpan'
}

var dataAttributeRegex = /^data-/

function generateClassName (obj) {
  if (typeof (obj) === 'object') {
    if (obj instanceof Array) {
      var names = obj.map(function (item) {
        return generateClassName(item)
      })
      return names.join(' ') || undefined
    } else {
      return generateConditionalClassNames(obj)
    }
  } else {
    return obj
  }
}

function generateConditionalClassNames (obj) {
  return Object.keys(obj).filter(function (key) {
    return obj[key]
  }).join(' ') || undefined
}

},{"./bindModel":7,"./render":22}],19:[function(require,module,exports){
function PropertyHook (value) {
  this.value = value
}

PropertyHook.prototype.hook = function (element, property) {
  element[property] = this.value
}

PropertyHook.prototype.unhook = function (element, property) {
  delete element[property]
}

module.exports = PropertyHook

},{}],20:[function(require,module,exports){
var render = require('./render')
var refreshEventResult = require('./refreshEventResult')

module.exports = function (promise) {
  refreshEventResult(promise, render.currentRender().mount, {refresh: 'promise'})
}

},{"./refreshEventResult":21,"./render":22}],21:[function(require,module,exports){
var deprecations = require('./deprecations')

module.exports = refreshEventResult

var norefresh = {}

function norefreshFunction () {
  return norefresh
}

module.exports.norefresh = norefreshFunction

function refreshEventResult (result, mount, options) {
  var onlyRefreshAfterPromise = options && options.refresh === 'promise'
  var componentToRefresh = options && options.component

  if (result && typeof (result.then) === 'function') {
    result.then(function (result) {
      var opts = cloneOptions(options)
      opts.refresh = undefined
      refreshEventResult(result, mount, opts)
    })
  }

  if (onlyRefreshAfterPromise) {
    return
  }

  if (isComponent(result)) {
    mount.refreshComponent(result)
  } else if (result instanceof Array) {
    for (var i = 0; i < result.length; i++) {
      refreshEventResult(result[i], mount, options)
    }
  } else if (componentToRefresh) {
    if (componentToRefresh.refreshComponent) {
      componentToRefresh.refreshComponent()
    } else {
      componentToRefresh.refresh()
    }
  } else if (result === norefresh) {
    // don't refresh;
  } else if (result === norefreshFunction) {
    deprecations.norefresh('hyperdom.norefresh is deprecated, please use hyperdom.norefresh()')
    // don't refresh;
  } else {
    mount.refresh()
    return result
  }
}

function isComponent (component) {
  return component &&
    ((typeof component.init === 'function' &&
       typeof component.update === 'function' &&
       typeof component.destroy === 'function') || (typeof component.refreshComponent === 'function'))
}

function cloneOptions (options) {
  if (options) {
    return {
      norefresh: options.norefresh,
      refresh: options.refresh,
      component: options.component
    }
  } else {
    return {}
  }
}

},{"./deprecations":10}],22:[function(require,module,exports){
var simplePromise = require('./simplePromise')

function runRender (mount, fn) {
  var render = new Render(mount)

  try {
    runRender._currentRender = render

    return fn()
  } finally {
    render.finished.fulfill()
    runRender._currentRender = undefined
  }
}

function Render (mount) {
  this.finished = simplePromise()
  this.mount = mount
  this.attachment = mount
}

Render.prototype.transformFunctionAttribute = function () {
  return this.mount.transformFunctionAttribute.apply(this.mount, arguments)
}

module.exports = runRender
module.exports.currentRender = currentRender
module.exports.refreshify = refreshify
module.exports.RefreshHook = RefreshHook

function currentRender () {
  return runRender._currentRender || defaultRender
}

var defaultRender = {
  mount: {
    renderComponent: function (model) { return model.render() },
    refreshify: function (fn) { return fn }
  },

  transformFunctionAttribute: function (key, value) {
    return new RefreshHook(value)
  },

  finished: {
    then: function (fn) {
      fn()
    }
  }
}

function refreshify (fn, options) {
  return runRender.currentRender().mount.refreshify(fn, options)
}

function RefreshHook (handler) {
  this.handler = handler
}

RefreshHook.prototype.hook = function (node, property) {
  node[property] = refreshify(this.handler)
}

RefreshHook.prototype.unhook = function (node, property) {
  node[property] = null
}

},{"./simplePromise":25}],23:[function(require,module,exports){
var vhtml = require('./vhtml')
var domComponent = require('./domComponent')
var bindingMeta = require('./meta')
var toVdom = require('./toVdom')
var parseTag = require('virtual-dom/virtual-hyperscript/parse-tag')
var Mount = require('./mount')
var Component = require('./component')
var render = require('./render')
var deprecations = require('./deprecations')
var prepareAttributes = require('./prepareAttributes')
var binding = require('./binding')
var refreshAfter = require('./refreshAfter')
var refreshEventResult = require('./refreshEventResult')

exports.append = function (element, render, model, options) {
  return startAttachment(render, model, options, function (mount, domComponentOptions) {
    var component = domComponent.create(domComponentOptions)
    var vdom = mount.render()
    element.appendChild(component.create(vdom))
    return component
  })
}

exports.replace = function (element, render, model, options) {
  return startAttachment(render, model, options, function (mount, domComponentOptions) {
    var component = domComponent.create(domComponentOptions)
    var vdom = mount.render()
    element.parentNode.replaceChild(component.create(vdom), element)
    return component
  })
}

exports.appendVDom = function (vdom, render, model, options) {
  return startAttachment(render, model, options, function (mount) {
    var component = {
      create: function (newVDom) {
        vdom.children = []
        if (newVDom) {
          vdom.children.push(toVdom(newVDom))
        }
      },
      update: function (newVDom) {
        vdom.children = []
        if (newVDom) {
          vdom.children.push(toVdom(newVDom))
        }
      }
    }
    component.create(mount.render())
    return component
  })
}

function startAttachment (render, model, options, attachToDom) {
  if (typeof render === 'object') {
    return start(render, attachToDom, model)
  } else {
    deprecations.renderFunction('hyperdom.append and hyperdom.replace with render functions are deprecated, please pass a component')
    return start({render: function () { return render(model) }}, attachToDom, options)
  }
}

function start (model, attachToDom, options) {
  var mount = new Mount(model, options)
  render(mount, function () {
    if (options) {
      var domComponentOptions = {document: options.document}
    }
    mount.component = attachToDom(mount, domComponentOptions)
  })
  return mount
}

/**
 * this function is quite ugly and you may be very tempted
 * to refactor it into smaller functions, I certainly am.
 * however, it was written like this for performance
 * so think of that before refactoring! :)
 */
exports.html = function (hierarchySelector) {
  var hasHierarchy = hierarchySelector.indexOf(' ') >= 0
  var selector, selectorElements

  if (hasHierarchy) {
    selectorElements = hierarchySelector.match(/\S+/g)
    selector = selectorElements[selectorElements.length - 1]
  } else {
    selector = hierarchySelector
  }

  var childElements
  var vdom
  var tag
  var attributes = arguments[1]

  if (attributes && attributes.constructor === Object && typeof attributes.render !== 'function') {
    childElements = toVdom.recursive(Array.prototype.slice.call(arguments, 2))
    prepareAttributes(selector, attributes, childElements)
    tag = parseTag(selector, attributes)
    vdom = vhtml(tag, attributes, childElements)
  } else {
    attributes = {}
    childElements = toVdom.recursive(Array.prototype.slice.call(arguments, 1))
    tag = parseTag(selector, attributes)
    vdom = vhtml(tag, attributes, childElements)
  }

  if (hasHierarchy) {
    for (var n = selectorElements.length - 2; n >= 0; n--) {
      vdom = vhtml(selectorElements[n], {}, [vdom])
    }
  }

  return vdom
}

exports.jsx = function (tag, attributes) {
  var childElements = toVdom.recursive(Array.prototype.slice.call(arguments, 2))
  if (typeof tag === 'string') {
    if (attributes) {
      prepareAttributes(tag, attributes, childElements)
    }
    return vhtml(tag, attributes || {}, childElements)
  } else {
    return new Component(new tag(attributes, childElements), {viewComponent: true}) // eslint-disable-line new-cap
  }
}

Object.defineProperty(exports.html, 'currentRender', {get: function () {
  deprecations.currentRender('hyperdom.html.currentRender is deprecated, please use hyperdom.currentRender() instead')
  return render._currentRender
}})

Object.defineProperty(exports.html, 'refresh', {get: function () {
  deprecations.refresh('hyperdom.html.refresh is deprecated, please use component.refresh() instead')
  if (render._currentRender) {
    var currentRender = render._currentRender
    return function (result) {
      refreshEventResult(result, currentRender.mount)
    }
  } else {
    throw new Error('Please assign hyperdom.html.refresh during a render cycle if you want to use it in event handlers. See https://github.com/featurist/hyperdom#refresh-outside-render-cycle')
  }
}})

Object.defineProperty(exports.html, 'norefresh', {get: function () {
  deprecations.refresh('hyperdom.html.norefresh is deprecated, please use hyperdom.norefresh() instead')
  return refreshEventResult.norefresh
}})

Object.defineProperty(exports.html, 'binding', {get: function () {
  deprecations.refresh('hyperdom.html.binding() is deprecated, please use hyperdom.binding() instead')
  return binding
}})

Object.defineProperty(exports.html, 'refreshAfter', {get: function () {
  deprecations.refresh("hyperdom.html.refreshAfter() is deprecated, please use require('hyperdom/refreshAfter')() instead")
  return refreshAfter
}})

exports.html.meta = bindingMeta

function rawHtml () {
  var selector
  var html
  var options

  if (arguments.length === 2) {
    selector = arguments[0]
    html = arguments[1]
    options = {innerHTML: html}
    return exports.html(selector, options)
  } else {
    selector = arguments[0]
    options = arguments[1]
    html = arguments[2]
    options.innerHTML = html
    return exports.html(selector, options)
  }
}

exports.html.rawHtml = rawHtml

},{"./binding":8,"./component":9,"./deprecations":10,"./domComponent":11,"./meta":16,"./mount":17,"./prepareAttributes":18,"./refreshAfter":20,"./refreshEventResult":21,"./render":22,"./toVdom":26,"./vhtml":27,"virtual-dom/virtual-hyperscript/parse-tag":42}],24:[function(require,module,exports){
if (typeof Set === 'function') {
  module.exports = Set
} else {
  module.exports = function () {
    this.items = []
  }

  module.exports.prototype.add = function (widget) {
    if (this.items.indexOf(widget) === -1) {
      this.items.push(widget)
    }
  }

  module.exports.prototype.delete = function (widget) {
    var i = this.items.indexOf(widget)
    if (i !== -1) {
      this.items.splice(i, 1)
    }
  }

  module.exports.prototype.forEach = function (fn) {
    for (var n = 0; n < this.items.length; n++) {
      fn(this.items[n])
    }
  }
}

},{}],25:[function(require,module,exports){
function SimplePromise () {
  this.listeners = []
}

SimplePromise.prototype.fulfill = function (value) {
  if (!this.isFulfilled) {
    this.isFulfilled = true
    this.value = value
    this.listeners.forEach(function (listener) {
      listener()
    })
  }
}

SimplePromise.prototype.then = function (success) {
  if (this.isFulfilled) {
    success(this.value)
  } else {
    this.listeners.push(success)
  }
}

module.exports = function () {
  return new SimplePromise()
}

},{}],26:[function(require,module,exports){
var Vtext = require('virtual-dom/vnode/vtext.js')
var isVdom = require('./isVdom')
var Component = require('./component')

function toVdom (object) {
  if (object === undefined || object === null) {
    return new Vtext('')
  } else if (typeof (object) !== 'object') {
    return new Vtext(String(object))
  } else if (object instanceof Date) {
    return new Vtext(String(object))
  } else if (object instanceof Error) {
    return new Vtext(object.toString())
  } else if (isVdom(object)) {
    return object
  } else if (typeof object.render === 'function') {
    return new Component(object)
  } else {
    return new Vtext(JSON.stringify(object))
  }
}

module.exports = toVdom

function addChild (children, child) {
  if (child instanceof Array) {
    for (var n = 0; n < child.length; n++) {
      addChild(children, child[n])
    }
  } else {
    children.push(toVdom(child))
  }
}

module.exports.recursive = function (child) {
  var children = []
  addChild(children, child)
  return children
}

},{"./component":9,"./isVdom":13,"virtual-dom/vnode/vtext.js":52}],27:[function(require,module,exports){
'use strict'

var VNode = require('virtual-dom/vnode/vnode.js')
var isHook = require('virtual-dom/vnode/is-vhook')
var xml = require('./xml')

var softSetHook = require('virtual-dom/virtual-hyperscript/hooks/soft-set-hook.js')

module.exports = h

function h (tagName, props, children) {
  var tag = tagName

  // support keys
  if (props.hasOwnProperty('key')) {
    var key = props.key
    props.key = undefined
  }

  // support namespace
  if (props.hasOwnProperty('namespace')) {
    var namespace = props.namespace
    props.namespace = undefined
  }

  // fix cursor bug
  if (tag.toLowerCase() === 'input' &&
    !namespace &&
    props.hasOwnProperty('value') &&
    props.value !== undefined &&
    !isHook(props.value)
  ) {
    props.value = softSetHook(props.value)
  }

  var vnode = new VNode(tag, props, children, key, namespace)

  if (props.xmlns) {
    xml.transform(vnode)
  }

  return vnode
}

},{"./xml":29,"virtual-dom/virtual-hyperscript/hooks/soft-set-hook.js":41,"virtual-dom/vnode/is-vhook":45,"virtual-dom/vnode/vnode.js":50}],28:[function(require,module,exports){
var Component = require('./component')

module.exports = function (model) {
  return new Component(model, {viewComponent: true})
}

},{"./component":9}],29:[function(require,module,exports){
var AttributeHook = require('virtual-dom/virtual-hyperscript/hooks/attribute-hook')

var namespaceRegex = /^([a-z0-9_-]+)(--|:)([a-z0-9_-]+)$/i
var xmlnsRegex = /^xmlns(--|:)([a-z0-9_-]+)$/i

function transformTanName (vnode, namespaces) {
  var tagNamespace = namespaceRegex.exec(vnode.tagName)
  if (tagNamespace) {
    var namespaceKey = tagNamespace[1]
    var namespace = namespaces[namespaceKey]
    if (namespace) {
      vnode.tagName = tagNamespace[1] + ':' + tagNamespace[3]
      vnode.namespace = namespace
    }
  } else if (!vnode.namespace) {
    vnode.namespace = namespaces['']
  }
}

function transformProperties (vnode, namespaces) {
  var properties = vnode.properties

  if (properties) {
    var attributes = properties.attributes || (properties.attributes = {})

    var keys = Object.keys(properties)
    for (var k = 0, l = keys.length; k < l; k++) {
      var key = keys[k]
      if (key !== 'style' && key !== 'attributes') {
        var match = namespaceRegex.exec(key)
        if (match) {
          properties[match[1] + ':' + match[3]] = new AttributeHook(namespaces[match[1]], properties[key])
          delete properties[key]
        } else {
          var property = properties[key]
          var type = typeof property
          if (type === 'string' || type === 'number' || type === 'boolean') {
            attributes[key] = property
          }
        }
      }
    }
  }
}

function declaredNamespaces (vnode) {
  var namespaces = {
    '': vnode.properties.xmlns,
    xmlns: 'http://www.w3.org/2000/xmlns/'
  }

  var keys = Object.keys(vnode.properties)

  for (var k = 0, l = keys.length; k < l; k++) {
    var key = keys[k]
    var value = vnode.properties[key]

    if (key === 'xmlns') {
      namespaces[''] = value
    } else {
      var match = xmlnsRegex.exec(key)

      if (match) {
        namespaces[match[2]] = value
      }
    }
  }

  return namespaces
}

function transform (vnode) {
  var namespaces = declaredNamespaces(vnode)

  function transformChildren (vnode, namespaces) {
    transformTanName(vnode, namespaces)
    transformProperties(vnode, namespaces)

    if (vnode.children) {
      for (var c = 0, l = vnode.children.length; c < l; c++) {
        var child = vnode.children[c]
        if (!(child.properties && child.properties.xmlns)) {
          transformChildren(child, namespaces)
        }
      }
    }
  }

  transformChildren(vnode, namespaces)

  return vnode
}

module.exports.transform = transform

},{"virtual-dom/virtual-hyperscript/hooks/attribute-hook":40}],30:[function(require,module,exports){
"use strict";

module.exports = function isObject(x) {
	return typeof x === "object" && x !== null;
};

},{}],31:[function(require,module,exports){
var createElement = require("./vdom/create-element.js")

module.exports = createElement

},{"./vdom/create-element.js":35}],32:[function(require,module,exports){
var diff = require("./vtree/diff.js")

module.exports = diff

},{"./vtree/diff.js":54}],33:[function(require,module,exports){
var patch = require("./vdom/patch.js")

module.exports = patch

},{"./vdom/patch.js":38}],34:[function(require,module,exports){
var isObject = require("is-object")
var isHook = require("../vnode/is-vhook.js")

module.exports = applyProperties

function applyProperties(node, props, previous) {
    for (var propName in props) {
        var propValue = props[propName]

        if (propValue === undefined) {
            removeProperty(node, propName, propValue, previous);
        } else if (isHook(propValue)) {
            removeProperty(node, propName, propValue, previous)
            if (propValue.hook) {
                propValue.hook(node,
                    propName,
                    previous ? previous[propName] : undefined)
            }
        } else {
            if (isObject(propValue)) {
                patchObject(node, props, previous, propName, propValue);
            } else {
                node[propName] = propValue
            }
        }
    }
}

function removeProperty(node, propName, propValue, previous) {
    if (previous) {
        var previousValue = previous[propName]

        if (!isHook(previousValue)) {
            if (propName === "attributes") {
                for (var attrName in previousValue) {
                    node.removeAttribute(attrName)
                }
            } else if (propName === "style") {
                for (var i in previousValue) {
                    node.style[i] = ""
                }
            } else if (typeof previousValue === "string") {
                node[propName] = ""
            } else {
                node[propName] = null
            }
        } else if (previousValue.unhook) {
            previousValue.unhook(node, propName, propValue)
        }
    }
}

function patchObject(node, props, previous, propName, propValue) {
    var previousValue = previous ? previous[propName] : undefined

    // Set attributes
    if (propName === "attributes") {
        for (var attrName in propValue) {
            var attrValue = propValue[attrName]

            if (attrValue === undefined) {
                node.removeAttribute(attrName)
            } else {
                node.setAttribute(attrName, attrValue)
            }
        }

        return
    }

    if(previousValue && isObject(previousValue) &&
        getPrototype(previousValue) !== getPrototype(propValue)) {
        node[propName] = propValue
        return
    }

    if (!isObject(node[propName])) {
        node[propName] = {}
    }

    var replacer = propName === "style" ? "" : undefined

    for (var k in propValue) {
        var value = propValue[k]
        node[propName][k] = (value === undefined) ? replacer : value
    }
}

function getPrototype(value) {
    if (Object.getPrototypeOf) {
        return Object.getPrototypeOf(value)
    } else if (value.__proto__) {
        return value.__proto__
    } else if (value.constructor) {
        return value.constructor.prototype
    }
}

},{"../vnode/is-vhook.js":45,"is-object":30}],35:[function(require,module,exports){
var document = require("global/document")

var applyProperties = require("./apply-properties")

var isVNode = require("../vnode/is-vnode.js")
var isVText = require("../vnode/is-vtext.js")
var isWidget = require("../vnode/is-widget.js")
var handleThunk = require("../vnode/handle-thunk.js")

module.exports = createElement

function createElement(vnode, opts) {
    var doc = opts ? opts.document || document : document
    var warn = opts ? opts.warn : null

    vnode = handleThunk(vnode).a

    if (isWidget(vnode)) {
        return vnode.init()
    } else if (isVText(vnode)) {
        return doc.createTextNode(vnode.text)
    } else if (!isVNode(vnode)) {
        if (warn) {
            warn("Item is not a valid virtual dom node", vnode)
        }
        return null
    }

    var node = (vnode.namespace === null) ?
        doc.createElement(vnode.tagName) :
        doc.createElementNS(vnode.namespace, vnode.tagName)

    var props = vnode.properties
    applyProperties(node, props)

    var children = vnode.children

    for (var i = 0; i < children.length; i++) {
        var childNode = createElement(children[i], opts)
        if (childNode) {
            node.appendChild(childNode)
        }
    }

    return node
}

},{"../vnode/handle-thunk.js":43,"../vnode/is-vnode.js":46,"../vnode/is-vtext.js":47,"../vnode/is-widget.js":48,"./apply-properties":34,"global/document":4}],36:[function(require,module,exports){
// Maps a virtual DOM tree onto a real DOM tree in an efficient manner.
// We don't want to read all of the DOM nodes in the tree so we use
// the in-order tree indexing to eliminate recursion down certain branches.
// We only recurse into a DOM node if we know that it contains a child of
// interest.

var noChild = {}

module.exports = domIndex

function domIndex(rootNode, tree, indices, nodes) {
    if (!indices || indices.length === 0) {
        return {}
    } else {
        indices.sort(ascending)
        return recurse(rootNode, tree, indices, nodes, 0)
    }
}

function recurse(rootNode, tree, indices, nodes, rootIndex) {
    nodes = nodes || {}


    if (rootNode) {
        if (indexInRange(indices, rootIndex, rootIndex)) {
            nodes[rootIndex] = rootNode
        }

        var vChildren = tree.children

        if (vChildren) {

            var childNodes = rootNode.childNodes

            for (var i = 0; i < tree.children.length; i++) {
                rootIndex += 1

                var vChild = vChildren[i] || noChild
                var nextIndex = rootIndex + (vChild.count || 0)

                // skip recursion down the tree if there are no nodes down here
                if (indexInRange(indices, rootIndex, nextIndex)) {
                    recurse(childNodes[i], vChild, indices, nodes, rootIndex)
                }

                rootIndex = nextIndex
            }
        }
    }

    return nodes
}

// Binary search for an index in the interval [left, right]
function indexInRange(indices, left, right) {
    if (indices.length === 0) {
        return false
    }

    var minIndex = 0
    var maxIndex = indices.length - 1
    var currentIndex
    var currentItem

    while (minIndex <= maxIndex) {
        currentIndex = ((maxIndex + minIndex) / 2) >> 0
        currentItem = indices[currentIndex]

        if (minIndex === maxIndex) {
            return currentItem >= left && currentItem <= right
        } else if (currentItem < left) {
            minIndex = currentIndex + 1
        } else  if (currentItem > right) {
            maxIndex = currentIndex - 1
        } else {
            return true
        }
    }

    return false;
}

function ascending(a, b) {
    return a > b ? 1 : -1
}

},{}],37:[function(require,module,exports){
var applyProperties = require("./apply-properties")

var isWidget = require("../vnode/is-widget.js")
var VPatch = require("../vnode/vpatch.js")

var updateWidget = require("./update-widget")

module.exports = applyPatch

function applyPatch(vpatch, domNode, renderOptions) {
    var type = vpatch.type
    var vNode = vpatch.vNode
    var patch = vpatch.patch

    switch (type) {
        case VPatch.REMOVE:
            return removeNode(domNode, vNode)
        case VPatch.INSERT:
            return insertNode(domNode, patch, renderOptions)
        case VPatch.VTEXT:
            return stringPatch(domNode, vNode, patch, renderOptions)
        case VPatch.WIDGET:
            return widgetPatch(domNode, vNode, patch, renderOptions)
        case VPatch.VNODE:
            return vNodePatch(domNode, vNode, patch, renderOptions)
        case VPatch.ORDER:
            reorderChildren(domNode, patch)
            return domNode
        case VPatch.PROPS:
            applyProperties(domNode, patch, vNode.properties)
            return domNode
        case VPatch.THUNK:
            return replaceRoot(domNode,
                renderOptions.patch(domNode, patch, renderOptions))
        default:
            return domNode
    }
}

function removeNode(domNode, vNode) {
    var parentNode = domNode.parentNode

    if (parentNode) {
        parentNode.removeChild(domNode)
    }

    destroyWidget(domNode, vNode);

    return null
}

function insertNode(parentNode, vNode, renderOptions) {
    var newNode = renderOptions.render(vNode, renderOptions)

    if (parentNode) {
        parentNode.appendChild(newNode)
    }

    return parentNode
}

function stringPatch(domNode, leftVNode, vText, renderOptions) {
    var newNode

    if (domNode.nodeType === 3) {
        domNode.replaceData(0, domNode.length, vText.text)
        newNode = domNode
    } else {
        var parentNode = domNode.parentNode
        newNode = renderOptions.render(vText, renderOptions)

        if (parentNode && newNode !== domNode) {
            parentNode.replaceChild(newNode, domNode)
        }
    }

    return newNode
}

function widgetPatch(domNode, leftVNode, widget, renderOptions) {
    var updating = updateWidget(leftVNode, widget)
    var newNode

    if (updating) {
        newNode = widget.update(leftVNode, domNode) || domNode
    } else {
        newNode = renderOptions.render(widget, renderOptions)
    }

    var parentNode = domNode.parentNode

    if (parentNode && newNode !== domNode) {
        parentNode.replaceChild(newNode, domNode)
    }

    if (!updating) {
        destroyWidget(domNode, leftVNode)
    }

    return newNode
}

function vNodePatch(domNode, leftVNode, vNode, renderOptions) {
    var parentNode = domNode.parentNode
    var newNode = renderOptions.render(vNode, renderOptions)

    if (parentNode && newNode !== domNode) {
        parentNode.replaceChild(newNode, domNode)
    }

    return newNode
}

function destroyWidget(domNode, w) {
    if (typeof w.destroy === "function" && isWidget(w)) {
        w.destroy(domNode)
    }
}

function reorderChildren(domNode, moves) {
    var childNodes = domNode.childNodes
    var keyMap = {}
    var node
    var remove
    var insert

    for (var i = 0; i < moves.removes.length; i++) {
        remove = moves.removes[i]
        node = childNodes[remove.from]
        if (remove.key) {
            keyMap[remove.key] = node
        }
        domNode.removeChild(node)
    }

    var length = childNodes.length
    for (var j = 0; j < moves.inserts.length; j++) {
        insert = moves.inserts[j]
        node = keyMap[insert.key]
        // this is the weirdest bug i've ever seen in webkit
        domNode.insertBefore(node, insert.to >= length++ ? null : childNodes[insert.to])
    }
}

function replaceRoot(oldRoot, newRoot) {
    if (oldRoot && newRoot && oldRoot !== newRoot && oldRoot.parentNode) {
        oldRoot.parentNode.replaceChild(newRoot, oldRoot)
    }

    return newRoot;
}

},{"../vnode/is-widget.js":48,"../vnode/vpatch.js":51,"./apply-properties":34,"./update-widget":39}],38:[function(require,module,exports){
var document = require("global/document")
var isArray = require("x-is-array")

var render = require("./create-element")
var domIndex = require("./dom-index")
var patchOp = require("./patch-op")
module.exports = patch

function patch(rootNode, patches, renderOptions) {
    renderOptions = renderOptions || {}
    renderOptions.patch = renderOptions.patch && renderOptions.patch !== patch
        ? renderOptions.patch
        : patchRecursive
    renderOptions.render = renderOptions.render || render

    return renderOptions.patch(rootNode, patches, renderOptions)
}

function patchRecursive(rootNode, patches, renderOptions) {
    var indices = patchIndices(patches)

    if (indices.length === 0) {
        return rootNode
    }

    var index = domIndex(rootNode, patches.a, indices)
    var ownerDocument = rootNode.ownerDocument

    if (!renderOptions.document && ownerDocument !== document) {
        renderOptions.document = ownerDocument
    }

    for (var i = 0; i < indices.length; i++) {
        var nodeIndex = indices[i]
        rootNode = applyPatch(rootNode,
            index[nodeIndex],
            patches[nodeIndex],
            renderOptions)
    }

    return rootNode
}

function applyPatch(rootNode, domNode, patchList, renderOptions) {
    if (!domNode) {
        return rootNode
    }

    var newNode

    if (isArray(patchList)) {
        for (var i = 0; i < patchList.length; i++) {
            newNode = patchOp(patchList[i], domNode, renderOptions)

            if (domNode === rootNode) {
                rootNode = newNode
            }
        }
    } else {
        newNode = patchOp(patchList, domNode, renderOptions)

        if (domNode === rootNode) {
            rootNode = newNode
        }
    }

    return rootNode
}

function patchIndices(patches) {
    var indices = []

    for (var key in patches) {
        if (key !== "a") {
            indices.push(Number(key))
        }
    }

    return indices
}

},{"./create-element":35,"./dom-index":36,"./patch-op":37,"global/document":4,"x-is-array":55}],39:[function(require,module,exports){
var isWidget = require("../vnode/is-widget.js")

module.exports = updateWidget

function updateWidget(a, b) {
    if (isWidget(a) && isWidget(b)) {
        if ("name" in a && "name" in b) {
            return a.id === b.id
        } else {
            return a.init === b.init
        }
    }

    return false
}

},{"../vnode/is-widget.js":48}],40:[function(require,module,exports){
'use strict';

module.exports = AttributeHook;

function AttributeHook(namespace, value) {
    if (!(this instanceof AttributeHook)) {
        return new AttributeHook(namespace, value);
    }

    this.namespace = namespace;
    this.value = value;
}

AttributeHook.prototype.hook = function (node, prop, prev) {
    if (prev && prev.type === 'AttributeHook' &&
        prev.value === this.value &&
        prev.namespace === this.namespace) {
        return;
    }

    node.setAttributeNS(this.namespace, prop, this.value);
};

AttributeHook.prototype.unhook = function (node, prop, next) {
    if (next && next.type === 'AttributeHook' &&
        next.namespace === this.namespace) {
        return;
    }

    var colonPosition = prop.indexOf(':');
    var localName = colonPosition > -1 ? prop.substr(colonPosition + 1) : prop;
    node.removeAttributeNS(this.namespace, localName);
};

AttributeHook.prototype.type = 'AttributeHook';

},{}],41:[function(require,module,exports){
'use strict';

module.exports = SoftSetHook;

function SoftSetHook(value) {
    if (!(this instanceof SoftSetHook)) {
        return new SoftSetHook(value);
    }

    this.value = value;
}

SoftSetHook.prototype.hook = function (node, propertyName) {
    if (node[propertyName] !== this.value) {
        node[propertyName] = this.value;
    }
};

},{}],42:[function(require,module,exports){
'use strict';

var split = require('browser-split');

var classIdSplit = /([\.#]?[a-zA-Z0-9\u007F-\uFFFF_:-]+)/;
var notClassId = /^\.|#/;

module.exports = parseTag;

function parseTag(tag, props) {
    if (!tag) {
        return 'DIV';
    }

    var noId = !(props.hasOwnProperty('id'));

    var tagParts = split(tag, classIdSplit);
    var tagName = null;

    if (notClassId.test(tagParts[1])) {
        tagName = 'DIV';
    }

    var classes, part, type, i;

    for (i = 0; i < tagParts.length; i++) {
        part = tagParts[i];

        if (!part) {
            continue;
        }

        type = part.charAt(0);

        if (!tagName) {
            tagName = part;
        } else if (type === '.') {
            classes = classes || [];
            classes.push(part.substring(1, part.length));
        } else if (type === '#' && noId) {
            props.id = part.substring(1, part.length);
        }
    }

    if (classes) {
        if (props.className) {
            classes.push(props.className);
        }

        props.className = classes.join(' ');
    }

    return props.namespace ? tagName : tagName.toUpperCase();
}

},{"browser-split":3}],43:[function(require,module,exports){
var isVNode = require("./is-vnode")
var isVText = require("./is-vtext")
var isWidget = require("./is-widget")
var isThunk = require("./is-thunk")

module.exports = handleThunk

function handleThunk(a, b) {
    var renderedA = a
    var renderedB = b

    if (isThunk(b)) {
        renderedB = renderThunk(b, a)
    }

    if (isThunk(a)) {
        renderedA = renderThunk(a, null)
    }

    return {
        a: renderedA,
        b: renderedB
    }
}

function renderThunk(thunk, previous) {
    var renderedThunk = thunk.vnode

    if (!renderedThunk) {
        renderedThunk = thunk.vnode = thunk.render(previous)
    }

    if (!(isVNode(renderedThunk) ||
            isVText(renderedThunk) ||
            isWidget(renderedThunk))) {
        throw new Error("thunk did not return a valid node");
    }

    return renderedThunk
}

},{"./is-thunk":44,"./is-vnode":46,"./is-vtext":47,"./is-widget":48}],44:[function(require,module,exports){
module.exports = isThunk

function isThunk(t) {
    return t && t.type === "Thunk"
}

},{}],45:[function(require,module,exports){
module.exports = isHook

function isHook(hook) {
    return hook &&
      (typeof hook.hook === "function" && !hook.hasOwnProperty("hook") ||
       typeof hook.unhook === "function" && !hook.hasOwnProperty("unhook"))
}

},{}],46:[function(require,module,exports){
var version = require("./version")

module.exports = isVirtualNode

function isVirtualNode(x) {
    return x && x.type === "VirtualNode" && x.version === version
}

},{"./version":49}],47:[function(require,module,exports){
var version = require("./version")

module.exports = isVirtualText

function isVirtualText(x) {
    return x && x.type === "VirtualText" && x.version === version
}

},{"./version":49}],48:[function(require,module,exports){
module.exports = isWidget

function isWidget(w) {
    return w && w.type === "Widget"
}

},{}],49:[function(require,module,exports){
module.exports = "2"

},{}],50:[function(require,module,exports){
var version = require("./version")
var isVNode = require("./is-vnode")
var isWidget = require("./is-widget")
var isThunk = require("./is-thunk")
var isVHook = require("./is-vhook")

module.exports = VirtualNode

var noProperties = {}
var noChildren = []

function VirtualNode(tagName, properties, children, key, namespace) {
    this.tagName = tagName
    this.properties = properties || noProperties
    this.children = children || noChildren
    this.key = key != null ? String(key) : undefined
    this.namespace = (typeof namespace === "string") ? namespace : null

    var count = (children && children.length) || 0
    var descendants = 0
    var hasWidgets = false
    var hasThunks = false
    var descendantHooks = false
    var hooks

    for (var propName in properties) {
        if (properties.hasOwnProperty(propName)) {
            var property = properties[propName]
            if (isVHook(property) && property.unhook) {
                if (!hooks) {
                    hooks = {}
                }

                hooks[propName] = property
            }
        }
    }

    for (var i = 0; i < count; i++) {
        var child = children[i]
        if (isVNode(child)) {
            descendants += child.count || 0

            if (!hasWidgets && child.hasWidgets) {
                hasWidgets = true
            }

            if (!hasThunks && child.hasThunks) {
                hasThunks = true
            }

            if (!descendantHooks && (child.hooks || child.descendantHooks)) {
                descendantHooks = true
            }
        } else if (!hasWidgets && isWidget(child)) {
            if (typeof child.destroy === "function") {
                hasWidgets = true
            }
        } else if (!hasThunks && isThunk(child)) {
            hasThunks = true;
        }
    }

    this.count = count + descendants
    this.hasWidgets = hasWidgets
    this.hasThunks = hasThunks
    this.hooks = hooks
    this.descendantHooks = descendantHooks
}

VirtualNode.prototype.version = version
VirtualNode.prototype.type = "VirtualNode"

},{"./is-thunk":44,"./is-vhook":45,"./is-vnode":46,"./is-widget":48,"./version":49}],51:[function(require,module,exports){
var version = require("./version")

VirtualPatch.NONE = 0
VirtualPatch.VTEXT = 1
VirtualPatch.VNODE = 2
VirtualPatch.WIDGET = 3
VirtualPatch.PROPS = 4
VirtualPatch.ORDER = 5
VirtualPatch.INSERT = 6
VirtualPatch.REMOVE = 7
VirtualPatch.THUNK = 8

module.exports = VirtualPatch

function VirtualPatch(type, vNode, patch) {
    this.type = Number(type)
    this.vNode = vNode
    this.patch = patch
}

VirtualPatch.prototype.version = version
VirtualPatch.prototype.type = "VirtualPatch"

},{"./version":49}],52:[function(require,module,exports){
var version = require("./version")

module.exports = VirtualText

function VirtualText(text) {
    this.text = String(text)
}

VirtualText.prototype.version = version
VirtualText.prototype.type = "VirtualText"

},{"./version":49}],53:[function(require,module,exports){
var isObject = require("is-object")
var isHook = require("../vnode/is-vhook")

module.exports = diffProps

function diffProps(a, b) {
    var diff

    for (var aKey in a) {
        if (!(aKey in b)) {
            diff = diff || {}
            diff[aKey] = undefined
        }

        var aValue = a[aKey]
        var bValue = b[aKey]

        if (aValue === bValue) {
            continue
        } else if (isObject(aValue) && isObject(bValue)) {
            if (getPrototype(bValue) !== getPrototype(aValue)) {
                diff = diff || {}
                diff[aKey] = bValue
            } else if (isHook(bValue)) {
                 diff = diff || {}
                 diff[aKey] = bValue
            } else {
                var objectDiff = diffProps(aValue, bValue)
                if (objectDiff) {
                    diff = diff || {}
                    diff[aKey] = objectDiff
                }
            }
        } else {
            diff = diff || {}
            diff[aKey] = bValue
        }
    }

    for (var bKey in b) {
        if (!(bKey in a)) {
            diff = diff || {}
            diff[bKey] = b[bKey]
        }
    }

    return diff
}

function getPrototype(value) {
  if (Object.getPrototypeOf) {
    return Object.getPrototypeOf(value)
  } else if (value.__proto__) {
    return value.__proto__
  } else if (value.constructor) {
    return value.constructor.prototype
  }
}

},{"../vnode/is-vhook":45,"is-object":30}],54:[function(require,module,exports){
var isArray = require("x-is-array")

var VPatch = require("../vnode/vpatch")
var isVNode = require("../vnode/is-vnode")
var isVText = require("../vnode/is-vtext")
var isWidget = require("../vnode/is-widget")
var isThunk = require("../vnode/is-thunk")
var handleThunk = require("../vnode/handle-thunk")

var diffProps = require("./diff-props")

module.exports = diff

function diff(a, b) {
    var patch = { a: a }
    walk(a, b, patch, 0)
    return patch
}

function walk(a, b, patch, index) {
    if (a === b) {
        return
    }

    var apply = patch[index]
    var applyClear = false

    if (isThunk(a) || isThunk(b)) {
        thunks(a, b, patch, index)
    } else if (b == null) {

        // If a is a widget we will add a remove patch for it
        // Otherwise any child widgets/hooks must be destroyed.
        // This prevents adding two remove patches for a widget.
        if (!isWidget(a)) {
            clearState(a, patch, index)
            apply = patch[index]
        }

        apply = appendPatch(apply, new VPatch(VPatch.REMOVE, a, b))
    } else if (isVNode(b)) {
        if (isVNode(a)) {
            if (a.tagName === b.tagName &&
                a.namespace === b.namespace &&
                a.key === b.key) {
                var propsPatch = diffProps(a.properties, b.properties)
                if (propsPatch) {
                    apply = appendPatch(apply,
                        new VPatch(VPatch.PROPS, a, propsPatch))
                }
                apply = diffChildren(a, b, patch, apply, index)
            } else {
                apply = appendPatch(apply, new VPatch(VPatch.VNODE, a, b))
                applyClear = true
            }
        } else {
            apply = appendPatch(apply, new VPatch(VPatch.VNODE, a, b))
            applyClear = true
        }
    } else if (isVText(b)) {
        if (!isVText(a)) {
            apply = appendPatch(apply, new VPatch(VPatch.VTEXT, a, b))
            applyClear = true
        } else if (a.text !== b.text) {
            apply = appendPatch(apply, new VPatch(VPatch.VTEXT, a, b))
        }
    } else if (isWidget(b)) {
        if (!isWidget(a)) {
            applyClear = true
        }

        apply = appendPatch(apply, new VPatch(VPatch.WIDGET, a, b))
    }

    if (apply) {
        patch[index] = apply
    }

    if (applyClear) {
        clearState(a, patch, index)
    }
}

function diffChildren(a, b, patch, apply, index) {
    var aChildren = a.children
    var orderedSet = reorder(aChildren, b.children)
    var bChildren = orderedSet.children

    var aLen = aChildren.length
    var bLen = bChildren.length
    var len = aLen > bLen ? aLen : bLen

    for (var i = 0; i < len; i++) {
        var leftNode = aChildren[i]
        var rightNode = bChildren[i]
        index += 1

        if (!leftNode) {
            if (rightNode) {
                // Excess nodes in b need to be added
                apply = appendPatch(apply,
                    new VPatch(VPatch.INSERT, null, rightNode))
            }
        } else {
            walk(leftNode, rightNode, patch, index)
        }

        if (isVNode(leftNode) && leftNode.count) {
            index += leftNode.count
        }
    }

    if (orderedSet.moves) {
        // Reorder nodes last
        apply = appendPatch(apply, new VPatch(
            VPatch.ORDER,
            a,
            orderedSet.moves
        ))
    }

    return apply
}

function clearState(vNode, patch, index) {
    // TODO: Make this a single walk, not two
    unhook(vNode, patch, index)
    destroyWidgets(vNode, patch, index)
}

// Patch records for all destroyed widgets must be added because we need
// a DOM node reference for the destroy function
function destroyWidgets(vNode, patch, index) {
    if (isWidget(vNode)) {
        if (typeof vNode.destroy === "function") {
            patch[index] = appendPatch(
                patch[index],
                new VPatch(VPatch.REMOVE, vNode, null)
            )
        }
    } else if (isVNode(vNode) && (vNode.hasWidgets || vNode.hasThunks)) {
        var children = vNode.children
        var len = children.length
        for (var i = 0; i < len; i++) {
            var child = children[i]
            index += 1

            destroyWidgets(child, patch, index)

            if (isVNode(child) && child.count) {
                index += child.count
            }
        }
    } else if (isThunk(vNode)) {
        thunks(vNode, null, patch, index)
    }
}

// Create a sub-patch for thunks
function thunks(a, b, patch, index) {
    var nodes = handleThunk(a, b)
    var thunkPatch = diff(nodes.a, nodes.b)
    if (hasPatches(thunkPatch)) {
        patch[index] = new VPatch(VPatch.THUNK, null, thunkPatch)
    }
}

function hasPatches(patch) {
    for (var index in patch) {
        if (index !== "a") {
            return true
        }
    }

    return false
}

// Execute hooks when two nodes are identical
function unhook(vNode, patch, index) {
    if (isVNode(vNode)) {
        if (vNode.hooks) {
            patch[index] = appendPatch(
                patch[index],
                new VPatch(
                    VPatch.PROPS,
                    vNode,
                    undefinedKeys(vNode.hooks)
                )
            )
        }

        if (vNode.descendantHooks || vNode.hasThunks) {
            var children = vNode.children
            var len = children.length
            for (var i = 0; i < len; i++) {
                var child = children[i]
                index += 1

                unhook(child, patch, index)

                if (isVNode(child) && child.count) {
                    index += child.count
                }
            }
        }
    } else if (isThunk(vNode)) {
        thunks(vNode, null, patch, index)
    }
}

function undefinedKeys(obj) {
    var result = {}

    for (var key in obj) {
        result[key] = undefined
    }

    return result
}

// List diff, naive left to right reordering
function reorder(aChildren, bChildren) {
    // O(M) time, O(M) memory
    var bChildIndex = keyIndex(bChildren)
    var bKeys = bChildIndex.keys
    var bFree = bChildIndex.free

    if (bFree.length === bChildren.length) {
        return {
            children: bChildren,
            moves: null
        }
    }

    // O(N) time, O(N) memory
    var aChildIndex = keyIndex(aChildren)
    var aKeys = aChildIndex.keys
    var aFree = aChildIndex.free

    if (aFree.length === aChildren.length) {
        return {
            children: bChildren,
            moves: null
        }
    }

    // O(MAX(N, M)) memory
    var newChildren = []

    var freeIndex = 0
    var freeCount = bFree.length
    var deletedItems = 0

    // Iterate through a and match a node in b
    // O(N) time,
    for (var i = 0 ; i < aChildren.length; i++) {
        var aItem = aChildren[i]
        var itemIndex

        if (aItem.key) {
            if (bKeys.hasOwnProperty(aItem.key)) {
                // Match up the old keys
                itemIndex = bKeys[aItem.key]
                newChildren.push(bChildren[itemIndex])

            } else {
                // Remove old keyed items
                itemIndex = i - deletedItems++
                newChildren.push(null)
            }
        } else {
            // Match the item in a with the next free item in b
            if (freeIndex < freeCount) {
                itemIndex = bFree[freeIndex++]
                newChildren.push(bChildren[itemIndex])
            } else {
                // There are no free items in b to match with
                // the free items in a, so the extra free nodes
                // are deleted.
                itemIndex = i - deletedItems++
                newChildren.push(null)
            }
        }
    }

    var lastFreeIndex = freeIndex >= bFree.length ?
        bChildren.length :
        bFree[freeIndex]

    // Iterate through b and append any new keys
    // O(M) time
    for (var j = 0; j < bChildren.length; j++) {
        var newItem = bChildren[j]

        if (newItem.key) {
            if (!aKeys.hasOwnProperty(newItem.key)) {
                // Add any new keyed items
                // We are adding new items to the end and then sorting them
                // in place. In future we should insert new items in place.
                newChildren.push(newItem)
            }
        } else if (j >= lastFreeIndex) {
            // Add any leftover non-keyed items
            newChildren.push(newItem)
        }
    }

    var simulate = newChildren.slice()
    var simulateIndex = 0
    var removes = []
    var inserts = []
    var simulateItem

    for (var k = 0; k < bChildren.length;) {
        var wantedItem = bChildren[k]
        simulateItem = simulate[simulateIndex]

        // remove items
        while (simulateItem === null && simulate.length) {
            removes.push(remove(simulate, simulateIndex, null))
            simulateItem = simulate[simulateIndex]
        }

        if (!simulateItem || simulateItem.key !== wantedItem.key) {
            // if we need a key in this position...
            if (wantedItem.key) {
                if (simulateItem && simulateItem.key) {
                    // if an insert doesn't put this key in place, it needs to move
                    if (bKeys[simulateItem.key] !== k + 1) {
                        removes.push(remove(simulate, simulateIndex, simulateItem.key))
                        simulateItem = simulate[simulateIndex]
                        // if the remove didn't put the wanted item in place, we need to insert it
                        if (!simulateItem || simulateItem.key !== wantedItem.key) {
                            inserts.push({key: wantedItem.key, to: k})
                        }
                        // items are matching, so skip ahead
                        else {
                            simulateIndex++
                        }
                    }
                    else {
                        inserts.push({key: wantedItem.key, to: k})
                    }
                }
                else {
                    inserts.push({key: wantedItem.key, to: k})
                }
                k++
            }
            // a key in simulate has no matching wanted key, remove it
            else if (simulateItem && simulateItem.key) {
                removes.push(remove(simulate, simulateIndex, simulateItem.key))
            }
        }
        else {
            simulateIndex++
            k++
        }
    }

    // remove all the remaining nodes from simulate
    while(simulateIndex < simulate.length) {
        simulateItem = simulate[simulateIndex]
        removes.push(remove(simulate, simulateIndex, simulateItem && simulateItem.key))
    }

    // If the only moves we have are deletes then we can just
    // let the delete patch remove these items.
    if (removes.length === deletedItems && !inserts.length) {
        return {
            children: newChildren,
            moves: null
        }
    }

    return {
        children: newChildren,
        moves: {
            removes: removes,
            inserts: inserts
        }
    }
}

function remove(arr, index, key) {
    arr.splice(index, 1)

    return {
        from: index,
        key: key
    }
}

function keyIndex(children) {
    var keys = {}
    var free = []
    var length = children.length

    for (var i = 0; i < length; i++) {
        var child = children[i]

        if (child.key) {
            keys[child.key] = i
        } else {
            free.push(i)
        }
    }

    return {
        keys: keys,     // A hash of key name to index
        free: free      // An array of unkeyed item indices
    }
}

function appendPatch(apply, patch) {
    if (apply) {
        if (isArray(apply)) {
            apply.push(patch)
        } else {
            apply = [apply, patch]
        }

        return apply
    } else {
        return patch
    }
}

},{"../vnode/handle-thunk":43,"../vnode/is-thunk":44,"../vnode/is-vnode":46,"../vnode/is-vtext":47,"../vnode/is-widget":48,"../vnode/vpatch":51,"./diff-props":53,"x-is-array":55}],55:[function(require,module,exports){
var nativeIsArray = Array.isArray
var toString = Object.prototype.toString

module.exports = nativeIsArray || isArray

function isArray(obj) {
    return toString.call(obj) === "[object Array]"
}

},{}]},{},[1]);
