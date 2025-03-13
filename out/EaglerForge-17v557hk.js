// src/CommandManager.ts
var commandManager = {};
commandManager["createServerSide"] = function() {};
commandManager["createClientSide"] = function(prefix, preventDefault) {
  function onCall(callback) {
    ModAPI.addEventListener("sendchatmessage", (ev) => {
      var args = ev.message.split(" ");
      ev.preventDefault = preventDefault;
      if (ev.message == prefix) {
        callback(args);
      }
    });
  }
  return { onCall };
};
var CommandManager_default = commandManager;

// src/main.ts
globalThis.OakAPI ||= {};
var OakAPI = globalThis.OakAPI;
OakAPI.command ||= CommandManager_default;
