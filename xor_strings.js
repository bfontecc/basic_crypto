#!/usr/bin/env node

var cli_tools = require('./cli_tools.js');
var crypto_core = require('./crypto_core.js');
var string_to_hex = require('./string_to_hex.js');

/**
 * xor two Strings together
 *
 * @param s1 String 1
 * @param s2 String 2
 * @return new String of hex bytes representing xor's of each character in the String
 */
var xor_strings = function (s1, s2) {
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
		hc2 = s2.charCodeAt(i);
		out += crypto_core.pad_hex_byte((hc1 ^ hc2).toString(16));
	}
	return out;
};

/**
 * xor one String into another.
 *
 * xor's String 2 into String 1, starting at offset, and truncating what's left
 * of String 2. Wraps xor_strings(s1, s2), adding offset feature.
 * <p>
 * For attacking the integrity of a stream or pad cipher, the ciphertext should
 * be s1 in most cases. For implementing a stream or pad, the plaintext should
 * be s1 and the key should be s2 in most cases.
 *
 * @param s1 String 1
 * @param s2 String 2
 * @param offset the non-negative index into s1 at which to begin xor'ing with s2
 * @return s1 with s2 xor'd into it starting at offset.
 */
var xor_into = function (s1, s2, offset) {
	var out = "";
	var slice1 = string_to_hex.string_to_hex(s1.substring(0, offset));
	if (slice1) { out += slice1; } 
	var slice2 = xor_strings(s1.substring(offset, s1.length), s2);
	if (slice2) { out += slice2; }
	var slice3= string_to_hex.string_to_hex(s1.substring((offset + s2.length - 1), (s1.length - 1)));
	if (slice3) { out += slice3; }
	return out;
}

if (!module.parent) {
	// this module was called on its own, probably from the command line.
	// check if one and only one arg was passed
	if (cli_tools.check_args(2) == 1) {
		console.log("Usage: ./xor_strings \"<string1> <string2>\"");
		process.exit(code=1);
	} else {
		var s1 = process.argv[2];
		var s2 = process.argv[3];
		var out = xor_strings(s1, s2);
		console.log(out);
	}
}

module.exports = {
	crypto_core: crypto_core,
	cli_tools: cli_tools,
	xor_strings: xor_strings,
	xor_into: xor_into,
};
