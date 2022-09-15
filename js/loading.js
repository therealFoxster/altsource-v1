let allImagesLoaded = false;

$("#content").hide(); // Hide content while loading

// Wait a second before showing loading screen
setTimeout(() => {
  if (!allImagesLoaded) {
    $("body").prepend(`
    <div id="loading">
      <img src="img/loading.gif" alt="loading" id="loading-indicator">
      <p>Loading</p>
    </div>`);
  }
}, 1000);

function waitForAllImagesToLoad () {
  const totalImages = $("img").length;
  var imagesLoaded = 0;

  $("img").each(function (_, image) {
    var newImage = $("<img>"); // New <img> element that is NOT rendered to the DOM
    newImage.on("load", imageLoaded); // Attach onload event

    const src = $(image).attr("src"); // Source (src) of image that is already in the DOM

    // Set newImage's src to src of image from the DOM
    newImage.attr("src", src); // Once this action is done (image fully loaded), imageLoaded() will get called
  });

  function imageLoaded() {
    if (++imagesLoaded == totalImages) { // All images loaded
      allImagesLoaded = true;
      $("#loading").hide();
      $("#loading").remove();
      $("#content").show();
      $("#content").addClass("fade-in");
    }
  }
}