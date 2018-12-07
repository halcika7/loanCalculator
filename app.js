document.getElementById('loan-form').addEventListener('submit', calculateResults);

function calculateResults(e) {
    e.preventDefault();
    // UI VARS
    const amount = document.querySelector('#amount').value;
    const interest = document.querySelector('#interest').value;
    const years = document.querySelector('#years').value;
    const mPayment = document.querySelector('#monthly-payment');
    const tPayment = document.querySelector('#total-payment');
    const tInterest = document.querySelector('#total-interest');
    const principal = parseFloat(amount);
    const calculatedInterest = parseFloat(interest)/100/12;
    const calculatedPayments = parseFloat(years) * 12;

    calculateMonthlyPayments(principal,calculatedInterest,calculatedPayments,mPayment,tPayment,tInterest);

}

function calculateMonthlyPayments(amount,interest,years,mPayment,tPayment,tInterest) {
    
    const x = Math.pow(1 + interest, years);
    const monthly = (amount*x*interest)/(x-1);
    document.getElementById('results').style.display = 'none';
    document.getElementById('loading').style.display = 'block';
    setTimeout(function(){

        if(isFinite(monthly)){
                mPayment.value = monthly.toFixed(2);
                tPayment.value = (monthly * interest).toFixed(2);
                tInterest.value = ((monthly * years) - amount).toFixed(2);
                document.getElementById('results').style.display = 'block';
        }else {
            showError('Please check your numbers');
        }
        document.getElementById('loading').style.display = 'none';
    },2000);
}

function showError(error) {
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');
    // create div
    const errorDiv = document.createElement('div');
    errorDiv.className = 'alert alert-danger';
    errorDiv.appendChild(document.createTextNode(error));

    card.insertBefore(errorDiv,heading);

    setTimeout(() => {
        card.children[0].remove();
    },2000);
}