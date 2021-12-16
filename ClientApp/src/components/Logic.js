export default function FactoryLogic() {
    let colourList = [];
    let timeLimitVal = 5;

    function getColourList(colList){
        colourList = colList;
    }

    function cssColourValidation(colVal){
        let trim = colVal.trim();

        let removeWhiteSpaceBetween = trim.replace(/\s+/g, '');
        let lowerCase = removeWhiteSpaceBetween.toLowerCase(); 
        let validCSSColour = new Option().style;
        validCSSColour.color = lowerCase;

        if(validCSSColour.color){
            return validCSSColour.color;
        } else {
            return false;
        }
    }

    function filtering(rank) {
        
        if (rank === "trending") {
            var filt = colourList.filter(function(itt){
                return itt.requests > 11;
            })
            return filt;

        } else if (rank === "popular") {
            var filt2 = colourList.filter(function(itt){
                return itt.requests > 5 && itt.requests <= 11;
            })
            return filt2;

        } else if (rank === "up and coming") {
            var filt3 = colourList.filter(function(itt){
                return itt.requests >= 1 && itt.requests <=5;
            })
            return filt3;
        } 
    }

    function getTimeLimitVal(timeVal) {
        timeLimitVal = timeVal;
    }

    function timeLimit() {
        let trendingList = filtering("trending");
        if (trendingList.length>0){
            for (let i = 0; i < trendingList.length; i++) {
                let itt = trendingList[i];
                console.log(itt.cssstylecolourvalue);
            }
        }
    }


    return { cssColourValidation,
             filtering,
             getTimeLimitVal,
             timeLimit,
             getColourList
    }   
}