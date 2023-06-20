import { useState } from 'react';
import { FormRow, Alert } from '../../components';
import { useAppContext } from '../../context/appContext';
import Wrapper from '../../assets/wrappers/DashboardFormPage';

function Profile() {
    const { user, updateUser, isLoading } = useAppContext();

    const [name, setName] = useState(user?.name);
    const [email, setEmail] = useState(user?.email);
    const [lastName, setLastName] = useState(user?.lastName);
    const [skill, setSkill] = useState(user?.skill);

    const handleSubmit = (e) => {
        e.preventDefault();
        // if (!name || !email || !lastName || !skill) {
        //     console.log('Pura bharo bc');
        //     return;
        // }
        // console.log('update user');
        updateUser({ name, email, lastName, skill });
    };

    return (
        <Wrapper>
            <form className="form" onSubmit={handleSubmit}>
                <h3>Profile</h3>
                <div className="form-center">
                    <FormRow
                        type="text"
                        name="name"
                        value={name}
                        handleChange={(e) => setName(e.target.value)}
                    />
                    <FormRow
                        type="text"
                        labelText="Last Name"
                        name="lastName"
                        value={lastName}
                        handleChange={(e) => setLastName(e.target.value)}
                    />
                    <FormRow
                        type="email"
                        name="email"
                        value={email}
                        handleChange={(e) => setEmail(e.target.value)}
                    />
                    <FormRow
                        type="text"
                        labelText="Skill"
                        name="skill"
                        value={skill}
                        handleChange={(e) => setSkill(e.target.value)}
                    />
                    <button
                        className="btn btn-block"
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Please wait...' : 'Save Changes'}
                    </button>
                </div>
            </form>
        </Wrapper>
    );
}

export default Profile;
