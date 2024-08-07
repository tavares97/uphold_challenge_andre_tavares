import AEDImage from '../assets/AED.png'
import ARSImage from '../assets/ARS.png'
import AUDImage from '../assets/AUD.png'
import BCHImage from '../assets/BCH.png'
import BRLImage from '../assets/BRL.png'
import BTCImage from '../assets/BTC.png'
import CADImage from '../assets/CAD.png'
import CNYImage from '../assets/CNY.png'
import ETHImage from '../assets/ETH.png'
import EURImage from '../assets/EUR.png'
import GBPImage from '../assets/GBP.png'
import HKDImage from '../assets/HKD.png'
import ILSImage from '../assets/ILS.png'
import INRImage from '../assets/INR.png'
import JPYImage from '../assets/JPY.png'
import SDK from '@uphold/uphold-sdk-javascript'
import USDImage from '../assets/USD.png'

const sdk = new SDK({
    baseUrl: 'http://api-sandbox.uphold.com',
    clientId: 'foo',
    clientSecret: 'bar',
})

export interface Rate {
    ask: string
    bid: string
    currency: string
}

export interface Currency {
    code: string
    name: string
    image: string
}

const currencies: Currency[] = [
    {
        code: 'AED',
        name: 'United Arab Emirates Dirham',
        image: AEDImage,
    },
    { code: 'ARS', name: 'Argentine Peso', image: ARSImage },
    { code: 'AUD', name: 'Australian Dollar', image: AUDImage },
    { code: 'BCH', name: 'Bitcoin Cash', image: BCHImage },
    { code: 'BRL', name: 'Brazilian Real', image: BRLImage },
    { code: 'BTC', name: 'Bitcoin', image: BTCImage },
    { code: 'CAD', name: 'Canadian Dollar', image: CADImage },
    { code: 'CNY', name: 'Chinese Yuan', image: CNYImage },
    { code: 'ETH', name: 'Ethereum', image: ETHImage },
    { code: 'EUR', name: 'Euro', image: EURImage },
    { code: 'GBP', name: 'British Pound', image: GBPImage },
    { code: 'HKD', name: 'Hong Kong Dollar', image: HKDImage },
    { code: 'ILS', name: 'Israeli New Shekel', image: ILSImage },
    { code: 'INR', name: 'Indian Rupee', image: INRImage },
    { code: 'JPY', name: 'Japanese Yen', image: JPYImage },
    { code: 'USD', name: 'United States Dollar', image: USDImage },
]

const upholdService = {
    async getTicker(currency = 'USD'): Promise<Rate[]> {
        try {
            const response = await sdk.getTicker(currency)
            return response
        } catch (error) {
            console.error('Error fetching ticker:', error)
            throw error
        }
    },

    getCurrencies(): Currency[] {
        return currencies
    },
}

export default upholdService
