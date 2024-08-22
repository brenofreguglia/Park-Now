"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LottieView = void 0;
var _react = _interopRequireWildcard(require("react"));
var _utils = require("./utils");
var _reactPlayer = require("@dotlottie/react-player");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const LottieView = /*#__PURE__*/(0, _react.forwardRef)((_ref, ref) => {
  let {
    source,
    speed,
    loop,
    webStyle,
    autoPlay,
    hover,
    direction,
    progress,
    onAnimationFailure,
    onAnimationFinish,
    onAnimationLoop
  } = _ref;
  const sources = (0, _utils.parsePossibleSources)(source);
  const lottieSource = (sources === null || sources === void 0 ? void 0 : sources.sourceDotLottieURI) || (sources === null || sources === void 0 ? void 0 : sources.sourceName);
  const jsonSource = (sources === null || sources === void 0 ? void 0 : sources.sourceURL) || (sources === null || sources === void 0 ? void 0 : sources.sourceJson);
  const [isError, setIsError] = _react.default.useState(false);
  const [isReady, setIsReady] = _react.default.useState(false);
  const [key, setKey] = _react.default.useState(0);
  const playerRef = (0, _react.useRef)(null);
  /**
   *  If an error occured reset the key when the source changes to force a re-render.
   */
  (0, _react.useEffect)(() => {
    if (isError) {
      setKey(prevKey => prevKey + 1);
      setIsError(false);
    }
  }, [source]);
  if (progress != undefined && __DEV__) {
    console.warn("lottie-react-native: progress is not supported on web");
  }
  const runAfterReady = (0, _react.useCallback)(fn => {
    if (!isReady) {
      var _playerRef$current;
      const container = (_playerRef$current = playerRef.current) === null || _playerRef$current === void 0 ? void 0 : _playerRef$current.container;
      const listener = () => {
        fn();
        container === null || container === void 0 || container.removeEventListener("is_ready", listener);
      };
      container === null || container === void 0 || container.addEventListener("is_ready", listener);
    } else {
      fn();
    }
  }, [isReady]);
  const handleEvent = (0, _react.useCallback)(event => {
    var _playerRef$current2, _playerRef$current3;
    switch (event) {
      case "ready":
        if (isReady) return;
        const container = (_playerRef$current2 = playerRef.current) === null || _playerRef$current2 === void 0 ? void 0 : _playerRef$current2.container;
        setIsReady(true);
        container === null || container === void 0 || container.dispatchEvent(new Event("is_ready"));
        break;
      case "error":
        onAnimationFailure === null || onAnimationFailure === void 0 || onAnimationFailure("error");
        setIsError(true);
        break;
      case "complete":
        onAnimationFinish === null || onAnimationFinish === void 0 || onAnimationFinish(false);
        //prevent reseting animation if not looping, for consistency with native
        autoPlay && !loop && ((_playerRef$current3 = playerRef.current) === null || _playerRef$current3 === void 0 ? void 0 : _playerRef$current3.stop());
        break;
      case "stop":
      case "pause":
        onAnimationFinish === null || onAnimationFinish === void 0 || onAnimationFinish(true);
        break;

      //case "loop":
      case "loopComplete":
        onAnimationLoop === null || onAnimationLoop === void 0 || onAnimationLoop();
        break;
    }
  }, [isReady]);
  (0, _react.useImperativeHandle)(ref, () => {
    return {
      play: (s, e) => {
        const player = playerRef.current;
        if (!player) return;
        runAfterReady(() => {
          try {
            const bothDefined = s !== undefined && e !== undefined;
            const bothUndefined = s === undefined && e === undefined;
            const bothEqual = e === s;
            if (bothDefined) {
              if (bothEqual) {
                player.goToAndStop(e, true);
                return;
              }
              player.playSegments([s, e], true);
              return;
            }
            if (s !== undefined && e === undefined) {
              player.goToAndPlay(s, true);
            }
            if (bothUndefined) {
              player.play();
            }
          } catch (error) {
            console.error(error);
          }
        });
      },
      reset: () => {
        runAfterReady(() => {
          var _playerRef$current4;
          (_playerRef$current4 = playerRef.current) === null || _playerRef$current4 === void 0 || _playerRef$current4.goToAndStop(0, false);
        });
      },
      pause: () => {
        runAfterReady(() => {
          var _playerRef$current5;
          (_playerRef$current5 = playerRef.current) === null || _playerRef$current5 === void 0 || _playerRef$current5.pause();
        });
      },
      resume: () => {
        runAfterReady(() => {
          var _playerRef$current6;
          (_playerRef$current6 = playerRef.current) === null || _playerRef$current6 === void 0 || _playerRef$current6.play();
        });
      }
    };
  }, [isReady]);
  return /*#__PURE__*/_react.default.createElement(_reactPlayer.DotLottiePlayer, {
    key: key,
    ref: playerRef,
    src: lottieSource || jsonSource,
    onEvent: handleEvent,
    style: webStyle,
    autoplay: autoPlay,
    speed: speed,
    loop: loop,
    hover: hover,
    direction: direction
  });
});
exports.LottieView = LottieView;
//# sourceMappingURL=index.web.js.map