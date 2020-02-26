const proc = {
  'PROCEDURE': [{
    'text': '1.  ADDRESS GENERATOR SAFETY PRECAUTIONS',
    'type': 'header',
    'subtasks': [{
      'number': '1.1.',
      'text': 'Turn Engine Switch → OFF (Audible Call Out)',
      'image': '/img/figures/EngineSwitch.PNG',
      // flange nut left, lange nut right, air cleaner cover screw, center bolt
      // 'lasers': [0, 0, 0, 0],
      // light 1 (front cover), light 2 (spark plug cover), light 3 (spark plug cap), hall effect (air cleaner case), accelerometer (float chamber)
      // sensor states are NaN, 0, 1
      // 'sensors': [0, 0, 0, 0, 0]
    },
    {
      'number': '1.1.1.',
      'text': 'Once the OFF position is engaged, confirm it by clearly stating \'Engine Switch off\'.',
    },
    {
      'number': '1.2.',
      'text': 'Unplug all power cords from the Control Panel (Audible Call Out)',
      'image': '/img/figures/ControlPanel.PNG',
    },
    {
      'number': '1.2.1.',
      'text': 'Once all power chords are disconnected, confirm it by clearly stating \'Control Panel cleared\'.',
    },
    {
      'number': '1.3.',
      'text': 'Turn Fuel Breather Valve Lever → OFF (Audible Call Out)',
      'image': '/img/figures/BreatherValve.PNG',
    },
    {
      'number': '1.3.1.',
      'text': 'Once the Fuel Breather Valve Lever is turned to OFF, confirm it by clearly stating \'Fuel Breather Valve Lever off\'.',
    },
    {
      'number': '1.4.',
      'text': 'Remove the Spark Plug Cover and Spark Plug Cap.',
      'image': '/img/figures/SparkCover_Location.PNG',
    },
    {
      'number': '1.4.1.',
      'text': 'Remove the Spark Plug Cover in order to access the Spark Plug Cap.',
      'image': '/img/figures/SparkCover_Removal.PNG',
      'sensors': [0, 1, 0, 0, 0],
    },
    {
      'number': '1.4.2.',
      'text': 'Remove the Spark Plug Cap.',
      'image': '/img/figures/SparkCap_Removal.PNG',
      'sensors': [0, 1, 1, 0, 0],
    },
    {
      'number': '1.4.3.',
      'text': 'Rest the cap on the outside of the Generator and away from the Spark Plug.',
      'image': '/img/figures/SparkCap_Resting.PNG',
    }],
  },

  {
    'text': '2.  REMOVE AIR CLEANER ASSEMBLY',
    'type': 'header',
    'subtasks': [{
      'number': '2.1.',
      'text': 'Remove the Maintenance Cover.',
      'image': '/img/figures/MaintenanceCover_Location.PNG',
    },
    {
      'number': '2.1.1.',
      'text': 'Loosen the Maintenance Cover Screw.',
      'image': '/img/figures/MaintenanceScrew_Location.PNG',
    },
    {
      'number': '2.1.1.1.',
      'text': 'Use a Flat Head Screwdriver to loosen the Maintenance Cover Screw.',
    },
    {
      'number': '2.1.2.',
      'text': 'Remove the Maintenance Cover.',
      'image': '/img/figures/MaintenanceCover_Removal.PNG',
      'sensors': [1, 1, 1, 0, 0]
    },
    {
      'number': '2.2.',
      'text': 'Remove the Air Cleaner Cover and Air Filters.',
      'image': '/img/figures/AirCover_Location.PNG',
    },
    {
      'number': '2.2.1.',
      'text': 'Remove the Air Cleaner Cover Screw.',
      'image': '/img/figures/AirScrew_Location.PNG',
      'lasers': [0, 0, 1, 0],
    },
    {
      'number': '2.2.1.1.',
      'text': 'Use a Flat Head Screwdriver to loosen the Air Cleaner Cover Screw.',
    },
    {
      'number': '2.2.2.',
      'text': 'Remove the Air Cleaner Cover.',
    },
    {
      'number': '2.2.3.',
      'text': 'Remove the Air Filters.',
    },
    {
      'number': '2.2.3.1.',
      'text': 'Pull out both of the Air Filters by hand: the Main Filter (larger, upper filter) and the Outer Filter (small, lower filter).',
      'image': '/img/figures/AirFilters_Labeled.PNG',
    },
    {
      'text': 'CAUTION: Pry the Breather Tube off gently to avoid damaging it.',
      'type': 'caution',
    },
    {
      'number': '2.3.',
      'text': 'Remove the Breather Tube from the Air Cleaner Case.',
      'image': '/img/figures/BreatherTube_Location.PNG',
    },
    {
      'number': '2.3.1.',
      'text': 'Wrap the Breather Tube in the Rag and grip the Rag and Breather Tube with the Pliers. Gently tug down and away from the Air Cleaner Case with the Pliers while prying the end of the Breather Tube away from the Air Cleaner Case with the Flat Head Screwdriver.',
    },
    {
      'text': '/vid/Breather_Removal.mp4',
      'type': 'video',
    },
    {
      'number': '2.4.',
      'text': 'Remove the Air Cleaner Case and Air Intake Joint Gasket.',
      'image': '/img/figures/AirCase_Location.PNG',
    },
    {
      'number': '2.4.1.',
      'text': 'Remove the 8mm Center Bolt and Flange Nuts securing the Air Cleaner Case to the Generator.',
      'image': '/img/figures/AirCaseNutsBolts_Location.PNG',
      'lasers': [1, 1, 0, 1]
    },
    {
      'number': '2.4.1.1.',
      'text': 'Remove these using the Ratcheting Socket Wrench and Socket Set. The 8mm Hex Sockets attaches to the Ratchet through the supplied ¼” Drive.',
    },
    {
      'number': '2.4.2.',
      'text': 'Slide the Air Cleaner Case off of the bolts attached to the Generator.',
      'image': '/img/figures/AirCase_Removal.PNG',
      'sensors': [1, 1, 1, 1, 0],
    },
    {
      'number': '2.4.3.',
      'text': 'Slide the Air Intake Joint Gasket off of the bolts attached to the Generator.',
      'image': '/img/figures/AirGasket_Removal.PNG',
    }],
  },

  {
    'text': '3.  CARBURETOR REMOVAL',
    'type': 'header',
    'subtasks': [{
      'number': '3.1.',
      'text': 'Clamp the Carburetor Fuel Tube.',
      'image': '/img/figures/FuelTube_Location.PNG',
    },
    {
      'number': '3.1.1.',
      'text': 'Clamp the Carburetor Fuel Tube on the right end of the tube that is furthest from the Carburetor using the Hose Pinching Pliers.',
      'image': '/img/figures/FuelTube_Clamped.PNG',
    },
    {
      'number': '3.2.',
      'text': 'Loosen the Carburetor Drain Screw and drain fuel into the Gasoline Container then tighten the Carburetor Drain Screw.',
      'image': '/img/figures/DrainGas_Labeled.PNG',
    },
    {
      'number': '3.2.1.',
      'text': 'Put the Gasoline Container under the Carburetor Drain Tube.',
    },
    {
      'number': '3.2.2.',
      'text': 'Slightly loosen the Carburetor Drain Screw using a Flat Head Screwdriver.',
      'image': '/img/figures/DrainScrew_Location.PNG',
    },
    {
      'number': '3.2.3.',
      'text': 'Tighten the Carburetor Drain Screw using a Flat Head Screwdriver.',
    },
    {
      'number': '3.2.4.',
      'text': 'Remove the Gasoline Container.',
    },
    {
      'text': 'CAUTION: Pry the Carburetor Fuel Tube off gently to avoid damaging it.',
      'type': 'caution',
    },
    {
      'number': '3.3.',
      'text': 'Detach the Carburetor Fuel Tube from the Carburetor.',
      'image': '/img/figures/FuelTube_Labeled.PNG',
    },
    {
      'number': '3.3.1.',
      'text': 'Disengage the tension clamp and pull the Carburetor Fuel Tube from its fitting on the Carburetor.',
      'image': '/img/figures/TensionClamp_Location.PNG',
    },
    {
      'text': '/vid/TensionClamp_Removal.mp4',
      'type': 'video',
    },
    {
      'number': '3.3.1.1.',
      'text': 'Disengage the tension clamp by pushing both of the tabs on the clamp toward one another using Pliers. Hold the tabs with the Pliers while sliding the clamp off of the fitting and up the tube.',
    },
    {
      'number': '3.3.1.2.',
      'text': 'Pry the Carburetor Fuel Tube from the Carburetor fitting using a Flat Head Screwdriver.',
    },
    {
      'number': '3.4.',
      'text': 'Remove the Carburetor Drain Tube from the Generator.',
      'image': '/img/figures/DrainTube_Location.PNG',
    },
    {
      'number': '3.4.1.',
      'text': 'Pull the bottom of the Carburetor Drain Tube up and out of the Generator housing.',
      'image': '/img/figures/DrainTube_Removal.PNG',
    },
    {
      'number': '3.4.2.',
      'text': 'Remove the Carburetor Drain Tube from its fitting on the Carburetor Bowl.',
      'image': '/img/figures/DrainTubeFitting_Location.PNG',
    },
    {
      'number': '3.4.2.1.',
      'text': 'A Flat Head Screwdriver can be used to pry the Carburetor Drain Tube off of the Carburetor Bowl.',
    },
    {
      'number': '3.5.',
      'text': 'Remove the Right and Left Hand Vent Tubes from the Generator.',
      'image': '/img/figures/VentTubes_Labeled1.PNG',
    },
    {
      'number': '3.5.1.',
      'text': 'Detach the Right Hand Vent Tube from the Carburetor.',
    },
    {
      'number': '3.5.1.1.',
      'text': 'Pull the Right Hand Vent Tube downwards and out of its connection. Leave it in place once disconnected.',
      'image': '/img/figures/VentRight_Detached.PNG',
    },
    {
      'number': '3.5.2.',
      'text': 'Detach the Left Hand Vent Tube from the Carburetor.',
    },
    {
      'number': '3.5.2.1.',
      'text': 'Use a Flat Head Screwdriver to pry the tube off of the fitting. Leave it in place once disconnected.',
      'image': '/img/figures/VentLeft_Detached.PNG',
    },
    {
      'number': '3.5.3.',
      'text': 'Pull the Vent Tubes down and out of the other tubes covering them.',
      'image': '/img/figures/VentTubes_Clear.PNG',
    },
    {
      'number': '3.5.4.',
      'text': 'Pull the connection point of the Vent Tubes up and out of the Generator housing.',
      'image': '/img/figures/VentTubes_Removal.PNG',
    },
    {
      'number': '3.6.',
      'text': 'Remove the Carburetor.',
      'image': '/img/figures/Carb_Location.PNG',
    },
    {
      'number': '3.6.1.',
      'text': 'Slide the Carburetor off of the bolts attached to the Generator.',
      'image': '/img/figures/Carb_Removal.PNG',
    },
    {
      'number': '3.6.2.',
      'text': 'The Carburetor is attached to the Generator through a wire and should be rested next to the Generator as shown in the figure below.',
      'image': '/img/figures/Carb_Placement.PNG',
      'sensors': [1, 1, 1, 1, 1],
    }],
  },

  {
    'text': '4.  FLOAT CHAMBER INSPECTION',
    'type': 'header',
    'subtasks': [{
      'number': '4.1.',
      'text': 'Remove and Inspect the Float Chamber.',
      'image': '/img/figures/FloatChamber_Location.PNG',
    },
    {
      'number': '4.1.1.',
      'text': 'Remove the 10mm Bolt and Washer connecting to the Float Chamber to the Carburetor assembly.',
      'image': '/img/figures/FloatChamberBolt_Location.PNG',
    },
    {
      'number': '4.1.1.1.',
      'text': 'Remove these using the Ratcheting Socket Wrench and Socket Set. The 10mm Hex Sockets attaches directly to the Ratchet.',
    },
    {
      'number': '4.1.2.',
      'text': 'Take the Float Chamber off of the Carburetor assembly.',
    },
    {
      'number': '4.1.3.',
      'text': 'Turn the Float Chamber over and inspect it for any deposits or debris.',
      'image': '/img/figures/FloatChamber_Inspect.PNG',
    },
    {
      'number': '4.2.',
      'text': 'Remove the Float Chamber Gasket.',
      'image': '/img/figures/FloatGasket_Location.PNG',
    },
    {
      'number': '4.2.1.',
      'text': 'Remove the Gasket from the Carburetor assembly using the provided Pry Tool.',
    },
    {
      'number': '4.3.',
      'text': 'Remove the Float Securing Pin',
      'image': '/img/figures/FloatPin_Location.PNG',
    },
    {
      'number': '4.3.1.',
      'text': 'Remove the Float Securing Pin by pulling it out with fingers or Needle Nose Pliers.',
    },
    {
      'number': '4.4.',
      'text': 'Remove and Inspect the Float.',
      'image': '/img/figures/Float_Location.PNG',
    },
    {
      'number': '4.4.1.',
      'text': 'Lift the Float up and off of the Carburetor assembly.',
      'image': '/img/figures/Float_Removal.PNG',
    },
    {
      'number': '4.4.2.',
      'text': 'Inspect the Float Valve Tip for wear.',
      'image': '/img/figures/FloatValve_Inspect.PNG',
    },
    {
      'number': '4.4.3.',
      'text': 'Inspect the Float Valve Spring for operation.',
      'image': '/img/figures/FloatSpring_Location.PNG',
    },
    {
      'number': '4.4.3.1.',
      'text': 'Test spring operation by pushing down on the Float Valve Tip.',
    }],
  },

  {
    'text': '5.  FLOAT CHAMBER REASSEMBLY',
    'type': 'header',
    'subtasks': [{
      'number': '5.1.',
      'text': 'Replace the Float and Float Securing Pin.',
      'image': '/img/figures/Float_Replace.PNG',
    },
    {
      'number': '5.1.1.',
      'text': 'Align the joint holes on the Float with the joint holes on the Carburetor assembly.',
      'image': '/img/figures/FloatPin_Align.PNG',
    },
    {
      'number': '5.1.2.',
      'text': 'Insert the Float Securing Pin into the aligned joint holes.',
    },
    {
      'number': '5.2.',
      'text': 'Reinsert the Float Chamber Gasket and Reattach the Float Chamber.',
    },
    {
      'number': '5.2.1.',
      'text': 'Reinsert the Float Chamber Gasket.',
      'image': '/img/figures/FloatGasket_Replace.PNG',
    },
    {
      'number': '5.2.2.',
      'text': 'Align the marking on the Float Chamber flange with the marking on the Carburetor assembly.',
      'image': '/img/figures/FloatChamber_Align.PNG',
    },
    {
      'number': '5.2.3.',
      'text': 'Secure the Float Chamber to the Carburetor assembly using the 10mm Bolt and Washer.',
    },
    {
      'number': '5.2.3.1.',
      'text': 'Secure the Bolt using the Ratcheting Socket Wrench and Socket Set. The 10mm Hex Socket attaches directly to the Ratchet.',
    }],
  },

  {
    'text': '6.  CARBURETOR REPLACEMENT',
    'type': 'header',
    'subtasks': [{
      'number': '6.1.',
      'text': 'Replace the Carburetor followed by the Right and Left Hand Vent Tubes.',
      'image': '/img/figures/CarbVentTubes_Location.PNG',
    },
    {
      'number': '6.1.1.',
      'text': 'Slide the Carburetor onto the bolts attached to the Generator.',
      'image': '/img/figures/Carb_Replace.PNG',
      'sensors': [1, 1, 1, 1, 0],
    },
    {
      'number': '6.1.2.',
      'text': 'Insert the connection point of the Vent Tubes into the Generator housing through the right hand hole on the bottom of the casing.',
      'image': '/img/figures/VentTubes_Replace.PNG',
    },
    {
      'number': '6.1.3.',
      'text': 'Put the Vent Tubes back into position corresponding to the following figure.',
      'image': '/img/figures/VentTubes_Labeled2.PNG',
    },
    {
      'number': '6.1.3.1.',
      'text': 'The following figure ehances the layering of the Vent Tubes.',
      'image': '/img/figures/VentTubesConfig.PNG',
    },
    {
      'number': '6.1.4.',
      'text': 'Reattach the Right Hand Vent Tube to the Carburetor.',
      'image': '/img/figures/VentRight_Detached.PNG',
    },
    {
      'number': '6.1.4.1.',
      'text': 'Push the Right Hand Vent Tube upwards and into its connection tab.',
      'image': '/img/figures/VentRight_Attached.PNG',
    },
    {
      'number': '6.1.5.',
      'text': 'Reattach the Left Hand Vent Tube to the Carburetor.',
      'image': '/img/figures/VentLeft_Detached.PNG',
    },
    {
      'number': '6.1.5.1.',
      'text': 'Push the Left Hand Vent Tube onto the fitting on the Carburetor.',
      'image': '/img/figures/VentLeft_Attached.PNG',
    },
    {
      'number': '6.2.',
      'text': 'Reattach the Carburetor Fuel Tube and remove the Hose Pinching Pliers.',
      'image': '/img/figures/FuelTube_Detached.PNG',
    },
    {
      'number': '6.2.1.',
      'text': 'Push the Carburetor Fuel Tube onto the Carburetor fitting.',
    },
    {
      'number': '6.2.2.',
      'text': 'Slide the tension clamp over the Carburetor fitting.',
    },
    {
      'number': '6.2.2.1.',
      'text': 'Loosen the tension clamp by pushing both of the tabs on the clamp toward one another using Pliers. Hold the tabs with the Pliers while sliding the clamp onto the fitting.',
    },
    {
      'text': '/vid/TensionClamp_Reattach.mp4',
      'type': 'video',
    },
    {
      'number': '6.2.3.',
      'text': 'Remove the Hose Pinching Pliers from the Carburetor Fuel Tube.',
    },
    {
      'number': '6.3.',
      'text': 'Replace the Carburetor Drain Tube',
    },
    {
      'number': '6.3.1.',
      'text': 'Insert the unflared end of the Carburetor Drain Tube into the Generator housing through the left hand hole on the bottom of the casing.',
      'image': '/img/figures/DrainTube_Replace1.PNG',
    },
    {
      'number': '6.3.2.',
      'text': 'Reattach the flared end of the Carburetor Drain Tube to the fitting on the Carburetor behind the Left Hand Vent Tube.',
      'image': '/img/figures/DrainTube_Replace2.PNG',
    },
    {
      'number': '6.3.3.',
      'text': 'Check that the layering of the Carburetor Drain Tube, the Right Hand Vent Tube, and Left Hand Vent Tube is correct.',
      'image': '/img/figures/TubeConfig.PNG',
    },
    {
      'number': '6.4.',
      'text': 'Inspect the bottom of the Generator casing for gasoline or tools; clean if necessary.',
    }],
  },

  {
    'text': '7.  AIR CLEANER ASSEMBLY REPLACEMENT',
    'type': 'header',
    'subtasks': [{
      'number': '7.1.',
      'text': 'Replace the Air Intake Joint Gasket and reattach Air Cleaner Case.',
      'image': '/img/figures/CaseGasket_Labeled.PNG',
    },
    {
      'number': '7.1.1.',
      'text': 'Slide the Air Intake Joint Gasket onto the bolts attached to the Generator.',
      'image': '/img/figures/AirGasket_Replace.PNG',
    },
    {
      'number': '7.1.2.',
      'text': 'Slide the Air Cleaner Case onto the bolts attached to the Generator.',
      'image': '/img/figures/AirCase_Replace.PNG',
      'sensors': [1, 1, 1, 0, 0]
    },
    {
      'number': '7.1.3.',
      'text': 'Replace the 8mm Center Bolt and Flange Nuts securing the Air Cleaner Case to the Generator.',
      'image': '/img/figures/AirCaseNutsBolts_Replace.PNG',
      'lasers': [1, 1, 0, 1]
    },
    {
      'number': '7.1.3.1.',
      'text': 'Replace these using the Ratcheting Socket Wrench and Socket Set. The 8mm Hex Sockets attaches to the Ratchet through the supplied ¼” Drive.',
    },
    {
      'number': '7.2.',
      'text': 'Reattach the Breather Tube and replace the Air Filters and Air Cleaner Cover.',
      'image': '/img/figures/AirFiltersCover_Labeled.PNG',
    },
    {
      'number': '7.2.1.',
      'text': 'Reattach the Breather Tube to the Air Cleaner Case.',
      'image': '/img/figures/BreatherTube_Replace.PNG',
    },
    {
      'number': '7.2.2.',
      'text': 'Replace the Air Filters.',
    },
    {
      'number': '7.2.2.1.',
      'text': 'Insert both of the Air Filters by hand: the Main Filter (larger, upper filter) and the Outer Filter (small, lower filter).',
      'image': '/img/figures/AirFilters_Labeled.PNG',
    },
    {
      'number': '7.2.3.',
      'text': 'Replace the Air Cleaner Cover.',
      'image': '/img/figures/AirCover_Replace.PNG',
    },
    {
      'number': '7.2.4.',
      'text': 'Tighten the Air Cleaner Cover Screw.',
      'image': '/img/figures/AirScrew_Location.PNG',
      'lasers': [0, 0, 1, 0],
    },
    {
      'number': '7.2.4.1.',
      'text': 'Use a Flat Head Screwdriver to tighten the Air Cleaner Cover Screw.',
    },
    {
      'number': '7.3.',
      'text': 'Replace the Maintenance Cover.',
      'image': '/img/figures/MaintenanceCover_Replace.PNG',
      'sensors': [0, 1, 1],
    },
    {
      'number': '7.3.1.',
      'text': 'Tighten the Maintenance Cover Screw.',
      'image': '/img/figures/MaintenanceScrew_Location.PNG',
    },
    {
      'number': '7.3.1.1.',
      'text': 'Use a Flat Head Screwdriver to tighten the Maintenance Cover Screw.',
    },
    {
      'number': '7.4.',
      'text': 'Replace the Spark Plug Cap and Spark Plug Cover.',
      'image': '/img/figures/SparkCoverCap_Labeled.PNG',
    },
    {
      'number': '7.4.1.',
      'text': 'Replace the Spark Plug Cap.',
      'image': '/img/figures/SparkCap_Replace.PNG',
      'sensors': [0, 1, 0],
    },
    {
      'number': '7.4.2.',
      'text': 'Replace the Spark Plug Cover.',
      'image': '/img/figures/SparkCover_Replace.PNG',
      'sensors': [0, 0, 0],
    }],
  },
  ],
};

const sensorDict = {
  0: {
    'text': 'Front cover should be ',
    0: 'closed.',
    1: 'open.'
  },
  1: {
    'text': 'Spark plug cover should be ',
    0: 'closed.',
    1: 'open.'
  },
  2: {
    'text': 'Spark plug cap should be ',
    0: 'closed.',
    1: 'open.'
  },
  3: {
    'text': 'Air cleaner case should be ',
    0: 'closed.',
    1: 'open.'
  },
  4: {
    'text': 'Float champer should be ',
    0: 'upright.',
    1: 'upside down.'
  },
}

/**
 * Recursive function to build procedure steps.
 * @param {object} steps The step object, containing the step's information and any nested steps.
 * @param {string} parent The parent of the step.
 * @param {int} depth The nested depth of the step.
 */
function buildProcedure(steps, parent, depth) {
  steps.forEach(function (step, index) {
    const procID = parent + '_' + index;

    if (step.type == 'header') {
      $('<li id="' + procID + '"><div class="info">' + step.text + '</div></li>').appendTo('ul#' + parent);
    } else if (step.type == 'video') {
      $('<li id="' + procID + '"><video class="info" src="' + step.text.substr(1) + '"controls></video></li>').appendTo('ul#' + parent);
    } else if (step.type == 'caution') {
      $('<li id="' + procID + '"><div class="caution">' + step.text + '</div></li>').appendTo('ul#' + parent);
    } else {
      step.image = (step.image === undefined) ? '' : step.image;

      hasSensors = step.sensors !== undefined;
      if (hasSensors) {
        step.text += '<br /><br />'
        step.sensors.forEach(function (sensorTarget, sensorIndex) {
          if (!Number.isNaN(sensorTarget)) {
            step.text += '<p sensor=' + sensorIndex + ' sensorTarget=' + sensorTarget + ' sensorValue=0>' + sensorDict[sensorIndex]['text'] + sensorDict[sensorIndex][sensorTarget] + '</p>';
          }
        });
      }

      hasLasers = step.lasers !== undefined;
      if (hasLasers) {
        step.text += '<br /><br /> <b>For help, please activate laser guidance with the "L" key.</b>';
      }
      $('<li id="' + procID + '"><div class="number">' + step.number + '</div><div class="info">' + step.text + '</div><div class="image"><img class="info" src="' + step.image.substr(1) + '"></div></li>').appendTo('ul#' + parent);
    }

    if (step.subtasks != undefined) {
      $('<ul id="' + procID + '"></ul').appendTo('li#' + procID);
      buildProcedure(step.subtasks, procID, depth + 1);
    }
  });
}

buildProcedure(proc['PROCEDURE'], 'expList', 0);
