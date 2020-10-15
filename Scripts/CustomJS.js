
function Calculate(loan, term, rate) {

    //Total Monthly Payment = (amount loaned) * (rate/1200) / (1 – (1 + rate/1200)(-Number of Months) )
    let total = (loan * (rate / 1200)) / (1 - Math.pow((1 + rate / 1200), -Math.abs(term)));
    console.log(total);
}

//let remBalance = total - 

//let intPayment = 

//let principal Payment = Total Monthly Payment-Interset

//End of Month remaining Balance = Previous Remaining Balance - Principal payments