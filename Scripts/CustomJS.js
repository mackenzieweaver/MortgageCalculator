
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

    const table = document.getElementById("tbody");
    for (let i = 1; i <= term; i++) {
        let interestPayment = remainingBalance * (rate / 1200);
        totalInterest += interestPayment;
        let principalPayment = totalMonthlyPayment - interestPayment;
        remainingBalance -= principalPayment;

        // Create row in table
        let row = table.insertRow();
        row.setAttribute("scope", "row");
        let cell = row.insertCell();
        let text = document.createTextNode(i.toString());
        cell.appendChild(text);
        // Payment
        cell = row.insertCell();
        text = document.createTextNode(accounting.formatMoney(totalMonthlyPayment.toFixed(2)));
        cell.appendChild(text);
        // Principal
        cell = row.insertCell();
        text = document.createTextNode(accounting.formatMoney(principalPayment.toFixed(2)));
        cell.appendChild(text);
        // Interest
        cell = row.insertCell();
        text = document.createTextNode(accounting.formatMoney(interestPayment.toFixed(2)));
        cell.appendChild(text);
        // Total Interest
        cell = row.insertCell();
        text = document.createTextNode(accounting.formatMoney(totalInterest.toFixed(2)));
        cell.appendChild(text);
        // Balance
        cell = row.insertCell();
        text = document.createTextNode(accounting.formatMoney(remainingBalance.toFixed(2)));
        cell.appendChild(text);
    }
    let totalCost = parseInt(loan) + totalInterest;
    document.getElementById("totalinterest").innerHTML = `${accounting.formatMoney(totalInterest.toFixed(2))}`;
    document.getElementById("totalcost").innerHTML = `${accounting.formatMoney(totalCost)}`;
}