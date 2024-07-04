document.addEventListener('DOMContentLoaded', function() {
  const coinForm = document.getElementById('coinForm');
  const resultsDiv = document.getElementById('results');

  coinForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Clear previous results
    resultsDiv.innerHTML = '';

    // Get user input values
    const coinCount = parseInt(document.getElementById('coinCount').value);
    const coinWeights = document.getElementById('coinWeights').value.trim();

    // Validate input
    if (isNaN(coinCount) || coinCount <= 0) {
      displayErrorMessage('Invalid input: Number of coins must be greater than zero.');
      return;
    }

    const weightsArray = coinWeights.split(',').map(numStr => parseInt(numStr.trim()));

    // Check if all weights are provided
    if (weightsArray.length !== coinCount) {
      displayErrorMessage(`You must enter exactly ${coinCount} weights.`);
      return;
    }

    // Check if all weights are integers
    if (weightsArray.some(isNaN)) {
      displayErrorMessage('Weights must be valid numbers.');
      return;
    }

    // Check if all weights are identical
    const isIdentical = weightsArray.every((val, i, arr) => val === arr[0]);
    if (isIdentical) {
      displayResult`${alert('All coins have the same weight. No fake coin present.')}`;
      return;
    }

    // Find the fake coins
    const fakeCoins = findFakeCoins(weightsArray, coinCount);

    if (fakeCoins.length === 0) {
      displayErrorMessage('No fake coin found.');
      return;
    }

    // Display results with step-by-step simulation
    displayResult('Detect Fake Coins');
    displayResult(`Step 1: Compare coin 1 and coin 2.`);
    displayResult(`Step 2: If the weights are different, determine which is fake.`);
    if (fakeCoins.length === 1) {
      const fakeIndex = fakeCoins[0].index;
      const originalWeight = (fakeIndex === 0) ? weightsArray[1] : weightsArray[0];
      displayResult(`Step 3: The fake coin is present at index: ${fakeIndex}`);
      displayResult(`Step 4: The fake coin weight is: ${weightsArray[fakeIndex]}`);
      displayResult(`Step 5: The original coin weight is: ${originalWeight}`);
      displayResult(`Step 6: The fake coin is ${fakeCoins[0].isLighter ? 'lighter' : 'heavier'} than the original.'`);
    }
   else
    {
      displayResult`${alert('Multiple fake coins are present, which is difficult to determine.')}`;
    }
  });

  function findFakeCoins(weights, n) {
    const fakeCoins = [];
    // Compare each coin's weight with the first coin's weight to find the fake coins
    for (let i = 1; i < n; i++) {
      if (weights[i] !== weights[0]) {
        // Found a fake coin, determine if lighter or heavier
        const isLighter = weights[i] < weights[0];
        fakeCoins.push({ index: i, isLighter: isLighter });
      }
    }
    return fakeCoins;
  }

  function displayResult(message) {
    const p = document.createElement('p');
    p.textContent = message;
    resultsDiv.appendChild(p);
  }

  function displayErrorMessage(message) {
    const h2 = document.createElement('h2');
    h2.textContent = 'Error:';
    h2.style.color = 'red';
    resultsDiv.appendChild(h2);
    const p = document.createElement('p');
    p.textContent = message;
    resultsDiv.appendChild(p);
  }
});
