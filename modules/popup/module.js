/**
 * Copyright (c) 2020 Nadav Tasher
 * https://github.com/NadavTasher/Modules/
 **/

class Popup {
    /**
     * Shows a simple message.
     * @param title Title
     * @param message Message
     * @return Promise
     */
    static alert(title, message) {
        return new Promise(function (resolve, reject) {
            // Fetch the resource
            Helper.resource(Popup, "alert.html").then((html) => {
                // Populate template
                document.body.appendChild(UI.populate(html, {
                    title: title,
                    message: message
                }));
                // Set click listener
                UI.find("popup-alert-close").addEventListener("click", function () {
                    // Close popup
                    UI.remove("popup-alert");
                    // Resolve promise
                    resolve();
                });
            });
        });
    }

    /**
     * Prompts for input.
     * @param title Title
     * @param message Message
     * @return Promise
     */
    static prompt(title, message) {
        return new Promise(function (resolve, reject) {
            // Fetch the resource
            Helper.resource(Popup, "prompt.html").then((html) => {
                // Populate template
                document.body.appendChild(UI.populate(html, {
                    title: title,
                    message: message
                }));
                // Set click listeners
                UI.find("popup-prompt-cancel").addEventListener("click", function () {
                    // Close popup
                    UI.remove("popup-prompt");
                    // Reject promise
                    reject();
                });
                UI.find("popup-prompt-finish").addEventListener("click", function () {
                    // Read value
                    let value = UI.find("popup-prompt-input").value;
                    // Close popup
                    UI.remove("popup-prompt");
                    // Resolve promise
                    resolve(value);
                });
            });
        });
    }

    /**
     * Toasts a short message.
     * @param message Message
     * @return Promise
     */
    static toast(message) {
        return new Promise(function (resolve, reject) {
            // Fetch the resource
            Helper.resource(Popup, "toast.html").then((html) => {
                // Populate template
                document.body.appendChild(UI.populate(html, {
                    message: message
                }));
                // Set timeout
                setTimeout(function () {
                    // Close popup
                    UI.remove("popup-toast");
                    // Resolve the promise
                    resolve();
                }, 3000);
            });
        });
    }

    /**
     * Shows a progress popup.
     * @param message Message
     * @param promise Promise
     * @return Promise
     */
    static progress(message, promise) {
        return new Promise(function (resolve, reject) {
            // Fetch the resource
            Helper.resource(Popup, "progress.html").then((html) => {
                // Populate template
                document.body.appendChild(UI.populate(html, {
                    message: message
                }));
                // Listen to promise events
                promise.then(function () {
                    // Close popup
                    UI.remove("popup-progress");
                    // Resolve
                    resolve(...arguments);
                });
                promise.catch(function () {
                    // Close popup
                    UI.remove("popup-progress");
                    // Resolve
                    reject(...arguments);
                });
            });
        });
    }
}