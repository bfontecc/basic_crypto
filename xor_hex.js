#!/usr/bin/env node

/**
 * xor_hex.js
 *
 * @author Bret Fontecchio
 * @fileOverview xor's two Strings of hex encoded Unicode together.
 * 
 * any overflow from a longer code will be truncated without warning!
 */


var cli_tools = require('./cli_tools.js');
var crypto_core = require('./crypto_core.js');

/**
 * xor two Strings of hex encoding with each other
 *
 * @params: hs1, hs2 Hex String 1, Hex String 2
 * @return: hex representing both Strings xor'd
 *
 * see hex_to_strings.js function hex_to_strings
 *
 */
function xor_hex(hs1, hs2) {
	// check length
	var len1 = hs1.length;
	var len2 = hs2.length;
	// find the shorter
	var small_len = (hs1 > hs2) ? hs1.length : hs2.length;
	// output
	var out = "";
	// get arrays of hex bytes. Truncation occurs here.
	var arr1 = crypto_core.array_of_digrams(hs1.substring(0, small_len));
	var arr2 = crypto_core.array_of_digrams(hs2.substring(0, small_len));
	// loop through hex bytes, replacing them with characters
	for (var i = 0; i < arr1.length; i++) {
		arr1[i] = crypto_core.get_num_from_hex(arr1[i]);
		arr2[i] = crypto_core.get_num_from_hex(arr2[i]);
		var xord = (arr1[i] ^ arr2[i]);
		xord = xord.toString(16);
		out += xord;
	}
	return out;
}

if (!module.parent) {
	// this module was called on its own, probably from the command line.
	// check if one and only one arg was passed
	if (cli_tools.check_args(2) == 2) {
		console.log("Usage: ./xor_hex \"<hex_code_1> <hex_code_2>\"");
		process.exit(code=1);
	} else {
		var out = xor_hex(process.argv[2], process.argv[3]);
		console.log(out);
	}
}

module.exports = {
	crypto_core: crypto_core,
	cli_tools: cli_tools,
	xor_hex: xor_hex,
};
