//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
// Constants
//////////////////////////////////////////////////////////////////////////////

let basic_table = [
    "plopje",       // 0
    "plop",         // 1
    "ploppie",      // 2
    "plopt",        // 3
    "plops",        // 4
    "plopsie",      // 5
    "plopsa",       // 6
    "ploppend",     // 7
    "ploppende",    // 8
    "ploppender"    // 9
];

let power_cycle = ["plop", "per", "de"];



//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
// HTML interface
//////////////////////////////////////////////////////////////////////////////

function translate_number() {
    let input = document.getElementById("inumber").value;
    if (input === null || input === "") {
        return;
    }
    let use_short = document.getElementById("bshort_notation").checked;
    let use_prefix = document.getElementById("bprefix").checked;
    let use_frac = document.getElementById("bunits").checked;
    let options = {
        use_short: use_short,
        use_prefix: use_prefix,
        use_unit: use_frac
    };
   alert(format_number(input, options));
}

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
// Formatting Interface
//////////////////////////////////////////////////////////////////////////////

function format_number(x, notation_options) {
    let parts = x.split(".");
    let whole_part;
    let frac_part;
    if (parts.length === 1) {
        whole_part = parts[0];
        frac_part = null;
    } else {
        whole_part = parts[0];
        frac_part = parts[1];
    }
    if (whole_part.charAt(0) === "-") {
        whole_part = whole_part.slice(1);
    }
    let whole_is_zero = parseInt(whole_part) === 0;
    let whole_part_name = format_whole_part(whole_part, frac_part > 0, notation_options);
    let frac_part_name = format_frac_part(frac_part, notation_options);
    if (whole_is_zero) {
        return format_sign(x, frac_part_name, notation_options);
    }
    if (frac_part === null) {
        return format_sign(x, whole_part_name, notation_options);
    }
    return format_sign(x, whole_part_name + " " + frac_part_name, notation_options);
}

function format_whole_part(x, has_frac, options) {
    let power = 0;
    let components = [];
    for (let i = 0; i < x.length; i++) {
        let digit = x.charAt(x.length - i - 1);
        if (digit === "0" && options["use_short"]) {
        } else if (power === 0 && has_frac) {
            components.push(basic_table[parseInt(digit)] + "-" + format_power(power, options));
        } else if (power === 0 && options["use_short"]) {
            components.push(basic_table[parseInt(digit)]);
        } else if (digit === "1" && options["use_short"]) {
            components.push(format_power(power, options));
        } else {
            let digitName = basic_table[parseInt(digit)];
            let powerName = format_power(power, options);
            components.push(digitName + "-" + powerName);
        }
        power++;
    }
    components.reverse();
    return components.join(" ");
}

function format_frac_part(x, options) {
    if (x == null) {
        return null;
    }
    let power = 1;
    let components = [];
    for (let i = 0; i < x.length; i++) {
        let digit = x.charAt(i);
        if (digit === "0" && options["use_short"]) {
        } else if (digit === "1" && options["use_short"]) {
            components.push(format_power(-power, options));
        } else {
            let digitName = basic_table[parseInt(digit)];
            let powerName = format_power(-power, options);
            components.push(digitName + "-" + powerName);
        }
        power++;
    }
    return components.join(" ");
}

function format_sign(x, name, options) {
    let y = parseFloat(x);
    if (y < 0) {
        return "negaplop-" + name;
    } else if (options["use_prefix"]) {
        return "plusplop-" + name;
    }
    return name;
}

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
// Formatting of powers
//////////////////////////////////////////////////////////////////////////////

function format_power(power, options) {
    if (power < 0) {
        return format_negative_power(-power);
    } else if (power > 0) {
        return format_positive_power(power);
    }
    if (options["use_unit"]) {
        return "plopsoplop";
    }
    return "plop";  // or "", depending on mode
}

function format_positive_power(power) {
    let components = ["plop"];
    let index = 0;
    while (power > 0) {
        power--;
        index = (index + 1) % power_cycle.length;
        components.push(power_cycle[index]);
    }
    let power_name = components.join("");
    if (power % 3 === 1) {
        power_name += "r";
    }
    return power_name;
}

function format_negative_power(power) {
    return "plopso" + format_positive_power(power);
}
