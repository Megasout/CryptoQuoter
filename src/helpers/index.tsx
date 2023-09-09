import { CryptoData, CurrencyType } from "../App";

export class ReadApi {
    private static instance: ReadApi | null = null;

    private constructor() { }

    public static getInstance(): ReadApi {
        if (!ReadApi.instance) {
            ReadApi.instance = new ReadApi()
        }

        return ReadApi.instance
    }

    private async getResponse(url: string): Promise<any> {
        const response = await fetch(url)
        const result = await response.json()

        return result
    }

    public async getCryptoCurrency(): Promise<CurrencyType[]> {
        const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD"
        const response = await this.getResponse(url)

        return response.Data.map((data: any) => {
            return { id: data.CoinInfo.Name, name: data.CoinInfo.FullName }
        })
    }

    public async getCryptoData(currency: string, crypto: string): Promise<CryptoData> {
        const baseUrl = "https://min-api.cryptocompare.com/data/pricemultifull?"
        const url = baseUrl + 'fsyms=' + crypto + '&tsyms=' + currency
        const response = await this.getResponse(url)

        const data = response.RAW[crypto][currency]

        return {
            price: data.PRICE,
            lastUpdate: data.LASTUPDATE,
            hight: data.HIGHDAY,
            low: data.LOWDAY,
            change24Hours: data.CHANGE24HOUR,
            imageUrl: 'https://www.cryptocompare.com/' + data.IMAGEURL
        }
    }
}

export class Helper {
    static formatCurrency(value: number, region: string): string {
        let symbol: string = ''
        switch (region) {
            case 'USD': symbol = '$'
                break
            case 'UYU': symbol = '$'
                break
            case 'JPY': symbol = '¥'
                break
            case 'EUR': symbol = '€'
        }

        return symbol + value.toLocaleString('es-ES')
    }

    static converUNIXtoDate(value: number): string {
        // Crea una instancia de Date usando el timestamp
        const fecha = new Date(value * 1000); // Multiplicamos por 1000 para convertir segundos a milisegundos

        // Formatea solo la fecha como una cadena legible
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        };
        const fechaFormateada = fecha.toLocaleDateString('es-ES', options); // Cambia 'es-ES' por tu configuración regional

        return fechaFormateada
    }
}