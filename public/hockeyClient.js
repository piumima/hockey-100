$(document).ready(function(){
    $('#submit').click(function(){
        var id = $('#id').val();
        $.ajax({
            url: "/getCardStats",
            method: "POST",
            data: {"id":id}, 
            success: function(data){
                loadCard(data);
            },
            error: function(data){
                handleError(data);
            },
        });
    });
    
    $('#french').click(function(){
        location.href="/nfctap-f.html";
    });
    
    $('#english').click(function(){
        location.href="/nfctap-e.html";
    });
});