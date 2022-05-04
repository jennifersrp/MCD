import React from "react";
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow } from "enzyme/build";
import App from './App';


Enzyme.configure({ adapter: new Adapter() })

test('renders Board', () => {
  const component = shallow(<App/>)
    expect(component.find("Board").length).toBe(1)
});
