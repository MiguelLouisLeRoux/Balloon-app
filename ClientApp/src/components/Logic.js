export default function FactoryLogic() {
    let colourList = [];

    function getColourList(colList){
        colourList = colList;
    }
    
    function returnColList(){
        return colourList;
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

    function addingColour(colVal) {
        let trim = colVal.trim();
        let removeWhiteSpaceBetween = trim.replace(/\s+/g, '');
        let lowerCase = removeWhiteSpaceBetween.toLowerCase();
        
        let colExists = colourList.some((elem)=>{ return elem.cssStyleColourValue === lowerCase});
        
        if(colExists){
            let index = colourList.findIndex(elem => {return elem.cssStyleColourValue === lowerCase});
            colourList[index].requests++;
        } else {

            let upperLetter;

            if (/s/.test(trim)) {
                const colour = trim.split(" ");

                upperLetter = colour.map((word) => { 
                    return word[0].toUpperCase() + word.substring(1); 
                }).join(" ");

            } else {
                upperLetter = trim[0].toUpperCase() + trim.substring(1);
            }
 

            let newCol = {
                cssStyleColourValue : lowerCase,
                colour : upperLetter,
                requests : 1,
                time : Date.now()
            }

            colourList.push(newCol);
            console.log(colourList);
            
        }
    }

    function removingColour(colVal) {

    }

    function updatingColour(cssVal, reqVal) {

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
             returnColList,
             addingColour,
             removingColour,
             updatingColour
    }   
}