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