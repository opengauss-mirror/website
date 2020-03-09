const fs = require('fs');
module.exports = {
    css: {
        loaderOptions: {
            sass: {
                prependData: `@import "@/style.scss";`
            }
        }
    }
}