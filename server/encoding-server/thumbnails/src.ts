
const extractTsUrls = async (m3u8Url: string) => {
    try {
        console.log('Fetching M3U8 file:', m3u8Url)
        const response = await fetch(m3u8Url);

        const body = await response.text();
        console.log(body)
        const lines = body.split('\n');
        for (const line of lines) {
    if (line.endsWith('.ts')) {
        console.log('TS Segment URL:', line);

    }
}
} catch (error) {
    console.error('Error fetching M3U8 file:', error);
}
}