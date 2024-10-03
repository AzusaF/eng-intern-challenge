const BRAILLE_TO_ALPHANUMERIC = {
   'O.....': ['a', '1'],
   'O.O...': ['b', '2'],
   'OO....': ['c', '3'],
   'OO.O..': ['d', '4'],
   'O..O..': ['e', '5'],
   'OOO...': ['f', '6'],
   'OOOO..': ['g', '7'],
   'O.OO..': ['h', '8'],
   '.OO...': ['i', '9'],
   '.OOO..': ['j', '0'],
   'O...O.': ['k'],
   'O.O.O.': ['l'],
   'OO..O.': ['m'],
   'OO.OO.': ['n'],
   'O..OO.': ['o'],
   'OOO.O.': ['p'],
   'OOOOO.': ['q'],
   'O.OOO.': ['r'],
   '.OO.O.': ['s'],
   '.OOOO.': ['t'],
   'O...OO': ['u'],
   'O.O.OO': ['v'],
   '.OOO.O': ['w'],
   'OO..OO': ['x'],
   'OO.OOO': ['y'],
   'O..OOO': ['z']
}

const CAPTAL_FOLLOWS = '.....O';
const DECIMAL_FOLLOWS = '.O...O'; 
const NUMBER_FOLLOWS = '.O.OOO';
const SPACE = '......'

const brailleToEnglish = (str) =>{
   let len = str.length;
   let numOfChars = len/6;
   let chars = [];
   for (let i = 0; i < len; i +=6){
      chars.push(str.substring(i,i+6));
   }
   let isCapital = false;
   let isNum = false;
   let res = '';
   for (let i = 0; i < numOfChars; i++){
      switch(chars[i]){
         case CAPTAL_FOLLOWS:
            isCapital = true;
            break;
         case NUMBER_FOLLOWS:
            isNum  = true;
            break;
         default:
            if(isNum){
               if(chars[i] == DECIMAL_FOLLOWS){
                  res += '.'
               } else if(chars[i] == SPACE) {
                  isNum = false;
               } else {
                  temp = convertToEnglish(chars[i])
                  res += temp[1];
               }
            } else if(isCapital) {
               temp = convertToEnglish(chars[i])
               res += temp[0].toUpperCase();
               isCapital = false;
            } else if(chars[i] == SPACE){
               res += ' ';
            } else {
               temp = convertToEnglish(chars[i])
               res += temp[0];
            }
      }
   }
   return res;
}

const convertToEnglish = (ch) =>{
   return BRAILLE_TO_ALPHANUMERIC[ch];
}

const translate = (input) =>{
   return brailleToEnglish(input)
}

const input = process.argv.slice(2).join(' ');
if (!input) process.exit(1);

try{
   console.log(translate(input));
} catch (error){
   console.log("failed")
   console.log(error.message);
   process.exit(1);
}