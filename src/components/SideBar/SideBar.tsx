import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './SideBar.scss';
import { ReactComponent as Logo } from '../../assets/img/logo.svg';
import Chat from '../../assets/icons/chat.svg';
import ServicesIcon from '../../assets/icons/services.svg';
import Complaint from '../../assets/icons/complaint.svg';
import SignOut from '../../assets/icons/sign-out.svg';
import { auth } from './../../utils/firebase';
import { selectCurrentUser } from '../../redux/auth/auth.selector';
import { useSelector } from 'react-redux';
interface INavBarData {
  icon: string;
  path: string;
  label: string;
}

function useOutsideCloseNavbar(
  ref: React.MutableRefObject<any>,
  closeNavBar: () => void
) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        closeNavBar();
      }
    }

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref]);
}

const SideBar = () => {
  const wrapperRef = useRef(null);
  const [navbarIsActive, setNavbarIsActive] = useState(false);
  const [activePage, setActivePage] = useState('');
  const currentUser = useSelector(selectCurrentUser);

  useOutsideCloseNavbar(wrapperRef, closeNavBar);

  function closeNavBar(): void {
    setNavbarIsActive(false);
  }

  const navBarData: INavBarData[] = [
    {
      path: '/chatpage',
      icon: Chat,
      label: 'محادثة',
    },
    {
      path: '/problemtable',
      icon: Complaint,
      label: 'الشكاوي',
    },
    {
      path: '/services',
      icon: ServicesIcon,
      label: 'طلبات خاصة',
    },
  ];
  function onClickNavbarLink(path: string): void {
    setActivePage(path);
    closeNavBar();
  }
  const location = useLocation();

  useEffect(() => {
    setActivePage(location.pathname);
  }, [location.pathname]);

  return (
    <div className="z-100" ref={wrapperRef}>
      <div
        style={{ cursor: 'pointer' }}
        className={`md:hidden absolute z-50 right-1 pointer flex flex-col items-end mr-2 mt-3 ${
          navbarIsActive ? 'opacity-0' : ''
        } transition-all duration-500`}
        onClick={() => setNavbarIsActive(true)}
      >
        <div className="bg-darkColor w-10 h-1 m-1 rounded-lg" />
        <div className="bg-darkColor w-10 h-1 m-1 rounded-lg" />
        <div className="bg-darkColor w-8 h-1 m-1 rounded-lg" />
      </div>
      <nav
        className={`navbar-items-container ${
          navbarIsActive ? 'right-5' : ''
        } md:right-5 transition-all duration-500 z-10`}
      >
        <div className="navbar-items">
          <Link to="/chatpage">
            <Logo className="navbar-logo" />
          </Link>

          <div className="nav-menu">
            {navBarData.map(({ icon, path, label }) => (
              <Link to={path} key={path}>
                <div
                  className={`nav-link-container ${
                    (
                      path === '/'
                        ? path === activePage
                        : activePage.includes(
                            path === '/' ? '/' : path.replaceAll('/', '')
                          )
                    )
                      ? 'active'
                      : ''
                  }`}
                  onClick={() => onClickNavbarLink(path)}
                >
                  <img src={icon} alt="navIcon" className="nav-icon" />
                  <span className="nav-link">{label}</span>
                </div>
              </Link>
            ))}
          </div>
          {currentUser ? (
            <div
              className={`nav-link-container`}
              onClick={() => auth.signOut()}
            >
              <img src={SignOut} alt="navIcon" className="nav-icon" />
              <span className="nav-link">تسجيل الخروج</span>
            </div>
          ) : null}
        </div>
      </nav>
    </div>
  );
};

export default SideBar;
