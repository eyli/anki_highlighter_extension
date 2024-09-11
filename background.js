chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "saveText",
    title: "Save Highlighted Text",
    contexts: ["selection"],
  });

  chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "saveText") {
      chrome.tabs.sendMessage(tab.id, {message: "getHighlightedText"}, (response) => {
        if (response && response.text) {
          storeAnkiCard(response.text);
        }
      });
    }
  });
});

function storeAnkiCard(text) {
  const prompt = generatePrompt(text);
  const apiUrl = "https://api.openai.com/v1/chat/completions";
  const apiKey = "[INSERT API KEY HERE]";

  fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        {role: "system", content: "You are a helpful assistant."},
        {role: "user", content: prompt}
      ],
      max_tokens: 100,
    }),
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      // Take the result from data, and split it by newline into a front
      // and back variable. Then, store the Anki card with the front and back.
      const parsedData = JSON.parse(data.choices[0].message.content);
      console.log(parsedData);

      fetch('http://127.0.0.1:8765', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "action": "addNote",
          "version": 6,
          "params": {
            "note": {
              "deckName": "Anki Extension",
              "modelName": "Basic",
              "fields": {
                "Front": parsedData.question,
                "Back": parsedData.answer
              },
              "options": {
                "allowDuplicate": false,
                "duplicateScope": "deck",
                "duplicateScopeOptions": {
                  "deckName": "Default",
                  "checkChildren": false,
                  "checkAllModels": false
                },
                "duplicateScopeNew": {
                  "deckName": "Default",
                  "modelName": "Basic"
                }
              }
            }
          }
        }),
      })
        .then(response => response.json())
        .then(data => {
          console.log('Anki card stored successfully:', data);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    })
    .catch(error => {
      console.log('Error:', error);
    });


}

function generatePrompt(text) {
  console.log("I'm here now");
  return `
I'm going to give you a chunk of text. I'd like to generate an Anki flashcard, where the front of the flashcard is a question that asks a general question that covers the content of the text, and the back of the flashcard contains the answer to the question, based on the text provided. 

Here is the text:
---
${text}
---

Could you please respond with a JSON blob of the following format?
{
  "question": "question",
  "answer": "answer"
}

Thank you!`;
}
