"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/@actions/core/lib/utils.js
var require_utils = __commonJS({
  "node_modules/@actions/core/lib/utils.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.toCommandProperties = exports.toCommandValue = void 0;
    function toCommandValue(input) {
      if (input === null || input === void 0) {
        return "";
      } else if (typeof input === "string" || input instanceof String) {
        return input;
      }
      return JSON.stringify(input);
    }
    exports.toCommandValue = toCommandValue;
    function toCommandProperties(annotationProperties) {
      if (!Object.keys(annotationProperties).length) {
        return {};
      }
      return {
        title: annotationProperties.title,
        file: annotationProperties.file,
        line: annotationProperties.startLine,
        endLine: annotationProperties.endLine,
        col: annotationProperties.startColumn,
        endColumn: annotationProperties.endColumn
      };
    }
    exports.toCommandProperties = toCommandProperties;
  }
});

// node_modules/@actions/core/lib/command.js
var require_command = __commonJS({
  "node_modules/@actions/core/lib/command.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule)
        return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (k !== "default" && Object.hasOwnProperty.call(mod, k))
            __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.issue = exports.issueCommand = void 0;
    var os = __importStar(require("os"));
    var utils_1 = require_utils();
    function issueCommand(command, properties, message) {
      const cmd = new Command(command, properties, message);
      process.stdout.write(cmd.toString() + os.EOL);
    }
    exports.issueCommand = issueCommand;
    function issue(name, message = "") {
      issueCommand(name, {}, message);
    }
    exports.issue = issue;
    var CMD_STRING = "::";
    var Command = class {
      constructor(command, properties, message) {
        if (!command) {
          command = "missing.command";
        }
        this.command = command;
        this.properties = properties;
        this.message = message;
      }
      toString() {
        let cmdStr = CMD_STRING + this.command;
        if (this.properties && Object.keys(this.properties).length > 0) {
          cmdStr += " ";
          let first = true;
          for (const key in this.properties) {
            if (this.properties.hasOwnProperty(key)) {
              const val = this.properties[key];
              if (val) {
                if (first) {
                  first = false;
                } else {
                  cmdStr += ",";
                }
                cmdStr += `${key}=${escapeProperty(val)}`;
              }
            }
          }
        }
        cmdStr += `${CMD_STRING}${escapeData(this.message)}`;
        return cmdStr;
      }
    };
    function escapeData(s) {
      return utils_1.toCommandValue(s).replace(/%/g, "%25").replace(/\r/g, "%0D").replace(/\n/g, "%0A");
    }
    function escapeProperty(s) {
      return utils_1.toCommandValue(s).replace(/%/g, "%25").replace(/\r/g, "%0D").replace(/\n/g, "%0A").replace(/:/g, "%3A").replace(/,/g, "%2C");
    }
  }
});

// node_modules/@actions/core/lib/file-command.js
var require_file_command = __commonJS({
  "node_modules/@actions/core/lib/file-command.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule)
        return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (k !== "default" && Object.hasOwnProperty.call(mod, k))
            __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.issueCommand = void 0;
    var fs = __importStar(require("fs"));
    var os = __importStar(require("os"));
    var utils_1 = require_utils();
    function issueCommand(command, message) {
      const filePath = process.env[`GITHUB_${command}`];
      if (!filePath) {
        throw new Error(`Unable to find environment variable for file command ${command}`);
      }
      if (!fs.existsSync(filePath)) {
        throw new Error(`Missing file at path: ${filePath}`);
      }
      fs.appendFileSync(filePath, `${utils_1.toCommandValue(message)}${os.EOL}`, {
        encoding: "utf8"
      });
    }
    exports.issueCommand = issueCommand;
  }
});

// node_modules/uuid/dist/rng.js
var require_rng = __commonJS({
  "node_modules/uuid/dist/rng.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = rng;
    var _crypto = _interopRequireDefault(require("crypto"));
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var rnds8Pool = new Uint8Array(256);
    var poolPtr = rnds8Pool.length;
    function rng() {
      if (poolPtr > rnds8Pool.length - 16) {
        _crypto.default.randomFillSync(rnds8Pool);
        poolPtr = 0;
      }
      return rnds8Pool.slice(poolPtr, poolPtr += 16);
    }
  }
});

// node_modules/uuid/dist/regex.js
var require_regex = __commonJS({
  "node_modules/uuid/dist/regex.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _default = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
    exports.default = _default;
  }
});

// node_modules/uuid/dist/validate.js
var require_validate = __commonJS({
  "node_modules/uuid/dist/validate.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _regex = _interopRequireDefault(require_regex());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function validate(uuid) {
      return typeof uuid === "string" && _regex.default.test(uuid);
    }
    var _default = validate;
    exports.default = _default;
  }
});

// node_modules/uuid/dist/stringify.js
var require_stringify = __commonJS({
  "node_modules/uuid/dist/stringify.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _validate = _interopRequireDefault(require_validate());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var byteToHex = [];
    for (let i = 0; i < 256; ++i) {
      byteToHex.push((i + 256).toString(16).substr(1));
    }
    function stringify(arr, offset = 0) {
      const uuid = (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + "-" + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + "-" + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + "-" + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + "-" + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
      if (!(0, _validate.default)(uuid)) {
        throw TypeError("Stringified UUID is invalid");
      }
      return uuid;
    }
    var _default = stringify;
    exports.default = _default;
  }
});

// node_modules/uuid/dist/v1.js
var require_v1 = __commonJS({
  "node_modules/uuid/dist/v1.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _rng = _interopRequireDefault(require_rng());
    var _stringify = _interopRequireDefault(require_stringify());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var _nodeId;
    var _clockseq;
    var _lastMSecs = 0;
    var _lastNSecs = 0;
    function v1(options, buf, offset) {
      let i = buf && offset || 0;
      const b = buf || new Array(16);
      options = options || {};
      let node = options.node || _nodeId;
      let clockseq = options.clockseq !== void 0 ? options.clockseq : _clockseq;
      if (node == null || clockseq == null) {
        const seedBytes = options.random || (options.rng || _rng.default)();
        if (node == null) {
          node = _nodeId = [seedBytes[0] | 1, seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]];
        }
        if (clockseq == null) {
          clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 16383;
        }
      }
      let msecs = options.msecs !== void 0 ? options.msecs : Date.now();
      let nsecs = options.nsecs !== void 0 ? options.nsecs : _lastNSecs + 1;
      const dt = msecs - _lastMSecs + (nsecs - _lastNSecs) / 1e4;
      if (dt < 0 && options.clockseq === void 0) {
        clockseq = clockseq + 1 & 16383;
      }
      if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === void 0) {
        nsecs = 0;
      }
      if (nsecs >= 1e4) {
        throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
      }
      _lastMSecs = msecs;
      _lastNSecs = nsecs;
      _clockseq = clockseq;
      msecs += 122192928e5;
      const tl = ((msecs & 268435455) * 1e4 + nsecs) % 4294967296;
      b[i++] = tl >>> 24 & 255;
      b[i++] = tl >>> 16 & 255;
      b[i++] = tl >>> 8 & 255;
      b[i++] = tl & 255;
      const tmh = msecs / 4294967296 * 1e4 & 268435455;
      b[i++] = tmh >>> 8 & 255;
      b[i++] = tmh & 255;
      b[i++] = tmh >>> 24 & 15 | 16;
      b[i++] = tmh >>> 16 & 255;
      b[i++] = clockseq >>> 8 | 128;
      b[i++] = clockseq & 255;
      for (let n = 0; n < 6; ++n) {
        b[i + n] = node[n];
      }
      return buf || (0, _stringify.default)(b);
    }
    var _default = v1;
    exports.default = _default;
  }
});

// node_modules/uuid/dist/parse.js
var require_parse = __commonJS({
  "node_modules/uuid/dist/parse.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _validate = _interopRequireDefault(require_validate());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function parse(uuid) {
      if (!(0, _validate.default)(uuid)) {
        throw TypeError("Invalid UUID");
      }
      let v;
      const arr = new Uint8Array(16);
      arr[0] = (v = parseInt(uuid.slice(0, 8), 16)) >>> 24;
      arr[1] = v >>> 16 & 255;
      arr[2] = v >>> 8 & 255;
      arr[3] = v & 255;
      arr[4] = (v = parseInt(uuid.slice(9, 13), 16)) >>> 8;
      arr[5] = v & 255;
      arr[6] = (v = parseInt(uuid.slice(14, 18), 16)) >>> 8;
      arr[7] = v & 255;
      arr[8] = (v = parseInt(uuid.slice(19, 23), 16)) >>> 8;
      arr[9] = v & 255;
      arr[10] = (v = parseInt(uuid.slice(24, 36), 16)) / 1099511627776 & 255;
      arr[11] = v / 4294967296 & 255;
      arr[12] = v >>> 24 & 255;
      arr[13] = v >>> 16 & 255;
      arr[14] = v >>> 8 & 255;
      arr[15] = v & 255;
      return arr;
    }
    var _default = parse;
    exports.default = _default;
  }
});

// node_modules/uuid/dist/v35.js
var require_v35 = __commonJS({
  "node_modules/uuid/dist/v35.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = _default;
    exports.URL = exports.DNS = void 0;
    var _stringify = _interopRequireDefault(require_stringify());
    var _parse = _interopRequireDefault(require_parse());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function stringToBytes(str) {
      str = unescape(encodeURIComponent(str));
      const bytes = [];
      for (let i = 0; i < str.length; ++i) {
        bytes.push(str.charCodeAt(i));
      }
      return bytes;
    }
    var DNS = "6ba7b810-9dad-11d1-80b4-00c04fd430c8";
    exports.DNS = DNS;
    var URL2 = "6ba7b811-9dad-11d1-80b4-00c04fd430c8";
    exports.URL = URL2;
    function _default(name, version, hashfunc) {
      function generateUUID(value, namespace, buf, offset) {
        if (typeof value === "string") {
          value = stringToBytes(value);
        }
        if (typeof namespace === "string") {
          namespace = (0, _parse.default)(namespace);
        }
        if (namespace.length !== 16) {
          throw TypeError("Namespace must be array-like (16 iterable integer values, 0-255)");
        }
        let bytes = new Uint8Array(16 + value.length);
        bytes.set(namespace);
        bytes.set(value, namespace.length);
        bytes = hashfunc(bytes);
        bytes[6] = bytes[6] & 15 | version;
        bytes[8] = bytes[8] & 63 | 128;
        if (buf) {
          offset = offset || 0;
          for (let i = 0; i < 16; ++i) {
            buf[offset + i] = bytes[i];
          }
          return buf;
        }
        return (0, _stringify.default)(bytes);
      }
      try {
        generateUUID.name = name;
      } catch (err) {
      }
      generateUUID.DNS = DNS;
      generateUUID.URL = URL2;
      return generateUUID;
    }
  }
});

// node_modules/uuid/dist/md5.js
var require_md5 = __commonJS({
  "node_modules/uuid/dist/md5.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _crypto = _interopRequireDefault(require("crypto"));
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function md5(bytes) {
      if (Array.isArray(bytes)) {
        bytes = Buffer.from(bytes);
      } else if (typeof bytes === "string") {
        bytes = Buffer.from(bytes, "utf8");
      }
      return _crypto.default.createHash("md5").update(bytes).digest();
    }
    var _default = md5;
    exports.default = _default;
  }
});

// node_modules/uuid/dist/v3.js
var require_v3 = __commonJS({
  "node_modules/uuid/dist/v3.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _v = _interopRequireDefault(require_v35());
    var _md = _interopRequireDefault(require_md5());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var v3 = (0, _v.default)("v3", 48, _md.default);
    var _default = v3;
    exports.default = _default;
  }
});

// node_modules/uuid/dist/v4.js
var require_v4 = __commonJS({
  "node_modules/uuid/dist/v4.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _rng = _interopRequireDefault(require_rng());
    var _stringify = _interopRequireDefault(require_stringify());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function v4(options, buf, offset) {
      options = options || {};
      const rnds = options.random || (options.rng || _rng.default)();
      rnds[6] = rnds[6] & 15 | 64;
      rnds[8] = rnds[8] & 63 | 128;
      if (buf) {
        offset = offset || 0;
        for (let i = 0; i < 16; ++i) {
          buf[offset + i] = rnds[i];
        }
        return buf;
      }
      return (0, _stringify.default)(rnds);
    }
    var _default = v4;
    exports.default = _default;
  }
});

// node_modules/uuid/dist/sha1.js
var require_sha1 = __commonJS({
  "node_modules/uuid/dist/sha1.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _crypto = _interopRequireDefault(require("crypto"));
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function sha1(bytes) {
      if (Array.isArray(bytes)) {
        bytes = Buffer.from(bytes);
      } else if (typeof bytes === "string") {
        bytes = Buffer.from(bytes, "utf8");
      }
      return _crypto.default.createHash("sha1").update(bytes).digest();
    }
    var _default = sha1;
    exports.default = _default;
  }
});

// node_modules/uuid/dist/v5.js
var require_v5 = __commonJS({
  "node_modules/uuid/dist/v5.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _v = _interopRequireDefault(require_v35());
    var _sha = _interopRequireDefault(require_sha1());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var v5 = (0, _v.default)("v5", 80, _sha.default);
    var _default = v5;
    exports.default = _default;
  }
});

// node_modules/uuid/dist/nil.js
var require_nil = __commonJS({
  "node_modules/uuid/dist/nil.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _default = "00000000-0000-0000-0000-000000000000";
    exports.default = _default;
  }
});

// node_modules/uuid/dist/version.js
var require_version = __commonJS({
  "node_modules/uuid/dist/version.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _validate = _interopRequireDefault(require_validate());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function version(uuid) {
      if (!(0, _validate.default)(uuid)) {
        throw TypeError("Invalid UUID");
      }
      return parseInt(uuid.substr(14, 1), 16);
    }
    var _default = version;
    exports.default = _default;
  }
});

// node_modules/uuid/dist/index.js
var require_dist = __commonJS({
  "node_modules/uuid/dist/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    Object.defineProperty(exports, "v1", {
      enumerable: true,
      get: function() {
        return _v.default;
      }
    });
    Object.defineProperty(exports, "v3", {
      enumerable: true,
      get: function() {
        return _v2.default;
      }
    });
    Object.defineProperty(exports, "v4", {
      enumerable: true,
      get: function() {
        return _v3.default;
      }
    });
    Object.defineProperty(exports, "v5", {
      enumerable: true,
      get: function() {
        return _v4.default;
      }
    });
    Object.defineProperty(exports, "NIL", {
      enumerable: true,
      get: function() {
        return _nil.default;
      }
    });
    Object.defineProperty(exports, "version", {
      enumerable: true,
      get: function() {
        return _version.default;
      }
    });
    Object.defineProperty(exports, "validate", {
      enumerable: true,
      get: function() {
        return _validate.default;
      }
    });
    Object.defineProperty(exports, "stringify", {
      enumerable: true,
      get: function() {
        return _stringify.default;
      }
    });
    Object.defineProperty(exports, "parse", {
      enumerable: true,
      get: function() {
        return _parse.default;
      }
    });
    var _v = _interopRequireDefault(require_v1());
    var _v2 = _interopRequireDefault(require_v3());
    var _v3 = _interopRequireDefault(require_v4());
    var _v4 = _interopRequireDefault(require_v5());
    var _nil = _interopRequireDefault(require_nil());
    var _version = _interopRequireDefault(require_version());
    var _validate = _interopRequireDefault(require_validate());
    var _stringify = _interopRequireDefault(require_stringify());
    var _parse = _interopRequireDefault(require_parse());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
  }
});

// node_modules/@actions/http-client/lib/proxy.js
var require_proxy = __commonJS({
  "node_modules/@actions/http-client/lib/proxy.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.checkBypass = exports.getProxyUrl = void 0;
    function getProxyUrl(reqUrl) {
      const usingSsl = reqUrl.protocol === "https:";
      if (checkBypass(reqUrl)) {
        return void 0;
      }
      const proxyVar = (() => {
        if (usingSsl) {
          return process.env["https_proxy"] || process.env["HTTPS_PROXY"];
        } else {
          return process.env["http_proxy"] || process.env["HTTP_PROXY"];
        }
      })();
      if (proxyVar) {
        return new URL(proxyVar);
      } else {
        return void 0;
      }
    }
    exports.getProxyUrl = getProxyUrl;
    function checkBypass(reqUrl) {
      if (!reqUrl.hostname) {
        return false;
      }
      const noProxy = process.env["no_proxy"] || process.env["NO_PROXY"] || "";
      if (!noProxy) {
        return false;
      }
      let reqPort;
      if (reqUrl.port) {
        reqPort = Number(reqUrl.port);
      } else if (reqUrl.protocol === "http:") {
        reqPort = 80;
      } else if (reqUrl.protocol === "https:") {
        reqPort = 443;
      }
      const upperReqHosts = [reqUrl.hostname.toUpperCase()];
      if (typeof reqPort === "number") {
        upperReqHosts.push(`${upperReqHosts[0]}:${reqPort}`);
      }
      for (const upperNoProxyItem of noProxy.split(",").map((x) => x.trim().toUpperCase()).filter((x) => x)) {
        if (upperReqHosts.some((x) => x === upperNoProxyItem)) {
          return true;
        }
      }
      return false;
    }
    exports.checkBypass = checkBypass;
  }
});

// node_modules/tunnel/lib/tunnel.js
var require_tunnel = __commonJS({
  "node_modules/tunnel/lib/tunnel.js"(exports) {
    "use strict";
    var net = require("net");
    var tls = require("tls");
    var http = require("http");
    var https = require("https");
    var events = require("events");
    var assert = require("assert");
    var util = require("util");
    exports.httpOverHttp = httpOverHttp;
    exports.httpsOverHttp = httpsOverHttp;
    exports.httpOverHttps = httpOverHttps;
    exports.httpsOverHttps = httpsOverHttps;
    function httpOverHttp(options) {
      var agent = new TunnelingAgent(options);
      agent.request = http.request;
      return agent;
    }
    function httpsOverHttp(options) {
      var agent = new TunnelingAgent(options);
      agent.request = http.request;
      agent.createSocket = createSecureSocket;
      agent.defaultPort = 443;
      return agent;
    }
    function httpOverHttps(options) {
      var agent = new TunnelingAgent(options);
      agent.request = https.request;
      return agent;
    }
    function httpsOverHttps(options) {
      var agent = new TunnelingAgent(options);
      agent.request = https.request;
      agent.createSocket = createSecureSocket;
      agent.defaultPort = 443;
      return agent;
    }
    function TunnelingAgent(options) {
      var self = this;
      self.options = options || {};
      self.proxyOptions = self.options.proxy || {};
      self.maxSockets = self.options.maxSockets || http.Agent.defaultMaxSockets;
      self.requests = [];
      self.sockets = [];
      self.on("free", function onFree(socket, host, port, localAddress) {
        var options2 = toOptions(host, port, localAddress);
        for (var i = 0, len = self.requests.length; i < len; ++i) {
          var pending = self.requests[i];
          if (pending.host === options2.host && pending.port === options2.port) {
            self.requests.splice(i, 1);
            pending.request.onSocket(socket);
            return;
          }
        }
        socket.destroy();
        self.removeSocket(socket);
      });
    }
    util.inherits(TunnelingAgent, events.EventEmitter);
    TunnelingAgent.prototype.addRequest = function addRequest(req, host, port, localAddress) {
      var self = this;
      var options = mergeOptions({ request: req }, self.options, toOptions(host, port, localAddress));
      if (self.sockets.length >= this.maxSockets) {
        self.requests.push(options);
        return;
      }
      self.createSocket(options, function(socket) {
        socket.on("free", onFree);
        socket.on("close", onCloseOrRemove);
        socket.on("agentRemove", onCloseOrRemove);
        req.onSocket(socket);
        function onFree() {
          self.emit("free", socket, options);
        }
        function onCloseOrRemove(err) {
          self.removeSocket(socket);
          socket.removeListener("free", onFree);
          socket.removeListener("close", onCloseOrRemove);
          socket.removeListener("agentRemove", onCloseOrRemove);
        }
      });
    };
    TunnelingAgent.prototype.createSocket = function createSocket(options, cb) {
      var self = this;
      var placeholder = {};
      self.sockets.push(placeholder);
      var connectOptions = mergeOptions({}, self.proxyOptions, {
        method: "CONNECT",
        path: options.host + ":" + options.port,
        agent: false,
        headers: {
          host: options.host + ":" + options.port
        }
      });
      if (options.localAddress) {
        connectOptions.localAddress = options.localAddress;
      }
      if (connectOptions.proxyAuth) {
        connectOptions.headers = connectOptions.headers || {};
        connectOptions.headers["Proxy-Authorization"] = "Basic " + new Buffer(connectOptions.proxyAuth).toString("base64");
      }
      debug2("making CONNECT request");
      var connectReq = self.request(connectOptions);
      connectReq.useChunkedEncodingByDefault = false;
      connectReq.once("response", onResponse);
      connectReq.once("upgrade", onUpgrade);
      connectReq.once("connect", onConnect);
      connectReq.once("error", onError);
      connectReq.end();
      function onResponse(res) {
        res.upgrade = true;
      }
      function onUpgrade(res, socket, head) {
        process.nextTick(function() {
          onConnect(res, socket, head);
        });
      }
      function onConnect(res, socket, head) {
        connectReq.removeAllListeners();
        socket.removeAllListeners();
        if (res.statusCode !== 200) {
          debug2(
            "tunneling socket could not be established, statusCode=%d",
            res.statusCode
          );
          socket.destroy();
          var error2 = new Error("tunneling socket could not be established, statusCode=" + res.statusCode);
          error2.code = "ECONNRESET";
          options.request.emit("error", error2);
          self.removeSocket(placeholder);
          return;
        }
        if (head.length > 0) {
          debug2("got illegal response body from proxy");
          socket.destroy();
          var error2 = new Error("got illegal response body from proxy");
          error2.code = "ECONNRESET";
          options.request.emit("error", error2);
          self.removeSocket(placeholder);
          return;
        }
        debug2("tunneling connection has established");
        self.sockets[self.sockets.indexOf(placeholder)] = socket;
        return cb(socket);
      }
      function onError(cause) {
        connectReq.removeAllListeners();
        debug2(
          "tunneling socket could not be established, cause=%s\n",
          cause.message,
          cause.stack
        );
        var error2 = new Error("tunneling socket could not be established, cause=" + cause.message);
        error2.code = "ECONNRESET";
        options.request.emit("error", error2);
        self.removeSocket(placeholder);
      }
    };
    TunnelingAgent.prototype.removeSocket = function removeSocket(socket) {
      var pos = this.sockets.indexOf(socket);
      if (pos === -1) {
        return;
      }
      this.sockets.splice(pos, 1);
      var pending = this.requests.shift();
      if (pending) {
        this.createSocket(pending, function(socket2) {
          pending.request.onSocket(socket2);
        });
      }
    };
    function createSecureSocket(options, cb) {
      var self = this;
      TunnelingAgent.prototype.createSocket.call(self, options, function(socket) {
        var hostHeader = options.request.getHeader("host");
        var tlsOptions = mergeOptions({}, self.options, {
          socket,
          servername: hostHeader ? hostHeader.replace(/:.*$/, "") : options.host
        });
        var secureSocket = tls.connect(0, tlsOptions);
        self.sockets[self.sockets.indexOf(socket)] = secureSocket;
        cb(secureSocket);
      });
    }
    function toOptions(host, port, localAddress) {
      if (typeof host === "string") {
        return {
          host,
          port,
          localAddress
        };
      }
      return host;
    }
    function mergeOptions(target) {
      for (var i = 1, len = arguments.length; i < len; ++i) {
        var overrides = arguments[i];
        if (typeof overrides === "object") {
          var keys = Object.keys(overrides);
          for (var j = 0, keyLen = keys.length; j < keyLen; ++j) {
            var k = keys[j];
            if (overrides[k] !== void 0) {
              target[k] = overrides[k];
            }
          }
        }
      }
      return target;
    }
    var debug2;
    if (process.env.NODE_DEBUG && /\btunnel\b/.test(process.env.NODE_DEBUG)) {
      debug2 = function() {
        var args = Array.prototype.slice.call(arguments);
        if (typeof args[0] === "string") {
          args[0] = "TUNNEL: " + args[0];
        } else {
          args.unshift("TUNNEL:");
        }
        console.error.apply(console, args);
      };
    } else {
      debug2 = function() {
      };
    }
    exports.debug = debug2;
  }
});

// node_modules/tunnel/index.js
var require_tunnel2 = __commonJS({
  "node_modules/tunnel/index.js"(exports, module2) {
    module2.exports = require_tunnel();
  }
});

// node_modules/@actions/http-client/lib/index.js
var require_lib = __commonJS({
  "node_modules/@actions/http-client/lib/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule)
        return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (k !== "default" && Object.hasOwnProperty.call(mod, k))
            __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.HttpClient = exports.isHttps = exports.HttpClientResponse = exports.HttpClientError = exports.getProxyUrl = exports.MediaTypes = exports.Headers = exports.HttpCodes = void 0;
    var http = __importStar(require("http"));
    var https = __importStar(require("https"));
    var pm = __importStar(require_proxy());
    var tunnel = __importStar(require_tunnel2());
    var HttpCodes;
    (function(HttpCodes2) {
      HttpCodes2[HttpCodes2["OK"] = 200] = "OK";
      HttpCodes2[HttpCodes2["MultipleChoices"] = 300] = "MultipleChoices";
      HttpCodes2[HttpCodes2["MovedPermanently"] = 301] = "MovedPermanently";
      HttpCodes2[HttpCodes2["ResourceMoved"] = 302] = "ResourceMoved";
      HttpCodes2[HttpCodes2["SeeOther"] = 303] = "SeeOther";
      HttpCodes2[HttpCodes2["NotModified"] = 304] = "NotModified";
      HttpCodes2[HttpCodes2["UseProxy"] = 305] = "UseProxy";
      HttpCodes2[HttpCodes2["SwitchProxy"] = 306] = "SwitchProxy";
      HttpCodes2[HttpCodes2["TemporaryRedirect"] = 307] = "TemporaryRedirect";
      HttpCodes2[HttpCodes2["PermanentRedirect"] = 308] = "PermanentRedirect";
      HttpCodes2[HttpCodes2["BadRequest"] = 400] = "BadRequest";
      HttpCodes2[HttpCodes2["Unauthorized"] = 401] = "Unauthorized";
      HttpCodes2[HttpCodes2["PaymentRequired"] = 402] = "PaymentRequired";
      HttpCodes2[HttpCodes2["Forbidden"] = 403] = "Forbidden";
      HttpCodes2[HttpCodes2["NotFound"] = 404] = "NotFound";
      HttpCodes2[HttpCodes2["MethodNotAllowed"] = 405] = "MethodNotAllowed";
      HttpCodes2[HttpCodes2["NotAcceptable"] = 406] = "NotAcceptable";
      HttpCodes2[HttpCodes2["ProxyAuthenticationRequired"] = 407] = "ProxyAuthenticationRequired";
      HttpCodes2[HttpCodes2["RequestTimeout"] = 408] = "RequestTimeout";
      HttpCodes2[HttpCodes2["Conflict"] = 409] = "Conflict";
      HttpCodes2[HttpCodes2["Gone"] = 410] = "Gone";
      HttpCodes2[HttpCodes2["TooManyRequests"] = 429] = "TooManyRequests";
      HttpCodes2[HttpCodes2["InternalServerError"] = 500] = "InternalServerError";
      HttpCodes2[HttpCodes2["NotImplemented"] = 501] = "NotImplemented";
      HttpCodes2[HttpCodes2["BadGateway"] = 502] = "BadGateway";
      HttpCodes2[HttpCodes2["ServiceUnavailable"] = 503] = "ServiceUnavailable";
      HttpCodes2[HttpCodes2["GatewayTimeout"] = 504] = "GatewayTimeout";
    })(HttpCodes = exports.HttpCodes || (exports.HttpCodes = {}));
    var Headers;
    (function(Headers2) {
      Headers2["Accept"] = "accept";
      Headers2["ContentType"] = "content-type";
    })(Headers = exports.Headers || (exports.Headers = {}));
    var MediaTypes;
    (function(MediaTypes2) {
      MediaTypes2["ApplicationJson"] = "application/json";
    })(MediaTypes = exports.MediaTypes || (exports.MediaTypes = {}));
    function getProxyUrl(serverUrl) {
      const proxyUrl = pm.getProxyUrl(new URL(serverUrl));
      return proxyUrl ? proxyUrl.href : "";
    }
    exports.getProxyUrl = getProxyUrl;
    var HttpRedirectCodes = [
      HttpCodes.MovedPermanently,
      HttpCodes.ResourceMoved,
      HttpCodes.SeeOther,
      HttpCodes.TemporaryRedirect,
      HttpCodes.PermanentRedirect
    ];
    var HttpResponseRetryCodes = [
      HttpCodes.BadGateway,
      HttpCodes.ServiceUnavailable,
      HttpCodes.GatewayTimeout
    ];
    var RetryableHttpVerbs = ["OPTIONS", "GET", "DELETE", "HEAD"];
    var ExponentialBackoffCeiling = 10;
    var ExponentialBackoffTimeSlice = 5;
    var HttpClientError = class extends Error {
      constructor(message, statusCode) {
        super(message);
        this.name = "HttpClientError";
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, HttpClientError.prototype);
      }
    };
    exports.HttpClientError = HttpClientError;
    var HttpClientResponse = class {
      constructor(message) {
        this.message = message;
      }
      readBody() {
        return __awaiter(this, void 0, void 0, function* () {
          return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            let output = Buffer.alloc(0);
            this.message.on("data", (chunk) => {
              output = Buffer.concat([output, chunk]);
            });
            this.message.on("end", () => {
              resolve(output.toString());
            });
          }));
        });
      }
    };
    exports.HttpClientResponse = HttpClientResponse;
    function isHttps(requestUrl) {
      const parsedUrl = new URL(requestUrl);
      return parsedUrl.protocol === "https:";
    }
    exports.isHttps = isHttps;
    var HttpClient = class {
      constructor(userAgent, handlers, requestOptions) {
        this._ignoreSslError = false;
        this._allowRedirects = true;
        this._allowRedirectDowngrade = false;
        this._maxRedirects = 50;
        this._allowRetries = false;
        this._maxRetries = 1;
        this._keepAlive = false;
        this._disposed = false;
        this.userAgent = userAgent;
        this.handlers = handlers || [];
        this.requestOptions = requestOptions;
        if (requestOptions) {
          if (requestOptions.ignoreSslError != null) {
            this._ignoreSslError = requestOptions.ignoreSslError;
          }
          this._socketTimeout = requestOptions.socketTimeout;
          if (requestOptions.allowRedirects != null) {
            this._allowRedirects = requestOptions.allowRedirects;
          }
          if (requestOptions.allowRedirectDowngrade != null) {
            this._allowRedirectDowngrade = requestOptions.allowRedirectDowngrade;
          }
          if (requestOptions.maxRedirects != null) {
            this._maxRedirects = Math.max(requestOptions.maxRedirects, 0);
          }
          if (requestOptions.keepAlive != null) {
            this._keepAlive = requestOptions.keepAlive;
          }
          if (requestOptions.allowRetries != null) {
            this._allowRetries = requestOptions.allowRetries;
          }
          if (requestOptions.maxRetries != null) {
            this._maxRetries = requestOptions.maxRetries;
          }
        }
      }
      options(requestUrl, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
          return this.request("OPTIONS", requestUrl, null, additionalHeaders || {});
        });
      }
      get(requestUrl, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
          return this.request("GET", requestUrl, null, additionalHeaders || {});
        });
      }
      del(requestUrl, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
          return this.request("DELETE", requestUrl, null, additionalHeaders || {});
        });
      }
      post(requestUrl, data, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
          return this.request("POST", requestUrl, data, additionalHeaders || {});
        });
      }
      patch(requestUrl, data, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
          return this.request("PATCH", requestUrl, data, additionalHeaders || {});
        });
      }
      put(requestUrl, data, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
          return this.request("PUT", requestUrl, data, additionalHeaders || {});
        });
      }
      head(requestUrl, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
          return this.request("HEAD", requestUrl, null, additionalHeaders || {});
        });
      }
      sendStream(verb, requestUrl, stream, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
          return this.request(verb, requestUrl, stream, additionalHeaders);
        });
      }
      getJson(requestUrl, additionalHeaders = {}) {
        return __awaiter(this, void 0, void 0, function* () {
          additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
          const res = yield this.get(requestUrl, additionalHeaders);
          return this._processResponse(res, this.requestOptions);
        });
      }
      postJson(requestUrl, obj, additionalHeaders = {}) {
        return __awaiter(this, void 0, void 0, function* () {
          const data = JSON.stringify(obj, null, 2);
          additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
          additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.ContentType, MediaTypes.ApplicationJson);
          const res = yield this.post(requestUrl, data, additionalHeaders);
          return this._processResponse(res, this.requestOptions);
        });
      }
      putJson(requestUrl, obj, additionalHeaders = {}) {
        return __awaiter(this, void 0, void 0, function* () {
          const data = JSON.stringify(obj, null, 2);
          additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
          additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.ContentType, MediaTypes.ApplicationJson);
          const res = yield this.put(requestUrl, data, additionalHeaders);
          return this._processResponse(res, this.requestOptions);
        });
      }
      patchJson(requestUrl, obj, additionalHeaders = {}) {
        return __awaiter(this, void 0, void 0, function* () {
          const data = JSON.stringify(obj, null, 2);
          additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
          additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.ContentType, MediaTypes.ApplicationJson);
          const res = yield this.patch(requestUrl, data, additionalHeaders);
          return this._processResponse(res, this.requestOptions);
        });
      }
      request(verb, requestUrl, data, headers) {
        return __awaiter(this, void 0, void 0, function* () {
          if (this._disposed) {
            throw new Error("Client has already been disposed.");
          }
          const parsedUrl = new URL(requestUrl);
          let info2 = this._prepareRequest(verb, parsedUrl, headers);
          const maxTries = this._allowRetries && RetryableHttpVerbs.includes(verb) ? this._maxRetries + 1 : 1;
          let numTries = 0;
          let response;
          do {
            response = yield this.requestRaw(info2, data);
            if (response && response.message && response.message.statusCode === HttpCodes.Unauthorized) {
              let authenticationHandler;
              for (const handler of this.handlers) {
                if (handler.canHandleAuthentication(response)) {
                  authenticationHandler = handler;
                  break;
                }
              }
              if (authenticationHandler) {
                return authenticationHandler.handleAuthentication(this, info2, data);
              } else {
                return response;
              }
            }
            let redirectsRemaining = this._maxRedirects;
            while (response.message.statusCode && HttpRedirectCodes.includes(response.message.statusCode) && this._allowRedirects && redirectsRemaining > 0) {
              const redirectUrl = response.message.headers["location"];
              if (!redirectUrl) {
                break;
              }
              const parsedRedirectUrl = new URL(redirectUrl);
              if (parsedUrl.protocol === "https:" && parsedUrl.protocol !== parsedRedirectUrl.protocol && !this._allowRedirectDowngrade) {
                throw new Error("Redirect from HTTPS to HTTP protocol. This downgrade is not allowed for security reasons. If you want to allow this behavior, set the allowRedirectDowngrade option to true.");
              }
              yield response.readBody();
              if (parsedRedirectUrl.hostname !== parsedUrl.hostname) {
                for (const header in headers) {
                  if (header.toLowerCase() === "authorization") {
                    delete headers[header];
                  }
                }
              }
              info2 = this._prepareRequest(verb, parsedRedirectUrl, headers);
              response = yield this.requestRaw(info2, data);
              redirectsRemaining--;
            }
            if (!response.message.statusCode || !HttpResponseRetryCodes.includes(response.message.statusCode)) {
              return response;
            }
            numTries += 1;
            if (numTries < maxTries) {
              yield response.readBody();
              yield this._performExponentialBackoff(numTries);
            }
          } while (numTries < maxTries);
          return response;
        });
      }
      dispose() {
        if (this._agent) {
          this._agent.destroy();
        }
        this._disposed = true;
      }
      requestRaw(info2, data) {
        return __awaiter(this, void 0, void 0, function* () {
          return new Promise((resolve, reject) => {
            function callbackForResult(err, res) {
              if (err) {
                reject(err);
              } else if (!res) {
                reject(new Error("Unknown error"));
              } else {
                resolve(res);
              }
            }
            this.requestRawWithCallback(info2, data, callbackForResult);
          });
        });
      }
      requestRawWithCallback(info2, data, onResult) {
        if (typeof data === "string") {
          if (!info2.options.headers) {
            info2.options.headers = {};
          }
          info2.options.headers["Content-Length"] = Buffer.byteLength(data, "utf8");
        }
        let callbackCalled = false;
        function handleResult(err, res) {
          if (!callbackCalled) {
            callbackCalled = true;
            onResult(err, res);
          }
        }
        const req = info2.httpModule.request(info2.options, (msg) => {
          const res = new HttpClientResponse(msg);
          handleResult(void 0, res);
        });
        let socket;
        req.on("socket", (sock) => {
          socket = sock;
        });
        req.setTimeout(this._socketTimeout || 3 * 6e4, () => {
          if (socket) {
            socket.end();
          }
          handleResult(new Error(`Request timeout: ${info2.options.path}`));
        });
        req.on("error", function(err) {
          handleResult(err);
        });
        if (data && typeof data === "string") {
          req.write(data, "utf8");
        }
        if (data && typeof data !== "string") {
          data.on("close", function() {
            req.end();
          });
          data.pipe(req);
        } else {
          req.end();
        }
      }
      getAgent(serverUrl) {
        const parsedUrl = new URL(serverUrl);
        return this._getAgent(parsedUrl);
      }
      _prepareRequest(method, requestUrl, headers) {
        const info2 = {};
        info2.parsedUrl = requestUrl;
        const usingSsl = info2.parsedUrl.protocol === "https:";
        info2.httpModule = usingSsl ? https : http;
        const defaultPort = usingSsl ? 443 : 80;
        info2.options = {};
        info2.options.host = info2.parsedUrl.hostname;
        info2.options.port = info2.parsedUrl.port ? parseInt(info2.parsedUrl.port) : defaultPort;
        info2.options.path = (info2.parsedUrl.pathname || "") + (info2.parsedUrl.search || "");
        info2.options.method = method;
        info2.options.headers = this._mergeHeaders(headers);
        if (this.userAgent != null) {
          info2.options.headers["user-agent"] = this.userAgent;
        }
        info2.options.agent = this._getAgent(info2.parsedUrl);
        if (this.handlers) {
          for (const handler of this.handlers) {
            handler.prepareRequest(info2.options);
          }
        }
        return info2;
      }
      _mergeHeaders(headers) {
        if (this.requestOptions && this.requestOptions.headers) {
          return Object.assign({}, lowercaseKeys(this.requestOptions.headers), lowercaseKeys(headers || {}));
        }
        return lowercaseKeys(headers || {});
      }
      _getExistingOrDefaultHeader(additionalHeaders, header, _default) {
        let clientHeader;
        if (this.requestOptions && this.requestOptions.headers) {
          clientHeader = lowercaseKeys(this.requestOptions.headers)[header];
        }
        return additionalHeaders[header] || clientHeader || _default;
      }
      _getAgent(parsedUrl) {
        let agent;
        const proxyUrl = pm.getProxyUrl(parsedUrl);
        const useProxy = proxyUrl && proxyUrl.hostname;
        if (this._keepAlive && useProxy) {
          agent = this._proxyAgent;
        }
        if (this._keepAlive && !useProxy) {
          agent = this._agent;
        }
        if (agent) {
          return agent;
        }
        const usingSsl = parsedUrl.protocol === "https:";
        let maxSockets = 100;
        if (this.requestOptions) {
          maxSockets = this.requestOptions.maxSockets || http.globalAgent.maxSockets;
        }
        if (proxyUrl && proxyUrl.hostname) {
          const agentOptions = {
            maxSockets,
            keepAlive: this._keepAlive,
            proxy: Object.assign(Object.assign({}, (proxyUrl.username || proxyUrl.password) && {
              proxyAuth: `${proxyUrl.username}:${proxyUrl.password}`
            }), { host: proxyUrl.hostname, port: proxyUrl.port })
          };
          let tunnelAgent;
          const overHttps = proxyUrl.protocol === "https:";
          if (usingSsl) {
            tunnelAgent = overHttps ? tunnel.httpsOverHttps : tunnel.httpsOverHttp;
          } else {
            tunnelAgent = overHttps ? tunnel.httpOverHttps : tunnel.httpOverHttp;
          }
          agent = tunnelAgent(agentOptions);
          this._proxyAgent = agent;
        }
        if (this._keepAlive && !agent) {
          const options = { keepAlive: this._keepAlive, maxSockets };
          agent = usingSsl ? new https.Agent(options) : new http.Agent(options);
          this._agent = agent;
        }
        if (!agent) {
          agent = usingSsl ? https.globalAgent : http.globalAgent;
        }
        if (usingSsl && this._ignoreSslError) {
          agent.options = Object.assign(agent.options || {}, {
            rejectUnauthorized: false
          });
        }
        return agent;
      }
      _performExponentialBackoff(retryNumber) {
        return __awaiter(this, void 0, void 0, function* () {
          retryNumber = Math.min(ExponentialBackoffCeiling, retryNumber);
          const ms = ExponentialBackoffTimeSlice * Math.pow(2, retryNumber);
          return new Promise((resolve) => setTimeout(() => resolve(), ms));
        });
      }
      _processResponse(res, options) {
        return __awaiter(this, void 0, void 0, function* () {
          return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            const statusCode = res.message.statusCode || 0;
            const response = {
              statusCode,
              result: null,
              headers: {}
            };
            if (statusCode === HttpCodes.NotFound) {
              resolve(response);
            }
            function dateTimeDeserializer(key, value) {
              if (typeof value === "string") {
                const a = new Date(value);
                if (!isNaN(a.valueOf())) {
                  return a;
                }
              }
              return value;
            }
            let obj;
            let contents;
            try {
              contents = yield res.readBody();
              if (contents && contents.length > 0) {
                if (options && options.deserializeDates) {
                  obj = JSON.parse(contents, dateTimeDeserializer);
                } else {
                  obj = JSON.parse(contents);
                }
                response.result = obj;
              }
              response.headers = res.message.headers;
            } catch (err) {
            }
            if (statusCode > 299) {
              let msg;
              if (obj && obj.message) {
                msg = obj.message;
              } else if (contents && contents.length > 0) {
                msg = contents;
              } else {
                msg = `Failed request: (${statusCode})`;
              }
              const err = new HttpClientError(msg, statusCode);
              err.result = response.result;
              reject(err);
            } else {
              resolve(response);
            }
          }));
        });
      }
    };
    exports.HttpClient = HttpClient;
    var lowercaseKeys = (obj) => Object.keys(obj).reduce((c, k) => (c[k.toLowerCase()] = obj[k], c), {});
  }
});

// node_modules/@actions/http-client/lib/auth.js
var require_auth = __commonJS({
  "node_modules/@actions/http-client/lib/auth.js"(exports) {
    "use strict";
    var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PersonalAccessTokenCredentialHandler = exports.BearerCredentialHandler = exports.BasicCredentialHandler = void 0;
    var BasicCredentialHandler = class {
      constructor(username, password) {
        this.username = username;
        this.password = password;
      }
      prepareRequest(options) {
        if (!options.headers) {
          throw Error("The request has no headers");
        }
        options.headers["Authorization"] = `Basic ${Buffer.from(`${this.username}:${this.password}`).toString("base64")}`;
      }
      canHandleAuthentication() {
        return false;
      }
      handleAuthentication() {
        return __awaiter(this, void 0, void 0, function* () {
          throw new Error("not implemented");
        });
      }
    };
    exports.BasicCredentialHandler = BasicCredentialHandler;
    var BearerCredentialHandler = class {
      constructor(token) {
        this.token = token;
      }
      prepareRequest(options) {
        if (!options.headers) {
          throw Error("The request has no headers");
        }
        options.headers["Authorization"] = `Bearer ${this.token}`;
      }
      canHandleAuthentication() {
        return false;
      }
      handleAuthentication() {
        return __awaiter(this, void 0, void 0, function* () {
          throw new Error("not implemented");
        });
      }
    };
    exports.BearerCredentialHandler = BearerCredentialHandler;
    var PersonalAccessTokenCredentialHandler = class {
      constructor(token) {
        this.token = token;
      }
      prepareRequest(options) {
        if (!options.headers) {
          throw Error("The request has no headers");
        }
        options.headers["Authorization"] = `Basic ${Buffer.from(`PAT:${this.token}`).toString("base64")}`;
      }
      canHandleAuthentication() {
        return false;
      }
      handleAuthentication() {
        return __awaiter(this, void 0, void 0, function* () {
          throw new Error("not implemented");
        });
      }
    };
    exports.PersonalAccessTokenCredentialHandler = PersonalAccessTokenCredentialHandler;
  }
});

// node_modules/@actions/core/lib/oidc-utils.js
var require_oidc_utils = __commonJS({
  "node_modules/@actions/core/lib/oidc-utils.js"(exports) {
    "use strict";
    var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.OidcClient = void 0;
    var http_client_1 = require_lib();
    var auth_1 = require_auth();
    var core_1 = require_core();
    var OidcClient = class {
      static createHttpClient(allowRetry = true, maxRetry = 10) {
        const requestOptions = {
          allowRetries: allowRetry,
          maxRetries: maxRetry
        };
        return new http_client_1.HttpClient("actions/oidc-client", [new auth_1.BearerCredentialHandler(OidcClient.getRequestToken())], requestOptions);
      }
      static getRequestToken() {
        const token = process.env["ACTIONS_ID_TOKEN_REQUEST_TOKEN"];
        if (!token) {
          throw new Error("Unable to get ACTIONS_ID_TOKEN_REQUEST_TOKEN env variable");
        }
        return token;
      }
      static getIDTokenUrl() {
        const runtimeUrl = process.env["ACTIONS_ID_TOKEN_REQUEST_URL"];
        if (!runtimeUrl) {
          throw new Error("Unable to get ACTIONS_ID_TOKEN_REQUEST_URL env variable");
        }
        return runtimeUrl;
      }
      static getCall(id_token_url) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
          const httpclient = OidcClient.createHttpClient();
          const res = yield httpclient.getJson(id_token_url).catch((error2) => {
            throw new Error(`Failed to get ID Token. 
 
        Error Code : ${error2.statusCode}
 
        Error Message: ${error2.result.message}`);
          });
          const id_token = (_a = res.result) === null || _a === void 0 ? void 0 : _a.value;
          if (!id_token) {
            throw new Error("Response json body do not have ID Token field");
          }
          return id_token;
        });
      }
      static getIDToken(audience) {
        return __awaiter(this, void 0, void 0, function* () {
          try {
            let id_token_url = OidcClient.getIDTokenUrl();
            if (audience) {
              const encodedAudience = encodeURIComponent(audience);
              id_token_url = `${id_token_url}&audience=${encodedAudience}`;
            }
            core_1.debug(`ID token url is ${id_token_url}`);
            const id_token = yield OidcClient.getCall(id_token_url);
            core_1.setSecret(id_token);
            return id_token;
          } catch (error2) {
            throw new Error(`Error message: ${error2.message}`);
          }
        });
      }
    };
    exports.OidcClient = OidcClient;
  }
});

// node_modules/@actions/core/lib/summary.js
var require_summary = __commonJS({
  "node_modules/@actions/core/lib/summary.js"(exports) {
    "use strict";
    var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.summary = exports.markdownSummary = exports.SUMMARY_DOCS_URL = exports.SUMMARY_ENV_VAR = void 0;
    var os_1 = require("os");
    var fs_1 = require("fs");
    var { access, appendFile, writeFile } = fs_1.promises;
    exports.SUMMARY_ENV_VAR = "GITHUB_STEP_SUMMARY";
    exports.SUMMARY_DOCS_URL = "https://docs.github.com/actions/using-workflows/workflow-commands-for-github-actions#adding-a-job-summary";
    var Summary = class {
      constructor() {
        this._buffer = "";
      }
      filePath() {
        return __awaiter(this, void 0, void 0, function* () {
          if (this._filePath) {
            return this._filePath;
          }
          const pathFromEnv = process.env[exports.SUMMARY_ENV_VAR];
          if (!pathFromEnv) {
            throw new Error(`Unable to find environment variable for $${exports.SUMMARY_ENV_VAR}. Check if your runtime environment supports job summaries.`);
          }
          try {
            yield access(pathFromEnv, fs_1.constants.R_OK | fs_1.constants.W_OK);
          } catch (_a) {
            throw new Error(`Unable to access summary file: '${pathFromEnv}'. Check if the file has correct read/write permissions.`);
          }
          this._filePath = pathFromEnv;
          return this._filePath;
        });
      }
      wrap(tag, content, attrs = {}) {
        const htmlAttrs = Object.entries(attrs).map(([key, value]) => ` ${key}="${value}"`).join("");
        if (!content) {
          return `<${tag}${htmlAttrs}>`;
        }
        return `<${tag}${htmlAttrs}>${content}</${tag}>`;
      }
      write(options) {
        return __awaiter(this, void 0, void 0, function* () {
          const overwrite = !!(options === null || options === void 0 ? void 0 : options.overwrite);
          const filePath = yield this.filePath();
          const writeFunc = overwrite ? writeFile : appendFile;
          yield writeFunc(filePath, this._buffer, { encoding: "utf8" });
          return this.emptyBuffer();
        });
      }
      clear() {
        return __awaiter(this, void 0, void 0, function* () {
          return this.emptyBuffer().write({ overwrite: true });
        });
      }
      stringify() {
        return this._buffer;
      }
      isEmptyBuffer() {
        return this._buffer.length === 0;
      }
      emptyBuffer() {
        this._buffer = "";
        return this;
      }
      addRaw(text, addEOL = false) {
        this._buffer += text;
        return addEOL ? this.addEOL() : this;
      }
      addEOL() {
        return this.addRaw(os_1.EOL);
      }
      addCodeBlock(code, lang) {
        const attrs = Object.assign({}, lang && { lang });
        const element = this.wrap("pre", this.wrap("code", code), attrs);
        return this.addRaw(element).addEOL();
      }
      addList(items, ordered = false) {
        const tag = ordered ? "ol" : "ul";
        const listItems = items.map((item) => this.wrap("li", item)).join("");
        const element = this.wrap(tag, listItems);
        return this.addRaw(element).addEOL();
      }
      addTable(rows) {
        const tableBody = rows.map((row) => {
          const cells = row.map((cell) => {
            if (typeof cell === "string") {
              return this.wrap("td", cell);
            }
            const { header, data, colspan, rowspan } = cell;
            const tag = header ? "th" : "td";
            const attrs = Object.assign(Object.assign({}, colspan && { colspan }), rowspan && { rowspan });
            return this.wrap(tag, data, attrs);
          }).join("");
          return this.wrap("tr", cells);
        }).join("");
        const element = this.wrap("table", tableBody);
        return this.addRaw(element).addEOL();
      }
      addDetails(label, content) {
        const element = this.wrap("details", this.wrap("summary", label) + content);
        return this.addRaw(element).addEOL();
      }
      addImage(src, alt, options) {
        const { width, height } = options || {};
        const attrs = Object.assign(Object.assign({}, width && { width }), height && { height });
        const element = this.wrap("img", null, Object.assign({ src, alt }, attrs));
        return this.addRaw(element).addEOL();
      }
      addHeading(text, level) {
        const tag = `h${level}`;
        const allowedTag = ["h1", "h2", "h3", "h4", "h5", "h6"].includes(tag) ? tag : "h1";
        const element = this.wrap(allowedTag, text);
        return this.addRaw(element).addEOL();
      }
      addSeparator() {
        const element = this.wrap("hr", null);
        return this.addRaw(element).addEOL();
      }
      addBreak() {
        const element = this.wrap("br", null);
        return this.addRaw(element).addEOL();
      }
      addQuote(text, cite) {
        const attrs = Object.assign({}, cite && { cite });
        const element = this.wrap("blockquote", text, attrs);
        return this.addRaw(element).addEOL();
      }
      addLink(text, href) {
        const element = this.wrap("a", text, { href });
        return this.addRaw(element).addEOL();
      }
    };
    var _summary = new Summary();
    exports.markdownSummary = _summary;
    exports.summary = _summary;
  }
});

// node_modules/@actions/core/lib/path-utils.js
var require_path_utils = __commonJS({
  "node_modules/@actions/core/lib/path-utils.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule)
        return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (k !== "default" && Object.hasOwnProperty.call(mod, k))
            __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.toPlatformPath = exports.toWin32Path = exports.toPosixPath = void 0;
    var path2 = __importStar(require("path"));
    function toPosixPath(pth) {
      return pth.replace(/[\\]/g, "/");
    }
    exports.toPosixPath = toPosixPath;
    function toWin32Path(pth) {
      return pth.replace(/[/]/g, "\\");
    }
    exports.toWin32Path = toWin32Path;
    function toPlatformPath(pth) {
      return pth.replace(/[/\\]/g, path2.sep);
    }
    exports.toPlatformPath = toPlatformPath;
  }
});

// node_modules/@actions/core/lib/core.js
var require_core = __commonJS({
  "node_modules/@actions/core/lib/core.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule)
        return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (k !== "default" && Object.hasOwnProperty.call(mod, k))
            __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getIDToken = exports.getState = exports.saveState = exports.group = exports.endGroup = exports.startGroup = exports.info = exports.notice = exports.warning = exports.error = exports.debug = exports.isDebug = exports.setFailed = exports.setCommandEcho = exports.setOutput = exports.getBooleanInput = exports.getMultilineInput = exports.getInput = exports.addPath = exports.setSecret = exports.exportVariable = exports.ExitCode = void 0;
    var command_1 = require_command();
    var file_command_1 = require_file_command();
    var utils_1 = require_utils();
    var os = __importStar(require("os"));
    var path2 = __importStar(require("path"));
    var uuid_1 = require_dist();
    var oidc_utils_1 = require_oidc_utils();
    var ExitCode;
    (function(ExitCode2) {
      ExitCode2[ExitCode2["Success"] = 0] = "Success";
      ExitCode2[ExitCode2["Failure"] = 1] = "Failure";
    })(ExitCode = exports.ExitCode || (exports.ExitCode = {}));
    function exportVariable(name, val) {
      const convertedVal = utils_1.toCommandValue(val);
      process.env[name] = convertedVal;
      const filePath = process.env["GITHUB_ENV"] || "";
      if (filePath) {
        const delimiter = `ghadelimiter_${uuid_1.v4()}`;
        if (name.includes(delimiter)) {
          throw new Error(`Unexpected input: name should not contain the delimiter "${delimiter}"`);
        }
        if (convertedVal.includes(delimiter)) {
          throw new Error(`Unexpected input: value should not contain the delimiter "${delimiter}"`);
        }
        const commandValue = `${name}<<${delimiter}${os.EOL}${convertedVal}${os.EOL}${delimiter}`;
        file_command_1.issueCommand("ENV", commandValue);
      } else {
        command_1.issueCommand("set-env", { name }, convertedVal);
      }
    }
    exports.exportVariable = exportVariable;
    function setSecret(secret) {
      command_1.issueCommand("add-mask", {}, secret);
    }
    exports.setSecret = setSecret;
    function addPath(inputPath) {
      const filePath = process.env["GITHUB_PATH"] || "";
      if (filePath) {
        file_command_1.issueCommand("PATH", inputPath);
      } else {
        command_1.issueCommand("add-path", {}, inputPath);
      }
      process.env["PATH"] = `${inputPath}${path2.delimiter}${process.env["PATH"]}`;
    }
    exports.addPath = addPath;
    function getInput2(name, options) {
      const val = process.env[`INPUT_${name.replace(/ /g, "_").toUpperCase()}`] || "";
      if (options && options.required && !val) {
        throw new Error(`Input required and not supplied: ${name}`);
      }
      if (options && options.trimWhitespace === false) {
        return val;
      }
      return val.trim();
    }
    exports.getInput = getInput2;
    function getMultilineInput(name, options) {
      const inputs = getInput2(name, options).split("\n").filter((x) => x !== "");
      return inputs;
    }
    exports.getMultilineInput = getMultilineInput;
    function getBooleanInput(name, options) {
      const trueValue = ["true", "True", "TRUE"];
      const falseValue = ["false", "False", "FALSE"];
      const val = getInput2(name, options);
      if (trueValue.includes(val))
        return true;
      if (falseValue.includes(val))
        return false;
      throw new TypeError(`Input does not meet YAML 1.2 "Core Schema" specification: ${name}
Support boolean input list: \`true | True | TRUE | false | False | FALSE\``);
    }
    exports.getBooleanInput = getBooleanInput;
    function setOutput(name, value) {
      process.stdout.write(os.EOL);
      command_1.issueCommand("set-output", { name }, value);
    }
    exports.setOutput = setOutput;
    function setCommandEcho(enabled) {
      command_1.issue("echo", enabled ? "on" : "off");
    }
    exports.setCommandEcho = setCommandEcho;
    function setFailed2(message) {
      process.exitCode = ExitCode.Failure;
      error2(message);
    }
    exports.setFailed = setFailed2;
    function isDebug() {
      return process.env["RUNNER_DEBUG"] === "1";
    }
    exports.isDebug = isDebug;
    function debug2(message) {
      command_1.issueCommand("debug", {}, message);
    }
    exports.debug = debug2;
    function error2(message, properties = {}) {
      command_1.issueCommand("error", utils_1.toCommandProperties(properties), message instanceof Error ? message.toString() : message);
    }
    exports.error = error2;
    function warning(message, properties = {}) {
      command_1.issueCommand("warning", utils_1.toCommandProperties(properties), message instanceof Error ? message.toString() : message);
    }
    exports.warning = warning;
    function notice(message, properties = {}) {
      command_1.issueCommand("notice", utils_1.toCommandProperties(properties), message instanceof Error ? message.toString() : message);
    }
    exports.notice = notice;
    function info2(message) {
      process.stdout.write(message + os.EOL);
    }
    exports.info = info2;
    function startGroup(name) {
      command_1.issue("group", name);
    }
    exports.startGroup = startGroup;
    function endGroup() {
      command_1.issue("endgroup");
    }
    exports.endGroup = endGroup;
    function group(name, fn) {
      return __awaiter(this, void 0, void 0, function* () {
        startGroup(name);
        let result;
        try {
          result = yield fn();
        } finally {
          endGroup();
        }
        return result;
      });
    }
    exports.group = group;
    function saveState(name, value) {
      command_1.issueCommand("save-state", { name }, value);
    }
    exports.saveState = saveState;
    function getState(name) {
      return process.env[`STATE_${name}`] || "";
    }
    exports.getState = getState;
    function getIDToken(aud) {
      return __awaiter(this, void 0, void 0, function* () {
        return yield oidc_utils_1.OidcClient.getIDToken(aud);
      });
    }
    exports.getIDToken = getIDToken;
    var summary_1 = require_summary();
    Object.defineProperty(exports, "summary", { enumerable: true, get: function() {
      return summary_1.summary;
    } });
    var summary_2 = require_summary();
    Object.defineProperty(exports, "markdownSummary", { enumerable: true, get: function() {
      return summary_2.markdownSummary;
    } });
    var path_utils_1 = require_path_utils();
    Object.defineProperty(exports, "toPosixPath", { enumerable: true, get: function() {
      return path_utils_1.toPosixPath;
    } });
    Object.defineProperty(exports, "toWin32Path", { enumerable: true, get: function() {
      return path_utils_1.toWin32Path;
    } });
    Object.defineProperty(exports, "toPlatformPath", { enumerable: true, get: function() {
      return path_utils_1.toPlatformPath;
    } });
  }
});

// node_modules/fs-jetpack/lib/utils/promisify.js
var require_promisify = __commonJS({
  "node_modules/fs-jetpack/lib/utils/promisify.js"(exports, module2) {
    "use strict";
    module2.exports = (fn) => {
      return function() {
        const length = arguments.length;
        const args = new Array(length);
        for (let i = 0; i < length; i += 1) {
          args[i] = arguments[i];
        }
        return new Promise((resolve, reject) => {
          args.push((err, data) => {
            if (err) {
              reject(err);
            } else {
              resolve(data);
            }
          });
          fn.apply(null, args);
        });
      };
    };
  }
});

// node_modules/fs-jetpack/lib/utils/fs.js
var require_fs = __commonJS({
  "node_modules/fs-jetpack/lib/utils/fs.js"(exports, module2) {
    "use strict";
    var fs = require("fs");
    var promisify = require_promisify();
    var isCallbackMethod = (key) => {
      return [
        typeof fs[key] === "function",
        !key.match(/Sync$/),
        !key.match(/^[A-Z]/),
        !key.match(/^create/),
        !key.match(/^(un)?watch/)
      ].every(Boolean);
    };
    var adaptMethod = (name) => {
      const original = fs[name];
      return promisify(original);
    };
    var adaptAllMethods = () => {
      const adapted = {};
      Object.keys(fs).forEach((key) => {
        if (isCallbackMethod(key)) {
          if (key === "exists") {
            adapted.exists = () => {
              throw new Error("fs.exists() is deprecated");
            };
          } else {
            adapted[key] = adaptMethod(key);
          }
        } else {
          adapted[key] = fs[key];
        }
      });
      return adapted;
    };
    module2.exports = adaptAllMethods();
  }
});

// node_modules/fs-jetpack/lib/utils/validate.js
var require_validate2 = __commonJS({
  "node_modules/fs-jetpack/lib/utils/validate.js"(exports, module2) {
    "use strict";
    var prettyPrintTypes = (types) => {
      const addArticle = (str) => {
        const vowels = ["a", "e", "i", "o", "u"];
        if (vowels.indexOf(str[0]) !== -1) {
          return `an ${str}`;
        }
        return `a ${str}`;
      };
      return types.map(addArticle).join(" or ");
    };
    var isArrayOfNotation = (typeDefinition) => {
      return /array of /.test(typeDefinition);
    };
    var extractTypeFromArrayOfNotation = (typeDefinition) => {
      return typeDefinition.split(" of ")[1];
    };
    var isValidTypeDefinition = (typeStr) => {
      if (isArrayOfNotation(typeStr)) {
        return isValidTypeDefinition(extractTypeFromArrayOfNotation(typeStr));
      }
      return [
        "string",
        "number",
        "boolean",
        "array",
        "object",
        "buffer",
        "null",
        "undefined",
        "function"
      ].some((validType) => {
        return validType === typeStr;
      });
    };
    var detectType = (value) => {
      if (value === null) {
        return "null";
      }
      if (Array.isArray(value)) {
        return "array";
      }
      if (Buffer.isBuffer(value)) {
        return "buffer";
      }
      return typeof value;
    };
    var onlyUniqueValuesInArrayFilter = (value, index, self) => {
      return self.indexOf(value) === index;
    };
    var detectTypeDeep = (value) => {
      let type = detectType(value);
      let typesInArray;
      if (type === "array") {
        typesInArray = value.map((element) => {
          return detectType(element);
        }).filter(onlyUniqueValuesInArrayFilter);
        type += ` of ${typesInArray.join(", ")}`;
      }
      return type;
    };
    var validateArray = (argumentValue, typeToCheck) => {
      const allowedTypeInArray = extractTypeFromArrayOfNotation(typeToCheck);
      if (detectType(argumentValue) !== "array") {
        return false;
      }
      return argumentValue.every((element) => {
        return detectType(element) === allowedTypeInArray;
      });
    };
    var validateArgument = (methodName, argumentName, argumentValue, argumentMustBe) => {
      const isOneOfAllowedTypes = argumentMustBe.some((type) => {
        if (!isValidTypeDefinition(type)) {
          throw new Error(`Unknown type "${type}"`);
        }
        if (isArrayOfNotation(type)) {
          return validateArray(argumentValue, type);
        }
        return type === detectType(argumentValue);
      });
      if (!isOneOfAllowedTypes) {
        throw new Error(
          `Argument "${argumentName}" passed to ${methodName} must be ${prettyPrintTypes(
            argumentMustBe
          )}. Received ${detectTypeDeep(argumentValue)}`
        );
      }
    };
    var validateOptions = (methodName, optionsObjName, obj, allowedOptions) => {
      if (obj !== void 0) {
        validateArgument(methodName, optionsObjName, obj, ["object"]);
        Object.keys(obj).forEach((key) => {
          const argName = `${optionsObjName}.${key}`;
          if (allowedOptions[key] !== void 0) {
            validateArgument(methodName, argName, obj[key], allowedOptions[key]);
          } else {
            throw new Error(
              `Unknown argument "${argName}" passed to ${methodName}`
            );
          }
        });
      }
    };
    module2.exports = {
      argument: validateArgument,
      options: validateOptions
    };
  }
});

// node_modules/fs-jetpack/lib/utils/mode.js
var require_mode = __commonJS({
  "node_modules/fs-jetpack/lib/utils/mode.js"(exports) {
    "use strict";
    exports.normalizeFileMode = (mode) => {
      let modeAsString;
      if (typeof mode === "number") {
        modeAsString = mode.toString(8);
      } else {
        modeAsString = mode;
      }
      return modeAsString.substring(modeAsString.length - 3);
    };
  }
});

// node_modules/fs.realpath/old.js
var require_old = __commonJS({
  "node_modules/fs.realpath/old.js"(exports) {
    var pathModule = require("path");
    var isWindows = process.platform === "win32";
    var fs = require("fs");
    var DEBUG = process.env.NODE_DEBUG && /fs/.test(process.env.NODE_DEBUG);
    function rethrow() {
      var callback;
      if (DEBUG) {
        var backtrace = new Error();
        callback = debugCallback;
      } else
        callback = missingCallback;
      return callback;
      function debugCallback(err) {
        if (err) {
          backtrace.message = err.message;
          err = backtrace;
          missingCallback(err);
        }
      }
      function missingCallback(err) {
        if (err) {
          if (process.throwDeprecation)
            throw err;
          else if (!process.noDeprecation) {
            var msg = "fs: missing callback " + (err.stack || err.message);
            if (process.traceDeprecation)
              console.trace(msg);
            else
              console.error(msg);
          }
        }
      }
    }
    function maybeCallback(cb) {
      return typeof cb === "function" ? cb : rethrow();
    }
    var normalize = pathModule.normalize;
    if (isWindows) {
      nextPartRe = /(.*?)(?:[\/\\]+|$)/g;
    } else {
      nextPartRe = /(.*?)(?:[\/]+|$)/g;
    }
    var nextPartRe;
    if (isWindows) {
      splitRootRe = /^(?:[a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/][^\\\/]+)?[\\\/]*/;
    } else {
      splitRootRe = /^[\/]*/;
    }
    var splitRootRe;
    exports.realpathSync = function realpathSync(p, cache) {
      p = pathModule.resolve(p);
      if (cache && Object.prototype.hasOwnProperty.call(cache, p)) {
        return cache[p];
      }
      var original = p, seenLinks = {}, knownHard = {};
      var pos;
      var current;
      var base;
      var previous;
      start();
      function start() {
        var m = splitRootRe.exec(p);
        pos = m[0].length;
        current = m[0];
        base = m[0];
        previous = "";
        if (isWindows && !knownHard[base]) {
          fs.lstatSync(base);
          knownHard[base] = true;
        }
      }
      while (pos < p.length) {
        nextPartRe.lastIndex = pos;
        var result = nextPartRe.exec(p);
        previous = current;
        current += result[0];
        base = previous + result[1];
        pos = nextPartRe.lastIndex;
        if (knownHard[base] || cache && cache[base] === base) {
          continue;
        }
        var resolvedLink;
        if (cache && Object.prototype.hasOwnProperty.call(cache, base)) {
          resolvedLink = cache[base];
        } else {
          var stat = fs.lstatSync(base);
          if (!stat.isSymbolicLink()) {
            knownHard[base] = true;
            if (cache)
              cache[base] = base;
            continue;
          }
          var linkTarget = null;
          if (!isWindows) {
            var id = stat.dev.toString(32) + ":" + stat.ino.toString(32);
            if (seenLinks.hasOwnProperty(id)) {
              linkTarget = seenLinks[id];
            }
          }
          if (linkTarget === null) {
            fs.statSync(base);
            linkTarget = fs.readlinkSync(base);
          }
          resolvedLink = pathModule.resolve(previous, linkTarget);
          if (cache)
            cache[base] = resolvedLink;
          if (!isWindows)
            seenLinks[id] = linkTarget;
        }
        p = pathModule.resolve(resolvedLink, p.slice(pos));
        start();
      }
      if (cache)
        cache[original] = p;
      return p;
    };
    exports.realpath = function realpath(p, cache, cb) {
      if (typeof cb !== "function") {
        cb = maybeCallback(cache);
        cache = null;
      }
      p = pathModule.resolve(p);
      if (cache && Object.prototype.hasOwnProperty.call(cache, p)) {
        return process.nextTick(cb.bind(null, null, cache[p]));
      }
      var original = p, seenLinks = {}, knownHard = {};
      var pos;
      var current;
      var base;
      var previous;
      start();
      function start() {
        var m = splitRootRe.exec(p);
        pos = m[0].length;
        current = m[0];
        base = m[0];
        previous = "";
        if (isWindows && !knownHard[base]) {
          fs.lstat(base, function(err) {
            if (err)
              return cb(err);
            knownHard[base] = true;
            LOOP();
          });
        } else {
          process.nextTick(LOOP);
        }
      }
      function LOOP() {
        if (pos >= p.length) {
          if (cache)
            cache[original] = p;
          return cb(null, p);
        }
        nextPartRe.lastIndex = pos;
        var result = nextPartRe.exec(p);
        previous = current;
        current += result[0];
        base = previous + result[1];
        pos = nextPartRe.lastIndex;
        if (knownHard[base] || cache && cache[base] === base) {
          return process.nextTick(LOOP);
        }
        if (cache && Object.prototype.hasOwnProperty.call(cache, base)) {
          return gotResolvedLink(cache[base]);
        }
        return fs.lstat(base, gotStat);
      }
      function gotStat(err, stat) {
        if (err)
          return cb(err);
        if (!stat.isSymbolicLink()) {
          knownHard[base] = true;
          if (cache)
            cache[base] = base;
          return process.nextTick(LOOP);
        }
        if (!isWindows) {
          var id = stat.dev.toString(32) + ":" + stat.ino.toString(32);
          if (seenLinks.hasOwnProperty(id)) {
            return gotTarget(null, seenLinks[id], base);
          }
        }
        fs.stat(base, function(err2) {
          if (err2)
            return cb(err2);
          fs.readlink(base, function(err3, target) {
            if (!isWindows)
              seenLinks[id] = target;
            gotTarget(err3, target);
          });
        });
      }
      function gotTarget(err, target, base2) {
        if (err)
          return cb(err);
        var resolvedLink = pathModule.resolve(previous, target);
        if (cache)
          cache[base2] = resolvedLink;
        gotResolvedLink(resolvedLink);
      }
      function gotResolvedLink(resolvedLink) {
        p = pathModule.resolve(resolvedLink, p.slice(pos));
        start();
      }
    };
  }
});

// node_modules/fs.realpath/index.js
var require_fs2 = __commonJS({
  "node_modules/fs.realpath/index.js"(exports, module2) {
    module2.exports = realpath;
    realpath.realpath = realpath;
    realpath.sync = realpathSync;
    realpath.realpathSync = realpathSync;
    realpath.monkeypatch = monkeypatch;
    realpath.unmonkeypatch = unmonkeypatch;
    var fs = require("fs");
    var origRealpath = fs.realpath;
    var origRealpathSync = fs.realpathSync;
    var version = process.version;
    var ok = /^v[0-5]\./.test(version);
    var old = require_old();
    function newError(er) {
      return er && er.syscall === "realpath" && (er.code === "ELOOP" || er.code === "ENOMEM" || er.code === "ENAMETOOLONG");
    }
    function realpath(p, cache, cb) {
      if (ok) {
        return origRealpath(p, cache, cb);
      }
      if (typeof cache === "function") {
        cb = cache;
        cache = null;
      }
      origRealpath(p, cache, function(er, result) {
        if (newError(er)) {
          old.realpath(p, cache, cb);
        } else {
          cb(er, result);
        }
      });
    }
    function realpathSync(p, cache) {
      if (ok) {
        return origRealpathSync(p, cache);
      }
      try {
        return origRealpathSync(p, cache);
      } catch (er) {
        if (newError(er)) {
          return old.realpathSync(p, cache);
        } else {
          throw er;
        }
      }
    }
    function monkeypatch() {
      fs.realpath = realpath;
      fs.realpathSync = realpathSync;
    }
    function unmonkeypatch() {
      fs.realpath = origRealpath;
      fs.realpathSync = origRealpathSync;
    }
  }
});

// node_modules/concat-map/index.js
var require_concat_map = __commonJS({
  "node_modules/concat-map/index.js"(exports, module2) {
    module2.exports = function(xs, fn) {
      var res = [];
      for (var i = 0; i < xs.length; i++) {
        var x = fn(xs[i], i);
        if (isArray(x))
          res.push.apply(res, x);
        else
          res.push(x);
      }
      return res;
    };
    var isArray = Array.isArray || function(xs) {
      return Object.prototype.toString.call(xs) === "[object Array]";
    };
  }
});

// node_modules/balanced-match/index.js
var require_balanced_match = __commonJS({
  "node_modules/balanced-match/index.js"(exports, module2) {
    "use strict";
    module2.exports = balanced;
    function balanced(a, b, str) {
      if (a instanceof RegExp)
        a = maybeMatch(a, str);
      if (b instanceof RegExp)
        b = maybeMatch(b, str);
      var r = range(a, b, str);
      return r && {
        start: r[0],
        end: r[1],
        pre: str.slice(0, r[0]),
        body: str.slice(r[0] + a.length, r[1]),
        post: str.slice(r[1] + b.length)
      };
    }
    function maybeMatch(reg, str) {
      var m = str.match(reg);
      return m ? m[0] : null;
    }
    balanced.range = range;
    function range(a, b, str) {
      var begs, beg, left, right, result;
      var ai = str.indexOf(a);
      var bi = str.indexOf(b, ai + 1);
      var i = ai;
      if (ai >= 0 && bi > 0) {
        if (a === b) {
          return [ai, bi];
        }
        begs = [];
        left = str.length;
        while (i >= 0 && !result) {
          if (i == ai) {
            begs.push(i);
            ai = str.indexOf(a, i + 1);
          } else if (begs.length == 1) {
            result = [begs.pop(), bi];
          } else {
            beg = begs.pop();
            if (beg < left) {
              left = beg;
              right = bi;
            }
            bi = str.indexOf(b, i + 1);
          }
          i = ai < bi && ai >= 0 ? ai : bi;
        }
        if (begs.length) {
          result = [left, right];
        }
      }
      return result;
    }
  }
});

// node_modules/brace-expansion/index.js
var require_brace_expansion = __commonJS({
  "node_modules/brace-expansion/index.js"(exports, module2) {
    var concatMap = require_concat_map();
    var balanced = require_balanced_match();
    module2.exports = expandTop;
    var escSlash = "\0SLASH" + Math.random() + "\0";
    var escOpen = "\0OPEN" + Math.random() + "\0";
    var escClose = "\0CLOSE" + Math.random() + "\0";
    var escComma = "\0COMMA" + Math.random() + "\0";
    var escPeriod = "\0PERIOD" + Math.random() + "\0";
    function numeric(str) {
      return parseInt(str, 10) == str ? parseInt(str, 10) : str.charCodeAt(0);
    }
    function escapeBraces(str) {
      return str.split("\\\\").join(escSlash).split("\\{").join(escOpen).split("\\}").join(escClose).split("\\,").join(escComma).split("\\.").join(escPeriod);
    }
    function unescapeBraces(str) {
      return str.split(escSlash).join("\\").split(escOpen).join("{").split(escClose).join("}").split(escComma).join(",").split(escPeriod).join(".");
    }
    function parseCommaParts(str) {
      if (!str)
        return [""];
      var parts = [];
      var m = balanced("{", "}", str);
      if (!m)
        return str.split(",");
      var pre = m.pre;
      var body = m.body;
      var post = m.post;
      var p = pre.split(",");
      p[p.length - 1] += "{" + body + "}";
      var postParts = parseCommaParts(post);
      if (post.length) {
        p[p.length - 1] += postParts.shift();
        p.push.apply(p, postParts);
      }
      parts.push.apply(parts, p);
      return parts;
    }
    function expandTop(str) {
      if (!str)
        return [];
      if (str.substr(0, 2) === "{}") {
        str = "\\{\\}" + str.substr(2);
      }
      return expand(escapeBraces(str), true).map(unescapeBraces);
    }
    function embrace(str) {
      return "{" + str + "}";
    }
    function isPadded(el) {
      return /^-?0\d/.test(el);
    }
    function lte(i, y) {
      return i <= y;
    }
    function gte(i, y) {
      return i >= y;
    }
    function expand(str, isTop) {
      var expansions = [];
      var m = balanced("{", "}", str);
      if (!m || /\$$/.test(m.pre))
        return [str];
      var isNumericSequence = /^-?\d+\.\.-?\d+(?:\.\.-?\d+)?$/.test(m.body);
      var isAlphaSequence = /^[a-zA-Z]\.\.[a-zA-Z](?:\.\.-?\d+)?$/.test(m.body);
      var isSequence = isNumericSequence || isAlphaSequence;
      var isOptions = m.body.indexOf(",") >= 0;
      if (!isSequence && !isOptions) {
        if (m.post.match(/,.*\}/)) {
          str = m.pre + "{" + m.body + escClose + m.post;
          return expand(str);
        }
        return [str];
      }
      var n;
      if (isSequence) {
        n = m.body.split(/\.\./);
      } else {
        n = parseCommaParts(m.body);
        if (n.length === 1) {
          n = expand(n[0], false).map(embrace);
          if (n.length === 1) {
            var post = m.post.length ? expand(m.post, false) : [""];
            return post.map(function(p) {
              return m.pre + n[0] + p;
            });
          }
        }
      }
      var pre = m.pre;
      var post = m.post.length ? expand(m.post, false) : [""];
      var N;
      if (isSequence) {
        var x = numeric(n[0]);
        var y = numeric(n[1]);
        var width = Math.max(n[0].length, n[1].length);
        var incr = n.length == 3 ? Math.abs(numeric(n[2])) : 1;
        var test = lte;
        var reverse = y < x;
        if (reverse) {
          incr *= -1;
          test = gte;
        }
        var pad = n.some(isPadded);
        N = [];
        for (var i = x; test(i, y); i += incr) {
          var c;
          if (isAlphaSequence) {
            c = String.fromCharCode(i);
            if (c === "\\")
              c = "";
          } else {
            c = String(i);
            if (pad) {
              var need = width - c.length;
              if (need > 0) {
                var z = new Array(need + 1).join("0");
                if (i < 0)
                  c = "-" + z + c.slice(1);
                else
                  c = z + c;
              }
            }
          }
          N.push(c);
        }
      } else {
        N = concatMap(n, function(el) {
          return expand(el, false);
        });
      }
      for (var j = 0; j < N.length; j++) {
        for (var k = 0; k < post.length; k++) {
          var expansion = pre + N[j] + post[k];
          if (!isTop || isSequence || expansion)
            expansions.push(expansion);
        }
      }
      return expansions;
    }
  }
});

// node_modules/minimatch/minimatch.js
var require_minimatch = __commonJS({
  "node_modules/minimatch/minimatch.js"(exports, module2) {
    module2.exports = minimatch;
    minimatch.Minimatch = Minimatch;
    var path2 = function() {
      try {
        return require("path");
      } catch (e) {
      }
    }() || {
      sep: "/"
    };
    minimatch.sep = path2.sep;
    var GLOBSTAR = minimatch.GLOBSTAR = Minimatch.GLOBSTAR = {};
    var expand = require_brace_expansion();
    var plTypes = {
      "!": { open: "(?:(?!(?:", close: "))[^/]*?)" },
      "?": { open: "(?:", close: ")?" },
      "+": { open: "(?:", close: ")+" },
      "*": { open: "(?:", close: ")*" },
      "@": { open: "(?:", close: ")" }
    };
    var qmark = "[^/]";
    var star = qmark + "*?";
    var twoStarDot = "(?:(?!(?:\\/|^)(?:\\.{1,2})($|\\/)).)*?";
    var twoStarNoDot = "(?:(?!(?:\\/|^)\\.).)*?";
    var reSpecials = charSet("().*{}+?[]^$\\!");
    function charSet(s) {
      return s.split("").reduce(function(set, c) {
        set[c] = true;
        return set;
      }, {});
    }
    var slashSplit = /\/+/;
    minimatch.filter = filter;
    function filter(pattern, options) {
      options = options || {};
      return function(p, i, list) {
        return minimatch(p, pattern, options);
      };
    }
    function ext(a, b) {
      b = b || {};
      var t = {};
      Object.keys(a).forEach(function(k) {
        t[k] = a[k];
      });
      Object.keys(b).forEach(function(k) {
        t[k] = b[k];
      });
      return t;
    }
    minimatch.defaults = function(def) {
      if (!def || typeof def !== "object" || !Object.keys(def).length) {
        return minimatch;
      }
      var orig = minimatch;
      var m = function minimatch2(p, pattern, options) {
        return orig(p, pattern, ext(def, options));
      };
      m.Minimatch = function Minimatch2(pattern, options) {
        return new orig.Minimatch(pattern, ext(def, options));
      };
      m.Minimatch.defaults = function defaults(options) {
        return orig.defaults(ext(def, options)).Minimatch;
      };
      m.filter = function filter2(pattern, options) {
        return orig.filter(pattern, ext(def, options));
      };
      m.defaults = function defaults(options) {
        return orig.defaults(ext(def, options));
      };
      m.makeRe = function makeRe2(pattern, options) {
        return orig.makeRe(pattern, ext(def, options));
      };
      m.braceExpand = function braceExpand2(pattern, options) {
        return orig.braceExpand(pattern, ext(def, options));
      };
      m.match = function(list, pattern, options) {
        return orig.match(list, pattern, ext(def, options));
      };
      return m;
    };
    Minimatch.defaults = function(def) {
      return minimatch.defaults(def).Minimatch;
    };
    function minimatch(p, pattern, options) {
      assertValidPattern(pattern);
      if (!options)
        options = {};
      if (!options.nocomment && pattern.charAt(0) === "#") {
        return false;
      }
      return new Minimatch(pattern, options).match(p);
    }
    function Minimatch(pattern, options) {
      if (!(this instanceof Minimatch)) {
        return new Minimatch(pattern, options);
      }
      assertValidPattern(pattern);
      if (!options)
        options = {};
      pattern = pattern.trim();
      if (!options.allowWindowsEscape && path2.sep !== "/") {
        pattern = pattern.split(path2.sep).join("/");
      }
      this.options = options;
      this.set = [];
      this.pattern = pattern;
      this.regexp = null;
      this.negate = false;
      this.comment = false;
      this.empty = false;
      this.partial = !!options.partial;
      this.make();
    }
    Minimatch.prototype.debug = function() {
    };
    Minimatch.prototype.make = make;
    function make() {
      var pattern = this.pattern;
      var options = this.options;
      if (!options.nocomment && pattern.charAt(0) === "#") {
        this.comment = true;
        return;
      }
      if (!pattern) {
        this.empty = true;
        return;
      }
      this.parseNegate();
      var set = this.globSet = this.braceExpand();
      if (options.debug)
        this.debug = function debug2() {
          console.error.apply(console, arguments);
        };
      this.debug(this.pattern, set);
      set = this.globParts = set.map(function(s) {
        return s.split(slashSplit);
      });
      this.debug(this.pattern, set);
      set = set.map(function(s, si, set2) {
        return s.map(this.parse, this);
      }, this);
      this.debug(this.pattern, set);
      set = set.filter(function(s) {
        return s.indexOf(false) === -1;
      });
      this.debug(this.pattern, set);
      this.set = set;
    }
    Minimatch.prototype.parseNegate = parseNegate;
    function parseNegate() {
      var pattern = this.pattern;
      var negate = false;
      var options = this.options;
      var negateOffset = 0;
      if (options.nonegate)
        return;
      for (var i = 0, l = pattern.length; i < l && pattern.charAt(i) === "!"; i++) {
        negate = !negate;
        negateOffset++;
      }
      if (negateOffset)
        this.pattern = pattern.substr(negateOffset);
      this.negate = negate;
    }
    minimatch.braceExpand = function(pattern, options) {
      return braceExpand(pattern, options);
    };
    Minimatch.prototype.braceExpand = braceExpand;
    function braceExpand(pattern, options) {
      if (!options) {
        if (this instanceof Minimatch) {
          options = this.options;
        } else {
          options = {};
        }
      }
      pattern = typeof pattern === "undefined" ? this.pattern : pattern;
      assertValidPattern(pattern);
      if (options.nobrace || !/\{(?:(?!\{).)*\}/.test(pattern)) {
        return [pattern];
      }
      return expand(pattern);
    }
    var MAX_PATTERN_LENGTH = 1024 * 64;
    var assertValidPattern = function(pattern) {
      if (typeof pattern !== "string") {
        throw new TypeError("invalid pattern");
      }
      if (pattern.length > MAX_PATTERN_LENGTH) {
        throw new TypeError("pattern is too long");
      }
    };
    Minimatch.prototype.parse = parse;
    var SUBPARSE = {};
    function parse(pattern, isSub) {
      assertValidPattern(pattern);
      var options = this.options;
      if (pattern === "**") {
        if (!options.noglobstar)
          return GLOBSTAR;
        else
          pattern = "*";
      }
      if (pattern === "")
        return "";
      var re = "";
      var hasMagic = !!options.nocase;
      var escaping = false;
      var patternListStack = [];
      var negativeLists = [];
      var stateChar;
      var inClass = false;
      var reClassStart = -1;
      var classStart = -1;
      var patternStart = pattern.charAt(0) === "." ? "" : options.dot ? "(?!(?:^|\\/)\\.{1,2}(?:$|\\/))" : "(?!\\.)";
      var self = this;
      function clearStateChar() {
        if (stateChar) {
          switch (stateChar) {
            case "*":
              re += star;
              hasMagic = true;
              break;
            case "?":
              re += qmark;
              hasMagic = true;
              break;
            default:
              re += "\\" + stateChar;
              break;
          }
          self.debug("clearStateChar %j %j", stateChar, re);
          stateChar = false;
        }
      }
      for (var i = 0, len = pattern.length, c; i < len && (c = pattern.charAt(i)); i++) {
        this.debug("%s	%s %s %j", pattern, i, re, c);
        if (escaping && reSpecials[c]) {
          re += "\\" + c;
          escaping = false;
          continue;
        }
        switch (c) {
          case "/": {
            return false;
          }
          case "\\":
            clearStateChar();
            escaping = true;
            continue;
          case "?":
          case "*":
          case "+":
          case "@":
          case "!":
            this.debug("%s	%s %s %j <-- stateChar", pattern, i, re, c);
            if (inClass) {
              this.debug("  in class");
              if (c === "!" && i === classStart + 1)
                c = "^";
              re += c;
              continue;
            }
            self.debug("call clearStateChar %j", stateChar);
            clearStateChar();
            stateChar = c;
            if (options.noext)
              clearStateChar();
            continue;
          case "(":
            if (inClass) {
              re += "(";
              continue;
            }
            if (!stateChar) {
              re += "\\(";
              continue;
            }
            patternListStack.push({
              type: stateChar,
              start: i - 1,
              reStart: re.length,
              open: plTypes[stateChar].open,
              close: plTypes[stateChar].close
            });
            re += stateChar === "!" ? "(?:(?!(?:" : "(?:";
            this.debug("plType %j %j", stateChar, re);
            stateChar = false;
            continue;
          case ")":
            if (inClass || !patternListStack.length) {
              re += "\\)";
              continue;
            }
            clearStateChar();
            hasMagic = true;
            var pl = patternListStack.pop();
            re += pl.close;
            if (pl.type === "!") {
              negativeLists.push(pl);
            }
            pl.reEnd = re.length;
            continue;
          case "|":
            if (inClass || !patternListStack.length || escaping) {
              re += "\\|";
              escaping = false;
              continue;
            }
            clearStateChar();
            re += "|";
            continue;
          case "[":
            clearStateChar();
            if (inClass) {
              re += "\\" + c;
              continue;
            }
            inClass = true;
            classStart = i;
            reClassStart = re.length;
            re += c;
            continue;
          case "]":
            if (i === classStart + 1 || !inClass) {
              re += "\\" + c;
              escaping = false;
              continue;
            }
            var cs = pattern.substring(classStart + 1, i);
            try {
              RegExp("[" + cs + "]");
            } catch (er) {
              var sp = this.parse(cs, SUBPARSE);
              re = re.substr(0, reClassStart) + "\\[" + sp[0] + "\\]";
              hasMagic = hasMagic || sp[1];
              inClass = false;
              continue;
            }
            hasMagic = true;
            inClass = false;
            re += c;
            continue;
          default:
            clearStateChar();
            if (escaping) {
              escaping = false;
            } else if (reSpecials[c] && !(c === "^" && inClass)) {
              re += "\\";
            }
            re += c;
        }
      }
      if (inClass) {
        cs = pattern.substr(classStart + 1);
        sp = this.parse(cs, SUBPARSE);
        re = re.substr(0, reClassStart) + "\\[" + sp[0];
        hasMagic = hasMagic || sp[1];
      }
      for (pl = patternListStack.pop(); pl; pl = patternListStack.pop()) {
        var tail = re.slice(pl.reStart + pl.open.length);
        this.debug("setting tail", re, pl);
        tail = tail.replace(/((?:\\{2}){0,64})(\\?)\|/g, function(_, $1, $2) {
          if (!$2) {
            $2 = "\\";
          }
          return $1 + $1 + $2 + "|";
        });
        this.debug("tail=%j\n   %s", tail, tail, pl, re);
        var t = pl.type === "*" ? star : pl.type === "?" ? qmark : "\\" + pl.type;
        hasMagic = true;
        re = re.slice(0, pl.reStart) + t + "\\(" + tail;
      }
      clearStateChar();
      if (escaping) {
        re += "\\\\";
      }
      var addPatternStart = false;
      switch (re.charAt(0)) {
        case "[":
        case ".":
        case "(":
          addPatternStart = true;
      }
      for (var n = negativeLists.length - 1; n > -1; n--) {
        var nl = negativeLists[n];
        var nlBefore = re.slice(0, nl.reStart);
        var nlFirst = re.slice(nl.reStart, nl.reEnd - 8);
        var nlLast = re.slice(nl.reEnd - 8, nl.reEnd);
        var nlAfter = re.slice(nl.reEnd);
        nlLast += nlAfter;
        var openParensBefore = nlBefore.split("(").length - 1;
        var cleanAfter = nlAfter;
        for (i = 0; i < openParensBefore; i++) {
          cleanAfter = cleanAfter.replace(/\)[+*?]?/, "");
        }
        nlAfter = cleanAfter;
        var dollar = "";
        if (nlAfter === "" && isSub !== SUBPARSE) {
          dollar = "$";
        }
        var newRe = nlBefore + nlFirst + nlAfter + dollar + nlLast;
        re = newRe;
      }
      if (re !== "" && hasMagic) {
        re = "(?=.)" + re;
      }
      if (addPatternStart) {
        re = patternStart + re;
      }
      if (isSub === SUBPARSE) {
        return [re, hasMagic];
      }
      if (!hasMagic) {
        return globUnescape(pattern);
      }
      var flags = options.nocase ? "i" : "";
      try {
        var regExp = new RegExp("^" + re + "$", flags);
      } catch (er) {
        return new RegExp("$.");
      }
      regExp._glob = pattern;
      regExp._src = re;
      return regExp;
    }
    minimatch.makeRe = function(pattern, options) {
      return new Minimatch(pattern, options || {}).makeRe();
    };
    Minimatch.prototype.makeRe = makeRe;
    function makeRe() {
      if (this.regexp || this.regexp === false)
        return this.regexp;
      var set = this.set;
      if (!set.length) {
        this.regexp = false;
        return this.regexp;
      }
      var options = this.options;
      var twoStar = options.noglobstar ? star : options.dot ? twoStarDot : twoStarNoDot;
      var flags = options.nocase ? "i" : "";
      var re = set.map(function(pattern) {
        return pattern.map(function(p) {
          return p === GLOBSTAR ? twoStar : typeof p === "string" ? regExpEscape(p) : p._src;
        }).join("\\/");
      }).join("|");
      re = "^(?:" + re + ")$";
      if (this.negate)
        re = "^(?!" + re + ").*$";
      try {
        this.regexp = new RegExp(re, flags);
      } catch (ex) {
        this.regexp = false;
      }
      return this.regexp;
    }
    minimatch.match = function(list, pattern, options) {
      options = options || {};
      var mm = new Minimatch(pattern, options);
      list = list.filter(function(f) {
        return mm.match(f);
      });
      if (mm.options.nonull && !list.length) {
        list.push(pattern);
      }
      return list;
    };
    Minimatch.prototype.match = function match(f, partial) {
      if (typeof partial === "undefined")
        partial = this.partial;
      this.debug("match", f, this.pattern);
      if (this.comment)
        return false;
      if (this.empty)
        return f === "";
      if (f === "/" && partial)
        return true;
      var options = this.options;
      if (path2.sep !== "/") {
        f = f.split(path2.sep).join("/");
      }
      f = f.split(slashSplit);
      this.debug(this.pattern, "split", f);
      var set = this.set;
      this.debug(this.pattern, "set", set);
      var filename;
      var i;
      for (i = f.length - 1; i >= 0; i--) {
        filename = f[i];
        if (filename)
          break;
      }
      for (i = 0; i < set.length; i++) {
        var pattern = set[i];
        var file = f;
        if (options.matchBase && pattern.length === 1) {
          file = [filename];
        }
        var hit = this.matchOne(file, pattern, partial);
        if (hit) {
          if (options.flipNegate)
            return true;
          return !this.negate;
        }
      }
      if (options.flipNegate)
        return false;
      return this.negate;
    };
    Minimatch.prototype.matchOne = function(file, pattern, partial) {
      var options = this.options;
      this.debug(
        "matchOne",
        { "this": this, file, pattern }
      );
      this.debug("matchOne", file.length, pattern.length);
      for (var fi = 0, pi = 0, fl = file.length, pl = pattern.length; fi < fl && pi < pl; fi++, pi++) {
        this.debug("matchOne loop");
        var p = pattern[pi];
        var f = file[fi];
        this.debug(pattern, p, f);
        if (p === false)
          return false;
        if (p === GLOBSTAR) {
          this.debug("GLOBSTAR", [pattern, p, f]);
          var fr = fi;
          var pr = pi + 1;
          if (pr === pl) {
            this.debug("** at the end");
            for (; fi < fl; fi++) {
              if (file[fi] === "." || file[fi] === ".." || !options.dot && file[fi].charAt(0) === ".")
                return false;
            }
            return true;
          }
          while (fr < fl) {
            var swallowee = file[fr];
            this.debug("\nglobstar while", file, fr, pattern, pr, swallowee);
            if (this.matchOne(file.slice(fr), pattern.slice(pr), partial)) {
              this.debug("globstar found match!", fr, fl, swallowee);
              return true;
            } else {
              if (swallowee === "." || swallowee === ".." || !options.dot && swallowee.charAt(0) === ".") {
                this.debug("dot detected!", file, fr, pattern, pr);
                break;
              }
              this.debug("globstar swallow a segment, and continue");
              fr++;
            }
          }
          if (partial) {
            this.debug("\n>>> no match, partial?", file, fr, pattern, pr);
            if (fr === fl)
              return true;
          }
          return false;
        }
        var hit;
        if (typeof p === "string") {
          hit = f === p;
          this.debug("string match", p, f, hit);
        } else {
          hit = f.match(p);
          this.debug("pattern match", p, f, hit);
        }
        if (!hit)
          return false;
      }
      if (fi === fl && pi === pl) {
        return true;
      } else if (fi === fl) {
        return partial;
      } else if (pi === pl) {
        return fi === fl - 1 && file[fi] === "";
      }
      throw new Error("wtf?");
    };
    function globUnescape(s) {
      return s.replace(/\\(.)/g, "$1");
    }
    function regExpEscape(s) {
      return s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    }
  }
});

// node_modules/inherits/inherits_browser.js
var require_inherits_browser = __commonJS({
  "node_modules/inherits/inherits_browser.js"(exports, module2) {
    if (typeof Object.create === "function") {
      module2.exports = function inherits(ctor, superCtor) {
        if (superCtor) {
          ctor.super_ = superCtor;
          ctor.prototype = Object.create(superCtor.prototype, {
            constructor: {
              value: ctor,
              enumerable: false,
              writable: true,
              configurable: true
            }
          });
        }
      };
    } else {
      module2.exports = function inherits(ctor, superCtor) {
        if (superCtor) {
          ctor.super_ = superCtor;
          var TempCtor = function() {
          };
          TempCtor.prototype = superCtor.prototype;
          ctor.prototype = new TempCtor();
          ctor.prototype.constructor = ctor;
        }
      };
    }
  }
});

// node_modules/inherits/inherits.js
var require_inherits = __commonJS({
  "node_modules/inherits/inherits.js"(exports, module2) {
    try {
      util = require("util");
      if (typeof util.inherits !== "function")
        throw "";
      module2.exports = util.inherits;
    } catch (e) {
      module2.exports = require_inherits_browser();
    }
    var util;
  }
});

// node_modules/path-is-absolute/index.js
var require_path_is_absolute = __commonJS({
  "node_modules/path-is-absolute/index.js"(exports, module2) {
    "use strict";
    function posix(path2) {
      return path2.charAt(0) === "/";
    }
    function win32(path2) {
      var splitDeviceRe = /^([a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/]+[^\\\/]+)?([\\\/])?([\s\S]*?)$/;
      var result = splitDeviceRe.exec(path2);
      var device = result[1] || "";
      var isUnc = Boolean(device && device.charAt(1) !== ":");
      return Boolean(result[2] || isUnc);
    }
    module2.exports = process.platform === "win32" ? win32 : posix;
    module2.exports.posix = posix;
    module2.exports.win32 = win32;
  }
});

// node_modules/glob/common.js
var require_common = __commonJS({
  "node_modules/glob/common.js"(exports) {
    exports.setopts = setopts;
    exports.ownProp = ownProp;
    exports.makeAbs = makeAbs;
    exports.finish = finish;
    exports.mark = mark;
    exports.isIgnored = isIgnored;
    exports.childrenIgnored = childrenIgnored;
    function ownProp(obj, field) {
      return Object.prototype.hasOwnProperty.call(obj, field);
    }
    var fs = require("fs");
    var path2 = require("path");
    var minimatch = require_minimatch();
    var isAbsolute = require_path_is_absolute();
    var Minimatch = minimatch.Minimatch;
    function alphasort(a, b) {
      return a.localeCompare(b, "en");
    }
    function setupIgnores(self, options) {
      self.ignore = options.ignore || [];
      if (!Array.isArray(self.ignore))
        self.ignore = [self.ignore];
      if (self.ignore.length) {
        self.ignore = self.ignore.map(ignoreMap);
      }
    }
    function ignoreMap(pattern) {
      var gmatcher = null;
      if (pattern.slice(-3) === "/**") {
        var gpattern = pattern.replace(/(\/\*\*)+$/, "");
        gmatcher = new Minimatch(gpattern, { dot: true });
      }
      return {
        matcher: new Minimatch(pattern, { dot: true }),
        gmatcher
      };
    }
    function setopts(self, pattern, options) {
      if (!options)
        options = {};
      if (options.matchBase && -1 === pattern.indexOf("/")) {
        if (options.noglobstar) {
          throw new Error("base matching requires globstar");
        }
        pattern = "**/" + pattern;
      }
      self.silent = !!options.silent;
      self.pattern = pattern;
      self.strict = options.strict !== false;
      self.realpath = !!options.realpath;
      self.realpathCache = options.realpathCache || /* @__PURE__ */ Object.create(null);
      self.follow = !!options.follow;
      self.dot = !!options.dot;
      self.mark = !!options.mark;
      self.nodir = !!options.nodir;
      if (self.nodir)
        self.mark = true;
      self.sync = !!options.sync;
      self.nounique = !!options.nounique;
      self.nonull = !!options.nonull;
      self.nosort = !!options.nosort;
      self.nocase = !!options.nocase;
      self.stat = !!options.stat;
      self.noprocess = !!options.noprocess;
      self.absolute = !!options.absolute;
      self.fs = options.fs || fs;
      self.maxLength = options.maxLength || Infinity;
      self.cache = options.cache || /* @__PURE__ */ Object.create(null);
      self.statCache = options.statCache || /* @__PURE__ */ Object.create(null);
      self.symlinks = options.symlinks || /* @__PURE__ */ Object.create(null);
      setupIgnores(self, options);
      self.changedCwd = false;
      var cwd = process.cwd();
      if (!ownProp(options, "cwd"))
        self.cwd = cwd;
      else {
        self.cwd = path2.resolve(options.cwd);
        self.changedCwd = self.cwd !== cwd;
      }
      self.root = options.root || path2.resolve(self.cwd, "/");
      self.root = path2.resolve(self.root);
      if (process.platform === "win32")
        self.root = self.root.replace(/\\/g, "/");
      self.cwdAbs = isAbsolute(self.cwd) ? self.cwd : makeAbs(self, self.cwd);
      if (process.platform === "win32")
        self.cwdAbs = self.cwdAbs.replace(/\\/g, "/");
      self.nomount = !!options.nomount;
      options.nonegate = true;
      options.nocomment = true;
      options.allowWindowsEscape = false;
      self.minimatch = new Minimatch(pattern, options);
      self.options = self.minimatch.options;
    }
    function finish(self) {
      var nou = self.nounique;
      var all = nou ? [] : /* @__PURE__ */ Object.create(null);
      for (var i = 0, l = self.matches.length; i < l; i++) {
        var matches = self.matches[i];
        if (!matches || Object.keys(matches).length === 0) {
          if (self.nonull) {
            var literal = self.minimatch.globSet[i];
            if (nou)
              all.push(literal);
            else
              all[literal] = true;
          }
        } else {
          var m = Object.keys(matches);
          if (nou)
            all.push.apply(all, m);
          else
            m.forEach(function(m2) {
              all[m2] = true;
            });
        }
      }
      if (!nou)
        all = Object.keys(all);
      if (!self.nosort)
        all = all.sort(alphasort);
      if (self.mark) {
        for (var i = 0; i < all.length; i++) {
          all[i] = self._mark(all[i]);
        }
        if (self.nodir) {
          all = all.filter(function(e) {
            var notDir = !/\/$/.test(e);
            var c = self.cache[e] || self.cache[makeAbs(self, e)];
            if (notDir && c)
              notDir = c !== "DIR" && !Array.isArray(c);
            return notDir;
          });
        }
      }
      if (self.ignore.length)
        all = all.filter(function(m2) {
          return !isIgnored(self, m2);
        });
      self.found = all;
    }
    function mark(self, p) {
      var abs = makeAbs(self, p);
      var c = self.cache[abs];
      var m = p;
      if (c) {
        var isDir = c === "DIR" || Array.isArray(c);
        var slash = p.slice(-1) === "/";
        if (isDir && !slash)
          m += "/";
        else if (!isDir && slash)
          m = m.slice(0, -1);
        if (m !== p) {
          var mabs = makeAbs(self, m);
          self.statCache[mabs] = self.statCache[abs];
          self.cache[mabs] = self.cache[abs];
        }
      }
      return m;
    }
    function makeAbs(self, f) {
      var abs = f;
      if (f.charAt(0) === "/") {
        abs = path2.join(self.root, f);
      } else if (isAbsolute(f) || f === "") {
        abs = f;
      } else if (self.changedCwd) {
        abs = path2.resolve(self.cwd, f);
      } else {
        abs = path2.resolve(f);
      }
      if (process.platform === "win32")
        abs = abs.replace(/\\/g, "/");
      return abs;
    }
    function isIgnored(self, path3) {
      if (!self.ignore.length)
        return false;
      return self.ignore.some(function(item) {
        return item.matcher.match(path3) || !!(item.gmatcher && item.gmatcher.match(path3));
      });
    }
    function childrenIgnored(self, path3) {
      if (!self.ignore.length)
        return false;
      return self.ignore.some(function(item) {
        return !!(item.gmatcher && item.gmatcher.match(path3));
      });
    }
  }
});

// node_modules/glob/sync.js
var require_sync = __commonJS({
  "node_modules/glob/sync.js"(exports, module2) {
    module2.exports = globSync;
    globSync.GlobSync = GlobSync;
    var rp = require_fs2();
    var minimatch = require_minimatch();
    var Minimatch = minimatch.Minimatch;
    var Glob = require_glob().Glob;
    var util = require("util");
    var path2 = require("path");
    var assert = require("assert");
    var isAbsolute = require_path_is_absolute();
    var common = require_common();
    var setopts = common.setopts;
    var ownProp = common.ownProp;
    var childrenIgnored = common.childrenIgnored;
    var isIgnored = common.isIgnored;
    function globSync(pattern, options) {
      if (typeof options === "function" || arguments.length === 3)
        throw new TypeError("callback provided to sync glob\nSee: https://github.com/isaacs/node-glob/issues/167");
      return new GlobSync(pattern, options).found;
    }
    function GlobSync(pattern, options) {
      if (!pattern)
        throw new Error("must provide pattern");
      if (typeof options === "function" || arguments.length === 3)
        throw new TypeError("callback provided to sync glob\nSee: https://github.com/isaacs/node-glob/issues/167");
      if (!(this instanceof GlobSync))
        return new GlobSync(pattern, options);
      setopts(this, pattern, options);
      if (this.noprocess)
        return this;
      var n = this.minimatch.set.length;
      this.matches = new Array(n);
      for (var i = 0; i < n; i++) {
        this._process(this.minimatch.set[i], i, false);
      }
      this._finish();
    }
    GlobSync.prototype._finish = function() {
      assert.ok(this instanceof GlobSync);
      if (this.realpath) {
        var self = this;
        this.matches.forEach(function(matchset, index) {
          var set = self.matches[index] = /* @__PURE__ */ Object.create(null);
          for (var p in matchset) {
            try {
              p = self._makeAbs(p);
              var real = rp.realpathSync(p, self.realpathCache);
              set[real] = true;
            } catch (er) {
              if (er.syscall === "stat")
                set[self._makeAbs(p)] = true;
              else
                throw er;
            }
          }
        });
      }
      common.finish(this);
    };
    GlobSync.prototype._process = function(pattern, index, inGlobStar) {
      assert.ok(this instanceof GlobSync);
      var n = 0;
      while (typeof pattern[n] === "string") {
        n++;
      }
      var prefix;
      switch (n) {
        case pattern.length:
          this._processSimple(pattern.join("/"), index);
          return;
        case 0:
          prefix = null;
          break;
        default:
          prefix = pattern.slice(0, n).join("/");
          break;
      }
      var remain = pattern.slice(n);
      var read;
      if (prefix === null)
        read = ".";
      else if (isAbsolute(prefix) || isAbsolute(pattern.map(function(p) {
        return typeof p === "string" ? p : "[*]";
      }).join("/"))) {
        if (!prefix || !isAbsolute(prefix))
          prefix = "/" + prefix;
        read = prefix;
      } else
        read = prefix;
      var abs = this._makeAbs(read);
      if (childrenIgnored(this, read))
        return;
      var isGlobStar = remain[0] === minimatch.GLOBSTAR;
      if (isGlobStar)
        this._processGlobStar(prefix, read, abs, remain, index, inGlobStar);
      else
        this._processReaddir(prefix, read, abs, remain, index, inGlobStar);
    };
    GlobSync.prototype._processReaddir = function(prefix, read, abs, remain, index, inGlobStar) {
      var entries = this._readdir(abs, inGlobStar);
      if (!entries)
        return;
      var pn = remain[0];
      var negate = !!this.minimatch.negate;
      var rawGlob = pn._glob;
      var dotOk = this.dot || rawGlob.charAt(0) === ".";
      var matchedEntries = [];
      for (var i = 0; i < entries.length; i++) {
        var e = entries[i];
        if (e.charAt(0) !== "." || dotOk) {
          var m;
          if (negate && !prefix) {
            m = !e.match(pn);
          } else {
            m = e.match(pn);
          }
          if (m)
            matchedEntries.push(e);
        }
      }
      var len = matchedEntries.length;
      if (len === 0)
        return;
      if (remain.length === 1 && !this.mark && !this.stat) {
        if (!this.matches[index])
          this.matches[index] = /* @__PURE__ */ Object.create(null);
        for (var i = 0; i < len; i++) {
          var e = matchedEntries[i];
          if (prefix) {
            if (prefix.slice(-1) !== "/")
              e = prefix + "/" + e;
            else
              e = prefix + e;
          }
          if (e.charAt(0) === "/" && !this.nomount) {
            e = path2.join(this.root, e);
          }
          this._emitMatch(index, e);
        }
        return;
      }
      remain.shift();
      for (var i = 0; i < len; i++) {
        var e = matchedEntries[i];
        var newPattern;
        if (prefix)
          newPattern = [prefix, e];
        else
          newPattern = [e];
        this._process(newPattern.concat(remain), index, inGlobStar);
      }
    };
    GlobSync.prototype._emitMatch = function(index, e) {
      if (isIgnored(this, e))
        return;
      var abs = this._makeAbs(e);
      if (this.mark)
        e = this._mark(e);
      if (this.absolute) {
        e = abs;
      }
      if (this.matches[index][e])
        return;
      if (this.nodir) {
        var c = this.cache[abs];
        if (c === "DIR" || Array.isArray(c))
          return;
      }
      this.matches[index][e] = true;
      if (this.stat)
        this._stat(e);
    };
    GlobSync.prototype._readdirInGlobStar = function(abs) {
      if (this.follow)
        return this._readdir(abs, false);
      var entries;
      var lstat;
      var stat;
      try {
        lstat = this.fs.lstatSync(abs);
      } catch (er) {
        if (er.code === "ENOENT") {
          return null;
        }
      }
      var isSym = lstat && lstat.isSymbolicLink();
      this.symlinks[abs] = isSym;
      if (!isSym && lstat && !lstat.isDirectory())
        this.cache[abs] = "FILE";
      else
        entries = this._readdir(abs, false);
      return entries;
    };
    GlobSync.prototype._readdir = function(abs, inGlobStar) {
      var entries;
      if (inGlobStar && !ownProp(this.symlinks, abs))
        return this._readdirInGlobStar(abs);
      if (ownProp(this.cache, abs)) {
        var c = this.cache[abs];
        if (!c || c === "FILE")
          return null;
        if (Array.isArray(c))
          return c;
      }
      try {
        return this._readdirEntries(abs, this.fs.readdirSync(abs));
      } catch (er) {
        this._readdirError(abs, er);
        return null;
      }
    };
    GlobSync.prototype._readdirEntries = function(abs, entries) {
      if (!this.mark && !this.stat) {
        for (var i = 0; i < entries.length; i++) {
          var e = entries[i];
          if (abs === "/")
            e = abs + e;
          else
            e = abs + "/" + e;
          this.cache[e] = true;
        }
      }
      this.cache[abs] = entries;
      return entries;
    };
    GlobSync.prototype._readdirError = function(f, er) {
      switch (er.code) {
        case "ENOTSUP":
        case "ENOTDIR":
          var abs = this._makeAbs(f);
          this.cache[abs] = "FILE";
          if (abs === this.cwdAbs) {
            var error2 = new Error(er.code + " invalid cwd " + this.cwd);
            error2.path = this.cwd;
            error2.code = er.code;
            throw error2;
          }
          break;
        case "ENOENT":
        case "ELOOP":
        case "ENAMETOOLONG":
        case "UNKNOWN":
          this.cache[this._makeAbs(f)] = false;
          break;
        default:
          this.cache[this._makeAbs(f)] = false;
          if (this.strict)
            throw er;
          if (!this.silent)
            console.error("glob error", er);
          break;
      }
    };
    GlobSync.prototype._processGlobStar = function(prefix, read, abs, remain, index, inGlobStar) {
      var entries = this._readdir(abs, inGlobStar);
      if (!entries)
        return;
      var remainWithoutGlobStar = remain.slice(1);
      var gspref = prefix ? [prefix] : [];
      var noGlobStar = gspref.concat(remainWithoutGlobStar);
      this._process(noGlobStar, index, false);
      var len = entries.length;
      var isSym = this.symlinks[abs];
      if (isSym && inGlobStar)
        return;
      for (var i = 0; i < len; i++) {
        var e = entries[i];
        if (e.charAt(0) === "." && !this.dot)
          continue;
        var instead = gspref.concat(entries[i], remainWithoutGlobStar);
        this._process(instead, index, true);
        var below = gspref.concat(entries[i], remain);
        this._process(below, index, true);
      }
    };
    GlobSync.prototype._processSimple = function(prefix, index) {
      var exists = this._stat(prefix);
      if (!this.matches[index])
        this.matches[index] = /* @__PURE__ */ Object.create(null);
      if (!exists)
        return;
      if (prefix && isAbsolute(prefix) && !this.nomount) {
        var trail = /[\/\\]$/.test(prefix);
        if (prefix.charAt(0) === "/") {
          prefix = path2.join(this.root, prefix);
        } else {
          prefix = path2.resolve(this.root, prefix);
          if (trail)
            prefix += "/";
        }
      }
      if (process.platform === "win32")
        prefix = prefix.replace(/\\/g, "/");
      this._emitMatch(index, prefix);
    };
    GlobSync.prototype._stat = function(f) {
      var abs = this._makeAbs(f);
      var needDir = f.slice(-1) === "/";
      if (f.length > this.maxLength)
        return false;
      if (!this.stat && ownProp(this.cache, abs)) {
        var c = this.cache[abs];
        if (Array.isArray(c))
          c = "DIR";
        if (!needDir || c === "DIR")
          return c;
        if (needDir && c === "FILE")
          return false;
      }
      var exists;
      var stat = this.statCache[abs];
      if (!stat) {
        var lstat;
        try {
          lstat = this.fs.lstatSync(abs);
        } catch (er) {
          if (er && (er.code === "ENOENT" || er.code === "ENOTDIR")) {
            this.statCache[abs] = false;
            return false;
          }
        }
        if (lstat && lstat.isSymbolicLink()) {
          try {
            stat = this.fs.statSync(abs);
          } catch (er) {
            stat = lstat;
          }
        } else {
          stat = lstat;
        }
      }
      this.statCache[abs] = stat;
      var c = true;
      if (stat)
        c = stat.isDirectory() ? "DIR" : "FILE";
      this.cache[abs] = this.cache[abs] || c;
      if (needDir && c === "FILE")
        return false;
      return c;
    };
    GlobSync.prototype._mark = function(p) {
      return common.mark(this, p);
    };
    GlobSync.prototype._makeAbs = function(f) {
      return common.makeAbs(this, f);
    };
  }
});

// node_modules/wrappy/wrappy.js
var require_wrappy = __commonJS({
  "node_modules/wrappy/wrappy.js"(exports, module2) {
    module2.exports = wrappy;
    function wrappy(fn, cb) {
      if (fn && cb)
        return wrappy(fn)(cb);
      if (typeof fn !== "function")
        throw new TypeError("need wrapper function");
      Object.keys(fn).forEach(function(k) {
        wrapper[k] = fn[k];
      });
      return wrapper;
      function wrapper() {
        var args = new Array(arguments.length);
        for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i];
        }
        var ret = fn.apply(this, args);
        var cb2 = args[args.length - 1];
        if (typeof ret === "function" && ret !== cb2) {
          Object.keys(cb2).forEach(function(k) {
            ret[k] = cb2[k];
          });
        }
        return ret;
      }
    }
  }
});

// node_modules/once/once.js
var require_once = __commonJS({
  "node_modules/once/once.js"(exports, module2) {
    var wrappy = require_wrappy();
    module2.exports = wrappy(once);
    module2.exports.strict = wrappy(onceStrict);
    once.proto = once(function() {
      Object.defineProperty(Function.prototype, "once", {
        value: function() {
          return once(this);
        },
        configurable: true
      });
      Object.defineProperty(Function.prototype, "onceStrict", {
        value: function() {
          return onceStrict(this);
        },
        configurable: true
      });
    });
    function once(fn) {
      var f = function() {
        if (f.called)
          return f.value;
        f.called = true;
        return f.value = fn.apply(this, arguments);
      };
      f.called = false;
      return f;
    }
    function onceStrict(fn) {
      var f = function() {
        if (f.called)
          throw new Error(f.onceError);
        f.called = true;
        return f.value = fn.apply(this, arguments);
      };
      var name = fn.name || "Function wrapped with `once`";
      f.onceError = name + " shouldn't be called more than once";
      f.called = false;
      return f;
    }
  }
});

// node_modules/inflight/inflight.js
var require_inflight = __commonJS({
  "node_modules/inflight/inflight.js"(exports, module2) {
    var wrappy = require_wrappy();
    var reqs = /* @__PURE__ */ Object.create(null);
    var once = require_once();
    module2.exports = wrappy(inflight);
    function inflight(key, cb) {
      if (reqs[key]) {
        reqs[key].push(cb);
        return null;
      } else {
        reqs[key] = [cb];
        return makeres(key);
      }
    }
    function makeres(key) {
      return once(function RES() {
        var cbs = reqs[key];
        var len = cbs.length;
        var args = slice(arguments);
        try {
          for (var i = 0; i < len; i++) {
            cbs[i].apply(null, args);
          }
        } finally {
          if (cbs.length > len) {
            cbs.splice(0, len);
            process.nextTick(function() {
              RES.apply(null, args);
            });
          } else {
            delete reqs[key];
          }
        }
      });
    }
    function slice(args) {
      var length = args.length;
      var array = [];
      for (var i = 0; i < length; i++)
        array[i] = args[i];
      return array;
    }
  }
});

// node_modules/glob/glob.js
var require_glob = __commonJS({
  "node_modules/glob/glob.js"(exports, module2) {
    module2.exports = glob;
    var rp = require_fs2();
    var minimatch = require_minimatch();
    var Minimatch = minimatch.Minimatch;
    var inherits = require_inherits();
    var EE = require("events").EventEmitter;
    var path2 = require("path");
    var assert = require("assert");
    var isAbsolute = require_path_is_absolute();
    var globSync = require_sync();
    var common = require_common();
    var setopts = common.setopts;
    var ownProp = common.ownProp;
    var inflight = require_inflight();
    var util = require("util");
    var childrenIgnored = common.childrenIgnored;
    var isIgnored = common.isIgnored;
    var once = require_once();
    function glob(pattern, options, cb) {
      if (typeof options === "function")
        cb = options, options = {};
      if (!options)
        options = {};
      if (options.sync) {
        if (cb)
          throw new TypeError("callback provided to sync glob");
        return globSync(pattern, options);
      }
      return new Glob(pattern, options, cb);
    }
    glob.sync = globSync;
    var GlobSync = glob.GlobSync = globSync.GlobSync;
    glob.glob = glob;
    function extend(origin, add) {
      if (add === null || typeof add !== "object") {
        return origin;
      }
      var keys = Object.keys(add);
      var i = keys.length;
      while (i--) {
        origin[keys[i]] = add[keys[i]];
      }
      return origin;
    }
    glob.hasMagic = function(pattern, options_) {
      var options = extend({}, options_);
      options.noprocess = true;
      var g = new Glob(pattern, options);
      var set = g.minimatch.set;
      if (!pattern)
        return false;
      if (set.length > 1)
        return true;
      for (var j = 0; j < set[0].length; j++) {
        if (typeof set[0][j] !== "string")
          return true;
      }
      return false;
    };
    glob.Glob = Glob;
    inherits(Glob, EE);
    function Glob(pattern, options, cb) {
      if (typeof options === "function") {
        cb = options;
        options = null;
      }
      if (options && options.sync) {
        if (cb)
          throw new TypeError("callback provided to sync glob");
        return new GlobSync(pattern, options);
      }
      if (!(this instanceof Glob))
        return new Glob(pattern, options, cb);
      setopts(this, pattern, options);
      this._didRealPath = false;
      var n = this.minimatch.set.length;
      this.matches = new Array(n);
      if (typeof cb === "function") {
        cb = once(cb);
        this.on("error", cb);
        this.on("end", function(matches) {
          cb(null, matches);
        });
      }
      var self = this;
      this._processing = 0;
      this._emitQueue = [];
      this._processQueue = [];
      this.paused = false;
      if (this.noprocess)
        return this;
      if (n === 0)
        return done();
      var sync = true;
      for (var i = 0; i < n; i++) {
        this._process(this.minimatch.set[i], i, false, done);
      }
      sync = false;
      function done() {
        --self._processing;
        if (self._processing <= 0) {
          if (sync) {
            process.nextTick(function() {
              self._finish();
            });
          } else {
            self._finish();
          }
        }
      }
    }
    Glob.prototype._finish = function() {
      assert(this instanceof Glob);
      if (this.aborted)
        return;
      if (this.realpath && !this._didRealpath)
        return this._realpath();
      common.finish(this);
      this.emit("end", this.found);
    };
    Glob.prototype._realpath = function() {
      if (this._didRealpath)
        return;
      this._didRealpath = true;
      var n = this.matches.length;
      if (n === 0)
        return this._finish();
      var self = this;
      for (var i = 0; i < this.matches.length; i++)
        this._realpathSet(i, next);
      function next() {
        if (--n === 0)
          self._finish();
      }
    };
    Glob.prototype._realpathSet = function(index, cb) {
      var matchset = this.matches[index];
      if (!matchset)
        return cb();
      var found = Object.keys(matchset);
      var self = this;
      var n = found.length;
      if (n === 0)
        return cb();
      var set = this.matches[index] = /* @__PURE__ */ Object.create(null);
      found.forEach(function(p, i) {
        p = self._makeAbs(p);
        rp.realpath(p, self.realpathCache, function(er, real) {
          if (!er)
            set[real] = true;
          else if (er.syscall === "stat")
            set[p] = true;
          else
            self.emit("error", er);
          if (--n === 0) {
            self.matches[index] = set;
            cb();
          }
        });
      });
    };
    Glob.prototype._mark = function(p) {
      return common.mark(this, p);
    };
    Glob.prototype._makeAbs = function(f) {
      return common.makeAbs(this, f);
    };
    Glob.prototype.abort = function() {
      this.aborted = true;
      this.emit("abort");
    };
    Glob.prototype.pause = function() {
      if (!this.paused) {
        this.paused = true;
        this.emit("pause");
      }
    };
    Glob.prototype.resume = function() {
      if (this.paused) {
        this.emit("resume");
        this.paused = false;
        if (this._emitQueue.length) {
          var eq = this._emitQueue.slice(0);
          this._emitQueue.length = 0;
          for (var i = 0; i < eq.length; i++) {
            var e = eq[i];
            this._emitMatch(e[0], e[1]);
          }
        }
        if (this._processQueue.length) {
          var pq = this._processQueue.slice(0);
          this._processQueue.length = 0;
          for (var i = 0; i < pq.length; i++) {
            var p = pq[i];
            this._processing--;
            this._process(p[0], p[1], p[2], p[3]);
          }
        }
      }
    };
    Glob.prototype._process = function(pattern, index, inGlobStar, cb) {
      assert(this instanceof Glob);
      assert(typeof cb === "function");
      if (this.aborted)
        return;
      this._processing++;
      if (this.paused) {
        this._processQueue.push([pattern, index, inGlobStar, cb]);
        return;
      }
      var n = 0;
      while (typeof pattern[n] === "string") {
        n++;
      }
      var prefix;
      switch (n) {
        case pattern.length:
          this._processSimple(pattern.join("/"), index, cb);
          return;
        case 0:
          prefix = null;
          break;
        default:
          prefix = pattern.slice(0, n).join("/");
          break;
      }
      var remain = pattern.slice(n);
      var read;
      if (prefix === null)
        read = ".";
      else if (isAbsolute(prefix) || isAbsolute(pattern.map(function(p) {
        return typeof p === "string" ? p : "[*]";
      }).join("/"))) {
        if (!prefix || !isAbsolute(prefix))
          prefix = "/" + prefix;
        read = prefix;
      } else
        read = prefix;
      var abs = this._makeAbs(read);
      if (childrenIgnored(this, read))
        return cb();
      var isGlobStar = remain[0] === minimatch.GLOBSTAR;
      if (isGlobStar)
        this._processGlobStar(prefix, read, abs, remain, index, inGlobStar, cb);
      else
        this._processReaddir(prefix, read, abs, remain, index, inGlobStar, cb);
    };
    Glob.prototype._processReaddir = function(prefix, read, abs, remain, index, inGlobStar, cb) {
      var self = this;
      this._readdir(abs, inGlobStar, function(er, entries) {
        return self._processReaddir2(prefix, read, abs, remain, index, inGlobStar, entries, cb);
      });
    };
    Glob.prototype._processReaddir2 = function(prefix, read, abs, remain, index, inGlobStar, entries, cb) {
      if (!entries)
        return cb();
      var pn = remain[0];
      var negate = !!this.minimatch.negate;
      var rawGlob = pn._glob;
      var dotOk = this.dot || rawGlob.charAt(0) === ".";
      var matchedEntries = [];
      for (var i = 0; i < entries.length; i++) {
        var e = entries[i];
        if (e.charAt(0) !== "." || dotOk) {
          var m;
          if (negate && !prefix) {
            m = !e.match(pn);
          } else {
            m = e.match(pn);
          }
          if (m)
            matchedEntries.push(e);
        }
      }
      var len = matchedEntries.length;
      if (len === 0)
        return cb();
      if (remain.length === 1 && !this.mark && !this.stat) {
        if (!this.matches[index])
          this.matches[index] = /* @__PURE__ */ Object.create(null);
        for (var i = 0; i < len; i++) {
          var e = matchedEntries[i];
          if (prefix) {
            if (prefix !== "/")
              e = prefix + "/" + e;
            else
              e = prefix + e;
          }
          if (e.charAt(0) === "/" && !this.nomount) {
            e = path2.join(this.root, e);
          }
          this._emitMatch(index, e);
        }
        return cb();
      }
      remain.shift();
      for (var i = 0; i < len; i++) {
        var e = matchedEntries[i];
        var newPattern;
        if (prefix) {
          if (prefix !== "/")
            e = prefix + "/" + e;
          else
            e = prefix + e;
        }
        this._process([e].concat(remain), index, inGlobStar, cb);
      }
      cb();
    };
    Glob.prototype._emitMatch = function(index, e) {
      if (this.aborted)
        return;
      if (isIgnored(this, e))
        return;
      if (this.paused) {
        this._emitQueue.push([index, e]);
        return;
      }
      var abs = isAbsolute(e) ? e : this._makeAbs(e);
      if (this.mark)
        e = this._mark(e);
      if (this.absolute)
        e = abs;
      if (this.matches[index][e])
        return;
      if (this.nodir) {
        var c = this.cache[abs];
        if (c === "DIR" || Array.isArray(c))
          return;
      }
      this.matches[index][e] = true;
      var st = this.statCache[abs];
      if (st)
        this.emit("stat", e, st);
      this.emit("match", e);
    };
    Glob.prototype._readdirInGlobStar = function(abs, cb) {
      if (this.aborted)
        return;
      if (this.follow)
        return this._readdir(abs, false, cb);
      var lstatkey = "lstat\0" + abs;
      var self = this;
      var lstatcb = inflight(lstatkey, lstatcb_);
      if (lstatcb)
        self.fs.lstat(abs, lstatcb);
      function lstatcb_(er, lstat) {
        if (er && er.code === "ENOENT")
          return cb();
        var isSym = lstat && lstat.isSymbolicLink();
        self.symlinks[abs] = isSym;
        if (!isSym && lstat && !lstat.isDirectory()) {
          self.cache[abs] = "FILE";
          cb();
        } else
          self._readdir(abs, false, cb);
      }
    };
    Glob.prototype._readdir = function(abs, inGlobStar, cb) {
      if (this.aborted)
        return;
      cb = inflight("readdir\0" + abs + "\0" + inGlobStar, cb);
      if (!cb)
        return;
      if (inGlobStar && !ownProp(this.symlinks, abs))
        return this._readdirInGlobStar(abs, cb);
      if (ownProp(this.cache, abs)) {
        var c = this.cache[abs];
        if (!c || c === "FILE")
          return cb();
        if (Array.isArray(c))
          return cb(null, c);
      }
      var self = this;
      self.fs.readdir(abs, readdirCb(this, abs, cb));
    };
    function readdirCb(self, abs, cb) {
      return function(er, entries) {
        if (er)
          self._readdirError(abs, er, cb);
        else
          self._readdirEntries(abs, entries, cb);
      };
    }
    Glob.prototype._readdirEntries = function(abs, entries, cb) {
      if (this.aborted)
        return;
      if (!this.mark && !this.stat) {
        for (var i = 0; i < entries.length; i++) {
          var e = entries[i];
          if (abs === "/")
            e = abs + e;
          else
            e = abs + "/" + e;
          this.cache[e] = true;
        }
      }
      this.cache[abs] = entries;
      return cb(null, entries);
    };
    Glob.prototype._readdirError = function(f, er, cb) {
      if (this.aborted)
        return;
      switch (er.code) {
        case "ENOTSUP":
        case "ENOTDIR":
          var abs = this._makeAbs(f);
          this.cache[abs] = "FILE";
          if (abs === this.cwdAbs) {
            var error2 = new Error(er.code + " invalid cwd " + this.cwd);
            error2.path = this.cwd;
            error2.code = er.code;
            this.emit("error", error2);
            this.abort();
          }
          break;
        case "ENOENT":
        case "ELOOP":
        case "ENAMETOOLONG":
        case "UNKNOWN":
          this.cache[this._makeAbs(f)] = false;
          break;
        default:
          this.cache[this._makeAbs(f)] = false;
          if (this.strict) {
            this.emit("error", er);
            this.abort();
          }
          if (!this.silent)
            console.error("glob error", er);
          break;
      }
      return cb();
    };
    Glob.prototype._processGlobStar = function(prefix, read, abs, remain, index, inGlobStar, cb) {
      var self = this;
      this._readdir(abs, inGlobStar, function(er, entries) {
        self._processGlobStar2(prefix, read, abs, remain, index, inGlobStar, entries, cb);
      });
    };
    Glob.prototype._processGlobStar2 = function(prefix, read, abs, remain, index, inGlobStar, entries, cb) {
      if (!entries)
        return cb();
      var remainWithoutGlobStar = remain.slice(1);
      var gspref = prefix ? [prefix] : [];
      var noGlobStar = gspref.concat(remainWithoutGlobStar);
      this._process(noGlobStar, index, false, cb);
      var isSym = this.symlinks[abs];
      var len = entries.length;
      if (isSym && inGlobStar)
        return cb();
      for (var i = 0; i < len; i++) {
        var e = entries[i];
        if (e.charAt(0) === "." && !this.dot)
          continue;
        var instead = gspref.concat(entries[i], remainWithoutGlobStar);
        this._process(instead, index, true, cb);
        var below = gspref.concat(entries[i], remain);
        this._process(below, index, true, cb);
      }
      cb();
    };
    Glob.prototype._processSimple = function(prefix, index, cb) {
      var self = this;
      this._stat(prefix, function(er, exists) {
        self._processSimple2(prefix, index, er, exists, cb);
      });
    };
    Glob.prototype._processSimple2 = function(prefix, index, er, exists, cb) {
      if (!this.matches[index])
        this.matches[index] = /* @__PURE__ */ Object.create(null);
      if (!exists)
        return cb();
      if (prefix && isAbsolute(prefix) && !this.nomount) {
        var trail = /[\/\\]$/.test(prefix);
        if (prefix.charAt(0) === "/") {
          prefix = path2.join(this.root, prefix);
        } else {
          prefix = path2.resolve(this.root, prefix);
          if (trail)
            prefix += "/";
        }
      }
      if (process.platform === "win32")
        prefix = prefix.replace(/\\/g, "/");
      this._emitMatch(index, prefix);
      cb();
    };
    Glob.prototype._stat = function(f, cb) {
      var abs = this._makeAbs(f);
      var needDir = f.slice(-1) === "/";
      if (f.length > this.maxLength)
        return cb();
      if (!this.stat && ownProp(this.cache, abs)) {
        var c = this.cache[abs];
        if (Array.isArray(c))
          c = "DIR";
        if (!needDir || c === "DIR")
          return cb(null, c);
        if (needDir && c === "FILE")
          return cb();
      }
      var exists;
      var stat = this.statCache[abs];
      if (stat !== void 0) {
        if (stat === false)
          return cb(null, stat);
        else {
          var type = stat.isDirectory() ? "DIR" : "FILE";
          if (needDir && type === "FILE")
            return cb();
          else
            return cb(null, type, stat);
        }
      }
      var self = this;
      var statcb = inflight("stat\0" + abs, lstatcb_);
      if (statcb)
        self.fs.lstat(abs, statcb);
      function lstatcb_(er, lstat) {
        if (lstat && lstat.isSymbolicLink()) {
          return self.fs.stat(abs, function(er2, stat2) {
            if (er2)
              self._stat2(f, abs, null, lstat, cb);
            else
              self._stat2(f, abs, er2, stat2, cb);
          });
        } else {
          self._stat2(f, abs, er, lstat, cb);
        }
      }
    };
    Glob.prototype._stat2 = function(f, abs, er, stat, cb) {
      if (er && (er.code === "ENOENT" || er.code === "ENOTDIR")) {
        this.statCache[abs] = false;
        return cb();
      }
      var needDir = f.slice(-1) === "/";
      this.statCache[abs] = stat;
      if (abs.slice(-1) === "/" && stat && !stat.isDirectory())
        return cb(null, false, stat);
      var c = true;
      if (stat)
        c = stat.isDirectory() ? "DIR" : "FILE";
      this.cache[abs] = this.cache[abs] || c;
      if (needDir && c === "FILE")
        return cb();
      return cb(null, c, stat);
    };
  }
});

// node_modules/fs-jetpack/node_modules/rimraf/rimraf.js
var require_rimraf = __commonJS({
  "node_modules/fs-jetpack/node_modules/rimraf/rimraf.js"(exports, module2) {
    module2.exports = rimraf;
    rimraf.sync = rimrafSync;
    var assert = require("assert");
    var path2 = require("path");
    var fs = require("fs");
    var glob = void 0;
    try {
      glob = require_glob();
    } catch (_err) {
    }
    var _0666 = parseInt("666", 8);
    var defaultGlobOpts = {
      nosort: true,
      silent: true
    };
    var timeout = 0;
    var isWindows = process.platform === "win32";
    function defaults(options) {
      var methods = [
        "unlink",
        "chmod",
        "stat",
        "lstat",
        "rmdir",
        "readdir"
      ];
      methods.forEach(function(m) {
        options[m] = options[m] || fs[m];
        m = m + "Sync";
        options[m] = options[m] || fs[m];
      });
      options.maxBusyTries = options.maxBusyTries || 3;
      options.emfileWait = options.emfileWait || 1e3;
      if (options.glob === false) {
        options.disableGlob = true;
      }
      if (options.disableGlob !== true && glob === void 0) {
        throw Error("glob dependency not found, set `options.disableGlob = true` if intentional");
      }
      options.disableGlob = options.disableGlob || false;
      options.glob = options.glob || defaultGlobOpts;
    }
    function rimraf(p, options, cb) {
      if (typeof options === "function") {
        cb = options;
        options = {};
      }
      assert(p, "rimraf: missing path");
      assert.equal(typeof p, "string", "rimraf: path should be a string");
      assert.equal(typeof cb, "function", "rimraf: callback function required");
      assert(options, "rimraf: invalid options argument provided");
      assert.equal(typeof options, "object", "rimraf: options should be object");
      defaults(options);
      var busyTries = 0;
      var errState = null;
      var n = 0;
      if (options.disableGlob || !glob.hasMagic(p))
        return afterGlob(null, [p]);
      options.lstat(p, function(er, stat) {
        if (!er)
          return afterGlob(null, [p]);
        glob(p, options.glob, afterGlob);
      });
      function next(er) {
        errState = errState || er;
        if (--n === 0)
          cb(errState);
      }
      function afterGlob(er, results) {
        if (er)
          return cb(er);
        n = results.length;
        if (n === 0)
          return cb();
        results.forEach(function(p2) {
          rimraf_(p2, options, function CB(er2) {
            if (er2) {
              if ((er2.code === "EBUSY" || er2.code === "ENOTEMPTY" || er2.code === "EPERM") && busyTries < options.maxBusyTries) {
                busyTries++;
                var time = busyTries * 100;
                return setTimeout(function() {
                  rimraf_(p2, options, CB);
                }, time);
              }
              if (er2.code === "EMFILE" && timeout < options.emfileWait) {
                return setTimeout(function() {
                  rimraf_(p2, options, CB);
                }, timeout++);
              }
              if (er2.code === "ENOENT")
                er2 = null;
            }
            timeout = 0;
            next(er2);
          });
        });
      }
    }
    function rimraf_(p, options, cb) {
      assert(p);
      assert(options);
      assert(typeof cb === "function");
      options.lstat(p, function(er, st) {
        if (er && er.code === "ENOENT")
          return cb(null);
        if (er && er.code === "EPERM" && isWindows)
          fixWinEPERM(p, options, er, cb);
        if (st && st.isDirectory())
          return rmdir(p, options, er, cb);
        options.unlink(p, function(er2) {
          if (er2) {
            if (er2.code === "ENOENT")
              return cb(null);
            if (er2.code === "EPERM")
              return isWindows ? fixWinEPERM(p, options, er2, cb) : rmdir(p, options, er2, cb);
            if (er2.code === "EISDIR")
              return rmdir(p, options, er2, cb);
          }
          return cb(er2);
        });
      });
    }
    function fixWinEPERM(p, options, er, cb) {
      assert(p);
      assert(options);
      assert(typeof cb === "function");
      if (er)
        assert(er instanceof Error);
      options.chmod(p, _0666, function(er2) {
        if (er2)
          cb(er2.code === "ENOENT" ? null : er);
        else
          options.stat(p, function(er3, stats) {
            if (er3)
              cb(er3.code === "ENOENT" ? null : er);
            else if (stats.isDirectory())
              rmdir(p, options, er, cb);
            else
              options.unlink(p, cb);
          });
      });
    }
    function fixWinEPERMSync(p, options, er) {
      assert(p);
      assert(options);
      if (er)
        assert(er instanceof Error);
      try {
        options.chmodSync(p, _0666);
      } catch (er2) {
        if (er2.code === "ENOENT")
          return;
        else
          throw er;
      }
      try {
        var stats = options.statSync(p);
      } catch (er3) {
        if (er3.code === "ENOENT")
          return;
        else
          throw er;
      }
      if (stats.isDirectory())
        rmdirSync(p, options, er);
      else
        options.unlinkSync(p);
    }
    function rmdir(p, options, originalEr, cb) {
      assert(p);
      assert(options);
      if (originalEr)
        assert(originalEr instanceof Error);
      assert(typeof cb === "function");
      options.rmdir(p, function(er) {
        if (er && (er.code === "ENOTEMPTY" || er.code === "EEXIST" || er.code === "EPERM"))
          rmkids(p, options, cb);
        else if (er && er.code === "ENOTDIR")
          cb(originalEr);
        else
          cb(er);
      });
    }
    function rmkids(p, options, cb) {
      assert(p);
      assert(options);
      assert(typeof cb === "function");
      options.readdir(p, function(er, files) {
        if (er)
          return cb(er);
        var n = files.length;
        if (n === 0)
          return options.rmdir(p, cb);
        var errState;
        files.forEach(function(f) {
          rimraf(path2.join(p, f), options, function(er2) {
            if (errState)
              return;
            if (er2)
              return cb(errState = er2);
            if (--n === 0)
              options.rmdir(p, cb);
          });
        });
      });
    }
    function rimrafSync(p, options) {
      options = options || {};
      defaults(options);
      assert(p, "rimraf: missing path");
      assert.equal(typeof p, "string", "rimraf: path should be a string");
      assert(options, "rimraf: missing options");
      assert.equal(typeof options, "object", "rimraf: options should be object");
      var results;
      if (options.disableGlob || !glob.hasMagic(p)) {
        results = [p];
      } else {
        try {
          options.lstatSync(p);
          results = [p];
        } catch (er) {
          results = glob.sync(p, options.glob);
        }
      }
      if (!results.length)
        return;
      for (var i = 0; i < results.length; i++) {
        var p = results[i];
        try {
          var st = options.lstatSync(p);
        } catch (er) {
          if (er.code === "ENOENT")
            return;
          if (er.code === "EPERM" && isWindows)
            fixWinEPERMSync(p, options, er);
        }
        try {
          if (st && st.isDirectory())
            rmdirSync(p, options, null);
          else
            options.unlinkSync(p);
        } catch (er) {
          if (er.code === "ENOENT")
            return;
          if (er.code === "EPERM")
            return isWindows ? fixWinEPERMSync(p, options, er) : rmdirSync(p, options, er);
          if (er.code !== "EISDIR")
            throw er;
          rmdirSync(p, options, er);
        }
      }
    }
    function rmdirSync(p, options, originalEr) {
      assert(p);
      assert(options);
      if (originalEr)
        assert(originalEr instanceof Error);
      try {
        options.rmdirSync(p);
      } catch (er) {
        if (er.code === "ENOENT")
          return;
        if (er.code === "ENOTDIR")
          throw originalEr;
        if (er.code === "ENOTEMPTY" || er.code === "EEXIST" || er.code === "EPERM")
          rmkidsSync(p, options);
      }
    }
    function rmkidsSync(p, options) {
      assert(p);
      assert(options);
      options.readdirSync(p).forEach(function(f) {
        rimrafSync(path2.join(p, f), options);
      });
      var retries = isWindows ? 100 : 1;
      var i = 0;
      do {
        var threw = true;
        try {
          var ret = options.rmdirSync(p, options);
          threw = false;
          return ret;
        } finally {
          if (++i < retries && threw)
            continue;
        }
      } while (true);
    }
  }
});

// node_modules/fs-jetpack/lib/remove.js
var require_remove = __commonJS({
  "node_modules/fs-jetpack/lib/remove.js"(exports) {
    "use strict";
    var rimraf = require_rimraf();
    var promisify = require_promisify();
    var promisifiedRimraf = promisify(rimraf);
    var validate = require_validate2();
    var validateInput = (methodName, path2) => {
      const methodSignature = `${methodName}([path])`;
      validate.argument(methodSignature, "path", path2, ["string", "undefined"]);
    };
    var removeSync = (path2) => {
      rimraf.sync(path2, { disableGlob: true });
    };
    var removeAsync = (path2) => {
      return promisifiedRimraf(path2, { disableGlob: true });
    };
    exports.validateInput = validateInput;
    exports.sync = removeSync;
    exports.async = removeAsync;
  }
});

// node_modules/fs-jetpack/lib/dir.js
var require_dir = __commonJS({
  "node_modules/fs-jetpack/lib/dir.js"(exports) {
    "use strict";
    var pathUtil = require("path");
    var fs = require_fs();
    var modeUtil = require_mode();
    var validate = require_validate2();
    var remove = require_remove();
    var validateInput = (methodName, path2, criteria) => {
      const methodSignature = `${methodName}(path, [criteria])`;
      validate.argument(methodSignature, "path", path2, ["string"]);
      validate.options(methodSignature, "criteria", criteria, {
        empty: ["boolean"],
        mode: ["string", "number"]
      });
    };
    var getCriteriaDefaults = (passedCriteria) => {
      const criteria = passedCriteria || {};
      if (typeof criteria.empty !== "boolean") {
        criteria.empty = false;
      }
      if (criteria.mode !== void 0) {
        criteria.mode = modeUtil.normalizeFileMode(criteria.mode);
      }
      return criteria;
    };
    var generatePathOccupiedByNotDirectoryError = (path2) => {
      return new Error(
        `Path ${path2} exists but is not a directory. Halting jetpack.dir() call for safety reasons.`
      );
    };
    var checkWhatAlreadyOccupiesPathSync = (path2) => {
      let stat;
      try {
        stat = fs.statSync(path2);
      } catch (err) {
        if (err.code !== "ENOENT") {
          throw err;
        }
      }
      if (stat && !stat.isDirectory()) {
        throw generatePathOccupiedByNotDirectoryError(path2);
      }
      return stat;
    };
    var createBrandNewDirectorySync = (path2, opts) => {
      const options = opts || {};
      try {
        fs.mkdirSync(path2, options.mode);
      } catch (err) {
        if (err.code === "ENOENT") {
          createBrandNewDirectorySync(pathUtil.dirname(path2), options);
          fs.mkdirSync(path2, options.mode);
        } else if (err.code === "EEXIST") {
        } else {
          throw err;
        }
      }
    };
    var checkExistingDirectoryFulfillsCriteriaSync = (path2, stat, criteria) => {
      const checkMode = () => {
        const mode = modeUtil.normalizeFileMode(stat.mode);
        if (criteria.mode !== void 0 && criteria.mode !== mode) {
          fs.chmodSync(path2, criteria.mode);
        }
      };
      const checkEmptiness = () => {
        if (criteria.empty) {
          const list = fs.readdirSync(path2);
          list.forEach((filename) => {
            remove.sync(pathUtil.resolve(path2, filename));
          });
        }
      };
      checkMode();
      checkEmptiness();
    };
    var dirSync = (path2, passedCriteria) => {
      const criteria = getCriteriaDefaults(passedCriteria);
      const stat = checkWhatAlreadyOccupiesPathSync(path2);
      if (stat) {
        checkExistingDirectoryFulfillsCriteriaSync(path2, stat, criteria);
      } else {
        createBrandNewDirectorySync(path2, criteria);
      }
    };
    var checkWhatAlreadyOccupiesPathAsync = (path2) => {
      return new Promise((resolve, reject) => {
        fs.stat(path2).then((stat) => {
          if (stat.isDirectory()) {
            resolve(stat);
          } else {
            reject(generatePathOccupiedByNotDirectoryError(path2));
          }
        }).catch((err) => {
          if (err.code === "ENOENT") {
            resolve(void 0);
          } else {
            reject(err);
          }
        });
      });
    };
    var emptyAsync = (path2) => {
      return new Promise((resolve, reject) => {
        fs.readdir(path2).then((list) => {
          const doOne = (index) => {
            if (index === list.length) {
              resolve();
            } else {
              const subPath = pathUtil.resolve(path2, list[index]);
              remove.async(subPath).then(() => {
                doOne(index + 1);
              });
            }
          };
          doOne(0);
        }).catch(reject);
      });
    };
    var checkExistingDirectoryFulfillsCriteriaAsync = (path2, stat, criteria) => {
      return new Promise((resolve, reject) => {
        const checkMode = () => {
          const mode = modeUtil.normalizeFileMode(stat.mode);
          if (criteria.mode !== void 0 && criteria.mode !== mode) {
            return fs.chmod(path2, criteria.mode);
          }
          return Promise.resolve();
        };
        const checkEmptiness = () => {
          if (criteria.empty) {
            return emptyAsync(path2);
          }
          return Promise.resolve();
        };
        checkMode().then(checkEmptiness).then(resolve, reject);
      });
    };
    var createBrandNewDirectoryAsync = (path2, opts) => {
      const options = opts || {};
      return new Promise((resolve, reject) => {
        fs.mkdir(path2, options.mode).then(resolve).catch((err) => {
          if (err.code === "ENOENT") {
            createBrandNewDirectoryAsync(pathUtil.dirname(path2), options).then(() => {
              return fs.mkdir(path2, options.mode);
            }).then(resolve).catch((err2) => {
              if (err2.code === "EEXIST") {
                resolve();
              } else {
                reject(err2);
              }
            });
          } else if (err.code === "EEXIST") {
            resolve();
          } else {
            reject(err);
          }
        });
      });
    };
    var dirAsync = (path2, passedCriteria) => {
      return new Promise((resolve, reject) => {
        const criteria = getCriteriaDefaults(passedCriteria);
        checkWhatAlreadyOccupiesPathAsync(path2).then((stat) => {
          if (stat !== void 0) {
            return checkExistingDirectoryFulfillsCriteriaAsync(
              path2,
              stat,
              criteria
            );
          }
          return createBrandNewDirectoryAsync(path2, criteria);
        }).then(resolve, reject);
      });
    };
    exports.validateInput = validateInput;
    exports.sync = dirSync;
    exports.createSync = createBrandNewDirectorySync;
    exports.async = dirAsync;
    exports.createAsync = createBrandNewDirectoryAsync;
  }
});

// node_modules/fs-jetpack/lib/write.js
var require_write = __commonJS({
  "node_modules/fs-jetpack/lib/write.js"(exports) {
    "use strict";
    var pathUtil = require("path");
    var fs = require_fs();
    var validate = require_validate2();
    var dir = require_dir();
    var validateInput = (methodName, path2, data, options) => {
      const methodSignature = `${methodName}(path, data, [options])`;
      validate.argument(methodSignature, "path", path2, ["string"]);
      validate.argument(methodSignature, "data", data, [
        "string",
        "buffer",
        "object",
        "array"
      ]);
      validate.options(methodSignature, "options", options, {
        mode: ["string", "number"],
        atomic: ["boolean"],
        jsonIndent: ["number"]
      });
    };
    var newExt = ".__new__";
    var serializeToJsonMaybe = (data, jsonIndent) => {
      let indent = jsonIndent;
      if (typeof indent !== "number") {
        indent = 2;
      }
      if (typeof data === "object" && !Buffer.isBuffer(data) && data !== null) {
        return JSON.stringify(data, null, indent);
      }
      return data;
    };
    var writeFileSync = (path2, data, options) => {
      try {
        fs.writeFileSync(path2, data, options);
      } catch (err) {
        if (err.code === "ENOENT") {
          dir.createSync(pathUtil.dirname(path2));
          fs.writeFileSync(path2, data, options);
        } else {
          throw err;
        }
      }
    };
    var writeAtomicSync = (path2, data, options) => {
      writeFileSync(path2 + newExt, data, options);
      fs.renameSync(path2 + newExt, path2);
    };
    var writeSync = (path2, data, options) => {
      const opts = options || {};
      const processedData = serializeToJsonMaybe(data, opts.jsonIndent);
      let writeStrategy = writeFileSync;
      if (opts.atomic) {
        writeStrategy = writeAtomicSync;
      }
      writeStrategy(path2, processedData, { mode: opts.mode });
    };
    var writeFileAsync = (path2, data, options) => {
      return new Promise((resolve, reject) => {
        fs.writeFile(path2, data, options).then(resolve).catch((err) => {
          if (err.code === "ENOENT") {
            dir.createAsync(pathUtil.dirname(path2)).then(() => {
              return fs.writeFile(path2, data, options);
            }).then(resolve, reject);
          } else {
            reject(err);
          }
        });
      });
    };
    var writeAtomicAsync = (path2, data, options) => {
      return new Promise((resolve, reject) => {
        writeFileAsync(path2 + newExt, data, options).then(() => {
          return fs.rename(path2 + newExt, path2);
        }).then(resolve, reject);
      });
    };
    var writeAsync = (path2, data, options) => {
      const opts = options || {};
      const processedData = serializeToJsonMaybe(data, opts.jsonIndent);
      let writeStrategy = writeFileAsync;
      if (opts.atomic) {
        writeStrategy = writeAtomicAsync;
      }
      return writeStrategy(path2, processedData, { mode: opts.mode });
    };
    exports.validateInput = validateInput;
    exports.sync = writeSync;
    exports.async = writeAsync;
  }
});

// node_modules/fs-jetpack/lib/append.js
var require_append = __commonJS({
  "node_modules/fs-jetpack/lib/append.js"(exports) {
    "use strict";
    var fs = require_fs();
    var write = require_write();
    var validate = require_validate2();
    var validateInput = (methodName, path2, data, options) => {
      const methodSignature = `${methodName}(path, data, [options])`;
      validate.argument(methodSignature, "path", path2, ["string"]);
      validate.argument(methodSignature, "data", data, ["string", "buffer"]);
      validate.options(methodSignature, "options", options, {
        mode: ["string", "number"]
      });
    };
    var appendSync = (path2, data, options) => {
      try {
        fs.appendFileSync(path2, data, options);
      } catch (err) {
        if (err.code === "ENOENT") {
          write.sync(path2, data, options);
        } else {
          throw err;
        }
      }
    };
    var appendAsync = (path2, data, options) => {
      return new Promise((resolve, reject) => {
        fs.appendFile(path2, data, options).then(resolve).catch((err) => {
          if (err.code === "ENOENT") {
            write.async(path2, data, options).then(resolve, reject);
          } else {
            reject(err);
          }
        });
      });
    };
    exports.validateInput = validateInput;
    exports.sync = appendSync;
    exports.async = appendAsync;
  }
});

// node_modules/fs-jetpack/lib/file.js
var require_file = __commonJS({
  "node_modules/fs-jetpack/lib/file.js"(exports) {
    "use strict";
    var fs = require_fs();
    var modeUtil = require_mode();
    var validate = require_validate2();
    var write = require_write();
    var validateInput = (methodName, path2, criteria) => {
      const methodSignature = `${methodName}(path, [criteria])`;
      validate.argument(methodSignature, "path", path2, ["string"]);
      validate.options(methodSignature, "criteria", criteria, {
        content: ["string", "buffer", "object", "array"],
        jsonIndent: ["number"],
        mode: ["string", "number"]
      });
    };
    var getCriteriaDefaults = (passedCriteria) => {
      const criteria = passedCriteria || {};
      if (criteria.mode !== void 0) {
        criteria.mode = modeUtil.normalizeFileMode(criteria.mode);
      }
      return criteria;
    };
    var generatePathOccupiedByNotFileError = (path2) => {
      return new Error(
        `Path ${path2} exists but is not a file. Halting jetpack.file() call for safety reasons.`
      );
    };
    var checkWhatAlreadyOccupiesPathSync = (path2) => {
      let stat;
      try {
        stat = fs.statSync(path2);
      } catch (err) {
        if (err.code !== "ENOENT") {
          throw err;
        }
      }
      if (stat && !stat.isFile()) {
        throw generatePathOccupiedByNotFileError(path2);
      }
      return stat;
    };
    var checkExistingFileFulfillsCriteriaSync = (path2, stat, criteria) => {
      const mode = modeUtil.normalizeFileMode(stat.mode);
      const checkContent = () => {
        if (criteria.content !== void 0) {
          write.sync(path2, criteria.content, {
            mode,
            jsonIndent: criteria.jsonIndent
          });
          return true;
        }
        return false;
      };
      const checkMode = () => {
        if (criteria.mode !== void 0 && criteria.mode !== mode) {
          fs.chmodSync(path2, criteria.mode);
        }
      };
      const contentReplaced = checkContent();
      if (!contentReplaced) {
        checkMode();
      }
    };
    var createBrandNewFileSync = (path2, criteria) => {
      let content = "";
      if (criteria.content !== void 0) {
        content = criteria.content;
      }
      write.sync(path2, content, {
        mode: criteria.mode,
        jsonIndent: criteria.jsonIndent
      });
    };
    var fileSync = (path2, passedCriteria) => {
      const criteria = getCriteriaDefaults(passedCriteria);
      const stat = checkWhatAlreadyOccupiesPathSync(path2);
      if (stat !== void 0) {
        checkExistingFileFulfillsCriteriaSync(path2, stat, criteria);
      } else {
        createBrandNewFileSync(path2, criteria);
      }
    };
    var checkWhatAlreadyOccupiesPathAsync = (path2) => {
      return new Promise((resolve, reject) => {
        fs.stat(path2).then((stat) => {
          if (stat.isFile()) {
            resolve(stat);
          } else {
            reject(generatePathOccupiedByNotFileError(path2));
          }
        }).catch((err) => {
          if (err.code === "ENOENT") {
            resolve(void 0);
          } else {
            reject(err);
          }
        });
      });
    };
    var checkExistingFileFulfillsCriteriaAsync = (path2, stat, criteria) => {
      const mode = modeUtil.normalizeFileMode(stat.mode);
      const checkContent = () => {
        return new Promise((resolve, reject) => {
          if (criteria.content !== void 0) {
            write.async(path2, criteria.content, {
              mode,
              jsonIndent: criteria.jsonIndent
            }).then(() => {
              resolve(true);
            }).catch(reject);
          } else {
            resolve(false);
          }
        });
      };
      const checkMode = () => {
        if (criteria.mode !== void 0 && criteria.mode !== mode) {
          return fs.chmod(path2, criteria.mode);
        }
        return void 0;
      };
      return checkContent().then((contentReplaced) => {
        if (!contentReplaced) {
          return checkMode();
        }
        return void 0;
      });
    };
    var createBrandNewFileAsync = (path2, criteria) => {
      let content = "";
      if (criteria.content !== void 0) {
        content = criteria.content;
      }
      return write.async(path2, content, {
        mode: criteria.mode,
        jsonIndent: criteria.jsonIndent
      });
    };
    var fileAsync = (path2, passedCriteria) => {
      return new Promise((resolve, reject) => {
        const criteria = getCriteriaDefaults(passedCriteria);
        checkWhatAlreadyOccupiesPathAsync(path2).then((stat) => {
          if (stat !== void 0) {
            return checkExistingFileFulfillsCriteriaAsync(path2, stat, criteria);
          }
          return createBrandNewFileAsync(path2, criteria);
        }).then(resolve, reject);
      });
    };
    exports.validateInput = validateInput;
    exports.sync = fileSync;
    exports.async = fileAsync;
  }
});

// node_modules/fs-jetpack/lib/inspect.js
var require_inspect = __commonJS({
  "node_modules/fs-jetpack/lib/inspect.js"(exports) {
    "use strict";
    var crypto = require("crypto");
    var pathUtil = require("path");
    var fs = require_fs();
    var validate = require_validate2();
    var supportedChecksumAlgorithms = ["md5", "sha1", "sha256", "sha512"];
    var symlinkOptions = ["report", "follow"];
    var validateInput = (methodName, path2, options) => {
      const methodSignature = `${methodName}(path, [options])`;
      validate.argument(methodSignature, "path", path2, ["string"]);
      validate.options(methodSignature, "options", options, {
        checksum: ["string"],
        mode: ["boolean"],
        times: ["boolean"],
        absolutePath: ["boolean"],
        symlinks: ["string"]
      });
      if (options && options.checksum !== void 0 && supportedChecksumAlgorithms.indexOf(options.checksum) === -1) {
        throw new Error(
          `Argument "options.checksum" passed to ${methodSignature} must have one of values: ${supportedChecksumAlgorithms.join(
            ", "
          )}`
        );
      }
      if (options && options.symlinks !== void 0 && symlinkOptions.indexOf(options.symlinks) === -1) {
        throw new Error(
          `Argument "options.symlinks" passed to ${methodSignature} must have one of values: ${symlinkOptions.join(
            ", "
          )}`
        );
      }
    };
    var createInspectObj = (path2, options, stat) => {
      const obj = {};
      obj.name = pathUtil.basename(path2);
      if (stat.isFile()) {
        obj.type = "file";
        obj.size = stat.size;
      } else if (stat.isDirectory()) {
        obj.type = "dir";
      } else if (stat.isSymbolicLink()) {
        obj.type = "symlink";
      } else {
        obj.type = "other";
      }
      if (options.mode) {
        obj.mode = stat.mode;
      }
      if (options.times) {
        obj.accessTime = stat.atime;
        obj.modifyTime = stat.mtime;
        obj.changeTime = stat.ctime;
      }
      if (options.absolutePath) {
        obj.absolutePath = path2;
      }
      return obj;
    };
    var fileChecksum = (path2, algo) => {
      const hash = crypto.createHash(algo);
      const data = fs.readFileSync(path2);
      hash.update(data);
      return hash.digest("hex");
    };
    var addExtraFieldsSync = (path2, inspectObj, options) => {
      if (inspectObj.type === "file" && options.checksum) {
        inspectObj[options.checksum] = fileChecksum(path2, options.checksum);
      } else if (inspectObj.type === "symlink") {
        inspectObj.pointsAt = fs.readlinkSync(path2);
      }
    };
    var inspectSync = (path2, options) => {
      let statOperation = fs.lstatSync;
      let stat;
      const opts = options || {};
      if (opts.symlinks === "follow") {
        statOperation = fs.statSync;
      }
      try {
        stat = statOperation(path2);
      } catch (err) {
        if (err.code === "ENOENT") {
          return void 0;
        }
        throw err;
      }
      const inspectObj = createInspectObj(path2, opts, stat);
      addExtraFieldsSync(path2, inspectObj, opts);
      return inspectObj;
    };
    var fileChecksumAsync = (path2, algo) => {
      return new Promise((resolve, reject) => {
        const hash = crypto.createHash(algo);
        const s = fs.createReadStream(path2);
        s.on("data", (data) => {
          hash.update(data);
        });
        s.on("end", () => {
          resolve(hash.digest("hex"));
        });
        s.on("error", reject);
      });
    };
    var addExtraFieldsAsync = (path2, inspectObj, options) => {
      if (inspectObj.type === "file" && options.checksum) {
        return fileChecksumAsync(path2, options.checksum).then((checksum) => {
          inspectObj[options.checksum] = checksum;
          return inspectObj;
        });
      } else if (inspectObj.type === "symlink") {
        return fs.readlink(path2).then((linkPath) => {
          inspectObj.pointsAt = linkPath;
          return inspectObj;
        });
      }
      return Promise.resolve(inspectObj);
    };
    var inspectAsync = (path2, options) => {
      return new Promise((resolve, reject) => {
        let statOperation = fs.lstat;
        const opts = options || {};
        if (opts.symlinks === "follow") {
          statOperation = fs.stat;
        }
        statOperation(path2).then((stat) => {
          const inspectObj = createInspectObj(path2, opts, stat);
          addExtraFieldsAsync(path2, inspectObj, opts).then(resolve, reject);
        }).catch((err) => {
          if (err.code === "ENOENT") {
            resolve(void 0);
          } else {
            reject(err);
          }
        });
      });
    };
    exports.supportedChecksumAlgorithms = supportedChecksumAlgorithms;
    exports.symlinkOptions = symlinkOptions;
    exports.validateInput = validateInput;
    exports.sync = inspectSync;
    exports.async = inspectAsync;
  }
});

// node_modules/fs-jetpack/lib/list.js
var require_list = __commonJS({
  "node_modules/fs-jetpack/lib/list.js"(exports) {
    "use strict";
    var fs = require_fs();
    var validate = require_validate2();
    var validateInput = (methodName, path2) => {
      const methodSignature = `${methodName}(path)`;
      validate.argument(methodSignature, "path", path2, ["string", "undefined"]);
    };
    var listSync = (path2) => {
      try {
        return fs.readdirSync(path2);
      } catch (err) {
        if (err.code === "ENOENT") {
          return void 0;
        }
        throw err;
      }
    };
    var listAsync = (path2) => {
      return new Promise((resolve, reject) => {
        fs.readdir(path2).then((list) => {
          resolve(list);
        }).catch((err) => {
          if (err.code === "ENOENT") {
            resolve(void 0);
          } else {
            reject(err);
          }
        });
      });
    };
    exports.validateInput = validateInput;
    exports.sync = listSync;
    exports.async = listAsync;
  }
});

// node_modules/fs-jetpack/lib/utils/tree_walker.js
var require_tree_walker = __commonJS({
  "node_modules/fs-jetpack/lib/utils/tree_walker.js"(exports) {
    "use strict";
    var fs = require("fs");
    var pathUtil = require("path");
    var inspect = require_inspect();
    var list = require_list();
    var fileType = (dirent) => {
      if (dirent.isDirectory()) {
        return "dir";
      }
      if (dirent.isFile()) {
        return "file";
      }
      if (dirent.isSymbolicLink()) {
        return "symlink";
      }
      return "other";
    };
    var initialWalkSync = (path2, options, callback) => {
      if (options.maxLevelsDeep === void 0) {
        options.maxLevelsDeep = Infinity;
      }
      const performInspectOnEachNode = options.inspectOptions !== void 0;
      if (options.symlinks) {
        if (options.inspectOptions === void 0) {
          options.inspectOptions = { symlinks: options.symlinks };
        } else {
          options.inspectOptions.symlinks = options.symlinks;
        }
      }
      const walkSync = (path3, currentLevel) => {
        fs.readdirSync(path3, { withFileTypes: true }).forEach((direntItem) => {
          const withFileTypesNotSupported = typeof direntItem === "string";
          let fileItemPath;
          if (withFileTypesNotSupported) {
            fileItemPath = pathUtil.join(path3, direntItem);
          } else {
            fileItemPath = pathUtil.join(path3, direntItem.name);
          }
          let fileItem;
          if (performInspectOnEachNode) {
            fileItem = inspect.sync(fileItemPath, options.inspectOptions);
          } else if (withFileTypesNotSupported) {
            const inspectObject = inspect.sync(
              fileItemPath,
              options.inspectOptions
            );
            fileItem = { name: inspectObject.name, type: inspectObject.type };
          } else {
            const type = fileType(direntItem);
            if (type === "symlink" && options.symlinks === "follow") {
              const symlinkPointsTo = fs.statSync(fileItemPath);
              fileItem = { name: direntItem.name, type: fileType(symlinkPointsTo) };
            } else {
              fileItem = { name: direntItem.name, type };
            }
          }
          if (fileItem !== void 0) {
            callback(fileItemPath, fileItem);
            if (fileItem.type === "dir" && currentLevel < options.maxLevelsDeep) {
              walkSync(fileItemPath, currentLevel + 1);
            }
          }
        });
      };
      const item = inspect.sync(path2, options.inspectOptions);
      if (item) {
        if (performInspectOnEachNode) {
          callback(path2, item);
        } else {
          callback(path2, { name: item.name, type: item.type });
        }
        if (item.type === "dir") {
          walkSync(path2, 1);
        }
      } else {
        callback(path2, void 0);
      }
    };
    var maxConcurrentOperations = 5;
    var initialWalkAsync = (path2, options, callback, doneCallback) => {
      if (options.maxLevelsDeep === void 0) {
        options.maxLevelsDeep = Infinity;
      }
      const performInspectOnEachNode = options.inspectOptions !== void 0;
      if (options.symlinks) {
        if (options.inspectOptions === void 0) {
          options.inspectOptions = { symlinks: options.symlinks };
        } else {
          options.inspectOptions.symlinks = options.symlinks;
        }
      }
      const concurrentOperationsQueue = [];
      let nowDoingConcurrentOperations = 0;
      const checkConcurrentOperations = () => {
        if (concurrentOperationsQueue.length === 0 && nowDoingConcurrentOperations === 0) {
          doneCallback();
        } else if (concurrentOperationsQueue.length > 0 && nowDoingConcurrentOperations < maxConcurrentOperations) {
          const operation = concurrentOperationsQueue.pop();
          nowDoingConcurrentOperations += 1;
          operation();
        }
      };
      const whenConcurrencySlotAvailable = (operation) => {
        concurrentOperationsQueue.push(operation);
        checkConcurrentOperations();
      };
      const concurrentOperationDone = () => {
        nowDoingConcurrentOperations -= 1;
        checkConcurrentOperations();
      };
      const walkAsync = (path3, currentLevel) => {
        const goDeeperIfDir = (fileItemPath, fileItem) => {
          if (fileItem.type === "dir" && currentLevel < options.maxLevelsDeep) {
            walkAsync(fileItemPath, currentLevel + 1);
          }
        };
        whenConcurrencySlotAvailable(() => {
          fs.readdir(path3, { withFileTypes: true }, (err, files) => {
            if (err) {
              doneCallback(err);
            } else {
              files.forEach((direntItem) => {
                const withFileTypesNotSupported = typeof direntItem === "string";
                let fileItemPath;
                if (withFileTypesNotSupported) {
                  fileItemPath = pathUtil.join(path3, direntItem);
                } else {
                  fileItemPath = pathUtil.join(path3, direntItem.name);
                }
                if (performInspectOnEachNode || withFileTypesNotSupported) {
                  whenConcurrencySlotAvailable(() => {
                    inspect.async(fileItemPath, options.inspectOptions).then((fileItem) => {
                      if (fileItem !== void 0) {
                        if (performInspectOnEachNode) {
                          callback(fileItemPath, fileItem);
                        } else {
                          callback(fileItemPath, {
                            name: fileItem.name,
                            type: fileItem.type
                          });
                        }
                        goDeeperIfDir(fileItemPath, fileItem);
                      }
                      concurrentOperationDone();
                    }).catch((err2) => {
                      doneCallback(err2);
                    });
                  });
                } else {
                  const type = fileType(direntItem);
                  if (type === "symlink" && options.symlinks === "follow") {
                    whenConcurrencySlotAvailable(() => {
                      fs.stat(fileItemPath, (err2, symlinkPointsTo) => {
                        if (err2) {
                          doneCallback(err2);
                        } else {
                          const fileItem = {
                            name: direntItem.name,
                            type: fileType(symlinkPointsTo)
                          };
                          callback(fileItemPath, fileItem);
                          goDeeperIfDir(fileItemPath, fileItem);
                          concurrentOperationDone();
                        }
                      });
                    });
                  } else {
                    const fileItem = { name: direntItem.name, type };
                    callback(fileItemPath, fileItem);
                    goDeeperIfDir(fileItemPath, fileItem);
                  }
                }
              });
              concurrentOperationDone();
            }
          });
        });
      };
      inspect.async(path2, options.inspectOptions).then((item) => {
        if (item) {
          if (performInspectOnEachNode) {
            callback(path2, item);
          } else {
            callback(path2, { name: item.name, type: item.type });
          }
          if (item.type === "dir") {
            walkAsync(path2, 1);
          } else {
            doneCallback();
          }
        } else {
          callback(path2, void 0);
          doneCallback();
        }
      }).catch((err) => {
        doneCallback(err);
      });
    };
    exports.sync = initialWalkSync;
    exports.async = initialWalkAsync;
  }
});

// node_modules/fs-jetpack/lib/utils/matcher.js
var require_matcher = __commonJS({
  "node_modules/fs-jetpack/lib/utils/matcher.js"(exports) {
    "use strict";
    var Minimatch = require_minimatch().Minimatch;
    var convertPatternToAbsolutePath = (basePath, pattern) => {
      const hasSlash = pattern.indexOf("/") !== -1;
      const isAbsolute = /^!?\//.test(pattern);
      const isNegated = /^!/.test(pattern);
      let separator;
      if (!isAbsolute && hasSlash) {
        const patternWithoutFirstCharacters = pattern.replace(/^!/, "").replace(/^\.\//, "");
        if (/\/$/.test(basePath)) {
          separator = "";
        } else {
          separator = "/";
        }
        if (isNegated) {
          return `!${basePath}${separator}${patternWithoutFirstCharacters}`;
        }
        return `${basePath}${separator}${patternWithoutFirstCharacters}`;
      }
      return pattern;
    };
    exports.create = (basePath, patterns, ignoreCase) => {
      let normalizedPatterns;
      if (typeof patterns === "string") {
        normalizedPatterns = [patterns];
      } else {
        normalizedPatterns = patterns;
      }
      const matchers = normalizedPatterns.map((pattern) => {
        return convertPatternToAbsolutePath(basePath, pattern);
      }).map((pattern) => {
        return new Minimatch(pattern, {
          matchBase: true,
          nocomment: true,
          nocase: ignoreCase || false,
          dot: true
        });
      });
      const performMatch = (absolutePath) => {
        let mode = "matching";
        let weHaveMatch = false;
        let currentMatcher;
        let i;
        for (i = 0; i < matchers.length; i += 1) {
          currentMatcher = matchers[i];
          if (currentMatcher.negate) {
            mode = "negation";
            if (i === 0) {
              weHaveMatch = true;
            }
          }
          if (mode === "negation" && weHaveMatch && !currentMatcher.match(absolutePath)) {
            return false;
          }
          if (mode === "matching" && !weHaveMatch) {
            weHaveMatch = currentMatcher.match(absolutePath);
          }
        }
        return weHaveMatch;
      };
      return performMatch;
    };
  }
});

// node_modules/fs-jetpack/lib/find.js
var require_find = __commonJS({
  "node_modules/fs-jetpack/lib/find.js"(exports) {
    "use strict";
    var pathUtil = require("path");
    var treeWalker = require_tree_walker();
    var inspect = require_inspect();
    var matcher = require_matcher();
    var validate = require_validate2();
    var validateInput = (methodName, path2, options) => {
      const methodSignature = `${methodName}([path], options)`;
      validate.argument(methodSignature, "path", path2, ["string"]);
      validate.options(methodSignature, "options", options, {
        matching: ["string", "array of string"],
        filter: ["function"],
        files: ["boolean"],
        directories: ["boolean"],
        recursive: ["boolean"],
        ignoreCase: ["boolean"]
      });
    };
    var normalizeOptions = (options) => {
      const opts = options || {};
      if (opts.matching === void 0) {
        opts.matching = "*";
      }
      if (opts.files === void 0) {
        opts.files = true;
      }
      if (opts.ignoreCase === void 0) {
        opts.ignoreCase = false;
      }
      if (opts.directories === void 0) {
        opts.directories = false;
      }
      if (opts.recursive === void 0) {
        opts.recursive = true;
      }
      return opts;
    };
    var processFoundPaths = (foundPaths, cwd) => {
      return foundPaths.map((path2) => {
        return pathUtil.relative(cwd, path2);
      });
    };
    var generatePathDoesntExistError = (path2) => {
      const err = new Error(`Path you want to find stuff in doesn't exist ${path2}`);
      err.code = "ENOENT";
      return err;
    };
    var generatePathNotDirectoryError = (path2) => {
      const err = new Error(
        `Path you want to find stuff in must be a directory ${path2}`
      );
      err.code = "ENOTDIR";
      return err;
    };
    var findSync = (path2, options) => {
      const foundAbsolutePaths = [];
      const matchesAnyOfGlobs = matcher.create(
        path2,
        options.matching,
        options.ignoreCase
      );
      let maxLevelsDeep = Infinity;
      if (options.recursive === false) {
        maxLevelsDeep = 1;
      }
      treeWalker.sync(
        path2,
        { maxLevelsDeep, symlinks: "follow", inspectOptions: { times: true } },
        (itemPath, item) => {
          if (item && itemPath !== path2 && matchesAnyOfGlobs(itemPath)) {
            const weHaveMatch = item.type === "file" && options.files === true || item.type === "dir" && options.directories === true;
            if (weHaveMatch) {
              if (options.filter) {
                const passedThroughFilter = options.filter(item);
                if (passedThroughFilter) {
                  foundAbsolutePaths.push(itemPath);
                }
              } else {
                foundAbsolutePaths.push(itemPath);
              }
            }
          }
        }
      );
      foundAbsolutePaths.sort();
      return processFoundPaths(foundAbsolutePaths, options.cwd);
    };
    var findSyncInit = (path2, options) => {
      const entryPointInspect = inspect.sync(path2, { symlinks: "follow" });
      if (entryPointInspect === void 0) {
        throw generatePathDoesntExistError(path2);
      } else if (entryPointInspect.type !== "dir") {
        throw generatePathNotDirectoryError(path2);
      }
      return findSync(path2, normalizeOptions(options));
    };
    var findAsync = (path2, options) => {
      return new Promise((resolve, reject) => {
        const foundAbsolutePaths = [];
        const matchesAnyOfGlobs = matcher.create(
          path2,
          options.matching,
          options.ignoreCase
        );
        let maxLevelsDeep = Infinity;
        if (options.recursive === false) {
          maxLevelsDeep = 1;
        }
        let waitingForFiltersToFinish = 0;
        let treeWalkerDone = false;
        const maybeDone = () => {
          if (treeWalkerDone && waitingForFiltersToFinish === 0) {
            foundAbsolutePaths.sort();
            resolve(processFoundPaths(foundAbsolutePaths, options.cwd));
          }
        };
        treeWalker.async(
          path2,
          { maxLevelsDeep, symlinks: "follow", inspectOptions: { times: true } },
          (itemPath, item) => {
            if (item && itemPath !== path2 && matchesAnyOfGlobs(itemPath)) {
              const weHaveMatch = item.type === "file" && options.files === true || item.type === "dir" && options.directories === true;
              if (weHaveMatch) {
                if (options.filter) {
                  const passedThroughFilter = options.filter(item);
                  const isPromise = typeof passedThroughFilter.then === "function";
                  if (isPromise) {
                    waitingForFiltersToFinish += 1;
                    passedThroughFilter.then((passedThroughFilterResult) => {
                      if (passedThroughFilterResult) {
                        foundAbsolutePaths.push(itemPath);
                      }
                      waitingForFiltersToFinish -= 1;
                      maybeDone();
                    }).catch((err) => {
                      reject(err);
                    });
                  } else if (passedThroughFilter) {
                    foundAbsolutePaths.push(itemPath);
                  }
                } else {
                  foundAbsolutePaths.push(itemPath);
                }
              }
            }
          },
          (err) => {
            if (err) {
              reject(err);
            } else {
              treeWalkerDone = true;
              maybeDone();
            }
          }
        );
      });
    };
    var findAsyncInit = (path2, options) => {
      return inspect.async(path2, { symlinks: "follow" }).then((entryPointInspect) => {
        if (entryPointInspect === void 0) {
          throw generatePathDoesntExistError(path2);
        } else if (entryPointInspect.type !== "dir") {
          throw generatePathNotDirectoryError(path2);
        }
        return findAsync(path2, normalizeOptions(options));
      });
    };
    exports.validateInput = validateInput;
    exports.sync = findSyncInit;
    exports.async = findAsyncInit;
  }
});

// node_modules/fs-jetpack/lib/inspect_tree.js
var require_inspect_tree = __commonJS({
  "node_modules/fs-jetpack/lib/inspect_tree.js"(exports) {
    "use strict";
    var crypto = require("crypto");
    var pathUtil = require("path");
    var inspect = require_inspect();
    var list = require_list();
    var validate = require_validate2();
    var treeWalker = require_tree_walker();
    var validateInput = (methodName, path2, options) => {
      const methodSignature = `${methodName}(path, [options])`;
      validate.argument(methodSignature, "path", path2, ["string"]);
      validate.options(methodSignature, "options", options, {
        checksum: ["string"],
        relativePath: ["boolean"],
        times: ["boolean"],
        symlinks: ["string"]
      });
      if (options && options.checksum !== void 0 && inspect.supportedChecksumAlgorithms.indexOf(options.checksum) === -1) {
        throw new Error(
          `Argument "options.checksum" passed to ${methodSignature} must have one of values: ${inspect.supportedChecksumAlgorithms.join(
            ", "
          )}`
        );
      }
      if (options && options.symlinks !== void 0 && inspect.symlinkOptions.indexOf(options.symlinks) === -1) {
        throw new Error(
          `Argument "options.symlinks" passed to ${methodSignature} must have one of values: ${inspect.symlinkOptions.join(
            ", "
          )}`
        );
      }
    };
    var relativePathInTree = (parentInspectObj, inspectObj) => {
      if (parentInspectObj === void 0) {
        return ".";
      }
      return parentInspectObj.relativePath + "/" + inspectObj.name;
    };
    var checksumOfDir = (inspectList, algo) => {
      const hash = crypto.createHash(algo);
      inspectList.forEach((inspectObj) => {
        hash.update(inspectObj.name + inspectObj[algo]);
      });
      return hash.digest("hex");
    };
    var calculateTreeDependentProperties = (parentInspectObj, inspectObj, options) => {
      if (options.relativePath) {
        inspectObj.relativePath = relativePathInTree(parentInspectObj, inspectObj);
      }
      if (inspectObj.type === "dir") {
        inspectObj.children.forEach((childInspectObj) => {
          calculateTreeDependentProperties(inspectObj, childInspectObj, options);
        });
        inspectObj.size = 0;
        inspectObj.children.sort((a, b) => {
          if (a.type === "dir" && b.type === "file") {
            return -1;
          }
          if (a.type === "file" && b.type === "dir") {
            return 1;
          }
          return a.name.localeCompare(b.name);
        });
        inspectObj.children.forEach((child) => {
          inspectObj.size += child.size || 0;
        });
        if (options.checksum) {
          inspectObj[options.checksum] = checksumOfDir(
            inspectObj.children,
            options.checksum
          );
        }
      }
    };
    var findParentInTree = (treeNode, pathChain, item) => {
      const name = pathChain[0];
      if (pathChain.length > 1) {
        const itemInTreeForPathChain = treeNode.children.find((child) => {
          return child.name === name;
        });
        return findParentInTree(itemInTreeForPathChain, pathChain.slice(1), item);
      }
      return treeNode;
    };
    var inspectTreeSync = (path2, opts) => {
      const options = opts || {};
      let tree;
      treeWalker.sync(path2, { inspectOptions: options }, (itemPath, item) => {
        if (item) {
          if (item.type === "dir") {
            item.children = [];
          }
          const relativePath = pathUtil.relative(path2, itemPath);
          if (relativePath === "") {
            tree = item;
          } else {
            const parentItem = findParentInTree(
              tree,
              relativePath.split(pathUtil.sep),
              item
            );
            parentItem.children.push(item);
          }
        }
      });
      if (tree) {
        calculateTreeDependentProperties(void 0, tree, options);
      }
      return tree;
    };
    var inspectTreeAsync = (path2, opts) => {
      const options = opts || {};
      let tree;
      return new Promise((resolve, reject) => {
        treeWalker.async(
          path2,
          { inspectOptions: options },
          (itemPath, item) => {
            if (item) {
              if (item.type === "dir") {
                item.children = [];
              }
              const relativePath = pathUtil.relative(path2, itemPath);
              if (relativePath === "") {
                tree = item;
              } else {
                const parentItem = findParentInTree(
                  tree,
                  relativePath.split(pathUtil.sep),
                  item
                );
                parentItem.children.push(item);
              }
            }
          },
          (err) => {
            if (err) {
              reject(err);
            } else {
              if (tree) {
                calculateTreeDependentProperties(void 0, tree, options);
              }
              resolve(tree);
            }
          }
        );
      });
    };
    exports.validateInput = validateInput;
    exports.sync = inspectTreeSync;
    exports.async = inspectTreeAsync;
  }
});

// node_modules/fs-jetpack/lib/exists.js
var require_exists = __commonJS({
  "node_modules/fs-jetpack/lib/exists.js"(exports) {
    "use strict";
    var fs = require_fs();
    var validate = require_validate2();
    var validateInput = (methodName, path2) => {
      const methodSignature = `${methodName}(path)`;
      validate.argument(methodSignature, "path", path2, ["string"]);
    };
    var existsSync = (path2) => {
      try {
        const stat = fs.statSync(path2);
        if (stat.isDirectory()) {
          return "dir";
        } else if (stat.isFile()) {
          return "file";
        }
        return "other";
      } catch (err) {
        if (err.code !== "ENOENT") {
          throw err;
        }
      }
      return false;
    };
    var existsAsync = (path2) => {
      return new Promise((resolve, reject) => {
        fs.stat(path2).then((stat) => {
          if (stat.isDirectory()) {
            resolve("dir");
          } else if (stat.isFile()) {
            resolve("file");
          } else {
            resolve("other");
          }
        }).catch((err) => {
          if (err.code === "ENOENT") {
            resolve(false);
          } else {
            reject(err);
          }
        });
      });
    };
    exports.validateInput = validateInput;
    exports.sync = existsSync;
    exports.async = existsAsync;
  }
});

// node_modules/fs-jetpack/lib/copy.js
var require_copy = __commonJS({
  "node_modules/fs-jetpack/lib/copy.js"(exports) {
    "use strict";
    var pathUtil = require("path");
    var fs = require_fs();
    var dir = require_dir();
    var exists = require_exists();
    var inspect = require_inspect();
    var write = require_write();
    var matcher = require_matcher();
    var fileMode = require_mode();
    var treeWalker = require_tree_walker();
    var validate = require_validate2();
    var validateInput = (methodName, from, to, options) => {
      const methodSignature = `${methodName}(from, to, [options])`;
      validate.argument(methodSignature, "from", from, ["string"]);
      validate.argument(methodSignature, "to", to, ["string"]);
      validate.options(methodSignature, "options", options, {
        overwrite: ["boolean", "function"],
        matching: ["string", "array of string"],
        ignoreCase: ["boolean"]
      });
    };
    var parseOptions = (options, from) => {
      const opts = options || {};
      const parsedOptions = {};
      if (opts.ignoreCase === void 0) {
        opts.ignoreCase = false;
      }
      parsedOptions.overwrite = opts.overwrite;
      if (opts.matching) {
        parsedOptions.allowedToCopy = matcher.create(
          from,
          opts.matching,
          opts.ignoreCase
        );
      } else {
        parsedOptions.allowedToCopy = () => {
          return true;
        };
      }
      return parsedOptions;
    };
    var generateNoSourceError = (path2) => {
      const err = new Error(`Path to copy doesn't exist ${path2}`);
      err.code = "ENOENT";
      return err;
    };
    var generateDestinationExistsError = (path2) => {
      const err = new Error(`Destination path already exists ${path2}`);
      err.code = "EEXIST";
      return err;
    };
    var inspectOptions = {
      mode: true,
      symlinks: "report",
      times: true,
      absolutePath: true
    };
    var shouldThrowDestinationExistsError = (context) => {
      return typeof context.opts.overwrite !== "function" && context.opts.overwrite !== true;
    };
    var checksBeforeCopyingSync = (from, to, opts) => {
      if (!exists.sync(from)) {
        throw generateNoSourceError(from);
      }
      if (exists.sync(to) && !opts.overwrite) {
        throw generateDestinationExistsError(to);
      }
    };
    var canOverwriteItSync = (context) => {
      if (typeof context.opts.overwrite === "function") {
        const destInspectData = inspect.sync(context.destPath, inspectOptions);
        return context.opts.overwrite(context.srcInspectData, destInspectData);
      }
      return context.opts.overwrite === true;
    };
    var copyFileSync = (srcPath, destPath, mode, context) => {
      const data = fs.readFileSync(srcPath);
      try {
        fs.writeFileSync(destPath, data, { mode, flag: "wx" });
      } catch (err) {
        if (err.code === "ENOENT") {
          write.sync(destPath, data, { mode });
        } else if (err.code === "EEXIST") {
          if (canOverwriteItSync(context)) {
            fs.writeFileSync(destPath, data, { mode });
          } else if (shouldThrowDestinationExistsError(context)) {
            throw generateDestinationExistsError(context.destPath);
          }
        } else {
          throw err;
        }
      }
    };
    var copySymlinkSync = (from, to) => {
      const symlinkPointsAt = fs.readlinkSync(from);
      try {
        fs.symlinkSync(symlinkPointsAt, to);
      } catch (err) {
        if (err.code === "EEXIST") {
          fs.unlinkSync(to);
          fs.symlinkSync(symlinkPointsAt, to);
        } else {
          throw err;
        }
      }
    };
    var copyItemSync = (srcPath, srcInspectData, destPath, opts) => {
      const context = { srcPath, destPath, srcInspectData, opts };
      const mode = fileMode.normalizeFileMode(srcInspectData.mode);
      if (srcInspectData.type === "dir") {
        dir.createSync(destPath, { mode });
      } else if (srcInspectData.type === "file") {
        copyFileSync(srcPath, destPath, mode, context);
      } else if (srcInspectData.type === "symlink") {
        copySymlinkSync(srcPath, destPath);
      }
    };
    var copySync = (from, to, options) => {
      const opts = parseOptions(options, from);
      checksBeforeCopyingSync(from, to, opts);
      treeWalker.sync(from, { inspectOptions }, (srcPath, srcInspectData) => {
        const rel = pathUtil.relative(from, srcPath);
        const destPath = pathUtil.resolve(to, rel);
        if (opts.allowedToCopy(srcPath, destPath, srcInspectData)) {
          copyItemSync(srcPath, srcInspectData, destPath, opts);
        }
      });
    };
    var checksBeforeCopyingAsync = (from, to, opts) => {
      return exists.async(from).then((srcPathExists) => {
        if (!srcPathExists) {
          throw generateNoSourceError(from);
        } else {
          return exists.async(to);
        }
      }).then((destPathExists) => {
        if (destPathExists && !opts.overwrite) {
          throw generateDestinationExistsError(to);
        }
      });
    };
    var canOverwriteItAsync = (context) => {
      return new Promise((resolve, reject) => {
        if (typeof context.opts.overwrite === "function") {
          inspect.async(context.destPath, inspectOptions).then((destInspectData) => {
            resolve(
              context.opts.overwrite(context.srcInspectData, destInspectData)
            );
          }).catch(reject);
        } else {
          resolve(context.opts.overwrite === true);
        }
      });
    };
    var copyFileAsync = (srcPath, destPath, mode, context, runOptions) => {
      return new Promise((resolve, reject) => {
        const runOpts = runOptions || {};
        let flags = "wx";
        if (runOpts.overwrite) {
          flags = "w";
        }
        const readStream = fs.createReadStream(srcPath);
        const writeStream = fs.createWriteStream(destPath, { mode, flags });
        readStream.on("error", reject);
        writeStream.on("error", (err) => {
          readStream.resume();
          if (err.code === "ENOENT") {
            dir.createAsync(pathUtil.dirname(destPath)).then(() => {
              copyFileAsync(srcPath, destPath, mode, context).then(
                resolve,
                reject
              );
            }).catch(reject);
          } else if (err.code === "EEXIST") {
            canOverwriteItAsync(context).then((canOverwite) => {
              if (canOverwite) {
                copyFileAsync(srcPath, destPath, mode, context, {
                  overwrite: true
                }).then(resolve, reject);
              } else if (shouldThrowDestinationExistsError(context)) {
                reject(generateDestinationExistsError(destPath));
              } else {
                resolve();
              }
            }).catch(reject);
          } else {
            reject(err);
          }
        });
        writeStream.on("finish", resolve);
        readStream.pipe(writeStream);
      });
    };
    var copySymlinkAsync = (from, to) => {
      return fs.readlink(from).then((symlinkPointsAt) => {
        return new Promise((resolve, reject) => {
          fs.symlink(symlinkPointsAt, to).then(resolve).catch((err) => {
            if (err.code === "EEXIST") {
              fs.unlink(to).then(() => {
                return fs.symlink(symlinkPointsAt, to);
              }).then(resolve, reject);
            } else {
              reject(err);
            }
          });
        });
      });
    };
    var copyItemAsync = (srcPath, srcInspectData, destPath, opts) => {
      const context = { srcPath, destPath, srcInspectData, opts };
      const mode = fileMode.normalizeFileMode(srcInspectData.mode);
      if (srcInspectData.type === "dir") {
        return dir.createAsync(destPath, { mode });
      } else if (srcInspectData.type === "file") {
        return copyFileAsync(srcPath, destPath, mode, context);
      } else if (srcInspectData.type === "symlink") {
        return copySymlinkAsync(srcPath, destPath);
      }
      return Promise.resolve();
    };
    var copyAsync = (from, to, options) => {
      return new Promise((resolve, reject) => {
        const opts = parseOptions(options, from);
        checksBeforeCopyingAsync(from, to, opts).then(() => {
          let allFilesDelivered = false;
          let filesInProgress = 0;
          treeWalker.async(
            from,
            { inspectOptions },
            (srcPath, item) => {
              if (item) {
                const rel = pathUtil.relative(from, srcPath);
                const destPath = pathUtil.resolve(to, rel);
                if (opts.allowedToCopy(srcPath, item, destPath)) {
                  filesInProgress += 1;
                  copyItemAsync(srcPath, item, destPath, opts).then(() => {
                    filesInProgress -= 1;
                    if (allFilesDelivered && filesInProgress === 0) {
                      resolve();
                    }
                  }).catch(reject);
                }
              }
            },
            (err) => {
              if (err) {
                reject(err);
              } else {
                allFilesDelivered = true;
                if (allFilesDelivered && filesInProgress === 0) {
                  resolve();
                }
              }
            }
          );
        }).catch(reject);
      });
    };
    exports.validateInput = validateInput;
    exports.sync = copySync;
    exports.async = copyAsync;
  }
});

// node_modules/fs-jetpack/lib/move.js
var require_move = __commonJS({
  "node_modules/fs-jetpack/lib/move.js"(exports) {
    "use strict";
    var pathUtil = require("path");
    var fs = require_fs();
    var validate = require_validate2();
    var copy = require_copy();
    var dir = require_dir();
    var exists = require_exists();
    var remove = require_remove();
    var validateInput = (methodName, from, to, options) => {
      const methodSignature = `${methodName}(from, to, [options])`;
      validate.argument(methodSignature, "from", from, ["string"]);
      validate.argument(methodSignature, "to", to, ["string"]);
      validate.options(methodSignature, "options", options, {
        overwrite: ["boolean"]
      });
    };
    var parseOptions = (options) => {
      const opts = options || {};
      return opts;
    };
    var generateDestinationExistsError = (path2) => {
      const err = new Error(`Destination path already exists ${path2}`);
      err.code = "EEXIST";
      return err;
    };
    var generateSourceDoesntExistError = (path2) => {
      const err = new Error(`Path to move doesn't exist ${path2}`);
      err.code = "ENOENT";
      return err;
    };
    var moveSync = (from, to, options) => {
      const opts = parseOptions(options);
      if (exists.sync(to) !== false && opts.overwrite !== true) {
        throw generateDestinationExistsError(to);
      }
      try {
        fs.renameSync(from, to);
      } catch (err) {
        if (err.code === "EISDIR" || err.code === "EPERM") {
          remove.sync(to);
          fs.renameSync(from, to);
        } else if (err.code === "EXDEV") {
          copy.sync(from, to, { overwrite: true });
          remove.sync(from);
        } else if (err.code === "ENOENT") {
          if (!exists.sync(from)) {
            throw generateSourceDoesntExistError(from);
          }
          dir.createSync(pathUtil.dirname(to));
          fs.renameSync(from, to);
        } else {
          throw err;
        }
      }
    };
    var ensureDestinationPathExistsAsync = (to) => {
      return new Promise((resolve, reject) => {
        const destDir = pathUtil.dirname(to);
        exists.async(destDir).then((dstExists) => {
          if (!dstExists) {
            dir.createAsync(destDir).then(resolve, reject);
          } else {
            reject();
          }
        }).catch(reject);
      });
    };
    var moveAsync = (from, to, options) => {
      const opts = parseOptions(options);
      return new Promise((resolve, reject) => {
        exists.async(to).then((destinationExists) => {
          if (destinationExists !== false && opts.overwrite !== true) {
            reject(generateDestinationExistsError(to));
          } else {
            fs.rename(from, to).then(resolve).catch((err) => {
              if (err.code === "EISDIR" || err.code === "EPERM") {
                remove.async(to).then(() => fs.rename(from, to)).then(resolve, reject);
              } else if (err.code === "EXDEV") {
                copy.async(from, to, { overwrite: true }).then(() => remove.async(from)).then(resolve, reject);
              } else if (err.code === "ENOENT") {
                exists.async(from).then((srcExists) => {
                  if (!srcExists) {
                    reject(generateSourceDoesntExistError(from));
                  } else {
                    ensureDestinationPathExistsAsync(to).then(() => {
                      return fs.rename(from, to);
                    }).then(resolve, reject);
                  }
                }).catch(reject);
              } else {
                reject(err);
              }
            });
          }
        });
      });
    };
    exports.validateInput = validateInput;
    exports.sync = moveSync;
    exports.async = moveAsync;
  }
});

// node_modules/fs-jetpack/lib/read.js
var require_read = __commonJS({
  "node_modules/fs-jetpack/lib/read.js"(exports) {
    "use strict";
    var fs = require_fs();
    var validate = require_validate2();
    var supportedReturnAs = ["utf8", "buffer", "json", "jsonWithDates"];
    var validateInput = (methodName, path2, returnAs) => {
      const methodSignature = `${methodName}(path, returnAs)`;
      validate.argument(methodSignature, "path", path2, ["string"]);
      validate.argument(methodSignature, "returnAs", returnAs, [
        "string",
        "undefined"
      ]);
      if (returnAs && supportedReturnAs.indexOf(returnAs) === -1) {
        throw new Error(
          `Argument "returnAs" passed to ${methodSignature} must have one of values: ${supportedReturnAs.join(
            ", "
          )}`
        );
      }
    };
    var jsonDateParser = (key, value) => {
      const reISO = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*))(?:Z|(\+|-)([\d|:]*))?$/;
      if (typeof value === "string") {
        if (reISO.exec(value)) {
          return new Date(value);
        }
      }
      return value;
    };
    var makeNicerJsonParsingError = (path2, err) => {
      const nicerError = new Error(
        `JSON parsing failed while reading ${path2} [${err}]`
      );
      nicerError.originalError = err;
      return nicerError;
    };
    var readSync = (path2, returnAs) => {
      const retAs = returnAs || "utf8";
      let data;
      let encoding = "utf8";
      if (retAs === "buffer") {
        encoding = null;
      }
      try {
        data = fs.readFileSync(path2, { encoding });
      } catch (err) {
        if (err.code === "ENOENT") {
          return void 0;
        }
        throw err;
      }
      try {
        if (retAs === "json") {
          data = JSON.parse(data);
        } else if (retAs === "jsonWithDates") {
          data = JSON.parse(data, jsonDateParser);
        }
      } catch (err) {
        throw makeNicerJsonParsingError(path2, err);
      }
      return data;
    };
    var readAsync = (path2, returnAs) => {
      return new Promise((resolve, reject) => {
        const retAs = returnAs || "utf8";
        let encoding = "utf8";
        if (retAs === "buffer") {
          encoding = null;
        }
        fs.readFile(path2, { encoding }).then((data) => {
          try {
            if (retAs === "json") {
              resolve(JSON.parse(data));
            } else if (retAs === "jsonWithDates") {
              resolve(JSON.parse(data, jsonDateParser));
            } else {
              resolve(data);
            }
          } catch (err) {
            reject(makeNicerJsonParsingError(path2, err));
          }
        }).catch((err) => {
          if (err.code === "ENOENT") {
            resolve(void 0);
          } else {
            reject(err);
          }
        });
      });
    };
    exports.validateInput = validateInput;
    exports.sync = readSync;
    exports.async = readAsync;
  }
});

// node_modules/fs-jetpack/lib/rename.js
var require_rename = __commonJS({
  "node_modules/fs-jetpack/lib/rename.js"(exports) {
    "use strict";
    var pathUtil = require("path");
    var move = require_move();
    var validate = require_validate2();
    var validateInput = (methodName, path2, newName, options) => {
      const methodSignature = `${methodName}(path, newName, [options])`;
      validate.argument(methodSignature, "path", path2, ["string"]);
      validate.argument(methodSignature, "newName", newName, ["string"]);
      validate.options(methodSignature, "options", options, {
        overwrite: ["boolean"]
      });
      if (pathUtil.basename(newName) !== newName) {
        throw new Error(
          `Argument "newName" passed to ${methodSignature} should be a filename, not a path. Received "${newName}"`
        );
      }
    };
    var renameSync = (path2, newName, options) => {
      const newPath = pathUtil.join(pathUtil.dirname(path2), newName);
      move.sync(path2, newPath, options);
    };
    var renameAsync = (path2, newName, options) => {
      const newPath = pathUtil.join(pathUtil.dirname(path2), newName);
      return move.async(path2, newPath, options);
    };
    exports.validateInput = validateInput;
    exports.sync = renameSync;
    exports.async = renameAsync;
  }
});

// node_modules/fs-jetpack/lib/symlink.js
var require_symlink = __commonJS({
  "node_modules/fs-jetpack/lib/symlink.js"(exports) {
    "use strict";
    var pathUtil = require("path");
    var fs = require_fs();
    var validate = require_validate2();
    var dir = require_dir();
    var validateInput = (methodName, symlinkValue, path2) => {
      const methodSignature = `${methodName}(symlinkValue, path)`;
      validate.argument(methodSignature, "symlinkValue", symlinkValue, ["string"]);
      validate.argument(methodSignature, "path", path2, ["string"]);
    };
    var symlinkSync = (symlinkValue, path2) => {
      try {
        fs.symlinkSync(symlinkValue, path2);
      } catch (err) {
        if (err.code === "ENOENT") {
          dir.createSync(pathUtil.dirname(path2));
          fs.symlinkSync(symlinkValue, path2);
        } else {
          throw err;
        }
      }
    };
    var symlinkAsync = (symlinkValue, path2) => {
      return new Promise((resolve, reject) => {
        fs.symlink(symlinkValue, path2).then(resolve).catch((err) => {
          if (err.code === "ENOENT") {
            dir.createAsync(pathUtil.dirname(path2)).then(() => {
              return fs.symlink(symlinkValue, path2);
            }).then(resolve, reject);
          } else {
            reject(err);
          }
        });
      });
    };
    exports.validateInput = validateInput;
    exports.sync = symlinkSync;
    exports.async = symlinkAsync;
  }
});

// node_modules/fs-jetpack/lib/streams.js
var require_streams = __commonJS({
  "node_modules/fs-jetpack/lib/streams.js"(exports) {
    "use strict";
    var fs = require("fs");
    exports.createWriteStream = fs.createWriteStream;
    exports.createReadStream = fs.createReadStream;
  }
});

// node_modules/fs-jetpack/lib/tmp_dir.js
var require_tmp_dir = __commonJS({
  "node_modules/fs-jetpack/lib/tmp_dir.js"(exports) {
    "use strict";
    var pathUtil = require("path");
    var os = require("os");
    var crypto = require("crypto");
    var dir = require_dir();
    var fs = require_fs();
    var validate = require_validate2();
    var validateInput = (methodName, options) => {
      const methodSignature = `${methodName}([options])`;
      validate.options(methodSignature, "options", options, {
        prefix: ["string"],
        basePath: ["string"]
      });
    };
    var getOptionsDefaults = (passedOptions, cwdPath) => {
      passedOptions = passedOptions || {};
      const options = {};
      if (typeof passedOptions.prefix !== "string") {
        options.prefix = "";
      } else {
        options.prefix = passedOptions.prefix;
      }
      if (typeof passedOptions.basePath === "string") {
        options.basePath = pathUtil.resolve(cwdPath, passedOptions.basePath);
      } else {
        options.basePath = os.tmpdir();
      }
      return options;
    };
    var randomStringLength = 32;
    var tmpDirSync = (cwdPath, passedOptions) => {
      const options = getOptionsDefaults(passedOptions, cwdPath);
      const randomString = crypto.randomBytes(randomStringLength / 2).toString("hex");
      const dirPath = pathUtil.join(
        options.basePath,
        options.prefix + randomString
      );
      try {
        fs.mkdirSync(dirPath);
      } catch (err) {
        if (err.code === "ENOENT") {
          dir.sync(dirPath);
        } else {
          throw err;
        }
      }
      return dirPath;
    };
    var tmpDirAsync = (cwdPath, passedOptions) => {
      return new Promise((resolve, reject) => {
        const options = getOptionsDefaults(passedOptions, cwdPath);
        crypto.randomBytes(randomStringLength / 2, (err, bytes) => {
          if (err) {
            reject(err);
          } else {
            const randomString = bytes.toString("hex");
            const dirPath = pathUtil.join(
              options.basePath,
              options.prefix + randomString
            );
            fs.mkdir(dirPath, (err2) => {
              if (err2) {
                if (err2.code === "ENOENT") {
                  dir.async(dirPath).then(() => {
                    resolve(dirPath);
                  }, reject);
                } else {
                  reject(err2);
                }
              } else {
                resolve(dirPath);
              }
            });
          }
        });
      });
    };
    exports.validateInput = validateInput;
    exports.sync = tmpDirSync;
    exports.async = tmpDirAsync;
  }
});

// node_modules/fs-jetpack/lib/jetpack.js
var require_jetpack = __commonJS({
  "node_modules/fs-jetpack/lib/jetpack.js"(exports, module2) {
    "use strict";
    var util = require("util");
    var pathUtil = require("path");
    var append = require_append();
    var dir = require_dir();
    var file = require_file();
    var find = require_find();
    var inspect = require_inspect();
    var inspectTree = require_inspect_tree();
    var copy = require_copy();
    var exists = require_exists();
    var list = require_list();
    var move = require_move();
    var read = require_read();
    var remove = require_remove();
    var rename = require_rename();
    var symlink = require_symlink();
    var streams = require_streams();
    var tmpDir = require_tmp_dir();
    var write = require_write();
    var jetpackContext = (cwdPath) => {
      const getCwdPath = () => {
        return cwdPath || process.cwd();
      };
      const cwd = function() {
        if (arguments.length === 0) {
          return getCwdPath();
        }
        const args = Array.prototype.slice.call(arguments);
        const pathParts = [getCwdPath()].concat(args);
        return jetpackContext(pathUtil.resolve.apply(null, pathParts));
      };
      const resolvePath = (path2) => {
        return pathUtil.resolve(getCwdPath(), path2);
      };
      const getPath = function() {
        Array.prototype.unshift.call(arguments, getCwdPath());
        return pathUtil.resolve.apply(null, arguments);
      };
      const normalizeOptions = (options) => {
        const opts = options || {};
        opts.cwd = getCwdPath();
        return opts;
      };
      const api = {
        cwd,
        path: getPath,
        append: (path2, data, options) => {
          append.validateInput("append", path2, data, options);
          append.sync(resolvePath(path2), data, options);
        },
        appendAsync: (path2, data, options) => {
          append.validateInput("appendAsync", path2, data, options);
          return append.async(resolvePath(path2), data, options);
        },
        copy: (from, to, options) => {
          copy.validateInput("copy", from, to, options);
          copy.sync(resolvePath(from), resolvePath(to), options);
        },
        copyAsync: (from, to, options) => {
          copy.validateInput("copyAsync", from, to, options);
          return copy.async(resolvePath(from), resolvePath(to), options);
        },
        createWriteStream: (path2, options) => {
          return streams.createWriteStream(resolvePath(path2), options);
        },
        createReadStream: (path2, options) => {
          return streams.createReadStream(resolvePath(path2), options);
        },
        dir: (path2, criteria) => {
          dir.validateInput("dir", path2, criteria);
          const normalizedPath = resolvePath(path2);
          dir.sync(normalizedPath, criteria);
          return cwd(normalizedPath);
        },
        dirAsync: (path2, criteria) => {
          dir.validateInput("dirAsync", path2, criteria);
          return new Promise((resolve, reject) => {
            const normalizedPath = resolvePath(path2);
            dir.async(normalizedPath, criteria).then(() => {
              resolve(cwd(normalizedPath));
            }, reject);
          });
        },
        exists: (path2) => {
          exists.validateInput("exists", path2);
          return exists.sync(resolvePath(path2));
        },
        existsAsync: (path2) => {
          exists.validateInput("existsAsync", path2);
          return exists.async(resolvePath(path2));
        },
        file: (path2, criteria) => {
          file.validateInput("file", path2, criteria);
          file.sync(resolvePath(path2), criteria);
          return api;
        },
        fileAsync: (path2, criteria) => {
          file.validateInput("fileAsync", path2, criteria);
          return new Promise((resolve, reject) => {
            file.async(resolvePath(path2), criteria).then(() => {
              resolve(api);
            }, reject);
          });
        },
        find: (startPath, options) => {
          if (typeof options === "undefined" && typeof startPath === "object") {
            options = startPath;
            startPath = ".";
          }
          find.validateInput("find", startPath, options);
          return find.sync(resolvePath(startPath), normalizeOptions(options));
        },
        findAsync: (startPath, options) => {
          if (typeof options === "undefined" && typeof startPath === "object") {
            options = startPath;
            startPath = ".";
          }
          find.validateInput("findAsync", startPath, options);
          return find.async(resolvePath(startPath), normalizeOptions(options));
        },
        inspect: (path2, fieldsToInclude) => {
          inspect.validateInput("inspect", path2, fieldsToInclude);
          return inspect.sync(resolvePath(path2), fieldsToInclude);
        },
        inspectAsync: (path2, fieldsToInclude) => {
          inspect.validateInput("inspectAsync", path2, fieldsToInclude);
          return inspect.async(resolvePath(path2), fieldsToInclude);
        },
        inspectTree: (path2, options) => {
          inspectTree.validateInput("inspectTree", path2, options);
          return inspectTree.sync(resolvePath(path2), options);
        },
        inspectTreeAsync: (path2, options) => {
          inspectTree.validateInput("inspectTreeAsync", path2, options);
          return inspectTree.async(resolvePath(path2), options);
        },
        list: (path2) => {
          list.validateInput("list", path2);
          return list.sync(resolvePath(path2 || "."));
        },
        listAsync: (path2) => {
          list.validateInput("listAsync", path2);
          return list.async(resolvePath(path2 || "."));
        },
        move: (from, to, options) => {
          move.validateInput("move", from, to, options);
          move.sync(resolvePath(from), resolvePath(to), options);
        },
        moveAsync: (from, to, options) => {
          move.validateInput("moveAsync", from, to, options);
          return move.async(resolvePath(from), resolvePath(to), options);
        },
        read: (path2, returnAs) => {
          read.validateInput("read", path2, returnAs);
          return read.sync(resolvePath(path2), returnAs);
        },
        readAsync: (path2, returnAs) => {
          read.validateInput("readAsync", path2, returnAs);
          return read.async(resolvePath(path2), returnAs);
        },
        remove: (path2) => {
          remove.validateInput("remove", path2);
          remove.sync(resolvePath(path2 || "."));
        },
        removeAsync: (path2) => {
          remove.validateInput("removeAsync", path2);
          return remove.async(resolvePath(path2 || "."));
        },
        rename: (path2, newName, options) => {
          rename.validateInput("rename", path2, newName, options);
          rename.sync(resolvePath(path2), newName, options);
        },
        renameAsync: (path2, newName, options) => {
          rename.validateInput("renameAsync", path2, newName, options);
          return rename.async(resolvePath(path2), newName, options);
        },
        symlink: (symlinkValue, path2) => {
          symlink.validateInput("symlink", symlinkValue, path2);
          symlink.sync(symlinkValue, resolvePath(path2));
        },
        symlinkAsync: (symlinkValue, path2) => {
          symlink.validateInput("symlinkAsync", symlinkValue, path2);
          return symlink.async(symlinkValue, resolvePath(path2));
        },
        tmpDir: (options) => {
          tmpDir.validateInput("tmpDir", options);
          const pathOfCreatedDirectory = tmpDir.sync(getCwdPath(), options);
          return cwd(pathOfCreatedDirectory);
        },
        tmpDirAsync: (options) => {
          tmpDir.validateInput("tmpDirAsync", options);
          return new Promise((resolve, reject) => {
            tmpDir.async(getCwdPath(), options).then((pathOfCreatedDirectory) => {
              resolve(cwd(pathOfCreatedDirectory));
            }, reject);
          });
        },
        write: (path2, data, options) => {
          write.validateInput("write", path2, data, options);
          write.sync(resolvePath(path2), data, options);
        },
        writeAsync: (path2, data, options) => {
          write.validateInput("writeAsync", path2, data, options);
          return write.async(resolvePath(path2), data, options);
        }
      };
      if (util.inspect.custom !== void 0) {
        api[util.inspect.custom] = () => {
          return `[fs-jetpack CWD: ${getCwdPath()}]`;
        };
      }
      return api;
    };
    module2.exports = jetpackContext;
  }
});

// node_modules/fs-jetpack/main.js
var require_main = __commonJS({
  "node_modules/fs-jetpack/main.js"(exports, module2) {
    "use strict";
    var jetpack2 = require_jetpack();
    module2.exports = jetpack2();
  }
});

// src/main.ts
var import_path = __toESM(require("path"));
var core2 = __toESM(require_core());
var import_fs_jetpack = __toESM(require_main());

// src/action.ts
var core = __toESM(require_core());
function getConfig() {
  return {
    token: core.getInput("token", { required: true }),
    base_url: core.getInput("base_url", { required: true }),
    project_id: core.getInput("project_id", { required: true }),
    folder: (() => {
      const input = core.getInput("folder");
      return input === "" ? "./" : input;
    })()
  };
}

// src/main.ts
async function run() {
  try {
    const config = getConfig();
    core2.info(`Sending sourcemap files to Raygun...`);
    const sourcemaps = import_fs_jetpack.default.find(config.folder, { matching: "*.js.map" });
    for (const sourcemap of sourcemaps) {
      console.log(sourcemap);
      const formData = new URLSearchParams();
      formData.append(
        "url",
        `${config.base_url}/${import_path.default.parse(sourcemap).base}`
      );
      formData.append("file", sourcemap);
      const res = await fetch(
        `https://app.raygun.com/upload/${config.project_id}?authtoken=${config.token}`,
        {
          method: "POST",
          body: formData
        }
      );
      core2.info("Response code:" + res.status);
      core2.info(res.statusText);
      if (!res.ok) {
        throw new Error(res.statusText);
      }
    }
  } catch (error2) {
    if (error2 instanceof Error) {
      core2.error(`Failed: ${error2.message}`);
      error2.stack && core2.debug(error2.stack);
      core2.setFailed(error2.message);
    }
  }
}
(() => run())();
