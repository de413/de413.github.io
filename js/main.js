var liveBonus = [1,2,5,14,17,20,21,22,23,24,25];

$(document).ready(function(){
  currentDate();
  liveBonusSelect();
  colorfulPassSelect();
  challengeLiveSelect();
  daysLeft();
  $('.live_bonus').on('change', function() {
    parametersOnChange();
  });
  $('.colorful_pass').on('change', function() {
    parametersOnChange();
  });
  $('.challenge_live').on('change', function() {
    parametersOnChange();
  });
  $('.monthly_live_mission').on('input', function() {
    parametersOnChange();
  });
  $('.live_bonus').val($.cookie('live_bonus'));
  $('.colorful_pass').val($.cookie('colorful_pass'));
  $('.challenge_live').val($.cookie('challenge_live'));
  $('.monthly_live_mission').val($.cookie('monthly_live_mission'));
});

function currentDate(){
  $('.current_date').text(currentDateJST(new Date()).toString());
}

function liveBonusSelect(){
  let select = $('.live_bonus');
  for(let i = 0; i < liveBonus.length; i++){
    let option = $('<option></option>');
    option.text(i);
    option.val(liveBonus[i]);
    select.append(option);
  }
}

function colorfulPassSelect(){
  let select = $('.colorful_pass');
  select.append('<option value="2">あり</option>');
  select.append('<option value="1">なし</option>');
}

function challengeLiveSelect(){
  let select = $('.challenge_live');
  select.append('<option value="60">含む</option>');
  select.append('<option value="0">含まない</option>');
}

function daysLeft(){
  $('.remaining_days').text(daysLeftInMonth()+"日");
}

function parametersOnChange(){
  setCookies();
  let currentPoints = $('.monthly_live_mission').val();
  let liveBonusSetting = $('.live_bonus option:selected').index();
  let liveBonus = $('.live_bonus').val()*$('.colorful_pass').val();
  let daysLeft = daysLeftInMonth();
  let challengeLiveBonus = daysLeft*$('.challenge_live').val();
  let remainingPoints = 8000-currentPoints-challengeLiveBonus;
  let remainingLiveCount = Math.ceil(remainingPoints/liveBonus);
  let requiredLiveBonus = remainingLiveCount*liveBonusSetting;
  let remainingLiveCountPerDay = Math.ceil(remainingLiveCount/daysLeft);
  $('.remaining_points').text(remainingPoints);
  $('.required_live_bonus').text(requiredLiveBonus);
  $('.remaining_live_count').text(remainingLiveCount);
  $('.remaining_live_count_per_day').text(remainingLiveCountPerDay);
}

function currentDateJST(date){
  return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("ja-JP", {timeZone: "Asia/Tokyo"}));
}

function daysLeftInMonth() {
  const jst = currentDateJST(new Date());
  const lastDateOfMonth = new Date(jst.getYear(),jst.getMonth(),0);
  return lastDateOfMonth.getDate()-jst.getDate()+1;
}

function setCookies(){
  $.cookie('live_bonus', $('.live_bonus').val());
  $.cookie('colorful_pass', $('.colorful_pass').val());
  $.cookie('challenge_live', $('.challenge_live').val());
  $.cookie('monthly_live_mission', $('.monthly_live_mission').val());
}
