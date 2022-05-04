import './styles.css'

const Robot = (props) => {
    return (
        <div className={props.direction === "WEST" || props.direction === "EAST" ? "imgRobot" :
            "imgRobotColumn"}>
            {props.direction === "WEST" && <img src='/img/arrow.png' className={"west"} />}
            {props.direction === "NORTH" && <img src='/img/arrow.png'id="north" className={"north"} />}

            <img src='/img/robot.png' className="robot" />

            {props.direction === "EAST" && <img  id="east" src='/img/arrow.png' className={"east"} />}
            {props.direction === "SOUTH" && <img src='/img/arrow.png' className={"south"} />}
        </div>)
}

export default Robot