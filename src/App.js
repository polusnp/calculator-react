import { useState, useEffect } from "react"
import { calcData, operators, numbers } from "./assets/calcData"
import Display from "./components/Display"
import Keybord from "./components/Keybord"
import "./App.css"

function App() {
  const [input, setInput] = useState("0")
  const [output, setOutput] = useState("")
  const [calculatorData, setCalculatorData] = useState("")

  const handleSubmit = () => {
    const total = eval(calculatorData)
    setInput(`${total}`)
    setOutput(`${total}`)
    setCalculatorData(`${total}`)
  }

  const handleClear = () => {
    setInput("0")
    setOutput("")
    setCalculatorData("")
  }

  const handleNumbers = (value) => {
    if (!calculatorData.length) {
      setInput(`${value}`)
      setCalculatorData(`${value}`)
    } else {
      if (value === 0 && (calculatorData === "0" || input === "0")) {
        setCalculatorData(`${calculatorData}`)
      } else {
        const lastChat = calculatorData.charAt(calculatorData.length - 1)
        const isLastChatOperator =
          lastChat === "*" || operators.includes(lastChat)

        setInput(isLastChatOperator ? `${value}` : `${input}${value}`)
        setCalculatorData(`${calculatorData}${value}`)
      }
    }
  }

  const dotOperator = () => {
    const lastChat = calculatorData.charAt(calculatorData.length - 1)
    if (!calculatorData.length) {
      setInput("0.")
      setCalculatorData("0.")
    } else {
      if (lastChat === "*" || operators.includes(lastChat)) {
        setInput("0.")
        setCalculatorData(`${calculatorData} 0.`)
      } else {
        setInput(
          lastChat === "." || input.includes(".") ? `${input}` : `${input}.`
        )
        const formattedValue =
          lastChat === "." || input.includes(".")
            ? `${calculatorData}`
            : `${calculatorData}.`
        setCalculatorData(formattedValue)
      }
    }
  }

  const handleOperators = (value) => {
    if (calculatorData.length) {
      setInput(`${value}`)
      const beforeLastChat = calculatorData.charAt(calculatorData.length - 2)

      const beforeLastChatIsOperator =
        operators.includes(beforeLastChat) || beforeLastChat === "*"

      const lastChat = calculatorData.charAt(calculatorData.length - 1)

      const lastChatIsOperator =
        operators.includes(lastChat) || lastChat === "*"

      const validOp = value === "x" ? "*" : value
      if (
        (lastChatIsOperator && value !== "-") ||
        (beforeLastChatIsOperator && lastChatIsOperator)
      ) {
        if (beforeLastChatIsOperator) {
          const updatedValue = `${calculatorData.substring(
            0,
            calculatorData.length - 2
          )}${value}`
          setCalculatorData(updatedValue)
        } else {
          setCalculatorData(
            `${calculatorData.substring(
              0,
              calculatorData.length - 1
            )}${validOp}`
          )
        }
      } else {
        setCalculatorData(`${calculatorData}${validOp}`)
      }
    }
  }

  const handleInput = (value) => {
    const number = numbers.find((num) => num === value)
    const operator = operators.find((oper) => oper === value)

    switch (value) {
      case "=":
        handleSubmit()
        break
      case "AC":
        handleClear()
        break
      case number:
        handleNumbers(value)
        break
      case ".":
        dotOperator()
        break
      case operator:
        handleOperators(value)
        break
      default:
        break
    }
  }

  const handleOutput = () => {
    return setOutput(calculatorData)
  }

  useEffect(() => {
    handleOutput()
  }, [calculatorData])

  return (
    <div className="container">
      <div id="app" className="calculator">
        <Display input={input} output={output} />
        <Keybord calcdata={calcData} handleInput={handleInput} />
      </div>
    </div>
  )
}

export default App
