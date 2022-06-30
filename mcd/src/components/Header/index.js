import './styles.css'


const Header = (props) => {
    return (<div className='rowTitle'>
        <h1>Toy Robot Game</h1>
        <div>
            <label id="reportLabel">Report:</label>
            <span id="report">
                {props.reportActive ?
                    `${props.position},${props.robotPosition}` : ""}
            </span>
        </div>
    </div>)
}

export default Header