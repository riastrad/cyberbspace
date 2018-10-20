---
layout: base.njk
title: cyber(b)space
tags:
  - nav
navtitle: home
permalink: /
---

```
  <!-- Main page feature content -->
  <div class="container">
    <div class="row">
      <div class="twelve columns">
        <h1 class="welcome-text">Welcome!</h1>
      </div>
    </div>
    <div class="row">
      <div class="twelve columns">
        <div id="central-logo"></div>
      </div>
    </div>
    <div class="row">
      <div class="twelve columns">
        <p class="content less-margin">
          This is the personal website of <a href="mailto:josherb4@gmail.com">Josh Erb</a>,
          a technology professional currently living in the Washington, DC area.
        </p>
        <p class="content">
            If you are here by mistake, that's too bad. <strong>BUT</strong>, that doesn't mean you can't poke around
            and see what I've set up! Aside from this home page, there's a frequently out-of-date résumé page and a "showcase" page.
            The showcase contains (or will <em>evenutally</em> contain) brief overviews of my completed pet projects, as well
            as links to the associated code.
        </p>
      </div>
    </div>
  </div>

  <!-- Quick Logo Link-Click Script -->
  <script type="text/javascript">
    document.getElementById("central-logo").onclick = function() {
      location.href = "https://www.linkedin.com/in/josherb";
    };
  </script>
```
