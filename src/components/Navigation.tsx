import { Link } from 'react-router-dom';

const Navigation = () => {
  const pathname = window.location.pathname;

  return (
    <div className="flex space-x-4">
      <Link
        to="/queue"
        className={`px-4 py-2 rounded-lg ${
          pathname === '/queue'
            ? 'bg-sky-100 text-sky-900 dark:bg-sky-900 dark:text-sky-100'
            : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
        }`}
      >
        คิวงาน
      </Link>
    </div>
  );
};

export default Navigation; 