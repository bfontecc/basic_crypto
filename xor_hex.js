#!/usr/bin/env node

/**
 * xor_hex.js
 *
 * Bret Fontecchio 2013
 * 
 * use function xor_hex(hs1, hs2) to get output string
 * any overflow from a longer code will be truncated without warning!
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

/**
 * xor_hex
 *
 * @params: hs1, hs2 Hex String 1, Hex String 2
 * @return: out The two hex encodings xor'd
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
	var out;
	// hex digits, string 1
	var hdHI_1, hdLO_1;
	// hex digits, string 2
	var hdHI_2, hdLO_2;
	// hex character codes as strings
	var hcs_1, hcs_2;
	// hex character codes as ints
	var hci_1, hci_2;
	for (var i = 0; i < small_len; i += 2) {
		// build hex code from both hex digits
		hdHI_1 = hs1.charAt(i);
		hdLO_1 = hs1.charAt(i+1);
		hcs_1 = hdHI_1 + hdLO_1;	// concatenation
		// turn this string hex code into an int
		hci_1 = parseInt(hcs_1, 16);
		// do this again to get hci_2
		hdHI_2 = hs2.charAt(i);
		hdLO_2 = hs2.charAt(i+1);
		hcs_2 = hdHI_2 + hdLO_2;
		hci_2 = parseInt(hcs_2, 16);
		// xor hex code integer 1 and hex code integer 2
		out += pad(hci_1 ^ hci_2);
	}
	return out;
}

function get_char_code
// function to be used here and in hex_to_strings.js
	

if (check_args() != 0) {
	console.log("Usage: xor_hex.js <encoding1> <encoding2>");
	process.exit(code=1);
}

console.log(xor_hex(process.argv[2], process.argv[3]));
