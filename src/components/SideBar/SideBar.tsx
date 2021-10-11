import { ReactElement, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './SideBar.scss';

const SideBar = (): ReactElement => {
  const [isShrink, setIsShrink] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const shortcuts = useRef<HTMLHeadingElement>(null);
  const active_tab = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const onPressShrinkBtn = () => {
    // document.body.classList.toggle('shrink');
    setIsShrink(!isShrink);
    setTimeout(moveActiveTab, 400);
    setIsHovered(true);
    setTimeout(() => {
      setIsHovered(false);
    }, 500);
  };

  const moveActiveTab = () => {
    let topPosition = activeIndex * 58 + 2.5;

    if (activeIndex > 3) {
      topPosition += shortcuts.current!.clientHeight;
    }

    active_tab.current!.style.top = `${topPosition}px`;
  };
  const changeLink = (i: number) => {
    setActiveIndex(i);

    moveActiveTab();
  };

  const showTooltip = (i: number) => setHoveredIndex(i);

  return (
    <div className={`nav-bar-container ${isShrink ? 'shrink' : ''}`}>
      <nav>
        <div className="sidebar-top">
          <span
            className={`shrink-btn ${isHovered ? 'hovered' : ''}`}
            onClick={onPressShrinkBtn}
          >
            <i className="bx bx-chevron-left" />
          </span>
          <img src="./img/logo.png" className="logo" alt="" />
          <h3 className="hide">Aqumex</h3>
        </div>
        <div className="search">
          <i className="bx bx-search" />
          <input type="text" className="hide" placeholder="Quick Search ..." />
        </div>
        <div className="sidebar-links">
          <ul>
            <div className="active-tab" ref={active_tab} />
            {[
              { title: 'شات', icon: 'message', link: '/chat' },
              { title: 'Projects', icon: 'folder', link: '/chat' },
              { title: 'Messages', icon: 'folder', link: '/chat' },
              { title: 'Analytics', icon: 'folder', link: '/chat' },
            ].map(({ title, icon, link }, i) => (
              <div key={title}>
                <Link to={link}>
                  <li
                    className="tooltip-element"
                    data-tooltip={i}
                    onMouseOver={() => showTooltip(i)}
                  >
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a
                      onClick={() => changeLink(0)}
                      href="#"
                      className={`${activeIndex === 0 ? 'active' : ''}`}
                      data-active={0}
                    >
                      <div className="icon">
                        <i className={`bx bx-${icon}`} />
                        <i className={`bx bxs-${icon}`} />
                      </div>
                      <span className="link hide">{title}</span>
                    </a>
                  </li>
                </Link>
                {hoveredIndex === i ? (
                  <div
                    className="tooltip"
                    ref={tooltipRef}
                    style={{ top: 30 + 60 * i }}
                  >
                    <span className="show">{title}</span>
                  </div>
                ) : null}
              </div>
            ))}
          </ul>
        </div>
        <div className="sidebar-footer">
          <a href="#s" className="account tooltip-element" data-tooltip={0}>
            <i className="bx bx-user" />
          </a>
          <div className="admin-user tooltip-element" data-tooltip={1}>
            <div className="admin-profile hide">
              <img src="./img/face-1.png" alt="" />
              <div className="admin-info">
                <h3>John Doe</h3>
                <h5>Admin</h5>
              </div>
            </div>
            <a href="#s" className="log-out">
              <i className="bx bx-log-out" />
            </a>
          </div>
          <div className="tooltip">
            <span className="show">John Doe</span>
            <span>Logout</span>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default SideBar;
