(() => {
    let container = document.querySelector('.container');
    let flippedCard = false;
    let firstCard, secondCard;
    let lockBoard = false;
    let cardsQuantity = prompt('How many cards do you want? Enter even number from 2 to 10.');
    if ((cardsQuantity%2 !== 0)||(cardsQuantity < 2)||(cardsQuantity > 10)) {
        cardsQuantity = 4
        }
    
    //создаём и перемешиваем массив:
    function createAndShuffleArray(quantity) {
        let array = [];
        for (let i = 0; i < quantity/2; i++) {
            array.push(i);
            array.push(i);
        }
        let swop;
        for (let i = 0; i < quantity; i++) {
            let randomIndex = Math.round(Math.random()*(quantity-1));
            swop = array[randomIndex];
            array[randomIndex] = array[i];
            array[i] = swop;
        }
        return array;
    }

    function createCards(quantity, numbers) {
        for (let i = 0; i < cardsQuantity; i++) {
            let cardItem = document.createElement('div');
            cardItem.classList.add('card');
            cardItem.setAttribute('data-number', numbers[i]);

            let cardFront = document.createElement('div');
            cardFront.textContent = numbers[i];
            cardFront.classList.add('front');
            cardItem.append(cardFront);
            let cardBack = document.createElement('div');
            cardBack.textContent = "¯\\_(\ツ)_/¯";
            cardBack.classList.add('back');
            cardItem.append(cardBack);

            container.append(cardItem);
        }
        
        let cards = document.querySelectorAll('.card');
        cards.forEach(card => card.addEventListener('click', flipCard));

    }
    
    function flipCard() {
    if (lockBoard)  {return};
        if (!flippedCard) {
            firstCard = this;
            flippedCard = true;
            this.classList.add('fliped'); 
        } else {
            if (this.classList.contains('fliped')) {return};
            this.classList.add('fliped'); 
            secondCard = this;
            if (firstCard.dataset.number == secondCard.dataset.number) {//совпали
                cardsMatched()
            } else { //не совпали
                cardsDontMatched()
            }
        }
    }

    function cardsMatched() {
        firstCard.removeEventListener;
        secondCard.removeEventListener;
        flippedCard = false;
    }

    function cardsDontMatched() {
        lockBoard = true;
        setTimeout(() => {
            firstCard.classList.remove('fliped');
            secondCard.classList.remove('fliped');
            flippedCard = false;
            lockBoard = false;
            }, 1000)
    }

    document.addEventListener('DOMContentLoaded', () => {
        let numbersArray = createAndShuffleArray(cardsQuantity);
        
        createCards(cardsQuantity, numbersArray);
    })
}) ();