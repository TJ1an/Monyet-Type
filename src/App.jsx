import { useState, useEffect, useRef } from 'react';

export default function App() {
  const wordsList = 'in one good real one not school set they state high life consider on and not come what also for set point can want as while with of order child about school thing never hold find order each too between program work end you home place around while place problem end begin interest while public or where see time those increase interest be give end think seem small as both another a child same eye you between way do who into again good fact than under very head become real possible some write know however late each that with because that place nation only for each change form consider we would interest with world so order or run more open that large write turn never over open each over change still old take hold need give by consider line only leave while what set up number part form want against great problem can because head so first this here would course become help year first end want both fact public long word down also long for without new turn against the because write seem line interest call not if line thing what work people way may old consider leave hold want life between most place may if go who need fact such program where which end off child down change to from people high during people find to however into small new general it do that could old for last get another hand much eye great no work and with but good there last think can around use like number never since world need what we around part show new come seem while some and since still small these you general which seem will place come order form how about just also they with state late use both early too lead general seem there point take general seem few out like might under if ask while such interest feel word right again how about system such between late want fact up problem stand new say move a lead small however large public out by eye here over so be way use like say people work for since interest so face order school good not most run problem group run she late other problem real form what just high no man do under would to each too end point give number child through so this large see get form also all those course to work during about he plan still so like down he look down where course at who plan way so since come against he all who at world because while so few last these mean take house who old way large no first too now off would in this course present order home public school back own little about he develop of do over help day house stand present another by few come that down last or use say take would each even govern play around back under some line think she even when from do real problem between long as there school do as mean to all on other good may from might call world thing life turn of he look last problem after get show want need thing old other during be again develop come from consider the now number say life interest to system only group world same state school one problem between for turn run at very against eye must go both still all a as so after play eye little be those should out after which these both much house become both school this he real and may mean time by real number other as feel at end ask plan come turn by all head increase he present increase use stand after see order lead than system here ask in of look point little too without each for both but right we come world much own set we right off long those stand go both but under now must real general then before with much those at no of we only back these person plan from run new as own take early just increase only look open follow get that on system the mean plan man over it possible if most late line would first without real hand say turn point small set at in system however to be home show new again come under because about show face child know person large program how over could thing from out world while nation stand part run have look what many system order some one program you great could write day do he any also where child late face eye run still again on by as call high the must by late little mean never another seem to leave because for day against public long number word about after much need open change also'.split(' ');

  const [inputFieldValue, setInputFieldValue] = useState('');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const [correctWordsCount, setCorrectWordsCount] = useState(0);
  const [incorrectWordsCount, setIncorrectWordsCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [selectTime, setSelectTime] = useState(60);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [wrongAlert, setWrongAlert] = useState(false);
  const timerRef = useRef(null);
  const [activeButtonIndex, setActiveButtonIndex] = useState(2);

  const currentWord = wordsList[currentWordIndex] || '';

  const handleInputChange = (e) => {
    const key = e.nativeEvent.data; // The key that was pressed
    const expectedLetter = currentWord[currentLetterIndex]; // The expected letter based on current position
  
    if (!gameStarted) {
      setGameStarted(true); // Start the game if it's the first keypress
      startTimer();
    }
  
    // When space is pressed, check the whole word
    if (key === ' ') {
      if (inputFieldValue.trim() === currentWord) {
        setCorrectWordsCount(correctWordsCount + 1); // Correct word
        setCurrentWordIndex(currentWordIndex + 1);
        setCurrentLetterIndex(0);
        setInputFieldValue('');
        setWrongAlert(false);
      }
    } 
    // Handle regular typing
    else {
      // Check if the typed letter matches the expected letter
      if (key === expectedLetter) {
        setCurrentLetterIndex(currentLetterIndex + 1); // Move to the next letter
        setInputFieldValue(e.target.value); 
        setWrongAlert(false); // No error, correct letter
      } else {
        setWrongAlert(true); 
        setIncorrectWordsCount(incorrectWordsCount + 1);
      }

    }
  };
  

  const startTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    timerRef.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timerRef.current); 
          setGameOver(true);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  };

  const resetGame = (time) => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    setCurrentWordIndex(0);
    setCurrentLetterIndex(0);
    setCorrectWordsCount(0);
    setIncorrectWordsCount(0);
    setTimeLeft(time);
    setGameStarted(false);
    setGameOver(false);
    setInputFieldValue('');
  }

  const setNewTime = (time, buttonIndex) =>{
    resetGame(time);
    setSelectTime(time);
    setTimeLeft(time);
    setActiveButtonIndex(buttonIndex);
  }

  return (
    <>
    <div class="flex flex-col">
      <div class = "text-3xl font-bold text-orange-500 bg-gray-900 px-12 font-mono pt-5">MonyetType</div>
    </div>
      <div class="flex h-screen bg-gray-900 flex-col px-10 items-center justify-center text-white">
        <div class="w-full max-w-4xl">
          <div class="text-2xl pb-4 font-mono">Time Left: {timeLeft}s</div>
          <div class="flex space-x-2">
            <button onClick={() => setNewTime(15, 0)} class={activeButtonIndex === 0 ? 'bg-orange-500 rounded-lg p-1 font-mono' : 'bg-transparent'}>15s </button>
            <button onClick={() => setNewTime(30, 1)} class={activeButtonIndex === 1 ? 'bg-orange-500 rounded-lg p-1 font-mono' : 'bg-transparent'}>30s </button>
            <button onClick={() => setNewTime(60, 2)}  class={activeButtonIndex === 2 ? 'bg-orange-500 rounded-lg p-1 font-mono' : 'bg-transparent'}>60s </button>
          </div>
          <div class="flex flex-wrap justify-center text-2xl font-mono bg-gray-800 p-4 rounded-lg">
            {wordsList.slice(0, currentWordIndex + 8).map((word, index) => (
              <div
                key={index}
                class={`px-2 ${
                  currentWordIndex === index ? 'text-orange-500' : ''
                }`}
              >
                {index === currentWordIndex ? (
                  <>
                    <span class="text-green-500">
                      {word.slice(0, currentLetterIndex)}
                    </span>
                    <span>
                      {word.slice(currentLetterIndex)}
                    </span>
                  </>
                ) : (
                  word
                )}
              </div>
            ))}
          </div>
          <div class="mt-4">
            <input
              type="text"
              value={inputFieldValue}
              onChange={handleInputChange}
              disabled={gameOver}
              className={`w-full p-2 text-2xl text-center bg-gray-700 rounded-lg outline-none ${
              wrongAlert ? 'border-red-500 border-2' : ''
              }`}
              placeholder="Type here..."
            />
          </div>

          <div class="mt-4">
            {gameOver ? (
              <>
              <h2 class="text-2xl">Game Over! Your WPM: {(correctWordsCount / selectTime) * 60}</h2>
              <h2 class="text-xl">Correct Words: {correctWordsCount} | Incorrect Words: {incorrectWordsCount}</h2>
              </>
            ) : null}
          </div>

          <div class="mt-4">
            <button
              onClick={() => resetGame(selectTime)} // Use an arrow function to call resetGame on click
              class="bg-orange-500 text-white px-6 py-2 rounded-lg text-xl font-mono"
            >
              Reset Game
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
