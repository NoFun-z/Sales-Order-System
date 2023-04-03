function invInvoice(){
    var x = localStorage.getItem('totals');
    var z = localStorage.getItem('item').split(',');
    
    let itemz = document.getElementById('itemsINV');
    let iepricez = document.getElementById('itemsPriceINV');
    let totalz = document.getElementById('totalPriceINV');

    z.forEach(e => {
        itemz.innerText += `| ${e} |`
    });
    iepricez.innerText = `$${x}`;
    totalz.innerText = `Total: $${x}`;
}

function GetCustData(){
    let div = document.getElementById('paymenInfo');
    console.log(div.children);
    let PaymentSA = document.getElementsByName("PaymentType");
    for (let i = 0 ; i < PaymentSA.length; i++){
        if (PaymentSA[i].checked == true){
            if(i == 0){
                let kids = div.children[1];
                let kkid2 = div.children[4];
                localStorage.setItem('CardInfo', kids.value);
                localStorage.setItem('CCVInfo', kkid2.value);
                return 0;
            }
            if(i == 1){
                let kid2s = div.children[1];
                localStorage.setItem('Card2Info', kid2s.value);
                return 1;
            }
            if(i == 2){
                if(document.getElementById("payCheck").checked){return 2;}
                else {return 3;}
            }
        }
      }
    let kids = div.children[1];
    let kkid2 = div.children[4];
    localStorage.setItem('CardInfo', kids.value);
    localStorage.setItem('CCVInfo', kkid2.value);
}

function test(){
    var x = localStorage.getItem('total');
    var y = localStorage.getItem('taxes');
    var z = localStorage.getItem('items').split(',');
    var w = localStorage.getItem('price');
    var r = localStorage.getItem('payment');
    var custName = localStorage.getItem('CustName');

    let itemss = document.getElementById('items');
    let ieprice = document.getElementById('itemsPrice');
    let txPrice = document.getElementById('taxesPrices');
    let total = document.getElementById('totalPrice');
    let paytype = document.getElementById('PaymentTy');
    let payNumber = document.getElementById('PayNum');
    let custinfo = document.getElementById('info');
    console.log(custinfo);
    z.forEach(e => {
        itemss.innerText += `| ${e} |`
    });
    ieprice.innerText = `$${x}`;
    txPrice.innerText = `$${y}`;
    total.innerText = `Total: $${w}`;
    paytype.innerHTML = `${r}`;
    info.innerHTML = `Invoice #: XXX<br />Created: November 17th, 2022<br />Due: December 8th, 2022<br />Customer: ${custName}`

    if(r == "Debit/Credit"){
        payNumber.innerText = "Visa (Credit/Debit) #"
    }
    if(r == "PayPal"){
        payNumber.innerText = "PayPal Account #"
    }
    if(r == "Checking"){
        payNumber.innerText = "Check Deposit #"
    }
}