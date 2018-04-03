var baseUrl = "http://localhost:8080/api/";


$(document).ready(function(){
console.log("doc ready");


 function getData(){
    /**    $.ajax({

        url : baseUrl+"airplane",

        type: "get",

        success: function(data){

        airplanedata = "";

            $.each(data,function(index, current){

                airplanedata += createPlaneString(current);
            });

            $("#airplanedata").html(airplanedata);
           }
        });
        */
            $('#airplanedata').DataTable().ajax.reload();
     }

    $("#addAirplaneButton").click(function(){

            var jsonObject={
                flightNumber: $("#flightNumber").val(),
                petrol: Number($("#petrol").val()),
                location: $("#location").val(),
            };

                $.ajax({
                        contentType : "application/json",
                         // waar moet hij de request op uitvoeren
                         url : baseUrl+"airplane ",
                          // type actie
                         type : "post",
                         data: JSON.stringify(jsonObject),
                          // als de actie lukt, voer deze functie uit
                          success: function(data){ // so the data is the bulb of the response of the Spring Boot REST controller
                                console.log(data);
                                getData();
                          }
                });

    });


});




function createPlaneString(plane){
    result = "<tr><td>"+plane.flightNumber+"</td><td>"+plane.petrol+"</td><td>"+plane.location+"</td></tr>";
return result;
}