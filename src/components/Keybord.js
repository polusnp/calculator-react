import Key from "./Key"

function Keybord({ calcdata, handleInput }) {
  return (
    <div className="keys">
      {calcdata.map((key) => (
        <Key key={key.id} keyData={key} handleInput={handleInput} />
      ))}
    </div>
  )
}

export default Keybord
