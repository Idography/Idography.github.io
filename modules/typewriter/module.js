/**
 * Copyright (c) 2020 Nadav Tasher
 * https://github.com/NadavTasher/Modules/
 **/

class Typewriter {
    /**
     * Animates a view typing
     * @param view View
     */
    static type(view) {
        // Find the view
        view = UI.find(view);
        // Load the final text
        let text = view.innerHTML;
        // Clear the text
        view.innerHTML = null;
        // Create a promise
        return new Promise((resolve, reject) => {
            // Create a function
            let type = function () {
                if (view.innerHTML.length !== text.length) {
                    let character = text[view.innerHTML.length];
                    // Append the character
                    view.innerHTML += character;
                    // Calculate time
                    let time = 100;
                    // Special characters
                    if (character === ",")
                        time = 200;
                    // Schedule the next loop
                    setTimeout(type, time);
                } else {
                    resolve();
                }
            };
            // Start typing
            setTimeout(type, 200);
        });
    }
}