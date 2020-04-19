function getJsonData(url) {
  var Httpreq = new XMLHttpRequest(); // a new request
  Httpreq.open("GET",url,false);
  Httpreq.send(null);
  return Httpreq.responseText;
}

function cvtRel(label){
  var arr=["Vague","Early stage","Gaining Traction","Evolving","Established","Expansionary","Growing"];
  return arr[label-1];
}

function cvtLik(label) {
  var arr = ["Potential", "Possible", "Probabble","Business as Usual"];
  return arr[label-1];
}

function cvtImp(label) {
  var arr =["Low","Medium","High"];
  if(label==''){
    return "Empty";
  }
  return arr[label-1];
}
function getRelevance(data){
  var relevance = {};
  for(var i =0; i<data.length;i++){
    relevance[cvtRel(data[i]['relevance'])]=0;
  }
  for(var i =0; i<data.length;i++){
    relevance[cvtRel(data[i]['relevance'])]+=1;
  }
  return relevance;
}

function getLikelihood(data) {
  var likelihood = {};
  for(var i =0; i<data.length;i++){
    likelihood[cvtLik(data[i]['likelihood'])]=0;
  }
  for(var i =0; i<data.length;i++){
    likelihood[cvtLik(data[i]['likelihood'])]+=1;
  }
  return likelihood;
}
function getImpact(data) {
  var impact = {};
  for(var i =0; i<data.length;i++){
    impact[cvtImp(data[i]['Impact'])]=0;
  }
  for(var i =0; i<data.length;i++){
    impact[cvtImp(data[i]['Impact'])]+=1;
  }
  return impact;
}

function genRam(){
  var min = 0;
  var max = 256;
  return Math.random() * (max - min) + min;
}

function getColor(cnt) {
  clr = []
  for(var i=0;i<cnt;i++){
    var c = "rgb("+parseInt(genRam())+","+parseInt(genRam())+","+parseInt(genRam())+")";
    clr.push(c);
  }
  return clr;
}
function cvtPercent(cnt) {
  var s=0;
  for(var i=0;i<cnt.length;i++){
    s+=cnt[i];
  }
  for(var i=0;i<cnt.length;i++){
    cnt[i] = (cnt[i]/s)*100;
  }
  return cnt;
}
function drawGraph(data,type,name){
  var label = [];
  var count = [];
  var c=0;
  for(var dt in data){
    label.push(dt);
    count.push(data[dt]);
    c++;
  }
  count = cvtPercent(count);
  var color = getColor(c);
  var plotData={
      type: type,
      data: {
        labels: label,
        datasets: [{
          label: name,
          data: count,
          backgroundColor:color,
          borderColor: color
        }]
      },
      options: {
          legend: {
              labels: {
                  fontColor: "white"
              }
          }
        }
    };
  return plotData;
}

function getIntensity(data){
  var sum = 0;
  var c = 0;
  for(var i=0;i<data.length;i++){
    // console.log(typeof(data[i]['relevance'])+" "+typeof(data[i]['likelihood']));
    if(data[i]['relevance']!= '' && data[i]['likelihood']!=''){
      sum = sum + parseInt(data[i]['relevance']) * parseInt(data[i]['likelihood']);
      c++;
    }
  }
  // return sum/c;
  return (sum/c);
}

function getRev(data){
  var sum = 0;
  var c = 0;
  for(var i=0;i<data.length;i++){
    // console.log(typeof(data[i]['relevance'])+" "+typeof(data[i]['likelihood']));
    if(data[i]['relevance']!= ''){
      sum = sum + parseInt(data[i]['relevance']);
      c++;
    }
  }
  // return sum/c;
  return (sum/c);
}

function getLik(data){
  var sum = 0;
  var c = 0;
  for(var i=0;i<data.length;i++){
    // console.log(typeof(data[i]['relevance'])+" "+typeof(data[i]['likelihood']));
    if(data[i]['likelihood']!= ''){
      sum = sum + parseInt(data[i]['likelihood']);
      c++;
    }
  }
  // return sum/c;
  return (sum/c);
}
function getData(url = "https://raw.githubusercontent.com/abhishekgupta368/DataViz/master/jsondata.json",type='pie') {
  var data= JSON.parse( getJsonData(url));
  var relevance = getRelevance(data);
  var likelihood = getLikelihood(data);
  var impact = getImpact(data);
  var avg_rev = getRev(data);
  var avg_lik = getLik(data);
  var avg_itn =  getIntensity(data);

  var ctx1 = document.getElementById("canvas1");
  var ctx2 = document.getElementById("canvas2");
  var ctx3 = document.getElementById("canvas3");

  var iten1 = document.getElementById("iten1");
  var iten2 = document.getElementById("iten2");
  var iten3 = document.getElementById("iten3");

  iten1.innerHTML = "Average Relevance: "+avg_rev.toPrecision(3);
  iten2.innerHTML = "Average Likelihood: "+avg_lik.toPrecision(3);
  iten3.innerHTML = "Average Intensity: "+avg_itn.toPrecision(3);

  var myChart1 =  new Chart(ctx1,drawGraph(relevance,type,'Relevance'));
  var myChart2 =  new Chart(ctx2,drawGraph(likelihood,type,'Likelihood'));
  var myChart3 =  new Chart(ctx3,drawGraph(impact,type,'Impact'));

}
