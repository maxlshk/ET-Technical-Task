import UserCard from './UserCard';

function UsersList({ users }) {
    console.log(users);
    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-6 overflow-y-auto custom-scrollbar'>
            {users.map((user, index) => (
                <UserCard
                    key={user._id}
                    name={user.fullName}
                    email={user.email}
                    organizer={index === 0}
                />
            ))}
        </div>
    );
}

export default UsersList;