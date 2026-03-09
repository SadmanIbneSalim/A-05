
document.getElementById('log-in-btn').addEventListener('click',function(){
    const logInUsername=document.getElementById('logIn-username');
username=logInUsername.value;

const logInPassword=document.getElementById('logIn-password');
password=logInPassword.value;

if(username==='admin' && password==='admin123'){
    window.location.assign('/A-05/home.html')


}
else{
    alert('invalid')
}

})