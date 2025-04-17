// src/CommandManager.ts
var commandManager = {};
var clientPrefixList = [];
commandManager["registerPrefix"] = function(prefix, preventdefault) {
  let foundArray;
  let arr;
  for (var i = 0;i < clientPrefixList.length; i++) {
    if (clientPrefixList[i] == prefix) {
      foundArray = i;
    }
  }
  if (foundArray === undefined) {
    arr.prefix = prefix;
    arr.preventdefault = preventdefault;
    clientPrefixList.push(arr);
    return clientPrefixList.length - 1;
  } else {
    return foundArray;
  }
};
function executes(willExecute) {
  return { willExecute };
}
function nextParameter(nextParam) {
  return { nextParam, executes };
}
commandManager["register"] = function(name) {
  return { name, nextParameter };
};
commandManager["argument"] = function(name, type) {
  return { name, type, nextParameter, executes };
};
commandManager["runClient"] = function(prefix, command) {
  ModAPI.addEventListener("sendchatmessage", (e) => {
    var args = e.message.split(" ");
    if (args[0].startsWith(clientPrefixList[prefix].prefix)) {
      e.preventDefault = clientPrefixList[prefix].preventdefault;
      alert("sent!");
      if (args[0] == clientPrefixList[prefix].prefix + command.name) {
        var paramNext = command.nextParam;
        var executesNext = command.willExecute;
        var context = {};
        context["getArgument"] = function(argName) {
          return "wip";
        };
        for (var i = 0;i > args.length; i++) {
          if (args[i]) {
            var parsedArg = paramNext.type(args[i]);
            if (args[i + 1]) {
              executesNext = paramNext.willExecute;
              paramNext = paramNext.nextParam;
            }
          } else {
            executesNext(context);
          }
        }
      }
    }
  });
};
var CommandManager_default = commandManager;

// src/main.ts
var OakAPI = {};
OakAPI["command"] ||= CommandManager_default;
globalThis.OakAPI = OakAPI;
