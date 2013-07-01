/*
 * Returns a character code as a num
 *
 * Concatenates the hex digit params, assuming they are Strings, and
 * assuming Big-Endian-ness.
 *
 * @param hex_byte hex code for a Unicode character, as a String
 * @return     The character code, as a num
 */
function get_num_from_hex(hex_byte) {
	// High and Low Nibbles
	var hdHI = hex_byte.charAt(0);
	var hdLO = hex_byte.charAt(1);
	// hex character code, as a string
	var hcs = hdHI.concat(hdLO);
	// hex character code, as an int
	return parseInt(hcs, 16);
}


var array_of_digrams = function(str) {
	var digrams = [];
	// warning: truncation occurs due to loop condition
	for (var i = 0; i < str.length; i += 2) {
		digrams.push(str.substring(i, i+2));
	}
	return digrams;
}

/*
 * Outputs a double digit string which may contain leading zero.
 * Truncates input over 2 characters.
 * 
 * examples: pad_hex_byte(1) returns 01, pad_hex_byte(12) returns 12, 
 * pad_hex_byte(123) returns 12
 * 
 * @param num number to pad, in String form.
 * @return double digit number which may have leading zero
 */
var pad_hex_byte = function (num) {
	// make sure it's a String
	if (!num.substring) {
		num = num.toString();
	}
        switch(num.length)
        {
                case 0: return "00"; // no break because we're returning
                case 1: return "0" + num;
                case 2: return num;
                default:
			return num.substring(0, 2);
        }
}

module.exports = {
	get_num_from_hex: get_num_from_hex,
	pad_hex_byte: pad_hex_byte,
	array_of_digrams: array_of_digrams,
};
