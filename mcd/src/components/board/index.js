import { useState } from 'react';
import Robot from '../robot';
import './styles.css'

const Board = () => {
    const directions = [
        { name: "DIRECTION", value: '' },
        { name: "WEST", value: 'WEST' },
        { name: "NORTH", value: 'NORTH' },
        { name: "EAST", value: 'EAST' },
        { name: "SOUTH", value: 'SOUTH' },
    ]

    const inputs = [
        { name: "Column" },
        { name: "Row" },
        { name: "Facing", type: 'select' }
    ]

    const [state, setState] = useState([])
    const [position, setPosition] = useState()
    const [robotPosition, setRobotPosition] = useState()
    const [wallPosition, setWallPosition] = useState([])
    const [reportActive, setReportActive] = useState(false)
    const [coordinates, setCoordinates] = useState()
    const [direction, setDirection] = useState()


    const onChange = (e) => {
        state[e && e.target.id && e.target.id.toLowerCase()] = e && e.target.value
        setState({...state})
        setReportActive(false)
    }

    const placeRobot = () => {
        if (!state.row) {
            setPosition("1,1")
        } else if (state.row && state.column && state.facing &&
            wallPosition.indexOf(`${state.row},${state.column}`) === -1) {
            setRobotPosition(state.facing)
            setCoordinates(state)
            setPosition(`${state.row},${state.column}`)
        }

    }


    const placeWall = () => {
        if (state.row && state.column) {
            let temp = `${state.row},${state.column}`
            if (temp !== position && wallPosition.indexOf(temp) === -1) {
                setWallPosition([
                    ...wallPosition,
                    `${state.row},${state.column}`
                ]);
            }
        }
    }

    const turnRobot = () => {
        const theDirections = directions.slice(1, directions && directions.length)
        let id = theDirections.findIndex((element) => element.name === robotPosition)
        if (direction === "LEFT") {
            if (id === 0) {
                id = theDirections.length
            } else if (id === theDirections.length) {
                id = 0
            }
            onChange({ target: { id: "facing", value: theDirections[id - 1].name } })
        } else {
            onChange({ target: { id: "facing", value: theDirections[id === 3 ? id = 0 : id + 1].name } })
        }
        placeRobot()
    }

    const moveButton = () => {
        let item
        let item2
        switch (robotPosition) {
            case 'EAST':
                if (parseInt(coordinates.column) < 5) {
                    item = { target: { id: "row", value: parseInt(coordinates.row) } }
                    item2 = { target: { id: "column", value: parseInt(coordinates.column) + 1 } }
                }
                else {
                    item = { target: { id: "row", value: parseInt(coordinates.row) } }
                    item2 = { target: { id: "column", value: 1 } }
                }
                break;
            case 'WEST':
                if (parseInt(coordinates.column) > 1) {
                    item = { target: { id: "row", value: parseInt(coordinates.row) } }
                    item2 = { target: { id: "column", value: parseInt(coordinates.column) - 1 } }
                }
                else {
                    item = { target: { id: "row", value: parseInt(coordinates.row) } }
                    item2 = { target: { id: "column", value: 5 } }
                }
                break;

            case 'NORTH':
                if (parseInt(coordinates.row) < 5) {
                    item = { target: { id: "row", value: parseInt(coordinates.row) + 1 } }
                    item2 = { target: { id: "column", value: parseInt(coordinates.column) } }
                }
                else {
                    item = { target: { id: "row", value: 1 } }
                    item2 = { target: { id: "column", value: parseInt(coordinates.column) } }
                }
                break;
            case 'SOUTH':
                if (parseInt(coordinates.row) > 1) {
                    item = { target: { id: "row", value: parseInt(coordinates.row) - 1 } }
                    item2 = { target: { id: "column", value: parseInt(coordinates.column) } }
                }
                else {
                    item = { target: { id: "row", value: 5 } }
                    item2 = { target: { id: "column", value: parseInt(coordinates.column) } }
                }
                break;
            default:
                console.log('default');
        }

        if (
            wallPosition.indexOf(`${item&&item.target.value},${item2&&item2.target.value}`) === -1
        ) {
            onChange(item)
            onChange(item2)
            placeRobot()
        }
    }


    return (
        <div>
            <div className='rowTitle'>
                <h1>Toy Robot Game</h1>
                <div>
                    <label id="reportLabel">Report:</label>
                    <span id="report">
                        {reportActive ?
                            `${position},${robotPosition}` : ""}
                    </span>
                </div>
            </div>
            <div id="tablero">
                {[1, 2, 3, 4, 5].map((y, e) => {
                    return <div key={y} className="columns">
                        {[5, 4, 3, 2, 1].map((x, e) => {
                            if (`${x},${y}` === position) {
                                return (
                                    <span key={x} className="robot" id={`${x},${y}`}>
                                        <Robot direction={robotPosition} />
                                    </span>)
                            } else {
                                return (
                                    <span key={x} id={`${x},${y}`} className="wall">
                                        {wallPosition.length > 0 && wallPosition.indexOf(`${x},${y}`) > -1 ?
                                            "/" : ""}
                                    </span>)

                            }
                        })}
                    </div>
                })}
            </div>
            <div className='rowFilters'>
                <div className='inputs'>
                    {inputs.map((input, i) =>
                        <div key={i}>
                            {!input.type ?
                                <div className='column'>
                                    <label>{input.name}</label>
                                    <input id={input.name} value={state[input && input.name.toLowerCase()]}
                                        onChange={(e) => onChange(e)}></input>
                                </div> :
                                <div className='column'>
                                    <label>{input.name}</label>
                                    <select id={input.name} onChange={(e) => onChange(e)}>
                                        {directions.map((direct, i) =>
                                            <option value={state.facing || direct.name}
                                                selected={state.facing === direct.name && true}
                                                key={i}>{state.facing || direct.name}</option>
                                        )}
                                    </select>
                                </div>}
                        </div>)}
                </div>
                <div className='column'>
                    <div className='row'>
                        <button id="placeRobot" onClick={() => placeRobot()}>Place robot</button>
                        <button id="move" onClick={() => moveButton()}>Move</button>
                    </div>
                    <div className='row'>
                        <button id="placeWall" onClick={() => placeWall()}>Place wall</button>
                        <button id="reportButton" onClick={() => { position && setReportActive(!reportActive) }}>Report</button>
                    </div>
                    <label>Direction</label>
                    <select id="direction" onChange={(e) => setDirection(e.target.value)}>
                        {["LEFT/RIGHT", "LEFT", "RIGHT"].map((direct, i) =>
                            <option value={direct} key={i}>{direct}</option>
                        )}
                    </select>
                    <button id="turn" onClick={() => turnRobot()}>Turn direction</button>
                </div>
            </div>


        </div>
    )

}

export default Board;