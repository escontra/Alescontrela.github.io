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



async function renderPDF(viewer, url) {
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
                const PADDING = 1;
                const [x1, y1, x2, y2] = annotation.rect;
                const left = x1 * scale - PADDING;
                const top = (viewport.height - y2) * scale - PADDING;
                const width = (x2 - x1) * scale + 2 * PADDING;
                const height = (y2 - y1) * scale + 2 * PADDING;

                link.style.left = `${left}px`;
                link.style.top = `${top}px`;
                link.style.width = `${width}px`;
                link.style.height = `${height}px`;
        
                // Add a border for the rectangle
                link.style.border = '1px solid #2698BA'; // Rectangle border
                link.style.backgroundColor = '#2697ba26'; // Optional highlight
                link.style.boxSizing = 'border-box'; // Include border in dimensions
                link.style.zIndex = '10';

                // Append the link to the current page container
                pageContainer.appendChild(link);
            }
        });
        
    }

    // Add auto-scroll functionality
    let scrollDirection = 1; // 1 for down, -1 for up
    const scrollSpeed = 1.5; // Pixels per interval
    const intervalTime = 30; // Interval time in milliseconds
    let autoScrollInterval;

    function startAutoScroll() {
        autoScrollInterval = setInterval(() => {
            viewer.scrollTop += scrollSpeed * scrollDirection;

            // Reverse direction if reaching the top or bottom
            if (viewer.scrollTop + viewer.clientHeight >= viewer.scrollHeight) {
                scrollDirection = -1;
            } else if (viewer.scrollTop <= 0) {
                scrollDirection = 1;
            }
        }, intervalTime);
    }

    function stopAutoScroll() {
        clearInterval(autoScrollInterval);
    }

    // Start auto-scroll
    startAutoScroll();

    // Stop auto-scroll on user interaction
    viewer.addEventListener('mousemove', stopAutoScroll);
    viewer.addEventListener('click', stopAutoScroll);
    viewer.addEventListener('keydown', stopAutoScroll);
    viewer.addEventListener('keyup', stopAutoScroll);

    // Detect touch and scroll events for mobile
    viewer.addEventListener('touchstart', stopAutoScroll);
    viewer.addEventListener('touchmove', stopAutoScroll);
    viewer.addEventListener('touchend', stopAutoScroll);
}



document.addEventListener("DOMContentLoaded", function () {
    const viewer = document.getElementById('pdf-viewer');
    if (viewer) {
        const pdfjsLib = window['pdfjs-dist/build/pdf'];
        pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
        renderPDF(viewer, '/assets/pdf/aescontrela_cv.pdf');
    }
});


function initializeHlsVideo(videoId, videoUrl) {
    document.addEventListener('DOMContentLoaded', function () {
        const video = document.getElementById(videoId);
        if (video) {
            // console.log('Loading video for ID:', videoId, 'from URL:', videoUrl);
            if (Hls.isSupported()) {
                const hls = new Hls();
                hls.loadSource(videoUrl);
                hls.attachMedia(video);
            } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
                // Fallback for Safari and other browsers with native HLS support
                video.src = videoUrl;
            } else {
                console.error('HLS is not supported in this browser.');
            }
        } 
    });
}

initializeHlsVideo('sf-downtown-timelapse', 'https://viperrl.com/sf_timelapse_stream/sf_downtown_timelapse_watermarked_16by9_1080p.m3u8');
initializeHlsVideo('tsuchinshan-atlas', 'https://viperrl.com/tsuchinshan_atlas_stream/tsuchinshan_atlas_timelapse_1080p.m3u8');
initializeHlsVideo('milky-way-point-arena', 'https://viperrl.com/gualala_milky_way_stream/gualala_milky_way_1080p.m3u8');

document.addEventListener("DOMContentLoaded", function () {
    const egg = document.getElementById('viper-easter-egg');
    if (egg) {
        console.log(`
             ____
            / . .\\
Hi.         \\  ---<
             \\  /
   __________/ /
-=:___________/
`);
    }

});