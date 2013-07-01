#!/usr/bin/env node

/**
 * string_to_hex.js
 *
 * @author Bret Fontecchio
 * @fileOverview Module to take a String of text and output hex encoding
 */


crypto_core = require('./crypto_core.js');
cli_tools = require('./cli_tools.js');

/**
 * Convert a String of text to its equivalent hex represented Unicode
 * 
 * @param str String of text
 * @return String of hex represented Unicode
 */
function string_to_hex(str) {
	var out = "";
	for (var i = 0; i < str.length; i++) {
		var c = str.charCodeAt(i);
		if (cli_tools.verbose)
			console.log("c[" + i + "]: " + c);
		out += crypto_core.pad_hex_byte(c.toString(16));
	}
	return out;
}

if (!module.parent) {
	// this module was called on its own, probably from the command line.
	// check if one and only one arg was passed
	if (cli_tools.check_args(1) == 1) {
		console.log("Usage: ./string_to_hex\"<string>\"");
		process.exit(code=1);
	} else {
		var out = string_to_hex(cli_tools.strip_quotes(process.argv[2]));
		/* The DOUBLE QUOTES are here to facilitate unix tool style usage with 
		   xargs even with spaces in the string. space_swap(str, repl) may be
		   preferable. see cli_tools.js */
		console.log(cli_tools.quote_string(out));
	}
}

module.exports = {
	string_to_hex: string_to_hex,
	crypto_core: crypto_core,
	cli_tools: cli_tools,
};

