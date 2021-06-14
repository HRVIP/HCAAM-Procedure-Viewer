/**
 * This function enables the user interaction and communication with the server.
 */
function buildInteractivity() {
  experimentStarted = true;

  const UPKEY = 'w';
  const DOWNKEY = 's';
  const PLAYKEY = 't';
  const LASER1KEY = '1';
  const LASER2KEY = '2';
  const LASER3KEY = '3';
  const LASER4KEY = '4';
  const LASERKEY = 'l';
  const srvurl = 'http://' + window.location.hostname + ':3000';

  // const dataurl = 'http://192.168.0.112:3000/data';
  const dataurl = srvurl + '/data';

  /**
   * Updates the data shown in the procedure viewer.
   */
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
  /**
   * Logs all the user key presses.
   * @param {int} event The event to be logged.
   * @param {int} currentStep The current step in the procedure.
   */
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

  const laserurl = srvurl + '/lasers';
  /**
   * Send laser state change requests.
   * @param {int} laser The lasers to be activated.
   */
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

  /**
   * Send laser state change requests.
   * @param {int} step The step for the lasers to be activated.
   */
  function sendLasers(step) {
    lasers = step.attr('lasers').split(',');

    $.ajax({
      type: 'POST',
      url: laserurl,
      data: {
        laser1: lasers[0],
        laser2: lasers[1],
        laser3: lasers[2],
        laser4: lasers[3],
      },
    });
    dataLog('Request sent');
  }

  // function getTrialFile() {
  //   let fn;
  //   $.ajax({
  //     type: 'GET',
  //     url: srvurl + '/fileName',
  //     dataType: 'text',
  //     success: function(data) {
  //       fn = data;
  //       $.ajax({
  //         type: 'GET',
  //         url: srvurl + '/trials/' + fn,
  //         success: function() {
  //           window.location.href = './trials/' + fn;
  //         },
  //       });
  //     },
  //   });
  // }

  /**
   * Logs data to console.
   * @param {int} args Allows for logging arbitrary data.
   */
  function dataLog(...args) {
    if (experimentStarted) {
      args = Array.prototype.slice.call(args);
      data = args.join();
      console.log(data);
    }
  }

  // Set up this marker moving technology
  $currentElement = $('li:not(:has(ul))').first();
  $currentElement.toggleClass('selected');

  const down = function() {
    $('.info').css('border', '');
    $allElements = $('li:not(:has(ul))');

    if ($currentElement[0] == $allElements.last()[0]) {
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

  // make end function global
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
            let hiddenElement = document.createElement('a');
            hiddenElement.href = srvurl + '/trials/' + fn;
            hiddenElement.target = '_blank';
            hiddenElement.download = fn;
            setTimeout(function() {
              hiddenElement.click();
            }, 1000);
          },
        });
      },
    });
  };

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
  $('.laserButton')
      .unbind('click')
      .click(function() {
        dataLog(new Date().getTime(), 'clicked LASERBUTTON');
        sendLasers($(this));
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

  $(window).keyup(function(e) {
    if (event.key == DOWNKEY) {
      dataLog(new Date().getTime(), 'pressed DOWNKEY');
      down();
    }
    if (event.key == UPKEY) {
      dataLog(new Date().getTime(), 'pressed UPKEY');
      up();
    }
    if (event.key == PLAYKEY) {
      dataLog(new Date().getTime(), 'pressed PLAYKEY');
      play();
    }
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
/* Functions to execute on loading the document.               */
/** ************************************************************/
$(document).ready(function() {
  // Load the procedure
  $.getScript('js/procedure.js');
});
