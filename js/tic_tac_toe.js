// GAME STATE!
// WARNING! GLOBAL VARIABLE MUTATION AHEAD!
// Initialize a blank game
var game = new Array(9);
// Turn: 1 is red 2 is blue
var turn = 1;



// Turn lookup. Is a dictionary better?
var turn_color = [,'red','blue']

// Get a flattened cell index
function cell_index(cell) { return $(cell).data("row")*3 + $(cell).data("col"); }
// Toggles turn between 1 and 2
function inc_turn(turn) { return turn % 2 + 1; }

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

$(document).ready(function(){
    // Take the appropriate action when a box is clicked
    $('.box_cell').click(function(){
        var i = cell_index(this);
        
        // If the cell is open
        if(!game[i]) {
            // Change Game data
            game[i] = turn;
            // Change 'view'
            $(this).addClass(turn_color[turn]);
            if(is_game_over(i)) {
                alert("Game Over!");
                location.reload();
            }
            else {
                inc_turn();
            }
        }
    });
});
