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
  $("#install").attr('href', `altstore://install?url=${app.downloadURL}`);
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
    const carouselItem = `
    <div class="carousel-item ${index == 0 ? "active" : ""}">
      <img src="${screenshot}" class="d-block w-100" alt="...">
    </div>`;
    // $(".carousel-inner").append(carouselItem);
    const image = `<img src="${screenshot}" alt="screenshot-${index + 1}">`;
    $("#preview-images").append(image);
  });

  $("#preview-text").html(app.localizedDescription.replaceAll("\n", "<br>"));

  const previewText = document.getElementById("preview-text");
  if (previewText.scrollHeight > previewText.clientHeight) {
    previewText.insertAdjacentHTML('afterend', moreButton);
  }

  const size = `
  <a class="link cell" href="" target="_blank">
    <div class="cell-inner">
      <div class="cell-labels">
        <p class="cell-text">Size</p>
        </div>
        <div class="grey cell-accessory-icon">
        <p class="cell-detail-text">
          12 MB
        </p>
      </div>
    </div>
  </a>`;
  // $("#credits").append(size);

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