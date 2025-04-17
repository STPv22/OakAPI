
var commandManager = {};

var clientPrefixList = [];

commandManager['registerPrefix'] = function(prefix: string, preventdefault : boolean) : number {
    let foundArray;
    let arr;

    for (var i = 0; i < clientPrefixList.length; i++) {
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
}

function executes(call) {
    return call;
}

function nextParameter(c) {
    return {c, executes};
}

commandManager['register'] = function(name: string) : Object {

    return { name, nextParameter };
}

commandManager['argument'] = function(name : string, type: any) {


    return { name, type, nextParameter }
}

commandManager['runClient'] = function(prefix : number, command : any) {
    ModAPI.addEventListener("sendchatmessage" , (e) => {
        var args = e.message.split(' ');

        if (args[0].startsWith(clientPrefixList[prefix].prefix)) {
            e.preventDefault = clientPrefixList[prefix].preventdefault;
            alert('sent!');

            if (args[0] == clientPrefixList[prefix].prefix + command.name) {
                if (args[1]) {

                } else if (command) {

                }
            }
        }
    });
}

export default commandManager;