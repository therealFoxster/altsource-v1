$("body").prepend(`
<!-- Add to Altstore banner -->
<div class="section">
  <div class="banner cell">
    <div class="cell-icon">
      <img src="img/icons/AltStore.jpg" alt="altstore-icon" class="icon">
    </div>
    <div class="cell-inner">
      <div class="cell-labels">
        <p class="cell-text">AltStore</p>
        <p class="cell-detail-text">Add this source to AltStore to receive app updates (requires AltStore beta)</p>
      </div>
      <div class="add">
        <a href="altstore://source?url=https://therealFoxster.github.io/altsource/apps.json"><button>Add</button></a>
      </div>
    </div>
  </div>
</div>`);