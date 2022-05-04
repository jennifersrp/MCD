

const Input = (props) => () => {
const input=props.input
    return(
    <input id={input.name} value={props.value}
        onChange={(e)=>props.onChange(e)}>

        </input>
    )
}

export default Input