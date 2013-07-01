/**
 * module_boilerplate.js
 *
 * @author Bret Fontecchio
 * @fileOverview Basic template of Node module which uses crypto_core
 * functionality, cli_tools for standalone usage, and module.exports
 * for usage by other modules.
 */


var cli_tools = require('./cli_tools.js');
var crypto_core = require('./crypto_core.js');

if (!module.parent) {
	// this module was called on its own, probably from the command line.
	// check if one and only one arg was passed
	if (cli_tools.check_args(1) == 1) {
		console.log("Usage: ./module \"<argument>\"");
		process.exit(code=1);
	} else {
		var out = "output";
		/* The DOUBLE QUOTES are here to facilitate unix tool style usage with 
		   xargs even with spaces in the string. space_swap(str, repl) may be
		   preferable. see cli_tools.js */
		console.log(cli_tools.quote_string(out));
	}
}

module.exports = {
	crypto_tools: crypto_tools,
	cli_tools: cli_tools,
	export_name: local_name, 	// note the format, but name them the same please!
};
