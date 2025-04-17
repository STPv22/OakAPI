(() => {
    var manager = OakAPI.command;

    var prefix = manager.registerPrefix('.', false);


    // eg. .foo 1 bar
    var command = manager.register('foo')
        .nextParameter(
            manager.argument('bar', Number).nextParameter(
                manager.argument('bar2', String).executes(
                    (context) => {
                        console.log(context.getArgument('bar'));
                        console.log(context.getArgument('bar2'));
                    }
                )
            )
        )
        .executes((c) => {
            ModAPI.displayToChat('called "foo" with no arguments!');
        });

    manager.createClientCommand(prefix, command);
})();