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
        <div class="embed-responsive embed-responsive-us-letter">
            <!-- <video class="embed-responsive-item" id="milky-way-point-arena" controls ></video> -->
            <iframe class="embed-responsive-item" src="{{ page.cv_pdf | prepend: 'assets/pdf/' | relative_url}}">
                This browser does not support PDFs. Please download the PDF to view it: 
                <a href="{{ page.cv_pdf | prepend: 'assets/pdf/' | relative_url}}">Download CV</a>.
            </iframe>
        </div>
    </div>
</div>
