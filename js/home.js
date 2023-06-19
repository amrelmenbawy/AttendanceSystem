
window.addEventListener("load",function(){
        
    // *******************************************display login******************************************* 
    let loginbtn =document.getElementById("loginbtn");
    loginbtn.addEventListener('click',function(e){
        e.preventDefault();
        window.open("Login.html", "_blank");
    })// the end of display login 

    //****************************storage data in localstorage by jason and selection of  data*************************
    
    let firstname=document.querySelector("input[name=firstname]");
    let lastname= document.querySelector("input[name=lastname]");
    let age=document.querySelector("input[name=age]");
    let address=document.querySelector("input[name=address]");
    let email=document.querySelector("input[type=email]");
    let role=document.querySelector("input[name=role]");

    let admin ={
        ID : 100,   
        fname : "Amr",
        lname: "Ahmed",
        Age: 26,
        email :"amr.ahmed.elmenbawy@gmail.com",
        address: "st_elbadaly",
        username : "amrahmed",
        password : 12345678,
        role : "Admin",
        attendancearray : {},
        departurearray  : {},
        login:true,
        move :1,
    };

    let arr =[admin];
    let c_user = {};
    // Creation for Localstorage 
    if(localStorage.getItem('employees') == null)
    {
        localStorage.setItem('employees',JSON.stringify(arr));
    }
    //initialization current_user
    if(localStorage.getItem('current_user')){

        localStorage.setItem('current_user',JSON.stringify(c_user));
    }

     // ********************************** area  of validation*********************************************** 

    (() => {
    'use strict'
    const forms = document.querySelectorAll('.needs-validation')
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (
                !form.checkValidity() ||
                !IsValidFirstName()   ||
                !IsValidLastName()    ||
                !IsValidAddress()     ||
                !IsValidAge()         ||
                !validateEmail()
                ) 
            {
            event.preventDefault()
            event.stopPropagation()
            }
        if (
            form.checkValidity() &&
            IsValidFirstName()   &&
            IsValidLastName()    &&
            IsValidAddress()     &&
            IsValidAge()         &&
            validateEmail()
        )
        {
            event.preventDefault()
            // create object take right data from form  
            let myemployeeopject ={
                ID : Date.now(),   
                fname : firstname.value.trim(),
                lname: lastname.value.trim(),
                Age: age.value,
                email: email.value.trim(),
                address: address.value.trim(),
                username: GetRandomUsernameORPassword(10),
                password: GetRandomUsernameORPassword(8),
                role:role.value,
                attendancearray : {'4/23/2023': ["8:30:00 AM"],'4/24/2023': ["8:30:00 AM"],'4/25/2023': ["8:30:00 AM"],'4/26/2023': ["8:30:00 AM"],'4/27/2023': ["8:30:00 AM"],'4/30/2023': ["8:30:00 AM"],'5/1/2023': ["8:30:00 AM"],'5/2/2023': ["8:30:00 AM"],'5/3/2023': ["8:30:00 AM"],'5/4/2023': ["8:30:00 AM"],'5/4/2023': ["8:30:00 AM"],'5/7/2023': ["8:30:00 AM"],'5/8/2023': ["8:30:00 AM"],'5/9/2023': ["8:30:00 AM"],'5/10/2023': ["8:30:00 AM"],'5/11/2023': ["8:30:00 AM"],'5/14/2023': ["8:30:00 AM"],'5/15/2023': ["8:30:00 AM"]},//["4/20/2023, 8:30:00 AM","4/23/2023, 8:30:00 AM","4/24/2023, 8:30:00 AM","4/25/2023, 8:30:00 AM","4/26/2023, 8:30:00 AM","4/27/2023, 8:30:00 AM","4/30/2023, 8:30:00 AM"],
                departurearray  : {'4/23/2023': ["3:30:00 PM"],'4/24/2023': ["3:30:00 PM"],'4/25/2023': ["3:30:00 PM"],'4/26/2023': ["3:30:00 PM"],'4/27/2023': ["3:30:00 PM"],'4/30/2023': ["3:30:00 PM"],'5/1/2023': ["3:30:00 PM"],'5/2/2023': ["3:30:00 PM"],'5/3/2023': ["3:30:00 PM"],'5/4/2023': ["3:30:00 PM"],'5/4/2023': ["3:30:00 PM"],'5/7/2023': ["3:30:00 PM"],'5/8/2023': ["3:30:00 PM"],'5/9/2023': ["3:30:00 PM"],'5/10/2023': ["3:30:00 PM"],'5/11/2023': ["3:30:00 PM"],'5/14/2023': ["3:30:00 PM"],'5/15/2023': ["3:30:00 PM"]},//["4/20/2023, 3:30:00 PM","4/23/2023, 3:30:00 PM","4/24/2023, 3:30:00 PM","4/25/2023, 3:30:00 PM","4/26/2023, 3:30:00 PM","4/27/2023, 3:30:00 PM","4/30/2023, 3:30:00 PM",],
                login:false,
                move :1,
            }
            // Sending Email for user 
            
            SendEmailToUserToGiveUsernameAndPassword(myemployeeopject.email,myemployeeopject.username,myemployeeopject.password);
            
            //Store Employee's data in our localstorage 
            let old_data =JSON.parse(localStorage.getItem('employees'));
            old_data.push(myemployeeopject);
            localStorage.setItem('employees',JSON.stringify(old_data)); 
            firstname.value=""
            lastname.value=""
            age.value=""
            email.value=""
            address.value=""
        }
        else{
        form.classList.add('was-validated')
        }
        }, false)
    })
    })()

// ****************************************First name validation ********************************************** 
//const reSpaces = /^\S*$/;

    function IsValidFirstName(){
        let firstnameValue = firstname.value.trim();
        let  mypattern =/^[A-Za-z]{3,}$/
        if(!mypattern.test(firstnameValue) ) {
            firstname.classList.add('is-invalid');
            firstname.classList.remove('is-valid');
            return false ;
        }
        else {
            firstname.classList.remove('is-invalid');
            firstname.classList.add('is-valid');
            return true ;
        }
    }
    firstname.addEventListener("blur",IsValidFirstName);

// ****************************************last name validation ********************************************** 

    function IsValidLastName(){
        let lastnameValue = lastname.value.trim();
        let  mypattern =/^[A-Za-z]{3,}$/
        if(!mypattern.test(lastnameValue) ) {
            lastname.classList.add('is-invalid');
            lastname.classList.remove('is-valid');
            return false ;
        }
        else {
            lastname.classList.remove('is-invalid')
            lastname.classList.add('is-valid')
            return true ;
        }
    }

lastname.addEventListener("blur",IsValidLastName);

// ****************************************Address validation ********************************************** 

    function IsValidAddress(){
        let addressValue = address.value.trim();
        let mypattern =/^.{3,}$/;
        if(!mypattern.test(addressValue))
        {
            address.classList.add('is-invalid');
            address.classList.remove('is-valid')
            return false ;
        }
        else {
            address.classList.remove('is-invalid')
            address.classList.add('is-valid')
            return true ;
        }
    }
address.addEventListener("blur",IsValidAddress);
// ****************************************Age validation ********************************************** 

function IsValidAge(){
    let ageValue = age.value.trim();
    if(ageValue === '') {
        age.classList.add('is-invalid');
        age.classList.remove('is-valid');
        return false ;
    } 
    else {
        age.classList.remove('is-invalid')
        age.classList.add('is-valid')
        return true ;
    }
}
age.addEventListener("blur",IsValidAge);


// **************************************** Email validation ********************************************** 

function IsValidEmail(emaill){
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{3,3})+$/;
    return  mailformat.test(emaill);
}
function IsNotEmailUniqe(eamil){
    let old_d =JSON.parse(localStorage.getItem('employees'));
    let flag = false;
    old_d.forEach(val => {
        if(val?.email == eamil){
            flag = true;
        }
    });
    return flag;
}
function validateEmail(){
    let emailValue = email.value.trim();
    if (!IsValidEmail(emailValue)) {
        email.classList.add('is-invalid');
        email.classList.remove('is-valid');
        return false;
    } 
    else if ( IsNotEmailUniqe(emailValue)){
        email.classList.add('is-invalid');
        email.classList.add('is-valid');
        return false;
    }
    else {
        email.classList.remove('is-invalid')
        email.classList.add('is-valid')
        return true ;
    }
};
email.addEventListener("blur",validateEmail);

//**************************************Generate USername and Password**********************************
function GetRandomUsernameORPassword(count){
    const mypattern ="asdfghklASDFGHJKLQWERTYUIOPqwertyuiopzxcvbnmZXCVBNM1234567890$#%";
    let myRondeom ="";
    for (let i = 0; i < count; i++) {
        myRondeom +=mypattern[Math.floor(Math.random()*mypattern.length)];
    }
    return myRondeom ;
}
//**************************************** API for send Email to user  ***********************************
function SendEmailToUserToGiveUsernameAndPassword(eamil,username,password){
    console.log("sendmail")
    emailjs.send("service_h3pybng","template_ortmyge",{
        from_name: "emailsender.60@gmail.com",
        email_id: eamil,
        message: `your username is ${username} and your password ${password}`,
        }).then(
                    function(){
                        alert("sent")
                    }
                );
}
});//the end of window load
