function unicodeToChar(code) {
    return code.replace(/\\u[\dA-F]{4}/gi, 
                        function (match) {
                            return String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16));
                        });
}

function normalizeCode(code) {
    return code.replace("#x", "\\u");
}

function toChar(code) {
    return unicodeToChar(normalizeCode(code));
}

function cushion(code, n) {
    while(code.length < n) {
        code = "0" + code;
    }
    return code;
}

var codeRanges = "[#x00C0-#x00D6] | [#x00C0-#x00D6]";

// the code ranges for PN_CHARS_BASE:
// codeRanges = "[#x00C0-#x00D6] | [#x00D8-#x00F6] | [#x00F8-#x02FF] | [#x0370-#x037D] | [#x037F-#x1FFF] | [#x200C-#x200D] | [#x2070-#x218F] | [#x2C00-#x2FEF] | [#x3001-#xD7FF] | [#xF900-#xFDCF] | [#xFDF0-#xFFFD] | [#x10000-#xEFFFF]"


// the code range for VARNAME
// codeRanges = "[#x0300-#x036F] | [#x203F-#x2040]";

// the code range for IRIREF
codeRanges = "[#x0000-#x0020]";

function codeRangeToString(codeRange) {
    var startCode = codeRange.slice(3, 7);
    var endCode = codeRange.slice(10, 14);

    var startNumber = parseInt(startCode, 16);
    var endNumber = parseInt(endCode, 16);

    var outputString = "";

    for(var x = startNumber; x <= endNumber; x += 1) {
        outputString += "\'" + toChar("#x" + cushion(x.toString(16), 4)) + "\' | ";
    }

    return outputString.slice(0, outputString.length - 3);
}

function codeRangesToString(codeRanges) {
    var outputString = "";

    var startOfNextRange = codeRanges.indexOf("[");
    var endOfNextRange = codeRanges.indexOf("]");

    while(startOfNextRange !== -1 && endOfNextRange !== -1) {
        var codeRange = codeRanges.slice(startOfNextRange, endOfNextRange);
        codeRanges = codeRanges.slice(endOfNextRange + 1, codeRanges.length);
        outputString += codeRangeToString(codeRange) + " | ";
        startOfNextRange = codeRanges.indexOf("[");
        endOfNextRange = codeRanges.indexOf("]");
    }

    return outputString.slice(0, outputString.length - 3);;
}

console.log(codeRangesToString(codeRanges));
// console.log(toChar("#x00B7"));
