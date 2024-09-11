// document.getElementById('sendText').addEventListener('click', function () {
//   // Request the highlighted text
//   chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//     chrome.tabs.sendMessage(tabs[0].id, { message: "getHighlightedText" }, function (response) {
//       if (response && response.text) {
//         document.getElementById('highlightedText').value = response.text;
//         // Send the text to the remote database
//         sendToDatabase(response.text);
//       }
//     });
//   });
// });
//
// function sendToDatabase(text) {
//   fetch('http://127.0.0.1:8765', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//         "action": "addNote",
//         "version": 6,
//         "params": {
//         "note": {
//             "deckName": "Default",
//             "modelName": "Basic",
//             "fields": {
//             "Front": text,
//             "Back": "back content"
//             },
//             "options": {
//             "allowDuplicate": false,
//             "duplicateScope": "deck",
//             "duplicateScopeOptions": {
//                 "deckName": "Default",
//                 "checkChildren": false,
//                 "checkAllModels": false
//             },
//             "duplicateScopeNew": {
//                 "deckName": "Default",
//                 "modelName": "Basic"
//             }
//             }
//         }
//         }
//     }),
//   })
//   .then(response => response.json())
//   .then(data => {
//     console.log('Text stored successfully:', data);
//   })
//   .catch(error => {
//     console.error('Error:', error);
//   });
// }
//
// // curl -X POST  -H "Content-Type: application/json" -d '{
// //     "action": "addNote",
// //     "version": 6,
// //     "params": {
// //       "note": {
// //         "deckName": "Default",
// //         "modelName": "Basic",
// //         "fields": {
// //           "Front": "front content",
// //           "Back": "back content"
// //         },
// //         "options": {
// //           "allowDuplicate": false,
// //           "duplicateScope": "deck",
// //           "duplicateScopeOptions": {
// //             "deckName": "Default",
// //             "checkChildren": false,
// //             "checkAllModels": false
// //           }
// //         }
// //       }
// //     }
// //   }'
//  
