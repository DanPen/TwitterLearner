var Twitter = require('twitter');
var _ = require('underscore');


readInitial();


var twitter_client = new Twitter({
  consumer_key: 'woXGWao3pUrN3RgJsImQz7Orx',
  consumer_secret: 'lxIXLczRwGT1T2I9j5LOSUKptHGLCwmHInpOTodkyhb9AaaHTP',
  access_token_key: '51293577-YXJp3MRGVwUlweA0Au7rmJSbpRr2WJ07KzUIL92kb',
  access_token_secret: 'gVduMO5fVmMNY7nK4Xk09BpL62FAr6vuTjdoU0Op8RuaX'
})

var twitter_params = {track: 'isis'};
twitter_client.stream('statuses/filter', twitter_params, function (stream) {
  stream.on('data', function(tweet) {
    // console.log();
    // console.log(tweet.text);
    read(tweet);
  });
});





var fs = require('fs');
var stopwords = fs.readFileSync('stopwords_english.txt').toString().split("\n");
console.log(stopwords)

var trainingExamples = [];
var words = [];
var wordCount = [];



function readInitial () {
  var class1Example = "Isis destroys temple that’s been in Syria since 17 AD http://t.co/CN3aPvN5OC";
  var class2Example = "Pentagon Investigates Allegations of Skewed Intelligence Reports on ISIS http://t.co/EHotwaT1Ye";

  var class1Words = strip(class1Example);
  var class2Words = strip(class2Example);

  for (word in class1Words) {
    countWord(class1Words[word]);
  }

  for (word in class2Words) {
    countWord(class2Words[word]);
  }

  trainingExamples.push({
    class: 1,
    words: class1Words
  });

  trainingExamples.push({
    class: 2,
    words: class2Words
  });
}

function read (tweet) {
  var words = strip(tweet);

  for (index in words) {
    countWord(words[index]);
  }

  for (var i = 0; i < trainingExamples.length; i++) {

    var count = intersection(words, trainingExamples[i].words);
    console.log(count);

  }
}

function countWord (word) {
  if (words.indexOf(word) == -1) {    // not in array. add it.
    words.push(word);
    wordCount.push(1);
  }

  else {                             // already in array. increment its use.
    var index = words.indexOf(word);
    wordCount[index] += 1;
  }
}

function strip (sentence) {
  var words = sentence.split(' ');
  var nostop = _.difference(words, stopwords);
  console.log(nostop);
  return nostop;
}
