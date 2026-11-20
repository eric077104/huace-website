function doPost(e) {
  try {
    const body = JSON.parse((e && e.postData && e.postData.contents) || "{}");
    const properties = PropertiesService.getScriptProperties();
    const expectedSecret = properties.getProperty("FORM_SECRET");
    if (!expectedSecret || body.secret !== expectedSecret) {
      return jsonResponse({ ok: false });
    }

    const lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
      const row = [
        Utilities.formatDate(new Date(), "Asia/Taipei", "yyyy-MM-dd HH:mm:ss"),
        safeCell(body.name),
        safeCell(body.company),
        safeCell(body.email),
        safeCell(body.phoneOrLine),
        safeCell(Array.isArray(body.needs) ? body.needs.join("、") : ""),
        safeCell(body.budget),
        safeCell(body.startTime),
        safeCell(body.message),
        body.consent === true ? "是" : "否",
        safeCell(body.sourcePage)
      ];
      sheet.appendRow(row);
    } finally {
      lock.releaseLock();
    }

    const notifyEmail = properties.getProperty("NOTIFY_EMAIL");
    if (notifyEmail) {
      const name = String(body.name || "");
      const email = String(body.email || "");
      const content = [
        "姓名：" + name,
        "公司／品牌：" + (body.company || ""),
        "Email：" + email,
        "電話或 LINE：" + (body.phoneOrLine || ""),
        "需求類型：" + (Array.isArray(body.needs) ? body.needs.join("、") : ""),
        "預算範圍：" + (body.budget || ""),
        "預計開始時間：" + (body.startTime || ""),
        "需求說明：" + (body.message || ""),
        "來源頁面：" + (body.sourcePage || "")
      ].join("\n");
      MailApp.sendEmail({
        to: notifyEmail,
        subject: "網站合作詢問｜" + name,
        body: content,
        replyTo: email
      });
    }
    return jsonResponse({ ok: true });
  } catch (error) {
    return jsonResponse({ ok: false });
  }
}

function safeCell(value) {
  const text = value == null ? "" : String(value);
  return /^[=+\-@]/.test(text) ? "'" + text : text;
}

function jsonResponse(value) {
  return ContentService.createTextOutput(JSON.stringify(value))
    .setMimeType(ContentService.MimeType.JSON);
}
