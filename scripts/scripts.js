// namespacing
const app = {};

// ajax key
app.key = `fbeuXXM5`;
// ajax URL
app.url = `https://www.rijksmuseum.nl/api/en/collection`;

app.randomArray = []; 
// ajax CALL to API
// NOTE: temporarily set to return 10 images only
app.callApi = (search) => {
    $.ajax({
        url: app.url,
        method: `GET`,
        dataType: `json`,
        data: {
            key: app.key,
            format: `json`, 
            q: search,
            // ps: 100
            p: 10 //temporary smaller api call for testing
            // showImage: false;
        }
    }).then((result) => {
        // randomizing results 
        app.randomArray = result.artObjects;      
        app.shuffle(app.randomArray);
        // picking first 3 images
        const cutArray = app.randomArray.slice(1, 4);

        // const secondArray = randomArray.slice(5, 7);
        // putting elements on the page
        app.displayArtInitial(cutArray); 
    });
}

// Shuffling function
app.shuffle = function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Display DROPDOWN
app.dropdownMenu = () => {
    $(`.selectButton`).on(`click`, function () {
        $(`.selectButtonBox`).addClass(`smallerMargin`);
        $(`.option`).removeClass(`hidden`).addClass(`animated zoomIn`).one(`animationend`, function () {
            $(this).removeClass(`animated fadeInUp`)
        });
        $(`.underline`).removeClass(`hidden`).addClass(`animated zoomIn`);
        $(`.optionsBox`).addClass(`border slower animated fadeIn`);
        console.log(`dropdown initiated`)
    });
}

// user selects a theme
app.themeSelect= () => {
    $(`.option`).on(`click`, function () {
        app.callApi($(this).text());
        $(`.selection`)
            .toggleClass(`visuallyHidden`)
            // .toggleClass(`hideOnSelect`);
            // .addClass(`hideOnSelect`);
        console.log(`theme selected, section.selection hidden, api called`);

        // HIDE ME AFTER 1st SELECTION
    })
}

// PASTING IMAGE IN
app.displayArtInitial = (artpieces) => {
    // looping through sliced array
    artpieces.forEach((artWork) => {
        const imageLink = artWork.webImage;
        const altText = artWork.longTitle;
        const insertImage = `<img src="${imageLink.url}" alt="${altText}">`;
        // dynamically appending to the DOM
        $(`.imageContainer`).append(`<li class="artWorks">${insertImage}</li>`);
        // $(insertImage).appendTo(`.imageContainer li`);
    })
}

app.firstSelect = () =>{
    $(`ul`).on(`click`, `li`, function () {
        console.log(this);
        $(this).toggleClass(`selected`);
        $(this).siblings().toggleClass(`notSelected`);
        if ($('li').hasClass(`notSelected`)) {
            $(`.notSelected`).remove();
            console.log(this);
            const secondArray = app.randomArray.slice(5, 7);
            console.log(secondArray);
            app.displayArtInitial(secondArray);
            // const secondArray = randomArray.slice(5, 7);
            // console.log(app.displayArtIniial); 
        }
            // .toggleClass(`selected`);

        // if ($(this).hasClass(`selected`)) {
        //     $(this);
        // } else if ($(this).hasClass(`notSelected`)) {
        //     console.log(`bye`)`
        // }
            
            // $(`li`).siblings()
            //     // .removeClass(`selected`)
        console.log(`image select is working`);

        // HIDE ME AFTER 1st SELECTION
    })
}

// MENU LISTENER,
//     USER selects from a drop down/ menu
// app.themeSelect = function() {
//     $(`.option`).on(`click`, function(){
//         console.log(`hello`);
//     })
// }
//     MAKE API Call
//         … determine number to be returned
//         ….RANDOMIZE, the returned API call
//     TRACK of NUMBER of Calls
//     ...CREATE rule for 1st three searches
//     DOM to display 3  returned images
//     DOM to display message “ … choose one




// init FUNCTION Calls
app.init = () => {
    // app.shuffle(app.sourceArray);  // JUST NEED TO supply array
    // app.nextFuction();
    app.dropdownMenu();
    // app.imageSelection();
    app.themeSelect();
    app.firstSelect();
}


// DOCUMENT READY... with init FUNCTION CALL
$(() => {
    app.init();
})




// LISTENER ON IMAGES
//     USER Must select one
//         … ERROR Handling, can only select one image
//         … ERROR Handling, if no images were selected

// LISTENER for REFINED SEARCH
//     MAKE API call
//         ….RANDOMIZE, the returned API call
//     REPLACE, 2 Images in DOM
//     … interact with DOM, change message “choose your second image”
//     USER MUST select 2nd image
//         … ERROR Handling, two images must be selected

// Repeat REFINED SEARCH
//     MAKE API call
//         ….RANDOMIZE, the returned API call
//     REPLACE, 1 Image in DOM
//    (NOTE: 3 of 3 Searches completed)
//     … interact with DOM, change message “your selected images”

// OFFER user options,
//     revise the DOM
//     … allow OVERLAY, on IMAGES, once initial three searches are completed
//     … create BUTTON, to KEEP any of the select IMAGES
//     … create BUTTON for NEW SEARCH / REVISE SEARCH
//     STRETCH
//     … create BUTTON, to ADD images to GALLERY   
//        … create BUTTON, to REVIEW images larger 
//     … create interactions within the gallery and large image view

// Provide Link for User Gallery
//     ( note Gallery is only active during session )


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
// -----------------------------------------------