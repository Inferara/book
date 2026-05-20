// Compilation-result tab switcher.
// Each .ifc-tabs group has a .ifc-tab-bar containing N <button class="ifc-tab"> labels
// and N sibling <div class="ifc-tab-panel"> panes (same order).
(function () {
  function init() {
    document.querySelectorAll(".ifc-tabs").forEach(function (group) {
      var buttons = group.querySelectorAll(".ifc-tab-bar .ifc-tab");
      var panels = group.querySelectorAll(":scope > .ifc-tab-panel");
      buttons.forEach(function (btn, i) {
        btn.addEventListener("click", function () {
          buttons.forEach(function (b) { b.classList.remove("active"); });
          panels.forEach(function (p) { p.classList.remove("active"); });
          btn.classList.add("active");
          if (panels[i]) panels[i].classList.add("active");
        });
      });
    });
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
