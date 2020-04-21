const app = {};

// ajax key
app.key = `fbeuXXM5`;
// ajax URL
app.url = `https://www.rijksmuseum.nl/api/en/collection`;

app.randomArray = [];

// ajax call
app.callApi = (search) => {
    $.ajax({
        url: app.url,
        method: `GET`,
        dataType: `json`,
        data: {
            key: app.key,
            format: `json`,
            q: search,
            ps: 100
        }
    }).then((result) => {
        // randomizing results 
        app.randomArray = result.artObjects;
        app.shuffle(app.randomArray);
        // picking first 3 images
        cutArray = app.randomArray.slice(1, 4);
        // putting elements on the page
        app.displayArtInitial(cutArray);
    });
}

// shuffling function
app.shuffle = function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// dropdown menu
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
app.themeSelect = () => {
    $(`.option`).on(`click`, function () {
        app.callApi($(this).text());
        $(`.selection`)
            .toggleClass(`visuallyHidden`)
    })
}

// PASTING IMAGE IN
app.displayArtInitial = (artpieces) => {
    // looping through sliced array;
    artpieces.forEach((artWork) => {
        const imageLink = artWork.webImage.url;
        const altText = artWork.longTitle;
        const insertImage = `<img src="${imageLink}" alt="${altText}">`;
        // adding the hover effect
        const descriptionOfArt = `
            <div class="mask"></div> 
            <p class="descriptionOfArt">${altText}</p>`
        // dynamically appending to the DOM
        $(`.imageContainer`).append(`
            <li class="artWorks">
                ${insertImage}
                ${descriptionOfArt}
                <div class="displayUserOptions"></div>
            </li>`
        );
    })
}

// SELECTS First image
app.firstSelect = () => {
    $(`ul`).one(`click`, `li`, function () {
        $(this).toggleClass(`selected`);
        $(this).siblings().toggleClass(`notSelected`);
        $(`.galleryContainer h3`).html(`Good choice, pick one more!`);
        // app.displayUserOptions();
        // SELECTS OTHER IMAGES
        if ($('li').hasClass(`notSelected`)) {
            // Clears other images
            $(`.notSelected`).remove();
            // using global variable grabs next images in the array
            const secondArray = app.randomArray.slice(5, 7);
            // displays the images
            app.displayArtInitial(secondArray);
            $(this).siblings().toggleClass(`notSelected`);
        }
    });
}

// selection second image image
app.secondSelect = () => {
    $(`ul`).one(`click`, `.notSelected`, function () {
        $(this).toggleClass(`selected`);
        $(this).toggleClass(`notSelected`);
        $(`.galleryContainer h3`).html(`Great, images are selected!`);
        // replacing the third image with a different one 
        const thirdArray = app.randomArray.slice(8, 9);
        const object = $(`ul`).children();

        app.displayArtInitial(thirdArray);
        $(`.notSelected`).remove();
        $(`li`).addClass(`selected`);
        const highRes = $(`.selected img`).attr(`src`);
        if ($(`ul`).children().hasClass(`selected`)) {
            $(`.displayUserOptions`).append(`
                <a target="_blank" class="addGall" href="#"><i class="fas fa-plus-square"></i>Add to Gallery</a>
                <a target="_blank" class="highRes" href="${highRes}"><i class="fas fa-search-plus"></i>View Image in HR</a>
            `).addClass(`animated fadeInUp`)
            }
    });
}

// error handling
app.errorHandling = () => {
    $(`ul`).on(`click`, `li`, () => {
        $('li').hasClass(`selected`) ?
            console.log('PICK ANOTHER, already selected') : console.log(`not selected`);
    });
}

// display user options
// app.displayUserOptions = () => {
//     $(`.userOptions`).append(`
//         <p>Add to Personal Gallery</p>
//         <p>View image larger</p>
//     `);
// }

// smooth scrolling
app.scrolling = () => {
    $(`.scrollEffect`).on(`click`, function () {
        console.log(`SMOOTHER SCROLLING to be added`);
    });
}

// init FUNCTION Calls
app.init = () => {
    app.scrolling();
    app.dropdownMenu();
    app.themeSelect();
    // app.displayUserOptions();
    app.firstSelect();
    app.secondSelect();
    app.errorHandling();
}

// DOCUMENT READY... with init FUNCTION CALL
$(() => {
    app.init();
})



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

// LISTENER ON IMAGES
//     USER Must select one
//         … ERROR Handling, can only select one image
        // … ERROR Handling, if no images were selected

// LISTENER for REFINED SEARCH
//     MAKE API call
//         ….RANDOMIZE, the returned API call
//     REPLACE, 2 Images in DOM
    // … interact with DOM, change message “choose your second image”
    // USER MUST select 2nd image
    //     … ERROR Handling, two images must be selected

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