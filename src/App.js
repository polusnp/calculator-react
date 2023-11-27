import { useState, useEffect } from "react"
import { calcData, operators, numbers } from "./assets/calcData"
import Display from "./components/Display"
import Keybord from "./components/Keybord"
import "./App.css"

function App() {
  const [input, setInput] = useState("0")
  const [output, setOutput] = useState("")
  const [calculatorData, setCalculatorData] = useState("")

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
