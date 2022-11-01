export function form(){
$('#secondpanel').hide('fast');
$('#btnNext').on('click',(function() {
  $('#firstpanel').hide('fast', function() {
      $('#secondpanel').show('fast');
  });
}));
}