// Jquery Dependency
$("input[data-type='currency']").on({
    keyup: function () {
        formatCurrency($(this));
    },
    blur: function () {
        formatCurrency($(this), "blur");
    }
});

function formatNumber(n) {
    // format number 1000000 to 1,234,567
    return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

function formatCurrency(input, blur) {
    // appends $ to value, validates decimal side
    // and puts cursor back in right position.

    // get input value
    var input_val = input.val();

    // don't validate empty input
    if (input_val === "") { return; }

    // original length
    var original_len = input_val.length;

    // initial caret position 
    var caret_pos = input.prop("selectionStart");

    // check for decimal
    if (input_val.indexOf(".") >= 0) {

        // get position of first decimal
        // this prevents multiple decimals from
        // being entered
        var decimal_pos = input_val.indexOf(".");

        // split number by decimal point
        var left_side = input_val.substring(0, decimal_pos);
        var right_side = input_val.substring(decimal_pos);

        // add commas to left side of number
        left_side = formatNumber(left_side);

        // validate right side
        right_side = formatNumber(right_side);

        // On blur make sure 2 numbers after decimal
        if (blur === "blur") {
            right_side += "00";
        }

        // Limit decimal to only 2 digits
        right_side = right_side.substring(0, 2);

        // join number by .
        input_val = "$" + left_side + "." + right_side;

    } else {
        // no decimal entered
        // add commas to number
        // remove all non-digits
        input_val = formatNumber(input_val);
        input_val = "$" + input_val;

        // final formatting
        //if (blur === "blur") {
        //    input_val += ".00";
        //}
    }

    // send updated string to input
    input.val(input_val);

    // put caret back in the right position
    var updated_len = input_val.length;
    caret_pos = updated_len - original_len + caret_pos;
    input[0].setSelectionRange(caret_pos, caret_pos);
}

function formatRate(r) {
    //format interest rate from 2 to 2.0
    //get input rate value
    var input_rate = input.rate();

    // do not validate empty input
    if (input_rate === "") { return; }

    // check for decimal
    if (input_rate.indexOf(".") >= 0) {

        var decimal_pos = input_rate.indexOf(".")

        // split number by decimal point
        var left_rate = input_rate.substring(0, decimal_pos);
        var right_rate = input_rate.substring(decimal_pos);

        //  left side of rate
        left_rate = formatRate(left_rate);

        // right side of rate
        right_rate = formatRate(right_rate);

        // Limit decimal to only 3 digits
        right_rate = right_rate.substring(0, 3);

    } else {
        // no decimal entered
        // remove all non-digits
        input_rate = formatRate(input_rate);

        // final formatting
        //if (blur === "blur") {
        //    input_rate += ".00";
        //}
    }
    // send updated string to input
    input.rate(input_rate);

    // put caret back in the right position
    var updated_len = input_rate.length;
    caret_pos = updated_len - original_len + caret_pos;
    input[0].setSelectionRange(caret_pos, caret_pos);
}