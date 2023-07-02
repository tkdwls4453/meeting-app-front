let URL = "http://localhost:8080"

function get_cookie(name) {
  let value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
  return value? value[2] : null; }

$(function(){
  keep_out()
});


// 로그인 , 로그아웃 온 오프
function keep_out() {
  let token = get_cookie("Authorization");
  $.ajax({
      type: "GET",
      url: URL + "/user",
      contentType: "application/json;",
      beforeSend: function (xhr) {
          xhr.setRequestHeader("Content-type","application/json");
          xhr.setRequestHeader("Authorization", token);
      },
      success: function (response) {    
        if(response.code == 500){
          $('#logout').hide()
          $('#login').show()  
        }else{
          console.log(response)
          $('#login').hide()
          $('#logout').show()
        }
      },
      error: function (xhr, ajaxOptions, thrownError) {
          console.log(xhr.status);
          console.log(thrownError);    
          $('#logout').hide()
          $('#login').show()  
      }
  })
}

function createMeeting(){
  console.log("모임 만들기")
}

// 로그아웃 기능
function logout(){
  $.removeCookie('Authorization');
  window.location.replace("/index.html");
  alert('로그아웃!');
}