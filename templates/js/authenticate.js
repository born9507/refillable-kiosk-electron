const url = "http://sangw.iptime.org:8001"

var signup = () => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var username = document.getElementById('phoneNum').value
  var password1 = document.getElementById('password1').value
  var password2 = document.getElementById('password2').value
  var certificate = document.getElementById('certificate').value

  var raw = JSON.stringify({"username":username,"password1":password1,"password2":password2,"certificate":certificate});

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  fetch(url+"/users/register/", requestOptions)
    .then(response => {return response.json()})
    .then(result => {
      var inlines = ['phoneNumHelpInline', 'password1HelpInline', 'password2HelpInline', 'certificateHelpInline']
      for(inline of inlines) {
        document.getElementById(inline).innerHTML = ""
      }

      if (result.message == "username exists") {
        document.getElementById("phoneNumHelpInline").innerHTML = "가입된 번호입니다."
      } 
      else if(result.message == "username short") { 
        document.getElementById("phoneNumHelpInline").innerHTML = "너무 짧습니다!"
      } 
      else if (result.message == "password not matching") {
        document.getElementById("password1HelpInline").innerHTML = "일치하지 않습니다"
        document.getElementById("password2HelpInline").innerHTML = "일치하지 않습니다"
      }
      else if (result.message == "password wrong length") {
        document.getElementById("password1HelpInline").innerHTML = "4자리 비밀번호를 입력해주세요"
        document.getElementById("password2HelpInline").innerHTML = "4자리 비밀번호를 입력해주세요"
      }
      else if (result.message == "no certificate") {
        document.getElementById("certificateHelpInline").innerHTML = "인증번호가 없습니다"

      }
      else if (result.message == "wrong certificate") {
        document.getElementById("certificateHelpInline").innerHTML = "인증번호가 다릅니다"
      }
      // 여기가 진짜 로그인 로직
      else if (result.hasOwnProperty('key')) {
        localStorage.setItem('key', result.key)
        window.location.href = "greet.html"
      }
    })
    .catch(error => {
      console.log('error', error)
      document.getElementById("phoneNumHelpInline").innerHTML = "서버 에러입니다"
    });}


var login = () => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  
  var username = document.getElementById('phoneNum').value
  var password1 = document.getElementById('password1').value
  
  var raw = JSON.stringify({"username":username,"password":password1});
  
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
  
  fetch(url+"/rest-auth/login/", requestOptions)
    .then(response => {return response.json()})
    .then(result => {
      console.log(result)
      
      var inlines = ['phoneNumHelpInline', 'passwordHelpInline']
      for(inline of inlines) {
        document.getElementById(inline).innerHTML = ""
      }

      if (result.hasOwnProperty("password")) {        
        console.log(result.password)
        document.getElementById("passwordHelpInline").innerHTML = "비밀번호를 입력해주세요"
      }
      else if (result.hasOwnProperty("non_field_errors")) {
        console.log(result.non_field_errors)
        document.getElementById("passwordHelpInline").innerHTML = "전화번호 혹은 비밀번호가 틀렸습니다"
      }
      else if (result.hasOwnProperty("key")) {
        localStorage.setItem('key', result.key)
        window.location.href = "greet.html"
      }
    })
    .catch(error => {
      console.log('error', error)
      document.getElementById("passwordHelpInline").innerHTML = "서버 에러입니다"
    });
}


var logout = () => {
  var myHeaders = new Headers();
  var token = localStorage.getItem('key')
  myHeaders.append("Authorization", "token "+token);
  
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    redirect: 'follow'
  };
  
  fetch(url+"/rest-auth/logout/", requestOptions)
    .then(response => {return response.json()})
    .then(result => {
      if (result.detail == "Invalid token.") {
        console.log("Invalid token")
      }
      else if (result.detail == "Successfully logged out.") {
        console.log("logged out")
      }
      localStorage.setItem('key', '')   
      // console.log(localStorage.getItem('key'))   

      window.location.href = "index.html"
    })
    .catch(error => {
      console.log('error', error)
      document.getElementById("passwordHelpInline").innerHTML = "서버 에러입니다"
    });
}




