"use strict";
(self["webpackChunkgithub_io"] = self["webpackChunkgithub_io"] || []).push([["/res/js/app"],{

/***/ "./src/react/App.tsx":
/*!***************************!*\
  !*** ./src/react/App.tsx ***!
  \***************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var jsx_runtime_1 = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");

var client_1 = __webpack_require__(/*! react-dom/client */ "./node_modules/react-dom/client.js");

var Container_1 = __importDefault(__webpack_require__(/*! react-bootstrap/Container */ "./node_modules/react-bootstrap/esm/Container.js"));

var Row_1 = __importDefault(__webpack_require__(/*! react-bootstrap/Row */ "./node_modules/react-bootstrap/esm/Row.js"));

var Col_1 = __importDefault(__webpack_require__(/*! react-bootstrap/Col */ "./node_modules/react-bootstrap/esm/Col.js"));

function Home() {
  return (0, jsx_runtime_1.jsx)(Container_1["default"], {
    children: (0, jsx_runtime_1.jsx)(Row_1["default"], {
      children: (0, jsx_runtime_1.jsx)(Col_1["default"], {
        children: "Welcome home!"
      })
    })
  });
}

var container = document.getElementById('root');

if (container) {
  var root = (0, client_1.createRoot)(container);
  root.render((0, jsx_runtime_1.jsx)(Home, {}));
}

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["/res/js/vendor"], () => (__webpack_exec__("./src/react/App.tsx")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);