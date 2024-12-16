function slideToggle(t, e, o) {
  0 === t.clientHeight ? j(t, e, o, !0) : j(t, e, o);
}
function slideUp(t, e, o) {
  j(t, e, o);
}
function slideDown(t, e, o) {
  j(t, e, o, !0);
}
function j(t, e, o, i) {
  void 0 === e && (e = 400),
    void 0 === i && (i = !1),
    (t.style.overflow = "hidden"),
    i && (t.style.display = "block");
  var p,
    l = window.getComputedStyle(t),
    n = parseFloat(l.getPropertyValue("height")),
    a = parseFloat(l.getPropertyValue("padding-top")),
    s = parseFloat(l.getPropertyValue("padding-bottom")),
    r = parseFloat(l.getPropertyValue("margin-top")),
    d = parseFloat(l.getPropertyValue("margin-bottom")),
    g = n / e,
    y = a / e,
    m = s / e,
    u = r / e,
    h = d / e;
  window.requestAnimationFrame(function l(x) {
    void 0 === p && (p = x);
    var f = x - p;
    i
      ? ((t.style.height = g * f + "px"),
        (t.style.paddingTop = y * f + "px"),
        (t.style.paddingBottom = m * f + "px"),
        (t.style.marginTop = u * f + "px"),
        (t.style.marginBottom = h * f + "px"))
      : ((t.style.height = n - g * f + "px"),
        (t.style.paddingTop = a - y * f + "px"),
        (t.style.paddingBottom = s - m * f + "px"),
        (t.style.marginTop = r - u * f + "px"),
        (t.style.marginBottom = d - h * f + "px")),
      f >= e
        ? ((t.style.height = ""),
          (t.style.paddingTop = ""),
          (t.style.paddingBottom = ""),
          (t.style.marginTop = ""),
          (t.style.marginBottom = ""),
          (t.style.overflow = ""),
          i || (t.style.display = "none"),
          "function" == typeof o && o())
        : window.requestAnimationFrame(l);
  });
}

let sidebarItems = document.querySelectorAll(".sidebar-item.has-sub");
const sidebar = document.getElementById("sidebar");

for (let i = 0; i < sidebarItems.length; i++) {
  let sidebarItem = sidebarItems[i];

  // Toggle submenu on sidebar link click
  sidebarItem
    .querySelector(".sidebar-link")
    .addEventListener("click", function (e) {
      e.preventDefault();

      // Check if sidebar is active
      if (!sidebar.classList.contains("active")) {
        return; // Exit if sidebar is not active
      }

      let submenu = sidebarItem.querySelector(".submenu");

      // Toggle 'active' class and use 'slideToggle' function for smooth animation
      if (submenu.classList.contains("active")) {
        submenu.classList.remove("active");
        slideUp(submenu, 300);
      } else {
        // Close any other open submenus
        sidebarItems.forEach((item) => {
          let openSubmenu = item.querySelector(".submenu");
          if (
            openSubmenu !== submenu &&
            openSubmenu.classList.contains("active")
          ) {
            openSubmenu.classList.remove("active");
            slideUp(openSubmenu, 300);
          }
        });

        // Open the clicked submenu
        submenu.classList.add("active");
        slideDown(submenu, 300);
      }
    });
}

// Handle sidebar collapse
if (sidebar) {
  sidebar.addEventListener("classChange", () => {
    if (!sidebar.classList.contains("active")) {
      // Reset all submenus when sidebar is inactive
      sidebarItems.forEach((item) => {
        let submenu = item.querySelector(".submenu");

        // Remove 'active' class but do not apply display styles
        submenu.classList.remove("active");
        submenu.style.display = "";
      });
    }
  });
}

// Utility function to detect class changes on the sidebar
const observeSidebarClassChange = (element, callback) => {
  if (element) {
    // Ensure element is not null
    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "class"
        ) {
          callback();
        }
      }
    });

    observer.observe(element, { attributes: true });
  }
};

// Start observing class changes on the sidebar
// const sidebar = document.getElementById("sidebar");
if (sidebar) {
  observeSidebarClassChange(sidebar, () => {
    const event = new Event("classChange");
    sidebar.dispatchEvent(event);
  });
}

// window.addEventListener("DOMContentLoaded", (event) => {
//   var w = window.innerWidth;
//   if (w < 1200) {
//     document.getElementById("sidebar").classList.remove("active");
//   }
// });
// window.addEventListener("resize", (event) => {
//   var w = window.innerWidth;
//   console.log(w);
//   if (w < 1280) {
//     document.getElementById("sidebar").classList.remove("active");
//   } else {
//     document.getElementById("sidebar").classList.add("active");
//   }
// });

// document.querySelector(".burger-btn").addEventListener("click", () => {
//   document.getElementById("sidebar").classList.toggle("active");
// });
document.addEventListener("DOMContentLoaded", function () {
  const burgerBtn = document.querySelector(".burger-btn");

  if (burgerBtn) {
    burgerBtn.addEventListener("click", () => {
      document.getElementById("sidebar").classList.toggle("active");
    });
  } else {
    console.error("Burger button not found");
  }
});

// document.querySelector(".sidebar-hide").addEventListener("click", () => {
//   document.getElementById("sidebar").classList.toggle("active");
// });

// const sidebarHideButton = document.querySelector(".sidebar-hide");

// if (sidebarHideButton) {
//   sidebarHideButton.addEventListener("click", () => {
//     document.getElementById("sidebar").classList.toggle("active");
//   });
// }
// Add `active` class to the corresponding sidebar item based on the current page
document.addEventListener("DOMContentLoaded", () => {
  const currentPage = window.location.pathname.split("/").pop(); // Get the current page name
  const sidebarItems = document.querySelectorAll(".sidebar-item");

  sidebarItems.forEach((item) => {
    const link = item.querySelector(".sidebar-link");
    if (link && link.getAttribute("href").includes(currentPage)) {
      item.classList.add("page-active"); // Add a unique class for active page
    }
  });
});

// Perfect Scrollbar Init
if (typeof PerfectScrollbar == "function") {
  const container = document.querySelector(".sidebar-wrapper");
  const ps = new PerfectScrollbar(container, {
    wheelPropagation: false,
  });
}

// Scroll into active sidebar
// document.querySelector(".sidebar-item.active").scrollIntoView(false);
// document.getElementById("burger-btn").addEventListener("click", function (event) {
//     event.preventDefault(); // Prevent the default behavior (page reload or scroll)

//   });

document.addEventListener("DOMContentLoaded", (event) => {
  const activeSidebarItem = document.querySelector(".sidebar-item.active");
  if (activeSidebarItem) {
    activeSidebarItem.scrollIntoView(false);
  }
});

const menuItems = document.querySelectorAll(".sidebar-item");

menuItems.forEach((menuItem) => {
  const submenu = menuItem.querySelector(".itemsMenu");
  const sidebarLink = menuItem.querySelector(".sidebar-link");
  const sidebar = document.getElementById("sidebar");

  if (submenu && sidebarLink) {
    menuItem.addEventListener("mouseenter", () => {
      // If sidebar is active, reset submenu styles and skip hover logic
      if (sidebar && sidebar.classList.contains("active")) {
        submenu.style.display = ""; // Reset any inline display styles
        submenu.style.position = "";
        submenu.style.top = "";
        submenu.style.left = "";
        return;
      }

      // Get the bounding rectangle of the sidebar-link
      const rect = sidebarLink.getBoundingClientRect();

      // Dynamically set the position of itemsMenu
      submenu.style.position = "fixed"; // Keeps submenu fixed to viewport
      submenu.style.top = `${rect.top + 5}px`; // Use rect.top relative to viewport
      submenu.style.left = `${rect.right}px`; // Position to the right of sidebar-link
      submenu.style.display = "block";
    });

    menuItem.addEventListener("mouseleave", () => {
      // If sidebar is active, reset submenu styles and skip hide logic
      if (sidebar && sidebar.classList.contains("active")) {
        submenu.style.display = ""; // Reset inline styles
        submenu.style.position = "";
        submenu.style.top = "";
        submenu.style.left = "";
        return;
      }

      // Hide submenu when hover ends
      submenu.style.display = "none";
    });

    sidebarLink.addEventListener("click", (e) => {
      e.preventDefault();

      // Ensure submenu styles are reset for active sidebar
      if (sidebar && sidebar.classList.contains("active")) {
        submenu.style.display = ""; // Reset inline styles
        submenu.style.position = "";
        submenu.style.top = "";
        submenu.style.left = "";
      }

      // Toggle submenu visibility for click behavior
      submenu.classList.toggle("open");
    });
  }
});

function redirectBasedOnScreenSize() {
  // Get the screen width
  const screenWidth = window.innerWidth;

  console.log("Current screen width:", screenWidth); // Debugging log

  // Check screen size and redirect
  if (screenWidth <= 992) {
    console.log("Redirecting to downloadAppPage.html");
    window.location.href = "../../dashboard/downloadAppPage.html"; // Adjust the path
  } else {
    // Redirect only if not already on the dashboard index page
    if (window.location.pathname !== "../../dashboard/index.html") {
      console.log("Redirecting to dashboard/index.html");
      window.location.href = "../../dashboard/index.html"; // Adjust the path
    }
  }
}

// Add event listeners
window.addEventListener("resize", () => {
  // Add a debounce to avoid frequent checks on resize
  clearTimeout(window.redirectTimeout);
  window.redirectTimeout = setTimeout(redirectBasedOnScreenSize, 200); // Delay for 200ms
});
