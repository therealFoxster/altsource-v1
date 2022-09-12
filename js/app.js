const urlSearchParams = new URLSearchParams(window.location.search);

if (!urlSearchParams.has('id')) {
  window.location.replace("index.html");
}

const id = urlSearchParams.get('id');
const moreButton = `<a id="more" onclick="revealTruncatedText(this);"><button>more</button></a>`;

$.getJSON("apps.json", function (json) {
  const apps = json.apps.filter(app => app.id === id);
  const app = apps[0];
  
  $("title").text(`${app.name} – AltSource`);
  $("#app-icon").attr('src', app.iconURL);
  $("#app-name").text(app.name);
  $("#subtitle").text(app.subtitle);
  $("#install, #download").on('click', function(event) {
    event.preventDefault();
    
    const message = `IMPORTANT\n\nTo receive future app updates for \"${app.name}\", you must add the source to AltStore (see top banner) and get the app from there. You will not receive future app updates if you ${event.currentTarget.id == "install" ? "install" : "get"} it from here.\n\nWould you like to continue?`;

    if (confirm(message))
      if (confirm("Are you sure?"))
        if (confirm("Are you really sure?"))
          if (confirm("Like really, really?"))
            if (confirm(`Fine, have it your way. Keep in mind you won't be able to receive future updates for this app through AltStore.`)) {
              if (event.currentTarget.id == "install")
                window.location.replace(`altstore://install?url=${app.downloadURL}`);
              else window.location.replace(app.downloadURL);
            }
  });
  $("#download").attr('href', app.downloadURL);
  
  $("#size").text(`${parseFloat(parseFloat(app.size) / 1024 / 1024).toFixed(1)} MB`);
  $("#version").text(app.version);
  
  const versionDate = new Date(app.versionDate),
        month = versionDate.toUTCString().split(" ")[2],
        date = versionDate.getDate(),
        dateStr = `${month} ${date}, ${versionDate.getFullYear()}`;
  $("#version-date").text(dateStr);
  
  $("#version-description").html(app.versionDescription.replaceAll("\n", "<br>"));
  
  const versionDescription = document.getElementById("version-description");

  if (versionDescription.scrollHeight > versionDescription.clientHeight) {
    versionDescription.insertAdjacentHTML('afterend', moreButton);
  }

  app.screenshotURLs.forEach((screenshot, index) => {
    const image = `<img src="${screenshot}" alt="screenshot-${index + 1}">`;
    $("#preview-images").append(image);
  });

  $("#preview-text").html(app.localizedDescription.split("\n   \n")[0].replaceAll("\n", "<br>"));

  if (app.localizedDescription.split("\n   \n")[1] != null) {
    const workaroundText = app.localizedDescription.split("\n   \n")[1];
    console.log(workaroundText)
    const workaroundHTML = `
    <div class="section-container">
      <div class="section" id="workaround">
        <div class="text-container">
          <p class="text header">${workaroundText.split("? ")[0]}?</p>
        </div>
        <div class="text-container">
          <div class="wrapper">
            <p class="text custom">${workaroundText.split("? ")[1].split(": ")[0]}: <a href="${workaroundText.split(": \n")[1]}">${workaroundText.split(": \n")[1]}</a></p>
          </div>
        </div>
      </div>
    </div>`;
    $(".section-container:last-of-type").prepend(workaroundHTML);
  }

  const previewText = document.getElementById("preview-text");
  if (previewText.scrollHeight > previewText.clientHeight) {
    previewText.insertAdjacentHTML('afterend', moreButton);
  }

  app.information.forEach(information => {
    const html = `
    <a class="link cell" href="${information.url}" target="_blank">
      <div class="cell-inner">
        <div class="cell-labels">
          <p class="cell-text">${information.item}</p>
          </div>
          <div class="grey cell-accessory-icon">
          <p class="cell-detail-text">
            ${information.authors ?? ""}
            <i class="bi bi-chevron-right" style="font-size: 12px; -webkit-text-stroke: 1px; color: unset; opacity: 0.5;"></i>
          </p>
        </div>
      </div>
    </a>`;

    $("#information").append(html);
  });
});

function revealTruncatedText(object) {
  const node_id = object.parentNode.getElementsByTagName('p')[0].id;
  $(`#${node_id}`).css({
    'display': 'block',
    'overflow': 'auto',
    '-webkit-line-clamp': 'none',
            'line-clamp': 'none'
  });
  object.parentNode.removeChild(object); // Remove "more" button
}