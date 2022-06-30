(() => {
    "use strict";
    var __webpack_modules__ = {
        659: e => {
            var t = Object.prototype.hasOwnProperty,
                n = "~";

            function r() { }

            function o(e, t, n) {
                this.fn = e, this.context = t, this.once = n || !1
            }

            function i(e, t, r, i, s) {
                if ("function" != typeof r) throw new TypeError("The listener must be a function");
                var a = new o(r, i || e, s),
                    c = n ? n + t : t;
                return e._events[c] ? e._events[c].fn ? e._events[c] = [e._events[c], a] : e._events[c].push(a) : (e._events[c] = a, e._eventsCount++), e
            }

            function s(e, t) {
                0 == --e._eventsCount ? e._events = new r : delete e._events[t]
            }

            function a() {
                this._events = new r, this._eventsCount = 0
            }
            Object.create && (r.prototype = Object.create(null), (new r).__proto__ || (n = !1)), a.prototype.eventNames = function () {
                var e, r, o = [];
                if (0 === this._eventsCount) return o;
                for (r in e = this._events) t.call(e, r) && o.push(n ? r.slice(1) : r);
                return Object.getOwnPropertySymbols ? o.concat(Object.getOwnPropertySymbols(e)) : o
            }, a.prototype.listeners = function (e) {
                var t = n ? n + e : e,
                    r = this._events[t];
                if (!r) return [];
                if (r.fn) return [r.fn];
                for (var o = 0, i = r.length, s = new Array(i); o < i; o++) s[o] = r[o].fn;
                return s
            }, a.prototype.listenerCount = function (e) {
                var t = n ? n + e : e,
                    r = this._events[t];
                return r ? r.fn ? 1 : r.length : 0
            }, a.prototype.emit = function (e, t, r, o, i, s) {
                var a = n ? n + e : e;
                if (!this._events[a]) return !1;
                var c, _, l = this._events[a],
                    u = arguments.length;
                if (l.fn) {
                    switch (l.once && this.removeListener(e, l.fn, void 0, !0), u) {
                        case 1:
                            return l.fn.call(l.context), !0;
                        case 2:
                            return l.fn.call(l.context, t), !0;
                        case 3:
                            return l.fn.call(l.context, t, r), !0;
                        case 4:
                            return l.fn.call(l.context, t, r, o), !0;
                        case 5:
                            return l.fn.call(l.context, t, r, o, i), !0;
                        case 6:
                            return l.fn.call(l.context, t, r, o, i, s), !0
                    }
                    for (_ = 1, c = new Array(u - 1); _ < u; _++) c[_ - 1] = arguments[_];
                    l.fn.apply(l.context, c)
                } else {
                    var p, f = l.length;
                    for (_ = 0; _ < f; _++) switch (l[_].once && this.removeListener(e, l[_].fn, void 0, !0), u) {
                        case 1:
                            l[_].fn.call(l[_].context);
                            break;
                        case 2:
                            l[_].fn.call(l[_].context, t);
                            break;
                        case 3:
                            l[_].fn.call(l[_].context, t, r);
                            break;
                        case 4:
                            l[_].fn.call(l[_].context, t, r, o);
                            break;
                        default:
                            if (!c)
                                for (p = 1, c = new Array(u - 1); p < u; p++) c[p - 1] = arguments[p];
                            l[_].fn.apply(l[_].context, c)
                    }
                }
                return !0
            }, a.prototype.on = function (e, t, n) {
                return i(this, e, t, n, !1)
            }, a.prototype.once = function (e, t, n) {
                return i(this, e, t, n, !0)
            }, a.prototype.removeListener = function (e, t, r, o) {
                var i = n ? n + e : e;
                if (!this._events[i]) return this;
                if (!t) return s(this, i), this;
                var a = this._events[i];
                if (a.fn) a.fn !== t || o && !a.once || r && a.context !== r || s(this, i);
                else {
                    for (var c = 0, _ = [], l = a.length; c < l; c++)(a[c].fn !== t || o && !a[c].once || r && a[c].context !== r) && _.push(a[c]);
                    _.length ? this._events[i] = 1 === _.length ? _[0] : _ : s(this, i)
                }
                return this
            }, a.prototype.removeAllListeners = function (e) {
                var t;
                return e ? (t = n ? n + e : e, this._events[t] && s(this, t)) : (this._events = new r, this._eventsCount = 0), this
            }, a.prototype.off = a.prototype.removeListener, a.prototype.addListener = a.prototype.on, a.prefixed = n, a.EventEmitter = a, e.exports = a
        }
    },
        __webpack_module_cache__ = {};

    function __webpack_require__(e) {
        var t = __webpack_module_cache__[e];
        if (void 0 !== t) return t.exports;
        var n = __webpack_module_cache__[e] = {
            exports: {}
        };
        return __webpack_modules__[e](n, n.exports, __webpack_require__), n.exports
    }
    __webpack_require__.n = e => {
        var t = e && e.__esModule ? () => e.default : () => e;
        return __webpack_require__.d(t, {
            a: t
        }), t
    }, __webpack_require__.d = (e, t) => {
        for (var n in t) __webpack_require__.o(t, n) && !__webpack_require__.o(e, n) && Object.defineProperty(e, n, {
            enumerable: !0,
            get: t[n]
        })
    }, __webpack_require__.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t);
    var __webpack_exports__ = {};
    (() => {
        var eventemitter3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(659),
            eventemitter3__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(eventemitter3__WEBPACK_IMPORTED_MODULE_0__),
            _temp;

        function _defineProperty(e, t, n) {
            return t in e ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = n, e
        }
        const HOUSE_EDGE = .01;
        let inIframe = !0;
        try {
            window.localStorage.length, inIframe = !1
        } catch (e) { }
        if (!inIframe)
            throw window.location = window.location.origin, new Error("script executor loaded outside of iframe");
        new (_temp = class {
            constructor() {
                _defineProperty(this, "onMessage", (({
                    origin: e,
                    data: t
                }) => {
                    if (e !== window.location.origin) return;
                    const {
                        id: n,
                        event: r,
                        error: o,
                        payload: i
                    } = t;
                    "PUBLIC_CHAT_MESSAGE" !== r ? (o ? this.fulfillers[n].reject(new Error(i)) : this.fulfillers[n].resolve(i), delete this.fulfillers[n]) : this.executionContext.emit(r, {
                        id: i.id,
                        timestamp: i.created,
                        channel: i.channel,
                        sender: i.uname,
                        body: i.message
                    })
                })), _defineProperty(this, "sendCommand", ((e, t) => {
                    const n = this.nextRequestId++;
                    return new Promise(((r, o) => {
                        this.fulfillers[n] = {
                            resolve: r,
                            reject: o
                        }, window.parent.postMessage({
                            type: e,
                            payload: t,
                            id: n
                        }, window.location.origin)
                    }))
                })), this.fulfillers = {}, this.nextRequestId = 0, this.executionContext = new (eventemitter3__WEBPACK_IMPORTED_MODULE_0___default()), Object.assign(this.executionContext, {
                    bet: (e, t) => {
                        
                        return this.sendCommand("bet", {
                            wager: e,
                            target: t
                        }).then((e => {
                            const {
                                balance: t,
                                bankroll: n,
                                multiplier: r
                            } = e;
                            if (!r) throw new Error("The server encountered an unexpected error. Please try again in a few minutes.");
                            return Object.assign(this.executionContext, {
                                balance: t,
                                bankroll: n
                            }), e.target /= 100, e.multiplier /= 100, e
                        }))
                    },
                    clearLog: () => this.sendCommand("clearLog"),
                    log: (...e) => this.sendCommand("log", [...e].join(" ")),
                    newSeedPair: e => this.sendCommand("newSeedPair", e),
                    notify: e => this.sendCommand("notify", e),
                    resetStatistics: () => this.sendCommand("resetStatistics"),
                    setClientSeed: e => this.sendCommand("setClientSeed", e),
                    skip: () => this.sendCommand("skip").then((e => (e.multiplier /= 100, e))),
                    stop: () => this.sendCommand("stop")
                }), Object.defineProperty(this.executionContext, "maxProfit", {
                    get: () => Math.floor(this.executionContext.bankroll * HOUSE_EDGE)
                }), window.addEventListener("beforeunload", (() => this.executionContext.stop())), window.addEventListener("message", this.onMessage, {
                    passive: !0
                }), this.sendCommand("init").then((({
                    balance,
                    bankroll,
                    script,
                    uname: username
                }) => {
                    Object.assign(this.executionContext, {
                        balance,
                        bankroll,
                        username
                    });
                    const wrappedScript = `\n        (async () => {\n          ${script}\n        })()\n        .catch(error => this.log("ERROR:", error.message))\n        .then(this.stop)\n      `;
                    (function () {
                        try {
                            eval(wrappedScript)
                        } catch (e) {
                            this.log("ERROR:", e.message), this.stop()
                        }
                    }).call(this.executionContext)
                }))
            }
        }, _temp)
    })()
})();