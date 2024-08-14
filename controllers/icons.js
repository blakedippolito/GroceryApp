// controllers/icons.js
const fetch = require('node-fetch'); // Ensure node-fetch is installed

const apiKey = 'PwjAgLxV7Joft66ji6VDPrvzaIlzpJjnUovewNEswP1UJOq1xqjvBE3uFRrWkesT';
const url = 'https://api.iconfinder.com/v4/';

async function searchIcons(icon) {
    const searchUrl = `${url}icons/search?query=${encodeURIComponent(icon)}&count=2`;
    const headers = { 'Authorization': `Bearer ${apiKey}` };

    try {
        const response = await fetch(searchUrl, { headers: headers });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const objs = data.icons[1]?.raster_sizes || [];
        
        for (const o of objs) {
            const link = o.formats[0]?.preview_url;
            if (link && link.includes('32')) {
                return link;
            }
        }
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}

async function getIcons(req, res) {
    const icon = req.query.icon; // Extract the icon from query parameters

    try {
        const link = await searchIcons(icon);
        res.json({ link });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { getIcons };
