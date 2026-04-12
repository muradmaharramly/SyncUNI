const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');

let genAI = null;
const rawKey = process.env.GEMINI_API_KEY;
if (rawKey && rawKey !== 'YOUR_NEW_API_KEY_HERE') {
    genAI = new GoogleGenerativeAI(rawKey);
    console.log("Gemini AI initialized successfully.");
} else {
    console.warn("WARNING: GEMINI_API_KEY not set or is placeholder. AI insights will use fallback data.");
}

// Global Insight
router.post('/global', async (req, res) => {
    const { userRole } = req.body;
    let text = "";

    try {
        if (genAI) {
            let promptText = "";
            if (userRole === 'company') promptText = "Sən SyncUNI adlı platformanın AI agentisən. Zəhmət olmasa, IT işçiləri axtaran bir şirkət üçün 1-2 cümləlik çox qısa, maraqlı və realistik bazar insaytı ver. Emojilərdən istifadə et.";
            else if (userRole === 'university') promptText = "Sən SyncUNI adlı platformanın AI agentisən. Zəhmət olmasa, IT tələbələrini inkişaf etdirən universitet üçün 1-2 cümləlik çox qısa, maraqlı və realistik bazar insaytı ver. Emojilərdən istifadə et.";
            else if (userRole === 'course') promptText = "Sən SyncUNI adlı platformanın AI agentisən. Zəhmət olmasa, IT təlimlər verən bir kurs üçün 1-2 cümləlik çox qısa, maraqlı və realistik bazar insaytı ver. Emojilərdən istifadə et.";
            else promptText = "Sən SyncUNI adlı platformanın AI agentisən. Sistem fəaliyyəti haqqında 1 cümləlik müsbət və qısa xülasə qeyd et. Emojilərdən istifadə et.";
            
            const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
            const result = await model.generateContent(promptText);
            text = result.response.text();
        }
    } catch (error) {
        console.error("AI Insight error:", error);
    }

    if (!text) {
        text = "Sistem fəaliyyəti optimallaşdırıldı, aktivlik artmaqda davam edir (Süni İntellekt Bağlantısı Yoxdur).";
    }

    res.json({ text });
});

// Dynamic/Personalized Insights
router.post('/personalized', async (req, res) => {
    const { summary, userRole } = req.body;

    try {
        if (!genAI) throw new Error("No API Key");

        const prompt = `Sən SyncUNI platformasının AI agentisən. Layihə şirkətləri, universitetləri və kursları tələbələrlə bağlayır.
İstifadəçi rolu: ${userRole}.
Mövcud platforma statistikasının qısa xülasəsi: ${JSON.stringify(summary)}
Zəhmət olmasa, bu məlumatlara əsaslanaraq istifadəçi üçün 1 və ya 2 ədəd bildiriş və ya insayt (insight) hazırla.
Cavabını YALNIZ JSON formatında, aşağıdakı strukturda qaytar (başqa heç bir söz, heç bir markdown qeyd etmə!):
[
  {
    "id": "bir_unikal_id",
    "type": "match",
    "priority": "high",
    "title": "Qısa başlıq",
    "body": "Əsas mətn (1-2 cümlə)",
    "actions": ["Bax", "Filtrlə"]
  }
]
type yalnız "match", "trend", "pipeline" ve ya "demand" ola bilər. priority yalnız "high", "medium" və ya "low" ola bilər. actions 1 və ya 2 ədəd buton adı olan arraydir.
DİQQƏT: Markdown block (məsələn, \`\`\`json) İSTİFADƏ ETMƏ, yalnız saf JSON string qaytar!`;

        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        const result = await model.generateContent(prompt);
        const textArea = result.response.text();
        const match = textArea.match(/\s*\[[\s\S]*\]\s*/);
        if (!match) throw new Error("JSON array not found");
        
        const parsed = JSON.parse(match[0]);
        res.json({ success: true, insights: parsed });
    } catch (error) {
        console.error("AI Agent Personalized Insight error:", error?.message || error);
        // Always return 200 so frontend can gracefully fall back to local insights
        res.json({ success: false, fallback: true });
    }
});

module.exports = router;
