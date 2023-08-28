document.addEventListener('DOMContentLoaded', function() {
    const mode_toggles = document.getElementsByClassName("light-toggle");
    for (mode_toggle of mode_toggles) {
        mode_toggle.addEventListener("click", function() {
            toggleTheme(localStorage.getItem("theme"));
        });
    }
});

