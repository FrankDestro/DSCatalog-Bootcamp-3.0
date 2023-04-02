import Dropdown from 'react-bootstrap/Dropdown';

function BasicButtonExample() {
  return (
    <Dropdown>
    <Dropdown.Toggle id="dropdown-button-dark-example5" variant="secondary">
      Dropdown Button
    </Dropdown.Toggle>

    <Dropdown.Menu variant="">
      <Dropdown.Item href="#/action-1" active>
        Action
      </Dropdown.Item>
      <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
      <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
      <Dropdown.Item href="#/action-4">Separated link</Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
  );
}

export default BasicButtonExample;