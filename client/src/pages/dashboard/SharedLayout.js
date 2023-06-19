import { Outlet, Link } from 'react-router-dom';
import Wrapper from '../../assets/wrappers/SharedLayout';

function SharedLayout() {
    return (
        <Wrapper>
            <nav>
                <Link to="add-event">add job</Link>
                <Link to="stats">stats</Link>
            </nav>
            <Outlet />
        </Wrapper>
    );
}

export default SharedLayout;
