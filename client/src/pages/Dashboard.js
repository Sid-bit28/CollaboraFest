import { useEffect } from 'react';

function Dashboard() {
    const fetchData = async () => {
        try {
            const response = await fetch('/');
            const data = await response.json();
            console.log(data);
        } catch (e) {
            console.log(e);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);
    return (
        <div>
            <h1>Dashboard</h1>
        </div>
    );
}

export default Dashboard;
