document.addEventListener("DOMContentLoaded", modalMaker);
function modalMaker() {
    // Get the modal
    var modal = document.getElementById('myModal');

    // Get the image and insert it inside the modal - use its "alt" text as a caption
    var img = $('.postimage');
    var modalImg = $("#img01");
    var captionText = document.getElementById("caption");
    $('.postimage').click(function () {
        modal.style.display = "block";
        var imageSrc = $(this).find("img").attr("src");
        var imageAlt = $(this).find("img").attr("alt");
        modalImg.attr('src', imageSrc);
        captionText.innerHTML = imageAlt;
    });
    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
    }

    //esc key also closes modal.
    $(document).keydown(function (event) {
        if (event.keyCode == 27) {
            modal.style.display = "none";
        }
    });
}
