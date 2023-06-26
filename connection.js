const calculateButton = document.getElementById('search-btn');
const resultElement = document.getElementById('result');

// Function to calculate the word difference using OpenAI API
async function calculateDifference() {
  const input1 = document.getElementById('input1').value;
  const input2 = document.getElementById('input2').value;

  const difference = await getWordDifference(input1, input2);

  // Display the difference in the result element
  resultElement.textContent = difference;
}

// Function to get the word difference using OpenAI API
async function getWordDifference(input1, input2) {
  const finalSearchTerm = "What is the conection between " + input1 + " and " + input2 + "? Dont ask any questions in return. Give me example if possible.";

  const options = {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer openai-api-key',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: finalSearchTerm }],
      max_tokens: 2000
    })
  };

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', options);
    const data = await response.json();

    // Extract the message content from the response
    const message = data.choices[0].message.content;

    return message;
  } catch (error) {
    console.error(error);
    return 'Error: Failed to calculate the difference.';
  }
}

calculateButton.addEventListener('click', calculateDifference);


const languageSelect = document.getElementById('language-select');

languageSelect.addEventListener('change', function() {
  const selectedOption = languageSelect.value;

  // Redirect to the language.html page with the selected option as a query parameter
  window.location.href = `lang_connection.html?option=${selectedOption}`;
});
