module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.INDEX_MODES = exports.default = undefined;
	
	var _SearchApi = __webpack_require__(2);
	
	var _SearchApi2 = _interopRequireDefault(_SearchApi);
	
	var _util = __webpack_require__(3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = _SearchApi2.default;
	exports.INDEX_MODES = _util.INDEX_MODES;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _util = __webpack_require__(3);
	
	var _worker = __webpack_require__(7);
	
	var _worker2 = _interopRequireDefault(_worker);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * Search API that uses web workers when available.
	 * Indexing and searching is performed in the UI thread as a fallback when web workers aren't supported.
	 */
	var SearchApi = // TODO
	
	function SearchApi() {
	  var _this = this;
	
	  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
	      indexMode = _ref.indexMode,
	      tokenizePattern = _ref.tokenizePattern,
	      caseSensitive = _ref.caseSensitive;
	
	  _classCallCheck(this, SearchApi);
	
	  this.indexDocument = function (uid, text) {
	    _this._search.indexDocument(uid, text);
	
	    return _this;
	  };
	
	  this.search = function (query) {
	    // Promise.resolve handles both synchronous and web-worker Search utilities
	    return _this._search.search(query);
	  };
	
	  // Based on https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers
	  // But with added check for Node environment
	  if (typeof window !== "undefined" && window.Worker) {
	    this._search = new _worker2.default({
	      indexMode: indexMode,
	      tokenizePattern: tokenizePattern,
	      caseSensitive: caseSensitive
	    });
	  } else {
	    this._search = new _util.SearchUtility({
	      indexMode: indexMode,
	      tokenizePattern: tokenizePattern,
	      caseSensitive: caseSensitive
	    });
	  }
	}
	
	/**
	 * Adds or updates a uid in the search index and associates it with the specified text.
	 * Note that at this time uids can only be added or updated in the index, not removed.
	 *
	 * @param uid Uniquely identifies a searchable object
	 * @param text Text to associate with uid
	 */
	
	
	/**
	 * Searches the current index for the specified query text.
	 * Only uids matching all of the words within the text will be accepted.
	 * If an empty query string is provided all indexed uids will be returned.
	 *
	 * Document searches are case-insensitive (e.g. "search" will match "Search").
	 * Document searches use substring matching (e.g. "na" and "me" will both match "name").
	 *
	 * @param query Searchable query text
	 * @return Promise to be resolved with an Array of matching uids
	 */
	;
	
	exports.default = SearchApi;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.SearchUtility = exports.INDEX_MODES = undefined;
	
	var _SearchUtility = __webpack_require__(4);
	
	var _SearchUtility2 = _interopRequireDefault(_SearchUtility);
	
	var _constants = __webpack_require__(5);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.INDEX_MODES = _constants.INDEX_MODES;
	exports.SearchUtility = _SearchUtility2.default;
	exports.default = _SearchUtility2.default;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _constants = __webpack_require__(5);
	
	var _SearchIndex = __webpack_require__(6);
	
	var _SearchIndex2 = _interopRequireDefault(_SearchIndex);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * Synchronous client-side full-text search utility.
	 * Forked from JS search (github.com/bvaughn/js-search).
	 */
	var SearchUtility = function () {
	
	  /**
	   * Constructor.
	   *
	   * @param indexMode See #setIndexMode
	   * @param tokenizePattern See #setTokenizePattern
	   * @param caseSensitive See #setCaseSensitive
	   */
	  function SearchUtility() {
	    var _this = this;
	
	    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
	        _ref$indexMode = _ref.indexMode,
	        indexMode = _ref$indexMode === undefined ? _constants.INDEX_MODES.ALL_SUBSTRINGS : _ref$indexMode,
	        _ref$tokenizePattern = _ref.tokenizePattern,
	        tokenizePattern = _ref$tokenizePattern === undefined ? /\s+/ : _ref$tokenizePattern,
	        _ref$caseSensitive = _ref.caseSensitive,
	        caseSensitive = _ref$caseSensitive === undefined ? false : _ref$caseSensitive;
	
	    _classCallCheck(this, SearchUtility);
	
	    this.indexDocument = function (uid, text) {
	      _this._uids[uid] = true;
	
	      var fieldTokens = _this._tokenize(_this._sanitize(text));
	
	      fieldTokens.forEach(function (fieldToken) {
	        var expandedTokens = _this._expandToken(fieldToken);
	
	        expandedTokens.forEach(function (expandedToken) {
	          _this._searchIndex.indexDocument(expandedToken, uid);
	        });
	      });
	
	      return _this;
	    };
	
	    this.search = function (query) {
	      if (!query) {
	        return Promise.resolve(Object.keys(_this._uids));
	      } else {
	        var tokens = _this._tokenize(_this._sanitize(query));
	
	        return Promise.resolve(_this._searchIndex.search(tokens));
	      }
	    };
	
	    this._indexMode = indexMode;
	    this._tokenizePattern = tokenizePattern;
	    this._caseSensitive = caseSensitive;
	
	    this._searchIndex = new _SearchIndex2.default();
	    this._uids = {};
	  }
	
	  /**
	   * Returns a constant representing the current index mode.
	   */
	
	
	  _createClass(SearchUtility, [{
	    key: "getIndexMode",
	    value: function getIndexMode() {
	      return this._indexMode;
	    }
	
	    /**
	     * Returns a constant representing the current tokenize pattern.
	     */
	
	  }, {
	    key: "getTokenizePattern",
	    value: function getTokenizePattern() {
	      return this._tokenizePattern;
	    }
	
	    /**
	     * Returns a constant representing the current case-sensitive bit.
	     */
	
	  }, {
	    key: "getCaseSensitive",
	    value: function getCaseSensitive() {
	      return this._caseSensitive;
	    }
	
	    /**
	     * Adds or updates a uid in the search index and associates it with the specified text.
	     * Note that at this time uids can only be added or updated in the index, not removed.
	     *
	     * @param uid Uniquely identifies a searchable object
	     * @param text Text to associate with uid
	     */
	
	
	    /**
	     * Searches the current index for the specified query text.
	     * Only uids matching all of the words within the text will be accepted.
	     * If an empty query string is provided all indexed uids will be returned.
	     *
	     * Document searches are case-insensitive (e.g. "search" will match "Search").
	     * Document searches use substring matching (e.g. "na" and "me" will both match "name").
	     *
	     * @param query Searchable query text
	     * @return Array of uids
	     */
	
	  }, {
	    key: "setIndexMode",
	
	
	    /**
	     * Sets a new index mode.
	     * See util/constants/INDEX_MODES
	     */
	    value: function setIndexMode(indexMode) {
	      if (Object.keys(this._uids).length > 0) {
	        throw Error("indexMode cannot be changed once documents have been indexed");
	      }
	
	      this._indexMode = indexMode;
	    }
	
	    /**
	     * Sets a new tokenize pattern (regular expression)
	     */
	
	  }, {
	    key: "setTokenizePattern",
	    value: function setTokenizePattern(pattern) {
	      this._tokenizePattern = pattern;
	    }
	
	    /**
	     * Sets a new case-sensitive bit
	     */
	
	  }, {
	    key: "setCaseSensitive",
	    value: function setCaseSensitive(caseSensitive) {
	      this._caseSensitive = caseSensitive;
	    }
	
	    /**
	     * Index strategy based on 'all-substrings-index-strategy.ts' in github.com/bvaughn/js-search/
	     *
	     * @private
	     */
	
	  }, {
	    key: "_expandToken",
	    value: function _expandToken(token) {
	      switch (this._indexMode) {
	        case _constants.INDEX_MODES.EXACT_WORDS:
	          return [token];
	        case _constants.INDEX_MODES.PREFIXES:
	          return this._expandPrefixTokens(token);
	        case _constants.INDEX_MODES.ALL_SUBSTRINGS:
	        default:
	          return this._expandAllSubstringTokens(token);
	      }
	    }
	  }, {
	    key: "_expandAllSubstringTokens",
	    value: function _expandAllSubstringTokens(token) {
	      var expandedTokens = [];
	
	      // String.prototype.charAt() may return surrogate halves instead of whole characters.
	      // When this happens in the context of a web-worker it can cause Chrome to crash.
	      // Catching the error is a simple solution for now; in the future I may try to better support non-BMP characters.
	      // Resources:
	      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/charAt
	      // https://mathiasbynens.be/notes/javascript-unicode
	      try {
	        for (var i = 0, length = token.length; i < length; ++i) {
	          var substring = "";
	
	          for (var j = i; j < length; ++j) {
	            substring += token.charAt(j);
	            expandedTokens.push(substring);
	          }
	        }
	      } catch (error) {
	        console.error("Unable to parse token \"" + token + "\" " + error);
	      }
	
	      return expandedTokens;
	    }
	  }, {
	    key: "_expandPrefixTokens",
	    value: function _expandPrefixTokens(token) {
	      var expandedTokens = [];
	
	      // String.prototype.charAt() may return surrogate halves instead of whole characters.
	      // When this happens in the context of a web-worker it can cause Chrome to crash.
	      // Catching the error is a simple solution for now; in the future I may try to better support non-BMP characters.
	      // Resources:
	      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/charAt
	      // https://mathiasbynens.be/notes/javascript-unicode
	      try {
	        for (var i = 0, length = token.length; i < length; ++i) {
	          expandedTokens.push(token.substr(0, i + 1));
	        }
	      } catch (error) {
	        console.error("Unable to parse token \"" + token + "\" " + error);
	      }
	
	      return expandedTokens;
	    }
	
	    /**
	     * @private
	     */
	
	  }, {
	    key: "_sanitize",
	    value: function _sanitize(string) {
	      return this._caseSensitive ? string.trim() : string.trim().toLocaleLowerCase();
	    }
	
	    /**
	     * @private
	     */
	
	  }, {
	    key: "_tokenize",
	    value: function _tokenize(text) {
	      return text.split(this._tokenizePattern).filter(function (text) {
	        return text;
	      }); // Remove empty tokens
	    }
	  }]);
	
	  return SearchUtility;
	}();
	
	exports.default = SearchUtility;

/***/ }),
/* 5 */
/***/ (function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var INDEX_MODES = exports.INDEX_MODES = {
	  // Indexes for all substring searches (e.g. the term "cat" is indexed as "c", "ca", "cat", "a", "at", and "t").
	  // Based on 'all-substrings-index-strategy' from js-search;
	  // github.com/bvaughn/js-search/blob/master/source/index-strategy/all-substrings-index-strategy.ts
	  ALL_SUBSTRINGS: "ALL_SUBSTRINGS",
	
	  // Indexes for exact word matches only.
	  // Based on 'exact-word-index-strategy' from js-search;
	  // github.com/bvaughn/js-search/blob/master/source/index-strategy/exact-word-index-strategy.ts
	  EXACT_WORDS: "EXACT_WORDS",
	
	  // Indexes for prefix searches (e.g. the term "cat" is indexed as "c", "ca", and "cat" allowing prefix search lookups).
	  // Based on 'prefix-index-strategy' from js-search;
	  // github.com/bvaughn/js-search/blob/master/source/index-strategy/prefix-index-strategy.ts
	  PREFIXES: "PREFIXES"
	};

/***/ }),
/* 6 */
/***/ (function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * Maps search tokens to uids using a trie structure.
	 */
	var SearchIndex = function () {
	  function SearchIndex() {
	    _classCallCheck(this, SearchIndex);
	
	    this.tokenToUidMap = {};
	  }
	
	  /**
	   * Maps the specified token to a uid.
	   *
	   * @param token Searchable token (e.g. "road")
	   * @param uid Identifies a document within the searchable corpus
	   */
	
	
	  _createClass(SearchIndex, [{
	    key: "indexDocument",
	    value: function indexDocument(token, uid) {
	      if (!this.tokenToUidMap[token]) {
	        this.tokenToUidMap[token] = {};
	      }
	
	      this.tokenToUidMap[token][uid] = uid;
	    }
	
	    /**
	     * Finds uids that have been mapped to the set of tokens specified.
	     * Only uids that have been mapped to all tokens will be returned.
	     *
	     * @param tokens Array of searchable tokens (e.g. ["long", "road"])
	     * @return Array of uids that have been associated with the set of search tokens
	     */
	
	  }, {
	    key: "search",
	    value: function search(tokens) {
	      var _this = this;
	
	      var uidMap = {};
	      var initialized = false;
	
	      tokens.forEach(function (token) {
	        var currentUidMap = _this.tokenToUidMap[token] || {};
	
	        if (!initialized) {
	          initialized = true;
	
	          for (var _uid in currentUidMap) {
	            uidMap[_uid] = currentUidMap[_uid];
	          }
	        } else {
	          for (var _uid2 in uidMap) {
	            if (!currentUidMap[_uid2]) {
	              delete uidMap[_uid2];
	            }
	          }
	        }
	      });
	
	      var uids = [];
	      for (var _uid3 in uidMap) {
	        uids.push(_uid3);
	      }
	
	      return uids;
	    }
	  }]);
	
	  return SearchIndex;
	}();
	
	exports.default = SearchIndex;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _SearchWorkerLoader = __webpack_require__(8);
	
	var _SearchWorkerLoader2 = _interopRequireDefault(_SearchWorkerLoader);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _SearchWorkerLoader2.default;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _uuid = __webpack_require__(9);
	
	var _uuid2 = _interopRequireDefault(_uuid);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	// TODO
	
	/**
	 * Client side, full text search utility.
	 * This interface exposes web worker search capabilities to the UI thread.
	 */
	var SearchWorkerLoader = function () {
	
	  /**
	   * Constructor.
	   */
	  function SearchWorkerLoader() {
	    var _this = this;
	
	    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
	        indexMode = _ref.indexMode,
	        tokenizePattern = _ref.tokenizePattern,
	        caseSensitive = _ref.caseSensitive,
	        WorkerClass = _ref.WorkerClass;
	
	    _classCallCheck(this, SearchWorkerLoader);
	
	    this.indexDocument = function (uid, text) {
	      _this._worker.postMessage({
	        method: "indexDocument",
	        text: text,
	        uid: uid
	      });
	
	      return _this;
	    };
	
	    this.search = function (query) {
	      return new Promise(function (resolve, reject) {
	        var callbackId = _uuid2.default.v4();
	        var data = {
	          callbackId: callbackId,
	          complete: false,
	          error: null,
	          reject: reject,
	          resolve: resolve,
	          results: null
	        };
	
	        _this._worker.postMessage({
	          method: "search",
	          query: query,
	          callbackId: callbackId
	        });
	
	        _this._callbackQueue.push(data);
	        _this._callbackIdMap[callbackId] = data;
	      });
	    };
	
	    // Defer worker import until construction to avoid testing error:
	    // Error: Cannot find module 'worker!./[workername]'
	    if (!WorkerClass) {
	      // $FlowFixMe eslint-disable-next-line
	      WorkerClass = __webpack_require__(11);
	    }
	
	    this._callbackQueue = [];
	    this._callbackIdMap = {};
	
	    this._worker = new WorkerClass();
	    this._worker.onerror = function (event) {
	      var _event$data = event.data,
	          callbackId = _event$data.callbackId,
	          error = _event$data.error;
	
	      _this._updateQueue({ callbackId: callbackId, error: error });
	    };
	    this._worker.onmessage = function (event) {
	      var _event$data2 = event.data,
	          callbackId = _event$data2.callbackId,
	          results = _event$data2.results;
	
	      _this._updateQueue({ callbackId: callbackId, results: results });
	    };
	
	    // Override default :indexMode if a specific one has been requested
	    if (indexMode) {
	      this._worker.postMessage({
	        method: "setIndexMode",
	        indexMode: indexMode
	      });
	    }
	
	    // Override default :tokenizePattern if a specific one has been requested
	    if (tokenizePattern) {
	      this._worker.postMessage({
	        method: "setTokenizePattern",
	        tokenizePattern: tokenizePattern
	      });
	    }
	
	    // Override default :caseSensitive bit if a specific one has been requested
	    if (caseSensitive) {
	      this._worker.postMessage({
	        method: "setCaseSensitive",
	        caseSensitive: caseSensitive
	      });
	    }
	  }
	
	  /**
	   * Adds or updates a uid in the search index and associates it with the specified text.
	   * Note that at this time uids can only be added or updated in the index, not removed.
	   *
	   * @param uid Uniquely identifies a searchable object
	   * @param text Text to associate with uid
	   */
	
	
	  /**
	   * Searches the current index for the specified query text.
	   * Only uids matching all of the words within the text will be accepted.
	   * If an empty query string is provided all indexed uids will be returned.
	   *
	   * Document searches are case-insensitive (e.g. "search" will match "Search").
	   * Document searches use substring matching (e.g. "na" and "me" will both match "name").
	   *
	   * @param query Searchable query text
	   * @return Promise to be resolved with an array of uids
	   */
	
	
	  _createClass(SearchWorkerLoader, [{
	    key: "_updateQueue",
	
	
	    /**
	     * Updates the queue and flushes any completed promises that are ready.
	     */
	    value: function _updateQueue(_ref2) {
	      var callbackId = _ref2.callbackId,
	          error = _ref2.error,
	          results = _ref2.results;
	
	      var target = this._callbackIdMap[callbackId];
	      target.complete = true;
	      target.error = error;
	      target.results = results;
	
	      while (this._callbackQueue.length) {
	        var data = this._callbackQueue[0];
	
	        if (!data.complete) {
	          break;
	        }
	
	        this._callbackQueue.shift();
	
	        delete this._callbackIdMap[data.callbackId];
	
	        if (data.error) {
	          data.reject(data.error);
	        } else {
	          // This type will always be defined in this case;
	          // This casting lets Flow know it's safe.
	          data.resolve(data.results);
	        }
	      }
	    }
	  }]);
	
	  return SearchWorkerLoader;
	}();
	
	exports.default = SearchWorkerLoader;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	//     uuid.js
	//
	//     Copyright (c) 2010-2012 Robert Kieffer
	//     MIT License - http://opensource.org/licenses/mit-license.php
	
	// Unique ID creation requires a high quality random # generator.  We feature
	// detect to determine the best RNG source, normalizing to a function that
	// returns 128-bits of randomness, since that's what's usually required
	var _rng = __webpack_require__(10);
	
	// Maps for number <-> hex string conversion
	var _byteToHex = [];
	var _hexToByte = {};
	for (var i = 0; i < 256; i++) {
	  _byteToHex[i] = (i + 0x100).toString(16).substr(1);
	  _hexToByte[_byteToHex[i]] = i;
	}
	
	// **`parse()` - Parse a UUID into it's component bytes**
	function parse(s, buf, offset) {
	  var i = (buf && offset) || 0, ii = 0;
	
	  buf = buf || [];
	  s.toLowerCase().replace(/[0-9a-f]{2}/g, function(oct) {
	    if (ii < 16) { // Don't overflow!
	      buf[i + ii++] = _hexToByte[oct];
	    }
	  });
	
	  // Zero out remaining bytes if string was short
	  while (ii < 16) {
	    buf[i + ii++] = 0;
	  }
	
	  return buf;
	}
	
	// **`unparse()` - Convert UUID byte array (ala parse()) into a string**
	function unparse(buf, offset) {
	  var i = offset || 0, bth = _byteToHex;
	  return  bth[buf[i++]] + bth[buf[i++]] +
	          bth[buf[i++]] + bth[buf[i++]] + '-' +
	          bth[buf[i++]] + bth[buf[i++]] + '-' +
	          bth[buf[i++]] + bth[buf[i++]] + '-' +
	          bth[buf[i++]] + bth[buf[i++]] + '-' +
	          bth[buf[i++]] + bth[buf[i++]] +
	          bth[buf[i++]] + bth[buf[i++]] +
	          bth[buf[i++]] + bth[buf[i++]];
	}
	
	// **`v1()` - Generate time-based UUID**
	//
	// Inspired by https://github.com/LiosK/UUID.js
	// and http://docs.python.org/library/uuid.html
	
	// random #'s we need to init node and clockseq
	var _seedBytes = _rng();
	
	// Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
	var _nodeId = [
	  _seedBytes[0] | 0x01,
	  _seedBytes[1], _seedBytes[2], _seedBytes[3], _seedBytes[4], _seedBytes[5]
	];
	
	// Per 4.2.2, randomize (14 bit) clockseq
	var _clockseq = (_seedBytes[6] << 8 | _seedBytes[7]) & 0x3fff;
	
	// Previous uuid creation time
	var _lastMSecs = 0, _lastNSecs = 0;
	
	// See https://github.com/broofa/node-uuid for API details
	function v1(options, buf, offset) {
	  var i = buf && offset || 0;
	  var b = buf || [];
	
	  options = options || {};
	
	  var clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq;
	
	  // UUID timestamps are 100 nano-second units since the Gregorian epoch,
	  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
	  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
	  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.
	  var msecs = options.msecs !== undefined ? options.msecs : new Date().getTime();
	
	  // Per 4.2.1.2, use count of uuid's generated during the current clock
	  // cycle to simulate higher resolution clock
	  var nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1;
	
	  // Time since last uuid creation (in msecs)
	  var dt = (msecs - _lastMSecs) + (nsecs - _lastNSecs)/10000;
	
	  // Per 4.2.1.2, Bump clockseq on clock regression
	  if (dt < 0 && options.clockseq === undefined) {
	    clockseq = clockseq + 1 & 0x3fff;
	  }
	
	  // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
	  // time interval
	  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
	    nsecs = 0;
	  }
	
	  // Per 4.2.1.2 Throw error if too many uuids are requested
	  if (nsecs >= 10000) {
	    throw new Error('uuid.v1(): Can\'t create more than 10M uuids/sec');
	  }
	
	  _lastMSecs = msecs;
	  _lastNSecs = nsecs;
	  _clockseq = clockseq;
	
	  // Per 4.1.4 - Convert from unix epoch to Gregorian epoch
	  msecs += 12219292800000;
	
	  // `time_low`
	  var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
	  b[i++] = tl >>> 24 & 0xff;
	  b[i++] = tl >>> 16 & 0xff;
	  b[i++] = tl >>> 8 & 0xff;
	  b[i++] = tl & 0xff;
	
	  // `time_mid`
	  var tmh = (msecs / 0x100000000 * 10000) & 0xfffffff;
	  b[i++] = tmh >>> 8 & 0xff;
	  b[i++] = tmh & 0xff;
	
	  // `time_high_and_version`
	  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version
	  b[i++] = tmh >>> 16 & 0xff;
	
	  // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)
	  b[i++] = clockseq >>> 8 | 0x80;
	
	  // `clock_seq_low`
	  b[i++] = clockseq & 0xff;
	
	  // `node`
	  var node = options.node || _nodeId;
	  for (var n = 0; n < 6; n++) {
	    b[i + n] = node[n];
	  }
	
	  return buf ? buf : unparse(b);
	}
	
	// **`v4()` - Generate random UUID**
	
	// See https://github.com/broofa/node-uuid for API details
	function v4(options, buf, offset) {
	  // Deprecated - 'format' argument, as supported in v1.2
	  var i = buf && offset || 0;
	
	  if (typeof(options) == 'string') {
	    buf = options == 'binary' ? new Array(16) : null;
	    options = null;
	  }
	  options = options || {};
	
	  var rnds = options.random || (options.rng || _rng)();
	
	  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
	  rnds[6] = (rnds[6] & 0x0f) | 0x40;
	  rnds[8] = (rnds[8] & 0x3f) | 0x80;
	
	  // Copy bytes to buffer, if provided
	  if (buf) {
	    for (var ii = 0; ii < 16; ii++) {
	      buf[i + ii] = rnds[ii];
	    }
	  }
	
	  return buf || unparse(rnds);
	}
	
	// Export public API
	var uuid = v4;
	uuid.v1 = v1;
	uuid.v4 = v4;
	uuid.parse = parse;
	uuid.unparse = unparse;
	
	module.exports = uuid;


/***/ }),
/* 10 */
/***/ (function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {
	var rng;
	
	var crypto = global.crypto || global.msCrypto; // for IE 11
	if (crypto && crypto.getRandomValues) {
	  // WHATWG crypto-based RNG - http://wiki.whatwg.org/wiki/Crypto
	  // Moderately fast, high quality
	  var _rnds8 = new Uint8Array(16);
	  rng = function whatwgRNG() {
	    crypto.getRandomValues(_rnds8);
	    return _rnds8;
	  };
	}
	
	if (!rng) {
	  // Math.random()-based (RNG)
	  //
	  // If all else fails, use Math.random().  It's fast, but is of unspecified
	  // quality.
	  var  _rnds = new Array(16);
	  rng = function() {
	    for (var i = 0, r; i < 16; i++) {
	      if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
	      _rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
	    }
	
	    return _rnds;
	  };
	}
	
	module.exports = rng;
	
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = function() {
		return __webpack_require__(12)("/******/ (function(modules) { // webpackBootstrap\n/******/ \t// The module cache\n/******/ \tvar installedModules = {};\n/******/\n/******/ \t// The require function\n/******/ \tfunction __webpack_require__(moduleId) {\n/******/\n/******/ \t\t// Check if module is in cache\n/******/ \t\tif(installedModules[moduleId])\n/******/ \t\t\treturn installedModules[moduleId].exports;\n/******/\n/******/ \t\t// Create a new module (and put it into the cache)\n/******/ \t\tvar module = installedModules[moduleId] = {\n/******/ \t\t\texports: {},\n/******/ \t\t\tid: moduleId,\n/******/ \t\t\tloaded: false\n/******/ \t\t};\n/******/\n/******/ \t\t// Execute the module function\n/******/ \t\tmodules[moduleId].call(module.exports, module, module.exports, __webpack_require__);\n/******/\n/******/ \t\t// Flag the module as loaded\n/******/ \t\tmodule.loaded = true;\n/******/\n/******/ \t\t// Return the exports of the module\n/******/ \t\treturn module.exports;\n/******/ \t}\n/******/\n/******/\n/******/ \t// expose the modules object (__webpack_modules__)\n/******/ \t__webpack_require__.m = modules;\n/******/\n/******/ \t// expose the module cache\n/******/ \t__webpack_require__.c = installedModules;\n/******/\n/******/ \t// __webpack_public_path__\n/******/ \t__webpack_require__.p = \"\";\n/******/\n/******/ \t// Load entry module and return exports\n/******/ \treturn __webpack_require__(0);\n/******/ })\n/************************************************************************/\n/******/ ([\n/* 0 */\n/***/ (function(module, exports, __webpack_require__) {\n\n\t\"use strict\";\n\t\n\tvar _util = __webpack_require__(1);\n\t\n\t/**\n\t * Search entry point to web worker.\n\t * Builds search index and performs searches on separate thread from the ui.\n\t */\n\t\n\tvar searchUtility = new _util.SearchUtility();\n\t\n\tself.addEventListener(\"message\", function (event) {\n\t  var data = event.data;\n\t  var method = data.method;\n\t\n\t\n\t  switch (method) {\n\t    case \"indexDocument\":\n\t      var uid = data.uid,\n\t          text = data.text;\n\t\n\t\n\t      searchUtility.indexDocument(uid, text);\n\t      break;\n\t    case \"search\":\n\t      var callbackId = data.callbackId,\n\t          query = data.query;\n\t\n\t\n\t      var results = searchUtility.search(query);\n\t\n\t      self.postMessage({ callbackId: callbackId, results: results });\n\t      break;\n\t    case \"setIndexMode\":\n\t      var indexMode = data.indexMode;\n\t\n\t\n\t      searchUtility.setIndexMode(indexMode);\n\t      break;\n\t    case \"setTokenizePattern\":\n\t      var tokenizePattern = data.tokenizePattern;\n\t\n\t\n\t      searchUtility.setTokenizePattern(tokenizePattern);\n\t      break;\n\t    case \"setCaseSensitive\":\n\t      var caseSensitive = data.caseSensitive;\n\t\n\t\n\t      searchUtility.setCaseSensitive(caseSensitive);\n\t      break;\n\t  }\n\t}, false);\n\n/***/ }),\n/* 1 */\n/***/ (function(module, exports, __webpack_require__) {\n\n\t\"use strict\";\n\t\n\tObject.defineProperty(exports, \"__esModule\", {\n\t  value: true\n\t});\n\texports.SearchUtility = exports.INDEX_MODES = undefined;\n\t\n\tvar _SearchUtility = __webpack_require__(2);\n\t\n\tvar _SearchUtility2 = _interopRequireDefault(_SearchUtility);\n\t\n\tvar _constants = __webpack_require__(3);\n\t\n\tfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\t\n\texports.INDEX_MODES = _constants.INDEX_MODES;\n\texports.SearchUtility = _SearchUtility2.default;\n\texports.default = _SearchUtility2.default;\n\n/***/ }),\n/* 2 */\n/***/ (function(module, exports, __webpack_require__) {\n\n\t\"use strict\";\n\t\n\tObject.defineProperty(exports, \"__esModule\", {\n\t  value: true\n\t});\n\t\n\tvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\t\n\tvar _constants = __webpack_require__(3);\n\t\n\tvar _SearchIndex = __webpack_require__(4);\n\t\n\tvar _SearchIndex2 = _interopRequireDefault(_SearchIndex);\n\t\n\tfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\t\n\tfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\t\n\t/**\n\t * Synchronous client-side full-text search utility.\n\t * Forked from JS search (github.com/bvaughn/js-search).\n\t */\n\tvar SearchUtility = function () {\n\t\n\t  /**\n\t   * Constructor.\n\t   *\n\t   * @param indexMode See #setIndexMode\n\t   * @param tokenizePattern See #setTokenizePattern\n\t   * @param caseSensitive See #setCaseSensitive\n\t   */\n\t  function SearchUtility() {\n\t    var _this = this;\n\t\n\t    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},\n\t        _ref$indexMode = _ref.indexMode,\n\t        indexMode = _ref$indexMode === undefined ? _constants.INDEX_MODES.ALL_SUBSTRINGS : _ref$indexMode,\n\t        _ref$tokenizePattern = _ref.tokenizePattern,\n\t        tokenizePattern = _ref$tokenizePattern === undefined ? /\\s+/ : _ref$tokenizePattern,\n\t        _ref$caseSensitive = _ref.caseSensitive,\n\t        caseSensitive = _ref$caseSensitive === undefined ? false : _ref$caseSensitive;\n\t\n\t    _classCallCheck(this, SearchUtility);\n\t\n\t    this.indexDocument = function (uid, text) {\n\t      _this._uids[uid] = true;\n\t\n\t      var fieldTokens = _this._tokenize(_this._sanitize(text));\n\t\n\t      fieldTokens.forEach(function (fieldToken) {\n\t        var expandedTokens = _this._expandToken(fieldToken);\n\t\n\t        expandedTokens.forEach(function (expandedToken) {\n\t          _this._searchIndex.indexDocument(expandedToken, uid);\n\t        });\n\t      });\n\t\n\t      return _this;\n\t    };\n\t\n\t    this.search = function (query) {\n\t      if (!query) {\n\t        return Promise.resolve(Object.keys(_this._uids));\n\t      } else {\n\t        var tokens = _this._tokenize(_this._sanitize(query));\n\t\n\t        return Promise.resolve(_this._searchIndex.search(tokens));\n\t      }\n\t    };\n\t\n\t    this._indexMode = indexMode;\n\t    this._tokenizePattern = tokenizePattern;\n\t    this._caseSensitive = caseSensitive;\n\t\n\t    this._searchIndex = new _SearchIndex2.default();\n\t    this._uids = {};\n\t  }\n\t\n\t  /**\n\t   * Returns a constant representing the current index mode.\n\t   */\n\t\n\t\n\t  _createClass(SearchUtility, [{\n\t    key: \"getIndexMode\",\n\t    value: function getIndexMode() {\n\t      return this._indexMode;\n\t    }\n\t\n\t    /**\n\t     * Returns a constant representing the current tokenize pattern.\n\t     */\n\t\n\t  }, {\n\t    key: \"getTokenizePattern\",\n\t    value: function getTokenizePattern() {\n\t      return this._tokenizePattern;\n\t    }\n\t\n\t    /**\n\t     * Returns a constant representing the current case-sensitive bit.\n\t     */\n\t\n\t  }, {\n\t    key: \"getCaseSensitive\",\n\t    value: function getCaseSensitive() {\n\t      return this._caseSensitive;\n\t    }\n\t\n\t    /**\n\t     * Adds or updates a uid in the search index and associates it with the specified text.\n\t     * Note that at this time uids can only be added or updated in the index, not removed.\n\t     *\n\t     * @param uid Uniquely identifies a searchable object\n\t     * @param text Text to associate with uid\n\t     */\n\t\n\t\n\t    /**\n\t     * Searches the current index for the specified query text.\n\t     * Only uids matching all of the words within the text will be accepted.\n\t     * If an empty query string is provided all indexed uids will be returned.\n\t     *\n\t     * Document searches are case-insensitive (e.g. \"search\" will match \"Search\").\n\t     * Document searches use substring matching (e.g. \"na\" and \"me\" will both match \"name\").\n\t     *\n\t     * @param query Searchable query text\n\t     * @return Array of uids\n\t     */\n\t\n\t  }, {\n\t    key: \"setIndexMode\",\n\t\n\t\n\t    /**\n\t     * Sets a new index mode.\n\t     * See util/constants/INDEX_MODES\n\t     */\n\t    value: function setIndexMode(indexMode) {\n\t      if (Object.keys(this._uids).length > 0) {\n\t        throw Error(\"indexMode cannot be changed once documents have been indexed\");\n\t      }\n\t\n\t      this._indexMode = indexMode;\n\t    }\n\t\n\t    /**\n\t     * Sets a new tokenize pattern (regular expression)\n\t     */\n\t\n\t  }, {\n\t    key: \"setTokenizePattern\",\n\t    value: function setTokenizePattern(pattern) {\n\t      this._tokenizePattern = pattern;\n\t    }\n\t\n\t    /**\n\t     * Sets a new case-sensitive bit\n\t     */\n\t\n\t  }, {\n\t    key: \"setCaseSensitive\",\n\t    value: function setCaseSensitive(caseSensitive) {\n\t      this._caseSensitive = caseSensitive;\n\t    }\n\t\n\t    /**\n\t     * Index strategy based on 'all-substrings-index-strategy.ts' in github.com/bvaughn/js-search/\n\t     *\n\t     * @private\n\t     */\n\t\n\t  }, {\n\t    key: \"_expandToken\",\n\t    value: function _expandToken(token) {\n\t      switch (this._indexMode) {\n\t        case _constants.INDEX_MODES.EXACT_WORDS:\n\t          return [token];\n\t        case _constants.INDEX_MODES.PREFIXES:\n\t          return this._expandPrefixTokens(token);\n\t        case _constants.INDEX_MODES.ALL_SUBSTRINGS:\n\t        default:\n\t          return this._expandAllSubstringTokens(token);\n\t      }\n\t    }\n\t  }, {\n\t    key: \"_expandAllSubstringTokens\",\n\t    value: function _expandAllSubstringTokens(token) {\n\t      var expandedTokens = [];\n\t\n\t      // String.prototype.charAt() may return surrogate halves instead of whole characters.\n\t      // When this happens in the context of a web-worker it can cause Chrome to crash.\n\t      // Catching the error is a simple solution for now; in the future I may try to better support non-BMP characters.\n\t      // Resources:\n\t      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/charAt\n\t      // https://mathiasbynens.be/notes/javascript-unicode\n\t      try {\n\t        for (var i = 0, length = token.length; i < length; ++i) {\n\t          var substring = \"\";\n\t\n\t          for (var j = i; j < length; ++j) {\n\t            substring += token.charAt(j);\n\t            expandedTokens.push(substring);\n\t          }\n\t        }\n\t      } catch (error) {\n\t        console.error(\"Unable to parse token \\\"\" + token + \"\\\" \" + error);\n\t      }\n\t\n\t      return expandedTokens;\n\t    }\n\t  }, {\n\t    key: \"_expandPrefixTokens\",\n\t    value: function _expandPrefixTokens(token) {\n\t      var expandedTokens = [];\n\t\n\t      // String.prototype.charAt() may return surrogate halves instead of whole characters.\n\t      // When this happens in the context of a web-worker it can cause Chrome to crash.\n\t      // Catching the error is a simple solution for now; in the future I may try to better support non-BMP characters.\n\t      // Resources:\n\t      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/charAt\n\t      // https://mathiasbynens.be/notes/javascript-unicode\n\t      try {\n\t        for (var i = 0, length = token.length; i < length; ++i) {\n\t          expandedTokens.push(token.substr(0, i + 1));\n\t        }\n\t      } catch (error) {\n\t        console.error(\"Unable to parse token \\\"\" + token + \"\\\" \" + error);\n\t      }\n\t\n\t      return expandedTokens;\n\t    }\n\t\n\t    /**\n\t     * @private\n\t     */\n\t\n\t  }, {\n\t    key: \"_sanitize\",\n\t    value: function _sanitize(string) {\n\t      return this._caseSensitive ? string.trim() : string.trim().toLocaleLowerCase();\n\t    }\n\t\n\t    /**\n\t     * @private\n\t     */\n\t\n\t  }, {\n\t    key: \"_tokenize\",\n\t    value: function _tokenize(text) {\n\t      return text.split(this._tokenizePattern).filter(function (text) {\n\t        return text;\n\t      }); // Remove empty tokens\n\t    }\n\t  }]);\n\t\n\t  return SearchUtility;\n\t}();\n\t\n\texports.default = SearchUtility;\n\n/***/ }),\n/* 3 */\n/***/ (function(module, exports) {\n\n\t\"use strict\";\n\t\n\tObject.defineProperty(exports, \"__esModule\", {\n\t  value: true\n\t});\n\tvar INDEX_MODES = exports.INDEX_MODES = {\n\t  // Indexes for all substring searches (e.g. the term \"cat\" is indexed as \"c\", \"ca\", \"cat\", \"a\", \"at\", and \"t\").\n\t  // Based on 'all-substrings-index-strategy' from js-search;\n\t  // github.com/bvaughn/js-search/blob/master/source/index-strategy/all-substrings-index-strategy.ts\n\t  ALL_SUBSTRINGS: \"ALL_SUBSTRINGS\",\n\t\n\t  // Indexes for exact word matches only.\n\t  // Based on 'exact-word-index-strategy' from js-search;\n\t  // github.com/bvaughn/js-search/blob/master/source/index-strategy/exact-word-index-strategy.ts\n\t  EXACT_WORDS: \"EXACT_WORDS\",\n\t\n\t  // Indexes for prefix searches (e.g. the term \"cat\" is indexed as \"c\", \"ca\", and \"cat\" allowing prefix search lookups).\n\t  // Based on 'prefix-index-strategy' from js-search;\n\t  // github.com/bvaughn/js-search/blob/master/source/index-strategy/prefix-index-strategy.ts\n\t  PREFIXES: \"PREFIXES\"\n\t};\n\n/***/ }),\n/* 4 */\n/***/ (function(module, exports) {\n\n\t\"use strict\";\n\t\n\tObject.defineProperty(exports, \"__esModule\", {\n\t  value: true\n\t});\n\t\n\tvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\t\n\tfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\t\n\t/**\n\t * Maps search tokens to uids using a trie structure.\n\t */\n\tvar SearchIndex = function () {\n\t  function SearchIndex() {\n\t    _classCallCheck(this, SearchIndex);\n\t\n\t    this.tokenToUidMap = {};\n\t  }\n\t\n\t  /**\n\t   * Maps the specified token to a uid.\n\t   *\n\t   * @param token Searchable token (e.g. \"road\")\n\t   * @param uid Identifies a document within the searchable corpus\n\t   */\n\t\n\t\n\t  _createClass(SearchIndex, [{\n\t    key: \"indexDocument\",\n\t    value: function indexDocument(token, uid) {\n\t      if (!this.tokenToUidMap[token]) {\n\t        this.tokenToUidMap[token] = {};\n\t      }\n\t\n\t      this.tokenToUidMap[token][uid] = uid;\n\t    }\n\t\n\t    /**\n\t     * Finds uids that have been mapped to the set of tokens specified.\n\t     * Only uids that have been mapped to all tokens will be returned.\n\t     *\n\t     * @param tokens Array of searchable tokens (e.g. [\"long\", \"road\"])\n\t     * @return Array of uids that have been associated with the set of search tokens\n\t     */\n\t\n\t  }, {\n\t    key: \"search\",\n\t    value: function search(tokens) {\n\t      var _this = this;\n\t\n\t      var uidMap = {};\n\t      var initialized = false;\n\t\n\t      tokens.forEach(function (token) {\n\t        var currentUidMap = _this.tokenToUidMap[token] || {};\n\t\n\t        if (!initialized) {\n\t          initialized = true;\n\t\n\t          for (var _uid in currentUidMap) {\n\t            uidMap[_uid] = currentUidMap[_uid];\n\t          }\n\t        } else {\n\t          for (var _uid2 in uidMap) {\n\t            if (!currentUidMap[_uid2]) {\n\t              delete uidMap[_uid2];\n\t            }\n\t          }\n\t        }\n\t      });\n\t\n\t      var uids = [];\n\t      for (var _uid3 in uidMap) {\n\t        uids.push(_uid3);\n\t      }\n\t\n\t      return uids;\n\t    }\n\t  }]);\n\t\n\t  return SearchIndex;\n\t}();\n\t\n\texports.default = SearchIndex;\n\n/***/ })\n/******/ ]);\n//# sourceMappingURL=9a160dde0630a9ed8165.worker.js.map", __webpack_require__.p + "9a160dde0630a9ed8165.worker.js");
	};

/***/ }),
/* 12 */
/***/ (function(module, exports) {

	// http://stackoverflow.com/questions/10343913/how-to-create-a-web-worker-from-a-string
	
	var URL = window.URL || window.webkitURL;
	module.exports = function(content, url) {
	  try {
	    try {
	      var blob;
	      try { // BlobBuilder = Deprecated, but widely implemented
	        var BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder;
	        blob = new BlobBuilder();
	        blob.append(content);
	        blob = blob.getBlob();
	      } catch(e) { // The proposed API
	        blob = new Blob([content]);
	      }
	      return new Worker(URL.createObjectURL(blob));
	    } catch(e) {
	      return new Worker('data:application/javascript,' + encodeURIComponent(content));
	    }
	  } catch(e) {
	    if (!url) {
	      throw Error('Inline worker is not supported');
	    }
	    return new Worker(url);
	  }
	}


/***/ })
/******/ ]);
//# sourceMappingURL=js-worker-search.js.map