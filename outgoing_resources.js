javascript: (function () {
  const table = document.getElementById("trades_table");

  if (!table) {
    alert("Table with id 'trades_table' not found.");
    return;
  }

  const resourceTotals = {}; // Object to store results for each receiver

  const rows = table.querySelectorAll("tbody tr");

  // Skip the header row
  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    const receiverCell = row.cells[3]; // Receiver is now in the 4th column (index 3)
    const resourcesCell = row.cells[9]; // Resources are in the 10th column (index 9)

    if (!receiverCell || !resourcesCell) continue;

    const receiverLink = receiverCell.querySelector("a");
    if (!receiverLink) continue;

    const receiverName = receiverLink.textContent.trim();

    // Initialize the receiver's resource totals if it doesn't exist
    if (!resourceTotals[receiverName]) {
      resourceTotals[receiverName] = {
        iron: 0,
        wood: 0,
        stone: 0
      };
    }

    const resourceChildren = resourcesCell.children;
    console.log(resourceChildren);

    // Loop through the children of the resources cell
    for (let j = 0; j < resourceChildren.length; j++) {
      const child = resourceChildren[j];
      console.log(child);

      let resourceValue = child.innerText.replace(/[^\d]/g, "");
      resourceValue = parseInt(resourceValue, 10);

      if (child.classList.contains("wood")) {
        resourceTotals[receiverName].wood += resourceValue;
      } else if (child.classList.contains("stone")) {
        resourceTotals[receiverName].stone += resourceValue;
      } else if (child.classList.contains("iron")) {
        resourceTotals[receiverName].iron += resourceValue;
      }
    }
  }

  // Build the output message
  let message = "Resource Totals by Receiver:\n\n";
  for (const receiver in resourceTotals) {
    if (resourceTotals.hasOwnProperty(receiver)) {
      const totals = resourceTotals[receiver];
      message += `Receiver: ${receiver}\n`;
      message += `  Wood: ${totals.wood.toLocaleString()}\n`;
      message += `  Stone: ${totals.stone.toLocaleString()}\n`;
      message += `  Iron: ${totals.iron.toLocaleString()}\n\n`;
    }
  }

  //Output as JSON
  const jsonOutput = JSON.stringify(resourceTotals, null, 2);
  console.log(jsonOutput); //Log json to console
  message += "Raw JSON Data (copied to console):\n" + jsonOutput;

  alert(message); //Show alert

})();