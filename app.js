$( document ).ready(function() {
    $('input').keypress(function(e){
        $(this).removeClass('input-empty');
        var character = String.fromCharCode(e.keyCode)
        var newValue = this.value + character;
        if (isNaN(newValue) || hasDecimalPlace(newValue, 3)) {
            e.preventDefault();
            return false;
        }

    })
    $('.text-input').text(function(){
        $(this).val(emptyinput(this));
    })    
    $('.text-input').focus(function(){
        $(this).removeClass('input-empty');
        val=$(this).val()==0?"":$(this).val();
        if(!val){
            emptyinput(this);
        }
        $(this).val(val);
        $(this).parent().addClass("input-active"); 
        $(this).parent().removeClass("input-error"); 
    })
  
    $('.text-input').focusout(function(){
        val=$(this).val()=="" || $(this).val()==0 ?emptyinput(this):$(this).val();
        $(this).val(val);
        $(this).parent().removeClass("input-active");
        validation(this);
    })
    $('.text-input').keyup(function(){
        validation(this);
    })
    $('div.tipp-container > button.btn-input').click(function(){
        $('input.btn-input').val("");
        $('div.tipp-container > button.btn-input').removeClass("btn-active");
        $(this).addClass("btn-active"); 
    })
    $('input').keyup(function(){
        countAll();
    })
    $('.tipp-container > .btn-input').click(function(){
        countAll();
    })
    $("input.btn-input").focus(function(){
        $('div.tipp-container > button.btn-input').removeClass("btn-active");
    });
});


function tipp(val){
    $("#tip-input").val(val);
}

function countAll(){
    if($('#bill').val() > 0 && $('#person').val()  >0 && $('#tip-input').val()  >=0){
        per_person=$('#bill').val() / $('#person').val();
        tips= (per_person * $('#tip-input').val())/100 ;
        total_person=per_person + tips;
    }else{
        tips=0;
        total_person=0;
    }
    $('#tip').html('$'+tips.toFixed(2));
    $('#total').html('$'+total_person.toFixed(2));
}
function emptyinput(el){
    $(el).val("0");
    $(el).addClass('input-empty');
    return 0;
}
function validation(el){
    $(el).parent().parent().find('.warning').remove();
    if($(el).val()==0){
        $(el).parent().removeClass("input-active"); 
        $(el).parent().addClass("input-error"); 
        $(el).parent().parent().find('.label').append('<div class="warning">Can\'t be zero</div>');
    }
}

function hasDecimalPlace(value, x) {
    var pointIndex = value.indexOf('.');
    return  pointIndex >= 0 && pointIndex < value.length - x;
}

function resetAll(){
    emptyinput('.text-input');
    $('div.tipp-container > button.btn-input').removeClass("btn-active");
    $('div.tipp-container > input.btn-input').val("");
    $('#tip-input').val("0"); 
    $('.text-input').parent().parent().find('.warning').remove();
    $('.text-input').parent().removeClass("input-error"); 
    countAll();
}