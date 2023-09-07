import { useState } from 'react'
import './App.scss'
import image from "./assets/imagen-criptos.png"


function App() {
  const [currency, setCurrency] = useState<string>('')
  const [crypto, setCrypto] = useState<string>('')

  return (
    <main className='appContainer'>
      <img className='imageContainer'
        src={image}
        alt='Imagen de logos de Criptomonedas'
        draggable={false} />
      <div className='functionsContainer'>
        <h1>Cotiza una Criptomoneda</h1>
        <div className='line' />
        <form>
          <SelectLabel
            options={[]}
            title='Seleccione su moneda'
            value={currency}
            setValue={setCurrency} />
          <SelectLabel
            options={[]}
            title='Seleccione la criptomoneda'
            value={crypto}
            setValue={setCrypto} />
          <input
            className='button'
            type='submit'
            value='Cotizar' />
        </form>
      </div>
    </main>
  )
}

export default App


type SelectLabelProps = {
  options: string[]
  title: string
  value: string
  setValue: (value: string) => void
}

function SelectLabel(props: SelectLabelProps) {
  const { title, options, value, setValue } = props

  return (
    <div className='select'>
      <label>{title}</label>
      <select value={value}
        onChange={(e) => setValue(e.target.value)}>
        <option>Seleccionar</option>
        {options.map((value) => (
          <option value={value}>
            {value}
          </option>))}
      </select>
    </div>
  )
}