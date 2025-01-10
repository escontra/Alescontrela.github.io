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

const url = '/assets/pdf/aescontrela_cv.pdf'; // Replace with your PDF path

const pdfjsLib = window['pdfjs-dist/build/pdf'];
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

const viewer = document.getElementById('pdf-viewer');

async function renderPDF(url) {
    // Load the PDF document
    const pdf = await pdfjsLib.getDocument(url).promise;

    // Get device pixel ratio
    const devicePixelRatio = window.devicePixelRatio || 1;

    // Iterate through all pages
    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);

        // Create a container for each page
        const pageContainer = document.createElement('div');
        pageContainer.className = 'pdf-page';
        pageContainer.style.position = 'relative'; // Ensure the container is relative
        viewer.appendChild(pageContainer);

        // Create a canvas for rendering
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        pageContainer.appendChild(canvas);

        // Calculate scale based on container width
        const viewport = page.getViewport({ scale: 1 });
        const scale = viewer.clientWidth / viewport.width; // Fit width of the container
        const scaledViewport = page.getViewport({ scale: scale });

        // Set canvas size for high-resolution rendering
        canvas.width = scaledViewport.width * devicePixelRatio;
        canvas.height = scaledViewport.height * devicePixelRatio;

        // Style canvas to match the container dimensions
        canvas.style.width = `${scaledViewport.width}px`;
        canvas.style.height = `${scaledViewport.height}px`;

        // Render the page with high resolution
        const renderContext = {
            canvasContext: context,
            viewport: scaledViewport,
            transform: [devicePixelRatio, 0, 0, devicePixelRatio, 0, 0],
        };

        await page.render(renderContext).promise;

        // Get annotations (links)
        const annotations = await page.getAnnotations();

        // Overlay links on the current page
        annotations.forEach((annotation) => {
            if (annotation.subtype === 'Link' && annotation.url) {
                const link = document.createElement('a');
                link.href = annotation.url;
                link.target = '_blank'; // Open in a new tab
                link.style.position = 'absolute';

                // Calculate link position
                const [x1, y1, x2, y2] = annotation.rect;
                const left = x1 * scale;
                const top = (viewport.height - y2) * scale;
                const width = (x2 - x1) * scale;
                const height = (y2 - y1) * scale;

                link.style.left = `${left}px`;
                link.style.top = `${top}px`;
                link.style.width = `${width}px`;
                link.style.height = `${height}px`;
                link.style.backgroundColor = 'rgba(0, 0, 255, 0.1)'; // Optional highlight
                link.style.zIndex = '10';

                // Append the link to the current page container
                pageContainer.appendChild(link);
            }
        });
    }
}


// Render the PDF
renderPDF(url);

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

document.addEventListener('DOMContentLoaded', function() {

    const video = document.getElementById('tsuchinshan-atlas');
    const videoSrc = "https://viperrl.com/tsuchinshan_atlas_stream/tsuchinshan_atlas_timelapse_1080p.m3u8";

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

document.addEventListener('DOMContentLoaded', function() {

    const video = document.getElementById('milky-way-point-arena');
    const videoSrc = "https://viperrl.com/gualala_milky_way_stream/gualala_milky_way_1080p.m3u8";

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
