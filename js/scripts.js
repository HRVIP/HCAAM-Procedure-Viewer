/**
* Prepares the procedure to be dynamically expandable/collapsible   *
*/
function prepareList() {
  experimentStarted = true;

  const UPKEY = 'w';
  const DOWNKEY = 's';
  // const BEGINEXPERIMENTKEY = 'o';
  const ENDEXPERIMENTKEY = 'p';
  const EXPANDKEY = 'd';
  const COLLAPSEKEY = 'a';
  const PLAYKEY = 't';
  const canExpand = true;

  // Retrieves sensor data from server
  var xhttp = new XMLHttpRequest();

  function getData() {
    xhttp.open("GET", "http://localhost:3000/getData", true);
    xhttp.send();
  }

  // Send laser state change requests
  var laserStates = {
    "laser1": "1",
    "laser2": "0",
    "laser3": "0"
  }

  var laserurl = "http://localhost:3000/laserRequest"
  function showMe() {
    $.ajax({
      type: "POST",
      url: laserurl,
      data: JSON.stringify(laserStates),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
    });
    dataLog("Request sent");
  }

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      dataLog(new Date().getTime(), xhttp.responseText);
    }
  }
  // Retrieve data every set interval (ms)
  setInterval(() => {
    getData();
  }, 1000);

  /**
   * Logs data to console.
   */
  function dataLog(...args) {
    if (experimentStarted) {
      args = Array.prototype.slice.call(args);
      data = args.join();
      // client.publish('action', data);
      console.log(data);
    }
  }

  // Add the classes for collapsing/expanding
  $('#expList')
    .find('li:has(ul)')
    .children('ul')
    .hide();

  // Set up this marker moving technology
  $currentElement = $('li:visible').first();
  $currentElement.toggleClass('selected');

  const down = function () {
    $('.info').css('border', '');
    $allElements = $('li:visible');

    if ($currentElement[0] == $allElements.last()[0]) {
      // $nextElement = $('li:visible').first();
      $nextElement = $currentElement;
    } else {
      $nextElement = $($allElements[$.inArray($currentElement[0], $allElements) + 1]);
    }

    dataLog(
      new Date().getTime(),
      'down from',
      $currentElement.attr('id'),
      'to',
      $nextElement.attr('id'),
    );
    $currentElement.toggleClass('selected');
    $currentElement = $nextElement;
    $currentElement.toggleClass('selected');

    // Keep the marker at the top of the screen
    $('body, html').animate(
      {
        scrollTop: $currentElement.position().top - 100,
      },
      100,
    );
  };

  const up = function () {
    $('.info').css('border', '');
    $allElements = $('li:visible');

    if ($currentElement[0] == $allElements.first()[0]) {
      // $nextElement = $('li:visible').last();
      $nextElement = $currentElement;
    } else {
      $nextElement = $($allElements[$.inArray($currentElement[0], $allElements) - 1]);
    }

    dataLog(
      new Date().getTime(),
      'up from',
      $currentElement.attr('id'),
      'to',
      $nextElement.attr('id'),
    );
    $currentElement.toggleClass('selected');
    $currentElement = $nextElement;
    $currentElement.toggleClass('selected');

    // Keep the marker at the top of the screen
    $('body, html').animate(
      {
        scrollTop: $currentElement.position().top - 100,
      },
      100,
    );
  };

  const toggle = function (that) {
    if (that == event.target || event.key == EXPANDKEY || event.key == COLLAPSEKEY) {
      $(that).toggleClass('expanded');
      $(that)
        .children('ul')
        .toggle('fast');

      if ($(that).hasClass('expanded')) {
        dataLog(new Date().getTime(), that.id, 'expanded');
        down();
      } else {
        dataLog(new Date().getTime(), that.id, 'collapsed');
      }
    }
    return false;
  };

  const toggleThat = function () {
    if (canExpand) {
      if ($currentElement.children('ul').length) {
        toggle($currentElement[0]);
      }
      play();
    }
  };

  const play = function () {
    if ($currentElement.children('video').length) {
      video = $currentElement.children('video')[0];
      if (video.paused) {
        video.play();
      } else {
        video.currentTime = 0;
        video.play();
      }
    }
  };

  // const beginExperiment = function() {
  //   filename = 'subject_' + $('#subjectid').val();
  //   // // If the subject number begins with the number 2 then they can't expand or collapse
  //   // if (filename[8] == '2') {
  //   //   $('#expandList').click();
  //   //   canExpand = false;
  //   // }
  //   client.publish('filename', filename);

  //   $('.listControl').hide();
  //   experimentStarted = true;
  //   dataLog(new Date().getTime(), 'loaded procedure');
  //   dataLog(new Date().getTime(), 'experiment started');
  // };

  // const endExperiment = function() {
  //   dataLog(new Date().getTime(), 'experiment ended');
  //   $('*').hide();
  // };

  $(window).keyup(function (e) {
    if (event.key == DOWNKEY) {
      dataLog(new Date().getTime(), 'pressed DOWNKEY');
      down();
    }
    if (event.key == UPKEY) {
      dataLog(new Date().getTime(), 'pressed UPKEY');
      up();
    }
    // if (event.key == BEGINEXPERIMENTKEY) {
    //   dataLog(new Date().getTime(), 'pressed BEGINEXPERIMENTKEY')
    //   beginExperiment();
    // }
    if (event.key == ENDEXPERIMENTKEY) {
      dataLog(new Date().getTime(), 'pressed ENDEXPERIMENTKEY');
      endExperiment();
    }
    if (event.key == PLAYKEY) {
      dataLog(new Date().getTime(), 'pressed PLAYKEY');
      play();
    }
    if (event.key == EXPANDKEY) {
      dataLog(new Date().getTime(), 'pressed EXPANDKEY');
      toggleThat();
    }
    if (event.key == COLLAPSEKEY) {
      dataLog(new Date().getTime(), 'pressed COLLAPSEKEY');
      toggleThat();
    }

    e.preventDefault();
  });
}

/** ************************************************************/
/* Functions to execute on loading the document               */
/** ************************************************************/
$(document).ready(function () {
  // Load the procedure
  $.getScript('js/procedure.js', function () {
    prepareList();
  });
});
