$(document).ready(function() {
    $('a.abstract').click(function() {
        $(this).parent().parent().find(".abstract.hidden").toggleClass('open');
    });
    $('a.bibtex').click(function() {
        $(this).parent().parent().find(".bibtex.hidden").toggleClass('open');
    });
    $('.navbar-nav').find('a').removeClass('waves-effect waves-light');
});

const headings = document.querySelectorAll('h2[id],h3[id]'); // 1
const linkContent = '🔗'; // 2
for (const heading of headings) { // 3
    const linkIcon = document.createElement('a'); // 4
    linkIcon.setAttribute('href', `#${heading.id}`); // 5
    linkIcon.innerHTML = linkContent; // 6
    const linkSpace = document.createElement('p');
    linkSpace.style.display = 'inline';
    linkSpace.innerText = ' ';
    heading.appendChild(linkSpace);
    heading.appendChild(linkIcon); // 7
}

document.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('sf-downtown-timelapse');
    const videoSrc = "https://viperrl.com/sf_timelapse_stream/sf_downtown_timelapse_watermarked_16by9_1080p.m3u8";

    if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(videoSrc);
        hls.attachMedia(video);
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        // Fallback for Safari and other browsers with native HLS support
        video.src = videoSrc;
    } else {
        console.error('HLS is not supported in this browser.');
    }
});
