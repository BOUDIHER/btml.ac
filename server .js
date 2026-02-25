const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios'); // مكتبة للتعامل مع الطلبات الخارجية
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(cors());

// 1. خدمة الترجمة باستخدام واجهة Google Translate API
app.post('/translate', async (req, res) => {
  const { text, targetLanguage } = req.body;

  try {
    // استبدل YOUR_API_KEY بمفتاح API الخاص بخدمة Google Cloud
    const response = await axios.post(
      `https://translation.googleapis.com/language/translate/v2`,
      {
        q: text,
        target: targetLanguage,
        key: 'YOUR_API_KEY'
      }
    );

    const translatedText = response.data.data.translations[0].translatedText;
    res.json({ translatedText });
  } catch (error) {
    console.error('Error during translation:', error.message);
    res.status(500).json({ error: 'Failed to translate text.' });
  }
});

// 2. خدمة تصريف الأفعال باستخدام قاعدة بيانات IRCAM
app.post('/conjugate', async (req, res) => {
  const { verb } = req.body;

  try {
    // طلب إلى موقع IRCAM لتصريف الأفعال
    const response = await axios.get(
      `https://tal2.ircam.ma/conjugueur/conjugappl.php`,
      {
        params: { verb }
      }
    );

    // إعادة بيانات التصريف
    res.json({ conjugations: response.data });
  } catch (error) {
    console.error('Error during conjugation:', error.message);
    res.status(500).json({ error: 'Failed to conjugate the verb.' });
  }
});

// 3. خدمة تصحيح الأخطاء
app.post('/correct', async (req, res) => {
  const { text } = req.body;

  try {
    // تصحيح النصوص باستخدام خدمة API (يمكنك استبدال هذا بمزود خدمة تصحيح)
    // مثال: استخدم خدمات مثل Grammarly أو أدوات مخصصة
    const correctedText = text.replace(/الأخطاء/g, 'الإصلاحات'); // مثال بسيط
    res.json({ correctedText });
  } catch (error) {
    console.error('Error during correction:', error.message);
    res.status(500).json({ error: 'Failed to correct the text.' });
  }
});

// تشغيل الخادم
app.listen(PORT, () => {
  console.log(`Server is running on http:/ser/localhost:${PORT}`);
});
<!DOCTYPE html>
<html lang="ar">
<head>
    <meta charset="UTF-8">
    <title>ترجمة Matecat</title>
    <script>
        async function fetchTranslation() {
            try {
                let response = await fetch('https://www.matecat.com/api/v1/projects/12345/translations/versions');
                let data = await response.json();

                let output = '<h2>إصدارات الترجمة:</h2>';
                data.versions.forEach(version => {
                    output += <p>الإصدار: ${version.version_id} - تاريخ الإنشاء: ${version.created_at}</p>;
                });

                document.getElementById("translations").innerHTML = output;
            } catch (error) {
                console.error("خطأ في جلب الترجمة:", error);
            }
        }
    </script>
</head>
<body onload="fetchTranslation()">
    <h1>مرحبًا بك في موقع الترجمة</h1>
    <div id="translations">جاري تحميل الترجمة...</div>
</body>
</html>
