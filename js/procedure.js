const proc = {
  'PROCEDURE': [{
    'text': '1.  ADDRESS GENERATOR SAFETY PRECAUTIONS',
    'type': 'header',
    'subtasks': [{
      'number': '1.1.',
      'text': 'Turn Engine Switch → OFF (Clearly state \'Engine Switch off\'.)',
      'image': '/img/figures/EngineSwitch.PNG',
      // flange nut left, flange nut right, air cleaner cover screw, center bolt
      // 'lasers': [0, 0, 0, 0],
      // light 1 (front cover), light 2 (spark plug cover), light 3 (spark plug cap), hall effect (air cleaner case), accelerometer (float chamber)
      // sensor states are NaN, 0, 1
      // 'sensors': [0, 0, 0, 0, 0]
    },
    {
      'number': '1.2.',
      'text': 'Unplug all power cords from the Control Panel (Clearly state \'Control Panel cleared\'.)',
      'image': '/img/figures/ControlPanel.PNG',
    },
    {
      'number': '1.3.',
      'text': 'Turn Fuel Breather Valve Lever → OFF (Clearly state \'Fuel Breather Valve Lever off\')',
      'image': '/img/figures/BreatherValveIndicator.PNG',
    },
    {
      'number': '1.4.',
      'text': 'Remove the Spark Plug Cover on top of the generator by firmly pulling upwards.',
      'image': '/img/figures/SparkCover_Removal.PNG',
      'sensors': [NaN, 1, NaN, NaN, NaN],
    },
    {
      'number': '1.5.',
      'text': 'Remove the Spark Plug Cap by firmly pulling upwards.',
      'image': '/img/figures/SparkCap_Removal.PNG',
      'sensors': [NaN, NaN, 1, NaN, NaN],
    },
    {
      'number': '1.5.1.',
      'text': 'Rest the cap on the outside of the Generator and away from the Spark Plug.',
      'image': '/img/figures/SparkCap_Resting.PNG',
    }],
  },
  
  {
    'text': '2.  REMOVE AIR CLEANER ASSEMBLY',
    'type': 'header',
    'subtasks': [{
      'number': '2.1.',
      'text': 'Loosen the Maintenance Cover Screw with a Flat Head Screwdriver.',
      'image': '/img/figures/MaintenanceScrew_Location.PNG',
    },
    {
      'number': '2.2.',
      'text': 'Lower the Maintenance Cover.',
      'image': '/img/figures/MaintenanceCover_Removal.PNG',
      'sensors': [1, NaN, NaN, NaN, NaN],
    },
    {
      'number': '2.3.',
      'text': 'Use a Flat Head Screwdriver to remove the Air Cleaner Cover Screw. Note that the Maintenance Cover is not shown in the image.',
      'image': '/img/figures/AirScrew_Location.PNG',
      'lasers': [0, 0, 1, 0],
    },
    {
      'number': '2.4.',
      'text': 'Pull off the Air Cleaner Cover.',
      'image': '/img/figures/AirCover_Removal.PNG',
    },
    {
      'number': '2.5.',
      'text': 'Pull out both of the Air Filters by hand: the Main Filter and the Outer Filter. Note that the filters might be greasy; there are rags if necessary',
      'image': '/img/figures/AirFilters_Labeled.PNG',
    },
    {
      'text': 'CAUTION: Pry the Breather Tube off gently to avoid damaging it.',
      'type': 'caution',
    },
    {
      'number': '2.6.',
      'text': 'Pull the Breather Tube off of the Air Cleaner Case.',
      'image': '/img/figures/BreatherTube_Indicator.PNG',
    },
    {
      'number': '2.6.1',
      'text': 'Wrap the Breather Tube in a rag and grip the rag and Breather Tube with the Pliers. Gently tug down and away from the Air Cleaner Case with the Pliers while using a Flat Head Screwdriver to pry down the end of the Breather Tube.',
      'image': '/img/figures/BreatherTube_Removal.PNG',
    },
    {
      'text': '/vid/Breather_Removal.mp4',
      'type': 'video',
    },
    {
      'number': '2.7.',
      'text': 'Use the Ratcheting Socket Wrench with the 8mm Hex Socket and 1/4" Drive to remove the Center Bolt and Flange Nuts securing the Air Cleaner Case to the Generator.',
      'image': '/img/figures/AirCaseNutsBolts_Location.PNG',
      'lasers': [1, 1, 0, 1],
    },
    {
      'number': '2.8.',
      'text': 'Slide the Air Cleaner Case off of the bolts and out of the Generator.',
      'image': '/img/figures/AirCase_Removal.PNG',
      'sensors': [NaN, NaN, NaN, 1, NaN],
    },
    {
      'number': '2.9.',
      'text': 'Slide the Air Intake Joint Gasket off of the bolts attached to the Carburetor.',
      'image': '/img/figures/AirGasket_Removal.PNG',
    }],
  },
  {
    'text': '3.  CARBURETOR REMOVAL',
    'type': 'header',
    'subtasks': [{
      'number': '3.1.',
      'text': 'Clamp the Carburetor Fuel Tube on the right end of the tube that is furthest from the Carburetor using the Hose Pinching Clamp.',
      'image': '/img/figures/FuelTube_Clamped.PNG',
    },
    {
      'text': 'CAUTION: Pry the Carburetor Fuel Tube off gently to avoid damaging it.',
      'type': 'caution',
    },
    {
      'number': '3.2.',
      'text': 'Disengage the tension clamp on the Carburetor Fuel Tube by pushing both of the tabs on the clamp toward one another using Pliers. Hold the tabs with the Pliers while sliding the clamp off of the fitting and up the tube.',
      'image': '/img/figures/TensionClamp_Location.PNG',
    },
    {
      'text': '/vid/TensionClamp_Removal.mp4',
      'type': 'video',
    },
    {
      'number': '3.3.',
      'text': 'Pry the Carburetor Fuel Tube from the Carburetor fitting using a Flat Head Screwdriver.',
      'image': '/img/figures/FuelTube_Detached.PNG',
    },
    {
      'number': '3.4.',
      'text': 'Pull the bottom of the Carburetor Drain Tube up and out of the Generator housing.',
      'image': '/img/figures/DrainTube_Location.PNG',
    },
    {
      'number': '3.5.',
      'text': 'Use a Flat Head Screwdriver to pry the Carburetor Drain Tube from its fitting on the Carburetor Bowl. Remove the Tube from the generator.',
      'image': '/img/figures/DrainTubeFitting_Location.PNG',
    },
    {
      'number': '3.6.',
      'text': 'Remove the Right and Left Hand Vent Tubes from the Generator.',
      'image': '/img/figures/VentTubes_Labeled1.PNG',
    },
    {
      'number': '3.6.1.',
      'text': 'Pull the Right Hand Vent Tube downwards and out of its connection.',
      'image': '/img/figures/VentRight_Detached.PNG',
    },
    {
      'number': '3.6.2.',
      'text': 'Use a Flat Head Screwdriver to pry the Left Hand Vent Tube off of the fitting on the Carburetor.',
      'image': '/img/figures/VentLeft_Detached.PNG',
    },
    {
      'number': '3.6.3.',
      'text': 'Pull the Vent Tubes down and out of the other tubes covering them. Remove them and place them next to the generator.',
      'image': '/img/figures/VentTubes_Removal.PNG',
    },
        {
      'text': 'CAUTION: Make sure the gasket does not come out with the Carburetor.',
      'type': 'caution',
    },
    {
      'number': '3.7.',
      'text': 'Slide the Carburetor off of the bolts attached to the Generator.',
      'image': '/img/figures/Carb_Removal.PNG',
    },
    {
      'number': '3.7.1.',
      'text': 'The Carburetor should be rested upside down as shown in the figure.',
      'image': '/img/figures/Carb_Placement.PNG',
      'sensors': [NaN, NaN, NaN, NaN, 1],
    }],
  },

  {
    'text': '4.  FLOAT CHAMBER INSPECTION',
    'type': 'header',
    'subtasks': [{
      'number': '4.1.',
      'text': 'Use the Ratcheting Socket Wrench and the 10mm Hex Socket to remove the Bolt and Washer connecting the Float Chamber to the Carburetor assembly.',
      'image': '/img/figures/FloatChamberBolt_Location.PNG',
    },
    {
      'number': '4.2.',
      'text': 'Take the Float Chamber off of the Carburetor assembly. Turn it over and inspect it for any deposits or debris.',
      'image': '/img/figures/FloatChamber_Inspect.PNG',
    },
    {
      'number': '4.3.',
      'text': 'Pry the Float Chamber Gasket from the Carburetor assembly using a Flat Head Screwdriver.',
      'image': '/img/figures/FloatGasket_Location.PNG',
    },
    {
      'number': '4.4.',
      'text': 'Remove the Float Securing Pin by pulling it out with fingers or Needle Nose Pliers',
      'image': '/img/figures/FloatPin_Location.PNG',
    },
    {
      'number': '4.5.',
      'text': 'Lift the Float up and off of the Carburetor assembly.',
      'image': '/img/figures/Float_Removal.PNG',
    },
    {
      'number': '4.6.',
      'text': 'Inspect the Float Valve Tip for wear.',
      'image': '/img/figures/FloatValve_Inspect.PNG',
    },
    {
      'number': '4.6.1.',
      'text': 'Test the Float Valve Spring for operation by pushing down on the Float Valve Tip.',
      'image': '/img/figures/FloatSpring_Location.PNG',
    }],
  },

  {
    'text': '5.  FLOAT CHAMBER REASSEMBLY',
    'type': 'header',
    'subtasks': [{
      'number': '5.1.',
      'text': 'Replace the Float and align the joint holes on the Float with the joint holes on the Carburetor assembly.',
      'image': '/img/figures/Float_Replace.PNG',
    },
    {
      'number': '5.2.',
      'text': 'Insert the Float Securing Pin into the aligned joint holes.',
      'image': '/img/figures/FloatPin_Align.PNG',
    },
    {
      'number': '5.3.',
      'text': 'Reinsert the Float Chamber Gasket.',
      'image': '/img/figures/FloatGasket_Replace.PNG',
    },
    {
      'number': '5.4.',
      'text': 'Replace the Float Chamber and align the marking on the Float Chamber flange with the marking on the Carburetor assembly.',
      'image': '/img/figures/FloatChamber_Align.PNG',
    },
    
    {
      'number': '5.5.',
      'text': 'Use the Ratcheting Socket Wrench and 10 mm Hex Socket to secure the Float Chamber to the Carburetor assembly with the 10mm Bolt and Washer.',
      'image': '/img/figures/FloatChamberBolt_Location.PNG',
    }],
  },

  {
    'text': '6.  CARBURETOR REPLACEMENT',
    'type': 'header',
    'subtasks': [{
      'number': '6.1.',
      'text': 'Flip over the Carburetor and slide it onto the bolts attached to the Generator.',
      'image': '/img/figures/Carb_Replace.PNG',
      'sensors': [NaN, NaN, NaN, NaN, 0],
    },
    {
      'number': '6.2.',
      'text': 'Insert the connection point of the Vent Tubes into the Generator housing through the right hand hole on the bottom of the casing.',
      'image': '/img/figures/VentTubes_Replace.PNG',
    },
    {
      'number': '6.3.',
      'text': 'Put the Vent Tubes back into position corresponding to the following figure.',
      'image': '/img/figures/VentTubesConfig1.PNG',
    },
    {
      'number': '6.4.',
      'text': 'Reattach the Right Hand Vent Tube to the Carburetor by pushing the tube upwards into its connection tube.',
      'image': '/img/figures/VentRight_Attached.PNG',
    },
    {
      'number': '6.5.',
      'text': 'Reattach the Left Hand Vent Tube to the Carburetor by pushing it onto the fitting. ',
      'image': '/img/figures/VentLeft_Attached.PNG',
    },
    {
      'number': '6.6.',
      'text': 'Replace the Carburetor Fuel Tube by pushing it onto the Carburetor fitting.',
      'image': '/img/figures/FuelTube_Detached.PNG',
    },
    {
      'number': '6.7.',
      'text': 'Loosen the tension clamp by pushing both of the tabs on the clamp toward one another using Pliers. Hold the tabs with the Pliers while sliding the clamp back onto the fitting.',
      'image': '/img/figures/TensionClamp_Location.PNG',
    },
    {
      'text': '/vid/TensionClamp_Reattach.mp4',
      'type': 'video',
    },
    {
      'number': '6.8.',
      'text': 'Remove the Hose Pinching Clamp from the Carburetor Fuel Tube.',
      'image': '/img/figures/FuelTube_Location.PNG',
    },
    {
      'number': '6.9.',
      'text': 'Insert the unflared end of the Carburetor Drain Tube into the Generator housing through the left hand hole on the bottom of the casing.',
      'image': '/img/figures/DrainTube_Replace1.PNG',
    },
    {
      'number': '6.10.',
      'text': 'Reattach the flared end of the Carburetor Drain Tube to the fitting on the Carburetor behind the Left Hand Vent Tube.',
      'image': '/img/figures/DrainTube_Replace2.PNG',
    },
    {
      'number': '6.11.',
      'text': 'Check that the layering of the Carburetor Drain Tube, the Right Hand Vent Tube, and Left Hand Vent Tube is correct.',
      'image': '/img/figures/TubeConfig.PNG',
    },
    {
      'number': '6.12.',
      'text': 'Inspect the bottom inside of the Generator casing for gasoline or tools; clean if necessary.',
    }],
  },

  {
    'text': '7.  AIR CLEANER ASSEMBLY REPLACEMENT',
    'type': 'header',
    'subtasks': [{
      'number': '7.1.',
      'text': 'Slide the Air Intake Joint Gasket onto the bolts attached to the Carburetor.',
      'image': '/img/figures/AirGasket_Replace.PNG',
    },
    {
      'number': '7.2.',
      'text': 'Slide the Air Cleaner Case onto the bolts attached to the Carburetor.',
      'image': '/img/figures/AirCase_Replace.PNG',
      'sensors': [NaN, NaN, NaN, 0, NaN],
    },
    {
      'number': '7.3.',
      'text': 'Use the Ratcheting Socket Wrench, 1/4” Drive and Socket Set to secure the Air Cleaner Case to the Generator with the 8mm Center Bolt and Flange Nuts.',
      'image': '/img/figures/AirCaseNutsBolts_Replace.PNG',
      'lasers': [1, 1, 0, 1],
    },
    {
      'number': '7.4.',
      'text': 'Reattach the Breather Tube to the Air Cleaner Case.',
      'image': '/img/figures/BreatherTube_Replace.PNG',
    },
    {
      'number': '7.5',
      'text': 'Replace both of the Air Filters by hand: the Main Filter and the Outer Filter.',
      'image': '/img/figures/AirFilters_Labeled.PNG',
    },
    {
      'number': '7.6.',
      'text': 'Replace the Air Cleaner Cover.',
      'image': '/img/figures/AirCover_Replace.PNG',
    },
    {
      'number': '7.7.',
      'text': 'Use a Flat Head Screwdriver to tighten the Air Cleaner Cover Screw.',
      'image': '/img/figures/AirScrew_Location.PNG',
      'lasers': [0, 0, 1, 0],
    },
    {
      'number': '7.8.',
      'text': 'Replace the Maintenance Cover and use a Flat Head Screwdriver to tighten the Maintenance Cover Screw.',
      'image': '/img/figures/MaintenanceScrew_Location.PNG',
      'sensors': [0, NaN, NaN, NaN, NaN],
    },
    {
      'number': '7.9.',
      'text': 'Replace the Spark Plug Cap onto the Spark Plug.',
      'image': '/img/figures/SparkCap_Replace.PNG',
      'sensors': [NaN, NaN, 0, NaN, NaN],
    },
    {
      'number': '7.10.',
      'text': 'Replace the Spark Plug Cover.',
      'image': '/img/figures/SparkCover_Replace.PNG',
      'sensors': [NaN, 0, NaN, NaN, NaN],
    }],
  },
  {
    'text': 'End Trial',
    'type': 'button',
  },
  ],
};

const sensorDict = {
  0: {
    'text': 'Front cover should be ',
    '0': 'closed.',
    '1': 'open.',
  },
  1: {
    'text': 'Spark plug cover should be ',
    '0': 'closed.',
    '1': 'open.',
  },
  2: {
    'text': 'Spark plug cap should be ',
    '0': 'closed.',
    '1': 'open.',
  },
  3: {
    'text': 'Air cleaner case should be ',
    '0': 'closed.',
    '1': 'open.',
  },
  4: {
    'text': 'Float chamber should be ',
    '0': 'upright.',
    '1': 'upside down.',
  },
};

/**
 * Recursive function to build procedure steps.
 * @param {object} steps The step object, containing the step's information and any nested steps.
 * @param {string} parent The parent of the step.
 * @param {int} depth The nested depth of the step.
 */
function buildProcedure(steps, parent, depth) {
  steps.forEach(function(step, index) {
    const procID = parent + '_' + index;

    if (step.type == 'header') {
      $('<li id="' + procID + '"><div class="info">' + step.text + '</div></li>').appendTo('ul#' + parent);
    } else if (step.type == 'video') {
      $('<li id="' + procID + '"><video class="info" src="' + step.text.substr(1) + '"controls></video></li>').appendTo('ul#' + parent);
    } else if (step.type == 'caution') {
      $('<li id="' + procID + '"><div class="caution">' + step.text + '</div></li>').appendTo('ul#' + parent);
    } else if (step.type == 'button') {
      $('<li id="' + procID + '"><button type="button" onclick="end()" id="end">' + step.text + '</button></li>').appendTo('ul#' + parent);
    } else {
      step.image = (step.image === undefined) ? '' : step.image;

      hasSensors = step.sensors !== undefined;
      if (hasSensors) {
        step.text += '<br /><br />';
        step.sensors.forEach(function(sensorTarget, sensorIndex) {
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
