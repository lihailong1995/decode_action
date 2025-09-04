//Thu Sep 04 2025 05:28:52 GMT+0000 (Coordinated Universal Time)
//Base:<url id="cv1cref6o68qmpt26ol0" type="url" status="parsed" title="GitHub - echo094/decode-js: JS混淆代码的AST分析工具 AST analysis tool for obfuscated JS code" wc="2165">https://github.com/echo094/decode-js</url>
//Modify:<url id="cv1cref6o68qmpt26olg" type="url" status="parsed" title="GitHub - smallfawn/decode_action: 世界上本来不存在加密，加密的人多了，也便成就了解密" wc="741">https://github.com/smallfawn/decode_action</url>
var a = ["jsjiami.com.v6", "ZjsgjilBUDamOPlriw.EVcomBp.lv6==", "5p+76Zev6aOL6K2W6ICh57Czw59KXsO7woIUw6fCgMKLw5TCqg==", "KFXCvcKCJFM=", "IWQXKgw=", "Gks8Kg==", "w4h1w7oOag=="];
(function (_0x396532, _0x21628e, _0x730234) {
  var _0x328738 = function (_0x326b14, _0xf69767, _0x56667a, _0x2fbbd6) {
    _0xf69767 = _0xf69767 >> 8;
    if (_0xf69767 < _0x326b14) {
      while (--_0x326b14) {
        _0x2fbbd6 = _0x396532.shift();
        if (_0xf69767 === _0x326b14) {
          _0xf69767 = _0x2fbbd6;
          _0x56667a = _0x396532.shift();
        } else {
          _0x56667a.replace(/[ZglBUDOPlrwEVBpl=]/g, "") === _0xf69767 && _0x396532.push(_0x2fbbd6);
        }
      }
      _0x396532.push(_0x396532.shift());
    }
    return 148205;
  };
  return _0x328738(++_0x21628e, _0x730234) >> _0x21628e ^ _0x730234;
})(a, 491, 125696);
var b = function (_0x15b476, _0x56aaf8) {
  _0x15b476 = ~~"0x".concat(_0x15b476);
  var _0xfec96a = a[_0x15b476];
  if (b.gPvZlv === undefined) {
    (function () {
      var _0x5543df = typeof window !== "undefined" ? window : typeof process === "object" && typeof require === "function" && typeof global === "object" ? global : this;
      var _0x2639b3 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
      _0x5543df.atob || (_0x5543df.atob = function (_0x39b971) {
        var _0x44f198 = String(_0x39b971).replace(/=+$/, "");
        for (var _0x48f2fc = 0, _0x15031b, _0x30e1f2, _0x2f6007 = 0, _0x4023bd = ""; _0x30e1f2 = _0x44f198.charAt(_0x2f6007++); ~_0x30e1f2 && (_0x15031b = _0x48f2fc % 4 ? _0x15031b * 64 + _0x30e1f2 : _0x30e1f2, _0x48f2fc++ % 4) ? _0x4023bd += String.fromCharCode(255 & _0x15031b >> (-2 * _0x48f2fc & 6)) : 0) {
          _0x30e1f2 = _0x2639b3.indexOf(_0x30e1f2);
        }
        return _0x4023bd;
      });
    })();
    var _0x514536 = function (_0x3fe201, _0x2e11f5) {
      var _0x3d43e1 = [];
      var _0x5a2588 = 0;
      var _0x3a3f93;
      var _0x5766a1 = "";
      var _0x2cbb8f = "";
      _0x3fe201 = atob(_0x3fe201);
      for (var _0x43f961 = 0, _0x25b2e4 = _0x3fe201.length; _0x43f961 < _0x25b2e4; _0x43f961++) {
        _0x2cbb8f += "%" + ("00" + _0x3fe201.charCodeAt(_0x43f961).toString(16)).slice(-2);
      }
      _0x3fe201 = decodeURIComponent(_0x2cbb8f);
      for (var _0x55ec82 = 0; _0x55ec82 < 256; _0x55ec82++) {
        _0x3d43e1[_0x55ec82] = _0x55ec82;
      }
      for (_0x55ec82 = 0; _0x55ec82 < 256; _0x55ec82++) {
        _0x5a2588 = (_0x5a2588 + _0x3d43e1[_0x55ec82] + _0x2e11f5.charCodeAt(_0x55ec82 % _0x2e11f5.length)) % 256;
        _0x3a3f93 = _0x3d43e1[_0x55ec82];
        _0x3d43e1[_0x55ec82] = _0x3d43e1[_0x5a2588];
        _0x3d43e1[_0x5a2588] = _0x3a3f93;
      }
      _0x55ec82 = 0;
      _0x5a2588 = 0;
      for (var _0x2d3d4b = 0; _0x2d3d4b < _0x3fe201.length; _0x2d3d4b++) {
        _0x55ec82 = (_0x55ec82 + 1) % 256;
        _0x5a2588 = (_0x5a2588 + _0x3d43e1[_0x55ec82]) % 256;
        _0x3a3f93 = _0x3d43e1[_0x55ec82];
        _0x3d43e1[_0x55ec82] = _0x3d43e1[_0x5a2588];
        _0x3d43e1[_0x5a2588] = _0x3a3f93;
        _0x5766a1 += String.fromCharCode(_0x3fe201.charCodeAt(_0x2d3d4b) ^ _0x3d43e1[(_0x3d43e1[_0x55ec82] + _0x3d43e1[_0x5a2588]) % 256]);
      }
      return _0x5766a1;
    };
    b.fuFDUP = _0x514536;
    b.uzmgkx = {};
    b.gPvZlv = true;
  }
  var _0x194b2f = b.uzmgkx[_0x15b476];
  _0x194b2f === undefined ? (b.GkZZBA === undefined && (b.GkZZBA = true), _0xfec96a = b.fuFDUP(_0xfec96a, _0x56aaf8), b.uzmgkx[_0x15b476] = _0xfec96a) : _0xfec96a = _0x194b2f;
  return _0xfec96a;
};
(function (_0x121874, _0xd00d5c) {
  var _0x181d6f = {
    RAMoq: "2019年09月12日15:24:29更新",
    EaZaN: "这个是一个本站对JavaScript 脚本的一个最牛加密，兼容性适中，解密难度极大"
  };
  _0x121874[b("0", "ZdTU")] = _0x181d6f[b("1", "FnxY")];
  _0xd00d5c[b("2", "FnxY")] = _0x181d6f[b("3", "jPNw")];
  _0xd00d5c.feedback = b("4", "fS%!");
})(window, document);