// Has to be in the head tag, otherwise a flicker effect will occur.

let toggleTheme = (theme) => {
  if (theme == "dark") {
    setTheme("light");
  } else {
    setTheme("dark");
  }
}


let setTheme = (theme) =>  {
  transTheme();
  setHighlight(theme);

  if (theme) {
    document.documentElement.setAttribute("data-theme", theme);
  }
  else {
    document.documentElement.removeAttribute("data-theme");
  }
  localStorage.setItem("theme", theme);
  
  // Updates the background of medium-zoom overlay.
  if (typeof medium_zoom !== 'undefined') {
    medium_zoom.update({
      background: getComputedStyle(document.documentElement)
          .getPropertyValue('--global-bg-color') + 'ee',  // + 'ee' for trasparency.
    })
  }
};

let setHighlight = (theme) => {
  if (theme == "dark") {
    document.getElementById("highlight_theme_light").media = "none";
    document.getElementById("highlight_theme_dark").media = "";
  } else {
    document.getElementById("highlight_theme_dark").media = "none";
    document.getElementById("highlight_theme_light").media = "";
  }
}


let transTheme = () => {
  document.documentElement.classList.add("transition");
  window.setTimeout(() => {
    document.documentElement.classList.remove("transition");
  }, 500)
}


let initTheme = (theme) => {
  if (theme == null || theme == 'null') {
    const userPref = window.matchMedia;
    if (userPref && userPref('(prefers-color-scheme: dark)').matches) {
        theme = 'dark';
    }
  }
  
  setTheme(theme);
}

function getPreferredColorScheme() {
  if (window.matchMedia) {
    if(window.matchMedia('(prefers-color-scheme: dark)').matches){
      return 'dark';
    } else {
      return 'light';
    }
  }
  return 'light';
}

function updateColorScheme(){
    setTheme(getPreferredColorScheme());
}

if(window.matchMedia){
  var colorSchemeQuery = window.matchMedia('(prefers-color-scheme: dark)');
  colorSchemeQuery.addEventListener('change', updateColorScheme);
}

/* Clear the theme local storage upon first load */
window.onload = function () {
  if (localStorage.getItem("hasCodeRunBefore") === null) {
      localStorage.removeItem("theme");
      localStorage.setItem("hasCodeRunBefore", true);
  }
}

initTheme(localStorage.getItem("theme"));
