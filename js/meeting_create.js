let setCookie = function(name, value, exp) {
    let date = new Date();
    date.setTime(date.getTime() + exp*24*60*60*1000);
    document.cookie = name + '=' + value + ';expires=' + date.toUTCString() + ';path=/';
};

function get_cookie(name) {
  let value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
  return value? value[2] : null; }


// 모임 생성
function create_meeting(){
  let token = get_cookie("Authorization");
  let name = $('#inputName').val();
  let image = $('#inputImage')[0];
  let totalParticipationNum = $('#inputCnt').val();
  let startDate = $('#inputStartDate').val();
  let endDate = $('#inputEndDate').val();
  let description = $('#description').val();

  var data = {
    "name" : name,
    "totalParticipationNum" : totalParticipationNum,
    "description" : description,
    "startDate" : startDate,
    "endDate" : endDate
  }

  var form = new FormData
  form.append("meetingRequest", new Blob([JSON.stringify(data)], {type: "application/json"}))
  form.append("image", image.files[0])

  if(name.length == 0){
    alert("제목을 입력해주세요")
    return;
  }else if(image.files.length == 0){
    alert("대표 이미지를 선택해주세요")
    return;
  }

  console.log(data)
  console.log(image.files[0])
  $.ajax({
    type: "POST",
    url: URL + "/meeting",
    data: form,
    contentType: false,
    processDate: false,
    beforeSend: function(xhr){
      xhr.setRequestHeader("Authorization", token);
    },
    success: function(response){
      console.log(response)
    }
  })
}