import { useEffect, useState } from 'react'
import './App.scss'
import image from "./assets/imagen-criptos.png"
import useSelectCurrency from './hooks/useSelectCurrency'
import ErrorMessage from './components/ErrorMessage'

function App() {
  const [error, setError] = useState<string>('')

  //TODO: hooks personalizados
  const { state: currency, SelectCurrency } = useSelectCurrency({
    initOptions: [
      { id: 'USD', name: 'Dolar de Estados Unidos' },
      { id: 'UYU', name: 'Peso Uruguayo' },
      { id: 'JPY', name: 'Yen Japones' },
      { id: 'EUR', name: 'Euro' }],
    title: 'Seleccione la moneda',
  })

  const {
    state: crypto,
    SelectCurrency: SelectCrypto,
    addOptions: setCryptos
  } = useSelectCurrency({
    initOptions: [],
    title: 'Seleccione la criptomoneda',
  })

  useEffect(() => {
    async function responseApi() {
      const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD"
      const response = await fetch(url)
      const result = await response.json()

      const arrayCryptos: CurrencyType[] = result.Data.map(
        (crypto: any) => {
          return { id: crypto.CoinInfo.Name, name: crypto.CoinInfo.FullName }
        }
      )

      setCryptos(arrayCryptos)
    }

    responseApi()

  }, [])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    console.log('press')

    if (currency == '')
      return setError('Seleccione una moneda')

    if (crypto == '')
      return setError('Seleccione una criptomoneda')

    console.log('enviar datos')
  }

  return (
    <main className='appContainer'>
      <img className='imageContainer'
        src={image}
        alt='Imagen de logos de Criptomonedas'
        draggable={false} />
      <div className='functionsContainer'>
        <h1>Cotiza una Criptomoneda</h1>
        <div className='line' />
        <form onSubmit={handleSubmit}>
          <SelectCurrency />
          <SelectCrypto />
          <input
            className='button'
            type='submit'
            value='Cotizar' />
        </form>
        {error != '' &&
          (<ErrorMessage>{error}</ErrorMessage>)}
      </div>
    </main>
  )
}

export default App

export type CurrencyType = {
  id: string
  name: string
}