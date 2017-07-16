/** @flow */

import { INDEX_MODES } from "./constants";
import SearchIndex from "./SearchIndex";

import type { IndexMode } from "./constants";
import type { SearchApiIndex } from "../types";

type UidMap = {
  [uid: string]: boolean
};

/**
 * Synchronous client-side full-text search utility.
 * Forked from JS search (github.com/bvaughn/js-search).
 */
export default class SearchUtility implements SearchApiIndex {
  _indexMode: IndexMode;
  _tokenizePattern: RegExp;
  _caseSensitive: boolean;
  _searchIndex: SearchIndex;
  _uids: UidMap;

  /**
   * Constructor.
   *
   * @param indexMode See #setIndexMode
   * @param tokenizePattern See #setTokenizePattern
   * @param caseSensitive See #setCaseSensitive
   */
  constructor(
    {
      indexMode = INDEX_MODES.ALL_SUBSTRINGS,
      tokenizePattern = /\s+/,
      caseSensitive = false
    }: {
      indexMode?: IndexMode,
      tokenizePattern?: RegExp,
      caseSensitive?: boolean
    } = {}
  ) {
    this._indexMode = indexMode;
    this._tokenizePattern = tokenizePattern;
    this._caseSensitive = caseSensitive;

    this._searchIndex = new SearchIndex();
    this._uids = {};
  }

  /**
   * Returns a constant representing the current index mode.
   */
  getIndexMode(): string {
    return this._indexMode;
  }

  /**
   * Returns a constant representing the current tokenize pattern.
   */
  getTokenizePattern(): RegExp {
    return this._tokenizePattern;
  }

  /**
   * Returns a constant representing the current case-sensitive bit.
   */
  getCaseSensitive(): boolean {
    return this._caseSensitive;
  }

  /**
   * Adds or updates a uid in the search index and associates it with the specified text.
   * Note that at this time uids can only be added or updated in the index, not removed.
   *
   * @param uid Uniquely identifies a searchable object
   * @param text Text to associate with uid
   */
  indexDocument = (uid: any, text: string): SearchApiIndex => {
    this._uids[uid] = true;

    var fieldTokens: Array<string> = this._tokenize(this._sanitize(text));

    fieldTokens.forEach(fieldToken => {
      var expandedTokens: Array<string> = this._expandToken(fieldToken);

      expandedTokens.forEach(expandedToken => {
        this._searchIndex.indexDocument(expandedToken, uid);
      });
    });

    return this;
  };

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
  search = (query: string): Promise<Array<any>> => {
    if (!query) {
      return Promise.resolve(Object.keys(this._uids));
    } else {
      var tokens: Array<string> = this._tokenize(this._sanitize(query));

      return Promise.resolve(this._searchIndex.search(tokens));
    }
  };

  /**
   * Sets a new index mode.
   * See util/constants/INDEX_MODES
   */
  setIndexMode(indexMode: IndexMode): void {
    if (Object.keys(this._uids).length > 0) {
      throw Error(
        "indexMode cannot be changed once documents have been indexed"
      );
    }

    this._indexMode = indexMode;
  }

  /**
   * Sets a new tokenize pattern (regular expression)
   */
  setTokenizePattern(pattern: RegExp): void {
    this._tokenizePattern = pattern;
  }

  /**
   * Sets a new case-sensitive bit
   */
  setCaseSensitive(caseSensitive: boolean): void {
    this._caseSensitive = caseSensitive;
  }

  /**
   * Index strategy based on 'all-substrings-index-strategy.ts' in github.com/bvaughn/js-search/
   *
   * @private
   */
  _expandToken(token: string): Array<string> {
    switch (this._indexMode) {
      case INDEX_MODES.EXACT_WORDS:
        return [token];
      case INDEX_MODES.PREFIXES:
        return this._expandPrefixTokens(token);
      case INDEX_MODES.ALL_SUBSTRINGS:
      default:
        return this._expandAllSubstringTokens(token);
    }
  }

  _expandAllSubstringTokens(token: string): Array<string> {
    const expandedTokens = [];

    // String.prototype.charAt() may return surrogate halves instead of whole characters.
    // When this happens in the context of a web-worker it can cause Chrome to crash.
    // Catching the error is a simple solution for now; in the future I may try to better support non-BMP characters.
    // Resources:
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/charAt
    // https://mathiasbynens.be/notes/javascript-unicode
    try {
      for (let i = 0, length = token.length; i < length; ++i) {
        let substring: string = "";

        for (let j = i; j < length; ++j) {
          substring += token.charAt(j);
          expandedTokens.push(substring);
        }
      }
    } catch (error) {
      console.error(`Unable to parse token "${token}" ${error}`);
    }

    return expandedTokens;
  }

  _expandPrefixTokens(token: string): Array<string> {
    const expandedTokens = [];

    // String.prototype.charAt() may return surrogate halves instead of whole characters.
    // When this happens in the context of a web-worker it can cause Chrome to crash.
    // Catching the error is a simple solution for now; in the future I may try to better support non-BMP characters.
    // Resources:
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/charAt
    // https://mathiasbynens.be/notes/javascript-unicode
    try {
      for (let i = 0, length = token.length; i < length; ++i) {
        expandedTokens.push(token.substr(0, i + 1));
      }
    } catch (error) {
      console.error(`Unable to parse token "${token}" ${error}`);
    }

    return expandedTokens;
  }

  /**
   * @private
   */
  _sanitize(string: string): string {
    return this._caseSensitive
      ? string.trim()
      : string.trim().toLocaleLowerCase();
  }

  /**
   * @private
   */
  _tokenize(text: string): Array<string> {
    return text.split(this._tokenizePattern).filter(text => text); // Remove empty tokens
  }
}
