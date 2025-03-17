const axios = require('axios');
exports.getArticle = async (req, res) => {
    try{
        const GUARDIAN_API_KEY = process.env.GUARDIAN_API_KEY
        
        const response = await axios.get('https://content.guardianapis.com/search', {
            params: {
                'api-key': GUARDIAN_API_KEY,
                'section': "science",
                'show-fields': "trailText,body"
            }
        })
        res.json({
            data: response.data
        })
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching articles from The Guardian',
            error: error.message
          });
    }


    // res.json({message: "hello backend"});
}