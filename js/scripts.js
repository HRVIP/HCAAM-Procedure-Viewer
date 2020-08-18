/**
 * Prepares the procedure to be dynamically expandable/collapsible   *
 */
function prepareList() {
  experimentStarted = true;

  const UPKEY = 'w';
  const DOWNKEY = 's';
  // const BEGINEXPERIMENTKEY = 'o';
  // const ENDEXPERIMENTKEY = 'p';
  // const EXPANDKEY = 'd';
  // const COLLAPSEKEY = 'a';
  const PLAYKEY = 't';
  const LASER1KEY = '1';
  const LASER2KEY = '2';
  const LASER3KEY = '3';
  const LASER4KEY = '4';
  const LASERKEY = 'l';
  // const canExpand = true;
  const srvurl = 'http://192.168.0.112:3000';
  // Retrieves sensor data from server
  // const dataurl = 'http://192.168.0.112:3000/data';
  const dataurl = srvurl + '/data';

  function getData() {
    $.ajax({
      type: 'GET',
      url: dataurl,
      dataType: 'json',
    })
        .done(function(data) {
        // console.log(data);

          // Update interface based on sensor data
          $('p[sensor]').each(function(index, element) {
            const sensorvalue = data[parseInt($(element).attr('sensor'))];
            $(element).attr('sensorvalue', sensorvalue);

            if ($(element).attr('sensortarget') == $(element).attr('sensorvalue')) {
              $(element).attr('sensortargetreached', 1);
            } else {
              $(element).attr('sensortargetreached', 0);
            }
          });
        });
  }

  const eventurl = srvurl + '/event';

  function postEvent(event, currentStep) {
    $.ajax({
      type: 'POST',
      url: eventurl,
      data: {
        event: event.toString(),
        currentStep: currentStep.toString(),
      },
    });
  }

  // Send laser state change requests
  const laserurl = srvurl + '/lasers';

  function showMe(laser) {
    if (laser == 0) {
      $.ajax({
        type: 'POST',
        url: laserurl,
        data: {
          laser1: '0',
          laser2: '0',
          laser3: '0',
          laser4: '0',
        },
      });
    }
    if (laser == 1) {
      $.ajax({
        type: 'POST',
        url: laserurl,
        data: {
          laser1: '1',
          laser2: '0',
          laser3: '0',
          laser4: '0',
        },
      });
    }
    if (laser == 2) {
      $.ajax({
        type: 'POST',
        url: laserurl,
        data: {
          laser1: '0',
          laser2: '1',
          laser3: '0',
          laser4: '0',
        },
      });
    }
    if (laser == 3) {
      $.ajax({
        type: 'POST',
        url: laserurl,
        data: {
          laser1: '0',
          laser2: '0',
          laser3: '1',
          laser4: '0',
        },
      });
    }
    if (laser == 4) {
      $.ajax({
        type: 'POST',
        url: laserurl,
        data: {
          laser1: '0',
          laser2: '0',
          laser3: '0',
          laser4: '1',
        },
      });
    }
    dataLog('Request sent');
  }

  function getTrialFile() {
    let fn;
    $.ajax({
      type: 'GET',
      url: srvurl + '/fileName',
      dataType: 'text',
      success: function(data) {
        fn = data;
        $.ajax({
          type: 'GET',
          url: srvurl + '/trials/' + fn,
          success: function() {
            window.location.href = './trials/' + fn;
          },
        });
      },
    });
  }

  /**
   * Logs data to console.
   */
  function dataLog(...args) {
    if (experimentStarted) {
      args = Array.prototype.slice.call(args);
      data = args.join();
      console.log(data);
    }
  }

  // Add the classes for collapsing/expanding
  // $('#expList')
  //     .find('li:has(ul)')
  //     .children('ul')
  //     .hide();

  // Set up this marker moving technology
  $currentElement = $('li:not(:has(ul))').first();
  $currentElement.toggleClass('selected');

  const down = function() {
    $('.info').css('border', '');
    $allElements = $('li:not(:has(ul))');

    if ($currentElement[0] == $allElements.last()[0]) {
      // $nextElement = $('li:not(:has(ul))').first();
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

    postEvent('clicked DOWNKEY', $currentElement.attr('id'));

    // Keep the marker at the top of the screen
    $('body, html').animate({
      scrollTop: $currentElement.position().top - 100,
    },
    100,
    );
  };

  const up = function() {
    $('.info').css('border', '');
    $allElements = $('li:not(:has(ul))');

    if ($currentElement[0] == $allElements.first()[0]) {
      // $nextElement = $('li:not(:has(ul))').last();
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

    postEvent('clicked UPKEY', $currentElement.attr('id'));

    // Keep the marker at the top of the screen
    $('body, html').animate({
      scrollTop: $currentElement.position().top - 100,
    },
    100,
    );
  };

  // make end function global so that the
  window.end = function() {
    postEvent('End', $currentElement.attr('id'));
    let fn;
    $.ajax({
      type: 'GET',
      url: srvurl + '/fileName',
      dataType: 'text',
      success: function(data) {
        fn = data;
        $.ajax({
          type: 'GET',
          url: srvurl + '/trials/' + fn,
          success: function() {
            window.location.href = './trials/' + fn;
          },
        });
      },
    });
  };

  // const toggle = function(that) {
  //   if (that == event.target || event.key == EXPANDKEY || event.key == COLLAPSEKEY) {
  //     $(that).toggleClass('expanded');
  //     $(that)
  //         .children('ul')
  //         .toggle('fast');

  //     if ($(that).hasClass('expanded')) {
  //       dataLog(new Date().getTime(), that.id, 'expanded');
  //       down();
  //     } else {
  //       dataLog(new Date().getTime(), that.id, 'collapsed');
  //     }
  //   }
  //   return false;
  // };

  // const toggleThat = function() {
  //   if (canExpand) {
  //     if ($currentElement.children('ul').length) {
  //       toggle($currentElement[0]);
  //     }
  //     play();
  //   }
  // };

  $('#up')
      .unbind('click')
      .click(function() {
        dataLog(new Date().getTime(), 'clicked UPKEY');
        up();
      });

  $('#down')
      .unbind('click')
      .click(function() {
        dataLog(new Date().getTime(), 'clicked DOWNKEY');
        down();
      });

  const play = function() {
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

  $(window).keyup(function(e) {
    if (event.key == DOWNKEY) {
      dataLog(new Date().getTime(), 'pressed DOWNKEY');
      down();
    }
    if (event.key == UPKEY) {
      dataLog(new Date().getTime(), 'pressed UPKEY');
      up();
    }
    // if (event.key == BEGINEXPERIMENTKEY) {
    // //   dataLog(new Date().getTime(), 'pressed BEGINEXPERIMENTKEY')
    // //   beginExperiment();
    //   postEvent('Start', $currentElement.attr('id'));
    // }
    // if (event.key == ENDEXPERIMENTKEY) {
    //   //   dataLog(new Date().getTime(), 'pressed ENDEXPERIMENTKEY');
    //   //   endExperiment();
    //   postEvent('End', $currentElement.attr('id'));
    //   getTrialFile();
    // }
    if (event.key == PLAYKEY) {
      dataLog(new Date().getTime(), 'pressed PLAYKEY');
      play();
    }
    // if (event.key == EXPANDKEY) {
    //   dataLog(new Date().getTime(), 'pressed EXPANDKEY');
    //   toggleThat();
    // }
    // if (event.key == COLLAPSEKEY) {
    //   dataLog(new Date().getTime(), 'pressed COLLAPSEKEY');
    //   toggleThat();
    // }
    if (event.key == LASERKEY) {
      dataLog(new Date().getTime(), 'pressed LASERKEY');
      showMe(0);
      postEvent('Lasers requested', $currentElement.attr('id'));
    }
    if (event.key == LASER1KEY) {
      dataLog(new Date().getTime(), 'pressed LASER1KEY');
      showMe(1);
      postEvent('Laser 1 requested', $currentElement.attr('id'));
    }
    if (event.key == LASER2KEY) {
      dataLog(new Date().getTime(), 'pressed LASER2KEY');
      showMe(2);
      postEvent('Laser 2 requested', $currentElement.attr('id'));
    }
    if (event.key == LASER3KEY) {
      dataLog(new Date().getTime(), 'pressed LASER3KEY');
      showMe(3);
      postEvent('Laser 3 requested', $currentElement.attr('id'));
    }
    if (event.key == LASER4KEY) {
      dataLog(new Date().getTime(), 'pressed LASER4KEY');
      showMe(4);
      postEvent('Laser 4 requested', $currentElement.attr('id'));
    }
    e.preventDefault();
  });

  // Retrieve data every set interval (ms)
  setInterval(() => {
    getData();
  }, 100);

  // Start the trial when the current page has finised preparation
  postEvent('Start', $currentElement.attr('id'));
}

/** ************************************************************/
/* Functions to execute on loading the document               */
/** ************************************************************/
$(document).ready(function() {
  // Load the procedure
  $.getScript('js/procedure.js', function() {
    prepareList();
  });
});
