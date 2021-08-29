const path = require("path")

exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions
    const date = new Date()
    const day = String(date.getUTCDate()).padStart(2,'0')
    const month = String(date.getUTCMonth() + 1).padStart(2,'0')
    const year = String(date.getUTCFullYear())
    createPage({
        path: '/',
        component: path.resolve(`./src/index.js`),
        context: {
            today: year + '-' + month + '-' + day
        }
    })
}