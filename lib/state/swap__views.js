/*<--- ROTATE VIEWS --->*/

var swap__views = function(cur_route, new_route){

    var x = document.getElementsByClassName(cur_route);
    x[0].classList.add("hidden");

    var y = document.getElementsByClassName(new_route);
    y[0].classList.remove("hidden");

    return new_route;
}

module.exports = swap__views;