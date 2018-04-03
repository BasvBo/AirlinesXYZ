$(document).ready(function() {

        $('#airplanedata').DataTable( {
                "order": [[ 0, "asc" ]],
                "ajax": {
                        url: 'http://localhost:8080/api/airplane',
                        dataSrc: ''
                    },
                "columns": [
                    { "data": "flightNumber" },
                    { "data": "petrol" },
                    { "data": "location" },
                    { "data": function( data, type, row){

                        var toReturn = "";

                        $.each(data.reservedTable, function (index, current){
                            toReturn = toReturn + current.tableNumber + ", ";
                        });

                        return toReturn;

                    }}

                ]
         } );


    // Functionality for interaction when clicking on rows of the table
        $('#airplanedata tbody').on( 'click', 'tr', function () {
            if ( $(this).hasClass('selected') ) {
                $(this).removeClass('selected');
            }
            else {
                deselect();
                $(this).addClass('selected');
                var table = $('#airplanedata').DataTable();
                var data = table.row(this).data();
                console.log(data);
                apiGetSingleReservation(data.id);
                $('#myModal').modal('toggle');
            }
        });

} );

function getData() {
      var api = "http://localhost:8080/api/airplane";
        $.get(api, function(data){
            if (data){
                setData(data);
            }
        });
}

function setData(data){
    $("#airplanedata").DataTable().clear();
    $("#airplanedata").DataTable().rows.add(data);
    $("#airplanedata").DataTable().columns.adjust().draw();
}



// Get the data of a planeusing an id
function apiGetSingleplane(id){
    var api = "http://localhost:8080/api/airplane/" + id;
    $.get(api, function(data){
        if (data){
            fillUpdateDiv(data);
        }
    });
}

// Fill the form with planedata when updating the plane
function fillUpdateDiv(plane){

    console.log(plane);
    $("#btndelete").attr('onclick', 'submitDelete(' + airplane.id + ');');
    $("#btnsubmit").attr('onclick', 'submitEdit(' + airplane.id + ');');
    document.getElementById("modal-title").innerHTML="Edit airplane";
    $("#flightNumber").val(airplane.flightNumber);
    $("#petrol").val(airplane.petrol);

    $("#confirmbutton").css('display', 'inline-block');
    deleteID = airplane.id;
    var elem = '<button type="button" class="btn btn-danger" onclick="submitDelete();">Confirm delete</button>';
    $('#confirmbutton').popover({
        animation:true,
        content:elem,
        html:true,
        container: myModal
    });
}

// Deselect all items in the table
function deselect(){
    $('#airplanedata tr.selected').removeClass('selected');
    // rloman dit moet straks terug. ik denk dat dit het modal form is
    document.getElementById("planeForm").reset();
}

// Submit the edited data in the form to the database
function submitEdit(id){
// shortcut for filling the formData as a JavaScript object with the fields in the form
    console.log("Formdata");
    var formData = $("#planeForm").serializeArray().reduce(function(result, object){ result[object.name] = object.value; return result}, {});
    console.log(formData);
    var planeNumber = id;
    for(var key in formData){
        if(formData[key] == "" || formData == null) delete formData[key];
    }
    $.ajax({
        url:"http://localhost:8080/api/airplane" + planeNumber,
        type:"put",
        data: JSON.stringify(formData),
        contentType: "application/json; charset=utf-8",
        success: getData,
        error: function(error){
            displayError(error);
        }
    });
    deselect();
    $('#myModal').modal('toggle');
}

// Delete the plane in the database with the corresponding id
function submitDelete(){
    console.log("Deleting");
    var formData = $("#planeForm").serializeArray().reduce(function(result, object){ result[object.name] = object.value; return result}, {});
    var planetNumber = deleteID;
    $.ajax({
        url:"http://localhost:8080/api/airplane" + planetNumber,
        type:"delete",
        data: JSON.stringify(formData),
        success: getData,
        contentType: "application/json; charset=utf-8"
    });

    $('#myModal').modal('toggle');
    deselect();
}