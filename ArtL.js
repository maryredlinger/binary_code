    
function encode() {
  
  var x = document.getElementById("frm1");
  
  var input = "";
  var i;
  for (i = 0; i < x.length ;i++) {
    input += x.elements[i].value;
  }
  
  /// splitting the input into groups of 4
  var index = 0;
  var testArray = [];
  var chunk4 = 4
    
  for (index = 0; index < input.length; index += chunk4) {
        myChunk = input.slice(index, index+chunk4);
        testArray.push(myChunk);
  }
  
  var hexArray = []
  //reverse letters in groups of 4
  for(i=0; i<testArray.length; i++){
        var myReverse = testArray[i].split('')
        var reverseI = myReverse.reverse()
        var text = reverseI.join('')
        hexArray.push(text)
  }
  
  var hex = ''
 
  for(var l=0;l<hexArray.length;l++) {
      //converting to hexadecimal
        for(var i=0; i<hexArray[l].length; i++) {
            hex += hexArray[l].charCodeAt(i).toString(16).toUpperCase();
        } 
        
        var chunk8 = 8
        var hexArray2 = []
        //splitting hexadecinmal into groups of 8 letters
        for( index=0; index<hex.length; index += chunk8){
            myChunk = hex.slice(index, index+chunk8)
            hexArray2.push(myChunk)
        }
        
        // converting hexArray2[i] into binary
        bin = ''
          
        for(i=0; i<hexArray2.length; i++){
            //for single, double and triple letters adds appropriate number of 0's
            if(hexArray2[i].length === 6){
                bin += "00000000"
            }
            if(hexArray2[i].length === 4){
                bin += "0000000000000000"
            }
            if(hexArray2[i].length === 2){
                bin += "000000000000000000000000"
            }
        
            for(j=0; j<hexArray2[i].length; j++){
                //
                bin += parseInt(hexArray2[i][j], 16).toString(2).padStart(4, "0")
            }
        }
        
        //splitting binarry string into an array of 32 to represent the 4 letters
        var binChunk = []
        var chunk32 = 32
        for(index=0; index<bin.length; index+=chunk32){
            myChunk = bin.slice(index, index+chunk32)
            binChunk.push(myChunk)
        }
        var binSmChunk = []
        //splitting individual chunks of 32 into 4X chunks of 8
        for(i=0; i<binChunk.length; i++){
            for(index=0; index<binChunk[i].length; index+=chunk8){
                myChunk = binChunk[i].slice(index, index+chunk8)
                binSmChunk.push(myChunk)
            }
        }
        
        //converting each set of 8 binary into encoded binary
        encoded = ''
        
        //grouping groups of 8 into an array of length 4
        var binXsChunk = []
        for(index=0; index<binSmChunk.length; index+=chunk4){
            myChunk = binSmChunk.slice(index, index+chunk4)
            binXsChunk.push(myChunk)
        }
        //console.log(binXsChunk)
                        
        for(e=0; e<binXsChunk.length; e++){  
            for(var i=0;i<binXsChunk[e].length;i++) {
                encoded += (binXsChunk[e][i][0])
            }
            for(var i=0;i<binXsChunk[e].length;i++) {
                    encoded += (binXsChunk[e][i][1])
            }for(var i=0;i<binXsChunk[e].length;i++) {
                    encoded += (binXsChunk[e][i][2])
            }for(var i=0;i<binXsChunk[e].length;i++) {
                    encoded += (binXsChunk[e][i][3]) 
            }for(var i=0;i<binXsChunk[e].length;i++) {
                    encoded += (binXsChunk[e][i][4])
            }for(var i=0;i<binXsChunk[e].length;i++) {
                    encoded += (binXsChunk[e][i][5]) 
            }for(var i=0;i<binXsChunk[e].length;i++) {
                    encoded += (binXsChunk[e][i][6])                   
            }for(var i=0;i<binXsChunk[e].length;i++) {
                    encoded += (binXsChunk[e][i][7])  
            }
        }
        
        //grouping the encoded group of 32 into its own group
        var encodedArray = []
        console.log(encodedArray)
        for(index=0; index<encoded.length; index+=chunk32){
            myChunk = encoded.slice(index, index+chunk32)
            encodedArray.push(myChunk)
        }
        
        //converting the array of 32 encoded binary - encodedArryay - into hexadecimal
        output = ''
        var outArray = []
        
        for(h=0; h<encodedArray.length; h++){
            for(i=0; i<encodedArray[h].length; i+=4){
                var bytes = encodedArray[h].substr(i,4)
                
                var decimal = parseInt(bytes, 2);
                var hexadecimal = decimal.toString(16);
                output += hexadecimal.toUpperCase();
            }
            for(a=0; a<encodedArray[h].length; a+=8){
                //shows encoded array in groups of 8
                outArray.push(encodedArray[h].substr(a,8))
            }
        }
        
        //converting each hexadecinmal into output decimal
        var outputy = output.toLowerCase();
        var deciArray = []
        total = []
        //finish = total[7]
        console.log(total)
        
        //chunking hexadecimal into groups of 8
        for (var index = 0; index <outputy.length; index+=chunk8) {
                myChunk = outputy.slice(index, index+chunk8)
                deciArray.push(myChunk)
        }
        
        //converting groups of 8 into decimal
        var result = 0, digitValue
        
        
        for (var i=0; i<deciArray.length; i++) {
            // console.log('clg ', i, deciArray.length)
            result = 0
            for(d=0; d<deciArray[i].length; d++){
                //convert letters to digit value                
                digitValue = '0123456789abcdefgh'.indexOf(deciArray[i][d])
                result = result * 16 + digitValue                             
            }                
                    total.push(result)            
        }        
  }
  
  document.getElementById("outputHex").innerHTML = "Hex: " + hex;  
  document.getElementById("outputBin").innerHTML = "Binary: " + binXsChunk;  
  document.getElementById("outputEncode").innerHTML = "Encoded: " + outArray;  
  document.getElementById("outputOutH").innerHTML = "Output(hex): " + deciArray;
   document.getElementById("outputOutD").innerHTML = "Output(dec): " + total ;
}

function decode () {
     var x = document.getElementById("frm1");
     var input = "";
     for (i = 0; i < x.length ;i++) {
        input += x.elements[i].value;
     }
     //I need to split the array into sections at the comma
     var inputArr = input.split(',')
     
     //for converting from decimanl to hexadecimal
     var a = 1
     var b = 16 * a
     var c = 16 * b
     var d = 16 * c
     var e = 16 * d
     var f = 16 * e
     var g = 16 * f
     var h = 16 * g
     
     //converting decimal to hexadecimal
     let hex = []
     
     for(i=0; i<inputArr.length; i++){
     let integer = inputArr[i]
     
     
     var y = Math.floor(integer/h)
     var z = integer - (h*y)
     
     var j = Math.floor(z/g)
     var k = integer - ((h*y) + (g*j))
     
     var l = Math.floor(k/f)
     var m = integer - ((h*y) +(g*j) + (l*f))
     
     var n = Math.floor(m/e)
     var o = integer - ((h*y) +(g*j) + (l*f) + (n*e))
     
     var p = Math.floor(o/d)
     var q = integer - ((h*y) +(g*j) + (l*f) + (n*e) + (p*d))
     
     var r = Math.floor(q/c)
     var s = integer - ((h*y) +(g*j) + (l*f) + (n*e) + (p*d) + (c*r))
     
     var t = Math.floor(s/b)
     var u = integer - ((h*y) +(g*j) + (l*f) + (n*e) + (p*d) + (c*r) + (b*t))
     
     var v = Math.floor(u/a)
     var w = integer - ((h*y) +(g*j) + (l*f) + (n*e) + (p*d)+ (c*r) + (b*t) + (a*v))
     
     let hexArray = []
     hexArray.push(y.toString(16),j.toString(16),l.toString(16),n.toString(16),p.toString(16),r.toString(16),t.toString(16),v.toString(16))
     hex.push(hexArray.join("").toUpperCase())
     }
     
     //converting hexadecimal to encoded binary
     
     //binary
     let bin1 = ''
     for(let i=0; i<hex.length; i++){
         for(let j=0; j<hex[i].length; j++){
             bin1 += parseInt(hex[i][j], 16).toString(2).padStart(4, "0")
         }
     }
     
     //group binary into groups of 32 with 4 groups of 8
     let binArray = bin1.split('')
     let chunk32 = 32
     let chunk8 = 8
     index = 0
     let chunk = []
     
     for(let index=0; index<binArray.length; index+=chunk32){   
         myChunk = binArray.slice(index, index+chunk32)
         chunk.push(myChunk)
     }
     encode = []
     for(let i=0; i<chunk.length; i++){
        for(let index=0; index<chunk[i].length; index+=chunk8){
            myChunk = chunk[i].slice(index, index+chunk8)
            encode.push(myChunk.join(""))
        }
     }
     // take encoded array and put the values in  binary,, so reverse encoded
     let bin2 = []
     encodeChunk = []
     chunk4 = 4
     for(let index=0; index<encode.length; index+=chunk4){   
         myChunk = encode.slice(index, index+chunk4)
         encodeChunk.push(myChunk)
     }
     for(e=0; e<chunk.length; e++){
         let um = []
         
             
         um.push(chunk[e][0],chunk[e][4], chunk[e][8],chunk[e][12],chunk[e][16],chunk[e][20], chunk[e][24],chunk[e][28])
         
         um.push(chunk[e][1],chunk[e][5], chunk[e][9],chunk[e][13],chunk[e][17],chunk[e][21], chunk[e][25],chunk[e][29])    
         
         um.push(chunk[e][2],chunk[e][6], chunk[e][10],chunk[e][14],chunk[e][18],chunk[e][22], chunk[e][26],chunk[e][30])
         
         um.push(chunk[e][3],chunk[e][7], chunk[e][11],chunk[e][15],chunk[e][19],chunk[e][23], chunk[e][27],chunk[e][31])
         console.log(um)
         
         bin2.push(um)     
     }
     
     binary = []
     for(index=0; index<bin2.length; index+=chunk8){
         myChunk = bin2.slice(index, index+chunk8)
         binary.push(myChunk.join(""))
     }
     
     //converting binary into hexadecimal
    output = ''
    
    for(h=0; h<binary.length; h++){
        for(i=0; i<binary[h].length; i+=4){
            var bytes = binary[h].substr(i,4)
            
            var decimal = parseInt(bytes, 2);
            var hexadecimal = decimal.toString(16);
            output += hexadecimal.toUpperCase();
        }  
    }
    let hex2 = []
    for(index=0; index<output.length; index+=chunk8){
        myChunk = output.substring(index, index+chunk8)
        hex2.push(myChunk)
    }
    
    //convert to letters then reverse
    let str = ''
    for(n=0; n<output.length; n+=2){
            str += (String.fromCharCode(parseInt(output.substr(n, 2), 16)) )
    }
    
    //chunk str into groups of 4 to be reversed
    
    var chars = str.split(''); //split into characters
    let total = []
    for(i=0; i<chars.length; i+=chunk4){
            myChunk = chars.slice(i, i+chunk4)
            total.push(myChunk)
    }
    let result = []
    for (i=0; i < total.length; i++) {
    clean = ''
       for(j=0; j<total[i].length; j++){
           if (total[i][j] !== "\u0000"){
            clean += total[i][j] 
           } 
       }
    result.push(clean.split('').reverse().join(''))
    }
    
    let text = result.join('')
    
   

    
     document.getElementById("decodeHex").innerHTML = "Hex: " + hex  ;
     document.getElementById("decodeEncode").innerHTML = "Encode: " + encode;
     document.getElementById("decodeBin").innerHTML = "Binary: " + binary;  
     document.getElementById("decodeOutHex").innerHTML = "Hexadecimal: " + hex2;   
    document.getElementById("decodeResult").innerHTML = "String " + text ;  
}