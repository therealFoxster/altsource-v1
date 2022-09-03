$.getJSON("apps.json", function (json) {
  // Sort in descending order of version date
  json.apps.sort((a, b) => {
    // If b < a
    return (new Date(b.versionDate)).getTime() - (new Date(a.versionDate)).getTime();
  });

  const today = new Date(),
        daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  // Today
  const dayOfWeek = daysOfWeek[today.getDay()],
        month = months[today.getMonth()],
        date = today.getDate();
  $("#today").text(`${dayOfWeek}, ${month} ${date}`)

  json.apps.forEach(app => {
    const versionDate = new Date(app.versionDate),
          timeDifference = Math.abs(today - versionDate),
          daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24)); 
    console.log(daysDifference);
    
    const month = versionDate.toUTCString().split(" ")[2], // dd (e.g. Jan)
          date = versionDate.getDate(), // D (e.g., 3)
          dateStr = `${month} ${date}, ${versionDate.getFullYear()}`; // YYYY (e.g., 2022)
    console.log(dateStr);

    let html = `
    <div class="cell custom" onclick="window.location='app.html?id=${app.id}';">
      <div class="cell-icon" id="${app.id}">
        <img src="${app.iconURL}" alt="${app.id}_icon" class="app icon">
      </div>
      <div class="cell-inner">
        <div class="cell-labels">
          <p class="cell-text">${app.name}</p>
          <p class="cell-detail-text">${app.subtitle}</p>
        </div>
        <div class="button">
          <a href="altstore://install?url=${app.downloadURL}"><button>install</button></a>
          <p class="detail-text">Requires AltStore</p>
        </div>
      </div>
    </div>`;

    $("#tweaked-apps").append(html);
  });
});