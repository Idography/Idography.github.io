const CURRENCY = {
    "USD": "$",
    "NIS": "₪"
};

function load() {
    Module.load("UI", "Popup", "Typewriter").then(() => {
        // Load the images
        loadImages();
        // Show home and animate text
        UI.show("home");
        for (let paragraph of document.getElementsByTagName("p"))
            Typewriter.type(paragraph);
    }).catch(console.warn);
}

function loadImages() {
    // Fetch index
    fetch("https://idography.com/Images/Index.csv").then((response) => {
        // Parse as CSV
        response.text().then((csv) => {
            // Split
            let indexes = csv.split(",");
            // Loop and load images
            for (let index of indexes) {
                // Trim index
                index = index.trim();
                // Load information
                fetch("https://idography.com/Images/Contents/" + index + "/Information.json").then((response) => {
                    // Parse as JSON
                    response.json().then((json) => {
                        if (json.hasOwnProperty("metadata") && json.hasOwnProperty("price")) {
                            // Populate a template and append it
                            let view = UI.populate("image-view", {
                                index: index,
                                name: json.metadata.name,
                                description: json.metadata.description,
                                price: json.price.value,
                                currency: CURRENCY[json.price.currency]
                            });
                            // Append view
                            UI.find("images").appendChild(view);
                        }
                    });
                });
            }
        });
    }).catch(console.warn);
}