---
layout: page
permalink: /cv/
title: cv
nav: true
nav_order: 4
cv_pdf: aescontrela_cv.pdf
---

<div class="row">
    <div class="col-12">
        <p class="text-center text-monospace mt-3">
            <a href="{{ page.cv_pdf | prepend: 'assets/pdf/' | relative_url}}">Download CV</a>
        </p>
    </div>
    <div class="col-12">
        <div class="embed-responsive embed-responsive-us-letter">
            <div class="embed-responsive-item" id="pdf-viewer" style="overflow-y: auto; border: 1px solid #ddd;">
                <!-- Pages will be appended here -->
            </div>
        </div>
    </div>
</div>
