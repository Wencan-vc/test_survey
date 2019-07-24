
var isPilot = true;
var isPrivacy = (Math.random() > 0.5);
var isIntel = Boolean(1 - isPrivacy);
var isForget = (Math.random() > 0.5);
var isRemember = Boolean(1 - isForget);

// var condIndex = Math.floor(Math.random() * 10);
var condIndex = 9;
// condIndex *= 4;
// var condIndex = Math.floor(Math.random() * 3);        /* Control the condition: Strong blur level*/
// var condIndex = 4;

var imgCond = parseInt(condIndex / 4);
var camCond = condIndex % 4;
var withBlur = (imgCond != 2);
var withHeatmap = (camCond != 0);

var privacyIntro = "Since the photos are taken automatically, they inevitably capture individuals in the surrounding environment. These individuals could be family members, friends, or complete strangers, and they are typically not aware they are being photographed.";
var completeCode = Math.floor(Math.random() * 1000000);
// var imageOrder = [10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27];
var imageOrder = [10,17];
var gtLabels = ['Biking', 'Biking', 'CleaningAndChores', 'CleaningAndChores', 'Cooking', 'Cooking', 'EatingTogether', 'EatingTogether', 'PublicTransport', 'PublicTransport', 'Shopping', 'Shopping', 'Talking', 'Talking', 'WalkingOutdoor', 'WalkingOutdoor', 'WatchingTV', 'WatchingTV'];
var fakeLabels = ['WalkingOutdoor', 'WalkingOutdoor', 'Cooking', 'Cooking', 'EatingTogether', 'EatingTogether', 'Talking', 'Shopping', 'Shopping', 'Talking', 'WalkingOutdoor', 'WatchingTV', 'WatchingTV', 'EatingTogether', 'Biking', 'Biking', 'EatingTogether', 'EatingTogether'];


var surveyLength = 2;

var forgetMsgTrain = "assume that you have forgotten what you were doing, the Smart Camera can help you to remember. Your goal is to recognize what you did correctly from the provided information.";
var rememberMsgTrain = "assume that you remember exactly what you were doing, the Smart Camera recognized the activity wrongly. Your goal is to understand why it was wrong.";
var forgetMsgMain = "You do not recall what you were doing when taking this photo. The Smart Wearable Camera labeled and recorded this activity as  ";
var rememberMsgMain1 = "You recall that your activity was most likely  "  
var rememberMsgMain2 = " when taking this photo. However, the Smart Wearable Camera labeled and recorded this activity as  ";


function shuffle(a) {
  var length = a.length;
  var shuffled = Array(length);
  for (var index = 0, rand; index < length; index++) {
    rand = ~~(Math.random() * (index + 1));
    if (rand !== index) 
      shuffled[index] = shuffled[rand];
    shuffled[rand] = a[index];
  }
  return shuffled;
}
// imageOrder = shuffle(imageOrder);

var index=0;

/* for debug */
console.log("isPilot: "+isPilot)
console.log("isPrivacy: "+isPrivacy)
console.log("isForget: "+isForget)
console.log("isIntel: "+isIntel)
console.log("condIndex (of heatmap): "+condIndex)
console.log("camCond: "+camCond)
console.log("imgCond: "+imgCond)
console.log("withBlur: "+withBlur)
console.log("withHeatmap: "+withHeatmap)
console.log("completeCode: "+completeCode)
console.log("imageOrder: "+imageOrder)
console.log(imageOrder[index]-10)
/* for debug */


var surveyJSON = 
{
 completedHtmlOnCondition: [
  {
   expression: "{qP-01} notempty",
   html: "<h3>Thank you for completing our survey.</h3><br><h3>Your response has been recorded.</h3><br><br><br><h4>Your MTurk completion code is: "+completeCode+"</h4>"
  }
 ], 
 pages: [
  /* Beginning */
  {
   name: "Beginning",
   elements: [
    {
     type: "panel",
     name: "panel10",
     elements: [
      {
       type: "html",
       name: "question8",
       html: "<h3 style=\"font-weight:500;\">Study on Understanding Smart Wearable Camera Images</h3>\n<h4>&nbsp;</h4>\n<h4 style=\"font-weight:500;\">In this research study, we are interested in people's understanding and perceptions on photos captured by wearable cameras. View some images from a Smart Wearable Camera and answer some quick questions! The survey should take up to 30 minutes. </h4>"
      }
     ]
    },
   ]
  }, 
  /* Introduction */
  {
   name: "Introduction",
   elements: [
    {
     type: "html",
     name: "question35",
     html: "<h3 style=\"font-weight:500;\">Introduction </h3>"
    },
    {
     type: "panel",
     name: "tmp",
     elements: [
      {
       type: "html",
       name: "question14",
       titleLocation: "hidden",
       html: "<p><span style=\"font-weight: 400;font-size:1.17em;\">Thank you for showing interest to this research study! </span>&nbsp;</p>\n\n<p><span style=\"font-weight: 400;font-size:1.17em;\"> Over the last few years a new category of photographic cameras has emerged: wearable cameras. These devices are usually worn on the body (e.g., head or torso) and take photographs automatically at regular intervals (e.g., every 30 seconds). These cameras have been traditionally used to capture experiences from a first-person perspective (e.g., take photos while surfing). Popular wearable cameras include the GoPro, Google Glass, Google Clips, and the Narrative: </span></p>\n\n\n"
      },
      {
       type: "imagepicker",
       name: "back",
       readOnly: true,
       titleLocation: "hidden",
       choices: [
        {
         value: "example1",
         imageLink: "figures/common/example1.jpg"
        },
        {
         value: "example2",
         imageLink: "figures/common/example2.jpg"
        },
        {
         value: "example3",
         imageLink: "figures/common/example3.jpg"
        }
       ],
       hideIfChoicesEmpty: true,
       imageFit: "fill"
      }
     ],
     readOnly: true,
     questionTitleLocation: "left"
    },
    {
     type: "panel",
     name: "panel67",
     elements: [
      {
       type: "html",
       name: "question2",
       html: "<p><span style=\"font-weight: 400;font-size:1.17em;\"> Recently, individuals have begun to wear these body-mounted cameras while performing everyday activities such as cooking, socializing, and going to work." +(isPrivacy?privacyIntro:" ")+ "Here are some examples of wearable camera photographs recording everyday activities:\n</span></p>\n"
      },
      {
       type: "imagepicker",
       name: "question6",
       readOnly: true,
       titleLocation: "hidden",
       choices: [
        {
         value: "example4",
         imageLink: "figures/common/example4.jpg"
        },
        {
         value: "example5",
         imageLink: "figures/common/example5.jpg"
        },
        {
         value: "example6",
         imageLink: "figures/common/example6.jpg"
        }
       ],
       hideIfChoicesEmpty: true,
       imageFit: "fill"
      },
      {
       type: "html",
       name: "question17",
       html: "<p><span style=\"font-weight: 400;font-size:1.17em;\">In this study, we are interested in people's understanding and perceptions on photos captured by wearable cameras. After </span><strong style=\"font-size:1.17em;\">giving consent</strong><span style=\"font-weight: 400;font-size:1.17em;\"> and completing a short </span><strong style=\"font-size:1.17em;\">quiz</strong><span style=\"font-weight: 400;font-size:1.17em;\">, we will ask you several <strong>questions related to photos</strong> from wearable cameras. Finally, we would like you to answer some <strong>demographic questions</strong>. </span></p>\n<p><span style=\"font-weight: 400;font-size:1.17em;\">It would take about <strong>30 minutes</strong> to complete the whole survey.</span></p>\n"
      }
     ]
    }
   ],
  },
  /* Consent */
  {
   name: "Consent",
   elements: [
    {
     type: "html",
     name: "question37",
     html: "<h3 style=\"font-weight:500;\">Consent Form </h3>"
    },
    {
     type: "panel",
     name: "panel5",
     elements: [
      {
       type: "html",
       name: "question19",
       titleLocation: "top",
       html: "<p style=\"font-size:14px;\"><strong>Title: Understanding Smart Wearable Camera Images </strong></p>\n<p style=\"font-size:14px;\"><strong>Principle Investigator:</strong></p>\n\n<p><span style=\"font-weight: 400;font-size:14px;\">Assistant Professor Brian Lim</span></p>\n<p><span style=\"font-weight: 400;font-size:14px;\">Organisation: School of Computing, National University of Singapore</span></p>\n<p><span style=\"font-weight: 400;font-size:14px;\">Email: <a href=\"mailto:brianlim@comp.nus.edu.sg\">brianlim@comp.nus.edu.sg</a></span></p>\n<p><span style=\"font-weight: 400;font-size:14px;\">Wencan Zhang</span></p>\n<p><span style=\"font-weight: 400;font-size:14px;\">Organisation: School of Computing, National University of Singapore</span></p>\n<p><span style=\"font-weight: 400;font-size:14px;\">Email: <a href=\"mailto:wzhang@comp.nus.edu.sg\">wzhang@comp.nus.edu.sg</a></span></p>\n<p>&nbsp;</p>\n<p style=\"font-size:14px;\"><strong>Before participating in this research, please read the following.</strong></p>\n<p style=\"font-size:14px;\"><strong>Participation is voluntary</strong></p>\n<p><span style=\"font-weight: 400;font-size:14px;\">You must be at least 18 years of age to participate. It is your choice whether or not to participate in this research. &nbsp;If you choose to participate, you may change your mind and leave the study at any time. Refusal to participate or stopping your participation will involve no penalty.</span></p>\n<p style=\"font-size:14px;\"><strong>What is the purpose of this research?</strong></p>\n<p><span style=\"font-weight: 400;font-size:14px;\">This study aims to investigate people’s understanding and perception of wearable camera photos. </span></p>\n<p style=\"font-size:14px;\"><strong>How long will I take part in this research?</strong></p>\n<p><span style=\"font-weight: 400;font-size:14px;\">It takes around 30 minutes to complete.</span></p>\n<p style=\"font-size:14px;\"><strong>What is the approximate number of research participants involved?</strong></p>\n<p><span style=\"font-weight: 400;font-size:14px;\">There will be approximately 600 participants in this study.</span></p>\n<p style=\"font-size:14px;\"><strong>What will be done if I take part in this research?</strong></p>\n<p><span style=\"font-weight: 400;font-size:14px;\">Before the study, you have to complete a short warm-up quiz. Then you will review several images and answer several questions for each image. Finally, you will answer demographic questions.</span></p>\n<p style=\"font-size:14px;\"><strong>What are the risks and possible discomforts?</strong></p>\n<p><span style=\"font-weight: 400;font-size:14px;\">None. </span></p>\n<p style=\"font-size:14px;\"><strong>Are there any benefits from being in this research study?</strong></p>\n<p><span style=\"font-weight: 400;font-size:14px;\">There is no direct benefit to you by participating in this research study. The public, researchers with interest in wearable cameras should benefit from the results of this study. </span></p>\n<p style=\"font-size:14px;\"><strong>Will I be compensated for participating in this research?</strong></p>\n<p><span style=\"font-weight: 400;font-size:14px;\">You will be compensated up to USD$1.50 if you complete this survey. </span></p>\n<p style=\"font-size:14px;\"><strong>If I take part in this research, how will my privacy be protected? What happens to the information you collect?</strong></p>\n<p><span style=\"font-weight: 400;font-size:14px;\">Information from this study will be collected on secure servers, and strict confidentiality will be maintained. No identifying information is collected. All output of the research will be reported in the aggregate based on information from multiple respondents, anonymously.</span></p>\n<p><span style=\"font-weight: 400;font-size:14px;\">All data collected will be kept in accordance to the University&rsquo;s Research Data Management Policy. Research data used in any publication will be kept for a minimum of 10 years before being discarded, and email addresses stored will be deleted upon completion of the research.</span></p>\n<p style=\"font-size:14px;\"><strong>Can I refuse to participate in this research? </strong></p>\n<p><span style=\"font-weight: 400;font-size:14px;\">Yes, you can. Your decision to participate in this research is voluntary. You can also withdraw from the research at any time without giving any reasons. </span></p>\n<p style=\"font-size:14px;\"><strong>If I have any questions, concerns or complaints about this research study, who can I talk to?</strong></p>\n<p><span style=\"font-weight: 400;font-size:14px;\">The researcher for this study is Wencan Zhang. If you have questions, concerns, or complaints, or think the research has hurt you, please feel free to contact Wencan at wzhang@comp.nus.edu.sg.</span></p>"
      }
     ],
     readOnly: true,
     questionTitleLocation: "left"
    },
    {
     type: "html",
     name: "question21",
     visible: 1-isPilot,
     html: "<p><span style=\"font-weight: 400;font-size:14px;\">For an independent opinion regarding the research and the rights of research participants, you may contact a staff member of the National University of Singapore Institutional Review Board (Attn: Dr. Chan Tuck Wai, at telephone (+65) 6516 1234 or email at irb@nus.edu.sg).</span></p>"
    },
    {
     type: "panel",
     name: "panel68",
     elements: [
      {
       type: "html",
       name: "question7",
       html: "<p><span style=\"font-weight: 400;font-size:14px;\">By clicking the \"Accept\" button, you acknowledge <strong>ALL of the following</strong> that: </span></p>\n<p style=\"font-size:14px;\">1. I am at least 18 years of age,</p>\n<p style=\"font-size:14px;\">2. I agree to take part in the aforementioned research,</p>\n<p style=\"font-size:14px;\">3. I will not have any financial benefits that result from the commercial development of this research, and</p>\n<p style=\"font-size:14px;\">4. I consent to have the coded data made available for future research.</p>"
      },
      {
       type: "boolean",
       name: "q_accept",
       title: "Accept",
       defaultValue: false,
       validators: [
        {
         type: "expression",
         text: "Please accept to consent, if you would like to participate in this study.",
         expression: "{q_accept} = true"
        }
       ]
      }
     ]
    }
   ],
  },
  /* Training */
  {
   name: "Training",
   elements: [
    {
     type: "html",
     name: "question38",
     html: "<h3 style=\"font-weight:500;\">Training </h3>"
    },
    {
     type: "panel",
     name: "panel3",
     elements: [
      {
       type: "html",
       name: "question43",
       width: "60%",
       titleLocation: "top",
       html: "<p><span style=\"font-weight: 400;font-size:1.17em;\">\nNow, we will describe the Smart Wearable Cameras that automatically captures images (e.g., every 30 seconds)"+(withHeatmap || isPrivacy?"and applies smart filters":"")+". Please study the images and descriptions carefully. For the following questions, you are required to understand what activity the camera is photographing.\n</span></p>\n<p><span style=\"font-weight: 400;font-size:1.17em;\">\nThe following are some examples of photos taken from the Smart Wearable Camera. Note how photos are taken from the chest level and represent various <strong>activities that the wearer is doing</strong>, such as socializing and talking, or walking outdoors.\n</span></p>"
      },
      {
       type: "imagepicker",
       name: "question29",
       width: "40%",
       startWithNewLine: false,
       titleLocation: "hidden",
       choices: [
        {
         value: "Wearer's activity: riding a bike",
         imageLink: "figures/common/training1.png"
        }
       ],
       imageFit: "fill",
       imageHeight: 200,
       imageWidth: 270,
       showLabel: true
      }
     ]
    },
    {
     type: "panel",
     name: "panel7",
     elements: [
      {
       type: "html",
       name: "question11",
       html: "<h3 style=\"font-weight:500;\">Activity Groundtruth </h3>"
      },
      {
       type: "html",
       name: "question9",
       html: "<p><span style=\"font-weight: 400;font-size:1.17em;\">Assume that you wore the Smart Wearable Camera recording your activities in daily life. In this survey, "+(isForget? forgetMsgTrain: rememberMsgTrain)+" </span></p>" 
      }
     ]
    },
    {
     type: "panel",
     name: "panel8",
     elements: [
      {
       type: "html",
       name: "question15",
       html: "<h3 style=\"font-weight:500;\">Activity Label </h3>"
      },
      {
       type: "html",
       name: "question10",
       html: "<p><span style=\"font-weight: 400;font-size:1.17em;\"> The Smart Wearable Camera uses AI technology to automatically identify what the wearer is doing. In this example, the camera infers that the wearer is likely doing the following activity: </span></p> <p><span style=\"font-weight: 400;font-size:1.17em;\"> Note that the wearer is only doing one activity, but the camera may infer more than one activity with different likelihoods.</span></p>"
      },
      {
       type: "matrix",
       name: "q-training",
       defaultValue: {
        "Walking Outdoors": "3",
        Biking: "Very Likely<br/>7",
        Eating: "Very Unlikely<br/>1",
        "Public Transport": "Very Unlikely<br/>1",
        Shopping: "Very Unlikely<br/>1",
        "Talking and Socializing": "Very Unlikely<br/>1",
        "Watching TV": "Very Unlikely<br/>1",
        "Cleaning and chores": "Very Unlikely<br/>1",
        Cooking: "Very Unlikely<br/>1"
       },
       isRequired: false,
       titleLocation: "hidden",
       columns: [
        "Very Unlikely<br/>1",
        "2",
        "3",
        "Neither Unlikely <br/>nor Likely<br/>4",
        "5",
        "6",
        "Very Likely<br/>7"
       ],
       rows: [
        "Walking Outdoors",
        "Biking",
        "Public Transport",
        "Eating",
        "Shopping",
        "Talking and Socializing",
        "Watching TV",
        "Cleaning and chores",
        "Cooking"
       ],
      },
     ]
    },
    {
     type: "panel",
     name: "panel4",
     elements: [
      {
       type: "html",
       name: "question4",
       html: "<h3 style=\"font-weight:500;\">Heatmap Filter </h3>"
      },
      {
       type: "html",
       name: "question45",
       html: "<p><span style=\"font-weight: 400;font-size:1.17em;\"> The Smart Wearable Camera applies a Heatmap Filter to help viewers understand what activity the wearer is doing. The heatmap helps by suggesting which part of the image the Smart Camera thinks is important to understand the activity. Red areas are more important and Blue areas are less important. In the following example, the Smart Wearable Camera recognizes that the user is Riding a bike, because the heatmap highlights the handlebar regions to convince people.\n</span></p>\n<p><span style=\"font-weight: 400;font-size:1.17em;color:red;\">\n Note that sometimes the heatmap may be <strong>inaccurate or misleading</strong>.\n</span></p>"
      },
      {
       type: "imagepicker",
       name: "question44",
       width: "650px",
       readOnly: true,
       titleLocation: "hidden",
       choices: [
        {
         value: "Original image",
         imageLink: "figures/common/training1.png"
        },
        {
         value: "Heatmap",
         imageLink: "figures/common/training2.png"
        }
       ],
       imageFit: "fill",
       imageHeight: 200,
       imageWidth: 270,
       showLabel: true
      },
      {
       type: "imagepicker",
       name: "question48",
       width: "130px",
       startWithNewLine: false,
       titleLocation: "hidden",
       choices: [
        {
         value: "legend",
         imageLink: "figures/common/jetLegend.png"
        }
       ],
       imageFit: "fill",
       imageHeight: 200,
       imageWidth: 100
      }
     ],
     visible: withHeatmap,
     readOnly: true,
    },
    {
     type: "panel",
     name: "panel1",
     elements: [
      {
       type: "html",
       name: "question5",
       html: "<h3 style=\"font-weight:500;\">Blurring Filter </h3>"
      },
      {
       type: "html",
       name: "question3",
       html: "<p><span style=\"font-weight: 400;font-size:1.17em;\">The Smart Wearable Camera also applies a Blur Filter on the captured image to protect the privacy of bystanders around "+(isPrivacy?"the Smart Camera wearer":"you")+". The image on the left is the original image, but blurred (right image) by the time you or anyone else can see it. On the other hand, the blurring effect may makes it harder to understand what activity the camera is photographing.\n</span></p>"
      },
      {
       type: "imagepicker",
       name: "question12",
       readOnly: true,
       titleLocation: "hidden",
       choices: [
        {
         value: "Original image",
         imageLink: "figures/common/training1.png"
        },
        {
         value: "Blurred image",
         imageLink: "figures/common/training"+(4-imgCond)+".png"
        }
       ],
       imageFit: "fill",
       imageHeight: 200,
       imageWidth: 270,
       showLabel: true
      }
     ],
     visible: withBlur,
     readOnly: true
    }
   ],
  },

  /* Warm-up */
  {
   name: "WarmUp",
   elements: [
    {
     type: "boolean",
     name: "question0_0",
     visible: false,
     defaultValue: "false"
    },
    {
     type: "html",
     name: "question0_1",
     html: "<h3 style=\"font-weight:500;\">Warm-up: Screening questions </h3>"
    },
    {
     type: "panel",
     name: "panel2",
     elements: [
      {
       type: "imagepicker",
       name: "question0_2",
       titleLocation: "hidden",
       choices: [
        {
         value: "warmup1",
         imageLink: "figures/common/warmup1.jpg"
        }
       ],
       imageFit: "fill",
       imageHeight: 200,
       imageWidth: 270,
      },
      {
       type: "radiogroup",
       name: "q0_1",
       title: "Where is the photo most likely taken?",
       correctAnswer: "Sunny",
       isRequired: true,
       choices: [
        "Office",
        "Bus",
        "School",
        "Restaurant",
        "Shopping"
       ],
       colCount: 0
      },
      {
       type: "imagepicker",
       name: "question0_2",
       titleLocation: "hidden",
       choices: [
        {
         value: "warmup2",
         imageLink: "figures/common/warmup2.jpg"
        }
       ],
       imageFit: "fill",
       imageHeight: 200,
       imageWidth: 270,
      },
      {
       type: "radiogroup",
       name: "q0_2",
       title: "Imagine the photo is captured from your point of view, what are you probably doing now? ",
       correctAnswer: "Riding a bike",
       isRequired: true,
       choices: [
        "Watching a movie",
        "Cooking your dinner",
        "Swimming",
        "Attending a meeting",
        "Riding a bike"
       ],
       colCount: 0
      },
      {
       type: "matrixdropdown",
       name: "q0_3",
       width: "21em",
       title: "Which of the following grid cells contain the computer screen? <br/><i style='font-size:smaller; font-weight:normal'>Please check the box(es) corresponding to each cell on the photo that you want to select. You may select more than one box.</i>",
       defaultValue: {
        "1": {
         A: false,
         B: false,
         C: false,
         D: false,
         E: false
        },
        "2": {
         A: false,
         B: false,
         C: false,
         D: false,
         E: false
        },
        "3": {
         A: false,
         B: false,
         C: false,
         D: false,
         E: false
        },
        "4": {
         A: false,
         B: false,
         C: false,
         D: false,
         E: false
        }
       },
       validators: [
        {
         type: "expression",
         text: "Please select at least one cell.",
         expression: "{q0_3.1.A} = true or {q0_3.1.B} = true or {q0_3.1.C} = true or {q0_3.1.D} = true or {q0_3.1.E} = true or {q0_3.2.A} = true or {q0_3.2.B} = true or {q0_3.2.C} = true or {q0_3.2.D} = true or {q0_3.2.E} = true or {q0_3.3.A} = true or {q0_3.3.B} = true or {q0_3.3.C} = true or {q0_3.3.D} = true or {q0_3.3.E} = true or {q0_3.4.A} = true or {q0_3.4.B} = true or {q0_3.4.C} = true or {q0_3.4.D} = true or {q0_3.4.E} = true"
        }
       ],
       columns: [
        {
         name: "A"
        },
        {
         name: "B"
        },
        {
         name: "C"
        },
        {
         name: "D"
        },
        {
         name: "E"
        }
       ],
       choices: [
        1,
        2,
        3,
        4
       ],
       cellType: "boolean",
       rows: [
        "1",
        "2",
        "3",
        "4"
       ]
      },
      {
       type: "imagepicker",
       name: "question0_3",
       width: "300px",
       startWithNewLine: false,
       titleLocation: "hidden",
       choices: [
        {
         value: "warmup3",
         imageLink: "figures/common/warmup3.jpg"
        }
       ],
       imageFit: "fill",
       imageHeight: 200,
       imageWidth: 270,
      }
     ],
     title: "All the following photos are captured by wearable cameras."
    },
    {
     type: "panel",
     name: "panel9",
     elements: [
      {
       type: "matrixdropdown",
       name: "q0_4",
       width: "21em",
       title: "According to the heatmap, which grid cells are most important? <br/><i style='font-size:smaller; font-weight:normal'>Please check the box(es) corresponding to each cell on the photo that you want to select. You may select more than one box.</i>",
       defaultValue: {
        "1": {
         A: false,
         B: false,
         C: false,
         D: false,
         E: false
        },
        "2": {
         A: false,
         B: false,
         C: false,
         D: false,
         E: false
        },
        "3": {
         A: false,
         B: false,
         C: false,
         D: false,
         E: false
        },
        "4": {
         A: false,
         B: false,
         C: false,
         D: false,
         E: false
        },
       },
       isRequired: true,
       validators: [
        {
         type: "expression",
         text: "Please select at least one cell.",
         expression: "{q0_4.1.A} = true or {q0_4.1.B} = true or {q0_4.1.C} = true or {q0_4.1.D} = true or {q0_4.1.E} = true or {q0_4.2.A} = true or {q0_4.2.B} = true or {q0_4.2.C} = true or {q0_4.2.D} = true or {q0_4.2.E} = true or {q0_4.3.A} = true or {q0_4.3.B} = true or {q0_4.3.C} = true or {q0_4.3.D} = true or {q0_4.3.E} = true or {q0_4.4.A} = true or {q0_4.4.B} = true or {q0_4.4.C} = true or {q0_4.4.D} = true or {q0_4.4.E} = true"
        }
       ],
       columns: [
        {
         name: "A"
        },
        {
         name: "B"
        },
        {
         name: "C"
        },
        {
         name: "D"
        },
        {
         name: "E"
        }
       ],
       choices: [
        1,
        2,
        3,
        4
       ],
       cellType: "boolean",
       rows: [
        "1",
        "2",
        "3",
        "4"
       ]
      },
      {
       type: "imagepicker",
       name: "question0_4",
       width: "300px",
       startWithNewLine: false,
       titleLocation: "hidden",
       choices: [
        {
         value: "warmup4",
         imageLink: "figures/common/warmup4.jpg"
        }
       ],
       imageFit: "fill",
       imageHeight: 200,
       imageWidth: 270,
      },
      {
       type: "imagepicker",
       name: "question0_5",
       width: "130px",
       startWithNewLine: false,
       titleLocation: "hidden",
       choices: [
        {
         value: "legend",
         imageLink: "figures/common/jetLegend.png"
        }
       ],
       imageFit: "fill",
       imageHeight: 200,
       imageWidth: 100
      }
     ],
     visible: withHeatmap
    }
   ],
   questionsOrder: "initial"
  },
  /* Screening */
  {
   name: "Screening",
   elements: [
    {
     type: "html",
     name: "question13",
     html: "<h3 style=\"font-weight:500;\">Sorry! You do not qualify to continue with the study.</h3> <h3 style=\"font-weight:500;\">Thank you for your interest! </h3>\n\n"
    }
   ],
   // visibleIf: withHeatmap?"not({q0_1} = \"Bus\" \nand {q0_2} = \"Riding a bike\" \nand {q0_3.2.C} = true\nand {q0_3.2.D} = true \nand {q0_4.2.B} = true\nand {q0_4.3.B} = true)":"not({q0_1} = \"Bus\" \nand {q0_2} = \"Riding a bike\" \nand {q0_3.2.C} = true\nand {q0_3.2.D} = true)",
   visibleIf: "{question0_0} = false",
   questionsOrder: "initial"
  },
  /* Survey Instruction */
  {
   name: "Survey Instruction",
   elements: [
    {
     type: "html",
     name: "question1",
     html: "<h3 style=\"font-weight:500;\">Next, you will see a series 18 of images and answer several questions for each image. There are 18 pages and 1 page for each image. </h3> \n<p>&nbsp;</p>\n<h4 style=\"font-weight: 500;color:red;\"> Please put your best effort to answer the questions <strong>accurately</strong> and <strong>quickly</strong>. For correct and quick answers, you can receive a bonus up to US$1.50. </h4>\n\n\n"
    },
   ],
   // visibleIf: withHeatmap?"{q0_1} = \"Bus\" \nand {q0_2} = \"Riding a bike\" \nand {q0_3.2.C} = true\nand {q0_3.2.D} = true \nand {q0_4.2.B} = true\nand {q0_4.3.B} = true":"{q0_1} = \"Bus\" \nand {q0_2} = \"Riding a bike\" \nand {q0_3.2.C} = true\nand {q0_3.2.D} = true",
   visibleIf: "{question0_0} = true",
   questionsOrder: "initial"
  },

  /* Task1 */
  {
   name: "Task 1 Pre",
   elements: [
    {
     type: "html",
     name: "question1_1",
     html: "<h3 style=\"font-weight:500;\">Task 1 </h3>"
    },
    {
     type: "panel",
     name: "panel1_1",
     elements: [
      {
       type: "html",
       name: "question1_2",
       visible: isIntel,
       html: "<h4 style=\"font-weight:500;\">Imagine you have been wearing a wearable camera that takes photos automatically every 30 seconds. The following is one of the photos taken some time ago. </h4> "
      },
      {
       type: "html",
       name: "question1_3",
       visible: isPrivacy,
       html: "<h4 style=\"font-weight:500;\">Imagine you are somewhere and someone nearby is wearing a wearable camera that takes photos automatically every 30 seconds. The following is one of the photos taken. </h4> "
      },
      {
       type: "html",
       name: "question1_10",
       html: "<h4 style=\"font-weight:500;\">" + (isPrivacy? forgetMsgMain+gtLabels[imageOrder[index]-10]:rememberMsgMain1+gtLabels[imageOrder[index]-10]+rememberMsgMain2+fakeLabels[imageOrder[index]-10])+"</h4> "
      },
      {
       type: "imagepicker",
       name: "question1_4",
       width: "330px",
       titleLocation: "hidden",
       choices: [
        {
         value: "item1",
         imageLink: "figures/img"+imgCond+"/"+imageOrder[index]+"_img.png"
        }
       ],
       imageFit: "fill",
       imageHeight: 200,
       imageWidth: 270,
      },
      {
       type: "imagepicker",
       name: "question1_5",
       width: "330px",
       startWithNewLine: false,
       titleLocation: "hidden",
       choices: [
        {
         value: "item1",
         imageLink: "figures/cam"+condIndex+"/"+imageOrder[index]+"_cam.png"
        }
       ],
       visible: withHeatmap,
       imageFit: "fill",
       imageHeight: 200,
       imageWidth: 270,
      },
      {
       type: "imagepicker",
       name: "question1_6",
       width: "130px",
       startWithNewLine: false,
       titleLocation: "hidden",
       choices: [
        {
         value: "legend",
         imageLink: "figures/common/jetLegend.png"
        }
       ],
       visible: withHeatmap,
       imageFit: "fill",
       imageHeight: 200,
       imageWidth: 100
      },
     ]
    },
    {
     type: "html",
     name: "question1_9",
     html: "<span style=\"font-weight:600;\">Which activity do you think "+(isIntel?"you were doing when the Smart Camera took the photo":"the Smart Camera wearer was doing")+"?</span> <br/><i style='font-size:smaller; font-weight:normal'> Hint: it is ONE of the following activities. <br/><span style=\"color:red\">Note: you must select <strong>at least one activity but not too many</strong> as NOT very unlikely. You might be disqualified from the HIT if you don’t pay enough attention. Please choose carefully. </span></i> "
    },
    {
     type: "matrix",
     name: "q"+imageOrder[index]+"-01",
     defaultValue: {
      "Walking Outdoors": "Very Unlikely<br/>1",
      Biking: "Very Unlikely<br/>1",
      Eating: "Very Unlikely<br/>1",
      "Public Transport": "Very Unlikely<br/>1",
      Shopping: "Very Unlikely<br/>1",
      "Talking and Socializing": "Very Unlikely<br/>1",
      "Watching TV": "Very Unlikely<br/>1",
      "Cleaning and chores": "Very Unlikely<br/>1",
      Cooking: "Very Unlikely<br/>1"
     },
     isRequired: true,
     validators: [
      {
       type: "expression",
       text: "Please select at least one activity as NOT very unlikely.",
       expression: "{q"+imageOrder[index]+"-01.Walking Outdoors} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Biking} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Public Transport} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Eating} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Shopping} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Talking and Socializing} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Watching TV} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Cleaning and chores} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Cooking} <> \"Very Unlikely<br/>1\""
      }
     ],
     titleLocation: "hidden",
     columns: [
      "Very Unlikely<br/>1",
      "2",
      "3",
      "Neither Unlikely <br/>nor Likely<br/>4",
      "5",
      "6",
      "Very Likely<br/>7"
     ],
     rows: [
      "Walking Outdoors",
      "Biking",
      "Public Transport",
      "Eating",
      "Shopping",
      "Talking and Socializing",
      "Watching TV",
      "Cleaning and chores",
      "Cooking"
     ],
    },
   ],
   visibleIf: "{question0_0} = true",
  },
  {
   name: "Task 1",
   elements: [
    {
     type: "html",
     name: "question1_1",
     html: "<h3 style=\"font-weight:500;\">Task 1 </h3>"
    },
    {
     type: "panel",
     name: "panel1_1",
     elements: [
      {
       type: "imagepicker",
       name: "question1_4",
       width: "330px",
       titleLocation: "hidden",
       choices: [
        {
         value: "item1",
         imageLink: "figures/img"+imgCond+"/"+imageOrder[index]+"_img.png"
        }
       ],
       imageFit: "fill",
       imageHeight: 200,
       imageWidth: 270,
      },
      {
       type: "imagepicker",
       name: "question1_5",
       width: "330px",
       startWithNewLine: false,
       titleLocation: "hidden",
       choices: [
        {
         value: "item1",
         imageLink: "figures/cam"+condIndex+"/"+imageOrder[index]+"_cam.png"
        }
       ],
       visible: withHeatmap,
       imageFit: "fill",
       imageHeight: 200,
       imageWidth: 270,
      },
      {
       type: "imagepicker",
       name: "question1_6",
       width: "130px",
       startWithNewLine: false,
       titleLocation: "hidden",
       choices: [
        {
         value: "legend",
         imageLink: "figures/common/jetLegend.png"
        }
       ],
       visible: withHeatmap,
       imageFit: "fill",
       imageHeight: 200,
       imageWidth: 100
      },
     ]
    },
    {
     type: "html",
     name: "question1_7",
     html: "<span style=\"font-weight:600;\">Your Previous Selection is:</span> "
    },
    {
     type: "matrix",
     name: "q"+imageOrder[index]+"-01",
     defaultValue: {
      "Walking Outdoors": "Very Unlikely<br/>1",
      Biking: "Very Unlikely<br/>1",
      Eating: "Very Unlikely<br/>1",
      "Public Transport": "Very Unlikely<br/>1",
      Shopping: "Very Unlikely<br/>1",
      "Talking and Socializing": "Very Unlikely<br/>1",
      "Watching TV": "Very Unlikely<br/>1",
      "Cleaning and chores": "Very Unlikely<br/>1",
      Cooking: "Very Unlikely<br/>1"
     },
     isRequired: true,
     validators: [
      {
       type: "expression",
       text: "Please select at least one activity as NOT very unlikely.",
       expression: "{q"+imageOrder[index]+"-01.Walking Outdoors} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Biking} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Public Transport} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Eating} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Shopping} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Talking and Socializing} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Watching TV} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Cleaning and chores} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Cooking} <> \"Very Unlikely<br/>1\""
      }
     ],
     titleLocation: "hidden",
     columns: [
      "Very Unlikely<br/>1",
      "2",
      "3",
      "Neither Unlikely <br/>nor Likely<br/>4",
      "5",
      "6",
      "Very Likely<br/>7"
     ],
     rows: [
      "Walking Outdoors",
      "Biking",
      "Public Transport",
      "Eating",
      "Shopping",
      "Talking and Socializing",
      "Watching TV",
      "Cleaning and chores",
      "Cooking"
     ],
    },
    {
     type: "panel",
     name: "panel1_2",
     elements: [
      {
       type: "text",
       name: "q"+imageOrder[index]+"-02",
       title: "Explain how you identified the activity.",
       isRequired: true,
      },
      {
       type: "matrixdropdown",
       name: "q"+imageOrder[index]+"-03",
       width: "21em",
       title: "Please indicate which parts of the image that <i><strong>you think</strong></i> are most important to identifying the activity. <br/><i style='font-size:smaller; font-weight:normal'>Please check the box(es) corresponding to each cell on the photo that you want to select. You may select more than one box.</i>",
       defaultValue: {
        "1": {
         A: false,
         B: false,
         C: false,
         D: false,
         E: false
        },
        "2": {
         A: false,
         B: false,
         C: false,
         D: false,
         E: false
        },
        "3": {
         A: false,
         B: false,
         C: false,
         D: false,
         E: false
        },
        "4": {
         A: false,
         B: false,
         C: false,
         D: false,
         E: false
        }
       },
       isRequired: true,
       validators: [
        {
         type: "expression",
         text: "Please select at least one cell.",
         expression: "{q"+imageOrder[index]+"-03.1.A} = true or {q"+imageOrder[index]+"-03.1.B} = true or {q"+imageOrder[index]+"-03.1.C} = true or {q"+imageOrder[index]+"-03.1.D} = true or {q"+imageOrder[index]+"-03.1.E} = true or {q"+imageOrder[index]+"-03.2.A} = true or {q"+imageOrder[index]+"-03.2.B} = true or {q"+imageOrder[index]+"-03.2.C} = true or {q"+imageOrder[index]+"-03.2.D} = true or {q"+imageOrder[index]+"-03.2.E} = true or {q"+imageOrder[index]+"-03.3.A} = true or {q"+imageOrder[index]+"-03.3.B} = true or {q"+imageOrder[index]+"-03.3.C} = true or {q"+imageOrder[index]+"-03.3.D} = true or {q"+imageOrder[index]+"-03.3.E} = true or {q"+imageOrder[index]+"-03.4.A} = true or {q"+imageOrder[index]+"-03.4.B} = true or {q"+imageOrder[index]+"-03.4.C} = true or {q"+imageOrder[index]+"-03.4.D} = true or {q"+imageOrder[index]+"-03.4.E} = true"
        }
       ],
       columns: [
        {
         name: "A"
        },
        {
         name: "B"
        },
        {
         name: "C"
        },
        {
         name: "D"
        },
        {
         name: "E"
        }
       ],
       horizontalScroll: true,
       cellType: "boolean",
       columnColCount: 4,
       rows: [
        "1",
        "2",
        "3",
        "4"
       ]
      },
      {
       type: "imagepicker",
       name: "question1_8",
       width: "400px",
       startWithNewLine: false,
       titleLocation: "hidden",
       choices: [
        {
         value: "item1",
         imageLink: "figures/img"+imgCond+"/"+imageOrder[index]+"_grid.png"
        }
       ],
       imageFit: "fill",
       imageHeight: 240,
       imageWidth: 330
      },
     ]
    },
    {
     type: "panel",
     name: "panel1_3",
     elements: [
      {
       type: "rating",
       name: "q"+imageOrder[index]+"-04",
       title: "It is easy to identify the wearer’s activity in the photo.",
       isRequired: true,
       rateMin: -3,
       rateMax: 3,
       minRateDescription: "Strongly disagree",
       maxRateDescription: "Strongly agree"
      },
      {
       type: "rating",
       name: "q"+imageOrder[index]+"-05",
       visible: withHeatmap,
       title: "The heatmap is helpful for me to identify the Smart Camera wearer’s activity.",
       isRequired: true,
       rateMin: -3,
       rateMax: 3,
       minRateDescription: "Strongly disagree",
       maxRateDescription: "Strongly agree"
      },
      {
       type: "rating",
       name: "q"+imageOrder[index]+"-06",
       visible: isIntel,
       title: "I do not mind viewing and storing my wearable camera images blurred as shown to protect the privacy of bystanders.",
       isRequired: true,
       rateMin: -3,
       rateMax: 3,
       minRateDescription: "Strongly disagree",
       maxRateDescription: "Strongly agree"
      },
      {
       type: "rating",
       name: "q"+imageOrder[index]+"-07",
       visible: isPrivacy,
       title: "I am comfortable to be captured by someone else's wearable camera in a similar photo like the one shown.",
       isRequired: true,
       rateMin: -3,
       rateMax: 3,
       minRateDescription: "Strongly disagree",
       maxRateDescription: "Strongly agree"
      },
     ],
     title: "Do you agree or disagree with the following statements?"
    },
    {
     type: "text",
     name: "q"+imageOrder[index]+"-08",
     title: "Explain why you found it easy or difficult to identify the activity.",
     isRequired: true,
    },
    {
     type: "text",
     name: "q"+imageOrder[index]+"-09",
     visible: isIntel,
     title: "Explain why you are willing or not willing to blur your images to the level shown to protect the privacy of bystanders.",
     isRequired: true,
    },
    {
     type: "text",
     name: "q"+imageOrder[index]+"-10",
     visible: isPrivacy,
     title: "Explain why you are comfortable or not comfortable to be captured in a similar photo like the one shown.",
     isRequired: true,
    }  
   ],
   // visibleIf: withHeatmap?"{q0_1} = \"Bus\" \nand {q0_2} = \"Riding a bike\" \nand {q0_3.2.C} = true\nand {q0_3.2.D} = true \nand {q0_4.2.B} = true\nand {q0_4.3.B} = true":"{q0_1} = \"Bus\" \nand {q0_2} = \"Riding a bike\" \nand {q0_3.2.C} = true\nand {q0_3.2.D} = true",
   visibleIf: "{question0_0} = true",
   questionsOrder: "initial"
  },
  /* Task2 */
  {
   name: "Task 2 Pre",
   elements: [
    {
     type: "html",
     name: "question1_1",
     html: "<h3 style=\"font-weight:500;\">Task 2 </h3>"
    },
    {
     type: "panel",
     name: "panel1_1",
     elements: [
      {
       type: "html",
       name: "question1_2",
       visible: isIntel,
       html: "<h4 style=\"font-weight:500;\">Imagine you have been wearing a wearable camera that takes photos automatically every 30 seconds. The following is one of the photos taken some time ago. </h4> "
      },
      {
       type: "html",
       name: "question1_3",
       visible: isPrivacy,
       html: "<h4 style=\"font-weight:500;\">Imagine you are somewhere and someone nearby is wearing a wearable camera that takes photos automatically every 30 seconds. The following is one of the photos taken. </h4> "
      },
      {
       type: "html",
       name: "question1_10",
       html: "<h4 style=\"font-weight:500;\">" + (isPrivacy? forgetMsgMain+gtLabels[imageOrder[index+1]-10]:rememberMsgMain1+gtLabels[imageOrder[index+1]-10]+rememberMsgMain2+fakeLabels[imageOrder[index+1]-10])+"</h4> "
      },
      {
       type: "imagepicker",
       name: "question1_4",
       width: "330px",
       titleLocation: "hidden",
       choices: [
        {
         value: "item1",
         imageLink: "figures/img"+imgCond+"/"+imageOrder[++index]+"_img.png"
        }
       ],
       imageFit: "fill",
       imageHeight: 200,
       imageWidth: 270,
      },
      {
       type: "imagepicker",
       name: "question1_5",
       width: "330px",
       startWithNewLine: false,
       titleLocation: "hidden",
       choices: [
        {
         value: "item1",
         imageLink: "figures/cam"+condIndex+"/"+imageOrder[index]+"_cam.png"
        }
       ],
       visible: withHeatmap,
       imageFit: "fill",
       imageHeight: 200,
       imageWidth: 270,
      },
      {
       type: "imagepicker",
       name: "question1_6",
       width: "130px",
       startWithNewLine: false,
       titleLocation: "hidden",
       choices: [
        {
         value: "legend",
         imageLink: "figures/common/jetLegend.png"
        }
       ],
       visible: withHeatmap,
       imageFit: "fill",
       imageHeight: 200,
       imageWidth: 100
      },
     ]
    },
    {
     type: "html",
     name: "question1_9",
     html: "<span style=\"font-weight:600;\">Which activity do you think "+(isIntel?"you were doing when the Smart Camera took the photo":"the Smart Camera wearer was doing")+"?</span> <br/><i style='font-size:smaller; font-weight:normal'> Hint: it is ONE of the following activities. <br/><span style=\"color:red\">Note: you must select <strong>at least one activity but not too many</strong> as NOT very unlikely. You might be disqualified from the HIT if you don’t pay enough attention. Please choose carefully. </span></i> "
    },
    {
     type: "matrix",
     name: "q"+imageOrder[index]+"-01",
     defaultValue: {
      "Walking Outdoors": "Very Unlikely<br/>1",
      Biking: "Very Unlikely<br/>1",
      Eating: "Very Unlikely<br/>1",
      "Public Transport": "Very Unlikely<br/>1",
      Shopping: "Very Unlikely<br/>1",
      "Talking and Socializing": "Very Unlikely<br/>1",
      "Watching TV": "Very Unlikely<br/>1",
      "Cleaning and chores": "Very Unlikely<br/>1",
      Cooking: "Very Unlikely<br/>1"
     },
     isRequired: true,
     validators: [
      {
       type: "expression",
       text: "Please select at least one activity as NOT very unlikely.",
       expression: "{q"+imageOrder[index]+"-01.Walking Outdoors} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Biking} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Public Transport} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Eating} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Shopping} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Talking and Socializing} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Watching TV} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Cleaning and chores} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Cooking} <> \"Very Unlikely<br/>1\""
      }
     ],
     titleLocation: "hidden",
     columns: [
      "Very Unlikely<br/>1",
      "2",
      "3",
      "Neither Unlikely <br/>nor Likely<br/>4",
      "5",
      "6",
      "Very Likely<br/>7"
     ],
     rows: [
      "Walking Outdoors",
      "Biking",
      "Public Transport",
      "Eating",
      "Shopping",
      "Talking and Socializing",
      "Watching TV",
      "Cleaning and chores",
      "Cooking"
     ],
    },
   ],
   visibleIf: "{question0_0} = true",
  },
  {
   name: "Task 2",
   elements: [
    {
     type: "html",
     name: "question1_1",
     html: "<h3 style=\"font-weight:500;\">Task 2 </h3>"
    },
    {
     type: "panel",
     name: "panel1_1",
     elements: [
      {
       type: "imagepicker",
       name: "question1_4",
       width: "330px",
       titleLocation: "hidden",
       choices: [
        {
         value: "item1",
         imageLink: "figures/img"+imgCond+"/"+imageOrder[index]+"_img.png"
        }
       ],
       imageFit: "fill",
       imageHeight: 200,
       imageWidth: 270,
      },
      {
       type: "imagepicker",
       name: "question1_5",
       width: "330px",
       startWithNewLine: false,
       titleLocation: "hidden",
       choices: [
        {
         value: "item1",
         imageLink: "figures/cam"+condIndex+"/"+imageOrder[index]+"_cam.png"
        }
       ],
       visible: withHeatmap,
       imageFit: "fill",
       imageHeight: 200,
       imageWidth: 270,
      },
      {
       type: "imagepicker",
       name: "question1_6",
       width: "130px",
       startWithNewLine: false,
       titleLocation: "hidden",
       choices: [
        {
         value: "legend",
         imageLink: "figures/common/jetLegend.png"
        }
       ],
       visible: withHeatmap,
       imageFit: "fill",
       imageHeight: 200,
       imageWidth: 100
      },
     ]
    },
    {
     type: "html",
     name: "question1_7",
     html: "<span style=\"font-weight:600;\">Your Previous Selection is:</span> "
    },
    {
     type: "matrix",
     name: "q"+imageOrder[index]+"-01",
     defaultValue: {
      "Walking Outdoors": "Very Unlikely<br/>1",
      Biking: "Very Unlikely<br/>1",
      Eating: "Very Unlikely<br/>1",
      "Public Transport": "Very Unlikely<br/>1",
      Shopping: "Very Unlikely<br/>1",
      "Talking and Socializing": "Very Unlikely<br/>1",
      "Watching TV": "Very Unlikely<br/>1",
      "Cleaning and chores": "Very Unlikely<br/>1",
      Cooking: "Very Unlikely<br/>1"
     },
     isRequired: true,
     validators: [
      {
       type: "expression",
       text: "Please select at least one activity as NOT very unlikely.",
       expression: "{q"+imageOrder[index]+"-01.Walking Outdoors} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Biking} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Public Transport} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Eating} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Shopping} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Talking and Socializing} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Watching TV} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Cleaning and chores} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Cooking} <> \"Very Unlikely<br/>1\""
      }
     ],
     titleLocation: "hidden",
     columns: [
      "Very Unlikely<br/>1",
      "2",
      "3",
      "Neither Unlikely <br/>nor Likely<br/>4",
      "5",
      "6",
      "Very Likely<br/>7"
     ],
     rows: [
      "Walking Outdoors",
      "Biking",
      "Public Transport",
      "Eating",
      "Shopping",
      "Talking and Socializing",
      "Watching TV",
      "Cleaning and chores",
      "Cooking"
     ],
    },
    {
     type: "panel",
     name: "panel1_2",
     elements: [
      {
       type: "text",
       name: "q"+imageOrder[index]+"-02",
       title: "Explain how you identified the activity.",
       isRequired: true,
      },
      {
       type: "matrixdropdown",
       name: "q"+imageOrder[index]+"-03",
       width: "21em",
       title: "Please indicate which parts of the image that <i><strong>you think</strong></i> are most important to identifying the activity. <br/><i style='font-size:smaller; font-weight:normal'>Please check the box(es) corresponding to each cell on the photo that you want to select. You may select more than one box.</i>",
       defaultValue: {
        "1": {
         A: false,
         B: false,
         C: false,
         D: false,
         E: false
        },
        "2": {
         A: false,
         B: false,
         C: false,
         D: false,
         E: false
        },
        "3": {
         A: false,
         B: false,
         C: false,
         D: false,
         E: false
        },
        "4": {
         A: false,
         B: false,
         C: false,
         D: false,
         E: false
        }
       },
       isRequired: true,
       validators: [
        {
         type: "expression",
         text: "Please select at least one cell.",
         expression: "{q"+imageOrder[index]+"-03.1.A} = true or {q"+imageOrder[index]+"-03.1.B} = true or {q"+imageOrder[index]+"-03.1.C} = true or {q"+imageOrder[index]+"-03.1.D} = true or {q"+imageOrder[index]+"-03.1.E} = true or {q"+imageOrder[index]+"-03.2.A} = true or {q"+imageOrder[index]+"-03.2.B} = true or {q"+imageOrder[index]+"-03.2.C} = true or {q"+imageOrder[index]+"-03.2.D} = true or {q"+imageOrder[index]+"-03.2.E} = true or {q"+imageOrder[index]+"-03.3.A} = true or {q"+imageOrder[index]+"-03.3.B} = true or {q"+imageOrder[index]+"-03.3.C} = true or {q"+imageOrder[index]+"-03.3.D} = true or {q"+imageOrder[index]+"-03.3.E} = true or {q"+imageOrder[index]+"-03.4.A} = true or {q"+imageOrder[index]+"-03.4.B} = true or {q"+imageOrder[index]+"-03.4.C} = true or {q"+imageOrder[index]+"-03.4.D} = true or {q"+imageOrder[index]+"-03.4.E} = true"
        }
       ],
       columns: [
        {
         name: "A"
        },
        {
         name: "B"
        },
        {
         name: "C"
        },
        {
         name: "D"
        },
        {
         name: "E"
        }
       ],
       horizontalScroll: true,
       cellType: "boolean",
       columnColCount: 4,
       rows: [
        "1",
        "2",
        "3",
        "4"
       ]
      },
      {
       type: "imagepicker",
       name: "question1_8",
       width: "400px",
       startWithNewLine: false,
       titleLocation: "hidden",
       choices: [
        {
         value: "item1",
         imageLink: "figures/img"+imgCond+"/"+imageOrder[index]+"_grid.png"
        }
       ],
       imageFit: "fill",
       imageHeight: 240,
       imageWidth: 330
      },
     ]
    },
    {
     type: "panel",
     name: "panel1_3",
     elements: [
      {
       type: "rating",
       name: "q"+imageOrder[index]+"-04",
       title: "It is easy to identify the wearer’s activity in the photo.",
       isRequired: true,
       rateMin: -3,
       rateMax: 3,
       minRateDescription: "Strongly disagree",
       maxRateDescription: "Strongly agree"
      },
      {
       type: "rating",
       name: "q"+imageOrder[index]+"-05",
       visible: withHeatmap,
       title: "The heatmap is helpful for me to identify the Smart Camera wearer’s activity.",
       isRequired: true,
       rateMin: -3,
       rateMax: 3,
       minRateDescription: "Strongly disagree",
       maxRateDescription: "Strongly agree"
      },
      {
       type: "rating",
       name: "q"+imageOrder[index]+"-06",
       visible: isIntel,
       title: "I do not mind viewing and storing my wearable camera images blurred as shown to protect the privacy of bystanders.",
       isRequired: true,
       rateMin: -3,
       rateMax: 3,
       minRateDescription: "Strongly disagree",
       maxRateDescription: "Strongly agree"
      },
      {
       type: "rating",
       name: "q"+imageOrder[index]+"-07",
       visible: isPrivacy,
       title: imageOrder[index]+"I am comfortable to be captured by someone else's wearable camera in a similar photo like the one shown.",
       isRequired: true,
       rateMin: -3,
       rateMax: 3,
       minRateDescription: "Strongly disagree",
       maxRateDescription: "Strongly agree"
      },
     ],
     title: "Do you agree or disagree with the following statements?"
    },
    {
     type: "text",
     name: "q"+imageOrder[index]+"-08",
     title: "Explain why you found it easy or difficult to identify the activity.",
     isRequired: true,
    },
    {
     type: "text",
     name: "q"+imageOrder[index]+"-09",
     visible: isIntel,
     title: "Explain why you are willing or not willing to blur your images to the level shown to protect the privacy of bystanders.",
     isRequired: true,
    },
    {
     type: "text",
     name: "q"+imageOrder[index]+"-10",
     visible: isPrivacy,
     title: "Explain why you are comfortable or not comfortable to be captured in a similar photo like the one shown.",
     isRequired: true,
    }  
   ],
   // visibleIf: withHeatmap?"{q0_1} = \"Bus\" \nand {q0_2} = \"Riding a bike\" \nand {q0_3.2.C} = true\nand {q0_3.2.D} = true \nand {q0_4.2.B} = true\nand {q0_4.3.B} = true":"{q0_1} = \"Bus\" \nand {q0_2} = \"Riding a bike\" \nand {q0_3.2.C} = true\nand {q0_3.2.D} = true",
   visibleIf: "{question0_0} = true",
   questionsOrder: "initial"
  },


  // /* Task3 */
  // {
  //  name: "Task 3 Pre",
  //  elements: [
  //   {
  //    type: "html",
  //    name: "question1_1",
  //    html: "<h3 style=\"font-weight:500;\">Task 3 </h3>"
  //   },
  //   {
  //    type: "panel",
  //    name: "panel1_1",
  //    elements: [
  //     {
  //      type: "html",
  //      name: "question1_2",
  //      visible: isIntel,
  //      html: "<h4 style=\"font-weight:500;\">Imagine you have been wearing a wearable camera that takes photos automatically every 30 seconds. The following is one of the photos taken some time ago. </h4> "
  //     },
  //     {
  //      type: "html",
  //      name: "question1_3",
  //      visible: isPrivacy,
  //      html: "<h4 style=\"font-weight:500;\">Imagine you are somewhere and someone nearby is wearing a wearable camera that takes photos automatically every 30 seconds. The following is one of the photos taken. </h4> "
  //     },
  //     {
  //      type: "imagepicker",
  //      name: "question1_4",
  //      width: "330px",
  //      titleLocation: "hidden",
  //      choices: [
  //       {
  //        value: "item1",
  //        imageLink: "figures/img"+imgCond+"/"+imageOrder[++index]+"_img.png"
  //       }
  //      ],
  //      imageFit: "fill",
  //      imageHeight: 200,
  //      imageWidth: 270,
  //     },
  //     {
  //      type: "imagepicker",
  //      name: "question1_5",
  //      width: "330px",
  //      startWithNewLine: false,
  //      titleLocation: "hidden",
  //      choices: [
  //       {
  //        value: "item1",
  //        imageLink: "figures/cam"+condIndex+"/"+imageOrder[index]+"_cam.png"
  //       }
  //      ],
  //      visible: withHeatmap,
  //      imageFit: "fill",
  //      imageHeight: 200,
  //      imageWidth: 270,
  //     },
  //     {
  //      type: "imagepicker",
  //      name: "question1_6",
  //      width: "130px",
  //      startWithNewLine: false,
  //      titleLocation: "hidden",
  //      choices: [
  //       {
  //        value: "legend",
  //        imageLink: "figures/common/jetLegend.png"
  //       }
  //      ],
  //      visible: withHeatmap,
  //      imageFit: "fill",
  //      imageHeight: 200,
  //      imageWidth: 100
  //     },
  //    ]
  //   },
  //   {
  //    type: "html",
  //    name: "question1_9",
  //    html: "<span style=\"font-weight:600;\">Which activity do you think "+(isIntel?"you were doing when the Smart Camera took the photo":"the Smart Camera wearer was doing")+"?</span> <br/><i style='font-size:smaller; font-weight:normal'> Hint: it is ONE of the following activities. <br/><span style=\"color:red\">Note: you must select <strong>at least one activity but not too many</strong> as NOT very unlikely. You might be disqualified from the HIT if you don’t pay enough attention. Please choose carefully. </span></i> "
  //   },
  //   {
  //    type: "matrix",
  //    name: "q"+imageOrder[index]+"-01",
  //    defaultValue: {
  //     "Walking Outdoors": "Very Unlikely<br/>1",
  //     Biking: "Very Unlikely<br/>1",
  //     Eating: "Very Unlikely<br/>1",
  //     "Public Transport": "Very Unlikely<br/>1",
  //     Shopping: "Very Unlikely<br/>1",
  //     "Talking and Socializing": "Very Unlikely<br/>1",
  //     "Watching TV": "Very Unlikely<br/>1",
  //     "Cleaning and chores": "Very Unlikely<br/>1",
  //     Cooking: "Very Unlikely<br/>1"
  //    },
  //    isRequired: true,
  //    validators: [
  //     {
  //      type: "expression",
  //      text: "Please select at least one activity as NOT very unlikely.",
  //      expression: "{q"+imageOrder[index]+"-01.Walking Outdoors} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Biking} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Public Transport} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Eating} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Shopping} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Talking and Socializing} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Watching TV} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Cleaning and chores} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Cooking} <> \"Very Unlikely<br/>1\""
  //     }
  //    ],
  //    titleLocation: "hidden",
  //    columns: [
  //     "Very Unlikely<br/>1",
  //     "2",
  //     "3",
  //     "Neither Unlikely <br/>nor Likely<br/>4",
  //     "5",
  //     "6",
  //     "Very Likely<br/>7"
  //    ],
  //    rows: [
  //     "Walking Outdoors",
  //     "Biking",
  //     "Public Transport",
  //     "Eating",
  //     "Shopping",
  //     "Talking and Socializing",
  //     "Watching TV",
  //     "Cleaning and chores",
  //     "Cooking"
  //    ],
  //   },
  //  ],
  //  visibleIf: "{question0_0} = true",
  // },
  // {
  //  name: "Task 3",
  //  elements: [
  //   {
  //    type: "html",
  //    name: "question1_1",
  //    html: "<h3 style=\"font-weight:500;\">Task 3 </h3>"
  //   },
  //   {
  //    type: "panel",
  //    name: "panel1_1",
  //    elements: [
  //     {
  //      type: "imagepicker",
  //      name: "question1_4",
  //      width: "330px",
  //      titleLocation: "hidden",
  //      choices: [
  //       {
  //        value: "item1",
  //        imageLink: "figures/img"+imgCond+"/"+imageOrder[index]+"_img.png"
  //       }
  //      ],
  //      imageFit: "fill",
  //      imageHeight: 200,
  //      imageWidth: 270,
  //     },
  //     {
  //      type: "imagepicker",
  //      name: "question1_5",
  //      width: "330px",
  //      startWithNewLine: false,
  //      titleLocation: "hidden",
  //      choices: [
  //       {
  //        value: "item1",
  //        imageLink: "figures/cam"+condIndex+"/"+imageOrder[index]+"_cam.png"
  //       }
  //      ],
  //      visible: withHeatmap,
  //      imageFit: "fill",
  //      imageHeight: 200,
  //      imageWidth: 270,
  //     },
  //     {
  //      type: "imagepicker",
  //      name: "question1_6",
  //      width: "130px",
  //      startWithNewLine: false,
  //      titleLocation: "hidden",
  //      choices: [
  //       {
  //        value: "legend",
  //        imageLink: "figures/common/jetLegend.png"
  //       }
  //      ],
  //      visible: withHeatmap,
  //      imageFit: "fill",
  //      imageHeight: 200,
  //      imageWidth: 100
  //     },
  //    ]
  //   },
  //   {
  //    type: "html",
  //    name: "question1_7",
  //    html: "<span style=\"font-weight:600;\">Your Previous Selection is:</span> "
  //   },
  //   {
  //    type: "matrix",
  //    name: "q"+imageOrder[index]+"-01",
  //    defaultValue: {
  //     "Walking Outdoors": "Very Unlikely<br/>1",
  //     Biking: "Very Unlikely<br/>1",
  //     Eating: "Very Unlikely<br/>1",
  //     "Public Transport": "Very Unlikely<br/>1",
  //     Shopping: "Very Unlikely<br/>1",
  //     "Talking and Socializing": "Very Unlikely<br/>1",
  //     "Watching TV": "Very Unlikely<br/>1",
  //     "Cleaning and chores": "Very Unlikely<br/>1",
  //     Cooking: "Very Unlikely<br/>1"
  //    },
  //    isRequired: true,
  //    validators: [
  //     {
  //      type: "expression",
  //      text: "Please select at least one activity as NOT very unlikely.",
  //      expression: "{q"+imageOrder[index]+"-01.Walking Outdoors} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Biking} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Public Transport} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Eating} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Shopping} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Talking and Socializing} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Watching TV} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Cleaning and chores} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Cooking} <> \"Very Unlikely<br/>1\""
  //     }
  //    ],
  //    titleLocation: "hidden",
  //    columns: [
  //     "Very Unlikely<br/>1",
  //     "2",
  //     "3",
  //     "Neither Unlikely <br/>nor Likely<br/>4",
  //     "5",
  //     "6",
  //     "Very Likely<br/>7"
  //    ],
  //    rows: [
  //     "Walking Outdoors",
  //     "Biking",
  //     "Public Transport",
  //     "Eating",
  //     "Shopping",
  //     "Talking and Socializing",
  //     "Watching TV",
  //     "Cleaning and chores",
  //     "Cooking"
  //    ],
  //   },
  //   {
  //    type: "panel",
  //    name: "panel1_2",
  //    elements: [
  //     {
  //      type: "text",
  //      name: "q"+imageOrder[index]+"-02",
  //      title: "Explain how you identified the activity.",
  //      isRequired: true,
  //     },
  //     {
  //      type: "matrixdropdown",
  //      name: "q"+imageOrder[index]+"-03",
  //      width: "21em",
  //      title: "Please indicate which parts of the image that <i><strong>you think</strong></i> are most important to identifying the activity. <br/><i style='font-size:smaller; font-weight:normal'>Please check the box(es) corresponding to each cell on the photo that you want to select. You may select more than one box.</i>",
  //      defaultValue: {
  //       "1": {
  //        A: false,
  //        B: false,
  //        C: false,
  //        D: false,
  //        E: false
  //       },
  //       "2": {
  //        A: false,
  //        B: false,
  //        C: false,
  //        D: false,
  //        E: false
  //       },
  //       "3": {
  //        A: false,
  //        B: false,
  //        C: false,
  //        D: false,
  //        E: false
  //       },
  //       "4": {
  //        A: false,
  //        B: false,
  //        C: false,
  //        D: false,
  //        E: false
  //       }
  //      },
  //      isRequired: true,
  //      validators: [
  //       {
  //        type: "expression",
  //        text: "Please select at least one cell.",
  //        expression: "{q"+imageOrder[index]+"-03.1.A} = true or {q"+imageOrder[index]+"-03.1.B} = true or {q"+imageOrder[index]+"-03.1.C} = true or {q"+imageOrder[index]+"-03.1.D} = true or {q"+imageOrder[index]+"-03.1.E} = true or {q"+imageOrder[index]+"-03.2.A} = true or {q"+imageOrder[index]+"-03.2.B} = true or {q"+imageOrder[index]+"-03.2.C} = true or {q"+imageOrder[index]+"-03.2.D} = true or {q"+imageOrder[index]+"-03.2.E} = true or {q"+imageOrder[index]+"-03.3.A} = true or {q"+imageOrder[index]+"-03.3.B} = true or {q"+imageOrder[index]+"-03.3.C} = true or {q"+imageOrder[index]+"-03.3.D} = true or {q"+imageOrder[index]+"-03.3.E} = true or {q"+imageOrder[index]+"-03.4.A} = true or {q"+imageOrder[index]+"-03.4.B} = true or {q"+imageOrder[index]+"-03.4.C} = true or {q"+imageOrder[index]+"-03.4.D} = true or {q"+imageOrder[index]+"-03.4.E} = true"
  //       }
  //      ],
  //      columns: [
  //       {
  //        name: "A"
  //       },
  //       {
  //        name: "B"
  //       },
  //       {
  //        name: "C"
  //       },
  //       {
  //        name: "D"
  //       },
  //       {
  //        name: "E"
  //       }
  //      ],
  //      horizontalScroll: true,
  //      cellType: "boolean",
  //      columnColCount: 4,
  //      rows: [
  //       "1",
  //       "2",
  //       "3",
  //       "4"
  //      ]
  //     },
  //     {
  //      type: "imagepicker",
  //      name: "question1_8",
  //      width: "400px",
  //      startWithNewLine: false,
  //      titleLocation: "hidden",
  //      choices: [
  //       {
  //        value: "item1",
  //        imageLink: "figures/img"+imgCond+"/"+imageOrder[index]+"_grid.png"
  //       }
  //      ],
  //      imageFit: "fill",
  //      imageHeight: 240,
  //      imageWidth: 330
  //     },
  //    ]
  //   },
  //   {
  //    type: "panel",
  //    name: "panel1_3",
  //    elements: [
  //     {
  //      type: "rating",
  //      name: "q"+imageOrder[index]+"-04",
  //      title: "It is easy to identify the wearer’s activity in the photo.",
  //      isRequired: true,
  //      rateMin: -3,
  //      rateMax: 3,
  //      minRateDescription: "Strongly disagree",
  //      maxRateDescription: "Strongly agree"
  //     },
  //     {
  //      type: "rating",
  //      name: "q"+imageOrder[index]+"-05",
  //      visible: withHeatmap,
  //      title: "The heatmap is helpful for me to identify the Smart Camera wearer’s activity.",
  //      isRequired: true,
  //      rateMin: -3,
  //      rateMax: 3,
  //      minRateDescription: "Strongly disagree",
  //      maxRateDescription: "Strongly agree"
  //     },
  //     {
  //      type: "rating",
  //      name: "q"+imageOrder[index]+"-06",
  //      visible: isIntel,
  //      title: "I do not mind viewing and storing my wearable camera images blurred as shown to protect the privacy of bystanders.",
  //      isRequired: true,
  //      rateMin: -3,
  //      rateMax: 3,
  //      minRateDescription: "Strongly disagree",
  //      maxRateDescription: "Strongly agree"
  //     },
  //     {
  //      type: "rating",
  //      name: "q"+imageOrder[index]+"-07",
  //      visible: isPrivacy,
  //      title: imageOrder[index]+"I am comfortable to be captured by someone else's wearable camera in a similar photo like the one shown.",
  //      isRequired: true,
  //      rateMin: -3,
  //      rateMax: 3,
  //      minRateDescription: "Strongly disagree",
  //      maxRateDescription: "Strongly agree"
  //     },
  //    ],
  //    title: "Do you agree or disagree with the following statements?"
  //   },
  //   {
  //    type: "text",
  //    name: "q"+imageOrder[index]+"-08",
  //    title: "Explain why you found it easy or difficult to identify the activity.",
  //    isRequired: true,
  //   },
  //   {
  //    type: "text",
  //    name: "q"+imageOrder[index]+"-09",
  //    visible: isIntel,
  //    title: "Explain why you are willing or not willing to blur your images to the level shown to protect the privacy of bystanders.",
  //    isRequired: true,
  //   },
  //   {
  //    type: "text",
  //    name: "q"+imageOrder[index]+"-10",
  //    visible: isPrivacy,
  //    title: "Explain why you are comfortable or not comfortable to be captured in a similar photo like the one shown.",
  //    isRequired: true,
  //   }  
  //  ],
  //  // visibleIf: withHeatmap?"{q0_1} = \"Bus\" \nand {q0_2} = \"Riding a bike\" \nand {q0_3.2.C} = true\nand {q0_3.2.D} = true \nand {q0_4.2.B} = true\nand {q0_4.3.B} = true":"{q0_1} = \"Bus\" \nand {q0_2} = \"Riding a bike\" \nand {q0_3.2.C} = true\nand {q0_3.2.D} = true",
  //  visibleIf: "{question0_0} = true",
  //  questionsOrder: "initial"
  // },
  // /* Task4 */
  // {
  //  name: "Task 4 Pre",
  //  elements: [
  //   {
  //    type: "html",
  //    name: "question1_1",
  //    html: "<h3 style=\"font-weight:500;\">Task 4 </h3>"
  //   },
  //   {
  //    type: "panel",
  //    name: "panel1_1",
  //    elements: [
  //     {
  //      type: "html",
  //      name: "question1_2",
  //      visible: isIntel,
  //      html: "<h4 style=\"font-weight:500;\">Imagine you have been wearing a wearable camera that takes photos automatically every 30 seconds. The following is one of the photos taken some time ago. </h4> "
  //     },
  //     {
  //      type: "html",
  //      name: "question1_3",
  //      visible: isPrivacy,
  //      html: "<h4 style=\"font-weight:500;\">Imagine you are somewhere and someone nearby is wearing a wearable camera that takes photos automatically every 30 seconds. The following is one of the photos taken. </h4> "
  //     },
  //     {
  //      type: "imagepicker",
  //      name: "question1_4",
  //      width: "330px",
  //      titleLocation: "hidden",
  //      choices: [
  //       {
  //        value: "item1",
  //        imageLink: "figures/img"+imgCond+"/"+imageOrder[++index]+"_img.png"
  //       }
  //      ],
  //      imageFit: "fill",
  //      imageHeight: 200,
  //      imageWidth: 270,
  //     },
  //     {
  //      type: "imagepicker",
  //      name: "question1_5",
  //      width: "330px",
  //      startWithNewLine: false,
  //      titleLocation: "hidden",
  //      choices: [
  //       {
  //        value: "item1",
  //        imageLink: "figures/cam"+condIndex+"/"+imageOrder[index]+"_cam.png"
  //       }
  //      ],
  //      visible: withHeatmap,
  //      imageFit: "fill",
  //      imageHeight: 200,
  //      imageWidth: 270,
  //     },
  //     {
  //      type: "imagepicker",
  //      name: "question1_6",
  //      width: "130px",
  //      startWithNewLine: false,
  //      titleLocation: "hidden",
  //      choices: [
  //       {
  //        value: "legend",
  //        imageLink: "figures/common/jetLegend.png"
  //       }
  //      ],
  //      visible: withHeatmap,
  //      imageFit: "fill",
  //      imageHeight: 200,
  //      imageWidth: 100
  //     },
  //    ]
  //   },
  //   {
  //    type: "html",
  //    name: "question1_9",
  //    html: "<span style=\"font-weight:600;\">Which activity do you think "+(isIntel?"you were doing when the Smart Camera took the photo":"the Smart Camera wearer was doing")+"?</span> <br/><i style='font-size:smaller; font-weight:normal'> Hint: it is ONE of the following activities. <br/><span style=\"color:red\">Note: you must select <strong>at least one activity but not too many</strong> as NOT very unlikely. You might be disqualified from the HIT if you don’t pay enough attention. Please choose carefully. </span></i> "
  //   },
  //   {
  //    type: "matrix",
  //    name: "q"+imageOrder[index]+"-01",
  //    defaultValue: {
  //     "Walking Outdoors": "Very Unlikely<br/>1",
  //     Biking: "Very Unlikely<br/>1",
  //     Eating: "Very Unlikely<br/>1",
  //     "Public Transport": "Very Unlikely<br/>1",
  //     Shopping: "Very Unlikely<br/>1",
  //     "Talking and Socializing": "Very Unlikely<br/>1",
  //     "Watching TV": "Very Unlikely<br/>1",
  //     "Cleaning and chores": "Very Unlikely<br/>1",
  //     Cooking: "Very Unlikely<br/>1"
  //    },
  //    isRequired: true,
  //    validators: [
  //     {
  //      type: "expression",
  //      text: "Please select at least one activity as NOT very unlikely.",
  //      expression: "{q"+imageOrder[index]+"-01.Walking Outdoors} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Biking} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Public Transport} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Eating} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Shopping} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Talking and Socializing} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Watching TV} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Cleaning and chores} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Cooking} <> \"Very Unlikely<br/>1\""
  //     }
  //    ],
  //    titleLocation: "hidden",
  //    columns: [
  //     "Very Unlikely<br/>1",
  //     "2",
  //     "3",
  //     "Neither Unlikely <br/>nor Likely<br/>4",
  //     "5",
  //     "6",
  //     "Very Likely<br/>7"
  //    ],
  //    rows: [
  //     "Walking Outdoors",
  //     "Biking",
  //     "Public Transport",
  //     "Eating",
  //     "Shopping",
  //     "Talking and Socializing",
  //     "Watching TV",
  //     "Cleaning and chores",
  //     "Cooking"
  //    ],
  //   },
  //  ],
  //  visibleIf: "{question0_0} = true",
  // },
  // {
  //  name: "Task 4",
  //  elements: [
  //   {
  //    type: "html",
  //    name: "question1_1",
  //    html: "<h3 style=\"font-weight:500;\">Task 4 </h3>"
  //   },
  //   {
  //    type: "panel",
  //    name: "panel1_1",
  //    elements: [
  //     {
  //      type: "imagepicker",
  //      name: "question1_4",
  //      width: "330px",
  //      titleLocation: "hidden",
  //      choices: [
  //       {
  //        value: "item1",
  //        imageLink: "figures/img"+imgCond+"/"+imageOrder[index]+"_img.png"
  //       }
  //      ],
  //      imageFit: "fill",
  //      imageHeight: 200,
  //      imageWidth: 270,
  //     },
  //     {
  //      type: "imagepicker",
  //      name: "question1_5",
  //      width: "330px",
  //      startWithNewLine: false,
  //      titleLocation: "hidden",
  //      choices: [
  //       {
  //        value: "item1",
  //        imageLink: "figures/cam"+condIndex+"/"+imageOrder[index]+"_cam.png"
  //       }
  //      ],
  //      visible: withHeatmap,
  //      imageFit: "fill",
  //      imageHeight: 200,
  //      imageWidth: 270,
  //     },
  //     {
  //      type: "imagepicker",
  //      name: "question1_6",
  //      width: "130px",
  //      startWithNewLine: false,
  //      titleLocation: "hidden",
  //      choices: [
  //       {
  //        value: "legend",
  //        imageLink: "figures/common/jetLegend.png"
  //       }
  //      ],
  //      visible: withHeatmap,
  //      imageFit: "fill",
  //      imageHeight: 200,
  //      imageWidth: 100
  //     },
  //    ]
  //   },
  //   {
  //    type: "html",
  //    name: "question1_7",
  //    html: "<span style=\"font-weight:600;\">Your Previous Selection is:</span> "
  //   },
  //   {
  //    type: "matrix",
  //    name: "q"+imageOrder[index]+"-01",
  //    defaultValue: {
  //     "Walking Outdoors": "Very Unlikely<br/>1",
  //     Biking: "Very Unlikely<br/>1",
  //     Eating: "Very Unlikely<br/>1",
  //     "Public Transport": "Very Unlikely<br/>1",
  //     Shopping: "Very Unlikely<br/>1",
  //     "Talking and Socializing": "Very Unlikely<br/>1",
  //     "Watching TV": "Very Unlikely<br/>1",
  //     "Cleaning and chores": "Very Unlikely<br/>1",
  //     Cooking: "Very Unlikely<br/>1"
  //    },
  //    isRequired: true,
  //    validators: [
  //     {
  //      type: "expression",
  //      text: "Please select at least one activity as NOT very unlikely.",
  //      expression: "{q"+imageOrder[index]+"-01.Walking Outdoors} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Biking} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Public Transport} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Eating} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Shopping} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Talking and Socializing} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Watching TV} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Cleaning and chores} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Cooking} <> \"Very Unlikely<br/>1\""
  //     }
  //    ],
  //    titleLocation: "hidden",
  //    columns: [
  //     "Very Unlikely<br/>1",
  //     "2",
  //     "3",
  //     "Neither Unlikely <br/>nor Likely<br/>4",
  //     "5",
  //     "6",
  //     "Very Likely<br/>7"
  //    ],
  //    rows: [
  //     "Walking Outdoors",
  //     "Biking",
  //     "Public Transport",
  //     "Eating",
  //     "Shopping",
  //     "Talking and Socializing",
  //     "Watching TV",
  //     "Cleaning and chores",
  //     "Cooking"
  //    ],
  //   },
  //   {
  //    type: "panel",
  //    name: "panel1_2",
  //    elements: [
  //     {
  //      type: "text",
  //      name: "q"+imageOrder[index]+"-02",
  //      title: "Explain how you identified the activity.",
  //      isRequired: true,
  //     },
  //     {
  //      type: "matrixdropdown",
  //      name: "q"+imageOrder[index]+"-03",
  //      width: "21em",
  //      title: "Please indicate which parts of the image that <i><strong>you think</strong></i> are most important to identifying the activity. <br/><i style='font-size:smaller; font-weight:normal'>Please check the box(es) corresponding to each cell on the photo that you want to select. You may select more than one box.</i>",
  //      defaultValue: {
  //       "1": {
  //        A: false,
  //        B: false,
  //        C: false,
  //        D: false,
  //        E: false
  //       },
  //       "2": {
  //        A: false,
  //        B: false,
  //        C: false,
  //        D: false,
  //        E: false
  //       },
  //       "3": {
  //        A: false,
  //        B: false,
  //        C: false,
  //        D: false,
  //        E: false
  //       },
  //       "4": {
  //        A: false,
  //        B: false,
  //        C: false,
  //        D: false,
  //        E: false
  //       }
  //      },
  //      isRequired: true,
  //      validators: [
  //       {
  //        type: "expression",
  //        text: "Please select at least one cell.",
  //        expression: "{q"+imageOrder[index]+"-03.1.A} = true or {q"+imageOrder[index]+"-03.1.B} = true or {q"+imageOrder[index]+"-03.1.C} = true or {q"+imageOrder[index]+"-03.1.D} = true or {q"+imageOrder[index]+"-03.1.E} = true or {q"+imageOrder[index]+"-03.2.A} = true or {q"+imageOrder[index]+"-03.2.B} = true or {q"+imageOrder[index]+"-03.2.C} = true or {q"+imageOrder[index]+"-03.2.D} = true or {q"+imageOrder[index]+"-03.2.E} = true or {q"+imageOrder[index]+"-03.3.A} = true or {q"+imageOrder[index]+"-03.3.B} = true or {q"+imageOrder[index]+"-03.3.C} = true or {q"+imageOrder[index]+"-03.3.D} = true or {q"+imageOrder[index]+"-03.3.E} = true or {q"+imageOrder[index]+"-03.4.A} = true or {q"+imageOrder[index]+"-03.4.B} = true or {q"+imageOrder[index]+"-03.4.C} = true or {q"+imageOrder[index]+"-03.4.D} = true or {q"+imageOrder[index]+"-03.4.E} = true"
  //       }
  //      ],
  //      columns: [
  //       {
  //        name: "A"
  //       },
  //       {
  //        name: "B"
  //       },
  //       {
  //        name: "C"
  //       },
  //       {
  //        name: "D"
  //       },
  //       {
  //        name: "E"
  //       }
  //      ],
  //      horizontalScroll: true,
  //      cellType: "boolean",
  //      columnColCount: 4,
  //      rows: [
  //       "1",
  //       "2",
  //       "3",
  //       "4"
  //      ]
  //     },
  //     {
  //      type: "imagepicker",
  //      name: "question1_8",
  //      width: "400px",
  //      startWithNewLine: false,
  //      titleLocation: "hidden",
  //      choices: [
  //       {
  //        value: "item1",
  //        imageLink: "figures/img"+imgCond+"/"+imageOrder[index]+"_grid.png"
  //       }
  //      ],
  //      imageFit: "fill",
  //      imageHeight: 240,
  //      imageWidth: 330
  //     },
  //    ]
  //   },
  //   {
  //    type: "panel",
  //    name: "panel1_3",
  //    elements: [
  //     {
  //      type: "rating",
  //      name: "q"+imageOrder[index]+"-04",
  //      title: "It is easy to identify the wearer’s activity in the photo.",
  //      isRequired: true,
  //      rateMin: -3,
  //      rateMax: 3,
  //      minRateDescription: "Strongly disagree",
  //      maxRateDescription: "Strongly agree"
  //     },
  //     {
  //      type: "rating",
  //      name: "q"+imageOrder[index]+"-05",
  //      visible: withHeatmap,
  //      title: "The heatmap is helpful for me to identify the Smart Camera wearer’s activity.",
  //      isRequired: true,
  //      rateMin: -3,
  //      rateMax: 3,
  //      minRateDescription: "Strongly disagree",
  //      maxRateDescription: "Strongly agree"
  //     },
  //     {
  //      type: "rating",
  //      name: "q"+imageOrder[index]+"-06",
  //      visible: isIntel,
  //      title: "I do not mind viewing and storing my wearable camera images blurred as shown to protect the privacy of bystanders.",
  //      isRequired: true,
  //      rateMin: -3,
  //      rateMax: 3,
  //      minRateDescription: "Strongly disagree",
  //      maxRateDescription: "Strongly agree"
  //     },
  //     {
  //      type: "rating",
  //      name: "q"+imageOrder[index]+"-07",
  //      visible: isPrivacy,
  //      title: imageOrder[index]+"I am comfortable to be captured by someone else's wearable camera in a similar photo like the one shown.",
  //      isRequired: true,
  //      rateMin: -3,
  //      rateMax: 3,
  //      minRateDescription: "Strongly disagree",
  //      maxRateDescription: "Strongly agree"
  //     },
  //    ],
  //    title: "Do you agree or disagree with the following statements?"
  //   },
  //   {
  //    type: "text",
  //    name: "q"+imageOrder[index]+"-08",
  //    title: "Explain why you found it easy or difficult to identify the activity.",
  //    isRequired: true,
  //   },
  //   {
  //    type: "text",
  //    name: "q"+imageOrder[index]+"-09",
  //    visible: isIntel,
  //    title: "Explain why you are willing or not willing to blur your images to the level shown to protect the privacy of bystanders.",
  //    isRequired: true,
  //   },
  //   {
  //    type: "text",
  //    name: "q"+imageOrder[index]+"-10",
  //    visible: isPrivacy,
  //    title: "Explain why you are comfortable or not comfortable to be captured in a similar photo like the one shown.",
  //    isRequired: true,
  //   }  
  //  ],
  //  // visibleIf: withHeatmap?"{q0_1} = \"Bus\" \nand {q0_2} = \"Riding a bike\" \nand {q0_3.2.C} = true\nand {q0_3.2.D} = true \nand {q0_4.2.B} = true\nand {q0_4.3.B} = true":"{q0_1} = \"Bus\" \nand {q0_2} = \"Riding a bike\" \nand {q0_3.2.C} = true\nand {q0_3.2.D} = true",
  //  visibleIf: "{question0_0} = true",
  //  questionsOrder: "initial"
  // },

  // /* Task5 */
  // {
  //  name: "Task 5 Pre",
  //  elements: [
  //   {
  //    type: "html",
  //    name: "question1_1",
  //    html: "<h3 style=\"font-weight:500;\">Task 5 </h3>"
  //   },
  //   {
  //    type: "panel",
  //    name: "panel1_1",
  //    elements: [
  //     {
  //      type: "html",
  //      name: "question1_2",
  //      visible: isIntel,
  //      html: "<h4 style=\"font-weight:500;\">Imagine you have been wearing a wearable camera that takes photos automatically every 30 seconds. The following is one of the photos taken some time ago. </h4> "
  //     },
  //     {
  //      type: "html",
  //      name: "question1_3",
  //      visible: isPrivacy,
  //      html: "<h4 style=\"font-weight:500;\">Imagine you are somewhere and someone nearby is wearing a wearable camera that takes photos automatically every 30 seconds. The following is one of the photos taken. </h4> "
  //     },
  //     {
  //      type: "imagepicker",
  //      name: "question1_4",
  //      width: "330px",
  //      titleLocation: "hidden",
  //      choices: [
  //       {
  //        value: "item1",
  //        imageLink: "figures/img"+imgCond+"/"+imageOrder[++index]+"_img.png"
  //       }
  //      ],
  //      imageFit: "fill",
  //      imageHeight: 200,
  //      imageWidth: 270,
  //     },
  //     {
  //      type: "imagepicker",
  //      name: "question1_5",
  //      width: "330px",
  //      startWithNewLine: false,
  //      titleLocation: "hidden",
  //      choices: [
  //       {
  //        value: "item1",
  //        imageLink: "figures/cam"+condIndex+"/"+imageOrder[index]+"_cam.png"
  //       }
  //      ],
  //      visible: withHeatmap,
  //      imageFit: "fill",
  //      imageHeight: 200,
  //      imageWidth: 270,
  //     },
  //     {
  //      type: "imagepicker",
  //      name: "question1_6",
  //      width: "130px",
  //      startWithNewLine: false,
  //      titleLocation: "hidden",
  //      choices: [
  //       {
  //        value: "legend",
  //        imageLink: "figures/common/jetLegend.png"
  //       }
  //      ],
  //      visible: withHeatmap,
  //      imageFit: "fill",
  //      imageHeight: 200,
  //      imageWidth: 100
  //     },
  //    ]
  //   },
  //   {
  //    type: "html",
  //    name: "question1_9",
  //    html: "<span style=\"font-weight:600;\">Which activity do you think "+(isIntel?"you were doing when the Smart Camera took the photo":"the Smart Camera wearer was doing")+"?</span> <br/><i style='font-size:smaller; font-weight:normal'> Hint: it is ONE of the following activities. <br/><span style=\"color:red\">Note: you must select <strong>at least one activity but not too many</strong> as NOT very unlikely. You might be disqualified from the HIT if you don’t pay enough attention. Please choose carefully. </span></i> "
  //   },
  //   {
  //    type: "matrix",
  //    name: "q"+imageOrder[index]+"-01",
  //    defaultValue: {
  //     "Walking Outdoors": "Very Unlikely<br/>1",
  //     Biking: "Very Unlikely<br/>1",
  //     Eating: "Very Unlikely<br/>1",
  //     "Public Transport": "Very Unlikely<br/>1",
  //     Shopping: "Very Unlikely<br/>1",
  //     "Talking and Socializing": "Very Unlikely<br/>1",
  //     "Watching TV": "Very Unlikely<br/>1",
  //     "Cleaning and chores": "Very Unlikely<br/>1",
  //     Cooking: "Very Unlikely<br/>1"
  //    },
  //    isRequired: true,
  //    validators: [
  //     {
  //      type: "expression",
  //      text: "Please select at least one activity as NOT very unlikely.",
  //      expression: "{q"+imageOrder[index]+"-01.Walking Outdoors} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Biking} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Public Transport} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Eating} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Shopping} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Talking and Socializing} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Watching TV} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Cleaning and chores} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Cooking} <> \"Very Unlikely<br/>1\""
  //     }
  //    ],
  //    titleLocation: "hidden",
  //    columns: [
  //     "Very Unlikely<br/>1",
  //     "2",
  //     "3",
  //     "Neither Unlikely <br/>nor Likely<br/>4",
  //     "5",
  //     "6",
  //     "Very Likely<br/>7"
  //    ],
  //    rows: [
  //     "Walking Outdoors",
  //     "Biking",
  //     "Public Transport",
  //     "Eating",
  //     "Shopping",
  //     "Talking and Socializing",
  //     "Watching TV",
  //     "Cleaning and chores",
  //     "Cooking"
  //    ],
  //   },
  //  ],
  //  visibleIf: "{question0_0} = true",
  // },
  // {
  //  name: "Task 5",
  //  elements: [
  //   {
  //    type: "html",
  //    name: "question1_1",
  //    html: "<h3 style=\"font-weight:500;\">Task 5 </h3>"
  //   },
  //   {
  //    type: "panel",
  //    name: "panel1_1",
  //    elements: [
  //     {
  //      type: "imagepicker",
  //      name: "question1_4",
  //      width: "330px",
  //      titleLocation: "hidden",
  //      choices: [
  //       {
  //        value: "item1",
  //        imageLink: "figures/img"+imgCond+"/"+imageOrder[index]+"_img.png"
  //       }
  //      ],
  //      imageFit: "fill",
  //      imageHeight: 200,
  //      imageWidth: 270,
  //     },
  //     {
  //      type: "imagepicker",
  //      name: "question1_5",
  //      width: "330px",
  //      startWithNewLine: false,
  //      titleLocation: "hidden",
  //      choices: [
  //       {
  //        value: "item1",
  //        imageLink: "figures/cam"+condIndex+"/"+imageOrder[index]+"_cam.png"
  //       }
  //      ],
  //      visible: withHeatmap,
  //      imageFit: "fill",
  //      imageHeight: 200,
  //      imageWidth: 270,
  //     },
  //     {
  //      type: "imagepicker",
  //      name: "question1_6",
  //      width: "130px",
  //      startWithNewLine: false,
  //      titleLocation: "hidden",
  //      choices: [
  //       {
  //        value: "legend",
  //        imageLink: "figures/common/jetLegend.png"
  //       }
  //      ],
  //      visible: withHeatmap,
  //      imageFit: "fill",
  //      imageHeight: 200,
  //      imageWidth: 100
  //     },
  //    ]
  //   },
  //   {
  //    type: "html",
  //    name: "question1_7",
  //    html: "<span style=\"font-weight:600;\">Your Previous Selection is:</span> "
  //   },
  //   {
  //    type: "matrix",
  //    name: "q"+imageOrder[index]+"-01",
  //    defaultValue: {
  //     "Walking Outdoors": "Very Unlikely<br/>1",
  //     Biking: "Very Unlikely<br/>1",
  //     Eating: "Very Unlikely<br/>1",
  //     "Public Transport": "Very Unlikely<br/>1",
  //     Shopping: "Very Unlikely<br/>1",
  //     "Talking and Socializing": "Very Unlikely<br/>1",
  //     "Watching TV": "Very Unlikely<br/>1",
  //     "Cleaning and chores": "Very Unlikely<br/>1",
  //     Cooking: "Very Unlikely<br/>1"
  //    },
  //    isRequired: true,
  //    validators: [
  //     {
  //      type: "expression",
  //      text: "Please select at least one activity as NOT very unlikely.",
  //      expression: "{q"+imageOrder[index]+"-01.Walking Outdoors} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Biking} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Public Transport} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Eating} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Shopping} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Talking and Socializing} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Watching TV} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Cleaning and chores} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Cooking} <> \"Very Unlikely<br/>1\""
  //     }
  //    ],
  //    titleLocation: "hidden",
  //    columns: [
  //     "Very Unlikely<br/>1",
  //     "2",
  //     "3",
  //     "Neither Unlikely <br/>nor Likely<br/>4",
  //     "5",
  //     "6",
  //     "Very Likely<br/>7"
  //    ],
  //    rows: [
  //     "Walking Outdoors",
  //     "Biking",
  //     "Public Transport",
  //     "Eating",
  //     "Shopping",
  //     "Talking and Socializing",
  //     "Watching TV",
  //     "Cleaning and chores",
  //     "Cooking"
  //    ],
  //   },
  //   {
  //    type: "panel",
  //    name: "panel1_2",
  //    elements: [
  //     {
  //      type: "text",
  //      name: "q"+imageOrder[index]+"-02",
  //      title: "Explain how you identified the activity.",
  //      isRequired: true,
  //     },
  //     {
  //      type: "matrixdropdown",
  //      name: "q"+imageOrder[index]+"-03",
  //      width: "21em",
  //      title: "Please indicate which parts of the image that <i><strong>you think</strong></i> are most important to identifying the activity. <br/><i style='font-size:smaller; font-weight:normal'>Please check the box(es) corresponding to each cell on the photo that you want to select. You may select more than one box.</i>",
  //      defaultValue: {
  //       "1": {
  //        A: false,
  //        B: false,
  //        C: false,
  //        D: false,
  //        E: false
  //       },
  //       "2": {
  //        A: false,
  //        B: false,
  //        C: false,
  //        D: false,
  //        E: false
  //       },
  //       "3": {
  //        A: false,
  //        B: false,
  //        C: false,
  //        D: false,
  //        E: false
  //       },
  //       "4": {
  //        A: false,
  //        B: false,
  //        C: false,
  //        D: false,
  //        E: false
  //       }
  //      },
  //      isRequired: true,
  //      validators: [
  //       {
  //        type: "expression",
  //        text: "Please select at least one cell.",
  //        expression: "{q"+imageOrder[index]+"-03.1.A} = true or {q"+imageOrder[index]+"-03.1.B} = true or {q"+imageOrder[index]+"-03.1.C} = true or {q"+imageOrder[index]+"-03.1.D} = true or {q"+imageOrder[index]+"-03.1.E} = true or {q"+imageOrder[index]+"-03.2.A} = true or {q"+imageOrder[index]+"-03.2.B} = true or {q"+imageOrder[index]+"-03.2.C} = true or {q"+imageOrder[index]+"-03.2.D} = true or {q"+imageOrder[index]+"-03.2.E} = true or {q"+imageOrder[index]+"-03.3.A} = true or {q"+imageOrder[index]+"-03.3.B} = true or {q"+imageOrder[index]+"-03.3.C} = true or {q"+imageOrder[index]+"-03.3.D} = true or {q"+imageOrder[index]+"-03.3.E} = true or {q"+imageOrder[index]+"-03.4.A} = true or {q"+imageOrder[index]+"-03.4.B} = true or {q"+imageOrder[index]+"-03.4.C} = true or {q"+imageOrder[index]+"-03.4.D} = true or {q"+imageOrder[index]+"-03.4.E} = true"
  //       }
  //      ],
  //      columns: [
  //       {
  //        name: "A"
  //       },
  //       {
  //        name: "B"
  //       },
  //       {
  //        name: "C"
  //       },
  //       {
  //        name: "D"
  //       },
  //       {
  //        name: "E"
  //       }
  //      ],
  //      horizontalScroll: true,
  //      cellType: "boolean",
  //      columnColCount: 4,
  //      rows: [
  //       "1",
  //       "2",
  //       "3",
  //       "4"
  //      ]
  //     },
  //     {
  //      type: "imagepicker",
  //      name: "question1_8",
  //      width: "400px",
  //      startWithNewLine: false,
  //      titleLocation: "hidden",
  //      choices: [
  //       {
  //        value: "item1",
  //        imageLink: "figures/img"+imgCond+"/"+imageOrder[index]+"_grid.png"
  //       }
  //      ],
  //      imageFit: "fill",
  //      imageHeight: 240,
  //      imageWidth: 330
  //     },
  //    ]
  //   },
  //   {
  //    type: "panel",
  //    name: "panel1_3",
  //    elements: [
  //     {
  //      type: "rating",
  //      name: "q"+imageOrder[index]+"-04",
  //      title: "It is easy to identify the wearer’s activity in the photo.",
  //      isRequired: true,
  //      rateMin: -3,
  //      rateMax: 3,
  //      minRateDescription: "Strongly disagree",
  //      maxRateDescription: "Strongly agree"
  //     },
  //     {
  //      type: "rating",
  //      name: "q"+imageOrder[index]+"-05",
  //      visible: withHeatmap,
  //      title: "The heatmap is helpful for me to identify the Smart Camera wearer’s activity.",
  //      isRequired: true,
  //      rateMin: -3,
  //      rateMax: 3,
  //      minRateDescription: "Strongly disagree",
  //      maxRateDescription: "Strongly agree"
  //     },
  //     {
  //      type: "rating",
  //      name: "q"+imageOrder[index]+"-06",
  //      visible: isIntel,
  //      title: "I do not mind viewing and storing my wearable camera images blurred as shown to protect the privacy of bystanders.",
  //      isRequired: true,
  //      rateMin: -3,
  //      rateMax: 3,
  //      minRateDescription: "Strongly disagree",
  //      maxRateDescription: "Strongly agree"
  //     },
  //     {
  //      type: "rating",
  //      name: "q"+imageOrder[index]+"-07",
  //      visible: isPrivacy,
  //      title: imageOrder[index]+"I am comfortable to be captured by someone else's wearable camera in a similar photo like the one shown.",
  //      isRequired: true,
  //      rateMin: -3,
  //      rateMax: 3,
  //      minRateDescription: "Strongly disagree",
  //      maxRateDescription: "Strongly agree"
  //     },
  //    ],
  //    title: "Do you agree or disagree with the following statements?"
  //   },
  //   {
  //    type: "text",
  //    name: "q"+imageOrder[index]+"-08",
  //    title: "Explain why you found it easy or difficult to identify the activity.",
  //    isRequired: true,
  //   },
  //   {
  //    type: "text",
  //    name: "q"+imageOrder[index]+"-09",
  //    visible: isIntel,
  //    title: "Explain why you are willing or not willing to blur your images to the level shown to protect the privacy of bystanders.",
  //    isRequired: true,
  //   },
  //   {
  //    type: "text",
  //    name: "q"+imageOrder[index]+"-10",
  //    visible: isPrivacy,
  //    title: "Explain why you are comfortable or not comfortable to be captured in a similar photo like the one shown.",
  //    isRequired: true,
  //   }  
  //  ],
  //  // visibleIf: withHeatmap?"{q0_1} = \"Bus\" \nand {q0_2} = \"Riding a bike\" \nand {q0_3.2.C} = true\nand {q0_3.2.D} = true \nand {q0_4.2.B} = true\nand {q0_4.3.B} = true":"{q0_1} = \"Bus\" \nand {q0_2} = \"Riding a bike\" \nand {q0_3.2.C} = true\nand {q0_3.2.D} = true",
  //  visibleIf: "{question0_0} = true",
  //  questionsOrder: "initial"
  // },
  // /* Task6 */
  // {
  //  name: "Task 6 Pre",
  //  elements: [
  //   {
  //    type: "html",
  //    name: "question1_1",
  //    html: "<h3 style=\"font-weight:500;\">Task 6 </h3>"
  //   },
  //   {
  //    type: "panel",
  //    name: "panel1_1",
  //    elements: [
  //     {
  //      type: "html",
  //      name: "question1_2",
  //      visible: isIntel,
  //      html: "<h4 style=\"font-weight:500;\">Imagine you have been wearing a wearable camera that takes photos automatically every 30 seconds. The following is one of the photos taken some time ago. </h4> "
  //     },
  //     {
  //      type: "html",
  //      name: "question1_3",
  //      visible: isPrivacy,
  //      html: "<h4 style=\"font-weight:500;\">Imagine you are somewhere and someone nearby is wearing a wearable camera that takes photos automatically every 30 seconds. The following is one of the photos taken. </h4> "
  //     },
  //     {
  //      type: "imagepicker",
  //      name: "question1_4",
  //      width: "330px",
  //      titleLocation: "hidden",
  //      choices: [
  //       {
  //        value: "item1",
  //        imageLink: "figures/img"+imgCond+"/"+imageOrder[++index]+"_img.png"
  //       }
  //      ],
  //      imageFit: "fill",
  //      imageHeight: 200,
  //      imageWidth: 270,
  //     },
  //     {
  //      type: "imagepicker",
  //      name: "question1_5",
  //      width: "330px",
  //      startWithNewLine: false,
  //      titleLocation: "hidden",
  //      choices: [
  //       {
  //        value: "item1",
  //        imageLink: "figures/cam"+condIndex+"/"+imageOrder[index]+"_cam.png"
  //       }
  //      ],
  //      visible: withHeatmap,
  //      imageFit: "fill",
  //      imageHeight: 200,
  //      imageWidth: 270,
  //     },
  //     {
  //      type: "imagepicker",
  //      name: "question1_6",
  //      width: "130px",
  //      startWithNewLine: false,
  //      titleLocation: "hidden",
  //      choices: [
  //       {
  //        value: "legend",
  //        imageLink: "figures/common/jetLegend.png"
  //       }
  //      ],
  //      visible: withHeatmap,
  //      imageFit: "fill",
  //      imageHeight: 200,
  //      imageWidth: 100
  //     },
  //    ]
  //   },
  //   {
  //    type: "html",
  //    name: "question1_9",
  //    html: "<span style=\"font-weight:600;\">Which activity do you think "+(isIntel?"you were doing when the Smart Camera took the photo":"the Smart Camera wearer was doing")+"?</span> <br/><i style='font-size:smaller; font-weight:normal'> Hint: it is ONE of the following activities. <br/><span style=\"color:red\">Note: you must select <strong>at least one activity but not too many</strong> as NOT very unlikely. You might be disqualified from the HIT if you don’t pay enough attention. Please choose carefully. </span></i> "
  //   },
  //   {
  //    type: "matrix",
  //    name: "q"+imageOrder[index]+"-01",
  //    defaultValue: {
  //     "Walking Outdoors": "Very Unlikely<br/>1",
  //     Biking: "Very Unlikely<br/>1",
  //     Eating: "Very Unlikely<br/>1",
  //     "Public Transport": "Very Unlikely<br/>1",
  //     Shopping: "Very Unlikely<br/>1",
  //     "Talking and Socializing": "Very Unlikely<br/>1",
  //     "Watching TV": "Very Unlikely<br/>1",
  //     "Cleaning and chores": "Very Unlikely<br/>1",
  //     Cooking: "Very Unlikely<br/>1"
  //    },
  //    isRequired: true,
  //    validators: [
  //     {
  //      type: "expression",
  //      text: "Please select at least one activity as NOT very unlikely.",
  //      expression: "{q"+imageOrder[index]+"-01.Walking Outdoors} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Biking} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Public Transport} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Eating} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Shopping} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Talking and Socializing} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Watching TV} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Cleaning and chores} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Cooking} <> \"Very Unlikely<br/>1\""
  //     }
  //    ],
  //    titleLocation: "hidden",
  //    columns: [
  //     "Very Unlikely<br/>1",
  //     "2",
  //     "3",
  //     "Neither Unlikely <br/>nor Likely<br/>4",
  //     "5",
  //     "6",
  //     "Very Likely<br/>7"
  //    ],
  //    rows: [
  //     "Walking Outdoors",
  //     "Biking",
  //     "Public Transport",
  //     "Eating",
  //     "Shopping",
  //     "Talking and Socializing",
  //     "Watching TV",
  //     "Cleaning and chores",
  //     "Cooking"
  //    ],
  //   },
  //  ],
  //  visibleIf: "{question0_0} = true",
  // },
  // {
  //  name: "Task 6",
  //  elements: [
  //   {
  //    type: "html",
  //    name: "question1_1",
  //    html: "<h3 style=\"font-weight:500;\">Task 6 </h3>"
  //   },
  //   {
  //    type: "panel",
  //    name: "panel1_1",
  //    elements: [
  //     {
  //      type: "imagepicker",
  //      name: "question1_4",
  //      width: "330px",
  //      titleLocation: "hidden",
  //      choices: [
  //       {
  //        value: "item1",
  //        imageLink: "figures/img"+imgCond+"/"+imageOrder[index]+"_img.png"
  //       }
  //      ],
  //      imageFit: "fill",
  //      imageHeight: 200,
  //      imageWidth: 270,
  //     },
  //     {
  //      type: "imagepicker",
  //      name: "question1_5",
  //      width: "330px",
  //      startWithNewLine: false,
  //      titleLocation: "hidden",
  //      choices: [
  //       {
  //        value: "item1",
  //        imageLink: "figures/cam"+condIndex+"/"+imageOrder[index]+"_cam.png"
  //       }
  //      ],
  //      visible: withHeatmap,
  //      imageFit: "fill",
  //      imageHeight: 200,
  //      imageWidth: 270,
  //     },
  //     {
  //      type: "imagepicker",
  //      name: "question1_6",
  //      width: "130px",
  //      startWithNewLine: false,
  //      titleLocation: "hidden",
  //      choices: [
  //       {
  //        value: "legend",
  //        imageLink: "figures/common/jetLegend.png"
  //       }
  //      ],
  //      visible: withHeatmap,
  //      imageFit: "fill",
  //      imageHeight: 200,
  //      imageWidth: 100
  //     },
  //    ]
  //   },
  //   {
  //    type: "html",
  //    name: "question1_7",
  //    html: "<span style=\"font-weight:600;\">Your Previous Selection is:</span> "
  //   },
  //   {
  //    type: "matrix",
  //    name: "q"+imageOrder[index]+"-01",
  //    defaultValue: {
  //     "Walking Outdoors": "Very Unlikely<br/>1",
  //     Biking: "Very Unlikely<br/>1",
  //     Eating: "Very Unlikely<br/>1",
  //     "Public Transport": "Very Unlikely<br/>1",
  //     Shopping: "Very Unlikely<br/>1",
  //     "Talking and Socializing": "Very Unlikely<br/>1",
  //     "Watching TV": "Very Unlikely<br/>1",
  //     "Cleaning and chores": "Very Unlikely<br/>1",
  //     Cooking: "Very Unlikely<br/>1"
  //    },
  //    isRequired: true,
  //    validators: [
  //     {
  //      type: "expression",
  //      text: "Please select at least one activity as NOT very unlikely.",
  //      expression: "{q"+imageOrder[index]+"-01.Walking Outdoors} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Biking} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Public Transport} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Eating} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Shopping} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Talking and Socializing} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Watching TV} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Cleaning and chores} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Cooking} <> \"Very Unlikely<br/>1\""
  //     }
  //    ],
  //    titleLocation: "hidden",
  //    columns: [
  //     "Very Unlikely<br/>1",
  //     "2",
  //     "3",
  //     "Neither Unlikely <br/>nor Likely<br/>4",
  //     "5",
  //     "6",
  //     "Very Likely<br/>7"
  //    ],
  //    rows: [
  //     "Walking Outdoors",
  //     "Biking",
  //     "Public Transport",
  //     "Eating",
  //     "Shopping",
  //     "Talking and Socializing",
  //     "Watching TV",
  //     "Cleaning and chores",
  //     "Cooking"
  //    ],
  //   },
  //   {
  //    type: "panel",
  //    name: "panel1_2",
  //    elements: [
  //     {
  //      type: "text",
  //      name: "q"+imageOrder[index]+"-02",
  //      title: "Explain how you identified the activity.",
  //      isRequired: true,
  //     },
  //     {
  //      type: "matrixdropdown",
  //      name: "q"+imageOrder[index]+"-03",
  //      width: "21em",
  //      title: "Please indicate which parts of the image that <i><strong>you think</strong></i> are most important to identifying the activity. <br/><i style='font-size:smaller; font-weight:normal'>Please check the box(es) corresponding to each cell on the photo that you want to select. You may select more than one box.</i>",
  //      defaultValue: {
  //       "1": {
  //        A: false,
  //        B: false,
  //        C: false,
  //        D: false,
  //        E: false
  //       },
  //       "2": {
  //        A: false,
  //        B: false,
  //        C: false,
  //        D: false,
  //        E: false
  //       },
  //       "3": {
  //        A: false,
  //        B: false,
  //        C: false,
  //        D: false,
  //        E: false
  //       },
  //       "4": {
  //        A: false,
  //        B: false,
  //        C: false,
  //        D: false,
  //        E: false
  //       }
  //      },
  //      isRequired: true,
  //      validators: [
  //       {
  //        type: "expression",
  //        text: "Please select at least one cell.",
  //        expression: "{q"+imageOrder[index]+"-03.1.A} = true or {q"+imageOrder[index]+"-03.1.B} = true or {q"+imageOrder[index]+"-03.1.C} = true or {q"+imageOrder[index]+"-03.1.D} = true or {q"+imageOrder[index]+"-03.1.E} = true or {q"+imageOrder[index]+"-03.2.A} = true or {q"+imageOrder[index]+"-03.2.B} = true or {q"+imageOrder[index]+"-03.2.C} = true or {q"+imageOrder[index]+"-03.2.D} = true or {q"+imageOrder[index]+"-03.2.E} = true or {q"+imageOrder[index]+"-03.3.A} = true or {q"+imageOrder[index]+"-03.3.B} = true or {q"+imageOrder[index]+"-03.3.C} = true or {q"+imageOrder[index]+"-03.3.D} = true or {q"+imageOrder[index]+"-03.3.E} = true or {q"+imageOrder[index]+"-03.4.A} = true or {q"+imageOrder[index]+"-03.4.B} = true or {q"+imageOrder[index]+"-03.4.C} = true or {q"+imageOrder[index]+"-03.4.D} = true or {q"+imageOrder[index]+"-03.4.E} = true"
  //       }
  //      ],
  //      columns: [
  //       {
  //        name: "A"
  //       },
  //       {
  //        name: "B"
  //       },
  //       {
  //        name: "C"
  //       },
  //       {
  //        name: "D"
  //       },
  //       {
  //        name: "E"
  //       }
  //      ],
  //      horizontalScroll: true,
  //      cellType: "boolean",
  //      columnColCount: 4,
  //      rows: [
  //       "1",
  //       "2",
  //       "3",
  //       "4"
  //      ]
  //     },
  //     {
  //      type: "imagepicker",
  //      name: "question1_8",
  //      width: "400px",
  //      startWithNewLine: false,
  //      titleLocation: "hidden",
  //      choices: [
  //       {
  //        value: "item1",
  //        imageLink: "figures/img"+imgCond+"/"+imageOrder[index]+"_grid.png"
  //       }
  //      ],
  //      imageFit: "fill",
  //      imageHeight: 240,
  //      imageWidth: 330
  //     },
  //    ]
  //   },
  //   {
  //    type: "panel",
  //    name: "panel1_3",
  //    elements: [
  //     {
  //      type: "rating",
  //      name: "q"+imageOrder[index]+"-04",
  //      title: "It is easy to identify the wearer’s activity in the photo.",
  //      isRequired: true,
  //      rateMin: -3,
  //      rateMax: 3,
  //      minRateDescription: "Strongly disagree",
  //      maxRateDescription: "Strongly agree"
  //     },
  //     {
  //      type: "rating",
  //      name: "q"+imageOrder[index]+"-05",
  //      visible: withHeatmap,
  //      title: "The heatmap is helpful for me to identify the Smart Camera wearer’s activity.",
  //      isRequired: true,
  //      rateMin: -3,
  //      rateMax: 3,
  //      minRateDescription: "Strongly disagree",
  //      maxRateDescription: "Strongly agree"
  //     },
  //     {
  //      type: "rating",
  //      name: "q"+imageOrder[index]+"-06",
  //      visible: isIntel,
  //      title: "I do not mind viewing and storing my wearable camera images blurred as shown to protect the privacy of bystanders.",
  //      isRequired: true,
  //      rateMin: -3,
  //      rateMax: 3,
  //      minRateDescription: "Strongly disagree",
  //      maxRateDescription: "Strongly agree"
  //     },
  //     {
  //      type: "rating",
  //      name: "q"+imageOrder[index]+"-07",
  //      visible: isPrivacy,
  //      title: imageOrder[index]+"I am comfortable to be captured by someone else's wearable camera in a similar photo like the one shown.",
  //      isRequired: true,
  //      rateMin: -3,
  //      rateMax: 3,
  //      minRateDescription: "Strongly disagree",
  //      maxRateDescription: "Strongly agree"
  //     },
  //    ],
  //    title: "Do you agree or disagree with the following statements?"
  //   },
  //   {
  //    type: "text",
  //    name: "q"+imageOrder[index]+"-08",
  //    title: "Explain why you found it easy or difficult to identify the activity.",
  //    isRequired: true,
  //   },
  //   {
  //    type: "text",
  //    name: "q"+imageOrder[index]+"-09",
  //    visible: isIntel,
  //    title: "Explain why you are willing or not willing to blur your images to the level shown to protect the privacy of bystanders.",
  //    isRequired: true,
  //   },
  //   {
  //    type: "text",
  //    name: "q"+imageOrder[index]+"-10",
  //    visible: isPrivacy,
  //    title: "Explain why you are comfortable or not comfortable to be captured in a similar photo like the one shown.",
  //    isRequired: true,
  //   }  
  //  ],
  //  // visibleIf: withHeatmap?"{q0_1} = \"Bus\" \nand {q0_2} = \"Riding a bike\" \nand {q0_3.2.C} = true\nand {q0_3.2.D} = true \nand {q0_4.2.B} = true\nand {q0_4.3.B} = true":"{q0_1} = \"Bus\" \nand {q0_2} = \"Riding a bike\" \nand {q0_3.2.C} = true\nand {q0_3.2.D} = true",
  //  visibleIf: "{question0_0} = true",
  //  questionsOrder: "initial"
  // },
  // /* Task7 */
  // {
  //  name: "Task 7 Pre",
  //  elements: [
  //   {
  //    type: "html",
  //    name: "question1_1",
  //    html: "<h3 style=\"font-weight:500;\">Task 7 </h3>"
  //   },
  //   {
  //    type: "panel",
  //    name: "panel1_1",
  //    elements: [
  //     {
  //      type: "html",
  //      name: "question1_2",
  //      visible: isIntel,
  //      html: "<h4 style=\"font-weight:500;\">Imagine you have been wearing a wearable camera that takes photos automatically every 30 seconds. The following is one of the photos taken some time ago. </h4> "
  //     },
  //     {
  //      type: "html",
  //      name: "question1_3",
  //      visible: isPrivacy,
  //      html: "<h4 style=\"font-weight:500;\">Imagine you are somewhere and someone nearby is wearing a wearable camera that takes photos automatically every 30 seconds. The following is one of the photos taken. </h4> "
  //     },
  //     {
  //      type: "imagepicker",
  //      name: "question1_4",
  //      width: "330px",
  //      titleLocation: "hidden",
  //      choices: [
  //       {
  //        value: "item1",
  //        imageLink: "figures/img"+imgCond+"/"+imageOrder[++index]+"_img.png"
  //       }
  //      ],
  //      imageFit: "fill",
  //      imageHeight: 200,
  //      imageWidth: 270,
  //     },
  //     {
  //      type: "imagepicker",
  //      name: "question1_5",
  //      width: "330px",
  //      startWithNewLine: false,
  //      titleLocation: "hidden",
  //      choices: [
  //       {
  //        value: "item1",
  //        imageLink: "figures/cam"+condIndex+"/"+imageOrder[index]+"_cam.png"
  //       }
  //      ],
  //      visible: withHeatmap,
  //      imageFit: "fill",
  //      imageHeight: 200,
  //      imageWidth: 270,
  //     },
  //     {
  //      type: "imagepicker",
  //      name: "question1_6",
  //      width: "130px",
  //      startWithNewLine: false,
  //      titleLocation: "hidden",
  //      choices: [
  //       {
  //        value: "legend",
  //        imageLink: "figures/common/jetLegend.png"
  //       }
  //      ],
  //      visible: withHeatmap,
  //      imageFit: "fill",
  //      imageHeight: 200,
  //      imageWidth: 100
  //     },
  //    ],
  //    visibleIf: "{question0_0} = true",
  //   },
  //   {
  //    type: "html",
  //    name: "question1_9",
  //    html: "<span style=\"font-weight:600;\">Which activity do you think "+(isIntel?"you were doing when the Smart Camera took the photo":"the Smart Camera wearer was doing")+"?</span> <br/><i style='font-size:smaller; font-weight:normal'> Hint: it is ONE of the following activities. <br/><span style=\"color:red\">Note: you must select <strong>at least one activity but not too many</strong> as NOT very unlikely. You might be disqualified from the HIT if you don’t pay enough attention. Please choose carefully. </span></i> "
  //   },
  //   {
  //    type: "matrix",
  //    name: "q"+imageOrder[index]+"-01",
  //    defaultValue: {
  //     "Walking Outdoors": "Very Unlikely<br/>1",
  //     Biking: "Very Unlikely<br/>1",
  //     Eating: "Very Unlikely<br/>1",
  //     "Public Transport": "Very Unlikely<br/>1",
  //     Shopping: "Very Unlikely<br/>1",
  //     "Talking and Socializing": "Very Unlikely<br/>1",
  //     "Watching TV": "Very Unlikely<br/>1",
  //     "Cleaning and chores": "Very Unlikely<br/>1",
  //     Cooking: "Very Unlikely<br/>1"
  //    },
  //    isRequired: true,
  //    validators: [
  //     {
  //      type: "expression",
  //      text: "Please select at least one activity as NOT very unlikely.",
  //      expression: "{q"+imageOrder[index]+"-01.Walking Outdoors} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Biking} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Public Transport} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Eating} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Shopping} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Talking and Socializing} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Watching TV} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Cleaning and chores} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Cooking} <> \"Very Unlikely<br/>1\""
  //     }
  //    ],
  //    titleLocation: "hidden",
  //    columns: [
  //     "Very Unlikely<br/>1",
  //     "2",
  //     "3",
  //     "Neither Unlikely <br/>nor Likely<br/>4",
  //     "5",
  //     "6",
  //     "Very Likely<br/>7"
  //    ],
  //    rows: [
  //     "Walking Outdoors",
  //     "Biking",
  //     "Public Transport",
  //     "Eating",
  //     "Shopping",
  //     "Talking and Socializing",
  //     "Watching TV",
  //     "Cleaning and chores",
  //     "Cooking"
  //    ],
  //   },
  //  ],
  //  visibleIf: "{question0_0} = true",
  // },
  // {
  //  name: "Task 7",
  //  elements: [
  //   {
  //    type: "html",
  //    name: "question1_1",
  //    html: "<h3 style=\"font-weight:500;\">Task 7 </h3>"
  //   },
  //   {
  //    type: "panel",
  //    name: "panel1_1",
  //    elements: [
  //     {
  //      type: "imagepicker",
  //      name: "question1_4",
  //      width: "330px",
  //      titleLocation: "hidden",
  //      choices: [
  //       {
  //        value: "item1",
  //        imageLink: "figures/img"+imgCond+"/"+imageOrder[index]+"_img.png"
  //       }
  //      ],
  //      imageFit: "fill",
  //      imageHeight: 200,
  //      imageWidth: 270,
  //     },
  //     {
  //      type: "imagepicker",
  //      name: "question1_5",
  //      width: "330px",
  //      startWithNewLine: false,
  //      titleLocation: "hidden",
  //      choices: [
  //       {
  //        value: "item1",
  //        imageLink: "figures/cam"+condIndex+"/"+imageOrder[index]+"_cam.png"
  //       }
  //      ],
  //      visible: withHeatmap,
  //      imageFit: "fill",
  //      imageHeight: 200,
  //      imageWidth: 270,
  //     },
  //     {
  //      type: "imagepicker",
  //      name: "question1_6",
  //      width: "130px",
  //      startWithNewLine: false,
  //      titleLocation: "hidden",
  //      choices: [
  //       {
  //        value: "legend",
  //        imageLink: "figures/common/jetLegend.png"
  //       }
  //      ],
  //      visible: withHeatmap,
  //      imageFit: "fill",
  //      imageHeight: 200,
  //      imageWidth: 100
  //     },
  //    ]
  //   },
  //   {
  //    type: "html",
  //    name: "question1_7",
  //    html: "<span style=\"font-weight:600;\">Your Previous Selection is:</span> "
  //   },
  //   {
  //    type: "matrix",
  //    name: "q"+imageOrder[index]+"-01",
  //    defaultValue: {
  //     "Walking Outdoors": "Very Unlikely<br/>1",
  //     Biking: "Very Unlikely<br/>1",
  //     Eating: "Very Unlikely<br/>1",
  //     "Public Transport": "Very Unlikely<br/>1",
  //     Shopping: "Very Unlikely<br/>1",
  //     "Talking and Socializing": "Very Unlikely<br/>1",
  //     "Watching TV": "Very Unlikely<br/>1",
  //     "Cleaning and chores": "Very Unlikely<br/>1",
  //     Cooking: "Very Unlikely<br/>1"
  //    },
  //    isRequired: true,
  //    validators: [
  //     {
  //      type: "expression",
  //      text: "Please select at least one activity as NOT very unlikely.",
  //      expression: "{q"+imageOrder[index]+"-01.Walking Outdoors} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Biking} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Public Transport} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Eating} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Shopping} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Talking and Socializing} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Watching TV} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Cleaning and chores} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Cooking} <> \"Very Unlikely<br/>1\""
  //     }
  //    ],
  //    titleLocation: "hidden",
  //    columns: [
  //     "Very Unlikely<br/>1",
  //     "2",
  //     "3",
  //     "Neither Unlikely <br/>nor Likely<br/>4",
  //     "5",
  //     "6",
  //     "Very Likely<br/>7"
  //    ],
  //    rows: [
  //     "Walking Outdoors",
  //     "Biking",
  //     "Public Transport",
  //     "Eating",
  //     "Shopping",
  //     "Talking and Socializing",
  //     "Watching TV",
  //     "Cleaning and chores",
  //     "Cooking"
  //    ],
  //   },
  //   {
  //    type: "panel",
  //    name: "panel1_2",
  //    elements: [
  //     {
  //      type: "text",
  //      name: "q"+imageOrder[index]+"-02",
  //      title: "Explain how you identified the activity.",
  //      isRequired: true,
  //     },
  //     {
  //      type: "matrixdropdown",
  //      name: "q"+imageOrder[index]+"-03",
  //      width: "21em",
  //      title: "Please indicate which parts of the image that <i><strong>you think</strong></i> are most important to identifying the activity. <br/><i style='font-size:smaller; font-weight:normal'>Please check the box(es) corresponding to each cell on the photo that you want to select. You may select more than one box.</i>",
  //      defaultValue: {
  //       "1": {
  //        A: false,
  //        B: false,
  //        C: false,
  //        D: false,
  //        E: false
  //       },
  //       "2": {
  //        A: false,
  //        B: false,
  //        C: false,
  //        D: false,
  //        E: false
  //       },
  //       "3": {
  //        A: false,
  //        B: false,
  //        C: false,
  //        D: false,
  //        E: false
  //       },
  //       "4": {
  //        A: false,
  //        B: false,
  //        C: false,
  //        D: false,
  //        E: false
  //       }
  //      },
  //      isRequired: true,
  //      validators: [
  //       {
  //        type: "expression",
  //        text: "Please select at least one cell.",
  //        expression: "{q"+imageOrder[index]+"-03.1.A} = true or {q"+imageOrder[index]+"-03.1.B} = true or {q"+imageOrder[index]+"-03.1.C} = true or {q"+imageOrder[index]+"-03.1.D} = true or {q"+imageOrder[index]+"-03.1.E} = true or {q"+imageOrder[index]+"-03.2.A} = true or {q"+imageOrder[index]+"-03.2.B} = true or {q"+imageOrder[index]+"-03.2.C} = true or {q"+imageOrder[index]+"-03.2.D} = true or {q"+imageOrder[index]+"-03.2.E} = true or {q"+imageOrder[index]+"-03.3.A} = true or {q"+imageOrder[index]+"-03.3.B} = true or {q"+imageOrder[index]+"-03.3.C} = true or {q"+imageOrder[index]+"-03.3.D} = true or {q"+imageOrder[index]+"-03.3.E} = true or {q"+imageOrder[index]+"-03.4.A} = true or {q"+imageOrder[index]+"-03.4.B} = true or {q"+imageOrder[index]+"-03.4.C} = true or {q"+imageOrder[index]+"-03.4.D} = true or {q"+imageOrder[index]+"-03.4.E} = true"
  //       }
  //      ],
  //      columns: [
  //       {
  //        name: "A"
  //       },
  //       {
  //        name: "B"
  //       },
  //       {
  //        name: "C"
  //       },
  //       {
  //        name: "D"
  //       },
  //       {
  //        name: "E"
  //       }
  //      ],
  //      horizontalScroll: true,
  //      cellType: "boolean",
  //      columnColCount: 4,
  //      rows: [
  //       "1",
  //       "2",
  //       "3",
  //       "4"
  //      ]
  //     },
  //     {
  //      type: "imagepicker",
  //      name: "question1_8",
  //      width: "400px",
  //      startWithNewLine: false,
  //      titleLocation: "hidden",
  //      choices: [
  //       {
  //        value: "item1",
  //        imageLink: "figures/img"+imgCond+"/"+imageOrder[index]+"_grid.png"
  //       }
  //      ],
  //      imageFit: "fill",
  //      imageHeight: 240,
  //      imageWidth: 330
  //     },
  //    ]
  //   },
  //   {
  //    type: "panel",
  //    name: "panel1_3",
  //    elements: [
  //     {
  //      type: "rating",
  //      name: "q"+imageOrder[index]+"-04",
  //      title: "It is easy to identify the wearer’s activity in the photo.",
  //      isRequired: true,
  //      rateMin: -3,
  //      rateMax: 3,
  //      minRateDescription: "Strongly disagree",
  //      maxRateDescription: "Strongly agree"
  //     },
  //     {
  //      type: "rating",
  //      name: "q"+imageOrder[index]+"-05",
  //      visible: withHeatmap,
  //      title: "The heatmap is helpful for me to identify the Smart Camera wearer’s activity.",
  //      isRequired: true,
  //      rateMin: -3,
  //      rateMax: 3,
  //      minRateDescription: "Strongly disagree",
  //      maxRateDescription: "Strongly agree"
  //     },
  //     {
  //      type: "rating",
  //      name: "q"+imageOrder[index]+"-06",
  //      visible: isIntel,
  //      title: "I do not mind viewing and storing my wearable camera images blurred as shown to protect the privacy of bystanders.",
  //      isRequired: true,
  //      rateMin: -3,
  //      rateMax: 3,
  //      minRateDescription: "Strongly disagree",
  //      maxRateDescription: "Strongly agree"
  //     },
  //     {
  //      type: "rating",
  //      name: "q"+imageOrder[index]+"-07",
  //      visible: isPrivacy,
  //      title: imageOrder[index]+"I am comfortable to be captured by someone else's wearable camera in a similar photo like the one shown.",
  //      isRequired: true,
  //      rateMin: -3,
  //      rateMax: 3,
  //      minRateDescription: "Strongly disagree",
  //      maxRateDescription: "Strongly agree"
  //     },
  //    ],
  //    title: "Do you agree or disagree with the following statements?"
  //   },
  //   {
  //    type: "text",
  //    name: "q"+imageOrder[index]+"-08",
  //    title: "Explain why you found it easy or difficult to identify the activity.",
  //    isRequired: true,
  //   },
  //   {
  //    type: "text",
  //    name: "q"+imageOrder[index]+"-09",
  //    visible: isIntel,
  //    title: "Explain why you are willing or not willing to blur your images to the level shown to protect the privacy of bystanders.",
  //    isRequired: true,
  //   },
  //   {
  //    type: "text",
  //    name: "q"+imageOrder[index]+"-10",
  //    visible: isPrivacy,
  //    title: "Explain why you are comfortable or not comfortable to be captured in a similar photo like the one shown.",
  //    isRequired: true,
  //   }  
  //  ],
  //  // visibleIf: withHeatmap?"{q0_1} = \"Bus\" \nand {q0_2} = \"Riding a bike\" \nand {q0_3.2.C} = true\nand {q0_3.2.D} = true \nand {q0_4.2.B} = true\nand {q0_4.3.B} = true":"{q0_1} = \"Bus\" \nand {q0_2} = \"Riding a bike\" \nand {q0_3.2.C} = true\nand {q0_3.2.D} = true",
  //  visibleIf: "{question0_0} = true",
  //  questionsOrder: "initial"
  // },
  // /* Task8 */
  // {
  //  name: "Task 8 Pre",
  //  elements: [
  //   {
  //    type: "html",
  //    name: "question1_1",
  //    html: "<h3 style=\"font-weight:500;\">Task 8 </h3>"
  //   },
  //   {
  //    type: "panel",
  //    name: "panel1_1",
  //    elements: [
  //     {
  //      type: "html",
  //      name: "question1_2",
  //      visible: isIntel,
  //      html: "<h4 style=\"font-weight:500;\">Imagine you have been wearing a wearable camera that takes photos automatically every 30 seconds. The following is one of the photos taken some time ago. </h4> "
  //     },
  //     {
  //      type: "html",
  //      name: "question1_3",
  //      visible: isPrivacy,
  //      html: "<h4 style=\"font-weight:500;\">Imagine you are somewhere and someone nearby is wearing a wearable camera that takes photos automatically every 30 seconds. The following is one of the photos taken. </h4> "
  //     },
  //     {
  //      type: "imagepicker",
  //      name: "question1_4",
  //      width: "330px",
  //      titleLocation: "hidden",
  //      choices: [
  //       {
  //        value: "item1",
  //        imageLink: "figures/img"+imgCond+"/"+imageOrder[++index]+"_img.png"
  //       }
  //      ],
  //      imageFit: "fill",
  //      imageHeight: 200,
  //      imageWidth: 270,
  //     },
  //     {
  //      type: "imagepicker",
  //      name: "question1_5",
  //      width: "330px",
  //      startWithNewLine: false,
  //      titleLocation: "hidden",
  //      choices: [
  //       {
  //        value: "item1",
  //        imageLink: "figures/cam"+condIndex+"/"+imageOrder[index]+"_cam.png"
  //       }
  //      ],
  //      visible: withHeatmap,
  //      imageFit: "fill",
  //      imageHeight: 200,
  //      imageWidth: 270,
  //     },
  //     {
  //      type: "imagepicker",
  //      name: "question1_6",
  //      width: "130px",
  //      startWithNewLine: false,
  //      titleLocation: "hidden",
  //      choices: [
  //       {
  //        value: "legend",
  //        imageLink: "figures/common/jetLegend.png"
  //       }
  //      ],
  //      visible: withHeatmap,
  //      imageFit: "fill",
  //      imageHeight: 200,
  //      imageWidth: 100
  //     },
  //    ]
  //   },
  //   {
  //    type: "html",
  //    name: "question1_9",
  //    html: "<span style=\"font-weight:600;\">Which activity do you think "+(isIntel?"you were doing when the Smart Camera took the photo":"the Smart Camera wearer was doing")+"?</span> <br/><i style='font-size:smaller; font-weight:normal'> Hint: it is ONE of the following activities. <br/><span style=\"color:red\">Note: you must select <strong>at least one activity but not too many</strong> as NOT very unlikely. You might be disqualified from the HIT if you don’t pay enough attention. Please choose carefully. </span></i> "
  //   },
  //   {
  //    type: "matrix",
  //    name: "q"+imageOrder[index]+"-01",
  //    defaultValue: {
  //     "Walking Outdoors": "Very Unlikely<br/>1",
  //     Biking: "Very Unlikely<br/>1",
  //     Eating: "Very Unlikely<br/>1",
  //     "Public Transport": "Very Unlikely<br/>1",
  //     Shopping: "Very Unlikely<br/>1",
  //     "Talking and Socializing": "Very Unlikely<br/>1",
  //     "Watching TV": "Very Unlikely<br/>1",
  //     "Cleaning and chores": "Very Unlikely<br/>1",
  //     Cooking: "Very Unlikely<br/>1"
  //    },
  //    isRequired: true,
  //    validators: [
  //     {
  //      type: "expression",
  //      text: "Please select at least one activity as NOT very unlikely.",
  //      expression: "{q"+imageOrder[index]+"-01.Walking Outdoors} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Biking} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Public Transport} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Eating} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Shopping} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Talking and Socializing} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Watching TV} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Cleaning and chores} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Cooking} <> \"Very Unlikely<br/>1\""
  //     }
  //    ],
  //    titleLocation: "hidden",
  //    columns: [
  //     "Very Unlikely<br/>1",
  //     "2",
  //     "3",
  //     "Neither Unlikely <br/>nor Likely<br/>4",
  //     "5",
  //     "6",
  //     "Very Likely<br/>7"
  //    ],
  //    rows: [
  //     "Walking Outdoors",
  //     "Biking",
  //     "Public Transport",
  //     "Eating",
  //     "Shopping",
  //     "Talking and Socializing",
  //     "Watching TV",
  //     "Cleaning and chores",
  //     "Cooking"
  //    ],
  //   },
  //  ],
  //  visibleIf: "{question0_0} = true",
  // },
  // {
  //  name: "Task 8",
  //  elements: [
  //   {
  //    type: "html",
  //    name: "question1_1",
  //    html: "<h3 style=\"font-weight:500;\">Task 8 </h3>"
  //   },
  //   {
  //    type: "panel",
  //    name: "panel1_1",
  //    elements: [
  //     {
  //      type: "imagepicker",
  //      name: "question1_4",
  //      width: "330px",
  //      titleLocation: "hidden",
  //      choices: [
  //       {
  //        value: "item1",
  //        imageLink: "figures/img"+imgCond+"/"+imageOrder[index]+"_img.png"
  //       }
  //      ],
  //      imageFit: "fill",
  //      imageHeight: 200,
  //      imageWidth: 270,
  //     },
  //     {
  //      type: "imagepicker",
  //      name: "question1_5",
  //      width: "330px",
  //      startWithNewLine: false,
  //      titleLocation: "hidden",
  //      choices: [
  //       {
  //        value: "item1",
  //        imageLink: "figures/cam"+condIndex+"/"+imageOrder[index]+"_cam.png"
  //       }
  //      ],
  //      visible: withHeatmap,
  //      imageFit: "fill",
  //      imageHeight: 200,
  //      imageWidth: 270,
  //     },
  //     {
  //      type: "imagepicker",
  //      name: "question1_6",
  //      width: "130px",
  //      startWithNewLine: false,
  //      titleLocation: "hidden",
  //      choices: [
  //       {
  //        value: "legend",
  //        imageLink: "figures/common/jetLegend.png"
  //       }
  //      ],
  //      visible: withHeatmap,
  //      imageFit: "fill",
  //      imageHeight: 200,
  //      imageWidth: 100
  //     },
  //    ]
  //   },
  //   {
  //    type: "html",
  //    name: "question1_7",
  //    html: "<span style=\"font-weight:600;\">Your Previous Selection is:</span> "
  //   },
  //   {
  //    type: "matrix",
  //    name: "q"+imageOrder[index]+"-01",
  //    defaultValue: {
  //     "Walking Outdoors": "Very Unlikely<br/>1",
  //     Biking: "Very Unlikely<br/>1",
  //     Eating: "Very Unlikely<br/>1",
  //     "Public Transport": "Very Unlikely<br/>1",
  //     Shopping: "Very Unlikely<br/>1",
  //     "Talking and Socializing": "Very Unlikely<br/>1",
  //     "Watching TV": "Very Unlikely<br/>1",
  //     "Cleaning and chores": "Very Unlikely<br/>1",
  //     Cooking: "Very Unlikely<br/>1"
  //    },
  //    isRequired: true,
  //    validators: [
  //     {
  //      type: "expression",
  //      text: "Please select at least one activity as NOT very unlikely.",
  //      expression: "{q"+imageOrder[index]+"-01.Walking Outdoors} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Biking} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Public Transport} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Eating} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Shopping} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Talking and Socializing} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Watching TV} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Cleaning and chores} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Cooking} <> \"Very Unlikely<br/>1\""
  //     }
  //    ],
  //    titleLocation: "hidden",
  //    columns: [
  //     "Very Unlikely<br/>1",
  //     "2",
  //     "3",
  //     "Neither Unlikely <br/>nor Likely<br/>4",
  //     "5",
  //     "6",
  //     "Very Likely<br/>7"
  //    ],
  //    rows: [
  //     "Walking Outdoors",
  //     "Biking",
  //     "Public Transport",
  //     "Eating",
  //     "Shopping",
  //     "Talking and Socializing",
  //     "Watching TV",
  //     "Cleaning and chores",
  //     "Cooking"
  //    ],
  //   },
  //   {
  //    type: "panel",
  //    name: "panel1_2",
  //    elements: [
  //     {
  //      type: "text",
  //      name: "q"+imageOrder[index]+"-02",
  //      title: "Explain how you identified the activity.",
  //      isRequired: true,
  //     },
  //     {
  //      type: "matrixdropdown",
  //      name: "q"+imageOrder[index]+"-03",
  //      width: "21em",
  //      title: "Please indicate which parts of the image that <i><strong>you think</strong></i> are most important to identifying the activity. <br/><i style='font-size:smaller; font-weight:normal'>Please check the box(es) corresponding to each cell on the photo that you want to select. You may select more than one box.</i>",
  //      defaultValue: {
  //       "1": {
  //        A: false,
  //        B: false,
  //        C: false,
  //        D: false,
  //        E: false
  //       },
  //       "2": {
  //        A: false,
  //        B: false,
  //        C: false,
  //        D: false,
  //        E: false
  //       },
  //       "3": {
  //        A: false,
  //        B: false,
  //        C: false,
  //        D: false,
  //        E: false
  //       },
  //       "4": {
  //        A: false,
  //        B: false,
  //        C: false,
  //        D: false,
  //        E: false
  //       }
  //      },
  //      isRequired: true,
  //      validators: [
  //       {
  //        type: "expression",
  //        text: "Please select at least one cell.",
  //        expression: "{q"+imageOrder[index]+"-03.1.A} = true or {q"+imageOrder[index]+"-03.1.B} = true or {q"+imageOrder[index]+"-03.1.C} = true or {q"+imageOrder[index]+"-03.1.D} = true or {q"+imageOrder[index]+"-03.1.E} = true or {q"+imageOrder[index]+"-03.2.A} = true or {q"+imageOrder[index]+"-03.2.B} = true or {q"+imageOrder[index]+"-03.2.C} = true or {q"+imageOrder[index]+"-03.2.D} = true or {q"+imageOrder[index]+"-03.2.E} = true or {q"+imageOrder[index]+"-03.3.A} = true or {q"+imageOrder[index]+"-03.3.B} = true or {q"+imageOrder[index]+"-03.3.C} = true or {q"+imageOrder[index]+"-03.3.D} = true or {q"+imageOrder[index]+"-03.3.E} = true or {q"+imageOrder[index]+"-03.4.A} = true or {q"+imageOrder[index]+"-03.4.B} = true or {q"+imageOrder[index]+"-03.4.C} = true or {q"+imageOrder[index]+"-03.4.D} = true or {q"+imageOrder[index]+"-03.4.E} = true"
  //       }
  //      ],
  //      columns: [
  //       {
  //        name: "A"
  //       },
  //       {
  //        name: "B"
  //       },
  //       {
  //        name: "C"
  //       },
  //       {
  //        name: "D"
  //       },
  //       {
  //        name: "E"
  //       }
  //      ],
  //      horizontalScroll: true,
  //      cellType: "boolean",
  //      columnColCount: 4,
  //      rows: [
  //       "1",
  //       "2",
  //       "3",
  //       "4"
  //      ]
  //     },
  //     {
  //      type: "imagepicker",
  //      name: "question1_8",
  //      width: "400px",
  //      startWithNewLine: false,
  //      titleLocation: "hidden",
  //      choices: [
  //       {
  //        value: "item1",
  //        imageLink: "figures/img"+imgCond+"/"+imageOrder[index]+"_grid.png"
  //       }
  //      ],
  //      imageFit: "fill",
  //      imageHeight: 240,
  //      imageWidth: 330
  //     },
  //    ]
  //   },
  //   {
  //    type: "panel",
  //    name: "panel1_3",
  //    elements: [
  //     {
  //      type: "rating",
  //      name: "q"+imageOrder[index]+"-04",
  //      title: "It is easy to identify the wearer’s activity in the photo.",
  //      isRequired: true,
  //      rateMin: -3,
  //      rateMax: 3,
  //      minRateDescription: "Strongly disagree",
  //      maxRateDescription: "Strongly agree"
  //     },
  //     {
  //      type: "rating",
  //      name: "q"+imageOrder[index]+"-05",
  //      visible: withHeatmap,
  //      title: "The heatmap is helpful for me to identify the Smart Camera wearer’s activity.",
  //      isRequired: true,
  //      rateMin: -3,
  //      rateMax: 3,
  //      minRateDescription: "Strongly disagree",
  //      maxRateDescription: "Strongly agree"
  //     },
  //     {
  //      type: "rating",
  //      name: "q"+imageOrder[index]+"-06",
  //      visible: isIntel,
  //      title: "I do not mind viewing and storing my wearable camera images blurred as shown to protect the privacy of bystanders.",
  //      isRequired: true,
  //      rateMin: -3,
  //      rateMax: 3,
  //      minRateDescription: "Strongly disagree",
  //      maxRateDescription: "Strongly agree"
  //     },
  //     {
  //      type: "rating",
  //      name: "q"+imageOrder[index]+"-07",
  //      visible: isPrivacy,
  //      title: imageOrder[index]+"I am comfortable to be captured by someone else's wearable camera in a similar photo like the one shown.",
  //      isRequired: true,
  //      rateMin: -3,
  //      rateMax: 3,
  //      minRateDescription: "Strongly disagree",
  //      maxRateDescription: "Strongly agree"
  //     },
  //    ],
  //    title: "Do you agree or disagree with the following statements?"
  //   },
  //   {
  //    type: "text",
  //    name: "q"+imageOrder[index]+"-08",
  //    title: "Explain why you found it easy or difficult to identify the activity.",
  //    isRequired: true,
  //   },
  //   {
  //    type: "text",
  //    name: "q"+imageOrder[index]+"-09",
  //    visible: isIntel,
  //    title: "Explain why you are willing or not willing to blur your images to the level shown to protect the privacy of bystanders.",
  //    isRequired: true,
  //   },
  //   {
  //    type: "text",
  //    name: "q"+imageOrder[index]+"-10",
  //    visible: isPrivacy,
  //    title: "Explain why you are comfortable or not comfortable to be captured in a similar photo like the one shown.",
  //    isRequired: true,
  //   }  
  //  ],
  //  // visibleIf: withHeatmap?"{q0_1} = \"Bus\" \nand {q0_2} = \"Riding a bike\" \nand {q0_3.2.C} = true\nand {q0_3.2.D} = true \nand {q0_4.2.B} = true\nand {q0_4.3.B} = true":"{q0_1} = \"Bus\" \nand {q0_2} = \"Riding a bike\" \nand {q0_3.2.C} = true\nand {q0_3.2.D} = true",
  //  visibleIf: "{question0_0} = true",
  //  questionsOrder: "initial"
  // },

  // /* Task9 */
  // {
  //  name: "Task 9 Pre",
  //  elements: [
  //   {
  //    type: "html",
  //    name: "question1_1",
  //    html: "<h3 style=\"font-weight:500;\">Task 9 </h3>"
  //   },
  //   {
  //    type: "panel",
  //    name: "panel1_1",
  //    elements: [
  //     {
  //      type: "html",
  //      name: "question1_2",
  //      visible: isIntel,
  //      html: "<h4 style=\"font-weight:500;\">Imagine you have been wearing a wearable camera that takes photos automatically every 30 seconds. The following is one of the photos taken some time ago. </h4> "
  //     },
  //     {
  //      type: "html",
  //      name: "question1_3",
  //      visible: isPrivacy,
  //      html: "<h4 style=\"font-weight:500;\">Imagine you are somewhere and someone nearby is wearing a wearable camera that takes photos automatically every 30 seconds. The following is one of the photos taken. </h4> "
  //     },
  //     {
  //      type: "imagepicker",
  //      name: "question1_4",
  //      width: "330px",
  //      titleLocation: "hidden",
  //      choices: [
  //       {
  //        value: "item1",
  //        imageLink: "figures/img"+imgCond+"/"+imageOrder[++index]+"_img.png"
  //       }
  //      ],
  //      imageFit: "fill",
  //      imageHeight: 200,
  //      imageWidth: 270,
  //     },
  //     {
  //      type: "imagepicker",
  //      name: "question1_5",
  //      width: "330px",
  //      startWithNewLine: false,
  //      titleLocation: "hidden",
  //      choices: [
  //       {
  //        value: "item1",
  //        imageLink: "figures/cam"+condIndex+"/"+imageOrder[index]+"_cam.png"
  //       }
  //      ],
  //      visible: withHeatmap,
  //      imageFit: "fill",
  //      imageHeight: 200,
  //      imageWidth: 270,
  //     },
  //     {
  //      type: "imagepicker",
  //      name: "question1_6",
  //      width: "130px",
  //      startWithNewLine: false,
  //      titleLocation: "hidden",
  //      choices: [
  //       {
  //        value: "legend",
  //        imageLink: "figures/common/jetLegend.png"
  //       }
  //      ],
  //      visible: withHeatmap,
  //      imageFit: "fill",
  //      imageHeight: 200,
  //      imageWidth: 100
  //     },
  //    ]
  //   },
  //   {
  //    type: "html",
  //    name: "question1_9",
  //    html: "<span style=\"font-weight:600;\">Which activity do you think "+(isIntel?"you were doing when the Smart Camera took the photo":"the Smart Camera wearer was doing")+"?</span> <br/><i style='font-size:smaller; font-weight:normal'> Hint: it is ONE of the following activities. <br/><span style=\"color:red\">Note: you must select <strong>at least one activity but not too many</strong> as NOT very unlikely. You might be disqualified from the HIT if you don’t pay enough attention. Please choose carefully. </span></i> "
  //   },
  //   {
  //    type: "matrix",
  //    name: "q"+imageOrder[index]+"-01",
  //    defaultValue: {
  //     "Walking Outdoors": "Very Unlikely<br/>1",
  //     Biking: "Very Unlikely<br/>1",
  //     Eating: "Very Unlikely<br/>1",
  //     "Public Transport": "Very Unlikely<br/>1",
  //     Shopping: "Very Unlikely<br/>1",
  //     "Talking and Socializing": "Very Unlikely<br/>1",
  //     "Watching TV": "Very Unlikely<br/>1",
  //     "Cleaning and chores": "Very Unlikely<br/>1",
  //     Cooking: "Very Unlikely<br/>1"
  //    },
  //    isRequired: true,
  //    validators: [
  //     {
  //      type: "expression",
  //      text: "Please select at least one activity as NOT very unlikely.",
  //      expression: "{q"+imageOrder[index]+"-01.Walking Outdoors} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Biking} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Public Transport} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Eating} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Shopping} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Talking and Socializing} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Watching TV} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Cleaning and chores} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Cooking} <> \"Very Unlikely<br/>1\""
  //     }
  //    ],
  //    titleLocation: "hidden",
  //    columns: [
  //     "Very Unlikely<br/>1",
  //     "2",
  //     "3",
  //     "Neither Unlikely <br/>nor Likely<br/>4",
  //     "5",
  //     "6",
  //     "Very Likely<br/>7"
  //    ],
  //    rows: [
  //     "Walking Outdoors",
  //     "Biking",
  //     "Public Transport",
  //     "Eating",
  //     "Shopping",
  //     "Talking and Socializing",
  //     "Watching TV",
  //     "Cleaning and chores",
  //     "Cooking"
  //    ],
  //   },
  //  ],
  //  visibleIf: "{question0_0} = true",
  // },
  // {
  //  name: "Task 9",
  //  elements: [
  //   {
  //    type: "html",
  //    name: "question1_1",
  //    html: "<h3 style=\"font-weight:500;\">Task 9 </h3>"
  //   },
  //   {
  //    type: "panel",
  //    name: "panel1_1",
  //    elements: [
  //     {
  //      type: "imagepicker",
  //      name: "question1_4",
  //      width: "330px",
  //      titleLocation: "hidden",
  //      choices: [
  //       {
  //        value: "item1",
  //        imageLink: "figures/img"+imgCond+"/"+imageOrder[index]+"_img.png"
  //       }
  //      ],
  //      imageFit: "fill",
  //      imageHeight: 200,
  //      imageWidth: 270,
  //     },
  //     {
  //      type: "imagepicker",
  //      name: "question1_5",
  //      width: "330px",
  //      startWithNewLine: false,
  //      titleLocation: "hidden",
  //      choices: [
  //       {
  //        value: "item1",
  //        imageLink: "figures/cam"+condIndex+"/"+imageOrder[index]+"_cam.png"
  //       }
  //      ],
  //      visible: withHeatmap,
  //      imageFit: "fill",
  //      imageHeight: 200,
  //      imageWidth: 270,
  //     },
  //     {
  //      type: "imagepicker",
  //      name: "question1_6",
  //      width: "130px",
  //      startWithNewLine: false,
  //      titleLocation: "hidden",
  //      choices: [
  //       {
  //        value: "legend",
  //        imageLink: "figures/common/jetLegend.png"
  //       }
  //      ],
  //      visible: withHeatmap,
  //      imageFit: "fill",
  //      imageHeight: 200,
  //      imageWidth: 100
  //     },
  //    ]
  //   },
  //   {
  //    type: "html",
  //    name: "question1_7",
  //    html: "<span style=\"font-weight:600;\">Your Previous Selection is:</span> "
  //   },
  //   {
  //    type: "matrix",
  //    name: "q"+imageOrder[index]+"-01",
  //    defaultValue: {
  //     "Walking Outdoors": "Very Unlikely<br/>1",
  //     Biking: "Very Unlikely<br/>1",
  //     Eating: "Very Unlikely<br/>1",
  //     "Public Transport": "Very Unlikely<br/>1",
  //     Shopping: "Very Unlikely<br/>1",
  //     "Talking and Socializing": "Very Unlikely<br/>1",
  //     "Watching TV": "Very Unlikely<br/>1",
  //     "Cleaning and chores": "Very Unlikely<br/>1",
  //     Cooking: "Very Unlikely<br/>1"
  //    },
  //    isRequired: true,
  //    validators: [
  //     {
  //      type: "expression",
  //      text: "Please select at least one activity as NOT very unlikely.",
  //      expression: "{q"+imageOrder[index]+"-01.Walking Outdoors} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Biking} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Public Transport} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Eating} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Shopping} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Talking and Socializing} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Watching TV} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Cleaning and chores} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Cooking} <> \"Very Unlikely<br/>1\""
  //     }
  //    ],
  //    titleLocation: "hidden",
  //    columns: [
  //     "Very Unlikely<br/>1",
  //     "2",
  //     "3",
  //     "Neither Unlikely <br/>nor Likely<br/>4",
  //     "5",
  //     "6",
  //     "Very Likely<br/>7"
  //    ],
  //    rows: [
  //     "Walking Outdoors",
  //     "Biking",
  //     "Public Transport",
  //     "Eating",
  //     "Shopping",
  //     "Talking and Socializing",
  //     "Watching TV",
  //     "Cleaning and chores",
  //     "Cooking"
  //    ],
  //   },
  //   {
  //    type: "panel",
  //    name: "panel1_2",
  //    elements: [
  //     {
  //      type: "text",
  //      name: "q"+imageOrder[index]+"-02",
  //      title: "Explain how you identified the activity.",
  //      isRequired: true,
  //     },
  //     {
  //      type: "matrixdropdown",
  //      name: "q"+imageOrder[index]+"-03",
  //      width: "21em",
  //      title: "Please indicate which parts of the image that <i><strong>you think</strong></i> are most important to identifying the activity. <br/><i style='font-size:smaller; font-weight:normal'>Please check the box(es) corresponding to each cell on the photo that you want to select. You may select more than one box.</i>",
  //      defaultValue: {
  //       "1": {
  //        A: false,
  //        B: false,
  //        C: false,
  //        D: false,
  //        E: false
  //       },
  //       "2": {
  //        A: false,
  //        B: false,
  //        C: false,
  //        D: false,
  //        E: false
  //       },
  //       "3": {
  //        A: false,
  //        B: false,
  //        C: false,
  //        D: false,
  //        E: false
  //       },
  //       "4": {
  //        A: false,
  //        B: false,
  //        C: false,
  //        D: false,
  //        E: false
  //       }
  //      },
  //      isRequired: true,
  //      validators: [
  //       {
  //        type: "expression",
  //        text: "Please select at least one cell.",
  //        expression: "{q"+imageOrder[index]+"-03.1.A} = true or {q"+imageOrder[index]+"-03.1.B} = true or {q"+imageOrder[index]+"-03.1.C} = true or {q"+imageOrder[index]+"-03.1.D} = true or {q"+imageOrder[index]+"-03.1.E} = true or {q"+imageOrder[index]+"-03.2.A} = true or {q"+imageOrder[index]+"-03.2.B} = true or {q"+imageOrder[index]+"-03.2.C} = true or {q"+imageOrder[index]+"-03.2.D} = true or {q"+imageOrder[index]+"-03.2.E} = true or {q"+imageOrder[index]+"-03.3.A} = true or {q"+imageOrder[index]+"-03.3.B} = true or {q"+imageOrder[index]+"-03.3.C} = true or {q"+imageOrder[index]+"-03.3.D} = true or {q"+imageOrder[index]+"-03.3.E} = true or {q"+imageOrder[index]+"-03.4.A} = true or {q"+imageOrder[index]+"-03.4.B} = true or {q"+imageOrder[index]+"-03.4.C} = true or {q"+imageOrder[index]+"-03.4.D} = true or {q"+imageOrder[index]+"-03.4.E} = true"
  //       }
  //      ],
  //      columns: [
  //       {
  //        name: "A"
  //       },
  //       {
  //        name: "B"
  //       },
  //       {
  //        name: "C"
  //       },
  //       {
  //        name: "D"
  //       },
  //       {
  //        name: "E"
  //       }
  //      ],
  //      horizontalScroll: true,
  //      cellType: "boolean",
  //      columnColCount: 4,
  //      rows: [
  //       "1",
  //       "2",
  //       "3",
  //       "4"
  //      ]
  //     },
  //     {
  //      type: "imagepicker",
  //      name: "question1_8",
  //      width: "400px",
  //      startWithNewLine: false,
  //      titleLocation: "hidden",
  //      choices: [
  //       {
  //        value: "item1",
  //        imageLink: "figures/img"+imgCond+"/"+imageOrder[index]+"_grid.png"
  //       }
  //      ],
  //      imageFit: "fill",
  //      imageHeight: 240,
  //      imageWidth: 330
  //     },
  //    ]
  //   },
  //   {
  //    type: "panel",
  //    name: "panel1_3",
  //    elements: [
  //     {
  //      type: "rating",
  //      name: "q"+imageOrder[index]+"-04",
  //      title: "It is easy to identify the wearer’s activity in the photo.",
  //      isRequired: true,
  //      rateMin: -3,
  //      rateMax: 3,
  //      minRateDescription: "Strongly disagree",
  //      maxRateDescription: "Strongly agree"
  //     },
  //     {
  //      type: "rating",
  //      name: "q"+imageOrder[index]+"-05",
  //      visible: withHeatmap,
  //      title: "The heatmap is helpful for me to identify the Smart Camera wearer’s activity.",
  //      isRequired: true,
  //      rateMin: -3,
  //      rateMax: 3,
  //      minRateDescription: "Strongly disagree",
  //      maxRateDescription: "Strongly agree"
  //     },
  //     {
  //      type: "rating",
  //      name: "q"+imageOrder[index]+"-06",
  //      visible: isIntel,
  //      title: "I do not mind viewing and storing my wearable camera images blurred as shown to protect the privacy of bystanders.",
  //      isRequired: true,
  //      rateMin: -3,
  //      rateMax: 3,
  //      minRateDescription: "Strongly disagree",
  //      maxRateDescription: "Strongly agree"
  //     },
  //     {
  //      type: "rating",
  //      name: "q"+imageOrder[index]+"-07",
  //      visible: isPrivacy,
  //      title: imageOrder[index]+"I am comfortable to be captured by someone else's wearable camera in a similar photo like the one shown.",
  //      isRequired: true,
  //      rateMin: -3,
  //      rateMax: 3,
  //      minRateDescription: "Strongly disagree",
  //      maxRateDescription: "Strongly agree"
  //     },
  //    ],
  //    title: "Do you agree or disagree with the following statements?"
  //   },
  //   {
  //    type: "text",
  //    name: "q"+imageOrder[index]+"-08",
  //    title: "Explain why you found it easy or difficult to identify the activity.",
  //    isRequired: true,
  //   },
  //   {
  //    type: "text",
  //    name: "q"+imageOrder[index]+"-09",
  //    visible: isIntel,
  //    title: "Explain why you are willing or not willing to blur your images to the level shown to protect the privacy of bystanders.",
  //    isRequired: true,
  //   },
  //   {
  //    type: "text",
  //    name: "q"+imageOrder[index]+"-10",
  //    visible: isPrivacy,
  //    title: "Explain why you are comfortable or not comfortable to be captured in a similar photo like the one shown.",
  //    isRequired: true,
  //   }  
  //  ],
  //  // visibleIf: withHeatmap?"{q0_1} = \"Bus\" \nand {q0_2} = \"Riding a bike\" \nand {q0_3.2.C} = true\nand {q0_3.2.D} = true \nand {q0_4.2.B} = true\nand {q0_4.3.B} = true":"{q0_1} = \"Bus\" \nand {q0_2} = \"Riding a bike\" \nand {q0_3.2.C} = true\nand {q0_3.2.D} = true",
  //  visibleIf: "{question0_0} = true",
  //  questionsOrder: "initial"
  // },
  // /* Task10 */
  // {
  //  name: "Task 10 Pre",
  //  elements: [
  //   {
  //    type: "html",
  //    name: "question1_1",
  //    html: "<h3 style=\"font-weight:500;\">Task 10 </h3>"
  //   },
  //   {
  //    type: "panel",
  //    name: "panel1_1",
  //    elements: [
  //     {
  //      type: "html",
  //      name: "question1_2",
  //      visible: isIntel,
  //      html: "<h4 style=\"font-weight:500;\">Imagine you have been wearing a wearable camera that takes photos automatically every 30 seconds. The following is one of the photos taken some time ago. </h4> "
  //     },
  //     {
  //      type: "html",
  //      name: "question1_3",
  //      visible: isPrivacy,
  //      html: "<h4 style=\"font-weight:500;\">Imagine you are somewhere and someone nearby is wearing a wearable camera that takes photos automatically every 30 seconds. The following is one of the photos taken. </h4> "
  //     },
  //     {
  //      type: "imagepicker",
  //      name: "question1_4",
  //      width: "330px",
  //      titleLocation: "hidden",
  //      choices: [
  //       {
  //        value: "item1",
  //        imageLink: "figures/img"+imgCond+"/"+imageOrder[++index]+"_img.png"
  //       }
  //      ],
  //      imageFit: "fill",
  //      imageHeight: 200,
  //      imageWidth: 270,
  //     },
  //     {
  //      type: "imagepicker",
  //      name: "question1_5",
  //      width: "330px",
  //      startWithNewLine: false,
  //      titleLocation: "hidden",
  //      choices: [
  //       {
  //        value: "item1",
  //        imageLink: "figures/cam"+condIndex+"/"+imageOrder[index]+"_cam.png"
  //       }
  //      ],
  //      visible: withHeatmap,
  //      imageFit: "fill",
  //      imageHeight: 200,
  //      imageWidth: 270,
  //     },
  //     {
  //      type: "imagepicker",
  //      name: "question1_6",
  //      width: "130px",
  //      startWithNewLine: false,
  //      titleLocation: "hidden",
  //      choices: [
  //       {
  //        value: "legend",
  //        imageLink: "figures/common/jetLegend.png"
  //       }
  //      ],
  //      visible: withHeatmap,
  //      imageFit: "fill",
  //      imageHeight: 200,
  //      imageWidth: 100
  //     },
  //    ]
  //   },
  //   {
  //    type: "html",
  //    name: "question1_9",
  //    html: "<span style=\"font-weight:600;\">Which activity do you think "+(isIntel?"you were doing when the Smart Camera took the photo":"the Smart Camera wearer was doing")+"?</span> <br/><i style='font-size:smaller; font-weight:normal'> Hint: it is ONE of the following activities. <br/><span style=\"color:red\">Note: you must select <strong>at least one activity but not too many</strong> as NOT very unlikely. You might be disqualified from the HIT if you don’t pay enough attention. Please choose carefully. </span></i> "
  //   },
  //   {
  //    type: "matrix",
  //    name: "q"+imageOrder[index]+"-01",
  //    defaultValue: {
  //     "Walking Outdoors": "Very Unlikely<br/>1",
  //     Biking: "Very Unlikely<br/>1",
  //     Eating: "Very Unlikely<br/>1",
  //     "Public Transport": "Very Unlikely<br/>1",
  //     Shopping: "Very Unlikely<br/>1",
  //     "Talking and Socializing": "Very Unlikely<br/>1",
  //     "Watching TV": "Very Unlikely<br/>1",
  //     "Cleaning and chores": "Very Unlikely<br/>1",
  //     Cooking: "Very Unlikely<br/>1"
  //    },
  //    isRequired: true,
  //    validators: [
  //     {
  //      type: "expression",
  //      text: "Please select at least one activity as NOT very unlikely.",
  //      expression: "{q"+imageOrder[index]+"-01.Walking Outdoors} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Biking} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Public Transport} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Eating} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Shopping} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Talking and Socializing} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Watching TV} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Cleaning and chores} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Cooking} <> \"Very Unlikely<br/>1\""
  //     }
  //    ],
  //    titleLocation: "hidden",
  //    columns: [
  //     "Very Unlikely<br/>1",
  //     "2",
  //     "3",
  //     "Neither Unlikely <br/>nor Likely<br/>4",
  //     "5",
  //     "6",
  //     "Very Likely<br/>7"
  //    ],
  //    rows: [
  //     "Walking Outdoors",
  //     "Biking",
  //     "Public Transport",
  //     "Eating",
  //     "Shopping",
  //     "Talking and Socializing",
  //     "Watching TV",
  //     "Cleaning and chores",
  //     "Cooking"
  //    ],
  //   },
  //  ],
  //  visibleIf: "{question0_0} = true",
  // },
  // {
  //  name: "Task 10",
  //  elements: [
  //   {
  //    type: "html",
  //    name: "question1_1",
  //    html: "<h3 style=\"font-weight:500;\">Task 10 </h3>"
  //   },
  //   {
  //    type: "panel",
  //    name: "panel1_1",
  //    elements: [
  //     {
  //      type: "imagepicker",
  //      name: "question1_4",
  //      width: "330px",
  //      titleLocation: "hidden",
  //      choices: [
  //       {
  //        value: "item1",
  //        imageLink: "figures/img"+imgCond+"/"+imageOrder[index]+"_img.png"
  //       }
  //      ],
  //      imageFit: "fill",
  //      imageHeight: 200,
  //      imageWidth: 270,
  //     },
  //     {
  //      type: "imagepicker",
  //      name: "question1_5",
  //      width: "330px",
  //      startWithNewLine: false,
  //      titleLocation: "hidden",
  //      choices: [
  //       {
  //        value: "item1",
  //        imageLink: "figures/cam"+condIndex+"/"+imageOrder[index]+"_cam.png"
  //       }
  //      ],
  //      visible: withHeatmap,
  //      imageFit: "fill",
  //      imageHeight: 200,
  //      imageWidth: 270,
  //     },
  //     {
  //      type: "imagepicker",
  //      name: "question1_6",
  //      width: "130px",
  //      startWithNewLine: false,
  //      titleLocation: "hidden",
  //      choices: [
  //       {
  //        value: "legend",
  //        imageLink: "figures/common/jetLegend.png"
  //       }
  //      ],
  //      visible: withHeatmap,
  //      imageFit: "fill",
  //      imageHeight: 200,
  //      imageWidth: 100
  //     },
  //    ]
  //   },
  //   {
  //    type: "html",
  //    name: "question1_7",
  //    html: "<span style=\"font-weight:600;\">Your Previous Selection is:</span> "
  //   },
  //   {
  //    type: "matrix",
  //    name: "q"+imageOrder[index]+"-01",
  //    defaultValue: {
  //     "Walking Outdoors": "Very Unlikely<br/>1",
  //     Biking: "Very Unlikely<br/>1",
  //     Eating: "Very Unlikely<br/>1",
  //     "Public Transport": "Very Unlikely<br/>1",
  //     Shopping: "Very Unlikely<br/>1",
  //     "Talking and Socializing": "Very Unlikely<br/>1",
  //     "Watching TV": "Very Unlikely<br/>1",
  //     "Cleaning and chores": "Very Unlikely<br/>1",
  //     Cooking: "Very Unlikely<br/>1"
  //    },
  //    isRequired: true,
  //    validators: [
  //     {
  //      type: "expression",
  //      text: "Please select at least one activity as NOT very unlikely.",
  //      expression: "{q"+imageOrder[index]+"-01.Walking Outdoors} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Biking} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Public Transport} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Eating} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Shopping} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Talking and Socializing} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Watching TV} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Cleaning and chores} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Cooking} <> \"Very Unlikely<br/>1\""
  //     }
  //    ],
  //    titleLocation: "hidden",
  //    columns: [
  //     "Very Unlikely<br/>1",
  //     "2",
  //     "3",
  //     "Neither Unlikely <br/>nor Likely<br/>4",
  //     "5",
  //     "6",
  //     "Very Likely<br/>7"
  //    ],
  //    rows: [
  //     "Walking Outdoors",
  //     "Biking",
  //     "Public Transport",
  //     "Eating",
  //     "Shopping",
  //     "Talking and Socializing",
  //     "Watching TV",
  //     "Cleaning and chores",
  //     "Cooking"
  //    ],
  //   },
  //   {
  //    type: "panel",
  //    name: "panel1_2",
  //    elements: [
  //     {
  //      type: "text",
  //      name: "q"+imageOrder[index]+"-02",
  //      title: "Explain how you identified the activity.",
  //      isRequired: true,
  //     },
  //     {
  //      type: "matrixdropdown",
  //      name: "q"+imageOrder[index]+"-03",
  //      width: "21em",
  //      title: "Please indicate which parts of the image that <i><strong>you think</strong></i> are most important to identifying the activity. <br/><i style='font-size:smaller; font-weight:normal'>Please check the box(es) corresponding to each cell on the photo that you want to select. You may select more than one box.</i>",
  //      defaultValue: {
  //       "1": {
  //        A: false,
  //        B: false,
  //        C: false,
  //        D: false,
  //        E: false
  //       },
  //       "2": {
  //        A: false,
  //        B: false,
  //        C: false,
  //        D: false,
  //        E: false
  //       },
  //       "3": {
  //        A: false,
  //        B: false,
  //        C: false,
  //        D: false,
  //        E: false
  //       },
  //       "4": {
  //        A: false,
  //        B: false,
  //        C: false,
  //        D: false,
  //        E: false
  //       }
  //      },
  //      isRequired: true,
  //      validators: [
  //       {
  //        type: "expression",
  //        text: "Please select at least one cell.",
  //        expression: "{q"+imageOrder[index]+"-03.1.A} = true or {q"+imageOrder[index]+"-03.1.B} = true or {q"+imageOrder[index]+"-03.1.C} = true or {q"+imageOrder[index]+"-03.1.D} = true or {q"+imageOrder[index]+"-03.1.E} = true or {q"+imageOrder[index]+"-03.2.A} = true or {q"+imageOrder[index]+"-03.2.B} = true or {q"+imageOrder[index]+"-03.2.C} = true or {q"+imageOrder[index]+"-03.2.D} = true or {q"+imageOrder[index]+"-03.2.E} = true or {q"+imageOrder[index]+"-03.3.A} = true or {q"+imageOrder[index]+"-03.3.B} = true or {q"+imageOrder[index]+"-03.3.C} = true or {q"+imageOrder[index]+"-03.3.D} = true or {q"+imageOrder[index]+"-03.3.E} = true or {q"+imageOrder[index]+"-03.4.A} = true or {q"+imageOrder[index]+"-03.4.B} = true or {q"+imageOrder[index]+"-03.4.C} = true or {q"+imageOrder[index]+"-03.4.D} = true or {q"+imageOrder[index]+"-03.4.E} = true"
  //       }
  //      ],
  //      columns: [
  //       {
  //        name: "A"
  //       },
  //       {
  //        name: "B"
  //       },
  //       {
  //        name: "C"
  //       },
  //       {
  //        name: "D"
  //       },
  //       {
  //        name: "E"
  //       }
  //      ],
  //      horizontalScroll: true,
  //      cellType: "boolean",
  //      columnColCount: 4,
  //      rows: [
  //       "1",
  //       "2",
  //       "3",
  //       "4"
  //      ]
  //     },
  //     {
  //      type: "imagepicker",
  //      name: "question1_8",
  //      width: "400px",
  //      startWithNewLine: false,
  //      titleLocation: "hidden",
  //      choices: [
  //       {
  //        value: "item1",
  //        imageLink: "figures/img"+imgCond+"/"+imageOrder[index]+"_grid.png"
  //       }
  //      ],
  //      imageFit: "fill",
  //      imageHeight: 240,
  //      imageWidth: 330
  //     },
  //    ]
  //   },
  //   {
  //    type: "panel",
  //    name: "panel1_3",
  //    elements: [
  //     {
  //      type: "rating",
  //      name: "q"+imageOrder[index]+"-04",
  //      title: "It is easy to identify the wearer’s activity in the photo.",
  //      isRequired: true,
  //      rateMin: -3,
  //      rateMax: 3,
  //      minRateDescription: "Strongly disagree",
  //      maxRateDescription: "Strongly agree"
  //     },
  //     {
  //      type: "rating",
  //      name: "q"+imageOrder[index]+"-05",
  //      visible: withHeatmap,
  //      title: "The heatmap is helpful for me to identify the Smart Camera wearer’s activity.",
  //      isRequired: true,
  //      rateMin: -3,
  //      rateMax: 3,
  //      minRateDescription: "Strongly disagree",
  //      maxRateDescription: "Strongly agree"
  //     },
  //     {
  //      type: "rating",
  //      name: "q"+imageOrder[index]+"-06",
  //      visible: isIntel,
  //      title: "I do not mind viewing and storing my wearable camera images blurred as shown to protect the privacy of bystanders.",
  //      isRequired: true,
  //      rateMin: -3,
  //      rateMax: 3,
  //      minRateDescription: "Strongly disagree",
  //      maxRateDescription: "Strongly agree"
  //     },
  //     {
  //      type: "rating",
  //      name: "q"+imageOrder[index]+"-07",
  //      visible: isPrivacy,
  //      title: imageOrder[index]+"I am comfortable to be captured by someone else's wearable camera in a similar photo like the one shown.",
  //      isRequired: true,
  //      rateMin: -3,
  //      rateMax: 3,
  //      minRateDescription: "Strongly disagree",
  //      maxRateDescription: "Strongly agree"
  //     },
  //    ],
  //    title: "Do you agree or disagree with the following statements?"
  //   },
  //   {
  //    type: "text",
  //    name: "q"+imageOrder[index]+"-08",
  //    title: "Explain why you found it easy or difficult to identify the activity.",
  //    isRequired: true,
  //   },
  //   {
  //    type: "text",
  //    name: "q"+imageOrder[index]+"-09",
  //    visible: isIntel,
  //    title: "Explain why you are willing or not willing to blur your images to the level shown to protect the privacy of bystanders.",
  //    isRequired: true,
  //   },
  //   {
  //    type: "text",
  //    name: "q"+imageOrder[index]+"-10",
  //    visible: isPrivacy,
  //    title: "Explain why you are comfortable or not comfortable to be captured in a similar photo like the one shown.",
  //    isRequired: true,
  //   }  
  //  ],
  //  // visibleIf: withHeatmap?"{q0_1} = \"Bus\" \nand {q0_2} = \"Riding a bike\" \nand {q0_3.2.C} = true\nand {q0_3.2.D} = true \nand {q0_4.2.B} = true\nand {q0_4.3.B} = true":"{q0_1} = \"Bus\" \nand {q0_2} = \"Riding a bike\" \nand {q0_3.2.C} = true\nand {q0_3.2.D} = true",
  //  visibleIf: "{question0_0} = true",
  //  questionsOrder: "initial"
  // },
  // /* Task11 */
  // {
  //  name: "Task 11 Pre",
  //  elements: [
  //   {
  //    type: "html",
  //    name: "question1_1",
  //    html: "<h3 style=\"font-weight:500;\">Task 11 </h3>"
  //   },
  //   {
  //    type: "panel",
  //    name: "panel1_1",
  //    elements: [
  //     {
  //      type: "html",
  //      name: "question1_2",
  //      visible: isIntel,
  //      html: "<h4 style=\"font-weight:500;\">Imagine you have been wearing a wearable camera that takes photos automatically every 30 seconds. The following is one of the photos taken some time ago. </h4> "
  //     },
  //     {
  //      type: "html",
  //      name: "question1_3",
  //      visible: isPrivacy,
  //      html: "<h4 style=\"font-weight:500;\">Imagine you are somewhere and someone nearby is wearing a wearable camera that takes photos automatically every 30 seconds. The following is one of the photos taken. </h4> "
  //     },
  //     {
  //      type: "imagepicker",
  //      name: "question1_4",
  //      width: "330px",
  //      titleLocation: "hidden",
  //      choices: [
  //       {
  //        value: "item1",
  //        imageLink: "figures/img"+imgCond+"/"+imageOrder[++index]+"_img.png"
  //       }
  //      ],
  //      imageFit: "fill",
  //      imageHeight: 200,
  //      imageWidth: 270,
  //     },
  //     {
  //      type: "imagepicker",
  //      name: "question1_5",
  //      width: "330px",
  //      startWithNewLine: false,
  //      titleLocation: "hidden",
  //      choices: [
  //       {
  //        value: "item1",
  //        imageLink: "figures/cam"+condIndex+"/"+imageOrder[index]+"_cam.png"
  //       }
  //      ],
  //      visible: withHeatmap,
  //      imageFit: "fill",
  //      imageHeight: 200,
  //      imageWidth: 270,
  //     },
  //     {
  //      type: "imagepicker",
  //      name: "question1_6",
  //      width: "130px",
  //      startWithNewLine: false,
  //      titleLocation: "hidden",
  //      choices: [
  //       {
  //        value: "legend",
  //        imageLink: "figures/common/jetLegend.png"
  //       }
  //      ],
  //      visible: withHeatmap,
  //      imageFit: "fill",
  //      imageHeight: 200,
  //      imageWidth: 100
  //     },
  //    ]
  //   },
  //   {
  //    type: "html",
  //    name: "question1_9",
  //    html: "<span style=\"font-weight:600;\">Which activity do you think "+(isIntel?"you were doing when the Smart Camera took the photo":"the Smart Camera wearer was doing")+"?</span> <br/><i style='font-size:smaller; font-weight:normal'> Hint: it is ONE of the following activities. <br/><span style=\"color:red\">Note: you must select <strong>at least one activity but not too many</strong> as NOT very unlikely. You might be disqualified from the HIT if you don’t pay enough attention. Please choose carefully. </span></i> "
  //   },
  //   {
  //    type: "matrix",
  //    name: "q"+imageOrder[index]+"-01",
  //    defaultValue: {
  //     "Walking Outdoors": "Very Unlikely<br/>1",
  //     Biking: "Very Unlikely<br/>1",
  //     Eating: "Very Unlikely<br/>1",
  //     "Public Transport": "Very Unlikely<br/>1",
  //     Shopping: "Very Unlikely<br/>1",
  //     "Talking and Socializing": "Very Unlikely<br/>1",
  //     "Watching TV": "Very Unlikely<br/>1",
  //     "Cleaning and chores": "Very Unlikely<br/>1",
  //     Cooking: "Very Unlikely<br/>1"
  //    },
  //    isRequired: true,
  //    validators: [
  //     {
  //      type: "expression",
  //      text: "Please select at least one activity as NOT very unlikely.",
  //      expression: "{q"+imageOrder[index]+"-01.Walking Outdoors} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Biking} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Public Transport} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Eating} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Shopping} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Talking and Socializing} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Watching TV} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Cleaning and chores} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Cooking} <> \"Very Unlikely<br/>1\""
  //     }
  //    ],
  //    titleLocation: "hidden",
  //    columns: [
  //     "Very Unlikely<br/>1",
  //     "2",
  //     "3",
  //     "Neither Unlikely <br/>nor Likely<br/>4",
  //     "5",
  //     "6",
  //     "Very Likely<br/>7"
  //    ],
  //    rows: [
  //     "Walking Outdoors",
  //     "Biking",
  //     "Public Transport",
  //     "Eating",
  //     "Shopping",
  //     "Talking and Socializing",
  //     "Watching TV",
  //     "Cleaning and chores",
  //     "Cooking"
  //    ],
  //   },
  //  ],
  //  visibleIf: "{question0_0} = true",
  // },
  // {
  //  name: "Task 11",
  //  elements: [
  //   {
  //    type: "html",
  //    name: "question1_1",
  //    html: "<h3 style=\"font-weight:500;\">Task 11 </h3>"
  //   },
  //   {
  //    type: "panel",
  //    name: "panel1_1",
  //    elements: [
  //     {
  //      type: "imagepicker",
  //      name: "question1_4",
  //      width: "330px",
  //      titleLocation: "hidden",
  //      choices: [
  //       {
  //        value: "item1",
  //        imageLink: "figures/img"+imgCond+"/"+imageOrder[index]+"_img.png"
  //       }
  //      ],
  //      imageFit: "fill",
  //      imageHeight: 200,
  //      imageWidth: 270,
  //     },
  //     {
  //      type: "imagepicker",
  //      name: "question1_5",
  //      width: "330px",
  //      startWithNewLine: false,
  //      titleLocation: "hidden",
  //      choices: [
  //       {
  //        value: "item1",
  //        imageLink: "figures/cam"+condIndex+"/"+imageOrder[index]+"_cam.png"
  //       }
  //      ],
  //      visible: withHeatmap,
  //      imageFit: "fill",
  //      imageHeight: 200,
  //      imageWidth: 270,
  //     },
  //     {
  //      type: "imagepicker",
  //      name: "question1_6",
  //      width: "130px",
  //      startWithNewLine: false,
  //      titleLocation: "hidden",
  //      choices: [
  //       {
  //        value: "legend",
  //        imageLink: "figures/common/jetLegend.png"
  //       }
  //      ],
  //      visible: withHeatmap,
  //      imageFit: "fill",
  //      imageHeight: 200,
  //      imageWidth: 100
  //     },
  //    ]
  //   },
  //   {
  //    type: "html",
  //    name: "question1_7",
  //    html: "<span style=\"font-weight:600;\">Your Previous Selection is:</span> "
  //   },
  //   {
  //    type: "matrix",
  //    name: "q"+imageOrder[index]+"-01",
  //    defaultValue: {
  //     "Walking Outdoors": "Very Unlikely<br/>1",
  //     Biking: "Very Unlikely<br/>1",
  //     Eating: "Very Unlikely<br/>1",
  //     "Public Transport": "Very Unlikely<br/>1",
  //     Shopping: "Very Unlikely<br/>1",
  //     "Talking and Socializing": "Very Unlikely<br/>1",
  //     "Watching TV": "Very Unlikely<br/>1",
  //     "Cleaning and chores": "Very Unlikely<br/>1",
  //     Cooking: "Very Unlikely<br/>1"
  //    },
  //    isRequired: true,
  //    validators: [
  //     {
  //      type: "expression",
  //      text: "Please select at least one activity as NOT very unlikely.",
  //      expression: "{q"+imageOrder[index]+"-01.Walking Outdoors} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Biking} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Public Transport} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Eating} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Shopping} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Talking and Socializing} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Watching TV} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Cleaning and chores} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Cooking} <> \"Very Unlikely<br/>1\""
  //     }
  //    ],
  //    titleLocation: "hidden",
  //    columns: [
  //     "Very Unlikely<br/>1",
  //     "2",
  //     "3",
  //     "Neither Unlikely <br/>nor Likely<br/>4",
  //     "5",
  //     "6",
  //     "Very Likely<br/>7"
  //    ],
  //    rows: [
  //     "Walking Outdoors",
  //     "Biking",
  //     "Public Transport",
  //     "Eating",
  //     "Shopping",
  //     "Talking and Socializing",
  //     "Watching TV",
  //     "Cleaning and chores",
  //     "Cooking"
  //    ],
  //   },
  //   {
  //    type: "panel",
  //    name: "panel1_2",
  //    elements: [
  //     {
  //      type: "text",
  //      name: "q"+imageOrder[index]+"-02",
  //      title: "Explain how you identified the activity.",
  //      isRequired: true,
  //     },
  //     {
  //      type: "matrixdropdown",
  //      name: "q"+imageOrder[index]+"-03",
  //      width: "21em",
  //      title: "Please indicate which parts of the image that <i><strong>you think</strong></i> are most important to identifying the activity. <br/><i style='font-size:smaller; font-weight:normal'>Please check the box(es) corresponding to each cell on the photo that you want to select. You may select more than one box.</i>",
  //      defaultValue: {
  //       "1": {
  //        A: false,
  //        B: false,
  //        C: false,
  //        D: false,
  //        E: false
  //       },
  //       "2": {
  //        A: false,
  //        B: false,
  //        C: false,
  //        D: false,
  //        E: false
  //       },
  //       "3": {
  //        A: false,
  //        B: false,
  //        C: false,
  //        D: false,
  //        E: false
  //       },
  //       "4": {
  //        A: false,
  //        B: false,
  //        C: false,
  //        D: false,
  //        E: false
  //       }
  //      },
  //      isRequired: true,
  //      validators: [
  //       {
  //        type: "expression",
  //        text: "Please select at least one cell.",
  //        expression: "{q"+imageOrder[index]+"-03.1.A} = true or {q"+imageOrder[index]+"-03.1.B} = true or {q"+imageOrder[index]+"-03.1.C} = true or {q"+imageOrder[index]+"-03.1.D} = true or {q"+imageOrder[index]+"-03.1.E} = true or {q"+imageOrder[index]+"-03.2.A} = true or {q"+imageOrder[index]+"-03.2.B} = true or {q"+imageOrder[index]+"-03.2.C} = true or {q"+imageOrder[index]+"-03.2.D} = true or {q"+imageOrder[index]+"-03.2.E} = true or {q"+imageOrder[index]+"-03.3.A} = true or {q"+imageOrder[index]+"-03.3.B} = true or {q"+imageOrder[index]+"-03.3.C} = true or {q"+imageOrder[index]+"-03.3.D} = true or {q"+imageOrder[index]+"-03.3.E} = true or {q"+imageOrder[index]+"-03.4.A} = true or {q"+imageOrder[index]+"-03.4.B} = true or {q"+imageOrder[index]+"-03.4.C} = true or {q"+imageOrder[index]+"-03.4.D} = true or {q"+imageOrder[index]+"-03.4.E} = true"
  //       }
  //      ],
  //      columns: [
  //       {
  //        name: "A"
  //       },
  //       {
  //        name: "B"
  //       },
  //       {
  //        name: "C"
  //       },
  //       {
  //        name: "D"
  //       },
  //       {
  //        name: "E"
  //       }
  //      ],
  //      horizontalScroll: true,
  //      cellType: "boolean",
  //      columnColCount: 4,
  //      rows: [
  //       "1",
  //       "2",
  //       "3",
  //       "4"
  //      ]
  //     },
  //     {
  //      type: "imagepicker",
  //      name: "question1_8",
  //      width: "400px",
  //      startWithNewLine: false,
  //      titleLocation: "hidden",
  //      choices: [
  //       {
  //        value: "item1",
  //        imageLink: "figures/img"+imgCond+"/"+imageOrder[index]+"_grid.png"
  //       }
  //      ],
  //      imageFit: "fill",
  //      imageHeight: 240,
  //      imageWidth: 330
  //     },
  //    ]
  //   },
  //   {
  //    type: "panel",
  //    name: "panel1_3",
  //    elements: [
  //     {
  //      type: "rating",
  //      name: "q"+imageOrder[index]+"-04",
  //      title: "It is easy to identify the wearer’s activity in the photo.",
  //      isRequired: true,
  //      rateMin: -3,
  //      rateMax: 3,
  //      minRateDescription: "Strongly disagree",
  //      maxRateDescription: "Strongly agree"
  //     },
  //     {
  //      type: "rating",
  //      name: "q"+imageOrder[index]+"-05",
  //      visible: withHeatmap,
  //      title: "The heatmap is helpful for me to identify the Smart Camera wearer’s activity.",
  //      isRequired: true,
  //      rateMin: -3,
  //      rateMax: 3,
  //      minRateDescription: "Strongly disagree",
  //      maxRateDescription: "Strongly agree"
  //     },
  //     {
  //      type: "rating",
  //      name: "q"+imageOrder[index]+"-06",
  //      visible: isIntel,
  //      title: "I do not mind viewing and storing my wearable camera images blurred as shown to protect the privacy of bystanders.",
  //      isRequired: true,
  //      rateMin: -3,
  //      rateMax: 3,
  //      minRateDescription: "Strongly disagree",
  //      maxRateDescription: "Strongly agree"
  //     },
  //     {
  //      type: "rating",
  //      name: "q"+imageOrder[index]+"-07",
  //      visible: isPrivacy,
  //      title: imageOrder[index]+"I am comfortable to be captured by someone else's wearable camera in a similar photo like the one shown.",
  //      isRequired: true,
  //      rateMin: -3,
  //      rateMax: 3,
  //      minRateDescription: "Strongly disagree",
  //      maxRateDescription: "Strongly agree"
  //     },
  //    ],
  //    title: "Do you agree or disagree with the following statements?"
  //   },
  //   {
  //    type: "text",
  //    name: "q"+imageOrder[index]+"-08",
  //    title: "Explain why you found it easy or difficult to identify the activity.",
  //    isRequired: true,
  //   },
  //   {
  //    type: "text",
  //    name: "q"+imageOrder[index]+"-09",
  //    visible: isIntel,
  //    title: "Explain why you are willing or not willing to blur your images to the level shown to protect the privacy of bystanders.",
  //    isRequired: true,
  //   },
  //   {
  //    type: "text",
  //    name: "q"+imageOrder[index]+"-10",
  //    visible: isPrivacy,
  //    title: "Explain why you are comfortable or not comfortable to be captured in a similar photo like the one shown.",
  //    isRequired: true,
  //   }  
  //  ],
  //  // visibleIf: withHeatmap?"{q0_1} = \"Bus\" \nand {q0_2} = \"Riding a bike\" \nand {q0_3.2.C} = true\nand {q0_3.2.D} = true \nand {q0_4.2.B} = true\nand {q0_4.3.B} = true":"{q0_1} = \"Bus\" \nand {q0_2} = \"Riding a bike\" \nand {q0_3.2.C} = true\nand {q0_3.2.D} = true",
  //  visibleIf: "{question0_0} = true",
  //  questionsOrder: "initial"
  // },
  // /* Task12 */
  // {
  //  name: "Task 12 Pre",
  //  elements: [
  //   {
  //    type: "html",
  //    name: "question1_1",
  //    html: "<h3 style=\"font-weight:500;\">Task 12 </h3>"
  //   },
  //   {
  //    type: "panel",
  //    name: "panel1_1",
  //    elements: [
  //     {
  //      type: "html",
  //      name: "question1_2",
  //      visible: isIntel,
  //      html: "<h4 style=\"font-weight:500;\">Imagine you have been wearing a wearable camera that takes photos automatically every 30 seconds. The following is one of the photos taken some time ago. </h4> "
  //     },
  //     {
  //      type: "html",
  //      name: "question1_3",
  //      visible: isPrivacy,
  //      html: "<h4 style=\"font-weight:500;\">Imagine you are somewhere and someone nearby is wearing a wearable camera that takes photos automatically every 30 seconds. The following is one of the photos taken. </h4> "
  //     },
  //     {
  //      type: "imagepicker",
  //      name: "question1_4",
  //      width: "330px",
  //      titleLocation: "hidden",
  //      choices: [
  //       {
  //        value: "item1",
  //        imageLink: "figures/img"+imgCond+"/"+imageOrder[++index]+"_img.png"
  //       }
  //      ],
  //      imageFit: "fill",
  //      imageHeight: 200,
  //      imageWidth: 270,
  //     },
  //     {
  //      type: "imagepicker",
  //      name: "question1_5",
  //      width: "330px",
  //      startWithNewLine: false,
  //      titleLocation: "hidden",
  //      choices: [
  //       {
  //        value: "item1",
  //        imageLink: "figures/cam"+condIndex+"/"+imageOrder[index]+"_cam.png"
  //       }
  //      ],
  //      visible: withHeatmap,
  //      imageFit: "fill",
  //      imageHeight: 200,
  //      imageWidth: 270,
  //     },
  //     {
  //      type: "imagepicker",
  //      name: "question1_6",
  //      width: "130px",
  //      startWithNewLine: false,
  //      titleLocation: "hidden",
  //      choices: [
  //       {
  //        value: "legend",
  //        imageLink: "figures/common/jetLegend.png"
  //       }
  //      ],
  //      visible: withHeatmap,
  //      imageFit: "fill",
  //      imageHeight: 200,
  //      imageWidth: 100
  //     },
  //    ]
  //   },
  //   {
  //    type: "html",
  //    name: "question1_9",
  //    html: "<span style=\"font-weight:600;\">Which activity do you think "+(isIntel?"you were doing when the Smart Camera took the photo":"the Smart Camera wearer was doing")+"?</span> <br/><i style='font-size:smaller; font-weight:normal'> Hint: it is ONE of the following activities. <br/><span style=\"color:red\">Note: you must select <strong>at least one activity but not too many</strong> as NOT very unlikely. You might be disqualified from the HIT if you don’t pay enough attention. Please choose carefully. </span></i> "
  //   },
  //   {
  //    type: "matrix",
  //    name: "q"+imageOrder[index]+"-01",
  //    defaultValue: {
  //     "Walking Outdoors": "Very Unlikely<br/>1",
  //     Biking: "Very Unlikely<br/>1",
  //     Eating: "Very Unlikely<br/>1",
  //     "Public Transport": "Very Unlikely<br/>1",
  //     Shopping: "Very Unlikely<br/>1",
  //     "Talking and Socializing": "Very Unlikely<br/>1",
  //     "Watching TV": "Very Unlikely<br/>1",
  //     "Cleaning and chores": "Very Unlikely<br/>1",
  //     Cooking: "Very Unlikely<br/>1"
  //    },
  //    isRequired: true,
  //    validators: [
  //     {
  //      type: "expression",
  //      text: "Please select at least one activity as NOT very unlikely.",
  //      expression: "{q"+imageOrder[index]+"-01.Walking Outdoors} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Biking} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Public Transport} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Eating} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Shopping} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Talking and Socializing} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Watching TV} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Cleaning and chores} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Cooking} <> \"Very Unlikely<br/>1\""
  //     }
  //    ],
  //    titleLocation: "hidden",
  //    columns: [
  //     "Very Unlikely<br/>1",
  //     "2",
  //     "3",
  //     "Neither Unlikely <br/>nor Likely<br/>4",
  //     "5",
  //     "6",
  //     "Very Likely<br/>7"
  //    ],
  //    rows: [
  //     "Walking Outdoors",
  //     "Biking",
  //     "Public Transport",
  //     "Eating",
  //     "Shopping",
  //     "Talking and Socializing",
  //     "Watching TV",
  //     "Cleaning and chores",
  //     "Cooking"
  //    ],
  //   },
  //  ],
  //  visibleIf: "{question0_0} = true",
  // },
  // {
  //  name: "Task 12",
  //  elements: [
  //   {
  //    type: "html",
  //    name: "question1_1",
  //    html: "<h3 style=\"font-weight:500;\">Task 12 </h3>"
  //   },
  //   {
  //    type: "panel",
  //    name: "panel1_1",
  //    elements: [
  //     {
  //      type: "imagepicker",
  //      name: "question1_4",
  //      width: "330px",
  //      titleLocation: "hidden",
  //      choices: [
  //       {
  //        value: "item1",
  //        imageLink: "figures/img"+imgCond+"/"+imageOrder[index]+"_img.png"
  //       }
  //      ],
  //      imageFit: "fill",
  //      imageHeight: 200,
  //      imageWidth: 270,
  //     },
  //     {
  //      type: "imagepicker",
  //      name: "question1_5",
  //      width: "330px",
  //      startWithNewLine: false,
  //      titleLocation: "hidden",
  //      choices: [
  //       {
  //        value: "item1",
  //        imageLink: "figures/cam"+condIndex+"/"+imageOrder[index]+"_cam.png"
  //       }
  //      ],
  //      visible: withHeatmap,
  //      imageFit: "fill",
  //      imageHeight: 200,
  //      imageWidth: 270,
  //     },
  //     {
  //      type: "imagepicker",
  //      name: "question1_6",
  //      width: "130px",
  //      startWithNewLine: false,
  //      titleLocation: "hidden",
  //      choices: [
  //       {
  //        value: "legend",
  //        imageLink: "figures/common/jetLegend.png"
  //       }
  //      ],
  //      visible: withHeatmap,
  //      imageFit: "fill",
  //      imageHeight: 200,
  //      imageWidth: 100
  //     },
  //    ]
  //   },
  //   {
  //    type: "html",
  //    name: "question1_7",
  //    html: "<span style=\"font-weight:600;\">Your Previous Selection is:</span> "
  //   },
  //   {
  //    type: "matrix",
  //    name: "q"+imageOrder[index]+"-01",
  //    defaultValue: {
  //     "Walking Outdoors": "Very Unlikely<br/>1",
  //     Biking: "Very Unlikely<br/>1",
  //     Eating: "Very Unlikely<br/>1",
  //     "Public Transport": "Very Unlikely<br/>1",
  //     Shopping: "Very Unlikely<br/>1",
  //     "Talking and Socializing": "Very Unlikely<br/>1",
  //     "Watching TV": "Very Unlikely<br/>1",
  //     "Cleaning and chores": "Very Unlikely<br/>1",
  //     Cooking: "Very Unlikely<br/>1"
  //    },
  //    isRequired: true,
  //    validators: [
  //     {
  //      type: "expression",
  //      text: "Please select at least one activity as NOT very unlikely.",
  //      expression: "{q"+imageOrder[index]+"-01.Walking Outdoors} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Biking} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Public Transport} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Eating} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Shopping} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Talking and Socializing} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Watching TV} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Cleaning and chores} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Cooking} <> \"Very Unlikely<br/>1\""
  //     }
  //    ],
  //    titleLocation: "hidden",
  //    columns: [
  //     "Very Unlikely<br/>1",
  //     "2",
  //     "3",
  //     "Neither Unlikely <br/>nor Likely<br/>4",
  //     "5",
  //     "6",
  //     "Very Likely<br/>7"
  //    ],
  //    rows: [
  //     "Walking Outdoors",
  //     "Biking",
  //     "Public Transport",
  //     "Eating",
  //     "Shopping",
  //     "Talking and Socializing",
  //     "Watching TV",
  //     "Cleaning and chores",
  //     "Cooking"
  //    ],
  //   },
  //   {
  //    type: "panel",
  //    name: "panel1_2",
  //    elements: [
  //     {
  //      type: "text",
  //      name: "q"+imageOrder[index]+"-02",
  //      title: "Explain how you identified the activity.",
  //      isRequired: true,
  //     },
  //     {
  //      type: "matrixdropdown",
  //      name: "q"+imageOrder[index]+"-03",
  //      width: "21em",
  //      title: "Please indicate which parts of the image that <i><strong>you think</strong></i> are most important to identifying the activity. <br/><i style='font-size:smaller; font-weight:normal'>Please check the box(es) corresponding to each cell on the photo that you want to select. You may select more than one box.</i>",
  //      defaultValue: {
  //       "1": {
  //        A: false,
  //        B: false,
  //        C: false,
  //        D: false,
  //        E: false
  //       },
  //       "2": {
  //        A: false,
  //        B: false,
  //        C: false,
  //        D: false,
  //        E: false
  //       },
  //       "3": {
  //        A: false,
  //        B: false,
  //        C: false,
  //        D: false,
  //        E: false
  //       },
  //       "4": {
  //        A: false,
  //        B: false,
  //        C: false,
  //        D: false,
  //        E: false
  //       }
  //      },
  //      isRequired: true,
  //      validators: [
  //       {
  //        type: "expression",
  //        text: "Please select at least one cell.",
  //        expression: "{q"+imageOrder[index]+"-03.1.A} = true or {q"+imageOrder[index]+"-03.1.B} = true or {q"+imageOrder[index]+"-03.1.C} = true or {q"+imageOrder[index]+"-03.1.D} = true or {q"+imageOrder[index]+"-03.1.E} = true or {q"+imageOrder[index]+"-03.2.A} = true or {q"+imageOrder[index]+"-03.2.B} = true or {q"+imageOrder[index]+"-03.2.C} = true or {q"+imageOrder[index]+"-03.2.D} = true or {q"+imageOrder[index]+"-03.2.E} = true or {q"+imageOrder[index]+"-03.3.A} = true or {q"+imageOrder[index]+"-03.3.B} = true or {q"+imageOrder[index]+"-03.3.C} = true or {q"+imageOrder[index]+"-03.3.D} = true or {q"+imageOrder[index]+"-03.3.E} = true or {q"+imageOrder[index]+"-03.4.A} = true or {q"+imageOrder[index]+"-03.4.B} = true or {q"+imageOrder[index]+"-03.4.C} = true or {q"+imageOrder[index]+"-03.4.D} = true or {q"+imageOrder[index]+"-03.4.E} = true"
  //       }
  //      ],
  //      columns: [
  //       {
  //        name: "A"
  //       },
  //       {
  //        name: "B"
  //       },
  //       {
  //        name: "C"
  //       },
  //       {
  //        name: "D"
  //       },
  //       {
  //        name: "E"
  //       }
  //      ],
  //      horizontalScroll: true,
  //      cellType: "boolean",
  //      columnColCount: 4,
  //      rows: [
  //       "1",
  //       "2",
  //       "3",
  //       "4"
  //      ]
  //     },
  //     {
  //      type: "imagepicker",
  //      name: "question1_8",
  //      width: "400px",
  //      startWithNewLine: false,
  //      titleLocation: "hidden",
  //      choices: [
  //       {
  //        value: "item1",
  //        imageLink: "figures/img"+imgCond+"/"+imageOrder[index]+"_grid.png"
  //       }
  //      ],
  //      imageFit: "fill",
  //      imageHeight: 240,
  //      imageWidth: 330
  //     },
  //    ]
  //   },
  //   {
  //    type: "panel",
  //    name: "panel1_3",
  //    elements: [
  //     {
  //      type: "rating",
  //      name: "q"+imageOrder[index]+"-04",
  //      title: "It is easy to identify the wearer’s activity in the photo.",
  //      isRequired: true,
  //      rateMin: -3,
  //      rateMax: 3,
  //      minRateDescription: "Strongly disagree",
  //      maxRateDescription: "Strongly agree"
  //     },
  //     {
  //      type: "rating",
  //      name: "q"+imageOrder[index]+"-05",
  //      visible: withHeatmap,
  //      title: "The heatmap is helpful for me to identify the Smart Camera wearer’s activity.",
  //      isRequired: true,
  //      rateMin: -3,
  //      rateMax: 3,
  //      minRateDescription: "Strongly disagree",
  //      maxRateDescription: "Strongly agree"
  //     },
  //     {
  //      type: "rating",
  //      name: "q"+imageOrder[index]+"-06",
  //      visible: isIntel,
  //      title: "I do not mind viewing and storing my wearable camera images blurred as shown to protect the privacy of bystanders.",
  //      isRequired: true,
  //      rateMin: -3,
  //      rateMax: 3,
  //      minRateDescription: "Strongly disagree",
  //      maxRateDescription: "Strongly agree"
  //     },
  //     {
  //      type: "rating",
  //      name: "q"+imageOrder[index]+"-07",
  //      visible: isPrivacy,
  //      title: imageOrder[index]+"I am comfortable to be captured by someone else's wearable camera in a similar photo like the one shown.",
  //      isRequired: true,
  //      rateMin: -3,
  //      rateMax: 3,
  //      minRateDescription: "Strongly disagree",
  //      maxRateDescription: "Strongly agree"
  //     },
  //    ],
  //    title: "Do you agree or disagree with the following statements?"
  //   },
  //   {
  //    type: "text",
  //    name: "q"+imageOrder[index]+"-08",
  //    title: "Explain why you found it easy or difficult to identify the activity.",
  //    isRequired: true,
  //   },
  //   {
  //    type: "text",
  //    name: "q"+imageOrder[index]+"-09",
  //    visible: isIntel,
  //    title: "Explain why you are willing or not willing to blur your images to the level shown to protect the privacy of bystanders.",
  //    isRequired: true,
  //   },
  //   {
  //    type: "text",
  //    name: "q"+imageOrder[index]+"-10",
  //    visible: isPrivacy,
  //    title: "Explain why you are comfortable or not comfortable to be captured in a similar photo like the one shown.",
  //    isRequired: true,
  //   }  
  //  ],
  //  // visibleIf: withHeatmap?"{q0_1} = \"Bus\" \nand {q0_2} = \"Riding a bike\" \nand {q0_3.2.C} = true\nand {q0_3.2.D} = true \nand {q0_4.2.B} = true\nand {q0_4.3.B} = true":"{q0_1} = \"Bus\" \nand {q0_2} = \"Riding a bike\" \nand {q0_3.2.C} = true\nand {q0_3.2.D} = true",
  //  visibleIf: "{question0_0} = true",
  //  questionsOrder: "initial"
  // },

  // /* Task13 */
  // {
  //  name: "Task 13 Pre",
  //  elements: [
  //   {
  //    type: "html",
  //    name: "question1_1",
  //    html: "<h3 style=\"font-weight:500;\">Task 13 </h3>"
  //   },
  //   {
  //    type: "panel",
  //    name: "panel1_1",
  //    elements: [
  //     {
  //      type: "html",
  //      name: "question1_2",
  //      visible: isIntel,
  //      html: "<h4 style=\"font-weight:500;\">Imagine you have been wearing a wearable camera that takes photos automatically every 30 seconds. The following is one of the photos taken some time ago. </h4> "
  //     },
  //     {
  //      type: "html",
  //      name: "question1_3",
  //      visible: isPrivacy,
  //      html: "<h4 style=\"font-weight:500;\">Imagine you are somewhere and someone nearby is wearing a wearable camera that takes photos automatically every 30 seconds. The following is one of the photos taken. </h4> "
  //     },
  //     {
  //      type: "imagepicker",
  //      name: "question1_4",
  //      width: "330px",
  //      titleLocation: "hidden",
  //      choices: [
  //       {
  //        value: "item1",
  //        imageLink: "figures/img"+imgCond+"/"+imageOrder[++index]+"_img.png"
  //       }
  //      ],
  //      imageFit: "fill",
  //      imageHeight: 200,
  //      imageWidth: 270,
  //     },
  //     {
  //      type: "imagepicker",
  //      name: "question1_5",
  //      width: "330px",
  //      startWithNewLine: false,
  //      titleLocation: "hidden",
  //      choices: [
  //       {
  //        value: "item1",
  //        imageLink: "figures/cam"+condIndex+"/"+imageOrder[index]+"_cam.png"
  //       }
  //      ],
  //      visible: withHeatmap,
  //      imageFit: "fill",
  //      imageHeight: 200,
  //      imageWidth: 270,
  //     },
  //     {
  //      type: "imagepicker",
  //      name: "question1_6",
  //      width: "130px",
  //      startWithNewLine: false,
  //      titleLocation: "hidden",
  //      choices: [
  //       {
  //        value: "legend",
  //        imageLink: "figures/common/jetLegend.png"
  //       }
  //      ],
  //      visible: withHeatmap,
  //      imageFit: "fill",
  //      imageHeight: 200,
  //      imageWidth: 100
  //     },
  //    ]
  //   },
  //   {
  //    type: "html",
  //    name: "question1_9",
  //    html: "<span style=\"font-weight:600;\">Which activity do you think "+(isIntel?"you were doing when the Smart Camera took the photo":"the Smart Camera wearer was doing")+"?</span> <br/><i style='font-size:smaller; font-weight:normal'> Hint: it is ONE of the following activities. <br/><span style=\"color:red\">Note: you must select <strong>at least one activity but not too many</strong> as NOT very unlikely. You might be disqualified from the HIT if you don’t pay enough attention. Please choose carefully. </span></i> "
  //   },
  //   {
  //    type: "matrix",
  //    name: "q"+imageOrder[index]+"-01",
  //    defaultValue: {
  //     "Walking Outdoors": "Very Unlikely<br/>1",
  //     Biking: "Very Unlikely<br/>1",
  //     Eating: "Very Unlikely<br/>1",
  //     "Public Transport": "Very Unlikely<br/>1",
  //     Shopping: "Very Unlikely<br/>1",
  //     "Talking and Socializing": "Very Unlikely<br/>1",
  //     "Watching TV": "Very Unlikely<br/>1",
  //     "Cleaning and chores": "Very Unlikely<br/>1",
  //     Cooking: "Very Unlikely<br/>1"
  //    },
  //    isRequired: true,
  //    validators: [
  //     {
  //      type: "expression",
  //      text: "Please select at least one activity as NOT very unlikely.",
  //      expression: "{q"+imageOrder[index]+"-01.Walking Outdoors} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Biking} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Public Transport} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Eating} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Shopping} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Talking and Socializing} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Watching TV} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Cleaning and chores} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Cooking} <> \"Very Unlikely<br/>1\""
  //     }
  //    ],
  //    titleLocation: "hidden",
  //    columns: [
  //     "Very Unlikely<br/>1",
  //     "2",
  //     "3",
  //     "Neither Unlikely <br/>nor Likely<br/>4",
  //     "5",
  //     "6",
  //     "Very Likely<br/>7"
  //    ],
  //    rows: [
  //     "Walking Outdoors",
  //     "Biking",
  //     "Public Transport",
  //     "Eating",
  //     "Shopping",
  //     "Talking and Socializing",
  //     "Watching TV",
  //     "Cleaning and chores",
  //     "Cooking"
  //    ],
  //   },
  //  ],
  //  visibleIf: "{question0_0} = true",
  // },
  // {
  //  name: "Task 13",
  //  elements: [
  //   {
  //    type: "html",
  //    name: "question1_1",
  //    html: "<h3 style=\"font-weight:500;\">Task 13 </h3>"
  //   },
  //   {
  //    type: "panel",
  //    name: "panel1_1",
  //    elements: [
  //     {
  //      type: "imagepicker",
  //      name: "question1_4",
  //      width: "330px",
  //      titleLocation: "hidden",
  //      choices: [
  //       {
  //        value: "item1",
  //        imageLink: "figures/img"+imgCond+"/"+imageOrder[index]+"_img.png"
  //       }
  //      ],
  //      imageFit: "fill",
  //      imageHeight: 200,
  //      imageWidth: 270,
  //     },
  //     {
  //      type: "imagepicker",
  //      name: "question1_5",
  //      width: "330px",
  //      startWithNewLine: false,
  //      titleLocation: "hidden",
  //      choices: [
  //       {
  //        value: "item1",
  //        imageLink: "figures/cam"+condIndex+"/"+imageOrder[index]+"_cam.png"
  //       }
  //      ],
  //      visible: withHeatmap,
  //      imageFit: "fill",
  //      imageHeight: 200,
  //      imageWidth: 270,
  //     },
  //     {
  //      type: "imagepicker",
  //      name: "question1_6",
  //      width: "130px",
  //      startWithNewLine: false,
  //      titleLocation: "hidden",
  //      choices: [
  //       {
  //        value: "legend",
  //        imageLink: "figures/common/jetLegend.png"
  //       }
  //      ],
  //      visible: withHeatmap,
  //      imageFit: "fill",
  //      imageHeight: 200,
  //      imageWidth: 100
  //     },
  //    ]
  //   },
  //   {
  //    type: "html",
  //    name: "question1_7",
  //    html: "<span style=\"font-weight:600;\">Your Previous Selection is:</span> "
  //   },
  //   {
  //    type: "matrix",
  //    name: "q"+imageOrder[index]+"-01",
  //    defaultValue: {
  //     "Walking Outdoors": "Very Unlikely<br/>1",
  //     Biking: "Very Unlikely<br/>1",
  //     Eating: "Very Unlikely<br/>1",
  //     "Public Transport": "Very Unlikely<br/>1",
  //     Shopping: "Very Unlikely<br/>1",
  //     "Talking and Socializing": "Very Unlikely<br/>1",
  //     "Watching TV": "Very Unlikely<br/>1",
  //     "Cleaning and chores": "Very Unlikely<br/>1",
  //     Cooking: "Very Unlikely<br/>1"
  //    },
  //    isRequired: true,
  //    validators: [
  //     {
  //      type: "expression",
  //      text: "Please select at least one activity as NOT very unlikely.",
  //      expression: "{q"+imageOrder[index]+"-01.Walking Outdoors} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Biking} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Public Transport} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Eating} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Shopping} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Talking and Socializing} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Watching TV} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Cleaning and chores} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Cooking} <> \"Very Unlikely<br/>1\""
  //     }
  //    ],
  //    titleLocation: "hidden",
  //    columns: [
  //     "Very Unlikely<br/>1",
  //     "2",
  //     "3",
  //     "Neither Unlikely <br/>nor Likely<br/>4",
  //     "5",
  //     "6",
  //     "Very Likely<br/>7"
  //    ],
  //    rows: [
  //     "Walking Outdoors",
  //     "Biking",
  //     "Public Transport",
  //     "Eating",
  //     "Shopping",
  //     "Talking and Socializing",
  //     "Watching TV",
  //     "Cleaning and chores",
  //     "Cooking"
  //    ],
  //   },
  //   {
  //    type: "panel",
  //    name: "panel1_2",
  //    elements: [
  //     {
  //      type: "text",
  //      name: "q"+imageOrder[index]+"-02",
  //      title: "Explain how you identified the activity.",
  //      isRequired: true,
  //     },
  //     {
  //      type: "matrixdropdown",
  //      name: "q"+imageOrder[index]+"-03",
  //      width: "21em",
  //      title: "Please indicate which parts of the image that <i><strong>you think</strong></i> are most important to identifying the activity. <br/><i style='font-size:smaller; font-weight:normal'>Please check the box(es) corresponding to each cell on the photo that you want to select. You may select more than one box.</i>",
  //      defaultValue: {
  //       "1": {
  //        A: false,
  //        B: false,
  //        C: false,
  //        D: false,
  //        E: false
  //       },
  //       "2": {
  //        A: false,
  //        B: false,
  //        C: false,
  //        D: false,
  //        E: false
  //       },
  //       "3": {
  //        A: false,
  //        B: false,
  //        C: false,
  //        D: false,
  //        E: false
  //       },
  //       "4": {
  //        A: false,
  //        B: false,
  //        C: false,
  //        D: false,
  //        E: false
  //       }
  //      },
  //      isRequired: true,
  //      validators: [
  //       {
  //        type: "expression",
  //        text: "Please select at least one cell.",
  //        expression: "{q"+imageOrder[index]+"-03.1.A} = true or {q"+imageOrder[index]+"-03.1.B} = true or {q"+imageOrder[index]+"-03.1.C} = true or {q"+imageOrder[index]+"-03.1.D} = true or {q"+imageOrder[index]+"-03.1.E} = true or {q"+imageOrder[index]+"-03.2.A} = true or {q"+imageOrder[index]+"-03.2.B} = true or {q"+imageOrder[index]+"-03.2.C} = true or {q"+imageOrder[index]+"-03.2.D} = true or {q"+imageOrder[index]+"-03.2.E} = true or {q"+imageOrder[index]+"-03.3.A} = true or {q"+imageOrder[index]+"-03.3.B} = true or {q"+imageOrder[index]+"-03.3.C} = true or {q"+imageOrder[index]+"-03.3.D} = true or {q"+imageOrder[index]+"-03.3.E} = true or {q"+imageOrder[index]+"-03.4.A} = true or {q"+imageOrder[index]+"-03.4.B} = true or {q"+imageOrder[index]+"-03.4.C} = true or {q"+imageOrder[index]+"-03.4.D} = true or {q"+imageOrder[index]+"-03.4.E} = true"
  //       }
  //      ],
  //      columns: [
  //       {
  //        name: "A"
  //       },
  //       {
  //        name: "B"
  //       },
  //       {
  //        name: "C"
  //       },
  //       {
  //        name: "D"
  //       },
  //       {
  //        name: "E"
  //       }
  //      ],
  //      horizontalScroll: true,
  //      cellType: "boolean",
  //      columnColCount: 4,
  //      rows: [
  //       "1",
  //       "2",
  //       "3",
  //       "4"
  //      ]
  //     },
  //     {
  //      type: "imagepicker",
  //      name: "question1_8",
  //      width: "400px",
  //      startWithNewLine: false,
  //      titleLocation: "hidden",
  //      choices: [
  //       {
  //        value: "item1",
  //        imageLink: "figures/img"+imgCond+"/"+imageOrder[index]+"_grid.png"
  //       }
  //      ],
  //      imageFit: "fill",
  //      imageHeight: 240,
  //      imageWidth: 330
  //     },
  //    ]
  //   },
  //   {
  //    type: "panel",
  //    name: "panel1_3",
  //    elements: [
  //     {
  //      type: "rating",
  //      name: "q"+imageOrder[index]+"-04",
  //      title: "It is easy to identify the wearer’s activity in the photo.",
  //      isRequired: true,
  //      rateMin: -3,
  //      rateMax: 3,
  //      minRateDescription: "Strongly disagree",
  //      maxRateDescription: "Strongly agree"
  //     },
  //     {
  //      type: "rating",
  //      name: "q"+imageOrder[index]+"-05",
  //      visible: withHeatmap,
  //      title: "The heatmap is helpful for me to identify the Smart Camera wearer’s activity.",
  //      isRequired: true,
  //      rateMin: -3,
  //      rateMax: 3,
  //      minRateDescription: "Strongly disagree",
  //      maxRateDescription: "Strongly agree"
  //     },
  //     {
  //      type: "rating",
  //      name: "q"+imageOrder[index]+"-06",
  //      visible: isIntel,
  //      title: "I do not mind viewing and storing my wearable camera images blurred as shown to protect the privacy of bystanders.",
  //      isRequired: true,
  //      rateMin: -3,
  //      rateMax: 3,
  //      minRateDescription: "Strongly disagree",
  //      maxRateDescription: "Strongly agree"
  //     },
  //     {
  //      type: "rating",
  //      name: "q"+imageOrder[index]+"-07",
  //      visible: isPrivacy,
  //      title: imageOrder[index]+"I am comfortable to be captured by someone else's wearable camera in a similar photo like the one shown.",
  //      isRequired: true,
  //      rateMin: -3,
  //      rateMax: 3,
  //      minRateDescription: "Strongly disagree",
  //      maxRateDescription: "Strongly agree"
  //     },
  //    ],
  //    title: "Do you agree or disagree with the following statements?"
  //   },
  //   {
  //    type: "text",
  //    name: "q"+imageOrder[index]+"-08",
  //    title: "Explain why you found it easy or difficult to identify the activity.",
  //    isRequired: true,
  //   },
  //   {
  //    type: "text",
  //    name: "q"+imageOrder[index]+"-09",
  //    visible: isIntel,
  //    title: "Explain why you are willing or not willing to blur your images to the level shown to protect the privacy of bystanders.",
  //    isRequired: true,
  //   },
  //   {
  //    type: "text",
  //    name: "q"+imageOrder[index]+"-10",
  //    visible: isPrivacy,
  //    title: "Explain why you are comfortable or not comfortable to be captured in a similar photo like the one shown.",
  //    isRequired: true,
  //   }  
  //  ],
  //  // visibleIf: withHeatmap?"{q0_1} = \"Bus\" \nand {q0_2} = \"Riding a bike\" \nand {q0_3.2.C} = true\nand {q0_3.2.D} = true \nand {q0_4.2.B} = true\nand {q0_4.3.B} = true":"{q0_1} = \"Bus\" \nand {q0_2} = \"Riding a bike\" \nand {q0_3.2.C} = true\nand {q0_3.2.D} = true",
  //  visibleIf: "{question0_0} = true",
  //  questionsOrder: "initial"
  // },
  // /* Task14 */
  // {
  //  name: "Task 14 Pre",
  //  elements: [
  //   {
  //    type: "html",
  //    name: "question1_1",
  //    html: "<h3 style=\"font-weight:500;\">Task 14 </h3>"
  //   },
  //   {
  //    type: "panel",
  //    name: "panel1_1",
  //    elements: [
  //     {
  //      type: "html",
  //      name: "question1_2",
  //      visible: isIntel,
  //      html: "<h4 style=\"font-weight:500;\">Imagine you have been wearing a wearable camera that takes photos automatically every 30 seconds. The following is one of the photos taken some time ago. </h4> "
  //     },
  //     {
  //      type: "html",
  //      name: "question1_3",
  //      visible: isPrivacy,
  //      html: "<h4 style=\"font-weight:500;\">Imagine you are somewhere and someone nearby is wearing a wearable camera that takes photos automatically every 30 seconds. The following is one of the photos taken. </h4> "
  //     },
  //     {
  //      type: "imagepicker",
  //      name: "question1_4",
  //      width: "330px",
  //      titleLocation: "hidden",
  //      choices: [
  //       {
  //        value: "item1",
  //        imageLink: "figures/img"+imgCond+"/"+imageOrder[++index]+"_img.png"
  //       }
  //      ],
  //      imageFit: "fill",
  //      imageHeight: 200,
  //      imageWidth: 270,
  //     },
  //     {
  //      type: "imagepicker",
  //      name: "question1_5",
  //      width: "330px",
  //      startWithNewLine: false,
  //      titleLocation: "hidden",
  //      choices: [
  //       {
  //        value: "item1",
  //        imageLink: "figures/cam"+condIndex+"/"+imageOrder[index]+"_cam.png"
  //       }
  //      ],
  //      visible: withHeatmap,
  //      imageFit: "fill",
  //      imageHeight: 200,
  //      imageWidth: 270,
  //     },
  //     {
  //      type: "imagepicker",
  //      name: "question1_6",
  //      width: "130px",
  //      startWithNewLine: false,
  //      titleLocation: "hidden",
  //      choices: [
  //       {
  //        value: "legend",
  //        imageLink: "figures/common/jetLegend.png"
  //       }
  //      ],
  //      visible: withHeatmap,
  //      imageFit: "fill",
  //      imageHeight: 200,
  //      imageWidth: 100
  //     },
  //    ]
  //   },
  //   {
  //    type: "html",
  //    name: "question1_9",
  //    html: "<span style=\"font-weight:600;\">Which activity do you think "+(isIntel?"you were doing when the Smart Camera took the photo":"the Smart Camera wearer was doing")+"?</span> <br/><i style='font-size:smaller; font-weight:normal'> Hint: it is ONE of the following activities. <br/><span style=\"color:red\">Note: you must select <strong>at least one activity but not too many</strong> as NOT very unlikely. You might be disqualified from the HIT if you don’t pay enough attention. Please choose carefully. </span></i> "
  //   },
  //   {
  //    type: "matrix",
  //    name: "q"+imageOrder[index]+"-01",
  //    defaultValue: {
  //     "Walking Outdoors": "Very Unlikely<br/>1",
  //     Biking: "Very Unlikely<br/>1",
  //     Eating: "Very Unlikely<br/>1",
  //     "Public Transport": "Very Unlikely<br/>1",
  //     Shopping: "Very Unlikely<br/>1",
  //     "Talking and Socializing": "Very Unlikely<br/>1",
  //     "Watching TV": "Very Unlikely<br/>1",
  //     "Cleaning and chores": "Very Unlikely<br/>1",
  //     Cooking: "Very Unlikely<br/>1"
  //    },
  //    isRequired: true,
  //    validators: [
  //     {
  //      type: "expression",
  //      text: "Please select at least one activity as NOT very unlikely.",
  //      expression: "{q"+imageOrder[index]+"-01.Walking Outdoors} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Biking} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Public Transport} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Eating} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Shopping} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Talking and Socializing} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Watching TV} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Cleaning and chores} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Cooking} <> \"Very Unlikely<br/>1\""
  //     }
  //    ],
  //    titleLocation: "hidden",
  //    columns: [
  //     "Very Unlikely<br/>1",
  //     "2",
  //     "3",
  //     "Neither Unlikely <br/>nor Likely<br/>4",
  //     "5",
  //     "6",
  //     "Very Likely<br/>7"
  //    ],
  //    rows: [
  //     "Walking Outdoors",
  //     "Biking",
  //     "Public Transport",
  //     "Eating",
  //     "Shopping",
  //     "Talking and Socializing",
  //     "Watching TV",
  //     "Cleaning and chores",
  //     "Cooking"
  //    ],
  //   },
  //  ],
  //  visibleIf: "{question0_0} = true",
  // },
  // {
  //  name: "Task 14",
  //  elements: [
  //   {
  //    type: "html",
  //    name: "question1_1",
  //    html: "<h3 style=\"font-weight:500;\">Task 14 </h3>"
  //   },
  //   {
  //    type: "panel",
  //    name: "panel1_1",
  //    elements: [
  //     {
  //      type: "imagepicker",
  //      name: "question1_4",
  //      width: "330px",
  //      titleLocation: "hidden",
  //      choices: [
  //       {
  //        value: "item1",
  //        imageLink: "figures/img"+imgCond+"/"+imageOrder[index]+"_img.png"
  //       }
  //      ],
  //      imageFit: "fill",
  //      imageHeight: 200,
  //      imageWidth: 270,
  //     },
  //     {
  //      type: "imagepicker",
  //      name: "question1_5",
  //      width: "330px",
  //      startWithNewLine: false,
  //      titleLocation: "hidden",
  //      choices: [
  //       {
  //        value: "item1",
  //        imageLink: "figures/cam"+condIndex+"/"+imageOrder[index]+"_cam.png"
  //       }
  //      ],
  //      visible: withHeatmap,
  //      imageFit: "fill",
  //      imageHeight: 200,
  //      imageWidth: 270,
  //     },
  //     {
  //      type: "imagepicker",
  //      name: "question1_6",
  //      width: "130px",
  //      startWithNewLine: false,
  //      titleLocation: "hidden",
  //      choices: [
  //       {
  //        value: "legend",
  //        imageLink: "figures/common/jetLegend.png"
  //       }
  //      ],
  //      visible: withHeatmap,
  //      imageFit: "fill",
  //      imageHeight: 200,
  //      imageWidth: 100
  //     },
  //    ]
  //   },
  //   {
  //    type: "html",
  //    name: "question1_7",
  //    html: "<span style=\"font-weight:600;\">Your Previous Selection is:</span> "
  //   },
  //   {
  //    type: "matrix",
  //    name: "q"+imageOrder[index]+"-01",
  //    defaultValue: {
  //     "Walking Outdoors": "Very Unlikely<br/>1",
  //     Biking: "Very Unlikely<br/>1",
  //     Eating: "Very Unlikely<br/>1",
  //     "Public Transport": "Very Unlikely<br/>1",
  //     Shopping: "Very Unlikely<br/>1",
  //     "Talking and Socializing": "Very Unlikely<br/>1",
  //     "Watching TV": "Very Unlikely<br/>1",
  //     "Cleaning and chores": "Very Unlikely<br/>1",
  //     Cooking: "Very Unlikely<br/>1"
  //    },
  //    isRequired: true,
  //    validators: [
  //     {
  //      type: "expression",
  //      text: "Please select at least one activity as NOT very unlikely.",
  //      expression: "{q"+imageOrder[index]+"-01.Walking Outdoors} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Biking} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Public Transport} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Eating} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Shopping} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Talking and Socializing} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Watching TV} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Cleaning and chores} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Cooking} <> \"Very Unlikely<br/>1\""
  //     }
  //    ],
  //    titleLocation: "hidden",
  //    columns: [
  //     "Very Unlikely<br/>1",
  //     "2",
  //     "3",
  //     "Neither Unlikely <br/>nor Likely<br/>4",
  //     "5",
  //     "6",
  //     "Very Likely<br/>7"
  //    ],
  //    rows: [
  //     "Walking Outdoors",
  //     "Biking",
  //     "Public Transport",
  //     "Eating",
  //     "Shopping",
  //     "Talking and Socializing",
  //     "Watching TV",
  //     "Cleaning and chores",
  //     "Cooking"
  //    ],
  //   },
  //   {
  //    type: "panel",
  //    name: "panel1_2",
  //    elements: [
  //     {
  //      type: "text",
  //      name: "q"+imageOrder[index]+"-02",
  //      title: "Explain how you identified the activity.",
  //      isRequired: true,
  //     },
  //     {
  //      type: "matrixdropdown",
  //      name: "q"+imageOrder[index]+"-03",
  //      width: "21em",
  //      title: "Please indicate which parts of the image that <i><strong>you think</strong></i> are most important to identifying the activity. <br/><i style='font-size:smaller; font-weight:normal'>Please check the box(es) corresponding to each cell on the photo that you want to select. You may select more than one box.</i>",
  //      defaultValue: {
  //       "1": {
  //        A: false,
  //        B: false,
  //        C: false,
  //        D: false,
  //        E: false
  //       },
  //       "2": {
  //        A: false,
  //        B: false,
  //        C: false,
  //        D: false,
  //        E: false
  //       },
  //       "3": {
  //        A: false,
  //        B: false,
  //        C: false,
  //        D: false,
  //        E: false
  //       },
  //       "4": {
  //        A: false,
  //        B: false,
  //        C: false,
  //        D: false,
  //        E: false
  //       }
  //      },
  //      isRequired: true,
  //      validators: [
  //       {
  //        type: "expression",
  //        text: "Please select at least one cell.",
  //        expression: "{q"+imageOrder[index]+"-03.1.A} = true or {q"+imageOrder[index]+"-03.1.B} = true or {q"+imageOrder[index]+"-03.1.C} = true or {q"+imageOrder[index]+"-03.1.D} = true or {q"+imageOrder[index]+"-03.1.E} = true or {q"+imageOrder[index]+"-03.2.A} = true or {q"+imageOrder[index]+"-03.2.B} = true or {q"+imageOrder[index]+"-03.2.C} = true or {q"+imageOrder[index]+"-03.2.D} = true or {q"+imageOrder[index]+"-03.2.E} = true or {q"+imageOrder[index]+"-03.3.A} = true or {q"+imageOrder[index]+"-03.3.B} = true or {q"+imageOrder[index]+"-03.3.C} = true or {q"+imageOrder[index]+"-03.3.D} = true or {q"+imageOrder[index]+"-03.3.E} = true or {q"+imageOrder[index]+"-03.4.A} = true or {q"+imageOrder[index]+"-03.4.B} = true or {q"+imageOrder[index]+"-03.4.C} = true or {q"+imageOrder[index]+"-03.4.D} = true or {q"+imageOrder[index]+"-03.4.E} = true"
  //       }
  //      ],
  //      columns: [
  //       {
  //        name: "A"
  //       },
  //       {
  //        name: "B"
  //       },
  //       {
  //        name: "C"
  //       },
  //       {
  //        name: "D"
  //       },
  //       {
  //        name: "E"
  //       }
  //      ],
  //      horizontalScroll: true,
  //      cellType: "boolean",
  //      columnColCount: 4,
  //      rows: [
  //       "1",
  //       "2",
  //       "3",
  //       "4"
  //      ]
  //     },
  //     {
  //      type: "imagepicker",
  //      name: "question1_8",
  //      width: "400px",
  //      startWithNewLine: false,
  //      titleLocation: "hidden",
  //      choices: [
  //       {
  //        value: "item1",
  //        imageLink: "figures/img"+imgCond+"/"+imageOrder[index]+"_grid.png"
  //       }
  //      ],
  //      imageFit: "fill",
  //      imageHeight: 240,
  //      imageWidth: 330
  //     },
  //    ]
  //   },
  //   {
  //    type: "panel",
  //    name: "panel1_3",
  //    elements: [
  //     {
  //      type: "rating",
  //      name: "q"+imageOrder[index]+"-04",
  //      title: "It is easy to identify the wearer’s activity in the photo.",
  //      isRequired: true,
  //      rateMin: -3,
  //      rateMax: 3,
  //      minRateDescription: "Strongly disagree",
  //      maxRateDescription: "Strongly agree"
  //     },
  //     {
  //      type: "rating",
  //      name: "q"+imageOrder[index]+"-05",
  //      visible: withHeatmap,
  //      title: "The heatmap is helpful for me to identify the Smart Camera wearer’s activity.",
  //      isRequired: true,
  //      rateMin: -3,
  //      rateMax: 3,
  //      minRateDescription: "Strongly disagree",
  //      maxRateDescription: "Strongly agree"
  //     },
  //     {
  //      type: "rating",
  //      name: "q"+imageOrder[index]+"-06",
  //      visible: isIntel,
  //      title: " I do not mind viewing and storing my wearable camera images blurred as shown to protect the privacy of bystanders.",
  //      isRequired: true,
  //      rateMin: -3,
  //      rateMax: 3,
  //      minRateDescription: "Strongly disagree",
  //      maxRateDescription: "Strongly agree"
  //     },
  //     {
  //      type: "rating",
  //      name: "q"+imageOrder[index]+"-07",
  //      visible: isPrivacy,
  //      title: imageOrder[index]+"I am comfortable to be captured by someone else's wearable camera in a similar photo like the one shown.",
  //      isRequired: true,
  //      rateMin: -3,
  //      rateMax: 3,
  //      minRateDescription: "Strongly disagree",
  //      maxRateDescription: "Strongly agree"
  //     },
  //    ],
  //    title: "Do you agree or disagree with the following statements?"
  //   },
  //   {
  //    type: "text",
  //    name: "q"+imageOrder[index]+"-08",
  //    title: "Explain why you found it easy or difficult to identify the activity.",
  //    isRequired: true,
  //   },
  //   {
  //    type: "text",
  //    name: "q"+imageOrder[index]+"-09",
  //    visible: isIntel,
  //    title: "Explain why you are willing or not willing to blur your images to the level shown to protect the privacy of bystanders.",
  //    isRequired: true,
  //   },
  //   {
  //    type: "text",
  //    name: "q"+imageOrder[index]+"-10",
  //    visible: isPrivacy,
  //    title: "Explain why you are comfortable or not comfortable to be captured in a similar photo like the one shown.",
  //    isRequired: true,
  //   }  
  //  ],
  //  // visibleIf: withHeatmap?"{q0_1} = \"Bus\" \nand {q0_2} = \"Riding a bike\" \nand {q0_3.2.C} = true\nand {q0_3.2.D} = true \nand {q0_4.2.B} = true\nand {q0_4.3.B} = true":"{q0_1} = \"Bus\" \nand {q0_2} = \"Riding a bike\" \nand {q0_3.2.C} = true\nand {q0_3.2.D} = true",
  //  visibleIf: "{question0_0} = true",
  //  questionsOrder: "initial"
  // },
  // /* Task15 */
  // {
  //  name: "Task 15 Pre",
  //  elements: [
  //   {
  //    type: "html",
  //    name: "question1_1",
  //    html: "<h3 style=\"font-weight:500;\">Task 15 </h3>"
  //   },
  //   {
  //    type: "panel",
  //    name: "panel1_1",
  //    elements: [
  //     {
  //      type: "html",
  //      name: "question1_2",
  //      visible: isIntel,
  //      html: "<h4 style=\"font-weight:500;\">Imagine you have been wearing a wearable camera that takes photos automatically every 30 seconds. The following is one of the photos taken some time ago. </h4> "
  //     },
  //     {
  //      type: "html",
  //      name: "question1_3",
  //      visible: isPrivacy,
  //      html: "<h4 style=\"font-weight:500;\">Imagine you are somewhere and someone nearby is wearing a wearable camera that takes photos automatically every 30 seconds. The following is one of the photos taken. </h4> "
  //     },
  //     {
  //      type: "imagepicker",
  //      name: "question1_4",
  //      width: "330px",
  //      titleLocation: "hidden",
  //      choices: [
  //       {
  //        value: "item1",
  //        imageLink: "figures/img"+imgCond+"/"+imageOrder[++index]+"_img.png"
  //       }
  //      ],
  //      imageFit: "fill",
  //      imageHeight: 200,
  //      imageWidth: 270,
  //     },
  //     {
  //      type: "imagepicker",
  //      name: "question1_5",
  //      width: "330px",
  //      startWithNewLine: false,
  //      titleLocation: "hidden",
  //      choices: [
  //       {
  //        value: "item1",
  //        imageLink: "figures/cam"+condIndex+"/"+imageOrder[index]+"_cam.png"
  //       }
  //      ],
  //      visible: withHeatmap,
  //      imageFit: "fill",
  //      imageHeight: 200,
  //      imageWidth: 270,
  //     },
  //     {
  //      type: "imagepicker",
  //      name: "question1_6",
  //      width: "130px",
  //      startWithNewLine: false,
  //      titleLocation: "hidden",
  //      choices: [
  //       {
  //        value: "legend",
  //        imageLink: "figures/common/jetLegend.png"
  //       }
  //      ],
  //      visible: withHeatmap,
  //      imageFit: "fill",
  //      imageHeight: 200,
  //      imageWidth: 100
  //     },
  //    ]
  //   },
  //   {
  //    type: "html",
  //    name: "question1_9",
  //    html: "<span style=\"font-weight:600;\">Which activity do you think "+(isIntel?"you were doing when the Smart Camera took the photo":"the Smart Camera wearer was doing")+"?</span> <br/><i style='font-size:smaller; font-weight:normal'> Hint: it is ONE of the following activities. <br/><span style=\"color:red\">Note: you must select <strong>at least one activity but not too many</strong> as NOT very unlikely. You might be disqualified from the HIT if you don’t pay enough attention. Please choose carefully. </span></i> "
  //   },
  //   {
  //    type: "matrix",
  //    name: "q"+imageOrder[index]+"-01",
  //    defaultValue: {
  //     "Walking Outdoors": "Very Unlikely<br/>1",
  //     Biking: "Very Unlikely<br/>1",
  //     Eating: "Very Unlikely<br/>1",
  //     "Public Transport": "Very Unlikely<br/>1",
  //     Shopping: "Very Unlikely<br/>1",
  //     "Talking and Socializing": "Very Unlikely<br/>1",
  //     "Watching TV": "Very Unlikely<br/>1",
  //     "Cleaning and chores": "Very Unlikely<br/>1",
  //     Cooking: "Very Unlikely<br/>1"
  //    },
  //    isRequired: true,
  //    validators: [
  //     {
  //      type: "expression",
  //      text: "Please select at least one activity as NOT very unlikely.",
  //      expression: "{q"+imageOrder[index]+"-01.Walking Outdoors} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Biking} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Public Transport} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Eating} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Shopping} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Talking and Socializing} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Watching TV} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Cleaning and chores} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Cooking} <> \"Very Unlikely<br/>1\""
  //     }
  //    ],
  //    titleLocation: "hidden",
  //    columns: [
  //     "Very Unlikely<br/>1",
  //     "2",
  //     "3",
  //     "Neither Unlikely <br/>nor Likely<br/>4",
  //     "5",
  //     "6",
  //     "Very Likely<br/>7"
  //    ],
  //    rows: [
  //     "Walking Outdoors",
  //     "Biking",
  //     "Public Transport",
  //     "Eating",
  //     "Shopping",
  //     "Talking and Socializing",
  //     "Watching TV",
  //     "Cleaning and chores",
  //     "Cooking"
  //    ],
  //   },
  //  ],
  //  visibleIf: "{question0_0} = true",
  // },
  // {
  //  name: "Task 15",
  //  elements: [
  //   {
  //    type: "html",
  //    name: "question1_1",
  //    html: "<h3 style=\"font-weight:500;\">Task 15 </h3>"
  //   },
  //   {
  //    type: "panel",
  //    name: "panel1_1",
  //    elements: [
  //     {
  //      type: "imagepicker",
  //      name: "question1_4",
  //      width: "330px",
  //      titleLocation: "hidden",
  //      choices: [
  //       {
  //        value: "item1",
  //        imageLink: "figures/img"+imgCond+"/"+imageOrder[index]+"_img.png"
  //       }
  //      ],
  //      imageFit: "fill",
  //      imageHeight: 200,
  //      imageWidth: 270,
  //     },
  //     {
  //      type: "imagepicker",
  //      name: "question1_5",
  //      width: "330px",
  //      startWithNewLine: false,
  //      titleLocation: "hidden",
  //      choices: [
  //       {
  //        value: "item1",
  //        imageLink: "figures/cam"+condIndex+"/"+imageOrder[index]+"_cam.png"
  //       }
  //      ],
  //      visible: withHeatmap,
  //      imageFit: "fill",
  //      imageHeight: 200,
  //      imageWidth: 270,
  //     },
  //     {
  //      type: "imagepicker",
  //      name: "question1_6",
  //      width: "130px",
  //      startWithNewLine: false,
  //      titleLocation: "hidden",
  //      choices: [
  //       {
  //        value: "legend",
  //        imageLink: "figures/common/jetLegend.png"
  //       }
  //      ],
  //      visible: withHeatmap,
  //      imageFit: "fill",
  //      imageHeight: 200,
  //      imageWidth: 100
  //     },
  //    ]
  //   },
  //   {
  //    type: "html",
  //    name: "question1_7",
  //    html: "<span style=\"font-weight:600;\">Your Previous Selection is:</span> "
  //   },
  //   {
  //    type: "matrix",
  //    name: "q"+imageOrder[index]+"-01",
  //    defaultValue: {
  //     "Walking Outdoors": "Very Unlikely<br/>1",
  //     Biking: "Very Unlikely<br/>1",
  //     Eating: "Very Unlikely<br/>1",
  //     "Public Transport": "Very Unlikely<br/>1",
  //     Shopping: "Very Unlikely<br/>1",
  //     "Talking and Socializing": "Very Unlikely<br/>1",
  //     "Watching TV": "Very Unlikely<br/>1",
  //     "Cleaning and chores": "Very Unlikely<br/>1",
  //     Cooking: "Very Unlikely<br/>1"
  //    },
  //    isRequired: true,
  //    validators: [
  //     {
  //      type: "expression",
  //      text: "Please select at least one activity as NOT very unlikely.",
  //      expression: "{q"+imageOrder[index]+"-01.Walking Outdoors} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Biking} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Public Transport} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Eating} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Shopping} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Talking and Socializing} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Watching TV} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Cleaning and chores} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Cooking} <> \"Very Unlikely<br/>1\""
  //     }
  //    ],
  //    titleLocation: "hidden",
  //    columns: [
  //     "Very Unlikely<br/>1",
  //     "2",
  //     "3",
  //     "Neither Unlikely <br/>nor Likely<br/>4",
  //     "5",
  //     "6",
  //     "Very Likely<br/>7"
  //    ],
  //    rows: [
  //     "Walking Outdoors",
  //     "Biking",
  //     "Public Transport",
  //     "Eating",
  //     "Shopping",
  //     "Talking and Socializing",
  //     "Watching TV",
  //     "Cleaning and chores",
  //     "Cooking"
  //    ],
  //   },
  //   {
  //    type: "panel",
  //    name: "panel1_2",
  //    elements: [
  //     {
  //      type: "text",
  //      name: "q"+imageOrder[index]+"-02",
  //      title: "Explain how you identified the activity.",
  //      isRequired: true,
  //     },
  //     {
  //      type: "matrixdropdown",
  //      name: "q"+imageOrder[index]+"-03",
  //      width: "21em",
  //      title: "Please indicate which parts of the image that <i><strong>you think</strong></i> are most important to identifying the activity. <br/><i style='font-size:smaller; font-weight:normal'>Please check the box(es) corresponding to each cell on the photo that you want to select. You may select more than one box.</i>",
  //      defaultValue: {
  //       "1": {
  //        A: false,
  //        B: false,
  //        C: false,
  //        D: false,
  //        E: false
  //       },
  //       "2": {
  //        A: false,
  //        B: false,
  //        C: false,
  //        D: false,
  //        E: false
  //       },
  //       "3": {
  //        A: false,
  //        B: false,
  //        C: false,
  //        D: false,
  //        E: false
  //       },
  //       "4": {
  //        A: false,
  //        B: false,
  //        C: false,
  //        D: false,
  //        E: false
  //       }
  //      },
  //      isRequired: true,
  //      validators: [
  //       {
  //        type: "expression",
  //        text: "Please select at least one cell.",
  //        expression: "{q"+imageOrder[index]+"-03.1.A} = true or {q"+imageOrder[index]+"-03.1.B} = true or {q"+imageOrder[index]+"-03.1.C} = true or {q"+imageOrder[index]+"-03.1.D} = true or {q"+imageOrder[index]+"-03.1.E} = true or {q"+imageOrder[index]+"-03.2.A} = true or {q"+imageOrder[index]+"-03.2.B} = true or {q"+imageOrder[index]+"-03.2.C} = true or {q"+imageOrder[index]+"-03.2.D} = true or {q"+imageOrder[index]+"-03.2.E} = true or {q"+imageOrder[index]+"-03.3.A} = true or {q"+imageOrder[index]+"-03.3.B} = true or {q"+imageOrder[index]+"-03.3.C} = true or {q"+imageOrder[index]+"-03.3.D} = true or {q"+imageOrder[index]+"-03.3.E} = true or {q"+imageOrder[index]+"-03.4.A} = true or {q"+imageOrder[index]+"-03.4.B} = true or {q"+imageOrder[index]+"-03.4.C} = true or {q"+imageOrder[index]+"-03.4.D} = true or {q"+imageOrder[index]+"-03.4.E} = true"
  //       }
  //      ],
  //      columns: [
  //       {
  //        name: "A"
  //       },
  //       {
  //        name: "B"
  //       },
  //       {
  //        name: "C"
  //       },
  //       {
  //        name: "D"
  //       },
  //       {
  //        name: "E"
  //       }
  //      ],
  //      horizontalScroll: true,
  //      cellType: "boolean",
  //      columnColCount: 4,
  //      rows: [
  //       "1",
  //       "2",
  //       "3",
  //       "4"
  //      ]
  //     },
  //     {
  //      type: "imagepicker",
  //      name: "question1_8",
  //      width: "400px",
  //      startWithNewLine: false,
  //      titleLocation: "hidden",
  //      choices: [
  //       {
  //        value: "item1",
  //        imageLink: "figures/img"+imgCond+"/"+imageOrder[index]+"_grid.png"
  //       }
  //      ],
  //      imageFit: "fill",
  //      imageHeight: 240,
  //      imageWidth: 330
  //     },
  //    ]
  //   },
  //   {
  //    type: "panel",
  //    name: "panel1_3",
  //    elements: [
  //     {
  //      type: "rating",
  //      name: "q"+imageOrder[index]+"-04",
  //      title: "It is easy to identify the wearer’s activity in the photo.",
  //      isRequired: true,
  //      rateMin: -3,
  //      rateMax: 3,
  //      minRateDescription: "Strongly disagree",
  //      maxRateDescription: "Strongly agree"
  //     },
  //     {
  //      type: "rating",
  //      name: "q"+imageOrder[index]+"-05",
  //      visible: withHeatmap,
  //      title: "The heatmap is helpful for me to identify the Smart Camera wearer’s activity.",
  //      isRequired: true,
  //      rateMin: -3,
  //      rateMax: 3,
  //      minRateDescription: "Strongly disagree",
  //      maxRateDescription: "Strongly agree"
  //     },
  //     {
  //      type: "rating",
  //      name: "q"+imageOrder[index]+"-06",
  //      visible: isIntel,
  //      title: " I do not mind viewing and storing my wearable camera images blurred as shown to protect the privacy of bystanders.",
  //      isRequired: true,
  //      rateMin: -3,
  //      rateMax: 3,
  //      minRateDescription: "Strongly disagree",
  //      maxRateDescription: "Strongly agree"
  //     },
  //     {
  //      type: "rating",
  //      name: "q"+imageOrder[index]+"-07",
  //      visible: isPrivacy,
  //      title: imageOrder[index]+"I am comfortable to be captured by someone else's wearable camera in a similar photo like the one shown.",
  //      isRequired: true,
  //      rateMin: -3,
  //      rateMax: 3,
  //      minRateDescription: "Strongly disagree",
  //      maxRateDescription: "Strongly agree"
  //     },
  //    ],
  //    title: "Do you agree or disagree with the following statements?"
  //   },
  //   {
  //    type: "text",
  //    name: "q"+imageOrder[index]+"-08",
  //    title: "Explain why you found it easy or difficult to identify the activity.",
  //    isRequired: true,
  //   },
  //   {
  //    type: "text",
  //    name: "q"+imageOrder[index]+"-09",
  //    visible: isIntel,
  //    title: "Explain why you are willing or not willing to blur your images to the level shown to protect the privacy of bystanders.",
  //    isRequired: true,
  //   },
  //   {
  //    type: "text",
  //    name: "q"+imageOrder[index]+"-10",
  //    visible: isPrivacy,
  //    title: "Explain why you are comfortable or not comfortable to be captured in a similar photo like the one shown.",
  //    isRequired: true,
  //   }  
  //  ],
  //  // visibleIf: withHeatmap?"{q0_1} = \"Bus\" \nand {q0_2} = \"Riding a bike\" \nand {q0_3.2.C} = true\nand {q0_3.2.D} = true \nand {q0_4.2.B} = true\nand {q0_4.3.B} = true":"{q0_1} = \"Bus\" \nand {q0_2} = \"Riding a bike\" \nand {q0_3.2.C} = true\nand {q0_3.2.D} = true",
  //  visibleIf: "{question0_0} = true",
  //  questionsOrder: "initial"
  // },
  // /* Task16 */
  // {
  //  name: "Task 16 Pre",
  //  elements: [
  //   {
  //    type: "html",
  //    name: "question1_1",
  //    html: "<h3 style=\"font-weight:500;\">Task 16 </h3>"
  //   },
  //   {
  //    type: "panel",
  //    name: "panel1_1",
  //    elements: [
  //     {
  //      type: "html",
  //      name: "question1_2",
  //      visible: isIntel,
  //      html: "<h4 style=\"font-weight:500;\">Imagine you have been wearing a wearable camera that takes photos automatically every 30 seconds. The following is one of the photos taken some time ago. </h4> "
  //     },
  //     {
  //      type: "html",
  //      name: "question1_3",
  //      visible: isPrivacy,
  //      html: "<h4 style=\"font-weight:500;\">Imagine you are somewhere and someone nearby is wearing a wearable camera that takes photos automatically every 30 seconds. The following is one of the photos taken. </h4> "
  //     },
  //     {
  //      type: "imagepicker",
  //      name: "question1_4",
  //      width: "330px",
  //      titleLocation: "hidden",
  //      choices: [
  //       {
  //        value: "item1",
  //        imageLink: "figures/img"+imgCond+"/"+imageOrder[++index]+"_img.png"
  //       }
  //      ],
  //      imageFit: "fill",
  //      imageHeight: 200,
  //      imageWidth: 270,
  //     },
  //     {
  //      type: "imagepicker",
  //      name: "question1_5",
  //      width: "330px",
  //      startWithNewLine: false,
  //      titleLocation: "hidden",
  //      choices: [
  //       {
  //        value: "item1",
  //        imageLink: "figures/cam"+condIndex+"/"+imageOrder[index]+"_cam.png"
  //       }
  //      ],
  //      visible: withHeatmap,
  //      imageFit: "fill",
  //      imageHeight: 200,
  //      imageWidth: 270,
  //     },
  //     {
  //      type: "imagepicker",
  //      name: "question1_6",
  //      width: "130px",
  //      startWithNewLine: false,
  //      titleLocation: "hidden",
  //      choices: [
  //       {
  //        value: "legend",
  //        imageLink: "figures/common/jetLegend.png"
  //       }
  //      ],
  //      visible: withHeatmap,
  //      imageFit: "fill",
  //      imageHeight: 200,
  //      imageWidth: 100
  //     },
  //    ]
  //   },
  //   {
  //    type: "html",
  //    name: "question1_9",
  //    html: "<span style=\"font-weight:600;\">Which activity do you think "+(isIntel?"you were doing when the Smart Camera took the photo":"the Smart Camera wearer was doing")+"?</span> <br/><i style='font-size:smaller; font-weight:normal'> Hint: it is ONE of the following activities. <br/><span style=\"color:red\">Note: you must select <strong>at least one activity but not too many</strong> as NOT very unlikely. You might be disqualified from the HIT if you don’t pay enough attention. Please choose carefully. </span></i> "
  //   },
  //   {
  //    type: "matrix",
  //    name: "q"+imageOrder[index]+"-01",
  //    defaultValue: {
  //     "Walking Outdoors": "Very Unlikely<br/>1",
  //     Biking: "Very Unlikely<br/>1",
  //     Eating: "Very Unlikely<br/>1",
  //     "Public Transport": "Very Unlikely<br/>1",
  //     Shopping: "Very Unlikely<br/>1",
  //     "Talking and Socializing": "Very Unlikely<br/>1",
  //     "Watching TV": "Very Unlikely<br/>1",
  //     "Cleaning and chores": "Very Unlikely<br/>1",
  //     Cooking: "Very Unlikely<br/>1"
  //    },
  //    isRequired: true,
  //    validators: [
  //     {
  //      type: "expression",
  //      text: "Please select at least one activity as NOT very unlikely.",
  //      expression: "{q"+imageOrder[index]+"-01.Walking Outdoors} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Biking} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Public Transport} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Eating} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Shopping} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Talking and Socializing} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Watching TV} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Cleaning and chores} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Cooking} <> \"Very Unlikely<br/>1\""
  //     }
  //    ],
  //    titleLocation: "hidden",
  //    columns: [
  //     "Very Unlikely<br/>1",
  //     "2",
  //     "3",
  //     "Neither Unlikely <br/>nor Likely<br/>4",
  //     "5",
  //     "6",
  //     "Very Likely<br/>7"
  //    ],
  //    rows: [
  //     "Walking Outdoors",
  //     "Biking",
  //     "Public Transport",
  //     "Eating",
  //     "Shopping",
  //     "Talking and Socializing",
  //     "Watching TV",
  //     "Cleaning and chores",
  //     "Cooking"
  //    ],
  //   },
  //  ],
  //  visibleIf: "{question0_0} = true",
  // },
  // {
  //  name: "Task 16",
  //  elements: [
  //   {
  //    type: "html",
  //    name: "question1_1",
  //    html: "<h3 style=\"font-weight:500;\">Task 16 </h3>"
  //   },
  //   {
  //    type: "panel",
  //    name: "panel1_1",
  //    elements: [
  //     {
  //      type: "imagepicker",
  //      name: "question1_4",
  //      width: "330px",
  //      titleLocation: "hidden",
  //      choices: [
  //       {
  //        value: "item1",
  //        imageLink: "figures/img"+imgCond+"/"+imageOrder[index]+"_img.png"
  //       }
  //      ],
  //      imageFit: "fill",
  //      imageHeight: 200,
  //      imageWidth: 270,
  //     },
  //     {
  //      type: "imagepicker",
  //      name: "question1_5",
  //      width: "330px",
  //      startWithNewLine: false,
  //      titleLocation: "hidden",
  //      choices: [
  //       {
  //        value: "item1",
  //        imageLink: "figures/cam"+condIndex+"/"+imageOrder[index]+"_cam.png"
  //       }
  //      ],
  //      visible: withHeatmap,
  //      imageFit: "fill",
  //      imageHeight: 200,
  //      imageWidth: 270,
  //     },
  //     {
  //      type: "imagepicker",
  //      name: "question1_6",
  //      width: "130px",
  //      startWithNewLine: false,
  //      titleLocation: "hidden",
  //      choices: [
  //       {
  //        value: "legend",
  //        imageLink: "figures/common/jetLegend.png"
  //       }
  //      ],
  //      visible: withHeatmap,
  //      imageFit: "fill",
  //      imageHeight: 200,
  //      imageWidth: 100
  //     },
  //    ]
  //   },
  //   {
  //    type: "html",
  //    name: "question1_7",
  //    html: "<span style=\"font-weight:600;\">Your Previous Selection is:</span> "
  //   },
  //   {
  //    type: "matrix",
  //    name: "q"+imageOrder[index]+"-01",
  //    defaultValue: {
  //     "Walking Outdoors": "Very Unlikely<br/>1",
  //     Biking: "Very Unlikely<br/>1",
  //     Eating: "Very Unlikely<br/>1",
  //     "Public Transport": "Very Unlikely<br/>1",
  //     Shopping: "Very Unlikely<br/>1",
  //     "Talking and Socializing": "Very Unlikely<br/>1",
  //     "Watching TV": "Very Unlikely<br/>1",
  //     "Cleaning and chores": "Very Unlikely<br/>1",
  //     Cooking: "Very Unlikely<br/>1"
  //    },
  //    isRequired: true,
  //    validators: [
  //     {
  //      type: "expression",
  //      text: "Please select at least one activity as NOT very unlikely.",
  //      expression: "{q"+imageOrder[index]+"-01.Walking Outdoors} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Biking} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Public Transport} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Eating} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Shopping} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Talking and Socializing} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Watching TV} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Cleaning and chores} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Cooking} <> \"Very Unlikely<br/>1\""
  //     }
  //    ],
  //    titleLocation: "hidden",
  //    columns: [
  //     "Very Unlikely<br/>1",
  //     "2",
  //     "3",
  //     "Neither Unlikely <br/>nor Likely<br/>4",
  //     "5",
  //     "6",
  //     "Very Likely<br/>7"
  //    ],
  //    rows: [
  //     "Walking Outdoors",
  //     "Biking",
  //     "Public Transport",
  //     "Eating",
  //     "Shopping",
  //     "Talking and Socializing",
  //     "Watching TV",
  //     "Cleaning and chores",
  //     "Cooking"
  //    ],
  //   },
  //   {
  //    type: "panel",
  //    name: "panel1_2",
  //    elements: [
  //     {
  //      type: "text",
  //      name: "q"+imageOrder[index]+"-02",
  //      title: "Explain how you identified the activity.",
  //      isRequired: true,
  //     },
  //     {
  //      type: "matrixdropdown",
  //      name: "q"+imageOrder[index]+"-03",
  //      width: "21em",
  //      title: "Please indicate which parts of the image that <i><strong>you think</strong></i> are most important to identifying the activity. <br/><i style='font-size:smaller; font-weight:normal'>Please check the box(es) corresponding to each cell on the photo that you want to select. You may select more than one box.</i>",
  //      defaultValue: {
  //       "1": {
  //        A: false,
  //        B: false,
  //        C: false,
  //        D: false,
  //        E: false
  //       },
  //       "2": {
  //        A: false,
  //        B: false,
  //        C: false,
  //        D: false,
  //        E: false
  //       },
  //       "3": {
  //        A: false,
  //        B: false,
  //        C: false,
  //        D: false,
  //        E: false
  //       },
  //       "4": {
  //        A: false,
  //        B: false,
  //        C: false,
  //        D: false,
  //        E: false
  //       }
  //      },
  //      isRequired: true,
  //      validators: [
  //       {
  //        type: "expression",
  //        text: "Please select at least one cell.",
  //        expression: "{q"+imageOrder[index]+"-03.1.A} = true or {q"+imageOrder[index]+"-03.1.B} = true or {q"+imageOrder[index]+"-03.1.C} = true or {q"+imageOrder[index]+"-03.1.D} = true or {q"+imageOrder[index]+"-03.1.E} = true or {q"+imageOrder[index]+"-03.2.A} = true or {q"+imageOrder[index]+"-03.2.B} = true or {q"+imageOrder[index]+"-03.2.C} = true or {q"+imageOrder[index]+"-03.2.D} = true or {q"+imageOrder[index]+"-03.2.E} = true or {q"+imageOrder[index]+"-03.3.A} = true or {q"+imageOrder[index]+"-03.3.B} = true or {q"+imageOrder[index]+"-03.3.C} = true or {q"+imageOrder[index]+"-03.3.D} = true or {q"+imageOrder[index]+"-03.3.E} = true or {q"+imageOrder[index]+"-03.4.A} = true or {q"+imageOrder[index]+"-03.4.B} = true or {q"+imageOrder[index]+"-03.4.C} = true or {q"+imageOrder[index]+"-03.4.D} = true or {q"+imageOrder[index]+"-03.4.E} = true"
  //       }
  //      ],
  //      columns: [
  //       {
  //        name: "A"
  //       },
  //       {
  //        name: "B"
  //       },
  //       {
  //        name: "C"
  //       },
  //       {
  //        name: "D"
  //       },
  //       {
  //        name: "E"
  //       }
  //      ],
  //      horizontalScroll: true,
  //      cellType: "boolean",
  //      columnColCount: 4,
  //      rows: [
  //       "1",
  //       "2",
  //       "3",
  //       "4"
  //      ]
  //     },
  //     {
  //      type: "imagepicker",
  //      name: "question1_8",
  //      width: "400px",
  //      startWithNewLine: false,
  //      titleLocation: "hidden",
  //      choices: [
  //       {
  //        value: "item1",
  //        imageLink: "figures/img"+imgCond+"/"+imageOrder[index]+"_grid.png"
  //       }
  //      ],
  //      imageFit: "fill",
  //      imageHeight: 240,
  //      imageWidth: 330
  //     },
  //    ]
  //   },
  //   {
  //    type: "panel",
  //    name: "panel1_3",
  //    elements: [
  //     {
  //      type: "rating",
  //      name: "q"+imageOrder[index]+"-04",
  //      title: "It is easy to identify the wearer’s activity in the photo.",
  //      isRequired: true,
  //      rateMin: -3,
  //      rateMax: 3,
  //      minRateDescription: "Strongly disagree",
  //      maxRateDescription: "Strongly agree"
  //     },
  //     {
  //      type: "rating",
  //      name: "q"+imageOrder[index]+"-05",
  //      visible: withHeatmap,
  //      title: "The heatmap is helpful for me to identify the Smart Camera wearer’s activity.",
  //      isRequired: true,
  //      rateMin: -3,
  //      rateMax: 3,
  //      minRateDescription: "Strongly disagree",
  //      maxRateDescription: "Strongly agree"
  //     },
  //     {
  //      type: "rating",
  //      name: "q"+imageOrder[index]+"-06",
  //      visible: isIntel,
  //      title: " I do not mind viewing and storing my wearable camera images blurred as shown to protect the privacy of bystanders.",
  //      isRequired: true,
  //      rateMin: -3,
  //      rateMax: 3,
  //      minRateDescription: "Strongly disagree",
  //      maxRateDescription: "Strongly agree"
  //     },
  //     {
  //      type: "rating",
  //      name: "q"+imageOrder[index]+"-07",
  //      visible: isPrivacy,
  //      title: imageOrder[index]+"I am comfortable to be captured by someone else's wearable camera in a similar photo like the one shown.",
  //      isRequired: true,
  //      rateMin: -3,
  //      rateMax: 3,
  //      minRateDescription: "Strongly disagree",
  //      maxRateDescription: "Strongly agree"
  //     },
  //    ],
  //    title: "Do you agree or disagree with the following statements?"
  //   },
  //   {
  //    type: "text",
  //    name: "q"+imageOrder[index]+"-08",
  //    title: "Explain why you found it easy or difficult to identify the activity.",
  //    isRequired: true,
  //   },
  //   {
  //    type: "text",
  //    name: "q"+imageOrder[index]+"-09",
  //    visible: isIntel,
  //    title: "Explain why you are willing or not willing to blur your images to the level shown to protect the privacy of bystanders.",
  //    isRequired: true,
  //   },
  //   {
  //    type: "text",
  //    name: "q"+imageOrder[index]+"-10",
  //    visible: isPrivacy,
  //    title: "Explain why you are comfortable or not comfortable to be captured in a similar photo like the one shown.",
  //    isRequired: true,
  //   }  
  //  ],
  //  // visibleIf: withHeatmap?"{q0_1} = \"Bus\" \nand {q0_2} = \"Riding a bike\" \nand {q0_3.2.C} = true\nand {q0_3.2.D} = true \nand {q0_4.2.B} = true\nand {q0_4.3.B} = true":"{q0_1} = \"Bus\" \nand {q0_2} = \"Riding a bike\" \nand {q0_3.2.C} = true\nand {q0_3.2.D} = true",
  //  visibleIf: "{question0_0} = true",
  //  questionsOrder: "initial"
  // },

  // /* Task17 */
  // {
  //  name: "Task 17 Pre",
  //  elements: [
  //   {
  //    type: "html",
  //    name: "question1_1",
  //    html: "<h3 style=\"font-weight:500;\">Task 17 </h3>"
  //   },
  //   {
  //    type: "panel",
  //    name: "panel1_1",
  //    elements: [
  //     {
  //      type: "html",
  //      name: "question1_2",
  //      visible: isIntel,
  //      html: "<h4 style=\"font-weight:500;\">Imagine you have been wearing a wearable camera that takes photos automatically every 30 seconds. The following is one of the photos taken some time ago. </h4> "
  //     },
  //     {
  //      type: "html",
  //      name: "question1_3",
  //      visible: isPrivacy,
  //      html: "<h4 style=\"font-weight:500;\">Imagine you are somewhere and someone nearby is wearing a wearable camera that takes photos automatically every 30 seconds. The following is one of the photos taken. </h4> "
  //     },
  //     {
  //      type: "imagepicker",
  //      name: "question1_4",
  //      width: "330px",
  //      titleLocation: "hidden",
  //      choices: [
  //       {
  //        value: "item1",
  //        imageLink: "figures/img"+imgCond+"/"+imageOrder[++index]+"_img.png"
  //       }
  //      ],
  //      imageFit: "fill",
  //      imageHeight: 200,
  //      imageWidth: 270,
  //     },
  //     {
  //      type: "imagepicker",
  //      name: "question1_5",
  //      width: "330px",
  //      startWithNewLine: false,
  //      titleLocation: "hidden",
  //      choices: [
  //       {
  //        value: "item1",
  //        imageLink: "figures/cam"+condIndex+"/"+imageOrder[index]+"_cam.png"
  //       }
  //      ],
  //      visible: withHeatmap,
  //      imageFit: "fill",
  //      imageHeight: 200,
  //      imageWidth: 270,
  //     },
  //     {
  //      type: "imagepicker",
  //      name: "question1_6",
  //      width: "130px",
  //      startWithNewLine: false,
  //      titleLocation: "hidden",
  //      choices: [
  //       {
  //        value: "legend",
  //        imageLink: "figures/common/jetLegend.png"
  //       }
  //      ],
  //      visible: withHeatmap,
  //      imageFit: "fill",
  //      imageHeight: 200,
  //      imageWidth: 100
  //     },
  //    ]
  //   },
  //   {
  //    type: "html",
  //    name: "question1_9",
  //    html: "<span style=\"font-weight:600;\">Which activity do you think "+(isIntel?"you were doing when the Smart Camera took the photo":"the Smart Camera wearer was doing")+"?</span> <br/><i style='font-size:smaller; font-weight:normal'> Hint: it is ONE of the following activities. <br/><span style=\"color:red\">Note: you must select <strong>at least one activity but not too many</strong> as NOT very unlikely. You might be disqualified from the HIT if you don’t pay enough attention. Please choose carefully. </span></i> "
  //   },
  //   {
  //    type: "matrix",
  //    name: "q"+imageOrder[index]+"-01",
  //    defaultValue: {
  //     "Walking Outdoors": "Very Unlikely<br/>1",
  //     Biking: "Very Unlikely<br/>1",
  //     Eating: "Very Unlikely<br/>1",
  //     "Public Transport": "Very Unlikely<br/>1",
  //     Shopping: "Very Unlikely<br/>1",
  //     "Talking and Socializing": "Very Unlikely<br/>1",
  //     "Watching TV": "Very Unlikely<br/>1",
  //     "Cleaning and chores": "Very Unlikely<br/>1",
  //     Cooking: "Very Unlikely<br/>1"
  //    },
  //    isRequired: true,
  //    validators: [
  //     {
  //      type: "expression",
  //      text: "Please select at least one activity as NOT very unlikely.",
  //      expression: "{q"+imageOrder[index]+"-01.Walking Outdoors} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Biking} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Public Transport} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Eating} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Shopping} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Talking and Socializing} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Watching TV} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Cleaning and chores} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Cooking} <> \"Very Unlikely<br/>1\""
  //     }
  //    ],
  //    titleLocation: "hidden",
  //    columns: [
  //     "Very Unlikely<br/>1",
  //     "2",
  //     "3",
  //     "Neither Unlikely <br/>nor Likely<br/>4",
  //     "5",
  //     "6",
  //     "Very Likely<br/>7"
  //    ],
  //    rows: [
  //     "Walking Outdoors",
  //     "Biking",
  //     "Public Transport",
  //     "Eating",
  //     "Shopping",
  //     "Talking and Socializing",
  //     "Watching TV",
  //     "Cleaning and chores",
  //     "Cooking"
  //    ],
  //   },
  //  ],
  //  visibleIf: "{question0_0} = true",
  // },
  // {
  //  name: "Task 17",
  //  elements: [
  //   {
  //    type: "html",
  //    name: "question1_1",
  //    html: "<h3 style=\"font-weight:500;\">Task 17 </h3>"
  //   },
  //   {
  //    type: "panel",
  //    name: "panel1_1",
  //    elements: [
  //     {
  //      type: "imagepicker",
  //      name: "question1_4",
  //      width: "330px",
  //      titleLocation: "hidden",
  //      choices: [
  //       {
  //        value: "item1",
  //        imageLink: "figures/img"+imgCond+"/"+imageOrder[index]+"_img.png"
  //       }
  //      ],
  //      imageFit: "fill",
  //      imageHeight: 200,
  //      imageWidth: 270,
  //     },
  //     {
  //      type: "imagepicker",
  //      name: "question1_5",
  //      width: "330px",
  //      startWithNewLine: false,
  //      titleLocation: "hidden",
  //      choices: [
  //       {
  //        value: "item1",
  //        imageLink: "figures/cam"+condIndex+"/"+imageOrder[index]+"_cam.png"
  //       }
  //      ],
  //      visible: withHeatmap,
  //      imageFit: "fill",
  //      imageHeight: 200,
  //      imageWidth: 270,
  //     },
  //     {
  //      type: "imagepicker",
  //      name: "question1_6",
  //      width: "130px",
  //      startWithNewLine: false,
  //      titleLocation: "hidden",
  //      choices: [
  //       {
  //        value: "legend",
  //        imageLink: "figures/common/jetLegend.png"
  //       }
  //      ],
  //      visible: withHeatmap,
  //      imageFit: "fill",
  //      imageHeight: 200,
  //      imageWidth: 100
  //     },
  //    ]
  //   },
  //   {
  //    type: "html",
  //    name: "question1_7",
  //    html: "<span style=\"font-weight:600;\">Your Previous Selection is:</span> "
  //   },
  //   {
  //    type: "matrix",
  //    name: "q"+imageOrder[index]+"-01",
  //    defaultValue: {
  //     "Walking Outdoors": "Very Unlikely<br/>1",
  //     Biking: "Very Unlikely<br/>1",
  //     Eating: "Very Unlikely<br/>1",
  //     "Public Transport": "Very Unlikely<br/>1",
  //     Shopping: "Very Unlikely<br/>1",
  //     "Talking and Socializing": "Very Unlikely<br/>1",
  //     "Watching TV": "Very Unlikely<br/>1",
  //     "Cleaning and chores": "Very Unlikely<br/>1",
  //     Cooking: "Very Unlikely<br/>1"
  //    },
  //    isRequired: true,
  //    validators: [
  //     {
  //      type: "expression",
  //      text: "Please select at least one activity as NOT very unlikely.",
  //      expression: "{q"+imageOrder[index]+"-01.Walking Outdoors} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Biking} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Public Transport} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Eating} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Shopping} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Talking and Socializing} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Watching TV} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Cleaning and chores} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Cooking} <> \"Very Unlikely<br/>1\""
  //     }
  //    ],
  //    titleLocation: "hidden",
  //    columns: [
  //     "Very Unlikely<br/>1",
  //     "2",
  //     "3",
  //     "Neither Unlikely <br/>nor Likely<br/>4",
  //     "5",
  //     "6",
  //     "Very Likely<br/>7"
  //    ],
  //    rows: [
  //     "Walking Outdoors",
  //     "Biking",
  //     "Public Transport",
  //     "Eating",
  //     "Shopping",
  //     "Talking and Socializing",
  //     "Watching TV",
  //     "Cleaning and chores",
  //     "Cooking"
  //    ],
  //   },
  //   {
  //    type: "panel",
  //    name: "panel1_2",
  //    elements: [
  //     {
  //      type: "text",
  //      name: "q"+imageOrder[index]+"-02",
  //      title: "Explain how you identified the activity.",
  //      isRequired: true,
  //     },
  //     {
  //      type: "matrixdropdown",
  //      name: "q"+imageOrder[index]+"-03",
  //      width: "21em",
  //      title: "Please indicate which parts of the image that <i><strong>you think</strong></i> are most important to identifying the activity. <br/><i style='font-size:smaller; font-weight:normal'>Please check the box(es) corresponding to each cell on the photo that you want to select. You may select more than one box.</i>",
  //      defaultValue: {
  //       "1": {
  //        A: false,
  //        B: false,
  //        C: false,
  //        D: false,
  //        E: false
  //       },
  //       "2": {
  //        A: false,
  //        B: false,
  //        C: false,
  //        D: false,
  //        E: false
  //       },
  //       "3": {
  //        A: false,
  //        B: false,
  //        C: false,
  //        D: false,
  //        E: false
  //       },
  //       "4": {
  //        A: false,
  //        B: false,
  //        C: false,
  //        D: false,
  //        E: false
  //       }
  //      },
  //      isRequired: true,
  //      validators: [
  //       {
  //        type: "expression",
  //        text: "Please select at least one cell.",
  //        expression: "{q"+imageOrder[index]+"-03.1.A} = true or {q"+imageOrder[index]+"-03.1.B} = true or {q"+imageOrder[index]+"-03.1.C} = true or {q"+imageOrder[index]+"-03.1.D} = true or {q"+imageOrder[index]+"-03.1.E} = true or {q"+imageOrder[index]+"-03.2.A} = true or {q"+imageOrder[index]+"-03.2.B} = true or {q"+imageOrder[index]+"-03.2.C} = true or {q"+imageOrder[index]+"-03.2.D} = true or {q"+imageOrder[index]+"-03.2.E} = true or {q"+imageOrder[index]+"-03.3.A} = true or {q"+imageOrder[index]+"-03.3.B} = true or {q"+imageOrder[index]+"-03.3.C} = true or {q"+imageOrder[index]+"-03.3.D} = true or {q"+imageOrder[index]+"-03.3.E} = true or {q"+imageOrder[index]+"-03.4.A} = true or {q"+imageOrder[index]+"-03.4.B} = true or {q"+imageOrder[index]+"-03.4.C} = true or {q"+imageOrder[index]+"-03.4.D} = true or {q"+imageOrder[index]+"-03.4.E} = true"
  //       }
  //      ],
  //      columns: [
  //       {
  //        name: "A"
  //       },
  //       {
  //        name: "B"
  //       },
  //       {
  //        name: "C"
  //       },
  //       {
  //        name: "D"
  //       },
  //       {
  //        name: "E"
  //       }
  //      ],
  //      horizontalScroll: true,
  //      cellType: "boolean",
  //      columnColCount: 4,
  //      rows: [
  //       "1",
  //       "2",
  //       "3",
  //       "4"
  //      ]
  //     },
  //     {
  //      type: "imagepicker",
  //      name: "question1_8",
  //      width: "400px",
  //      startWithNewLine: false,
  //      titleLocation: "hidden",
  //      choices: [
  //       {
  //        value: "item1",
  //        imageLink: "figures/img"+imgCond+"/"+imageOrder[index]+"_grid.png"
  //       }
  //      ],
  //      imageFit: "fill",
  //      imageHeight: 240,
  //      imageWidth: 330
  //     },
  //    ]
  //   },
  //   {
  //    type: "panel",
  //    name: "panel1_3",
  //    elements: [
  //     {
  //      type: "rating",
  //      name: "q"+imageOrder[index]+"-04",
  //      title: "It is easy to identify the wearer’s activity in the photo.",
  //      isRequired: true,
  //      rateMin: -3,
  //      rateMax: 3,
  //      minRateDescription: "Strongly disagree",
  //      maxRateDescription: "Strongly agree"
  //     },
  //     {
  //      type: "rating",
  //      name: "q"+imageOrder[index]+"-05",
  //      visible: withHeatmap,
  //      title: "The heatmap is helpful for me to identify the Smart Camera wearer’s activity.",
  //      isRequired: true,
  //      rateMin: -3,
  //      rateMax: 3,
  //      minRateDescription: "Strongly disagree",
  //      maxRateDescription: "Strongly agree"
  //     },
  //     {
  //      type: "rating",
  //      name: "q"+imageOrder[index]+"-06",
  //      visible: isIntel,
  //      title: " I do not mind viewing and storing my wearable camera images blurred as shown to protect the privacy of bystanders.",
  //      isRequired: true,
  //      rateMin: -3,
  //      rateMax: 3,
  //      minRateDescription: "Strongly disagree",
  //      maxRateDescription: "Strongly agree"
  //     },
  //     {
  //      type: "rating",
  //      name: "q"+imageOrder[index]+"-07",
  //      visible: isPrivacy,
  //      title: imageOrder[index]+"I am comfortable to be captured by someone else's wearable camera in a similar photo like the one shown.",
  //      isRequired: true,
  //      rateMin: -3,
  //      rateMax: 3,
  //      minRateDescription: "Strongly disagree",
  //      maxRateDescription: "Strongly agree"
  //     },
  //    ],
  //    title: "Do you agree or disagree with the following statements?"
  //   },
  //   {
  //    type: "text",
  //    name: "q"+imageOrder[index]+"-08",
  //    title: "Explain why you found it easy or difficult to identify the activity.",
  //    isRequired: true,
  //   },
  //   {
  //    type: "text",
  //    name: "q"+imageOrder[index]+"-09",
  //    visible: isIntel,
  //    title: "Explain why you are willing or not willing to blur your images to the level shown to protect the privacy of bystanders.",
  //    isRequired: true,
  //   },
  //   {
  //    type: "text",
  //    name: "q"+imageOrder[index]+"-10",
  //    visible: isPrivacy,
  //    title: "Explain why you are comfortable or not comfortable to be captured in a similar photo like the one shown.",
  //    isRequired: true,
  //   }  
  //  ],
  //  // visibleIf: withHeatmap?"{q0_1} = \"Bus\" \nand {q0_2} = \"Riding a bike\" \nand {q0_3.2.C} = true\nand {q0_3.2.D} = true \nand {q0_4.2.B} = true\nand {q0_4.3.B} = true":"{q0_1} = \"Bus\" \nand {q0_2} = \"Riding a bike\" \nand {q0_3.2.C} = true\nand {q0_3.2.D} = true",
  //  visibleIf: "{question0_0} = true",
  //  questionsOrder: "initial"
  // },
  // /* Task18 */
  // {
  //  name: "Task 18 Pre",
  //  elements: [
  //   {
  //    type: "html",
  //    name: "question1_1",
  //    html: "<h3 style=\"font-weight:500;\">Task 18 </h3>"
  //   },
  //   {
  //    type: "panel",
  //    name: "panel1_1",
  //    elements: [
  //     {
  //      type: "html",
  //      name: "question1_2",
  //      visible: isIntel,
  //      html: "<h4 style=\"font-weight:500;\">Imagine you have been wearing a wearable camera that takes photos automatically every 30 seconds. The following is one of the photos taken some time ago. </h4> "
  //     },
  //     {
  //      type: "html",
  //      name: "question1_3",
  //      visible: isPrivacy,
  //      html: "<h4 style=\"font-weight:500;\">Imagine you are somewhere and someone nearby is wearing a wearable camera that takes photos automatically every 30 seconds. The following is one of the photos taken. </h4> "
  //     },
  //     {
  //      type: "imagepicker",
  //      name: "question1_4",
  //      width: "330px",
  //      titleLocation: "hidden",
  //      choices: [
  //       {
  //        value: "item1",
  //        imageLink: "figures/img"+imgCond+"/"+imageOrder[++index]+"_img.png"
  //       }
  //      ],
  //      imageFit: "fill",
  //      imageHeight: 200,
  //      imageWidth: 270,
  //     },
  //     {
  //      type: "imagepicker",
  //      name: "question1_5",
  //      width: "330px",
  //      startWithNewLine: false,
  //      titleLocation: "hidden",
  //      choices: [
  //       {
  //        value: "item1",
  //        imageLink: "figures/cam"+condIndex+"/"+imageOrder[index]+"_cam.png"
  //       }
  //      ],
  //      visible: withHeatmap,
  //      imageFit: "fill",
  //      imageHeight: 200,
  //      imageWidth: 270,
  //     },
  //     {
  //      type: "imagepicker",
  //      name: "question1_6",
  //      width: "130px",
  //      startWithNewLine: false,
  //      titleLocation: "hidden",
  //      choices: [
  //       {
  //        value: "legend",
  //        imageLink: "figures/common/jetLegend.png"
  //       }
  //      ],
  //      visible: withHeatmap,
  //      imageFit: "fill",
  //      imageHeight: 200,
  //      imageWidth: 100
  //     },
  //    ]
  //   },
  //   {
  //    type: "html",
  //    name: "question1_9",
  //    html: "<span style=\"font-weight:600;\">Which activity do you think "+(isIntel?"you were doing when the Smart Camera took the photo":"the Smart Camera wearer was doing")+"?</span> <br/><i style='font-size:smaller; font-weight:normal'> Hint: it is ONE of the following activities. <br/><span style=\"color:red\">Note: you must select <strong>at least one activity but not too many</strong> as NOT very unlikely. You might be disqualified from the HIT if you don’t pay enough attention. Please choose carefully. </span></i> "
  //   },
  //   {
  //    type: "matrix",
  //    name: "q"+imageOrder[index]+"-01",
  //    defaultValue: {
  //     "Walking Outdoors": "Very Unlikely<br/>1",
  //     Biking: "Very Unlikely<br/>1",
  //     Eating: "Very Unlikely<br/>1",
  //     "Public Transport": "Very Unlikely<br/>1",
  //     Shopping: "Very Unlikely<br/>1",
  //     "Talking and Socializing": "Very Unlikely<br/>1",
  //     "Watching TV": "Very Unlikely<br/>1",
  //     "Cleaning and chores": "Very Unlikely<br/>1",
  //     Cooking: "Very Unlikely<br/>1"
  //    },
  //    isRequired: true,
  //    validators: [
  //     {
  //      type: "expression",
  //      text: "Please select at least one activity as NOT very unlikely.",
  //      expression: "{q"+imageOrder[index]+"-01.Walking Outdoors} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Biking} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Public Transport} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Eating} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Shopping} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Talking and Socializing} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Watching TV} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Cleaning and chores} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Cooking} <> \"Very Unlikely<br/>1\""
  //     }
  //    ],
  //    titleLocation: "hidden",
  //    columns: [
  //     "Very Unlikely<br/>1",
  //     "2",
  //     "3",
  //     "Neither Unlikely <br/>nor Likely<br/>4",
  //     "5",
  //     "6",
  //     "Very Likely<br/>7"
  //    ],
  //    rows: [
  //     "Walking Outdoors",
  //     "Biking",
  //     "Public Transport",
  //     "Eating",
  //     "Shopping",
  //     "Talking and Socializing",
  //     "Watching TV",
  //     "Cleaning and chores",
  //     "Cooking"
  //    ],
  //   },
  //  ],
  //  visibleIf: "{question0_0} = true",
  // },
  // {
  //  name: "Task 18",
  //  elements: [
  //   {
  //    type: "html",
  //    name: "question1_1",
  //    html: "<h3 style=\"font-weight:500;\">Task 18 </h3>"
  //   },
  //   {
  //    type: "panel",
  //    name: "panel1_1",
  //    elements: [
  //     {
  //      type: "imagepicker",
  //      name: "question1_4",
  //      width: "330px",
  //      titleLocation: "hidden",
  //      choices: [
  //       {
  //        value: "item1",
  //        imageLink: "figures/img"+imgCond+"/"+imageOrder[index]+"_img.png"
  //       }
  //      ],
  //      imageFit: "fill",
  //      imageHeight: 200,
  //      imageWidth: 270,
  //     },
  //     {
  //      type: "imagepicker",
  //      name: "question1_5",
  //      width: "330px",
  //      startWithNewLine: false,
  //      titleLocation: "hidden",
  //      choices: [
  //       {
  //        value: "item1",
  //        imageLink: "figures/cam"+condIndex+"/"+imageOrder[index]+"_cam.png"
  //       }
  //      ],
  //      visible: withHeatmap,
  //      imageFit: "fill",
  //      imageHeight: 200,
  //      imageWidth: 270,
  //     },
  //     {
  //      type: "imagepicker",
  //      name: "question1_6",
  //      width: "130px",
  //      startWithNewLine: false,
  //      titleLocation: "hidden",
  //      choices: [
  //       {
  //        value: "legend",
  //        imageLink: "figures/common/jetLegend.png"
  //       }
  //      ],
  //      visible: withHeatmap,
  //      imageFit: "fill",
  //      imageHeight: 200,
  //      imageWidth: 100
  //     },
  //    ]
  //   },
  //   {
  //    type: "html",
  //    name: "question1_7",
  //    html: "<span style=\"font-weight:600;\">Your Previous Selection is:</span> "
  //   },
  //   {
  //    type: "matrix",
  //    name: "q"+imageOrder[index]+"-01",
  //    defaultValue: {
  //     "Walking Outdoors": "Very Unlikely<br/>1",
  //     Biking: "Very Unlikely<br/>1",
  //     Eating: "Very Unlikely<br/>1",
  //     "Public Transport": "Very Unlikely<br/>1",
  //     Shopping: "Very Unlikely<br/>1",
  //     "Talking and Socializing": "Very Unlikely<br/>1",
  //     "Watching TV": "Very Unlikely<br/>1",
  //     "Cleaning and chores": "Very Unlikely<br/>1",
  //     Cooking: "Very Unlikely<br/>1"
  //    },
  //    isRequired: true,
  //    validators: [
  //     {
  //      type: "expression",
  //      text: "Please select at least one activity as NOT very unlikely.",
  //      expression: "{q"+imageOrder[index]+"-01.Walking Outdoors} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Biking} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Public Transport} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Eating} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Shopping} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Talking and Socializing} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Watching TV} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Cleaning and chores} <> \"Very Unlikely<br/>1\"\nor {q"+imageOrder[index]+"-01.Cooking} <> \"Very Unlikely<br/>1\""
  //     }
  //    ],
  //    titleLocation: "hidden",
  //    columns: [
  //     "Very Unlikely<br/>1",
  //     "2",
  //     "3",
  //     "Neither Unlikely <br/>nor Likely<br/>4",
  //     "5",
  //     "6",
  //     "Very Likely<br/>7"
  //    ],
  //    rows: [
  //     "Walking Outdoors",
  //     "Biking",
  //     "Public Transport",
  //     "Eating",
  //     "Shopping",
  //     "Talking and Socializing",
  //     "Watching TV",
  //     "Cleaning and chores",
  //     "Cooking"
  //    ],
  //   },
  //   {
  //    type: "panel",
  //    name: "panel1_2",
  //    elements: [
  //     {
  //      type: "text",
  //      name: "q"+imageOrder[index]+"-02",
  //      title: "Explain how you identified the activity.",
  //      isRequired: true,
  //     },
  //     {
  //      type: "matrixdropdown",
  //      name: "q"+imageOrder[index]+"-03",
  //      width: "21em",
  //      title: "Please indicate which parts of the image that <i><strong>you think</strong></i> are most important to identifying the activity. <br/><i style='font-size:smaller; font-weight:normal'>Please check the box(es) corresponding to each cell on the photo that you want to select. You may select more than one box.</i>",
  //      defaultValue: {
  //       "1": {
  //        A: false,
  //        B: false,
  //        C: false,
  //        D: false,
  //        E: false
  //       },
  //       "2": {
  //        A: false,
  //        B: false,
  //        C: false,
  //        D: false,
  //        E: false
  //       },
  //       "3": {
  //        A: false,
  //        B: false,
  //        C: false,
  //        D: false,
  //        E: false
  //       },
  //       "4": {
  //        A: false,
  //        B: false,
  //        C: false,
  //        D: false,
  //        E: false
  //       }
  //      },
  //      isRequired: true,
  //      validators: [
  //       {
  //        type: "expression",
  //        text: "Please select at least one cell.",
  //        expression: "{q"+imageOrder[index]+"-03.1.A} = true or {q"+imageOrder[index]+"-03.1.B} = true or {q"+imageOrder[index]+"-03.1.C} = true or {q"+imageOrder[index]+"-03.1.D} = true or {q"+imageOrder[index]+"-03.1.E} = true or {q"+imageOrder[index]+"-03.2.A} = true or {q"+imageOrder[index]+"-03.2.B} = true or {q"+imageOrder[index]+"-03.2.C} = true or {q"+imageOrder[index]+"-03.2.D} = true or {q"+imageOrder[index]+"-03.2.E} = true or {q"+imageOrder[index]+"-03.3.A} = true or {q"+imageOrder[index]+"-03.3.B} = true or {q"+imageOrder[index]+"-03.3.C} = true or {q"+imageOrder[index]+"-03.3.D} = true or {q"+imageOrder[index]+"-03.3.E} = true or {q"+imageOrder[index]+"-03.4.A} = true or {q"+imageOrder[index]+"-03.4.B} = true or {q"+imageOrder[index]+"-03.4.C} = true or {q"+imageOrder[index]+"-03.4.D} = true or {q"+imageOrder[index]+"-03.4.E} = true"
  //       }
  //      ],
  //      columns: [
  //       {
  //        name: "A"
  //       },
  //       {
  //        name: "B"
  //       },
  //       {
  //        name: "C"
  //       },
  //       {
  //        name: "D"
  //       },
  //       {
  //        name: "E"
  //       }
  //      ],
  //      horizontalScroll: true,
  //      cellType: "boolean",
  //      columnColCount: 4,
  //      rows: [
  //       "1",
  //       "2",
  //       "3",
  //       "4"
  //      ]
  //     },
  //     {
  //      type: "imagepicker",
  //      name: "question1_8",
  //      width: "400px",
  //      startWithNewLine: false,
  //      titleLocation: "hidden",
  //      choices: [
  //       {
  //        value: "item1",
  //        imageLink: "figures/img"+imgCond+"/"+imageOrder[index]+"_grid.png"
  //       }
  //      ],
  //      imageFit: "fill",
  //      imageHeight: 240,
  //      imageWidth: 330
  //     },
  //    ]
  //   },
  //   {
  //    type: "panel",
  //    name: "panel1_3",
  //    elements: [
  //     {
  //      type: "rating",
  //      name: "q"+imageOrder[index]+"-04",
  //      title: "It is easy to identify the wearer’s activity in the photo.",
  //      isRequired: true,
  //      rateMin: -3,
  //      rateMax: 3,
  //      minRateDescription: "Strongly disagree",
  //      maxRateDescription: "Strongly agree"
  //     },
  //     {
  //      type: "rating",
  //      name: "q"+imageOrder[index]+"-05",
  //      visible: withHeatmap,
  //      title: "The heatmap is helpful for me to identify the Smart Camera wearer’s activity.",
  //      isRequired: true,
  //      rateMin: -3,
  //      rateMax: 3,
  //      minRateDescription: "Strongly disagree",
  //      maxRateDescription: "Strongly agree"
  //     },
  //     {
  //      type: "rating",
  //      name: "q"+imageOrder[index]+"-06",
  //      visible: isIntel,
  //      title: "I do not mind viewing and storing my wearable camera images blurred as shown to protect the privacy of bystanders.",
  //      isRequired: true,
  //      rateMin: -3,
  //      rateMax: 3,
  //      minRateDescription: "Strongly disagree",
  //      maxRateDescription: "Strongly agree"
  //     },
  //     {
  //      type: "rating",
  //      name: "q"+imageOrder[index]+"-07",
  //      visible: isPrivacy,
  //      title: imageOrder[index]+"I am comfortable to be captured by someone else's wearable camera in a similar photo like the one shown.",
  //      isRequired: true,
  //      rateMin: -3,
  //      rateMax: 3,
  //      minRateDescription: "Strongly disagree",
  //      maxRateDescription: "Strongly agree"
  //     },
  //    ],
  //    title: "Do you agree or disagree with the following statements?"
  //   },
  //   {
  //    type: "text",
  //    name: "q"+imageOrder[index]+"-08",
  //    title: "Explain why you found it easy or difficult to identify the activity.",
  //    isRequired: true,
  //   },
  //   {
  //    type: "text",
  //    name: "q"+imageOrder[index]+"-09",
  //    visible: isIntel,
  //    title: "Explain why you are willing or not willing to blur your images to the level shown to protect the privacy of bystanders.",
  //    isRequired: true,
  //   },
  //   {
  //    type: "text",
  //    name: "q"+imageOrder[index]+"-10",
  //    visible: isPrivacy,
  //    title: "Explain why you are comfortable or not comfortable to be captured in a similar photo like the one shown.",
  //    isRequired: true,
  //   }  
  //  ],
  //  // visibleIf: withHeatmap?"{q0_1} = \"Bus\" \nand {q0_2} = \"Riding a bike\" \nand {q0_3.2.C} = true\nand {q0_3.2.D} = true \nand {q0_4.2.B} = true\nand {q0_4.3.B} = true":"{q0_1} = \"Bus\" \nand {q0_2} = \"Riding a bike\" \nand {q0_3.2.C} = true\nand {q0_3.2.D} = true",
  //  visibleIf: "{question0_0} = true",
  //  questionsOrder: "initial"
  // },


  /* Post */
  {
   name: "Post Survey",
   elements: [
    {
     type: "panel",
     name: "panel66",
     elements: [
      {
       type: "text",
       name: "qP-01",
       title: "Enter your Mturk ID",
       isRequired: true
      },
      {
       type: "radiogroup",
       name: "qP-02",
       title: "Which category below includes your age?",
       isRequired: true,
       choices: [
        "18-24",
        "25-29",
        "30-39",
        "40-49",
        "50-59",
        "60 or older"
       ],
       colCount: 0
      },
      {
       type: "radiogroup",
       name: "qP-03",
       title: "What is your gender?",
       isRequired: true,
       hasOther: true,
       choices: [
        {
         value: "Female",
         text: "Female"
        },
        {
         value: "Male",
         text: "Male"
        }
       ],
       colCount: 0
      },
      {
       type: "radiogroup",
       name: "qP-04",
       title: "What is the highest level of school you have completed or the highest degree you have received?",
       isRequired: true,
       choices: [
        "Less than high school degree",
        "High school degree or equivalent (e.g., GED)",
        "Some college but no degree",
        "Associate degree",
        "Bachelor degree",
        "Graduate degree"
       ]
      },
      {
       type: "radiogroup",
       name: "qP-05",
       title: "Which of the following categories best describes your employment status?",
       isRequired: true,
       hasOther: true,
       choices: [
        "Employed",
        "Not employed",
        "Student",
        "Homemaker",
        "Retired",
        "Disabled"
       ]
      }
     ]
    },
    {
     type: "panel",
     name: "panel64",
     elements: [
      {
       type: "rating",
       name: "qP-06",
       title: "I consider myself to be a technology-savvy person.",
       isRequired: true,
       rateMin: -3,
       rateMax: 3,
       minRateDescription: "Strongly disagree",
       maxRateDescription: "Strongly agree"
      },
      {
       type: "rating",
       name: "qP-07",
       title: "I have no problem understanding photographs.",
       isRequired: true,
       rateMin: -3,
       rateMax: 3,
       minRateDescription: "Strongly disagree",
       maxRateDescription: "Strongly agree"
      },
      {
       type: "rating",
       name: "qP-08",
       title: "I do not like to be photographed without my knowledge.",
       isRequired: true,
       rateMin: -3,
       rateMax: 3,
       minRateDescription: "Strongly disagree",
       maxRateDescription: "Strongly agree"
      },
     ],
     title: "Do you agree or disagree with the following statements?"
    },
   ],
   // visibleIf: withHeatmap?"{q0_1} = \"Bus\" \nand {q0_2} = \"Riding a bike\" \nand {q0_3.2.C} = true\nand {q0_3.2.D} = true \nand {q0_4.2.B} = true\nand {q0_4.3.B} = true":"{q0_1} = \"Bus\" \nand {q0_2} = \"Riding a bike\" \nand {q0_3.2.C} = true\nand {q0_3.2.D} = true",
   visibleIf: "{question0_0} = true",
   title: "Post Survey"
  }
 ],
 triggers: [
  {
   type: "setvalue",
   expression: withHeatmap?"{q0_1} = \"Bus\" \nand {q0_2} = \"Riding a bike\" \nand {q0_3.2.C} = true\nand {q0_3.2.D} = true \nand {q0_4.2.B} = true\nand {q0_4.3.B} = true":"{q0_1} = \"Bus\" \nand {q0_2} = \"Riding a bike\" \nand {q0_3.2.C} = true\nand {q0_3.2.D} = true",
   setToName: "question0_0",
   setValue: true
  }
 ],
 showPrevButton: false,
 showQuestionNumbers: "off",
 showProgressBar: "top",
 firstPageIsStarted: true,
}


var timerId = null
var timeText = null
var survey = new Survey.Model(surveyJSON);
var converter = new showdown.Converter();
var myCss = {
    matrix: {root: "table table-striped matrixtable"},
};

/* For Timer */
function renderTime(val) {
    var hours = Math.floor(val / 3600)
    var minutes = Math.floor((val - (hours*3600)) / 60)
    var seconds = Math.floor(val % 60)
    timeText = hours + ":" + minutes + ":" + seconds
}

/* For Timer */
function timerCallback() {
    var page = survey.currentPage
    if(!page) return
    var valueName = "PageNo" + survey.pages.indexOf(page)
    var seconds = survey.getValue(valueName)
    if(seconds == null) seconds = 0
    else seconds ++
    survey.setValue(valueName, seconds)
    renderTime(seconds)
}

/* Write Timer result for each Img */
function countImageTime(){
    var pageList = ["intro", "consent", "training", "screeningQuiz", "quizFail", "surveyStart", "demographics"];
    for (var i = 0; i < pageList.length - 1; i++){
        survey.setValue(pageList[i], survey.getValue("PageNo"+Number(i+1)));
    }
    survey.setValue("quizFail", 0);
    survey.setValue("_qcond", condIndex);               /* conditional index */
    survey.setValue("_qintel", isIntel?"I":"P");        /* privacy or intelligibility*/
    for (var i = 0; i < surveyLength; i++) {
        survey.setValue("img"+imageOrder[i]+"_activity", survey.getValue("PageNo"+Number(i*2+7)));
        survey.setValue("img"+imageOrder[i]+"_activityOpinion", survey.getValue("PageNo"+Number(i*2+8)));  
    }
    survey.setValue(pageList[pageList.length - 1], survey.getValue("PageNo"+Number(pageList.length+(2*imageOrder.length))));
    survey.setValue("code", completeCode);
}

function measureDist(ytrue, ypred){
    var distance = 0
    var rowIndex = ["A","B","C","D","E"];
    for (var i = 0; i < 4; ++i) {
        for (var j = 0; j < 5; ++j){
            if (ytrue[i+1][rowIndex[j]] != ypred[i+1][rowIndex[j]]){ distance++; }
        }
    }
    return distance;
}

function calculateGridGT(jsonName, flag){
    var jsonFile = $.ajax({url:jsonName, async:false});
    var GTvalues = JSON.parse(jsonFile.responseText);
  
    for (var i = 0; i < imageOrder.length; ++i){
        var imgIndex = imageOrder[i];
        var GTvalue = GTvalues[imgIndex+"_cam"]
        var userSelect = survey.getValue("q"+imgIndex+"-03");
        var score = measureDist(GTvalue, userSelect);
        if (flag == 1){
            survey.setValue("q"+imgIndex+"-03-scoreGT", score);
        }
        else{
            survey.setValue("q"+imgIndex+"-03-scoreHeatmap", score);
        }
    }    
}

function addGridScore(){
    calculateGridGT("score9_Th50.json", 1);
    if(withHeatmap){
        if(condIndex == 1 || condIndex == 5 || condIndex == 9){
            calculateGridGT("score9_Th50.json", 0);
        } 
        else{
            calculateGridGT("score"+condIndex+"_Th50.json", 0);
        }     
    }
}

/* Sending Result */
function sendDataToServer(survey) {
    // survey.sendResult('d6f659c0-c240-4f24-afd5-b0f3d7678b9a');          /* For runtime */
    // survey.sendResult('f8f2dbd5-79d2-49cc-9e5e-3a8e5b17716e');            /* For pilot*/
    survey.sendResult('e0d67775-bf80-4ee4-b307-15fe60ab670f');          /* For debug*/
}

/* For Timer */
survey.onCurrentPageChanged.add(function(){
    timerCallback()
});

/* Sending Result */
survey.onComplete.add(function(survey, options) {
    var completed = survey.getValue("qP-01");
    // console.log(result);
    if(typeof(completed)!="undefined"&&completed!=null) {
        // addGridScore();
        countImageTime();
        sendDataToServer(survey);
    }
});

/* Create showdown markdown converter
 ref: https://plnkr.co/edit/Jvou2vokWwvHG7p8TdVa?p=preview */
survey.onTextMarkdown.add(function(survey, options){
    var str = converter.makeHtml(options.text);
    str = str.substring(3);
    str = str.substring(0, str.length - 4);
    options.html = str;
});

survey.onUpdateQuestionCssClasses.add(function (survey, options) {
    var classes = options.cssClasses;
});

/* For Layout */
$("#surveyContainer").Survey({ 
    model: survey,
    css: myCss
});

/* Timer */
timerCallback();
timerId = window.setInterval(function(){
  timerCallback();
}, 1000);
