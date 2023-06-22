import { useAppContext } from '../context/appContext';
import { useEffect } from 'react';
import { Loading, Event, PageButtonContainer } from '../components';
import Wrapper from '../assets/wrappers/JobsContainer';

function PendingMembersContainer() {
    const {
        getPendingMembers,
        pendingMembersEvents,
        isLoading,
        page,
        search,
        searchEventSkill,
        sort,
        numOfPendingMembersPages,
    } = useAppContext();

    useEffect(() => {
        getPendingMembers();
    }, [page, search, searchEventSkill, sort]);

    if (isLoading) {
        return <Loading center />;
    }

    if (pendingMembersEvents.length === 0) {
        return (
            <Wrapper>
                <h2>No Events</h2>
            </Wrapper>
        );
    }

    let values = [];
    let cnt = 1;
    pendingMembersEvents.map((event) => {
        event.pendingMembers.map((sm) => {
            console.log(sm);
            values.push(
                <Event
                    key={cnt++}
                    pending="yes"
                    name={sm.name}
                    message={sm.message}
                    title={sm.title}
                    userID={sm.id}
                    {...event}
                />
            );
        });
    });

    return (
        <Wrapper>
            <h5>
                {values.length} event
                {values.length > 1 && 's'} found.
            </h5>
            <div className="events">{values}</div>
            {numOfPendingMembersPages > 1}
            <PageButtonContainer />
            {/* pagination daalne ka soche hain */}
        </Wrapper>
    );
}

export default PendingMembersContainer;
