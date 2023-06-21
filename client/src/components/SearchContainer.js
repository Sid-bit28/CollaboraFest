import { useAppContext } from '../context/appContext';
import Wrapper from '../assets/wrappers/SearchContainer';
import { FormRow, FormRowSelect } from '.';

function SearchContainer() {
    const {
        isLoading,
        search,
        searchEventSkill,
        sort,
        sortOptions,
        handleEventChange,
        clearFilters,
    } = useAppContext();

    const handleSearch = (e) => {
        if (isLoading) return;
        handleEventChange({ name: e.target.name, value: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        clearFilters();
    };

    return (
        <Wrapper>
            <form className="form">
                <h4>Search Form</h4>
                <div className="form-center">
                    <FormRow
                        type="text"
                        name="search"
                        value={search}
                        handleChange={handleSearch}
                    />
                    <FormRow
                        type="text"
                        name="searchEventSkill"
                        value={searchEventSkill}
                        handleChange={handleSearch}
                    />
                    <FormRowSelect
                        labelText="Sort"
                        name="sort"
                        value={sort}
                        handleChange={handleSearch}
                        list={sortOptions}
                    />
                    <button
                        className="btn btn-block"
                        disabled={isLoading}
                        onClick={handleSubmit}
                    >
                        Clear Filters
                    </button>
                </div>
            </form>
        </Wrapper>
    );
}

export default SearchContainer;
