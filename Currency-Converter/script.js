const base_url = "https://v6.exchangerate-api.com/v6/134eda82d253ae7f7f53ce9a/pair";

let dropdowns = document.querySelectorAll('.dropdown select');
const btn = document.querySelector('form button');
const from = document.querySelector('.from select');
const to = document.querySelector('.to select');
const msg = document.querySelector('.msg');


for (let select of dropdowns) {
    for (const currCode in countryList) {
        let newOption = document.createElement('option');
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name === 'from' && currCode === 'USD') {
            newOption.selected = "selected";
        } else if (select.name === 'to' && currCode === 'INR') {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }


    select.addEventListener("change", (e) => {
        updateFlag(e.target);
    });
}


let updateFlag = (changeElement) => {
    let currCode = changeElement.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = changeElement.parentElement.querySelector('img');
    img.src = newSrc;
};


btn.addEventListener('click', async (e) => {
    e.preventDefault();
    let amount = document.querySelector('.amount input');
    let amountValue = parseFloat(amount.value);
    console.log(amountValue);

    if (isNaN(amountValue) || amountValue <= 0) {
        alert('Please Enter a valid Amount');
        amount.value = 1;
        amountValue = 1;
    }

    console.log(from.value, to.value);
    let url = `${base_url}/${from.value}/${to.value}`;
    let response = await fetch(url);
    let data = await response.json();
    let rate = data.conversion_rate;
    console.log(rate);
    let result = rate * amountValue;
    msg.innerText = `${amountValue} ${from.value} = ${result.toFixed(2)} ${to.value}`;
});
