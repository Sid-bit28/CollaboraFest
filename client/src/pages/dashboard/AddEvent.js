import { useAppContext } from '../../context/appContext';
import Wrapper from '../../assets/wrappers/DashBoardForm';

function AddEvent() {
    const {
        user,
        isEditing,
        isLoading,
        title,
        description,
        intake,
        eventSkill,
        handleEventChange,
        clearValues,
        createEvent,
    } = useAppContext();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title || !description || !intake || !eventSkill) {
            return;
        }
        if (isEditing) {
            return;
        }
        createEvent();
    };

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        handleEventChange({ name, value });
    };

    let content = (
        <>
            <form onSubmit={handleSubmit}>
                <div className="header">
                    <h1>
                        {isEditing ? 'Edit Event' : 'Add Event'} {user?.name}!
                    </h1>
                    {isEditing ? (
                        <div>Please fill the info to edit the Event.</div>
                    ) : (
                        <div>Please fill the info to create a Event.</div>
                    )}
                </div>
                <div className="button-input-group">
                    <div className="group input-group">
                        <input
                            type="text"
                            placeholder="Title"
                            required
                            value={title}
                            name="title"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="group input-group">
                        <input
                            type="text"
                            placeholder="Description"
                            required
                            value={description}
                            name="description"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="group input-group">
                        <input
                            type="text"
                            placeholder="Skill Required"
                            required
                            value={eventSkill}
                            name="eventSkill"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="group input-group">
                        <input
                            type="number"
                            placeholder="Intake Number"
                            required
                            value={intake == 0 ? '' : intake}
                            name="intake"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="group button-group btn-container">
                        <button disabled={isLoading}>
                            {isLoading ? 'Please wait...' : 'Create Event.'}
                        </button>
                        <button
                            disabled={isLoading}
                            onClick={(e) => {
                                e.preventDefault();
                                clearValues();
                            }}
                        >
                            Clear
                        </button>
                    </div>
                </div>
            </form>
        </>
    );

    return <Wrapper>{content}</Wrapper>;
}

export default AddEvent;
