import { useState } from "react"
import { CurrencyType } from "../App"

function useSelectCurrency(props: SelectLabelProps) {
    const {initOptions, title} = props

    const [state, setState] = useState<string>('')
    const [options, setOptions] = useState<CurrencyType[]>(initOptions)    

    const SelectCurrency = () => (
        <div className='select'>
            <label htmlFor={title}>{title}</label>
            <select id={title} value={state}
                onChange={(e) => setState(e.target.value)}>
                <option style={{color: "grey"}} value={''}>Seleccionar</option>
                {options.map((value) => (
                    <option key={value.id} value={value.id}>
                        {value.name}
                    </option>))}
            </select>
        </div>
    )

    const addOptions = (value: CurrencyType[]) => {
        setOptions(value)
    }

    return { state, SelectCurrency, addOptions }
}

export default useSelectCurrency

type SelectLabelProps = {
    initOptions: CurrencyType[]
    title: string
    // value: string
    // setValue: (value: string) => void
}