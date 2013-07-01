#!/usr/bin/env node

/**
 * hex_to_string.js
 *
 * @author Bret Fontecchio
 * @fileOverview Module to take a String of hex represented Unicode and 
 * outputs a String of text composed of corresponding characters.
 */

var cli_tools = require('./cli_tools.js');
var crypto_core = require('./crypto_core.js');

/*
 * Takes every two characters of input and parses them as hex-represented
 * Unicodes in order to build a String.
 *
 * @param hex_str Hex String. A string of hex Unicodes.
 * @return       String of Unicode characters which had been encoded in hex
 */
hex_to_string = function (hex_str) {
	// output
	var out = "";
	// character
	var c;
	for (var i = 0; i < hex_str.length; i += 2) {
		hdHI = hex_str.charAt(i);
		hdLO = hex_str.charAt(i+1);
		c = crypto_core.get_char_from_hex(hdHI, hdLO);
		out += c;
	}
	return out;
}

if (!module.parent) {
	// this module was called on its own, probably from the command line.
	// check if one and only one arg was passed
	if (cli_tools.check_args(1) == 1) {
		console.log("Usage: node hex_to_string.js \"<string_of_hex_encoding>\"");
		process.exit(code=1);
	} else {
		var out = hex_to_string(process.argv[2]);
		/* The DOUBLE QUOTES are here to facilitate unix tool style usage with 
		   xargs even with spaces in the string. space_swap(str, repl) may be
		   preferable. see cli_tools.js */
		console.log(cli_tools.quote_string(out));
	}
}

module.exports = {
	hex_to_string: hex_to_string,
};
