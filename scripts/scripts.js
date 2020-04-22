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
    });
}

// user selects a theme
app.themeSelect = () => {
    $(`.option`).on(`click`, function () {
        app.callApi($(this).text());
        $(`.selection`).toggleClass(`visuallyHidden`);
        $(`.gallery`).removeClass(`galleryHidden`);
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
                <div class="displayUserOptions">
                <a target="_blank" class="highRes visuallyHidden" href="${imageLink}"><i class="fas fa-search-plus"></i>View Image in HR</a>
                </div>
            </li>`);
    })
}

// SELECTS First image
app.firstSelect = () => {
    $(`ul`).one(`click`, `li`, function () {
        $(this).toggleClass(`selected`);
        $(this).siblings().toggleClass(`notSelected`);
        $(`.galleryContainer h3`).html(`Good choice, pick one more!`);
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
        app.displayArtInitial(thirdArray);
        $(`.notSelected`).remove();
        $(`li`).addClass(`selected`);
        if ($(`ul`).children().hasClass(`selected`)) {
            const highRes = $(`img`).attr(`src`);
            // a tag not active
            $(`.displayUserOptions`).append(`
                <a class="addGall"><i class="fas fa-plus-square"></i>Add to Gallery</a>
            `).addClass(`animated fadeInUp`)
            $(`.highRes`).removeClass(`visuallyHidden`).addClass(`fadeInUp`)
        }
        app.errorHandling();
    });
}

app.errorHandling = () => {
    $(`.addGall`).on(`click`, () => {
            alert('No gallery available');
    });
}

$(`.searchButton`).on(`click`, function () {
    location.reload(true);
    $(`html, body`).scrollTop(0);
}); 

// init FUNCTION Calls
app.init = () => {
    app.dropdownMenu();
    app.themeSelect();
    app.firstSelect();
    app.secondSelect();
}

// DOCUMENT READY... with init FUNCTION CALL
$(() => {
    app.init();
})
