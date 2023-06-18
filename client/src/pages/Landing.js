import { Logo } from '../components';
import main from '../assets/images/main.svg';
import Wrapper from '../assets/wrappers/Landing';
import { TypeAnimation } from 'react-type-animation';
import { Link } from 'react-router-dom';

function Landing() {
    return (
        <Wrapper>
            <nav>
                <Logo />
            </nav>
            <div className="container page">
                <div className="info">
                    <h1>
                        Team{' '}
                        <span>
                            <TypeAnimation
                                sequence={['Finding', 1000]}
                                wrapper="span"
                                speed={10}
                                style={{ fontWeight: 700 }}
                                repeat={Infinity}
                            />
                        </span>{' '}
                        app
                    </h1>
                    <p>
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Quasi, laudantium expedita natus vero molestias
                        aperiam quidem doloremque aut voluptates odio voluptate
                        nostrum perferendis animi illo modi. Reiciendis dolorem
                        quam accusantium.
                    </p>
                    <Link to="/register" className="btn btn-hero">
                        Login/Register
                    </Link>
                </div>
                <img src={main} alt="job hunt" className="img main-img" />
            </div>
        </Wrapper>
    );
}

export default Landing;
