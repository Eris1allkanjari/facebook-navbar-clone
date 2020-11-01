import React, {useState,useRef,useEffect} from 'react';
import { CSSTransition } from 'react-transition-group';
import { ReactComponent as BellIcon } from './icons/bell.svg';
import { ReactComponent as MessengerIcon } from './icons/messenger.svg';
import { ReactComponent as CaretIcon } from './icons/caret.svg';
import { ReactComponent as PlusIcon } from './icons/plus.svg';
import { ReactComponent as CogIcon } from './icons/cog.svg';
import { ReactComponent as ChevronIcon } from './icons/chevron.svg';
import { ReactComponent as ArrowIcon } from './icons/arrow.svg';
import { ReactComponent as BoltIcon } from './icons/bolt.svg';



function App() {
  return (
    <div className="App">
     <Navbar> 
     <NavItem icon={<PlusIcon />} />
      <NavItem icon={<BellIcon />} />
      <NavItem icon={<MessengerIcon />} />

      <NavItem icon={<CaretIcon/>}>
        <DropdownMenu />
      </NavItem>
     </Navbar>
    </div>
  );
}

function Navbar(props){
  return (
    <nav className="navbar">
      <ul className="navbar-nav">
        {props.children}
      </ul>
    </nav>
  );
}

function NavItem(props){
  const [open,setOpen] = useState(false);
  return (
    <li className="nav-item">
      <a href="#" className="icon-button" onClick={() => setOpen(!open)}>
        {props.icon}
      </a>
      {open && props.children}
    </li>
  )
}

function DropdownMenu(){

  const [activeMenu,setActiveMenu] = useState('main');
  const [menuHeight, setMenuHeight] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setMenuHeight(dropdownRef.current?.firstChild.offsetHeight)
  }, [])

  function calcHeight(el) {
    const height = el.offsetHeight;
    setMenuHeight(height);
  }
  
  function DropdownItem(props){
    return (
      <a href="#" className="menu-item" onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
        <span className="icon-button">{props.leftIcon}</span>
        {props.children}
        <span className="icon-button">{props.rightIcon}</span>
      </a>
    )
  }

  return (
    <div className="dropdown" style={{ height: menuHeight }} ref={dropdownRef}>
      <CSSTransition in={activeMenu === 'main'} 
      unmountOnExit 
      timeout={500}
      className="menu-secondary"  
      onEnter={calcHeight}>
        <div className="menu">
      <DropdownItem leftIcon="test" goToMenu="settings">Dog</DropdownItem>
      <DropdownItem leftIcon="test" >Cat</DropdownItem>
      </div>
      </CSSTransition>

      <CSSTransition in={activeMenu === 'settings'} unmountOnExit 
      className="menu-secondary"   onEnter={calcHeight}>
        <div className="menu">
      <DropdownItem leftIcon="test" goToMenu="main"></DropdownItem>
      <DropdownItem leftIcon="test" >Cat</DropdownItem>
      <DropdownItem leftIcon="test" >Dog</DropdownItem>
      <DropdownItem leftIcon="test" >Cat</DropdownItem>
      <DropdownItem leftIcon="test" >Dog</DropdownItem>
      <DropdownItem leftIcon="test" >Cat</DropdownItem>
      </div>
      </CSSTransition>
    </div>
  )
}

export default App;
