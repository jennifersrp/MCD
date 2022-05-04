import React from "react";
import Board, { onChange } from "../components/board";
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow } from "enzyme/build";
import Robot from "../components/robot";



Enzyme.configure({ adapter: new Adapter() })

test('check if it doesnt crush', () => {
    const component = shallow(<Board />)
    expect(component).toBeTruthy()
})
test('if row, column and facing display robot', () => {
    const component = shallow(<Board />)
    const e = { target: { id: "Row", value: "2" } }
    const e1 = { target: { id: "Column", value: "2" } }
    const e2 = { target: { id: "Facing", value: "north" } }

    const Row = component.find("#Row")
    const Column = component.find("#Column")
    const Facing = component.find("#Facing")
    expect(Row.simulate("change", e))
    expect(Column.simulate("change", e1))
    expect(Facing.simulate("change", e2))
    expect(component.find("#placeRobot").simulate("click"))
    expect(component.find(".robot").containsMatchingElement(<Robot />)).toEqual(true);
    expect(component.find("wall").containsMatchingElement(<Robot />)).toEqual(false);

})
test('if row, column display wall', () => {
    const component = shallow(<Board />)
    const e = { target: { id: "Row", value: "1" } }
    const e1 = { target: { id: "Column", value: "1" } }

    const Row = component.find("#Row")
    const Column = component.find("#Column")

    expect(Row.simulate("change", e))
    expect(Column.simulate("change", e1))
    expect(component.find("#placeWall").simulate("click"))
    expect(component.text().includes('/')).toBe(true);

})

test('dont show report mark until press the report button', () => {
    const component = shallow(<Board />)
    expect(component.find("#report").text().includes("2,1,north")).toBe(false)
    const e = { target: { id: "Row", value: "2" } }
    const e1 = { target: { id: "Column", value: "2" } }
    const e2 = { target: { id: "Facing", value: "north" } }

    const Row = component.find("#Row")
    const Column = component.find("#Column")
    const Facing = component.find("#Facing")
    expect(Row.simulate("change", e))
    expect(Column.simulate("change", e1))
    expect(Facing.simulate("change", e2))
    expect(component.find("#placeRobot").simulate("click"))
    expect(component.find("#reportButton").simulate("click"))
    expect(component.find("#report").text()).toEqual("2,2,north")

})
test('button move works', () => {
    const component = shallow(<Board />)
    const e = { target: { id: "Row", value: "2" } }
    const e1 = { target: { id: "Column", value: "2" } }
    const e2 = { target: { id: "Facing", value: "north" } }

    const Row = component.find("#Row")
    const Column = component.find("#Column")
    const Facing = component.find("#Facing")
    expect(Row.simulate("change", e))
    expect(Column.simulate("change", e1))
    expect(Facing.simulate("change", e2))
    expect(component.find("#placeRobot").simulate("click"))
    expect(component.find("#move").simulate("click"))
})

test('button move works', () => {
    const component = shallow(<Board />)
    const e = { target: { id: "Row", value: "2" } }
    const e1 = { target: { id: "Column", value: "2" } }
    const e2 = { target: { id: "Facing", value: "north" } }

    const Row = component.find("#Row")
    const Column = component.find("#Column")
    const Facing = component.find("#Facing")
    expect(Row.simulate("change", e))
    expect(Column.simulate("change", e1))
    expect(Facing.simulate("change", e2))
    expect(component.find("#placeRobot").simulate("click"))
    expect(component.find("#direction").simulate("onChange",{target:{value:"right"}}))

    expect(component.find("#turn").simulate("click"))
    expect(component.find("option").at(1).text()).toEqual("WEST")

})


