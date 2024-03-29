import links from '../utils/links';
import { NavLink } from 'react-router-dom';

function NavLinks({ toggleSidebar }) {
    return (
        <div className="nav-links">
            {links.map((link) => {
                const { text, path, id, icons } = link;
                return (
                    <NavLink
                        to={path}
                        key={id}
                        onClick={toggleSidebar}
                        className={({ isActive }) =>
                            isActive ? 'nav-link active' : 'nav-link'
                        }
                    >
                        <span className="icon">{icons}</span>
                        {text}
                    </NavLink>
                );
            })}
        </div>
    );
}

export default NavLinks;
