import React from "react";
import Robot from "../components/robot";
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow } from "enzyme/build";



Enzyme.configure({ adapter: new Adapter() })

test('Robot component not crush', () => {
    const component = shallow(<Robot direction={"NORTH"} />)
    expect(component).toBeTruthy()
    expect(component).toMatchSnapshot();
})
test('If Robot is render imgRobot is render', () => {
    const component = shallow(<Robot direction={"NORTH"} />)
    expect(component.find(".robot").length).toBe(1)

})
test('If direction is north className is imgRobotColumn', () => {
    const component = shallow(<Robot direction={"NORTH"} />)
    expect(component.find(".imgRobot").length).toBe(0)
    expect(component.find(".imgRobotColumn").length).toBe(1)


})

test('direction is NORTH', () => {
    const component = shallow(<Robot direction={"NORTH"} />)
    expect(component.find(".north").length).toBe(1)
})
test('direction is SOUTH', () => {
    const component = shallow(<Robot direction={"SOUTH"} />)
    expect(component.find(".south").length).toBe(1)

})
test('direction is WEST', () => {
    const component = shallow(<Robot direction={"SOUTH"} />)
    expect(component.find(".south").length).toBe(1)

})

test('direction is EAST', () => {
    const component = shallow(<Robot direction={"EAST"} />)
    expect(component.find(".east").length).toBe(1)

})


