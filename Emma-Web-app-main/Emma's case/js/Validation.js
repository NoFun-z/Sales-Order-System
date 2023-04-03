const cardInfo = document.getElementById('cardInfo');
const ctv = document.getElementById('ctv');

function setErrorFor(input, message){
    const formControl = input.parentElement; // .form-control
    const small = formControl.querySelector("small");

    small.innerText = message;

    formControl.className = "form-control-box-sales error";
}

function setSuccessFor(input){
    const formControl = input.parentElement;
    formControl.className = "form-control-box-sales success";
}

function checkInputs(){
    const cardInfo = cardInfo.value.trim();
    const ctv = ctv.value.trim();

    if(cardInfo === ""){
        //It will show the error
        //Add the error to the class
        setErrorFor(cardInfo, "You must fill the blanks of your credit card");
    } else {
        setSuccessFor(cardInfo);
    }
}