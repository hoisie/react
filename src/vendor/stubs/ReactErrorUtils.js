/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactErrorUtils
 * @typechecks
 */

"use strict";

function bugsenseWrapper(func, name) {
  return function() {
    try {
      return func.apply(this, arguments);
    } catch (e) {
      try {
        Bugsense.leaveBreadcrumb("Exception in " + name);
        Bugsense.notify(e);
      } catch(ignore) { }
    }
  };
}

var ReactErrorUtils = {
  /**
   * Creates a guarded version of a function. This is supposed to make debugging
   * of event handlers easier. To aid debugging with the browser's debugger,
   * this currently simply returns the original function.
   *
   * @param {function} func Function to be executed
   * @param {string} name The name of the guard
   * @return {function}
   */
  guard: function(func, name) {
    if (window.config
          && window.config.production
          && window.config.production.bugsense_enabled) {
      return bugsenseWrapper(func, name);
    }
    return func;
  }
};

module.exports = ReactErrorUtils;
