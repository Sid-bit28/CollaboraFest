import Wrapper from '../assets/wrappers/BigSidebar';
import AlterLogo from './AlterLogo';
import NavLinks from './NavLinks';
import { useAppContext } from '../context/appContext';

function BigSidebar() {
    const { showSidebar } = useAppContext();
    return (
        <Wrapper>
            <div
                className={
                    showSidebar
                        ? 'sidebar-container show-sidebar'
                        : 'sidebar-container'
                }
            >
                <div className="content">
                    <header>
                        <AlterLogo />
                    </header>
                    <NavLinks />
                </div>
            </div>
        </Wrapper>
    );
}

export default BigSidebar;
