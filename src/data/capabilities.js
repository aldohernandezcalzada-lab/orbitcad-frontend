export const CAPABILITIES = [
  {
    "id": "spur",
    "displayName": "Spur Gear",
    "category": "gears",
    "status": "production",
    "description": "A straight-tooth gear for parallel shafts.",
    "defaultPrompt": "Create spur gear module 2 teeth 20 face width 8",
    "supportedExportFormats": [
      "STEP",
      "STL"
    ],
    "previewSupport": true
  },
  {
    "id": "helical",
    "displayName": "Helical Gear",
    "category": "gears",
    "status": "production",
    "description": "An angled-tooth gear for smoother parallel-shaft meshing.",
    "defaultPrompt": "Create helical gear module 2 teeth 30 face width 20 helix 20",
    "supportedExportFormats": [
      "STEP",
      "STL"
    ],
    "previewSupport": true
  },
  {
    "id": "planetary",
    "displayName": "Planetary Gearbox",
    "category": "gear systems",
    "status": "production",
    "description": "A compact sun, planet, and internal-ring gear system.",
    "defaultPrompt": "Create planetary gearbox module 2 sun 18 planets 3 ring 54 face width 8",
    "supportedExportFormats": [
      "STEP"
    ],
    "previewSupport": false
  },
  {
    "id": "herringbone",
    "displayName": "Herringbone Gear",
    "category": "gears",
    "status": "production",
    "description": "Opposed helices that balance axial thrust.",
    "defaultPrompt": "Create herringbone gear module 2 teeth 30 face width 20",
    "supportedExportFormats": [
      "STEP",
      "STL"
    ],
    "previewSupport": true
  },
  {
    "id": "bevel",
    "displayName": "Bevel Gear",
    "category": "gears",
    "status": "production",
    "description": "A conical gear for intersecting shafts.",
    "defaultPrompt": "Create bevel gear module 2 teeth 24 face width 12",
    "supportedExportFormats": [
      "STEP",
      "STL"
    ],
    "previewSupport": true
  },
  {
    "id": "worm",
    "displayName": "Worm Drive",
    "category": "gear systems",
    "status": "production",
    "description": "A compact high-ratio right-angle drive.",
    "defaultPrompt": "Create worm drive module 2 worm starts 1 wheel teeth 40 face width 16",
    "supportedExportFormats": [
      "STEP",
      "STL"
    ],
    "previewSupport": true
  },
  {
    "id": "sprocket",
    "displayName": "Chain Sprocket",
    "category": "power transmission",
    "status": "production",
    "description": "A toothed wheel for roller-chain transmission.",
    "defaultPrompt": "Create chain sprocket #40 teeth 24 width 8",
    "supportedExportFormats": [
      "STEP",
      "STL"
    ],
    "previewSupport": true
  },
  {
    "id": "pulley",
    "displayName": "Timing Pulley",
    "category": "power transmission",
    "status": "production",
    "description": "A profiled pulley for synchronous timing belts.",
    "defaultPrompt": "Create timing pulley 30 teeth pitch 5 width 15",
    "supportedExportFormats": [
      "STEP",
      "STL"
    ],
    "previewSupport": true
  },
  {
    "id": "coupling",
    "displayName": "Shaft Coupling",
    "category": "power transmission",
    "status": "production",
    "description": "A rigid, flexible, or jaw connector for rotating shafts.",
    "defaultPrompt": "Create shaft coupling diameter 25 length 40 bore 8",
    "supportedExportFormats": [
      "STEP",
      "STL"
    ],
    "previewSupport": true
  },
  {
    "id": "shaft",
    "displayName": "Shaft",
    "category": "machine elements",
    "status": "production",
    "description": "A cylindrical rotary power-transmission member.",
    "defaultPrompt": "Create shaft diameter 12 length 80",
    "supportedExportFormats": [
      "STEP",
      "STL"
    ],
    "previewSupport": true
  },
  {
    "id": "bearing",
    "displayName": "Bearing",
    "category": "machine elements",
    "status": "production",
    "description": "A standard bearing envelope model selected by designation.",
    "defaultPrompt": "Create bearing 608",
    "supportedExportFormats": [
      "STEP",
      "STL"
    ],
    "previewSupport": true
  },
  {
    "id": "housing",
    "displayName": "Gear Housing",
    "category": "structures",
    "status": "production",
    "description": "A protective enclosure for mechanical drive components.",
    "defaultPrompt": "Create gear housing diameter 80 width 30",
    "supportedExportFormats": [
      "STEP",
      "STL"
    ],
    "previewSupport": true
  },
  {
    "id": "assembly",
    "displayName": "Mechanical Assembly",
    "category": "assemblies",
    "status": "production",
    "description": "A multi-part gear, sprocket, pulley, or coupling system.",
    "defaultPrompt": "Create gear assembly with two spur gears on parallel shafts",
    "supportedExportFormats": [
      "STEP",
      "STL"
    ],
    "previewSupport": true
  },
  {
    "id": "rack-and-pinion",
    "displayName": "Rack and Pinion",
    "category": "gear systems",
    "status": "production",
    "description": "Involute pinion and straight-rack assembly for rotary-to-linear conversion.",
    "defaultPrompt": "Create rack and pinion module 2 pinion teeth 24 face width 12 rack length 120",
    "supportedExportFormats": [
      "STEP",
      "STL"
    ],
    "previewSupport": true
  },
  {
    "id": "spline-shaft-hub",
    "displayName": "Spline Shaft and Hub",
    "category": "power transmission",
    "status": "production",
    "description": "Matching external shaft and female hub spline geometry.",
    "defaultPrompt": "Create spline shaft and hub teeth 24 module 2 pressure angle 30 face width 40 torque 50Nm",
    "supportedExportFormats": [
      "STEP",
      "STL"
    ],
    "previewSupport": true
  },
  {
    "id": "keyway-key",
    "displayName": "Keyway and Key",
    "category": "machine elements",
    "status": "production",
    "description": "Shaft keyway and matching key geometry.",
    "defaultPrompt": "Create shaft keyway diameter 25 torque 50Nm key length 40",
    "supportedExportFormats": [
      "STEP",
      "STL"
    ],
    "previewSupport": true
  },
  {
    "id": "bushing",
    "displayName": "Plain Bushing",
    "category": "machine elements",
    "status": "production",
    "description": "Sleeve-bearing geometry with clearance, press allowance, and optional oil groove.",
    "defaultPrompt": "Create bushing shaft diameter 20 housing bore 28 length 30",
    "supportedExportFormats": [
      "STEP",
      "STL"
    ],
    "previewSupport": true
  },
  {
    "id": "retaining-ring",
    "displayName": "Retaining Ring",
    "category": "machine elements",
    "status": "production",
    "description": "External or internal snap ring / circlip for axial retention.",
    "defaultPrompt": "Create retaining ring shaft diameter 25 external",
    "supportedExportFormats": [
      "STEP",
      "STL"
    ],
    "previewSupport": true
  },
  {
    "id": "lead-screw",
    "displayName": "Lead Screw and Nut",
    "category": "power transmission",
    "status": "production",
    "description": "Square or ACME thread lead screw and matching nut for linear actuation.",
    "defaultPrompt": "Create lead screw diameter 12 length 200 pitch 2 starts 1",
    "supportedExportFormats": [
      "STEP",
      "STL"
    ],
    "previewSupport": true
  },
  {
    "id": "ball-screw",
    "displayName": "Ball Screw and Nut",
    "category": "power transmission",
    "status": "production",
    "description": "Ball screw with Gothic arch raceway for low-friction linear actuation.",
    "defaultPrompt": "Create ball screw diameter 16 length 300 ball diameter 3.175 lead 5",
    "supportedExportFormats": [
      "STEP",
      "STL"
    ],
    "previewSupport": true
  },
  {
    "id": "linear-rail",
    "displayName": "Linear Rail and Carriage",
    "category": "machine elements",
    "status": "production",
    "description": "Standard profile linear guide rail and carriage block.",
    "defaultPrompt": "Create linear rail length 400 profile size 15",
    "supportedExportFormats": [
      "STEP",
      "STL"
    ],
    "previewSupport": true
  },
  {
    "id": "pillow-block",
    "displayName": "Pillow Block Bearing Housing",
    "category": "machine elements",
    "status": "production",
    "description": "Standard pillow block bearing housing (UCF/UCP style).",
    "defaultPrompt": "Create pillow block bore diameter 25",
    "supportedExportFormats": [
      "STEP",
      "STL"
    ],
    "previewSupport": true
  },
  {
    "id": "motor-mount",
    "displayName": "Motor Mount Plate",
    "category": "machine elements",
    "status": "production",
    "description": "Circular motor mounting plate with bolt pattern and shaft clearance hole.",
    "defaultPrompt": "Create motor mount motor diameter 42 mounting hole PCD 31 shaft hole 5",
    "supportedExportFormats": [
      "STEP",
      "STL"
    ],
    "previewSupport": true
  },
  {
    "id": "multi-stage-gearbox",
    "displayName": "Multi-Stage Gearbox",
    "category": "gear systems",
    "status": "production",
    "description": "A multi-stage spur or helical gear reduction assembly.",
    "defaultPrompt": "Create multi-stage gearbox 2 stages module 2 face width 20 stage1 ratio 4 stage2 ratio 5",
    "supportedExportFormats": [
      "STEP",
      "STL"
    ],
    "previewSupport": false
  },
  {
    "id": "differential-gear",
    "displayName": "Open Differential",
    "category": "gear systems",
    "status": "production",
    "description": "Open bevel-gear differential with ring, spider, and side gears.",
    "defaultPrompt": "Create differential gear module 2 ring teeth 40 pinion teeth 10 face width 14",
    "supportedExportFormats": [
      "STEP",
      "STL"
    ],
    "previewSupport": false
  },
  {
    "id": "clutch",
    "displayName": "Clutch",
    "category": "power transmission",
    "status": "production",
    "description": "Friction disc or jaw clutch engagement body.",
    "defaultPrompt": "Create friction disc clutch outer diameter 120 inner diameter 60 thickness 8 friction discs 2",
    "supportedExportFormats": [
      "STEP",
      "STL"
    ],
    "previewSupport": false
  },
  {
    "id": "brake",
    "displayName": "Disc Brake",
    "category": "power transmission",
    "status": "production",
    "description": "Disc or drum brake rotor geometry.",
    "defaultPrompt": "Create disc brake outer diameter 180 inner diameter 80 thickness 12",
    "supportedExportFormats": [
      "STEP",
      "STL"
    ],
    "previewSupport": false
  },
  {
    "id": "frame-arm",
    "displayName": "FPV Frame Arm",
    "category": "drone_fpv",
    "status": "production",
    "description": "Structural arm for FPV quadcopter / multirotor frame.",
    "defaultPrompt": "Create FPV frame arm length 120 width 15 thickness 4 material carbon_fiber",
    "supportedExportFormats": [
      "STEP",
      "STL"
    ],
    "previewSupport": true
  },
  {
    "id": "motor-mount-fpv",
    "displayName": "FPV Motor Mount",
    "category": "drone_fpv",
    "status": "production",
    "description": "Circular motor mounting plate for FPV drone motors.",
    "defaultPrompt": "Create FPV motor mount motor diameter 22 mounting PCD 16 thickness 3",
    "supportedExportFormats": [
      "STEP",
      "STL"
    ],
    "previewSupport": true
  },
  {
    "id": "flight-controller-plate",
    "displayName": "Flight Controller Plate",
    "category": "drone_fpv",
    "status": "production",
    "description": "FC stack mounting plate with standard 30.5mm mounting pattern.",
    "defaultPrompt": "Create flight controller plate width 36 length 36 mounting hole PCD 30.5 thickness 1.6",
    "supportedExportFormats": [
      "STEP",
      "STL"
    ],
    "previewSupport": true
  },
  {
    "id": "esc-mount",
    "displayName": "ESC Mount",
    "category": "drone_fpv",
    "status": "production",
    "description": "Electronic speed controller mounting platform.",
    "defaultPrompt": "Create ESC mount width 36 length 50 thickness 2 mounting hole PCD 30.5",
    "supportedExportFormats": [
      "STEP",
      "STL"
    ],
    "previewSupport": true
  },
  {
    "id": "prop-guard",
    "displayName": "Propeller Guard",
    "category": "drone_fpv",
    "status": "production",
    "description": "Ring-style propeller guard for FPV drone safety.",
    "defaultPrompt": "Create prop guard prop diameter 127 guard thickness 2 guard height 8",
    "supportedExportFormats": [
      "STEP",
      "STL"
    ],
    "previewSupport": true
  },
  {
    "id": "vtx-mount",
    "displayName": "VTX Mount",
    "category": "drone_fpv",
    "status": "production",
    "description": "Video transmitter mounting bracket.",
    "defaultPrompt": "Create VTX mount width 25 length 30 thickness 2",
    "supportedExportFormats": [
      "STEP",
      "STL"
    ],
    "previewSupport": true
  },
  {
    "id": "camera-mount",
    "displayName": "FPV Camera Mount",
    "category": "drone_fpv",
    "status": "production",
    "description": "Adjustable-tilt FPV camera mounting bracket.",
    "defaultPrompt": "Create camera mount camera width 28 tilt angle 30 thickness 2",
    "supportedExportFormats": [
      "STEP",
      "STL"
    ],
    "previewSupport": true
  },
  {
    "id": "battery-strap-mount",
    "displayName": "Battery Strap Mount",
    "category": "drone_fpv",
    "status": "production",
    "description": "Battery tray / strap retention plate for FPV drones.",
    "defaultPrompt": "Create battery strap mount battery width 65 battery length 130 strap width 20 thickness 2",
    "supportedExportFormats": [
      "STEP",
      "STL"
    ],
    "previewSupport": true
  },
  {
    "id": "arm-joint",
    "displayName": "Robotic Arm Joint",
    "category": "robotics_arm",
    "status": "production",
    "description": "Rotary joint housing for robotic arm with servo/motor mount.",
    "defaultPrompt": "Create arm joint diameter 40 length 30 bore diameter 8 wall thickness 4",
    "supportedExportFormats": [
      "STEP",
      "STL"
    ],
    "previewSupport": true
  },
  {
    "id": "arm-link",
    "displayName": "Robotic Arm Link",
    "category": "robotics_arm",
    "status": "production",
    "description": "Hollow structural link tube/channel for robotic arm.",
    "defaultPrompt": "Create arm link length 200 width 30 height 25 wall thickness 3",
    "supportedExportFormats": [
      "STEP",
      "STL"
    ],
    "previewSupport": true
  },
  {
    "id": "end-effector-mount",
    "displayName": "End Effector Mount",
    "category": "robotics_arm",
    "status": "production",
    "description": "Flange mount for attaching end effectors to a robotic arm wrist.",
    "defaultPrompt": "Create end effector mount diameter 40 flange diameter 60 length 25 mounting holes 6",
    "supportedExportFormats": [
      "STEP",
      "STL"
    ],
    "previewSupport": true
  },
  {
    "id": "gripper-jaw",
    "displayName": "Gripper Jaw",
    "category": "robotics_arm",
    "status": "production",
    "description": "Gripper finger jaw for robotic grasping applications.",
    "defaultPrompt": "Create gripper jaw length 60 width 20 thickness 6 finger angle 15",
    "supportedExportFormats": [
      "STEP",
      "STL"
    ],
    "previewSupport": true
  },
  {
    "id": "hyperboloidal-gear",
    "displayName": "Hyperboloidal Gear",
    "category": "gears",
    "status": "production",
    "description": "Pitch surface is a hyperboloid of revolution for skew-shaft power transmission.",
    "defaultPrompt": "Create hyperboloidal gear module 2 teeth 20 shaft angle 90 face width 25",
    "supportedExportFormats": [
      "STEP",
      "STL"
    ],
    "previewSupport": true
  },
  {
    "id": "double-helical-bevel-gear",
    "displayName": "Double Helical Bevel Gear",
    "category": "gears",
    "status": "production",
    "description": "Zerol/herringbone bevel gear with opposing helix angles on the same cone body.",
    "defaultPrompt": "Create double helical bevel gear module 2 teeth 24 pitch cone angle 45 helix angle 25 face width 20",
    "supportedExportFormats": [
      "STEP",
      "STL"
    ],
    "previewSupport": true
  },
  {
    "id": "logarithmic-spiral-gear",
    "displayName": "Logarithmic Spiral Gear",
    "category": "gears",
    "status": "production",
    "description": "Non-circular gear with a logarithmic spiral pitch curve for variable pitch.",
    "defaultPrompt": "Create logarithmic spiral gear module 2 teeth 20 spiral constant 0.3 face width 20",
    "supportedExportFormats": [
      "STEP",
      "STL"
    ],
    "previewSupport": true
  },
  {
    "id": "elliptical-gear",
    "displayName": "Elliptical Gear",
    "category": "gears",
    "status": "production",
    "description": "Non-circular elliptical gear for pulsating / variable gear ratio output.",
    "defaultPrompt": "Create elliptical gear semi major 30 eccentricity 0.3 teeth 20 face width 20",
    "supportedExportFormats": [
      "STEP",
      "STL"
    ],
    "previewSupport": true
  },
  {
    "id": "helicon-gear",
    "displayName": "Helicon Gear",
    "category": "gear systems",
    "status": "production",
    "description": "Cylindrical helical pinion on crossed axes meshing with a face gear.",
    "defaultPrompt": "Create helicon gear module 2 pinion teeth 3 wheel teeth 40 helix angle 45 face width 20",
    "supportedExportFormats": [
      "STEP",
      "STL"
    ],
    "previewSupport": true
  },
  {
    "id": "spiroid-gear",
    "displayName": "Spiroid Gear",
    "category": "gear systems",
    "status": "production",
    "description": "Tapered worm pinion with face gear for high-ratio compact drives.",
    "defaultPrompt": "Create spiroid gear module 2 lead angle 15 face gear teeth 40 face width 20",
    "supportedExportFormats": [
      "STEP",
      "STL"
    ],
    "previewSupport": true
  },
  {
    "id": "monopole-gear",
    "displayName": "Monopole Gear",
    "category": "gear systems",
    "status": "production",
    "description": "Spherical tooth contact gear for omnidirectional torque transmission.",
    "defaultPrompt": "Create monopole gear sphere radius 30 teeth per module 12 module count 2",
    "supportedExportFormats": [
      "STEP",
      "STL"
    ],
    "previewSupport": true
  },
  {
    "id": "cycloidal",
    "displayName": "Cycloidal Drive",
    "category": "gear systems",
    "status": "production",
    "description": "High-reduction cycloidal disk drive with ring pin assembly.",
    "defaultPrompt": "Create cycloidal drive ring pins 11 disk radius 40 eccentricity 1.5 thickness 10",
    "supportedExportFormats": [
      "STEP",
      "STL"
    ],
    "previewSupport": true
  },
  {
    "id": "harmonic",
    "displayName": "Harmonic Drive",
    "category": "gear systems",
    "status": "production",
    "description": "Strain-wave gearing with flexspline, circular spline, and wave generator.",
    "defaultPrompt": "Create harmonic drive pitch diameter 50 teeth 100 wall thickness 2.5 length 40",
    "supportedExportFormats": [
      "STEP",
      "STL"
    ],
    "previewSupport": true
  },
  {
    "id": "hypoid",
    "displayName": "Hypoid Gear Pair",
    "category": "gear systems",
    "status": "production",
    "description": "Offset-axis bevel gear pair with hypoid offset for compact right-angle drives.",
    "defaultPrompt": "Create hypoid gear module 2 gear teeth 40 pinion teeth 10 pitch angle 45 face width 20",
    "supportedExportFormats": [
      "STEP",
      "STL"
    ],
    "previewSupport": true
  },
  {
    "id": "drone-propeller-2b",
    "displayName": "2-Blade Propeller",
    "category": "drone_propv",
    "status": "production",
    "description": "Standard 2-blade drone propeller with true NACA 4-digit airfoil lofted cross-sections and hub.",
    "defaultPrompt": "Create 2 blade propeller diameter 127 pitch 127 blade profile naca_4412 face width 20",
    "supportedExportFormats": [
      "STEP",
      "STL"
    ],
    "previewSupport": true
  },
  {
    "id": "drone-propeller-3b",
    "displayName": "3-Blade Propeller",
    "category": "drone_propv",
    "status": "production",
    "description": "Standard 3-blade drone propeller \u2014 balanced efficiency and noise, NACA lofted geometry.",
    "defaultPrompt": "Create 3 blade propeller diameter 127 pitch 127 blade profile naca_4412",
    "supportedExportFormats": [
      "STEP",
      "STL"
    ],
    "previewSupport": true
  },
  {
    "id": "drone-propeller-4b",
    "displayName": "4-Blade Propeller",
    "category": "drone_propv",
    "status": "production",
    "description": "4-blade propeller for higher thrust density at lower RPM, NACA lofted geometry.",
    "defaultPrompt": "Create 4 blade propeller diameter 127 pitch 127 blade profile naca_4412",
    "supportedExportFormats": [
      "STEP",
      "STL"
    ],
    "previewSupport": true
  },
  {
    "id": "drone-propeller-toroidal",
    "displayName": "Toroidal Propeller",
    "category": "drone_propv",
    "status": "production",
    "description": "Looped-tip toroidal propeller for reduced tip vortex noise (MIT design concept), NACA lofted geometry.",
    "defaultPrompt": "Create toroidal drone propeller diameter 178 pitch 127 blades 2 blade type toroidal",
    "supportedExportFormats": [
      "STEP",
      "STL"
    ],
    "previewSupport": true
  },
  {
    "id": "drone-propeller-scimitar",
    "displayName": "Scimitar Blade Propeller",
    "category": "drone_propv",
    "status": "production",
    "description": "Swept leading-edge scimitar blades for reduced noise and improved efficiency, NACA lofted geometry.",
    "defaultPrompt": "Create scimitar blade propeller diameter 203 pitch 152 blades 3 blade type scimitar",
    "supportedExportFormats": [
      "STEP",
      "STL"
    ],
    "previewSupport": true
  },
  {
    "id": "drone-propeller-contra",
    "displayName": "Contra-Rotating Propeller",
    "category": "drone_propv",
    "status": "production",
    "description": "Two counter-rotating propeller stages on the same axis \u2014 torque canceling for coaxial drives.",
    "defaultPrompt": "Create contra-rotating propeller diameter 203 pitch 127 blades 3 blade type contra_rotating",
    "supportedExportFormats": [
      "STEP",
      "STL"
    ],
    "previewSupport": true
  },
  {
    "id": "drone-propeller-variable-pitch",
    "displayName": "Variable Pitch Propeller",
    "category": "drone_propv",
    "status": "production",
    "description": "Parametric twist along blade span for optimized performance across RPM range, NACA lofted geometry.",
    "defaultPrompt": "Create variable pitch propeller diameter 203 pitch 127 blades 3 pitch type variable twist angle 15",
    "supportedExportFormats": [
      "STEP",
      "STL"
    ],
    "previewSupport": true
  }
];
