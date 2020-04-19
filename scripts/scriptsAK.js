// hi Frank!// // namespacing
const app = {};

// ajax key
app.key = `fbeuXXM5`;
// ajax URL
app.url = `https://www.rijksmuseum.nl/api/en/collection`;

app.shuffle = function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// ajax call
app.getArt = (search) => {
    $.ajax({
        url: app.url,
        method: `GET`,
        dataType: `json`,
        data: {
            key: app.key,
            format: `json`, 
            q: search,
            ps: 100
            // showImage: false;
        }
    }).then((result) => {
        // console.log(result);
        // randomizing results 
        const randomArray = result.artObjects;      
        app.shuffle(randomArray);  
        // randomizing sliced array 
        const cutArray = randomArray.slice(1, 4);
        app.shuffle(cutArray); 
        // putting elements on the page
        app.putElementOnPage(cutArray); 
    });
}

app.putElementOnPage = (artpieces) => {
    // looping through sliced array
    artpieces.forEach((artWork) => {
        const imageLink = artWork.webImage;
        const altText = artWork.longTitle;
        const insertImage = `<img src="${imageLink.url}" alt="${altText}">`;
        console.log(insertImage);
        // dynamically appending to the DOM
        $(`ul`).append(`<li class="artWork">${insertImage}</li>`);
    })
}


// user chooses an option => display paintings
app.displayArt = () => {
    $(`.option`).on(`click`, function() {
        app.getArt($(this).text()); 
    })
}


// PASTING IMAGE IN
app.imageSelection = function () {
    $(`.imageContainer li`).on(`click`, function () {
        // console this
        $(this).append(`<img src="" alt="" srcset=""></img>`)
    })
}


// once the select button is clicked => menu is displayed
app.dropdownMenu = () => {
    $(`.selectButton`).on(`click`, function() {
        // console.log(this)
        $(`.selectButtonBox`).addClass(`smallerMargin`);
        $(`.option`).removeClass(`hidden`).addClass(`animated zoomIn`).one(`animationend`, function() {
            $(this).removeClass(`animated fadeInUp`) 
        });
        $(`.underline`).removeClass(`hidden`).addClass(`animated zoomIn`);
        $(`.optionsBox`).addClass(`border slower animated fadeIn`);
    });
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
    app.displayArt();
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