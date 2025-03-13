
let commandManager = {};

commandManager['createServerSide'] = function() {

}

commandManager['createClientSide'] = function(prefix : string, preventDefault : boolean) {

    //kinda jank ngl
    function onCall(callback : (args : Array<any>) => void) {
        ModAPI.addEventListener('sendchatmessage', (ev) => {
            var args = ev.message.split(' ');
            ev.preventDefault = preventDefault;
            if (ev.message == prefix) {
                callback(args);
            }
        });
    }

    return { onCall };
}

export default commandManager;