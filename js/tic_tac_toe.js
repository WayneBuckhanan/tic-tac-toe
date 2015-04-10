// GAME STATE!
// WARNING! GLOBAL VARIABLE MUTATION AHEAD!
// Initialize a blank game
var game = [false,false,false,false,false,false,false,false,false];
// Turn: 1 is red 2 is blue
var turn = 1;



// Turn lookup. Is a dictionary better?
var turn_color = [,'red','blue']

// Get a flattened cell index
function cell_index(cell) { return $(cell).data("row")*3 + $(cell).data("col"); }
// Toggles turn between 1 and 2
function inc_turn(turn) { return turn % 2 + 1; }

// returns true if the given index is a side else false
function is_side(i) { return i%2 == 1; }
// returns true if the given index is a corner else false
function is_corner(i) { return i%2 == 0 && i != 4; }

//////
// Functions to check for game over conditions
//////
function is_game_over(i) {
    return check_col(i) || check_row(i) || check_diag(i) || cats();
}
// Check if the game is a tie
function cats() {
    return game.join("").length == 9;
}
// Checks the column i is in
function check_col(i) {
    var col = i%3;
    return game[col] == game[col+3] && game[col] == game[col+6];
}
// Checks the row i is in
function check_row(i) {
    // Get row number
    var row = i - i%3;
    return game[row] == game[row+1] && game[row] == game[row+2];
}
// Checks both diagonals
function check_diag(i) {
    return check_forward_diag(i) || check_back_diag(i);
}
function check_forward_diag(i) {
    return i % 4 == 0 && game[0]==game[4] && game[4]==game[8];
}
function check_back_diag(i) {
    return i % 8 != 0 && i % 2 == 0 && game[2]==game[4] && game[4]==game[6];
}

// RANDOM FUNCTIONS!
// No really, they generate random numbers. . .
// Returns a random int >= 0 and < n
// n -> [0,n)
function random_int(n) { return n == 0 ? false : Math.floor(Math.random()*n); }
// returns a random element in an array, a
function random_element(a) { return a[random_int(a.length)]; }

function empty_indices(a) { return a.map(each_empty_index).filter(is_not_false); }
function each_empty_index(val, i) { return val ? false : i; }
function is_not_false(v) { return !(v === false); }

// Random options
function free_space() { return random_element(empty_indices(game)); }
function free_side() { return random_element(empty_indices(game).filter(is_side));}
function free_corner() { return random_element(empty_indices(game).filter(is_corner));}
function binary() { return random_int(2); }

// Destructive functions!
function play_at(i) {
    // Change Game data
    game[i] = turn;
    
    update_view(i);
    if(is_game_over(i)) {
        //alert("Game Over!"+game+'\n'+is_game_over(i)+'\n'+check_col(i)+check_row(i)+check_diag(i));
        alert("Game Over!");
        location.reload();
    }
    else {
        turn = inc_turn(turn);
    }
}
function update_view(i) {
    $("#box_"+((i - i%3)/3)+"_"+(i%3)).addClass(turn_color[turn]);
}

// EVENTS
$(document).ready(function(){
    // Take the appropriate action when a box is clicked
    $('.box_cell').click(function(){
        var i = cell_index(this);
        // If the cell is open
        if(!game[i]) {
            play_at(i);
        }
    });
    
    // Buttons!
    $('.play').click(function() {
        console.log(this.id);
        // OMG MAGIC! No, it's just hubris. . .
        var i = window[this.id]();
        console.log(i);
        if(i === false || i === undefined) {
            console.log('no go!');
        } else {
            play_at(i);
        }
    });
    
    $('#binary').click(function(){
        var m = $('#message');
        m.fadeOut({
            complete: function(){
                m.text(''+binary());
                m.fadeIn();
            }
        });
    });
});
