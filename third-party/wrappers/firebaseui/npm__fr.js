(function () {
  let firebase = require('firebase/compat/app');
  require('firebase/compat/auth');
  if (typeof firebase.default !== 'undefined') {
    firebase = firebase.default;
  }
  (function () {
    let supportCustomEvent = window.CustomEvent;
    if (!supportCustomEvent || typeof supportCustomEvent === 'object') {
      supportCustomEvent = function CustomEvent(event, x) {
        x = x || {};
        const ev = document.createEvent('CustomEvent');
        ev.initCustomEvent(event, !!x.bubbles, !!x.cancelable, x.detail || null);
        return ev;
      };
      supportCustomEvent.prototype = window.Event.prototype;
    }
    function createsStackingContext(el) {
      while (el && el !== document.body) {
        var s = window.getComputedStyle(el);
        const invalid = function (k, ok) {
          return !(s[k] === undefined || s[k] === ok);
        };
        if (
          s.opacity < 1 ||
          invalid('zIndex', 'auto') ||
          invalid('transform', 'none') ||
          invalid('mixBlendMode', 'normal') ||
          invalid('filter', 'none') ||
          invalid('perspective', 'none') ||
          s.isolation === 'isolate' ||
          s.position === 'fixed' ||
          s.webkitOverflowScrolling === 'touch'
        )
          return true;
        el = el.parentElement;
      }
      return false;
    }
    function findNearestDialog(el) {
      while (el) {
        if (el.localName === 'dialog') return el;
        el = el.parentElement;
      }
      return null;
    }
    function safeBlur(el) {
      if (el && el.blur && el !== document.body) el.blur();
    }
    function inNodeList(nodeList, node) {
      for (let i = 0; i < nodeList.length; ++i) if (nodeList[i] === node) return true;
      return false;
    }
    function isFormMethodDialog(el) {
      if (!el || !el.hasAttribute('method')) return false;
      return el.getAttribute('method').toLowerCase() === 'dialog';
    }
    function dialogPolyfillInfo(dialog) {
      this.dialog_ = dialog;
      this.replacedStyleTop_ = false;
      this.openAsModal_ = false;
      if (!dialog.hasAttribute('role')) dialog.setAttribute('role', 'dialog');
      dialog.show = this.show.bind(this);
      dialog.showModal = this.showModal.bind(this);
      dialog.close = this.close.bind(this);
      if (!('returnValue' in dialog)) dialog.returnValue = '';
      if ('MutationObserver' in window) {
        const mo = new MutationObserver(this.maybeHideModal.bind(this));
        mo.observe(dialog, { attributes: true, attributeFilter: ['open'] });
      } else {
        let removed = false;
        const cb = function () {
          removed ? this.downgradeModal() : this.maybeHideModal();
          removed = false;
        }.bind(this);
        let timeout;
        const delayModel = function (ev) {
          if (ev.target !== dialog) return;
          const cand = 'DOMNodeRemoved';
          removed |= ev.type.substr(0, cand.length) === cand;
          window.clearTimeout(timeout);
          timeout = window.setTimeout(cb, 0);
        };
        ['DOMAttrModified', 'DOMNodeRemoved', 'DOMNodeRemovedFromDocument'].forEach(function (
          name
        ) {
          dialog.addEventListener(name, delayModel);
        });
      }
      Object.defineProperty(dialog, 'open', {
        set: this.setOpen.bind(this),
        get: dialog.hasAttribute.bind(dialog, 'open')
      });
      this.backdrop_ = document.createElement('div');
      this.backdrop_.className = 'backdrop';
      this.backdrop_.addEventListener('click', this.backdropClick_.bind(this));
    }
    dialogPolyfillInfo.prototype = {
      get dialog() {
        return this.dialog_;
      },
      maybeHideModal: function () {
        if (this.dialog_.hasAttribute('open') && document.body.contains(this.dialog_)) return;
        this.downgradeModal();
      },
      downgradeModal: function () {
        if (!this.openAsModal_) return;
        this.openAsModal_ = false;
        this.dialog_.style.zIndex = '';
        if (this.replacedStyleTop_) {
          this.dialog_.style.top = '';
          this.replacedStyleTop_ = false;
        }
        this.backdrop_.parentNode && this.backdrop_.parentNode.removeChild(this.backdrop_);
        dialogPolyfill.dm.removeDialog(this);
      },
      setOpen: function (value) {
        if (value) this.dialog_.hasAttribute('open') || this.dialog_.setAttribute('open', '');
        else {
          this.dialog_.removeAttribute('open');
          this.maybeHideModal();
        }
      },
      backdropClick_: function (e) {
        if (!this.dialog_.hasAttribute('tabindex')) {
          const fake = document.createElement('div');
          this.dialog_.insertBefore(fake, this.dialog_.firstChild);
          fake.tabIndex = -1;
          fake.focus();
          this.dialog_.removeChild(fake);
        } else this.dialog_.focus();
        const redirectedEvent = document.createEvent('MouseEvents');
        redirectedEvent.initMouseEvent(
          e.type,
          e.bubbles,
          e.cancelable,
          window,
          e.detail,
          e.screenX,
          e.screenY,
          e.clientX,
          e.clientY,
          e.ctrlKey,
          e.altKey,
          e.shiftKey,
          e.metaKey,
          e.button,
          e.relatedTarget
        );
        this.dialog_.dispatchEvent(redirectedEvent);
        e.stopPropagation();
      },
      focus_: function () {
        let target = this.dialog_.querySelector('[autofocus]:not([disabled])');
        if (!target && this.dialog_.tabIndex >= 0) target = this.dialog_;
        if (!target) {
          const opts = ['button', 'input', 'keygen', 'select', 'textarea'];
          const query = opts.map(function (el) {
            return el + ':not([disabled])';
          });
          query.push('[tabindex]:not([disabled]):not([tabindex=""])');
          target = this.dialog_.querySelector(query.join(', '));
        }
        safeBlur(document.activeElement);
        target && target.focus();
      },
      updateZIndex: function (dialogZ, backdropZ) {
        if (dialogZ < backdropZ) throw new Error('dialogZ should never be < backdropZ');
        this.dialog_.style.zIndex = dialogZ;
        this.backdrop_.style.zIndex = backdropZ;
      },
      show: function () {
        if (!this.dialog_.open) {
          this.setOpen(true);
          this.focus_();
        }
      },
      showModal: function () {
        if (this.dialog_.hasAttribute('open'))
          throw new Error(
            "Failed to execute 'showModal' on dialog: The element is already open, and therefore cannot be opened modally."
          );
        if (!document.body.contains(this.dialog_))
          throw new Error(
            "Failed to execute 'showModal' on dialog: The element is not in a Document."
          );
        if (!dialogPolyfill.dm.pushDialog(this))
          throw new Error(
            "Failed to execute 'showModal' on dialog: There are too many open modal dialogs."
          );
        if (createsStackingContext(this.dialog_.parentElement))
          console.warn(
            'A dialog is being shown inside a stacking context. ' +
              'This may cause it to be unusable. For more information, see this link: ' +
              'https://github.com/GoogleChrome/dialog-polyfill/#stacking-context'
          );
        this.setOpen(true);
        this.openAsModal_ = true;
        if (dialogPolyfill.needsCentering(this.dialog_)) {
          dialogPolyfill.reposition(this.dialog_);
          this.replacedStyleTop_ = true;
        } else this.replacedStyleTop_ = false;
        this.dialog_.parentNode.insertBefore(this.backdrop_, this.dialog_.nextSibling);
        this.focus_();
      },
      close: function (opt_returnValue) {
        if (!this.dialog_.hasAttribute('open'))
          throw new Error(
            "Failed to execute 'close' on dialog: The element does not have an 'open' attribute, and therefore cannot be closed."
          );
        this.setOpen(false);
        if (opt_returnValue !== undefined) this.dialog_.returnValue = opt_returnValue;
        const closeEvent = new supportCustomEvent('close', { bubbles: false, cancelable: false });
        this.dialog_.dispatchEvent(closeEvent);
      }
    };
    var dialogPolyfill = {};
    dialogPolyfill.reposition = function (element) {
      const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
      const topValue = scrollTop + (window.innerHeight - element.offsetHeight) / 2;
      element.style.top = Math.max(scrollTop, topValue) + 'px';
    };
    dialogPolyfill.isInlinePositionSetByStylesheet = function (element) {
      for (let i = 0; i < document.styleSheets.length; ++i) {
        const styleSheet = document.styleSheets[i];
        let cssRules = null;
        try {
          cssRules = styleSheet.cssRules;
        } catch (e) {}
        if (!cssRules) continue;
        for (let j = 0; j < cssRules.length; ++j) {
          const rule = cssRules[j];
          let selectedNodes = null;
          try {
            selectedNodes = document.querySelectorAll(rule.selectorText);
          } catch (e$0) {}
          if (!selectedNodes || !inNodeList(selectedNodes, element)) continue;
          const cssTop = rule.style.getPropertyValue('top');
          const cssBottom = rule.style.getPropertyValue('bottom');
          if ((cssTop && cssTop !== 'auto') || (cssBottom && cssBottom !== 'auto')) return true;
        }
      }
      return false;
    };
    dialogPolyfill.needsCentering = function (dialog) {
      const computedStyle = window.getComputedStyle(dialog);
      if (computedStyle.position !== 'absolute') return false;
      if (
        (dialog.style.top !== 'auto' && dialog.style.top !== '') ||
        (dialog.style.bottom !== 'auto' && dialog.style.bottom !== '')
      )
        return false;
      return !dialogPolyfill.isInlinePositionSetByStylesheet(dialog);
    };
    dialogPolyfill.forceRegisterDialog = function (element) {
      if (window.HTMLDialogElement || element.showModal)
        console.warn(
          'This browser already supports <dialog>, the polyfill ' + 'may not work correctly',
          element
        );
      if (element.localName !== 'dialog')
        throw new Error('Failed to register dialog: The element is not a dialog.');
      new dialogPolyfillInfo(element);
    };
    dialogPolyfill.registerDialog = function (element) {
      if (!element.showModal) dialogPolyfill.forceRegisterDialog(element);
    };
    dialogPolyfill.DialogManager = function () {
      this.pendingDialogStack = [];
      const checkDOM = this.checkDOM_.bind(this);
      this.overlay = document.createElement('div');
      this.overlay.className = '_dialog_overlay';
      this.overlay.addEventListener(
        'click',
        function (e) {
          this.forwardTab_ = undefined;
          e.stopPropagation();
          checkDOM([]);
        }.bind(this)
      );
      this.handleKey_ = this.handleKey_.bind(this);
      this.handleFocus_ = this.handleFocus_.bind(this);
      this.zIndexLow_ = 1e5;
      this.zIndexHigh_ = 1e5 + 150;
      this.forwardTab_ = undefined;
      if ('MutationObserver' in window)
        this.mo_ = new MutationObserver(function (records) {
          let removed = [];
          records.forEach(function (rec) {
            for (var i = 0, c; (c = rec.removedNodes[i]); ++i) {
              if (!(c instanceof Element)) continue;
              else if (c.localName === 'dialog') removed.push(c);
              removed = removed.concat(c.querySelectorAll('dialog'));
            }
          });
          removed.length && checkDOM(removed);
        });
    };
    dialogPolyfill.DialogManager.prototype.blockDocument = function () {
      document.documentElement.addEventListener('focus', this.handleFocus_, true);
      document.addEventListener('keydown', this.handleKey_);
      this.mo_ && this.mo_.observe(document, { childList: true, subtree: true });
    };
    dialogPolyfill.DialogManager.prototype.unblockDocument = function () {
      document.documentElement.removeEventListener('focus', this.handleFocus_, true);
      document.removeEventListener('keydown', this.handleKey_);
      this.mo_ && this.mo_.disconnect();
    };
    dialogPolyfill.DialogManager.prototype.updateStacking = function () {
      let zIndex = this.zIndexHigh_;
      for (var i = 0, dpi; (dpi = this.pendingDialogStack[i]); ++i) {
        dpi.updateZIndex(--zIndex, --zIndex);
        if (i === 0) this.overlay.style.zIndex = --zIndex;
      }
      const last = this.pendingDialogStack[0];
      if (last) {
        const p = last.dialog.parentNode || document.body;
        p.appendChild(this.overlay);
      } else if (this.overlay.parentNode) this.overlay.parentNode.removeChild(this.overlay);
    };
    dialogPolyfill.DialogManager.prototype.containedByTopDialog_ = function (candidate) {
      while ((candidate = findNearestDialog(candidate))) {
        for (var i = 0, dpi; (dpi = this.pendingDialogStack[i]); ++i)
          if (dpi.dialog === candidate) return i === 0;
        candidate = candidate.parentElement;
      }
      return false;
    };
    dialogPolyfill.DialogManager.prototype.handleFocus_ = function (event) {
      if (this.containedByTopDialog_(event.target)) return;
      event.preventDefault();
      event.stopPropagation();
      safeBlur(event.target);
      if (this.forwardTab_ === undefined) return;
      const dpi = this.pendingDialogStack[0];
      const dialog = dpi.dialog;
      const position = dialog.compareDocumentPosition(event.target);
      if (position & Node.DOCUMENT_POSITION_PRECEDING)
        if (this.forwardTab_) dpi.focus_();
        else document.documentElement.focus();
      else;
      return false;
    };
    dialogPolyfill.DialogManager.prototype.handleKey_ = function (event) {
      this.forwardTab_ = undefined;
      if (event.keyCode === 27) {
        event.preventDefault();
        event.stopPropagation();
        const cancelEvent = new supportCustomEvent('cancel', { bubbles: false, cancelable: true });
        const dpi = this.pendingDialogStack[0];
        if (dpi && dpi.dialog.dispatchEvent(cancelEvent)) dpi.dialog.close();
      } else if (event.keyCode === 9) this.forwardTab_ = !event.shiftKey;
    };
    dialogPolyfill.DialogManager.prototype.checkDOM_ = function (removed) {
      const clone = this.pendingDialogStack.slice();
      clone.forEach(function (dpi) {
        if (removed.indexOf(dpi.dialog) !== -1) dpi.downgradeModal();
        else dpi.maybeHideModal();
      });
    };
    dialogPolyfill.DialogManager.prototype.pushDialog = function (dpi) {
      const allowed = (this.zIndexHigh_ - this.zIndexLow_) / 2 - 1;
      if (this.pendingDialogStack.length >= allowed) return false;
      if (this.pendingDialogStack.unshift(dpi) === 1) this.blockDocument();
      this.updateStacking();
      return true;
    };
    dialogPolyfill.DialogManager.prototype.removeDialog = function (dpi) {
      const index = this.pendingDialogStack.indexOf(dpi);
      if (index === -1) return;
      this.pendingDialogStack.splice(index, 1);
      if (this.pendingDialogStack.length === 0) this.unblockDocument();
      this.updateStacking();
    };
    dialogPolyfill.dm = new dialogPolyfill.DialogManager();
    dialogPolyfill.formSubmitter = null;
    dialogPolyfill.useValue = null;
    if (window.HTMLDialogElement === undefined) {
      const testForm = document.createElement('form');
      testForm.setAttribute('method', 'dialog');
      if (testForm.method !== 'dialog') {
        const methodDescriptor = Object.getOwnPropertyDescriptor(
          HTMLFormElement.prototype,
          'method'
        );
        if (methodDescriptor) {
          const realGet = methodDescriptor.get;
          methodDescriptor.get = function () {
            if (isFormMethodDialog(this)) return 'dialog';
            return realGet.call(this);
          };
          const realSet = methodDescriptor.set;
          methodDescriptor.set = function (v) {
            if (typeof v === 'string' && v.toLowerCase() === 'dialog')
              return this.setAttribute('method', v);
            return realSet.call(this, v);
          };
          Object.defineProperty(HTMLFormElement.prototype, 'method', methodDescriptor);
        }
      }
      document.addEventListener(
        'click',
        function (ev) {
          dialogPolyfill.formSubmitter = null;
          dialogPolyfill.useValue = null;
          if (ev.defaultPrevented) return;
          const target = ev.target;
          if (!target || !isFormMethodDialog(target.form)) return;
          const valid =
            target.type === 'submit' && ['button', 'input'].indexOf(target.localName) > -1;
          if (!valid) {
            if (!(target.localName === 'input' && target.type === 'image')) return;
            dialogPolyfill.useValue = ev.offsetX + ',' + ev.offsetY;
          }
          const dialog = findNearestDialog(target);
          if (!dialog) return;
          dialogPolyfill.formSubmitter = target;
        },
        false
      );
      const nativeFormSubmit = HTMLFormElement.prototype.submit;
      const replacementFormSubmit = function () {
        if (!isFormMethodDialog(this)) return nativeFormSubmit.call(this);
        const dialog = findNearestDialog(this);
        dialog && dialog.close();
      };
      HTMLFormElement.prototype.submit = replacementFormSubmit;
      document.addEventListener(
        'submit',
        function (ev) {
          const form = ev.target;
          if (!isFormMethodDialog(form)) return;
          ev.preventDefault();
          const dialog = findNearestDialog(form);
          if (!dialog) return;
          const s = dialogPolyfill.formSubmitter;
          if (s && s.form === form) dialog.close(dialogPolyfill.useValue || s.value);
          else dialog.close();
          dialogPolyfill.formSubmitter = null;
        },
        true
      );
    }
    dialogPolyfill.forceRegisterDialog = dialogPolyfill.forceRegisterDialog;
    dialogPolyfill.registerDialog = dialogPolyfill.registerDialog;
    if (typeof define === 'function' && 'amd' in define)
      define(function () {
        return dialogPolyfill;
      });
    else if (typeof module === 'object' && typeof module.exports === 'object')
      module.exports = dialogPolyfill;
    else window.dialogPolyfill = dialogPolyfill;
  })(); /*

 Copyright 2015 Google Inc. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
  let componentHandler = {
    upgradeDom: function (optJsClass, optCssClass) {},
    upgradeElement: function (element, optJsClass) {},
    upgradeElements: function (elements) {},
    upgradeAllRegistered: function () {},
    registerUpgradedCallback: function (jsClass, callback) {},
    register: function (config) {},
    downgradeElements: function (nodes) {}
  };
  componentHandler = (function () {
    const registeredComponents_ = [];
    const createdComponents_ = [];
    const componentConfigProperty_ = 'mdlComponentConfigInternal_';
    function findRegisteredClass_(name, optReplace) {
      for (let i = 0; i < registeredComponents_.length; i++)
        if (registeredComponents_[i].className === name) {
          if (typeof optReplace !== 'undefined') registeredComponents_[i] = optReplace;
          return registeredComponents_[i];
        }
      return false;
    }
    function getUpgradedListOfElement_(element) {
      const dataUpgraded = element.getAttribute('data-upgraded');
      return dataUpgraded === null ? [''] : dataUpgraded.split(',');
    }
    function isElementUpgraded_(element, jsClass) {
      const upgradedList = getUpgradedListOfElement_(element);
      return upgradedList.indexOf(jsClass) !== -1;
    }
    function createEvent_(eventType, bubbles, cancelable) {
      if ('CustomEvent' in window && typeof window.CustomEvent === 'function')
        return new CustomEvent(eventType, { bubbles, cancelable });
      else {
        const ev = document.createEvent('Events');
        ev.initEvent(eventType, bubbles, cancelable);
        return ev;
      }
    }
    function upgradeDomInternal(optJsClass, optCssClass) {
      if (typeof optJsClass === 'undefined' && typeof optCssClass === 'undefined')
        for (let i = 0; i < registeredComponents_.length; i++)
          upgradeDomInternal(registeredComponents_[i].className, registeredComponents_[i].cssClass);
      else {
        const jsClass = optJsClass;
        if (typeof optCssClass === 'undefined') {
          const registeredClass = findRegisteredClass_(jsClass);
          if (registeredClass) optCssClass = registeredClass.cssClass;
        }
        const elements = document.querySelectorAll('.' + optCssClass);
        for (let n = 0; n < elements.length; n++) upgradeElementInternal(elements[n], jsClass);
      }
    }
    function upgradeElementInternal(element, optJsClass) {
      if (!(typeof element === 'object' && element instanceof Element))
        throw new Error('Invalid argument provided to upgrade MDL element.');
      const upgradingEv = createEvent_('mdl-componentupgrading', true, true);
      element.dispatchEvent(upgradingEv);
      if (upgradingEv.defaultPrevented) return;
      const upgradedList = getUpgradedListOfElement_(element);
      const classesToUpgrade = [];
      if (!optJsClass) {
        const classList = element.classList;
        registeredComponents_.forEach(function (component) {
          if (
            classList.contains(component.cssClass) &&
            classesToUpgrade.indexOf(component) === -1 &&
            !isElementUpgraded_(element, component.className)
          )
            classesToUpgrade.push(component);
        });
      } else if (!isElementUpgraded_(element, optJsClass))
        classesToUpgrade.push(findRegisteredClass_(optJsClass));
      for (var i = 0, n = classesToUpgrade.length, registeredClass; i < n; i++) {
        registeredClass = classesToUpgrade[i];
        if (registeredClass) {
          upgradedList.push(registeredClass.className);
          element.setAttribute('data-upgraded', upgradedList.join(','));
          const instance = new registeredClass.classConstructor(element);
          instance[componentConfigProperty_] = registeredClass;
          createdComponents_.push(instance);
          for (let j = 0, m = registeredClass.callbacks.length; j < m; j++)
            registeredClass.callbacks[j](element);
          if (registeredClass.widget) element[registeredClass.className] = instance;
        } else throw new Error('Unable to find a registered component for the given class.');
        const upgradedEv = createEvent_('mdl-componentupgraded', true, false);
        element.dispatchEvent(upgradedEv);
      }
    }
    function upgradeElementsInternal(elements) {
      if (!Array.isArray(elements))
        if (elements instanceof Element) elements = [elements];
        else elements = Array.prototype.slice.call(elements);
      for (var i = 0, n = elements.length, element; i < n; i++) {
        element = elements[i];
        if (element instanceof HTMLElement) {
          upgradeElementInternal(element);
          if (element.children.length > 0) upgradeElementsInternal(element.children);
        }
      }
    }
    function registerInternal(config) {
      const widgetMissing =
        typeof config.widget === 'undefined' && typeof config.widget === 'undefined';
      let widget = true;
      if (!widgetMissing) widget = config.widget || config.widget;
      const newConfig = {
        classConstructor: config.constructor || config.constructor,
        className: config.classAsString || config.classAsString,
        cssClass: config.cssClass || config.cssClass,
        widget,
        callbacks: []
      };
      registeredComponents_.forEach(function (item) {
        if (item.cssClass === newConfig.cssClass)
          throw new Error('The provided cssClass has already been registered: ' + item.cssClass);
        if (item.className === newConfig.className)
          throw new Error('The provided className has already been registered');
      });
      if (config.constructor.prototype.hasOwnProperty(componentConfigProperty_))
        throw new Error(
          'MDL component classes must not have ' +
            componentConfigProperty_ +
            ' defined as a property.'
        );
      const found = findRegisteredClass_(config.classAsString, newConfig);
      if (!found) registeredComponents_.push(newConfig);
    }
    function registerUpgradedCallbackInternal(jsClass, callback) {
      const regClass = findRegisteredClass_(jsClass);
      if (regClass) regClass.callbacks.push(callback);
    }
    function upgradeAllRegisteredInternal() {
      for (let n = 0; n < registeredComponents_.length; n++)
        upgradeDomInternal(registeredComponents_[n].className);
    }
    function deconstructComponentInternal(component) {
      if (component) {
        const componentIndex = createdComponents_.indexOf(component);
        createdComponents_.splice(componentIndex, 1);
        const upgrades = component.element_.getAttribute('data-upgraded').split(',');
        const componentPlace = upgrades.indexOf(component[componentConfigProperty_].classAsString);
        upgrades.splice(componentPlace, 1);
        component.element_.setAttribute('data-upgraded', upgrades.join(','));
        const ev = createEvent_('mdl-componentdowngraded', true, false);
        component.element_.dispatchEvent(ev);
      }
    }
    function downgradeNodesInternal(nodes) {
      const downgradeNode = function (node) {
        createdComponents_
          .filter(function (item) {
            return item.element_ === node;
          })
          .forEach(deconstructComponentInternal);
      };
      if (nodes instanceof Array || nodes instanceof NodeList)
        for (let n = 0; n < nodes.length; n++) downgradeNode(nodes[n]);
      else if (nodes instanceof Node) downgradeNode(nodes);
      else throw new Error('Invalid argument provided to downgrade MDL nodes.');
    }
    return {
      upgradeDom: upgradeDomInternal,
      upgradeElement: upgradeElementInternal,
      upgradeElements: upgradeElementsInternal,
      upgradeAllRegistered: upgradeAllRegisteredInternal,
      registerUpgradedCallback: registerUpgradedCallbackInternal,
      register: registerInternal,
      downgradeElements: downgradeNodesInternal
    };
  })();
  componentHandler.ComponentConfigPublic;
  componentHandler.ComponentConfig;
  componentHandler.Component;
  componentHandler.upgradeDom = componentHandler.upgradeDom;
  componentHandler.upgradeElement = componentHandler.upgradeElement;
  componentHandler.upgradeElements = componentHandler.upgradeElements;
  componentHandler.upgradeAllRegistered = componentHandler.upgradeAllRegistered;
  componentHandler.registerUpgradedCallback = componentHandler.registerUpgradedCallback;
  componentHandler.register = componentHandler.register;
  componentHandler.downgradeElements = componentHandler.downgradeElements;
  window.componentHandler = componentHandler;
  window.componentHandler = componentHandler;
  window.addEventListener('load', function () {
    if (
      'classList' in document.createElement('div') &&
      'querySelector' in document &&
      'addEventListener' in window &&
      Array.prototype.forEach
    ) {
      document.documentElement.classList.add('mdl-js');
      componentHandler.upgradeAllRegistered();
    } else {
      componentHandler.upgradeElement = function () {};
      componentHandler.register = function () {};
    }
  });
  (function () {
    const MaterialButton = function MaterialButton(element) {
      this.element_ = element;
      this.init();
    };
    window.MaterialButton = MaterialButton;
    MaterialButton.prototype.Constant_ = {};
    MaterialButton.prototype.CssClasses_ = {
      RIPPLE_EFFECT: 'mdl-js-ripple-effect',
      RIPPLE_CONTAINER: 'mdl-button__ripple-container',
      RIPPLE: 'mdl-ripple'
    };
    MaterialButton.prototype.blurHandler_ = function (event) {
      if (event) this.element_.blur();
    };
    MaterialButton.prototype.disable = function () {
      this.element_.disabled = true;
    };
    MaterialButton.prototype.disable = MaterialButton.prototype.disable;
    MaterialButton.prototype.enable = function () {
      this.element_.disabled = false;
    };
    MaterialButton.prototype.enable = MaterialButton.prototype.enable;
    MaterialButton.prototype.init = function () {
      if (this.element_) {
        if (this.element_.classList.contains(this.CssClasses_.RIPPLE_EFFECT)) {
          const rippleContainer = document.createElement('span');
          rippleContainer.classList.add(this.CssClasses_.RIPPLE_CONTAINER);
          this.rippleElement_ = document.createElement('span');
          this.rippleElement_.classList.add(this.CssClasses_.RIPPLE);
          rippleContainer.appendChild(this.rippleElement_);
          this.boundRippleBlurHandler = this.blurHandler_.bind(this);
          this.rippleElement_.addEventListener('mouseup', this.boundRippleBlurHandler);
          this.element_.appendChild(rippleContainer);
        }
        this.boundButtonBlurHandler = this.blurHandler_.bind(this);
        this.element_.addEventListener('mouseup', this.boundButtonBlurHandler);
        this.element_.addEventListener('mouseleave', this.boundButtonBlurHandler);
      }
    };
    componentHandler.register({
      constructor: MaterialButton,
      classAsString: 'MaterialButton',
      cssClass: 'mdl-js-button',
      widget: true
    });
  })();
  (function () {
    const MaterialProgress = function MaterialProgress(element) {
      this.element_ = element;
      this.init();
    };
    window.MaterialProgress = MaterialProgress;
    MaterialProgress.prototype.Constant_ = {};
    MaterialProgress.prototype.CssClasses_ = { INDETERMINATE_CLASS: 'mdl-progress__indeterminate' };
    MaterialProgress.prototype.setProgress = function (p) {
      if (this.element_.classList.contains(this.CssClasses_.INDETERMINATE_CLASS)) return;
      this.progressbar_.style.width = p + '%';
    };
    MaterialProgress.prototype.setProgress = MaterialProgress.prototype.setProgress;
    MaterialProgress.prototype.setBuffer = function (p) {
      this.bufferbar_.style.width = p + '%';
      this.auxbar_.style.width = 100 - p + '%';
    };
    MaterialProgress.prototype.setBuffer = MaterialProgress.prototype.setBuffer;
    MaterialProgress.prototype.init = function () {
      if (this.element_) {
        let el = document.createElement('div');
        el.className = 'progressbar bar bar1';
        this.element_.appendChild(el);
        this.progressbar_ = el;
        el = document.createElement('div');
        el.className = 'bufferbar bar bar2';
        this.element_.appendChild(el);
        this.bufferbar_ = el;
        el = document.createElement('div');
        el.className = 'auxbar bar bar3';
        this.element_.appendChild(el);
        this.auxbar_ = el;
        this.progressbar_.style.width = '0%';
        this.bufferbar_.style.width = '100%';
        this.auxbar_.style.width = '0%';
        this.element_.classList.add('is-upgraded');
      }
    };
    componentHandler.register({
      constructor: MaterialProgress,
      classAsString: 'MaterialProgress',
      cssClass: 'mdl-js-progress',
      widget: true
    });
  })();
  (function () {
    const MaterialSpinner = function MaterialSpinner(element) {
      this.element_ = element;
      this.init();
    };
    window.MaterialSpinner = MaterialSpinner;
    MaterialSpinner.prototype.Constant_ = { MDL_SPINNER_LAYER_COUNT: 4 };
    MaterialSpinner.prototype.CssClasses_ = {
      MDL_SPINNER_LAYER: 'mdl-spinner__layer',
      MDL_SPINNER_CIRCLE_CLIPPER: 'mdl-spinner__circle-clipper',
      MDL_SPINNER_CIRCLE: 'mdl-spinner__circle',
      MDL_SPINNER_GAP_PATCH: 'mdl-spinner__gap-patch',
      MDL_SPINNER_LEFT: 'mdl-spinner__left',
      MDL_SPINNER_RIGHT: 'mdl-spinner__right'
    };
    MaterialSpinner.prototype.createLayer = function (index) {
      const layer = document.createElement('div');
      layer.classList.add(this.CssClasses_.MDL_SPINNER_LAYER);
      layer.classList.add(this.CssClasses_.MDL_SPINNER_LAYER + '-' + index);
      const leftClipper = document.createElement('div');
      leftClipper.classList.add(this.CssClasses_.MDL_SPINNER_CIRCLE_CLIPPER);
      leftClipper.classList.add(this.CssClasses_.MDL_SPINNER_LEFT);
      const gapPatch = document.createElement('div');
      gapPatch.classList.add(this.CssClasses_.MDL_SPINNER_GAP_PATCH);
      const rightClipper = document.createElement('div');
      rightClipper.classList.add(this.CssClasses_.MDL_SPINNER_CIRCLE_CLIPPER);
      rightClipper.classList.add(this.CssClasses_.MDL_SPINNER_RIGHT);
      const circleOwners = [leftClipper, gapPatch, rightClipper];
      for (let i = 0; i < circleOwners.length; i++) {
        const circle = document.createElement('div');
        circle.classList.add(this.CssClasses_.MDL_SPINNER_CIRCLE);
        circleOwners[i].appendChild(circle);
      }
      layer.appendChild(leftClipper);
      layer.appendChild(gapPatch);
      layer.appendChild(rightClipper);
      this.element_.appendChild(layer);
    };
    MaterialSpinner.prototype.createLayer = MaterialSpinner.prototype.createLayer;
    MaterialSpinner.prototype.stop = function () {
      this.element_.classList.remove('is-active');
    };
    MaterialSpinner.prototype.stop = MaterialSpinner.prototype.stop;
    MaterialSpinner.prototype.start = function () {
      this.element_.classList.add('is-active');
    };
    MaterialSpinner.prototype.start = MaterialSpinner.prototype.start;
    MaterialSpinner.prototype.init = function () {
      if (this.element_) {
        for (let i = 1; i <= this.Constant_.MDL_SPINNER_LAYER_COUNT; i++) this.createLayer(i);
        this.element_.classList.add('is-upgraded');
      }
    };
    componentHandler.register({
      constructor: MaterialSpinner,
      classAsString: 'MaterialSpinner',
      cssClass: 'mdl-js-spinner',
      widget: true
    });
  })();
  (function () {
    const MaterialTextfield = function MaterialTextfield(element) {
      this.element_ = element;
      this.maxRows = this.Constant_.NO_MAX_ROWS;
      this.init();
    };
    window.MaterialTextfield = MaterialTextfield;
    MaterialTextfield.prototype.Constant_ = { NO_MAX_ROWS: -1, MAX_ROWS_ATTRIBUTE: 'maxrows' };
    MaterialTextfield.prototype.CssClasses_ = {
      LABEL: 'mdl-textfield__label',
      INPUT: 'mdl-textfield__input',
      IS_DIRTY: 'is-dirty',
      IS_FOCUSED: 'is-focused',
      IS_DISABLED: 'is-disabled',
      IS_INVALID: 'is-invalid',
      IS_UPGRADED: 'is-upgraded',
      HAS_PLACEHOLDER: 'has-placeholder'
    };
    MaterialTextfield.prototype.onKeyDown_ = function (event) {
      const currentRowCount = event.target.value.split('\n').length;
      if (event.keyCode === 13) if (currentRowCount >= this.maxRows) event.preventDefault();
    };
    MaterialTextfield.prototype.onFocus_ = function (event) {
      this.element_.classList.add(this.CssClasses_.IS_FOCUSED);
    };
    MaterialTextfield.prototype.onBlur_ = function (event) {
      this.element_.classList.remove(this.CssClasses_.IS_FOCUSED);
    };
    MaterialTextfield.prototype.onReset_ = function (event) {
      this.updateClasses_();
    };
    MaterialTextfield.prototype.updateClasses_ = function () {
      this.checkDisabled();
      this.checkValidity();
      this.checkDirty();
      this.checkFocus();
    };
    MaterialTextfield.prototype.checkDisabled = function () {
      if (this.input_.disabled) this.element_.classList.add(this.CssClasses_.IS_DISABLED);
      else this.element_.classList.remove(this.CssClasses_.IS_DISABLED);
    };
    MaterialTextfield.prototype.checkDisabled = MaterialTextfield.prototype.checkDisabled;
    MaterialTextfield.prototype.checkFocus = function () {
      if (this.element_.querySelector(':focus'))
        this.element_.classList.add(this.CssClasses_.IS_FOCUSED);
      else this.element_.classList.remove(this.CssClasses_.IS_FOCUSED);
    };
    MaterialTextfield.prototype.checkFocus = MaterialTextfield.prototype.checkFocus;
    MaterialTextfield.prototype.checkValidity = function () {
      if (this.input_.validity)
        if (this.input_.validity.valid) this.element_.classList.remove(this.CssClasses_.IS_INVALID);
        else this.element_.classList.add(this.CssClasses_.IS_INVALID);
    };
    MaterialTextfield.prototype.checkValidity = MaterialTextfield.prototype.checkValidity;
    MaterialTextfield.prototype.checkDirty = function () {
      if (this.input_.value && this.input_.value.length > 0)
        this.element_.classList.add(this.CssClasses_.IS_DIRTY);
      else this.element_.classList.remove(this.CssClasses_.IS_DIRTY);
    };
    MaterialTextfield.prototype.checkDirty = MaterialTextfield.prototype.checkDirty;
    MaterialTextfield.prototype.disable = function () {
      this.input_.disabled = true;
      this.updateClasses_();
    };
    MaterialTextfield.prototype.disable = MaterialTextfield.prototype.disable;
    MaterialTextfield.prototype.enable = function () {
      this.input_.disabled = false;
      this.updateClasses_();
    };
    MaterialTextfield.prototype.enable = MaterialTextfield.prototype.enable;
    MaterialTextfield.prototype.change = function (value) {
      this.input_.value = value || '';
      this.updateClasses_();
    };
    MaterialTextfield.prototype.change = MaterialTextfield.prototype.change;
    MaterialTextfield.prototype.init = function () {
      if (this.element_) {
        this.label_ = this.element_.querySelector('.' + this.CssClasses_.LABEL);
        this.input_ = this.element_.querySelector('.' + this.CssClasses_.INPUT);
        if (this.input_) {
          if (this.input_.hasAttribute(this.Constant_.MAX_ROWS_ATTRIBUTE)) {
            this.maxRows = parseInt(
              this.input_.getAttribute(this.Constant_.MAX_ROWS_ATTRIBUTE),
              10
            );
            if (isNaN(this.maxRows)) this.maxRows = this.Constant_.NO_MAX_ROWS;
          }
          if (this.input_.hasAttribute('placeholder'))
            this.element_.classList.add(this.CssClasses_.HAS_PLACEHOLDER);
          this.boundUpdateClassesHandler = this.updateClasses_.bind(this);
          this.boundFocusHandler = this.onFocus_.bind(this);
          this.boundBlurHandler = this.onBlur_.bind(this);
          this.boundResetHandler = this.onReset_.bind(this);
          this.input_.addEventListener('input', this.boundUpdateClassesHandler);
          this.input_.addEventListener('focus', this.boundFocusHandler);
          this.input_.addEventListener('blur', this.boundBlurHandler);
          this.input_.addEventListener('reset', this.boundResetHandler);
          if (this.maxRows !== this.Constant_.NO_MAX_ROWS) {
            this.boundKeyDownHandler = this.onKeyDown_.bind(this);
            this.input_.addEventListener('keydown', this.boundKeyDownHandler);
          }
          const invalid = this.element_.classList.contains(this.CssClasses_.IS_INVALID);
          this.updateClasses_();
          this.element_.classList.add(this.CssClasses_.IS_UPGRADED);
          if (invalid) this.element_.classList.add(this.CssClasses_.IS_INVALID);
          if (this.input_.hasAttribute('autofocus')) {
            this.element_.focus();
            this.checkFocus();
          }
        }
      }
    };
    componentHandler.register({
      constructor: MaterialTextfield,
      classAsString: 'MaterialTextfield',
      cssClass: 'mdl-js-textfield',
      widget: true
    });
  })();
  (function () {
    let l;
    const aa =
      typeof Object.create === 'function'
        ? Object.create
        : function (a) {
            function b() {}
            b.prototype = a;
            return new b();
          };
    let ba;
    if (typeof Object.setPrototypeOf === 'function') ba = Object.setPrototypeOf;
    else {
      let ca;
      a: {
        const da = { xb: !0 };
        const ea = {};
        try {
          ea.__proto__ = da;
          ca = ea.xb;
          break a;
        } catch (a) {}
        ca = !1;
      }
      ba = ca
        ? function (a, b) {
            a.__proto__ = b;
            if (a.__proto__ !== b) throw new TypeError(a + ' is not extensible');
            return a;
          }
        : null;
    }
    const fa = ba;
    function m(a, b) {
      a.prototype = aa(b.prototype);
      a.prototype.constructor = a;
      if (fa) fa(a, b);
      else
        for (const c in b)
          if (c != 'prototype')
            if (Object.defineProperties) {
              const d = Object.getOwnPropertyDescriptor(b, c);
              d && Object.defineProperty(a, c, d);
            } else a[c] = b[c];
      a.K = b.prototype;
    }
    const ha =
      typeof Object.defineProperties === 'function'
        ? Object.defineProperty
        : function (a, b, c) {
            a != Array.prototype && a != Object.prototype && (a[b] = c.value);
          };
    const ia =
      typeof window !== 'undefined' && window === this
        ? this
        : typeof global !== 'undefined' && global != null
        ? global
        : this;
    function ja(a, b) {
      if (b) {
        let c = ia;
        a = a.split('.');
        for (var d = 0; d < a.length - 1; d++) {
          const e = a[d];
          e in c || (c[e] = {});
          c = c[e];
        }
        a = a[a.length - 1];
        d = c[a];
        b = b(d);
        b != d && b != null && ha(c, a, { configurable: !0, writable: !0, value: b });
      }
    }
    ja('Object.is', function (a) {
      return (
        a ||
        function (b, c) {
          return b === c ? b !== 0 || 1 / b === 1 / c : b !== b && c !== c;
        }
      );
    });
    ja('Array.prototype.includes', function (a) {
      return (
        a ||
        function (b, c) {
          let d = this;
          d instanceof String && (d = String(d));
          const e = d.length;
          c = c || 0;
          for (c < 0 && (c = Math.max(c + e, 0)); c < e; c++) {
            const f = d[c];
            if (f === b || Object.is(f, b)) return !0;
          }
          return !1;
        }
      );
    });
    const n = this;
    function ka(a) {
      return void 0 !== a;
    }
    function q(a) {
      return typeof a === 'string';
    }
    const la = /^[\w+/_-]+[=]{0,2}$/;
    let ma = null;
    function na() {}
    function oa(a) {
      a.W = void 0;
      a.Xa = function () {
        return a.W ? a.W : (a.W = new a());
      };
    }
    function pa(a) {
      const b = typeof a;
      if (b == 'object')
        if (a) {
          if (a instanceof Array) return 'array';
          if (a instanceof Object) return b;
          const c = Object.prototype.toString.call(a);
          if (c == '[object Window]') return 'object';
          if (
            c == '[object Array]' ||
            (typeof a.length === 'number' &&
              typeof a.splice !== 'undefined' &&
              typeof a.propertyIsEnumerable !== 'undefined' &&
              !a.propertyIsEnumerable('splice'))
          )
            return 'array';
          if (
            c == '[object Function]' ||
            (typeof a.call !== 'undefined' &&
              typeof a.propertyIsEnumerable !== 'undefined' &&
              !a.propertyIsEnumerable('call'))
          )
            return 'function';
        } else return 'null';
      else if (b == 'function' && typeof a.call === 'undefined') return 'object';
      return b;
    }
    function qa(a) {
      return pa(a) == 'array';
    }
    function ra(a) {
      const b = pa(a);
      return b == 'array' || (b == 'object' && typeof a.length === 'number');
    }
    function sa(a) {
      return pa(a) == 'function';
    }
    function ta(a) {
      const b = typeof a;
      return (b == 'object' && a != null) || b == 'function';
    }
    const ua = 'closure_uid_' + ((1e9 * Math.random()) >>> 0);
    let va = 0;
    function wa(a, b, c) {
      return a.call.apply(a.bind, arguments);
    }
    function xa(a, b, c) {
      if (!a) throw Error();
      if (arguments.length > 2) {
        const d = Array.prototype.slice.call(arguments, 2);
        return function () {
          const e = Array.prototype.slice.call(arguments);
          Array.prototype.unshift.apply(e, d);
          return a.apply(b, e);
        };
      }
      return function () {
        return a.apply(b, arguments);
      };
    }
    function r(a, b, c) {
      Function.prototype.bind && Function.prototype.bind.toString().indexOf('native code') != -1
        ? (r = wa)
        : (r = xa);
      return r.apply(null, arguments);
    }
    function za(a, b) {
      const c = Array.prototype.slice.call(arguments, 1);
      return function () {
        const d = c.slice();
        d.push.apply(d, arguments);
        return a.apply(this, d);
      };
    }
    function u(a, b) {
      for (const c in b) a[c] = b[c];
    }
    const Aa =
      Date.now ||
      function () {
        return +new Date();
      };
    function v(a, b) {
      a = a.split('.');
      let c = n;
      a[0] in c || typeof c.execScript === 'undefined' || c.execScript('var ' + a[0]);
      for (var d; a.length && (d = a.shift()); )
        !a.length && ka(b)
          ? (c[d] = b)
          : c[d] && c[d] !== Object.prototype[d]
          ? (c = c[d])
          : (c = c[d] = {});
    }
    function w(a, b) {
      function c() {}
      c.prototype = b.prototype;
      a.K = b.prototype;
      a.prototype = new c();
      a.prototype.constructor = a;
      a.vc = function (d, e, f) {
        for (var g = Array(arguments.length - 2), h = 2; h < arguments.length; h++)
          g[h - 2] = arguments[h];
        return b.prototype[e].apply(d, g);
      };
    }
    function Ba(a) {
      if (Error.captureStackTrace) Error.captureStackTrace(this, Ba);
      else {
        const b = Error().stack;
        b && (this.stack = b);
      }
      a && (this.message = String(a));
    }
    w(Ba, Error);
    Ba.prototype.name = 'CustomError';
    let Da;
    function Ea(a, b) {
      a = a.split('%s');
      for (var c = '', d = a.length - 1, e = 0; e < d; e++)
        c += a[e] + (e < b.length ? b[e] : '%s');
      Ba.call(this, c + a[d]);
    }
    w(Ea, Ba);
    Ea.prototype.name = 'AssertionError';
    function Fa(a, b) {
      throw new Ea('Failure' + (a ? ': ' + a : ''), Array.prototype.slice.call(arguments, 1));
    }
    const Ga = Array.prototype.indexOf
      ? function (a, b) {
          return Array.prototype.indexOf.call(a, b, void 0);
        }
      : function (a, b) {
          if (q(a)) return q(b) && b.length == 1 ? a.indexOf(b, 0) : -1;
          for (let c = 0; c < a.length; c++) if (c in a && a[c] === b) return c;
          return -1;
        };
    const Ha = Array.prototype.forEach
      ? function (a, b, c) {
          Array.prototype.forEach.call(a, b, c);
        }
      : function (a, b, c) {
          for (let d = a.length, e = q(a) ? a.split('') : a, f = 0; f < d; f++)
            f in e && b.call(c, e[f], f, a);
        };
    function Ia(a, b) {
      for (let c = q(a) ? a.split('') : a, d = a.length - 1; d >= 0; --d)
        d in c && b.call(void 0, c[d], d, a);
    }
    const Ja = Array.prototype.filter
      ? function (a, b) {
          return Array.prototype.filter.call(a, b, void 0);
        }
      : function (a, b) {
          for (var c = a.length, d = [], e = 0, f = q(a) ? a.split('') : a, g = 0; g < c; g++)
            if (g in f) {
              const h = f[g];
              b.call(void 0, h, g, a) && (d[e++] = h);
            }
          return d;
        };
    const Ka = Array.prototype.map
      ? function (a, b) {
          return Array.prototype.map.call(a, b, void 0);
        }
      : function (a, b) {
          for (var c = a.length, d = Array(c), e = q(a) ? a.split('') : a, f = 0; f < c; f++)
            f in e && (d[f] = b.call(void 0, e[f], f, a));
          return d;
        };
    const La = Array.prototype.some
      ? function (a, b) {
          return Array.prototype.some.call(a, b, void 0);
        }
      : function (a, b) {
          for (let c = a.length, d = q(a) ? a.split('') : a, e = 0; e < c; e++)
            if (e in d && b.call(void 0, d[e], e, a)) return !0;
          return !1;
        };
    function Ma(a, b) {
      return Ga(a, b) >= 0;
    }
    function Na(a, b) {
      b = Ga(a, b);
      let c;
      (c = b >= 0) && Oa(a, b);
      return c;
    }
    function Oa(a, b) {
      return Array.prototype.splice.call(a, b, 1).length == 1;
    }
    function Pa(a, b) {
      a: {
        for (let c = a.length, d = q(a) ? a.split('') : a, e = 0; e < c; e++)
          if (e in d && b.call(void 0, d[e], e, a)) {
            b = e;
            break a;
          }
        b = -1;
      }
      b >= 0 && Oa(a, b);
    }
    function Qa(a, b) {
      let c = 0;
      Ia(a, function (d, e) {
        b.call(void 0, d, e, a) && Oa(a, e) && c++;
      });
    }
    function Ra(a) {
      return Array.prototype.concat.apply([], arguments);
    }
    function Sa(a) {
      const b = a.length;
      if (b > 0) {
        for (var c = Array(b), d = 0; d < b; d++) c[d] = a[d];
        return c;
      }
      return [];
    }
    function Ta(a, b, c) {
      return arguments.length <= 2
        ? Array.prototype.slice.call(a, b)
        : Array.prototype.slice.call(a, b, c);
    }
    const Ua = String.prototype.trim
      ? function (a) {
          return a.trim();
        }
      : function (a) {
          return /^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(a)[1];
        };
    const Va = /&/g;
    const Wa = /</g;
    const Xa = />/g;
    const Ya = /"/g;
    const Za = /'/g;
    const $a = /\x00/g;
    const ab = /[\x00&<>"']/;
    function bb(a, b) {
      return a < b ? -1 : a > b ? 1 : 0;
    }
    function cb(a) {
      ab.test(a) &&
        (a.indexOf('&') != -1 && (a = a.replace(Va, '&amp;')),
        a.indexOf('<') != -1 && (a = a.replace(Wa, '&lt;')),
        a.indexOf('>') != -1 && (a = a.replace(Xa, '&gt;')),
        a.indexOf('"') != -1 && (a = a.replace(Ya, '&quot;')),
        a.indexOf("'") != -1 && (a = a.replace(Za, '&#39;')),
        a.indexOf('\x00') != -1 && (a = a.replace($a, '&#0;')));
      return a;
    }
    function db(a, b, c) {
      for (const d in a) b.call(c, a[d], d, a);
    }
    function eb(a) {
      const b = {};
      let c;
      for (c in a) b[c] = a[c];
      return b;
    }
    const fb =
      'constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf'.split(
        ' '
      );
    function gb(a, b) {
      for (var c, d, e = 1; e < arguments.length; e++) {
        d = arguments[e];
        for (c in d) a[c] = d[c];
        for (let f = 0; f < fb.length; f++)
          (c = fb[f]), Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c]);
      }
    }
    const hb = 'StopIteration' in n ? n.StopIteration : { message: 'StopIteration', stack: '' };
    function ib() {}
    ib.prototype.next = function () {
      throw hb;
    };
    ib.prototype.ha = function () {
      return this;
    };
    function jb(a) {
      if (a instanceof ib) return a;
      if (typeof a.ha === 'function') return a.ha(!1);
      if (ra(a)) {
        let b = 0;
        const c = new ib();
        c.next = function () {
          for (;;) {
            if (b >= a.length) throw hb;
            if (b in a) return a[b++];
            b++;
          }
        };
        return c;
      }
      throw Error('Not implemented');
    }
    function kb(a, b) {
      if (ra(a))
        try {
          Ha(a, b, void 0);
        } catch (c) {
          if (c !== hb) throw c;
        }
      else {
        a = jb(a);
        try {
          for (;;) b.call(void 0, a.next(), void 0, a);
        } catch (c$1) {
          if (c$1 !== hb) throw c$1;
        }
      }
    }
    function lb(a) {
      if (ra(a)) return Sa(a);
      a = jb(a);
      const b = [];
      kb(a, function (c) {
        b.push(c);
      });
      return b;
    }
    function mb(a, b) {
      this.g = {};
      this.a = [];
      this.j = this.h = 0;
      let c = arguments.length;
      if (c > 1) {
        if (c % 2) throw Error('Uneven number of arguments');
        for (var d = 0; d < c; d += 2) this.set(arguments[d], arguments[d + 1]);
      } else if (a)
        if (a instanceof mb) for (c = a.ja(), d = 0; d < c.length; d++) this.set(c[d], a.get(c[d]));
        else for (d in a) this.set(d, a[d]);
    }
    l = mb.prototype;
    l.la = function () {
      nb(this);
      for (var a = [], b = 0; b < this.a.length; b++) a.push(this.g[this.a[b]]);
      return a;
    };
    l.ja = function () {
      nb(this);
      return this.a.concat();
    };
    l.clear = function () {
      this.g = {};
      this.j = this.h = this.a.length = 0;
    };
    function nb(a) {
      if (a.h != a.a.length) {
        for (var b = 0, c = 0; b < a.a.length; ) {
          var d = a.a[b];
          ob(a.g, d) && (a.a[c++] = d);
          b++;
        }
        a.a.length = c;
      }
      if (a.h != a.a.length) {
        const e = {};
        for (c = b = 0; b < a.a.length; )
          (d = a.a[b]), ob(e, d) || ((a.a[c++] = d), (e[d] = 1)), b++;
        a.a.length = c;
      }
    }
    l.get = function (a, b) {
      return ob(this.g, a) ? this.g[a] : b;
    };
    l.set = function (a, b) {
      ob(this.g, a) || (this.h++, this.a.push(a), this.j++);
      this.g[a] = b;
    };
    l.forEach = function (a, b) {
      for (let c = this.ja(), d = 0; d < c.length; d++) {
        const e = c[d];
        const f = this.get(e);
        a.call(b, f, e, this);
      }
    };
    l.ha = function (a) {
      nb(this);
      let b = 0;
      const c = this.j;
      const d = this;
      const e = new ib();
      e.next = function () {
        if (c != d.j) throw Error('The map has changed since the iterator was created');
        if (b >= d.a.length) throw hb;
        const f = d.a[b++];
        return a ? f : d.g[f];
      };
      return e;
    };
    function ob(a, b) {
      return Object.prototype.hasOwnProperty.call(a, b);
    }
    const pb =
      /^(?:([^:/?#.]+):)?(?:\/\/(?:([^/?#]*)@)?([^/#?]*?)(?::([0-9]+))?(?=[/#?]|$))?([^?#]+)?(?:\?([^#]*))?(?:#([\s\S]*))?$/;
    function qb(a, b) {
      if (a) {
        a = a.split('&');
        for (let c = 0; c < a.length; c++) {
          const d = a[c].indexOf('=');
          let e = null;
          if (d >= 0) {
            var f = a[c].substring(0, d);
            e = a[c].substring(d + 1);
          } else f = a[c];
          b(f, e ? decodeURIComponent(e.replace(/\+/g, ' ')) : '');
        }
      }
    }
    function rb(a, b, c, d) {
      for (let e = c.length; (b = a.indexOf(c, b)) >= 0 && b < d; ) {
        let f = a.charCodeAt(b - 1);
        if (f == 38 || f == 63)
          if (((f = a.charCodeAt(b + e)), !f || f == 61 || f == 38 || f == 35)) return b;
        b += e + 1;
      }
      return -1;
    }
    const sb = /#|$/;
    function tb(a, b) {
      const c = a.search(sb);
      let d = rb(a, 0, b, c);
      if (d < 0) return null;
      let e = a.indexOf('&', d);
      if (e < 0 || e > c) e = c;
      d += b.length + 1;
      return decodeURIComponent(a.substr(d, e - d).replace(/\+/g, ' '));
    }
    const ub = /[?&]($|#)/;
    function vb(a, b) {
      this.h = this.A = this.j = '';
      this.C = null;
      this.s = this.g = '';
      this.i = !1;
      let c;
      a instanceof vb
        ? ((this.i = ka(b) ? b : a.i),
          wb(this, a.j),
          (this.A = a.A),
          (this.h = a.h),
          xb(this, a.C),
          (this.g = a.g),
          yb(this, zb(a.a)),
          (this.s = a.s))
        : a && (c = String(a).match(pb))
        ? ((this.i = !!b),
          wb(this, c[1] || '', !0),
          (this.A = Ab(c[2] || '')),
          (this.h = Ab(c[3] || '', !0)),
          xb(this, c[4]),
          (this.g = Ab(c[5] || '', !0)),
          yb(this, c[6] || '', !0),
          (this.s = Ab(c[7] || '')))
        : ((this.i = !!b), (this.a = new Bb(null, this.i)));
    }
    vb.prototype.toString = function () {
      const a = [];
      let b = this.j;
      b && a.push(Cb(b, Db, !0), ':');
      let c = this.h;
      if (c || b == 'file')
        a.push('//'),
          (b = this.A) && a.push(Cb(b, Db, !0), '@'),
          a.push(encodeURIComponent(String(c)).replace(/%25([0-9a-fA-F]{2})/g, '%$1')),
          (c = this.C),
          c != null && a.push(':', String(c));
      if ((c = this.g))
        this.h && c.charAt(0) != '/' && a.push('/'),
          a.push(Cb(c, c.charAt(0) == '/' ? Eb : Fb, !0));
      (c = this.a.toString()) && a.push('?', c);
      (c = this.s) && a.push('#', Cb(c, Gb));
      return a.join('');
    };
    function wb(a, b, c) {
      a.j = c ? Ab(b, !0) : b;
      a.j && (a.j = a.j.replace(/:$/, ''));
    }
    function xb(a, b) {
      if (b) {
        b = Number(b);
        if (isNaN(b) || b < 0) throw Error('Bad port number ' + b);
        a.C = b;
      } else a.C = null;
    }
    function yb(a, b, c) {
      b instanceof Bb ? ((a.a = b), Hb(a.a, a.i)) : (c || (b = Cb(b, Ib)), (a.a = new Bb(b, a.i)));
    }
    function Jb(a) {
      return a instanceof vb ? new vb(a) : new vb(a, void 0);
    }
    function Ab(a, b) {
      return a ? (b ? decodeURI(a.replace(/%25/g, '%2525')) : decodeURIComponent(a)) : '';
    }
    function Cb(a, b, c) {
      return q(a)
        ? ((a = encodeURI(a).replace(b, Kb)),
          c && (a = a.replace(/%25([0-9a-fA-F]{2})/g, '%$1')),
          a)
        : null;
    }
    function Kb(a) {
      a = a.charCodeAt(0);
      return '%' + ((a >> 4) & 15).toString(16) + (a & 15).toString(16);
    }
    var Db = /[#\/\?@]/g;
    var Fb = /[#\?:]/g;
    var Eb = /[#\?]/g;
    var Ib = /[#\?@]/g;
    var Gb = /#/g;
    function Bb(a, b) {
      this.g = this.a = null;
      this.h = a || null;
      this.j = !!b;
    }
    function Lb(a) {
      a.a ||
        ((a.a = new mb()),
        (a.g = 0),
        a.h &&
          qb(a.h, function (b, c) {
            a.add(decodeURIComponent(b.replace(/\+/g, ' ')), c);
          }));
    }
    l = Bb.prototype;
    l.add = function (a, b) {
      Lb(this);
      this.h = null;
      a = Mb(this, a);
      let c = this.a.get(a);
      c || this.a.set(a, (c = []));
      c.push(b);
      this.g += 1;
      return this;
    };
    function Nb(a, b) {
      Lb(a);
      b = Mb(a, b);
      ob(a.a.g, b) &&
        ((a.h = null),
        (a.g -= a.a.get(b).length),
        (a = a.a),
        ob(a.g, b) && (delete a.g[b], a.h--, a.j++, a.a.length > 2 * a.h && nb(a)));
    }
    l.clear = function () {
      this.a = this.h = null;
      this.g = 0;
    };
    function Ob(a, b) {
      Lb(a);
      b = Mb(a, b);
      return ob(a.a.g, b);
    }
    l.forEach = function (a, b) {
      Lb(this);
      this.a.forEach(function (c, d) {
        Ha(
          c,
          function (e) {
            a.call(b, e, d, this);
          },
          this
        );
      }, this);
    };
    l.ja = function () {
      Lb(this);
      for (var a = this.a.la(), b = this.a.ja(), c = [], d = 0; d < b.length; d++)
        for (let e = a[d], f = 0; f < e.length; f++) c.push(b[d]);
      return c;
    };
    l.la = function (a) {
      Lb(this);
      let b = [];
      if (q(a)) Ob(this, a) && (b = Ra(b, this.a.get(Mb(this, a))));
      else {
        a = this.a.la();
        for (let c = 0; c < a.length; c++) b = Ra(b, a[c]);
      }
      return b;
    };
    l.set = function (a, b) {
      Lb(this);
      this.h = null;
      a = Mb(this, a);
      Ob(this, a) && (this.g -= this.a.get(a).length);
      this.a.set(a, [b]);
      this.g += 1;
      return this;
    };
    l.get = function (a, b) {
      if (!a) return b;
      a = this.la(a);
      return a.length > 0 ? String(a[0]) : b;
    };
    l.toString = function () {
      if (this.h) return this.h;
      if (!this.a) return '';
      for (var a = [], b = this.a.ja(), c = 0; c < b.length; c++) {
        let d = b[c];
        const e = encodeURIComponent(String(d));
        d = this.la(d);
        for (let f = 0; f < d.length; f++) {
          let g = e;
          d[f] !== '' && (g += '=' + encodeURIComponent(String(d[f])));
          a.push(g);
        }
      }
      return (this.h = a.join('&'));
    };
    function zb(a) {
      const b = new Bb();
      b.h = a.h;
      a.a && ((b.a = new mb(a.a)), (b.g = a.g));
      return b;
    }
    function Mb(a, b) {
      b = String(b);
      a.j && (b = b.toLowerCase());
      return b;
    }
    function Hb(a, b) {
      b &&
        !a.j &&
        (Lb(a),
        (a.h = null),
        a.a.forEach(function (c, d) {
          const e = d.toLowerCase();
          d != e &&
            (Nb(this, d),
            Nb(this, e),
            c.length > 0 &&
              ((this.h = null), this.a.set(Mb(this, e), Sa(c)), (this.g += c.length)));
        }, a));
      a.j = b;
    }
    function Pb(a) {
      this.a = Jb(a);
    }
    function Qb(a, b) {
      b ? a.a.a.set(x.Sa, b) : Nb(a.a.a, x.Sa);
    }
    function Rb(a, b) {
      b !== null ? a.a.a.set(x.Qa, b ? '1' : '0') : Nb(a.a.a, x.Qa);
    }
    function Sb(a) {
      return a.a.a.get(x.Pa) || null;
    }
    function Tb(a, b) {
      b ? a.a.a.set(x.PROVIDER_ID, b) : Nb(a.a.a, x.PROVIDER_ID);
    }
    Pb.prototype.toString = function () {
      return this.a.toString();
    };
    var x = {
      Pa: 'ui_auid',
      lc: 'apiKey',
      Qa: 'ui_sd',
      ub: 'mode',
      $a: 'oobCode',
      PROVIDER_ID: 'ui_pid',
      Sa: 'ui_sid',
      vb: 'tenantId'
    };
    let Ub;
    a: {
      const Vb = n.navigator;
      if (Vb) {
        const Wb = Vb.userAgent;
        if (Wb) {
          Ub = Wb;
          break a;
        }
      }
      Ub = '';
    }
    function y(a) {
      return Ub.indexOf(a) != -1;
    }
    function Xb() {
      return (y('Chrome') || y('CriOS')) && !y('Edge');
    }
    function Yb(a) {
      Yb[' '](a);
      return a;
    }
    Yb[' '] = na;
    function Zb(a, b) {
      const c = $b;
      return Object.prototype.hasOwnProperty.call(c, a) ? c[a] : (c[a] = b(a));
    }
    const ac = y('Opera');
    const z = y('Trident') || y('MSIE');
    const bc = y('Edge');
    const cc = bc || z;
    const dc =
      y('Gecko') &&
      !(Ub.toLowerCase().indexOf('webkit') != -1 && !y('Edge')) &&
      !(y('Trident') || y('MSIE')) &&
      !y('Edge');
    const ec = Ub.toLowerCase().indexOf('webkit') != -1 && !y('Edge');
    const fc = ec && y('Mobile');
    const gc = y('Macintosh');
    function hc() {
      const a = n.document;
      return a ? a.documentMode : void 0;
    }
    let ic;
    a: {
      let jc = '';
      const kc = (function () {
        const a = Ub;
        if (dc) return /rv:([^\);]+)(\)|;)/.exec(a);
        if (bc) return /Edge\/([\d\.]+)/.exec(a);
        if (z) return /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);
        if (ec) return /WebKit\/(\S+)/.exec(a);
        if (ac) return /(?:Version)[ \/]?(\S+)/.exec(a);
      })();
      kc && (jc = kc ? kc[1] : '');
      if (z) {
        const lc = hc();
        if (lc != null && lc > parseFloat(jc)) {
          ic = String(lc);
          break a;
        }
      }
      ic = jc;
    }
    var $b = {};
    function mc(a) {
      return Zb(a, function () {
        for (
          var b = 0,
            c = Ua(String(ic)).split('.'),
            d = Ua(String(a)).split('.'),
            e = Math.max(c.length, d.length),
            f = 0;
          b == 0 && f < e;
          f++
        ) {
          let g = c[f] || '';
          let h = d[f] || '';
          do {
            g = /(\d*)(\D*)(.*)/.exec(g) || ['', '', '', ''];
            h = /(\d*)(\D*)(.*)/.exec(h) || ['', '', '', ''];
            if (g[0].length == 0 && h[0].length == 0) break;
            b =
              bb(
                g[1].length == 0 ? 0 : parseInt(g[1], 10),
                h[1].length == 0 ? 0 : parseInt(h[1], 10)
              ) ||
              bb(g[2].length == 0, h[2].length == 0) ||
              bb(g[2], h[2]);
            g = g[3];
            h = h[3];
          } while (b == 0);
        }
        return b >= 0;
      });
    }
    let nc;
    const oc = n.document;
    nc = oc && z ? hc() || (oc.compatMode == 'CSS1Compat' ? parseInt(ic, 10) : 5) : void 0;
    function pc(a, b) {
      this.a = (a === qc && b) || '';
      this.g = rc;
    }
    pc.prototype.ma = !0;
    pc.prototype.ka = function () {
      return this.a;
    };
    pc.prototype.toString = function () {
      return 'Const{' + this.a + '}';
    };
    var rc = {};
    var qc = {};
    function sc() {
      this.a = '';
      this.h = tc;
    }
    sc.prototype.ma = !0;
    sc.prototype.ka = function () {
      return this.a.toString();
    };
    sc.prototype.g = function () {
      return 1;
    };
    sc.prototype.toString = function () {
      return 'TrustedResourceUrl{' + this.a + '}';
    };
    function uc(a) {
      if (a instanceof sc && a.constructor === sc && a.h === tc) return a.a;
      Fa("expected object of type TrustedResourceUrl, got '" + a + "' of type " + pa(a));
      return 'type_error:TrustedResourceUrl';
    }
    function vc() {
      let a = wc;
      a instanceof pc && a.constructor === pc && a.g === rc
        ? (a = a.a)
        : (Fa("expected object of type Const, got '" + a + "'"), (a = 'type_error:Const'));
      const b = new sc();
      b.a = a;
      return b;
    }
    var tc = {};
    function xc() {
      this.a = '';
      this.h = yc;
    }
    xc.prototype.ma = !0;
    xc.prototype.ka = function () {
      return this.a.toString();
    };
    xc.prototype.g = function () {
      return 1;
    };
    xc.prototype.toString = function () {
      return 'SafeUrl{' + this.a + '}';
    };
    function zc(a) {
      if (a instanceof xc && a.constructor === xc && a.h === yc) return a.a;
      Fa("expected object of type SafeUrl, got '" + a + "' of type " + pa(a));
      return 'type_error:SafeUrl';
    }
    const Ac = /^(?:(?:https?|mailto|ftp):|[^:/?#]*(?:[/?#]|$))/i;
    function Bc(a) {
      if (a instanceof xc) return a;
      a = typeof a === 'object' && a.ma ? a.ka() : String(a);
      Ac.test(a) || (a = 'about:invalid#zClosurez');
      return Cc(a);
    }
    function Dc(a) {
      if (a instanceof xc) return a;
      a = typeof a === 'object' && a.ma ? a.ka() : String(a);
      Ac.test(a) || (a = 'about:invalid#zClosurez');
      return Cc(a);
    }
    var yc = {};
    function Cc(a) {
      const b = new xc();
      b.a = a;
      return b;
    }
    Cc('about:blank');
    function Ec() {
      this.a = '';
      this.g = Fc;
    }
    Ec.prototype.ma = !0;
    var Fc = {};
    Ec.prototype.ka = function () {
      return this.a;
    };
    Ec.prototype.toString = function () {
      return 'SafeStyle{' + this.a + '}';
    };
    function Gc() {
      this.a = '';
      this.j = Hc;
      this.h = null;
    }
    Gc.prototype.g = function () {
      return this.h;
    };
    Gc.prototype.ma = !0;
    Gc.prototype.ka = function () {
      return this.a.toString();
    };
    Gc.prototype.toString = function () {
      return 'SafeHtml{' + this.a + '}';
    };
    function Ic(a) {
      if (a instanceof Gc && a.constructor === Gc && a.j === Hc) return a.a;
      Fa("expected object of type SafeHtml, got '" + a + "' of type " + pa(a));
      return 'type_error:SafeHtml';
    }
    var Hc = {};
    function Jc(a, b) {
      const c = new Gc();
      c.a = a;
      c.h = b;
      return c;
    }
    Jc('<!DOCTYPE html>', 0);
    const Kc = Jc('', 0);
    Jc('<br>', 0);
    const Lc = (function (a) {
      let b = !1;
      let c;
      return function () {
        b || ((c = a()), (b = !0));
        return c;
      };
    })(function () {
      if (typeof document === 'undefined') return !1;
      const a = document.createElement('div');
      let b = document.createElement('div');
      b.appendChild(document.createElement('div'));
      a.appendChild(b);
      if (!a.firstChild) return !1;
      b = a.firstChild.firstChild;
      a.innerHTML = Ic(Kc);
      return !b.parentElement;
    });
    function Mc(a, b) {
      a.src = uc(b);
      if (ma === null)
        b: {
          b = n.document;
          if (
            (b = b.querySelector && b.querySelector('script[nonce]')) &&
            (b = b.nonce || b.getAttribute('nonce')) &&
            la.test(b)
          ) {
            ma = b;
            break b;
          }
          ma = '';
        }
      b = ma;
      b && a.setAttribute('nonce', b);
    }
    function Nc(a, b) {
      b = b instanceof xc ? b : Dc(b);
      a.assign(zc(b));
    }
    function Oc(a, b) {
      this.a = ka(a) ? a : 0;
      this.g = ka(b) ? b : 0;
    }
    Oc.prototype.toString = function () {
      return '(' + this.a + ', ' + this.g + ')';
    };
    Oc.prototype.ceil = function () {
      this.a = Math.ceil(this.a);
      this.g = Math.ceil(this.g);
      return this;
    };
    Oc.prototype.floor = function () {
      this.a = Math.floor(this.a);
      this.g = Math.floor(this.g);
      return this;
    };
    Oc.prototype.round = function () {
      this.a = Math.round(this.a);
      this.g = Math.round(this.g);
      return this;
    };
    function Pc(a, b) {
      this.width = a;
      this.height = b;
    }
    l = Pc.prototype;
    l.toString = function () {
      return '(' + this.width + ' x ' + this.height + ')';
    };
    l.aspectRatio = function () {
      return this.width / this.height;
    };
    l.ceil = function () {
      this.width = Math.ceil(this.width);
      this.height = Math.ceil(this.height);
      return this;
    };
    l.floor = function () {
      this.width = Math.floor(this.width);
      this.height = Math.floor(this.height);
      return this;
    };
    l.round = function () {
      this.width = Math.round(this.width);
      this.height = Math.round(this.height);
      return this;
    };
    function Qc(a) {
      return a ? new Rc(Sc(a)) : Da || (Da = new Rc());
    }
    function Tc(a, b) {
      const c = b || document;
      return c.querySelectorAll && c.querySelector
        ? c.querySelectorAll('.' + a)
        : Uc(document, a, b);
    }
    function Vc(a, b) {
      let c = b || document;
      if (c.getElementsByClassName) a = c.getElementsByClassName(a)[0];
      else {
        c = document;
        const d = b || c;
        a =
          d.querySelectorAll && d.querySelector && a
            ? d.querySelector(a ? '.' + a : '')
            : Uc(c, a, b)[0] || null;
      }
      return a || null;
    }
    function Uc(a, b, c) {
      let d;
      a = c || a;
      if (a.querySelectorAll && a.querySelector && b) return a.querySelectorAll(b ? '.' + b : '');
      if (b && a.getElementsByClassName) {
        var e = a.getElementsByClassName(b);
        return e;
      }
      e = a.getElementsByTagName('*');
      if (b) {
        const f = {};
        for (c = d = 0; (a = e[c]); c++) {
          const g = a.className;
          typeof g.split === 'function' && Ma(g.split(/\s+/), b) && (f[d++] = a);
        }
        f.length = d;
        return f;
      }
      return e;
    }
    function Wc(a, b) {
      db(b, function (c, d) {
        c && typeof c === 'object' && c.ma && (c = c.ka());
        d == 'style'
          ? (a.style.cssText = c)
          : d == 'class'
          ? (a.className = c)
          : d == 'for'
          ? (a.htmlFor = c)
          : Xc.hasOwnProperty(d)
          ? a.setAttribute(Xc[d], c)
          : d.lastIndexOf('aria-', 0) == 0 || d.lastIndexOf('data-', 0) == 0
          ? a.setAttribute(d, c)
          : (a[d] = c);
      });
    }
    var Xc = {
      cellpadding: 'cellPadding',
      cellspacing: 'cellSpacing',
      colspan: 'colSpan',
      frameborder: 'frameBorder',
      height: 'height',
      maxlength: 'maxLength',
      nonce: 'nonce',
      role: 'role',
      rowspan: 'rowSpan',
      type: 'type',
      usemap: 'useMap',
      valign: 'vAlign',
      width: 'width'
    };
    function Yc(a) {
      return a.scrollingElement
        ? a.scrollingElement
        : ec || a.compatMode != 'CSS1Compat'
        ? a.body || a.documentElement
        : a.documentElement;
    }
    function Zc(a) {
      a && a.parentNode && a.parentNode.removeChild(a);
    }
    function Sc(a) {
      return a.nodeType == 9 ? a : a.ownerDocument || a.document;
    }
    function $c(a, b) {
      if ('textContent' in a) a.textContent = b;
      else if (a.nodeType == 3) a.data = String(b);
      else if (a.firstChild && a.firstChild.nodeType == 3) {
        for (; a.lastChild != a.firstChild; ) a.removeChild(a.lastChild);
        a.firstChild.data = String(b);
      } else {
        for (var c; (c = a.firstChild); ) a.removeChild(c);
        a.appendChild(Sc(a).createTextNode(String(b)));
      }
    }
    function ad(a, b) {
      return b
        ? bd(a, function (c) {
            return !b || (q(c.className) && Ma(c.className.split(/\s+/), b));
          })
        : null;
    }
    function bd(a, b) {
      for (let c = 0; a; ) {
        if (b(a)) return a;
        a = a.parentNode;
        c++;
      }
      return null;
    }
    function Rc(a) {
      this.a = a || n.document || document;
    }
    Rc.prototype.N = function () {
      return q(void 0) ? this.a.getElementById(void 0) : void 0;
    };
    const cd = { Fc: !0 };
    const dd = { Hc: !0 };
    const ed = { Ec: !0 };
    const fd = { Gc: !0 };
    function gd() {
      throw Error('Do not instantiate directly');
    }
    gd.prototype.va = null;
    gd.prototype.toString = function () {
      return this.content;
    };
    function hd(a, b, c, d) {
      a = a(b || id, void 0, c);
      d = (d || Qc()).a.createElement('DIV');
      a = jd(a);
      a.match(kd);
      a = Jc(a, null);
      if (Lc()) for (; d.lastChild; ) d.removeChild(d.lastChild);
      d.innerHTML = Ic(a);
      d.childNodes.length == 1 && ((a = d.firstChild), a.nodeType == 1 && (d = a));
      return d;
    }
    function jd(a) {
      if (!ta(a)) return cb(String(a));
      if (a instanceof gd) {
        if (a.fa === cd) return a.content;
        if (a.fa === fd) return cb(a.content);
      }
      Fa('Soy template output is unsafe for use as HTML: ' + a);
      return 'zSoyz';
    }
    var kd = /^<(body|caption|col|colgroup|head|html|tr|td|th|tbody|thead|tfoot)>/i;
    var id = {};
    function nd(a) {
      if (a != null)
        switch (a.va) {
          case 1:
            return 1;
          case -1:
            return -1;
          case 0:
            return 0;
        }
      return null;
    }
    function od() {
      gd.call(this);
    }
    w(od, gd);
    od.prototype.fa = cd;
    function A(a) {
      return a != null && a.fa === cd
        ? a
        : a instanceof Gc
        ? B(Ic(a).toString(), a.g())
        : B(cb(String(String(a))), nd(a));
    }
    function pd() {
      gd.call(this);
    }
    w(pd, gd);
    pd.prototype.fa = dd;
    pd.prototype.va = 1;
    function qd(a, b) {
      this.content = String(a);
      this.va = b != null ? b : null;
    }
    w(qd, gd);
    qd.prototype.fa = fd;
    function C(a) {
      return new qd(a, void 0);
    }
    var B = (function (a) {
      function b(c) {
        this.content = c;
      }
      b.prototype = a.prototype;
      return function (c, d) {
        c = new b(String(c));
        void 0 !== d && (c.va = d);
        return c;
      };
    })(od);
    const rd = (function (a) {
      function b(c) {
        this.content = c;
      }
      b.prototype = a.prototype;
      return function (c) {
        return new b(String(c));
      };
    })(pd);
    function sd(a) {
      function b() {}
      const c = { label: D('Nouveau mot de passe') };
      b.prototype = a;
      a = new b();
      for (const d in c) a[d] = c[d];
      return a;
    }
    function D(a) {
      return (a = String(a)) ? new qd(a, void 0) : '';
    }
    const td = (function (a) {
      function b(c) {
        this.content = c;
      }
      b.prototype = a.prototype;
      return function (c, d) {
        c = String(c);
        if (!c) return '';
        c = new b(c);
        void 0 !== d && (c.va = d);
        return c;
      };
    })(od);
    function ud(a) {
      return a != null && a.fa === cd
        ? String(String(a.content).replace(vd, '').replace(wd, '&lt;')).replace(xd, yd)
        : cb(String(a));
    }
    function zd(a) {
      a != null && a.fa === dd
        ? (a = String(a).replace(Ad, Bd))
        : a instanceof xc
        ? (a = String(zc(a).toString()).replace(Ad, Bd))
        : ((a = String(a)),
          Cd.test(a)
            ? (a = a.replace(Ad, Bd))
            : (Fa('Bad value `%s` for |filterNormalizeUri', [a]), (a = '#zSoyz')));
      return a;
    }
    function Dd(a) {
      a != null && a.fa === ed
        ? (a = a.content)
        : a == null
        ? (a = '')
        : a instanceof Ec
        ? a instanceof Ec && a.constructor === Ec && a.g === Fc
          ? (a = a.a)
          : (Fa("expected object of type SafeStyle, got '" + a + "' of type " + pa(a)),
            (a = 'type_error:SafeStyle'))
        : ((a = String(a)),
          Ed.test(a) || (Fa('Bad value `%s` for |filterCssValue', [a]), (a = 'zSoyz')));
      return a;
    }
    const Fd = {
      '\x00': '&#0;',
      '\t': '&#9;',
      '\n': '&#10;',
      '\x0B': '&#11;',
      '\f': '&#12;',
      '\r': '&#13;',
      ' ': '&#32;',
      '"': '&quot;',
      '&': '&amp;',
      "'": '&#39;',
      '-': '&#45;',
      '/': '&#47;',
      '<': '&lt;',
      '=': '&#61;',
      '>': '&gt;',
      '`': '&#96;',
      '\u0085': '&#133;',
      '\u00a0': '&#160;',
      '\u2028': '&#8232;',
      '\u2029': '&#8233;'
    };
    function yd(a) {
      return Fd[a];
    }
    const Gd = {
      '\x00': '%00',
      '\u0001': '%01',
      '\u0002': '%02',
      '\u0003': '%03',
      '\u0004': '%04',
      '\u0005': '%05',
      '\u0006': '%06',
      '\u0007': '%07',
      '\b': '%08',
      '\t': '%09',
      '\n': '%0A',
      '\x0B': '%0B',
      '\f': '%0C',
      '\r': '%0D',
      '\u000e': '%0E',
      '\u000f': '%0F',
      '\u0010': '%10',
      '\u0011': '%11',
      '\u0012': '%12',
      '\u0013': '%13',
      '\u0014': '%14',
      '\u0015': '%15',
      '\u0016': '%16',
      '\u0017': '%17',
      '\u0018': '%18',
      '\u0019': '%19',
      '\u001a': '%1A',
      '\u001b': '%1B',
      '\u001c': '%1C',
      '\u001d': '%1D',
      '\u001e': '%1E',
      '\u001f': '%1F',
      ' ': '%20',
      '"': '%22',
      "'": '%27',
      '(': '%28',
      ')': '%29',
      '<': '%3C',
      '>': '%3E',
      '\\': '%5C',
      '{': '%7B',
      '}': '%7D',
      '\u007f': '%7F',
      '\u0085': '%C2%85',
      '\u00a0': '%C2%A0',
      '\u2028': '%E2%80%A8',
      '\u2029': '%E2%80%A9',
      '\uff01': '%EF%BC%81',
      '\uff03': '%EF%BC%83',
      '\uff04': '%EF%BC%84',
      '\uff06': '%EF%BC%86',
      '\uff07': '%EF%BC%87',
      '\uff08': '%EF%BC%88',
      '\uff09': '%EF%BC%89',
      '\uff0a': '%EF%BC%8A',
      '\uff0b': '%EF%BC%8B',
      '\uff0c': '%EF%BC%8C',
      '\uff0f': '%EF%BC%8F',
      '\uff1a': '%EF%BC%9A',
      '\uff1b': '%EF%BC%9B',
      '\uff1d': '%EF%BC%9D',
      '\uff1f': '%EF%BC%9F',
      '\uff20': '%EF%BC%A0',
      '\uff3b': '%EF%BC%BB',
      '\uff3d': '%EF%BC%BD'
    };
    function Bd(a) {
      return Gd[a];
    }
    var xd = /[\x00\x22\x27\x3c\x3e]/g;
    var Ad =
      /[\x00- \x22\x27-\x29\x3c\x3e\\\x7b\x7d\x7f\x85\xa0\u2028\u2029\uff01\uff03\uff04\uff06-\uff0c\uff0f\uff1a\uff1b\uff1d\uff1f\uff20\uff3b\uff3d]/g;
    var Ed =
      /^(?!-*(?:expression|(?:moz-)?binding))(?:[.#]?-?(?:[_a-z0-9-]+)(?:-[_a-z0-9-]+)*-?|-?(?:[0-9]+(?:\.[0-9]*)?|\.[0-9]+)(?:[a-z]{1,2}|%)?|!important|)$/i;
    var Cd = /^(?![^#?]*\/(?:\.|%2E){2}(?:[\/?#]|$))(?:(?:https?|mailto):|[^&:\/?#]*(?:[\/?#]|$))/i;
    var vd = /<(?:!|\/?([a-zA-Z][a-zA-Z0-9:\-]*))(?:[^>'"]|"[^"]*"|'[^']*')*>/g;
    var wd = /</g;
    function Hd() {
      return C('Saisissez un num\u00e9ro de t\u00e9l\u00e9phone valide');
    }
    function Id() {
      return C('Code erron\u00e9. Veuillez r\u00e9essayer.');
    }
    function Jd() {
      return C('Saisissez votre mot de passe');
    }
    function Kd() {
      return C(
        "Impossible d'envoyer le code de r\u00e9initialisation du mot de passe \u00e0 l'adresse e-mail indiqu\u00e9e"
      );
    }
    function Ld() {
      return C("Une erreur s'est produite. Veuillez r\u00e9essayer.");
    }
    function Md() {
      return C(
        'Cette adresse e-mail existe, mais ne propose aucun mode de connexion. Veuillez r\u00e9initialiser le mot de passe pour r\u00e9cup\u00e9rer le compte.'
      );
    }
    function Nd(a) {
      a = a || {};
      let b = '';
      switch (a.code) {
        case 'invalid-argument':
          b += 'Le client a sp\u00e9cifi\u00e9 un argument incorrect.';
          break;
        case 'invalid-configuration':
          b += "La configuration de projet sp\u00e9cifi\u00e9e par le client n'est pas valide.";
          break;
        case 'failed-precondition':
          b +=
            "La requ\u00eate ne peut pas \u00eatre ex\u00e9cut\u00e9e dans l'\u00e9tat actuel du syst\u00e8me.";
          break;
        case 'out-of-range':
          b += 'Le client a sp\u00e9cifi\u00e9 une plage non valide.';
          break;
        case 'unauthenticated':
          b +=
            "La requ\u00eate n'a pas \u00e9t\u00e9 authentifi\u00e9e en raison d'un jeton OAuth manquant, non valide ou ayant expir\u00e9.";
          break;
        case 'permission-denied':
          b += "Le client ne dispose pas d'une autorisation suffisante.";
          break;
        case 'not-found':
          b += 'Ressource indiqu\u00e9e introuvable.';
          break;
        case 'aborted':
          b +=
            "Un conflit de simultan\u00e9it\u00e9 existe, tel qu'un conflit lecture-modification-\u00e9criture.";
          break;
        case 'already-exists':
          b += "La ressource qu'un client a essay\u00e9 de cr\u00e9er existe d\u00e9j\u00e0.";
          break;
        case 'resource-exhausted':
          b +=
            'Le quota de ressources est d\u00e9pass\u00e9 ou la limite du d\u00e9bit est atteinte.';
          break;
        case 'cancelled':
          b += 'La demande a \u00e9t\u00e9 annul\u00e9e par le client.';
          break;
        case 'data-loss':
          b += 'Perte de donn\u00e9es irr\u00e9cup\u00e9rable ou corruption de donn\u00e9es.';
          break;
        case 'unknown':
          b += 'Erreur du serveur inconnue.';
          break;
        case 'internal':
          b += 'Erreur interne du serveur.';
          break;
        case 'not-implemented':
          b += "M\u00e9thode d'API non mise en \u0153uvre par le serveur.";
          break;
        case 'unavailable':
          b += 'Service indisponible.';
          break;
        case 'deadline-exceeded':
          b += 'D\u00e9lai de requ\u00eate d\u00e9pass\u00e9.';
          break;
        case 'auth/user-disabled':
          b += 'Le compte utilisateur a \u00e9t\u00e9 d\u00e9sactiv\u00e9 par un administrateur.';
          break;
        case 'auth/timeout':
          b += "L'op\u00e9ration a d\u00e9pass\u00e9 le d\u00e9lai.";
          break;
        case 'auth/too-many-requests':
          b +=
            'Nous avons bloqu\u00e9 toutes les requ\u00eates provenant de cet appareil, car nous avons d\u00e9tect\u00e9 une activit\u00e9 inhabituelle. R\u00e9essayez plus tard.';
          break;
        case 'auth/quota-exceeded':
          b +=
            'Le quota pour cette op\u00e9ration a \u00e9t\u00e9 d\u00e9pass\u00e9. R\u00e9essayez plus tard.';
          break;
        case 'auth/network-request-failed':
          b += "Une erreur r\u00e9seau s'est produite R\u00e9essayez plus tard.";
          break;
        case 'restart-process':
          b +=
            "Une erreur s'est produite lors de l'authentification de votre requ\u00eate. Veuillez retourner sur la page qui vous a redirig\u00e9 ici pour relancer le processus d'authentification.";
          break;
        case 'no-matching-tenant-for-email':
          b +=
            "Veuillez essayer avec une autre adresse e-mail, car il n'y a pas de m\u00e9thode de connexion disponible pour celle-ci.";
      }
      return C(b);
    }
    function Od() {
      return C('Veuillez vous reconnecter pour effectuer cette op\u00e9ration');
    }
    function Pd(a, b, c) {
      const d = Error.call(this);
      this.message = d.message;
      'stack' in d && (this.stack = d.stack);
      this.code = Qd + a;
      if (!(a = b)) {
        a = '';
        switch (this.code) {
          case 'firebaseui/merge-conflict':
            a +=
              "\u00c9chec de la mise \u00e0 jour de l'utilisateur anonyme actuel. Les identifiants non anonymes sont d\u00e9j\u00e0 associ\u00e9s \u00e0 un autre compte utilisateur.";
            break;
          default:
            a += Ld();
        }
        a = C(a).toString();
      }
      this.message = a || '';
      this.credential = c || null;
    }
    m(Pd, Error);
    Pd.prototype.toJSON = function () {
      return { code: this.code, message: this.message };
    };
    var Qd = 'firebaseui/';
    function Rd() {
      Sd != 0 && (Td[this[ua] || (this[ua] = ++va)] = this);
      this.T = this.T;
      this.C = this.C;
    }
    var Sd = 0;
    var Td = {};
    Rd.prototype.T = !1;
    Rd.prototype.m = function () {
      if (!this.T && ((this.T = !0), this.o(), Sd != 0)) {
        const a = this[ua] || (this[ua] = ++va);
        if (Sd != 0 && this.C && this.C.length > 0)
          throw Error(
            this +
              " did not empty its onDisposeCallbacks queue. This probably means it overrode dispose() or disposeInternal() without calling the superclass' method."
          );
        delete Td[a];
      }
    };
    function Ud(a, b) {
      a.T
        ? ka(void 0)
          ? b.call(void 0)
          : b()
        : (a.C || (a.C = []), a.C.push(ka(void 0) ? r(b, void 0) : b));
    }
    Rd.prototype.o = function () {
      if (this.C) for (; this.C.length; ) this.C.shift()();
    };
    function Vd(a) {
      a && typeof a.m === 'function' && a.m();
    }
    const Wd =
      Object.freeze ||
      function (a) {
        return a;
      };
    const Xd = !z || Number(nc) >= 9;
    const Yd = z && !mc('9');
    const Zd = (function () {
      if (!n.addEventListener || !Object.defineProperty) return !1;
      let a = !1;
      const b = Object.defineProperty({}, 'passive', {
        get: function () {
          a = !0;
        }
      });
      try {
        n.addEventListener('test', na, b), n.removeEventListener('test', na, b);
      } catch (c) {}
      return a;
    })();
    function $d(a, b) {
      this.type = a;
      this.g = this.target = b;
      this.h = !1;
      this.qb = !0;
    }
    $d.prototype.stopPropagation = function () {
      this.h = !0;
    };
    $d.prototype.preventDefault = function () {
      this.qb = !1;
    };
    function ae(a, b) {
      $d.call(this, a ? a.type : '');
      this.relatedTarget = this.g = this.target = null;
      this.button = this.screenY = this.screenX = this.clientY = this.clientX = 0;
      this.key = '';
      this.j = this.keyCode = 0;
      this.metaKey = this.shiftKey = this.altKey = this.ctrlKey = !1;
      this.pointerId = 0;
      this.pointerType = '';
      this.a = null;
      if (a) {
        const c = (this.type = a.type);
        const d = a.changedTouches && a.changedTouches.length ? a.changedTouches[0] : null;
        this.target = a.target || a.srcElement;
        this.g = b;
        if ((b = a.relatedTarget)) {
          if (dc) {
            a: {
              try {
                Yb(b.nodeName);
                var e = !0;
                break a;
              } catch (f) {}
              e = !1;
            }
            e || (b = null);
          }
        } else c == 'mouseover' ? (b = a.fromElement) : c == 'mouseout' && (b = a.toElement);
        this.relatedTarget = b;
        d
          ? ((this.clientX = void 0 !== d.clientX ? d.clientX : d.pageX),
            (this.clientY = void 0 !== d.clientY ? d.clientY : d.pageY),
            (this.screenX = d.screenX || 0),
            (this.screenY = d.screenY || 0))
          : ((this.clientX = void 0 !== a.clientX ? a.clientX : a.pageX),
            (this.clientY = void 0 !== a.clientY ? a.clientY : a.pageY),
            (this.screenX = a.screenX || 0),
            (this.screenY = a.screenY || 0));
        this.button = a.button;
        this.keyCode = a.keyCode || 0;
        this.key = a.key || '';
        this.j = a.charCode || (c == 'keypress' ? a.keyCode : 0);
        this.ctrlKey = a.ctrlKey;
        this.altKey = a.altKey;
        this.shiftKey = a.shiftKey;
        this.metaKey = a.metaKey;
        this.pointerId = a.pointerId || 0;
        this.pointerType = q(a.pointerType) ? a.pointerType : be[a.pointerType] || '';
        this.a = a;
        a.defaultPrevented && this.preventDefault();
      }
    }
    w(ae, $d);
    var be = Wd({ 2: 'touch', 3: 'pen', 4: 'mouse' });
    ae.prototype.stopPropagation = function () {
      ae.K.stopPropagation.call(this);
      this.a.stopPropagation ? this.a.stopPropagation() : (this.a.cancelBubble = !0);
    };
    ae.prototype.preventDefault = function () {
      ae.K.preventDefault.call(this);
      const a = this.a;
      if (a.preventDefault) a.preventDefault();
      else if (((a.returnValue = !1), Yd))
        try {
          if (a.ctrlKey || (a.keyCode >= 112 && a.keyCode <= 123)) a.keyCode = -1;
        } catch (b) {}
    };
    const ce = 'closure_listenable_' + ((1e6 * Math.random()) | 0);
    let de = 0;
    function ee(a, b, c, d, e) {
      this.listener = a;
      this.proxy = null;
      this.src = b;
      this.type = c;
      this.capture = !!d;
      this.La = e;
      this.key = ++de;
      this.sa = this.Ia = !1;
    }
    function fe(a) {
      a.sa = !0;
      a.listener = null;
      a.proxy = null;
      a.src = null;
      a.La = null;
    }
    function ge(a) {
      this.src = a;
      this.a = {};
      this.g = 0;
    }
    ge.prototype.add = function (a, b, c, d, e) {
      const f = a.toString();
      a = this.a[f];
      a || ((a = this.a[f] = []), this.g++);
      const g = he(a, b, d, e);
      g > -1
        ? ((b = a[g]), c || (b.Ia = !1))
        : ((b = new ee(b, this.src, f, !!d, e)), (b.Ia = c), a.push(b));
      return b;
    };
    function ie(a, b) {
      const c = b.type;
      c in a.a && Na(a.a[c], b) && (fe(b), a.a[c].length == 0 && (delete a.a[c], a.g--));
    }
    function he(a, b, c, d) {
      for (let e = 0; e < a.length; ++e) {
        const f = a[e];
        if (!f.sa && f.listener == b && f.capture == !!c && f.La == d) return e;
      }
      return -1;
    }
    const je = 'closure_lm_' + ((1e6 * Math.random()) | 0);
    const ke = {};
    let le = 0;
    function me(a, b, c, d, e) {
      if (d && d.once) return ne(a, b, c, d, e);
      if (qa(b)) {
        for (let f = 0; f < b.length; f++) me(a, b[f], c, d, e);
        return null;
      }
      c = oe(c);
      return a && a[ce]
        ? a.J.add(String(b), c, !1, ta(d) ? !!d.capture : !!d, e)
        : pe(a, b, c, !1, d, e);
    }
    function pe(a, b, c, d, e, f) {
      if (!b) throw Error('Invalid event type');
      const g = ta(e) ? !!e.capture : !!e;
      let h = qe(a);
      h || (a[je] = h = new ge(a));
      c = h.add(b, c, d, g, f);
      if (c.proxy) return c;
      d = re();
      c.proxy = d;
      d.src = a;
      d.listener = c;
      if (a.addEventListener)
        Zd || (e = g), void 0 === e && (e = !1), a.addEventListener(b.toString(), d, e);
      else if (a.attachEvent) a.attachEvent(se(b.toString()), d);
      else if (a.addListener && a.removeListener) a.addListener(d);
      else throw Error('addEventListener and attachEvent are unavailable.');
      le++;
      return c;
    }
    function re() {
      const a = te;
      var b = Xd
        ? function (c) {
            return a.call(b.src, b.listener, c);
          }
        : function (c) {
            c = a.call(b.src, b.listener, c);
            if (!c) return c;
          };
      return b;
    }
    function ne(a, b, c, d, e) {
      if (qa(b)) {
        for (let f = 0; f < b.length; f++) ne(a, b[f], c, d, e);
        return null;
      }
      c = oe(c);
      return a && a[ce]
        ? a.J.add(String(b), c, !0, ta(d) ? !!d.capture : !!d, e)
        : pe(a, b, c, !0, d, e);
    }
    function ue(a, b, c, d, e) {
      if (qa(b)) for (var f = 0; f < b.length; f++) ue(a, b[f], c, d, e);
      else
        ((d = ta(d) ? !!d.capture : !!d), (c = oe(c)), a && a[ce])
          ? ((a = a.J),
            (b = String(b).toString()),
            b in a.a &&
              ((f = a.a[b]),
              (c = he(f, c, d, e)),
              c > -1 && (fe(f[c]), Oa(f, c), f.length == 0 && (delete a.a[b], a.g--))))
          : a &&
            (a = qe(a)) &&
            ((b = a.a[b.toString()]),
            (a = -1),
            b && (a = he(b, c, d, e)),
            (c = a > -1 ? b[a] : null) && ve(c));
    }
    function ve(a) {
      if (typeof a !== 'number' && a && !a.sa) {
        const b = a.src;
        if (b && b[ce]) ie(b.J, a);
        else {
          let c = a.type;
          const d = a.proxy;
          b.removeEventListener
            ? b.removeEventListener(c, d, a.capture)
            : b.detachEvent
            ? b.detachEvent(se(c), d)
            : b.addListener && b.removeListener && b.removeListener(d);
          le--;
          (c = qe(b)) ? (ie(c, a), c.g == 0 && ((c.src = null), (b[je] = null))) : fe(a);
        }
      }
    }
    function se(a) {
      return a in ke ? ke[a] : (ke[a] = 'on' + a);
    }
    function we(a, b, c, d) {
      let e = !0;
      if ((a = qe(a)))
        if ((b = a.a[b.toString()]))
          for (b = b.concat(), a = 0; a < b.length; a++) {
            let f = b[a];
            f && f.capture == c && !f.sa && ((f = xe(f, d)), (e = e && !1 !== f));
          }
      return e;
    }
    function xe(a, b) {
      const c = a.listener;
      const d = a.La || a.src;
      a.Ia && ve(a);
      return c.call(d, b);
    }
    function te(a, b) {
      if (a.sa) return !0;
      if (!Xd) {
        if (!b)
          a: {
            b = ['window', 'event'];
            for (var c = n, d = 0; d < b.length; d++)
              if (((c = c[b[d]]), c == null)) {
                b = null;
                break a;
              }
            b = c;
          }
        d = b;
        b = new ae(d, this);
        c = !0;
        if (!(d.keyCode < 0 || void 0 != d.returnValue)) {
          a: {
            var e = !1;
            if (d.keyCode == 0)
              try {
                d.keyCode = -1;
                break a;
              } catch (g) {
                e = !0;
              }
            if (e || void 0 == d.returnValue) d.returnValue = !0;
          }
          d = [];
          for (e = b.g; e; e = e.parentNode) d.push(e);
          a = a.type;
          for (e = d.length - 1; !b.h && e >= 0; e--) {
            b.g = d[e];
            var f = we(d[e], a, !0, b);
            c = c && f;
          }
          for (e = 0; !b.h && e < d.length; e++)
            (b.g = d[e]), (f = we(d[e], a, !1, b)), (c = c && f);
        }
        return c;
      }
      return xe(a, new ae(b, this));
    }
    function qe(a) {
      a = a[je];
      return a instanceof ge ? a : null;
    }
    const ye = '__closure_events_fn_' + ((1e9 * Math.random()) >>> 0);
    function oe(a) {
      if (sa(a)) return a;
      a[ye] ||
        (a[ye] = function (b) {
          return a.handleEvent(b);
        });
      return a[ye];
    }
    function E() {
      Rd.call(this);
      this.J = new ge(this);
      this.wb = this;
      this.Ha = null;
    }
    w(E, Rd);
    E.prototype[ce] = !0;
    E.prototype.Za = function (a) {
      this.Ha = a;
    };
    E.prototype.removeEventListener = function (a, b, c, d) {
      ue(this, a, b, c, d);
    };
    function ze(a, b) {
      let c;
      let d = a.Ha;
      if (d) for (c = []; d; d = d.Ha) c.push(d);
      a = a.wb;
      d = b.type || b;
      if (q(b)) b = new $d(b, a);
      else if (b instanceof $d) b.target = b.target || a;
      else {
        var e = b;
        b = new $d(d, a);
        gb(b, e);
      }
      e = !0;
      if (c)
        for (var f = c.length - 1; !b.h && f >= 0; f--) {
          var g = (b.g = c[f]);
          e = Ae(g, d, !0, b) && e;
        }
      b.h || ((g = b.g = a), (e = Ae(g, d, !0, b) && e), b.h || (e = Ae(g, d, !1, b) && e));
      if (c) for (f = 0; !b.h && f < c.length; f++) (g = b.g = c[f]), (e = Ae(g, d, !1, b) && e);
      return e;
    }
    E.prototype.o = function () {
      E.K.o.call(this);
      if (this.J) {
        const a = this.J;
        let b = 0;
        let c;
        for (c in a.a) {
          for (let d = a.a[c], e = 0; e < d.length; e++) ++b, fe(d[e]);
          delete a.a[c];
          a.g--;
        }
      }
      this.Ha = null;
    };
    function Ae(a, b, c, d) {
      b = a.J.a[String(b)];
      if (!b) return !0;
      b = b.concat();
      for (var e = !0, f = 0; f < b.length; ++f) {
        const g = b[f];
        if (g && !g.sa && g.capture == c) {
          const h = g.listener;
          const k = g.La || g.src;
          g.Ia && ie(a.J, g);
          e = !1 !== h.call(k, d) && e;
        }
      }
      return e && d.qb != 0;
    }
    const Be = {};
    let Ce = 0;
    function De(a, b) {
      if (!a) throw Error('Event target element must be provided!');
      a = Ee(a);
      if (Be[a] && Be[a].length) for (let c = 0; c < Be[a].length; c++) ze(Be[a][c], b);
    }
    function Fe(a) {
      const b = Ee(a.N());
      Be[b] &&
        Be[b].length &&
        (Pa(Be[b], function (c) {
          return c == a;
        }),
        Be[b].length || delete Be[b]);
    }
    function Ee(a) {
      typeof a.a === 'undefined' && ((a.a = Ce), Ce++);
      return a.a;
    }
    function Ge(a) {
      if (!a) throw Error('Event target element must be provided!');
      E.call(this);
      this.a = a;
    }
    m(Ge, E);
    Ge.prototype.N = function () {
      return this.a;
    };
    Ge.prototype.register = function () {
      const a = Ee(this.N());
      Be[a] ? Ma(Be[a], this) || Be[a].push(this) : (Be[a] = [this]);
    };
    function He(a) {
      if (!a) return !1;
      try {
        return !!a.$goog_Thenable;
      } catch (b) {
        return !1;
      }
    }
    function Ie(a, b) {
      this.h = a;
      this.j = b;
      this.g = 0;
      this.a = null;
    }
    Ie.prototype.get = function () {
      if (this.g > 0) {
        this.g--;
        var a = this.a;
        this.a = a.next;
        a.next = null;
      } else a = this.h();
      return a;
    };
    function Je(a, b) {
      a.j(b);
      a.g < 100 && (a.g++, (b.next = a.a), (a.a = b));
    }
    function Ke() {
      this.g = this.a = null;
    }
    const Me = new Ie(
      function () {
        return new Le();
      },
      function (a) {
        a.reset();
      }
    );
    Ke.prototype.add = function (a, b) {
      const c = Me.get();
      c.set(a, b);
      this.g ? (this.g.next = c) : (this.a = c);
      this.g = c;
    };
    function Ne() {
      const a = Oe;
      let b = null;
      a.a && ((b = a.a), (a.a = a.a.next), a.a || (a.g = null), (b.next = null));
      return b;
    }
    function Le() {
      this.next = this.g = this.a = null;
    }
    Le.prototype.set = function (a, b) {
      this.a = a;
      this.g = b;
      this.next = null;
    };
    Le.prototype.reset = function () {
      this.next = this.g = this.a = null;
    };
    function Pe(a) {
      n.setTimeout(function () {
        throw a;
      }, 0);
    }
    let Qe;
    function Re() {
      let a = n.MessageChannel;
      typeof a === 'undefined' &&
        typeof window !== 'undefined' &&
        window.postMessage &&
        window.addEventListener &&
        !y('Presto') &&
        (a = function () {
          let e = document.createElement('IFRAME');
          e.style.display = 'none';
          e.src = '';
          document.documentElement.appendChild(e);
          const f = e.contentWindow;
          e = f.document;
          e.open();
          e.write('');
          e.close();
          const g = 'callImmediate' + Math.random();
          const h =
            f.location.protocol == 'file:' ? '*' : f.location.protocol + '//' + f.location.host;
          e = r(function (k) {
            if ((h == '*' || k.origin == h) && k.data == g) this.port1.onmessage();
          }, this);
          f.addEventListener('message', e, !1);
          this.port1 = {};
          this.port2 = {
            postMessage: function () {
              f.postMessage(g, h);
            }
          };
        });
      if (typeof a !== 'undefined' && !y('Trident') && !y('MSIE')) {
        const b = new a();
        let c = {};
        let d = c;
        b.port1.onmessage = function () {
          if (ka(c.next)) {
            c = c.next;
            const e = c.gb;
            c.gb = null;
            e();
          }
        };
        return function (e) {
          d.next = { gb: e };
          d = d.next;
          b.port2.postMessage(0);
        };
      }
      return typeof document !== 'undefined' &&
        'onreadystatechange' in document.createElement('SCRIPT')
        ? function (e) {
            let f = document.createElement('SCRIPT');
            f.onreadystatechange = function () {
              f.onreadystatechange = null;
              f.parentNode.removeChild(f);
              f = null;
              e();
              e = null;
            };
            document.documentElement.appendChild(f);
          }
        : function (e) {
            n.setTimeout(e, 0);
          };
    }
    function Se(a, b) {
      Te || Ue();
      Ve || (Te(), (Ve = !0));
      Oe.add(a, b);
    }
    let Te;
    function Ue() {
      if (n.Promise && n.Promise.resolve) {
        const a = n.Promise.resolve(void 0);
        Te = function () {
          a.then(We);
        };
      } else
        Te = function () {
          const b = We;
          !sa(n.setImmediate) ||
          (n.Window &&
            n.Window.prototype &&
            !y('Edge') &&
            n.Window.prototype.setImmediate == n.setImmediate)
            ? (Qe || (Qe = Re()), Qe(b))
            : n.setImmediate(b);
        };
    }
    var Ve = !1;
    var Oe = new Ke();
    function We() {
      for (var a; (a = Ne()); ) {
        try {
          a.a.call(a.g);
        } catch (b) {
          Pe(b);
        }
        Je(Me, a);
      }
      Ve = !1;
    }
    function Xe(a) {
      this.a = Ye;
      this.A = void 0;
      this.j = this.g = this.h = null;
      this.s = this.i = !1;
      if (a != na)
        try {
          const b = this;
          a.call(
            void 0,
            function (c) {
              Ze(b, $e, c);
            },
            function (c) {
              if (!(c instanceof af))
                try {
                  if (c instanceof Error) throw c;
                  throw Error('Promise rejected.');
                } catch (d) {}
              Ze(b, bf, c);
            }
          );
        } catch (c) {
          Ze(this, bf, c);
        }
    }
    var Ye = 0;
    var $e = 2;
    var bf = 3;
    function cf() {
      this.next = this.j = this.g = this.s = this.a = null;
      this.h = !1;
    }
    cf.prototype.reset = function () {
      this.j = this.g = this.s = this.a = null;
      this.h = !1;
    };
    const df = new Ie(
      function () {
        return new cf();
      },
      function (a) {
        a.reset();
      }
    );
    function ef(a, b, c) {
      const d = df.get();
      d.s = a;
      d.g = b;
      d.j = c;
      return d;
    }
    function F(a) {
      if (a instanceof Xe) return a;
      const b = new Xe(na);
      Ze(b, $e, a);
      return b;
    }
    function ff(a) {
      return new Xe(function (b, c) {
        c(a);
      });
    }
    Xe.prototype.then = function (a, b, c) {
      return gf(this, sa(a) ? a : null, sa(b) ? b : null, c);
    };
    Xe.prototype.$goog_Thenable = !0;
    l = Xe.prototype;
    l.fc = function (a, b) {
      a = ef(a, a, b);
      a.h = !0;
      hf(this, a);
      return this;
    };
    l.Ca = function (a, b) {
      return gf(this, null, a, b);
    };
    l.cancel = function (a) {
      this.a == Ye &&
        Se(function () {
          const b = new af(a);
          jf(this, b);
        }, this);
    };
    function jf(a, b) {
      if (a.a == Ye)
        if (a.h) {
          const c = a.h;
          if (c.g) {
            for (
              var d = 0, e = null, f = null, g = c.g;
              g && (g.h || (d++, g.a == a && (e = g), !(e && d > 1)));
              g = g.next
            )
              e || (f = g);
            e &&
              (c.a == Ye && d == 1
                ? jf(c, b)
                : (f ? ((d = f), d.next == c.j && (c.j = d), (d.next = d.next.next)) : kf(c),
                  lf(c, e, bf, b)));
          }
          a.h = null;
        } else Ze(a, bf, b);
    }
    function hf(a, b) {
      a.g || (a.a != $e && a.a != bf) || mf(a);
      a.j ? (a.j.next = b) : (a.g = b);
      a.j = b;
    }
    function gf(a, b, c, d) {
      const e = ef(null, null, null);
      e.a = new Xe(function (f, g) {
        e.s = b
          ? function (h) {
              try {
                const k = b.call(d, h);
                f(k);
              } catch (p) {
                g(p);
              }
            }
          : f;
        e.g = c
          ? function (h) {
              try {
                const k = c.call(d, h);
                !ka(k) && h instanceof af ? g(h) : f(k);
              } catch (p) {
                g(p);
              }
            }
          : g;
      });
      e.a.h = a;
      hf(a, e);
      return e.a;
    }
    l.hc = function (a) {
      this.a = Ye;
      Ze(this, $e, a);
    };
    l.ic = function (a) {
      this.a = Ye;
      Ze(this, bf, a);
    };
    function Ze(a, b, c) {
      if (a.a == Ye) {
        a === c && ((b = bf), (c = new TypeError('Promise cannot resolve to itself')));
        a.a = 1;
        a: {
          const d = c;
          const e = a.hc;
          const f = a.ic;
          if (d instanceof Xe) {
            hf(d, ef(e || na, f || null, a));
            var g = !0;
          } else if (He(d)) d.then(e, f, a), (g = !0);
          else {
            if (ta(d))
              try {
                const h = d.then;
                if (sa(h)) {
                  nf(d, h, e, f, a);
                  g = !0;
                  break a;
                }
              } catch (k) {
                f.call(a, k);
                g = !0;
                break a;
              }
            g = !1;
          }
        }
        g || ((a.A = c), (a.a = b), (a.h = null), mf(a), b != bf || c instanceof af || of(a, c));
      }
    }
    function nf(a, b, c, d, e) {
      function f(k) {
        h || ((h = !0), d.call(e, k));
      }
      function g(k) {
        h || ((h = !0), c.call(e, k));
      }
      var h = !1;
      try {
        b.call(a, g, f);
      } catch (k) {
        f(k);
      }
    }
    function mf(a) {
      a.i || ((a.i = !0), Se(a.Hb, a));
    }
    function kf(a) {
      let b = null;
      a.g && ((b = a.g), (a.g = b.next), (b.next = null));
      a.g || (a.j = null);
      return b;
    }
    l.Hb = function () {
      for (var a; (a = kf(this)); ) lf(this, a, this.a, this.A);
      this.i = !1;
    };
    function lf(a, b, c, d) {
      if (c == bf && b.g && !b.h) for (; a && a.s; a = a.h) a.s = !1;
      if (b.a) (b.a.h = null), pf(b, c, d);
      else
        try {
          b.h ? b.s.call(b.j) : pf(b, c, d);
        } catch (e) {
          qf.call(null, e);
        }
      Je(df, b);
    }
    function pf(a, b, c) {
      b == $e ? a.s.call(a.j, c) : a.g && a.g.call(a.j, c);
    }
    function of(a, b) {
      a.s = !0;
      Se(function () {
        a.s && qf.call(null, b);
      });
    }
    var qf = Pe;
    function af(a) {
      Ba.call(this, a);
    }
    w(af, Ba);
    af.prototype.name = 'cancel';
    function rf(a, b, c) {
      b || (b = {});
      c = c || window;
      let d = a instanceof xc ? a : Bc(typeof a.href !== 'undefined' ? a.href : String(a));
      a = b.target || a.target;
      const e = [];
      for (f in b)
        switch (f) {
          case 'width':
          case 'height':
          case 'top':
          case 'left':
            e.push(f + '=' + b[f]);
            break;
          case 'target':
          case 'noopener':
          case 'noreferrer':
            break;
          default:
            e.push(f + '=' + (b[f] ? 1 : 0));
        }
      var f = e.join(',');
      ((y('iPhone') && !y('iPod') && !y('iPad')) || y('iPad') || y('iPod')) &&
      c.navigator &&
      c.navigator.standalone &&
      a &&
      a != '_self'
        ? ((f = c.document.createElement('A')),
          (d = d instanceof xc ? d : Dc(d)),
          (f.href = zc(d)),
          f.setAttribute('target', a),
          b.noreferrer && f.setAttribute('rel', 'noreferrer'),
          (b = document.createEvent('MouseEvent')),
          b.initMouseEvent('click', !0, !0, c, 1),
          f.dispatchEvent(b),
          (c = {}))
        : b.noreferrer
        ? ((c = c.open('', a, f)),
          (b = zc(d).toString()),
          c &&
            (cc && b.indexOf(';') != -1 && (b = "'" + b.replace(/'/g, '%27') + "'"),
            (c.opener = null),
            (b = Jc(
              '<meta name="referrer" content="no-referrer"><meta http-equiv="refresh" content="0; url=' +
                cb(b) +
                '">',
              null
            )),
            c.document.write(Ic(b)),
            c.document.close()))
        : (c = c.open(zc(d).toString(), a, f)) && b.noopener && (c.opener = null);
      return c;
    }
    function sf() {
      try {
        return !(
          !window.opener ||
          !window.opener.location ||
          window.opener.location.hostname !== window.location.hostname ||
          window.opener.location.protocol !== window.location.protocol
        );
      } catch (a$2) {}
      return !1;
    }
    function tf(a) {
      rf(
        a,
        { target: window.cordova && window.cordova.InAppBrowser ? '_system' : '_blank' },
        void 0
      );
    }
    function uf(a, b) {
      a = ta(a) && a.nodeType == 1 ? a : document.querySelector(String(a));
      if (a == null) throw Error(b || 'Cannot find element.');
      return a;
    }
    function vf() {
      return window.location.href;
    }
    function wf() {
      let a = null;
      return new Xe(function (b) {
        n.document.readyState == 'complete'
          ? b()
          : ((a = function () {
              b();
            }),
            ne(window, 'load', a));
      }).Ca(function (b) {
        ue(window, 'load', a);
        throw b;
      });
    }
    function xf() {
      for (var a = 32, b = []; a > 0; )
        b.push(
          '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.charAt(
            Math.floor(62 * Math.random())
          )
        ),
          a--;
      return b.join('');
    }
    function yf(a, b, c) {
      c = void 0 === c ? {} : c;
      return Object.keys(a)
        .filter(function (d) {
          return b.includes(d);
        })
        .reduce(function (d, e) {
          d[e] = a[e];
          return d;
        }, c);
    }
    function zf(a) {
      const b = Af;
      this.s = [];
      this.T = b;
      this.O = a || null;
      this.j = this.a = !1;
      this.h = void 0;
      this.J = this.l = this.A = !1;
      this.i = 0;
      this.g = null;
      this.C = 0;
    }
    zf.prototype.cancel = function (a) {
      if (this.a) this.h instanceof zf && this.h.cancel();
      else {
        if (this.g) {
          const b = this.g;
          delete this.g;
          a ? b.cancel(a) : (b.C--, b.C <= 0 && b.cancel());
        }
        this.T ? this.T.call(this.O, this) : (this.J = !0);
        this.a || ((a = new Bf(this)), Cf(this), Df(this, !1, a));
      }
    };
    zf.prototype.L = function (a, b) {
      this.A = !1;
      Df(this, a, b);
    };
    function Df(a, b, c) {
      a.a = !0;
      a.h = c;
      a.j = !b;
      Ef(a);
    }
    function Cf(a) {
      if (a.a) {
        if (!a.J) throw new Ff(a);
        a.J = !1;
      }
    }
    zf.prototype.callback = function (a) {
      Cf(this);
      Df(this, !0, a);
    };
    function Gf(a, b, c) {
      a.s.push([b, c, void 0]);
      a.a && Ef(a);
    }
    zf.prototype.then = function (a, b, c) {
      let d;
      let e;
      const f = new Xe(function (g, h) {
        d = g;
        e = h;
      });
      Gf(this, d, function (g) {
        g instanceof Bf ? f.cancel() : e(g);
      });
      return f.then(a, b, c);
    };
    zf.prototype.$goog_Thenable = !0;
    function Hf(a) {
      return La(a.s, function (b) {
        return sa(b[1]);
      });
    }
    function Ef(a) {
      if (a.i && a.a && Hf(a)) {
        var b = a.i;
        var c = If[b];
        c && (n.clearTimeout(c.a), delete If[b]);
        a.i = 0;
      }
      a.g && (a.g.C--, delete a.g);
      b = a.h;
      for (var d = (c = !1); a.s.length && !a.A; ) {
        let e = a.s.shift();
        let f = e[0];
        const g = e[1];
        e = e[2];
        if ((f = a.j ? g : f))
          try {
            var h = f.call(e || a.O, b);
            ka(h) && ((a.j = a.j && (h == b || h instanceof Error)), (a.h = b = h));
            if (He(b) || (typeof n.Promise === 'function' && b instanceof n.Promise))
              (d = !0), (a.A = !0);
          } catch (k) {
            (b = k), (a.j = !0), Hf(a) || (c = !0);
          }
      }
      a.h = b;
      d &&
        ((h = r(a.L, a, !0)),
        (d = r(a.L, a, !1)),
        b instanceof zf ? (Gf(b, h, d), (b.l = !0)) : b.then(h, d));
      c && ((b = new Jf(b)), (If[b.a] = b), (a.i = b.a));
    }
    function Ff() {
      Ba.call(this);
    }
    w(Ff, Ba);
    Ff.prototype.message = 'Deferred has already fired';
    Ff.prototype.name = 'AlreadyCalledError';
    function Bf() {
      Ba.call(this);
    }
    w(Bf, Ba);
    Bf.prototype.message = 'Deferred was canceled';
    Bf.prototype.name = 'CanceledError';
    function Jf(a) {
      this.a = n.setTimeout(r(this.h, this), 0);
      this.g = a;
    }
    Jf.prototype.h = function () {
      delete If[this.a];
      throw this.g;
    };
    var If = {};
    function Kf(a) {
      const b = {};
      const c = b.document || document;
      const d = uc(a).toString();
      const e = document.createElement('SCRIPT');
      let f = { rb: e, sb: void 0 };
      const g = new zf(f);
      let h = null;
      const k = b.timeout != null ? b.timeout : 5e3;
      k > 0 &&
        ((h = window.setTimeout(function () {
          Lf(e, !0);
          const p = new Mf(Nf, 'Timeout reached for loading script ' + d);
          Cf(g);
          Df(g, !1, p);
        }, k)),
        (f.sb = h));
      e.onload = e.onreadystatechange = function () {
        (e.readyState && e.readyState != 'loaded' && e.readyState != 'complete') ||
          (Lf(e, b.xc || !1, h), g.callback(null));
      };
      e.onerror = function () {
        Lf(e, !0, h);
        const p = new Mf(Of, 'Error while loading script ' + d);
        Cf(g);
        Df(g, !1, p);
      };
      f = b.attributes || {};
      gb(f, { type: 'text/javascript', charset: 'UTF-8' });
      Wc(e, f);
      Mc(e, a);
      Pf(c).appendChild(e);
      return g;
    }
    function Pf(a) {
      const b = (a || document).getElementsByTagName('HEAD');
      return b && b.length != 0 ? b[0] : a.documentElement;
    }
    function Af() {
      if (this && this.rb) {
        const a = this.rb;
        a && a.tagName == 'SCRIPT' && Lf(a, !0, this.sb);
      }
    }
    function Lf(a, b, c) {
      c != null && n.clearTimeout(c);
      a.onload = na;
      a.onerror = na;
      a.onreadystatechange = na;
      b &&
        window.setTimeout(function () {
          Zc(a);
        }, 0);
    }
    var Of = 0;
    var Nf = 1;
    function Mf(a, b) {
      let c = 'Jsloader error (code #' + a + ')';
      b && (c += ': ' + b);
      Ba.call(this, c);
      this.code = a;
    }
    w(Mf, Ba);
    function Qf() {
      return (n.google && n.google.accounts && n.google.accounts.id) || null;
    }
    function Rf(a) {
      this.a = a || Qf();
      this.h = !1;
      this.g = null;
    }
    Rf.prototype.cancel = function () {
      this.a && this.h && (this.g && this.g(null), this.a.cancel());
    };
    function Sf(a, b, c) {
      if (a.a && b)
        return (function () {
          a.h = !0;
          return new Xe(function (e) {
            a.g = e;
            a.a.initialize({ client_id: b, callback: e, auto_select: !c });
            a.a.prompt();
          });
        })();
      if (b) {
        const d = Tf.Xa()
          .load()
          .then(function () {
            a.a = Qf();
            return Sf(a, b, c);
          })
          .Ca(function () {
            return null;
          });
        return F(d);
      }
      return F(null);
    }
    oa(Rf);
    var wc = new pc(qc, 'https://accounts.google.com/gsi/client');
    function Tf() {
      this.a = null;
    }
    Tf.prototype.load = function () {
      const a = this;
      if (this.a) return this.a;
      const b = vc();
      return Qf()
        ? F()
        : (this.a = wf().then(function () {
            if (!Qf())
              return new Xe(function (c, d) {
                const e = setTimeout(function () {
                  a.a = null;
                  d(Error('Network error!'));
                }, 1e4);
                n.onGoogleLibraryLoad = function () {
                  clearTimeout(e);
                  c();
                };
                F(Kf(b))
                  .then(function () {
                    Qf() && c();
                  })
                  .Ca(function (f) {
                    clearTimeout(e);
                    a.a = null;
                    d(f);
                  });
              });
          }));
    };
    oa(Tf);
    function Uf(a, b) {
      this.a = a;
      this.g =
        b ||
        function (c) {
          throw c;
        };
    }
    Uf.prototype.confirm = function (a) {
      return F(this.a.confirm(a)).Ca(this.g);
    };
    function Vf(a, b, c) {
      this.reset(a, b, c, void 0, void 0);
    }
    Vf.prototype.a = null;
    let Wf = 0;
    Vf.prototype.reset = function (a, b, c, d, e) {
      typeof e === 'number' || Wf++;
      this.h = d || Aa();
      this.j = a;
      this.s = b;
      this.g = c;
      delete this.a;
    };
    function Xf(a) {
      this.s = a;
      this.a = this.h = this.j = this.g = null;
    }
    function Yf(a, b) {
      this.name = a;
      this.value = b;
    }
    Yf.prototype.toString = function () {
      return this.name;
    };
    const Zf = new Yf('SEVERE', 1e3);
    const $f = new Yf('WARNING', 900);
    const ag = new Yf('CONFIG', 700);
    function bg(a) {
      if (a.j) return a.j;
      if (a.g) return bg(a.g);
      Fa('Root logger has no level set.');
      return null;
    }
    Xf.prototype.log = function (a, b, c) {
      if (a.value >= bg(this).value)
        for (sa(b) && (b = b()), a = new Vf(a, String(b), this.s), c && (a.a = c), c = this; c; ) {
          const d = c;
          const e = a;
          if (d.a) for (let f = 0; (b = d.a[f]); f++) b(e);
          c = c.g;
        }
    };
    const cg = {};
    let dg = null;
    function eg() {
      dg || ((dg = new Xf('')), (cg[''] = dg), (dg.j = ag));
    }
    function fg(a) {
      eg();
      let b;
      if (!(b = cg[a])) {
        b = new Xf(a);
        let c = a.lastIndexOf('.');
        const d = a.substr(c + 1);
        c = fg(a.substr(0, c));
        c.h || (c.h = {});
        c.h[d] = b;
        b.g = c;
        cg[a] = b;
      }
      return b;
    }
    function gg() {
      this.a = Aa();
    }
    let hg = null;
    gg.prototype.set = function (a) {
      this.a = a;
    };
    gg.prototype.reset = function () {
      this.set(Aa());
    };
    gg.prototype.get = function () {
      return this.a;
    };
    function ig(a) {
      this.j = a || '';
      hg || (hg = new gg());
      this.s = hg;
    }
    ig.prototype.a = !0;
    ig.prototype.g = !0;
    ig.prototype.h = !1;
    function jg(a) {
      return a < 10 ? '0' + a : String(a);
    }
    function kg(a, b) {
      a = (a.h - b) / 1e3;
      b = a.toFixed(3);
      let c = 0;
      if (a < 1) c = 2;
      else for (; a < 100; ) c++, (a *= 10);
      for (; c-- > 0; ) b = ' ' + b;
      return b;
    }
    function lg(a) {
      ig.call(this, a);
    }
    w(lg, ig);
    function mg(a, b) {
      const c = [];
      c.push(a.j, ' ');
      if (a.g) {
        const d = new Date(b.h);
        c.push(
          '[',
          jg(d.getFullYear() - 2e3) +
            jg(d.getMonth() + 1) +
            jg(d.getDate()) +
            ' ' +
            jg(d.getHours()) +
            ':' +
            jg(d.getMinutes()) +
            ':' +
            jg(d.getSeconds()) +
            '.' +
            jg(Math.floor(d.getMilliseconds() / 10)),
          '] '
        );
      }
      c.push('[', kg(b, a.s.get()), 's] ');
      c.push('[', b.g, '] ');
      c.push(b.s);
      a.h && (b = b.a) && c.push('\n', b instanceof Error ? b.message : b.toString());
      a.a && c.push('\n');
      return c.join('');
    }
    function ng() {
      this.s = r(this.h, this);
      this.a = new lg();
      this.a.g = !1;
      this.a.h = !1;
      this.g = this.a.a = !1;
      this.j = {};
    }
    ng.prototype.h = function (a) {
      function b(f) {
        if (f) {
          if (f.value >= Zf.value) return 'error';
          if (f.value >= $f.value) return 'warn';
          if (f.value >= ag.value) return 'log';
        }
        return 'debug';
      }
      if (!this.j[a.g]) {
        const c = mg(this.a, a);
        const d = og;
        if (d) {
          const e = b(a.j);
          pg(d, e, c, a.a);
        }
      }
    };
    var og = n.console;
    function pg(a, b, c, d) {
      if (a[b]) a[b](c, d || '');
      else a.log(c, d || '');
    }
    function qg(a, b) {
      const c = rg;
      c && c.log(Zf, a, b);
    }
    let rg;
    rg = fg('firebaseui');
    const sg = new ng();
    if (sg.g != 1) {
      let tg;
      eg();
      tg = dg;
      const ug = sg.s;
      tg.a || (tg.a = []);
      tg.a.push(ug);
      sg.g = !0;
    }
    function vg(a) {
      const b = rg;
      b && b.log($f, a, void 0);
    }
    function xg() {
      this.a = (typeof document === 'undefined' ? null : document) || { cookie: '' };
    }
    l = xg.prototype;
    l.set = function (a, b, c, d, e, f) {
      if (/[;=\s]/.test(a)) throw Error('Invalid cookie name "' + a + '"');
      if (/[;\r\n]/.test(b)) throw Error('Invalid cookie value "' + b + '"');
      ka(c) || (c = -1);
      e = e ? ';domain=' + e : '';
      d = d ? ';path=' + d : '';
      f = f ? ';secure' : '';
      c =
        c < 0
          ? ''
          : c == 0
          ? ';expires=' + new Date(1970, 1, 1).toUTCString()
          : ';expires=' + new Date(Aa() + 1e3 * c).toUTCString();
      this.a.cookie = a + '=' + b + e + d + c + f;
    };
    l.get = function (a, b) {
      for (var c = a + '=', d = (this.a.cookie || '').split(';'), e = 0, f; e < d.length; e++) {
        f = Ua(d[e]);
        if (f.lastIndexOf(c, 0) == 0) return f.substr(c.length);
        if (f == a) return '';
      }
      return b;
    };
    l.ja = function () {
      return yg(this).keys;
    };
    l.la = function () {
      return yg(this).values;
    };
    l.clear = function () {
      for (let a = yg(this).keys, b = a.length - 1; b >= 0; b--) {
        const c = a[b];
        this.get(c);
        this.set(c, '', 0, void 0, void 0);
      }
    };
    function yg(a) {
      a = (a.a.cookie || '').split(';');
      for (var b = [], c = [], d, e, f = 0; f < a.length; f++)
        (e = Ua(a[f])),
          (d = e.indexOf('=')),
          d == -1
            ? (b.push(''), c.push(e))
            : (b.push(e.substring(0, d)), c.push(e.substring(d + 1)));
      return { keys: b, values: c };
    }
    const zg = new xg();
    function Ag() {}
    function Bg(a, b, c, d) {
      this.h = typeof a !== 'undefined' && a !== null ? a : -1;
      this.g = b || null;
      this.a = c || null;
      this.j = !!d;
    }
    m(Bg, Ag);
    Bg.prototype.set = function (a, b) {
      zg.set(a, b, this.h, this.g, this.a, this.j);
    };
    Bg.prototype.get = function (a) {
      return zg.get(a) || null;
    };
    Bg.prototype.ra = function (a) {
      const b = this.g;
      const c = this.a;
      zg.get(a);
      zg.set(a, '', 0, b, c);
    };
    function Cg(a, b) {
      this.g = a;
      this.a = b || null;
    }
    function Dg(a) {
      return { email: a.g, credential: a.a && a.a.toJSON() };
    }
    function Eg(a) {
      if (a && a.email) {
        const b = a.credential && firebase.auth.AuthCredential.fromJSON(a.credential);
        return new Cg(a.email, b);
      }
      return null;
    }
    function Fg(a) {
      this.a = a || null;
    }
    function Gg(a) {
      for (var b = [], c = 0, d = 0; d < a.length; d++) {
        let e = a.charCodeAt(d);
        e > 255 && ((b[c++] = e & 255), (e >>= 8));
        b[c++] = e;
      }
      return b;
    }
    function Hg(a) {
      return Ka(a, function (b) {
        b = b.toString(16);
        return b.length > 1 ? b : '0' + b;
      }).join('');
    }
    function Ig(a) {
      this.i = a;
      this.g = this.i.length / 4;
      this.j = this.g + 6;
      this.h = [[], [], [], []];
      this.s = [[], [], [], []];
      this.a = Array(Jg * (this.j + 1));
      for (a = 0; a < this.g; a++)
        this.a[a] = [this.i[4 * a], this.i[4 * a + 1], this.i[4 * a + 2], this.i[4 * a + 3]];
      const b = Array(4);
      for (a = this.g; a < Jg * (this.j + 1); a++) {
        b[0] = this.a[a - 1][0];
        b[1] = this.a[a - 1][1];
        b[2] = this.a[a - 1][2];
        b[3] = this.a[a - 1][3];
        if (a % this.g == 0) {
          const c = b;
          const d = c[0];
          c[0] = c[1];
          c[1] = c[2];
          c[2] = c[3];
          c[3] = d;
          Kg(b);
          b[0] ^= Lg[a / this.g][0];
          b[1] ^= Lg[a / this.g][1];
          b[2] ^= Lg[a / this.g][2];
          b[3] ^= Lg[a / this.g][3];
        } else this.g > 6 && a % this.g == 4 && Kg(b);
        this.a[a] = Array(4);
        this.a[a][0] = this.a[a - this.g][0] ^ b[0];
        this.a[a][1] = this.a[a - this.g][1] ^ b[1];
        this.a[a][2] = this.a[a - this.g][2] ^ b[2];
        this.a[a][3] = this.a[a - this.g][3] ^ b[3];
      }
    }
    Ig.prototype.A = 16;
    var Jg = Ig.prototype.A / 4;
    function Mg(a, b) {
      for (var c, d = 0; d < Jg; d++)
        for (let e = 0; e < 4; e++) (c = 4 * e + d), (c = b[c]), (a.h[d][e] = c);
    }
    function Ng(a) {
      for (var b = [], c = 0; c < Jg; c++) for (let d = 0; d < 4; d++) b[4 * d + c] = a.h[c][d];
      return b;
    }
    function Og(a, b) {
      for (let c = 0; c < 4; c++) for (let d = 0; d < 4; d++) a.h[c][d] ^= a.a[4 * b + d][c];
    }
    function Pg(a, b) {
      for (let c = 0; c < 4; c++) for (let d = 0; d < 4; d++) a.h[c][d] = b[a.h[c][d]];
    }
    function Qg(a) {
      for (var b = 1; b < 4; b++) for (var c = 0; c < 4; c++) a.s[b][c] = a.h[b][c];
      for (b = 1; b < 4; b++) for (c = 0; c < 4; c++) a.h[b][c] = a.s[b][(c + b) % Jg];
    }
    function Rg(a) {
      for (var b = 1; b < 4; b++) for (var c = 0; c < 4; c++) a.s[b][(c + b) % Jg] = a.h[b][c];
      for (b = 1; b < 4; b++) for (c = 0; c < 4; c++) a.h[b][c] = a.s[b][c];
    }
    function Kg(a) {
      a[0] = Sg[a[0]];
      a[1] = Sg[a[1]];
      a[2] = Sg[a[2]];
      a[3] = Sg[a[3]];
    }
    var Sg = [
      99, 124, 119, 123, 242, 107, 111, 197, 48, 1, 103, 43, 254, 215, 171, 118, 202, 130, 201, 125,
      250, 89, 71, 240, 173, 212, 162, 175, 156, 164, 114, 192, 183, 253, 147, 38, 54, 63, 247, 204,
      52, 165, 229, 241, 113, 216, 49, 21, 4, 199, 35, 195, 24, 150, 5, 154, 7, 18, 128, 226, 235,
      39, 178, 117, 9, 131, 44, 26, 27, 110, 90, 160, 82, 59, 214, 179, 41, 227, 47, 132, 83, 209,
      0, 237, 32, 252, 177, 91, 106, 203, 190, 57, 74, 76, 88, 207, 208, 239, 170, 251, 67, 77, 51,
      133, 69, 249, 2, 127, 80, 60, 159, 168, 81, 163, 64, 143, 146, 157, 56, 245, 188, 182, 218,
      33, 16, 255, 243, 210, 205, 12, 19, 236, 95, 151, 68, 23, 196, 167, 126, 61, 100, 93, 25, 115,
      96, 129, 79, 220, 34, 42, 144, 136, 70, 238, 184, 20, 222, 94, 11, 219, 224, 50, 58, 10, 73,
      6, 36, 92, 194, 211, 172, 98, 145, 149, 228, 121, 231, 200, 55, 109, 141, 213, 78, 169, 108,
      86, 244, 234, 101, 122, 174, 8, 186, 120, 37, 46, 28, 166, 180, 198, 232, 221, 116, 31, 75,
      189, 139, 138, 112, 62, 181, 102, 72, 3, 246, 14, 97, 53, 87, 185, 134, 193, 29, 158, 225,
      248, 152, 17, 105, 217, 142, 148, 155, 30, 135, 233, 206, 85, 40, 223, 140, 161, 137, 13, 191,
      230, 66, 104, 65, 153, 45, 15, 176, 84, 187, 22
    ];
    const Tg = [
      82, 9, 106, 213, 48, 54, 165, 56, 191, 64, 163, 158, 129, 243, 215, 251, 124, 227, 57, 130,
      155, 47, 255, 135, 52, 142, 67, 68, 196, 222, 233, 203, 84, 123, 148, 50, 166, 194, 35, 61,
      238, 76, 149, 11, 66, 250, 195, 78, 8, 46, 161, 102, 40, 217, 36, 178, 118, 91, 162, 73, 109,
      139, 209, 37, 114, 248, 246, 100, 134, 104, 152, 22, 212, 164, 92, 204, 93, 101, 182, 146,
      108, 112, 72, 80, 253, 237, 185, 218, 94, 21, 70, 87, 167, 141, 157, 132, 144, 216, 171, 0,
      140, 188, 211, 10, 247, 228, 88, 5, 184, 179, 69, 6, 208, 44, 30, 143, 202, 63, 15, 2, 193,
      175, 189, 3, 1, 19, 138, 107, 58, 145, 17, 65, 79, 103, 220, 234, 151, 242, 207, 206, 240,
      180, 230, 115, 150, 172, 116, 34, 231, 173, 53, 133, 226, 249, 55, 232, 28, 117, 223, 110, 71,
      241, 26, 113, 29, 41, 197, 137, 111, 183, 98, 14, 170, 24, 190, 27, 252, 86, 62, 75, 198, 210,
      121, 32, 154, 219, 192, 254, 120, 205, 90, 244, 31, 221, 168, 51, 136, 7, 199, 49, 177, 18,
      16, 89, 39, 128, 236, 95, 96, 81, 127, 169, 25, 181, 74, 13, 45, 229, 122, 159, 147, 201, 156,
      239, 160, 224, 59, 77, 174, 42, 245, 176, 200, 235, 187, 60, 131, 83, 153, 97, 23, 43, 4, 126,
      186, 119, 214, 38, 225, 105, 20, 99, 85, 33, 12, 125
    ];
    var Lg = [
      [0, 0, 0, 0],
      [1, 0, 0, 0],
      [2, 0, 0, 0],
      [4, 0, 0, 0],
      [8, 0, 0, 0],
      [16, 0, 0, 0],
      [32, 0, 0, 0],
      [64, 0, 0, 0],
      [128, 0, 0, 0],
      [27, 0, 0, 0],
      [54, 0, 0, 0]
    ];
    const Ug = [
      0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48,
      50, 52, 54, 56, 58, 60, 62, 64, 66, 68, 70, 72, 74, 76, 78, 80, 82, 84, 86, 88, 90, 92, 94,
      96, 98, 100, 102, 104, 106, 108, 110, 112, 114, 116, 118, 120, 122, 124, 126, 128, 130, 132,
      134, 136, 138, 140, 142, 144, 146, 148, 150, 152, 154, 156, 158, 160, 162, 164, 166, 168, 170,
      172, 174, 176, 178, 180, 182, 184, 186, 188, 190, 192, 194, 196, 198, 200, 202, 204, 206, 208,
      210, 212, 214, 216, 218, 220, 222, 224, 226, 228, 230, 232, 234, 236, 238, 240, 242, 244, 246,
      248, 250, 252, 254, 27, 25, 31, 29, 19, 17, 23, 21, 11, 9, 15, 13, 3, 1, 7, 5, 59, 57, 63, 61,
      51, 49, 55, 53, 43, 41, 47, 45, 35, 33, 39, 37, 91, 89, 95, 93, 83, 81, 87, 85, 75, 73, 79,
      77, 67, 65, 71, 69, 123, 121, 127, 125, 115, 113, 119, 117, 107, 105, 111, 109, 99, 97, 103,
      101, 155, 153, 159, 157, 147, 145, 151, 149, 139, 137, 143, 141, 131, 129, 135, 133, 187, 185,
      191, 189, 179, 177, 183, 181, 171, 169, 175, 173, 163, 161, 167, 165, 219, 217, 223, 221, 211,
      209, 215, 213, 203, 201, 207, 205, 195, 193, 199, 197, 251, 249, 255, 253, 243, 241, 247, 245,
      235, 233, 239, 237, 227, 225, 231, 229
    ];
    const Vg = [
      0, 3, 6, 5, 12, 15, 10, 9, 24, 27, 30, 29, 20, 23, 18, 17, 48, 51, 54, 53, 60, 63, 58, 57, 40,
      43, 46, 45, 36, 39, 34, 33, 96, 99, 102, 101, 108, 111, 106, 105, 120, 123, 126, 125, 116,
      119, 114, 113, 80, 83, 86, 85, 92, 95, 90, 89, 72, 75, 78, 77, 68, 71, 66, 65, 192, 195, 198,
      197, 204, 207, 202, 201, 216, 219, 222, 221, 212, 215, 210, 209, 240, 243, 246, 245, 252, 255,
      250, 249, 232, 235, 238, 237, 228, 231, 226, 225, 160, 163, 166, 165, 172, 175, 170, 169, 184,
      187, 190, 189, 180, 183, 178, 177, 144, 147, 150, 149, 156, 159, 154, 153, 136, 139, 142, 141,
      132, 135, 130, 129, 155, 152, 157, 158, 151, 148, 145, 146, 131, 128, 133, 134, 143, 140, 137,
      138, 171, 168, 173, 174, 167, 164, 161, 162, 179, 176, 181, 182, 191, 188, 185, 186, 251, 248,
      253, 254, 247, 244, 241, 242, 227, 224, 229, 230, 239, 236, 233, 234, 203, 200, 205, 206, 199,
      196, 193, 194, 211, 208, 213, 214, 223, 220, 217, 218, 91, 88, 93, 94, 87, 84, 81, 82, 67, 64,
      69, 70, 79, 76, 73, 74, 107, 104, 109, 110, 103, 100, 97, 98, 115, 112, 117, 118, 127, 124,
      121, 122, 59, 56, 61, 62, 55, 52, 49, 50, 35, 32, 37, 38, 47, 44, 41, 42, 11, 8, 13, 14, 7, 4,
      1, 2, 19, 16, 21, 22, 31, 28, 25, 26
    ];
    const Wg = [
      0, 9, 18, 27, 36, 45, 54, 63, 72, 65, 90, 83, 108, 101, 126, 119, 144, 153, 130, 139, 180,
      189, 166, 175, 216, 209, 202, 195, 252, 245, 238, 231, 59, 50, 41, 32, 31, 22, 13, 4, 115,
      122, 97, 104, 87, 94, 69, 76, 171, 162, 185, 176, 143, 134, 157, 148, 227, 234, 241, 248, 199,
      206, 213, 220, 118, 127, 100, 109, 82, 91, 64, 73, 62, 55, 44, 37, 26, 19, 8, 1, 230, 239,
      244, 253, 194, 203, 208, 217, 174, 167, 188, 181, 138, 131, 152, 145, 77, 68, 95, 86, 105, 96,
      123, 114, 5, 12, 23, 30, 33, 40, 51, 58, 221, 212, 207, 198, 249, 240, 235, 226, 149, 156,
      135, 142, 177, 184, 163, 170, 236, 229, 254, 247, 200, 193, 218, 211, 164, 173, 182, 191, 128,
      137, 146, 155, 124, 117, 110, 103, 88, 81, 74, 67, 52, 61, 38, 47, 16, 25, 2, 11, 215, 222,
      197, 204, 243, 250, 225, 232, 159, 150, 141, 132, 187, 178, 169, 160, 71, 78, 85, 92, 99, 106,
      113, 120, 15, 6, 29, 20, 43, 34, 57, 48, 154, 147, 136, 129, 190, 183, 172, 165, 210, 219,
      192, 201, 246, 255, 228, 237, 10, 3, 24, 17, 46, 39, 60, 53, 66, 75, 80, 89, 102, 111, 116,
      125, 161, 168, 179, 186, 133, 140, 151, 158, 233, 224, 251, 242, 205, 196, 223, 214, 49, 56,
      35, 42, 21, 28, 7, 14, 121, 112, 107, 98, 93, 84, 79, 70
    ];
    const Xg = [
      0, 11, 22, 29, 44, 39, 58, 49, 88, 83, 78, 69, 116, 127, 98, 105, 176, 187, 166, 173, 156,
      151, 138, 129, 232, 227, 254, 245, 196, 207, 210, 217, 123, 112, 109, 102, 87, 92, 65, 74, 35,
      40, 53, 62, 15, 4, 25, 18, 203, 192, 221, 214, 231, 236, 241, 250, 147, 152, 133, 142, 191,
      180, 169, 162, 246, 253, 224, 235, 218, 209, 204, 199, 174, 165, 184, 179, 130, 137, 148, 159,
      70, 77, 80, 91, 106, 97, 124, 119, 30, 21, 8, 3, 50, 57, 36, 47, 141, 134, 155, 144, 161, 170,
      183, 188, 213, 222, 195, 200, 249, 242, 239, 228, 61, 54, 43, 32, 17, 26, 7, 12, 101, 110,
      115, 120, 73, 66, 95, 84, 247, 252, 225, 234, 219, 208, 205, 198, 175, 164, 185, 178, 131,
      136, 149, 158, 71, 76, 81, 90, 107, 96, 125, 118, 31, 20, 9, 2, 51, 56, 37, 46, 140, 135, 154,
      145, 160, 171, 182, 189, 212, 223, 194, 201, 248, 243, 238, 229, 60, 55, 42, 33, 16, 27, 6,
      13, 100, 111, 114, 121, 72, 67, 94, 85, 1, 10, 23, 28, 45, 38, 59, 48, 89, 82, 79, 68, 117,
      126, 99, 104, 177, 186, 167, 172, 157, 150, 139, 128, 233, 226, 255, 244, 197, 206, 211, 216,
      122, 113, 108, 103, 86, 93, 64, 75, 34, 41, 52, 63, 14, 5, 24, 19, 202, 193, 220, 215, 230,
      237, 240, 251, 146, 153, 132, 143, 190, 181, 168, 163
    ];
    const Yg = [
      0, 13, 26, 23, 52, 57, 46, 35, 104, 101, 114, 127, 92, 81, 70, 75, 208, 221, 202, 199, 228,
      233, 254, 243, 184, 181, 162, 175, 140, 129, 150, 155, 187, 182, 161, 172, 143, 130, 149, 152,
      211, 222, 201, 196, 231, 234, 253, 240, 107, 102, 113, 124, 95, 82, 69, 72, 3, 14, 25, 20, 55,
      58, 45, 32, 109, 96, 119, 122, 89, 84, 67, 78, 5, 8, 31, 18, 49, 60, 43, 38, 189, 176, 167,
      170, 137, 132, 147, 158, 213, 216, 207, 194, 225, 236, 251, 246, 214, 219, 204, 193, 226, 239,
      248, 245, 190, 179, 164, 169, 138, 135, 144, 157, 6, 11, 28, 17, 50, 63, 40, 37, 110, 99, 116,
      121, 90, 87, 64, 77, 218, 215, 192, 205, 238, 227, 244, 249, 178, 191, 168, 165, 134, 139,
      156, 145, 10, 7, 16, 29, 62, 51, 36, 41, 98, 111, 120, 117, 86, 91, 76, 65, 97, 108, 123, 118,
      85, 88, 79, 66, 9, 4, 19, 30, 61, 48, 39, 42, 177, 188, 171, 166, 133, 136, 159, 146, 217,
      212, 195, 206, 237, 224, 247, 250, 183, 186, 173, 160, 131, 142, 153, 148, 223, 210, 197, 200,
      235, 230, 241, 252, 103, 106, 125, 112, 83, 94, 73, 68, 15, 2, 21, 24, 59, 54, 33, 44, 12, 1,
      22, 27, 56, 53, 34, 47, 100, 105, 126, 115, 80, 93, 74, 71, 220, 209, 198, 203, 232, 229, 242,
      255, 180, 185, 174, 163, 128, 141, 154, 151
    ];
    const Zg = [
      0, 14, 28, 18, 56, 54, 36, 42, 112, 126, 108, 98, 72, 70, 84, 90, 224, 238, 252, 242, 216,
      214, 196, 202, 144, 158, 140, 130, 168, 166, 180, 186, 219, 213, 199, 201, 227, 237, 255, 241,
      171, 165, 183, 185, 147, 157, 143, 129, 59, 53, 39, 41, 3, 13, 31, 17, 75, 69, 87, 89, 115,
      125, 111, 97, 173, 163, 177, 191, 149, 155, 137, 135, 221, 211, 193, 207, 229, 235, 249, 247,
      77, 67, 81, 95, 117, 123, 105, 103, 61, 51, 33, 47, 5, 11, 25, 23, 118, 120, 106, 100, 78, 64,
      82, 92, 6, 8, 26, 20, 62, 48, 34, 44, 150, 152, 138, 132, 174, 160, 178, 188, 230, 232, 250,
      244, 222, 208, 194, 204, 65, 79, 93, 83, 121, 119, 101, 107, 49, 63, 45, 35, 9, 7, 21, 27,
      161, 175, 189, 179, 153, 151, 133, 139, 209, 223, 205, 195, 233, 231, 245, 251, 154, 148, 134,
      136, 162, 172, 190, 176, 234, 228, 246, 248, 210, 220, 206, 192, 122, 116, 102, 104, 66, 76,
      94, 80, 10, 4, 22, 24, 50, 60, 46, 32, 236, 226, 240, 254, 212, 218, 200, 198, 156, 146, 128,
      142, 164, 170, 184, 182, 12, 2, 16, 30, 52, 58, 40, 38, 124, 114, 96, 110, 68, 74, 88, 86, 55,
      57, 43, 37, 15, 1, 19, 29, 71, 73, 91, 85, 127, 113, 99, 109, 215, 217, 203, 197, 239, 225,
      243, 253, 167, 169, 187, 181, 159, 145, 131, 141
    ];
    function $g(a, b) {
      a = new Ig(ah(a));
      b = Gg(b);
      for (var c = b.splice(0, 16), d = '', e; c.length; ) {
        e = 16 - c.length;
        for (var f = 0; f < e; f++) c.push(0);
        e = a;
        Mg(e, c);
        Og(e, 0);
        for (c = 1; c < e.j; ++c) {
          Pg(e, Sg);
          Qg(e);
          f = e.h;
          for (let g = e.s[0], h = 0; h < 4; h++)
            (g[0] = f[0][h]),
              (g[1] = f[1][h]),
              (g[2] = f[2][h]),
              (g[3] = f[3][h]),
              (f[0][h] = Ug[g[0]] ^ Vg[g[1]] ^ g[2] ^ g[3]),
              (f[1][h] = g[0] ^ Ug[g[1]] ^ Vg[g[2]] ^ g[3]),
              (f[2][h] = g[0] ^ g[1] ^ Ug[g[2]] ^ Vg[g[3]]),
              (f[3][h] = Vg[g[0]] ^ g[1] ^ g[2] ^ Ug[g[3]]);
          Og(e, c);
        }
        Pg(e, Sg);
        Qg(e);
        Og(e, e.j);
        d += Hg(Ng(e));
        c = b.splice(0, 16);
      }
      return d;
    }
    function bh(a, b) {
      a = new Ig(ah(a));
      for (var c = [], d = 0; d < b.length; d += 2) c.push(parseInt(b.substring(d, d + 2), 16));
      let e = c.splice(0, 16);
      for (b = ''; e.length; ) {
        d = a;
        Mg(d, e);
        Og(d, d.j);
        for (e = 1; e < d.j; ++e) {
          Rg(d);
          Pg(d, Tg);
          Og(d, d.j - e);
          for (var f = d.h, g = d.s[0], h = 0; h < 4; h++)
            (g[0] = f[0][h]),
              (g[1] = f[1][h]),
              (g[2] = f[2][h]),
              (g[3] = f[3][h]),
              (f[0][h] = Zg[g[0]] ^ Xg[g[1]] ^ Yg[g[2]] ^ Wg[g[3]]),
              (f[1][h] = Wg[g[0]] ^ Zg[g[1]] ^ Xg[g[2]] ^ Yg[g[3]]),
              (f[2][h] = Yg[g[0]] ^ Wg[g[1]] ^ Zg[g[2]] ^ Xg[g[3]]),
              (f[3][h] = Xg[g[0]] ^ Yg[g[1]] ^ Wg[g[2]] ^ Zg[g[3]]);
        }
        Rg(d);
        Pg(d, Tg);
        Og(d, 0);
        d = Ng(d);
        if (d.length <= 8192) d = String.fromCharCode.apply(null, d);
        else {
          e = '';
          for (f = 0; f < d.length; f += 8192)
            e += String.fromCharCode.apply(null, Ta(d, f, f + 8192));
          d = e;
        }
        b += d;
        e = c.splice(0, 16);
      }
      return b.replace(/(\x00)+$/, '');
    }
    function ah(a) {
      a = Gg(a.substring(0, 32));
      for (let b = 32 - a.length, c = 0; c < b; c++) a.push(0);
      return a;
    }
    function ch(a) {
      const b = [];
      dh(new eh(), a, b);
      return b.join('');
    }
    function eh() {}
    function dh(a, b, c) {
      if (b == null) c.push('null');
      else {
        if (typeof b === 'object') {
          if (qa(b)) {
            var d = b;
            b = d.length;
            c.push('[');
            for (var e = '', f = 0; f < b; f++) c.push(e), dh(a, d[f], c), (e = ',');
            c.push(']');
            return;
          }
          if (b instanceof String || b instanceof Number || b instanceof Boolean) b = b.valueOf();
          else {
            c.push('{');
            e = '';
            for (d in b)
              Object.prototype.hasOwnProperty.call(b, d) &&
                ((f = b[d]),
                typeof f !== 'function' &&
                  (c.push(e), fh(d, c), c.push(':'), dh(a, f, c), (e = ',')));
            c.push('}');
            return;
          }
        }
        switch (typeof b) {
          case 'string':
            fh(b, c);
            break;
          case 'number':
            c.push(isFinite(b) && !isNaN(b) ? String(b) : 'null');
            break;
          case 'boolean':
            c.push(String(b));
            break;
          case 'function':
            c.push('null');
            break;
          default:
            throw Error('Unknown type: ' + typeof b);
        }
      }
    }
    const gh = {
      '"': '\\"',
      '\\': '\\\\',
      '/': '\\/',
      '\b': '\\b',
      '\f': '\\f',
      '\n': '\\n',
      '\r': '\\r',
      '\t': '\\t',
      '\x0B': '\\u000b'
    };
    const hh = /\uffff/.test('\uffff') ? /[\\"\x00-\x1f\x7f-\uffff]/g : /[\\"\x00-\x1f\x7f-\xff]/g;
    function fh(a, b) {
      b.push(
        '"',
        a.replace(hh, function (c) {
          let d = gh[c];
          d || ((d = '\\u' + (c.charCodeAt(0) | 65536).toString(16).substr(1)), (gh[c] = d));
          return d;
        }),
        '"'
      );
    }
    function ih(a) {
      this.a = a;
    }
    ih.prototype.set = function (a, b) {
      ka(b) ? this.a.set(a, ch(b)) : this.a.ra(a);
    };
    ih.prototype.get = function (a) {
      try {
        var b = this.a.get(a);
      } catch (c) {
        return;
      }
      if (b !== null)
        try {
          return JSON.parse(b);
        } catch (c$3) {
          throw 'Storage: Invalid value was encountered';
        }
    };
    function jh() {}
    w(jh, Ag);
    jh.prototype.clear = function () {
      const a = lb(this.ha(!0));
      const b = this;
      Ha(a, function (c) {
        b.ra(c);
      });
    };
    function kh(a) {
      this.a = a;
    }
    w(kh, jh);
    function lh(a) {
      if (!a.a) return !1;
      try {
        return a.a.setItem('__sak', '1'), a.a.removeItem('__sak'), !0;
      } catch (b) {
        return !1;
      }
    }
    l = kh.prototype;
    l.set = function (a, b) {
      try {
        this.a.setItem(a, b);
      } catch (c) {
        if (this.a.length == 0) throw 'Storage mechanism: Storage disabled';
        throw 'Storage mechanism: Quota exceeded';
      }
    };
    l.get = function (a) {
      a = this.a.getItem(a);
      if (!q(a) && a !== null) throw 'Storage mechanism: Invalid value was encountered';
      return a;
    };
    l.ra = function (a) {
      this.a.removeItem(a);
    };
    l.ha = function (a) {
      let b = 0;
      const c = this.a;
      const d = new ib();
      d.next = function () {
        if (b >= c.length) throw hb;
        let e = c.key(b++);
        if (a) return e;
        e = c.getItem(e);
        if (!q(e)) throw 'Storage mechanism: Invalid value was encountered';
        return e;
      };
      return d;
    };
    l.clear = function () {
      this.a.clear();
    };
    l.key = function (a) {
      return this.a.key(a);
    };
    function mh() {
      let a = null;
      try {
        a = window.localStorage || null;
      } catch (b) {}
      this.a = a;
    }
    w(mh, kh);
    function nh() {
      let a = null;
      try {
        a = window.sessionStorage || null;
      } catch (b) {}
      this.a = a;
    }
    w(nh, kh);
    function oh(a, b) {
      this.g = a;
      this.a = b + '::';
    }
    w(oh, jh);
    oh.prototype.set = function (a, b) {
      this.g.set(this.a + a, b);
    };
    oh.prototype.get = function (a) {
      return this.g.get(this.a + a);
    };
    oh.prototype.ra = function (a) {
      this.g.ra(this.a + a);
    };
    oh.prototype.ha = function (a) {
      const b = this.g.ha(!0);
      const c = this;
      const d = new ib();
      d.next = function () {
        for (var e = b.next(); e.substr(0, c.a.length) != c.a; ) e = b.next();
        return a ? e.substr(c.a.length) : c.g.get(e);
      };
      return d;
    };
    lh(new mh());
    let ph;
    const qh = new nh();
    ph = lh(qh) ? new oh(qh, 'firebaseui') : null;
    const rh = new ih(ph);
    const sh = { name: 'pendingEmailCredential', storage: rh };
    const th = { name: 'redirectStatus', storage: rh };
    const uh = { name: 'redirectUrl', storage: rh };
    const vh = { name: 'emailForSignIn', storage: new ih(new Bg(3600, '/')) };
    const wh = { name: 'pendingEncryptedCredential', storage: new ih(new Bg(3600, '/')) };
    function xh(a, b) {
      return a.storage.get(b ? a.name + ':' + b : a.name);
    }
    function yh(a, b) {
      a.storage.a.ra(b ? a.name + ':' + b : a.name);
    }
    function zh(a, b, c) {
      a.storage.set(c ? a.name + ':' + c : a.name, b);
    }
    function Ah(a) {
      return xh(uh, a) || null;
    }
    function Bh(a) {
      a = xh(sh, a) || null;
      return Eg(a);
    }
    function Ch(a) {
      yh(sh, a);
    }
    function Dh(a, b) {
      zh(sh, Dg(a), b);
    }
    function Eh(a) {
      return (a = xh(th, a) || null) && typeof a.tenantId !== 'undefined'
        ? new Fg(a.tenantId)
        : null;
    }
    function Fh(a, b) {
      zh(th, { tenantId: a.a }, b);
    }
    function Gh(a, b) {
      b = xh(vh, b);
      let c = null;
      if (b)
        try {
          const d = bh(a, b);
          const e = JSON.parse(d);
          c = (e && e.email) || null;
        } catch (f) {}
      return c;
    }
    function Hh(a, b) {
      b = xh(wh, b);
      let c = null;
      if (b)
        try {
          const d = bh(a, b);
          c = JSON.parse(d);
        } catch (e) {}
      return Eg(c || null);
    }
    function Ih(a, b, c) {
      zh(wh, $g(a, JSON.stringify(Dg(b))), c);
    }
    function Jh() {
      this.W = {};
    }
    function G(a, b, c) {
      if (b.toLowerCase() in a.W) throw Error('Configuration ' + b + ' has already been defined.');
      a.W[b.toLowerCase()] = c;
    }
    function Kh(a, b, c) {
      if (!(b.toLowerCase() in a.W)) throw Error('Configuration ' + b + ' is not defined.');
      a.W[b.toLowerCase()] = c;
    }
    Jh.prototype.get = function (a) {
      if (!(a.toLowerCase() in this.W)) throw Error('Configuration ' + a + ' is not defined.');
      return this.W[a.toLowerCase()];
    };
    function Lh(a, b) {
      a = a.get(b);
      if (!a) throw Error('Configuration ' + b + ' is required.');
      return a;
    }
    function Mh() {
      this.g = void 0;
      this.a = {};
    }
    l = Mh.prototype;
    l.set = function (a, b) {
      Nh(this, a, b, !1);
    };
    l.add = function (a, b) {
      Nh(this, a, b, !0);
    };
    function Nh(a, b, c, d) {
      for (let e = 0; e < b.length; e++) {
        const f = b.charAt(e);
        a.a[f] || (a.a[f] = new Mh());
        a = a.a[f];
      }
      if (d && void 0 !== a.g) throw Error('The collection already contains the key "' + b + '"');
      a.g = c;
    }
    l.get = function (a) {
      a: {
        for (var b = this, c = 0; c < a.length; c++)
          if (((b = b.a[a.charAt(c)]), !b)) {
            a = void 0;
            break a;
          }
        a = b;
      }
      return a ? a.g : void 0;
    };
    l.la = function () {
      const a = [];
      Oh(this, a);
      return a;
    };
    function Oh(a, b) {
      void 0 !== a.g && b.push(a.g);
      for (const c in a.a) Oh(a.a[c], b);
    }
    l.ja = function () {
      const a = [];
      Ph(this, '', a);
      return a;
    };
    function Ph(a, b, c) {
      void 0 !== a.g && c.push(b);
      for (const d in a.a) Ph(a.a[d], b + d, c);
    }
    l.clear = function () {
      this.a = {};
      this.g = void 0;
    };
    function Qh(a) {
      this.a = a;
      this.g = new Mh();
      for (a = 0; a < this.a.length; a++) {
        const b = this.g.get('+' + this.a[a].b);
        b ? b.push(this.a[a]) : this.g.add('+' + this.a[a].b, [this.a[a]]);
      }
    }
    function Rh(a, b) {
      a = a.g;
      const c = {};
      let d = 0;
      void 0 !== a.g && (c[d] = a.g);
      for (; d < b.length; d++) {
        const e = b.charAt(d);
        if (!(e in a.a)) break;
        a = a.a[e];
        void 0 !== a.g && (c[d] = a.g);
      }
      for (const f in c) if (c.hasOwnProperty(f)) return c[f];
      return [];
    }
    function Sh(a) {
      for (let b = 0; b < Th.length; b++) if (Th[b].c === a) return Th[b];
      return null;
    }
    function Uh(a) {
      a = a.toUpperCase();
      for (var b = [], c = 0; c < Th.length; c++) Th[c].f === a && b.push(Th[c]);
      return b;
    }
    function Vh(a) {
      if (a.length > 0 && a.charAt(0) == '+') {
        a = a.substring(1);
        for (var b = [], c = 0; c < Th.length; c++) Th[c].b == a && b.push(Th[c]);
        a = b;
      } else a = Uh(a);
      return a;
    }
    function Wh(a) {
      a.sort(function (b, c) {
        return b.name.localeCompare(c.name, 'fr');
      });
    }
    var Th = [
      { name: 'Afghanistan', c: '93-AF-0', b: '93', f: 'AF' },
      { name: '\u00c5land (\u00celes)', c: '358-AX-0', b: '358', f: 'AX' },
      { name: 'Albanie', c: '355-AL-0', b: '355', f: 'AL' },
      { name: 'Alg\u00e9rie', c: '213-DZ-0', b: '213', f: 'DZ' },
      { name: 'Samoa am\u00e9ricaines', c: '1-AS-0', b: '1', f: 'AS' },
      { name: 'Andorre', c: '376-AD-0', b: '376', f: 'AD' },
      { name: 'Angola', c: '244-AO-0', b: '244', f: 'AO' },
      { name: 'Anguilla', c: '1-AI-0', b: '1', f: 'AI' },
      { name: 'Antigua-et-Barbuda', c: '1-AG-0', b: '1', f: 'AG' },
      { name: 'Argentine', c: '54-AR-0', b: '54', f: 'AR' },
      { name: 'Arm\u00e9nie', c: '374-AM-0', b: '374', f: 'AM' },
      { name: 'Aruba', c: '297-AW-0', b: '297', f: 'AW' },
      { name: 'Ascension (\u00cele)', c: '247-AC-0', b: '247', f: 'AC' },
      { name: 'Australie', c: '61-AU-0', b: '61', f: 'AU' },
      { name: 'Autriche', c: '43-AT-0', b: '43', f: 'AT' },
      { name: 'Azerba\u00efdjan', c: '994-AZ-0', b: '994', f: 'AZ' },
      { name: 'Bahamas', c: '1-BS-0', b: '1', f: 'BS' },
      { name: 'Bahre\u00efn', c: '973-BH-0', b: '973', f: 'BH' },
      { name: 'Bangladesh', c: '880-BD-0', b: '880', f: 'BD' },
      { name: 'Barbade', c: '1-BB-0', b: '1', f: 'BB' },
      { name: 'Bi\u00e9lorussie', c: '375-BY-0', b: '375', f: 'BY' },
      { name: 'Belgique', c: '32-BE-0', b: '32', f: 'BE' },
      { name: 'Belize', c: '501-BZ-0', b: '501', f: 'BZ' },
      { name: 'B\u00e9nin', c: '229-BJ-0', b: '229', f: 'BJ' },
      { name: 'Bermudes', c: '1-BM-0', b: '1', f: 'BM' },
      { name: 'Bhoutan', c: '975-BT-0', b: '975', f: 'BT' },
      { name: 'Bolivie', c: '591-BO-0', b: '591', f: 'BO' },
      { name: 'Bosnie-Herz\u00e9govine', c: '387-BA-0', b: '387', f: 'BA' },
      { name: 'Botswana', c: '267-BW-0', b: '267', f: 'BW' },
      { name: 'Br\u00e9sil', c: '55-BR-0', b: '55', f: 'BR' },
      { name: "Territoire britannique de l'oc\u00e9an Indien", c: '246-IO-0', b: '246', f: 'IO' },
      { name: '\u00celes Vierges britanniques', c: '1-VG-0', b: '1', f: 'VG' },
      { name: 'Brunei', c: '673-BN-0', b: '673', f: 'BN' },
      { name: 'Bulgarie', c: '359-BG-0', b: '359', f: 'BG' },
      { name: 'Burkina Faso', c: '226-BF-0', b: '226', f: 'BF' },
      { name: 'Burundi', c: '257-BI-0', b: '257', f: 'BI' },
      { name: 'Cambodge', c: '855-KH-0', b: '855', f: 'KH' },
      { name: 'Cameroun', c: '237-CM-0', b: '237', f: 'CM' },
      { name: 'Canada', c: '1-CA-0', b: '1', f: 'CA' },
      { name: 'Cap-Vert', c: '238-CV-0', b: '238', f: 'CV' },
      { name: 'Antilles n\u00e9erlandaises', c: '599-BQ-0', b: '599', f: 'BQ' },
      { name: 'Ca\u00efmans (\u00celes)', c: '1-KY-0', b: '1', f: 'KY' },
      { name: 'R\u00e9publique centrafricaine', c: '236-CF-0', b: '236', f: 'CF' },
      { name: 'Tchad', c: '235-TD-0', b: '235', f: 'TD' },
      { name: 'Chili', c: '56-CL-0', b: '56', f: 'CL' },
      { name: 'Chine', c: '86-CN-0', b: '86', f: 'CN' },
      { name: 'Christmas (\u00cele)', c: '61-CX-0', b: '61', f: 'CX' },
      { name: 'Cocos (\u00celes) (Keeling)', c: '61-CC-0', b: '61', f: 'CC' },
      { name: 'Colombie', c: '57-CO-0', b: '57', f: 'CO' },
      { name: 'Comores', c: '269-KM-0', b: '269', f: 'KM' },
      { name: 'R\u00e9publique d\u00e9mocratique du Congo', c: '243-CD-0', b: '243', f: 'CD' },
      { name: 'R\u00e9publique du Congo', c: '242-CG-0', b: '242', f: 'CG' },
      { name: 'Cook (\u00celes)', c: '682-CK-0', b: '682', f: 'CK' },
      { name: 'Costa Rica', c: '506-CR-0', b: '506', f: 'CR' },
      { name: "C\u00f4te d'Ivoire", c: '225-CI-0', b: '225', f: 'CI' },
      { name: 'Croatie', c: '385-HR-0', b: '385', f: 'HR' },
      { name: 'Cuba', c: '53-CU-0', b: '53', f: 'CU' },
      { name: 'Cura\u00e7ao', c: '599-CW-0', b: '599', f: 'CW' },
      { name: 'Chypre', c: '357-CY-0', b: '357', f: 'CY' },
      { name: 'R\u00e9publique tch\u00e8que', c: '420-CZ-0', b: '420', f: 'CZ' },
      { name: 'Danemark', c: '45-DK-0', b: '45', f: 'DK' },
      { name: 'Djibouti', c: '253-DJ-0', b: '253', f: 'DJ' },
      { name: 'Dominique', c: '1-DM-0', b: '1', f: 'DM' },
      { name: 'R\u00e9publique dominicaine', c: '1-DO-0', b: '1', f: 'DO' },
      { name: 'Timor Oriental', c: '670-TL-0', b: '670', f: 'TL' },
      { name: '\u00c9quateur', c: '593-EC-0', b: '593', f: 'EC' },
      { name: '\u00c9gypte', c: '20-EG-0', b: '20', f: 'EG' },
      { name: 'Salvador', c: '503-SV-0', b: '503', f: 'SV' },
      { name: 'Guin\u00e9e \u00e9quatoriale', c: '240-GQ-0', b: '240', f: 'GQ' },
      { name: '\u00c9rythr\u00e9e', c: '291-ER-0', b: '291', f: 'ER' },
      { name: 'Estonie', c: '372-EE-0', b: '372', f: 'EE' },
      { name: '\u00c9thiopie', c: '251-ET-0', b: '251', f: 'ET' },
      { name: 'Falkland (\u00celes Malouines)', c: '500-FK-0', b: '500', f: 'FK' },
      { name: 'F\u00e9ro\u00e9 (\u00celes)', c: '298-FO-0', b: '298', f: 'FO' },
      { name: 'Fidji', c: '679-FJ-0', b: '679', f: 'FJ' },
      { name: 'Finlande', c: '358-FI-0', b: '358', f: 'FI' },
      { name: 'France', c: '33-FR-0', b: '33', f: 'FR' },
      { name: 'Guyane fran\u00e7aise', c: '594-GF-0', b: '594', f: 'GF' },
      { name: 'Polyn\u00e9sie fran\u00e7aise', c: '689-PF-0', b: '689', f: 'PF' },
      { name: 'Gabon', c: '241-GA-0', b: '241', f: 'GA' },
      { name: 'Gambie', c: '220-GM-0', b: '220', f: 'GM' },
      { name: 'G\u00e9orgie', c: '995-GE-0', b: '995', f: 'GE' },
      { name: 'Allemagne', c: '49-DE-0', b: '49', f: 'DE' },
      { name: 'Ghana', c: '233-GH-0', b: '233', f: 'GH' },
      { name: 'Gibraltar', c: '350-GI-0', b: '350', f: 'GI' },
      { name: 'Gr\u00e8ce', c: '30-GR-0', b: '30', f: 'GR' },
      { name: 'Groenland', c: '299-GL-0', b: '299', f: 'GL' },
      { name: 'Grenade', c: '1-GD-0', b: '1', f: 'GD' },
      { name: 'Guadeloupe', c: '590-GP-0', b: '590', f: 'GP' },
      { name: 'Guam', c: '1-GU-0', b: '1', f: 'GU' },
      { name: 'Guatemala', c: '502-GT-0', b: '502', f: 'GT' },
      { name: 'Guernesey', c: '44-GG-0', b: '44', f: 'GG' },
      { name: 'Guin\u00e9e', c: '224-GN-0', b: '224', f: 'GN' },
      { name: 'Guin\u00e9e-Bissau', c: '245-GW-0', b: '245', f: 'GW' },
      { name: 'Guyane', c: '592-GY-0', b: '592', f: 'GY' },
      { name: 'Ha\u00efti', c: '509-HT-0', b: '509', f: 'HT' },
      { name: 'Heard et McDonald (\u00celes)', c: '672-HM-0', b: '672', f: 'HM' },
      { name: 'Honduras', c: '504-HN-0', b: '504', f: 'HN' },
      { name: 'Hong\u00a0Kong', c: '852-HK-0', b: '852', f: 'HK' },
      { name: 'Hongrie', c: '36-HU-0', b: '36', f: 'HU' },
      { name: 'Islande', c: '354-IS-0', b: '354', f: 'IS' },
      { name: 'Inde', c: '91-IN-0', b: '91', f: 'IN' },
      { name: 'Indon\u00e9sie', c: '62-ID-0', b: '62', f: 'ID' },
      { name: 'Iran', c: '98-IR-0', b: '98', f: 'IR' },
      { name: 'Iraq', c: '964-IQ-0', b: '964', f: 'IQ' },
      { name: 'Irlande', c: '353-IE-0', b: '353', f: 'IE' },
      { name: 'Man (\u00cele)', c: '44-IM-0', b: '44', f: 'IM' },
      { name: 'Isra\u00ebl', c: '972-IL-0', b: '972', f: 'IL' },
      { name: 'Italie', c: '39-IT-0', b: '39', f: 'IT' },
      { name: 'Jama\u00efque', c: '1-JM-0', b: '1', f: 'JM' },
      { name: 'Japon', c: '81-JP-0', b: '81', f: 'JP' },
      { name: 'Jersey', c: '44-JE-0', b: '44', f: 'JE' },
      { name: 'Jordanie', c: '962-JO-0', b: '962', f: 'JO' },
      { name: 'Kazakhstan', c: '7-KZ-0', b: '7', f: 'KZ' },
      { name: 'Kenya', c: '254-KE-0', b: '254', f: 'KE' },
      { name: 'Kiribati', c: '686-KI-0', b: '686', f: 'KI' },
      { name: 'Kosovo', c: '377-XK-0', b: '377', f: 'XK' },
      { name: 'Kosovo', c: '381-XK-0', b: '381', f: 'XK' },
      { name: 'Kosovo', c: '386-XK-0', b: '386', f: 'XK' },
      { name: 'Kowe\u00eft', c: '965-KW-0', b: '965', f: 'KW' },
      { name: 'Kirghizstan', c: '996-KG-0', b: '996', f: 'KG' },
      { name: 'Laos', c: '856-LA-0', b: '856', f: 'LA' },
      { name: 'Lettonie', c: '371-LV-0', b: '371', f: 'LV' },
      { name: 'Liban', c: '961-LB-0', b: '961', f: 'LB' },
      { name: 'Lesotho', c: '266-LS-0', b: '266', f: 'LS' },
      { name: 'Lib\u00e9ria', c: '231-LR-0', b: '231', f: 'LR' },
      { name: 'Libye', c: '218-LY-0', b: '218', f: 'LY' },
      { name: 'Liechtenstein', c: '423-LI-0', b: '423', f: 'LI' },
      { name: 'Lituanie', c: '370-LT-0', b: '370', f: 'LT' },
      { name: 'Luxembourg', c: '352-LU-0', b: '352', f: 'LU' },
      { name: 'Macao', c: '853-MO-0', b: '853', f: 'MO' },
      { name: 'Mac\u00e9doine', c: '389-MK-0', b: '389', f: 'MK' },
      { name: 'Madagascar', c: '261-MG-0', b: '261', f: 'MG' },
      { name: 'Malawi', c: '265-MW-0', b: '265', f: 'MW' },
      { name: 'Malaisie', c: '60-MY-0', b: '60', f: 'MY' },
      { name: 'Maldives', c: '960-MV-0', b: '960', f: 'MV' },
      { name: 'Mali', c: '223-ML-0', b: '223', f: 'ML' },
      { name: 'Malte', c: '356-MT-0', b: '356', f: 'MT' },
      { name: 'Marshall (\u00celes)', c: '692-MH-0', b: '692', f: 'MH' },
      { name: 'Martinique', c: '596-MQ-0', b: '596', f: 'MQ' },
      { name: 'Mauritanie', c: '222-MR-0', b: '222', f: 'MR' },
      { name: 'Maurice (\u00cele)', c: '230-MU-0', b: '230', f: 'MU' },
      { name: 'Mayotte', c: '262-YT-0', b: '262', f: 'YT' },
      { name: 'Mexique', c: '52-MX-0', b: '52', f: 'MX' },
      { name: 'Micron\u00e9sie', c: '691-FM-0', b: '691', f: 'FM' },
      { name: 'Moldavie', c: '373-MD-0', b: '373', f: 'MD' },
      { name: 'Monaco', c: '377-MC-0', b: '377', f: 'MC' },
      { name: 'Mongolie', c: '976-MN-0', b: '976', f: 'MN' },
      { name: 'Mont\u00e9n\u00e9gro', c: '382-ME-0', b: '382', f: 'ME' },
      { name: 'Montserrat', c: '1-MS-0', b: '1', f: 'MS' },
      { name: 'Maroc', c: '212-MA-0', b: '212', f: 'MA' },
      { name: 'Mozambique', c: '258-MZ-0', b: '258', f: 'MZ' },
      { name: 'Myanmar (Birmanie)', c: '95-MM-0', b: '95', f: 'MM' },
      { name: 'Namibie', c: '264-NA-0', b: '264', f: 'NA' },
      { name: 'Nauru', c: '674-NR-0', b: '674', f: 'NR' },
      { name: 'N\u00e9pal', c: '977-NP-0', b: '977', f: 'NP' },
      { name: 'Pays-Bas', c: '31-NL-0', b: '31', f: 'NL' },
      { name: 'Nouvelle-Cal\u00e9donie', c: '687-NC-0', b: '687', f: 'NC' },
      { name: 'Nouvelle-Z\u00e9lande', c: '64-NZ-0', b: '64', f: 'NZ' },
      { name: 'Nicaragua', c: '505-NI-0', b: '505', f: 'NI' },
      { name: 'Niger', c: '227-NE-0', b: '227', f: 'NE' },
      { name: 'Nig\u00e9ria', c: '234-NG-0', b: '234', f: 'NG' },
      { name: 'Niu\u00e9', c: '683-NU-0', b: '683', f: 'NU' },
      { name: 'Norfolk (\u00cele)', c: '672-NF-0', b: '672', f: 'NF' },
      { name: 'Cor\u00e9e du Nord', c: '850-KP-0', b: '850', f: 'KP' },
      { name: 'Mariannes du Nord (\u00celes)', c: '1-MP-0', b: '1', f: 'MP' },
      { name: 'Norv\u00e8ge', c: '47-NO-0', b: '47', f: 'NO' },
      { name: 'Oman', c: '968-OM-0', b: '968', f: 'OM' },
      { name: 'Pakistan', c: '92-PK-0', b: '92', f: 'PK' },
      { name: 'Palaos', c: '680-PW-0', b: '680', f: 'PW' },
      { name: 'Territoires palestiniens', c: '970-PS-0', b: '970', f: 'PS' },
      { name: 'Panama', c: '507-PA-0', b: '507', f: 'PA' },
      { name: 'Papouasie - Nouvelle-Guin\u00e9e', c: '675-PG-0', b: '675', f: 'PG' },
      { name: 'Paraguay', c: '595-PY-0', b: '595', f: 'PY' },
      { name: 'P\u00e9rou', c: '51-PE-0', b: '51', f: 'PE' },
      { name: 'Philippines', c: '63-PH-0', b: '63', f: 'PH' },
      { name: 'Pologne', c: '48-PL-0', b: '48', f: 'PL' },
      { name: 'Portugal', c: '351-PT-0', b: '351', f: 'PT' },
      { name: 'Porto Rico', c: '1-PR-0', b: '1', f: 'PR' },
      { name: 'Qatar', c: '974-QA-0', b: '974', f: 'QA' },
      { name: 'La R\u00e9union', c: '262-RE-0', b: '262', f: 'RE' },
      { name: 'Roumanie', c: '40-RO-0', b: '40', f: 'RO' },
      { name: 'Russie', c: '7-RU-0', b: '7', f: 'RU' },
      { name: 'Rwanda', c: '250-RW-0', b: '250', f: 'RW' },
      { name: 'Saint-Barth\u00e9lemy', c: '590-BL-0', b: '590', f: 'BL' },
      { name: 'Sainte-H\u00e9l\u00e8ne', c: '290-SH-0', b: '290', f: 'SH' },
      { name: 'Saint-Kitts', c: '1-KN-0', b: '1', f: 'KN' },
      { name: 'Sainte-Lucie', c: '1-LC-0', b: '1', f: 'LC' },
      { name: 'Saint-Martin', c: '590-MF-0', b: '590', f: 'MF' },
      { name: 'Saint-Pierre-et-Miquelon', c: '508-PM-0', b: '508', f: 'PM' },
      { name: 'Saint-Vincent', c: '1-VC-0', b: '1', f: 'VC' },
      { name: 'Samoa', c: '685-WS-0', b: '685', f: 'WS' },
      { name: 'Saint-Marin', c: '378-SM-0', b: '378', f: 'SM' },
      { name: 'Sao Tom\u00e9-et-Principe', c: '239-ST-0', b: '239', f: 'ST' },
      { name: 'Arabie saoudite', c: '966-SA-0', b: '966', f: 'SA' },
      { name: 'S\u00e9n\u00e9gal', c: '221-SN-0', b: '221', f: 'SN' },
      { name: 'Serbie', c: '381-RS-0', b: '381', f: 'RS' },
      { name: 'Seychelles', c: '248-SC-0', b: '248', f: 'SC' },
      { name: 'Sierra Leone', c: '232-SL-0', b: '232', f: 'SL' },
      { name: 'Singapour', c: '65-SG-0', b: '65', f: 'SG' },
      { name: 'Saint-Martin', c: '1-SX-0', b: '1', f: 'SX' },
      { name: 'Slovaquie', c: '421-SK-0', b: '421', f: 'SK' },
      { name: 'Slov\u00e9nie', c: '386-SI-0', b: '386', f: 'SI' },
      { name: 'Salomon (\u00celes)', c: '677-SB-0', b: '677', f: 'SB' },
      { name: 'Somalie', c: '252-SO-0', b: '252', f: 'SO' },
      { name: 'Afrique du Sud', c: '27-ZA-0', b: '27', f: 'ZA' },
      {
        name: 'G\u00e9orgie du Sud et Sandwich du Sud (\u00celes)',
        c: '500-GS-0',
        b: '500',
        f: 'GS'
      },
      { name: 'Cor\u00e9e du Sud', c: '82-KR-0', b: '82', f: 'KR' },
      { name: 'Soudan du Sud', c: '211-SS-0', b: '211', f: 'SS' },
      { name: 'Espagne', c: '34-ES-0', b: '34', f: 'ES' },
      { name: 'Sri Lanka', c: '94-LK-0', b: '94', f: 'LK' },
      { name: 'Soudan', c: '249-SD-0', b: '249', f: 'SD' },
      { name: 'Surinam', c: '597-SR-0', b: '597', f: 'SR' },
      { name: 'Svalbard et Jan Mayen', c: '47-SJ-0', b: '47', f: 'SJ' },
      { name: 'Swaziland', c: '268-SZ-0', b: '268', f: 'SZ' },
      { name: 'Su\u00e8de', c: '46-SE-0', b: '46', f: 'SE' },
      { name: 'Suisse', c: '41-CH-0', b: '41', f: 'CH' },
      { name: 'Syrie', c: '963-SY-0', b: '963', f: 'SY' },
      { name: 'Ta\u00efwan', c: '886-TW-0', b: '886', f: 'TW' },
      { name: 'Tadjikistan', c: '992-TJ-0', b: '992', f: 'TJ' },
      { name: 'Tanzanie', c: '255-TZ-0', b: '255', f: 'TZ' },
      { name: 'Tha\u00eflande', c: '66-TH-0', b: '66', f: 'TH' },
      { name: 'Togo', c: '228-TG-0', b: '228', f: 'TG' },
      { name: 'Tok\u00e9laou', c: '690-TK-0', b: '690', f: 'TK' },
      { name: 'Tonga', c: '676-TO-0', b: '676', f: 'TO' },
      { name: 'Trinit\u00e9-et-Tobago', c: '1-TT-0', b: '1', f: 'TT' },
      { name: 'Tunisie', c: '216-TN-0', b: '216', f: 'TN' },
      { name: 'Turquie', c: '90-TR-0', b: '90', f: 'TR' },
      { name: 'Turkm\u00e9nistan', c: '993-TM-0', b: '993', f: 'TM' },
      { name: 'Turks-et-Ca\u00efcos (\u00celes)', c: '1-TC-0', b: '1', f: 'TC' },
      { name: 'Tuvalu', c: '688-TV-0', b: '688', f: 'TV' },
      { name: '\u00celes Vierges am\u00e9ricaines', c: '1-VI-0', b: '1', f: 'VI' },
      { name: 'Ouganda', c: '256-UG-0', b: '256', f: 'UG' },
      { name: 'Ukrainien', c: '380-UA-0', b: '380', f: 'UA' },
      { name: '\u00c9mirats arabes unis', c: '971-AE-0', b: '971', f: 'AE' },
      { name: 'Royaume-Uni', c: '44-GB-0', b: '44', f: 'GB' },
      { name: '\u00c9tats-Unis', c: '1-US-0', b: '1', f: 'US' },
      { name: 'Uruguay', c: '598-UY-0', b: '598', f: 'UY' },
      { name: 'Ouzb\u00e9kistan', c: '998-UZ-0', b: '998', f: 'UZ' },
      { name: 'Vanuatu', c: '678-VU-0', b: '678', f: 'VU' },
      { name: 'Cit\u00e9 du Vatican', c: '379-VA-0', b: '379', f: 'VA' },
      { name: 'Venezuela', c: '58-VE-0', b: '58', f: 'VE' },
      { name: 'Vi\u00eat Nam', c: '84-VN-0', b: '84', f: 'VN' },
      { name: 'Wallis-et-Futuna', c: '681-WF-0', b: '681', f: 'WF' },
      { name: 'Sahara occidental', c: '212-EH-0', b: '212', f: 'EH' },
      { name: 'Y\u00e9men', c: '967-YE-0', b: '967', f: 'YE' },
      { name: 'Zambie', c: '260-ZM-0', b: '260', f: 'ZM' },
      { name: 'Zimbabwe', c: '263-ZW-0', b: '263', f: 'ZW' }
    ];
    Wh(Th);
    const Xh = new Qh(Th);
    function Yh(a, b) {
      this.a = a;
      this.Aa = b;
    }
    function Zh(a) {
      a = Ua(a);
      const b = Rh(Xh, a);
      return b.length > 0
        ? new Yh(b[0].b == '1' ? '1-US-0' : b[0].c, Ua(a.substr(b[0].b.length + 1)))
        : null;
    }
    function $h(a) {
      const b = Sh(a.a);
      if (!b) throw Error('Country ID ' + a.a + ' not found.');
      return '+' + b.b + a.Aa;
    }
    function ai(a, b) {
      for (let c = 0; c < a.length; c++)
        if (!Ma(bi, a[c]) && ((ci !== null && a[c] in ci) || Ma(b, a[c]))) return a[c];
      return null;
    }
    var bi = ['emailLink', 'password', 'phone'];
    var ci = {
      'facebook.com': 'FacebookAuthProvider',
      'github.com': 'GithubAuthProvider',
      'google.com': 'GoogleAuthProvider',
      password: 'EmailAuthProvider',
      'twitter.com': 'TwitterAuthProvider',
      phone: 'PhoneAuthProvider'
    };
    function di() {
      this.a = new Jh();
      G(this.a, 'autoUpgradeAnonymousUsers');
      G(this.a, 'callbacks');
      G(this.a, 'credentialHelper', ei);
      G(this.a, 'immediateFederatedRedirect', !1);
      G(this.a, 'popupMode', !1);
      G(this.a, 'privacyPolicyUrl');
      G(this.a, 'queryParameterForSignInSuccessUrl', 'signInSuccessUrl');
      G(this.a, 'queryParameterForWidgetMode', 'mode');
      G(this.a, 'signInFlow');
      G(this.a, 'signInOptions');
      G(this.a, 'signInSuccessUrl');
      G(this.a, 'siteName');
      G(this.a, 'tosUrl');
      G(this.a, 'widgetUrl');
      G(this.a, 'adminRestrictedOperation');
    }
    function fi(a) {
      const b = !!a.a.get('autoUpgradeAnonymousUsers');
      b &&
        !gi(a) &&
        qg(
          'Missing "signInFailure" callback: "signInFailure" callback needs to be provided when "autoUpgradeAnonymousUsers" is set to true.',
          void 0
        );
      return b;
    }
    function hi(a) {
      a = a.a.get('signInOptions') || [];
      for (var b = [], c = 0; c < a.length; c++) {
        let d = a[c];
        d = ta(d) ? d : { provider: d };
        d.provider && b.push(d);
      }
      return b;
    }
    function ii(a, b) {
      a = hi(a);
      for (let c = 0; c < a.length; c++) if (a[c].provider === b) return a[c];
      return null;
    }
    function ji(a) {
      return hi(a).map(function (b) {
        return b.provider;
      });
    }
    function ki(a, b) {
      a = li(a);
      for (let c = 0; c < a.length; c++) if (a[c].providerId === b) return a[c];
      return null;
    }
    function li(a) {
      return hi(a).map(function (b) {
        if (ci[b.provider] || Ma(mi, b.provider)) {
          b = {
            providerId: b.provider,
            S: b.providerName || null,
            V: b.fullLabel || null,
            ta: b.buttonColor || null,
            za: b.iconUrl ? zc(Bc(b.iconUrl)).toString() : null
          };
          for (const c in b) b[c] === null && delete b[c];
          return b;
        }
        return {
          providerId: b.provider,
          S: b.providerName || null,
          V: b.fullLabel || null,
          ta: b.buttonColor || null,
          za: b.iconUrl ? zc(Bc(b.iconUrl)).toString() : null,
          Ob: b.loginHintKey || null
        };
      });
    }
    function ni(a) {
      const b = ii(a, firebase.auth.GoogleAuthProvider.PROVIDER_ID);
      let c;
      if ((c = b && b.clientId)) {
        a: {
          if (
            (window.location && window.location.protocol) === 'http:' ||
            (window.location && window.location.protocol) === 'https:'
          )
            for (d in ((a = a.a.get('credentialHelper')), oi))
              if (oi[d] === a) {
                var d = oi[d];
                break a;
              }
          d = ei;
        }
        c = d === pi;
      }
      return c ? b.clientId || null : null;
    }
    function qi(a) {
      a = ii(a, firebase.auth.EmailAuthProvider.PROVIDER_ID);
      return !!(a && a.disableSignUp && a.disableSignUp.status);
    }
    function ri(a) {
      a = a.a.get('adminRestrictedOperation') || null;
      return !(!a || !a.status);
    }
    function si(a) {
      let b = null;
      hi(a).forEach(function (d) {
        d.provider == firebase.auth.PhoneAuthProvider.PROVIDER_ID &&
          ta(d.recaptchaParameters) &&
          !Array.isArray(d.recaptchaParameters) &&
          (b = eb(d.recaptchaParameters));
      });
      if (b) {
        const c = [];
        ti.forEach(function (d) {
          typeof b[d] !== 'undefined' && (c.push(d), delete b[d]);
        });
        c.length &&
          vg('The following provided "recaptchaParameters" keys are not allowed: ' + c.join(', '));
      }
      return b;
    }
    function ui(a) {
      return (a = a.a.get('adminRestrictedOperation')) && a.adminEmail ? a.adminEmail : null;
    }
    function vi(a) {
      if ((a = a.a.get('adminRestrictedOperation') || null)) {
        const b = a.helpLink || null;
        if (b && typeof b === 'string')
          return function () {
            tf(b);
          };
      }
      return null;
    }
    function wi(a) {
      return (
        ((a = ii(a, firebase.auth.EmailAuthProvider.PROVIDER_ID)) &&
          a.disableSignUp &&
          a.disableSignUp.adminEmail) ||
        null
      );
    }
    function xi(a) {
      if ((a = ii(a, firebase.auth.EmailAuthProvider.PROVIDER_ID)) && a.disableSignUp) {
        const b = a.disableSignUp.helpLink || null;
        if (b && typeof b === 'string')
          return function () {
            tf(b);
          };
      }
      return null;
    }
    function yi(a, b) {
      a = (a = ii(a, b)) && a.scopes;
      return Array.isArray(a) ? a : [];
    }
    function zi(a, b) {
      a = (a = ii(a, b)) && a.customParameters;
      return ta(a)
        ? ((a = eb(a)),
          b === firebase.auth.GoogleAuthProvider.PROVIDER_ID && delete a.login_hint,
          b === firebase.auth.GithubAuthProvider.PROVIDER_ID && delete a.login,
          a)
        : null;
    }
    function Ai(a) {
      a = ii(a, firebase.auth.PhoneAuthProvider.PROVIDER_ID);
      let b = null;
      a && typeof a.loginHint === 'string' && (b = Zh(a.loginHint));
      return (a && a.defaultNationalNumber) || (b && b.Aa) || null;
    }
    function Bi(a) {
      let b =
        ((a = ii(a, firebase.auth.PhoneAuthProvider.PROVIDER_ID)) && a.defaultCountry) || null;
      b = b && Uh(b);
      let c = null;
      a && typeof a.loginHint === 'string' && (c = Zh(a.loginHint));
      return (b && b[0]) || (c && Sh(c.a)) || null;
    }
    function Ci(a) {
      a = ii(a, firebase.auth.PhoneAuthProvider.PROVIDER_ID);
      if (!a) return null;
      let b = a.whitelistedCountries;
      let c = a.blacklistedCountries;
      if (typeof b !== 'undefined' && (!Array.isArray(b) || b.length == 0))
        throw Error('WhitelistedCountries must be a non-empty array.');
      if (typeof c !== 'undefined' && !Array.isArray(c))
        throw Error('BlacklistedCountries must be an array.');
      if (b && c) throw Error('Both whitelistedCountries and blacklistedCountries are provided.');
      if (!b && !c) return Th;
      a = [];
      if (b) {
        c = {};
        for (var d = 0; d < b.length; d++) {
          var e = Vh(b[d]);
          for (let f = 0; f < e.length; f++) c[e[f].c] = e[f];
        }
        for (var g in c) c.hasOwnProperty(g) && a.push(c[g]);
      } else {
        g = {};
        for (b = 0; b < c.length; b++)
          for (e = Vh(c[b]), d = 0; d < e.length; d++) g[e[d].c] = e[d];
        for (e = 0; e < Th.length; e++) (g !== null && Th[e].c in g) || a.push(Th[e]);
      }
      return a;
    }
    function Di(a) {
      return Lh(a.a, 'queryParameterForWidgetMode');
    }
    function H(a) {
      const b = a.a.get('tosUrl') || null;
      a = a.a.get('privacyPolicyUrl') || null;
      b && !a && vg('Privacy Policy URL is missing, the link will not be displayed.');
      if (b && a) {
        if (typeof b === 'function') return b;
        if (typeof b === 'string')
          return function () {
            tf(b);
          };
      }
      return null;
    }
    function J(a) {
      const b = a.a.get('tosUrl') || null;
      const c = a.a.get('privacyPolicyUrl') || null;
      c && !b && vg('Term of Service URL is missing, the link will not be displayed.');
      if (b && c) {
        if (typeof c === 'function') return c;
        if (typeof c === 'string')
          return function () {
            tf(c);
          };
      }
      return null;
    }
    function Ei(a) {
      return (a = ii(a, firebase.auth.EmailAuthProvider.PROVIDER_ID)) &&
        typeof a.requireDisplayName !== 'undefined'
        ? !!a.requireDisplayName
        : !0;
    }
    function Fi(a) {
      a = ii(a, firebase.auth.EmailAuthProvider.PROVIDER_ID);
      return !(!a || a.signInMethod !== firebase.auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD);
    }
    function Gi(a) {
      a = ii(a, firebase.auth.EmailAuthProvider.PROVIDER_ID);
      return !(!a || !a.forceSameDevice);
    }
    function Hi(a) {
      if (Fi(a)) {
        const b = { url: vf(), handleCodeInApp: !0 };
        (a = ii(a, firebase.auth.EmailAuthProvider.PROVIDER_ID)) &&
          typeof a.emailLinkSignIn === 'function' &&
          gb(b, a.emailLinkSignIn());
        a = b.url;
        let c = vf();
        c instanceof vb || (c = Jb(c));
        a instanceof vb || (a = Jb(a));
        let d = c;
        c = new vb(d);
        let e = !!a.j;
        e ? wb(c, a.j) : (e = !!a.A);
        e ? (c.A = a.A) : (e = !!a.h);
        e ? (c.h = a.h) : (e = a.C != null);
        let f = a.g;
        if (e) xb(c, a.C);
        else if ((e = !!a.g))
          if (
            (f.charAt(0) != '/' &&
              (d.h && !d.g
                ? (f = '/' + f)
                : ((d = c.g.lastIndexOf('/')), d != -1 && (f = c.g.substr(0, d + 1) + f))),
            f == '..' || f == '.')
          )
            f = '';
          else if (f.indexOf('./') != -1 || f.indexOf('/.') != -1) {
            d = f.lastIndexOf('/', 0) == 0;
            f = f.split('/');
            for (var g = [], h = 0; h < f.length; ) {
              const k = f[h++];
              k == '.'
                ? d && h == f.length && g.push('')
                : k == '..'
                ? ((g.length > 1 || (g.length == 1 && g[0] != '')) && g.pop(),
                  d && h == f.length && g.push(''))
                : (g.push(k), (d = !0));
            }
            f = g.join('/');
          }
        e ? (c.g = f) : (e = a.a.toString() !== '');
        e ? yb(c, zb(a.a)) : (e = !!a.s);
        e && (c.s = a.s);
        b.url = c.toString();
        return b;
      }
      return null;
    }
    function Ii(a) {
      const b = !!a.a.get('immediateFederatedRedirect');
      const c = ji(a);
      a = Ji(a);
      return b && c.length == 1 && !Ma(bi, c[0]) && a == Ki;
    }
    function Ji(a) {
      a = a.a.get('signInFlow');
      for (const b in Li) if (Li[b] == a) return Li[b];
      return Ki;
    }
    function Mi(a) {
      return Ni(a).signInSuccess || null;
    }
    function Oi(a) {
      return Ni(a).signInSuccessWithAuthResult || null;
    }
    function gi(a) {
      return Ni(a).signInFailure || null;
    }
    function Ni(a) {
      return a.a.get('callbacks') || {};
    }
    var pi = 'googleyolo';
    var ei = 'none';
    var oi = { nc: pi, NONE: ei };
    var Ki = 'redirect';
    var Li = { qc: 'popup', rc: Ki };
    const Pi = {
      mc: 'callback',
      RECOVER_EMAIL: 'recoverEmail',
      sc: 'resetPassword',
      REVERT_SECOND_FACTOR_ADDITION: 'revertSecondFactorAddition',
      tc: 'select',
      uc: 'signIn',
      VERIFY_AND_CHANGE_EMAIL: 'verifyAndChangeEmail',
      VERIFY_EMAIL: 'verifyEmail'
    };
    var mi = ['anonymous'];
    var ti = ['sitekey', 'tabindex', 'callback', 'expired-callback'];
    let Qi;
    let Ri;
    let Si;
    let Ti;
    const K = {};
    function L(a, b, c, d) {
      K[a].apply(null, Array.prototype.slice.call(arguments, 1));
    }
    function Ui(a) {
      if (a.classList) return a.classList;
      a = a.className;
      return (q(a) && a.match(/\S+/g)) || [];
    }
    function Vi(a, b) {
      return a.classList ? a.classList.contains(b) : Ma(Ui(a), b);
    }
    function Wi(a, b) {
      a.classList
        ? a.classList.add(b)
        : Vi(a, b) || (a.className += a.className.length > 0 ? ' ' + b : b);
    }
    function Xi(a, b) {
      a.classList
        ? a.classList.remove(b)
        : Vi(a, b) &&
          (a.className = Ja(Ui(a), function (c) {
            return c != b;
          }).join(' '));
    }
    function Yi(a) {
      let b = a.type;
      switch (q(b) && b.toLowerCase()) {
        case 'checkbox':
        case 'radio':
          return a.checked ? a.value : null;
        case 'select-one':
          return (b = a.selectedIndex), b >= 0 ? a.options[b].value : null;
        case 'select-multiple':
          b = [];
          for (var c, d = 0; (c = a.options[d]); d++) c.selected && b.push(c.value);
          return b.length ? b : null;
        default:
          return a.value != null ? a.value : null;
      }
    }
    function Zi(a, b) {
      let c = a.type;
      switch (q(c) && c.toLowerCase()) {
        case 'checkbox':
        case 'radio':
          a.checked = b;
          break;
        case 'select-one':
          a.selectedIndex = -1;
          if (q(b))
            for (var d = 0; (c = a.options[d]); d++)
              if (c.value == b) {
                c.selected = !0;
                break;
              }
          break;
        case 'select-multiple':
          q(b) && (b = [b]);
          for (d = 0; (c = a.options[d]); d++)
            if (((c.selected = !1), b))
              for (var e, f = 0; (e = b[f]); f++) c.value == e && (c.selected = !0);
          break;
        default:
          a.value = b != null ? b : '';
      }
    }
    function $i(a) {
      if ((a.altKey && !a.ctrlKey) || a.metaKey || (a.keyCode >= 112 && a.keyCode <= 123))
        return !1;
      if (aj(a.keyCode)) return !0;
      switch (a.keyCode) {
        case 18:
        case 20:
        case 93:
        case 17:
        case 40:
        case 35:
        case 27:
        case 36:
        case 45:
        case 37:
        case 224:
        case 91:
        case 144:
        case 12:
        case 34:
        case 33:
        case 19:
        case 255:
        case 44:
        case 39:
        case 145:
        case 16:
        case 38:
        case 252:
        case 224:
        case 92:
          return !1;
        case 0:
          return !dc;
        default:
          return a.keyCode < 166 || a.keyCode > 183;
      }
    }
    function bj(a, b, c, d, e, f) {
      if (ec && !mc('525')) return !0;
      if (gc && e) return aj(a);
      if (e && !d) return !1;
      if (!dc) {
        typeof b === 'number' && (b = cj(b));
        const g = b == 17 || b == 18 || (gc && b == 91);
        if (((!c || gc) && g) || (gc && b == 16 && (d || f))) return !1;
      }
      if ((ec || bc) && d && c)
        switch (a) {
          case 220:
          case 219:
          case 221:
          case 192:
          case 186:
          case 189:
          case 187:
          case 188:
          case 190:
          case 191:
          case 192:
          case 222:
            return !1;
        }
      if (z && d && b == a) return !1;
      switch (a) {
        case 13:
          return dc ? (f || e ? !1 : !(c && d)) : !0;
        case 27:
          return !(ec || bc || dc);
      }
      return dc && (d || e || f) ? !1 : aj(a);
    }
    function aj(a) {
      if (
        (a >= 48 && a <= 57) ||
        (a >= 96 && a <= 106) ||
        (a >= 65 && a <= 90) ||
        ((ec || bc) && a == 0)
      )
        return !0;
      switch (a) {
        case 32:
        case 43:
        case 63:
        case 64:
        case 107:
        case 109:
        case 110:
        case 111:
        case 186:
        case 59:
        case 189:
        case 187:
        case 61:
        case 188:
        case 190:
        case 191:
        case 192:
        case 222:
        case 219:
        case 220:
        case 221:
        case 163:
          return !0;
        case 173:
          return dc;
        default:
          return !1;
      }
    }
    function cj(a) {
      if (dc) a = dj(a);
      else if (gc && ec)
        switch (a) {
          case 93:
            a = 91;
        }
      return a;
    }
    function dj(a) {
      switch (a) {
        case 61:
          return 187;
        case 59:
          return 186;
        case 173:
          return 189;
        case 224:
          return 91;
        case 0:
          return 224;
        default:
          return a;
      }
    }
    function ej(a) {
      E.call(this);
      this.a = a;
      me(a, 'keydown', this.g, !1, this);
      me(a, 'click', this.h, !1, this);
    }
    w(ej, E);
    ej.prototype.g = function (a) {
      (a.keyCode == 13 || (ec && a.keyCode == 3)) && fj(this, a);
    };
    ej.prototype.h = function (a) {
      fj(this, a);
    };
    function fj(a, b) {
      let c = new gj(b);
      if (ze(a, c)) {
        c = new hj(b);
        try {
          ze(a, c);
        } finally {
          b.stopPropagation();
        }
      }
    }
    ej.prototype.o = function () {
      ej.K.o.call(this);
      ue(this.a, 'keydown', this.g, !1, this);
      ue(this.a, 'click', this.h, !1, this);
      delete this.a;
    };
    function hj(a) {
      ae.call(this, a.a);
      this.type = 'action';
    }
    w(hj, ae);
    function gj(a) {
      ae.call(this, a.a);
      this.type = 'beforeaction';
    }
    w(gj, ae);
    function ij(a) {
      E.call(this);
      this.a = a;
      a = z ? 'focusout' : 'blur';
      this.g = me(this.a, z ? 'focusin' : 'focus', this, !z);
      this.h = me(this.a, a, this, !z);
    }
    w(ij, E);
    ij.prototype.handleEvent = function (a) {
      const b = new ae(a.a);
      b.type = a.type == 'focusin' || a.type == 'focus' ? 'focusin' : 'focusout';
      ze(this, b);
    };
    ij.prototype.o = function () {
      ij.K.o.call(this);
      ve(this.g);
      ve(this.h);
      delete this.a;
    };
    function jj(a, b) {
      E.call(this);
      this.g = a || 1;
      this.a = b || n;
      this.h = r(this.gc, this);
      this.j = Aa();
    }
    w(jj, E);
    l = jj.prototype;
    l.Ka = !1;
    l.aa = null;
    l.gc = function () {
      if (this.Ka) {
        const a = Aa() - this.j;
        a > 0 && a < 0.8 * this.g
          ? (this.aa = this.a.setTimeout(this.h, this.g - a))
          : (this.aa && (this.a.clearTimeout(this.aa), (this.aa = null)),
            ze(this, 'tick'),
            this.Ka && (kj(this), this.start()));
      }
    };
    l.start = function () {
      this.Ka = !0;
      this.aa || ((this.aa = this.a.setTimeout(this.h, this.g)), (this.j = Aa()));
    };
    function kj(a) {
      a.Ka = !1;
      a.aa && (a.a.clearTimeout(a.aa), (a.aa = null));
    }
    l.o = function () {
      jj.K.o.call(this);
      kj(this);
      delete this.a;
    };
    function lj(a, b) {
      if (sa(a)) b && (a = r(a, b));
      else if (a && typeof a.handleEvent === 'function') a = r(a.handleEvent, a);
      else throw Error('Invalid listener argument');
      return Number(0) > 2147483647 ? -1 : n.setTimeout(a, 0);
    }
    function mj(a) {
      Rd.call(this);
      this.g = a;
      this.a = {};
    }
    w(mj, Rd);
    const nj = [];
    function oj(a, b, c, d) {
      qa(c) || (c && (nj[0] = c.toString()), (c = nj));
      for (let e = 0; e < c.length; e++) {
        const f = me(b, c[e], d || a.handleEvent, !1, a.g || a);
        if (!f) break;
        a.a[f.key] = f;
      }
    }
    function pj(a) {
      db(
        a.a,
        function (b, c) {
          this.a.hasOwnProperty(c) && ve(b);
        },
        a
      );
      a.a = {};
    }
    mj.prototype.o = function () {
      mj.K.o.call(this);
      pj(this);
    };
    mj.prototype.handleEvent = function () {
      throw Error('EventHandler.handleEvent not implemented');
    };
    function qj(a) {
      E.call(this);
      this.a = null;
      this.g = a;
      a = z || bc || (ec && !mc('531') && a.tagName == 'TEXTAREA');
      this.h = new mj(this);
      oj(this.h, this.g, a ? ['keydown', 'paste', 'cut', 'drop', 'input'] : 'input', this);
    }
    w(qj, E);
    qj.prototype.handleEvent = function (a) {
      if (a.type == 'input')
        (z && mc(10) && a.keyCode == 0 && a.j == 0) || (rj(this), ze(this, sj(a)));
      else if (a.type != 'keydown' || $i(a)) {
        let b = a.type == 'keydown' ? this.g.value : null;
        z && a.keyCode == 229 && (b = null);
        const c = sj(a);
        rj(this);
        this.a = lj(function () {
          this.a = null;
          this.g.value != b && ze(this, c);
        }, this);
      }
    };
    function rj(a) {
      a.a != null && (n.clearTimeout(a.a), (a.a = null));
    }
    function sj(a) {
      a = new ae(a.a);
      a.type = 'input';
      return a;
    }
    qj.prototype.o = function () {
      qj.K.o.call(this);
      this.h.m();
      rj(this);
      delete this.g;
    };
    function tj(a, b) {
      E.call(this);
      a &&
        (this.Oa && uj(this),
        (this.qa = a),
        (this.Na = me(this.qa, 'keypress', this, b)),
        (this.Ya = me(this.qa, 'keydown', this.Jb, b, this)),
        (this.Oa = me(this.qa, 'keyup', this.Kb, b, this)));
    }
    w(tj, E);
    l = tj.prototype;
    l.qa = null;
    l.Na = null;
    l.Ya = null;
    l.Oa = null;
    l.R = -1;
    l.X = -1;
    l.Ua = !1;
    const vj = {
      3: 13,
      12: 144,
      63232: 38,
      63233: 40,
      63234: 37,
      63235: 39,
      63236: 112,
      63237: 113,
      63238: 114,
      63239: 115,
      63240: 116,
      63241: 117,
      63242: 118,
      63243: 119,
      63244: 120,
      63245: 121,
      63246: 122,
      63247: 123,
      63248: 44,
      63272: 46,
      63273: 36,
      63275: 35,
      63276: 33,
      63277: 34,
      63289: 144,
      63302: 45
    };
    const wj = {
      Up: 38,
      Down: 40,
      Left: 37,
      Right: 39,
      Enter: 13,
      F1: 112,
      F2: 113,
      F3: 114,
      F4: 115,
      F5: 116,
      F6: 117,
      F7: 118,
      F8: 119,
      F9: 120,
      F10: 121,
      F11: 122,
      F12: 123,
      'U+007F': 46,
      Home: 36,
      End: 35,
      PageUp: 33,
      PageDown: 34,
      Insert: 45
    };
    const xj = !ec || mc('525');
    const yj = gc && dc;
    l = tj.prototype;
    l.Jb = function (a) {
      if (ec || bc)
        if (
          (this.R == 17 && !a.ctrlKey) ||
          (this.R == 18 && !a.altKey) ||
          (gc && this.R == 91 && !a.metaKey)
        )
          this.X = this.R = -1;
      this.R == -1 &&
        (a.ctrlKey && a.keyCode != 17
          ? (this.R = 17)
          : a.altKey && a.keyCode != 18
          ? (this.R = 18)
          : a.metaKey && a.keyCode != 91 && (this.R = 91));
      xj && !bj(a.keyCode, this.R, a.shiftKey, a.ctrlKey, a.altKey, a.metaKey)
        ? this.handleEvent(a)
        : ((this.X = cj(a.keyCode)), yj && (this.Ua = a.altKey));
    };
    l.Kb = function (a) {
      this.X = this.R = -1;
      this.Ua = a.altKey;
    };
    l.handleEvent = function (a) {
      let b = a.a;
      let c = b.altKey;
      if (z && a.type == 'keypress') {
        var d = this.X;
        var e = d != 13 && d != 27 ? b.keyCode : 0;
      } else
        (ec || bc) && a.type == 'keypress'
          ? ((d = this.X), (e = b.charCode >= 0 && b.charCode < 63232 && aj(d) ? b.charCode : 0))
          : ac && !ec
          ? ((d = this.X), (e = aj(d) ? b.keyCode : 0))
          : (a.type == 'keypress'
              ? (yj && (c = this.Ua),
                b.keyCode == b.charCode
                  ? b.keyCode < 32
                    ? ((d = b.keyCode), (e = 0))
                    : ((d = this.X), (e = b.charCode))
                  : ((d = b.keyCode || this.X), (e = b.charCode || 0)))
              : ((d = b.keyCode || this.X), (e = b.charCode || 0)),
            gc && e == 63 && d == 224 && (d = 191));
      let f = (d = cj(d));
      d
        ? d >= 63232 && d in vj
          ? (f = vj[d])
          : d == 25 && a.shiftKey && (f = 9)
        : b.keyIdentifier && b.keyIdentifier in wj && (f = wj[b.keyIdentifier]);
      (dc && xj && a.type == 'keypress' && !bj(f, this.R, a.shiftKey, a.ctrlKey, c, a.metaKey)) ||
        ((a = f == this.R), (this.R = f), (b = new zj(f, e, a, b)), (b.altKey = c), ze(this, b));
    };
    l.N = function () {
      return this.qa;
    };
    function uj(a) {
      a.Na && (ve(a.Na), ve(a.Ya), ve(a.Oa), (a.Na = null), (a.Ya = null), (a.Oa = null));
      a.qa = null;
      a.R = -1;
      a.X = -1;
    }
    l.o = function () {
      tj.K.o.call(this);
      uj(this);
    };
    function zj(a, b, c, d) {
      ae.call(this, d);
      this.type = 'key';
      this.keyCode = a;
      this.j = b;
      this.repeat = c;
    }
    w(zj, ae);
    function Aj(a, b, c, d) {
      this.top = a;
      this.right = b;
      this.bottom = c;
      this.left = d;
    }
    Aj.prototype.toString = function () {
      return '(' + this.top + 't, ' + this.right + 'r, ' + this.bottom + 'b, ' + this.left + 'l)';
    };
    Aj.prototype.ceil = function () {
      this.top = Math.ceil(this.top);
      this.right = Math.ceil(this.right);
      this.bottom = Math.ceil(this.bottom);
      this.left = Math.ceil(this.left);
      return this;
    };
    Aj.prototype.floor = function () {
      this.top = Math.floor(this.top);
      this.right = Math.floor(this.right);
      this.bottom = Math.floor(this.bottom);
      this.left = Math.floor(this.left);
      return this;
    };
    Aj.prototype.round = function () {
      this.top = Math.round(this.top);
      this.right = Math.round(this.right);
      this.bottom = Math.round(this.bottom);
      this.left = Math.round(this.left);
      return this;
    };
    function Bj(a, b) {
      const c = Sc(a);
      return c.defaultView &&
        c.defaultView.getComputedStyle &&
        (a = c.defaultView.getComputedStyle(a, null))
        ? a[b] || a.getPropertyValue(b) || ''
        : '';
    }
    function Cj(a) {
      try {
        var b = a.getBoundingClientRect();
      } catch (c) {
        return { left: 0, top: 0, right: 0, bottom: 0 };
      }
      z &&
        a.ownerDocument.body &&
        ((a = a.ownerDocument),
        (b.left -= a.documentElement.clientLeft + a.body.clientLeft),
        (b.top -= a.documentElement.clientTop + a.body.clientTop));
      return b;
    }
    function Dj(a, b) {
      b = b || Yc(document);
      let c = b || Yc(document);
      let d = Ej(a);
      let e = Ej(c);
      if (!z || Number(nc) >= 9) {
        g = Bj(c, 'borderLeftWidth');
        var f = Bj(c, 'borderRightWidth');
        h = Bj(c, 'borderTopWidth');
        k = Bj(c, 'borderBottomWidth');
        f = new Aj(parseFloat(h), parseFloat(f), parseFloat(k), parseFloat(g));
      } else {
        var g = Fj(c, 'borderLeft');
        f = Fj(c, 'borderRight');
        var h = Fj(c, 'borderTop');
        var k = Fj(c, 'borderBottom');
        f = new Aj(h, f, k, g);
      }
      c == Yc(document)
        ? ((g = d.a - c.scrollLeft),
          (d = d.g - c.scrollTop),
          !z || Number(nc) >= 10 || ((g += f.left), (d += f.top)))
        : ((g = d.a - e.a - f.left), (d = d.g - e.g - f.top));
      e = a.offsetWidth;
      f = a.offsetHeight;
      h = ec && !e && !f;
      (ka(e) && !h) || !a.getBoundingClientRect
        ? (a = new Pc(e, f))
        : ((a = Cj(a)), (a = new Pc(a.right - a.left, a.bottom - a.top)));
      e = c.clientHeight - a.height;
      f = c.scrollLeft;
      h = c.scrollTop;
      f += Math.min(g, Math.max(g - (c.clientWidth - a.width), 0));
      h += Math.min(d, Math.max(d - e, 0));
      c = new Oc(f, h);
      b.scrollLeft = c.a;
      b.scrollTop = c.g;
    }
    function Ej(a) {
      let b = Sc(a);
      const c = new Oc(0, 0);
      let d = b ? Sc(b) : document;
      d = !z || Number(nc) >= 9 || Qc(d).a.compatMode == 'CSS1Compat' ? d.documentElement : d.body;
      if (a == d) return c;
      a = Cj(a);
      d = Qc(b).a;
      b = Yc(d);
      d = d.parentWindow || d.defaultView;
      b =
        z && mc('10') && d.pageYOffset != b.scrollTop
          ? new Oc(b.scrollLeft, b.scrollTop)
          : new Oc(d.pageXOffset || b.scrollLeft, d.pageYOffset || b.scrollTop);
      c.a = a.left + b.a;
      c.g = a.top + b.g;
      return c;
    }
    const Gj = { thin: 2, medium: 4, thick: 6 };
    function Fj(a, b) {
      if ((a.currentStyle ? a.currentStyle[b + 'Style'] : null) == 'none') return 0;
      let c = a.currentStyle ? a.currentStyle[b + 'Width'] : null;
      if (c in Gj) a = Gj[c];
      else if (/^\d+px?$/.test(c)) a = parseInt(c, 10);
      else {
        b = a.style.left;
        const d = a.runtimeStyle.left;
        a.runtimeStyle.left = a.currentStyle.left;
        a.style.left = c;
        c = a.style.pixelLeft;
        a.style.left = b;
        a.runtimeStyle.left = d;
        a = +c;
      }
      return a;
    }
    function Hj() {}
    oa(Hj);
    Hj.prototype.a = 0;
    function Ij(a) {
      E.call(this);
      this.s = a || Qc();
      this.cb = null;
      this.na = !1;
      this.g = null;
      this.L = void 0;
      this.oa = this.Ea = this.Y = null;
    }
    w(Ij, E);
    l = Ij.prototype;
    l.Lb = Hj.Xa();
    l.N = function () {
      return this.g;
    };
    function M(a, b) {
      return a.g ? Vc(b, a.g || a.s.a) : null;
    }
    function Jj(a) {
      a.L || (a.L = new mj(a));
      return a.L;
    }
    l.Za = function (a) {
      if (this.Y && this.Y != a) throw Error('Method not supported');
      Ij.K.Za.call(this, a);
    };
    l.kb = function () {
      this.g = this.s.a.createElement('DIV');
    };
    l.render = function (a) {
      if (this.na) throw Error('Component already rendered');
      this.g || this.kb();
      a ? a.insertBefore(this.g, null) : this.s.a.body.appendChild(this.g);
      (this.Y && !this.Y.na) || this.v();
    };
    l.v = function () {
      this.na = !0;
      Kj(this, function (a) {
        !a.na && a.N() && a.v();
      });
    };
    l.ya = function () {
      Kj(this, function (a) {
        a.na && a.ya();
      });
      this.L && pj(this.L);
      this.na = !1;
    };
    l.o = function () {
      this.na && this.ya();
      this.L && (this.L.m(), delete this.L);
      Kj(this, function (a) {
        a.m();
      });
      this.g && Zc(this.g);
      this.Y = this.g = this.oa = this.Ea = null;
      Ij.K.o.call(this);
    };
    function Kj(a, b) {
      a.Ea && Ha(a.Ea, b, void 0);
    }
    l.removeChild = function (a, b) {
      if (a) {
        const c = q(a) ? a : a.cb || (a.cb = ':' + (a.Lb.a++).toString(36));
        this.oa && c
          ? ((a = this.oa), (a = (a !== null && c in a ? a[c] : void 0) || null))
          : (a = null);
        if (c && a) {
          const d = this.oa;
          c in d && delete d[c];
          Na(this.Ea, a);
          b && (a.ya(), a.g && Zc(a.g));
          b = a;
          if (b == null) throw Error('Unable to set parent component');
          b.Y = null;
          Ij.K.Za.call(b, null);
        }
      }
      if (!a) throw Error('Child is not in parent component');
      return a;
    };
    function N(a, b) {
      const c = ad(a, 'firebaseui-textfield');
      b
        ? (Xi(a, 'firebaseui-input-invalid'),
          Wi(a, 'firebaseui-input'),
          c && Xi(c, 'firebaseui-textfield-invalid'))
        : (Xi(a, 'firebaseui-input'),
          Wi(a, 'firebaseui-input-invalid'),
          c && Wi(c, 'firebaseui-textfield-invalid'));
    }
    function Lj(a, b, c) {
      b = new qj(b);
      Ud(a, za(Vd, b));
      oj(Jj(a), b, 'input', c);
    }
    function Mj(a, b, c) {
      b = new tj(b);
      Ud(a, za(Vd, b));
      oj(Jj(a), b, 'key', function (d) {
        d.keyCode == 13 && (d.stopPropagation(), d.preventDefault(), c(d));
      });
    }
    function Nj(a, b, c) {
      b = new ij(b);
      Ud(a, za(Vd, b));
      oj(Jj(a), b, 'focusin', c);
    }
    function Oj(a, b, c) {
      b = new ij(b);
      Ud(a, za(Vd, b));
      oj(Jj(a), b, 'focusout', c);
    }
    function O(a, b, c) {
      b = new ej(b);
      Ud(a, za(Vd, b));
      oj(Jj(a), b, 'action', function (d) {
        d.stopPropagation();
        d.preventDefault();
        c(d);
      });
    }
    function Pj(a) {
      Wi(a, 'firebaseui-hidden');
    }
    function Qj(a, b) {
      b && $c(a, b);
      Xi(a, 'firebaseui-hidden');
    }
    function Rj(a) {
      return !Vi(a, 'firebaseui-hidden') && a.style.display != 'none';
    }
    function Sj(a) {
      a = a || {};
      const b = a.email;
      const c = a.disabled;
      let d =
        '<div class="firebaseui-textfield mdl-textfield mdl-js-textfield mdl-textfield--floating-label"><label class="mdl-textfield__label firebaseui-label" for="ui-sign-in-email-input">';
      d = a.wc ? d + 'Saisissez une nouvelle adresse e-mail' : d + 'E-mail';
      d +=
        '</label><input type="email" name="email" id="ui-sign-in-email-input" autocomplete="username" class="mdl-textfield__input firebaseui-input firebaseui-id-email" value="' +
        ud(b != null ? b : '') +
        '"' +
        (c ? 'disabled' : '') +
        '></div><div class="firebaseui-error-wrapper"><p class="firebaseui-error firebaseui-text-input-error firebaseui-hidden firebaseui-id-email-error"></p></div>';
      return B(d);
    }
    function Tj(a) {
      a = a || {};
      a = a.label;
      let b =
        '<button type="submit" class="firebaseui-id-submit firebaseui-button mdl-button mdl-js-button mdl-button--raised mdl-button--colored">';
      b = a ? b + A(a) : b + 'Suivant';
      return B(b + '</button>');
    }
    function Uj() {
      const a = '' + Tj({ label: D('Se connecter') });
      return B(a);
    }
    function Vj() {
      const a = '' + Tj({ label: D('Enregistrer') });
      return B(a);
    }
    function Wj() {
      const a = '' + Tj({ label: D('Continuer') });
      return B(a);
    }
    function Xj(a) {
      a = a || {};
      a = a.label;
      let b =
        '<div class="firebaseui-new-password-component"><div class="firebaseui-textfield mdl-textfield mdl-js-textfield mdl-textfield--floating-label"><label class="mdl-textfield__label firebaseui-label" for="ui-sign-in-new-password-input">';
      b = a ? b + A(a) : b + 'Choisissez un mot de passe';
      return B(
        b +
          '</label><input type="password" name="newPassword" id="ui-sign-in-new-password-input" autocomplete="new-password" class="mdl-textfield__input firebaseui-input firebaseui-id-new-password"></div><a href="javascript:void(0)" class="firebaseui-input-floating-button firebaseui-id-password-toggle firebaseui-input-toggle-on firebaseui-input-toggle-blur"></a><div class="firebaseui-error-wrapper"><p class="firebaseui-error firebaseui-text-input-error firebaseui-hidden firebaseui-id-new-password-error"></p></div></div>'
      );
    }
    function Yj() {
      const a = {};
      let b =
        '<div class="firebaseui-textfield mdl-textfield mdl-js-textfield mdl-textfield--floating-label"><label class="mdl-textfield__label firebaseui-label" for="ui-sign-in-password-input">';
      b = a.current ? b + 'Mot de passe actuel' : b + 'Mot de passe';
      return B(
        b +
          '</label><input type="password" name="password" id="ui-sign-in-password-input" autocomplete="current-password" class="mdl-textfield__input firebaseui-input firebaseui-id-password"></div><div class="firebaseui-error-wrapper"><p class="firebaseui-error firebaseui-text-input-error firebaseui-hidden firebaseui-id-password-error"></p></div>'
      );
    }
    function Zj() {
      return B(
        '<a class="firebaseui-link firebaseui-id-secondary-link" href="javascript:void(0)">Vous ne parvenez pas \u00e0 vous connecter\u00a0?</a>'
      );
    }
    function ak(a) {
      a = a || {};
      a = a.label;
      let b =
        '<button class="firebaseui-id-secondary-link firebaseui-button mdl-button mdl-js-button mdl-button--primary">';
      b = a ? b + A(a) : b + 'Annuler';
      return B(b + '</button>');
    }
    function bk(a) {
      let b = '';
      a.F &&
        a.D &&
        (b +=
          '<ul class="firebaseui-tos-list firebaseui-tos"><li class="firebaseui-inline-list-item"><a href="javascript:void(0)" class="firebaseui-link firebaseui-tos-link" target="_blank">Conditions d\'utilisation</a></li><li class="firebaseui-inline-list-item"><a href="javascript:void(0)" class="firebaseui-link firebaseui-pp-link" target="_blank">R\u00e8gles de confidentialit\u00e9</a></li></ul>');
      return B(b);
    }
    function ck(a) {
      let b = '';
      a.F &&
        a.D &&
        (b +=
          '<p class="firebaseui-tos firebaseui-tospp-full-message">En continuant, vous acceptez les <a href="javascript:void(0)" class="firebaseui-link firebaseui-tos-link" target="_blank">Conditions d\'utilisation</a> et les <a href="javascript:void(0)" class="firebaseui-link firebaseui-pp-link" target="_blank">R\u00e8gles de confidentialit\u00e9</a>.</p>');
      return B(b);
    }
    function dk(a) {
      a =
        '<div class="firebaseui-info-bar firebaseui-id-info-bar"><p class="firebaseui-info-bar-message">' +
        A(a.message) +
        '&nbsp;&nbsp;<a href="javascript:void(0)" class="firebaseui-link firebaseui-id-dismiss-info-bar">Ignorer</a></p></div>';
      return B(a);
    }
    dk.a = 'firebaseui.auth.soy2.element.infoBar';
    function ek(a) {
      const b = a.content;
      a = a.Ab;
      return B(
        '<dialog class="mdl-dialog firebaseui-dialog firebaseui-id-dialog' +
          (a ? ' ' + ud(a) : '') +
          '">' +
          A(b) +
          '</dialog>'
      );
    }
    function fk(a) {
      const b = a.message;
      return B(
        ek({
          content: td(
            '<div class="firebaseui-dialog-icon-wrapper"><div class="' +
              ud(a.Ma) +
              ' firebaseui-dialog-icon"></div></div><div class="firebaseui-progress-dialog-message">' +
              A(b) +
              '</div>'
          )
        })
      );
    }
    fk.a = 'firebaseui.auth.soy2.element.progressDialog';
    function gk(a) {
      let b = '<div class="firebaseui-list-box-actions">';
      a = a.items;
      for (let c = a.length, d = 0; d < c; d++) {
        const e = a[d];
        b +=
          '<button type="button" data-listboxid="' +
          ud(e.id) +
          '" class="mdl-button firebaseui-id-list-box-dialog-button firebaseui-list-box-dialog-button">' +
          (e.Ma
            ? '<div class="firebaseui-list-box-icon-wrapper"><div class="firebaseui-list-box-icon ' +
              ud(e.Ma) +
              '"></div></div>'
            : '') +
          '<div class="firebaseui-list-box-label-wrapper">' +
          A(e.label) +
          '</div></button>';
      }
      b = '' + ek({ Ab: D('firebaseui-list-box-dialog'), content: td(b + '</div>') });
      return B(b);
    }
    gk.a = 'firebaseui.auth.soy2.element.listBoxDialog';
    function hk(a) {
      a = a || {};
      return B(
        a.tb
          ? '<div class="mdl-spinner mdl-spinner--single-color mdl-js-spinner is-active firebaseui-busy-indicator firebaseui-id-busy-indicator"></div>'
          : '<div class="mdl-progress mdl-js-progress mdl-progress__indeterminate firebaseui-busy-indicator firebaseui-id-busy-indicator"></div>'
      );
    }
    hk.a = 'firebaseui.auth.soy2.element.busyIndicator';
    function ik(a, b) {
      a = a || {};
      a = a.ga;
      return C(
        a.S
          ? a.S
          : b.hb[a.providerId]
          ? '' + b.hb[a.providerId]
          : a.providerId && a.providerId.indexOf('saml.') == 0
          ? a.providerId.substring(5)
          : a.providerId && a.providerId.indexOf('oidc.') == 0
          ? a.providerId.substring(5)
          : '' + a.providerId
      );
    }
    function jk(a) {
      kk(a, 'upgradeElement');
    }
    function lk(a) {
      kk(a, 'downgradeElements');
    }
    const mk = ['mdl-js-textfield', 'mdl-js-progress', 'mdl-js-spinner', 'mdl-js-button'];
    function kk(a, b) {
      a &&
        window.componentHandler &&
        window.componentHandler[b] &&
        mk.forEach(function (c) {
          if (Vi(a, c)) window.componentHandler[b](a);
          Ha(Tc(c, a), function (d) {
            window.componentHandler[b](d);
          });
        });
    }
    function nk(a, b, c) {
      ok.call(this);
      document.body.appendChild(a);
      a.showModal || window.dialogPolyfill.registerDialog(a);
      a.showModal();
      jk(a);
      b &&
        O(this, a, function (f) {
          const g = a.getBoundingClientRect();
          (f.clientX < g.left ||
            g.left + g.width < f.clientX ||
            f.clientY < g.top ||
            g.top + g.height < f.clientY) &&
            ok.call(this);
        });
      if (!c) {
        const d = this.N().parentElement || this.N().parentNode;
        if (d) {
          const e = this;
          this.da = function () {
            if (a.open) {
              let f = a.getBoundingClientRect().height;
              const g = d.getBoundingClientRect().height;
              const h = d.getBoundingClientRect().top - document.body.getBoundingClientRect().top;
              const k = d.getBoundingClientRect().left - document.body.getBoundingClientRect().left;
              const p = a.getBoundingClientRect().width;
              const t = d.getBoundingClientRect().width;
              a.style.top = (h + (g - f) / 2).toString() + 'px';
              f = k + (t - p) / 2;
              a.style.left = f.toString() + 'px';
              a.style.right =
                (document.body.getBoundingClientRect().width - f - p).toString() + 'px';
            } else window.removeEventListener('resize', e.da);
          };
          this.da();
          window.addEventListener('resize', this.da, !1);
        }
      }
    }
    function ok() {
      const a = pk.call(this);
      a &&
        (lk(a),
        a.open && a.close(),
        Zc(a),
        this.da && window.removeEventListener('resize', this.da));
    }
    function pk() {
      return Vc('firebaseui-id-dialog');
    }
    function qk() {
      Zc(rk.call(this));
    }
    function rk() {
      return M(this, 'firebaseui-id-info-bar');
    }
    function sk() {
      return M(this, 'firebaseui-id-dismiss-info-bar');
    }
    const tk = {
      xa: {
        'google.com': 'https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg',
        'github.com': 'https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/github.svg',
        'facebook.com': 'https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/facebook.svg',
        'twitter.com': 'https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/twitter.svg',
        password: 'https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/mail.svg',
        phone: 'https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/phone.svg',
        anonymous: 'https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/anonymous.png',
        'microsoft.com': 'https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/microsoft.svg',
        'yahoo.com': 'https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/yahoo.svg',
        'apple.com': 'https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/apple.png',
        saml: 'https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/saml.svg',
        oidc: 'https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/oidc.svg'
      },
      wa: {
        'google.com': '#ffffff',
        'github.com': '#333333',
        'facebook.com': '#3b5998',
        'twitter.com': '#55acee',
        password: '#db4437',
        phone: '#02bd7e',
        anonymous: '#f4b400',
        'microsoft.com': '#2F2F2F',
        'yahoo.com': '#720E9E',
        'apple.com': '#000000',
        saml: '#007bff',
        oidc: '#007bff'
      },
      hb: {
        'google.com': 'Google',
        'github.com': 'GitHub',
        'facebook.com': 'Facebook',
        'twitter.com': 'Twitter',
        password: 'Password',
        phone: 'Phone',
        anonymous: 'Guest',
        'microsoft.com': 'Microsoft',
        'yahoo.com': 'Yahoo',
        'apple.com': 'Apple'
      }
    };
    function uk(a, b, c) {
      $d.call(this, a, b);
      for (const d in c) this[d] = c[d];
    }
    w(uk, $d);
    function P(a, b, c, d, e) {
      Ij.call(this, c);
      this.fb = a;
      this.eb = b;
      this.Fa = !1;
      this.Ga = d || null;
      this.A = this.ca = null;
      this.Z = eb(tk);
      gb(this.Z, e || {});
    }
    w(P, Ij);
    l = P.prototype;
    l.kb = function () {
      const a = hd(this.fb, this.eb, this.Z, this.s);
      jk(a);
      this.g = a;
    };
    l.v = function () {
      P.K.v.call(this);
      De(Q(this), new uk('pageEnter', Q(this), { pageId: this.Ga }));
      if (this.bb() && this.Z.F) {
        const a = this.Z.F;
        O(this, this.bb(), function () {
          a();
        });
      }
      if (this.ab() && this.Z.D) {
        const b = this.Z.D;
        O(this, this.ab(), function () {
          b();
        });
      }
    };
    l.ya = function () {
      De(Q(this), new uk('pageExit', Q(this), { pageId: this.Ga }));
      P.K.ya.call(this);
    };
    l.o = function () {
      window.clearTimeout(this.ca);
      this.eb = this.fb = this.ca = null;
      this.Fa = !1;
      this.A = null;
      lk(this.N());
      P.K.o.call(this);
    };
    function vk(a) {
      a.Fa = !0;
      const b = Vi(a.N(), 'firebaseui-use-spinner');
      a.ca = window.setTimeout(function () {
        a.N() &&
          a.A === null &&
          ((a.A = hd(hk, { tb: b }, null, a.s)), a.N().appendChild(a.A), jk(a.A));
      }, 500);
    }
    l.I = function (a, b, c, d) {
      function e() {
        if (f.T) return null;
        f.Fa = !1;
        window.clearTimeout(f.ca);
        f.ca = null;
        f.A && (lk(f.A), Zc(f.A), (f.A = null));
      }
      var f = this;
      if (f.Fa) return null;
      vk(f);
      return a.apply(null, b).then(c, d).then(e, e);
    };
    function Q(a) {
      return a.N().parentElement || a.N().parentNode;
    }
    function wk(a, b, c) {
      Mj(a, b, function () {
        c.focus();
      });
    }
    function xk(a, b, c) {
      Mj(a, b, function () {
        c();
      });
    }
    u(P.prototype, {
      a: function (a) {
        qk.call(this);
        const b = hd(dk, { message: a }, null, this.s);
        this.N().appendChild(b);
        O(this, sk.call(this), function () {
          Zc(b);
        });
      },
      yc: qk,
      Ac: rk,
      zc: sk,
      $: function (a, b) {
        a = hd(fk, { Ma: a, message: b }, null, this.s);
        nk.call(this, a);
      },
      h: ok,
      Cb: pk,
      Cc: function () {
        return M(this, 'firebaseui-tos');
      },
      bb: function () {
        return M(this, 'firebaseui-tos-link');
      },
      ab: function () {
        return M(this, 'firebaseui-pp-link');
      },
      Dc: function () {
        return M(this, 'firebaseui-tos-list');
      }
    });
    function yk(a, b, c) {
      a = a || {};
      b = a.Va;
      const d = a.ia;
      a =
        '<div class="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-sign-in"><form onsubmit="return false;"><div class="firebaseui-card-header"><h1 class="firebaseui-title">Se connecter avec une adresse e-mail</h1></div><div class="firebaseui-card-content"><div class="firebaseui-relative-wrapper">' +
        Sj(a) +
        '</div></div><div class="firebaseui-card-actions"><div class="firebaseui-form-actions">' +
        (b ? ak(null) : '') +
        Tj(null) +
        '</div></div><div class="firebaseui-card-footer">' +
        (d ? ck(c) : bk(c)) +
        '</div></form></div>';
      return B(a);
    }
    yk.a = 'firebaseui.auth.soy2.page.signIn';
    function zk(a, b, c) {
      a = a || {};
      b = a.ia;
      a =
        '<div class="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-password-sign-in"><form onsubmit="return false;"><div class="firebaseui-card-header"><h1 class="firebaseui-title">Se connecter</h1></div><div class="firebaseui-card-content">' +
        Sj(a) +
        Yj() +
        '</div><div class="firebaseui-card-actions"><div class="firebaseui-form-links">' +
        Zj() +
        '</div><div class="firebaseui-form-actions">' +
        Uj() +
        '</div></div><div class="firebaseui-card-footer">' +
        (b ? ck(c) : bk(c)) +
        '</div></form></div>';
      return B(a);
    }
    zk.a = 'firebaseui.auth.soy2.page.passwordSignIn';
    function Ak(a, b, c) {
      a = a || {};
      const d = a.Tb;
      b = a.Ta;
      const e = a.ia;
      const f =
        '<div class="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-password-sign-up"><form onsubmit="return false;"><div class="firebaseui-card-header"><h1 class="firebaseui-title">Cr\u00e9er un compte</h1></div><div class="firebaseui-card-content">' +
        Sj(a);
      d
        ? ((a = a || {}),
          (a = a.name),
          (a =
            '<div class="firebaseui-textfield mdl-textfield mdl-js-textfield mdl-textfield--floating-label"><label class="mdl-textfield__label firebaseui-label" for="ui-sign-in-name-input">Nom et pr\u00e9nom</label><input type="text" name="name" id="ui-sign-in-name-input" autocomplete="name" class="mdl-textfield__input firebaseui-input firebaseui-id-name" value="' +
            ud(a != null ? a : '') +
            '"></div><div class="firebaseui-error-wrapper"><p class="firebaseui-error firebaseui-text-input-error firebaseui-hidden firebaseui-id-name-error"></p></div>'),
          (a = B(a)))
        : (a = '');
      c =
        f +
        a +
        Xj(null) +
        '</div><div class="firebaseui-card-actions"><div class="firebaseui-form-actions">' +
        (b ? ak(null) : '') +
        Vj() +
        '</div></div><div class="firebaseui-card-footer">' +
        (e ? ck(c) : bk(c)) +
        '</div></form></div>';
      return B(c);
    }
    Ak.a = 'firebaseui.auth.soy2.page.passwordSignUp';
    function Bk(a, b, c) {
      a = a || {};
      b = a.Ta;
      a =
        '<div class="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-password-recovery"><form onsubmit="return false;"><div class="firebaseui-card-header"><h1 class="firebaseui-title">R\u00e9cup\u00e9rer votre mot de passe</h1></div><div class="firebaseui-card-content"><p class="firebaseui-text">Les instructions relatives \u00e0 la r\u00e9initialisation de votre mot de passe seront envoy\u00e9es \u00e0 cette adresse e-mail</p>' +
        Sj(a) +
        '</div><div class="firebaseui-card-actions"><div class="firebaseui-form-actions">' +
        (b ? ak(null) : '') +
        Tj({ label: D('Envoyer') }) +
        '</div></div><div class="firebaseui-card-footer">' +
        bk(c) +
        '</div></form></div>';
      return B(a);
    }
    Bk.a = 'firebaseui.auth.soy2.page.passwordRecovery';
    function Ck(a, b, c) {
      b = a.G;
      let d = '';
      a =
        "Suivez les instructions envoy\u00e9es \u00e0 l'adresse <strong>" +
        (A(a.email) + '</strong> pour r\u00e9cup\u00e9rer votre mot de passe');
      d +=
        '<div class="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-password-recovery-email-sent"><div class="firebaseui-card-header"><h1 class="firebaseui-title">Consultez votre bo\u00eete de r\u00e9ception</h1></div><div class="firebaseui-card-content"><p class="firebaseui-text">' +
        a +
        '</p></div><div class="firebaseui-card-actions">';
      b && (d += '<div class="firebaseui-form-actions">' + Tj({ label: D('OK') }) + '</div>');
      d += '</div><div class="firebaseui-card-footer">' + bk(c) + '</div></div>';
      return B(d);
    }
    Ck.a = 'firebaseui.auth.soy2.page.passwordRecoveryEmailSent';
    function Dk(a, b, c) {
      return B(
        '<div class="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-callback"><div class="firebaseui-callback-indicator-container">' +
          hk(null, null, c) +
          '</div></div>'
      );
    }
    Dk.a = 'firebaseui.auth.soy2.page.callback';
    function Ek(a, b, c) {
      return B(
        '<div class="firebaseui-container firebaseui-id-page-spinner">' +
          hk({ tb: !0 }, null, c) +
          '</div>'
      );
    }
    Ek.a = 'firebaseui.auth.soy2.page.spinner';
    function Fk() {
      return B(
        '<div class="firebaseui-container firebaseui-id-page-blank firebaseui-use-spinner"></div>'
      );
    }
    Fk.a = 'firebaseui.auth.soy2.page.blank';
    function Gk(a, b, c) {
      b = '';
      a =
        'Un e-mail de connexion avec des instructions suppl\u00e9mentaires a \u00e9t\u00e9 envoy\u00e9 \u00e0 <strong>' +
        (A(a.email) + '</strong>. Consultez cet e-mail pour vous connecter.');
      const d = B(
        '<a class="firebaseui-link firebaseui-id-trouble-getting-email-link" href="javascript:void(0)">Vous n\'avez pas re\u00e7u l\'e-mail\u00a0?</a>'
      );
      b +=
        '<div class="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-email-link-sign-in-sent"><form onsubmit="return false;"><div class="firebaseui-card-header"><h1 class="firebaseui-title">E-mail de connexion envoy\u00e9</h1></div><div class="firebaseui-card-content"><div class="firebaseui-email-sent"></div><p class="firebaseui-text">' +
        a +
        '</p></div><div class="firebaseui-card-actions"><div class="firebaseui-form-links">' +
        d +
        '</div><div class="firebaseui-form-actions">' +
        ak({ label: D('Retour') }) +
        '</div></div><div class="firebaseui-card-footer">' +
        bk(c) +
        '</div></form></div>';
      return B(b);
    }
    Gk.a = 'firebaseui.auth.soy2.page.emailLinkSignInSent';
    function Hk(a, b, c) {
      a =
        '<div class="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-email-not-received"><form onsubmit="return false;"><div class="firebaseui-card-header"><h1 class="firebaseui-title">Vous n\'avez pas re\u00e7u l\'e-mail\u00a0?</h1></div><div class="firebaseui-card-content"><p class="firebaseui-text">Essayez les solutions courantes suivantes\u00a0:<ul><li>V\u00e9rifiez que l\'e-mail n\'a ni \u00e9t\u00e9 marqu\u00e9 comme spam ni \u00e9t\u00e9 filtr\u00e9.</li><li>V\u00e9rifiez votre connexion Internet.</li><li>V\u00e9rifiez que votre adresse e-mail est correcte.</li><li>V\u00e9rifiez que votre bo\u00eete de r\u00e9ception n\'est pas pleine et que les param\u00e8tres sont correctement d\u00e9finis.</li></ul></p><p class="firebaseui-text">Si les \u00e9tapes d\u00e9crites plus haut n\'ont pas r\u00e9solu le probl\u00e8me, vous pouvez renvoyer l\'e-mail. Sachez que le lien du premier e-mail sera alors d\u00e9sactiv\u00e9.</p></div><div class="firebaseui-card-actions"><div class="firebaseui-form-links">' +
        B(
          '<a class="firebaseui-link firebaseui-id-resend-email-link" href="javascript:void(0)">Renvoyer</a>'
        ) +
        '</div><div class="firebaseui-form-actions">' +
        ak({ label: D('Retour') }) +
        '</div></div><div class="firebaseui-card-footer">' +
        bk(c) +
        '</div></form></div>';
      return B(a);
    }
    Hk.a = 'firebaseui.auth.soy2.page.emailNotReceived';
    function Ik(a, b, c) {
      a =
        '<div class="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-email-link-sign-in-confirmation"><form onsubmit="return false;"><div class="firebaseui-card-header"><h1 class="firebaseui-title">Confirmer l\'e-mail</h1></div><div class="firebaseui-card-content"><p class="firebaseui-text">Confirmez votre adresse e-mail pour vous connecter.</p><div class="firebaseui-relative-wrapper">' +
        Sj(a) +
        '</div></div><div class="firebaseui-card-actions"><div class="firebaseui-form-actions">' +
        ak(null) +
        Tj(null) +
        '</div></div><div class="firebaseui-card-footer">' +
        bk(c) +
        '</div></form></div>';
      return B(a);
    }
    Ik.a = 'firebaseui.auth.soy2.page.emailLinkSignInConfirmation';
    function Jk() {
      const a =
        '<div class="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-different-device-error"><div class="firebaseui-card-header"><h1 class="firebaseui-title">Nouveau navigateur ou appareil d\u00e9tect\u00e9</h1></div><div class="firebaseui-card-content"><p class="firebaseui-text">Essayez d\'ouvrir le lien en utilisant le m\u00eame appareil ou navigateur que celui sur lequel vous avez commenc\u00e9 le processus de connexion.</p></div><div class="firebaseui-card-actions"><div class="firebaseui-form-actions">' +
        ak({ label: D('Ignorer') }) +
        '</div></div></div>';
      return B(a);
    }
    Jk.a = 'firebaseui.auth.soy2.page.differentDeviceError';
    function Kk() {
      const a =
        '<div class="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-anonymous-user-mismatch"><div class="firebaseui-card-header"><h1 class="firebaseui-title">Session termin\u00e9e</h1></div><div class="firebaseui-card-content"><p class="firebaseui-text">La session associ\u00e9e \u00e0 cette demande de connexion a expir\u00e9 ou a \u00e9t\u00e9 effac\u00e9e.</p></div><div class="firebaseui-card-actions"><div class="firebaseui-form-actions">' +
        ak({ label: D('Ignorer') }) +
        '</div></div></div>';
      return B(a);
    }
    Kk.a = 'firebaseui.auth.soy2.page.anonymousUserMismatch';
    function Lk(a, b, c) {
      b = '';
      a =
        "Vous avez d\u00e9j\u00e0 utilis\u00e9 l'adresse <strong>" +
        (A(a.email) + '</strong> pour vous connecter. Saisissez le mot de passe pour ce compte.');
      b +=
        '<div class="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-password-linking"><form onsubmit="return false;"><div class="firebaseui-card-header"><h1 class="firebaseui-title">Se connecter</h1></div><div class="firebaseui-card-content"><h2 class="firebaseui-subtitle">Vous avez d\u00e9j\u00e0 un compte</h2><p class="firebaseui-text">' +
        a +
        '</p>' +
        Yj() +
        '</div><div class="firebaseui-card-actions"><div class="firebaseui-form-links">' +
        Zj() +
        '</div><div class="firebaseui-form-actions">' +
        Uj() +
        '</div></div><div class="firebaseui-card-footer">' +
        bk(c) +
        '</div></form></div>';
      return B(b);
    }
    Lk.a = 'firebaseui.auth.soy2.page.passwordLinking';
    function Mk(a, b, c) {
      let d = a.email;
      b = '';
      a = '' + ik(a, c);
      a = D(a);
      d =
        'Vous avez d\u00e9j\u00e0 utilis\u00e9 <strong>' +
        (A(d) +
          ('</strong>. Vous pouvez associer votre compte <strong>' +
            (A(a) +
              ('</strong> \u00e0 <strong>' +
                (A(d) +
                  '</strong> en vous connectant via le lien envoy\u00e9 par e-mail ci-dessous.')))));
      a =
        'Pour associer votre compte ' +
        (A(a) +
          ' \u00e0 cette adresse e-mail, vous devez ouvrir le lien sur le m\u00eame appareil ou dans le m\u00eame navigateur.');
      b +=
        '<div class="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-email-link-sign-in-linking"><form onsubmit="return false;"><div class="firebaseui-card-header"><h1 class="firebaseui-title">Se connecter</h1></div><div class="firebaseui-card-content"><h2 class="firebaseui-subtitle">Vous avez d\u00e9j\u00e0 un compte</h2><p class="firebaseui-text firebaseui-text-justify">' +
        d +
        '<p class="firebaseui-text firebaseui-text-justify">' +
        a +
        '</p></div><div class="firebaseui-card-actions"><div class="firebaseui-form-actions">' +
        Uj() +
        '</div></div><div class="firebaseui-card-footer">' +
        bk(c) +
        '</div></form></div>';
      return B(b);
    }
    Mk.a = 'firebaseui.auth.soy2.page.emailLinkSignInLinking';
    function Nk(a, b, c) {
      b = '';
      let d = '' + ik(a, c);
      d = D(d);
      a =
        "Vous aviez d\u00e9cid\u00e9 d'associer votre compte <strong>" +
        (A(d) +
          '</strong> \u00e0 votre adresse e-mail, mais vous avez ouvert le lien sur un appareil diff\u00e9rent de celui avec lequel vous vous \u00eates connect\u00e9.');
      d =
        'Si vous souhaitez toujours associer votre compte <strong>' +
        (A(d) +
          '</strong>, ouvrez le lien sur l\'appareil avec lequel vous avez commenc\u00e9 \u00e0 vous connecter. Sinon, appuyez sur "Continuer" pour vous connecter depuis un autre appareil.');
      b +=
        '<div class="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-email-link-sign-in-linking-different-device"><form onsubmit="return false;"><div class="firebaseui-card-header"><h1 class="firebaseui-title">Se connecter</h1></div><div class="firebaseui-card-content"><p class="firebaseui-text firebaseui-text-justify">' +
        a +
        '</p><p class="firebaseui-text firebaseui-text-justify">' +
        d +
        '</p></div><div class="firebaseui-card-actions"><div class="firebaseui-form-actions">' +
        Wj() +
        '</div></div><div class="firebaseui-card-footer">' +
        bk(c) +
        '</div></form></div>';
      return B(b);
    }
    Nk.a = 'firebaseui.auth.soy2.page.emailLinkSignInLinkingDifferentDevice';
    function Ok(a, b, c) {
      let d = a.email;
      b = '';
      a = '' + ik(a, c);
      a = D(a);
      d =
        "Vous avez d\u00e9j\u00e0 utilis\u00e9 l'adresse <strong>" +
        (A(d) + ('</strong>. Connectez-vous avec ' + (A(a) + ' pour continuer.')));
      b +=
        '<div class="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-federated-linking"><form onsubmit="return false;"><div class="firebaseui-card-header"><h1 class="firebaseui-title">Se connecter</h1></div><div class="firebaseui-card-content"><h2 class="firebaseui-subtitle">Vous avez d\u00e9j\u00e0 un compte</h2><p class="firebaseui-text">' +
        d +
        '</p></div><div class="firebaseui-card-actions"><div class="firebaseui-form-actions">' +
        Tj({ label: D('Se connecter avec ' + a) }) +
        '</div></div><div class="firebaseui-card-footer">' +
        bk(c) +
        '</div></form></div>';
      return B(b);
    }
    Ok.a = 'firebaseui.auth.soy2.page.federatedLinking';
    function Pk(a, b, c) {
      a = a || {};
      let d = a.kc;
      b = a.yb;
      a = a.Eb;
      let e =
        '<div class="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-unauthorized-user"><form onsubmit="return false;"><div class="firebaseui-card-header"><h1 class="firebaseui-title">Non autoris\u00e9</h1></div><div class="firebaseui-card-content"><p class="firebaseui-text">';
      d
        ? ((d =
            '<strong>' +
            (A(d) + "</strong> n'est pas autoris\u00e9 \u00e0 voir la page demand\u00e9e.")),
          (e += d))
        : (e += 'User is not authorized to view the requested page.');
      e += '</p>';
      b &&
        ((b = 'Veuillez contacter <strong>' + (A(b) + "</strong> pour obtenir l'autorisation.")),
        (e +=
          '<p class="firebaseui-text firebaseui-id-unauthorized-user-admin-email">' + b + '</p>'));
      e += '</div><div class="firebaseui-card-actions"><div class="firebaseui-form-links">';
      a &&
        (e +=
          '<a class="firebaseui-link firebaseui-id-unauthorized-user-help-link" href="javascript:void(0)" target="_blank">En savoir plus</a>');
      e +=
        '</div><div class="firebaseui-form-actions">' +
        ak({ label: D('Retour') }) +
        '</div></div><div class="firebaseui-card-footer">' +
        bk(c) +
        '</div></form></div>';
      return B(e);
    }
    Pk.a = 'firebaseui.auth.soy2.page.unauthorizedUser';
    function Qk(a, b, c) {
      b = '';
      a =
        "Pour vous connecter avec l'adresse e-mail <strong>" +
        (A(a.email) +
          '</strong> sur cet appareil, vous devez r\u00e9cup\u00e9rer votre mot de passe.');
      b +=
        '<div class="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-unsupported-provider"><form onsubmit="return false;"><div class="firebaseui-card-header"><h1 class="firebaseui-title">Se connecter</h1></div><div class="firebaseui-card-content"><p class="firebaseui-text">' +
        a +
        '</p></div><div class="firebaseui-card-actions"><div class="firebaseui-form-actions">' +
        ak(null) +
        Tj({ label: D('R\u00e9cup\u00e9rer votre mot de passe') }) +
        '</div></div><div class="firebaseui-card-footer">' +
        bk(c) +
        '</div></form></div>';
      return B(b);
    }
    Qk.a = 'firebaseui.auth.soy2.page.unsupportedProvider';
    function Rk(a) {
      let b = '';
      const c = '<p class="firebaseui-text">pour <strong>' + (A(a.email) + '</strong></p>');
      b +=
        '<div class="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-password-reset"><form onsubmit="return false;"><div class="firebaseui-card-header"><h1 class="firebaseui-title">R\u00e9initialiser votre mot de passe</h1></div><div class="firebaseui-card-content">' +
        c +
        Xj(sd(a)) +
        '</div><div class="firebaseui-card-actions"><div class="firebaseui-form-actions">' +
        Vj() +
        '</div></div></form></div>';
      return B(b);
    }
    Rk.a = 'firebaseui.auth.soy2.page.passwordReset';
    function Sk(a) {
      a = a || {};
      a =
        '<div class="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-password-reset-success"><div class="firebaseui-card-header"><h1 class="firebaseui-title">Le mot de passe a bien \u00e9t\u00e9 modifi\u00e9</h1></div><div class="firebaseui-card-content"><p class="firebaseui-text">Vous pouvez maintenant vous connecter avec votre nouveau mot de passe</p></div><div class="firebaseui-card-actions">' +
        (a.G ? '<div class="firebaseui-form-actions">' + Wj() + '</div>' : '') +
        '</div></div>';
      return B(a);
    }
    Sk.a = 'firebaseui.auth.soy2.page.passwordResetSuccess';
    function Tk(a) {
      a = a || {};
      a =
        '<div class="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-password-reset-failure"><div class="firebaseui-card-header"><h1 class="firebaseui-title">Essayez de r\u00e9initialiser votre mot de passe</h1></div><div class="firebaseui-card-content"><p class="firebaseui-text">Votre demande de r\u00e9initialisation du mot de passe a expir\u00e9 ou ce lien a d\u00e9j\u00e0 \u00e9t\u00e9 utilis\u00e9</p></div><div class="firebaseui-card-actions">' +
        (a.G ? '<div class="firebaseui-form-actions">' + Wj() + '</div>' : '') +
        '</div></div>';
      return B(a);
    }
    Tk.a = 'firebaseui.auth.soy2.page.passwordResetFailure';
    function Uk(a) {
      const b = a.G;
      let c = '';
      a =
        'Votre adresse e-mail de connexion est de nouveau la suivante\u00a0: <strong>' +
        (A(a.email) + '</strong>.');
      c +=
        '<div class="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-email-change-revoke-success"><form onsubmit="return false;"><div class="firebaseui-card-header"><h1 class="firebaseui-title">L\'adresse e-mail a bien \u00e9t\u00e9 mise \u00e0 jour</h1></div><div class="firebaseui-card-content"><p class="firebaseui-text">' +
        a +
        '</p><p class="firebaseui-text">Si vous n\'avez pas demand\u00e9 \u00e0 modifier l\'adresse de connexion, il se peut que quelqu\'un tente d\'acc\u00e9der \u00e0 votre compte. Vous devriez <a class="firebaseui-link firebaseui-id-reset-password-link" href="javascript:void(0)">modifier imm\u00e9diatement votre mot de passe</a>.</p></div><div class="firebaseui-card-actions">' +
        (b ? '<div class="firebaseui-form-actions">' + Wj() + '</div>' : '') +
        '</div></form></div>';
      return B(c);
    }
    Uk.a = 'firebaseui.auth.soy2.page.emailChangeRevokeSuccess';
    function Vk(a) {
      a = a || {};
      a =
        '<div class="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-email-change-revoke-failure"><div class="firebaseui-card-header"><h1 class="firebaseui-title">Impossible de mettre \u00e0 jour votre adresse e-mail</h1></div><div class="firebaseui-card-content"><p class="firebaseui-text">Un probl\u00e8me est survenu lors du r\u00e9tablissement de votre adresse e-mail de connexion.</p><p class="firebaseui-text">Si l\'op\u00e9ration \u00e9choue \u00e0 nouveau lors de votre prochaine tentative, contactez votre administrateur.</p></div><div class="firebaseui-card-actions">' +
        (a.G ? '<div class="firebaseui-form-actions">' + Wj() + '</div>' : '') +
        '</div></div>';
      return B(a);
    }
    Vk.a = 'firebaseui.auth.soy2.page.emailChangeRevokeFailure';
    function Wk(a) {
      a = a || {};
      a =
        '<div class="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-email-verification-success"><div class="firebaseui-card-header"><h1 class="firebaseui-title">Votre adresse e-mail a bien \u00e9t\u00e9 valid\u00e9e</h1></div><div class="firebaseui-card-content"><p class="firebaseui-text">Vous pouvez maintenant vous connecter avec votre nouveau compte</p></div><div class="firebaseui-card-actions">' +
        (a.G ? '<div class="firebaseui-form-actions">' + Wj() + '</div>' : '') +
        '</div></div>';
      return B(a);
    }
    Wk.a = 'firebaseui.auth.soy2.page.emailVerificationSuccess';
    function Xk(a) {
      a = a || {};
      a =
        '<div class="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-email-verification-failure"><div class="firebaseui-card-header"><h1 class="firebaseui-title">Essayez de valider \u00e0 nouveau votre adresse e-mail</h1></div><div class="firebaseui-card-content"><p class="firebaseui-text">Votre demande de validation de l\'adresse e-mail a expir\u00e9, ou ce lien a d\u00e9j\u00e0 \u00e9t\u00e9 utilis\u00e9</p></div><div class="firebaseui-card-actions">' +
        (a.G ? '<div class="firebaseui-form-actions">' + Wj() + '</div>' : '') +
        '</div></div>';
      return B(a);
    }
    Xk.a = 'firebaseui.auth.soy2.page.emailVerificationFailure';
    function Zk(a) {
      const b = a.G;
      let c = '';
      a =
        'Vous pouvez maintenant vous connecter avec votre nouvelle adresse e-mail\u00a0: <strong>' +
        (A(a.email) + '</strong>.');
      c +=
        '<div class="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-verify-and-change-email-success"><div class="firebaseui-card-header"><h1 class="firebaseui-title">Votre adresse e-mail a \u00e9t\u00e9 valid\u00e9e et modifi\u00e9e</h1></div><div class="firebaseui-card-content"><p class="firebaseui-text">' +
        a +
        '</p></div><div class="firebaseui-card-actions">' +
        (b ? '<div class="firebaseui-form-actions">' + Wj() + '</div>' : '') +
        '</div></div>';
      return B(c);
    }
    Zk.a = 'firebaseui.auth.soy2.page.verifyAndChangeEmailSuccess';
    function $k(a) {
      a = a || {};
      a =
        '<div class="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-verify-and-change-email-failure"><div class="firebaseui-card-header"><h1 class="firebaseui-title">Essayez de modifier \u00e0 nouveau votre adresse e-mail</h1></div><div class="firebaseui-card-content"><p class="firebaseui-text">Votre demande de validation et de modification de l\'adresse e-mail a expir\u00e9, ou ce lien a d\u00e9j\u00e0 \u00e9t\u00e9 utilis\u00e9.</p></div><div class="firebaseui-card-actions">' +
        (a.G ? '<div class="firebaseui-form-actions">' + Wj() + '</div>' : '') +
        '</div></div>';
      return B(a);
    }
    $k.a = 'firebaseui.auth.soy2.page.verifyAndChangeEmailFailure';
    function al(a) {
      let b = a.factorId;
      const c = a.phoneNumber;
      a = a.G;
      let d =
        '<div class="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-revert-second-factor-addition-success"><form onsubmit="return false;"><div class="firebaseui-card-header"><h1 class="firebaseui-title">Deuxi\u00e8me facteur supprim\u00e9</h1></div><div class="firebaseui-card-content"><p class="firebaseui-text">';
      switch (b) {
        case 'phone':
          b =
            "Le facteur suivant de la deuxi\u00e8me \u00e9tape d'authentification a \u00e9t\u00e9 supprim\u00e9\u00a0: <strong>" +
            (A(b) + (' ' + (A(c) + '</strong>.')));
          d += b;
          break;
        default:
          d +=
            "L'application ou l'appareil qui servait de deuxi\u00e8me \u00e9tape d'authentification a \u00e9t\u00e9 supprim\u00e9.";
      }
      d +=
        '</p><p class="firebaseui-text">Si vous ne reconnaissez pas cet appareil, cela signifie peut-\u00eatre que quelqu\'un essaie d\'acc\u00e9der \u00e0 votre compte. Envisagez de <a class="firebaseui-link firebaseui-id-reset-password-link" href="javascript:void(0)">modifier votre mot de passe tout de suite</a>.</p></div><div class="firebaseui-card-actions">' +
        (a ? '<div class="firebaseui-form-actions">' + Wj() + '</div>' : '') +
        '</div></form></div>';
      return B(d);
    }
    al.a = 'firebaseui.auth.soy2.page.revertSecondFactorAdditionSuccess';
    function bl(a) {
      a = a || {};
      a =
        '<div class="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-revert-second-factor-addition-failure"><div class="firebaseui-card-header"><h1 class="firebaseui-title">Impossible de supprimer votre deuxi\u00e8me facteur</h1></div><div class="firebaseui-card-content"><p class="firebaseui-text">Une erreur s\'est produite lors de la suppression du deuxi\u00e8me facteur.</p><p class="firebaseui-text">Veuillez r\u00e9essayer. Si le probl\u00e8me persiste, contactez l\'assistance.</p></div><div class="firebaseui-card-actions">' +
        (a.G ? '<div class="firebaseui-form-actions">' + Wj() + '</div>' : '') +
        '</div></div>';
      return B(a);
    }
    bl.a = 'firebaseui.auth.soy2.page.revertSecondFactorAdditionFailure';
    function cl(a) {
      const b = a.zb;
      a =
        '<div class="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-recoverable-error"><div class="firebaseui-card-header"><h1 class="firebaseui-title">Une erreur s\'est produite</h1></div><div class="firebaseui-card-content"><p class="firebaseui-text">' +
        A(a.errorMessage) +
        '</p></div><div class="firebaseui-card-actions"><div class="firebaseui-form-actions">';
      b && (a += Tj({ label: D('R\u00e9essayer') }));
      return B(a + '</div></div></div>');
    }
    cl.a = 'firebaseui.auth.soy2.page.recoverableError';
    function dl(a) {
      a =
        '<div class="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-unrecoverable-error"><div class="firebaseui-card-header"><h1 class="firebaseui-title">Une erreur s\'est produite</h1></div><div class="firebaseui-card-content"><p class="firebaseui-text">' +
        A(a.errorMessage) +
        '</p></div></div>';
      return B(a);
    }
    dl.a = 'firebaseui.auth.soy2.page.unrecoverableError';
    function el(a, b, c) {
      let d = a.Qb;
      b = '';
      a = "Souhaitez-vous continuer avec l'adresse " + (A(a.jc) + '\u00a0?');
      d = "Initialement, vous souhaitiez vous connecter avec l'adresse " + A(d);
      b +=
        '<div class="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-email-mismatch"><form onsubmit="return false;"><div class="firebaseui-card-header"><h1 class="firebaseui-title">Se connecter</h1></div><div class="firebaseui-card-content"><h2 class="firebaseui-subtitle">' +
        a +
        '</h2><p class="firebaseui-text">' +
        d +
        '</p></div><div class="firebaseui-card-actions"><div class="firebaseui-form-actions">' +
        ak(null) +
        Tj({ label: D('Continuer') }) +
        '</div></div><div class="firebaseui-card-footer">' +
        bk(c) +
        '</div></form></div>';
      return B(b);
    }
    el.a = 'firebaseui.auth.soy2.page.emailMismatch';
    function fl(a, b, c) {
      let d =
        '<div class="firebaseui-container firebaseui-page-provider-sign-in firebaseui-id-page-provider-sign-in firebaseui-use-spinner"><div class="firebaseui-card-content"><form onsubmit="return false;"><ul class="firebaseui-idp-list">';
      a = a.Sb;
      b = a.length;
      for (let e = 0; e < b; e++) {
        let f = { ga: a[e] };
        const g = c;
        f = f || {};
        let h = f.ga;
        let k = f;
        k = k || {};
        let p = '';
        switch (k.ga.providerId) {
          case 'google.com':
            p += 'firebaseui-idp-google';
            break;
          case 'github.com':
            p += 'firebaseui-idp-github';
            break;
          case 'facebook.com':
            p += 'firebaseui-idp-facebook';
            break;
          case 'twitter.com':
            p += 'firebaseui-idp-twitter';
            break;
          case 'phone':
            p += 'firebaseui-idp-phone';
            break;
          case 'anonymous':
            p += 'firebaseui-idp-anonymous';
            break;
          case 'password':
            p += 'firebaseui-idp-password';
            break;
          default:
            p += 'firebaseui-idp-generic';
        }
        k =
          '<button class="firebaseui-idp-button mdl-button mdl-js-button mdl-button--raised ' +
          ud(C(p)) +
          ' firebaseui-id-idp-button" data-provider-id="' +
          ud(h.providerId) +
          '" style="background-color:';
        p = (p = f) || {};
        p = p.ga;
        k =
          k +
          ud(
            Dd(
              C(
                p.ta
                  ? p.ta
                  : g.wa[p.providerId]
                  ? '' + g.wa[p.providerId]
                  : p.providerId.indexOf('saml.') == 0
                  ? '' + g.wa.saml
                  : p.providerId.indexOf('oidc.') == 0
                  ? '' + g.wa.oidc
                  : '' + g.wa.password
              )
            )
          ) +
          '"><span class="firebaseui-idp-icon-wrapper"><img class="firebaseui-idp-icon" alt="" src="';
        let t = f;
        p = g;
        t = t || {};
        t = t.ga;
        p = rd(
          t.za
            ? zd(t.za)
            : p.xa[t.providerId]
            ? zd(p.xa[t.providerId])
            : t.providerId.indexOf('saml.') == 0
            ? zd(p.xa.saml)
            : t.providerId.indexOf('oidc.') == 0
            ? zd(p.xa.oidc)
            : zd(p.xa.password)
        );
        k = k + ud(zd(p)) + '"></span>';
        h.providerId == 'password'
          ? ((k += '<span class="firebaseui-idp-text firebaseui-idp-text-long">'),
            h.V
              ? (k += A(h.V))
              : h.S
              ? ((f = 'Se connecter avec ' + A(ik(f, g))), (k += f))
              : (k += 'Se connecter avec une adresse e-mail'),
            (k += '</span><span class="firebaseui-idp-text firebaseui-idp-text-short">'),
            (k = h.S ? k + A(h.S) : k + 'E-mail'),
            (k += '</span>'))
          : h.providerId == 'phone'
          ? ((k += '<span class="firebaseui-idp-text firebaseui-idp-text-long">'),
            h.V
              ? (k += A(h.V))
              : h.S
              ? ((f = 'Se connecter avec ' + A(ik(f, g))), (k += f))
              : (k += 'Se connecter avec un t\u00e9l\u00e9phone'),
            (k += '</span><span class="firebaseui-idp-text firebaseui-idp-text-short">'),
            (k = h.S ? k + A(h.S) : k + 'T\u00e9l\u00e9phone'),
            (k += '</span>'))
          : h.providerId == 'anonymous'
          ? ((k += '<span class="firebaseui-idp-text firebaseui-idp-text-long">'),
            h.V
              ? (k += A(h.V))
              : h.S
              ? ((f = 'Se connecter avec ' + A(ik(f, g))), (k += f))
              : (k += "Continuer en tant qu'invit\u00e9"),
            (k += '</span><span class="firebaseui-idp-text firebaseui-idp-text-short">'),
            (k = h.S ? k + A(h.S) : k + 'Invit\u00e9'),
            (k += '</span>'))
          : ((k += '<span class="firebaseui-idp-text firebaseui-idp-text-long">'),
            h.V ? (k += A(h.V)) : ((p = 'Se connecter avec ' + A(ik(f, g))), (k += p)),
            (k +=
              '</span><span class="firebaseui-idp-text firebaseui-idp-text-short">' +
              (h.S ? A(h.S) : A(ik(f, g))) +
              '</span>'));
        h = B(k + '</button>');
        d += '<li class="firebaseui-list-item">' + h + '</li>';
      }
      d +=
        '</ul></form></div><div class="firebaseui-card-footer firebaseui-provider-sign-in-footer">' +
        ck(c) +
        '</div></div>';
      return B(d);
    }
    fl.a = 'firebaseui.auth.soy2.page.providerSignIn';
    function gl(a, b, c) {
      a = a || {};
      const d = a.Gb;
      const e = a.Va;
      b = a.ia;
      a = a || {};
      a = a.Aa;
      a =
        '<div class="firebaseui-phone-number"><button class="firebaseui-id-country-selector firebaseui-country-selector mdl-button mdl-js-button"><span class="firebaseui-flag firebaseui-country-selector-flag firebaseui-id-country-selector-flag"></span><span class="firebaseui-id-country-selector-code"></span></button><div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label firebaseui-textfield firebaseui-phone-input-wrapper"><label class="mdl-textfield__label firebaseui-label" for="ui-sign-in-phone-number-input">Num\u00e9ro de t\u00e9l\u00e9phone</label><input type="tel" name="phoneNumber" id="ui-sign-in-phone-number-input" class="mdl-textfield__input firebaseui-input firebaseui-id-phone-number" value="' +
        ud(a != null ? a : '') +
        '"></div></div><div class="firebaseui-error-wrapper"><p class="firebaseui-error firebaseui-text-input-error firebaseui-hidden firebaseui-phone-number-error firebaseui-id-phone-number-error"></p></div>';
      a =
        '<div class="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-phone-sign-in-start"><form onsubmit="return false;"><div class="firebaseui-card-header"><h1 class="firebaseui-title">Saisissez votre num\u00e9ro de t\u00e9l\u00e9phone</h1></div><div class="firebaseui-card-content"><div class="firebaseui-relative-wrapper">' +
        B(a);
      let f;
      d
        ? (f = B(
            '<div class="firebaseui-recaptcha-wrapper"><div class="firebaseui-recaptcha-container"></div><div class="firebaseui-error-wrapper firebaseui-recaptcha-error-wrapper"><p class="firebaseui-error firebaseui-hidden firebaseui-id-recaptcha-error"></p></div></div>'
          ))
        : (f = '');
      f =
        a +
        f +
        '</div></div><div class="firebaseui-card-actions"><div class="firebaseui-form-actions">' +
        (e ? ak(null) : '') +
        Tj({ label: D('Valider') }) +
        '</div></div><div class="firebaseui-card-footer">';
      b
        ? ((b = '<p class="firebaseui-tos firebaseui-phone-tos">'),
          (b =
            c.F && c.D
              ? b +
                'En appuyant sur "Valider", vous acceptez les <a href="javascript:void(0)" class="firebaseui-link firebaseui-tos-link" target="_blank">Conditions d\'utilisation</a> et les <a href="javascript:void(0)" class="firebaseui-link firebaseui-pp-link" target="_blank">R\u00e8gles de confidentialit\u00e9</a>. Vous d\u00e9clencherez peut-\u00eatre l\'envoi d\'un SMS. Des frais de messages et de donn\u00e9es peuvent \u00eatre factur\u00e9s.'
              : b +
                'En appuyant sur "Valider", vous d\u00e9clencherez peut-\u00eatre l\'envoi d\'un SMS. Des frais de messages et de donn\u00e9es peuvent \u00eatre factur\u00e9s.'),
          (c = B(b + '</p>')))
        : (c =
            B(
              '<p class="firebaseui-tos firebaseui-phone-sms-notice">En appuyant sur "Valider", vous d\u00e9clencherez peut-\u00eatre l\'envoi d\'un SMS. Des frais de messages et de donn\u00e9es peuvent \u00eatre factur\u00e9s.</p>'
            ) + bk(c));
      return B(f + c + '</div></form></div>');
    }
    gl.a = 'firebaseui.auth.soy2.page.phoneSignInStart';
    function hl(a, b, c) {
      a = a || {};
      b = a.phoneNumber;
      let d = '';
      a =
        'Saisissez le code \u00e0 six\u00a0chiffres envoy\u00e9 au <a class="firebaseui-link firebaseui-change-phone-number-link firebaseui-id-change-phone-number-link" href="javascript:void(0)">&lrm;' +
        (A(b) + '</a>');
      A(b);
      b = d;
      d = B(
        '<div class="firebaseui-textfield mdl-textfield mdl-js-textfield mdl-textfield--floating-label"><label class="mdl-textfield__label firebaseui-label" for="ui-sign-in-phone-confirmation-code-input">Code \u00e0 six\u00a0chiffres</label><input type="number" name="phoneConfirmationCode" id="ui-sign-in-phone-confirmation-code-input" class="mdl-textfield__input firebaseui-input firebaseui-id-phone-confirmation-code"></div><div class="firebaseui-error-wrapper"><p class="firebaseui-error firebaseui-text-input-error firebaseui-hidden firebaseui-id-phone-confirmation-code-error"></p></div>'
      );
      c =
        '<div class="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-phone-sign-in-finish"><form onsubmit="return false;"><div class="firebaseui-card-header"><h1 class="firebaseui-title">Validez votre num\u00e9ro de t\u00e9l\u00e9phone</h1></div><div class="firebaseui-card-content"><p class="firebaseui-text">' +
        a +
        '</p>' +
        d +
        '</div><div class="firebaseui-card-actions"><div class="firebaseui-form-actions">' +
        ak(null) +
        Tj({ label: D('Continuer') }) +
        '</div></div><div class="firebaseui-card-footer">' +
        bk(c) +
        '</div></form>';
      a = B(
        '<div class="firebaseui-resend-container"><span class="firebaseui-id-resend-countdown"></span><a href="javascript:void(0)" class="firebaseui-id-resend-link firebaseui-hidden firebaseui-link">Renvoyer</a></div>'
      );
      return B(b + (c + a + '</div>'));
    }
    hl.a = 'firebaseui.auth.soy2.page.phoneSignInFinish';
    function il() {
      return B(
        '<div class="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-sign-out"><div class="firebaseui-card-header"><h1 class="firebaseui-title">Se d\u00e9connecter</h1></div><div class="firebaseui-card-content"><p class="firebaseui-text">Vous avez bien \u00e9t\u00e9 d\u00e9connect\u00e9.</p></div></div>'
      );
    }
    il.a = 'firebaseui.auth.soy2.page.signOut';
    function jl(a, b, c) {
      let d =
        '<div class="firebaseui-container firebaseui-page-select-tenant firebaseui-id-page-select-tenant"><div class="firebaseui-card-content"><form onsubmit="return false;"><ul class="firebaseui-tenant-list">';
      a = a.ec;
      b = a.length;
      for (let e = 0; e < b; e++) {
        let f = a[e];
        let g = '';
        const h = A(f.displayName);
        let k = f.tenantId ? f.tenantId : 'top-level-project';
        k = D(k);
        g +=
          '<button class="firebaseui-tenant-button mdl-button mdl-js-button mdl-button--raised firebaseui-tenant-selection-' +
          ud(k) +
          ' firebaseui-id-tenant-selection-button"' +
          (f.tenantId ? 'data-tenant-id="' + ud(f.tenantId) + '"' : '') +
          'style="background-color:' +
          ud(Dd(f.ta)) +
          '"><span class="firebaseui-idp-icon-wrapper"><img class="firebaseui-idp-icon" alt="" src="' +
          ud(zd(f.za)) +
          '"></span><span class="firebaseui-idp-text firebaseui-idp-text-long">';
        f.V ? (g += A(f.V)) : ((f = 'Se connecter \u00e0 ' + A(f.displayName)), (g += f));
        g = B(
          g +
            ('</span><span class="firebaseui-idp-text firebaseui-idp-text-short">' +
              h +
              '</span></button>')
        );
        d += '<li class="firebaseui-list-item">' + g + '</li>';
      }
      d +=
        '</ul></form></div><div class="firebaseui-card-footer firebaseui-provider-sign-in-footer">' +
        ck(c) +
        '</div></div>';
      return B(d);
    }
    jl.a = 'firebaseui.auth.soy2.page.selectTenant';
    function kl(a, b, c) {
      a =
        '<div class="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-provider-match-by-email"><form onsubmit="return false;"><div class="firebaseui-card-header"><h1 class="firebaseui-title">Se connecter</h1></div><div class="firebaseui-card-content"><div class="firebaseui-relative-wrapper">' +
        Sj(null) +
        '</div></div><div class="firebaseui-card-actions"><div class="firebaseui-form-actions">' +
        Tj(null) +
        '</div></div><div class="firebaseui-card-footer">' +
        ck(c) +
        '</div></form></div>';
      return B(a);
    }
    kl.a = 'firebaseui.auth.soy2.page.providerMatchByEmail';
    function ll() {
      return M(this, 'firebaseui-id-submit');
    }
    function ml() {
      return M(this, 'firebaseui-id-secondary-link');
    }
    function nl(a, b) {
      O(this, ll.call(this), function (d) {
        a(d);
      });
      const c = ml.call(this);
      c &&
        b &&
        O(this, c, function (d) {
          b(d);
        });
    }
    function ol() {
      return M(this, 'firebaseui-id-password');
    }
    function pl() {
      return M(this, 'firebaseui-id-password-error');
    }
    function ql() {
      const a = ol.call(this);
      const b = pl.call(this);
      Lj(this, a, function () {
        Rj(b) && (N(a, !0), Pj(b));
      });
    }
    function rl() {
      const a = ol.call(this);
      let b = pl.call(this);
      Yi(a) ? (N(a, !0), Pj(b), (b = !0)) : (N(a, !1), Qj(b, Jd().toString()), (b = !1));
      return b ? Yi(a) : null;
    }
    function sl(a, b, c, d, e, f) {
      P.call(this, Lk, { email: a }, f, 'passwordLinking', { F: d, D: e });
      this.w = b;
      this.H = c;
    }
    m(sl, P);
    sl.prototype.v = function () {
      this.P();
      this.M(this.w, this.H);
      xk(this, this.i(), this.w);
      this.i().focus();
      P.prototype.v.call(this);
    };
    sl.prototype.o = function () {
      this.w = null;
      P.prototype.o.call(this);
    };
    sl.prototype.j = function () {
      return Yi(M(this, 'firebaseui-id-email'));
    };
    u(sl.prototype, { i: ol, B: pl, P: ql, u: rl, ea: ll, ba: ml, M: nl });
    const tl = /^[+a-zA-Z0-9_.!#$%&'*\/=?^`{|}~-]+@([a-zA-Z0-9-]+\.)+[a-zA-Z0-9]{2,63}$/;
    function ul() {
      return M(this, 'firebaseui-id-email');
    }
    function vl() {
      return M(this, 'firebaseui-id-email-error');
    }
    function wl(a) {
      const b = ul.call(this);
      const c = vl.call(this);
      Lj(this, b, function () {
        Rj(c) && (N(b, !0), Pj(c));
      });
      a &&
        Mj(this, b, function () {
          a();
        });
    }
    function xl() {
      return Ua(Yi(ul.call(this)) || '');
    }
    function yl() {
      const a = ul.call(this);
      let b = vl.call(this);
      const c = Yi(a) || '';
      c
        ? tl.test(c)
          ? (N(a, !0), Pj(b), (b = !0))
          : (N(a, !1), Qj(b, C("Cette adresse e-mail n'est pas valide").toString()), (b = !1))
        : (N(a, !1),
          Qj(b, C('Saisissez votre adresse e-mail pour continuer').toString()),
          (b = !1));
      return b ? Ua(Yi(a)) : null;
    }
    function zl(a, b, c, d, e, f, g) {
      P.call(this, zk, { email: c, ia: !!f }, g, 'passwordSignIn', { F: d, D: e });
      this.w = a;
      this.H = b;
    }
    m(zl, P);
    zl.prototype.v = function () {
      this.P();
      this.ea();
      this.ba(this.w, this.H);
      wk(this, this.l(), this.i());
      xk(this, this.i(), this.w);
      Yi(this.l()) ? this.i().focus() : this.l().focus();
      P.prototype.v.call(this);
    };
    zl.prototype.o = function () {
      this.H = this.w = null;
      P.prototype.o.call(this);
    };
    u(zl.prototype, {
      l: ul,
      U: vl,
      P: wl,
      M: xl,
      j: yl,
      i: ol,
      B: pl,
      ea: ql,
      u: rl,
      ua: ll,
      pa: ml,
      ba: nl
    });
    function R(a, b, c, d, e, f) {
      P.call(this, a, b, d, e || 'notice', f);
      this.i = c || null;
    }
    w(R, P);
    R.prototype.v = function () {
      this.i && (this.u(this.i), this.l().focus());
      R.K.v.call(this);
    };
    R.prototype.o = function () {
      this.i = null;
      R.K.o.call(this);
    };
    u(R.prototype, { l: ll, w: ml, u: nl });
    function Al(a, b, c, d, e) {
      R.call(this, Ck, { email: a, G: !!b }, b, e, 'passwordRecoveryEmailSent', { F: c, D: d });
    }
    w(Al, R);
    function Bl(a, b) {
      R.call(this, Wk, { G: !!a }, a, b, 'emailVerificationSuccess');
    }
    w(Bl, R);
    function Cl(a, b) {
      R.call(this, Xk, { G: !!a }, a, b, 'emailVerificationFailure');
    }
    w(Cl, R);
    function Dl(a, b, c) {
      R.call(this, Zk, { email: a, G: !!b }, b, c, 'verifyAndChangeEmailSuccess');
    }
    w(Dl, R);
    function El(a, b) {
      R.call(this, $k, { G: !!a }, a, b, 'verifyAndChangeEmailFailure');
    }
    w(El, R);
    function Fl(a, b) {
      R.call(this, bl, { G: !!a }, a, b, 'revertSecondFactorAdditionFailure');
    }
    w(Fl, R);
    function Gl(a) {
      R.call(this, il, void 0, void 0, a, 'signOut');
    }
    w(Gl, R);
    function Hl(a, b) {
      R.call(this, Sk, { G: !!a }, a, b, 'passwordResetSuccess');
    }
    w(Hl, R);
    function Il(a, b) {
      R.call(this, Tk, { G: !!a }, a, b, 'passwordResetFailure');
    }
    w(Il, R);
    function Jl(a, b) {
      R.call(this, Vk, { G: !!a }, a, b, 'emailChangeRevokeFailure');
    }
    w(Jl, R);
    function Kl(a, b, c) {
      R.call(this, cl, { errorMessage: a, zb: !!b }, b, c, 'recoverableError');
    }
    w(Kl, R);
    function Ll(a, b) {
      R.call(this, dl, { errorMessage: a }, void 0, b, 'unrecoverableError');
    }
    w(Ll, R);
    function Ml(a) {
      if (
        a.code === 'auth/invalid-credential' &&
        a.message &&
        a.message.indexOf('error=consent_required') !== -1
      )
        return { code: 'auth/user-cancelled' };
      if (a.message && a.message.indexOf('HTTP Cloud Function returned an error:') !== -1) {
        const b = JSON.parse(
          a.message.substring(a.message.indexOf('{'), a.message.lastIndexOf('}') + 1)
        );
        return { code: a.code, message: (b && b.error && b.error.message) || a.message };
      }
      return a;
    }
    function Nl(a, b, c, d) {
      function e(g) {
        if (!g.name || g.name != 'cancel') {
          a: {
            const h = g.message;
            try {
              const k = ((JSON.parse(h).error || {}).message || '')
                .toLowerCase()
                .match(/invalid.+(access|id)_token/);
              if (k && k.length) {
                var p = !0;
                break a;
              }
            } catch (t) {}
            p = !1;
          }
          if (p)
            (g = Q(b)),
              b.m(),
              S(
                a,
                g,
                void 0,
                C('Votre session de connexion a expir\u00e9. Veuillez r\u00e9essayer.').toString()
              );
          else {
            p = (g && g.message) || '';
            if (g.code) {
              if (
                g.code == 'auth/email-already-in-use' ||
                g.code == 'auth/credential-already-in-use'
              )
                return;
              p = T(g);
            }
            b.a(p);
          }
        }
      }
      Ol(a);
      if (d) return Pl(a, c), F();
      if (!c.credential) throw Error('No credential found!');
      if (!U(a).currentUser && !c.user) throw Error('User not logged in.');
      try {
        var f = Ql(a, c);
      } catch (g) {
        return qg(g.code || g.message, g), b.a(g.code || g.message), F();
      }
      c = f
        .then(function (g) {
          Pl(a, g);
        }, e)
        .then(void 0, e);
      V(a, f);
      return F(c);
    }
    function Pl(a, b) {
      if (!b.user) throw Error('No user found');
      let c = Oi(W(a));
      Mi(W(a)) &&
        c &&
        vg(
          'Both signInSuccess and signInSuccessWithAuthResult callbacks are provided. Only signInSuccessWithAuthResult callback will be invoked.'
        );
      if (c) {
        c = Oi(W(a));
        var d = Ah(X(a)) || void 0;
        yh(uh, X(a));
        var e = !1;
        if (sf()) {
          if (!c || c(b, d)) (e = !0), Nc(window.opener.location, Rl(a, d));
          c || window.close();
        } else if (!c || c(b, d)) (e = !0), Nc(window.location, Rl(a, d));
        e || a.reset();
      } else {
        c = b.user;
        b = b.credential;
        d = Mi(W(a));
        e = Ah(X(a)) || void 0;
        yh(uh, X(a));
        let f = !1;
        if (sf()) {
          if (!d || d(c, b, e)) (f = !0), Nc(window.opener.location, Rl(a, e));
          d || window.close();
        } else if (!d || d(c, b, e)) (f = !0), Nc(window.location, Rl(a, e));
        f || a.reset();
      }
    }
    function Rl(a, b) {
      a = b || W(a).a.get('signInSuccessUrl');
      if (!a)
        throw Error(
          'No redirect URL has been found. You must either specify a signInSuccessUrl in the configuration, pass in a redirect URL to the widget URL, or return false from the callback.'
        );
      return a;
    }
    function T(a) {
      let b = { code: a.code };
      b = b || {};
      let c = '';
      switch (b.code) {
        case 'auth/email-already-in-use':
          c += "L'adresse e-mail est d\u00e9j\u00e0 utilis\u00e9e par un autre compte";
          break;
        case 'auth/requires-recent-login':
          c += Od();
          break;
        case 'auth/too-many-requests':
          c +=
            'Vous avez saisi un mot de passe incorrect un trop grand nombre de fois. Veuillez r\u00e9essayer dans quelques minutes.';
          break;
        case 'auth/user-cancelled':
          c +=
            "Veuillez accorder les autorisations n\u00e9cessaires pour vous connecter \u00e0 l'application";
          break;
        case 'auth/user-not-found':
          c += 'Cette adresse e-mail ne correspond \u00e0 aucun compte existant';
          break;
        case 'auth/user-token-expired':
          c += Od();
          break;
        case 'auth/weak-password':
          c +=
            'Les mots de passe s\u00e9curis\u00e9s comportent au moins six\u00a0caract\u00e8res et une combinaison de chiffres et de lettres';
          break;
        case 'auth/wrong-password':
          c += "L'adresse e-mail et le mot de passe saisis ne correspondent pas";
          break;
        case 'auth/network-request-failed':
          c += "Une erreur r\u00e9seau s'est produite";
          break;
        case 'auth/invalid-phone-number':
          c += Hd();
          break;
        case 'auth/invalid-verification-code':
          c += Id();
          break;
        case 'auth/code-expired':
          c += "Ce code n'est plus valide";
          break;
        case 'auth/expired-action-code':
          c += 'Ce code a expir\u00e9.';
          break;
        case 'auth/invalid-action-code':
          c +=
            "Le code d'action n'est pas valide. Ce probl\u00e8me peut survenir si le code est incorrect, s'il est arriv\u00e9 \u00e0 expiration ou s'il a d\u00e9j\u00e0 \u00e9t\u00e9 utilis\u00e9.";
      }
      if ((b = C(c).toString())) return b;
      try {
        return JSON.parse(a.message), qg('Internal error: ' + a.message, void 0), Ld().toString();
      } catch (d) {
        return a.message;
      }
    }
    function Sl(a, b, c) {
      const d =
        ci[b] && firebase.auth[ci[b]]
          ? new firebase.auth[ci[b]]()
          : b.indexOf('saml.') == 0
          ? new firebase.auth.SAMLAuthProvider(b)
          : new firebase.auth.OAuthProvider(b);
      if (!d) throw Error('Invalid Firebase Auth provider!');
      let e = yi(W(a), b);
      if (d.addScope) for (let f = 0; f < e.length; f++) d.addScope(e[f]);
      e = zi(W(a), b) || {};
      c &&
        (b == firebase.auth.GoogleAuthProvider.PROVIDER_ID
          ? (a = 'login_hint')
          : b == firebase.auth.GithubAuthProvider.PROVIDER_ID
          ? (a = 'login')
          : (a = (a = ki(W(a), b)) && a.Ob),
        a && (e[a] = c));
      d.setCustomParameters && d.setCustomParameters(e);
      return d;
    }
    function Tl(a, b, c, d) {
      function e() {
        Fh(new Fg(a.h.tenantId || null), X(a));
        V(
          a,
          b.I(
            r(a.dc, a),
            [k],
            function () {
              if ((window.location && window.location.protocol) === 'file:')
                return V(
                  a,
                  Ul(a).then(function (p) {
                    b.m();
                    yh(th, X(a));
                    L('callback', a, h, F(p));
                  }, f)
                );
            },
            g
          )
        );
      }
      function f(p) {
        yh(th, X(a));
        if (!p.name || p.name != 'cancel')
          switch (((p = Ml(p)), p.code)) {
            case 'auth/popup-blocked':
              e();
              break;
            case 'auth/popup-closed-by-user':
            case 'auth/cancelled-popup-request':
              break;
            case 'auth/credential-already-in-use':
              break;
            case 'auth/network-request-failed':
            case 'auth/too-many-requests':
            case 'auth/user-cancelled':
              b.a(T(p));
              break;
            case 'auth/admin-restricted-operation':
              b.m();
              ri(W(a)) ? L('handleUnauthorizedUser', a, h, null, c) : L('callback', a, h, ff(p));
              break;
            default:
              b.m(), L('callback', a, h, ff(p));
          }
      }
      function g(p) {
        yh(th, X(a));
        (p.name && p.name == 'cancel') ||
          (qg('signInWithRedirect: ' + p.code, void 0),
          (p = T(p)),
          b.Ga == 'blank' && Ii(W(a)) ? (b.m(), L('providerSignIn', a, h, p)) : b.a(p));
      }
      var h = Q(b);
      var k = Sl(a, c, d);
      Ji(W(a)) == Ki
        ? e()
        : V(
            a,
            Vl(a, k).then(function (p) {
              b.m();
              L('callback', a, h, F(p));
            }, f)
          );
    }
    function Wl(a, b) {
      V(
        a,
        b.I(
          r(a.$b, a),
          [],
          function (c) {
            b.m();
            return Nl(a, b, c, !0);
          },
          function (c) {
            (c.name && c.name == 'cancel') ||
              (qg('ContinueAsGuest: ' + c.code, void 0), (c = T(c)), b.a(c));
          }
        )
      );
    }
    function Xl(a, b, c) {
      function d(f) {
        let g = !1;
        f = b.I(
          r(a.ac, a),
          [f],
          function (h) {
            const k = Q(b);
            b.m();
            L('callback', a, k, F(h));
            g = !0;
          },
          function (h) {
            if (!h.name || h.name != 'cancel')
              if (!h || h.code != 'auth/credential-already-in-use')
                if (h && h.code == 'auth/email-already-in-use' && h.email && h.credential) {
                  const k = Q(b);
                  b.m();
                  L('callback', a, k, ff(h));
                } else
                  h && h.code == 'auth/admin-restricted-operation' && ri(W(a))
                    ? ((h = Q(b)),
                      b.m(),
                      L(
                        'handleUnauthorizedUser',
                        a,
                        h,
                        null,
                        firebase.auth.GoogleAuthProvider.PROVIDER_ID
                      ))
                    : ((h = T(h)), b.a(h));
          }
        );
        V(a, f);
        return f.then(
          function () {
            return g;
          },
          function () {
            return !1;
          }
        );
      }
      if (c && c.credential && c.clientId === ni(W(a))) {
        if (yi(W(a), firebase.auth.GoogleAuthProvider.PROVIDER_ID).length) {
          try {
            var e = JSON.parse(atob(c.credential.split('.')[1])).email;
          } catch (f) {}
          Tl(a, b, firebase.auth.GoogleAuthProvider.PROVIDER_ID, e);
          return F(!0);
        }
        return d(firebase.auth.GoogleAuthProvider.credential(c.credential));
      }
      c &&
        b.a(
          C(
            "Les identifiants s\u00e9lectionn\u00e9s pour le fournisseur d'authentification ne sont pas compatibles."
          ).toString()
        );
      return F(!1);
    }
    function Yl(a, b) {
      const c = b.j();
      const d = b.u();
      if (c)
        if (d) {
          const e = firebase.auth.EmailAuthProvider.credential(c, d);
          V(
            a,
            b.I(
              r(a.bc, a),
              [c, d],
              function (f) {
                return Nl(a, b, {
                  user: f.user,
                  credential: e,
                  operationType: f.operationType,
                  additionalUserInfo: f.additionalUserInfo
                });
              },
              function (f) {
                if (!f.name || f.name != 'cancel')
                  switch (f.code) {
                    case 'auth/email-already-in-use':
                      break;
                    case 'auth/email-exists':
                      N(b.l(), !1);
                      Qj(b.U(), T(f));
                      break;
                    case 'auth/too-many-requests':
                    case 'auth/wrong-password':
                      N(b.i(), !1);
                      Qj(b.B(), T(f));
                      break;
                    default:
                      qg('verifyPassword: ' + f.message, void 0), b.a(T(f));
                  }
              }
            )
          );
        } else b.i().focus();
      else b.l().focus();
    }
    function Zl(a) {
      a = ji(W(a));
      return a.length == 1 && a[0] == firebase.auth.EmailAuthProvider.PROVIDER_ID;
    }
    function $l(a) {
      a = ji(W(a));
      return a.length == 1 && a[0] == firebase.auth.PhoneAuthProvider.PROVIDER_ID;
    }
    function S(a, b, c, d) {
      Zl(a)
        ? d
          ? L('signIn', a, b, c, d)
          : am(a, b, c)
        : a && $l(a) && !d
        ? L('phoneSignInStart', a, b)
        : a && Ii(W(a)) && !d
        ? L('federatedRedirect', a, b, c)
        : L('providerSignIn', a, b, d, c);
    }
    function bm(a, b, c, d) {
      const e = Q(b);
      V(
        a,
        b.I(
          r(U(a).fetchSignInMethodsForEmail, U(a)),
          [c],
          function (f) {
            b.m();
            cm(a, e, f, c, d);
          },
          function (f) {
            f = T(f);
            b.a(f);
          }
        )
      );
    }
    function cm(a, b, c, d, e, f) {
      c.length || (Fi(W(a)) && !Fi(W(a)))
        ? Ma(c, firebase.auth.EmailAuthProvider.EMAIL_PASSWORD_SIGN_IN_METHOD)
          ? L('passwordSignIn', a, b, d, f)
          : c.length == 1 && c[0] === firebase.auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD
          ? Fi(W(a))
            ? L('sendEmailLinkForSignIn', a, b, d, function () {
                L('signIn', a, b);
              })
            : L('unsupportedProvider', a, b, d)
          : (c = ai(c, ji(W(a))))
          ? (Dh(new Cg(d), X(a)), L('federatedSignIn', a, b, d, c, e))
          : L('unsupportedProvider', a, b, d)
        : qi(W(a))
        ? L('handleUnauthorizedUser', a, b, d, firebase.auth.EmailAuthProvider.PROVIDER_ID)
        : Fi(W(a))
        ? L('sendEmailLinkForSignIn', a, b, d, function () {
            L('signIn', a, b);
          })
        : L('passwordSignUp', a, b, d, void 0, void 0, f);
    }
    function dm(a, b, c, d, e, f) {
      const g = Q(b);
      V(
        a,
        b.I(
          r(a.Ib, a),
          [c, f],
          function () {
            b.m();
            L('emailLinkSignInSent', a, g, c, d, f);
          },
          e
        )
      );
    }
    function am(a, b, c) {
      c ? L('prefilledEmailSignIn', a, b, c) : L('signIn', a, b);
    }
    function em() {
      return tb(vf(), 'oobCode');
    }
    function fm() {
      const a = tb(vf(), 'continueUrl');
      return a
        ? function () {
            Nc(window.location, a);
          }
        : null;
    }
    function gm(a, b) {
      P.call(this, Kk, void 0, b, 'anonymousUserMismatch');
      this.i = a;
    }
    m(gm, P);
    gm.prototype.v = function () {
      const a = this;
      O(this, this.l(), function () {
        a.i();
      });
      this.l().focus();
      P.prototype.v.call(this);
    };
    gm.prototype.o = function () {
      this.i = null;
      P.prototype.o.call(this);
    };
    u(gm.prototype, { l: ml });
    K.anonymousUserMismatch = function (a, b) {
      var c = new gm(function () {
        c.m();
        S(a, b);
      });
      c.render(b);
      Y(a, c);
    };
    function hm(a) {
      P.call(this, Dk, void 0, a, 'callback');
    }
    m(hm, P);
    hm.prototype.I = function (a, b, c, d) {
      return a.apply(null, b).then(c, d);
    };
    function im(a, b, c) {
      if (c.user) {
        let d = {
          user: c.user,
          credential: c.credential,
          operationType: c.operationType,
          additionalUserInfo: c.additionalUserInfo
        };
        const e = Bh(X(a));
        const f = e && e.g;
        if (f && !jm(c.user, f)) km(a, b, d);
        else {
          const g = e && e.a;
          g
            ? V(
                a,
                c.user.linkWithCredential(g).then(
                  function (h) {
                    d = {
                      user: h.user,
                      credential: g,
                      operationType: h.operationType,
                      additionalUserInfo: h.additionalUserInfo
                    };
                    lm(a, b, d);
                  },
                  function (h) {
                    mm(a, b, h);
                  }
                )
              )
            : lm(a, b, d);
        }
      } else (c = Q(b)), b.m(), Ch(X(a)), S(a, c);
    }
    function lm(a, b, c) {
      Ch(X(a));
      Nl(a, b, c);
    }
    function mm(a, b, c) {
      const d = Q(b);
      Ch(X(a));
      c = T(c);
      b.m();
      S(a, d, void 0, c);
    }
    function nm(a, b, c, d) {
      const e = Q(b);
      V(
        a,
        U(a)
          .fetchSignInMethodsForEmail(c)
          .then(
            function (f) {
              b.m();
              f.length
                ? Ma(f, firebase.auth.EmailAuthProvider.EMAIL_PASSWORD_SIGN_IN_METHOD)
                  ? L('passwordLinking', a, e, c)
                  : f.length == 1 &&
                    f[0] === firebase.auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD
                  ? L('emailLinkSignInLinking', a, e, c)
                  : (f = ai(f, ji(W(a))))
                  ? L('federatedLinking', a, e, c, f, d)
                  : (Ch(X(a)), L('unsupportedProvider', a, e, c))
                : (Ch(X(a)), L('passwordRecovery', a, e, c, !1, Md().toString()));
            },
            function (f) {
              mm(a, b, f);
            }
          )
      );
    }
    function km(a, b, c) {
      const d = Q(b);
      V(
        a,
        om(a).then(
          function () {
            b.m();
            L('emailMismatch', a, d, c);
          },
          function (e) {
            (e.name && e.name == 'cancel') || ((e = T(e.code)), b.a(e));
          }
        )
      );
    }
    function jm(a, b) {
      if (b == a.email) return !0;
      if (a.providerData)
        for (let c = 0; c < a.providerData.length; c++) if (b == a.providerData[c].email) return !0;
      return !1;
    }
    K.callback = function (a, b, c) {
      const d = new hm();
      d.render(b);
      Y(a, d);
      c = c || Ul(a);
      V(
        a,
        c.then(
          function (e) {
            im(a, d, e);
          },
          function (e) {
            if (
              (e = Ml(e)) &&
              (e.code == 'auth/account-exists-with-different-credential' ||
                e.code == 'auth/email-already-in-use') &&
              e.email &&
              e.credential
            )
              Dh(new Cg(e.email, e.credential), X(a)), nm(a, d, e.email);
            else if (e && e.code == 'auth/user-cancelled') {
              const f = Bh(X(a));
              const g = T(e);
              f && f.a ? nm(a, d, f.g, g) : f ? bm(a, d, f.g, g) : mm(a, d, e);
            } else
              (e && e.code == 'auth/credential-already-in-use') ||
                (e && e.code == 'auth/operation-not-supported-in-this-environment' && Zl(a)
                  ? im(a, d, { user: null, credential: null })
                  : e && e.code == 'auth/admin-restricted-operation' && ri(W(a))
                  ? (d.m(), Ch(X(a)), L('handleUnauthorizedUser', a, b, null, null))
                  : mm(a, d, e));
          }
        )
      );
    };
    function pm(a, b) {
      P.call(this, Jk, void 0, b, 'differentDeviceError');
      this.i = a;
    }
    m(pm, P);
    pm.prototype.v = function () {
      const a = this;
      O(this, this.l(), function () {
        a.i();
      });
      this.l().focus();
      P.prototype.v.call(this);
    };
    pm.prototype.o = function () {
      this.i = null;
      P.prototype.o.call(this);
    };
    u(pm.prototype, { l: ml });
    K.differentDeviceError = function (a, b) {
      var c = new pm(function () {
        c.m();
        S(a, b);
      });
      c.render(b);
      Y(a, c);
    };
    function qm(a, b, c, d) {
      P.call(this, Uk, { email: a, G: !!c }, d, 'emailChangeRevoke');
      this.l = b;
      this.i = c || null;
    }
    m(qm, P);
    qm.prototype.v = function () {
      const a = this;
      O(this, M(this, 'firebaseui-id-reset-password-link'), function () {
        a.l();
      });
      this.i && (this.w(this.i), this.u().focus());
      P.prototype.v.call(this);
    };
    qm.prototype.o = function () {
      this.l = this.i = null;
      P.prototype.o.call(this);
    };
    u(qm.prototype, { u: ll, B: ml, w: nl });
    function rm() {
      return M(this, 'firebaseui-id-new-password');
    }
    function sm() {
      return M(this, 'firebaseui-id-password-toggle');
    }
    function tm() {
      this.Ra = !this.Ra;
      const a = sm.call(this);
      const b = rm.call(this);
      this.Ra
        ? ((b.type = 'text'),
          Wi(a, 'firebaseui-input-toggle-off'),
          Xi(a, 'firebaseui-input-toggle-on'))
        : ((b.type = 'password'),
          Wi(a, 'firebaseui-input-toggle-on'),
          Xi(a, 'firebaseui-input-toggle-off'));
      b.focus();
    }
    function um() {
      return M(this, 'firebaseui-id-new-password-error');
    }
    function vm() {
      this.Ra = !1;
      const a = rm.call(this);
      a.type = 'password';
      const b = um.call(this);
      Lj(this, a, function () {
        Rj(b) && (N(a, !0), Pj(b));
      });
      const c = sm.call(this);
      Wi(c, 'firebaseui-input-toggle-on');
      Xi(c, 'firebaseui-input-toggle-off');
      Nj(this, a, function () {
        Wi(c, 'firebaseui-input-toggle-focus');
        Xi(c, 'firebaseui-input-toggle-blur');
      });
      Oj(this, a, function () {
        Wi(c, 'firebaseui-input-toggle-blur');
        Xi(c, 'firebaseui-input-toggle-focus');
      });
      O(this, c, r(tm, this));
    }
    function wm() {
      const a = rm.call(this);
      let b = um.call(this);
      Yi(a) ? (N(a, !0), Pj(b), (b = !0)) : (N(a, !1), Qj(b, Jd().toString()), (b = !1));
      return b ? Yi(a) : null;
    }
    function xm(a, b, c) {
      P.call(this, Rk, { email: a }, c, 'passwordReset');
      this.l = b;
    }
    m(xm, P);
    xm.prototype.v = function () {
      this.H();
      this.B(this.l);
      xk(this, this.i(), this.l);
      this.i().focus();
      P.prototype.v.call(this);
    };
    xm.prototype.o = function () {
      this.l = null;
      P.prototype.o.call(this);
    };
    u(xm.prototype, { i: rm, w: um, M: sm, H: vm, u: wm, U: ll, P: ml, B: nl });
    function ym(a, b, c, d, e) {
      P.call(
        this,
        al,
        { factorId: a, phoneNumber: c || null, G: !!d },
        e,
        'revertSecondFactorAdditionSuccess'
      );
      this.l = b;
      this.i = d || null;
    }
    m(ym, P);
    ym.prototype.v = function () {
      const a = this;
      O(this, M(this, 'firebaseui-id-reset-password-link'), function () {
        a.l();
      });
      this.i && (this.w(this.i), this.u().focus());
      P.prototype.v.call(this);
    };
    ym.prototype.o = function () {
      this.l = this.i = null;
      P.prototype.o.call(this);
    };
    u(ym.prototype, { u: ll, B: ml, w: nl });
    function zm(a, b, c, d, e) {
      const f = c.u();
      f &&
        V(
          a,
          c.I(
            r(U(a).confirmPasswordReset, U(a)),
            [d, f],
            function () {
              c.m();
              const g = new Hl(e);
              g.render(b);
              Y(a, g);
            },
            function (g) {
              Am(a, b, c, g);
            }
          )
        );
    }
    function Am(a, b, c, d) {
      (d && d.code) == 'auth/weak-password'
        ? ((a = T(d)), N(c.i(), !1), Qj(c.w(), a), c.i().focus())
        : (c && c.m(), (c = new Il()), c.render(b), Y(a, c));
    }
    function Bm(a, b, c) {
      var d = new qm(c, function () {
        V(
          a,
          d.I(
            r(U(a).sendPasswordResetEmail, U(a)),
            [c],
            function () {
              d.m();
              d = new Al(c, void 0, H(W(a)), J(W(a)));
              d.render(b);
              Y(a, d);
            },
            function () {
              d.a(Kd().toString());
            }
          )
        );
      });
      d.render(b);
      Y(a, d);
    }
    function Cm(a, b, c, d) {
      var e = new ym(
        d.factorId,
        function () {
          e.I(
            r(U(a).sendPasswordResetEmail, U(a)),
            [c],
            function () {
              e.m();
              e = new Al(c, void 0, H(W(a)), J(W(a)));
              e.render(b);
              Y(a, e);
            },
            function () {
              e.a(Kd().toString());
            }
          );
        },
        d.phoneNumber
      );
      e.render(b);
      Y(a, e);
    }
    K.passwordReset = function (a, b, c, d) {
      V(
        a,
        U(a)
          .verifyPasswordResetCode(c)
          .then(
            function (e) {
              var f = new xm(e, function () {
                zm(a, b, f, c, d);
              });
              f.render(b);
              Y(a, f);
            },
            function () {
              Am(a, b);
            }
          )
      );
    };
    K.emailChangeRevocation = function (a, b, c) {
      let d = null;
      V(
        a,
        U(a)
          .checkActionCode(c)
          .then(function (e) {
            d = e.data.email;
            return U(a).applyActionCode(c);
          })
          .then(
            function () {
              Bm(a, b, d);
            },
            function () {
              const e = new Jl();
              e.render(b);
              Y(a, e);
            }
          )
      );
    };
    K.emailVerification = function (a, b, c, d) {
      V(
        a,
        U(a)
          .applyActionCode(c)
          .then(
            function () {
              const e = new Bl(d);
              e.render(b);
              Y(a, e);
            },
            function () {
              const e = new Cl();
              e.render(b);
              Y(a, e);
            }
          )
      );
    };
    K.revertSecondFactorAddition = function (a, b, c) {
      let d = null;
      let e = null;
      V(
        a,
        U(a)
          .checkActionCode(c)
          .then(function (f) {
            d = f.data.email;
            e = f.data.multiFactorInfo;
            return U(a).applyActionCode(c);
          })
          .then(
            function () {
              Cm(a, b, d, e);
            },
            function () {
              const f = new Fl();
              f.render(b);
              Y(a, f);
            }
          )
      );
    };
    K.verifyAndChangeEmail = function (a, b, c, d) {
      let e = null;
      V(
        a,
        U(a)
          .checkActionCode(c)
          .then(function (f) {
            e = f.data.email;
            return U(a).applyActionCode(c);
          })
          .then(
            function () {
              const f = new Dl(e, d);
              f.render(b);
              Y(a, f);
            },
            function () {
              const f = new El();
              f.render(b);
              Y(a, f);
            }
          )
      );
    };
    function Dm(a, b) {
      try {
        var c = typeof a.selectionStart === 'number';
      } catch (d) {
        c = !1;
      }
      c
        ? ((a.selectionStart = b), (a.selectionEnd = b))
        : z &&
          !mc('9') &&
          (a.type == 'textarea' &&
            (b = a.value.substring(0, b).replace(/(\r\n|\r|\n)/g, '\n').length),
          (a = a.createTextRange()),
          a.collapse(!0),
          a.move('character', b),
          a.select());
    }
    function Em(a, b, c, d, e, f) {
      P.call(this, Ik, { email: c }, f, 'emailLinkSignInConfirmation', { F: d, D: e });
      this.l = a;
      this.u = b;
    }
    m(Em, P);
    Em.prototype.v = function () {
      this.w(this.l);
      this.B(this.l, this.u);
      this.i().focus();
      Dm(this.i(), (this.i().value || '').length);
      P.prototype.v.call(this);
    };
    Em.prototype.o = function () {
      this.u = this.l = null;
      P.prototype.o.call(this);
    };
    u(Em.prototype, { i: ul, M: vl, w: wl, H: xl, j: yl, U: ll, P: ml, B: nl });
    K.emailLinkConfirmation = function (a, b, c, d, e, f) {
      var g = new Em(
        function () {
          const h = g.j();
          h ? (g.m(), d(a, b, h, c)) : g.i().focus();
        },
        function () {
          g.m();
          S(a, b, e || void 0);
        },
        e || void 0,
        H(W(a)),
        J(W(a))
      );
      g.render(b);
      Y(a, g);
      f && g.a(f);
    };
    function Fm(a, b, c, d, e) {
      P.call(this, Nk, { ga: a }, e, 'emailLinkSignInLinkingDifferentDevice', { F: c, D: d });
      this.i = b;
    }
    m(Fm, P);
    Fm.prototype.v = function () {
      this.u(this.i);
      this.l().focus();
      P.prototype.v.call(this);
    };
    Fm.prototype.o = function () {
      this.i = null;
      P.prototype.o.call(this);
    };
    u(Fm.prototype, { l: ll, u: nl });
    K.emailLinkNewDeviceLinking = function (a, b, c, d) {
      const e = new Pb(c);
      c = e.a.a.get(x.PROVIDER_ID) || null;
      Tb(e, null);
      if (c) {
        var f = new Fm(
          ki(W(a), c),
          function () {
            f.m();
            d(a, b, e.toString());
          },
          H(W(a)),
          J(W(a))
        );
        f.render(b);
        Y(a, f);
      } else S(a, b);
    };
    function Gm(a) {
      P.call(this, Fk, void 0, a, 'blank');
    }
    m(Gm, P);
    function Hm(a, b, c, d, e) {
      const f = new Gm();
      let g = new Pb(c);
      const h = g.a.a.get(x.$a) || '';
      const k = g.a.a.get(x.Sa) || '';
      const p = g.a.a.get(x.Qa) === '1';
      const t = Sb(g);
      const I = g.a.a.get(x.PROVIDER_ID) || null;
      g = g.a.a.get(x.vb) || null;
      Im(a, g);
      const Ca = !xh(vh, X(a));
      const Yk = d || Gh(k, X(a));
      let ld = (d = Hh(k, X(a))) && d.a;
      I && ld && ld.providerId !== I && (ld = null);
      f.render(b);
      Y(a, f);
      V(
        a,
        f.I(
          function () {
            let ya = F(null);
            ya =
              (t && Ca) || (Ca && p)
                ? ff(Error('anonymous-user-not-found'))
                : Jm(a, c).then(function (wg) {
                    if (I && !ld) throw Error('pending-credential-not-found');
                    return wg;
                  });
            let md = null;
            return ya
              .then(function (wg) {
                md = wg;
                return e ? null : U(a).checkActionCode(h);
              })
              .then(function () {
                return md;
              });
          },
          [],
          function (ya) {
            Yk
              ? Km(a, f, Yk, c, ld, ya)
              : p
              ? (f.m(), L('differentDeviceError', a, b))
              : (f.m(), L('emailLinkConfirmation', a, b, c, Lm));
          },
          function (ya) {
            let md = void 0;
            if (!ya || !ya.name || ya.name != 'cancel')
              switch ((f.m(), ya && ya.message)) {
                case 'anonymous-user-not-found':
                  L('differentDeviceError', a, b);
                  break;
                case 'anonymous-user-mismatch':
                  L('anonymousUserMismatch', a, b);
                  break;
                case 'pending-credential-not-found':
                  L('emailLinkNewDeviceLinking', a, b, c, Mm);
                  break;
                default:
                  ya && (md = T(ya)), S(a, b, void 0, md);
              }
          }
        )
      );
    }
    function Lm(a, b, c, d) {
      Hm(a, b, d, c, !0);
    }
    function Mm(a, b, c) {
      Hm(a, b, c);
    }
    function Km(a, b, c, d, e, f) {
      const g = Q(b);
      b.$(
        'mdl-spinner mdl-spinner--single-color mdl-js-spinner is-active firebaseui-progress-dialog-loading-icon',
        C('Connexion\u2026').toString()
      );
      let h = null;
      e = (f ? Nm(a, f, c, d, e) : Om(a, c, d, e)).then(
        function (k) {
          yh(wh, X(a));
          yh(vh, X(a));
          b.h();
          b.$('firebaseui-icon-done', C('Connect\u00e9').toString());
          h = setTimeout(function () {
            b.h();
            Nl(a, b, k, !0);
          }, 1e3);
          V(a, function () {
            b && (b.h(), b.m());
            clearTimeout(h);
          });
        },
        function (k) {
          b.h();
          b.m();
          if (!k.name || k.name != 'cancel') {
            k = Ml(k);
            let p = T(k);
            k.code == 'auth/email-already-in-use' || k.code == 'auth/credential-already-in-use'
              ? (yh(wh, X(a)), yh(vh, X(a)))
              : k.code == 'auth/invalid-email'
              ? ((p = C(
                  "L'adresse e-mail fournie ne correspond pas \u00e0 celle utilis\u00e9e pour la session de connexion en cours."
                ).toString()),
                L('emailLinkConfirmation', a, g, d, Lm, null, p))
              : S(a, g, c, p);
          }
        }
      );
      V(a, e);
    }
    K.emailLinkSignInCallback = Hm;
    function Pm(a, b, c, d, e, f) {
      P.call(this, Mk, { email: a, ga: b }, f, 'emailLinkSignInLinking', { F: d, D: e });
      this.i = c;
    }
    m(Pm, P);
    Pm.prototype.v = function () {
      this.u(this.i);
      this.l().focus();
      P.prototype.v.call(this);
    };
    Pm.prototype.o = function () {
      this.i = null;
      P.prototype.o.call(this);
    };
    u(Pm.prototype, { l: ll, u: nl });
    function Qm(a, b, c, d) {
      const e = Q(b);
      dm(
        a,
        b,
        c,
        function () {
          S(a, e, c);
        },
        function (f) {
          if (!f.name || f.name != 'cancel') {
            const g = T(f);
            f && f.code == 'auth/network-request-failed' ? b.a(g) : (b.m(), S(a, e, c, g));
          }
        },
        d
      );
    }
    K.emailLinkSignInLinking = function (a, b, c) {
      const d = Bh(X(a));
      Ch(X(a));
      if (d) {
        const e = d.a.providerId;
        var f = new Pm(
          c,
          ki(W(a), e),
          function () {
            Qm(a, f, c, d);
          },
          H(W(a)),
          J(W(a))
        );
        f.render(b);
        Y(a, f);
      } else S(a, b);
    };
    function Rm(a, b, c, d, e, f) {
      P.call(this, Gk, { email: a }, f, 'emailLinkSignInSent', { F: d, D: e });
      this.u = b;
      this.i = c;
    }
    m(Rm, P);
    Rm.prototype.v = function () {
      const a = this;
      O(this, this.l(), function () {
        a.i();
      });
      O(this, M(this, 'firebaseui-id-trouble-getting-email-link'), function () {
        a.u();
      });
      this.l().focus();
      P.prototype.v.call(this);
    };
    Rm.prototype.o = function () {
      this.i = this.u = null;
      P.prototype.o.call(this);
    };
    u(Rm.prototype, { l: ml });
    K.emailLinkSignInSent = function (a, b, c, d, e) {
      var f = new Rm(
        c,
        function () {
          f.m();
          L('emailNotReceived', a, b, c, d, e);
        },
        function () {
          f.m();
          d();
        },
        H(W(a)),
        J(W(a))
      );
      f.render(b);
      Y(a, f);
    };
    function Sm(a, b, c, d, e, f, g) {
      P.call(this, el, { jc: a, Qb: b }, g, 'emailMismatch', { F: e, D: f });
      this.l = c;
      this.i = d;
    }
    m(Sm, P);
    Sm.prototype.v = function () {
      this.w(this.l, this.i);
      this.u().focus();
      P.prototype.v.call(this);
    };
    Sm.prototype.o = function () {
      this.i = null;
      P.prototype.o.call(this);
    };
    u(Sm.prototype, { u: ll, B: ml, w: nl });
    K.emailMismatch = function (a, b, c) {
      const d = Bh(X(a));
      if (d) {
        var e = new Sm(
          c.user.email,
          d.g,
          function () {
            const f = e;
            Ch(X(a));
            Nl(a, f, c);
          },
          function () {
            const f = c.credential.providerId;
            const g = Q(e);
            e.m();
            d.a ? L('federatedLinking', a, g, d.g, f) : L('federatedSignIn', a, g, d.g, f);
          },
          H(W(a)),
          J(W(a))
        );
        e.render(b);
        Y(a, e);
      } else S(a, b);
    };
    function Tm(a, b, c, d, e) {
      P.call(this, Hk, void 0, e, 'emailNotReceived', { F: c, D: d });
      this.l = a;
      this.i = b;
    }
    m(Tm, P);
    Tm.prototype.v = function () {
      const a = this;
      O(this, this.u(), function () {
        a.i();
      });
      O(this, this.Da(), function () {
        a.l();
      });
      this.u().focus();
      P.prototype.v.call(this);
    };
    Tm.prototype.Da = function () {
      return M(this, 'firebaseui-id-resend-email-link');
    };
    Tm.prototype.o = function () {
      this.i = this.l = null;
      P.prototype.o.call(this);
    };
    u(Tm.prototype, { u: ml });
    K.emailNotReceived = function (a, b, c, d, e) {
      var f = new Tm(
        function () {
          dm(
            a,
            f,
            c,
            d,
            function (g) {
              g = T(g);
              f.a(g);
            },
            e
          );
        },
        function () {
          f.m();
          S(a, b, c);
        },
        H(W(a)),
        J(W(a))
      );
      f.render(b);
      Y(a, f);
    };
    function Um(a, b, c, d, e, f) {
      P.call(this, Ok, { email: a, ga: b }, f, 'federatedLinking', { F: d, D: e });
      this.i = c;
    }
    m(Um, P);
    Um.prototype.v = function () {
      this.u(this.i);
      this.l().focus();
      P.prototype.v.call(this);
    };
    Um.prototype.o = function () {
      this.i = null;
      P.prototype.o.call(this);
    };
    u(Um.prototype, { l: ll, u: nl });
    K.federatedLinking = function (a, b, c, d, e) {
      const f = Bh(X(a));
      if (f && f.a) {
        var g = new Um(
          c,
          ki(W(a), d),
          function () {
            Tl(a, g, d, c);
          },
          H(W(a)),
          J(W(a))
        );
        g.render(b);
        Y(a, g);
        e && g.a(e);
      } else S(a, b);
    };
    K.federatedRedirect = function (a, b, c) {
      const d = new Gm();
      d.render(b);
      Y(a, d);
      b = ji(W(a))[0];
      Tl(a, d, b, c);
    };
    K.federatedSignIn = function (a, b, c, d, e) {
      var f = new Um(
        c,
        ki(W(a), d),
        function () {
          Tl(a, f, d, c);
        },
        H(W(a)),
        J(W(a))
      );
      f.render(b);
      Y(a, f);
      e && f.a(e);
    };
    function Vm(a, b, c, d) {
      const e = b.u();
      e
        ? V(
            a,
            b.I(
              r(a.Xb, a),
              [c, e],
              function (f) {
                f = f.user.linkWithCredential(d).then(function (g) {
                  return Nl(a, b, {
                    user: g.user,
                    credential: d,
                    operationType: g.operationType,
                    additionalUserInfo: g.additionalUserInfo
                  });
                });
                V(a, f);
                return f;
              },
              function (f) {
                if (!f.name || f.name != 'cancel')
                  switch (f.code) {
                    case 'auth/wrong-password':
                      N(b.i(), !1);
                      Qj(b.B(), T(f));
                      break;
                    case 'auth/too-many-requests':
                      b.a(T(f));
                      break;
                    default:
                      qg('signInWithEmailAndPassword: ' + f.message, void 0), b.a(T(f));
                  }
              }
            )
          )
        : b.i().focus();
    }
    K.passwordLinking = function (a, b, c) {
      const d = Bh(X(a));
      Ch(X(a));
      const e = d && d.a;
      if (e) {
        var f = new sl(
          c,
          function () {
            Vm(a, f, c, e);
          },
          function () {
            f.m();
            L('passwordRecovery', a, b, c);
          },
          H(W(a)),
          J(W(a))
        );
        f.render(b);
        Y(a, f);
      } else S(a, b);
    };
    function Wm(a, b, c, d, e, f) {
      P.call(this, Bk, { email: c, Ta: !!b }, f, 'passwordRecovery', { F: d, D: e });
      this.l = a;
      this.u = b;
    }
    m(Wm, P);
    Wm.prototype.v = function () {
      this.B();
      this.H(this.l, this.u);
      Yi(this.i()) || this.i().focus();
      xk(this, this.i(), this.l);
      P.prototype.v.call(this);
    };
    Wm.prototype.o = function () {
      this.u = this.l = null;
      P.prototype.o.call(this);
    };
    u(Wm.prototype, { i: ul, w: vl, B: wl, M: xl, j: yl, U: ll, P: ml, H: nl });
    function Xm(a, b) {
      const c = b.j();
      if (c) {
        const d = Q(b);
        V(
          a,
          b.I(
            r(U(a).sendPasswordResetEmail, U(a)),
            [c],
            function () {
              b.m();
              var e = new Al(
                c,
                function () {
                  e.m();
                  S(a, d);
                },
                H(W(a)),
                J(W(a))
              );
              e.render(d);
              Y(a, e);
            },
            function (e) {
              N(b.i(), !1);
              Qj(b.w(), T(e));
            }
          )
        );
      } else b.i().focus();
    }
    K.passwordRecovery = function (a, b, c, d, e) {
      var f = new Wm(
        function () {
          Xm(a, f);
        },
        d
          ? void 0
          : function () {
              f.m();
              S(a, b);
            },
        c,
        H(W(a)),
        J(W(a))
      );
      f.render(b);
      Y(a, f);
      e && f.a(e);
    };
    K.passwordSignIn = function (a, b, c, d) {
      var e = new zl(
        function () {
          Yl(a, e);
        },
        function () {
          const f = e.M();
          e.m();
          L('passwordRecovery', a, b, f);
        },
        c,
        H(W(a)),
        J(W(a)),
        d
      );
      e.render(b);
      Y(a, e);
    };
    function Ym() {
      return M(this, 'firebaseui-id-name');
    }
    function Zm() {
      return M(this, 'firebaseui-id-name-error');
    }
    function $m(a, b, c, d, e, f, g, h, k) {
      P.call(this, Ak, { email: d, Tb: a, name: e, Ta: !!c, ia: !!h }, k, 'passwordSignUp', {
        F: f,
        D: g
      });
      this.w = b;
      this.H = c;
      this.B = a;
    }
    m($m, P);
    $m.prototype.v = function () {
      this.ea();
      this.B && this.Ja();
      this.ua();
      this.pa(this.w, this.H);
      this.B
        ? (wk(this, this.i(), this.u()), wk(this, this.u(), this.l()))
        : wk(this, this.i(), this.l());
      this.w && xk(this, this.l(), this.w);
      Yi(this.i())
        ? this.B && !Yi(this.u())
          ? this.u().focus()
          : this.l().focus()
        : this.i().focus();
      P.prototype.v.call(this);
    };
    $m.prototype.o = function () {
      this.H = this.w = null;
      P.prototype.o.call(this);
    };
    u($m.prototype, {
      i: ul,
      U: vl,
      ea: wl,
      jb: xl,
      j: yl,
      u: Ym,
      Bc: Zm,
      Ja: function () {
        const a = Ym.call(this);
        const b = Zm.call(this);
        Lj(this, a, function () {
          Rj(b) && (N(a, !0), Pj(b));
        });
      },
      M: function () {
        const a = Ym.call(this);
        let b = Zm.call(this);
        let c = Yi(a);
        c = !/^[\s\xa0]*$/.test(c == null ? '' : String(c));
        N(a, c);
        c ? (Pj(b), (b = !0)) : (Qj(b, C('Saisissez le nom de votre compte').toString()), (b = !1));
        return b ? Ua(Yi(a)) : null;
      },
      l: rm,
      ba: um,
      lb: sm,
      ua: vm,
      P: wm,
      Nb: ll,
      Mb: ml,
      pa: nl
    });
    function an(a, b) {
      const c = Ei(W(a));
      const d = b.j();
      let e = null;
      c && (e = b.M());
      const f = b.P();
      if (d) {
        if (c)
          if (e) e = cb(e);
          else {
            b.u().focus();
            return;
          }
        if (f) {
          const g = firebase.auth.EmailAuthProvider.credential(d, f);
          V(
            a,
            b.I(
              r(a.Yb, a),
              [d, f],
              function (h) {
                const k = {
                  user: h.user,
                  credential: g,
                  operationType: h.operationType,
                  additionalUserInfo: h.additionalUserInfo
                };
                return c
                  ? ((h = h.user.updateProfile({ displayName: e }).then(function () {
                      return Nl(a, b, k);
                    })),
                    V(a, h),
                    h)
                  : Nl(a, b, k);
              },
              function (h) {
                if (!h.name || h.name != 'cancel') {
                  let k = Ml(h);
                  h = T(k);
                  switch (k.code) {
                    case 'auth/email-already-in-use':
                      return bn(a, b, d, k);
                    case 'auth/too-many-requests':
                      h = C(
                        'De trop nombreuses demandes de compte proviennent de votre adresse\u00a0IP. Veuillez r\u00e9essayer dans quelques minutes.'
                      ).toString();
                    case 'auth/operation-not-allowed':
                    case 'auth/weak-password':
                      N(b.l(), !1);
                      Qj(b.ba(), h);
                      break;
                    case 'auth/admin-restricted-operation':
                      ri(W(a))
                        ? ((h = Q(b)),
                          b.m(),
                          L(
                            'handleUnauthorizedUser',
                            a,
                            h,
                            d,
                            firebase.auth.EmailAuthProvider.PROVIDER_ID
                          ))
                        : b.a(h);
                      break;
                    default:
                      (k = 'setAccountInfo: ' + ch(k)), qg(k, void 0), b.a(h);
                  }
                }
              }
            )
          );
        } else b.l().focus();
      } else b.i().focus();
    }
    function bn(a, b, c, d) {
      function e() {
        const g = T(d);
        N(b.i(), !1);
        Qj(b.U(), g);
        b.i().focus();
      }
      const f = U(a)
        .fetchSignInMethodsForEmail(c)
        .then(
          function (g) {
            g.length
              ? e()
              : ((g = Q(b)), b.m(), L('passwordRecovery', a, g, c, !1, Md().toString()));
          },
          function () {
            e();
          }
        );
      V(a, f);
      return f;
    }
    K.passwordSignUp = function (a, b, c, d, e, f) {
      function g() {
        h.m();
        S(a, b);
      }
      var h = new $m(
        Ei(W(a)),
        function () {
          an(a, h);
        },
        e ? void 0 : g,
        c,
        d,
        H(W(a)),
        J(W(a)),
        f
      );
      h.render(b);
      Y(a, h);
    };
    function cn() {
      return M(this, 'firebaseui-id-phone-confirmation-code');
    }
    function dn() {
      return M(this, 'firebaseui-id-phone-confirmation-code-error');
    }
    function en() {
      return M(this, 'firebaseui-id-resend-countdown');
    }
    function fn(a, b, c, d, e, f, g, h, k) {
      P.call(this, hl, { phoneNumber: e }, k, 'phoneSignInFinish', { F: g, D: h });
      this.jb = f;
      this.i = new jj(1e3);
      this.B = f;
      this.P = a;
      this.l = b;
      this.H = c;
      this.M = d;
    }
    m(fn, P);
    fn.prototype.v = function () {
      const a = this;
      this.U(this.jb);
      me(this.i, 'tick', this.w, !1, this);
      this.i.start();
      O(this, M(this, 'firebaseui-id-change-phone-number-link'), function () {
        a.P();
      });
      O(this, this.Da(), function () {
        a.M();
      });
      this.Ja(this.l);
      this.ea(this.l, this.H);
      this.u().focus();
      P.prototype.v.call(this);
    };
    fn.prototype.o = function () {
      this.M = this.H = this.l = this.P = null;
      kj(this.i);
      ue(this.i, 'tick', this.w);
      this.i = null;
      P.prototype.o.call(this);
    };
    fn.prototype.w = function () {
      --this.B;
      this.B > 0 ? this.U(this.B) : (kj(this.i), ue(this.i, 'tick', this.w), this.ua(), this.lb());
    };
    u(fn.prototype, {
      u: cn,
      pa: dn,
      Ja: function (a) {
        const b = cn.call(this);
        const c = dn.call(this);
        Lj(this, b, function () {
          Rj(c) && (N(b, !0), Pj(c));
        });
        a &&
          Mj(this, b, function () {
            a();
          });
      },
      ba: function () {
        const a = Ua(Yi(cn.call(this)) || '');
        return /^\d{6}$/.test(a) ? a : null;
      },
      Fb: en,
      U: function (a) {
        $c(
          en.call(this),
          C('Renvoyer le code dans\u00a0' + ((a > 9 ? '0:' : '0:0') + a)).toString()
        );
      },
      ua: function () {
        Pj(this.Fb());
      },
      Da: function () {
        return M(this, 'firebaseui-id-resend-link');
      },
      lb: function () {
        Qj(this.Da());
      },
      Nb: ll,
      Mb: ml,
      ea: nl
    });
    function gn(a, b, c, d) {
      function e(g) {
        b.u().focus();
        N(b.u(), !1);
        Qj(b.pa(), g);
      }
      const f = b.ba();
      f
        ? (b.$(
            'mdl-spinner mdl-spinner--single-color mdl-js-spinner is-active firebaseui-progress-dialog-loading-icon',
            C('Validation\u2026').toString()
          ),
          V(
            a,
            b.I(
              r(d.confirm, d),
              [f],
              function (g) {
                b.h();
                b.$(
                  'firebaseui-icon-done',
                  C('Le code a bien \u00e9t\u00e9 valid\u00e9.').toString()
                );
                const h = setTimeout(function () {
                  b.h();
                  b.m();
                  const k = {
                    user: hn(a).currentUser,
                    credential: null,
                    operationType: g.operationType,
                    additionalUserInfo: g.additionalUserInfo
                  };
                  Nl(a, b, k, !0);
                }, 1e3);
                V(a, function () {
                  b && b.h();
                  clearTimeout(h);
                });
              },
              function (g) {
                if (g.name && g.name == 'cancel') b.h();
                else {
                  let h = Ml(g);
                  g = T(h);
                  switch (h.code) {
                    case 'auth/credential-already-in-use':
                      b.h();
                      break;
                    case 'auth/code-expired':
                      h = Q(b);
                      b.h();
                      b.m();
                      L('phoneSignInStart', a, h, c, g);
                      break;
                    case 'auth/missing-verification-code':
                    case 'auth/invalid-verification-code':
                      b.h();
                      e(g);
                      break;
                    default:
                      b.h(), b.a(g);
                  }
                }
              }
            )
          ))
        : e(Id().toString());
    }
    K.phoneSignInFinish = function (a, b, c, d, e, f) {
      var g = new fn(
        function () {
          g.m();
          L('phoneSignInStart', a, b, c);
        },
        function () {
          gn(a, g, c, e);
        },
        function () {
          g.m();
          S(a, b);
        },
        function () {
          g.m();
          L('phoneSignInStart', a, b, c);
        },
        $h(c),
        d,
        H(W(a)),
        J(W(a))
      );
      g.render(b);
      Y(a, g);
      f && g.a(f);
    };
    const jn =
      !z &&
      !(
        y('Safari') &&
        !(
          Xb() ||
          y('Coast') ||
          y('Opera') ||
          y('Edge') ||
          y('Firefox') ||
          y('FxiOS') ||
          y('Silk') ||
          y('Android')
        )
      );
    function kn(a, b) {
      if (/-[a-z]/.test(b)) return null;
      if (jn && a.dataset) {
        if (
          !(
            !y('Android') ||
            Xb() ||
            y('Firefox') ||
            y('FxiOS') ||
            y('Opera') ||
            y('Silk') ||
            b in a.dataset
          )
        )
          return null;
        a = a.dataset[b];
        return void 0 === a ? null : a;
      }
      return a.getAttribute(
        'data-' +
          String(b)
            .replace(/([A-Z])/g, '-$1')
            .toLowerCase()
      );
    }
    function ln(a, b, c) {
      const d = this;
      a = hd(gk, { items: a }, null, this.s);
      nk.call(this, a, !0, !0);
      c && (c = mn(a, c)) && (c.focus(), Dj(c, a));
      O(this, a, function (e) {
        if ((e = (e = ad(e.target, 'firebaseui-id-list-box-dialog-button')) && kn(e, 'listboxid')))
          ok.call(d), b(e);
      });
    }
    function mn(a, b) {
      a = (a || document).getElementsByTagName('BUTTON');
      for (let c = 0; c < a.length; c++) if (kn(a[c], 'listboxid') === b) return a[c];
      return null;
    }
    function nn() {
      return M(this, 'firebaseui-id-phone-number');
    }
    function on() {
      return M(this, 'firebaseui-id-country-selector');
    }
    function pn() {
      return M(this, 'firebaseui-id-phone-number-error');
    }
    function qn(a, b) {
      const c = a.a;
      const d = rn('1-US-0', c);
      let e = null;
      b && rn(b, c) ? (e = b) : d ? (e = '1-US-0') : (e = c.length > 0 ? c[0].c : null);
      if (!e) throw Error('No available default country');
      sn.call(this, e, a);
    }
    function rn(a, b) {
      a = Sh(a);
      return !(!a || !Ma(b, a));
    }
    function tn(a) {
      return a.map(function (b) {
        return { id: b.c, Ma: 'firebaseui-flag ' + un(b), label: b.name + ' ' + ('\u200e+' + b.b) };
      });
    }
    function un(a) {
      return 'firebaseui-flag-' + a.f;
    }
    function vn(a) {
      const b = this;
      ln.call(
        this,
        tn(a.a),
        function (c) {
          sn.call(b, c, a, !0);
          b.O().focus();
        },
        this.Ba
      );
    }
    function sn(a, b, c) {
      const d = Sh(a);
      d &&
        (c &&
          ((c = Ua(Yi(nn.call(this)) || '')),
          (b = Rh(b, c)),
          b.length &&
            b[0].b != d.b &&
            ((c = '+' + d.b + c.substr(b[0].b.length + 1)), Zi(nn.call(this), c))),
        (b = Sh(this.Ba)),
        (this.Ba = a),
        (a = M(this, 'firebaseui-id-country-selector-flag')),
        b && Xi(a, un(b)),
        Wi(a, un(d)),
        $c(M(this, 'firebaseui-id-country-selector-code'), '\u200e+' + d.b));
    }
    function wn(a, b, c, d, e, f, g, h, k, p) {
      P.call(this, gl, { Gb: b, Aa: k || null, Va: !!c, ia: !!f }, p, 'phoneSignInStart', {
        F: d,
        D: e
      });
      this.H = h || null;
      this.M = b;
      this.l = a;
      this.w = c || null;
      this.pa = g || null;
    }
    m(wn, P);
    wn.prototype.v = function () {
      this.ea(this.pa, this.H);
      this.P(this.l, this.w || void 0);
      this.M || wk(this, this.O(), this.i());
      xk(this, this.i(), this.l);
      this.O().focus();
      Dm(this.O(), (this.O().value || '').length);
      P.prototype.v.call(this);
    };
    wn.prototype.o = function () {
      this.w = this.l = null;
      P.prototype.o.call(this);
    };
    u(wn.prototype, {
      Cb: pk,
      O: nn,
      B: pn,
      ea: function (a, b, c) {
        const d = this;
        const e = nn.call(this);
        const f = on.call(this);
        const g = pn.call(this);
        const h = a || Xh;
        const k = h.a;
        if (k.length == 0) throw Error('No available countries provided.');
        qn.call(d, h, b);
        O(this, f, function () {
          vn.call(d, h);
        });
        Lj(this, e, function () {
          Rj(g) && (N(e, !0), Pj(g));
          let p = Ua(Yi(e) || '');
          let t = Sh(this.Ba);
          const I = Rh(h, p);
          p = rn('1-US-0', k);
          I.length &&
            I[0].b != t.b &&
            ((t = I[0]), sn.call(d, t.b == '1' && p ? '1-US-0' : t.c, h));
        });
        c &&
          Mj(this, e, function () {
            c();
          });
      },
      U: function (a) {
        let b = Ua(Yi(nn.call(this)) || '');
        a = a || Xh;
        let c = a.a;
        const d = Rh(Xh, b);
        if (d.length && !Ma(c, d[0]))
          throw (
            (Zi(nn.call(this)),
            nn.call(this).focus(),
            Qj(pn.call(this), C("Le code pays indiqu\u00e9 n'est pas accept\u00e9.").toString()),
            Error('The country code provided is not supported.'))
          );
        c = Sh(this.Ba);
        d.length && d[0].b != c.b && sn.call(this, d[0].c, a);
        d.length && (b = b.substr(d[0].b.length + 1));
        return b ? new Yh(this.Ba, b) : null;
      },
      Ja: on,
      ba: function () {
        return M(this, 'firebaseui-recaptcha-container');
      },
      u: function () {
        return M(this, 'firebaseui-id-recaptcha-error');
      },
      i: ll,
      ua: ml,
      P: nl
    });
    function xn(a, b, c, d) {
      try {
        var e = b.U(Si);
      } catch (f) {
        return;
      }
      e
        ? Qi
          ? (b.$(
              'mdl-spinner mdl-spinner--single-color mdl-js-spinner is-active firebaseui-progress-dialog-loading-icon',
              C('Validation\u2026').toString()
            ),
            V(
              a,
              b.I(
                r(a.cc, a),
                [$h(e), c],
                function (f) {
                  const g = Q(b);
                  b.$(
                    'firebaseui-icon-done',
                    C('Le code a bien \u00e9t\u00e9 envoy\u00e9.').toString()
                  );
                  const h = setTimeout(function () {
                    b.h();
                    b.m();
                    L('phoneSignInFinish', a, g, e, 15, f);
                  }, 1e3);
                  V(a, function () {
                    b && b.h();
                    clearTimeout(h);
                  });
                },
                function (f) {
                  b.h();
                  if (!f.name || f.name != 'cancel') {
                    grecaptcha.reset(Ti);
                    Qi = null;
                    let g = (f && f.message) || '';
                    if (f.code)
                      switch (f.code) {
                        case 'auth/too-many-requests':
                          g = C(
                            'Ce num\u00e9ro de t\u00e9l\u00e9phone a \u00e9t\u00e9 utilis\u00e9 un trop grand nombre de fois'
                          ).toString();
                          break;
                        case 'auth/invalid-phone-number':
                        case 'auth/missing-phone-number':
                          b.O().focus();
                          Qj(b.B(), Hd().toString());
                          return;
                        case 'auth/admin-restricted-operation':
                          if (ri(W(a))) {
                            f = Q(b);
                            b.m();
                            L(
                              'handleUnauthorizedUser',
                              a,
                              f,
                              $h(e),
                              firebase.auth.PhoneAuthProvider.PROVIDER_ID
                            );
                            return;
                          }
                          g = T(f);
                          break;
                        default:
                          g = T(f);
                      }
                    b.a(g);
                  }
                }
              )
            ))
          : Ri
          ? Qj(b.u(), C('R\u00e9soudre le reCAPTCHA').toString())
          : !Ri && d && b.i().click()
        : (b.O().focus(), Qj(b.B(), Hd().toString()));
    }
    K.phoneSignInStart = function (a, b, c, d) {
      const e = si(W(a)) || {};
      Qi = null;
      Ri = !(e && e.size === 'invisible');
      const f = $l(a);
      let g = Bi(W(a));
      let h = f ? Ai(W(a)) : null;
      g = (c && c.a) || (g && g.c) || null;
      c = (c && c.Aa) || h;
      (h = Ci(W(a))) && Wh(h);
      Si = h ? new Qh(Ci(W(a))) : Xh;
      var k = new wn(
        function (t) {
          xn(a, k, p, !(!t || !t.keyCode));
        },
        Ri,
        f
          ? null
          : function () {
              p.clear();
              k.m();
              S(a, b);
            },
        H(W(a)),
        J(W(a)),
        f,
        Si,
        g,
        c
      );
      k.render(b);
      Y(a, k);
      d && k.a(d);
      e.callback = function (t) {
        k.u() && Pj(k.u());
        Qi = t;
        Ri || xn(a, k, p);
      };
      e['expired-callback'] = function () {
        Qi = null;
      };
      var p = new firebase.auth.RecaptchaVerifier(Ri ? k.ba() : k.i(), e, hn(a).app);
      V(
        a,
        k.I(
          r(p.render, p),
          [],
          function (t) {
            Ti = t;
          },
          function (t) {
            (t.name && t.name == 'cancel') || ((t = T(t)), k.m(), S(a, b, void 0, t));
          }
        )
      );
    };
    K.prefilledEmailSignIn = function (a, b, c) {
      const d = new Gm();
      d.render(b);
      Y(a, d);
      V(
        a,
        d.I(
          r(U(a).fetchSignInMethodsForEmail, U(a)),
          [c],
          function (e) {
            d.m();
            const f = !(!Zl(a) || !yn(a));
            cm(a, b, e, c, void 0, f);
          },
          function (e) {
            e = T(e);
            d.m();
            L('signIn', a, b, c, e);
          }
        )
      );
    };
    function zn(a, b, c, d, e) {
      P.call(this, fl, { Sb: b }, e, 'providerSignIn', { F: c, D: d });
      this.i = a;
    }
    m(zn, P);
    zn.prototype.v = function () {
      this.l(this.i);
      P.prototype.v.call(this);
    };
    zn.prototype.o = function () {
      this.i = null;
      P.prototype.o.call(this);
    };
    u(zn.prototype, {
      l: function (a) {
        function b(g) {
          a(g);
        }
        for (
          let c = this.g ? Tc('firebaseui-id-idp-button', this.g || this.s.a) : [], d = 0;
          d < c.length;
          d++
        ) {
          const e = c[d];
          const f = kn(e, 'providerId');
          O(this, e, za(b, f));
        }
      }
    });
    K.providerSignIn = function (a, b, c, d) {
      var e = new zn(
        function (f) {
          f == firebase.auth.EmailAuthProvider.PROVIDER_ID
            ? (e.m(), am(a, b, d))
            : f == firebase.auth.PhoneAuthProvider.PROVIDER_ID
            ? (e.m(), L('phoneSignInStart', a, b))
            : f == 'anonymous'
            ? Wl(a, e)
            : Tl(a, e, f, d);
          Z(a);
          a.l.cancel();
        },
        li(W(a)),
        H(W(a)),
        J(W(a))
      );
      e.render(b);
      Y(a, e);
      c && e.a(c);
      An(a);
    };
    K.sendEmailLinkForSignIn = function (a, b, c, d) {
      const e = new hm();
      e.render(b);
      Y(a, e);
      dm(a, e, c, d, function (f) {
        e.m();
        f && f.code == 'auth/admin-restricted-operation' && ri(W(a))
          ? L('handleUnauthorizedUser', a, b, c, firebase.auth.EmailAuthProvider.PROVIDER_ID)
          : ((f = T(f)), L('signIn', a, b, c, f));
      });
    };
    function Bn(a, b, c, d, e, f, g) {
      P.call(this, yk, { email: c, Va: !!b, ia: !!f }, g, 'signIn', { F: d, D: e });
      this.i = a;
      this.u = b;
    }
    m(Bn, P);
    Bn.prototype.v = function () {
      this.w(this.i);
      this.B(this.i, this.u || void 0);
      this.l().focus();
      Dm(this.l(), (this.l().value || '').length);
      P.prototype.v.call(this);
    };
    Bn.prototype.o = function () {
      this.u = this.i = null;
      P.prototype.o.call(this);
    };
    u(Bn.prototype, { l: ul, M: vl, w: wl, H: xl, j: yl, U: ll, P: ml, B: nl });
    K.signIn = function (a, b, c, d) {
      const e = Zl(a);
      var f = new Bn(
        function () {
          const g = f;
          const h = g.j() || '';
          h && bm(a, g, h);
        },
        e
          ? null
          : function () {
              f.m();
              S(a, b, c);
            },
        c,
        H(W(a)),
        J(W(a)),
        e
      );
      f.render(b);
      Y(a, f);
      d && f.a(d);
    };
    function Cn(a, b, c, d, e, f, g) {
      P.call(this, Pk, { kc: a, yb: c, Eb: !!d }, g, 'unauthorizedUser', { F: e, D: f });
      this.l = b;
      this.i = d;
    }
    m(Cn, P);
    Cn.prototype.v = function () {
      const a = this;
      const b = M(this, 'firebaseui-id-unauthorized-user-help-link');
      this.i &&
        b &&
        O(this, b, function () {
          a.i();
        });
      O(this, this.u(), function () {
        a.l();
      });
      this.u().focus();
      P.prototype.v.call(this);
    };
    Cn.prototype.o = function () {
      this.i = this.l = null;
      P.prototype.o.call(this);
    };
    u(Cn.prototype, { u: ml });
    K.handleUnauthorizedUser = function (a, b, c, d) {
      function e() {
        S(a, b);
      }
      d === firebase.auth.EmailAuthProvider.PROVIDER_ID
        ? (e = function () {
            am(a, b);
          })
        : d === firebase.auth.PhoneAuthProvider.PROVIDER_ID &&
          (e = function () {
            L('phoneSignInStart', a, b);
          });
      let f = null;
      let g = null;
      d === firebase.auth.EmailAuthProvider.PROVIDER_ID && qi(W(a))
        ? ((f = wi(W(a))), (g = xi(W(a))))
        : ri(W(a)) && ((f = ui(W(a))), (g = vi(W(a))));
      var h = new Cn(
        c,
        function () {
          h.m();
          e();
        },
        f,
        g,
        H(W(a)),
        J(W(a))
      );
      h.render(b);
      Y(a, h);
    };
    function Dn(a, b, c, d, e, f) {
      P.call(this, Qk, { email: a }, f, 'unsupportedProvider', { F: d, D: e });
      this.l = b;
      this.i = c;
    }
    m(Dn, P);
    Dn.prototype.v = function () {
      this.w(this.l, this.i);
      this.u().focus();
      P.prototype.v.call(this);
    };
    Dn.prototype.o = function () {
      this.i = this.l = null;
      P.prototype.o.call(this);
    };
    u(Dn.prototype, { u: ll, B: ml, w: nl });
    K.unsupportedProvider = function (a, b, c) {
      var d = new Dn(
        c,
        function () {
          d.m();
          L('passwordRecovery', a, b, c);
        },
        function () {
          d.m();
          S(a, b, c);
        },
        H(W(a)),
        J(W(a))
      );
      d.render(b);
      Y(a, d);
    };
    function En(a, b) {
      this.$ = !1;
      let c = Fn(b);
      if (Gn[c]) throw Error('An AuthUI instance already exists for the key "' + c + '"');
      Gn[c] = this;
      this.a = a;
      this.u = null;
      this.Y = !1;
      Hn(this.a);
      this.h = firebase
        .initializeApp(
          { apiKey: a.app.options.apiKey, authDomain: a.app.options.authDomain },
          a.app.name + '-firebaseui-temp'
        )
        .auth();
      if ((a = a.emulatorConfig))
        (c = a.port),
          this.h.useEmulator(a.protocol + '://' + a.host + (c === null ? '' : ':' + c), a.options);
      Hn(this.h);
      this.h.setPersistence && this.h.setPersistence(firebase.auth.Auth.Persistence.SESSION);
      this.oa = b;
      this.ca = new di();
      this.g = this.T = this.i = this.J = this.O = null;
      this.s = [];
      this.Z = !1;
      this.l = Rf.Xa();
      this.j = this.C = null;
      this.da = this.A = !1;
    }
    function Hn(a) {
      a && a.INTERNAL && a.INTERNAL.logFramework && a.INTERNAL.logFramework('FirebaseUI-web');
    }
    var Gn = {};
    function Fn(a) {
      return a || '[DEFAULT]';
    }
    function Ul(a) {
      Z(a);
      a.i ||
        (a.i = In(a, function (b) {
          return b && !Bh(X(a))
            ? F(
                hn(a)
                  .getRedirectResult()
                  .then(
                    function (c) {
                      return c;
                    },
                    function (c) {
                      if (c && c.code == 'auth/email-already-in-use' && c.email && c.credential)
                        throw c;
                      return Jn(a, c);
                    }
                  )
              )
            : F(
                U(a)
                  .getRedirectResult()
                  .then(function (c) {
                    return fi(W(a)) && !c.user && a.j && !a.j.isAnonymous
                      ? hn(a).getRedirectResult()
                      : c;
                  })
              );
        }));
      return a.i;
    }
    function Y(a, b) {
      Z(a);
      a.g = b;
    }
    let Kn = null;
    function U(a) {
      Z(a);
      return a.h;
    }
    function hn(a) {
      Z(a);
      return a.a;
    }
    function X(a) {
      Z(a);
      return a.oa;
    }
    function yn(a) {
      Z(a);
      return a.O ? a.O.emailHint : void 0;
    }
    l = En.prototype;
    l.nb = function () {
      Z(this);
      return !!Eh(X(this)) || Ln(vf());
    };
    function Ln(a) {
      a = new Pb(a);
      return (a.a.a.get(x.ub) || null) === 'signIn' && !!a.a.a.get(x.$a);
    }
    l.start = function (a, b) {
      Mn(this, a, b);
    };
    function Mn(a, b, c, d) {
      Z(a);
      typeof a.a.languageCode !== 'undefined' && (a.u = a.a.languageCode);
      const e = 'fr'.replace(/_/g, '-');
      a.a.languageCode = e;
      a.h.languageCode = e;
      a.Y = !0;
      typeof a.a.tenantId !== 'undefined' && (a.h.tenantId = a.a.tenantId);
      a.ib(c);
      a.O = d || null;
      const f = n.document;
      a.C
        ? a.C.then(function () {
            f.readyState == 'complete'
              ? Nn(a, b)
              : ne(window, 'load', function () {
                  Nn(a, b);
                });
          })
        : f.readyState == 'complete'
        ? Nn(a, b)
        : ne(window, 'load', function () {
            Nn(a, b);
          });
    }
    function Nn(a, b) {
      let c = uf(b, 'Could not find the FirebaseUI widget element on the page.');
      c.setAttribute('lang', 'fr'.replace(/_/g, '-'));
      if (Kn) {
        var d = Kn;
        Z(d);
        Bh(X(d)) &&
          vg(
            'UI Widget is already rendered on the page and is pending some user interaction. Only one widget instance can be rendered per page. The previous instance has been automatically reset.'
          );
        Kn.reset();
      }
      Kn = a;
      a.T = c;
      On(a, c);
      if (lh(new mh()) && lh(new nh())) {
        b = uf(b, 'Could not find the FirebaseUI widget element on the page.');
        c = vf();
        d = Lh(W(a).a, 'queryParameterForSignInSuccessUrl');
        c = (c = tb(c, d)) ? zc(Bc(c)).toString() : null;
        a: {
          d = vf();
          const e = Di(W(a));
          d = tb(d, e) || '';
          for (f in Pi)
            if (Pi[f].toLowerCase() == d.toLowerCase()) {
              var f = Pi[f];
              break a;
            }
          f = 'callback';
        }
        switch (f) {
          case 'callback':
            c && ((f = X(a)), zh(uh, c, f));
            a.nb() ? L('callback', a, b) : S(a, b, yn(a));
            break;
          case 'resetPassword':
            L('passwordReset', a, b, em(), fm());
            break;
          case 'recoverEmail':
            L('emailChangeRevocation', a, b, em());
            break;
          case 'revertSecondFactorAddition':
            L('revertSecondFactorAddition', a, b, em());
            break;
          case 'verifyEmail':
            L('emailVerification', a, b, em(), fm());
            break;
          case 'verifyAndChangeEmail':
            L('verifyAndChangeEmail', a, b, em(), fm());
            break;
          case 'signIn':
            L('emailLinkSignInCallback', a, b, vf());
            Pn();
            break;
          case 'select':
            c && ((f = X(a)), zh(uh, c, f));
            S(a, b);
            break;
          default:
            throw Error('Unhandled widget operation.');
        }
        b = W(a);
        (b = Ni(b).uiShown || null) && b();
      } else
        (b = uf(b, 'Could not find the FirebaseUI widget element on the page.')),
          (f = new Ll(
            C(
              "Le navigateur que vous utilisez n'est pas compatible avec le stockage Web. Veuillez r\u00e9essayer dans un navigateur diff\u00e9rent."
            ).toString()
          )),
          f.render(b),
          Y(a, f);
      b = a.g && a.g.Ga == 'blank' && Ii(W(a));
      Eh(X(a)) && !b && ((b = Eh(X(a))), Im(a, b.a), yh(th, X(a)));
    }
    function In(a, b) {
      if (a.A) return b(Qn(a));
      V(a, function () {
        a.A = !1;
      });
      if (fi(W(a))) {
        const c = new Xe(function (d) {
          V(
            a,
            a.a.onAuthStateChanged(function (e) {
              a.j = e;
              a.A || ((a.A = !0), d(b(Qn(a))));
            })
          );
        });
        V(a, c);
        return c;
      }
      a.A = !0;
      return b(null);
    }
    function Qn(a) {
      Z(a);
      return fi(W(a)) && a.j && a.j.isAnonymous ? a.j : null;
    }
    function V(a, b) {
      Z(a);
      if (b) {
        a.s.push(b);
        const c = function () {
          Qa(a.s, function (d) {
            return d == b;
          });
        };
        typeof b !== 'function' && b.then(c, c);
      }
    }
    l.Db = function () {
      Z(this);
      this.Z = !0;
    };
    function Rn(a) {
      Z(a);
      let b;
      (b = a.Z) ||
        ((a = W(a)),
        (a = zi(a, firebase.auth.GoogleAuthProvider.PROVIDER_ID)),
        (b = !(!a || a.prompt !== 'select_account')));
      return b;
    }
    function Ol(a) {
      typeof a.a.languageCode !== 'undefined' && a.Y && ((a.Y = !1), (a.a.languageCode = a.u));
    }
    function Im(a, b) {
      a.a.tenantId = b;
      a.h.tenantId = b;
    }
    l.reset = function () {
      Z(this);
      const a = this;
      this.T && this.T.removeAttribute('lang');
      this.J && Fe(this.J);
      Ol(this);
      this.O = null;
      Pn();
      yh(th, X(this));
      Z(this);
      this.l.cancel();
      this.i = F({ user: null, credential: null });
      Kn == this && (Kn = null);
      this.T = null;
      for (let b = 0; b < this.s.length; b++)
        if (typeof this.s[b] === 'function') this.s[b]();
        else this.s[b].cancel && this.s[b].cancel();
      this.s = [];
      Ch(X(this));
      this.g && (this.g.m(), (this.g = null));
      this.L = null;
      this.h &&
        (this.C = om(this).then(
          function () {
            a.C = null;
          },
          function () {
            a.C = null;
          }
        ));
    };
    function On(a, b) {
      a.L = null;
      a.J = new Ge(b);
      a.J.register();
      me(a.J, 'pageEnter', function (c) {
        c = c && c.pageId;
        if (a.L != c) {
          let d = W(a);
          (d = Ni(d).uiChanged || null) && d(a.L, c);
          a.L = c;
        }
      });
    }
    l.ib = function (a) {
      Z(this);
      const b = this.ca;
      let c;
      for (c in a)
        try {
          Kh(b.a, c, a[c]);
        } catch (d) {
          qg('Invalid config: "' + c + '"', void 0);
        }
      fc && Kh(b.a, 'popupMode', !1);
      Ci(b);
      !this.da &&
        Mi(W(this)) &&
        (vg(
          'signInSuccess callback is deprecated. Please use signInSuccessWithAuthResult callback instead.'
        ),
        (this.da = !0));
    };
    function W(a) {
      Z(a);
      return a.ca;
    }
    l.Wb = function () {
      Z(this);
      let a = W(this);
      let b = Lh(a.a, 'widgetUrl');
      a = Di(a);
      let c = b.search(sb);
      for (var d = 0, e, f = []; (e = rb(b, d, a, c)) >= 0; )
        f.push(b.substring(d, e)), (d = Math.min(b.indexOf('&', e) + 1 || c, c));
      f.push(b.substr(d));
      b = f.join('').replace(ub, '$1');
      c = '=' + encodeURIComponent('select');
      (a += c)
        ? ((c = b.indexOf('#')),
          c < 0 && (c = b.length),
          (d = b.indexOf('?')),
          d < 0 || d > c ? ((d = c), (e = '')) : (e = b.substring(d + 1, c)),
          (b = [b.substr(0, d), e, b.substr(c)]),
          (c = b[1]),
          (b[1] = a ? (c ? c + '&' + a : a) : c),
          (c = b[0] + (b[1] ? '?' + b[1] : '') + b[2]))
        : (c = b);
      W(this).a.get('popupMode')
        ? ((a = (window.screen.availHeight - 600) / 2),
          (b = (window.screen.availWidth - 500) / 2),
          (c = c || 'about:blank'),
          (a = {
            width: 500,
            height: 600,
            top: a > 0 ? a : 0,
            left: b > 0 ? b : 0,
            location: !0,
            resizable: !0,
            statusbar: !0,
            toolbar: !1
          }),
          (a.target = a.target || c.target || 'google_popup'),
          (a.width = a.width || 690),
          (a.height = a.height || 500),
          (a = rf(c, a)) && a.focus())
        : Nc(window.location, c);
    };
    function Z(a) {
      if (a.$) throw Error('AuthUI instance is deleted!');
    }
    l.Wa = function () {
      const a = this;
      Z(this);
      return this.h.app.delete().then(function () {
        const b = Fn(X(a));
        delete Gn[b];
        a.reset();
        a.$ = !0;
      });
    };
    function An(a) {
      Z(a);
      try {
        Sf(a.l, ni(W(a)), Rn(a)).then(function (b) {
          return a.g ? Xl(a, a.g, b) : !1;
        });
      } catch (b) {}
    }
    l.Ib = function (a, b) {
      Z(this);
      const c = this;
      const d = xf();
      if (!Fi(W(this)))
        return ff(Error('Email link sign-in should be enabled to trigger email sending.'));
      const e = Hi(W(this));
      const f = new Pb(e.url);
      Qb(f, d);
      b && b.a && (Ih(d, b, X(this)), Tb(f, b.a.providerId));
      Rb(f, Gi(W(this)));
      return In(this, function (g) {
        g && ((g = g.uid) ? f.a.a.set(x.Pa, g) : Nb(f.a.a, x.Pa));
        e.url = f.toString();
        return U(c).sendSignInLinkToEmail(a, e);
      }).then(
        function () {
          const g = X(c);
          const h = {};
          h.email = a;
          zh(vh, $g(d, JSON.stringify(h)), g);
        },
        function (g) {
          yh(wh, X(c));
          yh(vh, X(c));
          throw g;
        }
      );
    };
    function Jm(a, b) {
      const c = Sb(new Pb(b));
      if (!c) return F(null);
      b = new Xe(function (d, e) {
        var f = hn(a).onAuthStateChanged(function (g) {
          f();
          g && g.isAnonymous && g.uid === c
            ? d(g)
            : g && g.isAnonymous && g.uid !== c
            ? e(Error('anonymous-user-mismatch'))
            : e(Error('anonymous-user-not-found'));
        });
        V(a, f);
      });
      V(a, b);
      return b;
    }
    function Nm(a, b, c, d, e) {
      Z(a);
      const f = e || null;
      const g = firebase.auth.EmailAuthProvider.credentialWithLink(c, d);
      c = f
        ? U(a)
            .signInWithEmailLink(c, d)
            .then(function (h) {
              return h.user.linkWithCredential(f);
            })
            .then(function () {
              return om(a);
            })
            .then(function () {
              return Jn(a, { code: 'auth/email-already-in-use' }, f);
            })
        : U(a)
            .fetchSignInMethodsForEmail(c)
            .then(function (h) {
              return h.length
                ? Jn(a, { code: 'auth/email-already-in-use' }, g)
                : b.linkWithCredential(g);
            });
      V(a, c);
      return c;
    }
    function Om(a, b, c, d) {
      Z(a);
      const e = d || null;
      let f;
      b = U(a)
        .signInWithEmailLink(b, c)
        .then(function (g) {
          f = {
            user: g.user,
            credential: null,
            operationType: g.operationType,
            additionalUserInfo: g.additionalUserInfo
          };
          if (e)
            return g.user.linkWithCredential(e).then(function (h) {
              f = {
                user: h.user,
                credential: e,
                operationType: f.operationType,
                additionalUserInfo: h.additionalUserInfo
              };
            });
        })
        .then(function () {
          om(a);
        })
        .then(function () {
          return hn(a).updateCurrentUser(f.user);
        })
        .then(function () {
          f.user = hn(a).currentUser;
          return f;
        });
      V(a, b);
      return b;
    }
    function Pn() {
      let a = vf();
      if (Ln(a)) {
        a = new Pb(a);
        for (var b in x) x.hasOwnProperty(b) && Nb(a.a.a, x[b]);
        b = { state: 'signIn', mode: 'emailLink', operation: 'clear' };
        const c = n.document.title;
        n.history && n.history.replaceState && n.history.replaceState(b, c, a.toString());
      }
    }
    l.bc = function (a, b) {
      Z(this);
      const c = this;
      return U(this)
        .signInWithEmailAndPassword(a, b)
        .then(function (d) {
          return In(c, function (e) {
            return e
              ? om(c).then(function () {
                  return Jn(
                    c,
                    { code: 'auth/email-already-in-use' },
                    firebase.auth.EmailAuthProvider.credential(a, b)
                  );
                })
              : d;
          });
        });
    };
    l.Yb = function (a, b) {
      Z(this);
      const c = this;
      return In(this, function (d) {
        if (d) {
          const e = firebase.auth.EmailAuthProvider.credential(a, b);
          return d.linkWithCredential(e);
        }
        return U(c).createUserWithEmailAndPassword(a, b);
      });
    };
    l.ac = function (a) {
      Z(this);
      const b = this;
      return In(this, function (c) {
        return c
          ? c.linkWithCredential(a).then(
              function (d) {
                return d;
              },
              function (d) {
                if (d && d.code == 'auth/email-already-in-use' && d.email && d.credential) throw d;
                return Jn(b, d, a);
              }
            )
          : U(b).signInWithCredential(a);
      });
    };
    function Vl(a, b) {
      Z(a);
      return In(a, function (c) {
        return c && !Bh(X(a))
          ? c.linkWithPopup(b).then(
              function (d) {
                return d;
              },
              function (d) {
                if (d && d.code == 'auth/email-already-in-use' && d.email && d.credential) throw d;
                return Jn(a, d);
              }
            )
          : U(a).signInWithPopup(b);
      });
    }
    l.dc = function (a) {
      Z(this);
      const b = this;
      const c = this.i;
      this.i = null;
      return In(this, function (d) {
        return d && !Bh(X(b)) ? d.linkWithRedirect(a) : U(b).signInWithRedirect(a);
      }).then(
        function () {},
        function (d) {
          b.i = c;
          throw d;
        }
      );
    };
    l.cc = function (a, b) {
      Z(this);
      const c = this;
      return In(this, function (d) {
        return d
          ? d.linkWithPhoneNumber(a, b).then(function (e) {
              return new Uf(e, function (f) {
                if (f.code == 'auth/credential-already-in-use') return Jn(c, f);
                throw f;
              });
            })
          : hn(c)
              .signInWithPhoneNumber(a, b)
              .then(function (e) {
                return new Uf(e);
              });
      });
    };
    l.$b = function () {
      Z(this);
      return hn(this).signInAnonymously();
    };
    function Ql(a, b) {
      Z(a);
      return In(a, function (c) {
        if (a.j && !a.j.isAnonymous && fi(W(a)) && !U(a).currentUser)
          return om(a).then(function () {
            b.credential.providerId == 'password' && (b.credential = null);
            return b;
          });
        if (c)
          return om(a)
            .then(function () {
              return c.linkWithCredential(b.credential);
            })
            .then(
              function (d) {
                b.user = d.user;
                b.credential = d.credential;
                b.operationType = d.operationType;
                b.additionalUserInfo = d.additionalUserInfo;
                return b;
              },
              function (d) {
                if (d && d.code == 'auth/email-already-in-use' && d.email && d.credential) throw d;
                return Jn(a, d, b.credential);
              }
            );
        if (!b.user)
          throw Error(
            'Internal error: An incompatible or outdated version of "firebase.js" may be used.'
          );
        return om(a)
          .then(function () {
            return hn(a).updateCurrentUser(b.user);
          })
          .then(function () {
            b.user = hn(a).currentUser;
            b.operationType = 'signIn';
            b.credential &&
              b.credential.providerId &&
              b.credential.providerId == 'password' &&
              (b.credential = null);
            return b;
          });
      });
    }
    l.Xb = function (a, b) {
      Z(this);
      return U(this).signInWithEmailAndPassword(a, b);
    };
    function om(a) {
      Z(a);
      return U(a).signOut();
    }
    function Jn(a, b, c) {
      Z(a);
      if (
        b &&
        b.code &&
        (b.code == 'auth/email-already-in-use' || b.code == 'auth/credential-already-in-use')
      ) {
        const d = gi(W(a));
        return F()
          .then(function () {
            return d(new Pd('anonymous-upgrade-merge-conflict', null, c || b.credential));
          })
          .then(function () {
            a.g && (a.g.m(), (a.g = null));
            throw b;
          });
      }
      return ff(b);
    }
    function Sn(a, b, c, d) {
      P.call(this, kl, void 0, d, 'providerMatchByEmail', { F: b, D: c });
      this.i = a;
    }
    m(Sn, P);
    Sn.prototype.v = function () {
      this.u(this.i);
      this.w(this.i);
      this.l().focus();
      Dm(this.l(), (this.l().value || '').length);
      P.prototype.v.call(this);
    };
    Sn.prototype.o = function () {
      this.i = null;
      P.prototype.o.call(this);
    };
    u(Sn.prototype, { l: ul, H: vl, u: wl, B: xl, j: yl, M: ll, w: nl });
    function Tn(a, b, c, d, e) {
      P.call(this, jl, { ec: b }, e, 'selectTenant', { F: c, D: d });
      this.i = a;
    }
    m(Tn, P);
    Tn.prototype.v = function () {
      Un(this, this.i);
      P.prototype.v.call(this);
    };
    Tn.prototype.o = function () {
      this.i = null;
      P.prototype.o.call(this);
    };
    function Un(a, b) {
      function c(h) {
        b(h);
      }
      for (
        let d = a.g ? Tc('firebaseui-id-tenant-selection-button', a.g || a.s.a) : [], e = 0;
        e < d.length;
        e++
      ) {
        const f = d[e];
        const g = kn(f, 'tenantId');
        O(a, f, za(c, g));
      }
    }
    function Vn(a) {
      P.call(this, Ek, void 0, a, 'spinner');
    }
    m(Vn, P);
    function Wn(a) {
      this.a = new Jh();
      G(this.a, 'authDomain');
      G(this.a, 'displayMode', Xn);
      G(this.a, 'tenants');
      G(this.a, 'callbacks');
      G(this.a, 'tosUrl');
      G(this.a, 'privacyPolicyUrl');
      for (const b in a)
        if (a.hasOwnProperty(b))
          try {
            Kh(this.a, b, a[b]);
          } catch (c) {
            qg('Invalid config: "' + b + '"', void 0);
          }
    }
    function Yn(a) {
      a = a.a.get('displayMode');
      for (const b in Zn) if (Zn[b] === a) return Zn[b];
      return Xn;
    }
    function $n(a) {
      return a.a.get('callbacks') || {};
    }
    function ao(a) {
      const b = a.a.get('tosUrl') || null;
      a = a.a.get('privacyPolicyUrl') || null;
      b && !a && vg('Privacy Policy URL is missing, the link will not be displayed.');
      if (b && a) {
        if (typeof b === 'function') return b;
        if (typeof b === 'string')
          return function () {
            tf(b);
          };
      }
      return null;
    }
    function bo(a) {
      const b = a.a.get('tosUrl') || null;
      const c = a.a.get('privacyPolicyUrl') || null;
      c && !b && vg('Terms of Service URL is missing, the link will not be displayed.');
      if (b && c) {
        if (typeof c === 'function') return c;
        if (typeof c === 'string')
          return function () {
            tf(c);
          };
      }
      return null;
    }
    function co(a, b) {
      a = a.a.get('tenants');
      if (!a || (!a.hasOwnProperty(b) && !a.hasOwnProperty(eo)))
        throw Error('Invalid tenant configuration!');
    }
    function fo(a, b, c) {
      a = a.a.get('tenants');
      if (!a) throw Error('Invalid tenant configuration!');
      const d = [];
      a = a[b] || a[eo];
      if (!a) return qg('Invalid tenant configuration: ' + (b + ' is not configured!'), void 0), d;
      b = a.signInOptions;
      if (!b) throw Error('Invalid tenant configuration: signInOptions are invalid!');
      b.forEach(function (e) {
        if (typeof e === 'string') d.push(e);
        else if (typeof e.provider === 'string') {
          const f = e.hd;
          f && c
            ? (f instanceof RegExp ? f : new RegExp('@' + f.replace('.', '\\.') + '$')).test(c) &&
              d.push(e.provider)
            : d.push(e.provider);
        } else
          (e =
            'Invalid tenant configuration: signInOption ' + (JSON.stringify(e) + ' is invalid!')),
            qg(e, void 0);
      });
      return d;
    }
    function go(a, b, c) {
      a = ho(a, b);
      (b = a.signInOptions) &&
        c &&
        ((b = b.filter(function (d) {
          return typeof d === 'string' ? c.includes(d) : c.includes(d.provider);
        })),
        (a.signInOptions = b));
      return a;
    }
    function ho(a, b) {
      const c = io;
      var d = void 0 === d ? {} : d;
      co(a, b);
      a = a.a.get('tenants');
      return yf(a[b] || a[eo], c, d);
    }
    var io = [
      'immediateFederatedRedirect',
      'privacyPolicyUrl',
      'signInFlow',
      'signInOptions',
      'tosUrl'
    ];
    var Xn = 'optionFirst';
    var Zn = { pc: Xn, oc: 'identifierFirst' };
    var eo = '*';
    function jo(a, b) {
      const c = this;
      this.s = uf(a);
      this.a = {};
      Object.keys(b).forEach(function (d) {
        c.a[d] = new Wn(b[d]);
      });
      this.ob = this.g = this.A = this.h = this.i = this.j = null;
      Object.defineProperty(this, 'languageCode', {
        get: function () {
          return this.ob;
        },
        set: function (d) {
          this.ob = d || null;
        },
        enumerable: !1
      });
    }
    l = jo.prototype;
    l.Ub = function (a, b) {
      const c = this;
      ko(this);
      const d = a.apiKey;
      return new Xe(function (e, f) {
        if (c.a.hasOwnProperty(d)) {
          const g = $n(c.a[d]).selectTenantUiHidden || null;
          if (Yn(c.a[d]) === Xn) {
            const h = [];
            b.forEach(function (t) {
              t = t || '_';
              let I = c.a[d].a.get('tenants');
              if (!I) throw Error('Invalid tenant configuration!');
              (I = I[t] || I[eo])
                ? (t = {
                    tenantId: t !== '_' ? t : null,
                    V: I.fullLabel || null,
                    displayName: I.displayName,
                    za: I.iconUrl,
                    ta: I.buttonColor
                  })
                : (qg('Invalid tenant configuration: ' + (t + ' is not configured!'), void 0),
                  (t = null));
              t && h.push(t);
            });
            const k = function (t) {
              t = { tenantId: t, providerIds: fo(c.a[d], t || '_') };
              e(t);
            };
            if (h.length === 1) {
              k(h[0].tenantId);
              return;
            }
            c.g = new Tn(
              function (t) {
                ko(c);
                g && g();
                k(t);
              },
              h,
              ao(c.a[d]),
              bo(c.a[d])
            );
          } else
            c.g = new Sn(
              function () {
                let t = c.g.j();
                if (t) {
                  for (let I = 0; I < b.length; I++) {
                    const Ca = fo(c.a[d], b[I] || '_', t);
                    if (Ca.length !== 0) {
                      t = { tenantId: b[I], providerIds: Ca, email: t };
                      ko(c);
                      g && g();
                      e(t);
                      return;
                    }
                  }
                  c.g.a(Nd({ code: 'no-matching-tenant-for-email' }).toString());
                }
              },
              ao(c.a[d]),
              bo(c.a[d])
            );
          c.g.render(c.s);
          (f = $n(c.a[d]).selectTenantUiShown || null) && f();
        } else {
          const p = Error('Invalid project configuration: API key is invalid!');
          p.code = 'invalid-configuration';
          c.pb(p);
          f(p);
        }
      });
    };
    l.Pb = function (a, b) {
      if (!this.a.hasOwnProperty(a))
        throw Error('Invalid project configuration: API key is invalid!');
      const c = b || void 0;
      co(this.a[a], b || '_');
      try {
        this.i = firebase.app(c).auth();
      } catch (e) {
        const d = this.a[a].a.get('authDomain');
        if (!d) throw Error('Invalid project configuration: authDomain is required!');
        a = firebase.initializeApp({ apiKey: a, authDomain: d }, c);
        a.auth().tenantId = b;
        this.i = a.auth();
      }
      return this.i;
    };
    l.Zb = function (a, b) {
      const c = this;
      return new Xe(function (d, e) {
        function f(I, Ca) {
          c.j = new En(a);
          Mn(c.j, c.s, I, Ca);
        }
        const g = a.app.options.apiKey;
        c.a.hasOwnProperty(g) || e(Error('Invalid project configuration: API key is invalid!'));
        const h = go(c.a[g], a.tenantId || '_', b && b.providerIds);
        ko(c);
        e = {
          signInSuccessWithAuthResult: function (I) {
            d(I);
            return !1;
          }
        };
        const k = $n(c.a[g]).signInUiShown || null;
        let p = !1;
        e.uiChanged = function (I, Ca) {
          I === null && Ca === 'callback'
            ? ((I = Vc('firebaseui-id-page-callback', c.s)) && Pj(I),
              (c.h = new Vn()),
              c.h.render(c.s))
            : p ||
              (I === null && Ca === 'spinner') ||
              Ca === 'blank' ||
              (c.h && (c.h.m(), (c.h = null)), (p = !0), k && k(a.tenantId));
        };
        h.callbacks = e;
        h.credentialHelper = 'none';
        let t;
        b && b.email && (t = { emailHint: b.email });
        c.j
          ? c.j.Wa().then(function () {
              f(h, t);
            })
          : f(h, t);
      });
    };
    l.reset = function () {
      const a = this;
      return F()
        .then(function () {
          a.j && a.j.Wa();
        })
        .then(function () {
          a.j = null;
          ko(a);
        });
    };
    l.Vb = function () {
      const a = this;
      this.h ||
        this.A ||
        (this.A = window.setTimeout(function () {
          ko(a);
          a.h = new Vn();
          a.g = a.h;
          a.h.render(a.s);
          a.A = null;
        }, 500));
    };
    l.mb = function () {
      window.clearTimeout(this.A);
      this.A = null;
      this.h && (this.h.m(), (this.h = null));
    };
    l.Bb = function () {
      ko(this);
      this.g = new Gl();
      this.g.render(this.s);
      return F();
    };
    function ko(a) {
      a.j && a.j.reset();
      a.mb();
      a.g && a.g.m();
    }
    l.pb = function (a) {
      const b = this;
      const c = Nd({ code: a.code }).toString() || a.message;
      ko(this);
      let d;
      a.retry &&
        typeof a.retry === 'function' &&
        (d = function () {
          b.reset();
          a.retry();
        });
      this.g = new Kl(c, d);
      this.g.render(this.s);
    };
    l.Rb = function (a) {
      const b = this;
      return F()
        .then(function () {
          let c = b.i && b.i.app.options.apiKey;
          if (!b.a.hasOwnProperty(c))
            throw Error('Invalid project configuration: API key is invalid!');
          co(b.a[c], a.tenantId || '_');
          if (!b.i.currentUser || b.i.currentUser.uid !== a.uid)
            throw Error('The user being processed does not match the signed in user!');
          return (c = $n(b.a[c]).beforeSignInSuccess || null) ? c(a) : a;
        })
        .then(function (c) {
          if (c.uid !== a.uid) throw Error('User with mismatching UID returned.');
          return c;
        });
    };
    v('firebaseui.auth.FirebaseUiHandler', jo);
    v('firebaseui.auth.FirebaseUiHandler.prototype.selectTenant', jo.prototype.Ub);
    v('firebaseui.auth.FirebaseUiHandler.prototype.getAuth', jo.prototype.Pb);
    v('firebaseui.auth.FirebaseUiHandler.prototype.startSignIn', jo.prototype.Zb);
    v('firebaseui.auth.FirebaseUiHandler.prototype.reset', jo.prototype.reset);
    v('firebaseui.auth.FirebaseUiHandler.prototype.showProgressBar', jo.prototype.Vb);
    v('firebaseui.auth.FirebaseUiHandler.prototype.hideProgressBar', jo.prototype.mb);
    v('firebaseui.auth.FirebaseUiHandler.prototype.completeSignOut', jo.prototype.Bb);
    v('firebaseui.auth.FirebaseUiHandler.prototype.handleError', jo.prototype.pb);
    v('firebaseui.auth.FirebaseUiHandler.prototype.processUser', jo.prototype.Rb);
    v('firebaseui.auth.AuthUI', En);
    v('firebaseui.auth.AuthUI.getInstance', function (a) {
      a = Fn(a);
      return Gn[a] ? Gn[a] : null;
    });
    v('firebaseui.auth.AuthUI.prototype.disableAutoSignIn', En.prototype.Db);
    v('firebaseui.auth.AuthUI.prototype.start', En.prototype.start);
    v('firebaseui.auth.AuthUI.prototype.setConfig', En.prototype.ib);
    v('firebaseui.auth.AuthUI.prototype.signIn', En.prototype.Wb);
    v('firebaseui.auth.AuthUI.prototype.reset', En.prototype.reset);
    v('firebaseui.auth.AuthUI.prototype.delete', En.prototype.Wa);
    v('firebaseui.auth.AuthUI.prototype.isPendingRedirect', En.prototype.nb);
    v('firebaseui.auth.AuthUIError', Pd);
    v('firebaseui.auth.AuthUIError.prototype.toJSON', Pd.prototype.toJSON);
    v('firebaseui.auth.CredentialHelper.GOOGLE_YOLO', pi);
    v('firebaseui.auth.CredentialHelper.NONE', ei);
    v('firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID', 'anonymous');
    Xe.prototype.catch = Xe.prototype.Ca;
    Xe.prototype.finally = Xe.prototype.fc;
  }).apply(typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : window);
  if (typeof window !== 'undefined') {
    window.dialogPolyfill = require('dialog-polyfill');
  }
})();
module.exports = firebaseui;
