function load() {
    Module.load("UI", "Popup", "Typewriter").then(() => {
        // Load the images
        loadImages();
    }).catch(console.warn);
}

function loadImages() {
    // Fetch index
    fetch("Images/Index.csv").then((response) => {
        // Parse as CSV
        response.text().then((csv) => {
            // Split
            let indexes = csv.split(",");
            // Loop and load images
            for (let index of indexes) {
                // Trim index
                index = index.trim();
                // Load information
                fetch("Images/Contents/" + index + "/Information.json").then((response) => {
                    // Parse as JSON
                    response.json().then((json)=>{

                    });
                });
                // Populate a template and append it
                let view = UI.populate("image-view", {});
            }
        });
    }).catch(console.warn);
}