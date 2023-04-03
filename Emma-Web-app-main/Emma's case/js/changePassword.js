
    let user = "";
    const form = document.querySelector("form")
    eField = form.querySelector(".email"),
    eInput = eField.querySelector("input"),
    pField = form.querySelector(".Newpassword"),
    pInput = pField.querySelector("input");
    cField = form.querySelector(".Confpassword")
    cInput = cField.querySelector("input");
    aField = form.querySelector(".Adminpassword");
    aInput = aField.querySelector("input");

   // let pattern = {"Dave Kendell":"Prog1180", "Wendy":"Prog1180", "Sam":"Prog1180"};

    form.onsubmit = (e) => {
        e.preventDefault(); //preventing from form submitting
        //if email and password is blank then add shake class in it else call specified function
        (eInput.value == "") ? eField.classList.add("shake", "error") : checkUser();
        (pInput.value == "") ? pField.classList.add("shake", "error") : checkPass();
        (cInput.value == "") ? pField.classList.add("shake", "error") : checkPass();
        (aInput.value == "") ? pField.classList.add("shake", "error") : checkPass();


        setTimeout(() => { //remove shake class after 500ms
            eField.classList.remove("shake");
            pField.classList.remove("shake");
            cField.classList.remove("shake");
            aField.classList.remove("shake");
        }, 500);


        eInput.onkeyup = () => { checkUser(); } //calling checkEmail function on email input keyup
        pInput.onkeyup = () => { checkPass(); } //calling checkPassword function on pass input keyup
        cInput.onkeyup = () => { checkPass(); }
        aInput.onkeyup = () => { checkPass(); }

        
        function checkUser() { //checkEmail function
             //pattern for validate email
            let aux = Object.keys(pattern)

            for(let i = 0; i < aux.length; i++){
                console.log(aux[i])
                if (!eInput.value.match(aux[i])) { //if pattern not matched then add error and remove valid class
                    eField.classList.add("error");
                    eField.classList.remove("valid");
                    let errorTxt = eField.querySelector(".error-txt");
                    //if email value is not empty then show please enter valid email else show Email can't be blank
                    (eInput.value != "") ? errorTxt.innerText = "Enter a valid User" : errorTxt.innerText = "Username can't be blank";
                } else { //if pattern matched then remove error and add valid class
                    eField.classList.remove("error");
                    user = eField.value;
                    eField.classList.add("valid");
                    console.log(user);
                    localStorage.setItem('Charge', eInput.value);
                    break;
                }
            }
        }


        function checkPass() { //checkPass function
            //pattern for validate email
            let aux1 = pInput.value;
            let aux2 = eInput.value
            let aux3 = pattern[aux2];
            let adminPass = "Admin#" //pattern for validate email
            for(let i = 0; i < Object.keys(pattern).length; i++){
                if (pInput.value.match(aux3)) { //if pattern not matched then add error and remove valid class
                    pField.classList.add("error");
                    pField.classList.remove("valid");
                    let errorTxt = pField.querySelector(".error-txt");
                    //if email value is not empty then show please enter valid email else show Email can't be blank
                    (pInput.value != "") ? errorTxt.innerText = "Password can't be the same as the old one" : errorTxt.innerText = "Password can't be blank";
                } 
                else if (!cInput.value.match(aux1)) { //if pattern not matched then add error and remove valid class
                    cField.classList.add("error");
                    cField.classList.remove("valid");
                    let errorTxt = cField.querySelector(".error-txt");
                    //if email value is not empty then show please enter valid email else show Email can't be blank
                    (cInput.value != "") ? errorTxt.innerText = "Passwords don't match" : errorTxt.innerText = "Password can't be blank";
                }
                else if (!aInput.value.match(adminPass)) { //if pattern not matched then add error and remove valid class
                    aField.classList.add("error");
                    aField.classList.remove("valid");
                    let errorTxt = aField.querySelector(".error-txt");
                    //if email value is not empty then show please enter valid email else show Email can't be blank
                    (aInput.value != "") ? errorTxt.innerText = "Wrong admin password" : errorTxt.innerText = "Password can't be blank";
                } 
                else { //if pattern matched then remove error and add valid class
                    pField.classList.remove("error");
                    pField.classList.add("valid");
                    pattern[eInput] = cInput;
                    localStorage.setItem("newPass", cInput.value);
                    localStorage.setItem("changed", eInput.value);
                }
            }
            /*
            if (pInput.value != "Prog1180" || pInput.value == "") { //if pass is empty then add error and remove valid class
                pField.classList.add("error");
                pField.classList.remove("valid");
                let errorTxt = eField.querySelector(".error-txt");
                //if email value is not empty then show please enter valid email else show Email can't be blank
                (pInput.value != "") ? errorTxt.innerText = "Enter a valid Password" : errorTxt.innerText = "Passwprd can't be blank";
            } else { //if pass is empty then remove error and add valid class
                pField.classList.remove("error");
                pField.classList.add("valid");
            }*/
        }


        //if eField and pField doesn't contains error class that mean user filled details properly
        if (!eField.classList.contains("error") && !pField.classList.contains("error") && !cField.classList.contains("error") && !aField.classList.contains("error")) {
            window.location.href = form.getAttribute("action"); //redirecting user to the specified url which is inside action attribute of form tag
        }
    };

function help(){
    console.log(localStorage);
}