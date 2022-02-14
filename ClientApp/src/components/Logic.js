export default function FactoryLogic() {
    let colourList = [];

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

    return { cssColourValidation,
             filtering,
             getColourList,
    }   
}