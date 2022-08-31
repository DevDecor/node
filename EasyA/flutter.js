const Flutterwave = require('flutterwave-node-v3');

// const flw = new Flutterwave('FLWPUBK-a948bd7059a9d0f25b89dccb6f398f04-X', 'FLWSECK-50cb00a3aac5f7c3cf8df94cc6a5688f-X');
var request = require('request');
var options = {
  'method': 'GET',
  'url': 'https://rave-api-v2.herokuapp.com/v3/kyc/bvns/12345678019',
  'headers': {
    'Authorization': 'Bearer 335aa618f957d10612363caf'
  }
};
request(options, function (error, response) { 
  if (error) throw new Error(error);
  console.log(response.body);
});
// const payload = {
//     "card_number": "5531886652142950",
//     "cvv": "564",
//     "expiry_month": "09",
//     "expiry_year": "21",
//     "currency": "NGN",
//     "amount": "100",
//     "redirect_url": "https://www.google.com",
//     "fullname": "Olufemi Obafunmiso",
//     "email": "olufemi@flw.com",
//     "phone_number": "0902620185",
//     "enckey": "FLWSECK_TEST74e0b6c7db0e",
//     "tx_ref": "EA-"+Date.now() // This is a unique reference, unique to the particular transaction being carried out. It is generated when it is not provided by the merchant for every transaction.

// }


// const chargeCard = async () => {
//     try {
//         const response = await flw.Charge.card(payload)
//         console.log(response)
//         if (response.meta.authorization.mode === 'pin') {
//             let payload2 = payload
//             payload2.authorization = {
//                 "mode": "pin",
//                 "fields": [
//                     "pin"
//                 ],
//                 "pin": 3310
//             }
//             const reCallCharge = await flw.Charge.card(payload2)

//             const callValidate = await flw.Charge.validate({
//                 "otp": "12345",
//                 "flw_ref": reCallCharge.data.flw_ref
//             });
//             console.log(callValidate)

//         }
//         if (response.meta.authorization.mode === 'redirect') {

//             var url = response.meta.authorization.redirect
//             open(url)
//         }

//         console.log(response);


//     } catch (error) {
//         console.log(error)
//     }
// }

// chargeCard();
