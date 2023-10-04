const express = require('express');
const _ = require('lodash');
const axios = require('axios');
const { getStat } = require('./data_analytics');


const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.json({
        msg: "Testing"
    })
})

app.get("/api/blog-stats", async(req, res) => {
    try {
        const response = await axios.get('https://intent-kit-16.hasura.app/api/rest/blogs', {
            headers: {
                'x-hasura-admin-secret': '32qR4KmXOIpsGPQKMqEJHGJS27G5s7HdSKO3gdtQd2kv5e852SiYwWNfxkZOBuQ6',
            }
        });

    const stat = getStat(response.data.blogs); // getting statistics from getStats function.
    res.json(stat);

    } catch(error) {
        console.log("error while fetching blog data...");
        res.status(500).json({
            error: "Server error"
        });
    }
});


app.get("/api/blog-search", async(req, res) => {

    try {
        const { q } = req.query;
        const response = await axios.get('https://intent-kit-16.hasura.app/api/rest/blogs', {
            headers: {
                'x-hasura-admin-secret': '32qR4KmXOIpsGPQKMqEJHGJS27G5s7HdSKO3gdtQd2kv5e852SiYwWNfxkZOBuQ6',
            }
        });

        //searching..
        const search = _.filter(response.data.blogs, (blog) => {
            return _.includes(_.toLower(blog.title), _.toLower(q))
        });
        
        res.json(search);

    } catch(error) {
        console.log("Error while searching...");
        res.status(500).json({
            error: "Server error"
        })
    }
});
  
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})