import { useAppContext } from '../context/appContext';
import { useEffect } from 'react';
import { Loading, TeamEvents, PageButtonContainer } from '.';
import Wrapper from '../assets/wrappers/JobsContainer';

function MyTeamsContainer() {
    const {
        getMyEvents,
        myEvents,
        events,
        isLoading,
        page,
        totalMyEvents,
        search,
        searchEventSkill,
        sort,
        numOfMyPages,
    } = useAppContext();

    useEffect(() => {
        getMyEvents();
    }, [page, search, searchEventSkill, sort]);

    if (isLoading) {
        return <Loading center />;
    }

    if (myEvents.length === 0) {
        return (
            <Wrapper>
                <h2>No Events</h2>
            </Wrapper>
        );
    }

    return (
        <Wrapper>
            <h5>
                {totalMyEvents} event{events.length > 1 && 's'} found.
            </h5>
            <div className="events">
                {myEvents.map((event) => {
                    return <TeamEvents key={event._id} {...event} />;
                })}
            </div>
            {numOfMyPages >= 1}
            <PageButtonContainer />
            {/* pagination daalne ka soche hain */}
        </Wrapper>
    );
}

export default MyTeamsContainer;
