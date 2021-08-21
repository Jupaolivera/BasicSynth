import AudioMotionAnaliyzer from "audiomotion-analyzer";

export const Analyzer_One = (id, analyzer) => {
    const options = {
        bgColor: "hsl(280, 100%, 10%)", // background color (optional) - defaults to '#111'
        dir: "h", // add this property to create a horizontal gradient (optional)
        colorStops: [
            // list your gradient colors in this array (at least 2 entries are required)
            "orange", // colors may be defined in any valid CSS format
            { pos: 1, color: "white" }, // use an object to adjust the position (0 to 1) of a color
            "hsl(280, 100%, 10%)", // colors may be defined in any valid CSS format
        ],
    };
    let audiomotionAnalyzer = new AudioMotionAnaliyzer(
        document.getElementById(id),
        {
            source: analyzer,
            barSpace: 0,
            bgAlpha: 0.9,
            height: 4000,
            width: 5000,
            fftSize: 2048,
            fillAlpha: 0.3,
            gradient: "rainbow",
            lineWidth: 1,
            loRes: false,
            lumiBars: false,
            maxDecibels: -20,
            maxFreq: 22000,
            minDecibels: -80,
            minFreq: 20,
            mirror: 0,
            mode: 10,
            radial: false,
            reflexAlpha: 0.15,
            reflexBright: 1,
            reflexFit: true,
            reflexRatio: 0,
            overlay: true,
            showBgColor: true,
            showFPS: false,
            showLeds: false,
            showPeaks: false,
            showScaleX: true,
            showScaleY: false,
            smoothing: 0.5,
            spinSpeed: 0,
            splitGradient: false,
            start: true,
            stereo: false,
            useCanvas: true,
            volume: 1,
            connectSpeakers: false,
        }
    );
    audiomotionAnalyzer.registerGradient("custom-gradient", options);
    audiomotionAnalyzer.gradient = "custom-gradient";
};

export const Analyzer_Two = (analyser, context, ref) => {
    const CVS = ref.current;
    const CTX = CVS.getContext("2d");
    const W = (CVS.width = window.innerWidth / 2);
    const H = (CVS.height = window.innerHeight);
    context.connect(analyser);
    analyser.fftSize = 4096;
    const DATA = new Uint8Array(analyser.frequencyBinCount);
    const LEN = DATA.length;
    const h = H / LEN;
    const x = W - 1;
    CTX.fillStyle = "hsl(280, 100%, 10%)";
    CTX.fillRect(0, 0, W, H);
    AnalyzerLoop();
    function AnalyzerLoop() {
        window.requestAnimationFrame(AnalyzerLoop);
        let imgData = CTX.getImageData(1, 0, W - 1, H);
        CTX.fillRect(0, 0, W, H);
        CTX.putImageData(imgData, 0, 0);
        analyser.getByteFrequencyData(DATA);
        for (let i = 0; i < LEN; i++) {
            let rat = DATA[i] / 150; // intensidad color
            let hue = Math.round(rat * 120 + (280 % 360));
            let sat = "100%";
            let lit = 10 + 70 * rat + "%";
            CTX.beginPath();
            CTX.strokeStyle = `hsl(${hue}, ${sat}, ${lit})`;
            CTX.moveTo(x, H - i * h * 2.5);
            CTX.lineTo(x, H - (i * h + h) * 2.5);
            CTX.stroke();
        }
    }
};

export const WaveformRender = (analyzer, context, ref) => {
    let WaveformCTX;
    WaveformCTX = ref.current.getContext("2d");
    context.connect(analyzer);
    WaveformLoop();
    function WaveformLoop() {
        let waveArray = analyzer.getValue();
        requestAnimationFrame(WaveformLoop);
        WaveformCTX.fillStyle = "#000000";
        WaveformCTX.lineWidth = 16;
        WaveformCTX.clearRect(
            0,
            0,
            window.innerWidth * 2,
            window.innerHeight * 2
        );
        WaveformCTX.beginPath();
        for (var i = 1; i < waveArray.length; i += 1) {
            let x = (i / waveArray.length) * (window.innerWidth * 2);
            if (i === 0) {
                WaveformCTX.moveTo(0, window.innerHeight + waveArray[i]);
            } else {
                WaveformCTX.lineTo(x, window.innerHeight + waveArray[i] * 1000);
            }
        }

        //WaveformCTX.strokeStyle = "white"; change color
        WaveformCTX.stroke();
    }
};
