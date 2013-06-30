#!/usr/bin/env node

/**
 * string_to_hex.js
 *
 * @author Bret Fontecchio
 * @fileOverview Module to take a String of text and output hex encoding
 */

var verbose = false;

/*
 * check_args
 */
function check_args(){
	if (process.argv.length != 3) {
		return 1;
	} else {
		return 0;
	}
}

/*
 * pad()
 * outputs a double digit string if possible.
 * ex: pad(3) returns 03, pad(11) returns 11
 *
 * @param num_str The number to pad
 * @return The padded number
 */
function pad(num_str) {
	switch(num_str.length)
	{
		case 0: return "00"; // no break because we're returning
		case 1: return "0" + num_str;
		case 2: return num_str;
		default:
			if (verbose)
				console.log("Warning: number over double digits passed to pad(). This cannot be an ASCII char the xor of two ASCII chars");
	}
}

function string_to_hex(str) {
	var out = "";
	for (var i = 0; i < str.length; i++) {
		var c = str.charCodeAt(i);
		if (verbose)
			console.log("c[" + i + "]: " + c);
		out += pad(c.toString(16));
	}
	return out;
}

if (check_args() == 1) {
	console.log("Usage: node string_to_hex.js \"<string>\"");
	process.exit(code=1);
}

console.log(string_to_hex(process.argv[2]));
