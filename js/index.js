$.getJSON("data/apps.json", function (json) {
  // Sort in descending order of version date
  json.apps.sort((a, b) => {
    // If b < a
    return (new Date(b.versionDate)).getTime() - (new Date(a.versionDate)).getTime();
  });

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  // Today
  const today = new Date();
  const dayOfWeek = daysOfWeek[today.getDay()],
        month = months[today.getMonth()],
        date = today.getDate();
  // $("#today").text(`${dayOfWeek}, ${month} ${date}`);
  
  let tod; // Time of day
  const hour = today.getHours();
  if (hour < 5 || hour > 21)
    tod = "Evening"
  else if (hour < 12)
    tod = "Morning"
  else if (hour < 17)
    tod = "Afternoon"
  else if (hour <= 21)
    tod = "Evening"
  else
    tod = "Day"
  $("#today").text(`Good ${tod}!`);

  json.apps.forEach(app => {
    let html = `
    <div class="cell custom">
      <div class="cell-icon" id="${app.id}">
        <img src="${app.iconURL}" alt="${app.id}_icon" class="app icon">
      </div>
      <div class="cell-inner">
        <div class="cell-labels">
          <p class="cell-text">${app.name.replaceAll("(Deprecated)", `<span class="deprecated badge"></span>`)}</p>
          <p class="cell-detail-text">${app.subtitle}</p>
        </div>
        <a href="app.html?id=${app.id}">
          <button class="uibutton">View</button>
        </a>
      </div>
    </div>`;

    $("#tweaked-apps").append(html);
  });

  // Wait for all images to load before making page visible
  waitForAllImagesToLoad();
});

$.getJSON("data/index.json", function (json) {
  json.data.quick_links.forEach(link => {
    const html = `
    <a class="link cell" href="${link.url}" target="_blank">
      <div class="cell-inner">
        <div class="cell-labels">
          <p class="cell-text">${link.title}</p>
        </div>
      </div>
    </a>`;
    $("#quick-links").append(html);
  });
});