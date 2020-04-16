// // namespacing
const app = {};

// ajax key
app.key = `fbeuXXM5`;

// ajax call
app.getArt = () => {
    $.ajax({
        url: `https://www.rijksmuseum.nl/api/en/collection`,
        method: `GET`,
        dataType: `json`,
        data: {
            key: app.key,
            format: `json` 
        }
    })
}

// once the select button is clicked => menu is displayed
app.dropdownMenu = function() {
    $(`.selectButton`).on(`click`, function() {
        $(`.selectButtonBox`).addClass(`smallerMargin`);
        $(`.option`).removeClass(`hidden`).addClass(`animated zoomIn`).one(`animationend`, function() {
            $(this).removeClass(`animated fadeInUp`)
        });
        $(`.underline`).removeClass(`hidden`).addClass(`animated zoomIn`);
        $(`.optionsBox`).addClass(`border slower animated fadeIn`)
    });
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


// EXTRA CODE BITS
// _______________________________________________
// // SHUFFLING ARRAY randomly
// // Fisher-Yates shuffle. 
// app.shuffle = function shuffle(array) {
//     for (let i = array.length - 1; i > 0; i--) {
//         let j = Math.floor(Math.random() * (i + 1));
//         [array[i], array[j]] = [array[j], array[i]];
//     }
//     // console.log(app.sourceArray, `...remove log`); 
// }
// -------------------------------------------------