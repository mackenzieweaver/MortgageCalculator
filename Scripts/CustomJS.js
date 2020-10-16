// Calculate calls all other functions
function Calculate(loan, term, rate) {
    const table = document.getElementById("tbody");
    // If there's already a table, remove it
    while (table.firstChild) {
        table.removeChild(table.firstChild);
    }
    // So money is rounded to 2 decimal places
    let precision = 2;
    // Total Principal = loan
    document.getElementById("totalprincipal").innerHTML = `${accounting.formatMoney(loan)}`;
    //Total Monthly Payment = (amount loaned) * (rate/1200) / (1 – (1 + rate/1200)(-Number of Months) )
    //1.
    let totalMonthlyPayment = (loan * (rate / 1200)) / (1 - Math.pow((1 + rate / 1200), -Math.abs(term)));
    document.getElementById("monthlypayment").innerHTML = `${accounting.formatMoney(totalMonthlyPayment.toFixed(precision))}`;
    // before the very first month equals the amount of the loan
    //2.
    let remainingBalance = loan;
    // Interest starting at zero 
    let totalInterest = 0;

    for (let i = 1; i <= term; i++) {
    //3.
        let interestPayment = remainingBalance * (rate / 1200);
        totalInterest += interestPayment;
    //4.
        let principalPayment = totalMonthlyPayment - interestPayment;
    //5. remainingBalance = remainingBalance - principalPayment
        remainingBalance -= principalPayment;

        // Create row in table
        let row = table.insertRow();
        row.setAttribute("scope", "row");
        //the table has a Header, Tbody, Row, Cell, and TextNode
        let cell = row.insertCell();
        let text = document.createTextNode(i.toString());
        cell.appendChild(text);
        // Payment
        cell = row.insertCell();
        text = document.createTextNode(accounting.formatMoney(totalMonthlyPayment.toFixed(precision)));
        cell.appendChild(text);
        // Principal
        cell = row.insertCell();
        text = document.createTextNode(accounting.formatMoney(principalPayment.toFixed(precision)));
        cell.appendChild(text);
        // Interest
        cell = row.insertCell();
        text = document.createTextNode(accounting.formatMoney(interestPayment.toFixed(precision)));
        cell.appendChild(text);
        // Total Interest
        cell = row.insertCell();
        text = document.createTextNode(accounting.formatMoney(totalInterest.toFixed(precision)));
        cell.appendChild(text);
        // Balance
        cell = row.insertCell();
        text = document.createTextNode(accounting.formatMoney(remainingBalance.toFixed(precision)));
        cell.appendChild(text);
    }
    let totalCost = parseInt(loan) + totalInterest;
    document.getElementById("totalinterest").innerHTML = `${accounting.formatMoney(totalInterest.toFixed(precision))}`;
    document.getElementById("totalcost").innerHTML = `${accounting.formatMoney(totalCost)}`;
}