
// Calculate calls all other functions
function Calculate(loan, term, rate) {
    // Total Principal = loan
    document.getElementById("totalprincipal").innerHTML = `${accounting.formatMoney(loan)}`;

    //Total Monthly Payment = (amount loaned) * (rate/1200) / (1 – (1 + rate/1200)(-Number of Months) )
    let totalMonthlyPayment = (loan * (rate / 1200)) / (1 - Math.pow((1 + rate / 1200), -Math.abs(term)));
    document.getElementById("monthlypayment").innerHTML = `${accounting.formatMoney(totalMonthlyPayment.toFixed(2))}`;

    // before the very first month equals the amount of the loan
    let remainingBalance = loan;
    let totalInterest = 0;
    for (let i = 0; i < term; i++) {
        let interestPayment = remainingBalance * (rate / 1200);
        totalInterest += interestPayment;
        let principalPayment = totalMonthlyPayment - interestPayment;
        remainingBalance -= principalPayment;
    }
    let totalCost = parseInt(loan) + totalInterest;
    document.getElementById("totalinterest").innerHTML = `${accounting.formatMoney(totalInterest.toFixed(2))}`;
    document.getElementById("totalcost").innerHTML = `${accounting.formatMoney(totalCost)}`;
}

//let remBalance = total - 

//let intPayment = 

//let principal Payment = Total Monthly Payment-Interset

//End of Month remaining Balance = Previous Remaining Balance - Principal payments