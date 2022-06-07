function searchMovie(){
    $('#movieList').html('');
    $.ajax({
        url: 'http://omdbapi.com',
        type: 'get',
        dataType: 'json',
        data: {
            'apikey' : 'aa012edb',
            's' : $('#searchInput').val()
        },
        success: function(hasil){
            if(hasil.Response == "True"){
                let movies = hasil.Search
                $.each(movies, function(i,data){
                    $('#movieList').append(`
                    <div class="col-md-4 p-2 d-flex justify-content-center">
                        <div class="card" style="width: 18rem;">
                            <img src=` + data.Poster + ` class="card-img-top" alt="...">
                            <div class="card-body">
                                <h5 class="card-title">`+ data.Title +`</h5>
                                <h6 class="card-subtitle mb-2 text-muted">`+ data.Year +`</h6>
                                <a href="#" class="card-link seeDetail" data-bs-toggle="modal" data-bs-target="#exampleModal" data-id="`+ data.imdbID+`">See Detail</a>
                            </div>
                        </div>
                    </div>
                    `)
                })

                $('#searchInput').val('')

            }else{
                $('#movieList').html(`
                    <div class="col">
                        <h1 class="text-center">`+ hasil.Error + `</h1>
                    </div>
                `)
            }
        }
    })
}

$('#searchButton').on('click', function(){
    searchMovie();
})
$('#searchInput').on('keyup', function(e){
    if(e.keyCode === 13){
        searchMovie();
    }
})

$('#movieList').on('click', '.seeDetail', function(){

    $.ajax({
        url: 'http://omdbapi.com',
        type: 'get',
        dataType: 'json',
        data: {
            'apikey' : 'aa012edb',
            'i' : $(this).data('id')
        },
        success: function(hasil){
            if(hasil.Response === "True"){
                    $('.modal-body').html(`
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-md-4">
                                <img src="`+hasil.Poster+`" class="img-fluid mx-auto d-block">
                            </div>
                            <div class="col-md-8">
                            <ul class="list-group">
                                <li class="list-group-item"><h3>` + hasil.Title + `</h3></li>
                                <li class="list-group-item">Released : ` + hasil.Released + `</li>
                                <li class="list-group-item">Genre : ` + hasil.Genre + `</li>
                                <li class="list-group-item">Director : ` + hasil.Director + `</li>
                                <li class="list-group-item">Actor : ` + hasil.Actors + `</li>
                            </ul>
                            </div>
                        </div>
                    </div>
                    `)

            }
        }
    })
})