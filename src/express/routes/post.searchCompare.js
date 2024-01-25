const natural = require('natural')

class SearchCompare {
    constructor(app) {
        this.app = app
    }

    method = 'POST'
    path = '/search-compare'

    async handleRequest(req, res) {
        const {query, blogs, precision} = req.body
        const newBlogs = blogs.filter((blog) => {
            const naturalValue = natural.JaroWinklerDistance(query, blog.description, {ignoreCase: true})
            console.log(blog.description)
            console.log(query)
            console.log(naturalValue)
            console.log('--------')
            return naturalValue > precision
        })

        res.status(200).json({status: 'Success!', message: newBlogs})
    }
}

module.exports = SearchCompare