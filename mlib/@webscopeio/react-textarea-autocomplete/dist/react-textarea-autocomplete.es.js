/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2017 Jakub Beneš <benes@webscope.io>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

import React from 'react';
import PropTypes from 'prop-types';
import getCaretCoordinates from 'textarea-caret';

var _typeof$1 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck$1(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var KEY_CODES = {
  ESC: 27,
  UP: 38,
  DOWN: 40,
  ENTER: 13,
  TAB: 9
};

// This is self-made key shortcuts manager, used for caching key strokes

var Listener = function Listener() {
  var _this = this;

  _classCallCheck$1(this, Listener);

  this.startListen = function () {
    if (!_this.isListening) {
      // prevent multiple listeners in case of multiple TextareaAutocomplete components on page
      document.addEventListener('keydown', _this.f);
      _this.isListening = true;
    }
  };

  this.stopListen = function () {
    document.removeEventListener('keydown', _this.f);
    _this.isListening = false;
  };

  this.add = function (keyCodes, fn) {
    var keyCode = keyCodes;

    if ((typeof keyCode === 'undefined' ? 'undefined' : _typeof$1(keyCode)) !== 'object') keyCode = [keyCode];

    _this.listeners[_this.index] = {
      keyCode: keyCode,
      fn: fn
    };

    _this.index += 1;

    return _this.index;
  };

  this.remove = function (id) {
    delete _this.listeners[id];
    _this.index -= 1;
  };

  this.removeAll = function () {
    _this.listeners = {};
    _this.index = 0;
  };

  this.index = 0;
  this.listeners = {};
  this.isListening = false;

  this.f = function (e) {
    var code = e.keyCode || e.which;
    for (var i = 0; i < _this.index; i += 1) {
      var _listeners$i = _this.listeners[i],
          _keyCode = _listeners$i.keyCode,
          _fn = _listeners$i.fn;

      if (_keyCode.includes(code)) _fn(e);
    }
  };
};

var Listeners = new Listener();

var _createClass$2 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck$3(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn$2(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits$2(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Item = function (_React$Component) {
  _inherits$2(Item, _React$Component);

  function Item() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck$3(this, Item);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn$2(this, (_ref = Item.__proto__ || Object.getPrototypeOf(Item)).call.apply(_ref, [this].concat(args))), _this), _this.selectItem = function () {
      var _this$props = _this.props,
          item = _this$props.item,
          onSelectHandler = _this$props.onSelectHandler;

      onSelectHandler(item);
    }, _temp), _possibleConstructorReturn$2(_this, _ret);
  }

  _createClass$2(Item, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          Component = _props.component,
          style = _props.style,
          onClickHandler = _props.onClickHandler,
          item = _props.item,
          selected = _props.selected,
          className = _props.className;


      return React.createElement(
        'li',
        { className: 'rta__item ' + (className || ''), style: style },
        React.createElement(
          'div',
          {
            className: 'rta__entity ' + (selected === true ? 'rta__entity--selected' : ''),
            role: 'button',
            tabIndex: 0,
            onClick: onClickHandler,
            onFocus: this.selectItem,
            onMouseEnter: this.selectItem
          },
          React.createElement(Component, { selected: selected, entity: item })
        )
      );
    }
  }]);

  return Item;
}(React.Component);

var _createClass$1 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck$2(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn$1(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits$1(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var List = function (_React$Component) {
  _inherits$1(List, _React$Component);

  function List() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck$2(this, List);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn$1(this, (_ref = List.__proto__ || Object.getPrototypeOf(List)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      selectedItem: null
    }, _this.onPressEnter = function (e) {
      e.preventDefault();

      var values = _this.props.values;


      _this.modifyText(values[_this.getPositionInList()]);
    }, _this.getPositionInList = function () {
      var values = _this.props.values;
      var selectedItem = _this.state.selectedItem;


      if (!selectedItem) return 0;

      return values.findIndex(function (a) {
        return _this.getId(a) === _this.getId(selectedItem);
      });
    }, _this.getId = function (item) {
      if (typeof item === 'string' || !item.key) {
        return _this.props.getTextToReplace(item).text;
      }

      return item.key;
    }, _this.listeners = [], _this.modifyText = function (value) {
      if (!value) return;

      var _this$props = _this.props,
          onSelect = _this$props.onSelect,
          getTextToReplace = _this$props.getTextToReplace;


      onSelect(getTextToReplace(value));
    }, _this.selectItem = function (item) {
      _this.setState({ selectedItem: item });
    }, _this.scroll = function (e) {
      e.preventDefault();

      var values = _this.props.values;


      var code = e.keyCode || e.which;

      var oldPosition = _this.getPositionInList();
      var newPosition = void 0;
      switch (code) {
        case KEY_CODES.DOWN:
          newPosition = oldPosition + 1;
          break;
        case KEY_CODES.UP:
          newPosition = oldPosition - 1;
          break;
        default:
          newPosition = oldPosition;
          break;
      }

      newPosition = (newPosition % values.length + values.length) % values.length; // eslint-disable-line
      _this.setState({ selectedItem: values[newPosition] });
    }, _this.isSelected = function (item) {
      var selectedItem = _this.state.selectedItem;

      if (!selectedItem) return false;

      return _this.getId(selectedItem) === _this.getId(item);
    }, _temp), _possibleConstructorReturn$1(_this, _ret);
  }

  _createClass$1(List, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.listeners.push(Listeners.add([KEY_CODES.DOWN, KEY_CODES.UP], this.scroll), Listeners.add([KEY_CODES.ENTER, KEY_CODES.TAB], this.onPressEnter));

      var values = this.props.values;

      if (values && values[0]) this.selectItem(values[0]);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(_ref2) {
      var values = _ref2.values;

      if (values && values[0]) this.selectItem(values[0]);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var listener = void 0;
      while (this.listeners.length) {
        listener = this.listeners.pop();
        Listeners.remove(listener);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          values = _props.values,
          component = _props.component,
          style = _props.style,
          itemClassName = _props.itemClassName,
          className = _props.className,
          itemStyle = _props.itemStyle;


      return React.createElement(
        'ul',
        { className: 'rta__list ' + (className || ''), style: style },
        values.map(function (item) {
          return React.createElement(Item, {
            key: _this2.getId(item),
            selected: _this2.isSelected(item),
            item: item,
            className: itemClassName,
            style: itemStyle,
            onClickHandler: _this2.onPressEnter,
            onSelectHandler: _this2.selectItem,
            component: component
          });
        })
      );
    }
  }]);

  return List;
}(React.Component);

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DEFAULT_CARET_POSITION = 'next';

var errorMessage = function errorMessage(message) {
  return console.error('RTA: dataProvider fails: ' + message + '\n    \nCheck the documentation or create issue if you think it\'s bug. https://github.com/webscopeio/react-textarea-autocomplete/issues');
};

var ReactTextareaAutocomplete = function (_React$Component) {
  _inherits(ReactTextareaAutocomplete, _React$Component);

  function ReactTextareaAutocomplete(props) {
    _classCallCheck(this, ReactTextareaAutocomplete);

    var _this = _possibleConstructorReturn(this, (ReactTextareaAutocomplete.__proto__ || Object.getPrototypeOf(ReactTextareaAutocomplete)).call(this, props));

    _initialiseProps.call(_this);

    Listeners.add(KEY_CODES.ESC, function () {
      return _this._closeAutocomplete();
    });

    var _this$props = _this.props,
        loadingComponent = _this$props.loadingComponent,
        trigger = _this$props.trigger,
        value = _this$props.value;


    if (value) _this.state.value = value;

    _this._createRegExp();

    if (!loadingComponent) {
      throw new Error('RTA: loadingComponent is not defined');
    }

    if (!trigger) {
      throw new Error('RTA: trigger is not defined');
    }
    return _this;
  }

  _createClass(ReactTextareaAutocomplete, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      Listeners.startListen();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this._update(nextProps);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      Listeners.stopListen();
    }
  }, {
    key: '_update',
    value: function _update(_ref) {
      var value = _ref.value,
          trigger = _ref.trigger;
      var oldValue = this.state.value;
      var oldTrigger = this.props.trigger;


      if (value !== oldValue || !oldValue) this.setState({ value: value });
      /**
       * check if trigger chars are changed, if so, change the regexp accordingly
       */
      if (Object.keys(trigger).join('') !== Object.keys(oldTrigger).join('')) {
        this._createRegExp();
      }
    }

    /**
     * Close autocomplete, also clean up trigger (to avoid slow promises)
     */

  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          Loader = _props.loadingComponent,
          style = _props.style,
          className = _props.className,
          listStyle = _props.listStyle,
          itemStyle = _props.itemStyle,
          listClassName = _props.listClassName,
          itemClassName = _props.itemClassName,
          dropdownClassName = _props.dropdownClassName,
          dropdownStyle = _props.dropdownStyle,
          containerStyle = _props.containerStyle,
          containerClassName = _props.containerClassName,
          loaderStyle = _props.loaderStyle,
          loaderClassName = _props.loaderClassName;
      var _state = this.state,
          left = _state.left,
          top = _state.top,
          dataLoading = _state.dataLoading,
          currentTrigger = _state.currentTrigger,
          component = _state.component,
          value = _state.value;


      var suggestionData = this._getSuggestions();
      var textToReplace = this._getTextToReplace();

      return React.createElement(
        'div',
        {
          className: 'rta ' + (dataLoading === true ? 'rta--loading' : '') + ' ' + (containerClassName || ''),
          style: containerStyle
        },
        React.createElement('textarea', Object.assign({}, this._cleanUpProps(), {
          ref: function ref(_ref2) {
            _this2.textareaRef = _ref2;
          },
          className: 'rta__textarea ' + (className || ''),
          onChange: this._changeHandler,
          onSelect: this._selectHandler,
          onClick:
          // The textarea itself is outside the autoselect dropdown.
          this._onClickAndBlurHandler,
          onBlur: this._onClickAndBlurHandler,
          value: value,
          style: style
        })),
        (dataLoading || suggestionData) && currentTrigger && React.createElement(
          'div',
          {
            ref: function ref(_ref3) {
              _this2.dropdownRef = _ref3;
            },
            style: Object.assign({ top: top, left: left }, dropdownStyle),
            className: 'rta__autocomplete ' + (dropdownClassName || '')
          },
          suggestionData && component && textToReplace && React.createElement(List, {
            values: suggestionData,
            component: component,
            style: listStyle,
            className: listClassName,
            itemClassName: itemClassName,
            itemStyle: itemStyle,
            getTextToReplace: textToReplace,
            onSelect: this._onSelect
          }),
          dataLoading && React.createElement(
            'div',
            {
              className: 'rta__loader ' + (suggestionData !== null ? 'rta__loader--suggestion-data' : 'rta__loader--empty-suggestion-data') + ' ' + (loaderClassName || ''),
              style: loaderStyle
            },
            React.createElement(Loader, { data: suggestionData })
          )
        )
      );
    }
  }]);

  return ReactTextareaAutocomplete;
}(React.Component);

ReactTextareaAutocomplete.defaultProps = {
  closeOnClickOutside: false,
  movePopupAsYouType: false,
  value: '',
  minChar: 1
};

var _initialiseProps = function _initialiseProps() {
  var _this3 = this;

  this.state = {
    top: null,
    left: null,
    currentTrigger: null,
    actualToken: '',
    data: null,
    value: '',
    dataLoading: false,
    selectionEnd: 0,
    selectionStart: 0,
    component: null
  };

  this.getSelectionPosition = function () {
    if (!_this3.textareaRef) return null;

    return {
      selectionStart: _this3.textareaRef.selectionStart,
      selectionEnd: _this3.textareaRef.selectionEnd
    };
  };

  this.getSelectedText = function () {
    if (!_this3.textareaRef) return null;
    var _textareaRef = _this3.textareaRef,
        selectionStart = _textareaRef.selectionStart,
        selectionEnd = _textareaRef.selectionEnd;


    if (selectionStart === selectionEnd) return null;

    return _this3.state.value.substr(selectionStart, selectionEnd - selectionStart);
  };

  this.setCaretPosition = function () {
    var position = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

    if (!_this3.textareaRef) return;

    _this3.textareaRef.focus();
    _this3.textareaRef.setSelectionRange(position, position);
  };

  this.getCaretPosition = function () {
    if (!_this3.textareaRef) {
      return 0;
    }

    var position = _this3.textareaRef.selectionEnd;
    return position;
  };

  this._onSelect = function (newToken) {
    var _state2 = _this3.state,
        selectionEnd = _state2.selectionEnd,
        currentTrigger = _state2.currentTrigger,
        textareaValue = _state2.value;
    var _props2 = _this3.props,
        onChange = _props2.onChange,
        trigger = _props2.trigger;


    if (!currentTrigger) return;

    var computeCaretPosition = function computeCaretPosition(position, token, startToken) {
      switch (position) {
        case 'start':
          return startToken;
        case 'next':
        case 'end':
          return startToken + token.length;
        default:
          if (!Number.isInteger(position)) {
            throw new Error('RTA: caretPosition should be "start", "next", "end" or number.');
          }

          return position;
      }
    };

    var textToModify = textareaValue.slice(0, selectionEnd);

    var startOfTokenPosition = textToModify.search(
    /**
     * It's important to escape the currentTrigger char for chars like [, (,...
     */
    new RegExp('\\' + currentTrigger + (trigger[currentTrigger].allowWhitespace ? '.' : '\\S') + '*$'));

    // we add space after emoji is selected if a caret position is next
    var newTokenString = newToken.caretPosition === 'next' ? newToken.text + ' ' : newToken.text;
    var newCaretPosition = computeCaretPosition(newToken.caretPosition, newTokenString, startOfTokenPosition);

    var modifiedText = textToModify.substring(0, startOfTokenPosition) + newTokenString;

    // set the new textarea value and after that set the caret back to its position
    _this3.setState({
      value: textareaValue.replace(textToModify, modifiedText),
      dataLoading: false
    }, function () {
      // fire onChange event after successful selection
      var e = new Event('change', { bubbles: true });
      _this3.textareaRef.dispatchEvent(e);
      if (onChange) onChange(e);

      _this3.setCaretPosition(newCaretPosition);
    });
    _this3._closeAutocomplete();
  };

  this._getTextToReplace = function () {
    var _state3 = _this3.state,
        currentTrigger = _state3.currentTrigger,
        actualToken = _state3.actualToken;

    var triggerSettings = _this3._getCurrentTriggerSettings();

    if (!currentTrigger || !triggerSettings) return null;

    var output = triggerSettings.output;


    return function (item) {
      if ((typeof item === 'undefined' ? 'undefined' : _typeof(item)) === 'object' && (!output || typeof output !== 'function')) {
        throw new Error('Output functor is not defined! If you are using items as object you have to define "output" function. https://github.com/webscopeio/react-textarea-autocomplete#trigger-type');
      }

      if (output) {
        var textToReplace = output(item, currentTrigger);

        if (!textToReplace || typeof textToReplace === 'number') {
          throw new Error('Output functor should return string or object in shape {text: string, caretPosition: string | number}.\nGot "' + String(textToReplace) + '". Check the implementation for trigger "' + currentTrigger + '" and its token "' + actualToken + '"\n\nSee https://github.com/webscopeio/react-textarea-autocomplete#trigger-type for more informations.\n');
        }

        if (typeof textToReplace === 'string') {
          return {
            text: textToReplace,
            caretPosition: DEFAULT_CARET_POSITION
          };
        }

        if (!textToReplace.text) {
          throw new Error('Output "text" is not defined! Object should has shape {text: string, caretPosition: string | number}. Check the implementation for trigger "' + currentTrigger + '" and its token "' + actualToken + '"\n');
        }

        if (!textToReplace.caretPosition) {
          throw new Error('Output "caretPosition" is not defined! Object should has shape {text: string, caretPosition: string | number}. Check the implementation for trigger "' + currentTrigger + '" and its token "' + actualToken + '"\n');
        }

        return textToReplace;
      }

      if (typeof item !== 'string') {
        throw new Error('Output item should be string\n');
      }

      return {
        text: '' + currentTrigger + item + currentTrigger,
        caretPosition: DEFAULT_CARET_POSITION
      };
    };
  };

  this._getCurrentTriggerSettings = function () {
    var currentTrigger = _this3.state.currentTrigger;


    if (!currentTrigger) return null;

    return _this3.props.trigger[currentTrigger];
  };

  this._getValuesFromProvider = function () {
    var _state4 = _this3.state,
        currentTrigger = _state4.currentTrigger,
        actualToken = _state4.actualToken;

    var triggerSettings = _this3._getCurrentTriggerSettings();

    if (!currentTrigger || !triggerSettings) {
      return;
    }

    var dataProvider = triggerSettings.dataProvider,
        component = triggerSettings.component;


    if (typeof dataProvider !== 'function') {
      throw new Error('Trigger provider has to be a function!');
    }

    _this3.setState({
      dataLoading: true
    });

    var providedData = dataProvider(actualToken);

    if (!(providedData instanceof Promise)) {
      providedData = Promise.resolve(providedData);
    }

    providedData.then(function (data) {
      if (!Array.isArray(data)) {
        throw new Error('Trigger provider has to provide an array!');
      }

      if (typeof component !== 'function') {
        throw new Error('Component should be defined!');
      }

      // throw away if we resolved old trigger
      if (currentTrigger !== _this3.state.currentTrigger) return;

      _this3.setState({
        dataLoading: false,
        data: data,
        component: component
      });
    }).catch(function (e) {
      return errorMessage(e.message);
    });
  };

  this._getSuggestions = function () {
    var _state5 = _this3.state,
        currentTrigger = _state5.currentTrigger,
        data = _state5.data;


    if (!currentTrigger || !data || data && !data.length) return null;

    return data;
  };

  this._createRegExp = function () {
    var trigger = _this3.props.trigger;


    _this3.tokenRegExp = new RegExp('[' + Object.keys(trigger).join('') + '][^\\s]*$');
  };

  this._closeAutocomplete = function () {
    _this3.setState({
      data: null,
      dataLoading: false,
      currentTrigger: null,
      top: null,
      left: null
    });
  };

  this._cleanUpProps = function () {
    var props = Object.assign({}, _this3.props);
    var notSafe = ['loadingComponent', 'containerStyle', 'minChar', 'ref', 'onChange', 'onCaretPositionChange', 'className', 'value', 'trigger', 'listStyle', 'itemStyle', 'containerStyle', 'loaderStyle', 'className', 'containerClassName', 'listClassName', 'itemClassName', 'loaderClassName', 'closeOnClickOutside', 'dropdownStyle', 'dropdownClassName', 'movePopupAsYouType'];

    // eslint-disable-next-line
    for (var prop in props) {
      if (notSafe.includes(prop)) delete props[prop];
    }

    return props;
  };

  this._changeHandler = function (e) {
    var _props3 = _this3.props,
        trigger = _props3.trigger,
        onChange = _props3.onChange,
        minChar = _props3.minChar,
        onCaretPositionChange = _props3.onCaretPositionChange,
        movePopupAsYouType = _props3.movePopupAsYouType;
    var _state6 = _this3.state,
        top = _state6.top,
        left = _state6.left;


    var textarea = e.target;
    var selectionEnd = textarea.selectionEnd,
        selectionStart = textarea.selectionStart;

    var value = textarea.value;

    if (onChange) {
      e.persist();
      onChange(e);
    }

    if (onCaretPositionChange) {
      var caretPosition = _this3.getCaretPosition();
      onCaretPositionChange(caretPosition);
    }

    _this3.setState({
      value: value
    });

    var tokenMatch = _this3.tokenRegExp.exec(value.slice(0, selectionEnd));
    var lastToken = tokenMatch && tokenMatch[0];

    var currentTrigger = lastToken && Object.keys(trigger).find(function (a) {
      return a === lastToken[0];
    }) || null;

    /*
     if we lost the trigger token or there is no following character we want to close
     the autocomplete
    */
    if ((!lastToken || lastToken.length <= minChar) && (
    // check if our current trigger disallows whitespace
    _this3.state.currentTrigger && !trigger[_this3.state.currentTrigger].allowWhitespace || !_this3.state.currentTrigger)) {
      _this3._closeAutocomplete();
      return;
    }

    /**
     * This code has to be sync that is the reason why we obtain the currentTrigger
     * from currentTrigger not this.state.currentTrigger
     *
     * Check if the currently typed token has to be afterWhitespace, or not.
     */
    if (currentTrigger && value[tokenMatch.index - 1] && trigger[currentTrigger].afterWhitespace && !value[tokenMatch.index - 1].match(/\s/)) {
      _this3._closeAutocomplete();
      return;
    }

    /**
      If our current trigger allows whitespace 
      get the correct token for DataProvider, so we need to construct new RegExp
     */
    if (_this3.state.currentTrigger && trigger[_this3.state.currentTrigger].allowWhitespace) {
      tokenMatch = new RegExp('\\' + _this3.state.currentTrigger + '[^' + _this3.state.currentTrigger + ']*$').exec(value.slice(0, selectionEnd));
      lastToken = tokenMatch && tokenMatch[0];

      if (!lastToken) {
        _this3._closeAutocomplete();
        return;
      }

      currentTrigger = Object.keys(trigger).find(function (a) {
        return a === lastToken[0];
      }) || null;
    }

    var actualToken = lastToken.slice(1);

    // if trigger is not configured step out from the function, otherwise proceed
    if (!currentTrigger) {
      return;
    }

    if (movePopupAsYouType || top === null && left === null) {
      _this3.setState(getCaretCoordinates(textarea, selectionEnd));
    }

    _this3.setState({
      selectionEnd: selectionEnd,
      selectionStart: selectionStart,
      currentTrigger: currentTrigger,
      actualToken: actualToken
    }, function () {
      try {
        _this3._getValuesFromProvider();
      } catch (err) {
        errorMessage(err.message);
      }
    });
  };

  this._selectHandler = function (e) {
    var _props4 = _this3.props,
        onCaretPositionChange = _props4.onCaretPositionChange,
        onSelect = _props4.onSelect;


    if (onCaretPositionChange) {
      var caretPosition = _this3.getCaretPosition();
      onCaretPositionChange(caretPosition);
    }

    if (onSelect) {
      e.persist();
      onSelect(e);
    }
  };

  this._onClickAndBlurHandler = function (e) {
    var _props5 = _this3.props,
        closeOnClickOutside = _props5.closeOnClickOutside,
        onBlur = _props5.onBlur;

    // If this is a click: e.target is the textarea, and e.relatedTarget is the thing
    // that was actually clicked. If we clicked inside the autoselect dropdown, then
    // that's not a blur, from the autoselect's point of view, so then do nothing.

    var el = e.relatedTarget;
    if (_this3.dropdownRef && el instanceof Node && _this3.dropdownRef.contains(el)) {
      return;
    }

    if (closeOnClickOutside) {
      _this3._closeAutocomplete();
    }

    if (onBlur) {
      e.persist();
      onBlur(e);
    }
  };
};

var triggerPropsCheck = function triggerPropsCheck(_ref4) {
  var trigger = _ref4.trigger;

  if (!trigger) return Error('Invalid prop trigger. Prop missing.');

  var triggers = Object.entries(trigger);

  for (var i = 0; i < triggers.length; i += 1) {
    var _triggers$i = _slicedToArray(triggers[i], 2),
        triggerChar = _triggers$i[0],
        settings = _triggers$i[1];

    if (typeof triggerChar !== 'string' || triggerChar.length !== 1) {
      return Error('Invalid prop trigger. Keys of the object has to be string / one character.');
    }

    // $FlowFixMe
    var triggerSetting = settings;

    var component = triggerSetting.component,
        dataProvider = triggerSetting.dataProvider,
        output = triggerSetting.output,
        afterWhitespace = triggerSetting.afterWhitespace,
        allowWhitespace = triggerSetting.allowWhitespace;


    if (!component || typeof component !== 'function') {
      return Error('Invalid prop trigger: component should be defined.');
    }

    if (!dataProvider || typeof dataProvider !== 'function') {
      return Error('Invalid prop trigger: dataProvider should be defined.');
    }

    if (output && typeof output !== 'function') {
      return Error('Invalid prop trigger: output should be a function.');
    }

    if (afterWhitespace && allowWhitespace) {
      return Error('Invalid prop trigger: afterWhitespace and allowWhitespace can be used together');
    }
  }

  return null;
};

ReactTextareaAutocomplete.propTypes = {
  loadingComponent: PropTypes.func.isRequired,
  minChar: PropTypes.number,
  onChange: PropTypes.func,
  onSelect: PropTypes.func,
  onBlur: PropTypes.func,
  onCaretPositionChange: PropTypes.func,
  className: PropTypes.string,
  containerStyle: PropTypes.object,
  containerClassName: PropTypes.string,
  closeOnClickOutside: PropTypes.bool,
  style: PropTypes.object,
  listStyle: PropTypes.object,
  itemStyle: PropTypes.object,
  loaderStyle: PropTypes.object,
  dropdownStyle: PropTypes.object,
  listClassName: PropTypes.string,
  itemClassName: PropTypes.string,
  loaderClassName: PropTypes.string,
  dropdownClassName: PropTypes.string,
  value: PropTypes.string,
  trigger: triggerPropsCheck //eslint-disable-line
};

export default ReactTextareaAutocomplete;
