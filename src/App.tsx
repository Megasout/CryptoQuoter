import { useEffect, useState } from 'react'
import './App.scss'
import image from "./assets/imagen-criptos.png"
import useSelectCurrency from './hooks/useSelectCurrency'
import { ErrorMessage } from './Components/StyledComponets'
import { ReadApi } from './helpers'
import Result from './Components/Result'
import Spiner from './Components/Spinner'

function App() {
  const [error, setError] = useState<string>('')
  const [convertionData, setConvertionData] = useState<CryptoData>()
  const [loader, setLoader] = useState(false)

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

  const readApi = ReadApi.getInstance()

  useEffect(() => {
    async function responseApi() {
      setCryptos(await readApi.getCryptoCurrency())
    }

    responseApi()
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoader(true)
    e.preventDefault()

    if (currency == '')
      return setError('Seleccione una moneda')

    if (crypto == '')
      return setError('Seleccione una criptomoneda')


    setError('')

    const data = await readApi.getCryptoData(currency, crypto)
    setConvertionData({ ...data, region: currency })
    setLoader(false)
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
        { loader ? (<Spiner/>) 
        : typeof convertionData != 'undefined' &&
          (<Result
            region={convertionData.region}
            price={convertionData.price}
            hight={convertionData.hight}
            low={convertionData.low}
            change24Hours={convertionData.change24Hours}
            lastUpdate={convertionData.lastUpdate}
            imageUrl={convertionData.imageUrl} />)}
      </div>
    </main>
  )
}

export default App

export type CurrencyType = {
  id: string
  name: string
}

export type CryptoData = {
  price: number
  hight: number
  low: number
  change24Hours: number
  lastUpdate: number
  imageUrl: string
  region?: string
}