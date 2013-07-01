/**
 * @author Bret Fontecchio
 * @fileOverview This is a set of functions which help js node files
 * function properly as Unix modules.
 */

var verbose = false;

/**
 * Log a loop variable, showing its index
 *
 * @param i index
 * @param v variable in loop
 * @param label variable value label
 */
var loop_log = function(i, v, label) {
	console.log(label + "[" + i + "]: " + v);
}

/**
 * Returns a double quoted string, adding quotes if necessary, or leaving 
 * them if they're already there.
 * 
 * @param str String to quote
 * @return    double quoted string
 * @see space_swap(str, repl)
 */
var quote_string = function(str) {
	if (str.charAt(0) == '"' && str.charAt(str.length-1) == '"')
		return str;
	return "\"" + str + "\"";
};

/**
 * Strips double or single quotes from String
 * 
 * @param str String to strip
 * @return    String without leading or trailing quotes
 */
var strip_quotes = function(str) {
	if (str.charAt(0) == '\"' && str.charAt(str.length-1) == '\"') {
		return str.substring(1, str.length - 2);
	} else if (str.charAt(0) == '\'' && str.charAt(str.length-1) == '\'') {
		return str.substring(1, str.length - 2);
	} else {
		return str;
	}
};

/**
 * Swaps spaces with another character.
 *
 * Guarantees same length. repl will be truncated if necessary.
 * @param str  a string which may contain spaces
 * @param repl a character to replace the spaces with
 * @return     a string with spaces replaced by repl, otherwise same as str
 * @see quote_str(str)
 */
var space_swap = function (str, repl) {
	repl = repl.charAt(0);	// truncate repl
	str = str.replace(" ", repl);
	return str;
};

/**
 * Checks whether there exist a certain number of cli arguments.
 *
 * check_args is only recommended if a module is called on its own from the cli.
 * check_args may or may not be helpful if called by modules buried in wrapping code.
 * currently does not implement checks other than equals number of args
 *
 * @param n number of args required
 * @return 0 if correct number of args or 1 if incorrect number
 */
var check_args = function (n){
	if (process.argv.length != (n + 2)) {
		return 1;
	} else {
		return 0;
	}
};

// expose to requiring module

module.exports = {
	check_args: check_args,
	space_swap: space_swap,
	quote_string: quote_string,
	verbose: verbose,
	strip_quotes: strip_quotes,
	loop_log: loop_log,
};
