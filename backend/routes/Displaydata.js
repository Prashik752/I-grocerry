const express = require('express')

const router = express.Router()

router.post('/g_items', async (req, res) => {
    try {
        res.send([global.g_items,global.g_category]);
    } catch (error) {
        console.error(error.message);
        res.send("server Error in displaydata");
    }
})

module.exports = router;