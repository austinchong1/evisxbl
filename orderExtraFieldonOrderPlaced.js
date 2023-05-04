// Initialize extra fields
window.ec = window.ec || {};
ec.order = ec.order || {};
ec.order.extraFields = ec.order.extraFields || {};

// Add a new optional BonusLink Loyalty Programme section in checkout
ec.order.extraFields.evisxbl = {
    'title': 'BonusLink Loyalty Programme',
    'checkoutDisplaySection': 'payment_details',
    'orderDetailsDisplaySection': 'billing_info',
    'type': 'text',
    'value': '',
    'available': true,
    'textPlaceholder': '16 Digits BonisLink Card Number',
    'showInInvoice': true,
    'showInNotifications': true,
};

window.Ecwid && Ecwid.refreshConfig();

Ecwid.OnOrderPlaced.add(function(order){   

    if (order.extraFields.value != null) {

    const terminalId = "TUWEB";
    const signatureHashSecret = "90997hdnnkoldhnb65bdjkkl090900";
    let cardNumber = order.extraFields.value;
    let transactionAmount = order.total;
    let transactionDateUnix = order.date;

    function convertUnixTime(transactionDateUnix) {
        const date = new Date(transactionDateUnix * 1000); // Convert Unix timestamp to milliseconds
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2); // Add leading zero to month
        const day = ('0' + date.getDate()).slice(-2); // Add leading zero to day
        const hours = ('0' + date.getHours()).slice(-2); // Add leading zero to hours
        const minutes = ('0' + date.getMinutes()).slice(-2); // Add leading zero to minutes
        const seconds = ('0' + date.getSeconds()).slice(-2); // Add leading zero to seconds
        const timeZoneOffset = ('0' + Math.abs(date.getTimezoneOffset() / 60)).slice(-2); // Get timezone offset in hours
        const timeZoneSign = date.getTimezoneOffset() > 0 ? '-' : '+'; // Determine timezone sign
      
        return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}${timeZoneSign}${timeZoneOffset}:00`;
      }

    let transactionDate = convertUnixTime(transactionDateUnix);
    let paymentMethod = order.paymentMethod;
    let hashSecret = terminalId + cardNumber + transactionAmount + transactionDate + signatureHashSecret;

    const encoder = new TextEncoder();
    const data = encoder.encode(hashSecret);

    crypto.subtle.digest('SHA-512', data)
    .then(hashBuffer => {
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    console.log(hashHex);
  })
  .catch(error => console.error(error));

    let bodyData = {
        "TerminalId": terminalId,
        "CardNumber": cardNumber,
        "TransactionAmount": transactionAmount,
        "TransactionDate": transactionDate,
        "PaymentMode": paymentMethod
    }

    let requestBody = JSON.stringify(bodyData);
    let contentLength = requestBody.length;

    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': contentLength.toString(),
            'ApiKey': 'st4T-10032023-R3stSerV1ces-Evis-908kl30vhd40kommk99901klyt',
            'TransactionSignature': hashHex
        },
        body: requestBody
    };

    fetch('http://211.25.202.188:8086/Common.svc/AddTransaction', options)
  .then(response => response.json())
  .then(async (data) => {
    let responseData = JSON.stringify(data);

    try {
      const response = await fetch('https://maker.ifttt.com/trigger/api_failed/json/with/key/loQjg53kmQFeEqFfL8E4geEWEEek1CO_jOM-KNvxxNC', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: responseData
      });

      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  })
  .catch(error => {
    console.error(error);
  });
 }});
