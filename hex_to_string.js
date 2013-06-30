#!/usr/bin/env node

/**
 * string_to_hex.js
 *
 * @author Bret Fontecchio
 * @fileOverview Module to take a String of text and output hex encoding
 */

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

function hex_to_string(str) {
	var out = "";
	// hex digits
	var hdHI, hdLO;
	// hex character code, as a string
	var hcs;
	// hex character code, as an int
	var hci;
	// character ready for output
	var c;
	for (var i = 0; i < str.length; i += 2) {
		hdHI = str.charAt(i);
		hdLO = str.charAt(i+1);
		hcs = hdHI + hdLO;	// concatenation
		hci = parseInt(hcs, 16);
		c = String.fromCharCode(hci);
		out += c;
	}
	return out;
}

if (check_args() == 1) {
	console.log("Usage: node hex_to_string.js \"<string_of_hex_encoding>\"");
	process.exit(code=1);
}

// the double quotes are here to facilitate unix tool style usage with xargs even with spaces in the string
console.log("\"" + hex_to_string(process.argv[2]) + "\"");
