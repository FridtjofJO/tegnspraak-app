// More API functions here:
// https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/image
// the link to your model provided by Teachable Machine export panel
const URL = "https://teachablemachine.withgoogle.com/models/qVRs6Cg4I/";
let model, webcam, labelContainer, maxPredictions;
// Load the image model and setup the webcam
let cameraIsOn = false;
async function init() {
    if (cameraIsOn === false) {
        cameraIsOn = true;
        const modelURL = URL + "model.json";
        const metadataURL = URL + "metadata.json";
        // load the model and metadata
        // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
        // or files from your local hard drive
        // Note: the pose library adds "tmImage" object to your window (window.tmImage)
        model = await tmImage.load(modelURL, metadataURL);
        maxPredictions = model.getTotalClasses();
        // Convenience function to setup a webcam
        const flip = true; // whether to flip the webcam
        webcam = new tmImage.Webcam(350, 350, flip); // width, height, flip
        await webcam.setup(); // request access to the webcam
        await webcam.play();
        window.requestAnimationFrame(loop);
        predict();
        // append elements to the DOM
        document.getElementById("webcam-container").appendChild(webcam.canvas);
        labelContainer = document.getElementById("label-container");
        for (let i = 0; i < maxPredictions; i++) { // and class labels
            labelContainer.appendChild(document.createElement("div"));
        }
    } else {
        console.log("sry assa, kamera er allerede på, hjelper ikke å trykke igjen")
    }
}
function loop() {
    webcam.update(); // update the webcam frame
    //predict();
    window.requestAnimationFrame(loop);
}

const alleBokstaver = [
    {
        storBokstav: "A",
        litenBokstav: "a"
    },
    {
        storBokstav: "B",
        litenBokstav: "b"
    },
    {
        storBokstav: "C",
        litenBokstav: "c"
    },
    {
        storBokstav: "D",
        litenBokstav: "d"
    },
    {
        storBokstav: "E",
        litenBokstav: "e"
    },
    {
        storBokstav: "F",
        litenBokstav: "f"
    },
    {
        storBokstav: "G",
        litenBokstav: "g"
    },
    {
        storBokstav: "H",
        litenBokstav: "h"
    },
    {
        storBokstav: "I",
        litenBokstav: "i"
    },
    {
        storBokstav: "J",
        litenBokstav: "j"
    },
    {
        storBokstav: "K",
        litenBokstav: "k"
    },
    {
        storBokstav: "L",
        litenBokstav: "l"
    },
    {
        storBokstav: "M",
        litenBokstav: "m"
    },
    {
        storBokstav: "N",
        litenBokstav: "n"
    },
    {
        storBokstav: "O",
        litenBokstav: "o"
    },
    {
        storBokstav: "P",
        litenBokstav: "p"
    },
    {
        storBokstav: "Q",
        litenBokstav: "q"
    },
    {
        storBokstav: "R",
        litenBokstav: "r"
    },
    {
        storBokstav: "S",
        litenBokstav: "s"
    },
    {
        storBokstav: "T",
        litenBokstav: "t"
    },
    {
        storBokstav: "U",
        litenBokstav: "u"
    },
    {
        storBokstav: "V",
        litenBokstav: "v"
    },
    {
        storBokstav: "W",
        litenBokstav: "w"
    },
    {
        storBokstav: "X",
        litenBokstav: "x"
    },
    {
        storBokstav: "Y",
        litenBokstav: "y"
    },
    {
        storBokstav: "Z",
        litenBokstav: "z"
    },
    {
        storBokstav: "Æ",
        litenBokstav: "æ"
    },
    {
        storBokstav: "Ø",
        litenBokstav: "ø"
    },
    {
        storBokstav: "Å",
        litenBokstav: "å"
    }
]

const likhetsProsent = document.querySelector('#likhetsProsent');
let likhetsProsentValue = 1;
// run the webcam image through the image model
async function predict() {
    // predict can take in an image, video or canvas html element
    const prediction = await model.predict(webcam.canvas);
    for (let i = 0; i < maxPredictions; i++) {
        if (prediction[i].probability >= 0.98){
            labelContainer.innerHTML += alleBokstaver[i].litenBokstav;
            let highest = finnHøyest(prediction);
            likhetsProsentValue = (likhetsProsentValue * highest.probability);
            console.log(likhetsProsentValue);
            likhetsProsent.innerHTML = `Nøyaktighet: ${Math.floor(likhetsProsentValue*100)}%`;
        }
        
    }        
    setTimeout(predict, 1300);
}

const finnHøyest = (predictions) => {
    console.log(predictions);
    let highest = predictions[0];
    for (let prediction of predictions){
        if (prediction.probability > highest.probability){
            highest = prediction;
        }
    }
    return highest;
}

const removeBtn = document.querySelector('#removeBtn');
const emptyLabelContainer = () => {
    
}

const addText = () => {
    
}
init();
