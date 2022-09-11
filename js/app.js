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

  $("#preview-text").text(app.localizedDescription);

  const previewText = document.getElementById("preview-text");
  if (previewText.scrollHeight > previewText.clientHeight) {
    previewText.insertAdjacentHTML('afterend', moreButton);
  }

  app.credits.forEach(credit => {
    const html = `
    <a class="link cell" href="${credit.url}" target="_blank">
      <div class="cell-inner">
        <div class="cell-labels">
          <p class="cell-text">${credit.author}</p>
          <p class="cell-detail-text">${credit.items ?? ""}</p>
        </div>
        <div class="grey cell-accessory-icon">
          <i class="bi bi-chevron-right"></i>
        </div>
      </div>
    </a>`;

    $("#credits").append(html);
  });
});

function revealTruncatedText(object) {
  console.log("reveal");
  console.log(object.parentNode.getElementsByTagName('p')[0].id)
  const node_id = object.parentNode.getElementsByTagName('p')[0].id;
  $(`#${node_id}`).css({
    'display': 'block',
    'overflow': 'auto',
    '-webkit-line-clamp': 'none',
            'line-clamp': 'none'
  });
  object.parentNode.removeChild(object); // Remove "more" button
}