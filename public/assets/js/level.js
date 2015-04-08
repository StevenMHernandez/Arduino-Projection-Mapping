define(['config'], function (Config) {
  this.randomWord = function () {
    var random = Math.floor(Math.random() * Config.words.length);
    var randomWord = Config.words[random];
    Config.words.splice(random, 1);
    return randomWord;
  };

  return [
    {
      //level 0
      word: 'setup_word',
      columns: {
        count: 1000
      },
      waveform: {
        type: 'saw',
        amplitude: 200
      }
    },
    {
      //level 1
      word: randomWord(),
      columns: {
        count: 200
      },
      waveform: {
        type: 'sine',
        frequency: 10,
        amplitude: 100
      }
    },
    {
      //level 2
      word: randomWord(),
      columns: {
        count: 100
      },
      waveform: {
        type: 'saw',
        frequency: 10,
        amplitude: 1000
      }
    },
    {
      //level 3
      word: 'terrible',
      columns: {
        count: 9
      },
      waveform: {
        type: 'random',
        frequency: 9,
        amplitude: 90
      }
    },
    {
      //level 4
      word: 'minus2',
      columns: {
        count: 200
      },
      waveform: {
        type: 'sine',
        frequency: 10,
        amplitude: 100
      }
    },
    {
      //level 5
      word: '/////|////',
      columns: {
        count: 100
      },
      waveform: {
        type: 'triangle',
        frequency: 10,
        amplitude: 1000
      }
    },
    {
      //level 6
      word: 'would be fitting',
      columns: {
        count: 18
      },
      waveform: {
        type: 'random',
        amplitude: 100
      }
    },
    {
      //level 7
      word: randomWord(),
      columns: {
        count: 200
      },
      waveform: {
        type: 'sine',
        frequency: 10,
        amplitude: 100
      }
    },
    {
      //level 8
      word: 'Mirino',
      columns: {
        count: 88
      },
      waveform: {
        type: 'random',
        amplitude: 88
      }
    }
  ];
});