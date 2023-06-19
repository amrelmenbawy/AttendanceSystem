window.addEventListener("load",function(){

    // *********************************display register********************************************* 
    let registerbtn = document.getElementById("registerbtn");
    registerbtn.addEventListener('click',function(e){
        e.preventDefault();
        document.writeln("<h1 stly>Error 404 not found</h1>")
        window.open("Home.html","_blank");
    });
     // *********************************the end of display register ********************************** 
    //*******************************select Attendance page ***********************/
    let AttendancePage=document.getElementById("Attendance");
    let ProfilePage=document.getElementById("Profile");
    let logoutPage=document.getElementById("logout");
    AttendancePage.addEventListener('click',function(){
        let mywindow=window.open("Attendance.html","_self");
        console.log(ID_username);
    })
    // let form =document.getElementsByTagName("form")[0];
    // form.addEventListener("submit",function(e){
    //     e.preventDefault();
    // })

//********************************** Login area************************************************** 
//initialization current_user
let c_user = {};
if(localStorage.getItem('current_user')){

    localStorage.setItem('current_user',JSON.stringify(c_user));
}
// **************************selection Area ******************************** 

let btnlogin =document.querySelector("input[value=login]");
let usernameinput =document.querySelector("input[name=username]");
let passwordinput =document.querySelector("input[name=password]");

btnlogin.addEventListener("click",function(e){
    // call login 
    e.preventDefault()
    if(login(usernameinput.value,passwordinput.value)){
        usernameinput.value="";
        passwordinput.value="";
        AttendancePage.classList.remove('disabled');
        ProfilePage.classList.remove('disabled');
        logoutPage.innerText="Logout";
    };
});
//******************************function area *******************************
function IsValidUser(username){
    let users =JSON.parse(localStorage.getItem('employees'));
    let flag = false;
    users.forEach(val => {
        if(val?.username == username){
            flag = true;
            usernameinput.classList.remove('is-invalid');
            // usernameinput.classList.add('is-valid');
        }
    });
    return flag;
}

function IsValidpassword(password){
    let users =JSON.parse(localStorage.getItem('employees'));
    let flag = false;
    users.forEach(val => {
        if(val?.password == password){
            flag = true;
            passwordinput.classList.remove('is-invalid');
            // passwordinput.classList.add('is-valid');
            localStorage.setItem("current_user",JSON.stringify(val));
        }
    });
    return flag;
}
//
function GetRole(username){
    let users =JSON.parse(localStorage.getItem('employees'));
    let role = "";
    users.forEach(val => {
        if(val?.username == username){
            role = val.role;
        }
    });
    
    return role;
}
function GetLogin(username){
    let users =JSON.parse(localStorage.getItem('employees'));
    let login = false;
    users.forEach(val => {
        if(val?.username == username){
            login = val.login;
        }
    });
    
    return login;
}
//
function login(username , password){
    let flag =true;
    if(IsValidUser(username) && IsValidpassword(password)){
        let login =GetLogin(username);
        // if admin Confirm user can be login
        if(login)  
        {
            let r= GetRole(username);
            if(r=="Admin"){
                window.open("ProfileAdmin.html","_self");
            }
            // else if(r=="Security"){
            //     console.log("hello Security");
            // }
            else{
                window.open("Profile.html","_self");
                //window.open("Attendance.html","_self");
    
            }
        }
        else{
            alert("ask admin for confirmation") ;
            flag=false;
        }
    }
    else{
        if(!IsValidUser(username)){
            usernameinput.classList.add('is-invalid');
            usernameinput.classList.remove('is-valid');
        }
        else if(!IsValidpassword(password)){
            passwordinput.classList.add('is-invalid');
            passwordinput.classList.remove('is-valid');
        }
        flag =false;
    }
    return flag;
}
});//the end of window load 
