function HCR(num) {
    switch (num) {
        case 1:
            window.localStorage.setItem("loan", "$100,000");
            window.localStorage.setItem("rate", "3.92");
            window.localStorage.setItem("term", "360");
            break;
        case 2:
            window.localStorage.setItem("loan", "$50,000");
            window.localStorage.setItem("rate", "4.37");
            window.localStorage.setItem("term", "72");
            break;
        case 3:
            window.localStorage.setItem("loan", "$10,000");
            window.localStorage.setItem("rate", "6.99");
            window.localStorage.setItem("term", "60");
            break;
    }
    location.replace("https://csw-loan-calc.netlify.app//Solve.html")
}

function CheckHCR() {
    if (window.localStorage.getItem("loan")) {
        document.getElementById("loan").value = window.localStorage.getItem("loan");
        document.getElementById("rate").value = window.localStorage.getItem("rate");
        document.getElementById("term").value = window.localStorage.getItem("term");
        window.localStorage.clear();
    }
}

// Calculate calls all other functions
function Calculate(loan, term, rate) {
    // Rate includes decimal
    rate = parseFloat(rate);
    loan = parseInt(loan.replace(/$/, '').replace(/,/g, '').replace(/./, ''));
    const table = document.getElementById("tbody");

    if (isNaN(loan)) {
        return;
    }
    // If there's already a table, remove it
    while (table.firstChild) {
        table.removeChild(table.firstChild);
    }
    // So money is rounded to 2 decimal places
    let precision = 2;
    // Total Principal = loan
    document.getElementById("totalprincipal").innerHTML = `${accounting.formatMoney(loan)}`;
    let totalMonthlyPayment;
    if (isNaN(rate) || rate == 0) {
        rate = 0;
        totalMonthlyPayment = loan / term;
    } else {
        //Total Monthly Payment = (amount loaned) * (rate/1200) / (1 – (1 + rate/1200)(-Number of Months) )
        // Equation 1
        totalMonthlyPayment = (loan * (rate / 1200)) / (1 - Math.pow((1 + rate / 1200), -Math.abs(term)));
    }

    document.getElementById("monthlypayment").innerHTML = `${accounting.formatMoney(totalMonthlyPayment.toFixed(precision))}`;
    // before the very first month equals the amount of the loan
    // Equation 2
    let remainingBalance = loan;
    // Interest starting at zero 
    let totalInterest = 0;
    if (isNaN(loan) || loan == 0) {
        term = 0;
        let row = table.insertRow();
        for (let i = 0; i < 6; i++) {
            row.setAttribute("scope", "row");
            //the table has a Header, Tbody, Row, Cell, and TextNode
            let cell = row.insertCell();
            let text = document.createTextNode("$0.00");
            cell.appendChild(text);
        }
    }
    let myLabels = [];
    let myPrincipalPayments = [];
    let myInterestPayments = [];
    let thePayment = [];
    for (let i = 1; i <= term; i++) {
        //Equation 3
        let interestPayment = remainingBalance * (rate / 1200);
        totalInterest += interestPayment;
        //Equation 4
        let principalPayment = totalMonthlyPayment - interestPayment;
        //Equation 5 remainingBalance = remainingBalance - principalPayment
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

        myPrincipalPayments.push(principalPayment);
        myInterestPayments.push(interestPayment)
        myLabels.push(i);
        thePayment.push(totalMonthlyPayment);
    }
    let totalCost = parseInt(loan) + totalInterest;
    document.getElementById("totalinterest").innerHTML = `${accounting.formatMoney(totalInterest.toFixed(precision))}`;
    document.getElementById("totalcost").innerHTML = `${accounting.formatMoney(totalCost)}`;

    // Chart Creation
    var ctx = document.getElementById('myChart');
    ctx.style.display = "block";
    var myChart = new Chart(ctx, {
        type: 'line',        
        data: {
            labels: myLabels,
            datasets: [{
                data: myPrincipalPayments,
                label: "Principal",
                borderColor: [
                    'rgba(255, 255, 255, 1)'
                ],
                borderWidth: 1
                },
                {
                    data: myInterestPayments,
                    label: "Interest",
                    borderColor: [
                        'rgba(0, 0, 0, 1)'
                    ],
                    borderWidth: 1
                },
                {
                    data: thePayment,
                    label: "Monthly Payment",
                    borderColor: [
                        'rgba(242, 177, 45, 1)'
                    ],
                    borderWidth: 1
                }
            ]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            },
        }
    });
}

function DownPayment(totalPrice, downPayment, loanAmount) {
    // turn strings into numbers
    totalPrice = parseInt(totalPrice.replace(/$/, '').replace(/,/g, '').replace(/./, ''));
    downPayment = parseInt(downPayment.replace(/$/, '').replace(/,/g, '').replace(/./, ''));
    loanAmount = parseInt(loanAmount.replace(/$/, '').replace(/,/g, '').replace(/./, ''));
    if (isNaN(totalPrice)) {
        downPayment = 0;
        downPayment = accounting.formatMoney(downPayment.toFixed(0));
        downPayment = downPayment.split('').splice(0, downPayment.length - 3).join("");
        document.getElementById("downPayment").value = `${downPayment}`;
    }
    if (totalPrice < downPayment) {
        downPayment = Math.floor(totalPrice * 0.9);
        downPayment = accounting.formatMoney(downPayment.toFixed(0));
        downPayment = downPayment.split('').splice(0, downPayment.length - 3).join("");
        document.getElementById("downPayment").value = `${downPayment}`;
    }
    if (isNaN(downPayment)) {
        loanAmount = totalPrice;
    } else {
        // adjust loan amount
        loanAmount = totalPrice - downPayment;
    }
    // Change Loan Amount Input Value
    loanAmount = accounting.formatMoney(loanAmount.toFixed(0));
    loanAmount = loanAmount.split('').splice(0, loanAmount.length - 3).join("");
    document.getElementById("loan").value = `${loanAmount}`;
}

// Rate accepts decimals up to 3 places
function validateRate(rate) {
    let char = rate.charAt(rate.length - 1);
    if (char == '.') {
        rate = rate.split('');
        rate.splice(rate.length - 1, 1);
        if (rate.indexOf(char) < 0) {
            rate.splice(rate.length, 0, char);
        }
        rate = rate.join('');
        document.getElementById("rate").value = rate;
    }
    if ((isNaN(parseInt(char)) && char != '.') || rate.length > 5) {
        rate = rate.split('');
        rate.splice(rate.length - 1, 1);
        rate = rate.join('');
        document.getElementById("rate").value = rate;
    }
}

//Reset button
function Reset() {
    document.getElementById('myChart').style.display = "none";
    document.getElementById("totalPrice").value = "$125,000";
    document.getElementById("downPayment").value = "$25,000";
    document.getElementById("loan").value = "$100,000";
    document.getElementById("rate").value = "3.92";
    document.getElementById("term").value = "360";
    document.getElementById("monthlypayment").innerText = "$0.00";
    document.getElementById("totalprincipal").innerText = "$0.00";
    document.getElementById("totalinterest").innerText = "$0.00";
    document.getElementById("totalcost").innerText = "$0.00";
    let table = document.getElementById("tbody");
    // If there's already a table, remove it
    while (table.firstChild) {
        table.removeChild(table.firstChild);
    }
    let row = table.insertRow();
    for (let i = 0; i < 6; i++) {
        row.setAttribute("scope", "row");
        //the table has a Header, Tbody, Row, Cell, and TextNode
        let cell = row.insertCell();
        let text = document.createTextNode("$0.00");
        cell.appendChild(text);
    }
}

if (window.location.href == "https://localhost:44382/Solve.html") {
    document.getElementById("downPayment").addEventListener("focusout", function () {
        // get strings
        let totalPrice = document.getElementById('totalPrice').value;
        let downPayment = document.getElementById('downPayment').value;
        let loanAmount = document.getElementById('loan').value;
        // get nums
        downPayment = parseInt(downPayment.replace(/$/, '').replace(/,/g, '').replace(/./, ''));
        totalPrice = parseInt(totalPrice.replace(/$/, '').replace(/,/g, '').replace(/./, ''));
        loanAmount = parseInt(loanAmount.replace(/$/, '').replace(/,/g, '').replace(/./, ''));

        if (downPayment < 10 || isNaN(downPayment)) {
            downPayment = Math.floor(totalPrice * 0.03);
            downPayment = accounting.formatMoney(downPayment.toFixed(0));
            downPayment = downPayment.split('').splice(0, downPayment.length - 3).join("");
            document.getElementById("downPayment").value = `${downPayment}`;
        }
        downPayment = document.getElementById('downPayment').value;
        downPayment = parseInt(downPayment.replace(/$/, '').replace(/,/g, '').replace(/./, ''));
        loanAmount = totalPrice - downPayment;

        // Change Loan Amount Input Value
        loanAmount = accounting.formatMoney(loanAmount.toFixed(0));
        loanAmount = loanAmount.split('').splice(0, loanAmount.length - 3).join("");
        document.getElementById("loan").value = `${loanAmount}`;
    });
}