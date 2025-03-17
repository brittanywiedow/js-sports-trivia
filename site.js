
// import the utility functions "decodeHtml" and "shuffle"
import { decodeHtml, shuffle } from './utils.js' 

// get the elements from the DOM
const questionElement = document.querySelector('#question')
const answersElement = document.querySelector('#answers')
const nextQuestionElement = document.querySelector('#nextQuestion')

// IIFE (so we can use async/await)
;(async () => {

	// todo: create your "getNextQuestion" arrow function, parse JSON response, create JSON variable
	const getNextQuestion = async () => {
		const url = "https://opentdb.com/api.php?amount=1&category=21&difficulty=easy&type=multiple"
		const response = await fetch(url)
		const json = await response.json()
		// extract question, correct answer, and incorrect answers from response
		const { question, correct_answer: correct, incorrect_answers: incorrect } = json.results[0]
		const answers = shuffle([ ...incorrect, correct ])
		return { question, answers, correct }
	}

	// test 
	// console.log(await getNextQuestion())

	// todo: create your "renderQuestion" arrow function, display questions, input will be return of getNextQuestion
	// use const renderQuestion right in the parameter list or as a separate line
	const renderQuestion = ({ question, answers, correct }) => {
		// use decodeHtml function to decode question and display
		questionElement.textContent = decodeHtml(question)
		// clear previous answers before for each answer loop, set string to empty 
		answersElement.innerHTML = ""
		// for each loop to display possible answers
		answers.forEach(answer => {
			// set button for each 
			const button = document.createElement("button")
			// set the textContent of the buttons to the answer using decodeHtml function
			button.textContent = decodeHtml(answer)

			// event listener for answer button click
			button.addEventListener("click", () => {
				// copied code 
				if (answer === correct) {
					button.classList.add('correct')
					answersElement.querySelectorAll('button').forEach(b => b.disabled = true)
					alert('Correct!')
					return
				}
				button.disabled = true
				alert('Incorrect!')})
				// append to display **pokemon page
				answersElement.append(button)
		})
	}
	
		// todo: add the event listener to the "nextQuestion" button
		// undefined?
		// add async and await to this one
		nextQuestionElement.addEventListener("click", async () => {
			renderQuestion(await getNextQuestion())
			nextQuestionElement.disabled = true
			setTimeout(() => nextQuestionElement.disabled = false, 10000)
	})

})()

// mimic a click on the "nextQuestion" button to show the first question
nextQuestionElement.click()
