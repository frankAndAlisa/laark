// // namespacing
const app = {};

// // SHUFFLING ARRAY randomly
// // Fisher-Yates shuffle. 
// app.shuffle = function shuffle(array) {
//     for (let i = array.length - 1; i > 0; i--) {
//         let j = Math.floor(Math.random() * (i + 1));
//         [array[i], array[j]] = [array[j], array[i]];
//     }
//     // console.log(app.sourceArray, `...remove log`); 
// }


// once the select button is clicked => drop the menu down
app.dropdownMenu = function() {
    $(`button`).on(`click`, function() {
        $(`#check`).addClass(`animated fadeIn`).one(`animationend`, function() {
            $(this).removeClass(`animated fadeIn`)
        })
    })
}


// init FUNCTION Calls
app.init = () => {
    // app.shuffle(app.sourceArray);  // JUST NEED TO supply array
    // app.nextFuction();
    app.dropdownMenu();
}


// DOCUMENT READY... with init FUNCTION CALL
$(() => {
    app.init();

})