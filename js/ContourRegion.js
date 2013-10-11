var FOREGROUND = 255 ;
var BACKGROUND = 0 ;

// Point Constructor
function Point(x,y){
  
  this.x  = x ;
  this.y = y ;
  
  
  this.toCanvasDataPoint = function(canvas){
    return  (this.y*canvas.width * 4) + (this.x*4) ;
  };
  
  this.translate = function(dx,dy){
      this.x = this.x + dx ;
      this.y = this.y + dy ;
      
  }

}

function Delta(deltaX , deltaY, canvasDelta)
{
    this.deltaX = deltaX ;
    this.deltaY = deltaY ;
    this.canvasDelta = canvasDelta ;
    
}

// Contour object constructor
function Contour(label){
    this.label = label ;
    this.points = [] ;
    
    this.addPoint =  function(point)
    {
        this.points[this.points.length] = point ;

    };
    
    this.moveBy = function(dx, dy) 
    {
         for(var i = 0 ; i < this.points.length -1 ; i++) 
         {
            var pt = this.points[i] ;
            pt.translate(dx,dy);
         }
    }
    this.moveContoursBy = function(contours, dx, dy) 
    {
        for(var i = 0 ; i < contours.length-1 ; i++)
        {
            var c = contours[i] ;
            c.moveBy(dx, dy);
        }
    };
    
}




// greyscale HTML5 canvas in specified area

function greyscale(canvas, left, top, width, height)
{
            var ctx = canvas.getContext("2d") ;
            var imgData=ctx.getImageData(left, top , width, height);
            var d = imgData.data;
            for (var i=0; i<d.length; i+=4) {
                var r = d[i];
                var g = d[i+1];
                var b = d[i+2];
                // CIE luminance for the RGB
                // The human eye is bad at seeing red and blue, so we de-emphasize them.
                var v = 0.2126*r + 0.7152*g + 0.0722*b;
               d[i] = d[i+1] = d[i+2] = v;
            }
        
           
             ctx.putImageData(imgData, left, top);
            
             
}

function invert(canvas, left, top, width, height)
{

            var ctx = canvas.getContext("2d") ;
            var imgData=ctx.getImageData(left, top , width, height);
            var d = imgData.data;
            
            for (var i=0; i<d.length; i+=4) {
                
                d[i] = 255 - d[i] ;
                d[i+1]  = 255 - d[i+1] ;
               d[i+2] = 255 - d[i+2] ;
                
           }
         ctx.putImageData(imgData, left, top);
    

}



function entropySplit(hist) {

   // Normalize histogram, that is makes the sum of all bins equal to 1.
   var sum = 0;
   for (var i = 0; i < hist.length; ++i) {
     sum += hist[i];
   }
   
   if (sum === 0) {
     // This should not normally happen, but...
     console.log("Illegal argument histogram should have some") ;
     return -1 ;
   }

   var normalizedHist = [hist.length];
   for (var i = 0; i < hist.length; i++) {
     normalizedHist[i] = hist[i] / sum;
   }

   //
   var pT = [hist.length];
   pT[0] = normalizedHist[0];
   for (var i = 1; i < hist.length; i++) {
     pT[i] = pT[i - 1] + normalizedHist[i];
   }

   // Entropy for black and white parts of the histogram
   var epsilon = 0;
   var hB = [hist.length];
   var hW = [hist.length];
   for (var t = 0; t < hist.length; t++) {
     // Black entropy
     if (pT[t] > epsilon) {
       var hhB = 0;
       for (var i = 0; i <= t; i++) {
         if (normalizedHist[i] > epsilon) {
           hhB -= normalizedHist[i] / pT[t] * Math.log(normalizedHist[i] / pT[t]);
         }
       }
       hB[t] = hhB;
     } else {
       hB[t] = 0;
     }

     // White  entropy
     var pTW = 1 - pT[t];
     if (pTW > epsilon) {
       var hhW = 0;
       for (var i = t + 1; i < hist.length; ++i) {
         if (normalizedHist[i] > epsilon) {
           hhW -= normalizedHist[i] / pTW * Math.log(normalizedHist[i] / pTW);
         }
       }
       hW[t] = hhW;
     } else {
       hW[t] = 0;
     }
   }

   // Find histogram index with maximum entropy
   var jMax = hB[0] + hW[0];
   var tMax = 0;
   for (var t = 1; t < hist.length; ++t) {
     var j = hB[t] + hW[t];
     if (j > jMax) {
       jMax = j;
       tMax = t;
     }
   }

   return tMax;
 }


function threshold(canvas, left, top, width, height, maxVal, override)
{
    
     var ctx = canvas.getContext("2d") ;
     var imgData=ctx.getImageData(left, top , width, height);
     var d = imgData.data;
            
        for (var i=0; i<d.length; i+=4) {
        
            if( d[i] < maxVal || d[i] < override )
            {
                d[i] = 0 ;
                d[i+1]  = 0 ;
                d[i+2] = 0 ;
           }
           else
           {
                d[i] = 255 ;
                d[i+1]  = 255 ;
                d[i+2] = 255 ;
               
               
           }
        }
         ctx.putImageData(imgData, left, top);
}


function getGreyscaleHistogram(canvas, left, top, width, height)
{
    
    var H = [256]; // histogram array
    for(var i = 0 ; i < 256 ; i++) // initialize histogram array
    {
        H[i] = 0 ;
    }
    
    var ctx = canvas.getContext("2d") ;
    var imgData=ctx.getImageData(left, top , width, height);
    var d = imgData.data;
            
    for ( i=0; i<d.length; i+=4) {
                
            var greyval =  Math.floor(d[i]) ;
            H[greyval] = H[greyval] + 1;
                
    }

    return H ;   
}


function moment(canvas, left, top, width, height,  p, q) {
    var Mpq = 0.0;
 
    var ctx = canvas.getContext("2d") ;
    var imgData=ctx.getImageData(left, top , width, height);
    var d = imgData.data;
    

    for (var v = 0; v < height ; v++) {
        for (var u = 0; u < width ; u++) {
            
             var pix =  (v* width * 4) + (u*4) ;
             
             
            if (d[pix] != BACKGROUND) {
                Mpq += Math.pow(u, p) * Math.pow(v, q);
            }
        }
    }
    return Mpq;
}    

function centralMoment(canvas, left, top, width, height,  p, q) {

    var m00 = moment(canvas, left, top, width, height, 0, 0); // region area
    var xCtr = moment(canvas,left, top, width, height, 1, 0) / m00;
    var yCtr = moment(canvas,left, top, width, height, 0, 1) / m00;
    var  cMpq = 0.0; 
    
    var ctx = canvas.getContext("2d") ;
    var imgData=ctx.getImageData(left, top , width, height);
    var d = imgData.data;
    
    
    for (var v = 0; v < height; v++) {
        for (var u = 0; u < width; u++) {
            
            
            var pix =  (v* width * 4) + (u*4) ;
             
    
             if (d[pix] != BACKGROUND ) {
                 cMpq += Math.pow(u - xCtr, p) *  Math.pow(v - yCtr, q);
             }
         }
     }
    return cMpq;
}

function orientation(canvas, left, top, width, height)
{
    var angle = 0 ;
    var cM11 = centralMoment(canvas, left, top, width, height,  1, 1);
    var cM20 = centralMoment(canvas, left, top, width, height,  2, 0);
    var cM02 = centralMoment(canvas, left, top, width, height,  0, 2);
    
    angle = 0.5 * Math.atan2 ( (2*cM11) , (cM20 - cM02) ) ;
    
    
    return angle ;
}


function blackPercentThreshold(canvas, left, top, width, height, percent)
{
            var GreyscaleHistogram = [] ;
            // initialize histogram
            for(var i = 0 ; i < 255 ; i++ )
            {
                GreyscaleHistogram[i] = 0 ;
            }
            
            var ctx = canvas.getContext("2d") ;
            var imgData=ctx.getImageData(left, top , width, height);
            var d = imgData.data;
            
            for (i=0; i<d.length; i+=4) {
                
                var greyLevel = (d[i] + d[i+1] + d[i+2]) / 3 ;
                var greyLevelInt = Math.floor(greyLevel);
                GreyscaleHistogram[greyLevelInt] = GreyscaleHistogram[greyLevelInt] + 1 ;
            
            }
        
            var totalPixels = d.length / 4 ;
            //var percent = percent ;
            var targetPixels = totalPixels * percent ;
            var cumulativeSumOfPixelsLessThanTargetPixels = 0 ;
            var threshold = 0 ;
            
            for (i=0; i< totalPixels; i++) {
            
              if(cumulativeSumOfPixelsLessThanTargetPixels >= targetPixels)
              {
                threshold = i ;
                break ;
                  
              }
              else
              {
                cumulativeSumOfPixelsLessThanTargetPixels += GreyscaleHistogram[i] ;
              }
            
            }
        
        
            for (i=0; i<d.length; i+=4) 
            {
                
                
                greyLevel = (d[i] + d[i+1] + d[i+2]) / 3 ;
                if( greyLevel > threshold)
                {
                    d[i] = 255  ;
                    d[i+1]  = 255  ;
                    d[i+2] = 255  ;
                }
                else
                {
                    d[i] =  0  ;
                    d[i+1]  = 0  ;
                    d[i+2] = 0 ;
                    
                }
            }
        ctx.putImageData(imgData, left, top);


}

//BinaryRegion Contructor 
function BinaryRegion(id)
{
    var label = id ;
    var numberOfPixels = 0;
    var xc = -1.0;
    var yc = -1.0;
    var left = 100000;
    var right = -1;
    var top = 100000;
    var bottom = -1;
    var  x_sum = 0;
    var y_sum = 0;
    var x2_sum = 0;
    var y2_sum = 0;
    this.perimeterContour = null ;
 
 
    this.getSize = function()
    {
        return numberOfPixels ;
    };
    
    
    this.getCenter = function(){
        if (xc < 0 )
            return null;
        else
            return new Point(xc, yc);
     } ;
     
     
     
     
    // this.getOrietation()
    // {
     //    for(var i = 0 ; i < )
      //   {
             
//         }
         
         
  //       return -1 ;
    // }
     
     this.update = function(){
        if (numberOfPixels > 0)
        {
            xc = x_sum / numberOfPixels;
            yc = y_sum / numberOfPixels;
    
        }
     }
    
     this.getBoundingBox = function() 
     {
         if (left < 0)
         {
            return null;
         }
         else
         {
             var bbox = {left:left, top:top, width:right-left+1, height:bottom-top+1};
             return bbox ;
         }
    };
    
    this.addPixel = function(x, y)
    {
        numberOfPixels = numberOfPixels + 1;
        var pt = new Point(x,y) ;
        
        x_sum = x_sum + x;
        y_sum = y_sum + y;
        x2_sum = x2_sum + x*x;
        y2_sum = y2_sum + y*y;
        if (x<left) left = x;
        if (y<top) top = y;
        if (x>right) right = x;
        if (y>bottom) bottom = y;
    };
    
    
}

// ContourTracer constructor
function ContourTracer(canvas, MODE){
    
    
    this.canvas = canvas ;
    this.maxPointsInContour = 5000 ;

    var width = canvas.width ;
    var height = canvas.height ;
    var FOREGROUND = 255 ;
    var BACKGROUND = 0 ;
    var innerContours = [] ;
    var outerContours = [] ;
    var allRegions = [] ;
    var pixelArray = createPixelArray(canvas.width, canvas.height);
    var labelArray =  [] ;
    var regionId = 0 ;
    // label values in labelArray can be:
    // 0 ... unlabeled   // −1 ... previously visited background pixel
    // > 0 ... a valid label
    
    function createPixelArray(width,height){
    
        var c = document.createElement("canvas") ;
        var ctx=c.getContext("2d");
        return ctx.createImageData(width,height);

    }
    

    this.getInnerContours = function(){
        
        return innerContours ;
    };
    
    this.getOuterContours = function() {
       
        return outerContours ;
    };
    
    this.getBinaryRegions = function() {
        return allRegions ;
    };

    function makeAuxArrays(){
        var h = canvas.height ;
        var w = canvas.width ;
        var canvasCtx =  canvas.getContext("2d") ;
        var imgData = canvasCtx.getImageData(0,0,w, h) ;
        
        labelArray = [h]
        
        for(var v = 0 ; v < h ; v++)
        {
            labelArray[v] = [w] ;
            
            for(var u = 0 ; u < w ; u++)
            {
                
                if(v===0 || v=== h-1 || u=== 0 || u === w-1)
                {
                    labelArray[v][u] = -1 ;
                }
                else
                {
                    labelArray[v][u] = 0 ;
                }
                
                
            }
            
            
        }
        
        for (var i=0;i<imgData.data.length;i+=4)
        {
             var pixVal = imgData.data[i+0] ;
             if(pixVal===0)
             {
                 pixelArray.data[i+0] = BACKGROUND ;
                 pixelArray.data[i+1] = BACKGROUND ;
                 pixelArray.data[i+2] = BACKGROUND ;
             }
             else
             {
                 pixelArray.data[i+0] = FOREGROUND ;
                 pixelArray.data[i+1] = FOREGROUND ;
                 pixelArray.data[i+2] = FOREGROUND ;
             }
        
        }
        
    }
    
    
    
    this.traceOuterContour = function(cx, cy, label) {
        
        var cont = new Contour(label) ;
        this.traceContour(cx, cy, label, 0, cont);
        return cont ;
        
    };
    
    this.traceInnerContour = function(cx,cy,label) {
        var cont = new Contour(label) ;
        cont = this.traceContour(cx, cy, label, 1, cont);
        return cont ;
        
    };
    
    // trace one contour starting at ( xS,yS) in direction dS
    this.traceContour = function(xS, yS, label, dS, cont) {
    
        var ptdata = canvas.getContext("2d").getImageData(0,0,canvas.width,canvas.height) ;
        var direction = dS ;
        
        var xT, yT; // T = successor of starting point ( xS,yS)
        var xP, yP; // P = previous contour point
        var xC, yC; // C = current contour point
        var done = false ;
        
        var pt = new Point(xS, yS);
        var dNext = this.findNextPoint(pt, dS);  // this will change point pt if a neighbouring foreground pixel
        // found and returns the direction where pixel was found 
        cont.addPoint(pt); // add first point to contour
        
        var canvasPt = pt.toCanvasDataPoint(canvas)  ;
     //  ptdata.data[canvasPt+0] = 255 ;
     //   ptdata.data[canvasPt+1] = 0 ;
        if(direction==0)
        {
      //          ptdata.data[canvasPt+2] = 0 ;
        }
        else
        {
    //            ptdata.data[canvasPt+2] = 255 ;
        }
        
        canvas.getContext("2d").putImageData(ptdata, 0,0) ;
  
  
        xP = xS; 
        yP = yS;
        xC = xT = pt.x;
        yC = yT = pt.y;

        done = (xS==xT && yS==yT); // true if isolated pixel
        
        var counter = 0 ;
        
        while (!done) {
        
            counter++ ;
            if(counter > this.maxPointsInContour) // clamp contour to maximum size
            {
                   done = true ;
                   break ;
            }
        
            
            try
            {
                labelArray[yC][xC] = label;
            }catch (e) { 
                console.log("caught error applying lablel labelArray yC:" + yC + " xC:" +xC ) ;
            }
            
            pt = new Point(xC, yC);
            
            var dSearch = (dNext + 6) % 8; 
            dNext = this.findNextPoint(pt, dSearch);
        
            xP = xC; 
            yP = yC;
            xC = pt.x; 
            yC = pt.y;
            
        
        
            
            //  console.log("xP:" + xP + " yP:" + yP + " xC:" + xC + " yC:" + yC + " xT:" + xT +  " yT:" + yT + " xS:" + xS + " xT:" + xT  ) ;
            // are we back at the starting position?
            done = ((xP==xS && yP==yS && xC==xT && yC==yT) || (xP==xC && yP==yC ));
            if (!done) 
            {
                counter++ ;
                cont.addPoint(pt);
                canvasPt = pt.toCanvasDataPoint(canvas)  ;
    
      //          ptdata.data[canvasPt+0] = 255 ;
    //            ptdata.data[canvasPt+1] = 0 ;
                
                if(direction==0)
                {
      //              ptdata.data[canvasPt+2] = 0 ;
                }
                else
                {
        //            ptdata.data[canvasPt+2] = 255 ;
                }
                
                canvas.getContext("2d").putImageData(ptdata, 0,0) ;
         
            }
        }
    
        return cont;
 
    }
    
    // function returns differnece in canvas data pixels for each neighbour of 
    // a given pixel where parameter d is the direction of eight neighbouging pixels represented 
    // by {x,y} vectors { { 1,0} , { 1, 1}, {0, 1}, {-1, 1}, {-1,0}, {-1,-1}, {0,-1}, { 1,-1}}
    // these vectors returned as Delta.x and Delta.y and also the HTML5 canvas equivalent and Delta.canvasDelta 
    function getDelta(d)
    {
        if(d===0) return  new Delta(1,0, 4)  ; // pixel to right of center pixel
        if(d==1) return new Delta(1,1, (canvas.width*4) + 4 ); // pixel to right bottom corner of center pixel
        if(d==2) return new Delta(0,1,(canvas.width*4)) ; // pixel below center pixel
        if(d==3) return new Delta(-1,1, (canvas.width*4) - 4 ); // pixel to left bottom crner of center pixel
        if(d==4) return new Delta(-1,0, -4) ; // pixel to left of center pixel
        if(d==5) return new Delta(-1,-1, (canvas.width*4*-1) -4 ) ; // pixel to top right corner
        if(d==6) return new Delta(0,-1, (canvas.width*4*-1) ) ; // pixel above center pixel
        if(d==7) return new Delta(1,-1, (canvas.width*4*-1) +4 ); // pixel to right of center pixel
    
    }
    
    
     this.findNextPoint = function (pt, dir) {
 // starts at Point pt in direction dir, returns the
 // final tracing direction, and modifies pt
      
       for (var j = 0; j < 7; j++) 
       {
            var delta = getDelta(dir) ;
    
            var canvasPt = pt.toCanvasDataPoint(canvas) + delta.canvasDelta ;
         
      
            
            if(canvasPt<0) // border case
            {
              
                continue ;
                
            }
           
             var x = pt.x + delta.deltaX;
             var y = pt.y + delta.deltaY;
              
         
            if(x==canvas.width || y==canvas.height)
            {
                continue ;
            }
    
            if (pixelArray.data[canvasPt] == BACKGROUND) 
            {
                // mark surrounding background pixels
                labelArray[y][x] = -1 ;
                
                dir = (dir + 1) % 8 ;
               
            }
            else 
            { // found a nonbackground pixel
                    pt.x = x; pt.y = y;
                
                    break;
            } 
        }
        return dir;
    };
    
    
    
    this.findAllContours = function() 
    {
        
        
        var label = 0; // current label

        var ptdata = canvas.getContext("2d").getImageData(0,0,canvas.width,canvas.height) ;
        

         // scan top to bottom, left to right
        for (var v = 1; v < canvas.height-1; v++) 
        {
            label = 0; // no label
            for (var u = 1; u < canvas.width -1 ; u++) 
            {
                var canvasPt = new Point(u,v).toCanvasDataPoint(canvas) ;
                   
                if (pixelArray.data[canvasPt] === FOREGROUND) 
                {
    
                    if (label !== 0) { // keep using the same label
                        labelArray[v][u] = label;
                        
                    }
                    else 
                    {
                         label = labelArray[v][u];
                         if (label === 0) 
                         {
                            // unlabeled—new outer contour
                            regionId = regionId + 1;
                            label = regionId;
                           
                            var oc = this.traceOuterContour(u, v, label);
                            outerContours[outerContours.length] = oc ;
                            labelArray[v][u] = label;
                        
                          }
                     }
                }
                else // background pixel 
                { 
                    if (label !== 0) 
                    {
                         if (labelArray[v][u] === 0) 
                         {
                            // unlabeled—new inner contour
                            var ic = this.traceInnerContour(u-1, v, label);
                            innerContours[innerContours.length] = ic ;
                        }
                        label = 0;
                    }
                }   
            }
        }
        
         
         
        // shift back to original coordinates
         var contour = new Contour(-1) ;
        
       contour.moveContoursBy(outerContours, -1, -1);
       contour.moveContoursBy(innerContours, -1, -1);
    };
    
  
    
    this.collectRegions = function(){
        
         // creates a container of BinaryRegion objects
         //  collects the region pixels from the label image
         // and computes the statistics for each region
 
        var maxLabel = regionId;
        var startLabel = 1;
        var regionArray = [] ;
 
        for (var i = startLabel; i <= maxLabel; i++) 
        {
            regionArray[i-1] = new BinaryRegion(i);
            if(this.getOuterContours()[i-1].label == i)
            {
                regionArray[i-1].perimeterContour = this.getOuterContours()[i-1] ;
                
            }
        }
        
        
        
        for (var v = 0; v < height; v++) 
        {
            for (var u = 0; u < width; u++) 
            {
                var lb = labelArray[v][u];
                // TODO not all labels are entered into label array
                
                if (lb >= startLabel && lb <= maxLabel ) 
                {
                    regionArray[lb-1].addPixel(u, v);
            
                }
            }
        }

    // create a list of regions to return, collect nonempty regions
        var regionList = [];
        var listCounter = 0 ;
        
        for ( i = 0 ; i <  regionArray.length ; i++) 
        {
            
            var r = regionArray[i] ;
            // this prunes out missing regions?
            if (r !== null && r.getSize() > 0) 
            {
                r.update();  // compute the statistics for this region
                regionList[listCounter]  = r ;
                listCounter++ ;
            }     
        }
        
        allRegions = regionList ;
        
    
    } ;// end colectRegions
    
    
     makeAuxArrays() ;

} 
