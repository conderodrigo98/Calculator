$(document).ready(function(){
 //set the functions for every button 
  var accDisplay="";
  
  $(".digit").on("click",function(){
    accDisplay+=$(this).text();
    $("h2").html(accDisplay);
  });
  
   $(".operation").on("click",function(){
    accDisplay+=" "+$(this).text()+" ";
    $("h2").html(accDisplay);
  });
  
  $("#btnAC").on("click",function(){
    accDisplay="";
    $("h2").html(accDisplay);
    $("h3").html(" ");
  });
  
  $("#btnCE").on("click",function(){
    if (accDisplay[accDisplay.length-1]!=" "){
      accDisplay=accDisplay.substring(0,accDisplay.length-1);
    }else{
      accDisplay=accDisplay.substring(0,accDisplay.length-3);
    }
   
    $("h2").html(accDisplay);
  });
  
  $("#btnEquals").on("click",function(){
    $("h3").html(accDisplay);
    accDisplay=getResult(accDisplay);
    $("h2").html(accDisplay);
    accDisplay="";
  });
  
  
  //function to get result
  
  function getResult(input){
    //main algorithm
    if(hasErrors(input)){return "ERROR!";}
    console.log("INPUT= "+input);
    input=input.replace("(  -","( 0 -");
    input=input.replace(/\s{2}/g," ");
    input=input.replace(/\s$/,"");
    var input2=input.split(" ");
    console.log("Spliteo= "+input2);
    input2=findPs(input2);
    input2=calXQ(input2);
    input2=calPlus(input2);
    if (isNaN(input2[0])){return "ERROR!";}
    return input2[0];
    
    //method to calculate sums and differences
    function calPlus(arr){
      while (arr.length>1){
        if (arr[1]=="+"){
          arr[0]=(parseFloat(arr[0])+parseFloat(arr[2])).toPrecision(15);
        }else{
          arr[0]=(parseFloat(arr[0])-parseFloat(arr[2])).toPrecision(15);
        }
        arr.splice(1,2);
      }
      arr[0]=parseFloat(arr[0]);
      return arr;
    }
    
    //method to calculate products and divisions
    function calXQ (arr){
      var i=1;
      while (i<arr.length){
        if (arr[i]=="X"){
          arr[i-1]=(parseFloat(arr[i-1])*parseFloat(arr[i+1])).toPrecision(15);
          arr.splice(i,2);
        }else if (arr[i]=="/"){
          arr[i-1]=(parseFloat(arr[i-1])/parseFloat(arr[i+1])).toPrecision(15);
          arr.splice(i,2);
        }else{
          i+=2;
        }
      }
      return arr;
      
    }
    
    //method to find parentheses and calculate what's inside them
    function findPs(arr){
      console.log("arranque! findPs")
      for (var j=0;j<arr.length;j++){
        console.log("estoy en"+j+"arr[j]="+arr[j]);
        if (arr[j]=="("){
          var arr2=arr.slice(j+1,arr.indexOf(")",j));
          var l=arr2.length+1;
          console.log("arr2: "+arr2+" l: "+l);
          arr2=calXQ(arr2);
          console.log("resultado XQ"+arr2);
          arr[j]=calPlus(arr2);
          console.log("resultado +"+arr[j]);
          arr.splice(j+1,l)
          console.log("resultado final"+arr);
        }
      }
      console.log("resultado finallll"+arr);
      return arr;
    }
    
    //errors checking method
    function hasErrors(str){
      if (str[1]=="+" || str[1]=="-" || str[1]=="X" || str[1]=="/"){return true;}
      if (str.match(/[+-X/]\s{2}[+-X/]/)!=null){return true;}
    }
    
  }
  
});