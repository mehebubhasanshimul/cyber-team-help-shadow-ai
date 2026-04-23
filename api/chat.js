export default async function handler(req, res) {
    // শুধুমাত্র POST রিকোয়েস্ট গ্রহণ করবে
    if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

    const { prompt } = req.body;
    // Vercel Environment থেকে API Key টি নেবে
    const API_KEY = process.env.GEMINI_API_KEY; 

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }]
            })
        });

        const data = await response.json();
        const reply = data.candidates[0].content.parts[0].text;
        
        // উত্তরটি ফ্রন্টএন্ডে পাঠানো
        res.status(200).json({ reply });
    } catch (error) {
        res.status(500).json({ reply: "দুঃখিত, এআই সংযোগে সমস্যা হচ্ছে।" });
    }
}
