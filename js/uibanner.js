$("#content").prepend(`
<!-- Add to Altstore banner -->
<div class="uibanner">
  <img src="img/icons/AltStore.jpg" alt="altstore-icon" class="icon">
  <div class="content">
    <div class="text-container">
      <p class="title-text">AltStore <span class="small beta badge"></span></p>
      <p class="detail-text">
      <!--
      Open in the AltStore app
      -->
      Add this source to AltStore to receive app updates (requires AltStore beta)
      </p>
    </div>
    <a href="altstore://source?url=https://therealfoxster.github.io/altsource/data/apps.json">
      <button>Add</button>
    </a>
  </div>
</div>`);