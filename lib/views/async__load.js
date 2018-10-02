/*<--- ASYNC FILE LOADER --->*/

'use strict';

var async__load = function(url) {

    return new Promise((resolve, reject) => {

        const xhr = new XMLHttpRequest();

        xhr.open("GET", url);

        xhr.onload = () => resolve(xhr.responseText);

        xhr.onerror = () => reject(xhr.statusText);

        xhr.send();
    });
}

module.exports = async__load;