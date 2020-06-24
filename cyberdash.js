'use strict';
(window.webpackJsonp = window.webpackJsonp || []).push([[0], {
  24 : function(branchData, beforeZero, afterZero) {
  },
  40 : function(module, object, instantiate) {
    module.exports = instantiate(64);
  },
  45 : function(branchData, beforeZero, afterZero) {
  },
  46 : function(branchData, beforeZero, afterZero) {
  },
  64 : function(name, res, a) {
    /**
     * @param {?} lagOffset
     * @return {?}
     */
    function render(lagOffset) {
      return register.apply(this, arguments);
    }
    /**
     * @return {?}
     */
    function register() {
      return (register = Object(schema.a)(that.a.mark(function init(conid) {
        var passed;
        return that.a.wrap(function(_context4) {
          for (;;) {
            switch(_context4.prev = _context4.next) {
              case 0:
                return this.setState({
                  color : "white",
                  status : "Authenticating..."
                }), _context4.next = 3, self.bindLicense(conid);
              case 3:
                passed = _context4.sent;
                this.setState({
                  color : passed ? "#44c487" : "red",
                  status : passed ? "Successfully bound license" : "License is invalid or already bound to another user"
                });
                if (self.mobile) {
                  setTimeout(this.setState.bind(this), 2E3, {
                    status : void 0
                  });
                }
              case 6:
              case "end":
                return _context4.stop();
            }
          }
        }, init, this);
      }))).apply(this, arguments);
    }
    /**
     * @return {?}
     */
    function App() {
      return row.a.createElement("div", {
        className : "header-container"
      }, row.a.createElement("div", {
        className : "header-branding"
      }, row.a.createElement("div", {
        className : "header-logo"
      }), "Dashboard"), row.a.createElement("div", {
        className : "header-user-container"
      }, row.a.createElement("span", {
        className : "header-user-logout",
        onClick : self.logout
      }, "Logout")));
    }
    /**
     * @return {?}
     */
    function MemoFieldset() {
      return row.a.createElement("div", {
        className : "loading-screen-container"
      }, row.a.createElement("div", {
        className : "loading-screen-loader"
      }));
    }
    a.r(res);
    var m = a(0);
    var row = a.n(m);
    var i = a(33);
    var f = a.n(i);
    var pkg = (a(45), a(3));
    var data = a(8);
    var h = a(5);
    var d = a(4);
    var a1 = a(6);
    var c = a(17);
    var o = a(22);
    var value = (a(46), a(7));
    var that = a.n(value);
    var schema = a(11);
    var e = a(21);
    var Route = (a(24), function(results) {
      /**
       * @return {?}
       */
      function e() {
        return Object(pkg.a)(this, e), Object(h.a)(this, Object(d.a)(e).apply(this, arguments));
      }
      return Object(a1.a)(e, results), Object(data.a)(e, [{
        key : "render",
        value : function() {
          return row.a.createElement("div", {
            style : {
              height : 2 * this.props.radius + "px",
              width : 2 * this.props.radius + "px",
              borderRadius : "50%",
              backgroundColor : this.props.color || "rgba(0,0,0,0.4)",
              cursor : "pointer",
              backgroundImage : "url(".concat(this.props.icon, ")"),
              backgroundPosition : "center",
              backgroundRepeat : "no-repeat",
              backgroundSize : .6 * this.props.radius + "px"
            },
            onClick : this.props.onclick
          });
        }
      }]), e;
    }(row.a.Component));
    var ap = a(38);
    var self = function() {
      /**
       * @return {undefined}
       */
      function e() {
        Object(pkg.a)(this, e);
      }
      return Object(data.a)(e, null, [{
        key : "checkMobile",
        value : function() {
          return document.documentElement.clientWidth < 900 || document.documentElement.clientHeight < 600;
        }
      }, {
        key : "removeDisplayNoneZE",
        value : function() {
          try {
            /** @type {string} */
            document.querySelector("#launcher").style.display = "block";
          } catch (e) {
          }
        }
      }, {
        key : "createConnection",
        value : function() {
          var self = this;
          var taskResult = (new ap.a).withUrl("/connect/user").build();
          return taskResult.on("updateLicense", function(data) {
            return self.license = data, self.onUpdate && self.onUpdate();
          }), taskResult.on("updateTask", function(switcherWindowId, t, classe) {
            var i;
            for (i in self.tasks) {
              if (self.tasks[i].id == switcherWindowId) {
                self.tasks[i][t] = classe;
              }
            }
            return self.onUpdate && self.onUpdate();
          }), taskResult.on("setTasks", function(tasks) {
            return self.tasks = tasks, self.onUpdate && self.onUpdate();
          }), taskResult.on("newCheckout", function(systemsPath, a) {
            return a ? (self.purchases.unshift(systemsPath), self.stats.success.today++, self.stats.success.week++, self.stats.success.month++, self.stats.success.year++, self.stats.success.total++, self.stats.total++) : (self.stats.declines.total++, self.stats.total++), self.onUpdate && self.onUpdate();
          }), taskResult;
        }
      }, {
        key : "subscribe",
        value : function() {
          var oldSetupComputes = Object(schema.a)(that.a.mark(function init() {
            return that.a.wrap(function(_context4) {
              for (;;) {
                switch(_context4.prev = _context4.next) {
                  case 0:
                    if (!this.loading) {
                      /** @type {number} */
                      _context4.next = 2;
                      break;
                    }
                    return _context4.abrupt("return");
                  case 2:
                    if (this.loading = true, 0 !== this.connection.state) {
                      /** @type {number} */
                      _context4.next = 6;
                      break;
                    }
                    return _context4.next = 6, this.connection.start();
                  case 6:
                    return _context4.next = 8, this.connection.invoke("getLicense");
                  case 8:
                    if (this.license = _context4.sent, null == this.license) {
                      /** @type {number} */
                      _context4.next = 16;
                      break;
                    }
                    return _context4.next = 12, this.connection.invoke("getPurchases", 50, 0);
                  case 12:
                    return this.purchases = _context4.sent, _context4.next = 15, this.connection.invoke("getStats");
                  case 15:
                    this.stats = _context4.sent;
                  case 16:
                    return this.loading = false, this.loaded = true, this.onLoad && this.onLoad(), _context4.abrupt("return", this.license);
                  case 20:
                  case "end":
                    return _context4.stop();
                }
              }
            }, init, this);
          }));
          return function() {
            return oldSetupComputes.apply(this, arguments);
          };
        }()
      }, {
        key : "logout",
        value : function() {
          /** @type {string} */
          window.location.href = "/account/logout";
        }
      }, {
        key : "download",
        value : function() {
          /** @type {string} */
          window.location.href = "/download";
        }
      }, {
        key : "openSupport",
        value : function() {
          /** @type {string} */
          window.location.href = "https://support.cybersole.io";
        }
      }]), e;
    }();
    self.connection = self.createConnection();
    self.mobile = (window.onresize = function() {
      self.mobile = self.checkMobile();
      if (window.zE) {
        if (self.mobile && window.zE.hide) {
          self.toggleZE(!(self.mobile || self.hideZE));
        } else {
          if (window.zE.show) {
            self.toggleZE(!(self.mobile || self.hideZE));
          }
        }
      }
      if (self.onUpdate) {
        self.onUpdate();
      }
    }, window.onload = function() {
      if (window.zE) {
        if (self.mobile && window.zE.hide) {
          self.toggleZE(!(self.mobile || self.hideZE));
        } else {
          if (window.zE.show) {
            self.toggleZE(!(self.mobile || self.hideZE));
          }
        }
      }
    }, setInterval(function() {
      self.toggleZE(!(self.mobile || self.hideZE));
    }, 1e3), self.checkMobile());
    /** @type {boolean} */
    self.hideZE = true;
    /**
     * @param {boolean} undefined
     * @return {undefined}
     */
    self.toggleZE = function(undefined) {
      if (self.zeState !== undefined && window.zE && window.zE.hide && window.zE.show) {
        if (undefined) {
          if (!window.zE.show()) {
            self.removeDisplayNoneZE();
          }
        } else {
          window.zE.hide();
        }
        /** @type {boolean} */
        self.zeState = undefined;
      }
    };
    /**
     * @param {!Function} callbackFn
     * @return {undefined}
     */
    self.lockOrientation = function(callbackFn) {
      try {
        window.screen.orientation.lock("portrait").then(callbackFn || function() {
        });
      } catch (t) {
        (callbackFn || function() {
        })();
      }
    };
    self.renewLicense = function() {
      var oldSetupComputes = Object(schema.a)(that.a.mark(function init(i, h) {
        return that.a.wrap(function(_context) {
          for (;;) {
            switch(_context.prev = _context.next) {
              case 0:
                return _context.next = 2, self.connection.invoke("renew", {
                  email : i,
                  token : h
                });
              case 2:
                return _context.abrupt("return", _context.sent);
              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, init);
      }));
      return function(canCreateDiscussions, a) {
        return oldSetupComputes.apply(this, arguments);
      };
    }();
    self.sendCommand = function() {
      var oldSetupComputes = Object(schema.a)(that.a.mark(function init(vitals) {
        var customfont;
        /** @type {!Arguments} */
        var fixtureUrls = arguments;
        return that.a.wrap(function(context$5$0) {
          for (;;) {
            switch(context$5$0.prev = context$5$0.next) {
              case 0:
                return customfont = fixtureUrls.length > 1 && void 0 !== fixtureUrls[1] ? fixtureUrls[1] : null, context$5$0.next = 3, self.connection.send("sendCommand", vitals, customfont);
              case 3:
              case "end":
                return context$5$0.stop();
            }
          }
        }, init);
      }));
      return function(canCreateDiscussions) {
        return oldSetupComputes.apply(this, arguments);
      };
    }();
    self.bindLicense = function() {
      var oldSetupComputes = Object(schema.a)(that.a.mark(function start(dirname) {
        var result;
        return that.a.wrap(function(_context2) {
          for (;;) {
            switch(_context2.prev = _context2.next) {
              case 0:
                return _context2.next = 2, self.connection.invoke("bind", dirname);
              case 2:
                if (!(result = _context2.sent)) {
                  /** @type {number} */
                  _context2.next = 6;
                  break;
                }
                return _context2.next = 6, self.subscribe();
              case 6:
                return _context2.abrupt("return", result);
              case 7:
              case "end":
                return _context2.stop();
            }
          }
        }, start);
      }));
      return function(canCreateDiscussions) {
        return oldSetupComputes.apply(this, arguments);
      };
    }();
    self.unbindLicense = Object(schema.a)(that.a.mark(function start() {
      var result;
      return that.a.wrap(function(_context2) {
        for (;;) {
          switch(_context2.prev = _context2.next) {
            case 0:
              return _context2.next = 2, self.connection.invoke("unbind");
            case 2:
              return (result = _context2.sent) && window.location.reload(), _context2.abrupt("return", result);
            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, start);
    }));
    self.resetLicense = Object(schema.a)(that.a.mark(function init() {
      return that.a.wrap(function(_context) {
        for (;;) {
          switch(_context.prev = _context.next) {
            case 0:
              return _context.next = 2, self.connection.invoke("reset");
            case 2:
              return _context.abrupt("return", _context.sent);
            case 3:
            case "end":
              return _context.stop();
          }
        }
      }, init);
    }));
    self.createTask = function() {
      var oldSetupComputes = Object(schema.a)(that.a.mark(function init(vitals) {
        return that.a.wrap(function(_context) {
          for (;;) {
            switch(_context.prev = _context.next) {
              case 0:
                return _context.next = 2, self.connection.send("quickTask", vitals);
              case 2:
                return _context.abrupt("return", _context.sent);
              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, init);
      }));
      return function(canCreateDiscussions) {
        return oldSetupComputes.apply(this, arguments);
      };
    }();
    self.deleteTask = function() {
      var oldSetupComputes = Object(schema.a)(that.a.mark(function init(vitals) {
        return that.a.wrap(function(_context) {
          for (;;) {
            switch(_context.prev = _context.next) {
              case 0:
                return _context.next = 2, self.connection.send("deleteTask", vitals);
              case 2:
                return _context.abrupt("return", _context.sent);
              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, init);
      }));
      return function(canCreateDiscussions) {
        return oldSetupComputes.apply(this, arguments);
      };
    }();
    self.toggleTask = function() {
      var oldSetupComputes = Object(schema.a)(that.a.mark(function init(vitals) {
        return that.a.wrap(function(_context) {
          for (;;) {
            switch(_context.prev = _context.next) {
              case 0:
                return _context.next = 2, self.connection.send("toggleTask", vitals);
              case 2:
                return _context.abrupt("return", _context.sent);
              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, init);
      }));
      return function(canCreateDiscussions) {
        return oldSetupComputes.apply(this, arguments);
      };
    }();
    var event = a(39);
    var xAxis = function(e) {
      /**
       * @return {?}
       */
      function init() {
        var _Object$getPrototypeO;
        var t;
        Object(pkg.a)(this, init);
        /** @type {number} */
        var I = arguments.length;
        /** @type {!Array} */
        var vargs = new Array(I);
        /** @type {number} */
        var i = 0;
        for (; i < I; i++) {
          vargs[i] = arguments[i];
        }
        return (t = Object(h.a)(this, (_Object$getPrototypeO = Object(d.a)(init)).call.apply(_Object$getPrototypeO, [this].concat(vargs)))).componentDidMount = function() {
          /**
           * @return {undefined}
           */
          t.ref.onmouseenter = function() {
            var rectangleDimensions = t.ref.getBoundingClientRect();
            var chartBottom = (rectangleDimensions.left, rectangleDimensions.bottom);
            var resultCategoriesMap = Object(event.a)(init.overlayElement, 2);
            var r = resultCategoriesMap[0];
            var numberOfConcurrentEditorsValue = resultCategoriesMap[1];
            /** @type {string} */
            r.style.display = "none";
            /** @type {string} */
            r.style.top = chartBottom + 3 + "px";
            numberOfConcurrentEditorsValue.innerHTML = t.props.value;
            /** @type {string} */
            r.style.zIndex = "-99";
            /** @type {string} */
            r.style.display = "flex";
            var foodIconDefinition = r.getBoundingClientRect();
            /** @type {string} */
            r.style.left = rectangleDimensions.left + rectangleDimensions.width / 2 - foodIconDefinition.width / 2 + "px";
            /** @type {number} */
            var autoResumeTimer = setTimeout(function() {
              /** @type {string} */
              r.style.zIndex = "99";
              /**
               * @return {undefined}
               */
              t.hide = function() {
                /** @type {string} */
                r.style.display = "none";
                /**
                 * @return {?}
                 */
                t.hide = function() {
                  return null;
                };
              };
              if (t.ref) {
                /** @type {function(): undefined} */
                t.ref.onmouseleave = t.hide;
              }
            }, 200);
            /**
             * @return {?}
             */
            t.ref.onmouseleave = function() {
              return clearTimeout(autoResumeTimer);
            };
          };
        }, t.render = function() {
          return row.a.createElement("div", {
            ref : function(el) {
              return t.ref = el;
            }
          }, t.props.children);
        }, t.hide = function() {
          return null;
        }, t.props.hideRef && t.props.hideRef(function() {
          return t.hide();
        }), t;
      }
      return Object(a1.a)(init, e), Object(data.a)(init, null, [{
        key : "overlayElement",
        get : function() {
          return document.querySelector("#span-tooltip.span-tooltip-container") ? [document.querySelector("#span-tooltip.span-tooltip-container"), document.querySelector("#span-tooltip.span-tooltip-container > .span-tooltip-value")] : function() {
            /** @type {!Element} */
            var e = document.createElement("div");
            e.classList.add("span-tooltip-container");
            /** @type {string} */
            e.id = "span-tooltip";
            /** @type {!Element} */
            var t = document.createElement("div");
            t.classList.add("span-tooltip-arrow");
            e.appendChild(t);
            /** @type {!Element} */
            var a = document.createElement("span");
            return a.classList.add("span-tooltip-value"), e.appendChild(a), document.body.appendChild(e), [e, a];
          }();
        }
      }]), init;
    }(row.a.Component);
    /**
     * @return {undefined}
     */
    xAxis.hide = function() {
      /** @type {string} */
      xAxis.overlayElement[0].style.display = "none";
    };
    var change = a(12);
    var FormioElement = Object(change.injectStripe)(function(e) {
      /**
       * @return {?}
       */
      function init() {
        var _Object$getPrototypeO;
        var _this;
        Object(pkg.a)(this, init);
        /** @type {number} */
        var I = arguments.length;
        /** @type {!Array} */
        var vargs = new Array(I);
        /** @type {number} */
        var i = 0;
        for (; i < I; i++) {
          vargs[i] = arguments[i];
        }
        return (_this = Object(h.a)(this, (_Object$getPrototypeO = Object(d.a)(init)).call.apply(_Object$getPrototypeO, [this].concat(vargs)))).handleSubmit = function() {
          var oldSetupComputes = Object(schema.a)(that.a.mark(function update(event) {
            var file;
            return that.a.wrap(function(_context) {
              for (;;) {
                switch(_context.prev = _context.next) {
                  case 0:
                    if (event.preventDefault(), !_this.state.processing) {
                      /** @type {number} */
                      _context.next = 3;
                      break;
                    }
                    return _context.abrupt("return");
                  case 3:
                    return _this.setState({
                      status : "Processing",
                      processing : true
                    }), _context.next = 6, _this.props.stripe.createSource({
                      type : "card"
                    });
                  case 6:
                    if (!(file = _context.sent).error) {
                      /** @type {number} */
                      _context.next = 9;
                      break;
                    }
                    return _context.abrupt("return", _this.setState({
                      status : file.error.message,
                      processing : false
                    }));
                  case 9:
                    return _context.next = 11, self.renewLicense(_this.state.email, file.source.id);
                  case 11:
                    if (!_context.sent) {
                      /** @type {number} */
                      _context.next = 18;
                      break;
                    }
                    return _this.setState({
                      status : "Successfully renewed License",
                      processing : false
                    }), _this.to = setTimeout(_this.props.onClose.bind(Object(e.a)(_this)), 1E3), _context.abrupt("return");
                  case 18:
                    return _context.abrupt("return", _this.setState({
                      status : "Your Card was declined",
                      processing : false
                    }));
                  case 19:
                  case "end":
                    return _context.stop();
                }
              }
            }, update);
          }));
          return function(canCreateDiscussions) {
            return oldSetupComputes.apply(this, arguments);
          };
        }(), _this.componentWillUnmount = function() {
          return _this.to && clearTimeout(_this.to);
        }, _this.state = {}, _this.loaded = 0, _this.focus = function(value) {
          return function() {
            return _this.setState({
              focused : value
            });
          };
        }, _this.blur = function(item) {
          return function() {
            return _this.state.focused === item && _this.setState({
              focused : void 0
            });
          };
        }, _this.change = function() {
          return _this.setState({
            status : void 0
          });
        }, _this.setMail = function(val) {
          return _this.setState({
            email : val.target.value
          });
        }, _this.elementLoaded = function() {
          _this.loaded++;
          if (3 === _this.loaded) {
            _this.setState({
              loaded : true
            });
          }
        }, _this.render = function() {
          return _this.props.mobile ? row.a.createElement("form", {
            onSubmit : _this.handleSubmit,
            className : "renew-form"
          }, row.a.createElement("div", {
            className : "renew-header mobile"
          }, row.a.createElement("div", {
            onClick : _this.props.onClose,
            className : "renew-back-button"
          }), " Renew License - 6 Months"), !_this.state.loaded && row.a.createElement("div", {
            className : "renew-loader-container"
          }, row.a.createElement("div", {
            className : "renew-loader mobile"
          })), row.a.createElement("div", {
            className : "renew-input-element email mobile",
            style : "email" === _this.state.focused ? {
              border : "1px solid #44c487",
              padding : "9px",
              opacity : _this.state.loaded ? 1 : 0
            } : {
              opacity : _this.state.loaded ? 1 : 0
            }
          }, row.a.createElement("input", {
            onFocus : _this.focus("email"),
            value : _this.state.email,
            onChange : _this.setMail,
            onBlur : _this.blur("email"),
            type : "text",
            placeholder : "Email",
            className : "renew-input-email mobile"
          })), row.a.createElement("div", {
            className : "renew-input-element card mobile",
            style : "card" === _this.state.focused ? {
              border : "1px solid #44c487",
              padding : "9px",
              opacity : _this.state.loaded ? 1 : 0
            } : {
              opacity : _this.state.loaded ? 1 : 0
            }
          }, row.a.createElement(change.CardNumberElement, {
            placeholder : "Card Number",
            style : {
              base : {
                color : "rgba(255, 255, 255, 0.7)",
                fontSize : "12px",
                fontWeight : "bold"
              }
            },
            onReady : _this.elementLoaded,
            onFocus : _this.focus("card"),
            onBlur : _this.blur("card"),
            onChange : _this.change,
            className : "renew-input-number"
          }), row.a.createElement(change.CardExpiryElement, {
            placeholder : "MM / YY",
            style : {
              base : {
                color : "rgba(255, 255, 255, 0.7)",
                fontSize : "12px",
                fontWeight : "bold"
              }
            },
            onReady : _this.elementLoaded,
            onFocus : _this.focus("card"),
            onBlur : _this.blur("card"),
            onChange : _this.change,
            className : "renew-input-expiry"
          }), row.a.createElement(change.CardCVCElement, {
            placeholder : "CVV",
            style : {
              base : {
                color : "rgba(255, 255, 255, 0.7)",
                fontSize : "12px",
                fontWeight : "bold"
              }
            },
            onReady : _this.elementLoaded,
            onFocus : _this.focus("card"),
            onBlur : _this.blur("card"),
            onChange : _this.change,
            className : "renew-input-cvc"
          })), row.a.createElement("div", {
            className : "renew-submit-container mobile"
          }, _this.state.processing && !_this.state.status ? row.a.createElement("div", {
            className : "renew-input-submit processing mobile"
          }, "Renew") : row.a.createElement("input", {
            type : "submit",
            value : "Pay \u00a3100",
            style : {
              opacity : _this.state.loaded ? 1 : 0
            },
            className : "renew-input-submit mobile"
          }), row.a.createElement("span", null, _this.state.status))) : row.a.createElement("form", {
            onSubmit : _this.handleSubmit,
            className : "renew-form"
          }, row.a.createElement("div", {
            className : "renew-header"
          }, row.a.createElement("div", {
            onClick : _this.props.onClose,
            className : "renew-back-button"
          }), " Renew License - 6 Months"), !_this.state.loaded && row.a.createElement("div", {
            className : "renew-loader-container"
          }, row.a.createElement("div", {
            className : "renew-loader"
          })), row.a.createElement("div", {
            className : "renew-input-element email",
            style : "email" === _this.state.focused ? {
              border : "1px solid #44c487",
              padding : "14px",
              opacity : _this.state.loaded ? 1 : 0
            } : {
              opacity : _this.state.loaded ? 1 : 0
            }
          }, row.a.createElement("input", {
            onFocus : _this.focus("email"),
            value : _this.state.email,
            onChange : _this.setMail,
            onBlur : _this.blur("email"),
            type : "text",
            placeholder : "Email",
            className : "renew-input-email"
          })), row.a.createElement("div", {
            className : "renew-input-element card",
            style : "card" === _this.state.focused ? {
              border : "1px solid #44c487",
              padding : "14px",
              opacity : _this.state.loaded ? 1 : 0
            } : {
              opacity : _this.state.loaded ? 1 : 0
            }
          }, row.a.createElement(change.CardNumberElement, {
            placeholder : "Card Number",
            style : {
              base : {
                color : "rgba(255, 255, 255, 0.7)",
                fontSize : "18px",
                fontWeight : "bold"
              }
            },
            onReady : _this.elementLoaded,
            onFocus : _this.focus("card"),
            onBlur : _this.blur("card"),
            onChange : _this.change,
            className : "renew-input-number"
          }), row.a.createElement(change.CardExpiryElement, {
            style : {
              base : {
                color : "rgba(255, 255, 255, 0.7)",
                fontSize : "18px",
                fontWeight : "bold"
              }
            },
            onReady : _this.elementLoaded,
            onFocus : _this.focus("card"),
            onBlur : _this.blur("card"),
            onChange : _this.change,
            className : "renew-input-expiry"
          }), row.a.createElement(change.CardCVCElement, {
            style : {
              base : {
                color : "rgba(255, 255, 255, 0.7)",
                fontSize : "18px",
                fontWeight : "bold"
              }
            },
            onReady : _this.elementLoaded,
            onFocus : _this.focus("card"),
            onBlur : _this.blur("card"),
            onChange : _this.change,
            className : "renew-input-cvc"
          })), row.a.createElement("div", {
            className : "renew-submit-container"
          }, _this.state.processing && !_this.state.status ? row.a.createElement("div", {
            className : "renew-input-submit processing"
          }, "Renew") : row.a.createElement("input", {
            type : "submit",
            value : "Pay \u00a3100",
            style : {
              opacity : _this.state.loaded ? 1 : 0
            },
            className : "renew-input-submit"
          }), row.a.createElement("span", null, _this.state.status)));
        }, _this;
      }
      return Object(a1.a)(init, e), init;
    }(row.a.Component));
    var p = function(e) {
      /**
       * @return {?}
       */
      function init() {
        var _Object$getPrototypeO;
        var $scope;
        Object(pkg.a)(this, init);
        /** @type {number} */
        var I = arguments.length;
        /** @type {!Array} */
        var vargs = new Array(I);
        /** @type {number} */
        var i = 0;
        for (; i < I; i++) {
          vargs[i] = arguments[i];
        }
        return ($scope = Object(h.a)(this, (_Object$getPrototypeO = Object(d.a)(init)).call.apply(_Object$getPrototypeO, [this].concat(vargs)))).months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], $scope.state = {
          visible : false,
          showRenewView : false
        }, $scope.componentWillMount = function() {
          return self.hideZE = false;
        }, $scope.toggleVisibility = function() {
          $scope.setState({
            visible : !$scope.state.visible
          });
        }, $scope.openHelp = function() {
          window.zE.activate();
        }, $scope.toggleRenew = function(isIron) {
          return function() {
            return $scope.setState({
              showRenewView : isIron
            }) || xAxis.hide();
          };
        }, $scope.mobile = function() {
          return $scope.state.showRenewView ? row.a.createElement("div", {
            className : "license-content mobile"
          }, row.a.createElement("div", {
            className : "license-background mobile"
          }), row.a.createElement(change.Elements, {
            fonts : [{
              src : "https://cdn.cybersole.io/fonts/GothamMedium.ttf",
              family : "GothamMedium",
              style : "normal"
            }]
          }, row.a.createElement(FormioElement, {
            onClose : $scope.toggleRenew(false),
            mobile : true
          }))) : row.a.createElement("div", {
            className : "license-content mobile"
          }, row.a.createElement("div", {
            className : "license-background mobile"
          }), row.a.createElement("div", {
            className : "license-logo mobile"
          }), row.a.createElement("div", {
            className : "license-status mobile"
          }, row.a.createElement("span", {
            className : "license-status-key mobile"
          }, "Bot Status:"), row.a.createElement("span", null, self.license.online ? "online" : "offline"), row.a.createElement("div", {
            className : "license-status-indicator mobile",
            style : {
              backgroundColor : self.license.online ? "lime" : "red"
            }
          })), row.a.createElement("div", {
            className : "license-information-container mobile"
          }, row.a.createElement("div", {
            className : "license-key-container mobile"
          }, row.a.createElement("div", {
            className : "license-key-toggle mobile",
            onClick : $scope.toggleVisibility
          }), $scope.state.visible ? self.license.key : "\u2022".repeat(self.license.key.length)), row.a.createElement("span", null, $scope.getExpiryDate())), row.a.createElement("div", {
            className : "license-button-container mobile"
          }, row.a.createElement(Route, {
            radius : 20,
            icon : "https://cdn.cybersole.io/media/deactivate.svg",
            onclick : self.resetLicense
          }), row.a.createElement(Route, {
            radius : 20,
            onclick : $scope.toggleRenew(true),
            icon : "https://cdn.cybersole.io/media/add.svg"
          }), row.a.createElement(Route, {
            radius : 20,
            icon : "https://cdn.cybersole.io/media/download.svg",
            onclick : self.download
          }), row.a.createElement(Route, {
            radius : 20,
            icon : "https://cdn.cybersole.io/media/question.svg",
            onclick : $scope.openHelp
          }), row.a.createElement("span", {
            className : "license-activation-container mobile",
            style : {
              color : self.license.status > 0 ? "lime" : "red",
              backgroundColor : self.license.status > 0 ? "rgb(75, 247, 129, 0.2)" : "rgb(241, 0, 33, 0.2)"
            }
          }, self.license.status > 0 ? "ACTIVATED" : "INACTIVE")));
        }, $scope.render = function() {
          return self.mobile ? $scope.mobile() : $scope.desktop();
        }, $scope;
      }
      return Object(a1.a)(init, e), Object(data.a)(init, [{
        key : "getExpiryDate",
        value : function() {
          /** @type {!Date} */
          var d = new Date(self.license.renewal);
          return d.getFullYear() < 2028 ? "Exp. date ".concat(d.getUTCDate(), " ").concat(this.months[d.getUTCMonth()], ". ").concat(d.getUTCFullYear()) : null;
        }
      }, {
        key : "desktop",
        value : function() {
          var siteEntry = this;
          return this.state.showRenewView ? row.a.createElement("div", {
            className : "license-content"
          }, row.a.createElement("div", {
            className : "license-background"
          }), row.a.createElement(change.Elements, {
            fonts : [{
              src : "https://cdn.cybersole.io/fonts/GothamMedium.ttf",
              family : "GothamMedium",
              style : "normal"
            }]
          }, row.a.createElement(FormioElement, {
            onClose : this.toggleRenew(false)
          }))) : row.a.createElement("div", {
            className : "license-content"
          }, row.a.createElement("div", {
            className : "license-background"
          }), row.a.createElement("div", {
            className : "license-logo"
          }), row.a.createElement("div", {
            className : "license-status"
          }, row.a.createElement("span", {
            className : "license-status-key"
          }, "Bot Status:"), row.a.createElement("span", null, self.license.online ? "online" : "offline"), row.a.createElement("div", {
            className : "license-status-indicator",
            style : {
              backgroundColor : self.license.online ? "lime" : "red"
            }
          })), row.a.createElement("div", {
            className : "license-information-container"
          }, row.a.createElement("div", {
            className : "license-key-container"
          }, row.a.createElement(xAxis, {
            value : "Show/Hide"
          }, row.a.createElement("div", {
            className : "license-key-toggle",
            onClick : this.toggleVisibility
          })), this.state.visible ? self.license.key : "\u2022".repeat(self.license.key.length)), row.a.createElement("span", null, this.getExpiryDate())), row.a.createElement("div", {
            className : "license-button-container"
          }, row.a.createElement(xAxis, {
            value : "Reset"
          }, row.a.createElement(Route, {
            radius : 30,
            icon : "https://cdn.cybersole.io/media/deactivate.svg",
            onclick : self.resetLicense
          })), row.a.createElement(xAxis, {
            hideRef : function(size) {
              return siteEntry.hideRef = size;
            },
            value : "Renew"
          }, row.a.createElement(Route, {
            radius : 30,
            onclick : this.toggleRenew(true),
            icon : "https://cdn.cybersole.io/media/add.svg"
          })), row.a.createElement(xAxis, {
            value : "Download"
          }, row.a.createElement(Route, {
            radius : 30,
            icon : "https://cdn.cybersole.io/media/download.svg",
            onclick : self.download
          })), row.a.createElement(xAxis, {
            value : "Support"
          }, row.a.createElement(Route, {
            radius : 30,
            icon : "https://cdn.cybersole.io/media/question.svg",
            onclick : self.openSupport
          })), row.a.createElement("span", {
            className : "license-activation-container",
            style : {
              color : self.license.status > 0 ? "lime" : "red",
              backgroundColor : self.license.status > 0 ? "rgb(75, 247, 129, 0.2)" : "rgb(241, 0, 33, 0.2)"
            }
          }, self.license.status > 0 ? "ACTIVATED" : "INACTIVE")));
        }
      }]), init;
    }(row.a.Component);
    p.mobileContainerStyle = {
      height : "50%",
      width : "100%",
      boxSizing : "border-box",
      display : "flex",
      justifyContent : "center",
      marginTop : "10px"
    };
    var ControlledText = function(results) {
      /**
       * @return {?}
       */
      function e() {
        return Object(pkg.a)(this, e), Object(h.a)(this, Object(d.a)(e).apply(this, arguments));
      }
      return Object(a1.a)(e, results), Object(data.a)(e, [{
        key : "render",
        value : function() {
          return row.a.createElement("div", {
            onClick : this.props.switcher,
            className : "navitem-container",
            style : {
              color : this.props.active ? "white" : "#191921"
            }
          }, row.a.createElement("div", {
            className : "navitem-icon",
            style : {
              backgroundImage : "url(".concat(this.props.active ? this.props.activeIcon : this.props.idleIcon, ")")
            }
          }), this.props.name);
        }
      }]), e;
    }(row.a.Component);
    var scope = function(e) {
      /**
       * @return {?}
       */
      function init() {
        var settings;
        return Object(pkg.a)(this, init), (settings = Object(h.a)(this, Object(d.a)(init).call(this))).state = {
          key : (new URLSearchParams(window.location.search)).get("key"),
          color : "red",
          status : ""
        }, settings.desktop = function() {
          return row.a.createElement("div", {
            className : "welcome-content"
          }, row.a.createElement("div", {
            id : "recaptcha"
          }), row.a.createElement("input", {
            type : "text",
            className : "welcome-input",
            placeholder : "Please enter your license key",
            value : settings.state.key,
            onChange : function(elements) {
              return settings.setState({
                key : elements.target.value
              });
            }
          }), row.a.createElement(Route, {
            radius : 25,
            icon : "https://cdn.cybersole.io/media/link.svg",
            onclick : function() {
              return render(settings.state.key);
            }
          }));
        }, settings.mobile = function() {
          return row.a.createElement("div", {
            className : "welcome-content mobile"
          }, row.a.createElement("div", {
            id : "recaptcha"
          }), row.a.createElement("input", {
            type : "text",
            className : "welcome-input mobile",
            placeholder : "Please enter your license key",
            value : settings.state.key,
            onChange : function(elements) {
              return settings.setState({
                key : elements.target.value
              });
            }
          }), settings.state && settings.state.status ? row.a.createElement("span", {
            style : {
              color : settings.state.color
            }
          }, settings.state.status) : row.a.createElement("span", {
            onClick : function() {
              return render.bind(Object(e.a)(settings))(settings.state.key);
            }
          }, "Bind"));
        }, settings.render = function() {
          return self.license ? row.a.createElement(o.a, {
            to : "/license"
          }) : self.mobile ? settings.mobile() : settings.desktop();
        }, settings;
      }
      return Object(a1.a)(init, e), init;
    }(row.a.Component);
    scope.style = {
      width : "70%"
    };
    scope.containerStyle = {
      height : "80px",
      minHeight : "80px"
    };
    scope.mobileStyle = {
      height : "calc(100% - 105px)"
    };
    /**
     * @return {?}
     */
    scope.mobileHeader = function() {
      return row.a.createElement("div", {
        className : "content-header welcome"
      }, row.a.createElement("span", null, "Welcome to CyberAIO"));
    };
    scope.footer = function(delay) {
      /**
       * @return {?}
       */
      function t() {
        var scope;
        return Object(pkg.a)(this, t), (scope = Object(h.a)(this, Object(d.a)(t).call(this))).state = {
          status : "Unauthenticated",
          color : "red"
        }, scope.render = function() {
          return row.a.createElement("div", {
            className : "welcome-footer-container"
          }, row.a.createElement("div", {
            className : "welcome-footer-status",
            style : {
              color : scope.state.color
            }
          }, row.a.createElement("div", {
            className : "welcome-footer-status-icon",
            style : {
              backgroundColor : scope.state.color
            }
          }), scope.state.status), row.a.createElement("div", {
            className : "welcome-footer-information"
          }, row.a.createElement("div", {
            className : "welcome-footer-information-icon"
          }), "Check your purchase email for your license key"));
        }, render = render.bind(Object(e.a)(scope)), scope;
      }
      return Object(a1.a)(t, delay), t;
    }(row.a.Component);
    var child = scope;
    var TodosLogin = function(leftFence) {
      /**
       * @return {?}
       */
      function main() {
        var _Object$getPrototypeO;
        var self;
        Object(pkg.a)(this, main);
        /** @type {number} */
        var arglen = arguments.length;
        /** @type {!Array} */
        var args = new Array(arglen);
        /** @type {number} */
        var i = 0;
        for (; i < arglen; i++) {
          args[i] = arguments[i];
        }
        return (self = Object(h.a)(this, (_Object$getPrototypeO = Object(d.a)(main)).call.apply(_Object$getPrototypeO, [this].concat(args)))).componentDidMount = function() {
          /**
           * @return {undefined}
           */
          self.ref.onmouseenter = function() {
            var offset = self.ref.getBoundingClientRect();
            var left = offset.left;
            var offsetTop = offset.top;
            var element = self.overlayElement;
            if (element.style.display = "none", element.style.top = offsetTop - 3 + "px", element.style.left = left - 3 + "px", element.innerHTML = self.props.children, function(target) {
              var value = target.style.overflow;
              if (!(value && "visible" !== value)) {
                /** @type {string} */
                target.style.overflow = "hidden";
              }
              /** @type {boolean} */
              var elem = target.clientWidth < target.scrollWidth || target.clientHeight < target.scrollHeight;
              return target.style.overflow = value, elem;
            }(self.ref)) {
              /** @type {number} */
              var autoResumeTimer = setTimeout(function() {
                /** @type {string} */
                element.style.display = "flex";
                /** @type {string} */
                element.style.zIndex = "99";
                /**
                 * @return {undefined}
                 */
                element.onmouseleave = function() {
                  /** @type {string} */
                  element.style.display = "none";
                };
              }, 400);
              /**
               * @return {?}
               */
              self.ref.onmouseleave = function() {
                return clearTimeout(autoResumeTimer);
              };
            }
          };
        }, self;
      }
      return Object(a1.a)(main, leftFence), Object(data.a)(main, [{
        key : "render",
        value : function() {
          var e = this;
          return row.a.createElement("span", Object.assign({
            ref : function(value) {
              return e.ref = value;
            }
          }, this.props), this.props.children);
        }
      }, {
        key : "overlayElement",
        get : function() {
          return document.querySelector("#span-overlay.span-overlay-container") || function() {
            /** @type {!Element} */
            var bezierPreviewContainer = document.createElement("div");
            return bezierPreviewContainer.classList.add("span-overlay-container"), bezierPreviewContainer.id = "span-overlay", document.body.appendChild(bezierPreviewContainer), bezierPreviewContainer;
          }();
        }
      }]), main;
    }(row.a.Component);
    /**
     * @param {number} width
     * @return {?}
     */
    var resolve = function(width) {
      return {
        maxWidth : width,
        minWidth : width,
        width : width
      };
    };
    var $scope = function(step) {
      /**
       * @return {?}
       */
      function start() {
        var _ref;
        var _this;
        Object(pkg.a)(this, start);
        /** @type {number} */
        var arglen = arguments.length;
        /** @type {!Array} */
        var args = new Array(arglen);
        /** @type {number} */
        var i = 0;
        for (; i < arglen; i++) {
          args[i] = arguments[i];
        }
        return (_this = Object(h.a)(this, (_ref = Object(d.a)(start)).call.apply(_ref, [this].concat(args)))).state = {
          url : "",
          moreDown : false,
          moreUp : false
        }, _this.attachScrollListener = function() {
          if (self.hideZE = false, _this.scrollRef) {
            /**
             * @return {?}
             */
            var onScroll = function() {
              if (_this.scrollRef.scrollHeight <= _this.scrollRef.clientHeight && _this.state.more) {
                return _this.setState({
                  more : false
                });
              }
              /** @type {boolean} */
              var f = true;
              /** @type {boolean} */
              var parent = false;
              if (Math.ceil(_this.scrollRef.scrollTop) > 0) {
                /** @type {boolean} */
                parent = true;
              }
              if (Math.ceil(_this.scrollRef.scrollTop) + _this.scrollRef.clientHeight >= _this.scrollRef.scrollHeight) {
                /** @type {boolean} */
                f = false;
              }
              if (!(_this.state.moreDown === f && _this.state.moreUp === parent)) {
                _this.setState({
                  moreDown : f,
                  moreUp : parent,
                  more : true
                });
              }
            };
            /** @type {function(): ?} */
            _this.scrollRef.onscroll = onScroll;
            onScroll();
          }
        }, _this.componentDidMount = _this.attachScrollListener, _this.componentDidUpdate = _this.attachScrollListener, _this.render = function() {
          return self.mobile ? _this.mobile() : _this.desktop();
        }, _this;
      }
      return Object(a1.a)(start, step), Object(data.a)(start, [{
        key : "desktop",
        value : function() {
          var recompile_shader = this;
          return self.license.online && self.tasks && self.tasks.length > 0 ? row.a.createElement("div", {
            className : "tasks-table"
          }, row.a.createElement("div", {
            className : "tasks-table-header"
          }, row.a.createElement("div", {
            className : "tasks-table-row"
          }, row.a.createElement("div", {
            className : "tasks-table-data",
            style : resolve("15%")
          }, "Store"), row.a.createElement("div", {
            className : "tasks-table-data",
            style : resolve("30%")
          }, "Product"), row.a.createElement("div", {
            className : "tasks-table-data",
            style : resolve("10%")
          }, "Size"), row.a.createElement("div", {
            className : "tasks-table-data",
            style : resolve("10%")
          }, "Profile"), row.a.createElement("div", {
            className : "tasks-table-data",
            style : resolve("20%")
          }, "Status"), row.a.createElement("div", {
            className : "tasks-table-data",
            style : resolve("15%")
          }, "Action"))), row.a.createElement("div", {
            className : "purchases-table-more rotate180",
            style : {
              opacity : this.state.more ? this.state.moreUp ? 1 : .2 : 0
            }
          }), row.a.createElement("div", {
            className : "tasks-table-body",
            ref : function(name) {
              return recompile_shader.scrollRef = name;
            }
          }, self.tasks.map(function(params, awsKey) {
            return row.a.createElement("div", {
              key : awsKey,
              className : "tasks-table-row"
            }, row.a.createElement("div", {
              className : "tasks-table-data",
              style : resolve("15%")
            }, row.a.createElement(TodosLogin, null, params.store)), row.a.createElement("div", {
              className : "tasks-table-data",
              style : resolve("30%")
            }, row.a.createElement(TodosLogin, null, params.product)), row.a.createElement("div", {
              className : "tasks-table-data",
              style : resolve("10%")
            }, row.a.createElement(TodosLogin, null, params.size)), row.a.createElement("div", {
              className : "tasks-table-data",
              style : resolve("10%")
            }, row.a.createElement(TodosLogin, null, params.profile)), row.a.createElement("div", {
              className : "tasks-table-data",
              style : {
                maxWidth : "20%",
                minWidth : "20%",
                color : params.statusColor
              }
            }, row.a.createElement(TodosLogin, null, params.status)), row.a.createElement("div", {
              className : "tasks-table-data tasks-table-buttons",
              style : resolve("15%")
            }, row.a.createElement(Route, {
              radius : 15,
              icon : "https://cdn.cybersole.io/media/start.svg",
              onclick : function() {
                return self.toggleTask(params.id);
              }
            }), row.a.createElement(Route, {
              radius : 15,
              icon : "https://cdn.cybersole.io/media/delete.svg",
              onclick : function() {
                return self.deleteTask(params.id);
              }
            })));
          })), row.a.createElement("div", {
            className : "purchases-table-more",
            style : {
              opacity : this.state.more ? this.state.moreDown ? 1 : .2 : 0
            }
          })) : row.a.createElement("div", {
            className : "tasks-notasks"
          }, self.license.online ? "No Tasks" : "CyberAIO is offline");
        }
      }, {
        key : "mobile",
        value : function() {
          var that = this;
          return self.license.online ? row.a.createElement("div", {
            className : "tasks-footer-mobile"
          }, row.a.createElement("div", {
            className : "tasks-footer mobile"
          }, row.a.createElement("input", {
            type : "text",
            className : "tasks-quicktask-input mobile",
            placeholder : "Input URL or store:keywords",
            value : this.state.url,
            onChange : function(elements) {
              return that.setState({
                url : elements.target.value
              });
            }
          }), row.a.createElement("div", {
            className : "tasks-quicktask-buttons"
          }, row.a.createElement(Route, {
            radius : 13,
            icon : "https://cdn.cybersole.io/media/link.svg",
            onclick : function() {
              return self.sendCommand("linkchange", that.state.url);
            }
          }), row.a.createElement(Route, {
            radius : 13,
            icon : "https://cdn.cybersole.io/media/add.svg",
            onclick : function() {
              return self.createTask(that.state.url);
            }
          }))), row.a.createElement("div", {
            className : "tasks-table mobile"
          }, self.tasks && self.tasks.length > 0 ? self.tasks.map(function(item) {
            return row.a.createElement("div", {
              className : "tasks-table-row mobile"
            }, row.a.createElement("div", {
              className : "tasks-table-row-upper"
            }, row.a.createElement("div", null, row.a.createElement("div", {
              className : "tasks-table-status mobile"
            }, row.a.createElement("div", {
              className : "tasks-table-status-color",
              style : {
                backgroundColor : item.statusColor
              }
            }), item.status), row.a.createElement("div", {
              className : "tasks-table-product mobile"
            }, item.product)), row.a.createElement("div", {
              className : "tasks-table-data tasks-table-buttons mobile"
            }, row.a.createElement(Route, {
              radius : 12,
              icon : "https://cdn.cybersole.io/media/start.svg",
              onclick : function() {
                return self.toggleTask(item.id);
              }
            }), row.a.createElement(Route, {
              radius : 12,
              icon : "https://cdn.cybersole.io/media/delete.svg",
              onclick : function() {
                return self.deleteTask(item.id);
              }
            }))), row.a.createElement("div", {
              className : "tasks-table-row-lower"
            }, row.a.createElement("div", {
              className : "tasks-table-store mobile"
            }, row.a.createElement("div", {
              className : "purchases-table-icon store"
            }), " ", item.store), row.a.createElement("div", {
              className : "tasks-table-profile mobile"
            }, row.a.createElement("div", {
              className : "purchases-table-icon profile"
            }), " ", item.profile), row.a.createElement("div", {
              className : "tasks-table-size mobile"
            }, row.a.createElement("div", {
              className : "purchases-table-icon size2"
            }), " ", item.size)));
          }) : row.a.createElement("div", {
            className : "tasks-notasks"
          }, self.license.online ? "No Tasks" : "CyberAIO is offline"))) : row.a.createElement("div", {
            className : "tasks-notasks"
          }, self.license.online ? "No Tasks" : "CyberAIO is offline");
        }
      }]), start;
    }(row.a.Component);
    $scope.mobileContainerStyle = {
      height : "100%",
      width : "100%",
      boxSizing : "border-box",
      display : "flex",
      justifyContent : "center",
      marginTop : "10px",
      overflowY : "scroll"
    };
    $scope.style = {
      width : "75%"
    };
    $scope.state = {
      url : ""
    };
    $scope.containerStyle = {
      maxHeight : "45%"
    };
    $scope.header = function(leftFence) {
      /**
       * @return {?}
       */
      function render() {
        var _Object$getPrototypeO;
        var options;
        Object(pkg.a)(this, render);
        /** @type {number} */
        var I = arguments.length;
        /** @type {!Array} */
        var vargs = new Array(I);
        /** @type {number} */
        var i = 0;
        for (; i < I; i++) {
          vargs[i] = arguments[i];
        }
        return (options = Object(h.a)(this, (_Object$getPrototypeO = Object(d.a)(render)).call.apply(_Object$getPrototypeO, [this].concat(vargs)))).desktop = function() {
          return row.a.createElement("div", {
            className : "tasks-header"
          }, row.a.createElement("span", {
            className : "content-header"
          }, "Tasks (", self.license.online && null != self.tasks ? self.tasks.length : 0, " Total)"), row.a.createElement("div", {
            className : "content-header-buttons"
          }, row.a.createElement("div", {
            className : "content-header-button",
            onClick : function() {
              return self.sendCommand("startall");
            }
          }, row.a.createElement("div", {
            className : "content-header-button-image",
            style : {
              backgroundImage : "url('https://cdn.cybersole.io/media/start.svg')"
            }
          }), " Start All"), row.a.createElement("div", {
            className : "content-header-button",
            onClick : function() {
              return self.sendCommand("stopall");
            }
          }, row.a.createElement("div", {
            className : "content-header-button-image",
            style : {
              backgroundImage : "url('https://cdn.cybersole.io/media/stop.svg')"
            }
          }), " Stop All")));
        }, options.mobile = function() {
          return row.a.createElement("div", {
            className : "tasks-header"
          }, row.a.createElement("span", {
            className : "content-header mobile"
          }, "Tasks"), row.a.createElement("div", {
            className : "content-header-buttons mobile"
          }, row.a.createElement("div", {
            className : "content-header-button mobile",
            onClick : function() {
              return self.sendCommand("startall");
            }
          }, row.a.createElement("div", {
            className : "content-header-button-image mobile",
            style : {
              backgroundImage : "url('https://cdn.cybersole.io/media/start.svg')"
            }
          }), " Start All"), row.a.createElement("div", {
            className : "content-header-button mobile",
            onClick : function() {
              return self.sendCommand("stopall");
            }
          }, row.a.createElement("div", {
            className : "content-header-button-image mobile",
            style : {
              backgroundImage : "url('https://cdn.cybersole.io/media/stop.svg')"
            }
          }), " Stop All")));
        }, options.render = function() {
          return self.mobile ? options.mobile() : options.desktop();
        }, options;
      }
      return Object(a1.a)(render, leftFence), render;
    }(row.a.Component);
    $scope.footer = function(delay) {
      /**
       * @return {?}
       */
      function t() {
        var _Object$getPrototypeO;
        var that;
        Object(pkg.a)(this, t);
        /** @type {number} */
        var I = arguments.length;
        /** @type {!Array} */
        var vargs = new Array(I);
        /** @type {number} */
        var i = 0;
        for (; i < I; i++) {
          vargs[i] = arguments[i];
        }
        return (that = Object(h.a)(this, (_Object$getPrototypeO = Object(d.a)(t)).call.apply(_Object$getPrototypeO, [this].concat(vargs)))).state = {
          url : ""
        }, that.render = function() {
          return row.a.createElement("div", {
            className : "tasks-footer"
          }, row.a.createElement("input", {
            type : "text",
            className : "tasks-quicktask-input",
            placeholder : "Input URL or store:keywords",
            value : that.state.url,
            onChange : function(elements) {
              return that.setState({
                url : elements.target.value
              });
            }
          }), row.a.createElement("div", {
            className : "tasks-quicktask-buttons"
          }, row.a.createElement(xAxis, {
            value : "Mass Link Change"
          }, row.a.createElement(Route, {
            radius : 20,
            icon : "https://cdn.cybersole.io/media/link.svg",
            onclick : function() {
              return self.sendCommand("linkchange", that.state.url);
            }
          })), row.a.createElement(xAxis, {
            value : "Start Task"
          }, row.a.createElement(Route, {
            radius : 20,
            icon : "https://cdn.cybersole.io/media/add.svg",
            onclick : function() {
              return self.createTask(that.state.url);
            }
          }))));
        }, that;
      }
      return Object(a1.a)(t, delay), t;
    }(row.a.Component);
    /**
     * @param {number} width
     * @return {?}
     */
    var copy = function(width) {
      return {
        maxWidth : width,
        minWidth : width,
        width : width
      };
    };
    var json = function(p2__3388_SHARP_) {
      /**
       * @return {?}
       */
      function render() {
        var _Object$getPrototypeO;
        var _this;
        Object(pkg.a)(this, render);
        /** @type {number} */
        var I = arguments.length;
        /** @type {!Array} */
        var vargs = new Array(I);
        /** @type {number} */
        var i = 0;
        for (; i < I; i++) {
          vargs[i] = arguments[i];
        }
        return (_this = Object(h.a)(this, (_Object$getPrototypeO = Object(d.a)(render)).call.apply(_Object$getPrototypeO, [this].concat(vargs)))).state = {
          moreDown : false,
          moreUp : false
        }, _this.attachScrollListener = function() {
          if (self.hideZE = false, _this.scrollRef) {
            /**
             * @return {?}
             */
            var onScroll = function() {
              if (_this.scrollRef.scrollHeight <= _this.scrollRef.clientHeight && _this.state.more) {
                return _this.setState({
                  moreDown : false,
                  moreUp : false,
                  more : false
                });
              }
              /** @type {boolean} */
              var f = true;
              /** @type {boolean} */
              var parent = false;
              if (_this.scrollRef.scrollTop > 0) {
                /** @type {boolean} */
                parent = true;
              }
              if (_this.scrollRef.scrollTop + _this.scrollRef.clientHeight >= _this.scrollRef.scrollHeight) {
                /** @type {boolean} */
                f = false;
              }
              if (!(_this.state.moreDown === f && _this.state.moreUp === parent)) {
                _this.setState({
                  moreDown : f,
                  moreUp : parent,
                  more : true
                });
              }
            };
            /** @type {function(): ?} */
            _this.scrollRef.onscroll = onScroll;
            onScroll();
          }
        }, _this.componentDidMount = _this.attachScrollListener, _this.componentDidUpdate = _this.attachScrollListener, _this.desktop = function() {
          return self.purchases && self.purchases.length > 0 ? row.a.createElement("div", {
            className : "purchases-table"
          }, row.a.createElement("div", {
            className : "purchases-table-header"
          }, row.a.createElement("div", {
            className : "purchases-table-row"
          }, row.a.createElement("div", {
            className : "purchases-table-data",
            style : copy("15%")
          }, "Store"), row.a.createElement("div", {
            className : "purchases-table-data",
            style : copy("30%")
          }, "Product"), row.a.createElement("div", {
            className : "purchases-table-data",
            style : copy("10%")
          }, "Size"), row.a.createElement("div", {
            className : "purchases-table-data",
            style : copy("10%")
          }, "Date"), row.a.createElement("div", {
            className : "purchases-table-data",
            style : copy("10%")
          }, "Profile"), row.a.createElement("div", {
            className : "purchases-table-data",
            style : copy("25%")
          }, "Order"))), row.a.createElement("div", {
            className : "purchases-table-more rotate180",
            style : {
              opacity : _this.state.more ? _this.state.moreUp ? 1 : .2 : 0
            }
          }), row.a.createElement("div", {
            className : "purchases-table-body",
            ref : function(tid) {
              return _this.scrollRef = tid;
            }
          }, self.purchases.map(function(options, awsKey) {
            return row.a.createElement("div", {
              key : awsKey,
              className : "purchases-table-row"
            }, row.a.createElement("div", {
              className : "purchases-table-data",
              style : copy("15%")
            }, options.store), row.a.createElement("div", {
              className : "purchases-table-data",
              style : copy("30%")
            }, row.a.createElement(TodosLogin, null, options.product)), row.a.createElement("div", {
              className : "purchases-table-data",
              style : copy("10%")
            }, row.a.createElement(TodosLogin, null, options.size)), row.a.createElement("div", {
              className : "purchases-table-data",
              style : copy("10%")
            }, row.a.createElement(TodosLogin, null, options.timestamp)), row.a.createElement("div", {
              className : "purchases-table-data",
              style : copy("10%")
            }, row.a.createElement(TodosLogin, null, options.profile)), row.a.createElement("div", {
              className : "purchases-table-data",
              style : copy("25%")
            }, row.a.createElement("span", {
              style : {
                cursor : "pointer",
                color : null != options.tracking ? "rgb(0, 137, 255)" : "white"
              },
              onClick : null != options.tracking ? function() {
                return window.open(options.tracking, "_blank");
              } : null
            }, null != options.order ? options.order : "n/a")));
          })), row.a.createElement("div", {
            className : "purchases-table-more",
            style : {
              opacity : _this.state.more ? _this.state.moreDown ? 1 : .2 : 0
            }
          })) : row.a.createElement("div", {
            className : "tasks-notasks"
          }, "No Purchases");
        }, _this.mobile = function() {
          return self.purchases && self.purchases.length > 0 ? row.a.createElement("div", {
            className : "tasks-table mobile purchases"
          }, self.purchases.map(function(item) {
            return row.a.createElement("div", {
              className : "tasks-table-row mobile purchases"
            }, row.a.createElement("div", {
              className : "purchases-table-data mobile"
            }, row.a.createElement("div", {
              className : "purchases-table-icon product"
            }), " ", item.product, " ", row.a.createElement("div", {
              className : "purchases-table-icon size"
            }), " ", item.size || "n/a"), row.a.createElement("div", {
              className : "purchases-table-data mobile"
            }, row.a.createElement("div", {
              className : "purchases-table-icon store"
            }), " ", item.store), row.a.createElement("div", {
              className : "purchases-table-data mobile"
            }, row.a.createElement("div", {
              className : "purchases-table-icon profile"
            }), " ", item.profile), item.order && row.a.createElement("div", {
              onClick : null != item.tracking ? function() {
                return window.open(item.tracking, "_blank");
              } : null,
              className : "purchases-table-order mobile"
            }, "Order: ", item.order, " ", item.tracking && row.a.createElement("div", {
              className : "purchases-order-tracking-icon"
            })));
          })) : row.a.createElement("div", {
            className : "tasks-notasks"
          }, "No Purchases");
        }, _this.render = function() {
          return self.mobile ? _this.mobile() : _this.desktop();
        }, _this;
      }
      return Object(a1.a)(render, p2__3388_SHARP_), render;
    }(row.a.Component);
    json.mobileContainerStyle = {
      height : "100%",
      width : "100%",
      boxSizing : "border-box",
      display : "flex",
      justifyContent : "center",
      marginTop : "10px",
      overflowY : "scroll"
    };
    json.style = {
      width : "75%"
    };
    var NumberPicker = function(leftFence) {
      /**
       * @return {?}
       */
      function init() {
        var _Object$getPrototypeO;
        var self;
        Object(pkg.a)(this, init);
        /** @type {number} */
        var I = arguments.length;
        /** @type {!Array} */
        var vargs = new Array(I);
        /** @type {number} */
        var i = 0;
        for (; i < I; i++) {
          vargs[i] = arguments[i];
        }
        return (self = Object(h.a)(this, (_Object$getPrototypeO = Object(d.a)(init)).call.apply(_Object$getPrototypeO, [this].concat(vargs)))).state = {
          selected : self.props.options ? self.props.options[0] : "today"
        }, self.switchTo = function(data) {
          return function() {
            return self.setState({
              selected : data
            });
          };
        }, self.capitalize = function(word) {
          return word.replace(word.charAt(0), word.charAt(0).toUpperCase());
        }, self.createOption = function(value) {
          return row.a.createElement("div", {
            className : "analytics-timespan-option",
            onClick : self.state.selected === value ? function() {
              return null;
            } : self.switchTo(value),
            style : {
              borderColor : self.state.selected === value ? "white" : "transparent",
              color : self.state.selected === value ? "white" : "lightgrey"
            }
          }, self.capitalize(value));
        }, self.render = function() {
          return row.a.createElement("div", {
            className : "analytics-panel"
          }, row.a.createElement("div", {
            className : "analytics-timespan-select"
          }, self.props.options ? self.props.options.map(self.createOption) : [self.createOption("today"), self.createOption("week"), self.createOption("month"), self.createOption("year"), self.createOption("total")]), row.a.createElement("div", {
            className : "analytics-display-container"
          }, row.a.createElement("div", {
            className : "analytics-display-icon",
            style : {
              backgroundImage : "url(".concat(self.props.icon, ")")
            }
          }), row.a.createElement("div", {
            className : "analytics-display-value-container"
          }, row.a.createElement("div", {
            className : "analytics-display-value"
          }, self.props.stats[self.state.selected]), row.a.createElement("div", {
            className : "analytics-display-desc"
          }, self.props.desc))));
        }, self;
      }
      return Object(a1.a)(init, leftFence), init;
    }(row.a.Component);
    var target = function(leftFence) {
      /**
       * @return {?}
       */
      function Async() {
        var _Object$getPrototypeO;
        var options;
        Object(pkg.a)(this, Async);
        /** @type {number} */
        var I = arguments.length;
        /** @type {!Array} */
        var vargs = new Array(I);
        /** @type {number} */
        var i = 0;
        for (; i < I; i++) {
          vargs[i] = arguments[i];
        }
        return (options = Object(h.a)(this, (_Object$getPrototypeO = Object(d.a)(Async)).call.apply(_Object$getPrototypeO, [this].concat(vargs)))).componentWillMount = function() {
          return self.hideZE = false;
        }, options.mobile = function() {
          return row.a.createElement("div", {
            className : "analytics-container mobile"
          }, row.a.createElement(NumberPicker, {
            icon : "https://cdn.cybersole.io/media/checkouts.svg",
            stats : self.stats.success,
            desc : "Successful Checkouts"
          }), row.a.createElement(NumberPicker, {
            icon : "https://cdn.cybersole.io/media/declines.svg",
            stats : self.stats.declines,
            desc : "Declined Checkouts",
            options : ["total"]
          }));
        }, options.render = function() {
          return self.mobile ? options.mobile() : options.desktop();
        }, options;
      }
      return Object(a1.a)(Async, leftFence), Object(data.a)(Async, [{
        key : "desktop",
        value : function() {
          return row.a.createElement("div", {
            className : "analytics-container"
          }, row.a.createElement(NumberPicker, {
            icon : "https://cdn.cybersole.io/media/checkouts.svg",
            stats : self.stats.success,
            desc : "Successful Checkouts"
          }), row.a.createElement("div", {
            className : "analytics-seperator"
          }), row.a.createElement(NumberPicker, {
            icon : "https://cdn.cybersole.io/media/declines.svg",
            stats : self.stats.declines,
            desc : "Declined Checkouts",
            options : ["total"]
          }));
        }
      }]), Async;
    }(row.a.Component);
    target.mobileContainerStyle = {
      height : "auto",
      width : "100%",
      boxSizing : "border-box",
      display : "flex",
      justifyContent : "center",
      marginTop : "10px"
    };
    target.style = {
      width : "75%"
    };
    /** @type {!Array} */
    var fileArray = [{
      name : "License",
      path : "/license",
      component : p,
      icons : {
        idle : "https://cdn.cybersole.io/media/license-unselected.svg",
        active : "https://cdn.cybersole.io/media/license-selected.svg"
      }
    }, {
      name : "Tasks",
      path : "/tasks",
      component : $scope,
      icons : {
        idle : "https://cdn.cybersole.io/media/tasks-unselected.svg",
        active : "https://cdn.cybersole.io/media/tasks-selected.svg"
      }
    }, {
      name : "Purchases",
      path : "/purchases",
      component : json,
      icons : {
        idle : "https://cdn.cybersole.io/media/purchases-unselected.svg",
        active : "https://cdn.cybersole.io/media/purchases-selected.svg"
      }
    }, {
      name : "Analytics",
      path : "/analytics",
      component : target,
      icons : {
        idle : "https://cdn.cybersole.io/media/analytics-unselected.svg",
        active : "https://cdn.cybersole.io/media/analytics-selected.svg"
      }
    }, {
      name : "Welcome to CyberAIO",
      path : "/welcome",
      component : child,
      hidden : true
    }];
    /**
     * @param {?} name
     * @param {!Node} text
     * @return {?}
     */
    var contains = function(name, text) {
      var p = text.parentNode;
      for (; p;) {
        if (p == name) {
          return true;
        }
        p = p.parentNode;
      }
      return false;
    };
    var EmphText = function(leftFence) {
      /**
       * @return {?}
       */
      function render() {
        var _Object$getPrototypeO;
        var that;
        Object(pkg.a)(this, render);
        /** @type {number} */
        var I = arguments.length;
        /** @type {!Array} */
        var vargs = new Array(I);
        /** @type {number} */
        var i = 0;
        for (; i < I; i++) {
          vargs[i] = arguments[i];
        }
        return (that = Object(h.a)(this, (_Object$getPrototypeO = Object(d.a)(render)).call.apply(_Object$getPrototypeO, [this].concat(vargs)))).state = {}, that.expand = function() {
          that.anchorWidth = that.ref.clientWidth;
          that.anchorHeight = that.ref.clientHeight;
          that.anchorX = that.ref.offsetLeft;
          that.setState({
            expanded : true
          });
          /** @type {function(!Event): undefined} */
          that.oldListener = window.onmousedown;
          /**
           * @param {!Event} e
           * @return {undefined}
           */
          window.onmousedown = function(e) {
            if (!contains(that.ref2, e.target)) {
              that.unexpand();
            }
          };
          window.addEventListener("resize", that.unexpand);
        }, that.unexpand = function() {
          that.setState({
            expanded : false
          });
          window.onmousedown = that.oldListener;
        }, that.mobile = function() {
          return that.state.expanded ? row.a.createElement("div", {
            className : "header-user-container mobile"
          }, row.a.createElement("div", {
            className : "header-user-expanded mobile",
            ref : function(from) {
              return that.ref2 = from;
            }
          }, row.a.createElement("div", {
            className : "header-user-container-expanded mobile",
            onClick : that.unexpand
          }, row.a.createElement("img", {
            className : "header-user-avatar mobile",
            src : that.props.avatar
          }), that.props.options.map(function(branch, canCreateDiscussions) {
            return row.a.createElement("div", {
              onClick : branch.callback || function() {
                return null;
              },
              className : "header-user-expanded-option mobile"
            }, branch.name);
          }), row.a.createElement("div", {
            className : "header-user-dropdown expanded mobile"
          })))) : row.a.createElement("div", {
            ref : function(value) {
              return that.ref = value;
            },
            className : "header-user-container mobile",
            onClick : that.expand
          }, row.a.createElement("img", {
            className : "header-user-avatar mobile",
            src : that.props.avatar
          }), row.a.createElement("span", null, that.props.username), row.a.createElement("div", {
            className : "header-user-dropdown mobile"
          }));
        }, that.desktop = function() {
          return that.state.expanded ? row.a.createElement("div", {
            className : "header-user-container"
          }, row.a.createElement("div", {
            style : {
              position : "fixed",
              top : "6px",
              left : that.anchorX - 20 + "px"
            },
            className : "header-user-expanded",
            ref : function(from) {
              return that.ref2 = from;
            }
          }, row.a.createElement("div", {
            className : "header-user-container-expanded",
            onClick : that.unexpand
          }, row.a.createElement("img", {
            className : "header-user-avatar",
            src : that.props.avatar
          }), row.a.createElement("span", null, that.props.username), row.a.createElement("div", {
            className : "header-user-dropdown expanded"
          })), that.props.options.map(function(branch, canCreateDiscussions) {
            return row.a.createElement("div", {
              onClick : branch.callback || function() {
                return null;
              },
              className : "header-user-expanded-option"
            }, branch.name);
          }))) : row.a.createElement("div", {
            ref : function(value) {
              return that.ref = value;
            },
            className : "header-user-container",
            onClick : that.expand
          }, row.a.createElement("img", {
            className : "header-user-avatar",
            src : that.props.avatar
          }), row.a.createElement("span", null, that.props.username), row.a.createElement("div", {
            className : "header-user-dropdown"
          }));
        }, that.render = function() {
          return self.mobile ? that.mobile() : that.desktop();
        }, that;
      }
      return Object(a1.a)(render, leftFence), render;
    }(m.Component);
    /**
     * @param {?} address
     * @return {?}
     */
    var check = function(address) {
      return window.location.href.includes(address);
    };
    var DropIndicator = function(leftFence) {
      /**
       * @return {?}
       */
      function render() {
        var _Object$getPrototypeO;
        var me;
        Object(pkg.a)(this, render);
        /** @type {number} */
        var I = arguments.length;
        /** @type {!Array} */
        var vargs = new Array(I);
        /** @type {number} */
        var i = 0;
        for (; i < I; i++) {
          vargs[i] = arguments[i];
        }
        return (me = Object(h.a)(this, (_Object$getPrototypeO = Object(d.a)(render)).call.apply(_Object$getPrototypeO, [this].concat(vargs)))).desktop = function() {
          return row.a.createElement("div", {
            className : "header-container"
          }, row.a.createElement("div", {
            className : "header-branding"
          }, row.a.createElement("div", {
            className : "header-logo"
          }), "Dashboard"), fileArray.map(function(config, awsKey) {
            return !config.hidden && row.a.createElement(ControlledText, {
              name : config.name,
              switcher : me.props.switcher(config.path),
              active : check(config.path),
              activeIcon : config.icons.active,
              idleIcon : config.icons.idle,
              key : awsKey
            });
          }), row.a.createElement(EmphText, {
            username : self.license.user.username,
            avatar : self.license.user.profilePicture,
            options : [{
              name : "Log Out",
              callback : function() {
                self.logout();
              }
            }, {
              name : "Unbind License",
              callback : function() {
                self.unbindLicense();
              }
            }]
          }));
        }, me.mobile = function() {
          return self.license ? row.a.createElement("div", {
            className : "header-container mobile"
          }, row.a.createElement("div", {
            className : "header-logo mobile"
          }), row.a.createElement(EmphText, {
            username : self.license.user.username,
            avatar : self.license.user.profilePicture,
            options : [{
              name : "Log Out",
              callback : function() {
                self.logout();
              }
            }, {
              name : "Unbind License",
              callback : function() {
                self.unbindLicense();
              }
            }]
          })) : row.a.createElement("div", {
            className : "header-container mobile"
          }, row.a.createElement("div", {
            className : "header-logo mobile"
          }));
        }, me.render = function() {
          return self.mobile ? me.mobile() : me.desktop();
        }, me;
      }
      return Object(a1.a)(render, leftFence), render;
    }(row.a.Component);
    var StatsContainer = function(leftFence) {
      /**
       * @return {?}
       */
      function render() {
        var _Object$getPrototypeO;
        var _this;
        var $scope = this;
        Object(pkg.a)(this, render);
        /** @type {number} */
        var arglen = arguments.length;
        /** @type {!Array} */
        var args = new Array(arglen);
        /** @type {number} */
        var i = 0;
        for (; i < arglen; i++) {
          args[i] = arguments[i];
        }
        return (_this = Object(h.a)(this, (_Object$getPrototypeO = Object(d.a)(render)).call.apply(_Object$getPrototypeO, [this].concat(args)))).state = {}, _this.isActive = function(url) {
          return window.location.href.includes(url);
        }, _this.componentDidMount = function() {
          /**
           * @return {?}
           */
          self.onUpdate = function() {
            return _this.forceUpdate();
          };
          _this.underlayShadow();
          window.addEventListener("resize", _this.underlayShadow);
        }, _this.componentWillUnmount = function() {
          self.onUpdate = void 0;
        }, _this.underlayShadow = function() {
          if (!self.mobile && _this.ref && _this.shadowRef) {
            var paintRect = _this.shadowRef.getBoundingClientRect();
            /** @type {string} */
            _this.ref.style.top = paintRect.y + "px";
            /** @type {string} */
            _this.ref.style.left = paintRect.x + "px";
            /** @type {string} */
            _this.ref.style.height = paintRect.height + "px";
            /** @type {string} */
            _this.ref.style.width = paintRect.width + "px";
            /** @type {number} */
            _this.ref.style.opacity = 1;
          }
        }, _this.changePage = function(path) {
          return function() {
            if (path !== _this.selected.path) {
              /** @type {number} */
              _this.contentRef.style.opacity = 0;
              /** @type {number} */
              _this.ref.style.opacity = 0;
              setTimeout(function() {
                _this.setState({
                  path : path
                });
              }, 200);
            }
          };
        }, _this.componentDidUpdate = _this.underlayShadow, _this.switch = function() {
          return row.a.createElement(o.d, null, fileArray.map(function(options, awsKey) {
            return row.a.createElement(o.b, {
              path : options.path,
              component : options.component,
              key : awsKey
            });
          }), row.a.createElement(o.a, {
            to : fileArray[0].path
          }));
        }, _this.desktop = function() {
          return _this.state.path && _this.selected.path !== _this.state.path ? row.a.createElement(o.a, {
            to : _this.state.path
          }) : row.a.createElement("div", {
            className : "container"
          }, row.a.createElement("div", {
            className : "underlay-shadow",
            ref : function(obj) {
              return _this.ref = obj;
            }
          }), row.a.createElement("div", {
            className : "background green-gradient"
          }), _this.selected.hidden ? row.a.createElement(App, null) : row.a.createElement(DropIndicator, {
            switcher : _this.changePage
          }), row.a.createElement("div", {
            className : "content-wrapper",
            ref : function(tid) {
              return _this.contentRef = tid;
            },
            style : self.license ? {} : {
              paddingTop : "190px"
            }
          }, row.a.createElement("div", {
            className : "content",
            style : _this.selected.component.style
          }, _this.selected.component.header ? row.a.createElement($scope.selected.component.header, null) : row.a.createElement("span", {
            className : "content-header"
          }, _this.selected.name), row.a.createElement("div", {
            className : "content-main",
            ref : function(tid) {
              return _this.shadowRef = tid;
            },
            style : _this.selected.component.containerStyle
          }, _this.switch()), _this.selected.component.footer && row.a.createElement($scope.selected.component.footer, null))));
        }, _this.mobile = function() {
          return row.a.createElement("div", {
            className : "container"
          }, row.a.createElement(DropIndicator, null), row.a.createElement("div", {
            className : "content-wrapper mobile",
            style : _this.selected.component.mobileStyle
          }, _this.selected.component.mobileHeader ? row.a.createElement($scope.selected.component.mobileHeader, null) : _this.selected.component.header ? row.a.createElement($scope.selected.component.header, null) : row.a.createElement("span", {
            className : "content-header mobile"
          }, _this.selected.name), row.a.createElement("div", {
            className : "content-main mobile",
            style : _this.selected.component.mobileContainerStyle
          }, _this.switch())), self.license && row.a.createElement("div", {
            className : "footer-mobile"
          }, fileArray.map(function(scope, canCreateDiscussions) {
            return scope.hidden ? "" : row.a.createElement(c.b, {
              to : scope.path,
              className : "footer-mobile-button",
              style : {
                backgroundImage : "url(".concat(_this.isActive(scope.path) ? scope.icons.active : scope.icons.idle, ")")
              }
            });
          })));
        }, _this;
      }
      return Object(a1.a)(render, leftFence), Object(data.a)(render, [{
        key : "render",
        value : function() {
          /** @type {boolean} */
          var _n = true;
          /** @type {boolean} */
          var t = false;
          var a = void 0;
          try {
            var $__6;
            var __$0 = fileArray[Symbol.iterator]();
            for (; !(_n = ($__6 = __$0.next()).done); _n = true) {
              var item = $__6.value;
              if (window.location.pathname.includes("/dashboard" + item.path)) {
                this.selected = item;
              }
            }
          } catch (nativeObjectObject) {
            /** @type {boolean} */
            t = true;
            a = nativeObjectObject;
          } finally {
            try {
              if (!(_n || null == __$0.return)) {
                __$0.return();
              }
            } finally {
              if (t) {
                throw a;
              }
            }
          }
          return null == this.selected ? row.a.createElement(o.a, {
            to : fileArray[0].path
          }) : self.license || "/welcome" === this.selected.path ? self.mobile ? this.mobile() : this.desktop() : row.a.createElement(o.a, {
            to : "/welcome"
          });
        }
      }]), render;
    }(row.a.Component);
    var RedBox = function(leftFence) {
      /**
       * @return {?}
       */
      function main() {
        var _Object$getPrototypeO;
        var a;
        Object(pkg.a)(this, main);
        /** @type {number} */
        var arglen = arguments.length;
        /** @type {!Array} */
        var args = new Array(arglen);
        /** @type {number} */
        var i = 0;
        for (; i < arglen; i++) {
          args[i] = arguments[i];
        }
        return (a = Object(h.a)(this, (_Object$getPrototypeO = Object(d.a)(main)).call.apply(_Object$getPrototypeO, [this].concat(args)))).componentDidMount = function() {
          return self.lockOrientation();
        }, a;
      }
      return Object(a1.a)(main, leftFence), Object(data.a)(main, [{
        key : "render",
        value : function() {
          var aAddon = this;
          return self.loaded ? row.a.createElement(change.StripeProvider, {
            apiKey : "pk_live_52mN94lFZkMNYTdkFr0zBMmm"
          }, row.a.createElement(c.a, {
            basename : "/dashboard"
          }, row.a.createElement(o.d, null, row.a.createElement(o.b, {
            component : StatsContainer
          })))) : (self.subscribe(), self.onLoad = function() {
            return aAddon.forceUpdate();
          }, row.a.createElement(MemoFieldset, null));
        }
      }]), main;
    }(row.a.Component);
    Boolean("localhost" === window.location.hostname || "[::1]" === window.location.hostname || window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));
    f.a.render(row.a.createElement(RedBox, null), document.getElementById("root"));
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.ready.then(function(taskReg) {
        taskReg.unregister();
      });
    }
  }
}, [[40, 1, 2]]]);
