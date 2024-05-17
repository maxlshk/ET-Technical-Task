import UserCard from './UserCard';

function UsersList({ users }) {
    console.log(users);
    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-6 overflow-y-auto custom-scrollbar'>
            {users.map((user) => (
                <UserCard
                    key={user._id}
                    name={user.fullName}
                    email={user.email}
                />
            ))}
            {users.length === 0 && <p className='text-2xl text-center col-span-full'>No users found</p>}
        </div>
    );
}

export default UsersList;