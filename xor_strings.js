#!/usr/bin/env node

/**
 * xor_strings.js
 *
 * Bret Fontecchio 2013
 * 
 * use functions xor_strings(s1, s2) to get output string
 * any overflow from a longer string will be truncated without warning!
 */

var verbose = false;

function check_args() {
	if (process.argv.length != 4) {
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
				console.log("Warning: number over double digits passed to pad(). This cannot be the xor of two ASCII digits");
	}
}

function xor_strings(s1, s2) {
	// check length of each string
	var len1 = s1.length;
	var len2 = s2.length;
	// find the shorter string
	var small_len = (s1 > s2) ? s1.length : s2.length;
	// hex character codes
	var hc1, hc2;
	// our output
	var out = "";
	for (var i = 0; i < small_len; i++) {
		hc1 = s1.charCodeAt(i);
		if (verbose)
			console.log("hc1[" + i + "]: " + hc1);
		hc2 = s2.charCodeAt(i);
		if (verbose)
			console.log("hc2[" + i + "]: " + hc2);
		out += pad((hc1 ^ hc2).toString(16));
	}
	return out;
};

if (check_args() != 0) {
	console.log("Usage: node xor_strings.js <string1> <string2>");
	process.exit(code=1);
}

var s1 = process.argv[2];
var s2 = process.argv[3];
console.log(xor_strings(s1, s2));

