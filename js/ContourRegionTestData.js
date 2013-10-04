// test data for a 20x20 pixel canvas
// Note that HTML5 canvas has 4 values for each pixel (RGBA)
// the RGB values must be set to 255 to create a white pixel so 
// each pixel needed for a test needs 3 values set.

var ContourRegionTestData = function(){

    // adds a single pixel at 10,1 on 20*20 grid
    this.isolatedPixelTest = function(pdata)  
    {
        
        pdata.data[120] = 255 ;
        pdata.data[121] = 255 ;
        pdata.data[122] = 255 ;
        
        return pdata ;
    };
    
     this.twoPixelLineTest = function(pdata)  
    {
        
        pdata.data[120] = 255 ;
        pdata.data[121] = 255 ;
        pdata.data[122] = 255 ;
        
        // add another point to make two point line
        pdata.data[124] = 255 ;
        pdata.data[125] = 255 ;
        pdata.data[126] = 255 ;
        
        return pdata ;
    };
    

    this.threePixelLineTickDown = function(pdata)  
    {
    
    
        pdata.data[120] = 255 ;
        pdata.data[121] = 255 ;
        pdata.data[122] = 255 ;
        
        // add another point to make two point line
        pdata.data[124] = 255 ;
        pdata.data[125] = 255 ;
        pdata.data[126] = 255 ;
    
    
     // add another point to make three point line
        pdata.data[128] = 255 ;
        pdata.data[129] = 255 ;
        pdata.data[130] = 255 ;
        testctx.putImageData(pdata, 0,0) ;
        
         // add another point downwards
        pdata.data[208] = 255 ;
        pdata.data[209] = 255 ;
        pdata.data[210] = 255 ;
        testctx.putImageData(pdata, 0,0) ;
        return pdata ;
    };
    
    
    this.SixPixelShapeWithUTurn = function(pdata)  
    {
    
    
        pdata.data[120] = 255 ;
        pdata.data[121] = 255 ;
        pdata.data[122] = 255 ;
        
        // add another point to make two point line
        pdata.data[124] = 255 ;
        pdata.data[125] = 255 ;
        pdata.data[126] = 255 ;
    
    
     // add another point to make three point line
        pdata.data[128] = 255 ;
        pdata.data[129] = 255 ;
        pdata.data[130] = 255 ;
        testctx.putImageData(pdata, 0,0) ;
        
         // add another point downwards
        pdata.data[208] = 255 ;
        pdata.data[209] = 255 ;
        pdata.data[210] = 255 ;
        testctx.putImageData(pdata, 0,0) ;
        
        // add another point downwards
        pdata.data[288] = 255 ;
        pdata.data[289] = 255 ;
        pdata.data[290] = 255 ;
        testctx.putImageData(pdata, 0,0) ;
        
         // add another point leftwards
        pdata.data[284] = 255 ;
        pdata.data[285] = 255 ;
        pdata.data[286] = 255 ;
        testctx.putImageData(pdata, 0,0) ;
    
        return pdata ;
    }
    
    
    this.completedRectangleContour = function(pdata)  
    {
    
    
        pdata.data[120] = 255 ;
        pdata.data[121] = 255 ;
        pdata.data[122] = 255 ;
        
        // add another point to make two point line
        pdata.data[124] = 255 ;
        pdata.data[125] = 255 ;
        pdata.data[126] = 255 ;
    
    
     // add another point to make three point line
        pdata.data[128] = 255 ;
        pdata.data[129] = 255 ;
        pdata.data[130] = 255 ;
        testctx.putImageData(pdata, 0,0) ;
        
         // add another point downwards
        pdata.data[208] = 255 ;
        pdata.data[209] = 255 ;
        pdata.data[210] = 255 ;
        testctx.putImageData(pdata, 0,0) ;
        
        // add another point downwards
        pdata.data[288] = 255 ;
        pdata.data[289] = 255 ;
        pdata.data[290] = 255 ;
        testctx.putImageData(pdata, 0,0) ;
        
         // add another point leftwards
        pdata.data[284] = 255 ;
        pdata.data[285] = 255 ;
        pdata.data[286] = 255 ;
        testctx.putImageData(pdata, 0,0) ;
    
    
         // add another point leftwards
        pdata.data[280] = 255 ;
        pdata.data[281] = 255 ;
        pdata.data[282] = 255 ;
        testctx.putImageData(pdata, 0,0) ;
        
         // add a point up to complete contour 
        pdata.data[200] = 255 ;
        pdata.data[201] = 255 ;
        pdata.data[202] = 255 ;
        testctx.putImageData(pdata, 0,0) ;
    
         return pdata ;
    }


    this.completedIrregularRectangleContour = function(pdata)  
    {
    
    
        pdata.data[120] = 255 ;
        pdata.data[121] = 255 ;
        pdata.data[122] = 255 ;
        
        // add another point to make two point line
        pdata.data[124] = 255 ;
        pdata.data[125] = 255 ;
        pdata.data[126] = 255 ;
    
    
     // add another point to make three point line
        pdata.data[128] = 255 ;
        pdata.data[129] = 255 ;
        pdata.data[130] = 255 ;
        testctx.putImageData(pdata, 0,0) ;
        
         // add another point downwards
        pdata.data[208] = 255 ;
        pdata.data[209] = 255 ;
        pdata.data[210] = 255 ;
        testctx.putImageData(pdata, 0,0) ;
        
        // add another point downwards
        pdata.data[288] = 255 ;
        pdata.data[289] = 255 ;
        pdata.data[290] = 255 ;
        testctx.putImageData(pdata, 0,0) ;
        
         // add another point leftwards
        pdata.data[284] = 255 ;
        pdata.data[285] = 255 ;
        pdata.data[286] = 255 ;
        testctx.putImageData(pdata, 0,0) ;
    
    
         // add another point leftwards
        pdata.data[280] = 255 ;
        pdata.data[281] = 255 ;
        pdata.data[282] = 255 ;
        testctx.putImageData(pdata, 0,0) ;
        
         // add a point up to complete contour 
        pdata.data[200] = 255 ;
        pdata.data[201] = 255 ;
        pdata.data[202] = 255 ;
        testctx.putImageData(pdata, 0,0) ;
    

 // add another point at 9,3 to make irregular contour
        pdata.data[276] = 255 ;
        pdata.data[277] = 255 ;
        pdata.data[278] = 255 ;
        
        return pdata ;
    };
    
    
    this.IrregularRectangleBacktrackingContour = function(pdata)  
    {
    
    
        pdata.data[120] = 255 ;
        pdata.data[121] = 255 ;
        pdata.data[122] = 255 ;
        
        // add another point to make two point line
        pdata.data[124] = 255 ;
        pdata.data[125] = 255 ;
        pdata.data[126] = 255 ;
    
    
     // add another point to make three point line
        pdata.data[128] = 255 ;
        pdata.data[129] = 255 ;
        pdata.data[130] = 255 ;
        
        
         // add another point downwards
        pdata.data[208] = 255 ;
        pdata.data[209] = 255 ;
        pdata.data[210] = 255 ;
        
        // add another point downwards
        pdata.data[288] = 255 ;
        pdata.data[289] = 255 ;
        pdata.data[290] = 255 ;
        
         // add another point leftwards
        pdata.data[284] = 255 ;
        pdata.data[285] = 255 ;
        pdata.data[286] = 255 ;
    
    
         // add another point leftwards
        pdata.data[280] = 255 ;
        pdata.data[281] = 255 ;
        pdata.data[282] = 255 ;
        
         // add a point up to complete contour 
        pdata.data[200] = 255 ;
        pdata.data[201] = 255 ;
        pdata.data[202] = 255 ;
    

 // add another point at 9,3 to make irregular contour
        pdata.data[276] = 255 ;
        pdata.data[277] = 255 ;
        pdata.data[278] = 255 ;
        
    
      // add new points at 8,2 and 7,2 to make irregular contour requiring backtrack tracing
        pdata.data[192] = 255 ;
        pdata.data[193] = 255 ;
        pdata.data[194] = 255 ;
        
        pdata.data[188] = 255 ;
        pdata.data[189] = 255 ;
        pdata.data[190] = 255 ;
        
        return pdata ;
    
    };
       
     
     this.SmallUShapeContour = function(pdata)  
     {
      
      // add another separate contour 
        
        pdata.data[144] = 255 ;
        pdata.data[145] = 255 ;
        pdata.data[146] = 255 ;
        
        pdata.data[224] = 255 ;
        pdata.data[225] = 255 ;
        pdata.data[226] = 255 ;
        
        pdata.data[304] = 255 ;
        pdata.data[305] = 255 ;
        pdata.data[306] = 255 ;
          
        pdata.data[220] = 255 ;
        pdata.data[221] = 255 ;
        pdata.data[222] = 255 ;
        
        pdata.data[216] = 255 ;
        pdata.data[217] = 255 ;
        pdata.data[218] = 255 ;
        
        pdata.data[136] = 255 ;
        pdata.data[137] = 255 ;
        pdata.data[138] = 255 ;
       return pdata ;
     };
    
    

     this.RegionWithInnerContour = function(pdata)  
     {

    
        //outer and inner contours
        
        pdata.data[324] = 255 ;
        pdata.data[325] = 255 ;
        pdata.data[326] = 255 ;
        
        pdata.data[328] = 255 ;
        pdata.data[329] = 255 ;
        pdata.data[330] = 255 ;
        
        pdata.data[332] = 255 ;
        pdata.data[333] = 255 ;
        pdata.data[334] = 255 ;
        
        pdata.data[336] = 255 ;
        pdata.data[337] = 255 ;
        pdata.data[338] = 255 ;
        
        pdata.data[340] = 255 ;
        pdata.data[341] = 255 ;
        pdata.data[342] = 255 ;
        
        pdata.data[344] = 255 ;
        pdata.data[345] = 255 ;
        pdata.data[346] = 255 ;
        
        pdata.data[428] = 255 ;
        pdata.data[429] = 255 ;
        pdata.data[430] = 255 ;
        
        pdata.data[428] = 255 ;
        pdata.data[429] = 255 ;
        pdata.data[430] = 255 ;
        
        pdata.data[508] = 255 ;
        pdata.data[509] = 255 ;
        pdata.data[510] = 255 ;
        
        pdata.data[592] = 255 ;
        pdata.data[593] = 255 ;
        pdata.data[594] = 255 ;
        
        pdata.data[672] = 255 ;
        pdata.data[673] = 255 ;
        pdata.data[674] = 255 ;
        
        pdata.data[752] = 255 ;
        pdata.data[753] = 255 ;
        pdata.data[754] = 255 ;
        
        pdata.data[832] = 255 ;
        pdata.data[833] = 255 ;
        pdata.data[834] = 255 ;
        
        pdata.data[832] = 255 ;
        pdata.data[833] = 255 ;
        pdata.data[834] = 255 ;
        
        pdata.data[912] = 255 ;
        pdata.data[913] = 255 ;
        pdata.data[914] = 255 ;
        
        pdata.data[988] = 255 ;
        pdata.data[989] = 255 ;
        pdata.data[990] = 255 ;
        
        pdata.data[1064] = 255 ;
        pdata.data[1065] = 255 ;
        pdata.data[1066] = 255 ;
        
        pdata.data[1060] = 255 ;
        pdata.data[1061] = 255 ;
        pdata.data[1062] = 255 ;
        
        pdata.data[1136] = 255 ;
        pdata.data[1138] = 255 ;
        pdata.data[1140] = 255 ;
        
        pdata.data[1052] = 255 ;
        pdata.data[1053] = 255 ;
        pdata.data[1054] = 255 ;
        
        pdata.data[1048] = 255 ;
        pdata.data[1049] = 255 ;
        pdata.data[1050] = 255 ;
        
        pdata.data[1044] = 255 ;
        pdata.data[1045] = 255 ;
        pdata.data[1046] = 255 ;
        
        pdata.data[964] = 255 ;
        pdata.data[965] = 255 ;
        pdata.data[966] = 255 ;
        
        pdata.data[884] = 255 ;
        pdata.data[885] = 255 ;
        pdata.data[886] = 255 ;
        
        pdata.data[804] = 255 ;
        pdata.data[805] = 255 ;
        pdata.data[806] = 255 ;
        
        pdata.data[724] = 255 ;
        pdata.data[725] = 255 ;
        pdata.data[726] = 255 ;
        
        pdata.data[644] = 255 ;
        pdata.data[645] = 255 ;
        pdata.data[646] = 255 ;
        
        pdata.data[564] = 255 ;
        pdata.data[565] = 255 ;
        pdata.data[566] = 255 ;
        
        pdata.data[484] = 255 ;
        pdata.data[485] = 255 ;
        pdata.data[486] = 255 ;
        
        pdata.data[404] = 255 ;
        pdata.data[405] = 255 ;
        pdata.data[406] = 255 ;
        
        // inner contour
        
        pdata.data[492] = 255 ;
        pdata.data[493] = 255 ;
        pdata.data[494] = 255 ;
        
        pdata.data[496] = 255 ;
        pdata.data[497] = 255 ;
        pdata.data[498] = 255 ;
        
        pdata.data[576] = 255 ;
        pdata.data[577] = 255 ;
        pdata.data[578] = 255 ;
        
        pdata.data[660] = 255 ;
        pdata.data[661] = 255 ;
        pdata.data[662] = 255 ;
        
        pdata.data[744] = 255 ;
        pdata.data[745] = 255 ;
        pdata.data[746] = 255 ;
        
        pdata.data[824] = 255 ;
        pdata.data[825] = 255 ;
        pdata.data[826] = 255 ;

        pdata.data[900] = 255 ;
        pdata.data[901] = 255 ;
        pdata.data[902] = 255 ;

        pdata.data[896] = 255 ;
        pdata.data[897] = 255 ;
        pdata.data[898] = 255 ;

        pdata.data[892] = 255 ;
        pdata.data[893] = 255 ;
        pdata.data[894] = 255 ;


        pdata.data[812] = 255 ;
        pdata.data[813] = 255 ;
        pdata.data[814] = 255 ;

        pdata.data[732] = 255 ;
        pdata.data[733] = 255 ;
        pdata.data[734] = 255 ;

        pdata.data[652] = 255 ;
        pdata.data[653] = 255 ;
        pdata.data[654] = 255 ;

        pdata.data[572] = 255 ;
        pdata.data[573] = 255 ;
        pdata.data[574] = 255 ;

        // fill inner region
        
        pdata.data[408] = 255 ;
        pdata.data[409] = 255 ;
        pdata.data[410] = 255 ;

        pdata.data[412] = 255 ;
        pdata.data[413] = 255 ;
        pdata.data[414] = 255 ;

        pdata.data[416] = 255 ;
        pdata.data[417] = 255 ;
        pdata.data[418] = 255 ;
        
        pdata.data[420] = 255 ;
        pdata.data[421] = 255 ;
        pdata.data[422] = 255 ;

        pdata.data[424] = 255 ;
        pdata.data[425] = 255 ;
        pdata.data[426] = 255 ;

        pdata.data[500] = 255 ;
        pdata.data[501] = 255 ;
        pdata.data[502] = 255 ;

        pdata.data[504] = 255 ;
        pdata.data[505] = 255 ;
        pdata.data[506] = 255 ;

        pdata.data[580] = 255 ;
        pdata.data[581] = 255 ;
        pdata.data[582] = 255 ;

        pdata.data[584] = 255 ;
        pdata.data[585] = 255 ;
        pdata.data[586] = 255 ;

        pdata.data[588] = 255 ;
        pdata.data[589] = 255 ;
        pdata.data[590] = 255 ;

        pdata.data[664] = 255 ;
        pdata.data[665] = 255 ;
        pdata.data[666] = 255 ;

        pdata.data[668] = 255 ;
        pdata.data[669] = 255 ;
        pdata.data[670] = 255 ;

        pdata.data[748] = 255 ;
        pdata.data[749] = 255 ;
        pdata.data[750] = 255 ;

        pdata.data[828] = 255 ;
        pdata.data[829] = 255 ;
        pdata.data[830] = 255 ;

        pdata.data[908] = 255 ;
        pdata.data[909] = 255 ;
        pdata.data[910] = 255 ;

        pdata.data[904] = 255 ;
        pdata.data[905] = 255 ;
        pdata.data[906] = 255 ;

        pdata.data[984] = 255 ;
        pdata.data[985] = 255 ;
        pdata.data[986] = 255 ;

        pdata.data[980] = 255 ;
        pdata.data[981] = 255 ;
        pdata.data[982] = 255 ;

        pdata.data[976] = 255 ;
        pdata.data[977] = 255 ;
        pdata.data[978] = 255 ;

        pdata.data[1056] = 255 ;
        pdata.data[1057] = 255 ;
        pdata.data[1058] = 255 ;

        pdata.data[972] = 255 ;
        pdata.data[973] = 255 ;
        pdata.data[974] = 255 ;

        pdata.data[968] = 255 ;
        pdata.data[969] = 255 ;
        pdata.data[970] = 255 ;

        pdata.data[888] = 255 ;
        pdata.data[889] = 255 ;
        pdata.data[890] = 255 ;

        pdata.data[808] = 255 ;
        pdata.data[809] = 255 ;
        pdata.data[810] = 255 ;

        pdata.data[728] = 255 ;
        pdata.data[729] = 255 ;
        pdata.data[710] = 255 ;

        pdata.data[648] = 255 ;
        pdata.data[649] = 255 ;
        pdata.data[650] = 255 ;

        pdata.data[568] = 255 ;
        pdata.data[569] = 255 ;
        pdata.data[570] = 255 ;

        pdata.data[488] = 255 ;
        pdata.data[489] = 255 ;
        pdata.data[490] = 255 ;
        return pdata ;
};
       
        
}