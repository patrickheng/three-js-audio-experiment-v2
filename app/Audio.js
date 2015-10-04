export default class Audio {
  constructor(sepValue) {
    let self = this;

    this.ctx = new AudioContext();
    this.audio = document.getElementById('myAudio');
    this.audioSrc = this.ctx.createMediaElementSource(this.audio);
    this.analyser = this.ctx.createAnalyser();
    this.audioData = [];
    this.sepValue = sepValue;

    // Connect the MediaElementSource with the analyser
    this.audioSrc.connect(this.analyser);
    this.audioSrc.connect(this.ctx.destination);

    // FrequencyBinCount tells how many values are receive from the analyser
    this.frequencyData = new Uint8Array(this.analyser.frequencyBinCount);

    this.audio.play();
  };


  getFrequencyData() {
    this.analyser.getByteFrequencyData(this.frequencyData);
    return this.frequencyData;
  };

  getAudioData() {
    this.analyser.getByteFrequencyData(this.frequencyData);

    // Split array into 3
    let frequencyArray = this.splitFrenquencyArray(this.frequencyData,
      this.sepValue);

    // Make average of frenquency array entries
    for (let i = 0; i < frequencyArray.length - 100; i++) {
      let average = 0;

      for (let j = 0; j < frequencyArray[i].length; j++) {
        average += frequencyArray[i][j];
      }
      this.audioData[i] = average / frequencyArray[i].length;
    }
    return this.audioData;
  }

  splitFrenquencyArray(arr, n) {
    let tab = Object.keys(arr).map(function(key) {
      return arr[key]
    });
    let len = tab.length,
      result = [],
      i = 0;

    while (i < len) {
      let size = Math.ceil((len - i) / n--);
      result.push(tab.slice(i, i + size));
      i += size;
    }

    return result;
  }
};
