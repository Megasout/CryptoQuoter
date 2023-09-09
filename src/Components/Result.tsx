import { CryptoData } from "../App"
import { Helper } from "../helpers"
import { TextGold, QuoterLabel } from "./StyledComponets"
import "./Result.scss"


function Result(props: CryptoData) {

    const { price, low, change24Hours, hight, lastUpdate, region, imageUrl } = props

    return (
        <div className="responseContainer">
            <div>
                <h2>El<TextGold> Precio </TextGold>es:
                    <TextGold> {Helper.formatCurrency(price, region as string)}</TextGold></h2>
                <QuoterLabel>El precio mas
                    <TextGold> alto </TextGold>
                    del dia es:
                    <TextGold> {Helper.formatCurrency(hight, region as string)}</TextGold></QuoterLabel>
                <QuoterLabel>El precio mas
                    <span style={{ color: "crimson" }}> bajo </span>
                    del dia es:
                    <TextGold> {Helper.formatCurrency(low, region as string)}</TextGold></QuoterLabel>
                <QuoterLabel>La variacion de las ultimas 24 horas:
                    <TextGold> {Helper.formatCurrency(change24Hours, region as string)}</TextGold></QuoterLabel>
                <QuoterLabel>Ultima actualizacion:
                    <TextGold> {Helper.converUNIXtoDate(lastUpdate)}</TextGold></QuoterLabel>
            </div>
            <img src={imageUrl} alt={imageUrl}/>

        </div>
    )
}

export default Result