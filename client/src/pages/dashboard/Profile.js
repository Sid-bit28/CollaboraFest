import { useState } from 'react';
import { useAppContext } from '../../context/appContext';
import Wrapper from '../../assets/wrappers/DashBoardForm';

function Profile() {
    const { user, updateUser, isLoading } = useAppContext();

    const [name, setName] = useState(user?.name);
    const [email, setEmail] = useState(user?.email);
    const [lastName, setLastName] = useState(user?.lastName);
    const [skill, setSkill] = useState(user?.skill);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !email || !lastName || !skill) {
            return;
        }
        updateUser({ name, email, lastName, skill });
    };

    let content = (
        <>
            <form onSubmit={handleSubmit}>
                <div className="header">
                    <h1>Welcome {user?.name}!</h1>
                    <div>Please fill your info to save changes.</div>
                </div>
                <div className="button-input-group">
                    <div className="group input-group">
                        <input
                            type="text"
                            placeholder="Name"
                            required
                            value={name}
                            name="name"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="group input-group">
                        <input
                            type="text"
                            placeholder="Last Name"
                            required
                            value={lastName}
                            name="lastName"
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>
                    <div className="group input-group">
                        <input
                            type="email"
                            placeholder="Email"
                            required
                            value={email}
                            name="email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="group input-group">
                        <input
                            type="text"
                            placeholder="Skill"
                            required
                            value={skill}
                            name="skill"
                            onChange={(e) => setSkill(e.target.value)}
                        />
                    </div>
                    <div className="group button-group">
                        <button className="signin-btn" disabled={isLoading}>
                            {isLoading ? 'Please wait...' : 'Save Changes'}
                        </button>
                    </div>
                </div>
            </form>
        </>
    );

    return <Wrapper>{content}</Wrapper>;
}

export default Profile;
