javascript: (function () {
    const table = document.getElementById("trades_table");

    if (!table) {
        alert("Table with id 'trades_table' not found.");
        return;
    }

    const resourceTotals = {}; // Object to store results for each sender

    const rows = table.querySelectorAll("tbody tr");

    // Skip the header row
    for (let i = 1; i < rows.length; i++) {
        const row = rows[i];
        const senderCell = row.cells[2]; // Sender is now in the 3rd column (index 2)
        const resourcesCell = row.cells[8]; // Resources are in the 9th column (index 8)

        if (!senderCell || !resourcesCell) continue;

        const senderLink = senderCell.querySelector("a");
        if (!senderLink) continue;

        const senderName = senderLink.textContent.trim();

        // Initialize the sender's resource totals if it doesn't exist
        if (!resourceTotals[senderName]) {
            resourceTotals[senderName] = {
                iron: 0,
                wood: 0,
                stone: 0
            };
        }

        const resourceChildren = resourcesCell.children;

        for (let j = 0; j < resourceChildren.length; j++) {
            const child = resourceChildren[j];

            let resourceValue = child.innerText.replace(/[^\d]/g, "");
            resourceValue = parseInt(resourceValue, 10);

            if (child.firstChild.classList.contains("wood")) {
                resourceTotals[senderName].wood += resourceValue;
            } else if (child.firstChild.classList.contains("stone")) {
                resourceTotals[senderName].stone += resourceValue;
            } else if (child.firstChild.classList.contains("iron")) {
                resourceTotals[senderName].iron += resourceValue;
            }
        }
    }

    // Build the output message
    let message = "Resource Totals by Sender:\n\n";
    for (const sender in resourceTotals) {
        if (resourceTotals.hasOwnProperty(sender)) {
            const totals = resourceTotals[sender];
            message += `Sender: ${sender}\n`;
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