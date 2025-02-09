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
