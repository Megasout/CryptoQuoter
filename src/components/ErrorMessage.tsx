import './ErrorMessage.scss'

type ErrorMessageProps ={
    children: React.ReactNode
}

function ErrorMessage(props: ErrorMessageProps) {
    return (
        <div className='errorMessage'>
            {props.children}
        </div>
    )
}

export default ErrorMessage